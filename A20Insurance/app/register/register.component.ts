import { Component} from '@angular/core';
import { Cust } from '../cust'; 
import { CustomerService } from '../customer.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';  
import { NavService } from '../nav.service';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css'],
    moduleId: module.id
})

export class RegisterComponent { 

    service: any;

    success = false;

    Message = ""; 

    constructor(private customerService: CustomerService, 
        private router: Router,
        private navService: NavService) { }
  


    Customer: Cust = {

        FirstName: "",
        LastName: "",
        CustomerID: "",
        Password: "",
        Encrypted: "",
        Phone: "",
        Email: "",
        Address1: "",
        Address2: "",
        City: "",
        State: "",
        Zip: "",
        PromotionCode: "",
        PolicyID: 0,
        ClaimCount: 0,
        PolicyName: ""
    }

     

    onSubmit() {

        if (this.Customer.PromotionCode != "100")
        {
            this.Message = "Enter valid promotion code." 
            return;
        }
         
        this.Customer.ClaimCount = 0;
        this.Customer.PolicyName = "No Policy Assigned"; 

        this.Message = this.customerService.PasswordRuleCheck(this.Customer.Password);
        if (this.Message != "") { return; } // invalid password

        this.addCustomer(); 
         
    }
     

    addCustomer()
    {
        this.customerService.addCustomer(this.Customer)
            .subscribe(

            (cust: Cust) => {

                if (cust.CustomerID == "Duplicate Customer") {
                    this.Message = "Duplcate Customer";
                    return;
                }
                else {
                    this.success = true;
                    this.storeCustomer();
                    this.navService.enableNavMenu(this.Customer.FirstName, this.Customer.LastName);
                    this.router.navigate(['review']); // on to customer review
                }

            },
            (Error) => {

                this.showError(Error.message);
            });
          
    }

    storeCustomer() {

        // frame issue: do this here: store customer.
        this.customerService.passCustomer(this.Customer);

    }

    showError(Error:string) {

        this.Message = Error;
    }
     

    

}