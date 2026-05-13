from rest_framework import viewsets
from .models import Book, BorrowedBook # السطر ده هو اللي كان ناقص
from .serializers import BookSerializer, BorrowedBookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BorrowedBookViewSet(viewsets.ModelViewSet):
    queryset = BorrowedBook.objects.all()
    serializer_class = BorrowedBookSerializer