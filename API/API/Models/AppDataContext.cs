using Microsoft.EntityFrameworkCore;
namespace API.Models;

public class AppDataContext : DbContext {
    public DbSet<PokemonWiki> PokemonsWiki {get; set;} // tabela para a armazenar os pokemons da 'wiki'
    public DbSet<SeusPokemons> SeusPokemons {get; set;}  // tabela para a armazenar os seus pokémons
    public DbSet<Batalha> Batalhas {get; set;} // tabela para a armazenar as batalhas

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseSqlite("Data Source=pokemons.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<PokemonWiki>().HasIndex(p => p.Nome).IsUnique();  // farante que o nome seja único
    }
}
