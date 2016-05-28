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
import {DragContainer} from './draggableSVG/draggable-map';
import {NewDirectoryDialog,Toggler} from './dialog/new-directory';


import {LocationDataManagerService} from  '../services/data-manager';

import {LocationDirectory} from './directory/directory';
import {TreeView} from './tree-view/tree-view';

@Component({
  selector: 'my-geographie',
  directives: [MdEditorDisplayerComponent,TreeView,NewDirectoryDialog,DragContainer],
  templateUrl: 'app/components/geographie.html'
})
export class GeographieComponent implements OnInit {
    private selectedDirectory:LocationDirectory;
    private rawMarkdown: string;
    private _dataManagerService: LocationDataManagerService;
    private dialogNewDirToggler:Toggler ={isShowing:false};
    private directories: Array<LocationDirectory>;
    
    constructor(private  _dataManager:LocationDataManagerService) {
        this._dataManagerService = _dataManager;
    }
    
    public saveMarkdown(text:string){
        this.rawMarkdown = text;
        this._dataManagerService.save(this.selectedDirectory.id,text);
    }
    
    select(dir:LocationDirectory){
        this.selectedDirectory = dir;
        this._dataManagerService.getData(dir.id).then(mark => this.rawMarkdown = mark);
    }
    
    addFolderDialog(){
        this.dialogNewDirToggler.isShowing =  true; 
    }
    
    createFolder(name:string){
        console.log('ew');
        this._dataManagerService.addFolder(this.selectedDirectory, name).then(dirs => this.directories = <LocationDirectory[]>[dirs]);
    }
    
    ngOnInit() {
        this._dataManagerService.getDirectorys().then(dirs =>this.directories = <LocationDirectory[]>[dirs]);
    }
}

