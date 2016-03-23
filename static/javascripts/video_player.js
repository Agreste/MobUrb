startVideos = function(videoId, playlist) {
    var video_idx = 0;
    var videoPlaying = document.getElementById(videoId);
    var videoSource = videoPlaying.children[0];

    videoPlaying.addEventListener('ended', changeVideo, false);
    console.log(playlist);

    function changeVideo(event) {
        videoSource.setAttribute('src', playlist[video_idx][0]);

        if (playlist[video_idx][1] !== 'NOSUB') {
            console.log(playlist[video_idx]);
            videoPlaying.addEventListener("loadedmetadata", function() {
                for (var i = 1; i < videoPlaying.children.length; ++i) {
                    videoPlaying.removeChild(videoPlaying.children[i]);
                }
                track = document.createElement("track");
                track.kind = "captions";
                track.label = "Português";
                track.srclang = "pt";
                track.src = "/static/subtitles/" + playlist[video_idx-1][1];
                track.addEventListener("load", function() {
                    this.mode = "showing";
                    videoPlaying.textTracks[0].mode = "showing"; // thanks Firefox
                });
                this.appendChild(track);
            });
        }

        videoPlaying.load();
        if (typeof(event) !== 'undefined')
            videoPlaying.play();
        video_idx += 1;
        if (video_idx == playlist.length) {
            video_idx = 0;
        }
    }

    changeVideo();
}
