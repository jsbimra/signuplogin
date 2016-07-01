module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: 	{
			sass:{
				files: 'scss/*.scss',
				tasks: ['sass']	
			},
			jsdoc: {
				files: 'libs/*.js',
				tasks: ['jsdoc'],
				options:{
					debounceDelay: 250
				}
			},
			build:{
				files: ['*.html', 'scss/*.scss'],
				tasks: ['sass', 'cssmin','concat', 'processhtml', 'copy']
			}
		},
		sass: {
			dev: {
				files: {
					'css/main.css': 'scss/main.scss'
				}
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'css/*.css', 
						'*.html', 
						'app/*.html', 
						'app/**/*.html', 
						'app/**/**/*.html',
						'app/*.js', 
						'app/**/*.js', 
						'app/**/**/*.js', 
						'libs/*.js', 
						'doc/*.html',
						'GruntFile.js' ]
				},
				options: {
					watchTask: true,
					server: './'
				}
			}
		},
		jsdoc : {
	        dist : {
	            src: 'libs/*.js', 
	            options: {
		            destination: 'doc',
		            configure : "jsdoc.conf.json"
	            }
	        }
	    },
	    cssmin:{
	    	target:{
	    		files: [{
	    			expand: true,
	    			cwd: 'css',
	    			src: ['main.css'],
	    			dest: 'css',
	    			ext: '.min.css'
	    		}]
	    	}
	    },
	    concat:{
	    	dist: {
	    		src: ['css/bootstrap.min.css','css/main.min.css'],
	    		dest: 'build/css/all-style.min.css'
	    	}
	    },
	    processhtml: {
	    	options:{},
	    	dist: {
	    		files: [
	    			{'build/index.html': ['index.html']}
	    		]
	    	},
	    	custom: {
	    		files: [
	    			{'build/search-result.html': ['search-result.html']}
	    		]
	    	}
	    },
	    copy: {
			main: {
				files:[
					{
						expand: true,
						src: 'img/**',
						dest: 'build/',
					},
					{
						expand: true,
						src: 'libs/**',
						dest: 'build/',
					}
					,
					{
						expand: true,
						src: 'fonts/**',
						dest: 'build/',
					}
				]
				
			},
		}
	});

	//Load NPM task
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-copy');

	//define default task
	grunt.registerTask('default', ['browserSync', 'watch:sass']);
	grunt.registerTask('servedoc', ['watch:jsdoc']);
	grunt.registerTask('build', ['watch:build']);
};