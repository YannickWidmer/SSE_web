/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Component,OnInit, Input, Output, EventEmitter, SimpleChange} from 'angular2/core'; 

import {Directory,File} from '../directory/directory'; 

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
 
<ul id="navcontainer">
    <li *ngFor="#dir of directories">
        <a [class.selected]='dir === selectedDirectory'>
            <i *ngIf="dir.isEmpty()" class="material-icons md-18">stop</i>
            <i *ngIf="!dir.isEmpty() && dir.expanded" (click)="dir.toggle()" class="material-icons md-18">expand_more</i>
            <i *ngIf="!dir.isEmpty() && !dir.expanded" (click)="dir.toggle()" class="material-icons md-18">chevron_right</i>
            <span (click)="selectDirectory(dir)">
                {{dir.name}}
            </span>
            <i *ngIf="dir === selectedDirectory" class="material-icons md-18" (click)="openDialog(dir)" style="float:right;">add</i>
        </a>
        <div *ngIf="dir.expanded">
            <sub-tree-view [directories]="dir.directories" [selectedDirectory]="selectedDirectory"
                    (onSelectDirectory)="selectDirectory($event)"
                    (onSelectFile)="selectFile($event)"
                    (onOpenDialog)="openDialog($event)"></sub-tree-view>
            <ul>
                <li *ngFor="#file of dir.files" (onSelectFile)="selectFile(file.id)">
                    <a [class.selected]='file === selectedFile'>
                        <span>
                            {{file.name}}
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </li>
</ul>`, 
    directives: [SubTreeView,NewDirectoryDialog] 
}) 

export class TreeView implements OnInit{ 
    @Input() directoryManager: BaseDirectoryManager;
    @Input() hasFiles: boolean=false;
    @Input() selectedId: number;
    
    @Output() onSelectDirectory: EventEmitter<Directory>= new EventEmitter();
    @Output() onSelectFile: EventEmitter<File>= new EventEmitter();
    
    
    private showDialog:boolean =false;
    private directories: Array<Directory>;
    private selectedDirectory:Directory;
    private selectedFile:File;
    
    ngOnInit() {
        this.directoryManager.getDirectorys().then(dirs =>this.directories = [dirs]);
    }
    
    selectDirectory(dir:Directory){
        this.selectedFile = null;
        this.selectedDirectory = dir;
        this.onSelectDirectory.emit(dir);
    }
    
    selectFile(file:File){
        this.selectedDirectory = null;
        this.selectedFile = file;
        this.onSelectFile.emit(file);
    }
      
    openDialog(dir:Directory){
        this.showDialog =  true; 
    }
    
    createDirectory(name:string){
        this.showDialog = false;
        this.directoryManager.addDirectory(this.selectedDirectory, name).then(dirs => this.directories = [dirs]);
    }
    
    createFile(name:string){
        this.showDialog = false;
        this.directoryManager.addFile(this.selectedDirectory, name).then(dirs => this.directories = [dirs]);
    }
    
    ngOnChanges(changes:{[propName:string]:SimpleChange}){
        console.log("tree view on change");
        if (this.selectedId && this.selectedDirectory && this.selectedId != this.selectedDirectory.id){
            this.findOpenAndSelect(this.selectedId, this.directories[0]);
        }
    }
    
    private findOpenAndSelect(id:number,dir:Directory){
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