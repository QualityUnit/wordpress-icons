if ( document.querySelectorAll( '.IconsList' ).length ) {
	const lists = document.querySelectorAll( '.IconsList' );
	const listItems = document.querySelectorAll( '.IconsList .IconsList__item' );

	const filterItems = document.querySelectorAll(
		'.filter-item'
	);
	const search = document.querySelector( "input[type='search']" );
	const activeFilter = {
		category: '',
	};

	// Filter
	filterItems.forEach( ( element ) => {
		const filterItem = element;

		filterItem.addEventListener( 'change', () => {
			if ( filterItem.matches( ':checked' ) ) {
				const val = filterItem.value;
				const name = filterItem.getAttribute( 'name' );

				activeFilter[ name ] = val;
			}
		} );
	} );

	// Items
	listItems.forEach( ( element ) => {
		const listItem = element;
		const dataCategory = listItem.dataset.category
			? listItem.dataset.category
			: '';

		filterItems.forEach( ( e ) => {
			const filterItem = e;

			filterItem.addEventListener( 'change', () => {
				function regexCategory( activeFilterCategory ) {
					if ( activeFilterCategory !== '' ) {
						return new RegExp( ` ?${ activeFilterCategory } ?` );
					}
					return '';
				}

				if (
					listItem.style.display === 'none'
				) {
					listItem.style.display = 'block';
				}

				if (
					! dataCategory.match(
						regexCategory( activeFilter.category )
					)
				) {
					listItem.style.display = 'none';
				}
			} );
		} );
	} );


	// Search
	search.addEventListener( 'keyup', () => {
		const val = search.value.toLowerCase();

		listItems.forEach( ( element ) => {
			const listItem = element;
			const title = listItem
				.querySelector( '.IconsList__item--title' )
				.textContent.toLowerCase();

			if ( listItem.style.display === 'none' ) {
				listItem.style.display = 'block';
			}

			if ( ! title.includes( val ) ) {
				listItem.style.display = 'none';
			}
		} );
	} );

	// Empty
	filterItems.forEach( ( element ) => {
		const filterItem = element;

		filterItem.addEventListener( 'change', () => {
			lists.forEach( list => {
				const listTitle = document.querySelector( `.IconsList__title[data-list="${list.dataset.list}"]` );
				const countItems = list.querySelectorAll( '.IconsList__item' ).length;

				if (
					list.querySelectorAll( "li[style*='display: none']" )
						.length === countItems
				) {
					list.classList.add( 'hidden' );
					listTitle ? listTitle.classList.add( 'hidden' ) : null;
				} else {
					list.classList.remove( 'hidden' );
					listTitle ? listTitle.classList.remove( 'hidden' ) : null;
				}
			} );
		} );
	} );

	search.addEventListener( 'keyup', () => {
		lists.forEach( list => {
			const listTitle = document.querySelector( `.IconsList__title[data-list="${list.dataset.list}"]` );
			const countItems = list.querySelectorAll( '.IconsList__item' ).length;

			if (
				list.querySelectorAll( "li[style*='display: none']" )
					.length === countItems
			) {
					list.classList.add( 'hidden' );
					listTitle ? listTitle.classList.add( 'hidden' ) : null;
				} else {
					list.classList.remove( 'hidden' );
					listTitle ? listTitle.classList.remove( 'hidden' ) : null;
				}
		} );
	} );

	search.addEventListener( 'input', () => {
		if ( search.value === '' ) {
			lists.forEach( list => {
				const listTitle = document.querySelector( `.IconsList__title[data-list="${list.dataset.list}"]` );

				list.classList.remove( 'hidden' );
				listTitle ? listTitle.classList.remove( 'hidden' ) : null;

				list.querySelectorAll( 'li' ).forEach( ( element ) => {
					const el = element;
					el.style = null;
				} );
			} );
		}
	} );
}
