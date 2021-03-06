﻿"""
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
from app.models import House, UserProfile, Itinerary, Comments, TravelProduct, EduProduct

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
    studyproducts = EduProduct.objects.all()[:4]
    return render(
        request,
        'app/study_index.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'studyproducts':studyproducts,
        })
    )

def hotel_search_list(request,des,startime,endtime):
    assert isinstance(request, HttpRequest)
    houses = House.objects.filter(address__icontains=des,startime__lte=startime,endtime__gte=endtime)
    return render(
        request,
        'app/hotel_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'des':des,
            'houses':houses,
        })
    )

def hotel_list(request):
    assert isinstance(request, HttpRequest)
    houses = House.objects.all()
    comments = list()
    for house in houses:
        comment = Comments.objects.filter(relatedId=house.pk,relatedType=2)
        comments.append(comment.count)
    return render(
        request,
        'app/hotel_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'houses':houses,
            'comments':comments,
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

def travel_search_list(request,des,startime,endtime):
    assert isinstance(request, HttpRequest)
    travelproducts = TravelProduct.objects.filter(destination__icontains=des,startime__lte=startime,endtime__gte=endtime)
    return render(
        request,
        'app/travel_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'des':des,
            'travelproducts':travelproducts,
        })
    )

@login_required
def study_publish(request):
    assert isinstance(request, HttpRequest)
    if request.method == 'POST' and request.is_ajax():
        response = HttpResponse()  
        title = request.POST['title']
        desc = request.POST['desc']
        startPlace = request.POST['startPlace']
        type = request.POST['type']
        destination = request.POST['destination']
        price = request.POST['price']
        startime = request.POST['startime']
        endtime = request.POST['endtime']
        contact = request.POST['contact']
        study = EduProduct(title=title,startPlace = startPlace,type=type,price=price,startime=startime,endtime=endtime
                      ,destination=destination,description=desc,contact=contact,publisher=request.user,timesViewed = 1,rate=0)
        study.save()
        response.write(study.pk)
        return response
    return render(
        request,
        'app/study_publish.html',
        context_instance = RequestContext(request,
        {
            'title':'发布房源',
            'year':datetime.now().year,
        })
        
    )

@login_required
def studyproduct_add_picture(request,studyproductid):
    assert isinstance(request, HttpRequest)
    try:
         studyproductid = int(studyproductid)
    except ValueError:
         raise Http404()
    studyproduct = EduProduct.objects.get(pk=studyproductid)
    if request.method == 'POST':       
        studyproduct.pics = request.FILES.get('file_photo', None)
        studyproduct.save()
        return HttpResponseRedirect('/studyproduct_details/%s/' %studyproduct.pk)
    return render(
    request,
    'app/studyproduct_add_picture.html',
    context_instance = RequestContext(request,
    {
        'title':'添加照片',
        'year':datetime.now().year,
        'studyproduct':studyproduct,
    })
     )

def studyproduct_details(request,studyproductid):
    assert isinstance(request, HttpRequest)
    try:
         studyproductid = int(studyproductid)
    except ValueError:
         raise Http404()
    try:
        studyproduct = EduProduct.objects.get(pk=studyproductid)
    except ValueError:
        raise Http404()
    comments = Comments.objects.filter(relatedId=studyproductid,relatedType=1)
    profile = UserProfile.objects.get(user=studyproduct.publisher)
    return render(
        request,
        'app/studyproduct_details.html',
        context_instance = RequestContext(request,
        {
            'title':'房屋详情',
            'year':datetime.now().year,
            'studyproduct':studyproduct,
            'profile':profile,
            'comments':comments,
        })
    )
def study_list(request):
    assert isinstance(request, HttpRequest)
    studyproducts = EduProduct.objects.all()
    return render(
        request,
        'app/study_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'studyproducts':studyproducts,
        })
    )

def study_search_list(request,des,startime,endtime):
    assert isinstance(request, HttpRequest)
    studyproducts = EduProduct.objects.filter(destination__icontains=des,startime__lte=startime,endtime__gte=endtime)
    return render(
        request,
        'app/study_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'des':des,
            'studyproducts':studyproducts,
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
    comments = list()
    for travel_product in travel_products:
        comment = Comments.objects.filter(relatedId=travel_product.pk,relatedType=0)
        comments.append(comment)
    return render(
        request,
        'app/my_travel_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'travelproducts':travelproducts,
            'comments':comments,
        })
    )

def my_study_list(request):
    assert isinstance(request, HttpRequest)
    studyproducts = EduProduct.objects.filter(publisher=request.user)
    comments = list()
    for studyproduct in studyproducts:
        comment = Comments.objects.filter(relatedId=studyproduct.pk,relatedType=0)
        comments.append(comment)
    return render(
        request,
        'app/my_study_list.html',
        context_instance = RequestContext(request,
        {
            'title':'易游',
            'year':datetime.now().year,
            'studyproducts':studyproducts,
            'comments':comments,
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
        profile = UserProfile(user=new_user);
        profile.save();
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
def itinerary_edit(request,itineraryid):
    assert isinstance(request, HttpRequest)
    if request.method == 'POST' and request.is_ajax():
        response = HttpResponse()  
        title = request.POST['title']
        desc = request.POST['desc']
        itinerary = Itinerary.objects.get(pk=itineraryid)
        itinerary.update(title=title,description=desc)
        itinerary.save()
        response.write(itinerary.pk)
        return response
    return render(
        request,
        'app/itinerary_edit.html',
        context_instance = RequestContext(request,
        {
            'title':'编辑游记',
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
def house_edit(request,houseid):
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
        house = House.objects.get(pk=houseid)
        house.update(title=title,housetype = housetype,roomtype = roomtype,checkinNumber=checkinNumber,rentype=rentype,rent=rent,startime=startime,endtime=endtime
                      ,address=addr,description=desc,contactNumber=contact)
        house.save()
        response.write(house.pk)
        return response
    return render(
        request,
        'app/house_edit.html',
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
        destination = request.POST['destination']
        desc = request.POST['desc']
        price = request.POST['price']
        planeticket = request.POST['planeticket']     
        startime = request.POST['startime']
        endtime = request.POST['endtime']
        checkinHotel = request.POST['checkinHotel']
        travelproduct = TravelProduct(title=title,startime=startime,price=price,endtime=endtime,planeticket=planeticket,checkinHotel=checkinHotel,description=desc,destination=destination,publisher=request.user,timesViewed = 1,rate=0)
        travelproduct.save()
        response.write(travelproduct.pk)
        return response
    return render(
        request,
        'app/travelproduct_publish.html',
        context_instance = RequestContext(request,
        {
            'title':'发布旅游产品',
            'year':datetime.now().year,
        })
        
    )

@login_required
def travelproduct_edit(request,travelid):
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
        travelproduct = TravelProduct.objects.get(pk=travelid)
        travelproduct.update(title=title,startime=startime,price=price,endtime=endtime,planeticket=planeticket,checkinHotel=checkinHotel,description=desc)
        travelproduct.save()
        response.write(travelproduct.pk)
        return response
    return render(
        request,
        'app/travelproduct_edit.html',
        context_instance = RequestContext(request,
        {
            'title':'编辑旅游产品',
            'year':datetime.now().year,
        })
        
    )

@login_required
def house_delete(request,houseid):
    assert isinstance(request, HttpRequest)
    if request.method == 'POST'and request.is_ajax():
        response = HttpResponse()
        house = House.objects.get(pk=houseid)
        house.delete()
        response.write(1)
        return response

@login_required
def travel_delete(request,travelid):
    assert isinstance(request, HttpRequest)
    if request.method == 'POST'and request.is_ajax():
        response = HttpResponse()
        travel = TravelProduct.objects.get(pk=travelid)
        travel.delete()
        response.write(1)
        return response

@login_required
def itinerary_delete(request,itineraryid):
    assert isinstance(request, HttpRequest)
    if request.method == 'POST'and request.is_ajax():
        response = HttpResponse()
        travel = Itinerary.objects.get(pk=itineraryid)
        travel.delete()
        response.write(1)
        return response

@login_required
def comment_delete(request,commentid):
    assert isinstance(request, HttpRequest)
    if request.method == 'POST' and request.is_ajax():
        response = HttpResponse()
        comment = Comments.objects.get(pk=commentid)
        comment.delete()
        response.write(1)
        return response

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
    comments = Comments.objects.filter(relatedId=houseid,relatedType=2)
    profile = UserProfile.objects.get(user=house.publisher)
    return render(
        request,
        'app/house_details.html',
        context_instance = RequestContext(request,
        {
            'title':'房屋详情',
            'year':datetime.now().year,
            'house':house,
            'profile':profile,
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
    profile = UserProfile.objects.get(user=itinerary.publisher)
    return render(
        request,
        'app/itinerary_details.html',
        context_instance = RequestContext(request,
        {
            'title':'游记',
            'year':datetime.now().year,
            'itinerary':itinerary,
            'profile':profile,
            'comments':comments,
        })
    )

def travelproduct_details(request,travelid):
    assert isinstance(request, HttpRequest)
    try:
         travelid = int(travelid)
    except ValueError:
         raise Http404()
    
    travelproduct = TravelProduct.objects.get(pk=travelid)
    comments = Comments.objects.filter(relatedId=travelid,relatedType=0)
    profile = UserProfile.objects.get(user=travelproduct.publisher)
    return render(
        request,
        'app/travelproduct_details.html',
        context_instance = RequestContext(request,
        {
            'title':'游记',
            'year':datetime.now().year,
            'travelproduct':travelproduct,
            'profile':profile,
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

@login_required
def profile(request,userid):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    profile = UserProfile.objects.get(user=userid)
    if request.method == 'POST':
        response = HttpResponse()
        profile.avatar = request.FILES.get('file_photo', None)
        profile.save()
        response.write(profile.pk)
        return HttpResponseRedirect('/profile/%s/' %userid)
    return render(
        request,
        'app/profile.html',
        context_instance = RequestContext(request,
        {
            'title':'账号设置',
            'year':datetime.now().year,
            'profile':profile,
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


def plan(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/plan.html',
        context_instance = RequestContext(request,
        {
            'title':'plan',
            'message':'Your application description page.',
            'year':datetime.now().year,
        })
    )

def plan1(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/plan1.html',
        context_instance = RequestContext(request,
        {
            'title':'plan',
            'message':'Your application description page.',
            'year':datetime.now().year,
        })
    )

def plan2(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/plan2.html',
        context_instance = RequestContext(request,
        {
            'title':'plan',
            'message':'Your application description page.',
            'year':datetime.now().year,
        })
    )