from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import BorrowedBook
from .serializers import BorrowedBookSerializer

class BorrowedBookViewSet(viewsets.ModelViewSet):
    serializer_class = BorrowedBookSerializer

    def get_queryset(self):
        
        return BorrowedBook.objects.filter(is_returned=False)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def return_book(self, request, pk=None):
        borrowed_record = self.get_object()
        borrowed_record.is_returned = True
        borrowed_record.save()
        
        book = borrowed_record.book
        book.is_available = True
        book.save()
        
        return Response(
            {'status': 'Book returned successfully and library inventory updated.'}, 
            status=status.HTTP_200_OK
        )