from django.db import models
from django.contrib.auth.models import User

# 1. موديل الكتاب الموحد (للبحث، التفاصيل، الإضافة، التعديل)
class Book(models.Model):
    # null=True و blank=True بيخلوا الخانات دي اختيارية في الداتابيز عشان الميجريشن يعدي
    book_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    author = models.CharField(max_length=255, null=True, blank=True)
    category = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.title if self.title else "No Title"

# 2. موديل الاستعارة (شغلك إنتي - My Borrowed Books)
class BorrowedBook(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    borrow_date = models.DateField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True) # عشان لو لسه متحددش ميعاد
    is_returned = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"