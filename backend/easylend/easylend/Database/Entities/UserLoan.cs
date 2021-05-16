using easylend.Entities;

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
