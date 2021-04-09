using System;
using System.Text.Json.Serialization;

namespace easylend.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime Birthdate { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PersonalCode { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public double MinInterestRate { get; set; }

        [JsonIgnore]
        public Application Application { get; set; }
        public int? ApplicationId { get; set; }
    }
}
