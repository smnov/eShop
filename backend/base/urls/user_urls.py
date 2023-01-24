from base.views import user_views as views
from django.urls import path

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), 
        name='login'),
    path('register/', views.RegisterUserView.as_view(), name='register'),
    path('/profile/', views.UserProfileView.as_view(), name='user_profile'),
    path('/all/', views.Users.as_view(), name='users'),
]
