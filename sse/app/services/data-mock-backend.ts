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

import {Injectable } from '@angular/core';
import {STORYDIRS,STORY_TEXT,NEXTID, LOCATIONDIRS,LOCATION_TEXT, NPCDIRS,NPC_DIR_TEXT,NPC_FILE_TEXT} from './mock-data';
import {myDirectory} from './directory/directory'


export class BaseDataManagerMockBackend{
    protected dir:myDirectory;
    protected fileTexts:string[];
    protected directoryTexts:string[];
    
    getRootDirectory(){
        return this.dir;
    }
    
    getDirectory(id:number){
        if(this.dir.id == id){
            return this.dir;
        }
        return this.getDirectoryIn(id, this.dir);
    }
    
    private getDirectoryIn(id:number, dir:myDirectory){
        
        for (let d of dir.directories){
            if(d.id == id ){
                return d;
            }
            let di = this.getDirectoryIn(id,d);
            if(di){
                return di;
            }
        }
        return null;
    }
    
    
    getDirectoryText(id:number){
        return this.getDataFile(id,this.directoryTexts);
    }
    
    getFileText(id:number){
        return this.getDataFile(id,this.fileTexts);
    }
    
    private getDataFile(id:number,texts:string[]){
        if(texts != undefined && texts[id] != undefined){
            return texts[id];
        }else{
            return '';
        }
    }
        
    saveDirectoryText(id:number, markdown:string){
        if (this.directoryTexts){
            this.directoryTexts[id] = markdown;
        }
    }
    
    saveFileText(id:number, markdown:string){
        if (this.fileTexts){
            this.fileTexts[id] = markdown;
        }
    }

    
    public addFolder(parentId:number,name:string){
        return NEXTID();
    }    
    
    public addFile(parentId:number,name:string){
        return NEXTID();
    } 
}

@Injectable()
export class StoryDataManagerMockBackend extends BaseDataManagerMockBackend{
    constructor(){
        super();
        this.dir = STORYDIRS;
        this.directoryTexts = STORY_TEXT;
    }    
}

@Injectable()
export class LocationDataManagerMockBackend extends BaseDataManagerMockBackend{
    constructor(){
        super();
        this.dir = LOCATIONDIRS;
        this.directoryTexts = LOCATION_TEXT;
    }    
}

@Injectable()
export class NPCDataManagerMockBackend extends BaseDataManagerMockBackend{
    constructor(){
        super();
        this.dir = NPCDIRS;
        this.directoryTexts = NPC_DIR_TEXT;
        this.fileTexts = NPC_FILE_TEXT;
    }    
}