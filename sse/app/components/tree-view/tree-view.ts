/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Component, Input, Output, EventEmitter} from 'angular2/core'; 
import {Directory} from './directory'; 

@Component({ 
    selector: 'tree-view', 
    template: `
<ul id="navcontainer">
    <li *ngFor="#dir of directories">
        <a [class.selected]='dir === selectedDirectory'>
            <i *ngIf="dir.expanded" (click)="dir.toggle()" class="material-icons md-18">expand_more</i>
            <i *ngIf="!dir.expanded" (click)="dir.toggle()" class="material-icons md-18">chevron_right</i>
            <span (click)="selectFolder(dir)">
                {{dir.name}}
            </span>
            <i *ngIf="dir === selectedDirectory" class="material-icons md-18" (click)="createSubDir(dir)" style="float:right;">add</i>
        </a>
        <div *ngIf="dir.expanded">
            <tree-view [directories]="dir.directories" [selectedDirectory]="selectedDirectory"
                    (onSelectFolder)="selectFolder($event)"
                    (onSelectFile)="selectFile($event)"
                    (onCreateSubDir)="createSubDir($event)"></tree-view>
            <ul>
                <li *ngFor="#file of dir.files" (onSelectFile)="selectFile(file.id)">{{file.name}}</li>
            </ul>
        </div>
    </li>
</ul>`, 
    directives: [TreeView] 
}) 

export class TreeView { 
    @Input() directories: Array<Directory>; 
    @Input() selectedDirectory:Directory;
    @Output() onSelectFolder: EventEmitter<Directory>= new EventEmitter();
    @Output() onSelectFile: EventEmitter<number>= new EventEmitter();
    @Output() onCreateSubDir: EventEmitter<Directory>= new EventEmitter();
    
    selectFolder(id:Directory){
        this.onSelectFolder.emit(id);
    }
    selectFile(id:number){
        this.onSelectFile.emit(id);
    }
    
    createSubDir(dir:Directory){
        this.onCreateSubDir.emit(dir);
    }
}