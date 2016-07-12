(function(ns) {
    'use strict';

    window.githuborg = ns = ( ns || {});

    $('.load').on('click', function() {

        $.ajax({
            url: 'https://api.github.com/users/jisaacks/orgs',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: 'json',
        })
        .done(function(data) {
            $('.results').text( data );

            data.forEach(i)
            console.log(data);
        })
        .fail(function(xhr) {
            handleAjaxError( xhr, $('.results') );
        });

    });

    function handleAjaxError(xhr) {
        if (xhr.status === 404) {
            $('.results').text('Nobody home');
        } else {
            $('.results').text('Ruh roh');
        }
    }



})(window.githuborg);
