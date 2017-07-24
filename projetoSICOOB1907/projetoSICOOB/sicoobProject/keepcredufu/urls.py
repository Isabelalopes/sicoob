from django.conf.urls import url

from . views import *

urlpatterns = [
    url(r'^', login, name='login'),
    url(r'^ikeepcred\/apuracao_mensal_issqn', apuracao_mensal_issqn, name='apuracao_mensal_issqn'),
    url(r'^ikeepcred\/informacoes_comuns', informacoes_comuns, name='informacoes_comuns'),
    url(r'^ikeepcred\/planocontacosif_list', planocontacosif_list, name='planocontacosif_list'),
    url(r'^ikeepcred', ikeepcred, name='ikeepcred'),
    url(r'^teste/', teste, name='teste'),
]

