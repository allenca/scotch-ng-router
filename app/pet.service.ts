// Imports
import { Injectable }    from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Pet } from './pet'
import 'rxjs/add/operator/map'; // mapping out the data, map method describes process where you sort the info received

/* @Injectable: tells Angular that this class is injectable as a
service to another class.
 */
@Injectable()
export class PetService {
  /* This class constructor also has JSONP injected. Note that
  // you don't have to inject JSONP as it is 'built into'
  // angular
  */
  constructor(private jsonp: Jsonp) {
    // by adding jsonp as an argument, we are
    // injecting JSONP as part of this service.
    // 'this.jsonp' becomes available. it is not written,
    // it is assumed.
    // this.jsonp = jsonp;
  }
  // Base URL for Petfinder API
  private petsUrl = 'http://api.petfinder.com/';

  // Get a list if pets based on animal
  findPets(animal : string) {
    // End point for list of pets:
    // http://api.petfinder.com/pet.find?key=[API_KEY]&animal=[ANIMAL]&format=json&location=texas
    const endPoint = 'pet.find';
    /* URLSearchParams is an object that makes it easier to set query parameters and construct a URL rather than manually concatenating a string for URL, as done with the bestbuy project
     */

    let params = new URLSearchParams(); // creating new URLSearchParams using data value pairs
    params.set('key', '555f8155d42d5c9be4705beaf4cce089');
    params.set('location', 'ontario');
    params.set('animal', animal);
    params.set('format', 'json'); // json is the standard way of receiving the data
    params.set('callback', 'JSONP_CALLBACK'); // this is like an event handler
    // Return response. note it is similar to a promise
    /* the original return statement is broken down into
     * simpler steps . */
    let jsonp = this.jsonp;
    let request = jsonp.get(this.petsUrl + endPoint, { search: params });

    // this may need clarity.
    /* you are 'receiving' the response asynchronously
     * this is similar to the event handler of an xmlHTTPRequest
     * or the handler of a $.ajax() call in jquery
     *  */

    // ES5/6 hybrid
    let responseFn = function(response):Pet[]{
      let originalData = response.json();
      console.log(originalData); // returns an object like best buy
      let petFinderResults = originalData['petfinder']; // or .petfinder. its an object
      let petData = petFinderResults.pets;
      let refinedData:Pet[] = petData.pet; // like products from best buy
      return refinedData;
    };

    // casting defines and forces the data to be a particular type, "as" is another word that will make it cast
    // ES6 long form, describing the way to get to the data
    let responseFn_2 = (response) => {
      let originalData = response.json(); // whenever we get a response, we jsonify the original data
      // console.log(originalData); // returns an object like best buy
      let petFinderResults = originalData['petfinder']; // or .petfinder. it's an object, find petfinder in original data
      let petData = petFinderResults.pets;
      let refinedData:Pet[] = petData.pet; // like products from best buy
      console.log(refinedData);
      // the return statement shows an example of "casting"
      return <Pet[]> refinedData;
    };

    // ES6 short form
    // let responseFn = (response) => (<Pet[]> response.json().petfinder.pets.pet); 
    // we cast the data we get back as an array of pet objects
    // 

    let processRequest = request.map(responseFn_2); // once you map the request, send the data back to processRequest

    return processRequest;
  }

  findPetById(id: string){
    // End point for list of pets:
    // http://api.petfinder.com/pet.find?key=[API_KEY]&animal=[ANIMAL]&format=json&location=texas
    const endPoint = 'pet.get'
    // URLSearchParams makes it easier to set query parameters and construct URL
    // rather than manually concatinatng
    // endPoint is a part of the URL generated to do something, in this case, find a a pet
    let params = new URLSearchParams();
    params.set('key', '555f8155d42d5c9be4705beaf4cce089');
    params.set('id', id);
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    console.log(id);
    // Return response
   return this.jsonp
              .get(this.petsUrl + endPoint, { search: params })
              .map(response => {

                console.log(response.json().petfinder.pet);
                return  response.json().petfinder.pet
              });
  }
}
