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
    url(r'^plan/$','app.views.plan',name='plan'),
    url(r'^community/$','app.views.community',name='community'),
    url(r'^travel_list/$','app.views.travel_list',name='travel_list'),
    url(r'^hotel_search_list/([\u4e00-\u9fa5]+)/(\d{4}-\d{2}-\d{2})/(\d{4}-\d{2}-\d{2})/$','app.views.hotel_search_list',name='hotel_search_list'),
    url(r'^hotel_list/$','app.views.hotel_list',name='hotel_list'),
    url(r'^study_list/$','app.views.study_list',name='study_list'),
    url(r'^my_travel_list/$','app.views.my_travel_list',name='my_travel_list'),
    url(r'^my_house_list/$','app.views.my_house_list',name='my_house_list'),
    url(r'^my_study_list/$','app.views.my_study_list',name='my_study_list'),
    url(r'^my_itinerary_list/$','app.views.my_itinerary_list',name='my_itinerary_list'),
    url(r'^profile/(\d+)/$','app.views.profile',name='profile'),
    url(r'^house_publish/$','app.views.house_publish',name='house_publish'),
    url(r'^house_delete/(\d+)/$','app.views.house_delete',name='house_delete'),
    url(r'^travel_delete/(\d+)/$','app.views.travel_delete',name='travel_delete'),
    url(r'^itinerary_delete/(\d+)/$','app.views.itinerary_delete',name='itinerary_delete'),
    url(r'^comment_delete/(\d+)/$','app.views.comment_delete',name='comment_delete'),
    url(r'^travel_delete/(\d+)/$','app.views.travel_delete',name='travel_delete'),
    url(r'^itinerary_publish/$','app.views.itinerary_publish',name='itinerary_publish'),
    url(r'^travelproduct_publish/$','app.views.travelproduct_publish',name='travelproduct_publish'),
    url(r'^hotel_index/$','app.views.hotel_index',name='hotel_index'),
    url(r'^travel_index/$','app.views.travel_index',name='hotel_index'),
    url(r'^study_index/$','app.views.study_index',name='hotel_index'),
    url(r'^study_publish/$','app.views.study_publish',name='study_publish'),    
    url(r'^comment/(\d+)/(\d+)/$','app.views.comment',name='comment'),
    url(r'^house_add_picture/(\d+)/$','app.views.house_add_picture',name='house_add_picture'),
    url(r'^travelproduct_add_picture/(\d+)/$','app.views.travelproduct_add_picture',name='travelproduct_add_picture'),
    url(r'^itinerary_add_picture/(\d+)/$','app.views.itinerary_add_picture',name='itinerary_add_picture'),
    url(r'^house_details/(\d+)/$','app.views.house_details',name='house_details'),
    url(r'^itinerary_details/(\d+)/$','app.views.itinerary_details',name='itinerary_details'),
    url(r'^travelproduct_details/(\d+)/$','app.views.travelproduct_details',name='travelproduct_details'),
    url(r'^studyproduct_details/(\d+)/$','app.views.studyproduct_details',name='studyproduct_details'),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT,'show_indexes': True }),
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
