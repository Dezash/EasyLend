using easylend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace easylend.Database.Entities
{
    public class Return
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public decimal Fee { get; set; }
        public DateTime Date { get; set; }
        public virtual Loan Loan { get; set; }
        public virtual User User { get; set; }
    }
}
