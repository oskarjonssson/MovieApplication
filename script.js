/***GLOBAL VARIABELS**/

let movieArray =[];

window.addEventListener('load', function(event){

  var config = {
    apiKey: "AIzaSyA9pMjQ16hvviDeuAw7F2wTD49uXGsC-5w",
    authDomain: "laboration-3.firebaseapp.com",
    databaseURL: "https://laboration-3.firebaseio.com",
    projectId: "laboration-3",
    storageBucket: "",
    messagingSenderId: "993351585539"
  };

  firebase.initializeApp(config);
  const db = firebase.database();



    function renderMovie(a, b){
        for(let i = a; i < b ; i++){
          if(movieArray[i] == undefined){
            console.log("Less than 5 results on this page");
          }else{
          let title = movieArray[i].val().Title;
          let poster = movieArray[i].val().imgPoster;
          let director = movieArray[i].val().Director;
          let released = movieArray[i].val().Released;
          let key = movieArray[i].key;
          createMovie(title, poster, director, key, released);
        }
      }
    }


  let searchBtn = document.getElementById('searchBtn');
  let searchMainBar = document.getElementsByClassName('searchMainBar')[0];
  searchBtn.addEventListener('click', function(event){
    if(searchMainBar.className === "searchMainBar"){
      searchMainBar.className = "searchMainBarShow";
    }else{
      searchMainBar.className = "searchMainBar";
    }
  });


  db.ref('/').on('child_added', function(snapshot , prevChildKey) {
    movieArray.push(snapshot);
  });


  /**LISTENS AFTER MOVIES AND ADDS FIRST 5 MOVIES**/

  var startListening = function(){
      db.ref('/').limitToFirst(5).on('child_added', function(snapshot , prevChildKey) {
        let valueCA = snapshot.val();
        let keyCA = snapshot.key;

        let title = valueCA.Title;
        let poster = valueCA.imgPoster;
        let director = valueCA.Director;
        let released = valueCA.Released;
        createMovie(title, poster, director, keyCA, released);

      });
  };
  startListening();





  /** INPUTS **/
  let titleInput = document.getElementById("titleInput");
  let directorInput = document.getElementById("directorInput");
  let imgInput = document.getElementById("imgInput");

  /*** CREATES MOVIE CARD AND APPENDS TO DOM ***/
  function createMovie(title, poster, director, key, released){
    let movieContainer = document.getElementById("mainMovieWrap");

    const newDiv = document.createElement("div");
    const imgDiv = document.createElement("div");
    const newImg = document.createElement("img");
    const newTitle = document.createElement("p");
    const newDirector = document.createElement("p");
    const newReleased = document.createElement("p");
    const removeBtn = document.createElement("button");
    const changeBtn = document.createElement("button");
    const changeTitle = document.createElement("input");
    const changeDirector = document.createElement("input");
    const changeImg = document.createElement("input");
    const makeChange = document.createElement("button");


    newImg.src = poster;
    newTitle.innerHTML = title;
    newDirector.innerHTML = director;
    newReleased.innerHTML = released;
    makeChange.innerHTML = "MAKE CHANGE"
    changeBtn.innerHTML = "CHANGE";
    removeBtn.innerHTML = "REMOVE";
    newReleased.className = "movieDate";
    makeChange.className = "makeChange";
    changeBtn.className = "changeBtn";
    imgDiv.className = "movieImg";
    changeTitle.className = "inputStyle";
    changeDirector.className = "inputStyle";
    changeImg.className = "inputStyle";
    removeBtn.className = "removeBtn";
    newImg.className = "moviePoster";
    newDiv.className = "movieWrap";
    newDirector.className = "movieDirector";
    newTitle.className = "movieName";

    newDirector.setAttribute("id", "directorP");
    changeDirector.setAttribute("placeholder", "Director");
    changeTitle.setAttribute("placeholder", "Title");
    changeImg.setAttribute("placeholder", "Image URL");
    movieContainer.appendChild(newDiv);
    newDiv.appendChild(imgDiv);
    imgDiv.appendChild(newImg);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newDirector);
    newDiv.appendChild(newReleased);
    newDiv.appendChild(changeTitle);
    newDiv.appendChild(changeDirector);
    newDiv.appendChild(changeImg);
    newDiv.appendChild(changeBtn);
    newDiv.appendChild(removeBtn);
    newDiv.appendChild(makeChange);



    removeBtn.addEventListener('click', function(event){
      var ref = firebase.database().ref('/' + key);
      ref.remove()
      .then(function() {
      console.log("Remove succeeded.")
      let parent = event.target.parentNode;
      parent.parentNode.removeChild(parent);

      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
    });

    changeBtn.addEventListener('click', function(event){
      newTitle.style.display = "none";
      newDirector.style.display = "none";
      changeBtn.style.display = "none";
      removeBtn.style.display = "none";
      changeTitle.style.display = "flex";
      changeDirector.style.display = "flex";
      changeImg.style.display = "flex";
      makeChange.style.display = "flex";
      //firebase.database().ref().child('/' + key).update({Title: titleInput.value, Director: directorInput.value, imgPoster: imgInput.value});

        console.log(key);
    });
    makeChange.addEventListener('click', function(event){
      firebase.database().ref().child('/' + key).update({Title: changeTitle.value, Director: changeDirector.value, imgPoster: changeImg.value});
      newTitle.style.display = "flex";
      newDirector.style.display = "flex";
      changeBtn.style.display = "block";
      removeBtn.style.display = "block";
      changeTitle.style.display = "none";
      changeDirector.style.display = "none";
      changeImg.style.display = "none";
      makeChange.style.display = "none";
      console.log(key);
    });
  }





  /** EVENT LISTENERS FOR PAGINATION**/
  let btnView1 = document.getElementsByClassName("btnView")[0];
  let btnView2 = document.getElementsByClassName("btnView")[1];
  let btnView3 = document.getElementsByClassName("btnView")[2];
  let btnView4 = document.getElementsByClassName("btnView")[3];
  let btnView5 = document.getElementsByClassName("btnView")[4];

  btnView1.addEventListener('click', function(event){
    let movieContainer = document.getElementById("mainMovieWrap").innerHTML = " ";
    renderMovie(0 , 5);
  })

  btnView2.addEventListener('click', function(event){
    let movieContainer = document.getElementById("mainMovieWrap").innerHTML = " ";
    renderMovie(6, 11);
  })

  btnView3.addEventListener('click', function(event){
    let movieContainer = document.getElementById("mainMovieWrap").innerHTML = " ";
    renderMovie(12, 17);
  })

  btnView4.addEventListener('click', function(event){
    let movieContainer = document.getElementById("mainMovieWrap").innerHTML = " ";
    renderMovie(18 ,23);
  })

  btnView5.addEventListener('click', function(event){
    let movieContainer = document.getElementById("mainMovieWrap").innerHTML = " ";
    renderMovie( 24, movieArray.length);
  })

/*** BYGGA IHOP TEST **/
/***ADD MOVIE SEARCHBAR ***/
let addBtn = document.getElementById('addBtn');
let addMainBar = document.getElementsByClassName('addMainBar')[0];

addBtn.addEventListener('click', function(event){
  if(addMainBar.className === "addMainBar"){
    addMainBar.className = "addMainBarShow";
  }else{
    addMainBar.className = "addMainBar";
  }
});

/*** ADD NEW MOVIE TO DB ***/
let okBtn = document.getElementById('okBtn');
let inputTitle = document.getElementById('inputTitle');
let inputDirector = document.getElementById('inputDirector');
let inputPoster = document.getElementById('inputPoster');
let inputDate = document.getElementById('inputDate');
okBtn.addEventListener('click', function(event){
   db.ref('/').push({
    'Title': inputTitle.value,
    'Director': inputDirector.value,
    'imgPoster': inputPoster.value,
    'Released' : inputDate.value
  });
});

/** KNAPP FÖR SORTERING**/
let filterBtn = document.getElementById('filterBtn');
let filterMenuDiv = document.getElementsByClassName('filterMenuDiv')[0];
filterBtn.addEventListener('click', function(event){
  if(filterMenuDiv.className === "filterMenuDiv"){
    filterMenuDiv.className = "filterMenuDivShow";
  }else{
    filterMenuDiv.className = "filterMenuDiv";
  }
})

function sortPage(){
  for(let i = 0; i < 5 ; i++){
    if(movieArray[i] == undefined){
      console.log("Less than 5 matches");
    }else{
      let title = movieArray[i].val().Title;
      let poster = movieArray[i].val().imgPoster;
      let director = movieArray[i].val().Director;
      let released = movieArray[i].val().Released;
      let key = movieArray[i].key;
      createMovie(title, poster, director, key, released);
    }
  }
}



/**SORTERING Z-A DIRECTOR***/

let liBtn4 = document.getElementById('liBtn4');
let movieContainer = document.getElementById("mainMovieWrap");

liBtn4.addEventListener('click', function(event){
  mainMovieWrap.innerHTML = "";
  let arrayAlphaRev = movieArray.sort(function(a,b){
    var nameA = a.val().Director.toUpperCase();
    var nameB = b.val().Director.toUpperCase();
    if (nameA < nameB) {
      return 1;
    }
    if(nameA > nameB) {
      return -1;
    }
    return 0;
  });
  sortPage();
});

/*** Sortering A-Z Director ***/
let liBtn3 = document.getElementById('liBtn3');

liBtn3.addEventListener('click', function(event){
  mainMovieWrap.innerHTML = "";
  let arrayAlphaRev = movieArray.sort(function(a,b){
    var nameA = a.val().Director.toUpperCase();
    var nameB = b.val().Director.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if(nameA > nameB) {
      return 1;
    }
    return 0;
  });
  sortPage();
});




/*** Sortering A-Z Title ***/
let liBtn1 = document.getElementById('liBtn1');
liBtn1.addEventListener('click', function(event){
  mainMovieWrap.innerHTML = "";
  let arrayAlphaRev = movieArray.sort(function(a,b){
    var nameA = a.val().Title.toUpperCase();
    var nameB = b.val().Title.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if(nameA > nameB) {
      return 1;
    }
    return 0;
  });
  sortPage();
});


/*** Sortering Z-A Title ***/
let liBtn2 = document.getElementById('liBtn2');

liBtn2.addEventListener('click', function(event){
  mainMovieWrap.innerHTML = "";
  let arrayAlphaRev = movieArray.sort(function(a,b){
    var nameA = a.val().Title.toUpperCase();
    var nameB = b.val().Title.toUpperCase();
    if (nameA < nameB) {
      return 1;
    }
    if(nameA > nameB) {
      return -1;
    }
    return 0;
  });
  sortPage();

});

/*** PREMIÄRDATUM STIGANDE ***/
let liBtn5 = document.getElementById('liBtn5');
liBtn5.addEventListener('click', function(event){
  mainMovieWrap.innerHTML = "";
  let arrayYearSort = movieArray.sort(function (a, b) {
    return a.val().Released - b.val().Released;
  });
  sortPage();

});



/*** PREMIÄRDATUM FALLANDE ***/
let liBtn6 = document.getElementById('liBtn6');
liBtn6.addEventListener('click', function(event){
  mainMovieWrap.innerHTML = "";
  let arrayYearSort = movieArray.sort(function (a, b) {
    return b.val().Released - a.val().Released;
  });
  sortPage();
});


/*** SÖKFUNKTION ***/
let inputSearch = document.getElementById('inputSearch');
inputSearch.addEventListener('keyup', function(event){
  mainMovieWrap.innerHTML = "";
  var keyword = inputSearch.value.toUpperCase();
  //--------Search
  var filtered_data = movieArray.filter(function(item) {
      return item.val().Title.toUpperCase().includes(keyword);

  });

  function newSearch(){
      for(let i = 0; i < 5 ; i++){
        if(filtered_data[i] != undefined){
          let title = filtered_data[i].val().Title;
          let poster = filtered_data[i].val().imgPoster;
          let director = filtered_data[i].val().Director;
          let released = filtered_data[i].val().Released;
          let key = filtered_data[i].key;
          createMovie(title, poster, director, key, released);
        }
      }
    }
  newSearch();

    function renderMovie(a, b){
      for(let i = a; i < b ; i++){
        if(filtered_data[i] != undefined){
          let title = filtered_data[i].val().Title;
          let poster = filtered_data[i].val().imgPoster;
          let director = filtered_data[i].val().Director;
          let released = filtered_data[i].val().Released;
          let key = filtered_data[i].key;
          createMovie(title, poster, director, key, released);
      }
    }
  }

  function sortPage(){
    for(let i = 0; i < 5 ; i++){
      if(filtered_data[i] != undefined){
        let title = filtered_data[i].val().Title;
        let poster = filtered_data[i].val().imgPoster;
        let director = filtered_data[i].val().Director;
        let released = filtered_data[i].val().Released;
        let key = filtered_data[i].key;
        createMovie(title, poster, director, key, released);
      }
    }
  }
  btnView1.addEventListener('click', function(event){
    let movieContainer = document.getElementById("mainMovieWrap").innerHTML = " ";
    renderMovie(0 , 5);
  })


  btnView2.addEventListener('click', function(event){
    let movieContainer = document.getElementById("mainMovieWrap").innerHTML = " ";
    renderMovie(6, 11);
  })

  btnView3.addEventListener('click', function(event){
    let movieContainer = document.getElementById("mainMovieWrap").innerHTML = " ";
    renderMovie(12, 17);
  })

  btnView4.addEventListener('click', function(event){
    let movieContainer = document.getElementById("mainMovieWrap").innerHTML = " ";
    renderMovie(18 ,23);
  })

  btnView5.addEventListener('click', function(event){
    let movieContainer = document.getElementById("mainMovieWrap").innerHTML = " ";
    renderMovie( 24, movieArray.length);
  })

  /**SORTERING Z-A DIRECTOR***/

  let liBtn4 = document.getElementById('liBtn4');
  let movieContainer = document.getElementById("mainMovieWrap");

  liBtn4.addEventListener('click', function(event){
    mainMovieWrap.innerHTML = "";
    let arrayAlphaRev = filtered_data.sort(function(a,b){
      var nameA = a.val().Director.toUpperCase();
      var nameB = b.val().Director.toUpperCase();
      if (nameA < nameB) {
        return 1;
      }
      if(nameA > nameB) {
        return -1;
      }
      return 0;
    });
    sortPage();
  });

  /*** Sortering A-Z Director ***/
  let liBtn3 = document.getElementById('liBtn3');

  liBtn3.addEventListener('click', function(event){
    mainMovieWrap.innerHTML = "";
    let arrayAlphaRev = filtered_data.sort(function(a,b){
      var nameA = a.val().Director.toUpperCase();
      var nameB = b.val().Director.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if(nameA > nameB) {
        return 1;
      }
      return 0;
    });
    sortPage();
  });

  /*** Sortering A-Z Title ***/
  let liBtn1 = document.getElementById('liBtn1');
  liBtn1.addEventListener('click', function(event){
    mainMovieWrap.innerHTML = "";
    let arrayAlphaRev = filtered_data.sort(function(a,b){
      var nameA = a.val().Title.toUpperCase();
      var nameB = b.val().Title.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if(nameA > nameB) {
        return 1;
      }
      return 0;
    });
    sortPage();
  });

  /*** Sortering Z-A Title ***/
  let liBtn2 = document.getElementById('liBtn2');

  liBtn2.addEventListener('click', function(event){
    mainMovieWrap.innerHTML = "";
    let arrayAlphaRev = filtered_data.sort(function(a,b){
      var nameA = a.val().Title.toUpperCase();
      var nameB = b.val().Title.toUpperCase();
      if (nameA < nameB) {
        return 1;
      }
      if(nameA > nameB) {
        return -1;
      }
      return 0;
    });
    sortPage();

  });
  /*** PREMIÄRDATUM STIGANDE ***/
  let liBtn5 = document.getElementById('liBtn5');
  liBtn5.addEventListener('click', function(event){
    mainMovieWrap.innerHTML = "";
    let arrayYearSort = filtered_data.sort(function (a, b) {
      return a.val().Released - b.val().Released;
    });
    sortPage();

  });
  /*** PREMIÄRDATUM FALLANDE ***/
  let liBtn6 = document.getElementById('liBtn6');
  liBtn6.addEventListener('click', function(event){
    mainMovieWrap.innerHTML = "";
    let arrayYearSort = filtered_data.sort(function (a, b) {
      return b.val().Released - a.val().Released;
    });
    sortPage();
  });
  console.log(filtered_data)
  });

/***/
});
