using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using A20Insurance.Models;
using System.Web.Http;
using System.Net.Http.Formatting;
using Newtonsoft.Json;
using System.Text;

namespace A20Insurance.Controllers
{ 
    public class ClaimController : ApiController
    {

      

        // GET: api/Claim
        [Route("api/Claim/count/{id}")]
        public HttpResponseMessage GetCount(string id)
        { 
            ClaimDBConnect claimDBConnect = new ClaimDBConnect();
            var c = from cl in claimDBConnect.Claims
                    where cl.CustomerID == id
                    select cl;
            int number = c.Count();
            string output = JsonConvert.SerializeObject(number);
            return new HttpResponseMessage()
            {

                Content = new StringContent(output, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.Created
            };

        }

        // GET: api/Claim/history/{id}
        [Route("api/Claim/history/{id}")]
        public HttpResponseMessage GetHist(string id)
        { 
            ClaimDBConnect claimDBConnect = new ClaimDBConnect();
            List<Claim> claims = new List<Claim>();
            var clm = from c in claimDBConnect.Claims
                      where c.CustomerID == id
                      select c;
            foreach(var cl in clm)
            {
                claims.Add(cl);
            }

            if (claims.Count > 0)
            {
                string output = JsonConvert.SerializeObject(claims);
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

        

        // POST: api/Claim
        [HttpPost]
        [Route("api/Claim")]
        public HttpResponseMessage Post([FromBody]Claim claim)
        {

            // add claim

            ClaimDBConnect claimDBConnect = new ClaimDBConnect();
            claimDBConnect.Claims.Add(claim);
            claimDBConnect.SaveChanges();

            string output = JsonConvert.SerializeObject(claim);

            return new HttpResponseMessage()
            {
                Content = new StringContent(output, System.Text.Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.Created
            };


        }


    }
}
