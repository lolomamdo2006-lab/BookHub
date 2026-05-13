from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, BorrowedBookViewSet # تأكدي إن دي موجودة

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'borrowed', BorrowedBookViewSet) # السطر ده هو اللي ناقص!

urlpatterns = [
    path('', include(router.urls)),
]