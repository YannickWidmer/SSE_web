var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
System.register("services/markdown-converter", ['angular2/core', 'marked'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, marked_1;
    var MarkdownService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (marked_1_1) {
                marked_1 = marked_1_1;
            }],
        execute: function() {
            MarkdownService = (function () {
                function MarkdownService() {
                    this.md = marked_1.default.setOptions({});
                }
                MarkdownService.prototype.setConfig = function (config) {
                    this.md = marked_1.default.setOptions(config);
                };
                MarkdownService.prototype.convert = function (markdown) {
                    if (!markdown) {
                        return '';
                    }
                    //return "hallo" + markdown;
                    return this.md.parse(markdown);
                };
                MarkdownService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MarkdownService);
                return MarkdownService;
            }());
            exports_1("MarkdownService", MarkdownService);
        }
    }
});
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
System.register("components/directory/directory", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Directory, LocationDirectory;
    return {
        setters:[],
        execute: function() {
            Directory = (function () {
                function Directory(id, name, directories, files) {
                    if (directories === void 0) { directories = []; }
                    if (files === void 0) { files = []; }
                    this.name = name;
                    this.id = id;
                    this.files = files;
                    this.directories = directories;
                    this.expanded = false;
                }
                Directory.prototype.isEmpty = function () {
                    return this.directories.length == 0 && this.files.length == 0;
                };
                Directory.prototype.toggle = function () {
                    this.expanded = !this.expanded;
                };
                return Directory;
            }());
            exports_2("Directory", Directory);
            LocationDirectory = (function (_super) {
                __extends(LocationDirectory, _super);
                function LocationDirectory(id, name, directories, files, shortName, imageUrl, positionInParentx, positionInParenty) {
                    if (directories === void 0) { directories = []; }
                    if (files === void 0) { files = []; }
                    if (shortName === void 0) { shortName = ""; }
                    if (imageUrl === void 0) { imageUrl = ""; }
                    if (positionInParentx === void 0) { positionInParentx = 0; }
                    if (positionInParenty === void 0) { positionInParenty = 0; }
                    _super.call(this, id, name, directories, files);
                    if (shortName !== "") {
                        this.shortName = shortName;
                    }
                    else {
                        this.shortName = name;
                    }
                    this.imageUrl = imageUrl;
                    this.positionInParentx = positionInParentx;
                    this.positionInParenty = positionInParenty;
                }
                return LocationDirectory;
            }(Directory));
            exports_2("LocationDirectory", LocationDirectory);
        }
    }
});
System.register("services/mock-data", ["components/directory/directory"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var directory_1;
    var STORYDIRS, STORYFILES, LOCATIONFILES, LOCATIONDIRS, NEXTIDN;
    function NEXTID() {
        return ++NEXTIDN;
    }
    exports_3("NEXTID", NEXTID);
    return {
        setters:[
            function (directory_1_1) {
                directory_1 = directory_1_1;
            }],
        execute: function() {
            exports_3("STORYDIRS", STORYDIRS = new directory_1.Directory(1, "Main", [
                new directory_1.Directory(2, "main story", [
                    new directory_1.Directory(3, "act 1"),
                    new directory_1.Directory(4, "act 2")
                ]),
                new directory_1.Directory(5, "side story", [
                    new directory_1.Directory(6, "Le tonneau"),
                    new directory_1.Directory(7, "la princesse")
                ])
            ]));
            exports_3("STORYFILES", STORYFILES = {}), exports_3("LOCATIONFILES", LOCATIONFILES = {});
            exports_3("LOCATIONDIRS", LOCATIONDIRS = new directory_1.LocationDirectory(1, "Valandria", [
                new directory_1.LocationDirectory(2, "Avast", [
                    new directory_1.LocationDirectory(3, "Gandar")
                ]),
                new directory_1.LocationDirectory(4, "Tryvian", [
                    new directory_1.LocationDirectory(5, "Das Rhonads Gebirge")
                ])
            ]));
            NEXTIDN = 7;
        }
    }
});
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
System.register("services/data-manager", ['angular2/core', "services/mock-data", "components/directory/directory"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_2, mock_data_1, directory_2;
    var Base, StoryDataManagerService, LocationDataManagerService;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (mock_data_1_1) {
                mock_data_1 = mock_data_1_1;
            },
            function (directory_2_1) {
                directory_2 = directory_2_1;
            }],
        execute: function() {
            Base = (function () {
                function Base() {
                }
                Base.prototype.getDirectorys = function () {
                    return Promise.resolve(this.dirs);
                };
                Base.prototype.getData = function (id) {
                    return Promise.resolve(this.getDataFile(id));
                };
                Base.prototype.getDataFile = function (id) {
                    if (this.files[id] != undefined) {
                        return this.files[id];
                    }
                    else {
                        return '';
                    }
                };
                Base.prototype.save = function (id, markdown) {
                    this.files[id] = markdown;
                };
                Base.prototype.addFolder = function (parent, name) {
                    return Promise.resolve(this.addFolderData(parent, name));
                };
                Base.prototype.addFolderData = function (parent, name) {
                    for (var key in this.dirs.directories) {
                        this.searchParentAddNewFolder(this.dirs.directories[key], parent.id, name);
                    }
                    return this.dirs;
                };
                Base.prototype.searchParentAddNewFolder = function (dir, parentId, name) {
                    if (dir.id === parentId)
                        dir.directories.push(new directory_2.Directory(mock_data_1.NEXTID(), name));
                    else {
                        for (var key in dir.directories) {
                            this.searchParentAddNewFolder(dir.directories[key], parentId, name);
                        }
                    }
                };
                return Base;
            }());
            StoryDataManagerService = (function (_super) {
                __extends(StoryDataManagerService, _super);
                function StoryDataManagerService() {
                    _super.call(this);
                    this.dirs = mock_data_1.STORYDIRS;
                    this.files = mock_data_1.STORYFILES;
                }
                StoryDataManagerService = __decorate([
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], StoryDataManagerService);
                return StoryDataManagerService;
            }(Base));
            exports_4("StoryDataManagerService", StoryDataManagerService);
            LocationDataManagerService = (function (_super) {
                __extends(LocationDataManagerService, _super);
                function LocationDataManagerService() {
                    _super.call(this);
                    this.dirs = mock_data_1.LOCATIONDIRS;
                    this.files = mock_data_1.LOCATIONFILES;
                }
                LocationDataManagerService = __decorate([
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], LocationDataManagerService);
                return LocationDataManagerService;
            }(Base));
            exports_4("LocationDataManagerService", LocationDataManagerService);
        }
    }
});
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
System.register("components/markdown/markdown-editor-displayer", ['angular2/core', "services/markdown-converter"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_3, markdown_converter_1;
    var MdEditorDisplayerComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (markdown_converter_1_1) {
                markdown_converter_1 = markdown_converter_1_1;
            }],
        execute: function() {
            MdEditorDisplayerComponent = (function () {
                function MdEditorDisplayerComponent(_converter) {
                    this._converter = _converter;
                    this.onSave = new core_3.EventEmitter();
                    this.md = _converter;
                }
                MdEditorDisplayerComponent.prototype.ngOnInit = function () {
                };
                MdEditorDisplayerComponent.prototype.updateValue = function () {
                    this.html = this._converter.convert(this.raw_temp);
                };
                MdEditorDisplayerComponent.prototype.save = function () {
                    this.markdownText = this.raw_temp;
                    this.onSave.emit(this.markdownText);
                };
                MdEditorDisplayerComponent.prototype.discard = function () {
                    this.raw_temp = this.markdownText;
                    this.updateValue();
                };
                MdEditorDisplayerComponent.prototype.ngOnChanges = function (changes) {
                    this.raw_temp = this.markdownText;
                    this.updateValue();
                    console.log('ngOnChanges - myProp = ' + changes['markdownText'].currentValue);
                };
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', String)
                ], MdEditorDisplayerComponent.prototype, "markdownText", void 0);
                __decorate([
                    core_3.Output(), 
                    __metadata('design:type', core_3.EventEmitter)
                ], MdEditorDisplayerComponent.prototype, "onSave", void 0);
                MdEditorDisplayerComponent = __decorate([
                    core_3.Component({
                        selector: 'my-markdown-displayer-editor',
                        template: "\n         <div>\n\t <div class=\"buttonbar\">\n            <i *ngIf=\"!editMode\" class=\"material-icons\"\n                (click)=\"editMode = true;  edit();\">mode_edit</i>\n            <i *ngIf=\"editMode\" class=\"material-icons\"\n                (click)=\"editMode = false; discard();\">clear</i>\n            <i *ngIf=\"editMode\" class=\"material-icons\" \n                (click)=\"editMode = false; save();\">save</i>\n            <p  *ngIf=\"!raw_temp\">Edit to add <a target=\"_blank\" href=\"https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\">Markdown</a></p>  \n          </div>    \n\t  <div *ngIf=\"editMode\">\n            <textarea style=\"width:100%; resize: vertical;\" \n                [(ngModel)]=\"raw_temp\" (keyup)=\"updateValue()\"></textarea>\n\t  </div>\n\t  <div style=\"width:100%;\">\n            <div innerHtml={{html}}></div>\n\t  </div>\n            </div>"
                    }), 
                    __metadata('design:paramtypes', [markdown_converter_1.MarkdownService])
                ], MdEditorDisplayerComponent);
                return MdEditorDisplayerComponent;
            }());
            exports_5("MdEditorDisplayerComponent", MdEditorDisplayerComponent);
        }
    }
});
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
System.register("components/draggableSVG/drag-element", ['angular2/core'], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_4;
    var DragElement;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            }],
        execute: function() {
            DragElement = (function () {
                function DragElement() {
                    this.onDrag = new core_4.EventEmitter();
                    this.mouseDown = false;
                }
                DragElement.prototype.getLeft = function () {
                    return this.x + "px";
                };
                DragElement.prototype.getTop = function () {
                    return this.y + "px";
                };
                DragElement.prototype.onMousedown = function (event) {
                    if (this.editMode) {
                        event.preventDefault();
                        this.mouseDown = true;
                        this.last = event;
                    }
                };
                DragElement.prototype.onMouseup = function (event) {
                    if (this.editMode) {
                        event.preventDefault();
                        this.mouseDown = false;
                    }
                };
                DragElement.prototype.onMousemove = function (event) {
                    if (this.editMode && this.mouseDown) {
                        event.preventDefault();
                        this.onDrag.emit({ dx: event.clientX - this.last.clientX, dy: event.clientY - this.last.clientY });
                        this.last = event;
                    }
                };
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Number)
                ], DragElement.prototype, "x", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Number)
                ], DragElement.prototype, "y", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', String)
                ], DragElement.prototype, "name", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Boolean)
                ], DragElement.prototype, "editMode", void 0);
                __decorate([
                    core_4.Output(), 
                    __metadata('design:type', core_4.EventEmitter)
                ], DragElement.prototype, "onDrag", void 0);
                __decorate([
                    core_4.HostListener('mousedown', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [MouseEvent]), 
                    __metadata('design:returntype', void 0)
                ], DragElement.prototype, "onMousedown", null);
                __decorate([
                    core_4.HostListener('mouseup', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [MouseEvent]), 
                    __metadata('design:returntype', void 0)
                ], DragElement.prototype, "onMouseup", null);
                __decorate([
                    core_4.HostListener('mousemove', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [MouseEvent]), 
                    __metadata('design:returntype', void 0)
                ], DragElement.prototype, "onMousemove", null);
                DragElement = __decorate([
                    core_4.Component({
                        selector: 'my-draggable',
                        template: '<p id="draggable" [style.left]="getLeft()"  [style.top]="getTop()">{{name}}</p>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], DragElement);
                return DragElement;
            }());
            exports_6("DragElement", DragElement);
        }
    }
});
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
System.register("components/draggableSVG/draggable-map", ['angular2/core', "components/directory/directory", "components/draggableSVG/drag-element"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, directory_3, drag_element_1;
    var MapPoints, DragContainer;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (directory_3_1) {
                directory_3 = directory_3_1;
            },
            function (drag_element_1_1) {
                drag_element_1 = drag_element_1_1;
            }],
        execute: function() {
            MapPoints = (function () {
                function MapPoints() {
                }
                return MapPoints;
            }());
            DragContainer = (function () {
                function DragContainer() {
                    this.editMode = false;
                    this.img = new Image();
                    this.oldPositions = [];
                }
                DragContainer.prototype.imageExists = function (url) {
                    console.log("checking URL:");
                    console.log(url);
                    this.img.src = url;
                    console.log("done");
                };
                DragContainer.prototype.startEdit = function () {
                    this.imageOldUrl = this.imageUrl;
                    this.editMode = true;
                    var locDir;
                    for (var dir in this.selectedDirectory.directories) {
                        locDir = this.selectedDirectory.directories[dir];
                        this.oldPositions[dir] = { x: locDir.positionInParentx, y: locDir.positionInParenty };
                    }
                };
                DragContainer.prototype.discard = function () {
                    this.imageUrl = this.imageOldUrl;
                    this.editMode = false;
                    var locDir;
                    for (var dir in this.selectedDirectory.directories) {
                        locDir = this.selectedDirectory.directories[dir];
                        locDir.positionInParentx = this.oldPositions[dir].x;
                        locDir.positionInParenty = this.oldPositions[dir].y;
                    }
                };
                DragContainer.prototype.save = function () {
                    this.editMode = false;
                    this.selectedDirectory.imageUrl = this.imageUrl;
                };
                DragContainer.prototype.getX = function (d) {
                    console.log("getX, mapWidth :" + this.map.offsetWidth);
                    if (d.positionInParentx < 0) {
                        d.positionInParentx = 0;
                    }
                    else if (d.positionInParentx > 100) {
                        d.positionInParentx = 100;
                    }
                    return d.positionInParentx + "%";
                };
                DragContainer.prototype.getY = function (d) {
                    if (d.positionInParenty < 0) {
                        d.positionInParenty = 0;
                    }
                    else if (d.positionInParenty > 100) {
                        d.positionInParenty = 100;
                    }
                    return d.positionInParenty + "%";
                };
                DragContainer.prototype.getShortName = function (d) {
                    if (d.shortName && d.shortName.length > 0) {
                        return d.shortName;
                    }
                    else {
                        return "none";
                    }
                };
                DragContainer.prototype.onDrag = function (drag, ev) {
                    if (this.editMode) {
                        drag.positionInParentx += ev.dx * 100 / this.map.offsetWidth;
                        drag.positionInParenty += ev.dy * 100 / this.map.offsetHeight;
                    }
                };
                DragContainer.prototype.ngOnInit = function () {
                    var _this = this;
                    this.map = document.getElementById('map');
                    this.img.onload = (function (event) { return _this.imageUrl = _this.img.src; });
                    this.img.onerror = (function (event) { return console.log("url error"); });
                    this.imageExists(this.selectedDirectory.imageUrl);
                };
                DragContainer.prototype.ngOnChanges = function () {
                    if (this.editMode) {
                        this.discard();
                    }
                    this.imageUrl = null;
                    this.imageExists(this.selectedDirectory.imageUrl);
                    this.editMode = false;
                };
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', directory_3.LocationDirectory)
                ], DragContainer.prototype, "selectedDirectory", void 0);
                DragContainer = __decorate([
                    core_5.Component({
                        selector: 'my-drag-map',
                        directives: [drag_element_1.DragElement],
                        template: "   <div><div class=\"buttonbar\">\n            <i *ngIf=\"!editMode\" class=\"material-icons\"\n                    (click)=\"startEdit()\">mode_edit</i>  \n            <i *ngIf=\"editMode\" class=\"material-icons\" \n                    (click)=\"discard()\">clear</i>\n            <i *ngIf=\"editMode\" class=\"material-icons\" \n                    (click)=\"save()\">save</i>  \n            <p  *ngIf=\"!imageUrl\"> Edit to add an URL of a picture to be displayed </p>\n        </div>\n        <input *ngIf=\"editMode\" value=\"{{imageUrl}}\" (keyup)=\"imageExists($event.target.value)\"\n                style=\"direction: ltr;width: 100%;\" placeholder=\"URL\"/>\n        <div  id=\"map\">\n            <div  *ngIf=\"imageUrl\">\n            <img src=\"{{imageUrl}}\" \n            alt=\"Map Image\" style=\"width: 100%; height:auto;\">\n            <my-draggable  *ngFor=\"#drag of selectedDirectory.directories\"\n               [x]=\"getX(drag)\" [y]=\"getY(drag)\" \n               [name]=\"getShortName(drag)\" [editMode]=\"editMode\"\n               (onDrag)=\"onDrag(drag,$event)\"    \n            ></my-draggable>\n            </div>\n        </div>\n        </div>\n        "
                    }), 
                    __metadata('design:paramtypes', [])
                ], DragContainer);
                return DragContainer;
            }());
            exports_7("DragContainer", DragContainer);
        }
    }
});
System.register("components/dialog/new-directory", ['angular2/core'], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_6;
    var NewDirectoryDialog;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            }],
        execute: function() {
            NewDirectoryDialog = (function () {
                function NewDirectoryDialog() {
                    this.onResultOk = new core_6.EventEmitter();
                }
                NewDirectoryDialog.prototype.ngOnInit = function () {
                };
                NewDirectoryDialog.prototype.onCancel = function () {
                    this.directoryName = '';
                    this.toggler.isShowing = false;
                };
                NewDirectoryDialog.prototype.onOk = function () {
                    this.onResultOk.emit(this.directoryName);
                    this.onCancel();
                };
                __decorate([
                    core_6.Input(), 
                    __metadata('design:type', Object)
                ], NewDirectoryDialog.prototype, "toggler", void 0);
                __decorate([
                    core_6.Output(), 
                    __metadata('design:type', core_6.EventEmitter)
                ], NewDirectoryDialog.prototype, "onResultOk", void 0);
                NewDirectoryDialog = __decorate([
                    core_6.Component({
                        selector: 'my-dialog-new-directory',
                        template: "\n  <div class=\"modal-background\" *ngIf=\"toggler.isShowing\">\n    <div class=\"modal\">\n        <p class=\"modal-title\"> enter new Directory's name</p><br/>\n        <input [(ngModel)]=\"directoryName\" placeholder=\"name\" />\n        <div class=\"modal-buttonbar\">\n            <button (click)=\"onOk();\">ok</button>\n            <button (click)=\"onCancel();\">cancel</button>\n        </div>\n    <div>\n  </div>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], NewDirectoryDialog);
                return NewDirectoryDialog;
            }());
            exports_8("NewDirectoryDialog", NewDirectoryDialog);
        }
    }
});
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
System.register("components/tree-view/tree-view", ['angular2/core', "components/directory/directory"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_7, directory_4;
    var TreeView;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (directory_4_1) {
                directory_4 = directory_4_1;
            }],
        execute: function() {
            TreeView = (function () {
                function TreeView() {
                    this.onSelectFolder = new core_7.EventEmitter();
                    this.onSelectFile = new core_7.EventEmitter();
                    this.onCreateSubDir = new core_7.EventEmitter();
                }
                TreeView.prototype.selectFolder = function (id) {
                    this.onSelectFolder.emit(id);
                };
                TreeView.prototype.selectFile = function (id) {
                    this.onSelectFile.emit(id);
                };
                TreeView.prototype.createSubDir = function (dir) {
                    this.onCreateSubDir.emit(dir);
                };
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', Array)
                ], TreeView.prototype, "directories", void 0);
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', directory_4.Directory)
                ], TreeView.prototype, "selectedDirectory", void 0);
                __decorate([
                    core_7.Output(), 
                    __metadata('design:type', core_7.EventEmitter)
                ], TreeView.prototype, "onSelectFolder", void 0);
                __decorate([
                    core_7.Output(), 
                    __metadata('design:type', core_7.EventEmitter)
                ], TreeView.prototype, "onSelectFile", void 0);
                __decorate([
                    core_7.Output(), 
                    __metadata('design:type', core_7.EventEmitter)
                ], TreeView.prototype, "onCreateSubDir", void 0);
                TreeView = __decorate([
                    core_7.Component({
                        selector: 'tree-view',
                        template: "\n<ul id=\"navcontainer\">\n    <li *ngFor=\"#dir of directories\">\n        <a [class.selected]='dir === selectedDirectory'>\n            <i *ngIf=\"dir.isEmpty()\" class=\"material-icons md-18\">stop</i>\n            <i *ngIf=\"!dir.isEmpty() && dir.expanded\" (click)=\"dir.toggle()\" class=\"material-icons md-18\">expand_more</i>\n            <i *ngIf=\"!dir.isEmpty() && !dir.expanded\" (click)=\"dir.toggle()\" class=\"material-icons md-18\">chevron_right</i>\n            <span (click)=\"selectFolder(dir)\">\n                {{dir.name}}\n            </span>\n            <i *ngIf=\"dir === selectedDirectory\" class=\"material-icons md-18\" (click)=\"createSubDir(dir)\" style=\"float:right;\">add</i>\n        </a>\n        <div *ngIf=\"dir.expanded\">\n            <tree-view [directories]=\"dir.directories\" [selectedDirectory]=\"selectedDirectory\"\n                    (onSelectFolder)=\"selectFolder($event)\"\n                    (onSelectFile)=\"selectFile($event)\"\n                    (onCreateSubDir)=\"createSubDir($event)\"></tree-view>\n            <ul>\n                <li *ngFor=\"#file of dir.files\" (onSelectFile)=\"selectFile(file.id)\">{{file.name}}</li>\n            </ul>\n        </div>\n    </li>\n</ul>",
                        directives: [TreeView]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TreeView);
                return TreeView;
            }());
            exports_9("TreeView", TreeView);
        }
    }
});
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
System.register("components/geographie", ['angular2/core', "components/markdown/markdown-editor-displayer", "components/draggableSVG/draggable-map", "components/dialog/new-directory", "services/data-manager", "components/tree-view/tree-view"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_8, markdown_editor_displayer_1, draggable_map_1, new_directory_1, data_manager_1, tree_view_1;
    var GeographieComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (markdown_editor_displayer_1_1) {
                markdown_editor_displayer_1 = markdown_editor_displayer_1_1;
            },
            function (draggable_map_1_1) {
                draggable_map_1 = draggable_map_1_1;
            },
            function (new_directory_1_1) {
                new_directory_1 = new_directory_1_1;
            },
            function (data_manager_1_1) {
                data_manager_1 = data_manager_1_1;
            },
            function (tree_view_1_1) {
                tree_view_1 = tree_view_1_1;
            }],
        execute: function() {
            GeographieComponent = (function () {
                function GeographieComponent(_dataManager) {
                    this._dataManager = _dataManager;
                    this.dialogNewDirToggler = { isShowing: false };
                    this._dataManagerService = _dataManager;
                }
                GeographieComponent.prototype.saveMarkdown = function (text) {
                    this.rawMarkdown = text;
                    this._dataManagerService.save(this.selectedDirectory.id, text);
                };
                GeographieComponent.prototype.select = function (dir) {
                    var _this = this;
                    this.selectedDirectory = dir;
                    this._dataManagerService.getData(dir.id).then(function (mark) { return _this.rawMarkdown = mark; });
                };
                GeographieComponent.prototype.addFolderDialog = function () {
                    this.dialogNewDirToggler.isShowing = true;
                };
                GeographieComponent.prototype.createFolder = function (name) {
                    var _this = this;
                    console.log('ew');
                    this._dataManagerService.addFolder(this.selectedDirectory, name).then(function (dirs) { return _this.directories = [dirs]; });
                };
                GeographieComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._dataManagerService.getDirectorys().then(function (dirs) { return _this.directories = [dirs]; });
                };
                GeographieComponent = __decorate([
                    core_8.Component({
                        selector: 'my-geographie',
                        directives: [markdown_editor_displayer_1.MdEditorDisplayerComponent, tree_view_1.TreeView, new_directory_1.NewDirectoryDialog, draggable_map_1.DragContainer],
                        templateUrl: 'app/components/geographie.html'
                    }), 
                    __metadata('design:paramtypes', [data_manager_1.LocationDataManagerService])
                ], GeographieComponent);
                return GeographieComponent;
            }());
            exports_10("GeographieComponent", GeographieComponent);
        }
    }
});
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
System.register("components/story", ['angular2/core', "components/markdown/markdown-editor-displayer", "components/dialog/new-directory", "services/data-manager", "components/tree-view/tree-view"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_9, markdown_editor_displayer_2, new_directory_2, data_manager_2, tree_view_2;
    var StoryComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (markdown_editor_displayer_2_1) {
                markdown_editor_displayer_2 = markdown_editor_displayer_2_1;
            },
            function (new_directory_2_1) {
                new_directory_2 = new_directory_2_1;
            },
            function (data_manager_2_1) {
                data_manager_2 = data_manager_2_1;
            },
            function (tree_view_2_1) {
                tree_view_2 = tree_view_2_1;
            }],
        execute: function() {
            StoryComponent = (function () {
                function StoryComponent(_dataManager) {
                    this._dataManager = _dataManager;
                    this.dialogNewDirToggler = { isShowing: false };
                    this._dataManagerService = _dataManager;
                }
                StoryComponent.prototype.saveMarkdown = function (text) {
                    this.rawMarkdown = text;
                    this._dataManagerService.save(this.selectedDirectory.id, text);
                };
                StoryComponent.prototype.select = function (dir) {
                    var _this = this;
                    this.selectedDirectory = dir;
                    this._dataManagerService.getData(dir.id).then(function (mark) { return _this.rawMarkdown = mark; });
                };
                StoryComponent.prototype.addFolderDialog = function () {
                    this.dialogNewDirToggler.isShowing = true;
                };
                StoryComponent.prototype.createFolder = function (name) {
                    var _this = this;
                    console.log('ew');
                    this._dataManagerService.addFolder(this.selectedDirectory, name).then(function (dirs) { return _this.directories = [dirs]; });
                };
                StoryComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._dataManagerService.getDirectorys().then(function (dirs) { return _this.directories = [dirs]; });
                };
                StoryComponent = __decorate([
                    core_9.Component({
                        selector: 'my-story',
                        directives: [markdown_editor_displayer_2.MdEditorDisplayerComponent, tree_view_2.TreeView, new_directory_2.NewDirectoryDialog],
                        templateUrl: 'app/components/story.html'
                    }), 
                    __metadata('design:paramtypes', [data_manager_2.StoryDataManagerService])
                ], StoryComponent);
                return StoryComponent;
            }());
            exports_11("StoryComponent", StoryComponent);
        }
    }
});
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
System.register("components/items", ['angular2/core', 'angular2/router'], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_10, router_1;
    var ItemsComponent;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ItemsComponent = (function () {
                function ItemsComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                ItemsComponent.prototype.ngOnInit = function () {
                    //let id = +this._routeParams.get('id');
                    //this._heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
                };
                ItemsComponent = __decorate([
                    core_10.Component({
                        selector: 'my-items',
                        templateUrl: 'app/component/foes.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], ItemsComponent);
                return ItemsComponent;
            }());
            exports_12("ItemsComponent", ItemsComponent);
        }
    }
});
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
System.register("components/npcs", ['angular2/core', 'angular2/router'], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_11, router_2;
    var NpcsComponent;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            }],
        execute: function() {
            NpcsComponent = (function () {
                function NpcsComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                NpcsComponent.prototype.ngOnInit = function () {
                    //let id = +this._routeParams.get('id');
                    //this._heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
                };
                NpcsComponent = __decorate([
                    core_11.Component({
                        selector: 'my-npcs',
                        templateUrl: 'app/component/foes.html'
                    }), 
                    __metadata('design:paramtypes', [router_2.RouteParams])
                ], NpcsComponent);
                return NpcsComponent;
            }());
            exports_13("NpcsComponent", NpcsComponent);
        }
    }
});
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
System.register("components/foes", ['angular2/core', 'angular2/router'], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_12, router_3;
    var FoesComponent;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            }],
        execute: function() {
            FoesComponent = (function () {
                function FoesComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                FoesComponent.prototype.ngOnInit = function () {
                    //let id = +this._routeParams.get('id');
                    //this._heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
                };
                FoesComponent = __decorate([
                    core_12.Component({
                        selector: 'my-player-characters',
                        templateUrl: 'app/component/foes.html'
                    }), 
                    __metadata('design:paramtypes', [router_3.RouteParams])
                ], FoesComponent);
                return FoesComponent;
            }());
            exports_14("FoesComponent", FoesComponent);
        }
    }
});
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
System.register("components/players", ['angular2/core', 'angular2/router'], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_13, router_4;
    var PlayersComponent;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            }],
        execute: function() {
            PlayersComponent = (function () {
                function PlayersComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                PlayersComponent.prototype.ngOnInit = function () {
                    //let id = +this._routeParams.get('id');
                    //this._heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
                };
                PlayersComponent = __decorate([
                    core_13.Component({
                        selector: 'my-player-characters',
                        templateUrl: 'app/component/foes.html'
                    }), 
                    __metadata('design:paramtypes', [router_4.RouteParams])
                ], PlayersComponent);
                return PlayersComponent;
            }());
            exports_15("PlayersComponent", PlayersComponent);
        }
    }
});
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
System.register("components/playerCharacters", ['angular2/core', 'angular2/router'], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_14, router_5;
    var PlayerCharactersComponent;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (router_5_1) {
                router_5 = router_5_1;
            }],
        execute: function() {
            PlayerCharactersComponent = (function () {
                function PlayerCharactersComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                PlayerCharactersComponent.prototype.ngOnInit = function () {
                    //let id = +this._routeParams.get('id');
                    //this._heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
                };
                PlayerCharactersComponent = __decorate([
                    core_14.Component({
                        selector: 'my-player-characters',
                        templateUrl: 'app/component/foes.html'
                    }), 
                    __metadata('design:paramtypes', [router_5.RouteParams])
                ], PlayerCharactersComponent);
                return PlayerCharactersComponent;
            }());
            exports_16("PlayerCharactersComponent", PlayerCharactersComponent);
        }
    }
});
System.register("app.component", ['angular2/core', 'angular2/router', "services/markdown-converter", "services/data-manager", "components/geographie", "components/story", "components/items", "components/npcs", "components/foes", "components/players", "components/playerCharacters"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_15, router_6, markdown_converter_2, data_manager_3, geographie_1, story_1, items_1, npcs_1, foes_1, players_1, playerCharacters_1;
    var AppComponent;
    return {
        setters:[
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (router_6_1) {
                router_6 = router_6_1;
            },
            function (markdown_converter_2_1) {
                markdown_converter_2 = markdown_converter_2_1;
            },
            function (data_manager_3_1) {
                data_manager_3 = data_manager_3_1;
            },
            function (geographie_1_1) {
                geographie_1 = geographie_1_1;
            },
            function (story_1_1) {
                story_1 = story_1_1;
            },
            function (items_1_1) {
                items_1 = items_1_1;
            },
            function (npcs_1_1) {
                npcs_1 = npcs_1_1;
            },
            function (foes_1_1) {
                foes_1 = foes_1_1;
            },
            function (players_1_1) {
                players_1 = players_1_1;
            },
            function (playerCharacters_1_1) {
                playerCharacters_1 = playerCharacters_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'SSE';
                }
                AppComponent = __decorate([
                    core_15.Component({
                        selector: 'my-app',
                        template: "\n    <header>\n        <h1>{{title}}</h1>\n        <nav>\n           <a [routerLink]=\"['Geographie']\">Geography</a>\n           <a [routerLink]=\"['Story']\">Story</a>\n           <a [routerLink]=\"['Npcs']\">NPC</a>\n           <!--<a [routerLink]=\"['Items']\">Items</a>\n           <a [routerLink]=\"['Foes']\">Gegner</a> \n           <a [routerLink]=\"['Players']\">Spieler</a>\n           <a [routerLink]=\"['PlayerCharacters']\">Charaktere</a> -->\n        </nav>\n    </header>\n    <div id=\"container\">\n        <router-outlet></router-outlet>\n    </div>\n\n    <footer>\n        Copyright \u00A9 SSE.ch\n    </footer>\n    ",
                        styleUrls: ['app/app.component.css'],
                        directives: [router_6.ROUTER_DIRECTIVES],
                        providers: [router_6.ROUTER_PROVIDERS, markdown_converter_2.MarkdownService, data_manager_3.StoryDataManagerService, data_manager_3.LocationDataManagerService] // Add app wide services here
                    }),
                    router_6.RouteConfig([
                        {
                            path: '/geographie', name: 'Geographie', component: geographie_1.GeographieComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/story', name: 'Story', component: story_1.StoryComponent
                        },
                        {
                            path: '/items', name: 'Items', component: items_1.ItemsComponent
                        },
                        {
                            path: '/npcs', name: 'Npcs', component: npcs_1.NpcsComponent
                        },
                        {
                            path: '/foes', name: 'Foes', component: foes_1.FoesComponent
                        },
                        {
                            path: '/players', name: 'Players', component: players_1.PlayersComponent
                        },
                        {
                            path: '/player-charactes', name: 'PlayerCharacters', component: playerCharacters_1.PlayerCharactersComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_17("AppComponent", AppComponent);
        }
    }
});
System.register("main", ['angular2/platform/browser', "app.component"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var browser_1, app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent);
        }
    }
});
//# sourceMappingURL=bundle.js.map