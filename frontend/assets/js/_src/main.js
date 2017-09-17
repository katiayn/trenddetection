const __svg__ = {
  path: '../../icons/partials/**/*.svg', name: '../icons/icons.svg',
};

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);
require('../../css/_src/main.scss');

import $ from 'jquery';
import Modernizr from 'modernizr';

$('.form-section form').submit(function(event) {
  let query = $(this).find('.query').val();

  if (!query) {
    $(this).find('.query').addClass('error');
    return false;
  } else {
    $(this).find('.query').removeClass('error');
  }

  let results = searchReuters(query);

  event.preventDefault();
});

function searchReuters(query) {
  // let arr = query.split(' ');

  $.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
      let http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
      options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  $.ajax({
    url: 'https://hackzurich-trend-detection.herokuapp.com/api/search/?topics=' + query,
    type: 'GET',
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa('admin:superuser'));
    },
    success: function(response) {
      jQuery.each(response, function(i, val) {
        console.log(val);
      });
      // $('.results-section .container .row').append('<a class="card-container col-md-4" href="' + response.item_1.link + ' target="_blank">\
      //   <div class="custom-card">\
      //     <div class="header" style="background: url(' + response.item_1.image_url + ');"></div>\
      //     <div class="body">\
      //       <p>' + response.item_1.title + '</p>\
      //     </div>\
      //   </div>\
      // </a>');
    },
  });
}

if (DEVELOPMENT) {
  if (module.hot) {
    module.hot.accept();
  }
}
