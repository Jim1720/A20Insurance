using A20Insurance.Models;
using System.Linq;

namespace A20Insurance
{

    public class Loader
    {
        public void PolicyLoader()
        {
            PolicyDBConnect policyDBConnect = new PolicyDBConnect();
            var v = from p in policyDBConnect.Policies
                    select p;
            if (v.ToList().Count > 0) { return; }


            Policy[] policies = new Policy[]
            {

                        new Policy { Id = 1, Copay = 20, Deductible = 40, Name = "Standard", Rate = 250, Type = "Medical" },
                        new Policy { Id = 2, Copay = 40, Deductible = 60, Name = "Excellent", Rate = 300, Type = "Medical" },
                        new Policy { Id = 3, Copay = 50, Deductible = 80, Name = "Best", Rate = 350, Type = "Medical" }
            };
            policyDBConnect.Policies.AddRange(policies);
            policyDBConnect.SaveChanges();


        }

        // not done this way in prod!
        public void LoadServices()
        {
            ServiceDBConnect serviceDBConnect = new ServiceDBConnect();
            var v = from s in serviceDBConnect.Services
                    select s;
            if (v.ToList().Count > 0) { return; }

            Service[] services = new Service[] {

            new Service { Id = 1, PolicyId = 1, ServiceName = "X Ray" },
            new Service { Id = 2, PolicyId = 1, ServiceName = "Exam" },
            new Service { Id = 3, PolicyId = 2, ServiceName = "Exam" },
            new Service { Id = 4, PolicyId = 3, ServiceName = "Exam" }
            };

            serviceDBConnect.Services.AddRange(services);
            serviceDBConnect.SaveChanges();
        }


    }
}