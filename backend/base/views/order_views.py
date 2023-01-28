from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer
from datetime import datetime


class OrderItemsView(APIView):
    def post(self, request):
        permission_classes = [IsAuthenticated]
        user = request.user
        data = request.data
        orderItems = data['orderItems']

        if orderItems and len(orderItems) == 0:
            return Response({'detail': 'No order items'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            order = Order.objects.create(
                user=user,
                paymentMethod=data['paymentMethod'],
                taxPrice=data['taxPrice'],
                shippingPrice=data['shippingPrice'],
                totalPrice=data['totalPrice']
            )
            shipping = ShippingAddress.objects.create(
                order=order,
                address=data['shippingAddress']['address'],
                city=data['shippingAddress']['city'],
                postalCode=data['shippingAddress']['postalCode'],
                country=data['shippingAddress']['country']
            )
            for i in orderItems:
                product = Product.objects.get(_id=i['product'])
                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    qty=i['qty'],
                    price=i['price'],
                    image=product.image.url
                ) 

                product.countInStock -= item.qty
                product.save()
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)


class MyOrdersView(APIView):
    def get(self, request):
        permission_classes = [IsAuthenticated]
        user = request.user
        orders = user.order_set.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class AllOrders(APIView):
    def get(self, request):
        permission_classes = [IsAdminUser]
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
        

class UpdateOrderToPaidView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        order = Order.objects.get(_id=pk)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()
        return Response('Order was paid')


class OrderById(APIView):
    def get(self, request, pk):
        permission_classes = [IsAuthenticated]
        user = request.user
        try:

            order = Order.objects.get(_id=pk)
            if user.is_staff or order.user == user:
                serializer = OrderSerializer(order, many=False)
                return Response(serializer.data)
            else:
                Response({'detail': 'Not authorized'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        