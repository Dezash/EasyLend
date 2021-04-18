using Microsoft.EntityFrameworkCore.Migrations;

namespace easylend.Migrations
{
    public partial class AddCascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Applications_ApplicationID",
                table: "Documents");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Applications_ApplicationID",
                table: "Documents",
                column: "ApplicationID",
                principalTable: "Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Applications_ApplicationID",
                table: "Documents");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Applications_ApplicationID",
                table: "Documents",
                column: "ApplicationID",
                principalTable: "Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
