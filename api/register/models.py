from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

from django.conf import settings

class Book(models.Model):
    book_id = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class BorrowedBook(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrow_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} borrowed {self.book.title}"

class CustomUser(AbstractUser):
#should be tuples of tuples
    USER_TYPES = (
        ('user', 'User'),
        ('admin', 'Admin'),
    )

    user_type = models.CharField(
        max_length=10,
        choices=USER_TYPES
    )
    username=models.CharField(unique='True')
    email=models.EmailField(unique='True')
    def __str__(self):
        return self.username