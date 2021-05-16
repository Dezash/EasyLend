using System.Collections.Generic;
using System.Text.Json.Serialization;
using easylend.Entities;

namespace easylend.Database.Entities
{
    public class RiskGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double MaxLoanAmount { get; set; }
        [JsonIgnore]
        public virtual ICollection<User> Users { get; set; }

        public RiskGroup()
        {
            Users = new List<User>();
        }
    }
}
