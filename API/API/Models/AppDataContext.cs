using Microsoft.EntityFrameworkCore;
namespace API.Models;

public class AppDataContext : DbContext {
    public DbSet<PokemonWiki> PokemonsWiki {get; set;} // tabela para a armazenar os pokemons da 'wiki'
    public DbSet<SeusPokemons> SeusPokemons {get; set;}  // tabela para a armazenar os seus pokémons
    public DbSet<Batalha> Batalhas {get; set;} // tabela para a armazenar as batalhas
    public DbSet<Tipo> Tipos {get; set;} // tabela para a armazenar os tipos


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseSqlite("Data Source=pokemons.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<PokemonWiki>().HasIndex(p => p.Nome).IsUnique();  // garante que o nome seja único

        modelBuilder.Entity<Batalha>().HasOne(b => b.Pokemon1).WithMany().HasForeignKey(b => b.Pokemon1Id).OnDelete(DeleteBehavior.Cascade); // exclui em cascata

        modelBuilder.Entity<Batalha>().HasOne(b => b.Pokemon2).WithMany().HasForeignKey(b => b.Pokemon2Id).OnDelete(DeleteBehavior.Cascade);

        base.OnModelCreating(modelBuilder);
    }
}
