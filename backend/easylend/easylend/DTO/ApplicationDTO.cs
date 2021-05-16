using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace easylend.DTO
{
    public class ApplicationDTO
    {
        public int Id { get; set; }
        [DataType(DataType.Date)]
        public DateTime DateSubmitted { get; set; }
        public string Status { get; set; }
        public UserDTO User { get; set; }
        public List<DocumentDTO> Documents { get; set; }
    }
}
