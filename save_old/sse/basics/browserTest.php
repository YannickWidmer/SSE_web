<html>
<head>
<title> you are using </title>
	<?php
		$agent = $_SERVER['HTTP_USER_AGENT'];

		if ( strpos( strtoupper($agent), 'MSIE') ) {
			print "Internet Explorer";
		}
		else if (strpos(strtoupper($agent), 'FIREFOX')) {
			print "Firefox";
		}else {
			print $agent;
		}
	?>
	<?PHP
		$text_line = "Poll number 1, 1500, 250, 150, 100, 1000";
		$text_line = explode(",",$text_line);

		print $text_line[0];
		print_r($text_line);
	?>
</head>
<body/>
</html>