import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'; 
import { Admin } from './admin'


import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' })  
};

@Injectable()
export class AdminService {


    // pass customer: hold area.
    signedIn: boolean;

    public SignIn() {

        this.signedIn = true;
    }

    public SignedIn(): boolean {

        return this.signedIn;
    }

    AdminAction: string;

    constructor(private http: HttpClient) { }

    // Read admin password and user id data from server.
    public getAdminCredentials(IDnPAS: string): Observable<string> {

        var url: string = 'api/Admin/signon/' + IDnPAS;
        return this.http.get<string>(url, httpOptions);
    }

    // Read admin password and user id data from server.
    public verifyAdminPasswordForResetAction(Password: string): Observable<string> {

        // verify administrator password for password.
        var url: string = 'api/Admin/checkpass/' + Password;
        return this.http.get<string>(url, httpOptions);
    }

    // transport action from admin signon screen to admin maint screen.

    public storeAction(action: string) {
        this.AdminAction = action;
    }

    public readAction(): string {

        return this.AdminAction;
    }
}

 