<?php
// Start the session to make email available globally
session_start();

// Include the database connection file
$servername = "localhost";
$username = "root";
$password = ""; // Your database password
$dbname = "onlyme";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if the email already exists
    $sql_check = "SELECT * FROM Customer WHERE Email = '$email'";
    $result = $conn->query($sql_check);

    if ($result->num_rows > 0) {
        // Email already exists
        echo "<script>
                alert('This email is already registered. Please use a different email.');
                window.history.back(); // Redirect back to the sign-up page
              </script>";
    } else {
        // Insert the new customer into the database
        $sql_insert = "INSERT INTO Customer (Customer_name, Email, Password, Registration_date)  VALUES ('$name', '$email', '$password', NOW())";

        if ($conn->query($sql_insert) === TRUE) {
            // Save email to session
            $_SESSION['email'] = $email;

            // Redirect to home page or another page
            echo "<script>
                    alert('Sign-Up successful! Welcome, $name.');
                    window.location.href = 'testProj.html';
                  </script>";
        } else {
            echo "Error: " . $sql_insert . "<br>" . $conn->error;
        }
    }
}

$conn->close();
//ايميل
?>
