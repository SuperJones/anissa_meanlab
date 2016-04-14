
//event listener for shorten button
$('.btn-shorten').on('click', function(){
  $ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    //gets the value of what was typed in the input field.
    data: {url: $('#url-field').val()},
    success: function(data){
      // display the shortened URL to the user that is returned by the server
      var resultHTML = '<a href="' + data.shortURL + '">' + data.shortURL + '</a>';
      $('#link').html(resultHTML);
      $('#link').hide().fadeIn('slow');
    }
  });
});
