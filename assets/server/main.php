<?php
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);

  if (isset($request->action) && !empty($request->action)) { //Checks if action value exists
    $action = $request->action;
    switch($action) { //Switch case for value of action
      case "do_subscribe": 
        do_subscribe(
          $request->name,
          $request->phone_number,
          $request->email,
          $request->country
        );
      break;
    }
  }

  function do_subscribe($name , $phone_number , $email, $country)
  {

    $apiKey = '06e2f12892561f5791f1b8fc8a71ac47-us3';
    $listId = 'dab7644824';

    $memberId = md5(strtolower($email));
    $dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
    $url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/' . $memberId;

    $json = json_encode([
        'email_address' => $email,
        'status'        => 'subscribed', // "subscribed","unsubscribed","cleaned","pending"
        'merge_fields'  => [
          'NAME'     => $name,
          'PHONE'    => $phone_number,
          'COUNTRY'  => $country
        ]
    ]);

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);                                                                                                                 

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $returne['status'] = $httpCode;

    echo json_encode($returne);

    // return $httpCode;
  }
?>