/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Component,OnInit, Input, Output, EventEmitter} from '@angular/core'; 
import {myDirectory,myFile, FileType,Selection} from '../../services/directory/directory'; 


@Component({ 
    selector: 'sub-tree-view', 
    template: ` 
<ul id="navcontainer">
    <li>
        <a [class.selected]='selection != null && directory === selection.object'  (click)="selectThis()">
            <i *ngIf="directory.isEmpty()" class="material-icons md-18">stop</i>
            <i *ngIf="!directory.isEmpty() && directory.expanded" 
                (click)="directory.toggle()" class="material-icons md-18">expand_more</i>
            <i *ngIf="!directory.isEmpty() && !directory.expanded" 
                (click)="directory.toggle()" class="material-icons md-18">chevron_right</i>
            <span>
                {{directory.name}}
            </span>
            <i *ngIf="selection && directory === selection.object" 
            class="material-icons md-18" (click)="openDialog(directory)" style="float:right;">add</i>
        </a>
        <div *ngIf="directory.expanded">
            <div *ngFor="let dir of directory.directories" >
                <sub-tree-view 
                        [directory]="dir" [selection]="selection"
                        [selectedFile]="selectedFile"
                        (onSelect)="select($event)"
                        (onOpenDialog)="openDialog($event)"></sub-tree-view>
            </div>
            <ul>
                <li *ngFor="let file of directory.files" (click)="selectFile(file)">
                    <a [class.selected]='selection != null && file === selection.object'>
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
    
    @Output() onSelect: EventEmitter<Selection>= new EventEmitter<Selection>();
    @Output() onOpenDialog: EventEmitter<myDirectory>= new EventEmitter<myDirectory>();

    @Input() selection:Selection;
    
    
    select(sel:Selection){
        this.onSelect.emit(sel);
    }

    selectThis(){
        this.onSelect.emit(new Selection(this.directory.id,FileType.DIRECTORY,this.directory));
    }
    
    selectFile(file:myFile){
        this.onSelect.emit(new Selection(file.id,FileType.FILE,file));
    }
      
    openDialog(dir:myDirectory){
        this.onOpenDialog.emit(dir);
    }

    isExpanded(dir:myDirectory):boolean{
        return dir.expanded;
    }

    toggle(dir:myDirectory):void{
        dir.toggle();
    }

}