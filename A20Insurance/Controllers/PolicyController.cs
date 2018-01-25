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
    public class PolicyController : ApiController
    {

        public void PolicyLoader()
        {
            PolicyDBConnect policyDBConnect = new PolicyDBConnect();
            var v = from p in policyDBConnect.Policies
                    select p;
            if( v.ToList().Count  >  0) { return;  }


            Policy[] policies = new Policy[]
            {

                new Policy { Id = 1, Copay = 20, Deductible = 40, Name = "Standard", Rate = 250, Type = "Medical" },
                new Policy { Id = 2, Copay = 40, Deductible = 60, Name = "Excellent", Rate = 300, Type = "Medical" },
                new Policy { Id = 3, Copay = 50, Deductible = 80, Name = "Best", Rate = 350, Type = "Medical" }
            };
            policyDBConnect.Policies.AddRange(policies);
            policyDBConnect.SaveChanges();

        }

        // list all policies
        // api/Policy/list/
        [HttpGet]
        [System.Web.Http.Route("api/Policy/list/")]
        public HttpResponseMessage ListAllPolicies()
        {
            PolicyLoader();

            List<Policy> policyList = new List<Policy>();

            PolicyDBConnect policyDBConnect = new PolicyDBConnect();
            var pol = from p in policyDBConnect.Policies
                      select p; 
           foreach(var item in pol)
            {
                policyList.Add(item);
            } 

            if (policyList.Count > 0)
            {
                string output = JsonConvert.SerializeObject(policyList);
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

        [HttpGet]
        [Route("api/Policy/read/{id}")]
        public HttpResponseMessage ReadPolicy(int id)
        {
            // Read Policy
            PolicyDBConnect policyDBConnect = new PolicyDBConnect();
            var pol = from p in policyDBConnect.Policies
                      where p.Id == id
                      select p;
            Policy po = new Policy();
            foreach(var p in pol)
            {
                po.Id = p.Id;
                po.Copay = p.Copay;
                po.Deductible = p.Deductible;
                po.Rate = p.Rate;
                po.Type = p.Type;
                po.Name = p.Name;
            }
            if (po != null)
            {
                string output = JsonConvert.SerializeObject(po);
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

        [HttpPost]
        [Route("api/Policy/")]
        public HttpResponseMessage AddPolcy([FromBody]Policy policy)
        {
            // Add Policy
            PolicyDBConnect policyDBConnect = new PolicyDBConnect();
            policyDBConnect.Policies.Add(policy);
            policyDBConnect.SaveChanges();
 
            string output = JsonConvert.SerializeObject(policy);
            return new HttpResponseMessage()
            {

                Content = new StringContent(output, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.Created
            };
           

        }

        [HttpPut]
        [Route("api/Policy/")]
        public HttpResponseMessage UpdatePolicy([FromBody]Policy policy)
        {
            // Update Policy
            PolicyDBConnect policyDBConnect = new PolicyDBConnect();
            Policy pi = null;
            var pol = from p in policyDBConnect.Policies
                      where p.Id == policy.Id
                      select p;
            foreach(var item in pol)
            {
                item.Name = policy.Name;
                item.Rate = policy.Rate;
                item.Deductible = policy.Deductible;
                item.Copay = policy.Copay;
            } 
            policyDBConnect.SaveChanges();

            string output = JsonConvert.SerializeObject(pi);
            return new HttpResponseMessage()
            {

                Content = new StringContent(output, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.Created
            };


        } 
             
    }
}
