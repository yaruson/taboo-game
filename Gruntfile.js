module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  const webpackConfig = require('./webpack.config')

  grunt.initConfig({
    eslint: {
      target: ['src/**/*.js']
    },
    nodemon: {
      dev: {
        script: 'src/api/index.js'
      }
    },
    webpack: {
      prod: webpackConfig,
      dev: Object.assign({
        mode: 'development',
        watch: true
      }, webpackConfig)
    },
    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'webpack:dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  })

  grunt.registerTask('dev', 'concurrent:dev')
  grunt.registerTask('build', 'webpack:prod')

  grunt.registerTask('default', 'build')
}
