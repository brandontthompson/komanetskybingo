const socket = io.connect('http://komanetsky.com:4000');
// query dom
let cardmngr = [];
const handle = $('#handle');

// emit events

$('#handle').keypress(function (event) {
    if (event.keyCode == 13 || event.which == 13) {
        // $('#handle').focus();
        // event.preventDefault();
        $('#send').click();
    }
});

$('#send').on('click', function () {
    socket.emit('bindhandle', {
        handle: handle.val()
    });
    $('.spinner-border').removeAttr('hidden');
    create(0);
    $('.form').remove();
});

$('#content').on('click', 'td', function () {
    arr = cardmngr[$(this).parent().parent().parent().attr('id')];
    let index = $(this).attr('id');
    index = index.split("square", 2)[1];
    if (index >= 12) index++
    if (index === 'free') index = 12;
    if (arr[index]) arr[index] = 0;
    else arr[index] = 1
    socket.emit('cardcheck', {
        card: arr
    })
})

// listen for events
socket.on('bindhandle', function (data) {
    $('.handle').html(data.handle);
});

socket.on('announce', function (data) {
    $('.announce').append(`<p>${data.message}</p>`);
    if (data.message.includes('CONGRATULATIONS')) {
        $('.announce').append(`<p style="margin-top: 0px;margin-left:130px;">${$('.handle').html()}</p>`);
        $('.announce').append('<canvas id="confetti-canvas" style="display:block;z-index:999999;pointer-events:none;position:absolute;" width="5000" height="5000"></canvas>')
        // let ctx = $('#confetti-canvas').getContext("2d");
        // ctx.fillStyle = "white";
        // ctx.fillText("Words", canvas.width/2, canvas.height/2);
        startConfetti();
    }
    $('.announce').css('display', 'block');

});

socket.on('message', function (data) {
    $('.chatinner').append(`<p>${data.message}</p>`)
});

socket.on('pattern', function (data) {
    console.log(data);

    $('.pattern').attr('src', data);
});

socket.on('join', function (data) {
    $('.count').html(data - 1);
});