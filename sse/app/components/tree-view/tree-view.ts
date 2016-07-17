/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Component,OnInit, Input, Output, EventEmitter, SimpleChange} from '@angular/core'; 

import {myDirectory,myFile,FileType,Selection} from '../../services/directory/directory'; 

import {SubTreeView} from './sub-tree-view';
import {NewDirectoryDialog} from '../dialog/new-directory';
import {BaseDirectoryManager} from  '../../services/data-manager';

@Component({ 
    selector: 'tree-view', 
    template: `
<my-dialog-new-directory  *ngIf="showDialog"
        [hasFile] ="hasFiles"
        (onCreateFile)="createFile($event)"
        (onCreateDirectory)="createDirectory($event)"
        (onExit)="showDialog = false" 
        ></my-dialog-new-directory> 
<sub-tree-view [directory]="directory" 
                    [selection]="selection"
                    (onSelect)="select($event)"
                    (onOpenDialog)="openDialog($event)"></sub-tree-view> 
`,  
    directives: [SubTreeView,NewDirectoryDialog] 
}) 

export class TreeView implements OnInit{ 
    @Input() directoryManager: BaseDirectoryManager;
    // We need another selection otherwise changes are not propagated
    @Input() inputSelection:Selection;
    
    @Output() onSelect: EventEmitter<Selection>= new EventEmitter<Selection>();
    
    
    private showDialog:boolean =false;
    private directory: myDirectory = new myDirectory(9,"");
    private selection:Selection;
    
    ngOnInit() {
        this.directoryManager.getDirectory().then(dir =>this.directory = dir);
    }
    
    select(selection:Selection){
        console.log("select "+selection.object.name);
        this.selection = selection;
        this.onSelect.emit(selection);
    }
      
    openDialog(dir:myDirectory){
        this.showDialog =  true; 
    }
    
    createDirectory(name:string){
        this.showDialog = false;
        if(this.selection.type == FileType.DIRECTORY){
            this.directoryManager.addDirectory(<myDirectory>this.selection.object, name).then(dir => this.directory = dir);
        }
    }
    
    createFile(name:string){
        this.showDialog = false;
        if(this.selection.type == FileType.DIRECTORY){
            this.directoryManager.addFile(<myDirectory>this.selection.object, name).then(dir => this.directory = dir);
        }
    }
    
    ngOnChanges(changes:{[propName:string]:SimpleChange}){
        if(changes["inputSelection"] != undefined && this.inputSelection){
            this.findOpenAndSelect(this.inputSelection, this.directory);
            this.selection = this.inputSelection;
        }
    }
    
    private findOpenAndSelect(selection:Selection,dir:myDirectory){
        console.log("looking for " + selection.object.name + " in " + dir.name);
        if (selection.type == FileType.DIRECTORY && dir.id == selection.id){
            return true;
        }else if(selection.type == FileType.FILE && dir.files != null){
            for(let f of dir.files){
                if(f.id == selection.id){
                    dir.expanded = true;
                    return true;
                }
            }
        }else{
            for (let d of dir.directories){
                if(this.findOpenAndSelect(selection,d)){
                    dir.expanded = true;
                    return true;
                }
            }
        }
        return false;
    }
}