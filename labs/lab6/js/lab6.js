$imageID = 0;

function jsonFlickrFeed(json) {
  console.log(json);

  $.each(json.items, function(i, item) {
    $("<img class='img-responsive' id='flickrImg' />").attr("src", item.media.m).appendTo("#images");
  });
};

function getImagesByTag() {
	var tag = $('#search').val();
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne',
    dataType: 'jsonp',
    data: { "tags": tag, "format": "json" }
  });
}
