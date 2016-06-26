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

import {Component } from '@angular/core';

import {MdEditorDisplayerComponent}  from './markdown/markdown-editor-displayer';

import {StoryDataManagerService} from  '../services/data-manager';

import {Directory} from '../services/directory/directory';
import {TreeView} from './tree-view/tree-view';


@Component({
  selector: 'my-story',
  directives: [MdEditorDisplayerComponent,TreeView],
  templateUrl: 'app/components/story.html'
})
export class StoryComponent{
    private selectedDirectoryId:number;
    private _dataManagerService: StoryDataManagerService;
   
    
    constructor(private  _dataManager:StoryDataManagerService) {
        this._dataManagerService = _dataManager;
    }
        
    select(dir:Directory){
        this.selectedDirectoryId = dir.id;
    }
}
