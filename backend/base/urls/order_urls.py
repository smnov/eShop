from base.views import order_views as views
from django.urls import path

urlpatterns = [
    path('', views.AllOrders.as_view()),
    path('add/', views.OrderItemsView.as_view(), name='orders_add'),
    path('myorders/', views.MyOrdersView.as_view(), name='my_orders'),
    path('<str:pk>/', views.OrderById.as_view(), name='user_order'),
    path('<str:pk>/pay/', views.UpdateOrderToPaidView.as_view(), name='pay'),
    path('<str:pk>/delivered/', views.UpdateOrderToDelivered.as_view(), name='delivered'),
]
