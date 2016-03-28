<!DOCTYPE html>
<html>
    <head>
        <?php require_once("../../includes/config.php");?>
        <title>Rules</title>
    </head>
    <body>
        <?php
            include INCLUDE_PATH.'header.php';
            include INCLUDE_PATH.'externalsources/Parsedown.php';
            $parsedown = new Parsedown();
            $markdown = file_get_contents("rules.md");
            echo "<div id='inner'>";
            echo $parsedown->text($markdown);
            echo "</div>";
        ?> 
    </body>
    
    
</html>