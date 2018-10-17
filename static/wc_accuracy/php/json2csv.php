<?php
 
//Receive the RAW post data.
$content = trim(file_get_contents("php://input"));
 
//Attempt to decode the incoming RAW post data from JSON.
$decoded = json_decode($content, true);
 
//If json_decode failed, the JSON is invalid.
if(!is_array($decoded)){
    throw new Exception('Received content contained invalid JSON!');
}

// http://thisinterestsme.com/php-convert-json-csv/
$fp = fopen('../data/results.csv', 'a');
foreach($decoded as $row) fputcsv($fp, $row);
fclose($fp);

?>
