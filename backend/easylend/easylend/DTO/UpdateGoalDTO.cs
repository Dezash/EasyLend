using easylend.Database.Entities;

namespace easylend.DTO
{
    public class UpdateGoalDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }
        public decimal StartingAmount { get; set; }
        public decimal MonthlyAmount { get; set; }
        public decimal YearLimit { get; set; }
        public string GoalType { get; set; }
        public int UserId { get; set; }
    }
}
