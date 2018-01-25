using A20Insurance.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http; 
using Newtonsoft.Json;
using System.Web.Http.Controllers;
using System.Net.Http.Formatting;
using System.Text;
using System.Web.Http.Results;

namespace A20Insurance.Controllers
{
    public class CustController : ApiController
    {
        [HttpPut]
        [Route("api/Claim/bump")]
        public HttpResponseMessage BumpClaimCount(string id)
        {
            // add 1 to count of claims for customer.
            CustomerDBConnect customerDBConnect = new CustomerDBConnect();
            var cust = from c in customerDBConnect.Custs
                       where c.CustomerID == id
                       select c;

            Cust rCust = new Cust();
            foreach (var cus in cust)
            {
                cus.ClaimCount++;
                rCust = cus;
            }
            customerDBConnect.SaveChanges();


            string output = JsonConvert.SerializeObject(rCust);
            return new HttpResponseMessage()
            {

                Content = new StringContent(output, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.Created
            };
        }
            

        [HttpGet]
        [Route("api/Cust/search/{id}")]
        public HttpResponseMessage CustomerSerch(string id)
        { 

            int indexDash = id.IndexOf('-'); // last name after dash.
            string firstName = "";
            string lastName = "";
            if (indexDash == 0 && id.Length > 1) // get last name
            {
                lastName = id.Substring(1); // -lastname
            }
            else if (indexDash == (id.Length - 1)) // firstname-
            {
                firstName = id.Trim('-');
            }
            else
            {
                lastName = id.Substring(indexDash + 1);  // firstname-lastname
                firstName = id.Substring(0, indexDash);
            }

            List<Cust> customerList = new List<Cust>(); 

            CustomerDBConnect customerDbConnect = new CustomerDBConnect();
            // 4 cases for name blank situations.
            if (firstName == "" && lastName != "")
            {
                var cus = from c in customerDbConnect.Custs
                          orderby c.LastName, c.FirstName
                          where c.LastName.StartsWith(lastName)
                          select c;
                customerList = cus.ToList();
            }

            if (firstName != "" && lastName == "")
            {
                var cus = from c in customerDbConnect.Custs
                          orderby c.LastName, c.FirstName
                          where c.FirstName.StartsWith(firstName)
                          select c;
                customerList = cus.ToList();
            }

            if (firstName != "" && lastName != "")
            {
                var cus = from c in customerDbConnect.Custs
                          orderby c.LastName, c.FirstName
                          where c.FirstName.StartsWith(firstName) &&
                                c.LastName.StartsWith(lastName)
                          select c;
                customerList = cus.ToList();
            }

            if (firstName == "" && lastName == "")
            {
                var cus = from c in customerDbConnect.Custs
                          orderby c.LastName, c.FirstName
                          select c;
                customerList = cus.ToList();
            }


            if (customerList.Count > 0)
            {
                string output = JsonConvert.SerializeObject(customerList);
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

        // GET: api/Cust/5
        [HttpGet]
        [Route("api/Cust/{id}")]
        public HttpResponseMessage Get(string id)
        {

            // Read Customer 

            string CustomerID = id;
            Cust rCustomer = new Cust();
            CustomerDBConnect customerDbConnect = new CustomerDBConnect();
            var found = false;
            var cus = from cu in customerDbConnect.Custs
                      where cu.CustomerID == CustomerID
                      select cu;
            foreach (var c in cus)
            {
                rCustomer = c; 
                var passe = c.Encrypted; ;
                c.Password = Security.cry(passe, -1); 
                found = true;
            }
            if (found == true)
            {
                string output = JsonConvert.SerializeObject(rCustomer);
                return new HttpResponseMessage()
                {

                    Content = new StringContent(output, Encoding.UTF8, "application/json"),
                    StatusCode = HttpStatusCode.Created
                };
            }
            else
            {
                rCustomer.CustomerID = "Not Found";
                string output = JsonConvert.SerializeObject(rCustomer);
                return new HttpResponseMessage()
                {
                     
                     Content = new StringContent(output, Encoding.UTF8, "application/json"),
                     StatusCode = HttpStatusCode.Created
                };
            }
        }


        // POST: api/Cust  
        [HttpPost]
        [Route("api/Cust")]
        public HttpResponseMessage Post([FromBody]Cust cust)
        {
            // add customer

            try
            {

                string output = "";

                // add customer
                CustomerDBConnect customerDbConnect = new CustomerDBConnect();

                // duplicate check 
                bool dupCust = false;
                var dup = from c in customerDbConnect.Custs
                          where c.CustomerID == cust.CustomerID
                          select c;
                foreach (var cDup in dup)
                {
                    dupCust = true;
                }

                if (dupCust)
                {
                    cust.CustomerID = "Duplicate Customer";

                    output = JsonConvert.SerializeObject(cust);

                    return new HttpResponseMessage()
                    {
                        Content = new StringContent(output, Encoding.UTF8, "application/json"),
                        StatusCode = HttpStatusCode.Created
                    };

                }

                // ready to add if first '1' custID prime databases.
                // when cutomer number one is added load the
                // poicy and service databases.
                if (cust.CustomerID == "1")
                {
                    Loader loader = new Loader();
                    loader.PolicyLoader();
                    loader.LoadServices();
                }

                cust.Encrypted = Security.cry(cust.Password, 1);
                cust.Password = "enc";

                customerDbConnect.Custs.Add(cust);
                customerDbConnect.SaveChanges();
                output = JsonConvert.SerializeObject(cust);

                return new HttpResponseMessage()
                {
                    Content = new StringContent(output, Encoding.UTF8, "application/json"),
                    StatusCode = HttpStatusCode.Created
                };

            } 
            catch(System.Exception ex)
            {

                string theMessage = "[ Error creating customer ] " + ex.ToString();

                return new HttpResponseMessage()
                {
                    Content = new StringContent(theMessage, Encoding.UTF8, "application/json"),
                    StatusCode = HttpStatusCode.BadRequest
                };

            }

        }

        // Put: api/Cust  
        [HttpPut]
        [Route("api/Cust")]
        public HttpResponseMessage Put([FromBody]Cust cust)
        {
            // Update Customer
            CustomerDBConnect customerDbConnect = new CustomerDBConnect();
            var cus = from c in customerDbConnect.Custs
                      where c.CustomerID == cust.CustomerID
                      select c;
            foreach (var u in cus)
            {
                u.CustomerID = cust.CustomerID;

                u.Encrypted = Security.cry(cust.Password, 1);
                u.Password = "enc";

                u.FirstName = cust.FirstName;
                u.LastName = cust.LastName;

                u.Email = cust.Email;
                u.Phone = cust.Phone;

                u.Address1 = cust.Address1;
                u.Address2 = cust.Address2;

                u.City = cust.City;
                u.State = cust.State;
                u.Zip = cust.Zip;

                u.ClaimCount = cust.ClaimCount;
                u.PolicyName = cust.PolicyName;
                u.PolicyID = cust.PolicyID;

                u.PromotionCode = cust.PromotionCode;
            }
            customerDbConnect.SaveChanges();

            string output = JsonConvert.SerializeObject(cust);

            return new HttpResponseMessage()
            {
                Content = new StringContent(output, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.Created
            };

        }

         
        // reset password removed.
        // password routine for temp password removed.
    }
}
