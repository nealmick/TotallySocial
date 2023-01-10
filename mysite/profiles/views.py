from django.http import Http404,JsonResponse
from django.shortcuts import render,redirect
from .models import Profile
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from .forms import ProfileForm, UserRegisterForm
#from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm
from django.contrib import messages
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm
from django.db import IntegrityError

def profile_update_view(request,*args,**kwargs):
    if not request.user.is_authenticated:
        return redirect("/login?next=/profile/update")
    user = request.user
    my_profile = user.profile
    user_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email
    }
    form = ProfileForm(request.POST or None, instance=my_profile, initial=user_data)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email_address = form.cleaned_data.get('email_address')
        user.first_name = first_name
        user.last_name = last_name
        user.email_address = email_address
        user.save()
        profile_obj.save()
    context = {
        "form":form,
        "btn_label":"Save",
        "title":"Update Profile"
    }
    return render(request,"profiles/form.html",context)



def profile_detail_view(request, username,*args,**kwargs):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    is_following = False
    if request.user.is_authenticated:
        user = request.user
        is_following = user in profile_obj.followers.all()

    context = {
        "username":username,
        "profile":profile_obj,
        "is_following":is_following
    }
    return render(request,"profiles/detail.html",context)



def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            try:
                form.save(commit=True)
            except IntegrityError as e:
                x =1
            messages.success(request, f'Your Account has been created! You can now login!')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request,'profiles/register.html',{'form':form})



@login_required
def profile(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()

            messages.success(request, f'Your Account has been updated!')
            return redirect('profile')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)
    context = {
        'u_form': u_form,
        'p_form': p_form,
    }

    try:
        qs = Profile.objects.filter(user=request.user)
        profile_obj = qs.first()

    except ObjectDoesNotExist:
        return JsonResponse({'asdf': False})

    context['profile'] = profile_obj
    context['user'] = request.user


    return render(request, 'profiles/profile.html', context)
