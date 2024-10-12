using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

app.MapGet("/", () => "API de pokedex");

app.MapPost("/api/pokemons/cadastrar", ([FromBody] Pokemon pokemon, [FromServices] AppDataContext ctx) => {
    ctx.Pokemons.Add(pokemon);
    ctx.SaveChanges();
    return Results.Created("", pokemon);
});

app.MapGet("/api/pokemons/listar", ([FromServices] AppDataContext ctx) => {
    if (ctx.Pokemons.Any()) {
        return Results.Ok(ctx.Pokemons.ToList());
    }

    return Results.NotFound();
});

app.MapGet("/api/pokemons/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) => {
    Pokemon? pokemon = ctx.Pokemons.FirstOrDefault(p => p.Nome == nome);
    if (pokemon is null) {
        return Results.NotFound();
    }

    return Results.Ok(pokemon);
});

app.MapDelete("/api/pokemons/deletar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) => {
    Pokemon? pokemon = ctx.Pokemons.FirstOrDefault(p => p.Nome == nome);
    if (pokemon is null) {
        return Results.NotFound();
    }

    ctx.Pokemons.Remove(pokemon);
    ctx.SaveChanges();
    return Results.Ok(pokemon);
});

app.MapPut("/api/pokemons/alterar/{nome}", ([FromRoute] string nome, [FromBody] Pokemon pokemonAlterado, [FromServices] AppDataContext ctx) => {
    Pokemon? pokemon = ctx.Pokemons.FirstOrDefault(p => p.Nome == nome);
    if (pokemon is null) {
        return Results.NotFound();
    }

    pokemon.Nome = pokemonAlterado.Nome;
    pokemon.Tipos = pokemonAlterado.Tipos;
    pokemon.Descricao = pokemonAlterado.Descricao;
    pokemon.EvoluiPara = pokemonAlterado.EvoluiPara;
    pokemon.PreEvolucoes = pokemonAlterado.PreEvolucoes;
    ctx.Pokemons.Update(pokemon);
    ctx.SaveChanges();
    return Results.Ok(pokemon);
});

app.Run();