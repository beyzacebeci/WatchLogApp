namespace WatchLogApp.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Genre { get; set; }
        public string? ImageBase64 { get; set; }
        public bool IsDeleted { get; set; }
        public bool WatchStatus { get; set; }



    }
}
