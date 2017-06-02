#!/usr/bin/env node

'use strict';

var resolve = require('json-refs').resolveRefs;
var YAML = require('yaml-js');
var fs = require('fs');
var parser = require('swagger-parser');

var root = YAML.load(fs.readFileSync('swagger.yaml').toString());
var options = {
    filter: ['relative', 'remote'],
    loaderOptions: {
        processContent: function(res, callback) {
            callback(null, YAML.load(res.text));
        }
    }
};
resolve(root, options).then(function(results) {
    if (!fs.existsSync('output/')) {
        fs.mkdirSync('output/');
    }
    fs.writeFile('output/swagger.json', JSON.stringify(results.resolved, null, 2), null, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.info('Created swagger file at output/swagger.json');
    parser.validate("output/swagger.json")
        .then(function(api) {
            console.log('Yay! The API is valid.');
        })
        .catch(function(err) {
            console.error('Onoes! The API is invalid. ' + err.message);
            process.exit(1);
        });
});