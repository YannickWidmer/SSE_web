<html>
<head>
	<title>Radio Buttons</title>
	<?PHP

$male_status = 'unchecked';
$female_status = 'unchecked';

if (isset($_POST['gender'])) {

	$selected_radio = $_POST['gender'];

	if ($selected_radio == 'male') {
		$male_status = 'checked';
	}else if ($selected_radio == 'female') {
		$female_status = 'checked';
	}
}

?>
</head>
<body>

<Form name ="form1" Method ="Post" ACTION ="radioButton.php">
	<Input type = 'Radio' Name ='gender' value= 'male'
		<?PHP print $male_status; ?>
	>Male

	<Input type = 'Radio' Name ='gender' value= 'female'
		<?PHP print $female_status; ?>
	>Female

	<P>

	<Input type = "Submit" Name = "Submit1" Value = "Select a Radio Button">
</FORM>

</body>
</html>