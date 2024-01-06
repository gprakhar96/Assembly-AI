from django.urls import path

from . import views

urlpatterns = [
    path('upload', views.upload_view),
    path('querry', views.querry_view),
]
