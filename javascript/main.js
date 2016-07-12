(function(ns) {
    'use strict';

    window.githuborg = ns = ( ns || {});

    $('.userForm').on( 'submit', function(e) {
        e.preventDefault();
            $('.orgs').remove();
            getOrgs($('.username').val());
    });

    $('.load').on('click', function loadOrg() {
            $('.orgs').remove();
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
        })
        .fail(function(xhr) {
            handleAjaxError( xhr, $('.results') );
        });
    }

    function handleAjaxError(xhr) {
        if (xhr.status === 404) {
            $('.results').text('Check yo\'self because link doesn\'t exist');
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
