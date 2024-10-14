using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.AddDbContext<BatalhaDataContext>();
var app = builder.Build();

app.MapGet("/", () => "API de pokedex");

app.MapPost("/api/pokedex/cadastrar", ([FromBody] Pokedex pokemon, [FromServices] AppDataContext ctx) =>
{
    var pokemonExistente = ctx.Pokedex.FirstOrDefault(p => p.Nome.ToLower() == pokemon.Nome.ToLower());

    if (pokemonExistente != null)
    {
        return Results.BadRequest($"O Pokémon com o nome {pokemon.Nome} já está cadastrado.");
    }

    ctx.Pokedex.Add(pokemon);
    ctx.SaveChanges();
    return Results.Created("", pokemon);
});


app.MapGet("/api/pokedex/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Pokedex.Any())
    {
        return Results.Ok(ctx.Pokedex.ToList());
    }

    return Results.NotFound();
});

app.MapGet("/api/pokedex/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) =>
{
    Pokedex? pokemon = ctx.Pokedex.FirstOrDefault(p => p.Nome == nome);
    if (pokemon is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(pokemon);
});

app.MapDelete("/api/pokedex/deletar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) =>
{
    Pokedex? pokemon = ctx.Pokedex.FirstOrDefault(p => p.Nome == nome);
    if (pokemon is null)
    {
        return Results.NotFound();
    }

    ctx.Pokedex.Remove(pokemon);
    ctx.SaveChanges();
    return Results.Ok(pokemon);
});

app.MapPut("/api/pokedex/alterar/{nome}", ([FromRoute] string nome, [FromBody] Pokedex pokemonAlterado, [FromServices] AppDataContext ctx) =>
{
    Pokedex? pokemon = ctx.Pokedex.FirstOrDefault(p => p.Nome == nome);
    if (pokemon is null)
    {
        return Results.NotFound();
    }

    pokemon.Nome = pokemonAlterado.Nome;
    pokemon.Tipos = pokemonAlterado.Tipos;
    pokemon.Descricao = pokemonAlterado.Descricao;
    pokemon.EvoluiPara = pokemonAlterado.EvoluiPara;
    pokemon.PreEvolucoes = pokemonAlterado.PreEvolucoes;
    ctx.Pokedex.Update(pokemon);
    ctx.SaveChanges();
    return Results.Ok(pokemon);
});

app.Run();