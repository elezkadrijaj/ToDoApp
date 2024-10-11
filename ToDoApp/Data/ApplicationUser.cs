using Microsoft.AspNetCore.Identity;

namespace ToDoApp.Data

{   
        public class ApplicationUser : IdentityUser
        {
            public string Name { get; set; }  // Add this property
        }
    

}
