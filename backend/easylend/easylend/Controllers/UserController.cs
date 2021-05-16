using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using easylend.Database;
using easylend.DTO;
using easylend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace easylend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationContext _dbContext;
        private readonly IMapper _mapper;
        public UserController(ApplicationContext dbContext, ILogger<WeatherForecastController> logger, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<UserDTO> Get(int id)
        {
            var goal = await _dbContext.Users.Include(r => r.RiskGroup)
                .FirstAsync(x => x.Id == id);

            return _mapper.Map<UserDTO>(goal);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UserDTO userDto)
        {
            var result = await _dbContext.Users.Include(r => r.RiskGroup)
                .SingleOrDefaultAsync(x => x.Id == id);

            var riskGroup = await _dbContext.RiskGroups.SingleOrDefaultAsync(x => x.Id == userDto.RiskGroupId);
            if (result != null)
            {
                var user = _mapper.Map<User>(userDto);

                result.Email = user.Email;
                result.Address = user.Address;
                result.PhoneNumber = user.PhoneNumber;
                result.MinInterestRate = user.MinInterestRate;
                result.RiskGroup = riskGroup;

                await _dbContext.SaveChangesAsync();
                return Ok();
            };
         
            return BadRequest();
        }
    }
}
