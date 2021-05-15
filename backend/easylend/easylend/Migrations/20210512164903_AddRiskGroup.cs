using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace easylend.Migrations
{
    public partial class AddRiskGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RiskGroupId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RiskGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    MaxLoanAmount = table.Column<double>(type: "double", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiskGroups", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_RiskGroupId",
                table: "Users",
                column: "RiskGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_RiskGroups_RiskGroupId",
                table: "Users",
                column: "RiskGroupId",
                principalTable: "RiskGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_RiskGroups_RiskGroupId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "RiskGroups");

            migrationBuilder.DropIndex(
                name: "IX_Users_RiskGroupId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RiskGroupId",
                table: "Users");
        }
    }
}
