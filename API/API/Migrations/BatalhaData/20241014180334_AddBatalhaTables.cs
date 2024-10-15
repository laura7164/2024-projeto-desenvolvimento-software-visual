using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations.BatalhaData
{
    /// <inheritdoc />
    public partial class AddBatalhaTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Batalhas",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    DataBatalha = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Resultado = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Batalhas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BatalhaPokemons",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    BatalhaId = table.Column<string>(type: "TEXT", nullable: true),
                    NomePokemon1 = table.Column<string>(type: "TEXT", nullable: true),
                    PcPokemon1 = table.Column<int>(type: "INTEGER", nullable: false),
                    NomePokemon2 = table.Column<string>(type: "TEXT", nullable: true),
                    PcPokemon2 = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BatalhaPokemons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BatalhaPokemons_Batalhas_BatalhaId",
                        column: x => x.BatalhaId,
                        principalTable: "Batalhas",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BatalhaPokemons_BatalhaId",
                table: "BatalhaPokemons",
                column: "BatalhaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BatalhaPokemons");

            migrationBuilder.DropTable(
                name: "Batalhas");
        }
    }
}
