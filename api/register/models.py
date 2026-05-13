from django.db import models
from django.contrib.auth.models import AbstractUser

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