const rangeBar = document.querySelector('input[type=range][data-target="icon"]');
const colorBar = document.querySelector('input[type=color][data-target="icon"]');
const iconSize = document.querySelector('[data-id="iconSize"]');
const icons = document.querySelectorAll('[data-id="icon"]');
const iconsSmall = document.querySelectorAll('[data-id="icon-small"]');

if ( icons.length && rangeBar && iconSize ) {
	rangeBar.addEventListener( 'input', () => {
		const val = rangeBar.value;
		const em = `${val / 16}em`;

		iconSize.innerText = `${val}px`;
		
		icons.forEach( icon => {
			icon.style.cssText = `width: ${em}; height: ${em}; ${ colorBar ? 'fill:' + colorBar.value : ''}`;
		} )
	} );
}

if ( icons.length && iconsSmall && colorBar ) {
	colorBar.addEventListener( 'input', () => {
		const val = colorBar.value;
		
		icons.forEach( icon => {
			icon.style.fill = val;
		} );

		iconsSmall.forEach( icon => {
			icon.style.fill = val;
		} );
	} );
}
