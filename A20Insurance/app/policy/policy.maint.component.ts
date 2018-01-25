import { Component, OnInit } from '@angular/core';
import { Policy } from '../policy';
import { PolicyService } from '../policy.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
    templateUrl: 'policy.maint.component.html',
    styleUrls:  ['policy.maint.component.css'],
    moduleId: module.id
})

export class PolicyMaintComponent implements OnInit {
     
     

    Message = ""; 

    Action:string; // unless user selects existing policy from dropdown to maintain. Then "Update".

    constructor(private policyService: PolicyService,
        private adminService: AdminService,
        private router: Router) { }


    policy: Policy = {

        Id: 0,
        Name: "",
        Deductible: 0,
        Copay: 0,
        Rate: 0,
        Type: ""
    }
     

    policyList: Policy[];

    SelectedName: string; // user selects policy to display on screen

    NewName: string // new policy name to add.

    Add: string;  //  ngIf show only on add
    Update: string;

    allTypes: string[] = [  // drop down - policy type.

        "Medical",
        "Dental"
    ]

    ngOnInit() { 
         
        // screen has add mode and update mode. Get selected mode and update values for *ngIf to show different parts of screen.
        this.Action = this.adminService.readAction();
        if (this.Action == "Add Policy") { this.Add = "define"; }
        if (this.Action == "Update Policy") { this.Update = "define"; }
        // get list of policies - to display in update mode and to edit in add mode.
        this.getPolicyList(); 

    }
     

    getPolicyList()
    {
        // fill policy name field when update screen shown.
        // fill policy list only on add screen for edit purposes.
        this.policyService.listPolicies()
            .subscribe(

            list => {

                this.policyList = list;

                if (this.Action == "Update Policy") {
                    // default to 1st policy to display
                    this.policy = this.policyList[0];
                }

            },
            (Error: any) => { this.Message = Error }

            )
    }

    onSubmit() {

        this.edit();

        if (this.Message != "") { return; }

        // do update or add

        if (this.Action == "Add Policy")
        {
            this.policy.Name = this.NewName;

            this.policyService.addPolicy(this.policy)
                .subscribe(

                (policy: any) => { this.Message = "Polcy Added."; },
                (Error: any) => { this.Message = Error }

            );

            // stay with policy but change screen to update.
            this.adminService.storeAction("Update Policy");
            this.router.navigate(["maintainpolicies"]); // come back to this screen.
            

        }
        if (this.Action == "Update Policy") {

            this.policyService.updatePolicy(this.policy)
                .subscribe(

                (policy: any) => { this.Message = "Polcy Updated."; },
                (Error: any) => { this.Message = Error }

                );
        }

    }

    onPolicyNameChange(event:any)
    {
        // fill screen values in with matching policy values. 
        // the user can add or update : default action is add in this case but they can enter new policy
        // name and select add to create a new policy.

       // look in policy list for values and fill screen. 

        for (var item of this.policyList) {
            if (item.Name == event) { 

                //show selected policy on screen.
                this.policy = item; 
            }
        } 

        return;
    }
     
    edit() {

            // screen can add or update policies

            this.Message = "";


            if (this.Action == "Add Policy") {
                if (this.NewName == "") {
                    this.Message = "For Add: please enter new policy name";
                    return;
            }

            // verify data range 
             
            var a = new RegExp("^[a-zA-Z]+$");
            if (!a.test(this.NewName)) { this.Message = "new policy name is invalid." };

            // verify not duplicate name.

            for (var item of this.policyList) {

                if (item.Name == this.NewName) {

                    this.Message = "For add: duplicate policy name.";
                    return;
                }
            } 

        }

        if (this.Action == "Update Policy") {


            if (this.SelectedName == "") {
                this.Message = "For Update: you must first select a policy name to update.";
                return;
            }
        }

        if (isNaN(this.policy.Deductible)) { this.Message += " Deductible invalid." };
        if (isNaN(this.policy.Copay)) { this.Message += " Co-Pay is invalid." };
        if (isNaN(this.policy.Rate)) { this.Message += " Rate is invalid." };
        if (this.policy.Type == "") { this.Message += " Policy type invalid." }; 
 
    }


}