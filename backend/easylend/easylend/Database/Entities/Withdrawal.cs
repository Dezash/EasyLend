using easylend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easylend.Database.Entities
{
    public class Withdrawal
    {
        public int Id { get; set; }
        public string Iban { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public User User { get; set; }

        public Withdrawal()
        {
            Date = DateTime.Now;
        }
    }
}
