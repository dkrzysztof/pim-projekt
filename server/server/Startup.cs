using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using AspNet.Security.OAuth.Validation;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using server.Database;
using server.Database.Models;
using server.Security;
using server.Security.Interfaces;
using server.Services;
using server.Services.Interfaces;
using server.Utilities;

//namespace server
//{
//    public class Startup
//    {
//        public Startup(IConfiguration configuration)
//        {
//            Configuration = configuration;
//        }

//        public IConfiguration Configuration { get; }

//        // This method gets called by the runtime. Use this method to add services to the container.
//        public void ConfigureServices(IServiceCollection services)
//        {
//            // database
//            services.AddDbContext<DatabaseContext>(opt =>
//            {
//                opt.UseSqlServer(Configuration.GetConnectionString("PlandayDatabase"));
//            });

//            services
//                .AddIdentity<ApplicationUser, IdentityRole>()
//                .AddSignInManager<SignInManager<ApplicationUser>>()
//                .AddEntityFrameworkStores<DatabaseContext>()
//                .AddDefaultTokenProviders();

//            // Dependency Injection
//            services.AddTransient<IAccountService, AccountService>();
//            services.AddTransient<INoteService, NoteService>();
//            services.AddTransient<IJwtGenerator, JwtGenerator>();

//            services.AddMvc(option => option.EnableEndpointRouting = false)
//            .AddJsonOptions(options =>
//            {
//                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
//                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
//            });

//            services.AddAuthentication(opt =>
//            {
//                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//            })
//                .AddJwtBearer(opt =>
//                {
//                    opt.SaveToken = true;
//                    opt.TokenValidationParameters = TokenValidationParametersDefaults.GetDefaultParameters();
//                });

//            services.AddAuthorization();

//            // Auto Mapper Configurations
//            var mapperConfig = new MapperConfiguration(mc =>
//            {
//                mc.AddProfile(new MappingProfile());
//            });

//            IMapper mapper = mapperConfig.CreateMapper();
//            services.AddSingleton(mapper);

//            // swagger
//            services.AddSwaggerGen();
//        }

//        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//        {
//            if (env.IsDevelopment())
//            {
//                app.UseDeveloperExceptionPage();
//            }

//            app.UseHttpsRedirection();

//            app.UseCors("CorsPolicy");

//            app.UseSwagger();
//            app.UseSwaggerUI(c =>
//            {
//                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
//            });


//            app.UseRouting();


//            app.UseStaticFiles();

//            app.UseAuthentication();
//            app.UseAuthorization();


//            app.UseAuthorization();

//            app.UseEndpoints(endpoints =>
//            {
//                endpoints.MapControllers();
//            });
//        }
//    }
//}





























namespace server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            TokenValidationParametersDefaults.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            AddDb(services);

            AddMapper(services);

            AddPrincipalJwt(services);

            AddApplicationServices(services);

            // register cors
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            AddMvc(services);

            AddSecurity(services);

            services.AddSwaggerGen();

            services.AddHttpContextAccessor();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
            IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API");
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapDefaultControllerRoute(); });
        }



        private static void AddMapper(IServiceCollection services)
        {
            services.AddAutoMapper(c => c.AddProfile<MappingProfile>(),
                typeof(Startup));
        }

        private static void AddPrincipalJwt(IServiceCollection services)
        {
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IJwtGenerator, JwtGenerator>();
        }

        private static void AddApplicationServices(IServiceCollection services)
        {
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<INoteService, NoteService>();
            services.AddTransient<IAccountService, AccountService>();
        }

        private static void AddMvc(IServiceCollection services)
        {
            services.AddMvc(option => option.EnableEndpointRouting = false)
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                });
        }

        private void AddSecurity(IServiceCollection services)
        {
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(opt =>
                {
                    opt.SaveToken = true;
                    opt.TokenValidationParameters = TokenValidationParametersDefaults.GetDefaultParameters();
                });

            services.AddAuthorization();
        }

        private void AddDb(IServiceCollection services)
        {
            services.AddDbContext<DatabaseContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("PlandayDatabase"));
            });

            services
                .AddIdentity<ApplicationUser, IdentityRole>()
                .AddSignInManager<SignInManager<ApplicationUser>>()
                .AddEntityFrameworkStores<DatabaseContext>()
                .AddDefaultTokenProviders();
        }
    }
}