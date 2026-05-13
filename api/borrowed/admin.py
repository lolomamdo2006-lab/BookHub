from django.contrib import admin
from .models import BorrowedBook

@admin.register(BorrowedBook)
class BorrowedBookAdmin(admin.ModelAdmin):
  
    list_display = ('book', 'user', 'borrow_date', 'status')
   
    search_fields = ('user__username', 'book__title')