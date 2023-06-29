$(document).ready(function () {
    console.log('hello');
    // contact_email();
    /* Attach a submit handler to the form */
    $("#frm-footer").click(function (event) {
        console.log("click");
        var ajaxRequest;

        /* Stop form from submitting normally */
        event.preventDefault();

        /* Get from elements values */
        var values = $("#pre-footer").serializeArray();
        console.log(values);
        /* Send the data using post and put the results in a div. */
        /* I am not aborting the previous request, because it's an
           asynchronous request, meaning once it's sent it's out
           there. But in case you want to abort it you can do it
           by abort(). jQuery Ajax methods return an XMLHttpRequest
           object, so you can just use abort(). */
        ajaxRequest = $.ajax({
            url: "/frm-footer-email.php",
            type: "post",
            data: values
        });

        /*  Request can be aborted by ajaxRequest.abort() */

        ajaxRequest.done(function (data, textStatus, jqXHR) {
            console.log('Data is  '+data);
            var res = JSON.parse(data);
            var word ="Thank you!"
            if(res.success_msg == 'true')
            {
                $(".succesmsg").html("Thank you! <br> We have received your message and will get back to you as soon as possible.");
                $('.succesmsg:contains("Thank you!")').html(function(_, html) {
                    return html.replace(/(Thank you!)/g, '<b style="font-weight: 800;">$1</b>');
                });
                $("#pre-footer").addClass('d-none');
                $(".succesmsg").removeClass('d-none');
            }


        });

        /* On failure of request this function will be called  */
        ajaxRequest.fail(function () {

            $(".succesmsg").html('Something went wrong. Please try again');
            // Show error
        });
    });



    $("#frm-contect").click(function (event) {
        console.log("click");
        var ajaxRequest;

        /* Stop form from submitting normally */
        event.preventDefault();

        /* Get from elements values */
        var values = $("#pre-contect").serializeArray();
        console.log(values);
        /* Send the data using post and put the results in a div. */
        /* I am not aborting the previous request, because it's an
           asynchronous request, meaning once it's sent it's out
           there. But in case you want to abort it you can do it
           by abort(). jQuery Ajax methods return an XMLHttpRequest
           object, so you can just use abort(). */
        ajaxRequest = $.ajax({
            url: "/frm-footer-email.php",
            type: "post",
            data: values
        });

        /*  Request can be aborted by ajaxRequest.abort() */

        ajaxRequest.done(function (data, textStatus, jqXHR) {
            console.log('Data is  '+data);
            var res = JSON.parse(data);
            if(res.success_msg == 'true')
            {
                $(".succesmsgmodal").html("Thank you! <br> I've received your message and will reply asap.");
                $(".modal-form__heading").addClass('d-none');
                $(".succesmsgmodal").removeClass('d-none');
            }


        });

        /* On failure of request this function will be called  */
        ajaxRequest.fail(function () {

            $(".succesmsgmodal").html('Something went wrong. Please try again');
            // Show error
        });
    });
});