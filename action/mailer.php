<?php
// Include PHPMailer library
require '../smtp/PHPMailerAutoload.php';

// Create a new PHPMailer object
$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPAuth = true;
// Set SMTP debugging
// $mail->SMTPDebug = 1;
$mail->Host        = 'smtp.hostinger.com';
$mail->Port        = 465;
$mail->SMTPSecure  = 'ssl';
$mail->SMTPOptions = array('ssl' => array('verify_peer' => false,
    'verify_peer_name'                                      => false,
    'allow_self_signed'                                     => true));
// Set the username and password to use for SMTP authentication
$mail->Username = 'info@webkyat.com';
$mail->Password = 'Webkyat@5656';

// Validate form data
if (empty($_POST['name']) || empty($_POST['phone']) || empty($_POST['email']) || empty($_POST['message'])) {
    echo json_encode(['status' => false, 'message' => 'Please fill all fields']);
    exit;
}

// Set who the message is to be sent from
$mail->setFrom('info@webkyat.com', 'Enquiry');
// Set who the message is to be sent to
$mail->addAddress('bbactrust@gmail.com');
// Set the subject line
$mail->Subject = 'New message from contact form';

// Set the message body
$body = '<h1>New Enquiry From Website</h1><br>';
$body .= 'Name: ' . $_POST['name'] . '<br>';
$body .= 'Phone: ' . $_POST['phone'] . '<br>';
$body .= 'Email: ' . $_POST['email'] . '<br>';
$body .= 'Message: ' . $_POST['message'] . '<br>';
$mail->Body = $body;

// Send the message
if (!$mail->send()) {
    echo json_encode(['status' => false, 'message' => 'Faild To send']);
} else {
    echo json_encode(['status' => true, 'message' => 'Success']);
}