using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using easylend.Entities;

namespace easylend.Database.Entities
{
    public class Application
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Status Status { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        [JsonIgnore]
        public virtual ICollection<Document> Documents { get; set; }
        public int? UserID { get; set; }
        public Application()
        {
            Documents = new List<Document>();
        }

    }
}
