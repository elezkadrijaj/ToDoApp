namespace ToDoApp.Entities
{
    public class ToDoItem
    {
        
            public int Id { get; set; }                 // Primary key
            public string Title { get; set; }           // Task title
            public string Description { get; set; }     // Task description (optional)
            public DateTime DueDate { get; set; }       // Task deadline
            public bool IsCompleted { get; set; }       // Task completion status
            public string Category { get; set; }        // Optional task category (e.g., Work, Personal)

            
        }
    }

