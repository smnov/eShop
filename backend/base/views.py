from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response 
from .serializers import ProductSerializer
from .models import Product

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