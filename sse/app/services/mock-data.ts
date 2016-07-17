/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {myDirectory,myFile, LocationDirectory} from './directory/directory';

export var STORY_TEXT = [], LOCATION_TEXT = [], NPC_DIR_TEXT = [], NPC_FILE_TEXT = [];

export var STORYDIRS =
    new myDirectory(1, "Main", [
        new myDirectory(2, "main story", [
            new myDirectory(3, "act 1"),
            new myDirectory(4, "act 2")
        ]),
        new myDirectory(5, "side story", [
            new myDirectory(6, "Le tonneau"),
            new myDirectory(7, "la princesse")
        ])
    ]);

export var LOCATIONDIRS =
    new LocationDirectory(1, "Valandria", [
        new LocationDirectory(2, "Avast", [
            new LocationDirectory(3, "Gandar")
        ]),
        new LocationDirectory(4, "Tryvian", [
            new LocationDirectory(5, "Das Rhonads Gebirge")
        ])
    ]);


export var NPCDIRS = new myDirectory(1, "ALL",
    [
        new myDirectory(2, "Adel", [], [new myFile("Valandor", 1), new myFile("Marcel", 2 )]),
        new myDirectory(3, "Garde", [], [new myFile("Fred",3)])
    ]);

var NEXTIDN: number = 7;

export function NEXTID() {
    return ++NEXTIDN;
}
