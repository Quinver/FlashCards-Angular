namespace FlashcardBackend.Models
{
    public class DeckModel
    {
        public int Id { get; set; } // Primary key
        public string Name { get; set; } = "no name given";
        public string Description { get; set; } = "no description given";

        public ICollection<CardModel>? Cards { get; set; }
    }
}
