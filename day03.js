let fs = require('fs');
let _ = require('underscore');


module.exports = {

    parts: [ 
        function() {
            console.log('PART1');
            let possibleCount = fs.readFileSync('./data/day03.txt', 'utf8')
            .toString()
            .split('\n')
            .map( function(currentValue, index, array ) {
                let matches = /(\d+)\s*(\d+)\s*(\d+)/.exec(currentValue);
                matches.shift();
                return  matches.map( function( currentDatum) { 
                    return parseInt(currentDatum); 
                })
                .sort(function(a, b){
                    return a - b;
                });
            })
            .filter( function(element, index, array ) {
                return element[0] + element[1] > element[2]; 
            }).length;
            
            console.log(possibleCount);
        },
        function() {

            console.log('PART2');

            let possibleCount = 0;
               
            _.each( 
                _.groupBy( 
                    fs.readFileSync('./data/day03.txt', 'utf8')
                    .toString()
                    .split('\n')
                    .map( function(currentValue, index, array ) {
                            let matches = /(\d+)\s*(\d+)\s*(\d+)/.exec(currentValue);
                            matches.shift();
                            return  matches.map( function( currentDatum) { 
                                return parseInt(currentDatum); 
                            });
                    }),
                    function(currentValue, index) {
                            return Math.floor(index/3);
                    }), 
                function( currentTuple, currentTupleIndex, currentTupleList) {
                    possibleCount +=  
                    _.each( _.zip.apply(_, currentTuple), function(currentTransposedDatum) {
                        currentTransposedDatum.sort(function(a, b) {
                            return a - b;
                        });
                    })
                    .filter( function(element, index, array ) {
                        return element[0] + element[1] > element[2]; 
                    }).length;
            });    

            console.log( possibleCount);
        }]
}