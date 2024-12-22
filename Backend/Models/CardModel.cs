using System.Text.Json.Serialization;

namespace FlashcardBackend.Models
{
    public class CardModel
    {
        public int Id { get; set; } // Primary key
        public string FrontText { get; set; } = "no front text given";
        public string BackText { get; set; } = "no back text given";
        public bool Flipped { get; set; }

        // Foreign Key for Deck
        public int DeckId { get; set; }
        
        // Navigation property for related Deck
        [JsonIgnore]
        public DeckModel? Deck { get; set; }
    }
}
