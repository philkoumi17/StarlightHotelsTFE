using Microsoft.EntityFrameworkCore.Migrations;

namespace StarlightHotels.API.Migrations
{
    public partial class Clienttablemodified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Client");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "Client",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
