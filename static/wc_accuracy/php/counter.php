<?php
$filename = "counter";
header("Content-Type: application/json");
$fp = fopen($filename, "r+"); // open the file for reading and writing
if (flock($fp, LOCK_EX)) {  // obtain an exclusive lock of the counter file
// the process will block here until it can obtain the lock
	$counter->val = intval(fread($fp, filesize($filename)));  // read the counter value 
	echo json_encode($counter);
	exit();
	ftruncate($fp, 0);  // clear the file
	rewind($fp);  // rewind the file pointer to the beginning of the file
	fwrite($fp, $counter->val + 1);  // write the incremented counter value
    flock($fp, LOCK_UN); // unlock the file
} else {
    echo "Could not lock $filename!\n";
    exit();
}
fclose($fp);

?>
