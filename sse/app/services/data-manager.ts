/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Injectable } from 'angular2/core';
import {STORYDIRS,STORYFILES} from './mock-data';

@Injectable()
export class DataManagerService{
    getStoryDirectorys(){
        return Promise.resolve(STORYDIRS);
    }
    
    getStory(id:number){
        return Promise.resolve(this.getStoryData(id));
    }
    
    private getStoryData(id:number){
        if(STORYFILES[id] != undefined){
            return STORYFILES[id];
        }else{
            return '';
        }
    }
    
    saveStory(id:number, markdown:string){
        STORYFILES[id] = markdown;
    }
}