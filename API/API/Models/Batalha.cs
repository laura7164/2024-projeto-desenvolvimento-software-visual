
namespace API.Models;

public class Batalha
{
    public Batalha()
    {
        DataBatalha = DateTime.Now;
    }

    public int BatalhaId { get; set; }  // id da batalha
    public string? Titulo { get; set; }  // título da batalha
    public DateTime DataBatalha { get; set; }  // quando a batalha foi criada

    // relacionar os pokémons que vão batalhar, pegando seus IDs da classe SeusPokemons
    public int Pokemon1Id { get; set; } // id do primeiro pokemon

    public SeusPokemons? Pokemon1 { get; set; }
    public int Pokemon2Id { get; set; } // id do segundo pokemon

    public SeusPokemons? Pokemon2 { get; set; }

    public string? Vencedor { get; set; }
}
