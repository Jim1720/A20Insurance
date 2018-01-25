import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Cust } from '../cust'; 
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../customer.service';
import { AdminService } from '../admin.service';
import { Admin } from '../admin';  
import { NavService } from '../nav.service';
 

@Component({
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css'],
    moduleId: module.id
})

export class AdminComponent implements OnInit {

    admin : Admin = {

        AdminId: "",
        Password: "" 
    }

    Status: string = "";

    ngOnInit() {
         
        this.Status = (this.adminService.SignedIn() == true) ? "Signed In" : "Signed Out";

        // sign out customer
        this.navService.hideNavMenu();

        // clear hold data : TODO: we could do this but choose not to overhead. 'customerservice.clearhold'.
    }


    Message: string = "";   
    Action: string = "";

     
    constructor(

        private route: ActivatedRoute,
        private router: Router,
        private adminService: AdminService,
        private navService: NavService) { }
    
    onSubmit() {    

        if (this.Action == "")
        {
            this.Message = "Please select an action...";
            return;
        }

        if (this.adminService.SignedIn() == true)
        {
            this.adminService.storeAction(this.Action);
            this.setRoute(); // do not have to re-sign in.
        }

        var check:string = this.admin.AdminId + "-" + this.admin.Password;

        // check credentials.
        this.adminService.getAdminCredentials(check)
            .subscribe(

            // mess will be empty if edits pass otherwise error condition ...
            (result: string) => {

                if (result != "OK") {
                    this.setMessage(result);
                }
                else
                {
                    // store add policy or update policy for screen action.
                    this.adminService.storeAction(this.Action);
                    // frame issue set it outside of subscribe()
                    this.adminService.SignIn();
                    this.navService.hideNavMenu();
                    this.setRoute();
                }
            },
            (Error:any) => { this.Message = Error.message } 
            );

       
    }

    setMessage(result: string) {
        // outside of frame
        this.Message = result;
    }

    setRoute() {

        // route to action. 
        if (this.Action == "Customer List") {
            this.router.navigate(["listcustomer"]);
        }

        if (this.Action == "Reset Password") {
            this.router.navigate(["reset"]);
        } 

        if (this.Action == "Add Policy" || this.Action == "Update Policy") {
            this.router.navigate(["maintainpolicies"]);
        } 



    }
}