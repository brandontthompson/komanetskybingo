# komanetskybingo

## interactive bingo game!

fill out the card as while the professor lectures

## Public API Endpoint

````/generate
GET http://komanetsky.com:4000/generate

{
    "data": [
        {
            "tile": "square0", <<<< square ID
            "label": "some message" <<< the text
        },
        ...
    ]
}
````

# How to read the structure

## index.js
This is the main server file, this contains the REST api along with websockets

## util.js
this contains the card check functions

## config/index.js
this is where the main server pull card info and setup info

## public/*
this is the public HTML for the site

