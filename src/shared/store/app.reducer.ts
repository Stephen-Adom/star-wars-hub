import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AppApiActions } from "./app.actions";
import { HttpErrorResponse } from "@angular/common/http";

export const featureAppKey = 'app';

export interface AppState {
    error: HttpErrorResponse | null;
}

const initialState: AppState = {
    error: null,
};

export const selectAppFeature = createFeatureSelector<AppState>(featureAppKey);

export const getErrorMessage = createSelector(
    selectAppFeature,
    (state: AppState) => state.error
);


export const AppReducer = createReducer<AppState>(
    initialState,
    on(AppApiActions.displayErrorMessage, (state: AppState, action) => {
        return {
            ...state,
            error: action.error,
        };
    }),
);
