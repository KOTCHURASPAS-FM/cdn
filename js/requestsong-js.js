$(document).ready(function() {
    var requestButton = $('#requestButton'),
    	form = $('#form'),
    	loading = $('#loading');

    requestButton.on('click', function() {
    	requestButton.fadeOut('fast', function() {});
    	form.fadeOut('fast', function() {
    		loading.fadeIn('fast', function() {});

    		var name = $('#name').val(),
		    	email = $('#email').val(),
		    	song = $('#song').val(),
		    	channelname = $('#channelname :selected').text(),
		    	artist = $('#artist').val(),
		    	xhr = new XMLHttpRequest();

		    xhr.open('POST', '/requestsong', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.timeout = 5000;
            xhr.ontimeout = function (e) {
                AddNotify('{"header":"Ошибка","msg":"Не удалось запросить <b>' + artist + ' - ' + song + '</b>","type":"danger"}');
            };
            xhr.send('name=' + name + '&email='  + email + '&song=' + song + '&channelname=' + channelname + '&artist=' + artist);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                    	AddNotify(xhr.responseText);
                    	if(JSON.parse(xhr.responseText)['type'] == 'danger') {
                    		loading.fadeOut('fast', function() {
				            	form.fadeIn('fast', function() {});
				            	requestButton.fadeIn('fast', function() {});
				            });
                    	} else {
                    		form.empty();
                    		form.append('<h1 class="title is-1">Спасибо за заявку!</h1>');

                    		requestButton.fadeOut('fast', function() {});

                    		loading.fadeOut('fast', function() {
				            	form.fadeIn('fast', function() {});
				            });
                    	}
                    };
                };
            };
    	});
    });
});