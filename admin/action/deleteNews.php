<?php
// Require the database configuration file
require '../../_class/dbConfig.php';
$obj = new dbConfig();
// Get the database connection
$connection = $obj->getConnection();
// Get JSON input data
$inputData = json_decode(file_get_contents('php://input'), true);
header('Content-Type: application/json; charset=utf-8');
// Get the news id from the input data
$id  = $inputData['id'];
// Create an SQL query to update the status of the news item
$sql = "UPDATE  news SET status=0 where news_id = $id";
// Execute the query
$connection->query($sql);