"use strict"

const babel = require("gulp-babel");
const del = require("del");
const gulp = require("gulp");
const sass = require("gulp-sass");

let paths = {
    scss: [ "src/angular-carousel.scss" ],
    main: [ "src/angular-carousel.js" ],

    dest: "dist/"
};

gulp.task("carousel.clean", function () {
    return del([ paths.dest ]);
});

gulp.task("carousel.sass", function () {
    return gulp.
        src(paths.scss).
        pipe(sass()).
        pipe(gulp.dest(paths.dest));
});

gulp.task("carousel.js", function () {
    return gulp.src(paths.main).
        pipe(babel({
            "presets": [ "es2015" ]
        })).
        pipe(gulp.dest(paths.dest));
});

gulp.task("carousel", [ "carousel.sass", "carousel.js" ]);

gulp.task("clean", [ "carousel.clean" ]);
gulp.task("default", [ "carousel" ]);
