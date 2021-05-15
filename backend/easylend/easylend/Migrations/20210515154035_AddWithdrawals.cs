using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace easylend.Migrations
{
    public partial class AddWithdrawals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Withdrawal",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Iban = table.Column<string>(type: "text", nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(18, 2)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Withdrawal", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Withdrawal_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Withdrawal_UserId",
                table: "Withdrawal",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Withdrawal");
        }
    }
}
