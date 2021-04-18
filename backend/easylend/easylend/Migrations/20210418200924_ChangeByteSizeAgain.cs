using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace easylend.Migrations
{
    public partial class ChangeByteSizeAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "FileData",
                table: "Documents",
                type: "varbinary(1000000)",
                maxLength: 1000000,
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(10000)",
                oldMaxLength: 10000,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "FileData",
                table: "Documents",
                type: "varbinary(10000)",
                maxLength: 10000,
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(1000000)",
                oldMaxLength: 1000000,
                oldNullable: true);
        }
    }
}
