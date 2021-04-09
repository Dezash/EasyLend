using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace easylend.Entities
{
    public class Application
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public Status Status { get; set; }

        [JsonIgnore]
        public User User { get; set; }
        [JsonIgnore]
        public ICollection<Document> Documents { get; set; }

        public Application()
        {
            Documents = new List<Document>();
        }
    }

    public enum Status
    {
        Approved,
        Rejected,
        Pending
    }
}
