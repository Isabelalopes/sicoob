ikeepcred
.controller('mainController',
			function() {
});

ikeepcred
.controller(
		'usuariosController',
		[
				'$scope',
				'$http',
				'$location',
				'$routeParams',
				'Usuarios',
				'DetalheUsuarios',
				'Grupos',
				function($scope, $http, $location, $routeParams, Usuarios, DetalheUsuarios, Grupos) {
					$scope.curPage = 0;
					$scope.pageSize = 6;

					$scope.usersList = Usuarios.query();
					$scope.userDetailsList = DetalheUsuarios.query();
					$scope.groupsList = Grupos.query();

					$scope.currentuser = Usuarios.get({id : 1});

					// Boolean for Users enabled
					$scope.boolToStr = function(arg) {return arg ? 'Sim' : 'Não'};

					$scope.refresh = function() {
						$scope.usersList = Usuarios.query();
						$scope.userDetailsList = DetalheUsuarios.query();
						$scope.groupsList = Grupos.query();
					};

					$scope.reset = function() {
						$scope.newUser = {};
					};

					$scope.init = function() {
						$scope.updateUser = Usuarios.get({
							id : $routeParams.id
						});
					};

					$scope.register = function() {
						if(ValidateUserForm(usuarios_add)){
						$scope.newUser.ativo = 1;
						$scope.newUser.idempresa = $scope.currentuser.idempresa;
						Usuarios.save($scope.newUser, function(data){
							if(data.success == true){
							sweetAlert("OK!",
									"Usuário cadastrado com sucesso!", "success");
							}
							else{
							sweetAlert("Erro!",
									"Ocorreu um erro no cadastro do usuário! " + data.message + " Se o erro persistir contate o administrador do sistema.", "error");
						}

						$location.path('/usuarios_list/');

						$scope.refresh();
						$scope.reset();
						});
					}
				};

					$scope.editUser = function(userId) {
						if(userId != 1){
						$location.path('/usuarios_edit/' + userId);
						}else{
							sweetAlert("Erro!",
									"O Administrador não pode ser editado!", "error");
						}
					};

					$scope.update = function() {
						Usuarios.edit($scope.updateUser, function(data){
							if(data.success == true){
							sweetAlert("OK!",
									"Usuário atualizado com sucesso!", "success");
						}else{
							sweetAlert("Erro!",
									"Ocorreu um erro na atualização do usuário! " + data.message + " Se o erro persistir contate o administrador do sistema.", "error");
						}

						$location.path('/usuarios_list/');

						$scope.refresh();
						});
					};


					$scope.deleteUser = function(userId) {
						sweetAlert({
							title: "Apagar usuário: " + $scope.updateUser.nomeusuario + "?",
							text: "Usuário NÃO poderá ser recuperado após remoção!",
							type: "warning",
							showCancelButton: true,
							confirmButtonColor: "#DD6B55",
							confirmButtonText: "Sim",
							cancelButtonText: "Não",
							closeOnConfirm: false,
							closeOnCancel: false
							},
							function(isConfirm){
							if (isConfirm) {
								Usuarios.remove(({id : userId}), function(data){
									if(data.success == true){
									sweetAlert("Removido!", "Usuário removido com sucesso!", "success");
								}else{
									sweetAlert("Erro!",
											"Ocorreu um erro ao remover o usuário! " + data.message + " Se o erro persistir contate o administrador do sistema.", "error");
								}
								$location.path('/usuarios_list/');
								$scope.refresh();
								});
							}
							else {
							sweetAlert(
							"Cancelado",
							"Remoção de usuário cancelada!", "error");
							$location.path('/usuarios_list/');
							$scope.refresh();
							}
						});

					};

					$scope.refresh();

					$scope.orderBy = 'username';

					$scope.numberOfPages = function() {
						return Math.ceil($scope.usersList.length
								/ $scope.pageSize);
					}
				} ]);

ikeepcred.controller('uploadPlanoContasController', [ '$http', '$scope', '$routeParams', 'Usuarios',
	function($http, $scope, $routeParams, Usuarios) {
		$scope.loading = false;
		$scope.fileTypes = [ {
			id : 'N',
			name : 'Normal'
		}, {
			id : 'R',
			name : 'Retificada'
		}];

		$scope.currentuser = Usuarios.get({id : 1});

		$scope.uploadFile = function() {
			$scope.loading = true;
			if($scope.currentuser.idempresa == 1 || $scope.currentuser.idempresa == 2){
			var uploadUrl = "/planocontas";
			var currentidempresa = $scope.currentuser.idempresa;
			var planocontas1 = $scope.planocontas1;
			var planocontas2 = $scope.planocontas1;
			var planocontas3 = $scope.planocontas1;
			var planocontas4 = $scope.planocontas1;
			var planocontas5 = $scope.planocontas1;
			var fileType = $scope.fileType;
			var protocol = $scope.protocol;

			}else if($scope.currentuser.idempresa == 3){
				var uploadUrl = "/planocontas";
				var currentidempresa = $scope.currentuser.idempresa;
				var planocontas1 = $scope.planocontas1;
				var planocontas2 = $scope.planocontas2;
				var planocontas3 = $scope.planocontas3;
				var planocontas4 = $scope.planocontas4;
				var planocontas5 = $scope.planocontas5;
				var fileType = $scope.fileType;
				var protocol = $scope.protocol;
			}

			var data = new FormData();
			data.append('currentidempresa', currentidempresa);
			data.append('planocontas1', planocontas1);
			data.append('planocontas2', planocontas2);
			data.append('planocontas3', planocontas3);
			data.append('planocontas4', planocontas4);
			data.append('planocontas5', planocontas5);
			data.append('fileType', fileType);
			data.append('protocol', protocol);

			$http.post(uploadUrl, data, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			}).success(function(data) {
				if(data.success == true){
					sweetAlert("OK!",
							"Arquivo cadastrado com sucesso!", "success");
				}else{
					sweetAlert("Erro!",
							"Ocorreu um erro na importação do arquivo! " + data.message + " Se o erro persistir contate o administrador do sistema.", "error");
				}
			}).error(function() {
				sweetAlert("Erro!",
						"Ocorreu um erro inesperado! Recarregue a página(F5) e tente novamente. Se o erro persistir contate o administrador do sistema.", "error");
			}).finally(function (data) {
			      $scope.loading = false;
			});
		}
	} ]);

ikeepcred.controller('informacoesComunsController', [ '$http', '$scope', '$routeParams', 'Usuarios',
	function($http, $scope, $routeParams, Usuarios) {
		$scope.loading = false;
		$scope.fileTypes = [ {
			id : 'N',
			name : 'Normal'
		}, {
			id : 'R',
			name : 'Retificada'
		}];

		$scope.currentuser = Usuarios.get({id : 1});

		$scope.geraFile = function() {
			$scope.loading = true;
			var uploadUrl = "/informacoescomuns";
			var currentidempresa = $scope.currentuser.idempresa;
			var fileType = $scope.fileType;
			var protocol = $scope.protocol;

			var data = new FormData();
			data.append('currentidempresa', currentidempresa);
			data.append('fileType', fileType);
			data.append('protocol', protocol);

			$http.post(uploadUrl, data, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			}).success(function(data) {
				if(data.success == true){
					sweetAlert("OK!",
							"Arquivo gerado com sucesso!", "success");
				}else{
					sweetAlert("Erro!",
							"Ocorreu um erro na importação do arquivo! " + data.message + " Se o erro persistir contate o administrador do sistema.", "error");
				}
			}).error(function() {
				sweetAlert("Erro!",
						"Ocorreu um erro inesperado! Recarregue a página(F5) e tente novamente. Se o erro persistir contate o administrador do sistema.", "error");
			}).finally(function (data) {
			      $scope.loading = false;
			});
		}



} ]);

ikeepcred
.controller(
		'planoContaCosifController',
		[
				'$scope',
				'$http',
				'$location',
				'$routeParams',
				'Contas',
				'Usuarios',
				function($scope, $http, $location, $routeParams, Contas, Usuarios) {
					$scope.curPage = 0;
					$scope.pageSize = 6;

					$scope.contasList = Contas.query();

					$scope.currentuser = Usuarios.get({id : 1});

					$scope.refresh = function() {
						$scope.contasList = Contas.query();
					};

					$scope.reset = function() {
						$scope.newConta = {};
					};

					$scope.init = function() {
						$scope.updateConta = Contas.get({
							id : $routeParams.id
						});
					};

					$scope.register = function() {
						$scope.newConta.idempresa = $scope.currentuser.idempresa;
						$scope.newConta.idusuario = $scope.currentuser.idusuario;
						Contas.save($scope.newConta, function(data){
							if(data.success == true){
							sweetAlert("OK!",
									"Conta cadastrada com sucesso!", "success");
							}
							else{
							sweetAlert("Erro!",
									"Ocorreu um erro no cadastro da conta! " + data.message + " Se o erro persistir contate o administrador do sistema.", "error");
						}

						$location.path('/planocontacosif_list/');

						$scope.refresh();
						$scope.reset();
						});
				};

				$scope.editConta = function(contaId) {
					$location.path('/planocontacosif_edit/' + contaId);
				};

				$scope.update = function() {
					Contas.edit($scope.updateConta, function(data){
						if(data.success == true){
						sweetAlert("OK!",
								"Conta atualizada com sucesso!", "success");
					}else{
						sweetAlert("Erro!",
								"Ocorreu um erro na atualização da conta! " + data.message + " Se o erro persistir contate o administrador do sistema.", "error");
					}

					$location.path('/planocontacosif_list/');

					$scope.refresh();
					});
				};


				$scope.deleteConta = function(contaId) {
					sweetAlert({
						title: "Apagar conta: " + $scope.updateConta.descricaoconta + "?",
						text: "Conta NÃO poderá ser recuperado após remoção!",
						type: "warning",
						showCancelButton: true,
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "Sim",
						cancelButtonText: "Não",
						closeOnConfirm: false,
						closeOnCancel: false
						},
						function(isConfirm){
						if (isConfirm) {
							Contas.remove(({id : contaId}), function(data){
								if(data.success == true){
								sweetAlert("Removido!", "Conta removida com sucesso!", "success");
							}else{
								sweetAlert("Erro!",
										"Ocorreu um erro ao remover a conta! " + data.message + " Se o erro persistir contate o administrador do sistema.", "error");
							}
							$location.path('/planocontacosif_list/');
							$scope.refresh();
							});
						}
						else {
						sweetAlert(
						"Cancelado",
						"Remoção de conta cancelada!", "error");
						$location.path('/planocontacosif_list/');
						$scope.refresh();
						}
					});
				};

					$scope.refresh();

					$scope.numberOfPages = function() {
						return Math.ceil($scope.contasList.length
								/ $scope.pageSize);
					}
} ]);

ikeepcred.filter('pagination', function() {
	return function(input, start) {
		start = +start;
		return input.slice(start);
	};
});

ikeepcred.directive('fileModel', [ '$parse', function($parse) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
} ]);

ikeepcred.directive('lowerCase', function($parse) {
	return {
		require : 'ngModel',
		link : function postLink(scope, element, attrs, modelCtrl) {
			var lowerize = function(inputValue) {
				if (!inputValue) {
					return inputValue;
				}
				var lowerized = inputValue.toLowerCase();
				if (lowerized !== inputValue) {
					modelCtrl.$setViewValue(lowerized);
					modelCtrl.$render();
				}
				return lowerized;
			};

			var model = $parse(attrs.ngModel);
			modelCtrl.$parsers.push(lowerize);
			lowerize(model(scope));
		}
	};
});

ikeepcred.directive('upperCase', function($parse) {
	return {
		require : 'ngModel',
		link : function postLink(scope, element, attrs, modelCtrl) {
			var upperize = function(inputValue) {
				if (!inputValue) {
					return inputValue;
				}
				var upperize = inputValue.toUpperCase();
				if (upperize !== inputValue) {
					modelCtrl.$setViewValue(upperize);
					modelCtrl.$render();
				}
				return upperize;
			};

			var model = $parse(attrs.ngModel);
			modelCtrl.$parsers.push(upperize);
			upperize(model(scope));
		}
	};
});

function BlankField(textbox) {
    if (textbox.value == '') {
    	textbox.setCustomValidity('Campo obrigatório!');
    }
    else {
       textbox.setCustomValidity('');
    }
    return true;
}

function ValidateUserForm(form) {
	if (form.nomeusuario.value.length < 4)
	{
		sweetAlert("Nome Inválido!",
				"Seu nome deve conter no mínimo 4 caracteres", "error");
		form.nomeusuario.focus();
		return false;
	}
	if (form.senha.value.length < 6)
	{
		sweetAlert("Senha Inválida!",
				"Sua senha deve conter no mínimo 6 caracteres", "error");
		form.senha.focus();
		return false;
	}
	return true;
}

function HandleFileInputBrowseClick()
{
    var fileinput = document.getElementById("thefile");
    fileinput.click();
}

function HandleFileInputChange()
{
    var fileinput = document.getElementById("thefile");
    var textinput = document.getElementById("filename");
    textinput.value = fileinput.value.substring(12);
}

ikeepcred.directive('formatAge', function() {
	  return {
	    require: 'ngModel',
	    link: function(scope, element, attrs, ngModelController) {

	      ngModelController.$formatters.push(function(data) {
	        // / / convert data from model format to view format
   	  var d = new Date();
	    	  var n = d.getTime();
	    	  var age1 = Math.floor(Math.abs((data - n) / (1000 * 60 * 60 * 24)) / 365);

	        return age1; // / / converted
     });
	    }
	  }
	});

ikeepcred.run(function($locale){
  $locale.NUMBER_FORMATS.GROUP_SEP = "";
});

ikeepcred.directive('phoneInput', function($filter, $browser) {
  return {
      require: 'ngModel',
      link: function($scope, $element, $attrs, ngModelCtrl) {
          var listener = function() {
              var value = $element.val().replace(/[^0-9]/g, '');
              $element.val($filter('cel')(value, false));
          };

          // / / This runs when we update the text field
        ngModelCtrl.$parsers.push(function(viewValue) {
              return viewValue.replace(/[^0-9]/g, '').slice(0,11);
          });

          // / / This runs when the model gets updated on the scope directly
			// and
	// / / keeps our view in sync
        ngModelCtrl.$render = function() {
              $element.val($filter('cel')(ngModelCtrl.$viewValue, false));
          };

          $element.bind('change', listener);
          $element.bind('keydown', function(event) {
              var key = event.keyCode;
              // / / If the keys include the CTRL, SHIFT, ALT, or META keys,
				// or
		// / / the arrow keys, do nothing.
            // / / This lets us support copy and paste too
            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                  return;
              }
              $browser.defer(listener); // / / Have to do this or changes
										// / / don't get
								// / / picked up properly
        });

          $element.bind('paste cut', function() {
              $browser.defer(listener);
          });
      }
  };
});

ikeepcred.filter('cel', function () {
  return function (tel) {
      if (!tel) { return ''; }

      var value = tel.toString().trim().replace(/^\+/, '');

      if (value.match(/[^0-9]/)) {
          return tel;
      }

      var country, city, number;

      switch (value.length) {
          case 1:
          case 2:
          case 3:
              city = value;
              break;

          default:
              city = value.slice(0, 2);
              number = value.slice(2);
      }

      if(number){
          if(number.length>5){
              number = number.slice(0, 5) + '-' + number.slice(5,9);
          }
          else{
              number = number;
          }

          return ("(" + city + ") " + number).trim();
      }
      else{
          return "(" + city;
      }

  };
});


ikeepcred.directive('cellphoneInput', function($filter, $browser) {
  return {
      require: 'ngModel',
      link: function($scope, $element, $attrs, ngModelCtrl) {
          var listener = function() {
              var value = $element.val().replace(/[^0-9]/g, '');
              $element.val($filter('tel')(value, false));
          };

          // / / This runs when we update the text field
        ngModelCtrl.$parsers.push(function(viewValue) {
              return viewValue.replace(/[^0-9]/g, '').slice(0,10);
          });

          // / / This runs when the model gets updated on the scope directly
			// and
	// / / keeps our view in sync
        ngModelCtrl.$render = function() {
              $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
          };

          $element.bind('change', listener);
          $element.bind('keydown', function(event) {
              var key = event.keyCode;
              // / / If the keys include the CTRL, SHIFT, ALT, or META keys,
				// or
		// / / the arrow keys, do nothing.
            // / / This lets us support copy and paste too
            if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                  return;
              }
              $browser.defer(listener); // / / Have to do this or changes
										// / / don't get
								// / / picked up properly
        });

          $element.bind('paste cut', function() {
              $browser.defer(listener);
          });
      }

  };
});

ikeepcred.filter('tel', function () {
  return function (tel) {
      if (!tel) { return ''; }

      var value = tel.toString().trim().replace(/^\+/, '');

      if (value.match(/[^0-9]/)) {
          return tel;
      }

      var country, city, number;

      switch (value.length) {
          case 1:
          case 2:
          case 3:
              city = value;
              break;

          default:
              city = value.slice(0, 2);
              number = value.slice(2);
      }

      if(number){
          if(number.length>4){
              number = number.slice(0, 4) + '-' + number.slice(4,8);
          }
          else{
              number = number;
          }

          return ("(" + city + ") " + number).trim();
      }
      else{
          return "(" + city;
      }

  };
});

ikeepcred.service('browser', ['$window', function($window) {

    return function() {

        var userAgent = $window.navigator.userAgent;

       var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};

       for(var key in browsers) {
           if (browsers[key].test(userAgent)) {
               return key;
           }
      };

      return 'unknown';
   }

}]);