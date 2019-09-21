config = require('./config')
exports.getNewNum = (array) => {
    return Math.floor(Math.random() * array.length);
}

exports.generate = (filled) =>  {
    let data = [];
    for(let i=0; i < 24; i++) {
        data.push(this.setSquare(i, filled));
    }
    return data;
};

exports.checkcard = (array) => {
    
    // let data = [];
    // for (let index = 0; i < 5; index++) {
    //     const element = array[index];
    //     if(element){
    //         i = index;
    //         // let j = 0
    //         for (let j = 0; i < array.length; i+=6) {
    //             const element = array[i];
    //             data[j] = element;
    //             j++
    //         }
    //         console.log(data);
    //         if(!data.includes(0)){
    //             return 1;
    //         }
    //     }
    // }


    let i = 0;
    let data = [];
    // check horizontal
    for (let index = 0; index < array.length; index+=5) {
        const element = array[index];
        if(element){
            i = index;
            // let j = 0
            for (let j = 0; j < 5; i++) {
                const element = array[i];
                data[j] = element;
                j++
            }
            if(!data.includes(0)){
                return 1;
            }
        }
    }
    i = 0;
    data = [];
    // check vertical
    for (let index = 0; index < 5; index++) {
        const element = array[index];
        if(element){
            i = index;
            for (let j = 0; i < array.length; i+=5) {
                const element = array[i];
                data[j] = element;
                j++
            }
            if(!data.includes(0)){
                return 1;
            }
        }
    }
    return 0;
}

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