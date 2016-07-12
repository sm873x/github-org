(function(ns) {
    'use strict';

    window.githuborg = ns = ( ns || {});

    $('.userForm').on( 'submit', function(e) {
        e.preventDefault();
        getOrgs($('.username').val());
    });

    $('.load').on('click', function loadOrg() {
        getOrgs($('.username').val());
    });

    function getOrgs(username) {
        $.ajax({
            url: 'https://api.github.com/users/' + username + '/orgs',
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
    }

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
                .find('li:last-child')
                    .append('<img class="avatar" src=' + org.avatar_url + '/>')
                    .append('<p class="orgName">' + org.login + '</p>');
            });
    }

})(window.githuborg);
