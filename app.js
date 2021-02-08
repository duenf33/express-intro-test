var express = require("express");

var app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function checkArtist(req, res){
    let found = false;
    artistArray.forEach((item) => {
      if (item.id === Number(req.params.artistID)) {
        found = true;
      }
    });
    if (found) {
      res.status(200).send(`found`);
    } else {
      res.status(404).send(`Sorry the artist you are looking for does not exist`);
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
  res.status(200).json(
    "Welcome to the Artists Data Base"
  )
});

app.get("/artists", function (req, res) {
  res.status(200).json({
    artistArray,
  })
});

app.get("/artists/name-list", function (req, res) {
  let newArr;
  const findArtist = function(artistArray, name){
    return artistReturned = artistArray.find((artist, index) => {
      console.log(artist.name)
      return artist.name
        
      })
    }
    
    artistArray.forEach((element) => {
      newArr.push(findArtist(artistArray, element))
    })
    res.status(200).json({
      newArr,
    });
  })
  
app.get("/artists/:artistID", function (req, res) {
  let artistid = Number(req.params.artistID)
  let found = false;
    artistArray.forEach((item) => {
      if (item.id === artistid) {
        found = true;
      }
    });
    if (found) {
      // for(let i = 0; i < artistArray.length; i++){
      //   console.log(artistArray[i])
        return res.status(200).json(artistArray.id);
      // }
    } else {
      res.status(404).send(`Sorry the artist you are looking for does not exist`);
    }
//   let targetName;
//   let reqParams = Number(req.params.id)
  
//   artistArray.forEach(element => {
//     if(element.id === reqParams) {
//       targetName = element.name;
//     } 
//   })

//   res.status(200).json({
//     name: targetName,
//   })
});

app.post('/add', function (req, res) {
  console.log(req.body.albumsArray[0])
  artistArray.push({
    id: req.body.id,
    name: req.body.name,
    albumsArray: [
      {
        id: req.body.albumsArray[0].id,
        name: req.body.albumsArray[0].name,
      }
    ],
    topSongs: [
      {
        id: req.body.topSongs[0].id,
        name: req.body.topSongs[0].name,
      }
    ]
  });

  res.status(200).json({
    artistArray,
  })
})



app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});