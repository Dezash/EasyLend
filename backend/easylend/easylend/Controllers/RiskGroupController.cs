using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using easylend.Database;
using easylend.Database.Entities;
using easylend.DTO;
using Microsoft.EntityFrameworkCore;

namespace easylend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RiskGroupController : ControllerBase
    {
        private readonly ApplicationContext _dbContext;
        private readonly IMapper _mapper;

        public RiskGroupController(ApplicationContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<UpdateRiskGroupDTO>> index()
        {
            var riskGroups = await _dbContext.RiskGroups.ToListAsync();

            return _mapper.Map<List<UpdateRiskGroupDTO>>(riskGroups);
        }

        [HttpGet("{id}")]
        public async Task<UpdateRiskGroupDTO> getRiskGroup(int id)
        {
            var riskGroup = await _dbContext.RiskGroups.FirstOrDefaultAsync(r => r.Id == id);

            return _mapper.Map<UpdateRiskGroupDTO>(riskGroup);
        }

        [HttpPost]
        public async Task<IActionResult> createGroup([FromBody] NewRiskGroupDTO riskGroupDto)
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
        public async Task<IActionResult> updateGroup(int id, [FromBody] UpdateRiskGroupDTO riskGroupDto)
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

            return BadRequest(new { errorMessage = "Failed to update" });
        }

        [HttpDelete("{id}")]
        public async Task deleteGroup(int id, [FromBody] DeleteRiskGroupDTO deleteRiskGroupDto)
        {
            var item = await _dbContext.RiskGroups.SingleOrDefaultAsync(x => x.Id == id);

            var users = await _dbContext.Users.Include(u => u.RiskGroup)
                .Where(u => u.RiskGroup.Id == id).ToListAsync();

            var riskGroup =
                await _dbContext.RiskGroups.FirstOrDefaultAsync(r => r.Id == deleteRiskGroupDto.TransferGroupId);

            foreach (var user in users)
            {
                user.RiskGroup = riskGroup;
            }

            if (item == null) return;

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }
    }
}
