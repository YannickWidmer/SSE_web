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

import {myDirectory,myFile,Selection,FileType} from '../services/directory/directory';
import {NPCDirectoryManagerService,NPCManagerService} from  '../services/data-manager';

import {TreeView} from './tree-view/tree-view';

@Component({
  selector: 'my-npcs',
  directives: [MdEditorDisplayerComponent,TreeView],
  templateUrl: 'app/components/npc.html'
})
export class NpcsComponent  {
    private directoryManagerService: NPCDirectoryManagerService;
    private npcManagerService: NPCManagerService;
    private selection:Selection;
    private selectedDirectoryId:number;
    private selectedFileId:number;
    private fileType = FileType;
    
    constructor(private  _dataManager:NPCDirectoryManagerService,private fileManager:NPCManagerService) {
        this.directoryManagerService = _dataManager;
        this.npcManagerService = fileManager;
    }

    select(selection:Selection){
        this.selection = selection;
    }
}

