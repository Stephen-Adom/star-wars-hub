import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FilmType, PeopleType, PlanetType, SpeciesType, StarshipType, VehicleType, filmsResponseType, peopleResponseType, planetResponseType, speciesResponseType, starshipResponseType, vehicleResponseType } from "../data.types";

export const AppApiActions = createActionGroup({
    source: 'Lister Page',
    events: {
        'fetch All Characters': props<{ pageNumber: number }>(),
        'fetch ALL Characters Success': props<{ response: peopleResponseType }>(),
        'fetch ALL Characters Failure': props<{ error: HttpErrorResponse }>(),
        'display character details': props<{ character: PeopleType }>(),

        'fetch All Films': props<{ pageNumber: number }>(),
        'fetch ALL Films Success': props<{ response: filmsResponseType }>(),
        'fetch ALL Films Failure': props<{ error: HttpErrorResponse }>(),
        'display film details': props<{ film: FilmType }>(),

        'fetch All planets': props<{ pageNumber: number }>(),
        'fetch ALL planets Success': props<{ response: planetResponseType }>(),
        'fetch ALL planets Failure': props<{ error: HttpErrorResponse }>(),
        'display planet details': props<{ planet: PlanetType }>(),

        'fetch All species': props<{ pageNumber: number }>(),
        'fetch ALL species Success': props<{ response: speciesResponseType }>(),
        'fetch ALL species Failure': props<{ error: HttpErrorResponse }>(),
        'display species details': props<{ species: SpeciesType }>(),

        'fetch All starships': props<{ pageNumber: number }>(),
        'fetch ALL starships Success': props<{ response: starshipResponseType }>(),
        'fetch ALL starships Failure': props<{ error: HttpErrorResponse }>(),
        'display starship details': props<{ starship: StarshipType }>(),

        'fetch All vehicles': props<{ pageNumber: number }>(),
        'fetch ALL vehicles Success': props<{ response: vehicleResponseType }>(),
        'fetch ALL vehicles Failure': props<{ error: HttpErrorResponse }>(),
        'display vehicle details': props<{ vehicle: VehicleType }>(),

        'toggle loading': props<{ state: boolean }>(),

        'clear data': emptyProps(),
        'update visit history': props<{ history: { name: string; category: string; id: number, lastVisited: Date } }>()
    },
});