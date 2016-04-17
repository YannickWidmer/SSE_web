<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        
        <?php require_once("../../includes/config.php");?>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <title>Story</title>
        <script>
        function liveMarkdown(str) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById("storyHtml").textContent = xmlhttp.responseText;
                }
            };
            xmlhttp.open("GET", "MarkDownToHtml.php?markdown=" + str, true);
            xmlhttp.send();
        }
        </script>
    </head>
    <body>
        <?php include INCLUDE_PATH.'header.php';?>
        <?php include INCLUDE_PATH.'treebrowser.php';
        $tree = new TreeBrowser();
        $tree->creatTree();
        ?>
        <div id="main">
            <button style="position:absolute; right:5px; top:5px;">
                <i class="large material-icons">mode_edit</i>
            </button>
            <form>
                Markdown:<textarea onkeyup="liveMarkdown(this.value)"></textarea>
            </form>
            <div id="storyHtml"/>
        </div>
        <?php include INCLUDE_PATH.'general_relations.php';?>
        
    </body>
</html>
