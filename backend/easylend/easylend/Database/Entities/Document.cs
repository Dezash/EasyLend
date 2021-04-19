using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using easylend.Database.Entities;

namespace easylend.Entities
{
    public class Document
    {
        [JsonIgnore]
        public int ID { get; set; }
        public string FileName { get; set; }
        [MaxLength(1000000)]
        public byte[] FileData { get; set; }
        [JsonIgnore]
        public virtual Application Application { get; set; }
        public int? ApplicationID { get; set; }
        public Document()
        {
            
        }
    }
}
