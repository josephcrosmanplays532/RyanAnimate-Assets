<?php
	////
	//// This PHP moves imported files into the user-assets folder
	////

	///
	/// Variables
	///
	$directory = "../../import_these/";
	$filename = $directory .  $_POST["subtype"] . "-" . basename($_FILES["import"]["name"]);

	if (move_uploaded_file($_FILES["import"]["tmp_name"], $filename)) {
		echo "Your asset has been uploaded sucessfully!";
	}
?>
