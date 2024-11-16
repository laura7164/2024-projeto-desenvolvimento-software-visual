namespace API.Models;

public class Usuario
{
    public Usuario() {
        CriadoEm = DateTime.Now;
    }

    public int UsuarioId { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public DateTime CriadoEm {get; set;}
}