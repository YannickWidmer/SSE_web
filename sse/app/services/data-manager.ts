/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable } from '@angular/core';
import {StoryDataManagerMockBackend,NPCDataManagerMockBackend,LocationDataManagerMockBackend} from './data-mock-backend';
import {Directory,LocationDirectory} from './directory/directory'
       
export enum FileType{
    FILE,DIRECTORY
}   

export interface BaseDirectoryManager{
    getDirectorys():Promise<Directory>;
    // This will be called when a Tree-View is created
    addDirectory(parent:Directory,name:string):Promise<Directory>;
    // This will be called when a Folder will be created from a Tree-View. 
    // The Directories should be in the same state as they where when the methdo is called!!! 
    addFile(parent:Directory,name:string):Promise<Directory>;
    // Similar to addFolder
    setFileType(typ:FileType);
}

export interface BaseMarkdownManager{
    // This is a state machine which is supposed to now if it is working with a file or a Directory, hence we don't see it here
    saveText(id:number,text:string);
    getText(id:number):Promise<string>;
}

export interface BaseLocationManager{
    getLocation(id:number):Promise<LocationDirectory>;
    saveLocation(loc:LocationDirectory);
}

class BaseManagerService implements BaseDirectoryManager, BaseMarkdownManager{
    manager:StoryDataManagerMockBackend;
    fileType:FileType = FileType.DIRECTORY;
    protected directorys:Directory;
    
    public getDirectorys(){
        return Promise.resolve(this.getDirectorysProm());
    }
    
    private getDirectorysProm(){
        this.directorys = this.manager.getDirectorys();
        return this.directorys;
    }
    
    public getText(id:number){
        if (this.fileType == FileType.DIRECTORY){
            return Promise.resolve(this.manager.getDirectoryText(id));
        }else{
            return Promise.resolve(this.manager.getFileText(id));
        }
    }
    
    public saveText(id:number,descr:string){
        if (this.fileType == FileType.DIRECTORY){
            this.manager.saveDirectoryText(id,descr);
        }else{
            this.manager.saveFileText(id,descr);
        }
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
    
    public setFileType(t:FileType){
        this.fileType = t;
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
export class NPCDataManagerService extends BaseManagerService{
    
    constructor(){
        super();
        this.manager = new NPCDataManagerMockBackend();
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
