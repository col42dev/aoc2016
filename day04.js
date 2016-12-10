'use strict';

let fs = require('fs');
let _ = require('underscore');

module.exports = {
    parts: [ 
        function() {
            let data = fs.readFileSync('./data/day04.txt', 'utf8');
            data = data.toString().split('\n');
            let sectorIDsum = 0;
            
            _.each(data, function(rowData, rowDataIndex, rowDataList) { 

                    let matches = rowData.match(/^([a-z|\-])*([0-9]*)\[([a-z]*)\]/);  
                    if (matches !== null) {
                        let checksum = matches[matches.length-1];
                        let sectorID = parseInt(matches[matches.length-2]);

                        let room = _.groupBy(
                                [rowData].map( function(currentValue, index, array) {
                                    let room = '';
                                    let r = /([a-z]*)\-/g;
                                    let match;
                                    while ((match = r.exec(rowData)) != null) {
                                        room += match[1];
                                    }

                                    return room;
                                })[0]
                                .split('')
                                .sort(),
                            function(value) {
                                return value;
                            });                    

                        if (Object.keys(room).map(function (currentValue, index, array) { 
                                return { key: currentValue, count:room[currentValue].length}; 
                            })
                            .sort(function(a, b) {
                                if (a.count < b.count) {
                                    return 1;
                                } else if (a.count > b.count) {
                                    return -1;
                                } else if (a.key < b.key) {
                                    return -1;
                                } else if (a.key > b.key) {
                                    return 1;
                                }
                                
                                return 0;
                            })                       
                            .splice(0, 5)
                            .reduce( function( total, currentValue, currentIndex, arr) {
                                return currentValue.key + total;
                            }, '')
                            .split('')
                            .reverse()
                            .join('') === checksum) { 

                            sectorIDsum += sectorID;
                        }
                    }
            });

            console.log(sectorIDsum);            
        },
        function() {

            let data = fs.readFileSync('./data/day04.txt', 'utf8');
            data = data.toString().split('\n');
            
            _.each(data, function(rowData, rowDataIndex, rowDataList) { 

                    let matches = rowData.match(/^([a-z|\-])*([0-9]*)\[([a-z]*)\]/);  
                    if (matches !== null) {
                        let checksum = matches[matches.length-1];
                        let sectorID = parseInt(matches[matches.length-2]);

                        let room = _.groupBy(
                                [rowData].map( function(currentValue, index, array) {
                                    let room = '';
                                    let r = /([a-z]*)\-/g;
                                    let match;
                                    while ((match = r.exec(rowData)) != null) {
                                        room += match[1];
                                    }

                                    return room;
                                })[0]
                                .split('')
                                .sort(),
                            function(value) {
                                return value;
                            });                    

                        if (Object.keys(room).map(function (currentValue, index, array) { 
                                return { key: currentValue, count:room[currentValue].length}; 
                            })
                            .sort(function(a, b) {
                                if (a.count < b.count) {
                                    return 1;
                                } else if (a.count > b.count) {
                                    return -1;
                                } else if (a.key < b.key) {
                                    return -1;
                                } else if (a.key > b.key) {
                                    return 1;
                                }
                                
                                return 0;
                            })                       
                            .splice(0, 5)
                            .reduce( function( total, currentValue, currentIndex, arr) {
                                return currentValue.key + total;
                            }, '')
                            .split('')
                            .reverse()
                            .join('') === checksum) { 
                                if (_.map( rowData.split(''), function(charData, charDataIndex, charDataList) {
                                    if (charData == '-') {
                                        return ' ';
                                    } else if (charData.match(/[a-z]/)) {
                                        return function( letter, amount) {
                                            for (i =0; i < amount; i ++) {
                                                letter = String.fromCharCode(letter.charCodeAt(0) + 1);
                                                if (letter == '{') {
                                                    letter = 'a';
                                                }
                                            }
                                            return letter;
                                        }(charData, sectorID); 
                                    }

                                    return '';
                                })
                                .join('')
                                .indexOf('northpole object storage') !== -1) {
                                    console.log(sectorID);     
                                }                            
                            }
                        }
            });            
        }]
}