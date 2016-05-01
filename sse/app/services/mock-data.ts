/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Directory} from '../components/tree-view/directory';

export var STORYDIRS = 
        new Directory(1,"Main",[
            new Directory(2,"main story",[
                new Directory(3,"act 1"),
                new Directory(4,"act 2")
            ]),
            new Directory(5,"side story",[
                new Directory(6,"Le tonneau"),
                new Directory(7,"la princesse")
            ])  
        ]);
   
export var STORYFILES = {};
        
        