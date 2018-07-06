$(document).on("click", ".saveArticleBtn", function() {
    var id = $(this).siblings('p:first').attr('data-id');
    console.log(id);

    $.ajax({
        type: "PUT",
        url: "/articles/" + id,
        data: {
            saved: true
        }
    })
    .then(function(data) {
        console.log(data);
        window.location.href = "/";
    }); 
});

$(document).on("click", ".scrapeBtn", function() {
    alert("SCRAPE SUCCESS!");
});

$(document).on("click", ".removeArticleBtn", function() {

    var id = $(this).siblings('p:first').attr('data-id');
    console.log(id);

    $.ajax({
        type: "PUT",
        url: "/articles/remove/" + id,
        data: {
            saved: false
        }
    })
    .then(function(data) {
        console.log(data);
        window.location.href = "/articles/saved";
    });

});

$(document).on("click", ".getNoteBtn", function() {

        $('.modal-content').empty();
        var header = $("<div class='modal-header'>");
        var body = $("<div class='modal-body'>");
        var form = $("<div class='form-group'>");
        var footer = $("<div class='modal-footer'>");
        
        var id = $(this).siblings('p:first').attr('data-id');
        console.log(id);

        $.ajax({
            method: "GET",
            url: "/articles/" + id
        })
        .then(function(data) {
            console.log(data);
            // Modal Header
            header.append("<h5 class='modal-title' data-id='" + data._id + "'>" + data.title + "</h5>");
            header.append("<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
            $('.modal-content').append(header);

            // Modal Body
            // $('.modal-content').append(body);
            form.append("<label for='notes-input' class='col-form-label'>Notes:</label>");
            form.append("<textarea class='form-control' id='notes-input'></textarea>");
            body.append(form);
            $('.modal-content').append(body);
            
            // Modal Footer
            footer.append("<button type='button' class='btn btn-primary saveNoteBtn'>Save changes</button>");
            $('.modal-content').append(footer);

            if (data.note) {
                $("#notes-input").val(data.note.notes);
            }
        })

});

$(document).on("click", ".saveNoteBtn", function() {

    var id = $(this).parent().siblings('.modal-header').children().attr('data-id');
    console.log(id);

    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
            notes: $("#notes-input").val()
        }
    })
    .then(function(data) {
        console.log(data);
        $("#notes-input").val("");
        window.location.href = "/articles/saved";
    });
});