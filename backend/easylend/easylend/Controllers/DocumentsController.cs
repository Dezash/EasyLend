using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using easylend.Database;
using easylend.DTO;
using easylend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace easylend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ApplicationContext _dbContext;
        private readonly IMapper _mapper;

        public DocumentsController(ApplicationContext dbContext, ILogger<WeatherForecastController> logger, IMapper mapper)
        {
            _logger = logger;
            _dbContext = dbContext;
            _mapper = mapper;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var document = await _dbContext.Documents.FirstOrDefaultAsync(x => x.ID == id);
            var file = new MemoryStream(document.FileData);

            return File(file, "application/octet-stream", document.FileName);
        }
    }
}
