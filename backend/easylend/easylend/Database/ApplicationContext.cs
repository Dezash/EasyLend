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
        public DbSet<Goal> Goals { get; set; }
        public DbSet<RiskGroup> RiskGroups { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            //
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasMany(g => g.Goals).WithOne(u => u.User).IsRequired(false);
                entity.HasKey(u => u.Id);
                entity.HasOne(u => u.Application).WithOne(a => a.User).IsRequired(false);
                entity.HasMany(u => u.Loans).WithOne(l => l.User).IsRequired(false);
                entity.HasMany(u => u.Withdrawals).WithOne(w => w.User).IsRequired(false);
                entity.HasMany(u => u.UserLoans).WithOne(u => u.Investor).IsRequired(false);
                entity.HasMany(u => u.Returns).WithOne(r => r.User).IsRequired(false);
            });

            modelBuilder.Entity<Application>(entity =>
            {
                entity.HasKey(a => a.Id);
                entity.Property(a => a.Status).HasConversion(v => v.ToString(), v => (Status)Enum.Parse(typeof(Status), v));
                entity.HasMany(a => a.Documents).WithOne(d => d.Application).OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Loan>(entity =>
            {
                entity.HasKey(l => l.Id);
                entity.HasMany(l => l.UserLoans).WithOne(u => u.Loan);
                entity.HasMany(l => l.Returns).WithOne(r => r.Loan);
            });

            modelBuilder.Entity<RiskGroup>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasMany(u => u.Users).WithOne(r => r.RiskGroup).IsRequired(false);
            });
        }
    }
}