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
                    let rotation = (matches[1] === 'L') ? -1 : 1;
                    direction.applyAxisAngle( zAxis, rotation * Math.PI / 2 );    
                    pos.addScaledVector(direction, parseInt(matches[2]));
                    pos = new THREE.Vector3(Math.round(pos.x), Math.round(pos.y), 0);
                }
            });

            console.log('PART 1:');
            console.log(Math.abs(pos.x) + Math.abs(pos.y));
        },
        function() {
            let direction =  new THREE.Vector3( 0, 1, 0 );
            let zAxis = new THREE.Vector3( 0, 0, 1 );
            let pos =  new THREE.Vector3( 0, 0, 0 );
            let visted = [{x: pos.x, y: pos.y}];
            _.every(data, function(datum, datumIndex, datumList) { 
                let matches =/^([L|R])(.*)/.exec(datum);  
                if (matches) {
                    let rotation = (matches[1] === 'L') ? -1 : 1;
                    direction.applyAxisAngle( zAxis, rotation * Math.PI / 2 );
                    direction = new THREE.Vector3(Math.round(direction.x), Math.round(direction.y), 0);
                    return _.every(_.range(parseInt(matches[2])), function() {
                        pos.add(direction);
                        if (_.where(visted, {x:pos.x,y:pos.y}).length) {
                            console.log( 'PART 2:');     
                            console.log(  Math.abs(pos.x) + Math.abs(pos.y));            
                            return false;              
                        } 
                        visted.push({x:pos.x, y:pos.y});  
                        return true;              
                    });
                }
            });
        }]
}


