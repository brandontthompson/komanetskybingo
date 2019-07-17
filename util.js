config = require('./config')
exports.getNewNum = (array) => {
    return Math.floor(Math.random() * array.length);
}

exports.generate = (filled) =>  {
    let data = []
    for(let i=0; i < 24; i++) {
        data.push(this.setSquare(i, filled));
    }
    return data;
};

exports.setSquare = (thisSquare, filled) => {
    let tile = "square"+thisSquare;
    let tilenumber;
    // let colPlace = new Array(0,1,2,3,4,0,1,2,3,4,0,1,3,4,0,1,2,3,4,0,1,2,3,4);
    do {
        tilenumber = this.getNewNum(config.strings)
        label = config.strings[tilenumber];
    } while (filled[tilenumber]);
    
    filled[tilenumber] = true;
    return ({ tile, label });
}

exports.setpattern = () => {
    return config.patterns[this.getNewNum(config.patterns)];
}