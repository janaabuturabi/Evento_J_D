<?php
session_start();

$host = "localhost";
$dbname = "evento_j_d";
$dbuser = "evento";
$dbpass = "123456";

$error = '';
$success = '';
$show_success_script = false;

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $dbuser, $dbpass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $username = isset($_POST['username']) ? trim($_POST['username']) : '';
        $password = isset($_POST['password']) ? trim($_POST['password']) : '';
        $password_confirm = isset($_POST['password_confirm']) ? trim($_POST['password_confirm']) : '';

        if ($username === '' || $password === '' || $password_confirm === '') {
            $error = "All fields are required.";
        } elseif ($password !== $password_confirm) {
            $error = "Password and confirm password do not match.";
        } else {
            $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->execute([$username]);
            if ($stmt->fetch()) {
                $error = "Username already exists, please choose another.";
            } else {
                $password_hashed = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
                $stmt->execute([$username, $password_hashed]);

                $_SESSION['user'] = $username;
                $success = "Account created successfully!";
                $show_success_script = true;
            }




        }
    }
} catch (PDOException $e) {
    $error = "Database connection error: " . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8" />
    <title>Create New Account</title>
    <link rel="stylesheet" href="login_extra.css" />
</head>
<body>
<div class="circle-box">
    <i style="--clr:#2c3e50"></i>
    <i style="--clr:#33d2a4"></i>
    <i style="--clr:#bdc3c7"></i>

    <div class="form-wrapper">
        <h2>Create New Account</h2>

        <?php if ($error): ?>
            <p style="color: red;"><?php echo htmlspecialchars($error); ?></p>
        <?php endif; ?>

        <form method="POST" action="">
            <div class="field">
                <input type="text" id="username" name="username" required />
                <label for="username">Username</label>
            </div>

            <div class="field">
                <input type="password" id="password" name="password" required autocomplete="off" />
                <label for="password">Password</label>
            </div>

            <div class="field">
                <input type="password" id="password_confirm" name="password_confirm" required autocomplete="off" />
                <label for="password_confirm">Confirm Password</label>
            </div>

            <div class="field">
                <input type="submit" value="Create Account" />
            </div>
        </form>

        <div class="nav-links">
            <a href="login.php">Already have an account? Log in</a>
        </div>
    </div>
</div>

<?php if ($show_success_script): ?>
    <script>
        // إشعار ترحيبي بعد إنشاء الحساب
        alert("🎉 Welcome <?php echo $_SESSION['user']; ?>! Your account has been created successfully.");

        // إعادة التوجيه إلى index.html بعد 3 ثواني
        setTimeout(function() {
            window.location.href = "index.php";
        });



    </script>
<?php endif; ?>
</body>
</html>
