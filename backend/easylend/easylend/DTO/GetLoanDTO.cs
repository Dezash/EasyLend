using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using easylend.Database.Entities;
using easylend.Entities;

namespace easylend.DTO
{
    public class GetLoanDTO
    {
        public int Id { get; set; }
        public decimal InterestRate { get; set; }
        public decimal Amount { get; set; }
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        public decimal AmountToPay { get; set; }
        public bool IsOpen { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        [JsonIgnore]
        public virtual ICollection<Return> Returns { get; set; }
        [JsonIgnore]
        public virtual ICollection<UserLoan> UserLoans { get; set; }
    }
}
