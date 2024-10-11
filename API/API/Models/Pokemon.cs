namespace API.Models;
public class Pokemon
{
    public Pokemon()
    {
        Id = Guid.NewGuid().ToString();
        CriadoEm = DateTime.Now;
    }

    public string? Id { get; set; }
    public string? Nome { get; set; }
    public List<string> Tipos { get; set; } = new List<string>();
    public string? Descricao { get; set; }
    public List<string> EvoluiPara { get; set; } = new List<string>();
    public List<string> PreEvolucoes { get; set; } = new List<string>();
    public DateTime CriadoEm { get; set; }
}