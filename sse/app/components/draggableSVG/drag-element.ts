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
 
import {Component,Input,Output,EventEmitter,HostListener} from 'angular2/core';

export interface DragMouvement{
    dx:number;
    dy:number;
}

@Component({
    selector: 'my-draggable',
    template: '<p id="draggable" [style.left]="getLeft()"  [style.top]="getTop()">{{name}}</p>'
})
export class DragElement {

    @Input() x:number;
    @Input() y:number;
    @Input() name:string;
    @Input() editMode:boolean;
    
    getLeft():string{
         return this.x+"px";
    }
    getTop():string{
         return this.y+"px";
    }

    @Output() onDrag: EventEmitter<DragMouvement>= new EventEmitter();
    private last: MouseEvent;
    private mouseDown : boolean = false;

    @HostListener('mousedown', ['$event'])
    onMousedown(event:MouseEvent) {
        if (this.editMode){
            event.preventDefault();
            this.mouseDown = true;
            this.last = event;
        }
    }

    @HostListener('mouseup', ['$event'])
    onMouseup(event:MouseEvent) {
        if(this.editMode){
            event.preventDefault();
            this.mouseDown = false;
        }
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        if (this.editMode && this.mouseDown) {
            event.preventDefault();
            this.onDrag.emit({dx:event.clientX - this.last.clientX, dy:event.clientY - this.last.clientY})  
            this.last = event;  
        }
    }
}
