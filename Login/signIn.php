<?php
// Include the database connection file
// Replace with your actual database connection details
$servername = "localhost";
$username = "root";
$password = ""; // Your database password
$dbname = "onlyme";
session_start();
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve email and password from POST

    $email =$_POST['email'];
    $password = $_POST['password'];
    if($email=="admin@gmail.com"&&$password=="1234"){
        header("Location: admin.php");
    }

    // Query to check if customer exists
    $sql = "SELECT * FROM Customer WHERE Email = '$email' AND Password = '$password'";
    $result = $conn->query($sql);


    if ($result->num_rows > 0) {
        // Customer exists
        $_SESSION['email'] = $email;
        echo "Welcome, " .  $_SESSION['email'] ;
        header("Location: testProj.php");

    } else {
        // Customer does not exist

        echo "<script>
                alert('Invalid email or password. Please try again.');
                window.history.back(); // Redirect back to the previous page
              </script>";
    }
}

$conn->close();
//
?>
