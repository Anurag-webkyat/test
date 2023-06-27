<?php
// Require the database configuration file
require '../../_class/dbConfig.php';

// Create an instance of the database connection class
$obj = new dbConfig();

// Get the database connection
$connection = $obj->getConnection();

// Validate video upload
if (!isset($_FILES['video']) || $_FILES['video']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400); // Bad request
    echo json_encode(['status' => 'error', 'message' => 'Video not selected']);
    exit();
}

// Define the allowed file types and sizes
$max_size      = 50 * 1024 * 1024; // 10 MB
$allowed_types = array('video/mp4', 'video/avi', 'video/mov');

// Get the file information
$file_type = $_FILES['video']['type'];
$file_size = $_FILES['video']['size'];

// Check if the file type and size are allowed
if ($file_size > $max_size || !in_array($file_type, $allowed_types)) {
    http_response_code(400); // Bad request
    echo json_encode(['status' => 'error', 'message' => 'The maximum allowed video size is 50 MB and only mp4, avi and mov formats are allowed']);
    exit();
}

// Get the file path
$tmp_name = $_FILES['video']['tmp_name'];
// Get the file extension
$file_extension = pathinfo($_FILES['video']['name'], PATHINFO_EXTENSION);
// Generate a unique file name
$file_name = uniqid() . '.' . $file_extension;
$file_path = '../uploads/videos/' . $file_name;

// Move the file to the uploads directory
if (move_uploaded_file($tmp_name, $file_path)) {
    // Prepare the SQL statement with placeholders for the variables
    $stmt = $connection->prepare("INSERT INTO videos (video_name) VALUES (?)");

    // Bind the variables to the placeholders
    $image = $file_name;
    $stmt->bind_param("s", $image);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Uploaded successfully']);
        exit();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error while inserting to database']);
        exit();
    }
} else {
    // Error moving the file
    http_response_code(500); // Internal server error
    echo json_encode(['status' => 'error', 'message' => 'Error uploading file']);
    exit();
}