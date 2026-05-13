from rest_framework import serializers
from .models import BorrowedBook
from books.serializers import BookSerializer

class BorrowedBookSerializer(serializers.ModelSerializer):
    status = serializers.ReadOnlyField()
    
    user_name = serializers.ReadOnlyField(source='user.username')
    book_details = BookSerializer(source='book', read_only=True)

    class Meta:
        model = BorrowedBook
        fields = ['id', 'book', 'book_details', 'user', 'user_name', 'borrow_date', 'due_date', 'is_returned', 'status']
        
        read_only_fields = ['user', 'borrow_date', 'due_date']