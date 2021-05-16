using System;
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
    public class LoansController : ControllerBase
    {
        private readonly ApplicationContext _dbContext;
        private readonly IMapper _mapper;
        public LoansController(ApplicationContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<GetLoanDTO>> getLoansView()
        {
            int id = 2;
            var loans = await _dbContext.Loans.Where(l => l.User.Id == id && l.IsOpen).ToListAsync();

            return _mapper.Map<List<GetLoanDTO>>(loans);
        }

        [HttpGet("{id}")]
        public async Task<GetLoanDTO> getLoansView(int id)
        {
            var loans = await _dbContext.Loans.FirstOrDefaultAsync(l => l.Id == id);

            return _mapper.Map<GetLoanDTO>(loans);
        }

        [HttpPost]
        public async Task<IActionResult> submit([FromBody] NewAmountDTO newAmountDto)
        {
            int id = 2;
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            var newLoan = new Loan()
            {
                Amount = newAmountDto.Amount,
                EndDate = DateTime.Now.AddDays(30),
                StartDate = DateTime.Now,
                InterestRate = 0.05m,
                IsOpen = true,
                User = user
            };

            await _dbContext.Loans.AddAsync(newLoan);
            await _dbContext.SaveChangesAsync();

            return new ObjectResult("created") { StatusCode = 201 };
        }


        [HttpGet("returnLoan/{id}")]
        public async Task<IActionResult> returnLoan(int id)
        {
            var loan = await _dbContext.Loans
                .Include(l => l.UserLoans)
                .Include(l => l.User)
                .Include(l => l.Returns)
                .FirstOrDefaultAsync(l => l.Id == id);

            var user = loan.User;

            decimal amountToPay = (loan.Amount * loan.InterestRate / 100) + loan.Amount;

            if (user.Balance > amountToPay)
                user.Balance -= amountToPay;
            else
                return BadRequest(new { errorMessage = "Insufficient balance" });

            var userLoans = loan.UserLoans.Where(l => l.Loan.Id == id);
            var investors = userLoans.Select(u => u.Investor);

            foreach (var investor in investors)
            {
                decimal investment = userLoans.Where(u => u.Investor.Id == investor.Id).Sum(i => i.Amount);
                decimal moneyReturned = loan.InterestRate * investment + investment;
                investor.Balance = moneyReturned;

                var newReturn = new Return()
                {
                    Amount = moneyReturned * 0.99m,
                    Date = DateTime.Now,
                    Fee = 1,
                    Loan = loan,
                    User = investor
                };

                loan.IsOpen = false;

                await _dbContext.Returns.AddAsync(newReturn);
                await _dbContext.SaveChangesAsync();
            }

            return Ok();
        }
    }
}
