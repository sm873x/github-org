(function() {
    'use strict';

    var $results = $('.results');
    var $username = $('.username');

    $('.userForm').on( 'submit', function(e) {
        e.preventDefault();

        $('.orgs').remove();
        getOrgs($username.val());

    });

    function getOrgs(username) {
        $.ajax({
            url: 'https://api.github.com/users/' + username + '/orgs',
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},//unecessary
            dataType: 'json'
        })
        .done(function(data) {
            // console.log(arguments);//xhr object is in position [2]
            // console.log( JSON.parse(arguments[2].responseText) );//this is done automatically by jquery because we stipulated dataType as JSON
            showOrgs(data);
        })
        .fail(function(xhr) {
            //xhr = xml http request
            handleAjaxError( xhr, $results );
        });
    }

    function showOrgs(data) {
        data.forEach( function(org) {
            $results
                .append('<li class="orgs"></li>')
                .find('li:last-child')
                    .append('<img class="avatar" src=' + org.avatar_url + '/>')
                    .append('<p class="orgName">' + org.login + '</p>');
            });
    }

    function handleAjaxError(xhr, elem) {
        if (xhr.status === 404) {
            $(elem).text('Check yo\'self because link doesn\'t exist');
        } else {
            $(elem).text('Ruh roh...');
        }
    }

})();
