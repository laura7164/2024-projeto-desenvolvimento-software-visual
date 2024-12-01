using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations {
    /// <inheritdoc />
    public partial class InitialCreate : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "Tipos",
                columns: table => new
                {
                    TipoId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    CriadoEm = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tipos", x => x.TipoId);
                });

            migrationBuilder.CreateTable(
                name: "PokemonsWiki",
                columns: table => new
                {
                    PokemonWikiId = table.Column<string>(type: "TEXT", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    Descricao = table.Column<string>(type: "TEXT", nullable: true),
                    EvoluiPara = table.Column<string>(type: "TEXT", nullable: false),
                    PreEvolucoes = table.Column<string>(type: "TEXT", nullable: false),
                    CriadoEm = table.Column<DateTime>(type: "TEXT", nullable: false),
                    TipoId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PokemonsWiki", x => x.PokemonWikiId);
                    table.ForeignKey(
                        name: "FK_PokemonsWiki_Tipos_TipoId",
                        column: x => x.TipoId,
                        principalTable: "Tipos",
                        principalColumn: "TipoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SeusPokemons",
                columns: table => new
                {
                    SeusPokemonsId = table.Column<string>(type: "TEXT", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", nullable: true),
                    PC = table.Column<int>(type: "INTEGER", nullable: false),
                    CriadoEm = table.Column<DateTime>(type: "TEXT", nullable: false),
                    TipoId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeusPokemons", x => x.SeusPokemonsId);
                    table.ForeignKey(
                        name: "FK_SeusPokemons_Tipos_TipoId",
                        column: x => x.TipoId,
                        principalTable: "Tipos",
                        principalColumn: "TipoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Batalhas",
                columns: table => new
                {
                    BatalhaId = table.Column<string>(type: "TEXT", nullable: false),
                    Titulo = table.Column<string>(type: "TEXT", nullable: true),
                    DataBatalha = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Pokemon1Id = table.Column<string>(type: "TEXT", nullable: true),
                    Pokemon2Id = table.Column<string>(type: "TEXT", nullable: true),
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

            migrationBuilder.CreateIndex(
                name: "IX_PokemonsWiki_TipoId",
                table: "PokemonsWiki",
                column: "TipoId");

            migrationBuilder.CreateIndex(
                name: "IX_SeusPokemons_TipoId",
                table: "SeusPokemons",
                column: "TipoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "Batalhas");

            migrationBuilder.DropTable(
                name: "PokemonsWiki");

            migrationBuilder.DropTable(
                name: "SeusPokemons");

            migrationBuilder.DropTable(
                name: "Tipos");
        }
    }
}
