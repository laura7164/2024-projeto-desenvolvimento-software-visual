namespace API.Models;

public class Batalha {
    public Batalha() {
        BatalhaId = Guid.NewGuid().ToString();
        DataBatalha = DateTime.Now;
    }

    public string? BatalhaId {get; set;}  // id da batalha
    public string? Titulo {get; set;}  // título da batalha
    public DateTime DataBatalha {get; set;}  // quando a batalha foi criada

    // relacionar os pokémons que vão batalhar, pegando seus IDs da classe SeusPokemons
    public string? Pokemon1Id {get; set;} // id do primeiro pokemon
    public SeusPokemons? Pokemon1 {get; set;}
    public string? Pokemon2Id {get; set;} // id do segundo pokemon
    public SeusPokemons? Pokemon2 {get; set;}

    public string? Vencedor {get; set;}

    public void DeterminarVencedor() {
        if (Pokemon1 != null && Pokemon2 != null) {
            if (Pokemon1.PC > Pokemon2.PC) {
                Vencedor = Pokemon1.Nome;
            } else if (Pokemon2.PC > Pokemon1.PC) {
                Vencedor = Pokemon2.Nome;
            } else {
                Vencedor = "Empate"; // caso o PC seja igual
            }
        }
    }
}
