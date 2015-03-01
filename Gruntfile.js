module.exports = function (grunt) {

	'use strict';
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js', 'specs/**/*.js']
		},
		
		jasmine: {
			source: {
				src: 'src/**/*.js',
				options: {
					specs: 'specs/*Spec.js'
				}
			},
			dist: {
				src: 'dist/**/*.js',
				options: {
					specs: 'specs/*Spec.js'
				}
			},
			dist_min: {
				src: 'dist/**/*.min.js',
				options: {
					specs: 'specs/*Spec.js'
				}
			}
		},
		
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
							  '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		
		uglify: {
			options: {
				mangle: false
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
				}
			}
		},
		
		clean: {
			dist: ['dist']
		},
		
		watch: {
			options: {
				reload: true
			},
			jshint: {
				files: '<%= jshint.all %>',
				tasks: ['jshint']
			},
			jasmine: {
				files: ['<%= jasmine.source.src %>', '<%= jasmine.source.options.specs %>'],
				tasks: ['jasmine:source']
			}
		}

	});

	// load npm modules
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// register tasks
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['clean', 'concat', 'uglify', 'jasmine:dist', 'jasmine:dist_min']);

};
