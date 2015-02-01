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
				logs: undefined
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
		jshint: {
			files: ['public/modules/*.js','public/services/*.js'],
			options:{}
		},
		watch: {
			options: {
				livereload: true
			},
			express: {
				files: ['<%= jshint.files  %>'],
				tasks: ['express:dev','jshint'],
				options: {
					spawn: false
				}
			}
		},
		concat: {
			options: {
				separator :';'
			},
			dist: {
				src: ['<%= jshint.files %>'],
				dest: 'public/javascripts/vcv.js'
			}
		},
		uglify: {
			options: {
				banner : '/* vcv script */'
			},
			dist: {
				files :{
					'public/javascripts/vcv.min.js' : '<%= concat.dist.dest %>'
				}
			}
		},		
	});

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint','concat','uglify','express:dev','watch']);

};