from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from books.models import Book
from .models import CustomUser, BorrowedBook
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserSerializer
import json
from django.http import JsonResponse
# Create your views here.
@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
  
    print(serializer.errors) 
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def login(request):
    if request.method=='POST':
        data = json.loads(request.body) 
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            #from py to json
            serializer = UserSerializer(user)
  
            return Response({"message": "Login Successful!","user": serializer.data}, status=status.HTTP_200_OK)
       
        return Response(
        {"error": "Invalid username or password"},
        status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(['POST'])
def borrow_book(request):
    book_id = request.data.get('book_id')
    username = request.data.get('username')

    print(f"--- Attempting to borrow book_id: {book_id} for user: {username} ---")

    try:
        book = Book.objects.get(id=int(book_id))
        user = CustomUser.objects.get(username=username)

        if not book.is_available:
            return Response({"message": "This book is already borrowed!"}, status=status.HTTP_400_BAD_REQUEST)

        BorrowedBook.objects.create(user=user, book=book)

        book.is_available = False
        book.save()

        return Response({"message": "Success"}, status=status.HTTP_200_OK)

    except (Book.DoesNotExist, ValueError, TypeError):
        return Response({"message": "Invalid ID: Book not found in database"}, status=status.HTTP_404_NOT_FOUND)
    except CustomUser.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"message": f"Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)