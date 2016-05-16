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
 
import {Component,ViewChild,ElementRef,HostListener} from 'angular2/core';

@Component({
    selector: 'my-draggable',
    template: '<p id="draggable" [style.left]="getLeft()"  [style.top]="getTop()">draggable</p>'
})
export class DragElement {
    @ViewChild('canvas') 
    canvas: ElementRef;
    private styler:string;
    private x:number = 70;
    private y: number = 10;
    private width:number;
    private height:number;

    private last: MouseEvent;
    private el: HTMLElement;
    private container:ClientRect;

    private mouseDown : boolean = false;

    @HostListener('mousedown', ['$event'])
    onMousedown(event) {
        console.log("setposition");
        this.mouseDown = true;
        this.last = event;
    }

    @HostListener('mouseup', ['$event'])
    onMouseup(event) {
        console.log("setposition");
        this.mouseDown = false;
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        console.log("setposition");
        if(this.mouseDown) {
              this.x +=event.clientX - this.last.clientX;
              this.y +=event.clientY - this.last.clientY;  
              this.last = event;
              this.setPosition();
        }
    }

    constructor(elementRef: ElementRef) {
        this.el = elementRef.nativeElement;
        this.container = this.el.parentElement.getBoundingClientRect(); 
        this.width = this.el.offsetWidth;
        this.height = this.el.offsetHeight;
    }
    
    
      // Move element, within container if provided
    setPosition() {
        console.log("before setposition x:" + this.x + " y: "+ this.y);
        console.log("width :" + this.width+ " heigth: " + this.height);
        /*if (this.container) {
          if (this.x < this.container.left) {
            this.x = this.container.left;
          } else if (this.x > this.container.right - this.width) {
            this.x = this.container.right - this.width;
          }
          if (this.y < this.container.top) {
            this.y = this.container.top;
          } else if (this.y > this.container.bottom - this.height) {
            this.y = this.container.bottom - this.height;
          }
        }
        console.log("setposition x:" + this.x + " y: "+ this.y);
        this.el.style.left = this.x + 'px';*/
     };
     
     getLeft():string{
         return this.x+"px";
     }
     getTop():string{
         return this.y+"px";
     }
}
