import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Cust } from '../cust'; 
import { Observable } from 'rxjs/Observable';
import { NavService } from '../nav.service';


@Component({
    templateUrl: 'signin.component.html',
    styleUrls: ['signin.component.css'],
    moduleId: module.id
})

export class SignInComponent {

    submitted = false;

    CustomerID: string = "";
    Password: string = "";
    Message: string = "";

    constructor(

        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private navService: NavService) { }

    onSubmit() {

        if (this.CustomerID == "" || this.Password == "") {

            this.Message = "Must fill in both customerID and Password."
            return;
        };

        this.Message = "";

        this.customerService.readCustomer(this.CustomerID) 
            .subscribe(
            (cust) => {


                if (cust.CustomerID.substring(0, 1) == "*") {

                    this.Message = cust.CustomerID; // show error message 'etest'

                }
                // edits 
                if (cust.CustomerID == "Not Found") { this.Message = "Customer not found"; }

                if (this.Message == "") {
                    this.checkPassword(cust.Password);
                } 

                if (this.Message == "") {
                    this.customerService.passCustomer(cust);
                    this.navService.enableNavMenu(cust.FirstName, cust.LastName);
                    this.router.navigate(["review"]);
                }


            },
            (Error) => {

                this.Message = Error.message;

            }

        );

    
    }  
     

    checkPassword(Password: string)
    { 
        // according to stack overflow response .subscribe runs in a different frame
        // call here to access value of this.password.

            if (Password != this.Password) { this.Message = "Invalid password"; }
    }

}

      

        

         
                 
     

     