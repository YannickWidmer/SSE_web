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

import {Component, OnInit } from 'angular2/core';

import {MdEditorDisplayerComponent}  from './markdown/markdown-editor-displayer';
import {NewDirectoryDialog,Toggler} from './dialog/new-directory';

import {StoryDataManagerService} from  '../services/data-manager';

import {Directory} from './directory/directory';
import {TreeView} from './tree-view/tree-view';


@Component({
  selector: 'my-story',
  directives: [MdEditorDisplayerComponent,TreeView,NewDirectoryDialog],
  templateUrl: 'app/components/story.html'
})
export class StoryComponent implements OnInit {
    private selectedDirectory:Directory;
    private rawMarkdown: string;
    private _dataManagerService: StoryDataManagerService;
    private dialogNewDirToggler:Toggler ={isShowing:false};
    private directories: Array<Directory>;
    
    constructor(private  _dataManager:StoryDataManagerService) {
        this._dataManagerService = _dataManager;
    }
    
    public saveMarkdown(text:string){
        this.rawMarkdown = text;
        this._dataManagerService.save(this.selectedDirectory.id,text);
    }
    
    select(dir:Directory){
        this.selectedDirectory = dir;
        this._dataManagerService.getData(dir.id).then(mark => this.rawMarkdown = mark);
    }
    
    addFolderDialog(){
        this.dialogNewDirToggler.isShowing =  true; 
    }
    
    createFolder(name:string){
        console.log('ew');
        this._dataManagerService.addFolder(this.selectedDirectory, name).then(dirs => this.directories = [dirs]);
    }
    
    ngOnInit() {
        this._dataManagerService.getDirectorys().then(dirs =>this.directories = [dirs]);
    }
}
