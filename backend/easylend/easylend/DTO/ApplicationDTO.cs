using System;
using System.Collections.Generic;
using easylend.Entities;

namespace easylend.DTO
{
    public class ApplicationDTO
    {
        public int Id { get; set; }
        public DateTime DateSubmitted { get; set; }
        public string Status { get; set; }
        public UserDTO User { get; set; }
        public List<DocumentDTO> Documents { get; set; }

    }
}
