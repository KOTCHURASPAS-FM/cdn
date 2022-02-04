function AddNotify(msg) {
    var message = JSON.parse(msg),
        date = new Date(),
        id = date.getTime();
    $("#notifies").append('<div id="' + id + '" style="display: none;" class="notification is-' + message['type'] + '"><button class="delete" onclick="$(this).parent(\'.notification\').fadeOut(\'fast\', function() {$(this).parent(\'.notification\').remove()})"></button><h5 class="title is-5">' + message['header'] + '</h5><h6 class="subtitle is-6">' + message['msg'] + '</h6></div>');
    $('#' + id).fadeIn('fast', function() {});
    setTimeout(function() {
        $('#' + id).fadeOut('fast', function() {
            $('#' + id).remove();
        })
    }, 6000);
};

$(document).ready(function() {
    $('.navbar-burger').click(function() {
        $('.navbar-burger').toggleClass('is-active');
        $('.navbar-menu').toggleClass('is-active');
    });
    $('#page').hide();
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
    $('.hero').fadeOut('fast', function() {
        $('.hero').remove();
        $('html, body').removeAttr('style');
        $('#page').fadeIn('fast', function() {});
    })
});