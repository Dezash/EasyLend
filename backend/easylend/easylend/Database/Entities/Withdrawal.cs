using easylend.Entities;
using System;

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
