"""
Definition of views.
"""

from django.shortcuts import render,render_to_response
from django.http import  Http404, HttpRequest, HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from datetime import datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_protect
from app.models import House, UserProfile

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    houses = House.objects.all()
    return render(
        request,
        'app/index.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'houses':houses,
        })
    )

def hotel_index(request):
    assert isinstance(request, HttpRequest)
    houses = House.objects.all()
    return render(
        request,
        'app/hotel_index.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'houses':houses,
        })
    )

def travel_index(request):
    assert isinstance(request, HttpRequest)
    houses = House.objects.all()
    return render(
        request,
        'app/travel_index.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'houses':houses,
        })
    )

def study_index(request):
    assert isinstance(request, HttpRequest)
    houses = House.objects.all()
    return render(
        request,
        'app/study_index.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'houses':houses,
        })
    )

@csrf_protect
def userLogin(request):
    assert isinstance(request, HttpRequest)
    if request.method == 'GET':
        username = request.GET['user[name]']
        password = request.GET['user[password]']
        user = authenticate(username=username, password=password)
        login(request, user)
        request.session['login_from'] = request.META.get('HTTP_REFERER', '/')
        return HttpResponseRedirect(request.session['login_from'])
    return render(
        request,
        'app/index.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
        })
    )


def register(request):
    assert isinstance(request, HttpRequest)
    if request.method == 'POST':
        username = request.POST['user[name]']
        password = request.POST['user[password]']
        new_user = User.objects.create_user(username, request.POST['user[email]'], password)
        new_user.save()
        user = authenticate(username=username, password=password)
        login(request, user)
    return render(
        request,
        'app/index.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
        })
    )


def publish(request):
    assert isinstance(request, HttpRequest)
    if request.method == 'POST' and request.is_ajax():
        response = HttpResponse()  
        title = request.POST['title']
        desc = request.POST['desc']
        checkinNumber = request.POST['checkinNumber']
        housetype = request.POST['housetype']
        roomtype = request.POST['roomtype']
        rentype = request.POST['rentype']
        rent = request.POST['rent']
        startime = request.POST['startime']
        endtime = request.POST['endtime']
        addr = request.POST['addr']
        contact = request.POST['contact']
        house = House(title=title,housetype = housetype,roomtype = roomtype,checkinNumber=checkinNumber,rentype=rentype,rent=rent,startime=startime,endtime=endtime
                      ,address=addr,description=desc,contactNumber=contact,publisher=request.user,timesViewed = 1)
        house.save()
        response.write(house.pk)
        return response
    return render(
        request,
        'app/publish.html',
        context_instance = RequestContext(request,
        {
            'title':'发布房源',
            'year':datetime.now().year,
        })
        
    )

def house_add_picture(request,houseid):
    assert isinstance(request, HttpRequest)
    try:
         houseid = int(houseid)
    except ValueError:
         raise Http404()
    house = House.objects.get(pk=houseid)
    if request.method == 'POST':       
        house.pics = request.FILES.get('file_photo', None)
        house.save()
        return HttpResponseRedirect('/house_details/%s/' %house.pk)
    return render(
    request,
    'app/house_add_picture.html',
    context_instance = RequestContext(request,
    {
        'title':'添加照片',
        'year':datetime.now().year,
        'house':house,
    })
     )

def house_details(request,houseid):
    assert isinstance(request, HttpRequest)
    try:
         houseid = int(houseid)
    except ValueError:
         raise Http404()
    house = House.objects.get(pk=houseid)
    return render(
        request,
        'app/house_details.html',
        context_instance = RequestContext(request,
        {
            'title':'房屋详情',
            'year':datetime.now().year,
            'house':house,
        })
    )

def profile(request,userid):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    #if request.user.pk == int(userid):
    if request.method == 'POST':
        if request.FILES:           
            #if request.POST['qqfile']:

            #    response.write('{ok:1}')
            #    return response
            #else:
            #    response.write('{sad:2}')
            return HttpResponseRedirect('/')       
        return HttpResponseRedirect('/')
    return render(
        request,
        'app/profile.html',
        context_instance = RequestContext(request,
        {
            'title':'账号设置',
            'year':datetime.now().year,
        })
    )
    
def contact(request):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/contact.html',
        context_instance = RequestContext(request,
        {
            'title':'Contact',
            'message':'Your contact page.',
            'year':datetime.now().year,
        })
    )

def about(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/about.html',
        context_instance = RequestContext(request,
        {
            'title':'About',
            'message':'Your application description page.',
            'year':datetime.now().year,
        })
    )
