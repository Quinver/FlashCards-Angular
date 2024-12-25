using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlashcardBackend.Data;
using FlashcardBackend.Models;

namespace FlashcardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DecksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DecksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/decks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeckModel>>> GetDecks()
        {
            if (_context.Decks == null)
            {
                return NotFound();
            }
            var decks = await _context.Decks.Include(d => d.Cards).ToListAsync();
            return Ok(decks);
        }

        // GET: api/decks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeckModel>> GetDeck(int id)
        {
            if (_context.Decks == null)
            {
                return NotFound();
            }
            var deck = await _context.Decks.Include(d => d.Cards)
                                   .FirstOrDefaultAsync(d => d.Id == id);

            if (deck == null)
            {
                return NotFound();
            }

            return Ok(deck);
        }

        // GET: api/decks/{deckId}/cards
        [HttpGet("{deckId}/cards")]
        public async Task<ActionResult<IEnumerable<CardModel>>> GetCardsByDeckId(int deckId)
        {
            if (_context.Cards == null)
            {
                // No cards found, not an error, send custom message
                return NotFound("No cards found.");

            }

            var cards = await _context.Cards.Where(c => c.DeckId == deckId).ToListAsync();

            if (cards == null || cards.Count == 0)
            {
                return NotFound();
            }

            return Ok(cards);
        }

        // POST: api/decks
        [HttpPost]
        public async Task<ActionResult<DeckModel>> PostDeck(DeckModel deck)
        {
            if (_context.Decks == null)
            {
                return NotFound();
            }
            _context.Decks.Add(deck);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeck", new { id = deck.Id }, deck);
        }

        // DELETE: api/decks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeck(int id)
        {
            if (_context.Decks == null)
            {
                return NotFound();
            }

            var deck = await _context.Decks.FindAsync(id);
            if (deck == null)
            {
                return NotFound();
            }

            _context.Decks.Remove(deck);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeck(int id, DeckModel deck)
        {
            // Ensure the Deck ID from the URL matches the one in the request body
            if (id != deck.Id)
            {
                return BadRequest("Deck ID mismatch.");
            }

            // Retrieve the existing deck from the database (including related cards)
            var existingDeck = await _context.Decks
                .Include(d => d.Cards)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (existingDeck == null)
            {
                return NotFound($"Deck with ID {id} not found.");
            }

            // Update deck properties 
            existingDeck.Name = deck.Name;
            existingDeck.Description = deck.Description;

            // Remove cards that are not in the request body
            if (existingDeck.Cards != null)
            {
                foreach (var card in existingDeck.Cards)
                {
                    if (!deck.Cards.Any(c => c.Id == card.Id))
                    {
                        _context.Cards.Remove(card);
                    }
                }
            }
            
            // Update or add new cards
            if (deck.Cards != null)
            {
                // Attach or add new cards
                foreach (var card in deck.Cards)
                {
                    if (card.Id == 0)  // New card, add it
                    {
                        card.DeckId = id;
                        _context.Cards.Add(card);
                    }
                    else  // Existing card, update it
                    {
                        var existingCard = await _context.Cards
                            .FirstOrDefaultAsync(c => c.Id == card.Id && c.DeckId == id);
                        if (existingCard != null)
                        {
                            existingCard.FrontText = card.FrontText;
                            existingCard.BackText = card.BackText;
                            existingCard.Flipped = card.Flipped;
                        }
                        else
                        {
                            // If the card doesn't exist, we can choose to add it as a new card
                            card.DeckId = id;
                            _context.Cards.Add(card);
                        }
                    }
                }
            }

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(existingDeck);  // Return the updated deck
        }
    }
}
