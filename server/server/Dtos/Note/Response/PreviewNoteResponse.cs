namespace server.Dtos.Note.Response
{
    public class PreviewNoteResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int PriorityId { get; set; }
        public bool Done { get; set; }
    }
}
