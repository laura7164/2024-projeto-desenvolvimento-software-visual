namespace API.Models;

public class Tipo {
    public int TipoId { get; set; }
    public string? Nome { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}
