<!DOCTYPE html>
<html>
    <head>
        <?php require_once("../../includes/config.php");?>
        <link href="/learning/css/style.css" rel="stylesheet" type="text/css">    
        <title>Rules</title>
    </head>
    <body>
        <div id="inner_window">
            <?php 
                include INCLUDE_PATH.'header.php';
                include INCLUDE_PATH.'externalsources/Parsedown.php';


                $parsedown = new Parsedown();
                $markdown = file_get_contents("rules.md");
                echo "<P style ='border: 1px solid black;padding: 10px;margin: 30px;'>";
                echo $parsedown->text($markdown);
                echo "</p>";
            ?> 
        </div>

    </body>
    
    
</html>