from rest_framework import viewsets, filters
from .models import Book
# , BorrowedBook 
from .serializers import BookSerializer

from rest_framework.decorators import action
from rest_framework.response import Response

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author', 'category']

    
    @action(detail=False, methods=['get'])
    def borrowed(self, request):
        borrowed_books = Book.objects.filter(is_available=False)
        serializer = self.get_serializer(borrowed_books, many=True)
        return Response(serializer.data)