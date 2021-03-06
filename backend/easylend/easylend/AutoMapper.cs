using AutoMapper;
using easylend.Database.Entities;
using easylend.DTO;
using easylend.Entities;
using Enum = System.Enum;

namespace easylend
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();
            CreateMap<Application, ApplicationDTO>()
                .ForMember(dst => dst.DateSubmitted, otp => otp.MapFrom(map => map.Date))
                .ForMember(dst => dst.Status, otp => otp.MapFrom(map => map.Status.ToString()));

            CreateMap<ApplicationDTO, Application>()
                .ForMember(dst => dst.Date, otp => otp.MapFrom(map => map.DateSubmitted))
                .ForMember(dst => dst.Status, otp => otp.MapFrom(map => Enum.Parse(typeof(Status), map.Status)));
            CreateMap<Document, DocumentDTO>().ForMember(dst => dst.Name, opt => opt.MapFrom(map => map.FileName));
            CreateMap<Application, NewApplicationDTO>();
            CreateMap<NewApplicationDTO, Application>();
            CreateMap<ApplicationDTO, NewApplicationDTO>();
            CreateMap<NewApplicationDTO, ApplicationDTO>();

            CreateMap<NewDocumentDTO, Document>().ForMember(dst => dst.FileData,
                cd => cd.MapFrom(map => map.FileData));

            CreateMap<Application, UpdateApplicationDTO>();
            CreateMap<UpdateApplicationDTO, Application>();

            CreateMap<RiskGroup, UpdateRiskGroupDTO>();
            CreateMap<UpdateRiskGroupDTO, RiskGroup>();

            CreateMap<RiskGroup, GetRiskGroupDTO>();
            CreateMap<GetRiskGroupDTO, RiskGroup>();

            CreateMap<Goal, UpdateGoalDTO>();
            CreateMap<UpdateGoalDTO, Goal>()
                .ForMember(dst => dst.GoalType, otp => otp.MapFrom(map => Enum.Parse(typeof(GoalType), map.GoalType)));

            CreateMap<Loan, LoanDTO>();
            CreateMap<LoanDTO, Loan>();

            CreateMap<GetLoanDTO, Loan>();
            CreateMap<Loan, GetLoanDTO>()
                .ForMember(dst => dst.AmountToPay, otp => otp.MapFrom(map => (map.Amount * map.InterestRate / 100) + map.Amount));
        }
    }
}
