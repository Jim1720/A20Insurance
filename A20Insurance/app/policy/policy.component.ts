import { Component, OnInit } from '@angular/core';  
import { Cust } from '../cust';
import { CustomerService } from '../customer.service'; 
import { Policy } from '../policy';
import { Router, ActivatedRoute } from '@angular/router';
import { PolicyService } from '../policy.service';

@Component({
    templateUrl: 'policy.component.html',
    styleUrls: ['policy.component.css'],
    moduleId: module.id
})
     

export class PolicyComponent implements OnInit {
   

    // normally policy data read from data store. 
    
    // Policies = POLICIES;

    Policies: Policy[];

    Message: string = "";

    Customer: Cust;

    constructor(private customerService: CustomerService,
                private policyService: PolicyService,
                private router:Router) { }

    onReview() {

        this.router.navigate(["/review"])
    }


    ngOnInit() {

        // fill out list on screen
        this.policyService.listPolicies()
            .subscribe(

            (policyList:any) =>   { this.Policies = policyList; },
            (Error:any) =>        { this.Message  = Error.message }

            );
    }



    assignPolicy(event:any)
    { 

        this.Customer = this.customerService.fetchCustomer(); 

        var policyName = event.target.outerText;
        var id: number = 0;
        var name: string = "";

        for (var item of this.Policies)
        {
            if (item.Name == policyName)
            {
                id = item.Id;
            }
        }
        this.Customer.PolicyName = policyName;
        this.Customer.PolicyID = id;
         
        this.customerService.updateCustomer(this.Customer)
            .subscribe(
           (cust)  => {

               
               this.customerService.passCustomer(this.Customer);

                // success route to review
                this.nav(this.router);
               
           }
           ,
           (Error:any) => {

               this.Message = Error.message;

           })

    }

    updateStored(policy:number, policyName:string) {

        this.Customer.PolicyID = policy;
        this.Customer.PolicyName = policyName;
        this.customerService.holdCustomer = this.Customer;
    }

    nav(router:Router) {

        router.navigate(["review"]);

    }
}
