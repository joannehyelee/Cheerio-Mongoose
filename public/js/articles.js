$(document).ready(function(){

    $(".saveArticleBtn").on("click", function(){

        var id = $(this).siblings('p:first').attr("data-id");
        console.log(id);

        $.ajax({
            method: "PUT",
            url: "/articles",
        }).then(function(){
            window.location.href = "/";
        });

    });

});