import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Cust } from '../cust'; 
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../customer.service'; 
import { AdminService } from '../admin.service'; 


@Component({
    templateUrl: 'reset.component.html',
    styleUrls: ['reset.component.css'],
    moduleId: module.id
})

export class ResetComponent {


    // developer note: observer logic must be stairstepped that is each time a success in 
    // observer return functions preform the next one. 
    // during testing they did not keep in sync when performed one after the other in open code.
    // also had to pass customer directly and not use this.resetcustomer scope

    // upgrade: see current pw when cust id entered.

    CustomerID: string = "";
    Password: string = "";
    Message: string = "";
    hideNavMenu = true;
    NewPass: string = "";

    customerFound:boolean = false; 
    ResetCustomer: Cust;
     
    constructor(

        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private adminService: AdminService) { } 
        
    onCustEntered() {

        // as soon as cust entered show old password 
        this.Message = "";

        this.customerService.readCustomer(this.CustomerID)
            .subscribe(

            (cust) => {

                    if (cust.Password != null) {

                        this.Message = "Current password for customer is " + cust.Password;
                    }
                    else {

                        this.Message = "";
                    }


                },
            (ERROR) => { this.Message = ERROR.message; }

            );
    }


    onSubmit() {

        // we need to check the password first.
        this.adminService.verifyAdminPasswordForResetAction(this.Password)
            .subscribe(

            (result: string) => {

                if (result != 'Valid') { this.Message = "Invalid Password for reset operation."; return; }

                else {

                    this.readAndUpdateCustomer(this.NewPass); // must be called to keep in sync! not inline.

                }
            },

            (Error: any) => { this.Message = Error.message; return; }

            );

    }

        readAndUpdateCustomer(NewPass:string) {

            // Verify Customer Exists


            this.customerService.readCustomer(this.CustomerID)
                .subscribe(

                (customer:Cust) => {

                    
                    this.resetPassword(customer,NewPass); // must be called not inline to preserve sync!

                },
                (ERROR) => { this.Message = ERROR.message }
            )


            // if resetcustomer null we did not find customer.
            if (this.ResetCustomer == null) {

                this.Message = "Customer Not Found";
            }

        }

        resetPassword(customer: Cust, NewPass: string) {

            customer.Password = NewPass;

            this.customerService.updateCustomer(customer)
                .subscribe(

                (cust) => { this.Message = "Customer Password Changed" },
                (ERROR) => { this.Message = ERROR.message }

                );

        } 
 
    
}