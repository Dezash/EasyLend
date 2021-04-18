using Microsoft.AspNetCore.Http;

namespace easylend.DTO
{
    public class NewDocumentDTO
    {
        public int ApplicationID { get; set; }
        public byte[] FileData { get; set; }
    }
}
