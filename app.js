var express = require("express");

var app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/********************
 * HELPER FUNCTIONS *
 ********************/

const getValue = (array, index) => {
  let result = array.map(item =>
    item[index]
  );
  return result;
}

const getEach = (item, indexArtist) => {
  if(item.id === artistID) {
    artistIndex = indexArtist;
    found = true;
  }
}

let artistArray = [
  {
    id: 1,
    name: "Kanye",
    albumsArray: [
      {
        id: 1,
        name: "The coding dropout",
      },
    ],
    topSongs: [
      {
        id: 1,
        name: "The Javascript State of Mind",
      },
    ],
  },
  {
    id: 2,
    name: "Chris Brown",
    albumsArray: [
      {
        id: 1,
        name: "The Greatest Algorithm",
      },
    ],
    topSongs: [
      {
        id: 1,
        name: "Wheel on the bus",
      },
    ],
  },
];

app.get("/", function (req, res) {
  res.status(200).send("Welcome to the Artists Data Base")
});

app.get("/artists", function (req, res) {
  res.status(200).json({
    artistArray,
  })
});

app.get("/artists-name-list", function (req, res) {
  const result = getValue(artistArray, "name");
  console.log(result)
  return res.status(200).json(result);
})
  
  app.get("/artist-by-id/:artistID/", function (req, res) {
    let artistID = Number(req.params.artistID)
    let artistIndex;
    let found = false;
    
      artistArray.forEach((item, indexArtist) => {
        if (item.id === artistID) {
          artistIndex = indexArtist;
          found = true;
        }
      });
      if (found) {
          return res.status(200).json(artistArray[artistIndex]);
      } else {
        res.status(404).send(`Sorry the artist you are looking for does not exist`);
      }
  });
  
  app.get("/artist-album-by-id/:artistID", function (req, res) {
    let artistID = Number(req.params.artistID)
    let artistIndex;
    let found = false;
    
      artistArray.forEach((item, indexArtist) => {
        if (item.id === artistID) {
          artistIndex = indexArtist;
          found = true;
        }
      });
      if (found) {
          return res.status(200).json(artistArray[artistIndex].albumsArray);
      } else {
        res.status(404).send(`Sorry the artist's album you are looking for does not exist`);
      }
  });
  app.get("/artist-top-songs-by-id/:artistID", function (req, res) {
    let artistID = Number(req.params.artistID)
    let artistIndex;
    let found = false;
    
      artistArray.forEach((item, indexArtist) => {
        if (item.id === artistID) {
          artistIndex = indexArtist;
          found = true;
        }
      });
      if (found) {
          return res.status(200).json(artistArray[artistIndex].topSongs);
      } else {
        res.status(404).send(`Sorry the artist's TopSongs you are looking for does not exist`);
      }
  });
  
app.post('/add-artist', function (req, res) {
  artistArray.push({
    id: req.body.id,
    name: req.body.name,
  });

  res.status(200).json({
    artistArray,
  })
})
app.post('/add-album-by-id/:artistID', function (req, res) {
  let artistID = Number(req.params.artistID)
  let artistIndex;
  let found = false;
  
    artistArray.forEach((item, indexArtist) => {
      if (item.id === artistID) {
        artistIndex = indexArtist;
        // artistArray[artistIndex].push({
        //       albumsArray: [
        //         {
        //           id: req.body.albumsArray[0].id,
        //           name: req.body.albumsArray[0].name,
        //         }
        //       ]
        // });
        found = true
        console.log(found)
    };
    if (found) {
      return res.status(200).json({artistArray})
    } else {
      // res.status(200).json({artistArray})
      return res.status(404).send(`Sorry the artist's album you are trying to make doesn't work`);
    }
  });
});

//   artistArray.push({
//     id: req.body.id,
//     name: req.body.name,
//     // albumsArray: [
//     //   {
//     //     id: req.body.albumsArray[0].id,
//     //     name: req.body.albumsArray[0].name,
//     //   }
//     // ],
//     // topSongs: [
//     //   {
//     //     id: req.body.topSongs[0].id,
//     //     name: req.body.topSongs[0].name,
//     //   }
//     // ]
//   });

//   res.status(200).json({
//     artistArray,
//   })
// })

app.delete('/delete-artist/:artistID', function(req, res) {
  let artistIDNumber = Number(req.params.artistID);
  let obj = {};
  let artistIndex;
  
  console.log('line 148: ', artistArray[0].name)
  artistArray.forEach((artist, indexArtist) => {
    console.log(artist.id)
    if(artist.id === artistIDNumber) {
      artistIndex = indexArtist;

    } else {
      console.log("it doesn't work")
    }
  })

  res.status(200).json({
    artistArray,
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});