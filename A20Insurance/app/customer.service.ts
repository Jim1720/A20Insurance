import { Injectable } from '@angular/core'; 

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';  
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Cust } from './cust'; 

//import { _catch } from 'rxjs/operator' 

const httpOptions = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' })  
};


@Injectable() 
export class CustomerService {
     

    constructor(private http: HttpClient) { } 

    // pass customer: hold area.
    holdCustomer: Cust;

    // Add Customer
    public addCustomer(cust: Cust): Observable<Cust> { 

        
        var url: string = 'api/Cust';  
        var jcust = JSON.stringify(cust);
        return this.http.post<Cust>(url, jcust, httpOptions);
    }

    // Update Customer
    public updateCustomer(cust: Cust): Observable<Cust> {


        var url: string = 'api/Cust'; 
        return this.http.put<Cust>(url, cust, httpOptions);
    }

    // Read Customer
    public readCustomer(CustomerID:string): Observable<Cust> {


        var url: string = 'api/Cust/' + CustomerID;
        return this.http.get<Cust>(url, httpOptions);
       
    }
      

    // passCustomer , fetchCustomer use service to pass cust data from component.
    // may need output,input etc.

    public passCustomer(cust: Cust) {

        this.holdCustomer = cust;
    }

    public fetchCustomer(): Cust {

        return this.holdCustomer;
    }

    public clearHold() {

        this.holdCustomer = null;
    }
    
    // admin: search customer data
    public SearchCustomers(FirstName: string, LastName: string): Observable<Cust[]> {

        var url: string = 'api/Cust/search/' + FirstName + "-" + LastName;
        return this.http.get<Cust[]>(url, httpOptions);

    }

    // reset password removed.

    public PasswordRuleCheck(p:string): string { 

        // min six characters: for test app we can have 6 characterss
        // 1 upper 
        // 1 lower
        // one special

        // or just '1', '2'.

        if (p == '1'  || p == '2' ) { return ""; } // easy testing

        if (p.length < 6) { return "Password must be at least six characters - with mixed case letters used."}

        if (p.toUpperCase() == p) { return "Password must have at least one lower case letter." }

        if (p.toLowerCase() == p) { return 'Password must have at least one upper case letter.'}


        return "";
    }


    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

    private log(item: string)
    {
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

 