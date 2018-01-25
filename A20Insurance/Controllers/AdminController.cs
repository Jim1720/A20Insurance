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
    public class AdminController : ApiController
    {
        // GET: Admin 
        [HttpGet]
        [Route("api/Admin/signon/{id}")]
        public HttpResponseMessage GetCredentials([FromUri]string id)
        {
            
            string adminID = id.Substring(0, id.IndexOf('-'));
            string adminPassword = id.Substring(id.IndexOf('-') + 1,id.Length - id.IndexOf('-') - 1);
            string result = Check(adminID, adminPassword);

            string output = JsonConvert.SerializeObject(result);

            return new HttpResponseMessage()
            {
                Content = new StringContent(output, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.Created
            };
        }

        // do not load this to github - authentication for admin -

        private string Check(string id, string pw)
        { 

            string day = DateTime.Now.Day.ToString();
            string pday = (DateTime.Now.Day * 1000).ToString();

            if (id != day) { return "Invalid Admin ID used."; }
            if (pw != pday) { return "Invalid Admin Password used."; }

            return "OK"; 
             
        }

        // GET: Admin - for password reset action - check the password used by admin...
        // do not load to git hub.
         
        [HttpGet]
        [Route("api/Admin/checkpass/{id}")]
        public HttpResponseMessage ResetCred([FromUri]string id)
        {

            string value = "seahawks12";
            string result = (id == value) ? "Valid" : "Bad Password Used.";

            string output = JsonConvert.SerializeObject(result);

            return new HttpResponseMessage()
            {
                Content = new StringContent(output, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.Created
            };
        }

    }
}