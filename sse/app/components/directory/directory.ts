/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
interface File{
    name:string; 
    id:number;
}

export class Directory{
    name: string;
    id:number;
    directories: Array<Directory>;
    files: Array<File>;
    expanded:boolean;
    constructor(id:number,name:string,directories:Array<Directory> = [],files:Array<File> = []) {
        this.name = name;
        this.id = id;
        this.files = files;
        this.directories = directories;
        this.expanded = false;
    }
   
    isEmpty(){
        return this.directories.length == 0 && this.files.length == 0; 
    }
    
    toggle(){
        this.expanded = !this.expanded;
    }
}

export class LocationDirectory extends Directory{
    shortName: string;
    imageUrl: string;
    positionInParentx:number;
    directories: Array<LocationDirectory>;
    positionInParenty:number;
    constructor(id:number,name:string,directories:Array<Directory> = [],files:Array<File> = [],
        shortName: string="",imageUrl: string="",positionInParentx:number=0,positionInParenty:number=0) {
        super(id,name,directories,files);
        if(shortName!==""){
            this.shortName = shortName;
        }else{
            this.shortName = name;
        }
        this.imageUrl = imageUrl;
        this.positionInParentx = positionInParentx;
        this.positionInParenty = positionInParenty;
    }
}