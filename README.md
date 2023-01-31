# ESHOP
Ecommerce website with python and django-rest-framework on backend and react-js on frontend.

![main](https://user-images.githubusercontent.com/101511388/215695936-12876fe8-e13a-46e4-9941-294a8ad3840b.png)
![product](https://user-images.githubusercontent.com/101511388/215696097-0aba774c-6e54-4c6b-acd8-22a9bc0b5a86.png)
![shipping](https://user-images.githubusercontent.com/101511388/215696247-1678bb44-a832-485c-83e3-35cdba912b4f.png)
![order](https://user-images.githubusercontent.com/101511388/215696263-ff48ca5c-b9b5-4702-8d30-7edc7feabd9e.png)

## Features:
- Proudct list
- Top rated products carousel
- Login and registration
- Adding reviews to products
- Search
- Pagination
- Stock
- Order, checkout and payment features
- Shipping cart
- Deliver and payment status
- Admin panel for view users, adding new products, stock and inspect orders

# Installation

## Backend
Let's setup our python backend.
```    
> cd backend
```
First you need to create your python virtual environment:
```
> python3 -m venv venv
```
You can use any virtual environment, but here I use venv.
Activate virtual environment:
```
> source venv/bin/activate
```
Then you need to install requierments for our shop:
```
> pip install -r requierements.txt
```
Now you can run django server
```
> python3 manage.py runserver
```
That's it for our backend.
## Frontend
Go to frontend directory:
```
> cd ../frontend
```
Install dependences:
```
> npm install
```
Run frontend server:
```
> npm start
```
Now if you go to http://localhost:3000 you will see the main page.

# License
MIT
