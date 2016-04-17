<html>
<head>
	<title> Loops </title>
	<?php
		$startnumber =1;
		$endnumber =10;
		$multiply = 2;
		if (isset($_POST['start'])) {
				$startnumber = $_POST['start'];
		}
		if (isset($_POST['end'])) {
				$endnumber = $_POST['end'];
		}
		if (isset($_POST['mult'])) {
				$multiply = $_POST['mult'];
		}
		if(isset($_POST['Submit1'])){
			for($i = $startnumber;$i<$endnumber+1;$i++){
				print $i." multiplied by ". $multiply . "=" . $i * $multiply;
				print "<BR>";
			}
		}
	?>
</head>
<body>
<form name ="form1" Method ="Post" ACTION ="loops.php">
Start Number: 
<input Type="" name = "start" value = "<?PHP print $startnumber ; ?>">
End Number:
<input Type="" name = "end" value = "<?PHP print $endnumber ; ?>">
Multiply by:
<input Type="" name = "mult" value = "<?PHP print $endnumber ; ?>">

<P>
<Input type = "Submit" Name = "Submit1" Value = "compute">
</form>
</body>
</html>