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
   
    
    toggle(){
        this.expanded = !this.expanded;
    }
}