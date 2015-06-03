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
from django.contrib.auth.decorators import login_required  
from app.models import House, UserProfile, Itinerary, Comments, TravelProduct

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
    houses = House.objects.all()[:4]
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
    travelproducts = TravelProduct.objects.all()[:4]
    return render(
        request,
        'app/travel_index.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'travelproducts':travelproducts,
        })
    )

def study_index(request):
    assert isinstance(request, HttpRequest)
    houses = House.objects.all()[:4]
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

def hotel_list(request):
    assert isinstance(request, HttpRequest)
    houses = House.objects.all()
    return render(
        request,
        'app/hotel_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'houses':houses,
        })
    )

def travel_list(request):
    assert isinstance(request, HttpRequest)
    travelproducts = TravelProduct.objects.all()
    return render(
        request,
        'app/travel_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'travelproducts':travelproducts,
        })
    )

def study_list(request):
    assert isinstance(request, HttpRequest)
    houses = House.objects.all()
    return render(
        request,
        'app/study_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'houses':houses,
        })
    )

def my_house_list(request):
    assert isinstance(request, HttpRequest)
    houses = House.objects.filter(publisher=request.user)
    return render(
        request,
        'app/my_house_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'houses':houses,
        })
    )

def my_itinerary_list(request):
    assert isinstance(request, HttpRequest)
    itinerarys = Itinerary.objects.filter(publisher=request.user)
    return render(
        request,
        'app/my_itinerary_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'itinerarys':itinerarys,
        })
    )

def my_travel_list(request):
    assert isinstance(request, HttpRequest)
    travelproducts = TravelProduct.objects.filter(publisher=request.user)
    return render(
        request,
        'app/my_travel_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'travelproducts':travelproducts,
        })
    )

def community(request):
    assert isinstance(request, HttpRequest)
    itineraries = Itinerary.objects.all()
    return render(
        request,
        'app/community.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'itineraries':itineraries,
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

@login_required
def itinerary_publish(request):
    assert isinstance(request, HttpRequest)
    if request.method == 'POST' and request.is_ajax():
        response = HttpResponse()  
        title = request.POST['title']
        desc = request.POST['desc']
        itinerary = Itinerary(title=title,description=desc,publisher=request.user,timesViewed = 1, rate =0)
        itinerary.save()
        response.write(itinerary.pk)
        return response
    return render(
        request,
        'app/itinerary_publish.html',
        context_instance = RequestContext(request,
        {
            'title':'发布游记',
            'year':datetime.now().year,
        })
        
    )

@login_required
def house_publish(request):
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
                      ,address=addr,description=desc,contactNumber=contact,publisher=request.user,timesViewed = 1,rate=0)
        house.save()
        response.write(house.pk)
        return response
    return render(
        request,
        'app/house_publish.html',
        context_instance = RequestContext(request,
        {
            'title':'发布房源',
            'year':datetime.now().year,
        })
        
    )

@login_required
def travelproduct_publish(request):
    assert isinstance(request, HttpRequest)
    if request.method == 'POST' and request.is_ajax():
        response = HttpResponse()  
        title = request.POST['title']
        desc = request.POST['desc']
        price = request.POST['price']
        planeticket = request.POST['planeticket']     
        startime = request.POST['startime']
        endtime = request.POST['endtime']
        checkinHotel = request.POST['checkinHotel']
        travelproduct = TravelProduct(title=title,startime=startime,price=price,endtime=endtime,planeticket=planeticket,checkinHotel=checkinHotel,description=desc,publisher=request.user,timesViewed = 1,rate=0)
        travelproduct.save()
        response.write(travelproduct.pk)
        return response
    return render(
        request,
        'app/travelproduct_publish.html',
        context_instance = RequestContext(request,
        {
            'title':'发布房源',
            'year':datetime.now().year,
        })
        
    )

@login_required
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

@login_required
def itinerary_add_picture(request,itineraryid):
    assert isinstance(request, HttpRequest)
    try:
         itineraryid = int(itineraryid)
    except ValueError:
         raise Http404()
    itinerary = Itinerary.objects.get(pk=itineraryid)
    if request.method == 'POST':       
        itinerary.pics = request.FILES.get('file_photo', None)
        itinerary.save()
        return HttpResponseRedirect('/itinerary_details/%s/' %itinerary.pk)
    return render(
    request,
    'app/itinerary_add_picture.html',
    context_instance = RequestContext(request,
    {
        'title':'添加照片',
        'year':datetime.now().year,
        'itinerary':itinerary,
    })
     )

@login_required
def travelproduct_add_picture(request,travelproductid):
    assert isinstance(request, HttpRequest)
    try:
         travelproductid = int(travelproductid)
    except ValueError:
         raise Http404()
    travelproduct = TravelProduct.objects.get(pk=travelproductid)
    if request.method == 'POST':       
        travelproduct.pics = request.FILES.get('file_photo', None)
        travelproduct.save()
        return HttpResponseRedirect('/travelproduct_details/%s/' %travelproduct.pk)
    return render(
    request,
    'app/travelproduct_add_picture.html',
    context_instance = RequestContext(request,
    {
        'title':'添加照片',
        'year':datetime.now().year,
        'travelproduct':travelproduct,
    })
     )

def house_details(request,houseid):
    assert isinstance(request, HttpRequest)
    try:
         houseid = int(houseid)
    except ValueError:
         raise Http404()
    try:
        house = House.objects.get(pk=houseid)
    except ValueError:
        raise Http404()
    comments = Comments.objects.filter(relatedId=itineraryid,relatedType=2)
    return render(
        request,
        'app/house_details.html',
        context_instance = RequestContext(request,
        {
            'title':'房屋详情',
            'year':datetime.now().year,
            'house':house,
            'comments':comments,
        })
    )

def itinerary_details(request,itineraryid):
    assert isinstance(request, HttpRequest)
    try:
         itineraryid = int(itineraryid)
    except ValueError:
         raise Http404()
    try:
        itinerary = Itinerary.objects.get(pk=itineraryid)
    except ValueError:
        raise Http404()
    comments = Comments.objects.filter(relatedId=itineraryid,relatedType=3)
    return render(
        request,
        'app/itinerary_details.html',
        context_instance = RequestContext(request,
        {
            'title':'游记',
            'year':datetime.now().year,
            'itinerary':itinerary,
            'comments':comments,
        })
    )

def travelproduct_details(request,itineraryid):
    assert isinstance(request, HttpRequest)
    try:
         itineraryid = int(itineraryid)
    except ValueError:
         raise Http404()
    
    travelproduct = TravelProduct.objects.get(pk=itineraryid)
    comments = Comments.objects.filter(relatedId=itineraryid,relatedType=0)
    return render(
        request,
        'app/travelproduct_details.html',
        context_instance = RequestContext(request,
        {
            'title':'游记',
            'year':datetime.now().year,
            'travelproduct':travelproduct,
            'comments':comments,
        })
    )

def comment(request,relatedType,relatedId):
    assert isinstance(request, HttpRequest)
    try:
         relatedType = int(relatedType)
         relatedId = int(relatedId)
    except ValueError:
         raise Http404()
    if request.method == 'POST' and request.is_ajax():
        content = request.POST['content']
        response = HttpResponse()
        comment = Comments(relatedType=relatedType,relatedId = relatedId,publisher=request.user,content=content)
        comment.save()
        response.write(comment.pk)
        return response

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
