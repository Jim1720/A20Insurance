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
var router_1 = require("@angular/router");
var nav_service_1 = require("../nav.service");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(customerService, router, navService) {
        this.customerService = customerService;
        this.router = router;
        this.navService = navService;
        this.success = false;
        this.Message = "";
        this.Customer = {
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
        };
    }
    RegisterComponent.prototype.onSubmit = function () {
        if (this.Customer.PromotionCode != "100") {
            this.Message = "Enter valid promotion code.";
            return;
        }
        this.Customer.ClaimCount = 0;
        this.Customer.PolicyName = "No Policy Assigned";
        this.Message = this.customerService.PasswordRuleCheck(this.Customer.Password);
        if (this.Message != "") {
            return;
        } // invalid password
        this.addCustomer();
    };
    RegisterComponent.prototype.addCustomer = function () {
        var _this = this;
        this.customerService.addCustomer(this.Customer)
            .subscribe(function (cust) {
            if (cust.CustomerID == "Duplicate Customer") {
                _this.Message = "Duplcate Customer";
                return;
            }
            else {
                _this.success = true;
                _this.storeCustomer();
                _this.navService.enableNavMenu(_this.Customer.FirstName, _this.Customer.LastName);
                _this.router.navigate(['review']); // on to customer review
            }
        }, function (Error) {
            _this.showError(Error.message);
        });
    };
    RegisterComponent.prototype.storeCustomer = function () {
        // frame issue: do this here: store customer.
        this.customerService.passCustomer(this.Customer);
    };
    RegisterComponent.prototype.showError = function (Error) {
        this.Message = Error;
    };
    RegisterComponent = __decorate([
        core_1.Component({
            templateUrl: 'register.component.html',
            styleUrls: ['register.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            router_1.Router,
            nav_service_1.NavService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map