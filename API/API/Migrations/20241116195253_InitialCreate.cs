using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PokemonsWiki",
                columns: table => new
                {
                    PokemonWikiId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Tipos = table.Column<string>(type: "TEXT", nullable: false),
                    Descricao = table.Column<string>(type: "TEXT", nullable: true),
                    EvoluiPara = table.Column<string>(type: "TEXT", nullable: false),
                    PreEvolucoes = table.Column<string>(type: "TEXT", nullable: false),
                    CriadoEm = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PokemonsWiki", x => x.PokemonWikiId);
                });

            migrationBuilder.CreateTable(
                name: "SeusPokemons",
                columns: table => new
                {
                    SeusPokemonsId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Tipos = table.Column<string>(type: "TEXT", nullable: false),
                    PC = table.Column<int>(type: "INTEGER", nullable: false),
                    CriadoEm = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeusPokemons", x => x.SeusPokemonsId);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    UsuarioId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: true),
                    Password = table.Column<string>(type: "TEXT", nullable: true),
                    CriadoEm = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.UsuarioId);
                });

            migrationBuilder.CreateTable(
                name: "Batalhas",
                columns: table => new
                {
                    BatalhaId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Titulo = table.Column<string>(type: "TEXT", nullable: true),
                    DataBatalha = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Pokemon1Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Pokemon2Id = table.Column<int>(type: "INTEGER", nullable: false),
                    Vencedor = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Batalhas", x => x.BatalhaId);
                    table.ForeignKey(
                        name: "FK_Batalhas_SeusPokemons_Pokemon1Id",
                        column: x => x.Pokemon1Id,
                        principalTable: "SeusPokemons",
                        principalColumn: "SeusPokemonsId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Batalhas_SeusPokemons_Pokemon2Id",
                        column: x => x.Pokemon2Id,
                        principalTable: "SeusPokemons",
                        principalColumn: "SeusPokemonsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Batalhas_Pokemon1Id",
                table: "Batalhas",
                column: "Pokemon1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Batalhas_Pokemon2Id",
                table: "Batalhas",
                column: "Pokemon2Id");

            migrationBuilder.CreateIndex(
                name: "IX_PokemonsWiki_Nome",
                table: "PokemonsWiki",
                column: "Nome",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Batalhas");

            migrationBuilder.DropTable(
                name: "PokemonsWiki");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "SeusPokemons");
        }
    }
}
