namespace easylend.DTO
{
    public class UpdateRiskGroupDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double MaxLoanAmount { get; set; }
        public int UserId { get; set; }
    }
}
