from rest_framework import viewsets, filters
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Book
# , BorrowedBook 
from .serializers import BookSerializer

from rest_framework.decorators import action, api_view, parser_classes
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

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser]) # ضروري جداً لاستقبال الصور
def add_book(request):
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)