using A20Insurance.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net.Http.Formatting;
using System.Text;

namespace A20Insurance.Controllers
{
    public class ServiceController : ApiController
    {

        // list all policies
        // api/Policy/list/
        [HttpGet]
        [Route("api/Service/list/")]
        public HttpResponseMessage ListAllServices()
        {
            // list services for policy id
            ServiceDBConnect serviceDBConnect = new ServiceDBConnect();
            var serv = from s in serviceDBConnect.Services
                      select s;

            List<Service> services = new List<Service>();
            foreach (var item in serv)
            {
                services.Add(item);
            }

            if (services.Count > 0)
            {
                string output = JsonConvert.SerializeObject(services);
                return new HttpResponseMessage()
                {

                    Content = new StringContent(output, Encoding.UTF8, "application/json"),
                    StatusCode = HttpStatusCode.Created
                };
            }
            else
            {
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.NotFound
                };
            }
        }



    }
}
