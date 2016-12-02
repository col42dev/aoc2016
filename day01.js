let fs = require('fs');
let _ = require('underscore');
let THREE = require('three');

let data = fs.readFileSync('./data/day01.txt', 'utf8');
data = data.toString().split(', ');

module.exports = {

    parts: [ 
        function() {
            let direction =  new THREE.Vector3( 0, 1, 0 );
            let zAxis = new THREE.Vector3( 0, 0, 1 );
            let pos =  new THREE.Vector3( 0, 0, 0 );

            _.each(data, function(datum, datumIndex, datumList) { 
                let matches =/^([L|R])(.*)/.exec(datum);  
                if (matches) {
                    let dir = (matches[1] === 'L') ? -1 : 1;
                    direction.applyAxisAngle( zAxis, dir * Math.PI / 2 );    
                    pos.addScaledVector(direction, parseInt(matches[2]));
                }
            });

            console.log('PART 1:');
            console.log(Math.abs(pos.x) + Math.abs(pos.y));
        },
        function() {

            let direction =  new THREE.Vector3( 0, 1, 0 );
            let zAxis = new THREE.Vector3( 0, 0, 1 );
            let pos =  new THREE.Vector3( 0, 0, 0 );
            let found = false;
            let visted = [];
            visted.push({x: pos.x, y: pos.y});

            _.each(data, function(datum, datumIndex, datumList) { 
                if (found) {
                    return;
                }        
                let matches =/^([L|R])(.*)/.exec(datum);  
                if (matches) {
                    let dir = (matches[1] === 'L') ? -1 : 1;
                    direction.applyAxisAngle( zAxis, dir * Math.PI / 2 );
                    direction.x = Math.round(direction.x);
                    direction.y = Math.round(direction.y);
                    let distance = parseInt(matches[2]);   
                    _.each(_.range(distance), function() {
                        pos.add(direction);

                        if (_.where(visted, {x:pos.x,y:pos.y}).length) {
                            found = true;
                            console.log( 'PART 2:');     
                            console.log(  Math.abs(pos.x) + Math.abs(pos.y));            
                        } 

                        visted.push({x:pos.x, y:pos.y});                
                    });
                }
            });
        }]
}


