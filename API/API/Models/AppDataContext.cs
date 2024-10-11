using Microsoft.EntityFrameworkCore;

namespace API.Models;

public class AppDataContext : DbContext
{
    public DbSet<Pokemon> Pokemons { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=pokemon.db");
    }

}