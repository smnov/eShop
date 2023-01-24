from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.serializers import ProductSerializer
from base.models import Product


class ProductsView(APIView):
    def get(self, request):
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)

class ProductView(APIView):
    def get(self, request, pk):
        queryset = Product.objects.get(pk=pk)
        serializer = ProductSerializer(queryset)
        return Response(serializer.data)