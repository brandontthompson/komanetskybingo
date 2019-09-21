const socket = io.connect('http://localhost:4000');
// query dom
let arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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

$('td').on('click', function(){
    let index = $(this).attr('id');
    index = index.split("square",2)[1];
    if(index >= 12) index++
    if(index === 'free') index = 12;
    if(arr[index]) arr[index] = 0;
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
    if(data.message.includes('CONGRATULATIONS')){
        $('.announce').append(`<p style="margin-top: 0px;margin-left:130px;">${$('.handle').html()}</p>`);
        $('.announce').append('<canvas id="confetti-canvas" style="display:block;z-index:999999;pointer-events:none;position:absolute;" width="5000" height="5000"></canvas>')
        // let ctx = $('#confetti-canvas').getContext("2d");
        // ctx.fillStyle = "white";
        // ctx.fillText("Words", canvas.width/2, canvas.height/2);
        startConfetti();
    }
    $('.announce').css('display', 'block');
    
});

socket.on('pattern', function (data) {
    console.log(data);

    $('.pattern').attr('src', data);
});

socket.on('join', function (data) {
    $('.count').html(data - 1);
});