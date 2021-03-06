# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-27 16:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ClienteFisica',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idcliente', models.BigIntegerField()),
                ('codtiposexo', models.IntegerField()),
                ('datanascimento', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='ClienteInstunidade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idcliente', models.BigIntegerField()),
                ('descnomecliente', models.CharField(max_length=50)),
                ('numcpfcnpj', models.CharField(max_length=14)),
            ],
        ),
        migrations.CreateModel(
            name='ContratoCredito',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idcliente', models.BigIntegerField()),
                ('codtiposituacaotitulo', models.SmallIntegerField()),
                ('numcontratocredito', models.BigIntegerField()),
                ('idmodalidadeproduto', models.SmallIntegerField()),
                ('valorsaldodevedorcontabil', models.BigIntegerField()),
                ('datamoventrada', models.DateField()),
                ('datavencopcred', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='EnderecoCliente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idcliente', models.BigIntegerField()),
                ('descendereco', models.CharField(max_length=50)),
                ('descnumero', models.CharField(max_length=5)),
                ('desccomplemento', models.CharField(max_length=10)),
                ('nomebairro', models.CharField(max_length=30)),
                ('nomecidade', models.CharField(max_length=20)),
                ('numcep', models.CharField(max_length=8)),
                ('numddd', models.CharField(max_length=2)),
                ('numtelefone', models.CharField(max_length=9)),
            ],
        ),
        migrations.CreateModel(
            name='LimiteCredito',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numcontacorrente', models.BigIntegerField()),
                ('valorlimite', models.BigIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ParticipanteContaCor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idcliente', models.BigIntegerField()),
                ('numcontacorrente', models.BigIntegerField()),
            ],
        ),
    ]
