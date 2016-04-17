<html>
<head>
<title>Test Attack</title>

	<?PHP

		if ($_SERVER['REQUEST_METHOD'] == 'POST') {

			$first_name = $_POST['first_name'];

			echo  htmlspecialchars( $first_name ). "<br>";
			echo  htmlentities( $first_name ). "<Br>";
			echo  strip_tags( $first_name );
			
		}
		
	?>
</head>
<BODY>
	<Form Method = "Post" action ="security.php">
		<input type = "text" name = "first_name" value ="test name">
		<input type="submit" name="Submit" value="Submit">
	</Form>
</BODY>
</html>