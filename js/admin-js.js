$(document).ready(function() {
	var loading = $('#loading'),
		panelBox = $('#panel-box');

	function UpdatePanel(type) {
		panelBox.fadeOut('fast', function() {
			loading.fadeIn('fast', function() {
				var xhr = new XMLHttpRequest();

				xhr.open('POST', '/adminpages/' + type, true);
		        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		        xhr.timeout = 5000;
		        xhr.ontimeout = function (e) {
		            //AddNotify('{"header":"Ошибка","msg":"Не удалось запросить <b>' + artist + ' - ' + song + '</b>","type":"danger"}');
		        };
		        xhr.send('');
				xhr.onreadystatechange = function () {
	                if (xhr.readyState == 4) {
	                    if (xhr.status == 200) {
	                    	// AddNotify(xhr.responseText);
	                    	panelBox.empty();
	                    	panelBox.append(xhr.responseText);
	                    	loading.fadeOut('fast', function() {
	                    		panelBox.fadeIn('fast');
	                    	});
	                    };
	                };
	            };
			});
		});
	}
	
	$('li').click(function() {
		var type = $(this).data('type');

		$('.is-active').removeAttr('class');
		$(this).attr('class', 'is-active');

		UpdatePanel(type);
	});
});