using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

app.MapGet("/", () => "API de Pokemon");

app.MapPost("/api/pokemon_wiki/cadastrar", ([FromBody] PokemonWiki pokemon, [FromServices] AppDataContext ctx) => {
    var pokemonExistente = ctx.PokemonsWiki.FirstOrDefault(p => p.Nome == pokemon.Nome);

    if (pokemonExistente != null) {
        return Results.BadRequest("Já existe um Pokémon com esse nome.");
    }
    
    ctx.PokemonsWiki.Add(pokemon);
    ctx.SaveChanges();

    return Results.Created("", pokemon);
});

app.MapGet("/api/pokemon_wiki/listar", ([FromServices] AppDataContext ctx) => {

    if (ctx.PokemonsWiki.Any()) {
        return Results.Ok(ctx.PokemonsWiki.ToList());
    }

    return Results.NotFound();
});

app.MapGet("/api/pokemon_wiki/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) => {
    PokemonWiki? pokemon = ctx.PokemonsWiki.FirstOrDefault(p => p.Nome == nome);
    
    if (pokemon is null) {
        return Results.NotFound();
    }

    return Results.Ok(pokemon);
});

app.MapDelete("/api/pokemon_wiki/deletar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) => {
    PokemonWiki? pokemon = ctx.PokemonsWiki.FirstOrDefault(p => p.Nome == nome);
    
    if (pokemon is null) {
        return Results.NotFound();
    }

    ctx.PokemonsWiki.Remove(pokemon);
    ctx.SaveChanges();
    return Results.Ok(pokemon);
});

app.MapPut("/api/pokemon_wiki/alterar/{nome}", ([FromRoute] string nome, [FromBody] PokemonWiki pokemonAlterado, [FromServices] AppDataContext ctx) => {
    PokemonWiki? pokemon = ctx.PokemonsWiki.FirstOrDefault(p => p.Nome == nome);
    
    if (pokemon is null) {
        return Results.NotFound();
    }

    pokemon.Nome = pokemonAlterado.Nome;
    pokemon.Tipos = pokemonAlterado.Tipos;
    pokemon.Descricao = pokemonAlterado.Descricao;
    pokemon.EvoluiPara = pokemonAlterado.EvoluiPara;
    pokemon.PreEvolucoes = pokemonAlterado.PreEvolucoes;

    ctx.PokemonsWiki.Update(pokemon);
    ctx.SaveChanges();
    return Results.Ok(pokemon);
});

app.Run();
