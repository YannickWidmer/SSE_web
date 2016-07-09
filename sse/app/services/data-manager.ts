/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable } from '@angular/core';
import {StoryDataManagerMockBackend,NPCDataManagerMockBackend,LocationDataManagerMockBackend} from './data-mock-backend';
import {myDirectory,LocationDirectory} from './directory/directory'
       
export enum FileType{
    FILE,DIRECTORY
}   

export interface BaseDirectoryManager{
    getDirectory():Promise<myDirectory>;
    // This will be called when a Tree-View is created
    addDirectory(parent:myDirectory,name:string):Promise<myDirectory>;
    // This will be called when a Folder will be created from a Tree-View. 
    // The Directories should be in the same state as they where when the methdo is called!!! 
    addFile(parent:myDirectory,name:string):Promise<myDirectory>;
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
    protected directory:myDirectory;
    
    public getDirectory():Promise<myDirectory>{
        return Promise.resolve(this.getDirectoryProm());
    }
    
    private getDirectoryProm():myDirectory{
        this.directory = this.manager.getRootDirectory();
        return this.directory;
    }
    
    public getText(id:number):Promise<string>{
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
        
    public addDirectory(parent:myDirectory,name:string){
        return Promise.resolve(this.addDirectoryProm(parent,name));
    }
    
    protected addDirectoryProm(parent:myDirectory,name:string){
        let newId:number = this.manager.addFolder(parent.id,name);
        parent.directories.push(new myDirectory(newId,name));
        return this.directory;
    }
    
    public addFile(parent:myDirectory,name:string){
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
    
    protected addDirectoryProm(parent:myDirectory,name:string){
        let newId:number = this.manager.addFolder(parent.id,name);
        parent.directories.push(new LocationDirectory(newId,name,[],[],name));
        return this.directory;
    } 
    
    getLocation(id:number){
        return Promise.resolve(this.manager.getDirectory(id));
    }
    
    saveLocation(loc:LocationDirectory){
        // TODO
    }  
}
