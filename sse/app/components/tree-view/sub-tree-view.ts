/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Component,OnInit, Input, Output, EventEmitter} from 'angular2/core'; 
import {Directory,File} from '../directory/directory'; 


@Component({ 
    selector: 'sub-tree-view', 
    template: ` 
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
                    [selectedFile]="selectedFile"
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
    directives: [SubTreeView] 
}) 

export class SubTreeView{ 
    @Input() directories: Directory;
    
    @Output() onSelectDirectory: EventEmitter<Directory>= new EventEmitter();
    @Output() onSelectFile: EventEmitter<File>= new EventEmitter();
    @Output() onOpenDialog: EventEmitter<Directory>= new EventEmitter();
    
    @Input() selectedDirectory:Directory;
    @Input() selectedFile:File;
    
    
    
    selectDirectory(dir:Directory){
        this.onSelectDirectory.emit(dir);
    }
    
    selectFile(file:File){
        this.onSelectFile.emit(file);
    }
      
    openDialog(dir:Directory){
        this.onOpenDialog.emit(dir);
    }
}