/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Component,OnInit, Input, Output, EventEmitter, SimpleChange} from '@angular/core'; 

import {myDirectory,myFile} from '../../services/directory/directory'; 

import {SubTreeView} from './sub-tree-view';
import {NewDirectoryDialog} from '../dialog/new-directory';
import {BaseDirectoryManager,FileType} from  '../../services/data-manager';

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
                    [selectedDirectory]="selectedDirectory"
                    [selectedFile] = "selectedFile"
                    (onSelectDirectory)="selectDirectory($event)"
                    (onSelectFile)="selectFile($event)"
                    (onOpenDialog)="openDialog($event)"></sub-tree-view> 
`,  
    directives: [SubTreeView,NewDirectoryDialog] 
}) 

export class TreeView implements OnInit{ 
    @Input() directoryManager: BaseDirectoryManager;
    @Input() hasFiles: boolean=false;
    @Input() selectedId: number;
    
    @Output() onSelectDirectory: EventEmitter<myDirectory>= new EventEmitter<myDirectory>();
    @Output() onSelectFile: EventEmitter<File>= new EventEmitter<File>();
    
    
    private showDialog:boolean =false;
    private directory: myDirectory = new myDirectory(9,"");
    private selectedDirectory:myDirectory;
    private selectedFile:File;
    
    ngOnInit() {
        this.directoryManager.getDirectory().then(dir =>this.directory = dir);
    }
    
    selectDirectory(dir:myDirectory){
        this.selectedFile = null;
        this.selectedDirectory = dir;
        this.directoryManager.setFileType(FileType.DIRECTORY);
        this.onSelectDirectory.emit(dir);
    }
    
    selectFile(file:File){
        this.selectedDirectory = null;
        this.selectedFile = file;
        this.directoryManager.setFileType(FileType.FILE);
        this.onSelectFile.emit(file);
    }
      
    openDialog(dir:myDirectory){
        this.showDialog =  true; 
    }
    
    createDirectory(name:string){
        this.showDialog = false;
        this.directoryManager.addDirectory(this.selectedDirectory, name).then(dir => this.directory = dir);
    }
    
    createFile(name:string){
        this.showDialog = false;
        this.directoryManager.addFile(this.selectedDirectory, name).then(dir => this.directory = dir);
    }
    
    ngOnChanges(changes:{[propName:string]:SimpleChange}){
        if (this.selectedId && this.selectedDirectory && this.selectedId != this.selectedDirectory.id){
            this.findOpenAndSelect(this.selectedId, this.directory);
        }
    }
    
    private findOpenAndSelect(id:number,dir:myDirectory){
        console.log("looking for " + id + " in " + dir.name);
        if (dir.id == id){
            console.log("found it ");
            this.selectedDirectory = dir;
            return true;
        }
        for (let d of dir.directories){
            if(this.findOpenAndSelect(id,d)){
                dir.expanded = true;
                return true;
            }
        }
        return false;
    }
}