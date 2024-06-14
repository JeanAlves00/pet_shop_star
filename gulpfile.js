const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const fs = require('fs');
const path = require('path');

// Função para garantir que o diretório exista
function ensureDirSync(dirpath) {
    try {
        fs.mkdirSync(dirpath, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }
}

// Função para processar arquivos JavaScript
function scripts() {
    return gulp.src('./src/script/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/script'));
}

// Função para compilar arquivos SASS
function styles() {
    return gulp.src('./src/style/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/style'));
}

// Função para otimizar imagens com importação dinâmica
async function images() {
    ensureDirSync('./src/images');  // Garante que o diretório exista
    const imagemin = (await import('gulp-imagemin')).default;
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

// Tarefa padrão
exports.default = gulp.series(styles, images, scripts);

// Tarefa de observação (watch)
exports.watch = function () {
    gulp.watch('./src/style/**/*.scss', gulp.series(styles));
    gulp.watch('./src/script/*.js', gulp.series(scripts));
}

// Registrar a tarefa padrão
gulp.task('default', gulp.series(styles, images, scripts));
