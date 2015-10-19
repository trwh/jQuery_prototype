$(document).ready(function() {

    var auto = setTimeout(function(){ submitform();}, 5000);

    function submitform(){
      $(".gitprofile").submit();
    }

    $('input.username').keyup(function autoRefresh(){
       clearTimeout(auto);
       auto = setTimeout(function(){ submitform(); }, 5000);
    });

  $('.gitprofile').on('submit', function(e) {

    e.preventDefault();

    var url = 'https://api.github.com/users/' + $('input.username').val() + "?access_token=" + access_token;

    var template = $('template').html();

    var fail_func = function() {
      $('.container').prepend("User not found")
    };

    var always_func = function() {
      $('input.username').val('');
    };

    $.get(url, function(info) {
      console.log(info);
      $('.container').prepend(Mustache.render(template, info));
    }).fail(fail_func).always(always_func);
  });
});
