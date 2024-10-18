using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

app.MapGet("/", () => "API de Pokemon");

// CRUD da classe PokemonWiki
app.MapPost("/api/pokemon_wiki/cadastrar", ([FromBody] PokemonWiki pokemon, [FromServices] AppDataContext ctx) =>
{
    var pokemonExistente = ctx.PokemonsWiki.FirstOrDefault(p => p.Nome == pokemon.Nome);

    if (pokemonExistente != null) {
        return Results.BadRequest("Já existe um Pokémon com esse nome.");
    }

    ctx.PokemonsWiki.Add(pokemon);
    ctx.SaveChanges();

    return Results.Created("", pokemon);
});

app.MapGet("/api/pokemon_wiki/listar", ([FromServices] AppDataContext ctx) =>
{

    if (ctx.PokemonsWiki.Any()) {
        return Results.Ok(ctx.PokemonsWiki.ToList());
    }

    return Results.NotFound();
});

app.MapGet("/api/pokemon_wiki/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) =>
{
    PokemonWiki? pokemon = ctx.PokemonsWiki.FirstOrDefault(p => p.Nome == nome);

    if (pokemon is null) {
        return Results.NotFound();
    }

    return Results.Ok(pokemon);
});

app.MapDelete("/api/pokemon_wiki/deletar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) =>
{
    PokemonWiki? pokemon = ctx.PokemonsWiki.FirstOrDefault(p => p.Nome == nome);

    if (pokemon is null) {
        return Results.NotFound();
    }

    ctx.PokemonsWiki.Remove(pokemon);
    ctx.SaveChanges();

    return Results.Ok(pokemon);
});

app.MapPut("/api/pokemon_wiki/alterar/{nome}", ([FromRoute] string nome, [FromBody] PokemonWiki pokemonAlterado, [FromServices] AppDataContext ctx) =>
{
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

// CRUD da classe SeusPokemons
app.MapPost("/api/seu_pokemon/cadastrar", ([FromBody] SeusPokemons seuPokemon, [FromServices] AppDataContext ctx) =>
{
    ctx.SeusPokemons.Add(seuPokemon);
    ctx.SaveChanges();

    return Results.Created("", seuPokemon);
});

app.MapGet("/api/seu_pokemon/listar", ([FromServices] AppDataContext ctx) =>
{

    if (ctx.SeusPokemons.Any()) {
        return Results.Ok(ctx.SeusPokemons.ToList());
    }

    return Results.NotFound();
});

app.MapGet("/api/seu_pokemon/buscar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    SeusPokemons? seuPokemon = ctx.SeusPokemons.Find(id);

    if (seuPokemon == null) {
        return Results.NotFound();
    }

    return Results.Ok(seuPokemon);
});

app.MapDelete("/api/seu_pokemon/deletar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    SeusPokemons? seuPokemon = ctx.SeusPokemons.Find(id);

    if (seuPokemon == null) {
        return Results.NotFound();
    }

    ctx.SeusPokemons.Remove(seuPokemon);
    ctx.SaveChanges();

    return Results.Ok(seuPokemon);
});

app.MapPut("/api/seu_pokemon/alterar/{id}", ([FromRoute] int id, [FromBody] SeusPokemons pokemonAlterado, [FromServices] AppDataContext ctx) =>
{
    SeusPokemons? pokemon = ctx.SeusPokemons.Find(id);

    if (pokemon == null) {
        return Results.NotFound();
    }

    pokemon.Nome = pokemonAlterado.Nome;
    pokemon.Tipos = pokemonAlterado.Tipos;
    pokemon.PC = pokemonAlterado.PC;

    ctx.SeusPokemons.Update(pokemon);
    ctx.SaveChanges();

    return Results.Ok(pokemon);
});

// CRUD da classe batalha (sem alterar)
app.MapPost("/api/batalha/cadastrar/{pokemonId1}/{pokemonId2}", ([FromRoute] int pokemonId1, [FromRoute] int pokemonId2, Batalha batalha, AppDataContext ctx) =>
{
    SeusPokemons? pokemon1 = ctx.SeusPokemons.Find(pokemonId1);
    SeusPokemons? pokemon2 = ctx.SeusPokemons.Find(pokemonId2);

    if (pokemon1 == null || pokemon2 == null) {
        return Results.BadRequest("Um ou ambos os IDs dos Pokémons não existem no banco de dados.");
    }

    batalha.Pokemon1 = pokemon1;
    batalha.Pokemon2 = pokemon2;

    batalha.DeterminarVencedor();

    ctx.Batalhas.Add(batalha);
    ctx.SaveChanges();

    var batalhaComPokemons = ctx.Batalhas.Include(b => b.Pokemon1).Include(b => b.Pokemon2).FirstOrDefault(b => b.BatalhaId == batalha.BatalhaId);

    return Results.Created("", batalhaComPokemons);
});


app.MapGet("/api/batalha/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Batalhas.Any()) {
        var batalhas = ctx.Batalhas.Include(b => b.Pokemon1).Include(b => b.Pokemon2).ToList();

        return Results.Ok(batalhas);
    }

    return Results.NotFound();
});


app.MapGet("/api/batalha/buscar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    var batalha = ctx.Batalhas.Include(b => b.Pokemon1).Include(b => b.Pokemon2).FirstOrDefault(b => b.BatalhaId == id);

    if (batalha == null) {
        return Results.NotFound();
    }

    return Results.Ok(batalha);
});

app.MapDelete("/api/batalha/deletar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    var batalha = ctx.Batalhas.Include(b => b.Pokemon1).Include(b => b.Pokemon2).FirstOrDefault(b => b.BatalhaId == id);

    if (batalha == null) {
        return Results.NotFound();
    }

    ctx.Batalhas.Remove(batalha);
    ctx.SaveChanges();

    return Results.Ok(batalha);
});

app.Run();
