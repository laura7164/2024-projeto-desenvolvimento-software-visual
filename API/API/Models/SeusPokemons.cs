// para armazenar os pokemons do usuário
// aqui o usuário poderá adicionar mais de um pokemon com o mesmo nome

namespace API.Models;

public class SeusPokemons
{
    public SeusPokemons()
    {
        CriadoEm = DateTime.Now;
    }

    public int SeusPokemonsId { get; set; } // id do pokemon
    public string? Nome { get; set; } // nome do pokemon
    public List<string> Tipos { get; set; } = new List<string>(); // uma lista caso ele tenha mais de um tipo
    public int PC { get; set; } // pontos de combate do pokemon
    public DateTime CriadoEm { get; set; } // quando o pokemon foi criado

}
