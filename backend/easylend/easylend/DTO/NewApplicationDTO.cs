using System;
using System.Collections.Generic;
using easylend.Entities;

namespace easylend.DTO
{
    public class NewApplicationDTO
    {
        public DateTime Date { get; set; }
        public Status Status { get; set; }
        public NewUserDTO User { get; set; }
        public List<NewDocumentDTO> Documents { get; set; }
    }
}
