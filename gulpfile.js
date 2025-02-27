const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const clean = require('del');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const svgSprites = require('gulp-svg-sprite');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('node-sass'));
const terser = require('gulp-terser');

gulp.task('browser-reload', (done) => {
	browserSync.reload();
	done();
});

gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: "./docs"
		},
		open: false,
	});

	gulp.watch('./src/scss/**/*.scss', gulp.series('styles'));
	gulp.watch('./src/js/**/*.js', gulp.series('scripts'));

	gulp.watch(
		['./icons/**/*.svg', './src/tmpl/**/*.html'],
		gulp.series('laIcons', 'papIcons', 'urlslabIcons')
	);
});

gulp.task('clean-build', () =>
	clean(
		[
			'./docs/reference/*',
		],
		{ force: true }
	)
);

gulp.task('styles', () =>
	gulp
		.src('./src/scss/**/*.scss')
		.pipe(plumber())
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: 'nested',
				precision: 10,
			})
		)
		.pipe(autoprefixer('last 3 version'))
		.pipe(plumber.stop())
		.pipe(gulp.dest('./docs/css'))
		.pipe(browserSync.reload({ stream: true }))
);

gulp.task('scripts', () =>
	gulp
		.src('./src/js/**/*.js')
		.pipe(concat('script.js'))
		.pipe(terser())
		.pipe(gulp.dest('./docs/js'))
		.pipe(browserSync.reload({ stream: true }))
);

let LAConfig = {
	shape: {
		id: {
			separator: '/',
			generator: (name) => {
				const renamed = name.replace('/', '-').replace('.svg', '');
				return renamed;
			},
		},
	},
	svg: {
		xmlDeclaration: false,
	},
	mode: {
		symbol: {
			dest: '.',
			sprite: 'reference/la-icons.svg',
			prefix: '%s',
			dimensions: '',
			inline: false,
			rootviewbox: false,
			example: {
				template: './src/tmpl/symbol/template-la.html',
				dest: 'reference/la-icons-reference.html',
			},
		},
	},
};

const PAPConfig = {
	shape: {
		id: {
			separator: '/',
			generator: (name) => {
				const renamed = name.replace('/', '-').replace('.svg', '');
				return renamed;
			},
		},
	},
	svg: {
		xmlDeclaration: false,
	},
	mode: {
		symbol: {
			dest: '.',
			sprite: 'reference/pap-icons.svg',
			prefix: '%s',
			dimensions: '',
			inline: false,
			rootviewbox: false,
			example: {
				template: './src/tmpl/symbol/template-pap.html',
				dest: 'reference/pap-icons-reference.html',
			},
		},
	},
};

let URLslabConfig = {
	shape: {
		id: {
			separator: '/',
			generator: (name) => {
				const renamed = name.replace('/', '-').replace('.svg', '');
				return renamed;
			},
		},
	},
	svg: {
		xmlDeclaration: false,
	},
	mode: {
		symbol: {
			dest: '.',
			sprite: 'reference/urlslab-icons.svg',
			prefix: '%s',
			dimensions: '',
			inline: false,
			rootviewbox: false,
			example: {
				template: './src/tmpl/symbol/template-urlslab.html',
				dest: 'reference/urlslab-icons-reference.html',
			},
		},
	},
};

let FlowhuntConfig = {
	shape: {
		id: {
			separator: '/',
			generator: (name) => {
				const renamed = name.replace('/', '-').replace('.svg', '');
				return renamed;
			},
		},
	},
	svg: {
		xmlDeclaration: false,
	},
	mode: {
		symbol: {
			dest: '.',
			sprite: 'reference/flowhunt-icons.svg',
			prefix: '%s',
			dimensions: '',
			inline: false,
			rootviewbox: false,
			example: {
				template: './src/tmpl/symbol/template-flowhunt.html',
				dest: 'reference/flowhunt-icons-reference.html',
			},
		},
	},
};

gulp.task('laIcons', () =>

	gulp.src(['./icons/common/**/*.svg', './icons/liveagent/**/*.svg'])
		.pipe(svgSprites(LAConfig))
		.pipe(gulp.dest('./docs'))
		.pipe(browserSync.reload({ stream: true }))
);

gulp.task('papIcons', () =>
	gulp
		.src(['./icons/common/**/*.svg', './icons/postaffiliatepro/**/*.svg'])
		.pipe(svgSprites(PAPConfig))
		.pipe(gulp.dest('./docs'))
		.pipe(browserSync.reload({ stream: true }))
);

gulp.task('urlslabIcons', () =>

	gulp.src(['./icons/common/**/*.svg', './icons/urlslab/**/*.svg'])
		.pipe(svgSprites(URLslabConfig))
		.pipe(gulp.dest('./docs'))
		.pipe(browserSync.reload({ stream: true }))
);

gulp.task('flowhuntIcons', () =>

	gulp.src(['./icons/common/**/*.svg', './icons/flowhunt/**/*.svg'])
		.pipe(svgSprites(FlowhuntConfig))
		.pipe(gulp.dest('./docs'))
		.pipe(browserSync.reload({ stream: true }))
);


gulp.task(
	'build',
	gulp.series(
		'clean-build',
		'styles',
		'scripts',
		'laIcons',
		'papIcons',
		'urlslabIcons',
		'flowhuntIcons'
	)
);

gulp.task(
	'default',
	gulp.series(
		'clean-build',
		'styles',
		'scripts',
		'laIcons',
		'papIcons',
		'urlslabIcons',
		'flowhuntIcons',
		'browser-sync'
	)
);
