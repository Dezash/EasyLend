using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
    public class GoalController : ControllerBase
    {
        private readonly ApplicationContext _dbContext;
        private readonly IMapper _mapper;

        public GoalController(ApplicationContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<UpdateGoalDTO>> getGoalListView()
        {
            int id = 2;
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            var goals = await _dbContext.Goals.Include(g => g.User)
                .Where(g => g.User.Id == user.Id).ToListAsync();

            return _mapper.Map<List<UpdateGoalDTO>>(goals);
        }

        [HttpGet("{id}")]
        public async Task<UpdateGoalDTO> select(int id)
        {
            var goal = await _dbContext.Goals.FirstAsync(x => x.Id == id);

            return _mapper.Map<UpdateGoalDTO>(goal); ;
        }

        [HttpPost]
        public async Task<IActionResult> submit([FromBody] UpdateGoalDTO goalDto)
        {
            var user = _dbContext.Users.FirstOrDefaultAsync(x => x.Id == goalDto.UserId).Result;
            var newGoal = new Goal()
            {
                Name = goalDto.Name,
                GoalType = Enum.Parse<GoalType>(goalDto.GoalType),
                MonthlyAmount = goalDto.MonthlyAmount,
                StartingAmount = goalDto.StartingAmount,
                YearLimit = goalDto.YearLimit,
                User = user
            };

            await _dbContext.Goals.AddAsync(newGoal);
            await _dbContext.SaveChangesAsync();

            return new ObjectResult("created") { StatusCode = 201 };
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> submit(int id, [FromBody] UpdateGoalDTO updateGoalDto)
        {
            var result = await _dbContext.Goals.SingleOrDefaultAsync(x => x.Id == id);

            if (result != null)
            {
                var goal = _mapper.Map<Goal>(updateGoalDto);

                    result.MonthlyAmount = goal.MonthlyAmount;
                    result.YearLimit = goal.YearLimit;
                    result.Name = goal.Name;
                    result.StartingAmount = goal.StartingAmount;
                    result.GoalType = (GoalType)Enum.Parse(typeof(GoalType), updateGoalDto.GoalType);

                await _dbContext.SaveChangesAsync();
                return Ok();
            };

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task submitChoice(int id)
        {
            var item = await _dbContext.Goals.SingleOrDefaultAsync(x => x.Id == id);

            if (item == null) return;

            _dbContext.Remove(item);
            await _dbContext.SaveChangesAsync();
        }
    }
}
