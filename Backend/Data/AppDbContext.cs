using FlashcardBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FlashcardBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<CardModel>? Cards { get; set; }
        public DbSet<DeckModel>? Decks { get; set; }
    }
}
