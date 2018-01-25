import { Component, OnInit, Output } from '@angular/core';    
import { Router, ActivatedRoute } from '@angular/router';   
import { NavService } from './nav.service';


@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    moduleId: module.id
})
export class AppComponent implements OnInit  {
     
    isExpanded: boolean;

    constructor(private router: Router,
                private navService: NavService) { }

    ngOnInit() {

        this.navService.hideNavMenu();
    }   

    onRoute(event:any)
    {

        // make menu hide and route.

        this.isExpanded = false;
        var whereTo = event.target.innerText;
        if (whereTo == "Admin") { whereTo = "admin"; }
        if (whereTo == "Register") { whereTo = "register"; }        
        if (whereTo == "Sign-In") { whereTo = "signin"; }
        if (whereTo == "Splash") { whereTo = "splash"; }
        if (whereTo == "Classic") { whereTo = "classic"; }

        if (whereTo == "Review") { whereTo = "review"; }
        if (whereTo == "File") { whereTo = "review/claim"; }
        if (whereTo == "History") { whereTo = "review/history"; }
        if (whereTo == "About") { whereTo = "about"; }
        
        this.router.navigate([whereTo]);


    }
}