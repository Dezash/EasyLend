using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using easylend.Database;
using easylend.Database.Entities;
using Microsoft.EntityFrameworkCore;
using PdfSharp.Drawing;
using PdfSharp.Pdf;

namespace easylend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankController : ControllerBase
    {
        private readonly ApplicationContext _dbContext;
        private readonly IMapper _mapper;

        public BankController(ApplicationContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpPut("deposit/{id}")]
        public async Task<IActionResult> deposit(int id, decimal amount)
        {
            var result = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (result != null)
            {
                result.Balance += amount;
                await _dbContext.SaveChangesAsync();
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut("transfer/{id}")]
        public async Task<IActionResult> moneyTransfer(int id, decimal amount)
        {
            var result = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (result != null)
            {
                await PayseraCallback();
                result.Balance += amount;
                await _dbContext.SaveChangesAsync();
                return Ok();
            }

            return BadRequest();
        }

        private async Task<bool> PayseraCallback()
        {
            return true;
        }

        [HttpPut("withdraw")]
        public async Task<IActionResult> requestWithdraw(decimal amount, string IBan)
        {
            int userId = 1;
            await SendRequest(amount);

            var setUser = SetUserBalance(userId, amount, IBan);
            var sendRequest = SendRequest(amount);

            await Task.WhenAll(sendRequest, setUser);

            return setUser.Result ? (IActionResult) Ok() : BadRequest();
        }

        private async Task<bool> SetUserBalance(int id, decimal amount, string IBan)
        {
            var result = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (result != null)
            {
                if (result.Balance < amount)
                    return false;

                result.Balance -= amount;
                await _dbContext.SaveChangesAsync();
            }

            var withdrawal = new Withdrawal()
            {
                Amount = amount,
                Iban = IBan,
                Date = DateTime.Now,
                User = result
            };

            await _dbContext.Withdrawals.AddAsync(withdrawal);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        private async Task<bool> SendRequest(decimal amount)
        {
            return true;
        }

        [HttpGet("getReport")]
        public async Task<IActionResult> getReport(DateTime start, DateTime end)
        {
            int id = 1;

            var pure = PureReturn(id, start, end);
            var tax = TaxReturn(id, start, end);
            var withdrawal = Withdrawals(id, start, end);
            var bal = Balance(id);

            await Task.WhenAll(pure, tax, withdrawal, bal);

            var doc = new PdfDocument();
            doc.Info.Title = "User information";
            var page = doc.AddPage();
            var gfx = XGraphics.FromPdfPage(page);
            var font = new XFont("Arial", 20, XFontStyle.Regular);

            string pureText = $"Pure profit: €{pure.Result}";
            string taxText = $"Taxes: €{tax.Result}";
            string withdrawalText = $"Withdrawal: €{withdrawal.Result}";
            string balanceText = $"Balance: €{bal.Result}";

            gfx.DrawString(pureText, font, XBrushes.Black, new XRect(0, 0, page.Width, page.Height), XStringFormats.Center);
            gfx.DrawString(taxText, font, XBrushes.Black, new XRect(0, 100, page.Width, page.Height), XStringFormats.Center);
            gfx.DrawString(withdrawalText, font, XBrushes.Black, new XRect(0, 200, page.Width, page.Height), XStringFormats.Center);
            gfx.DrawString(balanceText, font, XBrushes.Black, new XRect(0, 300, page.Width, page.Height), XStringFormats.Center);

            var stream = new MemoryStream();
            doc.Save(stream, false);
            byte[] bytes = stream.ToArray();

            return File(bytes, "application/pdf", "User Information");
        }

        private async Task<decimal> PureReturn(int id, DateTime start, DateTime end)
        {
            var returns = await _dbContext.Returns.Where(r => r.User.Id == id &&
                                                              r.Date >= start && r.Date <= end)
                                                            .ToListAsync();
            return returns.Sum(r => r.Amount - r.Fee);
        }

        private async Task<decimal> TaxReturn(int id, DateTime start, DateTime end)
        {
            var returns = await _dbContext.Returns.Where(r => r.User.Id == id &&
                                                              r.Date >= start && r.Date <= end)
                                                            .ToListAsync();
            return returns.Sum(r => r.Fee);
        }

        private async Task<decimal> Withdrawals(int id, DateTime start, DateTime end)
        {
            var withdrawals = await _dbContext.Withdrawals
                                                           .Where(w => w.User.Id == id &&
                                                          w.Date >= start && w.Date <= end)
                                                           .ToListAsync();
            return withdrawals.Sum(w => w.Amount);
        }

        private async Task<decimal> Balance(int id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user.Balance;
        }
    }
}
