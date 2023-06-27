<?php
// Require the database configuration file
require '../../_class/dbConfig.php';

// Create an instance of the database connection class
$obj = new dbConfig();

// Get the database connection
$connection = $obj->getConnection();

// Set the status value to be used in the query
$status = 0;

// Prepare the SQL query with a placeholder for the status value
$sql    = "SELECT `video_id`,`video_name`,`date_time` FROM videos WHERE status != ?";
$stmt   = $connection->prepare($sql);

// Bind the status value to the query and execute it
$stmt->bind_param('i', $status);
$stmt->execute();

// Get the result set from the query
$result = $stmt->get_result();

// Check if the query returned any rows
if ($result->num_rows > 0) {
    // Create an empty array to hold the data
    $data_array = array();

    // Loop through the result set and add each row to the data array
    while ($row = $result->fetch_assoc()) {
        // Convert the date time string to a timestamp
        $dateTime     = strtotime($row['date_time']);

        // Add the row data to the array
        $data_array[] = array(
            'id'    => $row['video_id'],
            'video' => $row['video_name'],
            'date'  => date('d-M-y', $dateTime),
            'time'  => date('H:i a', $dateTime),
        );
    }

    // Encode the data array as JSON and output it
    echo json_encode($data_array);
} else {
    // If the query returned no rows, output an error message as JSON
    echo json_encode(array('status' => 'error', 'message' => 'No data found'));
}

// Close the statement and the database connection
$stmt->close();
$connection->close();