namespace A20Insurance.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    

    public class Service
    {
        public int Id { get; set; }
        public int PolicyId { get; set; }
        public string ServiceName { get; set; } 
     
    }
    public class ServiceDBConnect : DbContext
    {

        public ServiceDBConnect()  
        {

        }

        public DbSet<Service> Services { get; set; }
    }


    public sealed class Configuration3 : DbMigrationsConfiguration<CustomerDBConnect>
    {
        public Configuration3()
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