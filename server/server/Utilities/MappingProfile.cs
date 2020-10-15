using AutoMapper;
using server.Database.Models;
using server.Dtos.Account.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Utilities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ApplicationUser, RegisterUserRequest>();
        }
    }
}
