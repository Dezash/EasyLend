using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using easylend.Database;
using easylend.Database.Entities;
using easylend.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace easylend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RiskGroupController : ControllerBase
    {
        private readonly ApplicationContext _dbContext;
        private readonly IMapper _mapper;
        //  private readonly IConfiguration _configuration;
        public RiskGroupController(ApplicationContext dbContext, ILogger<WeatherForecastController> logger, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<UpdateRiskGroupDTO>> Get()
        {
            var applications = await _dbContext.RiskGroups.ToListAsync();

            return _mapper.Map<List<UpdateRiskGroupDTO>>(applications);
        }

        [HttpGet("{id}")]
        public async Task<UpdateRiskGroupDTO> Get(int id)
        {
            var riskGroup = await _dbContext.RiskGroups.FirstAsync(x => x.Id == id);

            return _mapper.Map<UpdateRiskGroupDTO>(riskGroup); ;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UpdateRiskGroupDTO riskGroupDto)
        {
            var newRiskGroup = new RiskGroup()
            {
                MaxLoanAmount = riskGroupDto.MaxLoanAmount,
                Name = riskGroupDto.Name
            };

            await _dbContext.RiskGroups.AddAsync(newRiskGroup);
            await _dbContext.SaveChangesAsync();

            return new ObjectResult("created") { StatusCode = 201 };
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateRiskGroupDTO riskGroupDto)
        {
            var result = await _dbContext.RiskGroups.SingleOrDefaultAsync(x => x.Id == id);

            if (result != null)
            {
                var riskGroup = _mapper.Map<RiskGroup>(riskGroupDto);

                result.MaxLoanAmount = riskGroup.MaxLoanAmount;
                result.Name = riskGroup.Name;
                await _dbContext.SaveChangesAsync();
                return Ok();
            };

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            var item = await _dbContext.RiskGroups.SingleOrDefaultAsync(x => x.Id == id);

            if (item == null) return;

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }
    }
}
