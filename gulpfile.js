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
				dest: 'la-icons-reference.html',
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
				dest: 'pap-icons-reference.html',
			},
		},
	},
};

gulp.task( 'laIcons', () =>
	gulp
		.src( [ './icons/common/**/*.svg', './icons/liveagent/**/*.svg' ] )
		.pipe( svgSprites( LAConfig ) )
		.pipe( gulp.dest( './build' ) )
);

gulp.task( 'papIcons', () =>
	gulp
		.src( [ './icons/common/**/*.svg', './icons/postaffiliatepro/**/*.svg' ] )
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
