from django.db import models
from django.conf import settings  
from books.models import Book
from datetime import date, timedelta

class BorrowedBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='my_borrowed_books', 
        on_delete=models.CASCADE
    )
    
    borrow_date = models.DateField(auto_now_add=True)
    due_date = models.DateField(blank=True, null=True)
    is_returned = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        
        if not self.id and not self.borrow_date:
            self.borrow_date = date.today()
            
        
        if not self.due_date:
            self.due_date = (self.borrow_date or date.today()) + timedelta(days=14)
        
       
        if not self.is_returned:
            self.book.is_available = False
        else:
            self.book.is_available = True
        
        self.book.save()
        super().save(*args, **kwargs)

    @property
    def status(self):
        return "Returned" if self.is_returned else "Active"

    def __str__(self):
        return f"{self.user} borrowed {self.book.title}"