from rest_framework import serializers
from .models import Book, BorrowedBook

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BorrowedBookSerializer(serializers.ModelSerializer):
    # الحركة دي بتخلي بيانات الكتاب تظهر كاملة جوه الاستعارة
    book_details = BookSerializer(source='book', read_only=True)
    class Meta:
        model = BorrowedBook
        fields = ['id', 'book', 'borrow_date', 'due_date', 'is_returned', 'book_details']