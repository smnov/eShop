# Generated by Django 4.1.5 on 2023-01-30 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_review_createdat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='product/image.png/', null=True, upload_to='product'),
        ),
    ]
