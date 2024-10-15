namespace API.Models;

public class Batalha {
    public Batalha() {
        Id = Guid.NewGuid().ToString();
        DataBatalha = DateTime.Now;
    }

    public string? Id {get; set;}
    public string? Nome {get; set;}
    public DateTime DataBatalha {get; set;}

    public List<BatalhaPokemon> PokemonsNaBatalha {get; set;} = new List<BatalhaPokemon>();
    public string? Resultado {get; set;}
}