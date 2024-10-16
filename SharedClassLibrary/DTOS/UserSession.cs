using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedClassLibrary.DTOS
{
    public record UserSession(string? Id, string? Name, string? Email, string? Role);
}
