/* globals $ */

'use strict';

var app = app || {};

$('.addPoints').on('click', function (ev) {

    var element = $(ev.target),
        username = element.attr('data-username'),
        points = +element.attr('data-points'),
        category = element.attr('data-category'),
        competitionId = $('#info').attr('data-id');

    ev.preventDefault();
    var data = {
        username,
        points,
        category,
        competitionId
    };

    app.requester.put('/users/addPoints', data)
        .then(function(resp) {
            if (resp.success) {
                $("#add-points-btn").addClass("hidden");
                $("#points-added").removeClass("hidden");
                app.notifier.showNotification(resp, "success");
            }
        })
        .catch(function(err) {
           app.notifier.showNotification("Points could not be added.", "error");
        })

    // $.ajax('/users/addPoints', {
    //     method: 'PUT',
    //     data: JSON.stringify(data),
    //     contentType: 'application/json'
    // }).
    // done(() => {
    //         toastr.success('magic');
    //     })
    //     .fail(() => {
    //         toastr.error('You are a fail!')
    //     })
});