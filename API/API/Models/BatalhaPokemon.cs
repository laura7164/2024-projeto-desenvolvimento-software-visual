namespace API.Models;

public class BatalhaPokemon {
    public BatalhaPokemon() {
        Id = Guid.NewGuid().ToString();
    }

    public string? Id {get; set;}
    public string? BatalhaId {get; set;}  
    public Batalha Batalha {get; set;}  

    public string? NomePokemon1 {get; set;}  
    public int PcPokemon1 {get; set;}      

    public string? NomePokemon2 {get; set;} 
    public int PcPokemon2 {get; set;}
}