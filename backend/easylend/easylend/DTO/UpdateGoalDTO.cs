using easylend.Database.Entities;

namespace easylend.DTO
{
    public class UpdateGoalDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double StartingAmount { get; set; }
        public double MonthlyAmount { get; set; }
        public double YearLimit { get; set; }
        public string GoalType { get; set; }
        public int UserId { get; set; }
    }
}
