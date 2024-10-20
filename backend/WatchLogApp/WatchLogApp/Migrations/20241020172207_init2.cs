using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchLogApp.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "WatchStatus",
                table: "TVShows",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "WatchStatus",
                table: "Movies",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WatchStatus",
                table: "TVShows");

            migrationBuilder.DropColumn(
                name: "WatchStatus",
                table: "Movies");
        }
    }
}
