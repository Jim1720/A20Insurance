import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Policy } from './policy';

//import { _catch } from 'rxjs/operator' 

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class PolicyService {

    constructor(private http: HttpClient) { }


    // Add Policy  
    public addPolicy(policy: Policy): Observable<Policy> {


        var url: string = 'api/Policy';
        var jpolicy: string = JSON.stringify(policy);
        return this.http.post<Policy>(url, jpolicy, httpOptions);
    }


    // Read Policy
    public readPolicy(id:number): Observable<Policy> {

        var url: string = 'api/Policy/read/' + id;
        return this.http.get<Policy>(url, httpOptions);
    }


    // Update Policy
    public updatePolicy(policy:Policy): Observable<Policy> {

        var url: string = 'api/Policy'; 
        var jpolicy: string = JSON.stringify(policy);
        return this.http.put<Policy>(url, jpolicy, httpOptions);
    }

    // List All Policies
    public listPolicies(): Observable<Policy[]> {

        var url: string = 'api/Policy/list/';
        return this.http.get<Policy[]>(url, httpOptions);
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