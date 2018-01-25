"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var policy_service_1 = require("../policy.service");
var router_1 = require("@angular/router");
var admin_service_1 = require("../admin.service");
var PolicyMaintComponent = /** @class */ (function () {
    function PolicyMaintComponent(policyService, adminService, router) {
        this.policyService = policyService;
        this.adminService = adminService;
        this.router = router;
        this.Message = "";
        this.policy = {
            Id: 0,
            Name: "",
            Deductible: 0,
            Copay: 0,
            Rate: 0,
            Type: ""
        };
        this.allTypes = [
            "Medical",
            "Dental"
        ];
    }
    PolicyMaintComponent.prototype.ngOnInit = function () {
        // screen has add mode and update mode. Get selected mode and update values for *ngIf to show different parts of screen.
        this.Action = this.adminService.readAction();
        if (this.Action == "Add Policy") {
            this.Add = "define";
        }
        if (this.Action == "Update Policy") {
            this.Update = "define";
        }
        // get list of policies - to display in update mode and to edit in add mode.
        this.getPolicyList();
    };
    PolicyMaintComponent.prototype.getPolicyList = function () {
        var _this = this;
        // fill policy name field when update screen shown.
        // fill policy list only on add screen for edit purposes.
        this.policyService.listPolicies()
            .subscribe(function (list) {
            _this.policyList = list;
            if (_this.Action == "Update Policy") {
                // default to 1st policy to display
                _this.policy = _this.policyList[0];
            }
        }, function (Error) { _this.Message = Error; });
    };
    PolicyMaintComponent.prototype.onSubmit = function () {
        var _this = this;
        this.edit();
        if (this.Message != "") {
            return;
        }
        // do update or add
        if (this.Action == "Add Policy") {
            this.policy.Name = this.NewName;
            this.policyService.addPolicy(this.policy)
                .subscribe(function (policy) { _this.Message = "Polcy Added."; }, function (Error) { _this.Message = Error; });
            // stay with policy but change screen to update.
            this.adminService.storeAction("Update Policy");
            this.router.navigate(["maintainpolicies"]); // come back to this screen.
        }
        if (this.Action == "Update Policy") {
            this.policyService.updatePolicy(this.policy)
                .subscribe(function (policy) { _this.Message = "Polcy Updated."; }, function (Error) { _this.Message = Error; });
        }
    };
    PolicyMaintComponent.prototype.onPolicyNameChange = function (event) {
        // fill screen values in with matching policy values. 
        // the user can add or update : default action is add in this case but they can enter new policy
        // name and select add to create a new policy.
        // look in policy list for values and fill screen. 
        for (var _i = 0, _a = this.policyList; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.Name == event) {
                //show selected policy on screen.
                this.policy = item;
            }
        }
        return;
    };
    PolicyMaintComponent.prototype.edit = function () {
        // screen can add or update policies
        this.Message = "";
        if (this.Action == "Add Policy") {
            if (this.NewName == "") {
                this.Message = "For Add: please enter new policy name";
                return;
            }
            // verify data range 
            var a = new RegExp("^[a-zA-Z]+$");
            if (!a.test(this.NewName)) {
                this.Message = "new policy name is invalid.";
            }
            ;
            // verify not duplicate name.
            for (var _i = 0, _a = this.policyList; _i < _a.length; _i++) {
                var item = _a[_i];
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
        if (isNaN(this.policy.Deductible)) {
            this.Message += " Deductible invalid.";
        }
        ;
        if (isNaN(this.policy.Copay)) {
            this.Message += " Co-Pay is invalid.";
        }
        ;
        if (isNaN(this.policy.Rate)) {
            this.Message += " Rate is invalid.";
        }
        ;
        if (this.policy.Type == "") {
            this.Message += " Policy type invalid.";
        }
        ;
    };
    PolicyMaintComponent = __decorate([
        core_1.Component({
            templateUrl: 'policy.maint.component.html',
            styleUrls: ['policy.maint.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [policy_service_1.PolicyService,
            admin_service_1.AdminService,
            router_1.Router])
    ], PolicyMaintComponent);
    return PolicyMaintComponent;
}());
exports.PolicyMaintComponent = PolicyMaintComponent;
//# sourceMappingURL=policy.maint.component.js.map