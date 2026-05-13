# from django.db import models
# from django.contrib.auth.models import User
# from django.conf import settings

# class Book(models.Model):
   
#     book_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
#     title = models.CharField(max_length=255, null=True, blank=True)
#     author = models.CharField(max_length=255, null=True, blank=True)
#     category = models.CharField(max_length=100, null=True, blank=True)
#     description = models.TextField(null=True, blank=True)
#     is_available = models.BooleanField(default=True)

#     def __str__(self):
#         return self.title if self.title else "No Title"
from django.db import models
from django.contrib.auth.models import User


class Book(models.Model):
    
    book_id = models.CharField(max_length=50, unique=False, null=True, blank=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    author = models.CharField(max_length=255, null=True, blank=True)
    category = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.title if self.title else "No Title"