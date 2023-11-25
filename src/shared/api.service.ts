import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URI = 'https://swapi.dev/api/';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpClient
    ) { }

    fetchAllPeople() {
        return this.http.get<any>(BASE_URI + 'people')
    }

    fetchAllFilms() {
        return this.http.get<any>(BASE_URI + 'films')
    }

    fetchAllPlanets() {
        return this.http.get<any>(BASE_URI + 'planets')
    }

    fetchAllSpecies() {
        return this.http.get<any>(BASE_URI + 'species')
    }

    fetchAllStarships() {
        return this.http.get<any>(BASE_URI + 'starships')
    }

    fetchAllVehicles() {
        return this.http.get<any>(BASE_URI + 'vehicles')
    }
}