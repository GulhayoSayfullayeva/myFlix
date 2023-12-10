/**
 * @module Index
 * @description This is the main file of the application storing all the apis
 */

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const uuid = require("uuid");
const morgan = require("morgan");
const mongoose = require("mongoose");
const models = require("./models.js");
const app = express();
const {check} = require("express-validator");

const Movies = models.Movie;
const Users = models.User;
mongoose.Promise = global.Promise;
/* mongoose.connect("mongodb+srv://gulhayosayfullayeva:ZfgPyoS9P9TuQy0U@cfdb.2nuttf5.mongodb.net/CFdb?retryWrites=true&w=majority" , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); */
/* mongoose.connect("mongodb+srv://gulhayosayfullayeva:Jafarbek22102014@cluster0.6hiy0jh.mongodb.net/myflixDB?retryWrites=true&w=majority",{
    usenewUrlParser: true,
    useUnifiedToplogy: true
}) */
mongoose.connect("mongodb+srv://gulhayosayfullayeva:ZfgPyoS9P9TuQy0U@cfdb.2nuttf5.mongodb.net/CFdb?retryWrites=true&w=majority" , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/* CORS:(for allowed domains) in order to filter the domains which can request to our server */
const cors = require('cors');
app.use(cors()); /* if there are certain domains, they will be added here */

let auth = require("./auth")(app);

const passport = require("passport");
const { validationResult } = require("express-validator");
require("./passport");

app.use(morgan('common', {
    stream: fs.createWriteStream('./log.txt', {
        flags: 'a'
    })
}));
app.use(morgan('dev'));

/* let topMovies = [{
        title: 'The Lord of the Rings: The Return of the King',
        description: 'Continuing the plot of the previous film, Frodo, Sam and Gollum are making their final way toward Mount Doom in Mordor in order to destroy the One Ring, unaware of Gollum\'s true intentions, while Merry, Pippin, Gandalf, Aragorn, Legolas, Gimli and the rest are joining forces together against Sauron and his legions in Minas Tirith.',
        genre: {
            name: 'fantasy',
            description: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.'
        },
        director: {
            name: 'Peter Jackson',
            bio: 'Sir Peter Robert Jackson is a New Zealand film director, screenwriter and producer.',
            Birthyear: '1961'
        },
        imageUrl: 'https://pixabay.com/images/id-2021410/',
        year: '2003',
        featured: 'yes'
    },
    {
        title: 'Inception',
        description: 'The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets.',
        genre: {
            name: 'science fiction',
            description: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, interstellar travel, time travel, or other technologies.'
        },
        director: {
            name: 'Christopher Nolan',
            bio: 'Christopher Edward Nolan is a British-American filmmaker who is known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century.',
            Birthyear: '1970'
        },
        imageUrl: 'https://pixabay.com/images/id-3265473/',
        year: '2010',
        featured: 'yes'
    },
    {
        title: 'Spirited Away',
        description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
        genre: {
            name: 'anime',
            description: 'Anime is a style of animation originating in Japan that is characterized by stark colorful graphics depicting vibrant characters in action-filled plots often with fantastic or futuristic themes.'
        },
        director: {
            name: 'Hayao Miyazaki',
            bio: 'Hayao Miyazaki is a Japanese animator, director, producer, screenwriter, author, and manga artist.',
            Birthyear: '1941'
        },
        imageUrl: 'https://pixabay.com/images/id-1754734/',
        year: '2001',
        featured: 'yes'
    },
    {
        title: 'The Prestige',
        description: 'The Prestige is based on the 1995 novel by Christopher Priest. It follows Robert Angier and Alfred Borden, rival stage magicians in Victorian London who feud over a perfect teleportation trick.',
        genre: {
            name: 'thriller',
            description: 'Thriller is a genre of fiction with numerous, often overlapping, subgenres, including crime, horror and detective fiction.'
        },
        director: {
            name: 'Christopher Nolan',
            bio: 'Christopher Edward Nolan is a British-American filmmaker who is known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century.',
            Birthyear: '1970'
        },
        imageUrl: 'https://pixabay.com/images/id-233171/',
        year: '2006',
        featured: 'yes'
    },
    {
        title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
        description: 'Blacksmith Will Turner teams up with eccentric pirate "Captain" Jack Sparrow to save his love, the governor\'s daughter, from Jack\'s former pirate allies, who are now undead.',
        genre: {
            name: 'action',
            description: 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
        },
        director: {
            name: 'Gore Verbinski',
            bio: 'Gregor Justin "Gore" Verbinski is an American film director, screenwriter, producer, and musician.',
            Birthyear: '1964'
        },
        imageUrl: 'https://images.app.goo.gl/Q6KMpFhvACebtH2PA',
        year: '2003',
        featured: 'yes'
    },
    {
        title: 'Coco',
        description: 'Aspiring musician Miguel, confronted with his family\'s ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.',
        genre: {
            name: 'musical',
            description: 'Musical film is a film genre in which songs by the characters are interwoven into the narrative, sometimes accompanied by dancing.'
        },
        director: {
            name: 'Lee Unkrich',
            bio: 'Lee Edward Unkrich (born August 8, 1967) is an American film director, film editor, screenwriter, and animator.',
            Birthyear: '1967'
        },
        imageUrl: 'https://images.app.goo.gl/Jx5ymfdFqh7rP6U67',
        year: '2017',
        featured: 'yes'
    },
    {
        title: 'Gone Girl',
        description: 'With his wife\'s disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it\'s suspected that he may not be innocent.',
        genre: {
            name: 'thriller',
            description: 'Thriller is a genre of fiction with numerous, often overlapping, subgenres, including crime, horror and detective fiction.'
        },
        director: {
            name: 'David Fincher',
            bio: 'David Andrew Leo Fincher is an American film director. His films, mostly psychological thrillers, have received 40 nominations at the Academy Awards, including three for him as Best Director.',
            Birthyear: '1962'
        },
        imageUrl: 'https://images.app.goo.gl/MdL5YuL9EF1sfh7B9',
        year: '2014',
        featured: 'yes'
    },
    {
        title: 'Gone with the Wind',
        description: 'Gone with the Wind is a 1939 American epic historical romance film adapted from the 1936 novel by Margaret Mitchell.',
        genre: {
            name: 'romance',
            description: 'Romance films, romance movies, or ship films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters.'
        },
        director: {
            name: 'David Fincher',
            bio: 'Victor Lonzo Fleming was an American film director, cinematographer, and producer.',
            Birthyear: '1889'
        },
        imageUrl: 'https://images.app.goo.gl/MdL5YuL9EF1sfh7B9',
        year: '1939',
        featured: 'yes'
    },
    {
        title: 'Star Wars',
        description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
        genre: {
            name: 'science fiction',
            description: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, interstellar travel, time travel, or other technologies.'
        },
        director: {
            name: 'George Lucas',
            bio: 'George Walton Lucas Jr. is an American filmmaker. Lucas is best known for creating the Star Wars and Indiana Jones franchises and founding Lucasfilm, LucasArts, Industrial Light & Magic and THX.',
            Birthyear: '1944'
        },
        imageUrl: 'https://images.app.goo.gl/npzmKEErmkW571eM7',
        year: '1977',
        featured: 'yes'
    },
    {
        title: 'Avatar: The Way of Water',
        description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
        genre: {
            name: 'action',
            description: 'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
        },
        director: {
            name: 'James Cameron',
            bio: 'James Francis Cameron is a Canadian filmmaker, who is a major figure in the post-New Hollywood era, he is considered one of the industry\'s most innovative filmmakers, regularly pushing the boundaries of cinematic capability with his use of novel technologies.',
            Birthyear: '1954'
        },
        imageUrl: 'https://images.app.goo.gl/vLw2cKVqEzEZYDto7',
        year: '2022',
        featured: 'yes'
    },
];

https://myflix-x2py.onrender.com/
 */
/* Middleware functions */
let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};

let requestedTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};

app.use(myLogger);
app.use(requestedTime);
app.use(express.static('public'));



/* Checking the url path according to the request, then responding */
app.get("/", (req, res) => {
    let res_Text = "Welcome!!!!!!!!!!!!!";
    res_Text += "Requested: " + req.requestTime;
    res.send(res_Text);
});

/**
 * @description Get the documentation
 * @returns
 * documentation.html file 
 */
app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html", {
        root: __dirname
    });
});

/**
 * @description Get all movies 
 * @example
 * Authentication: Bearer token (JWT)
 * @name API: GET /movies
 * @example
 * Response format: JSON object including the list of the movies  
 */
app.get("/movies", passport.authenticate("jwt", {session: false}), (req, res) => {
    Movies.find().then(movies => {
        res.json(movies);
        res.send("Good");
        console.log(movies);
    })

});
/**
 * @description Get all users 
 * @example
 * Authentication: none
 * @name
 * API: GET /users
 * @example
 * Response format: JSON object including the list of all the users  
 */
app.get("/users",  (req, res) => {
    Users.find().then(users => {
        res.json(users);
    })

});

/**
 * @description Get a movie according to the title 
 * @example
 * Authentication: Bearer token (JWT)
 * @name API: GET /movies/:title
 * @example
 * Response format: JSON object containing the movie with the given title  
 */
app.get('/movies/:title', passport.authenticate("jwt", {session: false}),(req, res) => {
    Movies.findOne({
        title: req.params.title
    }, function (error, result) {
        if (error) {
            console.error(error);
            res.status(500).send("Error: " + error);
        } else {
            res.json(result);
        }
    });

});



/**
 * @description Get details of the movie genre 
 * @example
 * Authentication: Bearer token (JWT)
 * @name API: GET /movies/genreName/:name
 * @example
 * Response format: JSON object containing the genre object of movie  
 */
app.get("/movies/genreName/:name", passport.authenticate("jwt", {session: false}),(req, res) => {
    Movies.findOne({
        "genre.name": req.params.name
    }, function (error, result) {
        if (error) {
            console.error(error);
            res.status(500).send("Error: " + error);
        } else {
            res.json(result.genre);
        }
    });
});


/**
 * @description Get details of the movie director
 * @example
 * Authentication: Bearer token (JWT)
 * @name API: GET /movies/directors/:directorName
 * @example
 * Response format: JSON object containing the director object  
 */
app.get("/movies/directors/:directorName", passport.authenticate("jwt", {session: false}),(req, res) => {
    Movies.findOne({
        "director.name": req.params.directorName
    }, function (error, result) {
        if (error) {
            console.error(error);
            res.status(500).send("Error: " + error);
        } else {

            res.json(result.director);
        }
    });

});

/**
 * @description Post the user
 * @example
 * Authentication: none
 * @name API: POST /users
 * @example
 * Request body format: a JSON object holding the user data
 * @example
 * JSON object containing the registered user object   
 */
app.post("/users",
        [
            check("username", "username required").isLength({min:5}),
            check("username", "username should contain only alphanumeric").isAlphanumeric(),
            check("password", "password required").not().isEmpty(),
            check("email", "email should be valid").isEmail()
        ],(req, res) => {
    let errors = validationResult(req);    
    let hashedPassword = Users.hashPassword(req.body.password);
    if( !errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    Users.findOne({
        "username": req.body.username
    }, function (error, result) {
        if (result) {
            res.status(400).send(req.body.username + "already exists!!!!");
        } else {
            Users.create({
                "username": req.body.username,
                "password": hashedPassword,
                "email": req.body.email,
                "birthday": req.body.birthday
            }, (error, created) => {
                if (error) {
                    res.status(500).send("Error: " + error);
                } else {
                    res.json(created);
                }
            });
        }
    });
});

/**
 * @description Update user with the given username 
 * @example
 * Authentication: Bearer token (JWT)
 * @name API: PUT /users/:username
 * @example
 * Request body format: a JSON object holding the updated user data
 * @example
 * JSON object containing the updated user data  
 */
app.put("/users/:username", passport.authenticate("jwt", {session: false}), (req, res) => {
    let hashedPassword = Users.hashPassword(req.body.password);
    Users.findOneAndUpdate({
        "username": req.params.username
    }, {
        $set: {
            "username": req.body.username,
            "password": hashedPassword,
            "email": req.body.email,
            "birthday": req.body.birthday
        }
    }, {
        new: true
    }, (error, updatedUser) => {
        if (error) {
            res.status(500).send("Error: " + error);
        } else {
            console.log(req.body.username);
            console.log(updatedUser);
            res.json(updatedUser);
        }
    });
});
/**
 * @description Add movie to the favouriteList 
 * @example
 * Authentication: Bearer token (JWT)
 * @name API: POST /users/:username/:favouriteMovieId
 * @example
 * JSON object containing the updated user data  
 */
app.post("/users/:username/:favouriteMovieId", passport.authenticate("jwt", {session: false}),(req, res) => {
    Users.findOneAndUpdate({
        "username": req.params.username
    }, {
        $push: {
            "favourite_movies": req.params.favouriteMovieId
        }
    }, {
        new: true
    }, (error, updatedUser) => {
        if (error) {
            res.status(500).send("Error: " + error);
        } else {
            res.json(updatedUser);
        }
    });
});
/**
 * @description Delete movie from the favouriteList 
 * @example
 * Authentication: Bearer token (JWT)
 * @name API: DELETE /users/:username/:favouriteMovieId
 * @example
 * JSON object containing the updated user data  
 */
app.delete("/users/:username/:favouriteMovieId",passport.authenticate("jwt", {session: false}), (req, res) => {
    Users.findOneAndUpdate({
        "username": req.params.username
    }, {
        $pull: {
            "favourite_movies": req.params.favouriteMovieId
        }
    }, {
        new: true
    }, (error, updatedUser) => {
        if (error) {
            res.status(500).send("Error: " + error);
        } else {
            res.json(updatedUser);
        }
    })
});

/**
 * @description Delete user with the given username 
 * @example
 * Authentication: Bearer token (JWT)
 * @name API: DELETE /users/:username
 * @example
 * Response format: message about deletion  
 */
app.delete("/users/:username", passport.authenticate("jwt", {session: false}),(req, res) => {
    Users.findOneAndRemove({
        "username": req.params.username
    }, (error, user) => {
        if (error) {
            res.status(500).send("Error: " + error);
        } else if (!user) {
            res.status(400).send("User with: " + req.params.username + "username not found!!!");

        } else {
            res.send(req.params.username + "is deleted ");
        }
    })
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});