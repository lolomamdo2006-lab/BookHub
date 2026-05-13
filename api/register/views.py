from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
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