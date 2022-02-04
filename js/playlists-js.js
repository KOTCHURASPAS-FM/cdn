$(document).ready(function() {
	var channelSelector = $('#channel-selector'),
		tableBody = $('#tableBody'),
		playlistInfo = $('#playlistInfo'),
		playlistHeader = $('#playlistHeader'),
		loading = $('#loading');

	channelSelector.on('change', function() {
		playlistInfo.fadeOut('fast', function() {
			loading.fadeIn('fast', function() {
				var selectedChannel = $('#channel-selector :selected'),
	                xhr = new XMLHttpRequest();

	            xhr.open('POST', '/playlists', true);
	            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	            xhr.timeout = 5000;
	            xhr.ontimeout = function (e) {
	               AddNotify('{"header":"Ошибка","msg":"Не удалось запросить плейлист для <b>' + selectedChannel + '</b>","type":"danger"}');
	            };
	            xhr.send('channel=' + selectedChannel.data('ip') + ':' + selectedChannel.data('port'));
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState == 4) {
	                    if (xhr.status == 200) {
	                    	var playlistData = JSON.parse(xhr.responseText);

	                    	playlistHeader.empty();
	                    	playlistHeader.append('<h4 class="title is-4">Основная информация</h4>');
	                    	playlistHeader.append('<h6 class="title is-6">Количество треков: ' + playlistData['TracksCount'] + '</h6>');

	                    	tableBody.empty();
	                    	for(let value of playlistData['Tracks']) {
	                    		tableBody.append('<tr><td class="is-dark">' + value['Index'] + '</td><td class="is-dark">' + value['CastTitle'] + '</td><td class="is-dark">' + value['Duration'] + '</td><td class="is-dark">' + value['NextPlay'] + '</td></tr>');
	                    	}
	                    	loading.fadeOut('fast', function() {
	                    		playlistInfo.fadeIn('fast', function() {});
	                    	});
	                    }
	                }
	            }
			});
		});
	});
});