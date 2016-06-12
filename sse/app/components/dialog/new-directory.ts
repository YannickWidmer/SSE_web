
import {Component, OnInit ,Input, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'my-dialog-new-directory',
  template: `
  <div class="modal-background">
    <div class="modal">
        <p class="modal-title"> enter new Directory's name</p><br/>
        <input [(ngModel)]="directoryName" placeholder="name" />\n\
        <div class="modal-buttonbar">
            <button (click)="onOk();">ok</button>
            <button (click)="onCancel();">cancel</button>
        </div>
    <div>
  </div>
`
})
    
export class NewDirectoryDialog{
    @Input() hasFile:boolean;
    @Output() onCreateFile: EventEmitter<String> = new EventEmitter();
    @Output() onCreateDirectory: EventEmitter<String> = new EventEmitter();
    @Output() onExit: EventEmitter<number> = new EventEmitter();
    
    private directoryName:string;
    
    onCancel(){
        this.directoryName ='';
        this.onExit.emit(0);
    }
    
    onOk(){
        this.onCreateDirectory.emit(this.directoryName);
         this.directoryName ='';
    }
}
