﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Security.Interfaces
{
    public interface IUserAccessor
    {
        string GetCurrentUsername();

    }
}
