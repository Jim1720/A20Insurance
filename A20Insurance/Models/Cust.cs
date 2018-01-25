namespace A20Insurance.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

  


    public class Cust
    {

        public int Id { get; set; }
        public string CustomerID { get; set; }
        public string Password { get; set; }
        public string Encrypted { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string PromotionCode { get; set; } 
        public int    PolicyID { get; set; }
        public string PolicyName { get; set; }
        public int    ClaimCount { get; set; }

    }


    public class CustomerDBConnect : DbContext
    {

        public CustomerDBConnect() 
        {
        }

        public DbSet<Cust> Custs { get; set; }
    }

    public sealed class Configuration : DbMigrationsConfiguration<CustomerDBConnect>
    {
        public Configuration()
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