using System.Text.Json.Serialization;

namespace easylend.Entities
{
    public class Document
    {
        public int ID { get; set; }
        public string Url { get; set; }
        [JsonIgnore]
        public Application Application { get; set; }
        public int ApplicationId { get; set; }
    }
}
