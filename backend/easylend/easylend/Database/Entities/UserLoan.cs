using easylend.Entities;

namespace easylend.Database.Entities
{
    public class UserLoan
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public virtual User Investor { get; set; }
        public virtual Loan Loan { get; set; }
    }
}
