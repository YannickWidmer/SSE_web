<?php
include $_SERVER["DOCUMENT_ROOT"].'sse/includes/externalsources/Parsedown.php';

$parsedown = new Parsedown();
$markdown = $_REQUEST["markdown"];
echo $parsedown->text($markdown);
?>