// Import component decorator
import { Component, OnInit } from '@angular/core';

import { PetService } from '../pet.service'

import { Observable } from 'rxjs/Observable';

import { Pet } from '../pet';

@Component({
  template: `
    <h2>Cats</h2>
    <p>List of cats</p>
    <ul class="demo-list-icon mdl-list">
      <li class="mdl-list__item" *ngFor="let cat of cats | async">
        <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-icon">pets</i>
            <a [routerLink]="['/cats', cat.id.$t]">{{cat.name.$t}}</a> 
        </span>
      </li>
    </ul>
    `
    // .$t gives you the actual value of the name
})
// Component class implementing OnInit
export class CatListComponent implements OnInit {
  // Private property for binding
  cats: Observable<Pet[]>;
  constructor(private petService: PetService) {

  } // observables are things your app watches for change, comes with rxjs
  // they want to introduce injectable dependencies with PetService, runs before OnInit, injectable has priority to run
  // private means that the petService is only available inside this class

  // Load data ones component is ready
  ngOnInit() {
    // Pass retreived pets to the property
    this.cats = this.petService.findPets('cat'); // everytime we use OnInit, we need to use ng in front
  }

}
