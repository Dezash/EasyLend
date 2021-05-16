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

namespace easylend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {

        private readonly ApplicationContext _dbContext;
        private readonly IMapper _mapper;
        public ApplicationsController(ApplicationContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<List<ApplicationDTO>> getApplicationsListView()
        {
            var applications = await _dbContext.Applications.Include(a => a.User)
                                                                         .Include(a => a.Documents)
                                                                         .ToListAsync();


            return _mapper.Map<List<ApplicationDTO>>(applications);
        }

        [HttpGet("{id}")]
        public async Task<ApplicationDTO> getApplicationView(int id)
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

        [HttpPost]
        public async Task<IActionResult> createApplication([FromForm(Name = "file")] ICollection<IFormFile> applicationDto)
        {
            var newApplication = new Application()
            {
                Date = DateTime.Now,
                Status = Status.Pending,
                UserID = 1
            };

            var applicationDb = await _dbContext.Applications.FirstOrDefaultAsync(x => x.UserID == 1);

            if (applicationDb != null)
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

            return new ObjectResult("Created") { StatusCode = 201 };
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> updateApplication(int id, [FromBody] UpdateApplicationDTO applicationDto)
        {
            var result = await _dbContext.Applications.SingleOrDefaultAsync(x => x.Id == id);

            if (result != null)
            {
                result.Status = (Status)Enum.Parse(typeof(Status), applicationDto.Status);
                await _dbContext.SaveChangesAsync();
                return Ok();
            };

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task deleteApplication(int id)
        {
            var item = await _dbContext.Applications.SingleOrDefaultAsync(x => x.Id == id);

            if (item == null) return;

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }

        [HttpGet("document/{id}")]
        public async Task<IActionResult> getDocument(int id)
        {
            var document = await _dbContext.Documents.FirstOrDefaultAsync(x => x.ID == id);
            var file = new MemoryStream(document.FileData);

            return File(file, "application/octet-stream", document.FileName);
        }
    }
}
