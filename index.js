const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();


app.use(morgan('common', {
    stream: fs.createWriteStream('./log.txt', {flags: 'a'})
}));
app.use(morgan('dev'));

let topMovies = [
    {
        title: 'The Lord of the Rings: The Return of the King', 
        description: 'Continuing the plot of the previous film, Frodo, Sam and Gollum are making their final way toward Mount Doom in Mordor in order to destroy the One Ring, unaware of Gollum\'s true intentions, while Merry, Pippin, Gandalf, Aragorn, Legolas, Gimli and the rest are joining forces together against Sauron and his legions in Minas Tirith.',
        genre: 
        {
            name: 'fantasy',
            description: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.'
        },
        director: 
        {
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
        director: 
        {
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
        director: 
        {
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
        director: 
        {
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
        director: 
        {
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
        director: 
        {
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
        director: 
        {
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
        director: 
        { 
            name: 'Victor Fleming',
            bio: 'Victor Lonzo Fleming was an American film director, cinematographer, and producer.',
            Birthyear: '1889'
        },
        imageUrl: 'https://images.app.goo.gl/MdL5YuL9EF1sfh7B9',
        year:'1939',
        featured: 'yes'
    },
    {
        title: 'Star Wars', 
        description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
        genre: {
            name: 'science fiction',
            description: 'Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, interstellar travel, time travel, or other technologies.'
        },
        director: 
        {
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
        director: 
        {
            name: 'James Cameron', 
            bio: 'James Francis Cameron is a Canadian filmmaker, who is a major figure in the post-New Hollywood era, he is considered one of the industry\'s most innovative filmmakers, regularly pushing the boundaries of cinematic capability with his use of novel technologies.',
            Birthyear: '1954'
        },
        imageUrl: 'https://images.app.goo.gl/vLw2cKVqEzEZYDto7',
        year: '2022',
        featured: 'yes'
    },
];

/* Middleware functions */
let myLogger = (req, res, next)=>{
    console.log(req.url);
    next();
};

let requestedTime = (req, res, next)=>{
    req.requestTime = Date.now();
    next();
};

app.use(myLogger);
app.use(requestedTime);
app.use(express.static('public'));



/* Checking the url path according to the request, then responding */
app.get("/", (req, res)=>{
    let res_Text = "Welcome!!!";
    res_Text += "Requested: " + req.requestTime;
    res.send(res_Text);
});

/*  Request to get the documentation of the application */
app.get("/documentation", (req, res)=>{
    res.sendFile("public/documentation.html", {root: __dirname}); 
});

/* Request to get the list of  all movies */
app.get("/movies", (req, res)=>{
    res.json(topMovies);
});

/* Request to get the movie according to the its title */
app.get("/movies/:title", (req, res)=>{
    res.json(topMovies.find( (movie)=>{
        return movie.title === req.params.title
    }));
});

/* Request to get the movie genre(description) according to the its title */
app.get("/movies/:title/genreName", (req, res)=>{
    res.json(topMovies.find( (movie)=>{
        return movie.title === req.params.title
    }).genre);
});

/* Request to get the director info according t his name */
app.get("/movies/director/:directorName", (req, res)=>{
    res.json(topMovies.find( (movie)=>{
        return movie.director.name === req.params.directorName
    }).director);
});

/* Request to register new user */
app.post("/users", (req, res)=>{
    res.send("User is successfully added!!!");
});

/* Request to update the user info with given id */
app.put("/users/:id", (req, res)=>{
    res.send("User info is successfully updated!!!");
});

/* Request to add a movie to the favourite list of the  user with given id */
app.post("/users/:id/:favouriteMovie", (req, res)=>{
    res.send("Movie is added to the favouritelist of the user!!!");
});

/* Request to delete a movie from the favourite list of the  user with given id */
app.delete("/users/:id/:favouriteMovie", (req, res)=>{
    res.send("Movie is deleted from the favouritelist of the user!!!");
});

/* Request to delete the  user with given id from the userlist */
app.delete("/users/:id", (req, res)=>{
    res.send("User with id: " + req.params.id +" is deleted from the userlist!!!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, ()=>{
    console.log("Server is listening on port 8080");
});
