﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using easylend.Database;

namespace easylend.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20210418215419_AddDateRegistered")]
    partial class AddDateRegistered
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.5");

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

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("easylend.Database.Entities.Application", b =>
                {
                    b.HasOne("easylend.Entities.User", "User")
                        .WithOne("Application")
                        .HasForeignKey("easylend.Database.Entities.Application", "UserID");

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

            modelBuilder.Entity("easylend.Database.Entities.Application", b =>
                {
                    b.Navigation("Documents");
                });

            modelBuilder.Entity("easylend.Entities.User", b =>
                {
                    b.Navigation("Application");
                });
#pragma warning restore 612, 618
        }
    }
}
