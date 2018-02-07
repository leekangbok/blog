# Generated by Django 2.0.1 on 2018-02-07 12:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bbs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(blank=True, default='', max_length=128, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modify_date', models.DateTimeField(auto_now=True)),
                ('passwd', models.CharField(blank=True, default='', max_length=512, null=True)),
                ('body', models.TextField(max_length=8192)),
                ('title', models.CharField(max_length=512)),
            ],
            options={
                'ordering': ['-created_date'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='BbsComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(blank=True, default='', max_length=128, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modify_date', models.DateTimeField(auto_now=True)),
                ('passwd', models.CharField(blank=True, default='', max_length=512, null=True)),
                ('body', models.TextField(max_length=8192)),
                ('bbs', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bbs.Bbs')),
            ],
            options={
                'ordering': ['-created_date'],
                'abstract': False,
            },
        ),
    ]