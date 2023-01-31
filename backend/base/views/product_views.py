from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from base.serializers import ProductSerializer
from base.models import Product, Review


class ProductsView(APIView):
    def get(self, request):
        query = request.query_params.get('keyword')
        if query == None:
            query = ''
        products = Product.objects.filter(name__icontains=query)

        page = request.query_params.get('page')
        paginator = Paginator(products, 12)

        try:
            products = paginator.page(page)
        except PageNotAnInteger:
            products = paginator.page(1)
        except EmptyPage:
            products = paginator.page(paginator.num_pages)

        if page == None:
            page = 1
        
        page = int(page)
        serializer = ProductSerializer(products, many=True)
        return Response({'products': serializer.data, 
                        'page': page, 
                        'pages': paginator.num_pages})
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


class TopProducts(APIView):
    def get(self, request):
        products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5] # Top 5 Products that greater than or equal to 4
        serializer = ProductSerializer(products, many=True)
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
        alreadyExists = product.review_set.filter(user=user).exists()

        if alreadyExists:
            return Response({'Details': 'Product already reviewed'},
            status=status.HTTP_400_BAD_REQUEST)
        elif data['rating'] == 0:
            return Response({'details': 'Please select a rating'})
        else:
            review = Review.objects.create(
                user=user,
                product=product,
                name=user.first_name,
                rating=data['rating'],
                comment=data['comment']
            )
            reviews = product.review_set.all()
            product.numReviews = len(reviews)
            total = 0
            for i in reviews:
                total += i.rating

            product.rating = total / len(reviews)
            product.save()
            return Response('Review Added')

