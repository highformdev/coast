<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//echo '<pre>';print_r($_POST);die;
if(isset($_POST['Contact']) && $_POST['Contact'] == 'submit')
{
    $honeypot = $_POST['lead_name'];
    if (!empty($honeypot))
    {
        return;
    }
    else
    {
        require "./libs/PHPMailer-master/src/Exception.php";
        require "./libs/PHPMailer-master/src/PHPMailer.php";
        require "./libs/PHPMailer-master/src/SMTP.php";
            
        $mail = new PHPMailer(true);    
            
         //$con = new mysqli("localhost","root","","project_coast_oclakeshore");
         $con = new mysqli("localhost","user_oclakeshore","#?[^;z-9kHsQ","db_oclakeshore");

        date_default_timezone_set("America/Denver");
        $date = date("m/d/Y H:i:s");
        $time = strtotime($date);
        $time = $time - (2 * 60);
        $date = date('m/d/Y\TH:i:s', $time);
         
        mb_internal_encoding("UTF-8");
    
        $message = '<html><body>';
        $message .= '<div style="width: 4%; padding: 0px 0px 15px 0px" class="py-3"><img style="width: 250px;" src="https://thegovernorphx.com/images/footer-main-logo-1.png" alt="" class="footer-logo img-fluid"></div>';
        $message .= '<div style=" padding-top: 13px"><b>Inquiry received from The oclakeshore.com:</b><br><br></div>';
        $message .= '<table><tr><td align="right" valign="top" width="10%" style="padding-right: 10px; padding-left: 7px; background-color: #eaeaea; padding-top: 5px; padding-bottom: 5px;"><strong>First Name:</strong></td>';
        $message .= '<td>' . $_POST['lead_first_name'].'</td></tr>';
        $message .= '<tr><td align="right" valign="top" width="10%" style="padding-right: 10px; padding-left: 7px; background-color: #eaeaea; padding-top: 5px; padding-bottom: 5px;"><strong>Last Name:</strong></td>';
        $message .= '<td>' . $_POST['lead_last_name'].'</td></tr>';
        $message .= '<tr><td align="right" valign="top" width="10%" style="padding-right: 10px; padding-left: 7px; background-color: #eaeaea; padding-top: 5px; padding-bottom: 5px;"><strong>Phone Number:</strong></td>';
        $message .= '<td>' . $_POST['lead_phone'] . '</td></tr>';
        $message .= '<tr><td align="right" valign="top" width="10%" style="padding-right: 10px; padding-left: 7px; background-color: #eaeaea; padding-top: 5px; padding-bottom: 5px;"><strong>Email:</strong></td>';
        $message .= '<td>' . $_POST['lead_email'] . '</td></tr>';
        $message .= '<tr><td align="right" valign="top" width="10%" style="padding-right: 10px; padding-left: 7px; background-color: #eaeaea; padding-top: 5px; padding-bottom: 5px;"><strong>Unit Type:</strong></td>';
        $message .= '<td>' . $_POST['unit-type'] . '</td></tr>';
        $message .= '<tr><td align="right" valign="top" width="10%" style="padding-right: 10px; padding-left: 7px; background-color: #eaeaea; padding-top: 5px; padding-bottom: 5px;"><strong>Comment:</strong></td>';
        $message .= '<td>' . $_POST['lead_comment'] . '</td></tr></table>';

        $message .= '</body></html>';
        //echo '<pre>';print_r($message);die;
        $date   =   date('Y-m-d');
          $sql    =   "INSERT INTO `contact_info`(`fname`, `lname`, `phone_no`, `email`, `unit_type`, `comment`, `create_at`) 
                        VALUES ('".$_POST['lead_first_name']."','".$_POST['lead_last_name']."','".$_POST['lead_phone']."','".$_POST['lead_email']."','".$_POST['unit-type']."','".$_POST['lead_comment']."','".$date."')";
        //echo '<pre>';print_r($sql);die;
          $result = $con->query($sql);

        try {

            //Server settings
            
                //$mail->SMTPDebug = 3;                      //Enable verbose debug output
                $mail->isSMTP();                                            //Send using SMTP
                $mail->Host         = 'smtp-relay.gmail.com';                     //Set the SMTP server to send through
                $mail->SMTPAuth     = true;                                   //Enable SMTP authentication
                $mail->Username     = 'alert@highform.com';               // SMTP username
                $mail->Password     = 'yhqxhwpnyyidvnkb';                           // SMTP password
                $mail->SMTPSecure   = 'tls';            //Enable implicit TLS encryption
                $mail->Port         = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            
                //Recipients
                $mail->setFrom('alert@highform.com', 'Highform Alert');
                $mail->addAddress('test.thatsend@gmail.com', 'The oclakeshore');     //Add a recipient
                $mail->addReplyTo($_POST['lead_email'], $_POST['lead_first_name']);
                //$mail->addBCC('dev@highform.com');
            
                //Content
                $mail->isHTML(true);                                  //Set email format to HTML
                $mail->Subject = 'The oclakeshore - Website Submission from '.$_POST['lead_first_name'];
                $mail->Body    = $message;
    
                $Email = $mail->send();
//                echo '<pre>';print_r($Email);die;
                if (isset($Email) && $Email)
                {

                    $response['success_msg'] = 'true';
                    echo json_encode($response);
//                    header('location: '.$_SERVER['HTTP_REFERER'].'?submit=true');
			        exit(0);
                }
                else
                {
                    $response['success_msg'] = 'false';
                    echo json_encode($response);
                }
               
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }

    }
}
?>
