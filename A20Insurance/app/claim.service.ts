import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Claim } from './claim';

//import { _catch } from 'rxjs/operator' 

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ClaimService {

    constructor(private http: HttpClient) { }


    // Add Claim    
    public addClaim(claim: Claim): Observable<Claim> {


        var url: string = 'api/Claim';
        var jclaim: string = JSON.stringify(claim);
        return this.http.post<Claim>(url, jclaim, httpOptions);
    }


    // Read Claim History using CustomerID.
    public readClaimHistory(customerID: string): Observable<Claim[]> {

        var url: string = 'api/Claim/history/' + customerID;
        return this.http.get<Claim[]>(url, httpOptions);
    }

    // count claim history using customer id.
    public countClaimsHistory(customerID: string): Observable<number> {

        var url: string = 'api/Claim/count/' + customerID;
            return this.http.get<number>(url, httpOptions);
    }

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

    private log(item: string) {
        console.log(item);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);

        };

    }
}