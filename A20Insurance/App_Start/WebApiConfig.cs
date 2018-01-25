using A20Insurance.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace A20Insurance
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/Cust/Defualt" 
                               
            );

            config.Routes.MapHttpRoute(
                name: "CustomerApi",
                routeTemplate: "api/Cust",
                defaults: new { id = RouteParameter.Optional }

            );

            config.Routes.MapHttpRoute(
               name: "ClaimApi",
               routeTemplate: "api/Claim",
               defaults: new { id = RouteParameter.Optional }

            );

            config.Routes.MapHttpRoute(
             name: "AdminApi",
             routeTemplate: "api/Admin",
             defaults: new { id = RouteParameter.Optional }

          );

        config.Routes.MapHttpRoute(
           name: "PolicyApi",
           routeTemplate: "api/Policy",
           defaults: new { id = RouteParameter.Optional }

        );

        config.Routes.MapHttpRoute(
          name: "ServiceApi",
          routeTemplate: "api/Service",
          defaults: new { id = RouteParameter.Optional }

       );


            // update database configurations.

            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<CustomerDBConnect>()); 
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<ClaimDBConnect>());
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<ServiceDBConnect>());
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<PolicyDBConnect>());

         }
    }
}
