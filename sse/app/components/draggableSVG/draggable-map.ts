/* 
 * Copyright (C) 2016 Yannick
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */



import {Component,OnInit,OnChanges,Input,Output,EventEmitter,HostListener} from '@angular/core'; 

import {BaseLocationManager} from  '../../services/data-manager';
import {LocationDirectory} from '../../services/directory/directory';
import {DragElement} from './drag-element';
import {Selection,myDirectory,FileType} from '../../services/directory/directory'

class MapPoints{
    x:number;
    y:number;
}

@Component({ 
    selector: 'my-drag-map', 
    directives: [DragElement],
    styleUrls: ['app/components/loader/ring.css'],
    template: 
    `   <div><div class="buttonbar">
            <i *ngIf="!editMode" class="material-icons"
                    (click)="startEdit()">mode_edit</i>  
            <i *ngIf="editMode" class="material-icons" 
                    (click)="clear()">clear</i>
            <i *ngIf="editMode" class="material-icons" 
                    (click)="discard()">undo</i>
            <i *ngIf="editMode" class="material-icons" 
                    (click)="save()">save</i>  
            <p  *ngIf="!imageUrl"> Edit to add an URL of a picture to be displayed </p>
        </div>
        <input *ngIf="editMode" value="{{imageUrl}}" (keyup)="imageExists($event.target.value)"
                style="direction: ltr;width: 100%;" placeholder="URL"/>
        <div *ngIf="loading" class='uil-ring-css' style='transform:scale(0.6);'><div></div></div>
        <div  id="map">
            <div  *ngIf="imageUrl">
            <img src="{{imageUrl}}" 
            alt="Map Image" style="width: 100%; height:auto;">
            <my-draggable  *ngFor="let drag of selectedDirectory.directories"
               [x]="getX(drag)" [y]="getY(drag)" 
               [name]="getShortName(drag)" [cursor]="cursor" 
               (onDown)="onDown(drag,$event)"  
               (onUp)="onUp(drag);"
            ></my-draggable>
            </div>
        </div>
        </div>
        ` 
}) 
export class DragContainer implements OnInit, OnChanges{ 
    @Input() selection:Selection;
    @Input() manager:BaseLocationManager;
    
    @Output() onSelect: EventEmitter<Selection> = new EventEmitter<Selection>();
    
    private selectedDirectory:LocationDirectory;
    private cursor:string = "pointer";
    private imageUrl:string;
    
    private editMode:boolean =false;
    private loading:boolean=true;

    private map:HTMLElement;
    private img:HTMLImageElement  = new Image();    
    private imageOldUrl:string;
    // Drag
    private oldPositions:Array<MapPoints> = [];
    private last: MouseEvent;
    private draggedDir:LocationDirectory;
    private mouseDown : boolean = false;  
      
    // Save edit discard
    startEdit(){
        this.imageOldUrl = this.imageUrl;
        this.editMode = true;
        this.cursor = "grab";
        let locDir:LocationDirectory;
        for (var dir in this.selectedDirectory.directories){
            locDir = this.selectedDirectory.directories[dir];
            this.oldPositions[dir] = { x: locDir.positionInParentx, y: locDir.positionInParenty};
        }
    }

    clear(){
        this.discard();
        this.imageUrl ="";
    }
    
    discard(){
        this.imageUrl = this.imageOldUrl;
        this.editMode = false;
        this.loading = false;
        this.cursor = "pointer";
        let locDir:LocationDirectory;
        for (var dir in this.selectedDirectory.directories){
            locDir = this.selectedDirectory.directories[dir];
            locDir.positionInParentx = this.oldPositions[dir].x;
            locDir.positionInParenty = this.oldPositions[dir].y;
       }
    }
    
    save(){
        this.editMode = false;
        this.loading = false;
        this.cursor = "pointer";
        this.selectedDirectory.imageUrl = this.imageUrl;
    }
    
    // Drag and such
    onDown(d:LocationDirectory,m:MouseEvent){
        if (this.editMode){
            this.mouseDown = true;
            this.cursor = "grabbing";
            this.last = m;
            this.draggedDir = d;
        }
    }
    
    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        if (this.editMode && this.mouseDown) {
            event.preventDefault();
            this.draggedDir.positionInParentx += (event.clientX - this.last.clientX) * 100 / this.map.offsetWidth;
            this.draggedDir.positionInParenty += (event.clientY - this.last.clientY) * 100 / this.map.offsetHeight;
            this.last = event;  
        }
    }
    
    onUp(d:LocationDirectory){
        if (this.editMode) {
            this.mouseDown = false;
            this.cursor = "grab";
        }else{
            this.onSelect.emit(new Selection(d.id,FileType.DIRECTORY,d));
        }
    }
    
    //if child mouseup is not called
    @HostListener('mouseup', ['$event'])
    onMouseup(event:MouseEvent) {
        event.preventDefault();
        if (this.mouseDown){
            this.cursor = "grab";
            this.mouseDown = false;
        }
    }
        
    getX(d:LocationDirectory):number{
        if (d.positionInParentx <0){
            d.positionInParentx =0;
        } else if (d.positionInParentx > 100){
            d.positionInParentx = 100;
        }
        return d.positionInParentx * this.map.offsetWidth / 100;
    }
    
    getY(d:LocationDirectory):number{
        if(d.positionInParenty<0){
            d.positionInParenty =0;
        } else if (d.positionInParenty > 100){
            d.positionInParenty = 100;
        }
        return d.positionInParenty * this.map.offsetHeight / 100;
    }
    
    getShortName(d:LocationDirectory):string{
        if (d.shortName && d.shortName.length>0){
            return d.shortName;
        }else{
            return "none";
        }
    }
    
    ngOnInit(){
        this.map = document.getElementById('map');
        this.img.onload = (event => this.setImageUrl());
        this.img.onerror = (event => this.notSetImageUrl());  
    }
    
    private setImageUrl(){
        this.imageUrl = this.img.src
        this.loading = false;
    }

    private notSetImageUrl(){
        console.log("url error")
        this.loading = false;
    }

    // Setting selected from outside
    ngOnChanges(){
        if (this.editMode){
            this.discard();
        }
        this.imageUrl = null;
        this.editMode = false;
        this.manager.getLocation(this.selection.id).then(loc => this.setLocation(loc));
    }  
    
    setLocation(loc:LocationDirectory){
        this.selectedDirectory = loc;
        this.imageExists(this.selectedDirectory.imageUrl);
    }
    // Check URL before removing old one
    imageExists(url:string) {
        console.log("checking URL:");
        console.log(url);
        this.loading = true;
        this.img.src = url;
        console.log("done");
    }
}

