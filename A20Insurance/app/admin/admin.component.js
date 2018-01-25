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
var router_1 = require("@angular/router");
var admin_service_1 = require("../admin.service");
var nav_service_1 = require("../nav.service");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(route, router, adminService, navService) {
        this.route = route;
        this.router = router;
        this.adminService = adminService;
        this.navService = navService;
        this.admin = {
            AdminId: "",
            Password: ""
        };
        this.Status = "";
        this.Message = "";
        this.Action = "";
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.Status = (this.adminService.SignedIn() == true) ? "Signed In" : "Signed Out";
        // sign out customer
        this.navService.hideNavMenu();
        // clear hold data : TODO: we could do this but choose not to overhead. 'customerservice.clearhold'.
    };
    AdminComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.Action == "") {
            this.Message = "Please select an action...";
            return;
        }
        if (this.adminService.SignedIn() == true) {
            this.adminService.storeAction(this.Action);
            this.setRoute(); // do not have to re-sign in.
        }
        var check = this.admin.AdminId + "-" + this.admin.Password;
        // check credentials.
        this.adminService.getAdminCredentials(check)
            .subscribe(
        // mess will be empty if edits pass otherwise error condition ...
        function (result) {
            if (result != "OK") {
                _this.setMessage(result);
            }
            else {
                // store add policy or update policy for screen action.
                _this.adminService.storeAction(_this.Action);
                // frame issue set it outside of subscribe()
                _this.adminService.SignIn();
                _this.navService.hideNavMenu();
                _this.setRoute();
            }
        }, function (Error) { _this.Message = Error.message; });
    };
    AdminComponent.prototype.setMessage = function (result) {
        // outside of frame
        this.Message = result;
    };
    AdminComponent.prototype.setRoute = function () {
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
    };
    AdminComponent = __decorate([
        core_1.Component({
            templateUrl: 'admin.component.html',
            styleUrls: ['admin.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            admin_service_1.AdminService,
            nav_service_1.NavService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map