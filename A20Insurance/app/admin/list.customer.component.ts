import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Cust } from '../cust'; 
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../customer.service'; 


@Component({
    templateUrl: 'list.customer.component.html',
    styleUrls: ['list.customer.component.css'],
    moduleId: module.id
})

export class ListCustomerComponent {
 

    FirstName: string = "";
    LastName: string = ""; 
    listOfCusts: Cust[];
    hideNavMenu = true;
     
    constructor(

        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService) { }
    
    onSubmit() {     

        

        // search customers.
        this.customerService.SearchCustomers(this.FirstName, this.LastName)
            .subscribe(
             custsFound  => { 

                 this.set(custsFound);
            }
            ,
            (Error) => {


            });
        
    }

    set(custsFound:any) {

        this.listOfCusts = custsFound;
    }
      

}