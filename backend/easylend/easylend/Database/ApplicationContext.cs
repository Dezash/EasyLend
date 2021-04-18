using easylend.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using easylend.Database.Entities;

namespace easylend.Database
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Document> Documents { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            //
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(a => a.Application).WithOne(u => u.User).IsRequired(false);
            });

            modelBuilder.Entity<Application>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Status).HasConversion(v => v.ToString(), v => (Status)Enum.Parse(typeof(Status), v));
                entity.HasMany(d => d.Documents).WithOne(a => a.Application).OnDelete(DeleteBehavior.Cascade);
            });

        }
    }
}