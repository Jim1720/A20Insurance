import { Component, OnInit } from '@angular/core'; 
import { Claim } from '../claim';
import { ClaimService } from '../claim.service';
import { Cust } from '../cust';
import { CustomerService } from '../customer.service'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({ 
    templateUrl: 'history.component.html',
    styleUrls: [ 'history.component.css'],
    moduleId: module.id
})
export class HistoryComponent implements OnInit {

    constructor(private claimService: ClaimService,
        private router: Router,
        private customerService: CustomerService) { }
     
    Customer: Cust;
    Message: string; 
    listOfClaims: Claim[]; 
    Status: string = "Paid";

    onReview() {

        this.router.navigate(["/review"])
    }
  
     
    ngOnInit() {

         

        this.Customer = this.customerService.fetchCustomer(); 
         

        this.claimService.readClaimHistory(this.Customer.CustomerID)
            .subscribe( 
               claims => { 

                   this.listOfClaims = claims;

                 }
                ,
               (Error) => {

                   this.Message = Error.message;

                   if (this.Message.includes("404") == true) {

                       this.Message = "No Claims Found";
                   }

               })
        } 
}
