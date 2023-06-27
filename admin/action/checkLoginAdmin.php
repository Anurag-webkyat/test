<?php
session_start();
$responseArray = [];
$responseArray[0]['info'] = isset($_SESSION['loginId']) ? 'true' : 'false';
echo json_encode($responseArray);