using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "API de Pokemon");

// CRUD da classe PokemonWiki
app.MapPost("/api/pokemon_wiki/cadastrar", ([FromBody] PokemonWiki pokemon, [FromServices] AppDataContext ctx) =>
{
    // verifica se já existe um Pokémon com o mesmo nome
    var pokemonExistente = ctx.PokemonsWiki.FirstOrDefault(p => p.Nome == pokemon.Nome);
    if (pokemonExistente != null) {
        return Results.BadRequest("Já existe um Pokémon com esse nome.");
    }

    // verifica se o tipo do Pokémon existe no banco de dados
    Tipo? tipo = ctx.Tipos.Find(pokemon.TipoId);
    if (tipo is null) {
        return Results.NotFound("Tipo de Pokémon não encontrado.");
    }

    // associa o tipo ao Pokémon e salva no banco
    pokemon.Tipo = tipo;
    ctx.PokemonsWiki.Add(pokemon);
    ctx.SaveChanges();

    return Results.Created("", pokemon);
});


app.MapGet("/api/pokemon_wiki/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.PokemonsWiki.Any()) {
        return Results.Ok(ctx.PokemonsWiki.Include(x => x.Tipo).ToList());
    }

    return Results.NotFound();
});


app.MapGet("/api/pokemon_wiki/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) =>
{
    PokemonWiki? pokemon = ctx.PokemonsWiki
        .Include(p => p.Tipo) 
        .FirstOrDefault(p => p.Nome.ToLower() == nome.ToLower());

    if (pokemon is null) {
        return Results.NotFound("Pokémon não encontrado.");
    }

    return Results.Ok(pokemon);
});


app.MapDelete("/api/pokemon_wiki/deletar/{nome}", ([FromRoute] string nome, [FromServices] AppDataContext ctx) =>
{
    PokemonWiki? pokemon = ctx.PokemonsWiki
        .Include(p => p.Tipo)
        .FirstOrDefault(p => p.Nome.ToLower() == nome.ToLower());

    if (pokemon is null) {
        return Results.NotFound();
    }

    ctx.PokemonsWiki.Remove(pokemon);
    ctx.SaveChanges();

    return Results.Ok(pokemon);
});


app.MapPut("/api/pokemon_wiki/alterar/{nome}", ([FromRoute] string nome, [FromBody] PokemonWiki pokemonAlterado, [FromServices] AppDataContext ctx) =>
{
    PokemonWiki? pokemon = ctx.PokemonsWiki.Include(p => p.Tipo).FirstOrDefault(p => p.Nome == nome);

    if (pokemon is null) {
        return Results.NotFound();
    }

    Tipo? tipo = ctx.Tipos.Find(pokemonAlterado.TipoId);
    if (tipo is null) {
        return Results.NotFound("Tipo de Pokémon não encontrado.");
    }

    pokemon.Tipo = tipo;
    pokemon.Nome = pokemonAlterado.Nome;
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
    Tipo? tipo = ctx.Tipos.Find(seuPokemon.TipoId);
    if (tipo is null) {
        return Results.NotFound();
    }

    seuPokemon.Tipo = tipo;

    ctx.SeusPokemons.Add(seuPokemon);
    ctx.SaveChanges();

    return Results.Created("", seuPokemon);
});


app.MapGet("/api/seu_pokemon/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.SeusPokemons.Any()) {
        return Results.Ok(ctx.SeusPokemons.Include(x => x.Tipo).ToList());
    }

    return Results.NotFound();
});


app.MapGet("/api/seu_pokemon/buscar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    SeusPokemons? seuPokemon = ctx.SeusPokemons
        .Include(p => p.Tipo) 
        .FirstOrDefault(p => p.SeusPokemonsId == id); 

    if (seuPokemon is null) {
        return Results.NotFound("Pokémon não encontrado.");
    }

    return Results.Ok(seuPokemon);
});


app.MapDelete("/api/seu_pokemon/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    SeusPokemons? seuPokemon = ctx.SeusPokemons
        .Include(p => p.Tipo) 
        .FirstOrDefault(p => p.SeusPokemonsId == id); 

    if (seuPokemon == null) {
        return Results.NotFound();
    }

    ctx.SeusPokemons.Remove(seuPokemon);
    ctx.SaveChanges();

    return Results.Ok(seuPokemon);
});


app.MapPut("/api/seu_pokemon/alterar/{id}", ([FromRoute] string id, [FromBody] SeusPokemons pokemonAlterado, [FromServices] AppDataContext ctx) =>
{
    SeusPokemons? seuPokemon = ctx.SeusPokemons.Include(p => p.Tipo).FirstOrDefault(p => p.SeusPokemonsId == id);
    if (seuPokemon == null) {
        return Results.NotFound("Pokémon não encontrado.");
    }

    Tipo? tipo = ctx.Tipos.Find(pokemonAlterado.TipoId);
    if (tipo is null) {
        return Results.NotFound("Tipo de Pokémon não encontrado.");
    }

    if (string.IsNullOrWhiteSpace(pokemonAlterado.Nome)) {
        return Results.BadRequest("O nome do Pokémon é obrigatório.");
    }

    if (pokemonAlterado.PC <= 0) {
        return Results.BadRequest("O PC deve ser maior que zero.");
    }

    seuPokemon.Tipo = tipo;
    seuPokemon.Nome = pokemonAlterado.Nome;
    seuPokemon.PC = pokemonAlterado.PC;

    ctx.SeusPokemons.Update(seuPokemon);
    ctx.SaveChanges();

    return Results.Ok(seuPokemon);
});


// CRUD da classe batalha (sem alterar)
app.MapPost("/api/batalha/cadastrar/{pokemonId1}/{pokemonId2}", ([FromRoute] string pokemonId1, [FromRoute] string pokemonId2, [FromBody] Batalha batalha, [FromServices] AppDataContext ctx) =>
{
    // verifica se ambos os Pokémons existem
    SeusPokemons? pokemon1 = ctx.SeusPokemons.Include(p => p.Tipo).FirstOrDefault(p => p.SeusPokemonsId == pokemonId1);
    SeusPokemons? pokemon2 = ctx.SeusPokemons.Include(p => p.Tipo).FirstOrDefault(p => p.SeusPokemonsId == pokemonId2);

    if (pokemon1 == null || pokemon2 == null) {
        return Results.BadRequest("Um ou ambos os IDs dos Pokémons não existem no banco de dados.");
    }

    // verifica se são Pokémons diferentes
    if (pokemonId1 == pokemonId2) {
        return Results.BadRequest("Os dois Pokémons devem ser diferentes para uma batalha.");
    }

    // atribui os Pokémons à batalha
    batalha.Pokemon1 = pokemon1;
    batalha.Pokemon2 = pokemon2;

    // determina o vencedor
    batalha.DeterminarVencedor();

    // salva a batalha no banco
    ctx.Batalhas.Add(batalha);
    ctx.SaveChanges();

    // retorna a batalha com os relacionamentos carregados
    var batalhaComPokemons = ctx.Batalhas
        .Include(b => b.Pokemon1).ThenInclude(p => p.Tipo)
        .Include(b => b.Pokemon2).ThenInclude(p => p.Tipo)
        .FirstOrDefault(b => b.BatalhaId == batalha.BatalhaId);

    return Results.Created($"/api/batalha/{batalha.BatalhaId}", batalhaComPokemons);
});


app.MapGet("/api/batalha/listar", ([FromServices] AppDataContext ctx) =>
{
    var batalhas = ctx.Batalhas
        .Include(b => b.Pokemon1).ThenInclude(p => p.Tipo)
        .Include(b => b.Pokemon2).ThenInclude(p => p.Tipo)
        .ToList();

    if (batalhas.Any()) {
        return Results.Ok(batalhas);
    }

    return Results.NotFound("Nenhuma batalha encontrada.");
});


app.MapGet("/api/batalha/buscar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    var batalha = ctx.Batalhas
        .Include(b => b.Pokemon1).ThenInclude(p => p.Tipo)
        .Include(b => b.Pokemon2).ThenInclude(p => p.Tipo)
        .FirstOrDefault(b => b.BatalhaId == id);

    if (batalha == null) {
        return Results.NotFound($"Batalha com o ID '{id}' não encontrada.");
    }

    return Results.Ok(batalha);
});


app.MapDelete("/api/batalha/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext ctx) =>
{
    var batalha = ctx.Batalhas
        .Include(b => b.Pokemon1).ThenInclude(p => p.Tipo)
        .Include(b => b.Pokemon2).ThenInclude(p => p.Tipo)
        .FirstOrDefault(b => b.BatalhaId == id);

    if (batalha == null) {
        return Results.NotFound("Batalha não encontrada.");
    }

    ctx.Batalhas.Remove(batalha);
    ctx.SaveChanges();

    return Results.Ok(batalha);
});


// classe tipo (categoria)
app.MapGet("/api/tipo/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tipos.Any()) {
        return Results.Ok(ctx.Tipos.ToList());
    }

    return Results.NotFound();
});


app.MapPost("/api/tipo/cadastrar", ([FromBody] Tipo tipo, [FromServices] AppDataContext ctx) =>
{
    ctx.Tipos.Add(tipo);
    ctx.SaveChanges();

    return Results.Created("", tipo);
});


app.MapDelete("/api/tipo/deletar/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>
{
    Tipo? tipo = ctx.Tipos.Find(id);
    if (tipo == null) {
        return Results.NotFound("Tipo não encontrado.");
    }

    bool isAssociated = ctx.PokemonsWiki.Any(p => p.TipoId == id);
    if (isAssociated) {
        return Results.BadRequest("Não é possível deletar este tipo, pois ele está associado a um ou mais Pokémons.");
    }

    ctx.Tipos.Remove(tipo);
    ctx.SaveChanges();

    return Results.Ok($"Tipo com ID {id} foi deletado com sucesso.");
});


app.UseCors("Acesso Total");

app.Run();
