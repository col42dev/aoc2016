'use strict';

let fs = require('fs');
let _ = require('underscore');

module.exports = {
    parts: [ 
        function() {

            let setTLS = _.filter(
                fs.readFileSync('./data/day07.txt', 'utf8').split('\r\n'), 
                function(rowData, rowDataIndex, rowDataList) { 
                    if (function hyperHasNetABBA() {
                        let regex = /\[([a-z]*)\]/g;
                        let match = [];
                        while (match = regex.exec(rowData)) {
                            if (isABBA(match[0])) {
                                return true;
                            }
                        }    

                        return false;         
                    }()){
                        return false;       
                    } else {
                        if (_.some(rowData.replace(/\[([a-z]*)\]/g, ',').split(','), function(current) {
                            return isABBA(current);
                        })) {
                            return true;    
                        } 

                        return false;                                    
                    }
                }); 

            console.log(setTLS.length); //118
        },

        function() {

            let setSSL = _.filter(
                fs.readFileSync('./data/day07.txt', 'utf8').split('\r\n'), 
                function isSSL(rowData, rowDataIndex, rowDataList) { 
    
                    return _.reduce(
                        rowData.replace(/\[([a-z]*)\]/g, ',').split(','), 
                        function getMatchedABAs(matchedABAtotal, currentSupernet) {                           
                            matchedABAtotal.push(function getABAmatches(testString) {
                                var regex = RegExp('([a-z])([a-z])\\1', 'g');
                                let matches = [];
                                let match = [];
                                while( match = regex.exec(testString)) {
                                    regex.lastIndex = match.index + 1;  
                                    if (match[0][0] !== match[0][1]) {
                                        matches.push(match);
                                    }
                                }

                                return matches;
                            }(currentSupernet));

                            return matchedABAtotal;
                        }, [])               
                        .reduce(function matchedABAsWithBABs(matchedBABs, currentMatchedABAs) {
                                return currentMatchedABAs.reduce(function(totalABA, currentMatchedABA) {
                                        let bab = function abaToBab(aba) { 
                                            let bab = aba.split('');
                                            bab.shift();
                                            bab.push( bab[0] );
                                            bab = bab.join('');
                                            return bab;
                                        }(currentMatchedABA[0]);

                                        let regex = /\[([a-z]*)\]/g;
                                        let match = [];
                                        while (match = regex.exec(rowData)) {
                                            if (match[0].indexOf(bab) !== -1) {
                                                totalABA.push(match);
                                            }
                                            regex.lastIndex = match.index + 1;  
                                        }

                                        return totalABA;
                                    }, matchedBABs);
                            }, [])
                            .length;
                        });

            console.log(setSSL.length); //260
        }]
}

function isABBA(testString) {
    var regex = /([a-z])([a-z])\2\1/g;
    let matches = [];
    let match = [];
    while( match = regex.exec(testString)) {
        regex.lastIndex = match.index + 1;  
        if (match[0][0] !== match[0][1]) {
            matches.push(match);
        }
    }

    return (matches.length > 0) ? true : false;
}
