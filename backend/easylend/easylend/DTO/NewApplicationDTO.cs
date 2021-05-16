using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using easylend.Entities;

namespace easylend.DTO
{
    public class NewApplicationDTO
    {
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        public Status Status { get; set; }
        public NewUserDTO User { get; set; }
        public List<NewDocumentDTO> Documents { get; set; }
    }
}
