

from rest_framework import viewsets, filters
from .models import Book
# , BorrowedBook 
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    #search 
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author', 'category']

