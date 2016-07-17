import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import {MarkdownService}  from './services/markdown-converter';
import {StoryDirectoryManagerService,LocationDirectroyManagerServices,
     NPCDirectoryManagerService,NPCManagerService} from  './services/data-manager';





@Component({
    selector: 'my-app',
    template: 
    `
    <header>
        <h1>{{title}}</h1>
        <nav>
           <a [routerLink]="['geographie']">Geography</a>
           <a [routerLink]="['story']">Story</a>
           <a [routerLink]="['npcs']">NPC</a>
           <!--<a [routerLink]="['items']">Objekte</a>
           <a [routerLink]="['foes']">Gegner</a>
           <a [routerLink]="['players']">Spieler</a>
           <a [routerLink]="['playerCharacters']">Charaktere</a> -->
        </nav>
    </header>
    <div id="container">
        <router-outlet></router-outlet>
    </div>

    <footer>
        Copyright © SSE.ch
    </footer>
    `,
    styleUrls:['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [MarkdownService,StoryDirectoryManagerService,LocationDirectroyManagerServices,
    NPCDirectoryManagerService,NPCManagerService]  // Add app wide services here
 })


export class AppComponent{
    title = 'SSE';
}