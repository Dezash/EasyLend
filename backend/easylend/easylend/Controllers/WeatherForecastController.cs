using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using easylend.Database;
using easylend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace easylend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ApplicationContext _dbContext;
        public WeatherForecastController(ApplicationContext dbContext, ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            Helpers.DbSeeder.SeedUsers(_dbContext);
            Helpers.DbSeeder.SeedApplications(_dbContext);
            var users = _dbContext.Users.ToArray();
            return users;
        }

        
    }
}
