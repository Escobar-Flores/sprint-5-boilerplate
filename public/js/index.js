'use strict';

// Imprimir todos los temas
$(document).ready(function () {
  var output = '';
  var request = new XMLHttpRequest();

  request.open('GET', 'http://examen-laboratoria-sprint-5.herokuapp.com/topics');

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      console.log('Status:', this.status);
      console.log('Headers:', this.getAllResponseHeaders());

      var data = JSON.parse(this.responseText);

      $.each(data, function (index) {
        var element = data[index];

        output += '\n        <div class="card my-2">\n          <div class="card-body">\n            <blockquote class="blockquote mb-0">\n              <h4>Por: ' + element.author_name + '</h4>\n              <p>' + element.content + '</p>\n              <footer class="blockquote-footer">Respuestas: ' + element.responses_count + '</footer>\n            </blockquote>\n          </div>\n        </div>';

        $('#posts').html(output);
      });
    };
  };

  request.send();

  $('.add-theme-js').on('click', function () {
    var authorName = $('.author-name-js').val();
    var contentTheme = $('.content-theme-js').val();
    var body = {
      'author_name': authorName,
      'content': contentTheme
    };
    $.ajax({
      url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        'author_name': authorName,
        'content': contentTheme
      }),
      success: function success(data) {},
      fail: handleError
    });

    function handleError(request) {
      if (request) {
        alert(request.message);
      }
    }
  });
});