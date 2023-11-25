/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AppApiActions } from './app.actions';
import { ApiService } from '../api.service';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions, private apiservice: ApiService) { }

    FetchAllCharacters$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppApiActions.fetchAllCharacters),
            mergeMap((action: { pageNumber: number }) =>
                this.apiservice.fetchAllPeople(action.pageNumber).pipe(
                    map((response) => {
                        return AppApiActions.fetchAllCharactersSuccess({
                            response,
                        });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(AppApiActions.fetchAllCharactersFailure({ error: error.error }))
                    )
                )
            )
        );
    });
}
