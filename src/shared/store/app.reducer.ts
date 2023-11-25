import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AppApiActions } from "./app.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { PeopleType, peopleResponseType } from "../data.types";

export const featureAppKey = 'app';

export interface AppState {
    error: HttpErrorResponse | null;
    allCharacters: peopleResponseType | null;
    loading: boolean;
}

const initialState: AppState = {
    error: null,
    allCharacters: null,
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
    on(AppApiActions.toggleLoading, (state: AppState, action) => {
        return {
            ...state,
            loading: action.state,
        };
    }),
);
