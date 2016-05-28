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



import {Component,OnInit,OnChanges,Input} from 'angular2/core'; 

import {LocationDirectory} from '../directory/directory';
import {DragElement,DragMouvement} from './drag-element';

class MapPoints{
    x:number;
    y:number;
}

@Component({ 
    selector: 'my-drag-map', 
    directives: [DragElement],
    template: 
    `   <div><div class="buttonbar">
            <i *ngIf="!editMode" class="material-icons"
                    (click)="startEdit()">mode_edit</i>  
            <i *ngIf="editMode" class="material-icons" 
                    (click)="discard()">clear</i>
            <i *ngIf="editMode" class="material-icons" 
                    (click)="save()">save</i>  
            <p  *ngIf="!imageUrl"> Edit to add an URL of a picture to be displayed </p>
        </div>
        <input *ngIf="editMode" value="{{imageUrl}}" (keyup)="imageExists($event.target.value)"
                style="direction: ltr;width: 100%;" placeholder="URL"/>
        <div  id="map">
            <div  *ngIf="imageUrl">
            <img src="{{imageUrl}}" 
            alt="Map Image" style="width: 100%; height:auto;">
            <my-draggable  *ngFor="#drag of selectedDirectory.directories"
               [x]="getX(drag)" [y]="getY(drag)" 
               [name]="getShortName(drag)" [editMode]="editMode"
               (onDrag)="onDrag(drag,$event)"    
            ></my-draggable>
            </div>
        </div>
        </div>
        ` 
}) 
export class DragContainer implements OnInit, OnChanges{ 
    @Input() selectedDirectory:LocationDirectory;
    private imageUrl:string;
    
    private editMode:boolean =false;
    
    private map:HTMLElement;
    private img:HTMLImageElement  = new Image();    
    private imageOldUrl:string;
    private oldPositions:Array<MapPoints> = [];
        
    imageExists(url:string) {
        console.log("checking URL:");
        console.log(url);
        this.img.src = url;
        console.log("done");
    }
    
    startEdit(){
        this.imageOldUrl = this.imageUrl;
        this.editMode = true;
        let locDir:LocationDirectory;
        for (var dir in this.selectedDirectory.directories){
            locDir = this.selectedDirectory.directories[dir];
            this.oldPositions[dir] = { x: locDir.positionInParentx, y: locDir.positionInParenty};
        }
    }
    
    discard(){
        this.imageUrl = this.imageOldUrl;
        this.editMode = false;
        let locDir:LocationDirectory;
        for (var dir in this.selectedDirectory.directories){
            locDir = this.selectedDirectory.directories[dir];
            locDir.positionInParentx = this.oldPositions[dir].x;
            locDir.positionInParenty = this.oldPositions[dir].y;
       }
    }
    
    save(){
        this.editMode = false;
        this.selectedDirectory.imageUrl = this.imageUrl;
    }
    
    
    getX(d:LocationDirectory):number{
        console.log("getX, mapWidth :" + this.map.offsetWidth);
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
        return d.positionInParenty * this.map.offsetWidth / 100;
    }
    
    getShortName(d:LocationDirectory):string{
        if (d.shortName && d.shortName.length>0){
            return d.shortName;
        }else{
            return "none";
        }
    }
    
    onDrag(drag:LocationDirectory,ev:DragMouvement){
        if(this.editMode){
            drag.positionInParentx += ev.dx * 100 / this.map.offsetWidth;
            drag.positionInParenty += ev.dy * 100 / this.map.offsetHeight;
        }
    }
    
    ngOnInit(){
        this.map = document.getElementById('map');
        this.img.onload = (event => this.imageUrl = this.img.src);
        this.img.onerror = (event => console.log("url error"));  
        this.imageExists(this.selectedDirectory.imageUrl);
    }
    
    ngOnChanges(){
        if (this.editMode){
            this.discard();
        }
        this.imageUrl = null;
        this.imageExists(this.selectedDirectory.imageUrl);
        this.editMode = false;
    }  
}

