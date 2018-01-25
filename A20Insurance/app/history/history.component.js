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
var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(claimService, router, customerService) {
        this.claimService = claimService;
        this.router = router;
        this.customerService = customerService;
        this.Status = "Paid";
    }
    HistoryComponent.prototype.onReview = function () {
        this.router.navigate(["/review"]);
    };
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.Customer = this.customerService.fetchCustomer();
        this.claimService.readClaimHistory(this.Customer.CustomerID)
            .subscribe(function (claims) {
            _this.listOfClaims = claims;
        }, function (Error) {
            _this.Message = Error.message;
            if (_this.Message.includes("404") == true) {
                _this.Message = "No Claims Found";
            }
        });
    };
    HistoryComponent = __decorate([
        core_1.Component({
            templateUrl: 'history.component.html',
            styleUrls: ['history.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [claim_service_1.ClaimService,
            router_1.Router,
            customer_service_1.CustomerService])
    ], HistoryComponent);
    return HistoryComponent;
}());
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=history.component.js.map