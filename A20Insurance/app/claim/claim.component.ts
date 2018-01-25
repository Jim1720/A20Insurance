import { Component, OnInit } from '@angular/core'; 
import { Claim } from '../claim';
import { ClaimService } from '../claim.service';
import { CustomerService } from '../customer.service';
import { Cust } from '../cust';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../service';
import { ServiceService } from '../service.service';

@Component({
    templateUrl: 'claim.component.html',
    styleUrls: ['claim.component.css'],
    moduleId: module.id
})
export class ClaimComponent implements OnInit {


    custFirst: string = "";
    custLast: string = "";
    Message: string = "";
    claimErrors: boolean = false;
    submit: boolean = false;
    Customer: Cust;
    services: Service[];


    constructor(public claimService: ClaimService,
        public customerService: CustomerService,
        public serviceService: ServiceService,
        public router: Router) { }

    claim: Claim =
    {
        CustomerID: "",
        Service: "",
        DateService: "",
        Location: "",
        Clinic: "",
        Physician: "",
        First: "",
        Last: "",
        Diag1: "",
        Diag2: "",
        Proc1: "",
        Proc2: "",
        Proc3: "",
        ReferPhysicianClinic: "",
        PayMethod: "",
        Note: ""
    }
     

    ngOnInit() {

        // fetch customer / we need custid, first, last name for screen now.
        this.Customer = this.customerService.fetchCustomer();
        this.claim.CustomerID = this.Customer.CustomerID;
        this.custFirst = this.Customer.FirstName;
        this.custLast = this.Customer.LastName; 
        this.loadServices(); 
    }

    loadServices() {

        this.serviceService.listAllServices()
            .subscribe(

            (serviceList: any) => { this.services = serviceList; },
            (Error: any) => { this.Message = Error.message;}

            ); 
    }

    onReview() { // do not use link button can not set colors for blue background.

        this.router.navigate(["/review"])
    }
     



    onSubmit() {

        this.editor();
        if (this.claimErrors == true) {
            return;
        }

        // edit: insure polcy set on customer
        if (this.Customer.PolicyID == 0) {
            this.Message = "Customer must select a policy before claims can be submitted. Assign Polcy now."
            this.claimErrors = true;
            return;
        }


        this.claimService.addClaim(this.claim)
            .subscribe(() => {
                this.router.navigate(["review"]);
            },
            (Error) => {

                this.Message = Error.message;
            })
         

        // bump claim count on customer 
        this.Customer.ClaimCount++; 
        this.customerService.updateCustomer(this.Customer)
            .subscribe( 
            (cust) => {

                //store customer with updated count
                this.customerService.passCustomer(this.Customer);

                this.router.navigate(["review"]);

            },
                (Error) => { this.Message= Error.message} 
            );

       
    }

    editor() {

        this.Message = "";
        this.claimErrors = false;

        if (this.claim.Proc1 == "") {

            this.claimErrors = true;
            this.Message += "At least 1 procedure code is required.";
        }

        if (this.claim.Diag1 == "") {

            this.claimErrors = true;
            this.Message += "At least 1 diagnosis code is required.";
        }

        if (this.claim.Physician == "") {

            this.claimErrors = true;
            this.Message += "Select Physician.";
        }

        if (this.claim.Diag1 == "") {

            this.claimErrors = true;
            this.Message += "Select Clinic.";
        }

        if (this.claim.Location == "") {

            this.claimErrors = true;
            this.Message += "Select Location.";
        }

        if (this.claim.PayMethod == "") {

            this.claimErrors = true;
            this.Message += "Select Payment Method.";
        }


        var slash = this.claim.DateService.substring(2, 3);
        if (slash == "/") {
            var mm: number = parseInt(this.claim.DateService.substring(0, 2));
            var dd: number = parseInt(this.claim.DateService.substring(3, 5));
            var yy: number = parseInt(this.claim.DateService.substring(6, 8));
        }
        else
        {
            var mm: number = parseInt(this.claim.DateService.substring(0, 2));
            var dd: number = parseInt(this.claim.DateService.substring(2, 4));
            var yy: number = parseInt(this.claim.DateService.substring(4, 6)); 
        }

        if (mm > 0 && mm < 13) { } else {
            this.claimErrors = true;
            this.Message += "Invalid date of service month.";
        }

        if (dd > 0 && dd < 32) { } else {
            this.claimErrors = true;
            this.Message += "Invalid date of service day.";
        }

        if (yy > 15 && yy < 19) { } else {
            this.claimErrors = true;
            this.Message += "Invalid date of service year.";
        }

        // mm: yy check

        if ((mm == 9 || mm == 4 || mm == 6 || mm == 11) && dd == 31) {
            this.claimErrors = true;
            this.Message += "Invalid date of service date - 31 for month invalid.";
        }
 
        var leap: boolean = (yy % 4) == 0; // leap year.

        if ((mm == 2 && dd > 28 && leap == false) || (mm == 2 && dd > 29 && leap == true))  {  

            this.claimErrors = true;
            this.Message += "Invalid date of service date - Invlaid day for Feburary.";
        }
    }

}
 

 