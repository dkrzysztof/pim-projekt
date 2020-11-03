using AutoMapper;
using server.Database.Models;
using server.Dtos.Account.Requests;
using server.Dtos.Account.Responses;
using server.Dtos.Note.Requests;
using server.Dtos.Note.Response;
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
            CreateMap<Note, NoteResponse>();
            CreateMap<AddNewNoteRequest, Note>();
            CreateMap<ApplicationUser, GetAccountDetailsResponse>();
        }

    }
}
