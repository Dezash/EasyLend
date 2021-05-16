using easylend.Entities;

namespace easylend.Database.Entities
{
    public class Goal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double StartingAmount { get; set; }
        public double MonthlyAmount { get; set; }
        public double YearLimit { get; set; }
        public GoalType GoalType { get; set; }
        public virtual User User { get; set; }
    }
}
