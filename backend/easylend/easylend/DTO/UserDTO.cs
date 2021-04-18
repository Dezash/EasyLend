using System;

namespace easylend.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public DateTime Birthdate { get; set; }
        public DateTime DateRegistered { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PersonalCode { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public double MinInterestRate { get; set; }
    }
}
