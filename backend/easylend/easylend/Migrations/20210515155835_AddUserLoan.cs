using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace easylend.Migrations
{
    public partial class AddUserLoan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserLoan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<decimal>(type: "decimal(18, 2)", nullable: false),
                    InvestorId = table.Column<int>(type: "int", nullable: true),
                    LoanId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLoan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserLoan_Loan_LoanId",
                        column: x => x.LoanId,
                        principalTable: "Loan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserLoan_Users_InvestorId",
                        column: x => x.InvestorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserLoan_InvestorId",
                table: "UserLoan",
                column: "InvestorId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLoan_LoanId",
                table: "UserLoan",
                column: "LoanId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserLoan");
        }
    }
}
