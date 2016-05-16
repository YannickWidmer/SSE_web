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

import {Component, Input,Output,EventEmitter, OnInit,SimpleChange } from 'angular2/core';


import {MarkdownService}  from '../../services/markdown-converter' 


@Component({
  selector: 'my-markdown-displayer-editor',
  template: `
	<div>
          <i *ngIf="!editMode" class="material-icons" style="float: right;"
                (click)="editMode = true;  edit();">mode_edit</i>  
          <i *ngIf="editMode" class="material-icons" style="float: right;"
                (click)="editMode = false; discard();">clear</i>
          <i *ngIf="editMode" class="material-icons" style="float: right;"
                (click)="editMode = false; save();">save</i>
          
                
	  <div *ngIf="editMode">
            <textarea style="width:100%; resize: vertical;" 
                [(ngModel)]="raw_temp" (keyup)="updateValue()"></textarea>
	  </div>
	  <div style="width:100%;">
            <div innerHtml={{html}}></div>
	  </div>
         </div>` 
})
export class MdEditorDisplayerComponent implements OnInit {
    public html: string;
    private raw_temp: string;
    private md: MarkdownService;
    
    @Input() markdownText: string;
    @Output() onSave: EventEmitter<string> = new EventEmitter();
    
    constructor(private _converter: MarkdownService) {
        this.md = _converter;
    }
    
    ngOnInit() {
    }
    
    
    public updateValue() {
        this.html = this._converter.convert(this.raw_temp);
    }
    
    public save(){
        this.markdownText = this.raw_temp;
        this.onSave.emit(this.markdownText);
    }
    
    public discard(){
        this.raw_temp = this.markdownText;
        this.updateValue();
    }
    
    ngOnChanges(changes:{[propName:string]:SimpleChange}){
        this.raw_temp = this.markdownText;
        this.updateValue();
         console.log('ngOnChanges - myProp = ' + changes['markdownText'].currentValue);
    }
    
}
