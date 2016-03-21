startVideos = function(videoId, playlist) {
   var video_idx = 0;
   var videoPlaying = document.getElementById(videoId);
   var videoSource = videoPlaying.children[0];

   videoPlaying.addEventListener('ended', changeVideo, false);

   function changeVideo(event) {
       videoSource.setAttribute('src', playlist[video_idx]);
       videoPlaying.load();
       console.log(event);
       if (typeof(event) !== 'undefined')
           videoPlaying.play();
       video_idx += 1;
       if (video_idx == playlist.length) {
           video_idx = 0;
       }
   }

   changeVideo();
}
