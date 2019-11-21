function create(id) {
    cardmngr.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    let card = $('#content').append(table(id));
    $.get("http://localhost:4000/generate", function (data) {
        data.data.forEach(element => {
            $(`#${id}`).find('#' + element.tile).html(element.label);
            // $('#' + element.tile).html(element.label);
        });
    }).then((result) => {
        $('.spinner-border').remove();
        $('.bingo').removeAttr('hidden');
    });
    cardIndex++;
}


$('#content').on('click', '#remove', function () {
    $(this).parent().parent().remove();
});