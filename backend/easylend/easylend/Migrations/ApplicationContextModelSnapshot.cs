﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using easylend.Database;

namespace easylend.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.6");

            modelBuilder.Entity("easylend.Database.Entities.Application", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("UserID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserID")
                        .IsUnique();

                    b.ToTable("Applications");
                });

            modelBuilder.Entity("easylend.Database.Entities.Goal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Balance")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<int>("GoalType")
                        .HasColumnType("int");

                    b.Property<decimal>("MonthlyAmount")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<decimal>("StartingAmount")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<decimal>("YearLimit")
                        .HasColumnType("decimal(18, 2)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Goals");
                });

            modelBuilder.Entity("easylend.Database.Entities.Loan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime");

                    b.Property<decimal>("InterestRate")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<bool>("IsOpen")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Loans");
                });

            modelBuilder.Entity("easylend.Database.Entities.Return", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<decimal>("Fee")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<int?>("LoanId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LoanId");

                    b.HasIndex("UserId");

                    b.ToTable("Returns");
                });

            modelBuilder.Entity("easylend.Database.Entities.RiskGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("MaxLoanAmount")
                        .HasColumnType("double");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("RiskGroups");
                });

            modelBuilder.Entity("easylend.Database.Entities.UserLoan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<int?>("InvestorId")
                        .HasColumnType("int");

                    b.Property<int?>("LoanId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("InvestorId");

                    b.HasIndex("LoanId");

                    b.ToTable("UserLoans");
                });

            modelBuilder.Entity("easylend.Database.Entities.Withdrawal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<string>("Iban")
                        .HasColumnType("text");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Withdrawals");
                });

            modelBuilder.Entity("easylend.Entities.Document", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("ApplicationID")
                        .HasColumnType("int");

                    b.Property<byte[]>("FileData")
                        .HasMaxLength(1000000)
                        .HasColumnType("varbinary(1000000)");

                    b.Property<string>("FileName")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("ApplicationID");

                    b.ToTable("Documents");
                });

            modelBuilder.Entity("easylend.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<decimal>("Balance")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime>("Birthdate")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("DateRegistered")
                        .HasColumnType("datetime");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<double>("MinInterestRate")
                        .HasColumnType("double");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("PersonalCode")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<int?>("RiskGroupId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RiskGroupId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("easylend.Database.Entities.Application", b =>
                {
                    b.HasOne("easylend.Entities.User", "User")
                        .WithOne("Application")
                        .HasForeignKey("easylend.Database.Entities.Application", "UserID");

                    b.Navigation("User");
                });

            modelBuilder.Entity("easylend.Database.Entities.Goal", b =>
                {
                    b.HasOne("easylend.Entities.User", "User")
                        .WithMany("Goals")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("easylend.Database.Entities.Loan", b =>
                {
                    b.HasOne("easylend.Entities.User", "User")
                        .WithMany("Loans")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("easylend.Database.Entities.Return", b =>
                {
                    b.HasOne("easylend.Database.Entities.Loan", "Loan")
                        .WithMany("Returns")
                        .HasForeignKey("LoanId");

                    b.HasOne("easylend.Entities.User", "User")
                        .WithMany("Returns")
                        .HasForeignKey("UserId");

                    b.Navigation("Loan");

                    b.Navigation("User");
                });

            modelBuilder.Entity("easylend.Database.Entities.UserLoan", b =>
                {
                    b.HasOne("easylend.Entities.User", "Investor")
                        .WithMany("UserLoans")
                        .HasForeignKey("InvestorId");

                    b.HasOne("easylend.Database.Entities.Loan", "Loan")
                        .WithMany("UserLoans")
                        .HasForeignKey("LoanId");

                    b.Navigation("Investor");

                    b.Navigation("Loan");
                });

            modelBuilder.Entity("easylend.Database.Entities.Withdrawal", b =>
                {
                    b.HasOne("easylend.Entities.User", "User")
                        .WithMany("Withdrawals")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("easylend.Entities.Document", b =>
                {
                    b.HasOne("easylend.Database.Entities.Application", "Application")
                        .WithMany("Documents")
                        .HasForeignKey("ApplicationID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Application");
                });

            modelBuilder.Entity("easylend.Entities.User", b =>
                {
                    b.HasOne("easylend.Database.Entities.RiskGroup", "RiskGroup")
                        .WithMany("Users")
                        .HasForeignKey("RiskGroupId");

                    b.Navigation("RiskGroup");
                });

            modelBuilder.Entity("easylend.Database.Entities.Application", b =>
                {
                    b.Navigation("Documents");
                });

            modelBuilder.Entity("easylend.Database.Entities.Loan", b =>
                {
                    b.Navigation("Returns");

                    b.Navigation("UserLoans");
                });

            modelBuilder.Entity("easylend.Database.Entities.RiskGroup", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("easylend.Entities.User", b =>
                {
                    b.Navigation("Application");

                    b.Navigation("Goals");

                    b.Navigation("Loans");

                    b.Navigation("Returns");

                    b.Navigation("UserLoans");

                    b.Navigation("Withdrawals");
                });
#pragma warning restore 612, 618
        }
    }
}
