from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserProfileView(APIView):
    def get(self, request):
        permission_classes = [IsAuthenticated]
        queryset = request.user
        serializer = UserSerializer(queryset, many=False)
        return Response(serializer.data)

class UserProfileUpdate(APIView):
    def put(self, request):
        permission_classes = [IsAuthenticated]
        user = request.user
        seralizer = UserSerializerWithToken(user, many=False)
        data = request.data 
        user.first_name = data['name']
        user.email = data['email']
        if data['password'] != '':
            user.password = make_password(data['password'])
        
        user.save()

class Users(APIView):
    def get(self, request):
        permission_classes = [IsAdminUser]
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

class RegisterUserView(APIView):
    def post(self, request):
        data = request.data
        try:
            user = User.objects.create(
                first_name=data['name'],
                username=data['email'],
                email=data['email'],
                password=make_password(data['password'])
            )
            serializer = UserSerializerWithToken(user, many=False)
            return Response(serializer.data)
        except:
            message = {'detail': 'User with this name already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)