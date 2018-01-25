namespace A20Insurance.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    

    public class Claim
    {

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }

        public int Id { get; set; } 
        public string CustomerID { get; set; }  
        public string Service { get; set; } 
        public string DateService { get; set; }
        public string Note { get; set; }  
        public string Location { get; set; } 
        public string Clinic { get; set; } 
        public string Physician { get; set; } 
        public string First { get; set; } 
        public string Last { get; set; }  
        public string Diag1 { get; set; } 
        public string Diag2 { get; set; } 
        public string Proc1 { get; set; } 
        public string Proc2 { get; set; } 
        public string Proc3 { get; set; } 
        public string ReferPhysicianClinic { get; set; } 
        public string PayMethod { get; set; } 
    }



    public class ClaimDBConnect : DbContext
    {

        public ClaimDBConnect() 
        {
        }

        public DbSet<Claim> Claims { get; set; }
    }


    public sealed class Configuration1 : DbMigrationsConfiguration<ClaimDBConnect>
    {
        public Configuration1()
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