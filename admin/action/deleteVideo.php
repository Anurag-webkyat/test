<?php
// Require the database configuration file
require '../../_class/dbConfig.php';
$obj = new dbConfig();
// Get the database connection
$connection = $obj->getConnection();
// Get JSON input data
$inputData = json_decode(file_get_contents('php://input'), true);
header('Content-Type: application/json; charset=utf-8');
$id  = $inputData['id'];
$sql = "UPDATE  videos SET status=0 where video_id = $id";
$connection->query($sql);
