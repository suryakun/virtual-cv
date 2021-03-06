module.exports = function(grunt){

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		express: {
			options: {
				cmd : process.argv[0],
				background : false,
				fallback: function(){
					console.log('Error')
				},
				port:3000,
				node_env: undefined,
				delay: 0,
				output: '.+',
				debug: true,
				breakOnFirstLine: false,
				logs: 'logfile.js'
			},
			dev: {
				options: {
					script: 'bin/www'
				}
			},
			prod: {
				options: {
					script: 'bin/www'
				}
			},
			test: {
				options: {
					script: 'bin/www'
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			express: {
				files: ['public/modules/*.js','public/services/*.js','public/javascripts/*.js'],
				tasks: ['express:dev','jshint'],
				options: {
					spawn: false
				}
			}
		}
		// concat: {
		// 	options: {
		// 		separator :';'
		// 	},
		// 	dist: {
		// 		src: ['public/modules/*.js','public/services/*.js','public/javascripts/*.js'],
		// 		dest: 'public/javascripts/vcv.js'
		// 	}
		// },
		// uglify: {
		// 	options: {
		// 		banner : '/* vcv script */'
		// 	},
		// 	dist: {
		// 		files :{
		// 			'public/javascripts/vcv.min.js' : '<%= concat.dist.dest %>'
		// 		}
		// 	}
		// },		
	});

	grunt.loadNpmTasks('grunt-express-server');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-uglify');

	// grunt.registerTask('default', ['concat','uglify','express:dev','watch']);
	grunt.registerTask('default', ['express:dev','watch']);
}