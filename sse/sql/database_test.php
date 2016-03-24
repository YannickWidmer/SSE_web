<html>
<head>
<title>MySQL Class test</title>

<?php
include('database.php');
$db = new Database();
$db->connect();
$db->select('character_info');
$res = $db->getResult();
?>
</head>
<body>
    <ul>
        <?php
          foreach($res as $characte)
              echo "<li>".$characte['name']."</li>"
        ?>
    </ul>
</body>     
</html>