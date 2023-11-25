import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AppApiActions } from "./app.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { PeopleType, peopleResponseType } from "../data.types";

export const featureAppKey = 'app';

export interface AppState {
    error: HttpErrorResponse | null;
    allCharacters: peopleResponseType | null;
}

const initialState: AppState = {
    error: null,
    allCharacters: null
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


export const AppReducer = createReducer<AppState>(
    initialState,
    on(AppApiActions.fetchAllCharactersSuccess, (state: AppState, action) => {
        return {
            ...state,
            allCharacters: action.response,
            error: null
        };
    }),
    on(AppApiActions.fetchAllCharactersFailure, (state: AppState, action) => {
        return {
            ...state,
            error: action.error
        };
    }),
);
