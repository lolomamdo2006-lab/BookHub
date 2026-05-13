from django.contrib import admin
from .models import Book, BorrowedBook

# عشان الجداول تظهر في لوحة التحكم
admin.site.register(Book)
admin.site.register(BorrowedBook)