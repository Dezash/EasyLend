using easylend.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace easylend.Database.Entities
{
    public class Withdrawal
    {
        public int Id { get; set; }
        public string Iban { get; set; }
        public decimal Amount { get; set; }
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        public virtual User User { get; set; }

        public Withdrawal()
        {
            Date = DateTime.Now;
        }
    }
}
