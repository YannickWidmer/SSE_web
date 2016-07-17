/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable } from '@angular/core';
import {BaseDataManagerMockBackend ,StoryDataManagerMockBackend,NPCDataManagerMockBackend,LocationDataManagerMockBackend} from './data-mock-backend';
import {myDirectory,FileInterface,LocationDirectory} from './directory/directory'
       

export interface BaseDirectoryManager{
    getDirectory():Promise<myDirectory>;
    // This will be called when a Tree-View is created
    addDirectory(parent:myDirectory,name:string):Promise<myDirectory>;
    // This will be called when a Folder will be created from a Tree-View. 
    // The Directories should be in the same state as they where when the methdo is called!!! 
    addFile(parent:myDirectory,name:string):Promise<myDirectory>;
}

export interface BaseMarkdownManager{
    // This is a state machine which is supposed to now if it is working with a file or a Directory, hence we don't see it here
    saveText(dir:FileInterface,text:string);
    getText(dir:FileInterface):Promise<string>;
}

export interface BaseLocationManager{
    getLocation(id:number):Promise<LocationDirectory>;
    saveLocation(loc:LocationDirectory);
}

class BaseTextManagerService implements BaseMarkdownManager{
    manager:BaseDataManagerMockBackend;

    public getText(dir:myDirectory):Promise<string>{
       return Promise.resolve(this.getTextProm(dir));
    }

    private getTextProm(dir:myDirectory):string{
        if(dir.text == null){
            dir.text =this.manager.getDirectoryText(dir.id);
        }
        return dir.text;
    }
    
    public saveText(dir:FileInterface,text:string){
        this.manager.saveDirectoryText(dir.id,text);
        dir.text = text;
    }
}

class BaseManagerService extends BaseTextManagerService implements BaseDirectoryManager{

    protected directory:myDirectory;
    
    public getDirectory():Promise<myDirectory>{
        return Promise.resolve(this.getDirectoryProm());
    }
    
    private getDirectoryProm():myDirectory{
        if(this.directory == null){
            this.directory = this.manager.getRootDirectory();
        }
        return this.directory;
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
}


@Injectable()
export class StoryDirectoryManagerService extends BaseManagerService{
    
    constructor(){
        super();
        this.manager = new StoryDataManagerMockBackend();
    }
}

@Injectable()
export class NPCDirectoryManagerService extends BaseManagerService{
    
    constructor(){
        super();
        this.manager = new NPCDataManagerMockBackend();
    }
}

@Injectable()
export class NPCManagerService extends BaseTextManagerService{
    
    constructor(){
        super();
        this.manager = new NPCDataManagerMockBackend();
    }
}


@Injectable()
export class LocationDirectroyManagerServices extends BaseManagerService implements BaseLocationManager{
    
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
