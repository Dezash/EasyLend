using easylend.Entities;

namespace easylend.Database.Entities
{
    public class Goal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }
        public decimal StartingAmount { get; set; }
        public decimal MonthlyAmount { get; set; }
        public decimal YearLimit { get; set; }
        public GoalType GoalType { get; set; }
        public virtual User User { get; set; }
    }
}
