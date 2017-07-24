from django.forms import ModelForm
from .models import*
from django.shortcuts import render, redirect

# Create your views here.
class LoginForm(ModelForm):
    class Meta:
        model = Login
        fields = ['nomeusuario', 'senha']

def login(request, template_name='login.html'):
    form = LoginForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('ikeepcred')
    return render(request, template_name)

def ikeepcred(request, template_name='ikeepcred.html'):
    return render(request, template_name)

def informacoes_comuns(request, template_name='informacoes_comuns.html'):
    return render(request, template_name)

def planocontacosif_list(request, template_name='planocontacosif_list.html'):
    return render(request, template_name)

def apuracao_mensal_issqn(request, template_name='apuracao_mensal_issqn.html'):
    return render(request, template_name)

def teste(request, template_name='teste.html'):
    return render(request, template_name)
