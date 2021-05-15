using System;
using System.Collections.Generic;
using easylend.Database.Entities;
using Newtonsoft.Json;

namespace easylend.Entities
{
    public class User
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime Birthdate { get; set; }
        public DateTime DateRegistered { get; set; }
        public decimal Balance { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PersonalCode { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public double MinInterestRate { get; set; }
        public virtual Application Application { get; set; }
        public virtual RiskGroup RiskGroup { get; set; }
        public virtual ICollection<Goal> Goals { get; set; }
        public virtual ICollection<UserLoan> UserLoans { get; set; }
        public virtual ICollection<Return> Returns { get; set; }
        public virtual ICollection<Loan> Loans { get; set; }
        public virtual ICollection<Withdrawal> Withdrawals { get; set; }
        public User()
        {
            DateRegistered = DateTime.Now;
        }
    }
}
