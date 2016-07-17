
import {Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';

enum STATE{
    CHOSE_DIRECTORY_OR_FILE,
    FILE,
    DIRECTORY
}


@Component({
  selector: 'my-dialog-new-directory',
  template: `
  <div   class="modal-background">
    
    <div *ngIf="state == STATE.DIRECTORY" class="modal">
        <p class="modal-title"> enter new Directory's name</p><br/>
        <input [(ngModel)]="inputString" placeholder="name" />
        <div class="modal-buttonbar">
            <button (click)="onOk();">ok</button>
            <button (click)="onCancel();">cancel</button>
        </div>
    <div>

    <div *ngIf="state == STATE.FILE"  class="modal">
        <p class="modal-title"> enter new File's name</p><br/>
        <input [(ngModel)]="inputString" placeholder="name" />
        <div class="modal-buttonbar">
            <button (click)="onOk();">ok</button>
            <button (click)="onCancel();">cancel</button>
        </div>
    <div>

    <div *ngIf="state == STATE.CHOSE_DIRECTORY_OR_FILE" class="modal">
        <p class="modal-title"> What should it be?</p><br/>
        <div class="modal-buttonbar">
            <button (click)="state = STATE.DIRECTORY">directory</button>
            <button (click)="state = STATE.FILE">file</button>
        </div>
    <div>
  </div>
`
})
    
export class NewDirectoryDialog implements OnInit{
    @Input() hasFile:boolean;
    @Output() onCreateFile: EventEmitter<String> = new EventEmitter<String>();
    @Output() onCreateDirectory: EventEmitter<String> = new EventEmitter<String>();
    @Output() onExit: EventEmitter<number> = new EventEmitter<number>();
    
    public STATE = STATE; 
    private state:STATE = STATE.DIRECTORY;
    
    private inputString:string;
    
    ngOnInit(){
        if(!this.hasFile){
            console.log("no files " )
            this.state = STATE.DIRECTORY;
        }else{
            console.log("has files " )            
            this.state = STATE.CHOSE_DIRECTORY_OR_FILE;
        }
    }

    onCancel(){
        this.inputString ='';
        this.onExit.emit(0);
    }
    
    onOk(){
        this.onCreateDirectory.emit(this.inputString);
         this.inputString ='';
    }
}
