/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Injectable } from 'angular2/core';
import {STORYDIRS,STORYFILES,NEXTID, LOCATIONDIRS,LOCATIONFILES} from './mock-data';
import {Directory} from './../components/tree-view/directory'

class Base{
    protected dirs:Directory;
    protected files;
    
    getDirectorys(){
        return Promise.resolve(this.dirs);
    }
        
    getData(id:number){
        return Promise.resolve(this.getDataFile(id));
    }
    
    private getDataFile(id:number){
        if(this.files[id] != undefined){
            return this.files[id];
        }else{
            return '';
        }
    }
    
    save(id:number, markdown:string){
        this.files[id] = markdown;
    }
    
    public addFolder(parent:Directory,name:string){
        return Promise.resolve(this.addFolderData(parent,name));
    }
    
    private addFolderData(parent:Directory,name:string){
        for (var key in this.dirs.directories){
            this.searchParentAddNewFolder(this.dirs.directories[key], parent.id,name);
        }
        return this.dirs;
    }
    
    private searchParentAddNewFolder(dir:Directory,parentId:number,name:string){
        if (dir.id === parentId)
            dir.directories.push(new Directory(NEXTID(),name));
        else{
            for (var key in dir.directories){
                this.searchParentAddNewFolder(dir.directories[key],parentId,name);
            }
        }
    }
}

@Injectable()
export class StoryDataManagerService extends Base{
    constructor(){
        super();
        this.dirs = STORYDIRS;
        this.files = STORYFILES;
    }    
}

@Injectable()
export class LocationDataManagerService extends Base{
    constructor(){
        super();
        this.dirs = LOCATIONDIRS;
        this.files = LOCATIONFILES;
    }    
}
