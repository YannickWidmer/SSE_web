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

import {Component, Input,Output,EventEmitter, OnInit,SimpleChange } from '@angular/core';

import {BaseMarkdownManager} from  '../../services/data-manager';
import {MarkdownService}  from '../../services/markdown-converter';
import {FileInterface} from '../../services/directory/directory' 


@Component({
  selector: 'my-markdown-displayer-editor',
  template: `
         <div>
	 <div class="buttonbar">
            <i *ngIf="!editMode" class="material-icons"
                (click)="edit();">mode_edit</i>
            <i *ngIf="editMode" class="material-icons"
                (click)="discard();">undo</i>
            <i *ngIf="editMode" class="material-icons" 
                (click)="save();">save</i>
            <p  *ngIf="!raw_temp">Edit to add <a target="_blank" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">Markdown</a></p>  
          </div>    
	  <div *ngIf="editMode">
            <textarea style="width:100%; resize: vertical;" 
                [(ngModel)]="raw_temp" (keyup)="updateValue()"></textarea>
	  </div>
	  <div style="width:100%;">
            <div innerHtml={{html}}></div>
	  </div>
            </div>` 
})
export class MdEditorDisplayerComponent {
    private html: string;
    private raw_temp: string;
    private markdownText:string;
    private md: MarkdownService;
    private editMode:boolean;
    
    @Input() manager: BaseMarkdownManager;
    @Input() selectedFile: FileInterface;
    
    constructor(private _converter: MarkdownService) {
        this.md = _converter;
    }
    
    
    public updateValue() {
        this.html = this._converter.convert(this.raw_temp);
    }
    
    public edit(){
        this.editMode = true;
    }
       
    public save(){
        this.editMode = false;
        this.markdownText = this.raw_temp;
        this.manager.saveText(this.selectedFile,this.markdownText);
    }
    
    public discard(){
        this.editMode = false;
        this.raw_temp = this.markdownText;
        this.updateValue();
    }
    
    ngOnChanges(changes:{[propName:string]:SimpleChange}){
        this.editMode = false;
        this.raw_temp = '';
        this.markdownText = '';
        this.updateValue();
        this.manager.getText(this.selectedFile).then(raw => this.setValue(raw));
    }
    
    private setValue(text:string) {
        this.markdownText = text;
        this.raw_temp = text;
        this.html = this._converter.convert(this.raw_temp);
    }
    
}
