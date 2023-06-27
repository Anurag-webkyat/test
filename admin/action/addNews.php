<?php
// Require the database configuration file
require '../../_class/dbConfig.php';

// Create an instance of the database connection class
$obj = new dbConfig();

// Get the database connection
$connection = $obj->getConnection();

// Validate image upload
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Image not selected']);
    exit();
}

// Define the allowed file types and sizes
$allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
$max_size      = 2 * 1024 * 1024; // 2 MB

// Get the file information
$file_type = $_FILES['image']['type'];
$file_size = $_FILES['image']['size'];

// Check if the file type and size are allowed
if (!in_array($file_type, $allowed_types) || $file_size > $max_size) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Only JPEG, PNG, GIF, and WebP formats are allowed, and the maximum allowed image size is 2 MB']);
    exit();
}

// Get the file path
$tmp_name = $_FILES['image']['tmp_name'];
// Get the file extension
$file_extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
// Generate a unique file name
$file_name = uniqid() . '.' . $file_extension;
$file_path = '../uploads/news/' . $file_name;

// Move the file to the uploads directory
if (move_uploaded_file($tmp_name, $file_path)) {
    // Prepare the SQL statement with placeholders for the variables
    $stmt = $connection->prepare("INSERT INTO news (file_name) VALUES (?)");

    // Bind the variables to the placeholders
    $image = $file_name;
    $stmt->bind_param("s", $image);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Created successfully']);
        exit();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error while inserting to database']);
        exit();
    }
} else {
    // Error moving the file
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Error uploading file']);
    exit();
}
