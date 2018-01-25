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
var customer_service_1 = require("../customer.service");
var claim_service_1 = require("../claim.service");
var router_1 = require("@angular/router");
var policy_service_1 = require("../policy.service");
var nav_service_1 = require("../nav.service");
var ReviewComponent = /** @class */ (function () {
    function ReviewComponent(customerService, claimService, policyService, navService, router) {
        this.customerService = customerService;
        this.claimService = claimService;
        this.policyService = policyService;
        this.navService = navService;
        this.router = router;
        // initializer: set claim and policy buttons on screen by getting claim count and assignment of policy indication.
        // check policy field and set button to name : add name to customer object and policy id too. drop db.
        this.submitted = false;
        this.ValidationSummary = "";
        this.New = {
            Password: ""
        };
        this.Message = "";
        this.ShowHistory = "Show History";
        // on init: read cust from service and populate screen. it was put there in signin.
        this.whatPolicy = "Select Policy";
        this.policyButtonColor = "";
    }
    ReviewComponent.prototype.ngOnInit = function () {
        // fetch customer
        this.Customer = this.customerService.fetchCustomer();
        if (this.Customer.ClaimCount == 0) {
            this.ShowHistory = "No Claims";
        }
        if (this.Customer.ClaimCount == 1) {
            this.ShowHistory = "1 Claim";
        }
        if (this.Customer.ClaimCount >= 2) {
            this.ShowHistory = this.Customer.ClaimCount.toString() + " Claims";
        }
        if (this.Customer.PolicyID == 0) {
            this.policyButtonColor = "Red"; // alert user to select a policy
        }
        else {
            this.policyButtonColor = "Green";
            this.whatPolicy = "Change Policy";
        }
    };
    ReviewComponent.prototype.onFile = function () {
        this.router.navigate(['review/claim']);
    };
    ReviewComponent.prototype.onHistory = function () {
        this.router.navigate(['review/history']);
    };
    ReviewComponent.prototype.onSubmit = function () {
        // use click event so message does not clear in case of error.
        var _this = this;
        // if new password entered supply it
        if (this.New.Password != "") {
            this.Message = this.customerService.PasswordRuleCheck(this.New.Password);
            if (this.Message != "") {
                return;
            } // invalid password
            this.Customer.Password = this.New.Password;
        }
        this.submitted = true;
        //passed.
        this.customerService.updateCustomer(this.Customer)
            .subscribe(function (cust) {
            // edits
            _this.customerService.passCustomer(cust);
            _this.Message = "Customer Data Updated";
        }, function (Error) {
            _this.Message = Error.message;
        });
    };
    ReviewComponent.prototype.onSignOut = function () {
        // clear hold customer
        this.customerService.clearHold();
        // message menu to turn off links at right
        this.navService.hideNavMenu();
        // return to first splash screen.
        this.router.navigate(['splash']);
    };
    ReviewComponent = __decorate([
        core_1.Component({
            templateUrl: 'review.component.html',
            styleUrls: ['review.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            claim_service_1.ClaimService,
            policy_service_1.PolicyService,
            nav_service_1.NavService,
            router_1.Router])
    ], ReviewComponent);
    return ReviewComponent;
}());
exports.ReviewComponent = ReviewComponent;
//# sourceMappingURL=review.component.js.map