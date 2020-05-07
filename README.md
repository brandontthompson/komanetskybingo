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
}```

