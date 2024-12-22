using FlashcardBackend.Data;
using FlashcardBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlashcardBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CardsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/cards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardModel>>> GetCards()
        {
            if (_context.Cards == null)
            {
                return NotFound("No cards found.");
            }

            return await _context.Cards.ToListAsync();
        }

        // GET: api/cards/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CardModel>> GetCard(int id)
        {
            if (_context.Cards == null)
            {
                return NotFound("No cards found.");
            }

            var card = await _context.Cards.FindAsync(id);

            if (card == null)
            {
                return NotFound();
            }

            return card;
        }

        // POST: api/cards
        [HttpPost]
        public async Task<ActionResult<CardModel>> PostCard(CardModel card)
        {
            if (_context.Cards == null)
            {
                return NotFound();
            }
            if (card.DeckId == 0)
            {
                return BadRequest("Deck ID is required.");
            }

            if (_context.Decks == null)
            {
                return NotFound("No decks found.");
            }
            var deck = await _context.Decks.FindAsync(card.DeckId);
            if (deck == null)
            {
                return NotFound($"Deck with ID {card.DeckId} not found.");
            }

            _context.Cards.Add(card);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCard), new { id = card.Id }, card);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(int id)
        {
            if (_context.Cards == null)
            {
                return NotFound();
            }

            var card = await _context.Cards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }

            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/cards/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeck(int id, DeckModel deck)
        {
            if (id != deck.Id)
            {
                return BadRequest();
            }

            var existingDeck = await _context.Decks
                .Include(d => d.Cards)  // Include related cards
                .FirstOrDefaultAsync(d => d.Id == id);

            if (existingDeck == null)
            {
                return NotFound();
            }

            // Update deck properties
            existingDeck.Name = deck.Name;
            existingDeck.Description = deck.Description;

            // Handle cards: remove those not in the updated deck
            if (existingDeck.Cards != null)
            {
                _context.Cards.RemoveRange(existingDeck.Cards.Where(c =>
                    deck.Cards != null && !deck.Cards.Any(updatedCard => updatedCard.Id == c.Id)));
            }

            // Add or update cards
            if (deck.Cards != null && deck.Cards.Any())
            {
                foreach (var updatedCard in deck.Cards)
                {
                    var existingCard = existingDeck.Cards?.FirstOrDefault(c => c.Id == updatedCard.Id);

                    if (existingCard != null)
                    {
                        // Update existing card properties
                        existingCard.FrontText = updatedCard.FrontText;
                        existingCard.BackText = updatedCard.BackText;
                        existingCard.Flipped = updatedCard.Flipped;
                        existingCard.DeckId = updatedCard.DeckId;  // Ensure DeckId is set correctly
                    }
                    else
                    {
                        // Add new card
                        existingDeck.Cards?.Add(new CardModel
                        {
                            FrontText = updatedCard.FrontText,
                            BackText = updatedCard.BackText,
                            Flipped = updatedCard.Flipped,
                            DeckId = updatedCard.DeckId  // Set the DeckId for the new card
                        });
                    }
                }
            }
            else
            {
                return BadRequest("Deck must contain at least one card.");
            }

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Decks.Any(d => d.Id == id))
                {
                    return NotFound("Deck not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
    }
}
