
const gulp = require('gulp');

// gulp.task('任务名' , 回调函数)  建立gulp任务
gulp.task('first', (done) => {
    console.log('我的第一个gulp任务');

    // gulp.src()  获取任务要处理的文件  gulp.dest()  输出文件
    gulp.src('src/css/index.css').pipe(gulp.dest('dist/css'));
    done();
})
// 对于同步任务 ，使用done回调让gulp知道任务何时完成


// html压缩
// 抽取html中的公共代码
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
gulp.task('htmlmin', done => {
    gulp.src('./src/*.html')
        .pipe(fileinclude())

        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
    done();
})


// css压缩   less转换css
const less = require('gulp-less');
const csso = require('gulp-csso');
gulp.task('cssmin', done => {
    gulp.src(['src/css/*.less', 'src/css/*.css'])
        .pipe(less())   //less转css
        .pipe(csso())   //css压缩
        .pipe(gulp.dest('dist/css'));  //处理结果返回
    done();
})


// ES6转换   js压缩
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
gulp.task('jsmin', done => {
    gulp.src('src/js/*.js')
        .pipe(babel({
            // 判断代码运行环境 ，将代码转换为当前运行环境所支持的代码
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    done();
})


// 复制文件夹
gulp.task('copy', done => {
    gulp.src('src/images/*').pipe(gulp.dest('dist/images'));
    gulp.src('src/upload/*').pipe(gulp.dest('dist/upload'));
    done();
})


// 构建任务
gulp.task('build', gulp.series('htmlmin', 'cssmin', 'jsmin', 'copy'));