﻿using AutoMapper;
using easylend.Database.Entities;
using easylend.DTO;
using easylend.Entities;
using Google.Protobuf.WellKnownTypes;

namespace easylend
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<User, UserDTO>().ForMember(dst => dst.Phone, otp => otp.MapFrom(map => map.PhoneNumber));
            CreateMap<UserDTO, User>();
            CreateMap<Application, ApplicationDTO>()
                .ForMember(dst => dst.DateSubmitted, otp => otp.MapFrom(map => map.Date))
                .ForMember(dst => dst.Status, otp => otp.MapFrom(map => map.Status.ToString()));

            CreateMap<ApplicationDTO, Application>();
            CreateMap<Document, DocumentDTO>().ForMember(dst => dst.Name, opt => opt.MapFrom(map => map.FileName));
            CreateMap<Application, NewApplicationDTO>();
            CreateMap<NewApplicationDTO, Application>();
            CreateMap<ApplicationDTO, NewApplicationDTO>();
            CreateMap<NewApplicationDTO, ApplicationDTO>();

            CreateMap<NewDocumentDTO, Document>().ForMember(dst => dst.FileData,
                cd => cd.MapFrom(map => map.FileData));
        }
    }
}