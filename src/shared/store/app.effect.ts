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
                    ),
                )
            )
        );
    });

    FetchAllFilms$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppApiActions.fetchAllFilms),
            mergeMap((action: { pageNumber: number }) =>
                this.apiservice.fetchAllFilms(action.pageNumber).pipe(
                    map((response) => {
                        return AppApiActions.fetchAllFilmsSuccess({
                            response,
                        });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(AppApiActions.fetchAllFilmsFailure({ error: error.error }))
                    ),
                )
            )
        );
    });

    FetchAllPlanets$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppApiActions.fetchAllPlanets),
            mergeMap((action: { pageNumber: number }) =>
                this.apiservice.fetchAllPlanets(action.pageNumber).pipe(
                    map((response) => {
                        return AppApiActions.fetchAllPlanetsSuccess({
                            response,
                        });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(AppApiActions.fetchAllPlanetsFailure({ error: error.error }))
                    ),
                )
            )
        );
    });

    FetchAllSpecies$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppApiActions.fetchAllSpecies),
            mergeMap((action: { pageNumber: number }) =>
                this.apiservice.fetchAllSpecies(action.pageNumber).pipe(
                    map((response) => {
                        return AppApiActions.fetchAllSpeciesSuccess({
                            response,
                        });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(AppApiActions.fetchAllSpeciesFailure({ error: error.error }))
                    ),
                )
            )
        );
    });

    FetchAllStarships$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppApiActions.fetchAllStarships),
            mergeMap((action: { pageNumber: number }) =>
                this.apiservice.fetchAllStarships(action.pageNumber).pipe(
                    map((response) => {
                        return AppApiActions.fetchAllStarshipsSuccess({
                            response,
                        });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(AppApiActions.fetchAllStarshipsFailure({ error: error.error }))
                    ),
                )
            )
        );
    });

    FetchAllVehicles$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppApiActions.fetchAllVehicles),
            mergeMap((action: { pageNumber: number }) =>
                this.apiservice.fetchAllVehicles(action.pageNumber).pipe(
                    map((response) => {
                        return AppApiActions.fetchAllVehiclesSuccess({
                            response,
                        });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(AppApiActions.fetchAllVehiclesFailure({ error: error.error }))
                    ),
                )
            )
        );
    });
}
