module.exports = function(grunt) {
    grunt.initConfig({
	    
		pkg: grunt.file.readJSON('package.json'),
		
		meta: {
            banner: '/**\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * License: <%= pkg.license %>\n */\n'
        },
		
		files: {
            src: [
              'src/browser-storage-api/vsBrowserStorageAPIModule.js',
			  'src/browser-storage-api/ngStorageAPI.js',
			  'src/browser-storage-api/vsLocalStorageAPI.js',
			  'src/browser-storage-api/vsSessionStorageAPI.js',  
			  'src/handy-storage/vsHandyStorageModule.js',
			  'src/handy-storage/vsStorageModelValidator.js',
			  'src/handy-storage/vsStorageControllerProvider.js',
			  'src/handy-storage/directives/vsLocalStorageDirective.js',
			  'src/handy-storage/directives/vsSessionStorageDirective.js',
			  'src/handy-storage/directives/vsLinkStorageDirective.js'
            ],
            u_test: ['test/unit/**/*.js']
        },
		
		jshint: {
            src: ['<%= files.src %>'],
			u_test: ['<%= files.u_test %>']
        },
		
		concat: {
	    	src: {
			    options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
				    'bower_components/ngstorage/ngStorage.js',
				    'src/js.prefix', '<%= files.src %>', 'src/js.suffix'
				],
                dest: 'dest/<%= pkg.name %>.js'
            }
		},
		
		uglify: {
            dest: {
                files: {
                    'dest/<%= pkg.name %>.min.js': ['<%= concat.src.dest %>']
                }
            }
        },
		
		karma: {
            'unit': {
                configFile: 'karma.conf.js',
				singleRun: true
            },
			'unit-background': {
                configFile: 'karma.conf.js',
				background: true,
				singleRun: false
            }
        },
		
		watch: {
            src: {
                files: ['<%= files.src %>'],
                tasks: ['jshint:src'],
                options: {
                    interrupt: true
                }
            },
			u_test: {
                files: ['<%= files.u_test %>'],
                tasks: ['jshint:u_test'],
                options: {
                    interrupt: true
                }
            },
			karma: {
			    files: ['<%= files.src %>', '<%= files.u_test %>'],
				tasks: ['karma:unit-background:run'],
                options: {
                    interrupt: true
                }
			}
        }
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');
	
	
	// run unit tests (single run)
	grunt.registerTask('u-test', ['jshint', 'karma:unit']);
	
	// start karma & grunt watch
	grunt.registerTask('start-u-test', ['karma:unit-background:start', 'watch']);
	
	// build
	grunt.registerTask('build', ['jshint', 'karma:unit', 'concat:src', 'uglify:dest']);
	
	// default
	grunt.registerTask('default', ['build']);
};