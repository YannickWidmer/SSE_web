<html>
<head>
<title>MySQL Class test</title>

<?php;
include('database.php');
$db = new Database();
echo 'connected';
$db->connect();
$db->select('character_info');
$res = $db->getResult();
print_r($res);
?>
</head>
<body>

</body>
</html>