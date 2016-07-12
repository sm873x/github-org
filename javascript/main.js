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
            dataType: 'json'
        })
        .done(function(data) {
            $('.results').text( showOrgs(data) );
            //console.log(data);
        })
        .fail(function(xhr) {
            handleAjaxError( xhr, $('.results') );
        });

    });

    function handleAjaxError(xhr) {
        if (xhr.status === 404) {
            $('.results').text('Check your link address please');
        } else {
            $('.results').text('Ruh roh...');
        }
    }

    function showOrgs(data) {
        data.forEach( function(org) {
            $('.results')
                .append('<li class="orgs"></li>')
                .find('li')
                    .append('<img class="avatar" src=' + org.avatar_url + '/>')
                    .append('<p class="orgName">' + org.login + '</p>');
            });
    }

})(window.githuborg);
