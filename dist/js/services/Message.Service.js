angular.module('TudaoApp')
	.service('Message', [
		function() {

			var _show = function(message, title, type) {
				if (!message) {
					throw 'Message is required!';
				}

				if (!title) {
					title = 'Message';
				}

				if (!type) {
					type = 'info';
				}

				var messages = [];
				if (typeof message === 'object') {
					for (var key in message) {
						var objMessage = message[key];
						for (var i = 0; i < objMessage.length; ++i) {
							messages.push(objMessage[i]);
						}
					}
				} else {
					messages.push(message);
				}

				for (var j = 0; j < messages.length; ++j) {
					toastr[type](messages[j], title);
				}
			};

			var _confirm = function(message, title, successCallback, errorCallback) {
				if (!message) {
					throw 'Mensagem é obrigatório!';
				}

				if (!title) {
					title = 'Mensagem';
				}

				$.confirm({
					title: title,
					content: message,
					buttons: {
				        ok: {
				            text: "Ok",
				            btnClass: 'btn-primary',
				            action: successCallback
				        },
				        cancel: errorCallback
					}
				});
			};

			return {
				Show 		: _show,
				Confirm 	: _confirm
			};
}]);