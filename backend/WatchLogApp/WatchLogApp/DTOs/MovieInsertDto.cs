namespace WatchLogApp.DTOs
{
    public class MovieInsertDto
    {
        public string? Title { get; set; }
        public string? Genre { get; set; }
        public string? ImageBase64 { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
