<!--
This class is creating a browser tree on the left side of the window. 
To set the tree use setTree, giving it an multidimensional array, the last level has to be an array
even if it is a single element, otherwise the previus element will be omited a sit is 
considered to be only an index
-->
<?php
class TreeBrowser{
   private $arr = array("A"=>array("A.1"=>array("lorem ipsum dolor"),"A.2","A.3"=>array("Loream fhdjshf")),
       "B","C"=>array("C.1","C.2"=>array("LOrem ipsum dolor sit amet")));
   
   public function setTree($tree){
       $this->arr = $tree;
   }
   
   public function creatTree(){
       echo '<div id="tree_browser"><ul id="expList">';
       foreach($this->arr as $name=>$entry){
           $this->printEntry($name,$entry);
       }
       echo '</ul></div>';
   }
   
   private function printEntry($name,$entry){
        if(is_null($entry)){ // should never happen 
            echo "<li>". $name."</li>";
        }else if(is_array($entry)){
           echo '<li>'.$name.'<ul>';
           foreach($entry as $subname=>$subentry){
               $this->printEntry($subname, $subentry);
           }
           echo '</ul>';
        }else{
            echo "<li>".$entry."</li>";
        }
   }
}
