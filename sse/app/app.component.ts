import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import {MarkdownService}  from './services/markdown-converter';
import {StoryDataManagerService,LocationDataManagerService} from  './services/data-manager';

import {GeographieComponent} from './components/geographie';
import {StoryComponent} from './components/story';
import {ItemsComponent} from './components/items';
import {NpcsComponent} from './components/npcs';
import {FoesComponent} from './components/foes';
import {PlayersComponent} from './components/players';
import {PlayerCharactersComponent} from './components/playerCharacters';

@Component({
    selector: 'my-app',
    template: 
    `
    <header>
        <h1>{{title}}</h1>
        <nav>
           <a [routerLink]="['Geographie']">Geographie</a>
           <a [routerLink]="['Story']">Geschichte</a>
           <!--<a [routerLink]="['Items']">Objekte</a>
           <a [routerLink]="['Npcs']">NPC</a>
           <a [routerLink]="['Foes']">Gegner</a>
           <a [routerLink]="['Players']">Spieler</a>
           <a [routerLink]="['PlayerCharacters']">Charaktere</a> -->
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
    providers: [ROUTER_PROVIDERS,MarkdownService,StoryDataManagerService,LocationDataManagerService]  // Add app wide services here
 })

@RouteConfig([
    {
        path: '/geographie',    name: 'Geographie', component: GeographieComponent,
        useAsDefault: true
    },
    {
        path: '/story',         name: 'Story',      component: StoryComponent
    },
    {
        path: '/items',         name: 'Items',      component: ItemsComponent
    },
    {
        path: '/npcs',          name: 'Npcs',       component: NpcsComponent
    },
    {
        path: '/foes',          name: 'Foes',       component: FoesComponent
    },
    {
        path: '/players',       name: 'Players',    component: PlayersComponent
    },
    {
        path: '/player-charactes',name: 'PlayerCharacters',component: PlayerCharactersComponent
    }
])

export class AppComponent{
    title = 'SSE';
}