/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Component,OnInit, Input, Output, EventEmitter} from '@angular/core'; 
import {myDirectory,myFile} from '../../services/directory/directory'; 


@Component({ 
    selector: 'sub-tree-view', 
    template: ` 
<ul id="navcontainer">
    <li>
        <a [class.selected]='directory === selectedDirectory'  (click)="selectDirectory(directory)">
            <i *ngIf="directory.isEmpty()" class="material-icons md-18">stop</i>
            <i *ngIf="!directory.isEmpty() && directory.expanded" 
                (click)="directory.toggle()" class="material-icons md-18">expand_more</i>
            <i *ngIf="!directory.isEmpty() && !directory.expanded" 
                (click)="directory.toggle()" class="material-icons md-18">chevron_right</i>
            <span>
                {{directory.name}}
            </span>
            <i *ngIf="directory === selectedDirectory" 
            class="material-icons md-18" (click)="openDialog(directory)" style="float:right;">add</i>
        </a>
        <div *ngIf="directory.expanded">
            <div *ngFor="let dir of directory.directories" >
                <sub-tree-view 
                        [directory]="dir" [selectedDirectory]="selectedDirectory"
                        [selectedFile]="selectedFile"
                        (onSelectDirectory)="selectDirectory($event)"
                        (onSelectFile)="selectFile($event)"
                        (onOpenDialog)="openDialog($event)"></sub-tree-view>
            </div>
            <ul>
                <li *ngFor="let file of directory.files" (click)="selectFile(file)">
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
    @Input() directory: myDirectory;
    
    @Output() onSelectDirectory: EventEmitter<myDirectory>= new EventEmitter<myDirectory>();
    @Output() onSelectFile: EventEmitter<myFile>= new EventEmitter<myFile>();
    @Output() onOpenDialog: EventEmitter<myDirectory>= new EventEmitter<myDirectory>();
    
    @Input() selectedDirectory:myDirectory;
    @Input() selectedFile:myFile;
    
    
    
    selectDirectory(dir:myDirectory){
        this.onSelectDirectory.emit(dir);
    }
    
    selectFile(file:myFile){
        this.onSelectFile.emit(file);
    }
      
    openDialog(dir:myDirectory){
        this.onOpenDialog.emit(dir);
    }

    // didn't work without it anymore
    isEmpty(dir:myDirectory):boolean{
        return dir.isEmpty();
    }

    isExpanded(dir:myDirectory):boolean{
        return dir.expanded;
    }

    toggle(dir:myDirectory):void{
        
        dir.toggle();
    }

}