module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        stylus: {
            compile: {
                files: {
                    'assets/css/main-comp.css': 'assets/stylus/main.styl'
                },
            },
        },
        autoprefixer: {
            your_target: {
                src: 'assets/css/main-comp.css',
                dest: 'assets/css/main.css'
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['stylus', 'autoprefixer']);
}