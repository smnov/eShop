from base.views import product_views as views
from django.urls import path

urlpatterns = [
    path('', views.ProductsView.as_view()),
    path('upload/', views.UploadImage.as_view()),
    path('<str:pk>/reviews/', views.ProductReview.as_view()),
    path('top/', views.TopProducts.as_view()),
    path('<str:pk>/', views.ProductView.as_view()),
    path('<str:pk>/edit/', views.UpdateProduct.as_view()),
]
