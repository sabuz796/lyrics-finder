const searchButton = document.getElementById("search-button");

// ..........search button handler

searchButton.addEventListener("click", function () {
  if (song.value === "" || song.value === " ") {
    swal("Empty field!", "write any song name", "error");
  } else songName();
  song.value = "";
});

// ........fetch data form api
let songName = () => {
  fetch(`https://api.lyrics.ovh/suggest/${song.value}`)
    .then((res) => res.json())
    .then((result) => {
      showSingleResult(result);
    });
};
// ............show result

let showSingleResult = (getData) => {
  let getAllData = getData.data;
  let showResult = "";

  for (let i = 0; i < 10; i++) {
    const element = getAllData[i];
    const artist = element.artist.name;
    const title = element.title;
    const songLink = element.link;

    showResult += `<div class="single-result row align-items-center my-3 p-3">
    <div class="col-md-9">
      <h3 class="lyrics-name">${title}</h3>
      <p class="author lead">Album by <span>${artist}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center">
    <a href='${songLink}' target="_blank"><button id="get_song_btn" class="btn btn-success">Get Song</button></a>
      <button id ="get-button" class="lyrics btn btn-success">Get Lyrics</button>
    </div>
  </div>`;
  }
  document.getElementById("show-result").innerHTML = showResult;
};

//get lyrics with get_lyrics_btn
function get_lyrics(artist, title){
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}?lyrics=`)
  .then(res => res.json())
  .then(lyrics =>{
      document.getElementById('lyrics_show').textContent = lyrics.lyrics || `OPPS!! There is no lyrics in this song`;
  });           
}
