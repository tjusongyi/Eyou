"""
Definition of urls for MyApp.
"""

from datetime import datetime
from django.conf.urls import patterns, url
from MyApp import settings
from app.forms import BootstrapAuthenticationForm

# Uncomment the next lines to enable the admin:
# from django.conf.urls import include
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'app.views.home', name='home'),
    url(r'^contact$', 'app.views.contact', name='contact'),
    url(r'^about', 'app.views.about', name='about'),
    url(r'^register', 'app.views.register', name='register'),
    url(r'^login/$','app.views.userLogin',name='login'),
    url(r'^profile/(\d+)$','app.views.profile',name='profile'),
    url(r'^publish/$','app.views.publish',name='publish'),
    url(r'^hotel_index/$','app.views.hotel_index',name='hotel_index'),
    url(r'^travel_index/$','app.views.travel_index',name='hotel_index'),
    url(r'^study_index/$','app.views.study_index',name='hotel_index'),
    url(r'^house_add_picture/(\d+)/$','app.views.house_add_picture',name='house_add_picture'),
    url(r'^house_details/(\d+)/$','app.views.house_details',name='house_details'),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT }),
    url(r'^logout$',
        'django.contrib.auth.views.logout',
        {
            'next_page': '/',
        },
        name='logout'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
