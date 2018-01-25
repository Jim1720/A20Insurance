namespace A20Insurance.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    

    public class Policy
    {

        public int Id { get; set; }
        public decimal Deductible { get; set; }
        public string  Name { get; set; }
        public decimal Copay { get; set; }
        public decimal Rate { get; set; }
        public string Type { get; set; }

    }
     
         
 


    public class PolicyDBConnect : DbContext
    {

        public PolicyDBConnect()  
        {
        }

        public DbSet<Policy> Policies { get; set; }
    }



    public sealed class Configuration2 : DbMigrationsConfiguration<PolicyDBConnect>
    {
        public Configuration2()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;

            // Very important! Gives me enough time to wait for Azure
            // to initialize (Create -> Migrate -> Seed) the database.
            // Usually Azure needs 1-2 minutes so the default value of
            // 30 seconds is not big enough!
            CommandTimeout = 830;
        }

    }

}