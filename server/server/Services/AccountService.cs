using AutoMapper;
using server.Database;
using server.Database.Models;
using server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class AccountService : BaseService<ApplicationUser>, IAccountService
    {
        public AccountService(IMapper mapper, DatabaseContext context) : base(mapper, context)
        {

        }
    }
}
