using Microsoft.EntityFrameworkCore.Migrations;

namespace easylend.Migrations
{
    public partial class fixTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "YearLimit",
                table: "Goals",
                type: "decimal(18, 2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<decimal>(
                name: "StartingAmount",
                table: "Goals",
                type: "decimal(18, 2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<decimal>(
                name: "MonthlyAmount",
                table: "Goals",
                type: "decimal(18, 2)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AddColumn<decimal>(
                name: "Balance",
                table: "Goals",
                type: "decimal(18, 2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Balance",
                table: "Goals");

            migrationBuilder.AlterColumn<double>(
                name: "YearLimit",
                table: "Goals",
                type: "double",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 2)");

            migrationBuilder.AlterColumn<double>(
                name: "StartingAmount",
                table: "Goals",
                type: "double",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 2)");

            migrationBuilder.AlterColumn<double>(
                name: "MonthlyAmount",
                table: "Goals",
                type: "double",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 2)");
        }
    }
}
