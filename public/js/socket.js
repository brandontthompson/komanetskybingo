const socket = io.connect('http://localhost:4000');

// query dom

const handle = $('#handle');

// emit events

$('#send').on('click', function () {
    socket.emit('bindhandle', {
        handle: handle.val()
    });
    $('.spinner-border').removeAttr('hidden');
    create();
    $('.form').remove();
});

// listen for events
socket.on('bindhandle', function (data) {
    $('.handle').html(data.handle);
});

socket.on('announce', function (data) {
    $('.announce').html(data.message);
});

socket.on('pattern', function (data) {
    console.log(data);

    $('.pattern').attr('src', data);
});

socket.on('join', function (data) {
    $('.count').html(data - 1);
});