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

import {Component} from '@angular/core';
import {MdEditorDisplayerComponent}  from './markdown/markdown-editor-displayer';

import {myDirectory,myFile} from '../services/directory/directory';
import {NPCDataManagerService} from  '../services/data-manager';

import {TreeView} from './tree-view/tree-view';

@Component({
  selector: 'my-npcs',
  directives: [MdEditorDisplayerComponent,TreeView],
  templateUrl: 'app/components/npc.html'
})
export class NpcsComponent  {
    private _dataManagerService: NPCDataManagerService;
    private selectedDirectoryId:number;
    private selectedFileId:number;
    
    constructor(private  _dataManager:NPCDataManagerService) {
        this._dataManagerService = _dataManager;
    }

    selectDirectory(dir:myDirectory){
        this.selectedDirectoryId = dir.id;
        this.selectedFileId = null;
    }

    selectFile(fil:myFile){
       this.selectedDirectoryId = null;
       this.selectedFileId = fil.id;
    }
}

