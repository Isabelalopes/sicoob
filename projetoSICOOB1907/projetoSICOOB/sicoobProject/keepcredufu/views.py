from .models import*
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.forms import ModelForm
from django import  forms
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404



# Create your views here.
class UserModelForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password', 'is_staff', 'is_active']
        widgets = {
            'username':forms.TextInput(attrs={'class':'form-controls','maxlength':45}),
            'password':forms.PasswordInput(attrs={'class':'form-controls','maxlength':60})
        }

def login(request, template_name='login.html'):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
             login(request, user)
             return HttpResponseRedirect('/ikeepcred/')

        else:
             return HttpResponseRedirect(settings.LOGIN_URL)

    return render(request, template_name)

def logout(request):
    logout(request)
    return HttpResponseRedirect(settings.LOGIN_URL)

def registrar_usuario(request, template_name='usuarios_add.html'):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        tipo = request.POST['tipo_usuario']
        if tipo == "administrador":
            user = User.objects.create_user(username, password)
            user.is_staff = True
            user.save()
        else:
            user = User.objects.create_user(username, password)

        return redirect('/ikeepcred/')

    return render(request, template_name, {})

def listar_usuario(request, template_name="listar.html"):
    usuarios = User.objects.all()
    usuario = {'lista': usuarios}
    return render(request, template_name, usuario)

def editar_usuario(request, pk, template_name='usuarios_edit.html'):
     usuario = get_object_or_404(User, pk=pk)
     if request.method == "POST":
         form = UserModelForm(request.POST, instance=usuario)
         if form.is_valid():
             usuario = form.save()
             return redirect('editar_usuario')
     else:
         form = UserModelForm(instance=usuario)
     return render(request, template_name, {'form': form})

def ikeepcred(request, template_name='ikeepcred.html'):
    return render(request, template_name)

def informacoes_comuns(request, template_name='informacoes_comuns.html'):
    return render(request, template_name)

def planocontacosif_list(request, template_name='planocontacosif_list.html'):
    return render(request, template_name)

def apuracao_mensal_issqn(request, template_name='apuracao_mensal_issqn.html'):
    return render(request, template_name)

def base(request, template_name='base.html'):
    return render(request, template_name)
