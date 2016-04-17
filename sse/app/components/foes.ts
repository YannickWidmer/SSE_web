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

import {Component, Input, OnInit } from 'angular2/core';
import {RouteParams} from 'angular2/router';

@Component({
  selector: 'my-player-characters',
  templateUrl: 'app/component/foes.html'
})
export class FoesComponent implements OnInit {
    
    constructor(
         private _routeParams: RouteParams) {
    }
    
    ngOnInit() {
        //let id = +this._routeParams.get('id');
        //this._heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    }
}

