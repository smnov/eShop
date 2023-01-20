from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductsView.as_view()),
    path('products/<str:pk>', views.ProductView.as_view())
]
