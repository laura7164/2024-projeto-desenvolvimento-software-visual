// para armazenar os pokemons do usuário
// aqui o usuário poderá adicionar mais de um pokemon com o mesmo nome

namespace API.Models;

public class SeusPokemons {
    public SeusPokemons() {
        SeusPokemonsId = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;
    }

    public string? SeusPokemonsId {get; set;} // id do pokemon
    public string? Nome {get; set;} // nome do pokemon
    public int PC {get; set;} // pontos de combate do pokemon
    public DateTime CriadoEm {get; set;} // quando o pokemon foi criado
    public Tipo Tipo { get; set; }
    public int TipoId { get; set; }
}
