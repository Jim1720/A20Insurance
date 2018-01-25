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
var claim_service_1 = require("../claim.service");
var customer_service_1 = require("../customer.service");
var router_1 = require("@angular/router");
var service_service_1 = require("../service.service");
var ClaimComponent = /** @class */ (function () {
    function ClaimComponent(claimService, customerService, serviceService, router) {
        this.claimService = claimService;
        this.customerService = customerService;
        this.serviceService = serviceService;
        this.router = router;
        this.custFirst = "";
        this.custLast = "";
        this.Message = "";
        this.claimErrors = false;
        this.submit = false;
        this.claim = {
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
        };
    }
    ClaimComponent.prototype.ngOnInit = function () {
        // fetch customer / we need custid, first, last name for screen now.
        this.Customer = this.customerService.fetchCustomer();
        this.claim.CustomerID = this.Customer.CustomerID;
        this.custFirst = this.Customer.FirstName;
        this.custLast = this.Customer.LastName;
        this.loadServices();
    };
    ClaimComponent.prototype.loadServices = function () {
        var _this = this;
        this.serviceService.listAllServices()
            .subscribe(function (serviceList) { _this.services = serviceList; }, function (Error) { _this.Message = Error.message; });
    };
    ClaimComponent.prototype.onReview = function () {
        this.router.navigate(["/review"]);
    };
    ClaimComponent.prototype.onSubmit = function () {
        var _this = this;
        this.editor();
        if (this.claimErrors == true) {
            return;
        }
        // edit: insure polcy set on customer
        if (this.Customer.PolicyID == 0) {
            this.Message = "Customer must select a policy before claims can be submitted. Assign Polcy now.";
            this.claimErrors = true;
            return;
        }
        this.claimService.addClaim(this.claim)
            .subscribe(function () {
            _this.router.navigate(["review"]);
        }, function (Error) {
            _this.Message = Error.message;
        });
        // bump claim count on customer 
        this.Customer.ClaimCount++;
        this.customerService.updateCustomer(this.Customer)
            .subscribe(function (cust) {
            //store customer with updated count
            _this.customerService.passCustomer(_this.Customer);
            _this.router.navigate(["review"]);
        }, function (Error) { _this.Message = Error.message; });
    };
    ClaimComponent.prototype.editor = function () {
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
            var mm = parseInt(this.claim.DateService.substring(0, 2));
            var dd = parseInt(this.claim.DateService.substring(3, 5));
            var yy = parseInt(this.claim.DateService.substring(6, 8));
        }
        else {
            var mm = parseInt(this.claim.DateService.substring(0, 2));
            var dd = parseInt(this.claim.DateService.substring(2, 4));
            var yy = parseInt(this.claim.DateService.substring(4, 6));
        }
        if (mm > 0 && mm < 13) { }
        else {
            this.claimErrors = true;
            this.Message += "Invalid date of service month.";
        }
        if (dd > 0 && dd < 32) { }
        else {
            this.claimErrors = true;
            this.Message += "Invalid date of service day.";
        }
        if (yy > 15 && yy < 19) { }
        else {
            this.claimErrors = true;
            this.Message += "Invalid date of service year.";
        }
        // mm: yy check
        if ((mm == 9 || mm == 4 || mm == 6 || mm == 11) && dd == 31) {
            this.claimErrors = true;
            this.Message += "Invalid date of service date - 31 for month invalid.";
        }
        var leap = (yy % 4) == 0; // leap year.
        if ((mm == 2 && dd > 28 && leap == false) || (mm == 2 && dd > 29 && leap == true)) {
            this.claimErrors = true;
            this.Message += "Invalid date of service date - Invlaid day for Feburary.";
        }
    };
    ClaimComponent = __decorate([
        core_1.Component({
            templateUrl: 'claim.component.html',
            styleUrls: ['claim.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [claim_service_1.ClaimService,
            customer_service_1.CustomerService,
            service_service_1.ServiceService,
            router_1.Router])
    ], ClaimComponent);
    return ClaimComponent;
}());
exports.ClaimComponent = ClaimComponent;
//# sourceMappingURL=claim.component.js.map