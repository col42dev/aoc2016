'use strict';

let fs = require('fs');
let _ = require('underscore');

module.exports = {
    parts: [ 
        function() {
            console.log( day5('shift'));                                                       
        },

        function() {
            console.log( day5('pop'));                                                       
        }]
}

function day5(operator) {
    return _.each(
            _.map( _.zip.apply(_, _.map(  fs.readFileSync('./data/day06.txt', 'utf8').split('\r\n'), function(row) {
                    return row.split('');
                })),
                function(currentRow) {
                    return _.groupBy(currentRow, function(currentValue, index) {
                            return currentValue;
                        });                   
                }),
        function(currentGroupBy, currentGroupByIndex, currentGroupByList) {
                _.each(currentGroupBy, function(currentRowValue, currentRowIndex ) {
                        currentGroupBy[currentRowIndex] = currentRowValue.length;                  
                    });

                currentGroupByList[currentGroupByIndex] = Object.keys(currentGroupBy).sort(function(a,b) {
                        return currentGroupBy[b]-currentGroupBy[a];
                    })[operator]();
            })
            .join('');                        
}