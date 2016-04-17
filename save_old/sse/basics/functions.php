<html>
<head>
<title> functions </title>
<h1> Variable by value</h1>
	<?php
		$Variable_Value = 10;

		print "Before the function call = " . $Variable_Value . "<BR>";

		example($Variable_Value);

		print "After the function call = " . $Variable_Value;

		function example($Variable_Value) {
			$Variable_Value = $Variable_Value + 10;
			print "Inside of the function = " . $Variable_Value . "<BR>";
		}
	?>
<h1> Variable by reference</h1>
	<?PHP
		$Variable_Value = 10;

		print "Before the function call = " . $Variable_Value . "<BR>";

		examplee($Variable_Value);

		print "After the function call = " . $Variable_Value;

		function examplee(&$Variable_Value) {
			$Variable_Value = $Variable_Value + 10;
			print "Inside of the function = " . $Variable_Value . "<BR>";
		}
	?>
</head>
<body>
	
</body>
</html>