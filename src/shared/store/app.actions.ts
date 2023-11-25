import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { filmsResponseType, peopleResponseType, planetResponseType, speciesResponseType, starshipResponseType, vehicleResponseType } from "../data.types";

export const AppApiActions = createActionGroup({
    source: 'Lister Page',
    events: {
        'fetch All Characters': props<{ pageNumber: number }>(),
        'fetch ALL Characters Success': props<{ response: peopleResponseType }>(),
        'fetch ALL Characters Failure': props<{ error: HttpErrorResponse }>(),

        'fetch All Films': props<{ pageNumber: number }>(),
        'fetch ALL Films Success': props<{ response: filmsResponseType }>(),
        'fetch ALL Films Failure': props<{ error: HttpErrorResponse }>(),

        'fetch All planets': props<{ pageNumber: number }>(),
        'fetch ALL planets Success': props<{ response: planetResponseType }>(),
        'fetch ALL planets Failure': props<{ error: HttpErrorResponse }>(),

        'fetch All species': props<{ pageNumber: number }>(),
        'fetch ALL species Success': props<{ response: speciesResponseType }>(),
        'fetch ALL species Failure': props<{ error: HttpErrorResponse }>(),

        'fetch All starships': props<{ pageNumber: number }>(),
        'fetch ALL starships Success': props<{ response: starshipResponseType }>(),
        'fetch ALL starships Failure': props<{ error: HttpErrorResponse }>(),

        'fetch All vehicles': props<{ pageNumber: number }>(),
        'fetch ALL vehicles Success': props<{ response: vehicleResponseType }>(),
        'fetch ALL vehicles Failure': props<{ error: HttpErrorResponse }>(),

        'toggle loading': props<{ state: boolean }>(),

        'clear data': emptyProps(),
    },
});