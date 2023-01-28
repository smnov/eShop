from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.serializers import ProductSerializer
from base.models import Product, Review


class ProductsView(APIView):
    def get(self, request):
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request):
        permission_classes = [IsAdminUser]
        user = request.user
        product = Product.objects.create(
            user=user, 
            name='Sample Name',
            price=0,
            brand='Sample brand',
            countInStock=0,
            category='Sample Category',
            description=''
        )
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)

class ProductView(APIView):
    def get(self, request, pk):
        queryset = Product.objects.get(_id=pk)
        serializer = ProductSerializer(queryset)
        return Response(serializer.data)
    def delete(self, requset, pk):
        premission_classes = [IsAdminUser]
        product = Product.objects.get(_id=pk)
        product.delete()
        return Response('Product was deleted')

class UpdateProduct(APIView):
    def put(self, request, pk):
        permmission_classes = [IsAdminUser]
        data = request.data
        product = Product.objects.get(_id=pk)
        product.name = data['name']
        product.price = data['price']
        product.brand = data['brand']
        product.countInStock = data['countInStock']
        product.category = data['category']
        product.description = data['description']
        product.save()
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    

class UploadImage(APIView):
    def post(self, request):
        data = request.data
        product_id = data['product_id']
        product = Product.objects.get(_id=product_id)
        product.image = request.FILES.get('image')
        product.save()
        return Response('Image was uploaded')


class ProductReview(APIView):
    def post(self, request, pk):
        permission_classes=[IsAuthenticated]
        user = request.user
        product = Product.objects.get(_id=pk)
        data = request.data

        
