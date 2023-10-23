"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from julia_fractal import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/julia/(?P<min_x>[-\d.]+)/(?P<max_x>[-\d.]+)/(?P<min_y>[-\d.]+)/(?P<max_y>[-\d.]+)/(?P<comp_const_re>[-\d.]+)/(?P<comp_const_im>[-\d.]+)/$', views.julia_set),
]
