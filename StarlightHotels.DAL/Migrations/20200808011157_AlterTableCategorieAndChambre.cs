using Microsoft.EntityFrameworkCore.Migrations;

namespace StarlightHotels.DAL.Migrations
{
    public partial class AlterTableCategorieAndChambre : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CH_Image",
                table: "Chambre");

            migrationBuilder.DropColumn(
                name: "CAT_Image",
                table: "Categorie");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CH_Image",
                table: "Chambre",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CAT_Image",
                table: "Categorie",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }
    }
}
