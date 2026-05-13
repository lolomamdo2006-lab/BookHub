# books/apps.py

from django.apps import AppConfig

class BooksConfig(AppConfig): # ممكن تغيري اسم الكلاس كمان لـ BooksConfig
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'books'  # تأكدي إنها 'books' مش الاسم القديم