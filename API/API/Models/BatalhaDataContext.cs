using Microsoft.EntityFrameworkCore;

namespace API.Models;
public class BatalhaDataContext : DbContext
{
    public DbSet<Batalha> Batalhas {get; set;}
    public DbSet<BatalhaPokemon> BatalhaPokemons {get; set;}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=batalhas.db");
    }

}