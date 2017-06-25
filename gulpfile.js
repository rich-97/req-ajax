const fs = require('fs')
const path = require('path')

const gulp = require('gulp')
const babel = require('gulp-babel')
const uglyfly = require('gulp-uglyfly')
const dest = require('gulp-dest')

gulp.task('babel', function () {
  gulp.src('./src/ajax.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'))
    .pipe(uglyfly())
    .pipe(dest('dist', { ext: '.min.js' }))
    .pipe(gulp.dest('./'))
})

gulp.task('removeCommonJS', function () {
  ['js', 'min.js'].forEach(function (ext) {
    const pathFile = path.join(__dirname, `dist/ajax.${ext}`)
    let src = fs.readFileSync(pathFile).toString()
    src = src.replace(/module\.exports(\W=\W|=)ajax;/, '')
    fs.writeFileSync(pathFile, src)
  })
})

gulp.task('default', ['babel'])
