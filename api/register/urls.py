from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup), # المسار هيبقى: signup/
    path('login/', views.login),   # المسار هيبقى: login/
    path('borrow/', views.borrow_book),
]