$(document).ready(function() {
    var cahnnelBox = $('#channel'),
        nextTrackBox = $('#nexttrack'),
        prevTrackBox = $('#prevtrack'),
        controlBox = $('#control'),
        pleer = $('#pleer'),
        curtime = $('#curtime'),
        audio = $('#audio'),
        volume = $('#volume'),
        // playlistBox = $('#playlist-info'),
        channelContainer = $('#channel-info'),
        loading = $('#loading'),
        EverySecond = setInterval(function() {}, 1000);

    if (typeof $.cookie('volume') === 'undefined'){
        audio.prop('volume', 0.5);
    } else {
        audio.prop('volume', $.cookie('volume'));
        volume.val($.cookie('volume'));
    }

    function GetSongCurTime(ts) {
        var curtimeDate = new Date(ts),
            min = String(curtimeDate.getMinutes()),
            sec = String(curtimeDate.getSeconds());

        min.length == 1 ? min = '0' + min : min = min;
        sec.length == 1 ? sec = '0' + sec : sec = sec;

        return min + ':' + sec;
    }

    function ConnectError(name) {
        AddNotify('{"header":"Ошибка","msg":"Не удалось подключиться к каналу <b>' + name + '</b>!","type":"danger"}');
        loading.fadeOut('fase', function () {});
        audio.attr('src', '');
    }

    volume.on('input', function () {
        audio.prop('volume', volume.val());
        $.cookie('volume', volume.val());
    });

    function UpdateChannel() {
        document.title = '#KOTCHURASPAS.FM - Радио';
        channelContainer.fadeOut('fast', function() {
            loading.fadeIn('fast', function() {});

            var selectedChannel = $('#channel-selector :selected'),
                xhr = new XMLHttpRequest();

            xhr.open('POST', '/getplay', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.timeout = 5000;
            xhr.ontimeout = function (e) {
                ConnectError(selectedChannel.data('name'));
            };
            xhr.send('channel=' + selectedChannel.data('ip') + ':' + selectedChannel.data('port'));
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var channelData = JSON.parse(xhr.responseText),
                            curpos = channelData['CurrentTrack']['CurrentPos'];

                        document.title = '#KOTCHURASPAS.FM - ' + selectedChannel.data('name');

                        pleer.attr('max', channelData['CurrentTrack']['DurationTimestamp']);
                        pleer.val(curpos);
                        curtime.text(GetSongCurTime(curpos));
                        if(audio.attr('src') != 'http://' + selectedChannel.data('ip') + ':' + selectedChannel.data('port')) {
                            audio.attr('src', 'http://' + selectedChannel.data('ip') + ':' + selectedChannel.data('port'));
                            // audio.paly();
                        };

                        // volume.on('input', function () {
                        //     if($(this).val() == 0) {
                        //         audio.attr('src', '');
                        //     }
                        // });

                        cahnnelBox.empty();
                        cahnnelBox.append('<h4 class="title is-4"><i class="fas fa-play"></i> Сейчас играет:</h4>');
                        if(channelData['CurrentTrack']['Artist'] != '') {
                            cahnnelBox.append('<h6 class="title is-6"><i class="fas fa-user"></i> Исполнитель: ' + channelData['CurrentTrack']['Artist'] + '</h6>'); // 
                        };
                        if(channelData['CurrentTrack']['Title'] != '') {
                            cahnnelBox.append('<h6 class="title is-6"><i class="fas fa-music"></i> Название: ' + channelData['CurrentTrack']['Title'] + '</h6>');
                        };
                        if(channelData['CurrentTrack']['Artist'] == '' && channelData['CurrentTrack']['Title'] == '' && channelData['CurrentTrack']['CastTitle'] != '') {
                            cahnnelBox.append('<h6 class="title is-6"><i class="fas fa-music"></i> Название: ' + channelData['CurrentTrack']['CastTitle'] + '</h6>');
                        }
                        cahnnelBox.append('<h6 class="title is-6"><i class="fas fa-clock"></i> Длительность: ' + channelData['CurrentTrack']['Duration'] + '</h6>');
                        cahnnelBox.fadeIn('fast', function() {});

                        // playlistBox.empty();
                        // playlistBox.append('<h4 class="title is-4"><i class="fas fa-list-ul"></i> Информация плейлиста:</h4>');
                        // playlistBox.append('<h6 class="title is-6"><i class="fas fa-list-ul"></i> Количество треков: ' + channelData['TracksCount'] + '</h6>');
                        // playlistBox.fadeIn('fast', function() {});

                        nextTrackBox.empty();
                        nextTrackBox.append('<h4 class="title is-4"><i class="fas fa-forward"></i> Следующий трек:</h4>');
                        if(channelData['NextTrack']['Artist'] != '') {
                            nextTrackBox.append('<h6 class="title is-6"><i class="fas fa-user"></i> Исполнитель: ' + channelData['NextTrack']['Artist'] + '</h6>'); // 
                        };
                        if(channelData['NextTrack']['Title'] != '') {
                            nextTrackBox.append('<h6 class="title is-6"><i class="fas fa-music"></i> Название: ' + channelData['NextTrack']['Title'] + '</h6>');
                        };
                        nextTrackBox.append('<h6 class="title is-6"><i class="fas fa-clock"></i> Длительность: ' + channelData['NextTrack']['Duration'] + '</h6>');
                        nextTrackBox.fadeIn('fast', function() {});

                        prevTrackBox.empty();
                        prevTrackBox.append('<h4 class="title is-4"><i class="fas fa-backward"></i> Предидущий трек:</h4>');
                        if(channelData['PreviousTrack']['Artist'] != '') {
                            prevTrackBox.append('<h6 class="title is-6"><i class="fas fa-user"></i> Исполнитель: ' + channelData['PreviousTrack']['Artist'] + '</h6>'); // 
                        };
                        if(channelData['PreviousTrack']['Title'] != '') {
                            prevTrackBox.append('<h6 class="title is-6"><i class="fas fa-music"></i> Название: ' + channelData['PreviousTrack']['Title'] + '</h6>');
                        };
                        if(channelData['PreviousTrack']['Artist'] == '' && channelData['PreviousTrack']['Title'] == '' && channelData['PreviousTrack']['CastTitle'] != '') {
                            prevTrackBox.append('<h6 class="title is-6"><i class="fas fa-music"></i> Название: ' + channelData['PreviousTrack']['CastTitle'] + '</h6>');
                        }
                        prevTrackBox.append('<h6 class="title is-6"><i class="fas fa-clock"></i> Длительность: ' + channelData['PreviousTrack']['Duration'] + '</h6>');
                        prevTrackBox.fadeIn('fast', function() {});

                        clearInterval(EverySecond);
                        EverySecond = setInterval(function() {
                            curpos += 1000;
                            var curtimeText = GetSongCurTime(curpos);
                            curtime.append('<i class="fas fa-clock"></i> ');
                            curtime.text(curtimeText);
                            pleer.val(curpos);
                            if(curtimeText == channelData['CurrentTrack']['Duration']) {
                                UpdateChannel();
                            }
                        }, 1000);
                        loading.fadeOut('fast', function() {
                            channelContainer.fadeIn('fast', function() {});
                        });
                    };
                };
            };
        });
    };

    $('#channel-selector').on('change', function () {
        UpdateChannel();
    });
});