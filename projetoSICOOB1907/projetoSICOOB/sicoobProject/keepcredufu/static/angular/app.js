var ikeepcred = angular.module('ikeepcred', [ 'ngRoute', 'ikeepcredService' ]);

// configure our routes
ikeepcred.config(function($routeProvider) {
	$routeProvider

	// Mapping for Home

	.when('/', {
		templateUrl : 'pages/home.html',
		controller : 'mainController'
	})
	// -------------------------------------------------------------

	// Mapping for Users

	.when('/usuarios_list', {
		templateUrl : 'pages/usuarios_list.html',
		controller : 'usuariosController'
	})

	.when('/usuarios_add', {
		templateUrl : 'pages/usuarios_add.html',
		controller : 'usuariosController'
	})

	.when('/usuarios_edit/:id', {
		templateUrl : 'pages/usuarios_edit.html',
		controller : 'usuariosController'
	})
	// -------------------------------------------------------------

	// Mapping for PlanoContas

	.when('/apuracao_mensal_issqn', {
		templateUrl : 'pages/apuracao_mensal_issqn.html',
		controller : 'uploadPlanoContasController'
	})

	// -------------------------------------------------------------

	// Mapping for InformaçõesComuns

	.when('/#informacoes_comuns', {
		templateUrl : 'pages/informacoes_comuns.html',
		controller : 'informacoesComunsController'
	})

	// Mapping for Conta Cosif

	.when('/planocontacosif_list', {
		templateUrl : 'pages/planocontacosif_list.html',
		controller : 'planoContaCosifController'
	})

	.when('/planocontacosif_add', {
		templateUrl : 'pages/planocontacosif_add.html',
		controller : 'planoContaCosifController'
	})

	.when('/planocontacosif_edit/:id', {
		templateUrl : 'pages/planocontacosif_edit.html',
		controller : 'planoContaCosifController'
	})
});