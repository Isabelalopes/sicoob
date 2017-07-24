var ikeepcredService = angular.module('ikeepcredService', [ 'ngResource' ]);

var baseUrl = 'http://127.0.0.1:8000'

//Services for DB2 Tables

//Services for Users

ikeepcredService.factory('Usuarios', function($resource) {
	return $resource(baseUrl + '/usuarios/:id', {id : '@id'}, {
		query : {method : 'GET',isArray : true},
		get : {method : 'GET'},
		remove : {method : 'DELETE',params : {id : '@id'}},
		edit : {method : 'PUT',params : {id : '@id'}},
		add : {method : 'POST'}
	});
});

ikeepcredService.factory('DetalheUsuarios', function($resource) {
	return $resource(baseUrl + '/detalheusuarios/:id', {id : '@id'}, {
		query : {method : 'GET',isArray : true},
		get : {method : 'GET'},
		remove : {method : 'DELETE',params : {id : '@id'}},
		edit : {method : 'PUT',params : {id : '@id'}},
		add : {method : 'POST'}
	});
});

ikeepcredService.factory('Grupos', function($resource) {
	return $resource(baseUrl + '/grupos/:id', {id : '@id'}, {
		query : {method : 'GET',isArray : true},
		get : {method : 'GET'},
		remove : {method : 'DELETE',params : {id : '@id'}},
		edit : {method : 'PUT',params : {id : '@id'}},
		add : {method : 'POST'}
	});
});

ikeepcredService.factory('Empresa', function($resource) {
	return $resource(baseUrl + '/empresa/:id', {id : '@id'}, {
		query : {method : 'GET',isArray : true},
		get : {method : 'GET'},
		remove : {method : 'DELETE',params : {id : '@id'}},
		edit : {method : 'PUT',params : {id : '@id'}},
		add : {method : 'POST'}
	});
});
//---------------------------------------------------------------------------

//Services for Contas

ikeepcredService.factory('Contas', function($resource){
    return $resource(baseUrl + '/contas/:id', { id: '@id' }, {
  query:  {method: 'GET', isArray: true},
  get:    {method: 'GET'},
  remove: {method: 'DELETE', params: {id: '@id'}},
  edit:   {method: 'PUT', params: {id: '@id'}},
  add:    {method: 'POST'}
    });
});