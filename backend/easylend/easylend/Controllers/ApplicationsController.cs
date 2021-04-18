using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using easylend.Database;
using easylend.Database.Entities;
using easylend.DTO;
using easylend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace easylend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ApplicationContext _dbContext;
        private readonly IMapper _mapper;
        //  private readonly IConfiguration _configuration;
        public ApplicationsController(ApplicationContext dbContext, ILogger<WeatherForecastController> logger, IMapper mapper)
        {
            _logger = logger;
            _dbContext = dbContext;
            _mapper = mapper;
        }


        // GET: api/Applications
        [HttpGet]
        public async Task<List<ApplicationDTO>> Get()
        {
            var applications = await _dbContext.Applications.Include(a => a.User)
                                                                         .Include(a => a.Documents)
                                                                         .ToListAsync();


            return _mapper.Map<List<ApplicationDTO>>(applications);
        }

        // GET api/Applications/5
        [HttpGet("{id}")]
        public async Task<ApplicationDTO> Get(int id)
        {
            var application = await _dbContext.Applications.Include(a => a.User)
                                                           .Include(a => a.Documents)
                                                           .FirstAsync(x => x.Id == id);

            var applicationDto = _mapper.Map<ApplicationDTO>(application);
            string myUrl = new Uri(HttpContext.Request.GetDisplayUrl()).GetLeftPart(UriPartial.Authority);

            foreach (var document in applicationDto.Documents)
            {
                document.URL = $"{myUrl}/api/Documents/{document.ID}";
            }

            return applicationDto;
        }

        // POST api/Applications
        [HttpPost]
        public async Task<IActionResult> Post([FromForm(Name = "file")] ICollection<IFormFile> applicationDto)
        {
            var newApplication = new Application()
            {
                Date = DateTime.Now,
                Status = Status.Pending,
                UserID = 1
            };

            var applicationDb = await _dbContext.Applications.FirstOrDefaultAsync(x => x.UserID == 1);

            if (applicationDb == null)
                return BadRequest();

            _dbContext.Applications.Remove(applicationDb);

            await _dbContext.Applications.AddAsync(newApplication);
            await _dbContext.SaveChangesAsync();

            var documents = new List<Document>();

            foreach (var file in applicationDto)
            {
                if (file.Length > 0)
                {
                    await using var ms = new MemoryStream();
                    await file.CopyToAsync(ms);
                    byte[] fileBytes = ms.ToArray();
                    documents.Add(new Document()
                    {
                        ApplicationID = newApplication.Id,
                        FileData = fileBytes,
                        FileName = file.FileName
                    });
                }
            }

            newApplication.Documents = documents;

            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        // PUT api/Applications/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] ApplicationDTO applicationDto)
        {
            var result = await _dbContext.Applications.SingleOrDefaultAsync(x => x.Id == id);

            if (result == null)
            {
                result = _mapper.Map<Application>(applicationDto);
                await _dbContext.SaveChangesAsync();
            };

        }

        // DELETE api/Applications/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var item = await _dbContext.Applications.SingleOrDefaultAsync(x => x.Id == id);

            if (item == null) return;

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }
    }
}
