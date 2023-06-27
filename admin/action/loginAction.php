<?php
// Require the database configuration file
require '../../_class/dbConfig.php';

// Create an instance of the database connection class
$obj = new dbConfig();

// Get the database connection
$conn = $obj->getConnection();
// Get JSON input data
$inputData = json_decode(file_get_contents('php://input'), true);
// Set response header
header('Content-Type: application/json; charset=utf-8');

// Validate input data
if (!isset($inputData['username']) || !isset($inputData['password'])) {
    $response = ['status' => 'error', 'message' => 'Invalid input data.'];
    echo json_encode($response);
    exit;
}
$username = trim($inputData['username']);
$password = trim($inputData['password']);
// Hash the password
$password = md5($password);
// Check if input data is valid
if (empty($username) || empty($password)) {
    // If input data is missing, return error response
    http_response_code(400);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Username or password is missing.',
    ]);
    exit;
}

// Validate username and password
if (!preg_match("/^[a-zA-Z0-9]*$/",$username) || strlen($password) < 8) {
    // If login data is invalid, return error response
    http_response_code(401);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Invalid username or password',
    ]);
    exit;
}

// Check if username and password are valid
$sql  = "SELECT login_id from login where username = ? and password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $password);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
    // If login data is valid, set session variables and return success response
    session_start();
    $loginDataRow = $result->fetch_assoc();
    $_SESSION['loginId'] = $loginDataRow['login_id'];
    echo json_encode([
        'status' => 'success',
    ]);
} else {
    // If login data is invalid, return error response
    http_response_code(401);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Invalid username or password',
    ]);
}