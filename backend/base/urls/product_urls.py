from base.views import product_views as views
from django.urls import path

urlpatterns = [
    path('', views.ProductsView.as_view()),
    path('<str:pk>', views.ProductView.as_view())
]
