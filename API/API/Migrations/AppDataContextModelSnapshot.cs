﻿using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

#nullable disable

namespace API.Migrations {
    [DbContext(typeof(AppDataContext))]
    partial class AppDataContextModelSnapshot : ModelSnapshot {
        protected override void BuildModel(ModelBuilder modelBuilder) {
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("API.Models.Batalha", b =>
                {
                    b.Property<string>("BatalhaId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DataBatalha")
                        .HasColumnType("TEXT");

                    b.Property<string>("Pokemon1Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("Pokemon2Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("Titulo")
                        .HasColumnType("TEXT");

                    b.Property<string>("Vencedor")
                        .HasColumnType("TEXT");

                    b.HasKey("BatalhaId");

                    b.HasIndex("Pokemon1Id");

                    b.HasIndex("Pokemon2Id");

                    b.ToTable("Batalhas");
                });

            modelBuilder.Entity("API.Models.PokemonWiki", b =>
                {
                    b.Property<string>("PokemonWikiId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CriadoEm")
                        .HasColumnType("TEXT");

                    b.Property<string>("Descricao")
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("EvoluiPara")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.PrimitiveCollection<string>("PreEvolucoes")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("TipoId")
                        .HasColumnType("INTEGER");

                    b.HasKey("PokemonWikiId");

                    b.HasIndex("Nome")
                        .IsUnique();

                    b.HasIndex("TipoId");

                    b.ToTable("PokemonsWiki");
                });

            modelBuilder.Entity("API.Models.SeusPokemons", b =>
                {
                    b.Property<string>("SeusPokemonsId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CriadoEm")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.Property<int>("PC")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TipoId")
                        .HasColumnType("INTEGER");

                    b.HasKey("SeusPokemonsId");

                    b.HasIndex("TipoId");

                    b.ToTable("SeusPokemons");
                });

            modelBuilder.Entity("API.Models.Tipo", b =>
                {
                    b.Property<int>("TipoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CriadoEm")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.HasKey("TipoId");

                    b.ToTable("Tipos");
                });

            modelBuilder.Entity("API.Models.Batalha", b =>
                {
                    b.HasOne("API.Models.SeusPokemons", "Pokemon1")
                        .WithMany()
                        .HasForeignKey("Pokemon1Id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("API.Models.SeusPokemons", "Pokemon2")
                        .WithMany()
                        .HasForeignKey("Pokemon2Id")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Pokemon1");

                    b.Navigation("Pokemon2");
                });

            modelBuilder.Entity("API.Models.PokemonWiki", b =>
                {
                    b.HasOne("API.Models.Tipo", "Tipo")
                        .WithMany()
                        .HasForeignKey("TipoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tipo");
                });

            modelBuilder.Entity("API.Models.SeusPokemons", b =>
                {
                    b.HasOne("API.Models.Tipo", "Tipo")
                        .WithMany()
                        .HasForeignKey("TipoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tipo");
                });

        }
    }
}
