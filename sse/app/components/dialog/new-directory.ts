
import {Component, OnInit ,Input, Output, EventEmitter} from 'angular2/core';

export interface Toggler{
   isShowing:boolean;
}

@Component({
  selector: 'my-dialog-new-directory',
  template: `
  <div class="modal-background" *ngIf="toggler.isShowing">
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
    
export class NewDirectoryDialog implements OnInit {
    @Input()  toggler:Toggler;
    @Output() onResultOk: EventEmitter<String> = new EventEmitter();
    private directoryName:string;
    ngOnInit() {
    }
    onCancel(){
        this.directoryName ='';
        this.toggler.isShowing=false;
    }
    
    onOk(){
        this.onResultOk.emit(this.directoryName);
        this.onCancel();
    }
}
