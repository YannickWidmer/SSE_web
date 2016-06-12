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

import {Injectable } from 'angular2/core';
import {STORYDIRS,STORYFILES,NEXTID, LOCATIONDIRS,LOCATIONFILES} from './mock-data';
import {Directory} from './../components/directory/directory'


export class BaseDataManagerMockBackend{
    protected dirs:Directory;
    protected files;
    
    getDirectorys(){
        return this.dirs;
    }
    
    getDirectory(id:number){
        if(this.dirs.id == id){
            return this.dirs;
        }
        return this.getDirectoryIn(id, this.dirs);
    }
    
    private getDirectoryIn(id:number, dir:Directory){
        
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
        
    getData(id:number){
        return this.getDataFile(id);
    }
    
    private getDataFile(id:number){
        if(this.files[id] != undefined){
            return this.files[id];
        }else{
            return '';
        }
    }
    
    saveHeaderData(dir:Directory){
        // TODO when Backend is ready
    }
    
    save(id:number, markdown:string){
        this.files[id] = markdown;
    }
    
    public addFolder(parentId:number,name:string){
        return NEXTID();
    }     
}

@Injectable()
export class StoryDataManagerMockBackend extends BaseDataManagerMockBackend{
    constructor(){
        super();
        this.dirs = STORYDIRS;
        this.files = STORYFILES;
    }    
}

@Injectable()
export class LocationDataManagerMockBackend extends BaseDataManagerMockBackend{
    constructor(){
        super();
        this.dirs = LOCATIONDIRS;
        this.files = LOCATIONFILES;
    }    
}
