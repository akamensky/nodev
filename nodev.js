#!/usr/bin/env node
'use strict';

var options = require('./options');
var nodemon = require('nodemon');
var fork = require('child_process').fork;
var inspector = false;

process.argv = process.argv.slice(2);

var new_args = [];
var debug_set_flag = false;
for(var i=0; i < process.argv.length; i++){
	var arg = process.argv[i];
	if(arg.indexOf('--debug-brk') == 0 && debug_set_flag == false){
		new_args.push('--debug-brk='+options.debug_port);
		debug_set_flag = true;
	}else if(arg.indexOf('--debug') == 0 && debug_set_flag == false){
		new_args.push('--debug='+options.debug_port);
		debug_set_flag = true;
	} else {
		new_args.push(arg);
	}
}

if(!debug_set_flag){
	new_args.unshift('--debug='+options.debug_port);
}

process.argv = new_args;

var str = ' ';
for(var i=0; i < process.argv.length; i++){
	str += process.argv[i] + ' ';
}

nodemon(str);

nodemon.on('start', function(){
	if(inspector != false) return;
	var inspectorArgs = ['--debug-port='+options.debug_port, '--web-port='+options.web_port];
	var forkOptions = { silent: false };
	inspector = fork(
		require.resolve('node-inspector/bin/inspector'),
		inspectorArgs,
		forkOptions
	);
}).on('restart', function(){
	console.warn('Please refresh node-inspector window...');
}).on('quit',function(){
	
});





