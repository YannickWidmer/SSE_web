/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Injectable } from 'angular2/core';
import {StoryDataManagerMockBackend,LocationDataManagerMockBackend} from './data-mock-backend';
import {Directory,LocationDirectory} from './../components/directory/directory'

export interface BaseDirectoryManager{
    getDirectorys():Promise<Directory>;
    // This will be called when a Tree-View is created
    addDirectory(parent:Directory,name:string):Promise<Directory>;
    // This will be called when a Folder will be created from a Tree-View. 
    // The Directories should be in the same state as they where when the methdo is called!!! 
    addFile(parent:Directory,name:string):Promise<Directory>;
    // Similar to addFolder
}

export interface BaseMarkdownManager{
    saveText(id:number,text:string);
    getText(id:number):Promise<string>;
}

export interface BaseLocationManager{
    getLocation(id:number):Promise<LocationDirectory>;
    saveLocation(loc:LocationDirectory);
}

class BaseManagerService implements BaseDirectoryManager, BaseMarkdownManager{
    manager:StoryDataManagerMockBackend;
    protected directorys:Directory;
    
    public getDirectorys(){
        return Promise.resolve(this.getDirectorysProm());
    }
    
    private getDirectorysProm(){
        this.directorys = this.manager.getDirectorys();
        return this.directorys;
    }
    
    public getDescription(id:number){
        return Promise.resolve(this.manager.getData(id));
    }
    
    public saveHeaderData(dir:Directory){
        this.manager.saveHeaderData(dir);
    }
    
    public saveDescription(dir:Directory,descr:string){
        this.manager.save(dir.id,descr);
    }
    
    public addDirectory(parent:Directory,name:string){
        return Promise.resolve(this.addDirectoryProm(parent,name));
    }
    
    protected addDirectoryProm(parent:Directory,name:string){
        let newId:number = this.manager.addFolder(parent.id,name);
        parent.directories.push(new Directory(newId,name));
        return this.directorys;
    }
    
    public addFile(parent:Directory,name:string){
            return Promise.resolve({});
    }
    
    public saveText(id:number,text:string){
        this.manager.save(id,text);
    }
    
    public getText(id:number):Promise<string>{
        return Promise.resolve(this.manager.getData(id));
    }
}


@Injectable()
export class StoryDataManagerService extends BaseManagerService{
    
    constructor(){
        super();
        this.manager = new StoryDataManagerMockBackend();
    }
}

@Injectable()
export class LocationDataManagerService extends BaseManagerService implements BaseLocationManager{
    
    constructor(){
        super();
        this.manager = new LocationDataManagerMockBackend();
    }
    
    protected addDirectoryProm(parent:Directory,name:string){
        let newId:number = this.manager.addFolder(parent.id,name);
        parent.directories.push(new LocationDirectory(newId,name,[],[],name));
        return this.directorys;
    } 
    
    getLocation(id:number){
        return Promise.resolve(this.manager.getDirectory(id));
    }
    
    saveLocation(loc:LocationDirectory){
        // TODO
    }
}
