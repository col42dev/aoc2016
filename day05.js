'use strict';

let fs = require('fs');
let _ = require('underscore');
let crypto = require('crypto');

module.exports = {
    parts: [ 
        function() {
            let data = fs.readFileSync('./data/day05.txt', 'utf8').toString();
            let password = part1(data, 0, '');
            console.log('password:' + password); //801b56a7
        },

        function() {
            let data = fs.readFileSync('./data/day05.txt', 'utf8').toString();
            let password = part2(data, 0, {});
            console.log('password:' + password);
        }],
}

function part1(data, index, password) {
    let current = '';
    [current, index] = nextHashMatch(data, current, index);
    password += current.split('')[5];
    return (password.length === 8)  ? password : part1(data, index+1, password);
}

function part2(data, index, password) {
    let current = '';
    [current, index] = nextHashMatch(data, current, index);
    let pos = parseInt(current.split('')[5], 16);
    if (pos < 8) {
        if (!password.hasOwnProperty(pos.toString())) {
            password[pos.toString()] = current.split('')[6];  
        }
    }

    if (Object.keys(password).length === 8) {
        password = Object.keys(password).reduce(function (previous, key) {
                return previous + password[key];
            }, '');       
    }

    return (Object.keys(password).length === 8) ? password : part2(data, index+1, password);
}

function nextHashMatch (data, current, index) {
    current = crypto.createHash('md5').update(data + index).digest('hex');
    index += 1;
    return (current.indexOf('00000') === 0) ? [current, index] : nextHashMatch(data, current, index);              
};


