var gulp = require("gulp"),
    $ = require("gulp-load-plugins")({
        lazy: true
    }),
    // sass = require("gulp-sass"),
    // autoprefixer = require("gulp-autoprefixer"),
    // plumber = require("gulp-plumber"),
    browserSync = require("browser-sync"),
    del = require("del"),
    // useref = require("gulp-useref"),
    // uglify = require("gulp-uglify"),
    // gulpif = require("gulp-if"),
    // imagemin = require("gulp-imagemin"),
   less = require('gulp-less'),
   path = require('path'),
    runSequence = require("run-sequence"),
    ftp = require("vinyl-ftp"),
    argv = require("yargs").argv;
    // gutil = require("gulp-util");

gulp.task("css", function(){

    $.util.log($.util.colors.yellow("Kompilacja sass do CSS"));

    return gulp.src("src/sass/main.scss")
        .pipe($.plumber())
        .pipe($.sass.sync({
            outputStyle: "expanded"
        }))
        .pipe($.autoprefixer({
            browsers: ["last 5 version", "IE 9"]
        }))
        .pipe(gulp.dest("src/css/"))
        .pipe(browserSync.stream());
});

gulp.task("less", function(){
    return gulp.src("src/style/main.less")
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest("src/css/"))
});

gulp.task("server", function(){
    browserSync.init({
        server: "src/"
    });
});

gulp.task("watch", function(){
    gulp.watch("src/sass/**/*.scss", ["css"]);
    gulp.watch("src/style/**/*.less", ["less"]);
    gulp.watch(["src/*.html", "src/**/*.js"], browserSync.reload);
});

gulp.task("clean", function(){
    return del("dist/");
});

gulp.task("html", function(){
    gulp.src("src/*.html")
        .pipe($.useref())
        .pipe($.if("*.js", $.uglify()) )
        .pipe(gulp.dest("dist/"));
});

gulp.task("images", function(){
    return gulp.src("dist/images/*", {
        base: "dist"
    })
        .pipe($.imagemin())
        .pipe(gulp.dest("dist/"));
});

gulp.task("copy", function(){
    return gulp.src(["src/css/**/*.css", "src/images/**/*","src/images/icons/*", "src/uploads/*"], {
        base: "src"
    })
    .pipe(gulp.dest("dist"));
});

gulp.task("upload", function(){
    var conn = ftp.create({
        host: "ftp.tymonq.unixstorm.org",
        user: "tymonq",
        password: "ahiaima3n"
    });

    return gulp.src("dist/**/*")
        .pipe($.if(argv.upload, conn.dest("/domains/tymonqart.pl/public_html")));
});

gulp.task("build", function(cb){
    runSequence("clean", "html", "copy", "images", "upload", cb);
});

gulp.task("build:server", ["build"], function(){
    browserSync.init({
        server: "dist/"
    });
});

gulp.task("default", ["less", "server", "watch"]);