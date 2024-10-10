using Microsoft.EntityFrameworkCore;
using ToDoApp.Entities;

namespace ToDoApp.Data
{
    public class DataContext:DbContext   
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<ToDoItem> ToDoItems { get; set; }
    }
}
