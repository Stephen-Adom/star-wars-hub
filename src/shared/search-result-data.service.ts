import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { searchResponseType } from './data.types';

@Injectable({
    providedIn: 'root'
})
export class SearchResultService {
    resultData$ = new BehaviorSubject<searchResponseType | null>(null);
    toggleDialogVisibility$ = new BehaviorSubject<boolean>(false);

    resultDataObservable = this.resultData$.asObservable();
    toggleDialogVisibilityObservable = this.toggleDialogVisibility$.asObservable();

    sendResult(result: searchResponseType) {
        this.resultData$.next(result);
    }

    toggleDialogVisibility(visible: boolean) {
        this.toggleDialogVisibility$.next(visible);
    }
}