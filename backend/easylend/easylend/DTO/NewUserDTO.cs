using System;
using System.ComponentModel.DataAnnotations;

namespace easylend.DTO
{
    public class NewUserDTO
    {
        public string Email { get; set; }
        [DataType(DataType.Date)]
        public DateTime Birthdate { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PersonalCode { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public double MinInterestRate { get; set; }
    }
}
