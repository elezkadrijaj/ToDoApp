using SharedClassLibrary.DTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedClassLibrary.Contract
{
    public interface IUserAccount
    {
        Task<ServiceResponses.GeneralResponse> CreateAccount(UserDTO userDTO);
        Task<ServiceResponses.LoginResponse> LoginAccount(LoginDTO loginDTO);
    }
}
