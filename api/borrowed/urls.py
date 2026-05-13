from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BorrowedBookViewSet


router = DefaultRouter()
router.register(r'borrowed-records', BorrowedBookViewSet, basename='borrowedbook')

urlpatterns = [
    path('', include(router.urls)),
]