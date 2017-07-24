from django.db import models

# Create your models here.
class Login(models.Model):
    nomeusuario = models.CharField(max_length=45)
    senha = models.CharField(max_length=60)

class ClienteFisica(models.Model):
    idcliente = models.BigIntegerField()
    codtiposexo = models.IntegerField()
    datanascimento = models.DateField()

class ClienteInstunidade(models.Model):
    idcliente = models.BigIntegerField()
    descnomecliente = models.CharField(max_length=50)
    numcpfcnpj = models.CharField(max_length=14)

class ContratoCredito(models.Model):
    idcliente = models.BigIntegerField()
    codtiposituacaotitulo = models.SmallIntegerField()
    numcontratocredito = models.BigIntegerField()
    idmodalidadeproduto = models.SmallIntegerField()
    valorsaldodevedorcontabil = models.BigIntegerField()
    datamoventrada = models.DateField()
    datavencopcred = models.DateField()

class EnderecoCliente(models.Model):
    idcliente = models.BigIntegerField()
    descendereco = models.CharField(max_length=50)
    descnumero = models.CharField(max_length=5)
    desccomplemento = models.CharField(max_length=10)
    nomebairro = models.CharField(max_length=30)
    nomecidade = models.CharField(max_length=20)
    numcep = models.CharField(max_length=8)
    numddd = models.CharField(max_length=2)
    numtelefone= models.CharField(max_length=9)

class LimiteCredito(models.Model):
    numcontacorrente = models.BigIntegerField()
    valorlimite = models.BigIntegerField()

class  ParticipanteContaCor(models.Model):
    idcliente = models.BigIntegerField()
    numcontacorrente = models.BigIntegerField()
