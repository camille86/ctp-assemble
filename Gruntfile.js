/*
 * Generated on 2017-08-11
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2017 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

	config: {
	  src: 'src',
	  dist: 'dist'
	},

	bower: {
		install: {
			options: {
				targetDir: '<%= config.dist %>/assets',
				verbose: true,
				copy: true,
				layout: 'byType',
                flatten: true
				// bowerOptions: {}
			}
		}
	},

	watch: {
	  assemble: {
		files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
		tasks: ['assemble']
	  },
	  livereload: {
		options: {
		  livereload: '<%= connect.options.livereload %>'
		},
		files: [
		  '<%= config.dist %>/{,*/}*.html',
		  '<%= config.dist %>/assets/{,*/}*.css',
		  '<%= config.dist %>/assets/{,*/}*.js',
		  '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
		]
	  }
	},

	connect: {
	  options: {
		port: 9000,
		livereload: 35729,
		// change this to '0.0.0.0' to access the server from outside
		hostname: 'localhost'
	  },
	  livereload: {
		options: {
		  open: true,
		  base: [
			'<%= config.dist %>'
		  ]
		}
	  }
	},

	assemble: {
	  pages: {
		options: {
		  flatten: true,
		  assets: '<%= config.dist %>/assets',
		  layout: '<%= config.src %>/templates/layouts/default.hbs',
		  data: '<%= config.src %>/data/*.{json,yml}',
		  partials: '<%= config.src %>/templates/partials/*.hbs',
		  plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
		},
		files: {
		  '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs'],
          '<%= config.dist %>/pages/': ['<%= config.src %>/templates/pages/sectors/*.hbs']
		}
	  }
	},

	copy: {
		// bootstrap: {
		// 	expand: true,
		// 	cwd: 'bower_components/bootstrap/dist/',
		// 	src: '**',
		// 	dest: '<%= config.dist %>/assets/'
		// },
        bootstrap: {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/',
            src: ['css', 'js'],
            dest: '<%= config.dist %>/assets/'
        },
		// theme: {
		// 	expand: true,
		// 	cwd: '<%= config.src %>/assets/',
		// 	src: '**',
		// 	dest: '<%= config.dist %>/assets/styles/'
		// },

		fonts: {
			expand: true,
			cwd: '<%= config.src %>/assets/webfonts/',
			src: '**',
			dest: '<%= config.dist %>/assets/fonts/',
            filter: 'isFile',
            flatten: true
		}
	},

	sass: {
		options: {
			sourceMap: true
		},
		dist: {
			files: {
				'<%= config.dist %>/assets/css/main.css': '<%= config.src %>/assets/main.scss'
			}
		}
	},


	// Before generating any new files,
	// remove any previously-created files.
	clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  // grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('server', [
	'build',
	'connect:livereload',
	'watch'
  ]);

  grunt.registerTask('build', [
	'clean',
	'copy',
	'assemble'
  ]);

  grunt.registerTask('default', [
	  'bower',
	  'sass',
	'build'
  ]);

};