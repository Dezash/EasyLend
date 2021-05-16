using easylend.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace easylend.Database.Entities
{
    public class Loan
    {
        public int Id { get; set; }
        public decimal InterestRate { get; set; }
        public decimal Amount { get; set; }
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        public bool IsOpen { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Return> Returns { get; set; }
        public virtual ICollection<UserLoan> UserLoans {get; set;}

        public Loan()
        {
            Returns = new List<Return>();
            UserLoans = new List<UserLoan>();
        }
    }
}
