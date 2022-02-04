$(document).ready(function() {
	var loginButton = $('#loginButton'),
		form = $('#form'),
    	loading = $('#loading');

    function Login() {
    	loginButton.fadeOut('fast');
    	form.fadeOut('fast', function() {
    		loading.fadeIn('fast', function() {
    			var login = $('#login').val(),
    				password = $('#pass').val(),
    				xhr = new XMLHttpRequest();

	    		xhr.open('POST', '/login', true);
	            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	            xhr.timeout = 5000;
	            xhr.ontimeout = function (e) {
	                AddNotify('{"header":"Ошибка","msg":"Не удалось запросить <b>' + artist + ' - ' + song + '</b>","type":"danger"}');
	            };
	            xhr.send('login=' + login + '&pass='  + password);
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState == 4) {
	                    if (xhr.status == 200) {
	                    	var otvet = JSON.parse(xhr.responseText);
	                    	if(otvet['server_msg'] == 'error') {
	                    		AddNotify(JSON.stringify(otvet['notify']));
	                    		loading.fadeOut('fast', function() {
	                    			form.fadeIn('fast');
	                    			loginButton.fadeIn('fast');
	                    		})
	                    	} else if(otvet['server_msg'] == 'success') {
	                    		location.replace('/');
	                    	}
	                    }
	                }
	            }
    		});
    	});
    }

    $('#form').keypress(function(event){
	    var keycode = (event.keyCode ? event.keyCode : event.which);
	    if(keycode == '13'){
	        Login();
	    }
	});

    loginButton.on('click', function() {
    	Login();
    });
});