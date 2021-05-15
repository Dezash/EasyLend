using easylend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easylend.Database.Entities
{
    public class UserLoan
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public User Investor { get; set; }
        public Loan Loan { get; set; }

    }
}
