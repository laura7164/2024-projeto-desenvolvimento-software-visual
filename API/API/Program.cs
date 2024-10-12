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

app.Run();