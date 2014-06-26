#!/usr/bin/env node
'use strict';

var nodemon = require('nodemon');
var ps = require('portscanner');
var async = require('async');
var fork = require('child_process').fork;

var options = require('./options');

var inspector = false;

var debug_port = 0;
var web_port = 0;

async.series([find_ports, main_part]);


function find_ports(callback){
	ps.findAPortNotInUse(options.port_range_start, options.port_range_end, '127.0.0.1', function(err, port){
		debug_port = port;
		ps.findAPortNotInUse(debug_port+1, options.port_range_end, '127.0.0.1', function(err, port){
			web_port = port;
			callback();
		});
	});
}


function main_part(callback){

	process.argv = process.argv.slice(2);

	var new_args = [];
	var debug_set_flag = false;
	for(var i=0; i < process.argv.length; i++){
		var arg = process.argv[i];
		if(arg.indexOf('--debug-brk') == 0 && debug_set_flag == false){
			new_args.push('--debug-brk='+debug_port);
			debug_set_flag = true;
		}else if(arg.indexOf('--debug') == 0 && debug_set_flag == false){
			new_args.push('--debug='+debug_port);
			debug_set_flag = true;
		} else {
			new_args.push(arg);
		}
	}

	if(!debug_set_flag){
		new_args.unshift('--debug='+debug_port);
	}

	process.argv = new_args;

	var str = ' ';
	for(var i=0; i < process.argv.length; i++){
		str += process.argv[i] + ' ';
	}

	nodemon(str);

	nodemon.on('start', function(){
		if(inspector != false) return;
		var inspectorArgs = ['--debug-port='+debug_port, '--web-port='+web_port, '--no-preload', '--save-live-edit'];
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
	callback();
}



