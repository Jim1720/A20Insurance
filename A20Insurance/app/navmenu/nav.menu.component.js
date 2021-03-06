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
var nav_service_1 = require("../nav.service");
var NavMenuComponent = /** @class */ (function () {
    function NavMenuComponent(route, router, navService) {
        this.route = route;
        this.router = router;
        this.navService = navService;
        this.message = {
            show: false,
            first: "",
            last: ""
        };
    }
    NavMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        // listen for menu changes from nav service called by components : app,register,review-signin,admin-signin.
        // these turn menu on or off
        this.navService.currentMessage
            .subscribe(function (message) {
            _this.message = message;
            // reset menu based on message
            _this.showNavMenu = message.show;
            _this.customerFirstName = message.first;
            _this.customerLastName = message.last;
        });
    };
    // recieve link actions from nav menu
    NavMenuComponent.prototype.onRoute = function (event) {
        var whereTo = event.target.innerText;
        if (whereTo == "Admin") {
            whereTo = "admin";
        }
        if (whereTo == "Register") {
            whereTo = "register";
        }
        if (whereTo == "Sign-In") {
            whereTo = "signin";
        }
        if (whereTo == "Splash") {
            whereTo = "splash";
        }
        if (whereTo == "Classic") {
            whereTo = "classic";
        }
        if (whereTo == "Review") {
            whereTo = "review";
        }
        if (whereTo == "File") {
            whereTo = "review/claim";
        }
        if (whereTo == "History") {
            whereTo = "review/history";
        }
        this.router.navigate([whereTo]);
    };
    NavMenuComponent = __decorate([
        core_1.Component({
            selector: 'my-nav',
            templateUrl: 'nav.menu.component.html',
            styleUrls: ['nav.menu.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            nav_service_1.NavService])
    ], NavMenuComponent);
    return NavMenuComponent;
}());
exports.NavMenuComponent = NavMenuComponent;
//# sourceMappingURL=nav.menu.component.js.map