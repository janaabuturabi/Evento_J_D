<?php
header('Content-Type: application/json; charset=UTF-8');

// إعداد الاتصال بقاعدة البيانات
$host = 'localhost';
$db   = 'evento_j_d';
$user = 'evento';
$pass = '123456';
$dsn  = "mysql:host=$host;dbname=$db;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    // استلام البيانات من الـ POST
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $maxAtt = isset($_POST['max_attendees']) ? $_POST['max_attendees'] : 0;
    $date = isset($_POST['date']) ? $_POST['date'] : null;
    $time = isset($_POST['time']) ? $_POST['time'] : null;
    $price = isset($_POST['price']) ? $_POST['price'] : 0;
    $address = isset($_POST['address']) ? $_POST['address'] : '';
    $duration = isset($_POST['duration']) ? $_POST['duration'] : 0;
    $durUnit = isset($_POST['duration_unit']) ? $_POST['duration_unit'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $rating = isset($_POST['rating']) ? $_POST['rating'] : 0;
    $audience = isset($_POST['audience']) ? $_POST['audience'] : '[]';
    $eventType = isset($_POST['event_type']) ? $_POST['event_type'] : '';
    $features = isset($_POST['features']) ? $_POST['features'] : '[]';

    // معالجة الصور
    $uploaded = [];
    if (!empty($_FILES['images']) && $_FILES['images']['error'][0] == UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/uploads/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

        foreach ($_FILES['images']['tmp_name'] as $i => $tmp) {
            if (is_uploaded_file($tmp)) {
                $nameImg = uniqid('img_') . '_' . basename($_FILES['images']['name'][$i]);
                move_uploaded_file($tmp, $uploadDir . $nameImg);
                $uploaded[] = 'uploads/' . $nameImg;
            }
        }
    }

    // البحث عن أكبر ID موجود في قاعدة البيانات
    $stmt = $pdo->query("SELECT id FROM events ORDER BY id ASC");
    $ids = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // تحديد الرقم التراكمي الجديد
    if (empty($ids)) {
        // إذا كانت القاعدة فارغة، تبدأ من 1
        $newId = 1;
    } else {
        // إذا كانت هناك بيانات، نبحث عن أكبر ID مفقود
        $newId = 1;
        foreach ($ids as $i => $id) {
            if ($id != $newId) {
                break;
            }
            $newId++;
        }
    }

    // إضافة الحدث باستخدام ID الجديد
    $stmt = $pdo->prepare("
      INSERT INTO events 
      (id, name, max_attendees, date, time, price, address, duration, duration_unit, description, audience, event_type, features, rating, images)
      VALUES
      (:id, :name, :maxAtt, :date, :time, :price, :address, :duration, :durUnit, :desc, :aud, :etype, :feats, :rating, :imgs)
    ");
    $stmt->execute([
        ':id'       => $newId,
        ':name'     => $name,
        ':maxAtt'   => $maxAtt,
        ':date'     => $date,
        ':time'     => $time,
        ':price'    => $price,
        ':address'  => $address,
        ':duration' => $duration,
        ':durUnit'  => $durUnit,
        ':desc'     => $description,
        ':aud'      => $audience,
        ':etype'    => $eventType,
        ':feats'    => $features,
        ':rating'   => $rating,
        ':imgs'     => json_encode($uploaded),
    ]);

    // إرجاع النتيجة بنجاح
    echo json_encode(['success' => true, 'id' => $newId]);

} catch (PDOException $e) {
    // التعامل مع الخطأ وإرجاع رسالة الخطأ
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
