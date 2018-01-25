import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Cust } from '../cust';  
import { ClaimService } from '../claim.service';
import { Router, ActivatedRoute } from '@angular/router';  
import { Policy } from '../policy';
import { PolicyService } from '../policy.service';
import { NavService } from '../nav.service';

@Component({
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.css'],
    moduleId: module.id
})

export class ReviewComponent implements OnInit {
  

    constructor(private customerService: CustomerService,
                private claimService: ClaimService,
                private policyService: PolicyService,
                private navService : NavService,
                private router: Router) { }

    // initializer: set claim and policy buttons on screen by getting claim count and assignment of policy indication.
    // check policy field and set button to name : add name to customer object and policy id too. drop db.

    submitted = false;

    ValidationSummary = "";

    Customer: Cust;

    New = 
    {
        Password : ""
    }

    Message = "";

    ShowHistory: string = "Show History";
     
    // on init: read cust from service and populate screen. it was put there in signin.

    whatPolicy: string = "Select Policy"; 

    policyButtonColor: string = "";
     

    ngOnInit()
    {

         // fetch customer
        this.Customer = this.customerService.fetchCustomer(); 
          
        if (this.Customer.ClaimCount == 0) { this.ShowHistory = "No Claims"; }
        if (this.Customer.ClaimCount == 1) { this.ShowHistory = "1 Claim"; }
        if (this.Customer.ClaimCount >= 2) { this.ShowHistory = this.Customer.ClaimCount.toString() + " Claims"; } 

        if (this.Customer.PolicyID == 0) {

            this.policyButtonColor = "Red" // alert user to select a policy
        }
        else {
            this.policyButtonColor = "Green";
            this.whatPolicy = "Change Policy";
        }
        
    }

    onFile() { //for button colors make button not link btn.

        this.router.navigate(['review/claim']);
    }

    onHistory() { 

        this.router.navigate(['review/history']);

    }

    onSubmit() {

        // use click event so message does not clear in case of error.

      

        // if new password entered supply it
        if (this.New.Password != "")
        {

            this.Message = this.customerService.PasswordRuleCheck(this.New.Password );
            if (this.Message != "") {

                return;

            } // invalid password

            this.Customer.Password = this.New.Password;
        }

        this.submitted = true;

        //passed.
        this.customerService.updateCustomer(this.Customer)
            .subscribe(
            (cust) => {

                // edits

                this.customerService.passCustomer(cust);

                this.Message = "Customer Data Updated";



            },
            (Error) => {

                this.Message = Error.message;

            }

            ); 

    }
     
    onSignOut() {

        // clear hold customer
        this.customerService.clearHold();

        // message menu to turn off links at right
        this.navService.hideNavMenu();

        // return to first splash screen.
        this.router.navigate(['splash']);
    }

     

}
