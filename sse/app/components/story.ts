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

import {Component, Input, OnInit } from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {MarkdownService}  from '../services/markdown-converter' 


@Component({
  selector: 'my-story',
  templateUrl: 'app/components/story.html',
  //bindings: [MarkdownService]
})
export class StoryComponent implements OnInit {
    public html: string;
    private md: MarkdownService;
    
    constructor(
         private _routeParams: RouteParams, private _converter: MarkdownService) {
         this.html ='';
         this.md = _converter;
    }
    
    ngOnInit() {
    }
    
    public updateValue(val:string) {
        if(!val) { return ''; }
        this.html = this._converter.convert(val);
    }
}
