import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AppApiActions } from "./app.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { FilmType, PeopleType, PlanetType, SpeciesType, StarshipType, VehicleType, filmsResponseType, peopleResponseType, planetResponseType, speciesResponseType, starshipResponseType, vehicleResponseType } from "../data.types";

export const featureAppKey = 'app';

export interface AppState {
    error: HttpErrorResponse | null;
    allCharacters: peopleResponseType | null;
    allFilms: filmsResponseType | null;
    allPlanets: planetResponseType | null;
    allSpecies: speciesResponseType | null;
    allStarships: starshipResponseType | null;
    allVehicles: vehicleResponseType | null;
    characterDetail: PeopleType | null;
    filmDetail: FilmType | null;
    planetDetail: PlanetType | null;
    speciesDetail: SpeciesType | null;
    starshipDetail: StarshipType | null;
    vehicleDetail: VehicleType | null;
    loading: boolean;
}

const initialState: AppState = {
    error: null,
    allCharacters: null,
    allFilms: null,
    allPlanets: null,
    allSpecies: null,
    allStarships: null,
    allVehicles: null,
    filmDetail: null,
    planetDetail: null,
    speciesDetail: null,
    starshipDetail: null,
    vehicleDetail: null,
    characterDetail: null,
    loading: false,
};

export const selectAppFeature = createFeatureSelector<AppState>(featureAppKey);

export const getErrorMessage = createSelector(
    selectAppFeature,
    (state: AppState) => state.error
);

export const getAllCharacters = createSelector(
    selectAppFeature,
    (state: AppState) => state.allCharacters
);

export const getAllFilms = createSelector(
    selectAppFeature,
    (state: AppState) => state.allFilms
);

export const getAllPlanets = createSelector(
    selectAppFeature,
    (state: AppState) => state.allPlanets
);

export const getAllSpecies = createSelector(
    selectAppFeature,
    (state: AppState) => state.allSpecies
);

export const getAllStarships = createSelector(
    selectAppFeature,
    (state: AppState) => state.allStarships
);

export const getAllVehicles = createSelector(
    selectAppFeature,
    (state: AppState) => state.allVehicles
);

export const getCharacterDetail = createSelector(
    selectAppFeature,
    (state: AppState) => state.characterDetail
);

export const getFilmDetail = createSelector(
    selectAppFeature,
    (state: AppState) => state.filmDetail
);

export const getPlanetDetail = createSelector(
    selectAppFeature,
    (state: AppState) => state.planetDetail
);

export const getSpeciesDetail = createSelector(
    selectAppFeature,
    (state: AppState) => state.speciesDetail
);

export const getStarshipDetail = createSelector(
    selectAppFeature,
    (state: AppState) => state.starshipDetail
);

export const getVehicleDetail = createSelector(
    selectAppFeature,
    (state: AppState) => state.vehicleDetail
);

export const getLoadingState = createSelector(
    selectAppFeature,
    (state: AppState) => state.loading
);


export const AppReducer = createReducer<AppState>(
    initialState,
    on(AppApiActions.fetchAllCharactersSuccess, (state: AppState, action) => {
        return {
            ...state,
            allCharacters: action.response,
            loading: false,
            error: null
        };
    }),
    on(AppApiActions.fetchAllCharactersFailure, (state: AppState, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        };
    }),
    on(AppApiActions.fetchAllFilmsSuccess, (state: AppState, action) => {
        return {
            ...state,
            allFilms: action.response,
            loading: false,
            error: null
        };
    }),
    on(AppApiActions.fetchAllFilmsFailure, (state: AppState, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        };
    }),

    on(AppApiActions.fetchAllPlanetsSuccess, (state: AppState, action) => {
        return {
            ...state,
            allPlanets: action.response,
            loading: false,
            error: null
        };
    }),
    on(AppApiActions.fetchAllPlanetsFailure, (state: AppState, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        };
    }),

    on(AppApiActions.fetchAllSpeciesSuccess, (state: AppState, action) => {
        return {
            ...state,
            allSpecies: action.response,
            loading: false,
            error: null
        };
    }),
    on(AppApiActions.fetchAllSpeciesFailure, (state: AppState, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        };
    }),

    on(AppApiActions.fetchAllStarshipsSuccess, (state: AppState, action) => {
        return {
            ...state,
            allStarships: action.response,
            loading: false,
            error: null
        };
    }),
    on(AppApiActions.fetchAllStarshipsFailure, (state: AppState, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        };
    }),


    on(AppApiActions.fetchAllVehiclesSuccess, (state: AppState, action) => {
        return {
            ...state,
            allVehicles: action.response,
            loading: false,
            error: null
        };
    }),
    on(AppApiActions.fetchAllVehiclesFailure, (state: AppState, action) => {
        return {
            ...state,
            loading: false,
            error: action.error
        };
    }),

    on(AppApiActions.displayCharacterDetails, (state: AppState, action) => {
        return {
            ...state,
            characterDetail: action.character
        };
    }),

    on(AppApiActions.displayFilmDetails, (state: AppState, action) => {
        return {
            ...state,
            filmDetail: action.film
        };
    }),

    on(AppApiActions.displayPlanetDetails, (state: AppState, action) => {
        return {
            ...state,
            planetDetail: action.planet
        };
    }),

    on(AppApiActions.displaySpeciesDetails, (state: AppState, action) => {
        return {
            ...state,
            speciesDetail: action.species
        };
    }),

    on(AppApiActions.displayStarshipDetails, (state: AppState, action) => {
        return {
            ...state,
            starshipDetail: action.starship
        };
    }),

    on(AppApiActions.displayVehicleDetails, (state: AppState, action) => {
        return {
            ...state,
            vehicleDetail: action.vehicle
        };
    }),

    on(AppApiActions.toggleLoading, (state: AppState, action) => {
        return {
            ...state,
            loading: action.state,
        };
    }),
    on(AppApiActions.clearData, (state: AppState) => {
        return {
            ...state,
            allCharacters: null,
            allFilms: null,
            allPlanets: null,
            allSpecies: null,
            allStarships: null,
            allVehicles: null,
        };
    }),
);
