using AutoMapper;
using Microsoft.AspNetCore.Identity;
using server.Database;
using server.Database.Models;
using server.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : class 
    {
        protected IMapper _mapper;

        protected DatabaseContext _context;

        protected UserManager<ApplicationUser> UserManager { get; }

        /// <summary>
        /// Username aktualnie zalogowanego użytkownika
        /// </summary>
        protected string CurrentlyLoggedUserName { get; }

        /// <summary>
        /// Aktualnie zalogowany użytkownik
        /// </summary>
        protected ApplicationUser CurrentlyLoggedUser { get; set; }

        public BaseService(IMapper mapper, DatabaseContext context)
        {
            _mapper = mapper;
            _context = context;
            AssignCurrentlyLoggedUser();
        }

        private void AssignCurrentlyLoggedUser()
        {
            if (CurrentlyLoggedUserName == null)
            {
                CurrentlyLoggedUser = null;
                return;
            }
            CurrentlyLoggedUser = UserManager.FindByNameAsync(CurrentlyLoggedUserName).Result;
        }

        public void Add(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
        }

        public void Delete(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }

        public TEntity Get(int id)
        {
            return _context.Set<TEntity>().Find(id);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _context.Set<TEntity>().ToList();
        }


    }
}
