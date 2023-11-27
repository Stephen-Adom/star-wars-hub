import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filmsResponseType, peopleResponseType, planetResponseType, speciesResponseType, starshipResponseType, vehicleResponseType } from './data.types';

export const BASE_URI = 'https://swapi.dev/api/';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpClient
    ) { }

    fetchAllPeople(pageNumber = 1) {
        return this.http.get<peopleResponseType>(BASE_URI + `people?page=${pageNumber}`)
    }

    fetchAllFilms(pageNumber = 1) {
        return this.http.get<filmsResponseType>(BASE_URI + `films?page=${pageNumber}`)
    }

    fetchAllPlanets(pageNumber = 1) {
        return this.http.get<planetResponseType>(BASE_URI + `planets?page=${pageNumber}`)
    }

    fetchAllSpecies(pageNumber = 1) {
        return this.http.get<speciesResponseType>(BASE_URI + `species?page=${pageNumber}`)
    }

    fetchAllStarships(pageNumber = 1) {
        return this.http.get<starshipResponseType>(BASE_URI + `starships?page=${pageNumber}`)
    }

    fetchAllVehicles(pageNumber = 1) {
        return this.http.get<vehicleResponseType>(BASE_URI + `vehicles?page=${pageNumber}`)
    }
}