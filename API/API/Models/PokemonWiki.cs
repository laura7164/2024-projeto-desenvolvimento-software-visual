// para guardar as informações dos pokemons na 'wiki'
// lembrando que não iremos poder adicionar dois pokemons com o mesmo nome

namespace API.Models;

public class PokemonWiki {
    public PokemonWiki() {
        PokemonWikiId = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;
    }

    public string? PokemonWikiId { get; set; } // id do pokemon
    public string? Nome {get; set;} // nome do pokemon
    public string? Descricao {get; set;} // descrição do pokemon (informações, é forte contra, é fraco contra)
    public List<string> EvoluiPara {get; set;} = new List<string>(); // proxima evolução do pokemon
    public List<string> PreEvolucoes {get; set;} = new List<string>(); // pre evoluções do pokemon
    public DateTime CriadoEm {get; set;} // data/horario que o pokemon foi criado
    public Tipo Tipo { get; set; }
    public int TipoId { get; set; }
}
