# Generated by Django 4.1.5 on 2023-01-30 23:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='order_item'),
        ),
    ]