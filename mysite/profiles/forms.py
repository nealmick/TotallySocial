from django import forms
from django.contrib.auth import get_user_model

from .models import Profile 



from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

from crispy_forms.helper import FormHelper


class UserUpdateForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(UserUpdateForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False 
        #for fieldname in ['username']:
        #    self.fields[fieldname].help_text = None
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['email','first_name','last_name']



class ProfileUpdateForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(ProfileUpdateForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False 
        for fieldname in []:
            self.fields[fieldname].help_text = None
    class Meta:
        model = Profile
        fields = ['status','image',]
##



class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
    def __init__(self, *args, **kwargs):
        super(UserRegisterForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False 
        for fieldname in ['username', 'password1', 'password2']:
            self.fields[fieldname].help_text = None
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']



class UserProfileForm(forms.ModelForm):
    location = forms.CharField(required=False)
    bio = forms.CharField(required=False)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


class ProfileForm(forms.ModelForm):
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
    email = forms.CharField(required=False)
    class Meta:
        model = Profile
        fields = ['location', 'bio']


class ProfileBasicForm(forms.Form):
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
    email_address = forms.CharField(required=False)
    location = forms.CharField(required=False)
    bio = forms.CharField(required=False)