const clean = require( 'del' );
const gulp = require( 'gulp' );
const svgSprites = require( 'gulp-svg-sprite' );

gulp.task( 'clean-build', () =>
	clean(
		[
			'./build/**/*',
		],
		{ force: true }
	)
);

const LAConfig = {
	shape: {
		id: {
			generator: '%s',
		},
	},
	svg: {
		xmlDeclaration: false,
	},
	mode: {
		symbol: {
			dest: '.',
			sprite: 'la-icons.svg',
			prefix: '%s',
			dimensions: '',
			inline: false,
			rootviewbox: false,
			example: {
				template: './tmpl/symbol/template-la.html',
				dest: 'liveagent-icons.html',
			},
		},
	},
};

const PAPConfig = {
	shape: {
		id: {
			generator: '%s',
		},
	},
	svg: {
		xmlDeclaration: false,
	},
	mode: {
		symbol: {
			dest: '.',
			sprite: 'pap-icons.svg',
			prefix: '%s',
			dimensions: '',
			inline: false,
			rootviewbox: false,
			example: {
				template: './tmpl/symbol/template-pap.html',
				dest: 'postaffiliatepro-icons.html',
			},
		},
	},
};

gulp.task( 'laIcons', () =>
	gulp
		.src( [ './common/**/*.svg', './liveagent/**/*.svg' ] )
		.pipe( svgSprites( LAConfig ) )
		.pipe( gulp.dest( './build' ) )
);

gulp.task( 'papIcons', () =>
	gulp
		.src( [ './common/**/*.svg', './postaffiliatepro/**/*.svg' ] )
		.pipe( svgSprites( PAPConfig ) )
		.pipe( gulp.dest( './build' ) )
);


gulp.task(
	'build',
	gulp.series(
		'clean-build',
		'laIcons',
		'papIcons',
	)
);

gulp.task(
	'default',
	gulp.series(
		'clean-build',
		'laIcons',
		'papIcons',
	)
);
