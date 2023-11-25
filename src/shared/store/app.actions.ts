import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { peopleResponseType } from "../data.types";

export const AppApiActions = createActionGroup({
    source: 'Lister Page',
    events: {
        'fetch All Characters': props<{ pageNumber: number }>(),
        'fetch ALL Characters Success': props<{ response: peopleResponseType }>(),
        'fetch ALL Characters Failure': props<{ error: HttpErrorResponse }>(),
        'toggle loading': props<{ state: boolean }>()
    },
});