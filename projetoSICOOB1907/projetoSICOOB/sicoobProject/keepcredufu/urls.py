from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static

from . views import *

urlpatterns = [
    #url(r'^', login, name='login'),
    url(r'^login/', login, name='login'),
    url(r'^ikeepcred\/usuarios_add/', registrar_usuario, name='registrar_usuario'),
    url(r'^ikeepcred\/usuarios_list/', listar_usuario, name='listar_usuario'),
    url(r'^ikeepcred\/apuracao_mensal_issqn', apuracao_mensal_issqn, name='apuracao_mensal_issqn'),
    url(r'^ikeepcred\/informacoes_comuns', informacoes_comuns, name='informacoes_comuns'),
    url(r'^ikeepcred\/planocontacosif_list', planocontacosif_list, name='planocontacosif_list'),
    url(r'^ikeepcred', ikeepcred, name='ikeepcred'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

