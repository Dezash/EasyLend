using System;
using System.ComponentModel.DataAnnotations;
using easylend.Database.Entities;

namespace easylend.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime DateRegistered { get; set; }
        public decimal Balance { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PersonalCode { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public double MinInterestRate { get; set; }
        public int RiskGroupId { get; set; }
        public string RiskGroupName { get; set; }
    }
}
