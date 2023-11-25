import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const AppApiActions = createActionGroup({
    source: 'Lister Page',
    events: {
        'fetch All People': emptyProps(),
        'display Error Message': props<{ error: HttpErrorResponse }>(),
    },
});