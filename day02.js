let fs = require('fs');
let _ = require('underscore');

let data = fs.readFileSync('./data/day02.txt', 'utf8');
data = data.toString().split('\n');


module.exports = {

    parts: [ 
        function() {
            console.log('PART1');
            let lpadPos = 4;
            let padOp = {
                'L' : function(padPos) {
                    if (Math.floor(padPos/3) === Math.floor((padPos-1)/3)) {
                        padPos -= 1;
                    }

                    return padPos;
                },
                'R' : function(padPos) {
                    if (Math.floor(padPos/3) === Math.floor((padPos+1)/3)) {
                        padPos += 1;
                    }

                    return padPos;
                },
                'U' : function(padPos) {
                    if (padPos - 3 >= 0) {
                        padPos -= 3;
                    }

                    return padPos;
                },
                'D' : function(padPos) {
                    if (padPos + 3 <= 8) {
                        padPos += 3;
                    }

                    return padPos;
                }
            };
            
            _.each(data, function(rowDatum, rowDatumIndex, rowDatumList) {
                _.each(rowDatum, function(datum, datumIndex, datumList) { 
                    if (padOp.hasOwnProperty(datum)) {
                        lpadPos = padOp[datum](lpadPos);
                    } 
                });
                console.log(lpadPos+1 +', ');
            });
        },
        function() {

            console.log('PART2');
            let lpadPos = {row:2, col:0};
            let pad = [
                ['0','0','1','0','0'],
                ['0','2','3','4','0'],
                ['5','6','7','8','9'],
                ['0','A','B','C','0'],
                ['0','0','D','0','0'],
            ];

            let padOp = {
                'L' : function(padPos) {
                    if (padPos.col > 0 && pad[padPos.row][padPos.col-1] !== '0') {
                        padPos.col -= 1;
                    }

                    return padPos;
                },
                'R' : function(padPos) {
                    if (padPos.col < 4 && pad[padPos.row][padPos.col+1] !== '0') {
                        padPos.col += 1;
                    }

                    return padPos;
                },
                'U' : function(padPos) {
                    if (padPos.row > 0 && pad[padPos.row-1][padPos.col] !== '0') {
                        padPos.row -= 1;
                    }

                    return padPos;
                },
                'D' : function(padPos) {
                    if (padPos.row < 4 && pad[padPos.row+1][padPos.col] !== '0') {
                        padPos.row += 1;
                    }

                    return padPos;
                }
            };     

            _.each(data, function(rowDatum, rowDatumIndex, rowDatumList) {
                _.each(rowDatum, function(datum, datumIndex, datumList) { 
                    if (padOp.hasOwnProperty(datum)) {
                        lpadPos = padOp[datum](lpadPos);
                    } 
                });
                console.log(pad[lpadPos.row][lpadPos.col] +', ');
            });
        }]
}


//73341