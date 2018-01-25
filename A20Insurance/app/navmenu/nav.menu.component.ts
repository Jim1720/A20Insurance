import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';   
import { NavService } from '../nav.service';
import { NavMessage} from '../navmessage';


@Component({
    selector: 'my-nav',
    templateUrl: 'nav.menu.component.html',
    styleUrls:  ['nav.menu.component.css'],
    moduleId: module.id
})

export class NavMenuComponent implements OnInit  { 
     
    constructor(  
        private route: ActivatedRoute,
        private router: Router,
        private navService: NavService) { } 

    message: NavMessage =
    {
        show: false,
        first: "",
        last: ""
    }

    showNavMenu: boolean;
    customerFirstName: string;
    customerLastName: string;

    ngOnInit() {

        // listen for menu changes from nav service called by components : app,register,review-signin,admin-signin.
        // these turn menu on or off
        this.navService.currentMessage
            .subscribe(message => {
                this.message = message;

                // reset menu based on message
                this.showNavMenu = message.show;
                this.customerFirstName = message.first;
                this.customerLastName = message.last;

            }); 
    }
    

    // recieve link actions from nav menu
    onRoute(event: any) { 

        var whereTo = event.target.innerText;
        if (whereTo == "Admin") { whereTo = "admin"; }
        if (whereTo == "Register") { whereTo = "register"; }
        if (whereTo == "Sign-In") { whereTo = "signin"; }
        if (whereTo == "Splash") { whereTo = "splash"; }
        if (whereTo == "Classic") { whereTo = "classic"; }

        if (whereTo == "Review") { whereTo = "review"; }
        if (whereTo == "File") { whereTo = "review/claim"; }
        if (whereTo == "History") { whereTo = "review/history"; }

        this.router.navigate([whereTo]);


    }
     
}