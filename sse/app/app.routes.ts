import { provideRouter, RouterConfig } from '@angular/router';

import {GeographieComponent} from './components/geographie';
import {StoryComponent} from './components/story';
import {ItemsComponent} from './components/items';
import {NpcsComponent} from './components/npcs';
import {FoesComponent} from './components/foes';
import {PlayersComponent} from './components/players';
import {PlayerCharactersComponent} from './components/playerCharacters';

export const routes: RouterConfig = [
    {path: 'geographie',   component: GeographieComponent},
    {path: 'story',        component: StoryComponent},
    {path: 'items',        component: ItemsComponent},
    {path: 'npcs',         component: NpcsComponent},
    {path: 'foes',         component: FoesComponent},
    {path: 'players',       component: PlayersComponent},
    {path: 'player-charactes', component: PlayerCharactersComponent},
    {
    path: '', redirectTo: '/geographie', terminal: true},
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];