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
var of_1 = require("rxjs/observable/of");
var http_1 = require("@angular/common/http");
//import { _catch } from 'rxjs/operator' 
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'content-Type': 'application/json' })
};
var CustomerService = /** @class */ (function () {
    function CustomerService(http) {
        this.http = http;
    }
    // Add Customer
    CustomerService.prototype.addCustomer = function (cust) {
        var url = 'api/Cust';
        var jcust = JSON.stringify(cust);
        return this.http.post(url, jcust, httpOptions);
    };
    // Update Customer
    CustomerService.prototype.updateCustomer = function (cust) {
        var url = 'api/Cust';
        return this.http.put(url, cust, httpOptions);
    };
    // Read Customer
    CustomerService.prototype.readCustomer = function (CustomerID) {
        var url = 'api/Cust/' + CustomerID;
        return this.http.get(url, httpOptions);
    };
    // passCustomer , fetchCustomer use service to pass cust data from component.
    // may need output,input etc.
    CustomerService.prototype.passCustomer = function (cust) {
        this.holdCustomer = cust;
    };
    CustomerService.prototype.fetchCustomer = function () {
        return this.holdCustomer;
    };
    CustomerService.prototype.clearHold = function () {
        this.holdCustomer = null;
    };
    // admin: search customer data
    CustomerService.prototype.SearchCustomers = function (FirstName, LastName) {
        var url = 'api/Cust/search/' + FirstName + "-" + LastName;
        return this.http.get(url, httpOptions);
    };
    // reset password removed.
    CustomerService.prototype.PasswordRuleCheck = function (p) {
        // min six characters: for test app we can have 6 characterss
        // 1 upper 
        // 1 lower
        // one special
        // or just '1', '2'.
        if (p == '1' || p == '2') {
            return "";
        } // easy testing
        if (p.length < 6) {
            return "Password must be at least six characters - with mixed case letters used.";
        }
        if (p.toUpperCase() == p) {
            return "Password must have at least one lower case letter.";
        }
        if (p.toLowerCase() == p) {
            return 'Password must have at least one upper case letter.';
        }
        return "";
    };
    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
    CustomerService.prototype.log = function (item) {
        console.log(item);
    };
    CustomerService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return of_1.of(result);
        };
    };
    CustomerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map