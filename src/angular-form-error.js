/* global angular */

angular.module('form.error', [])
	.directive('formError', function () {
		return {
			restrict: 'A',
			require: '^form',
			scope: {
				formError: '=formError',
				formErrorLogic: '=formErrorLogic'
			},
			link: function (scope, element, attrs, form) {
				scope.form = form;

				var formErrorLogic = scope.formErrorLogic ? scope.formErrorLogic : {
					'has-error': function (field, form) {
						return field.invalid && (field.dirty || form.submitted);
					}
				};
				var cssClasses = Object.keys(formErrorLogic);
				var unregister = null;

				scope.$watch('formError', function (name) {
					if (unregister) {
						unregister();
					}

					unregister = scope.$watchGroup([
						'form["' + name + '"].$valid',
						'form["' + name + '"].$invalid',
						'form["' + name + '"].$pristine',
						'form["' + name + '"].$dirty',
						'form["' + name + '"].$touched',
						'form["' + name + '"].$untouched',
						'form["' + name + '"].$pending',
						'form.$submitted',
						'form.$valid',
						'form.$invalid',
						'form.$pristine',
						'form.$dirty',
						'form.$pending'
					], function (watch) {
						var field = {
							valid: watch[0],
							invalid: watch[1],
							pristine: watch[2],
							dirty: watch[3],
							touched: watch[4],
							untouched: watch[5],
							pending: watch[6]
						};
						var form = {
							submitted: watch[7],
							valid: watch[8],
							invalid: watch[9],
							pristine: watch[10],
							dirty: watch[11],
							pending: watch[12]
						};

						for (var i = 0; i < cssClasses.length; i++) {
							element.toggleClass(cssClasses[i], formErrorLogic[cssClasses[i]](field, form));
						}
					});
				});
			}
		};
	});