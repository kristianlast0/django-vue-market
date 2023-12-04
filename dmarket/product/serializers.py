from rest_framework import serializers

from .models import Category, Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'slug',
            'description',
            'price',
            'image',
            'thumbnail',
            'views',
            'created_at',
            'updated_at',
            'get_absolute_url',
            'get_image',
            'get_thumbnail',
        )

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'slug',
            'get_absolute_url',
            'products',
        )