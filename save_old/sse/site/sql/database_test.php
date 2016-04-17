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
<style>
    th{
        text-align:left;
    }
</style>
</head>
<body>
    <table style="width:80%">
        <tr>
            <th>id</th>
            <th>Name</th>
        </tr>
        <?php
          foreach($res as $characte)
              echo "<tr> <td>".$characte['character_id']."</td><td>".$characte['name']."</td></tr>"
        ?>
    </table>
</body>     
</html>