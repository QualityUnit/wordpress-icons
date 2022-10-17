const iconsList = document.querySelector('.IconsList');
const items = iconsList.querySelectorAll('.IconsList li');

let nameSelectors = [];

if ( items.length ) {
		items.forEach( (item, index) => {
			const itemName = item.dataset.name;
			let nameSelector = itemName.replace( /^([^-]+-).+/g, '$1' );
			let prevName = null;

			if ( index - 1 >= 0 ) {
				prevName = items.item( index - 1 ).dataset.name.replace( /^([^-]+-).+/g, '$1' );
			
				if ( nameSelector === prevName ) {
					nameSelectors.push(nameSelector);
				}
			}
		} );

		// Getting reduced list of multiple occurences without duplicates
		nameSelectors = [... new Set(nameSelectors)].sort((a,b) => {return -1});

		if ( nameSelectors.length ) {
			nameSelectors.forEach( selector => {
				const filtersMenu = document.querySelector( '.FilterMenu__items--inn' );
				const selectorItems = document.querySelectorAll( `li[data-name^="${selector}"]` );
				const selectorOK = selector.replace('-', '');
				const selectorName = selectorOK.replace( /\b[a-z]/g, ( letter ) => {
					return letter.toUpperCase();
				} );

				const menu = document.createElement('ul');
				menu.classList.add('IconsList');
				menu.dataset.list = selectorOK;
				iconsList.insertAdjacentElement( 'afterend', menu);

				menu.insertAdjacentHTML( 'beforebegin', 
				`<h3 class="IconsList__title" data-list="${selectorOK}">
					${selectorName}
				</h3>` );

				filtersMenu.insertAdjacentHTML( 'beforeend', `
					<div class="checkbox FilterMenu__item">
							<input class="filter-item" type="radio" id="${selectorOK}" value="${selectorOK}" name="category" />

							<label for="${selectorOK}">
									${selectorName}
							</label>
					</div>
				` )

				selectorItems.forEach( item => {
					item.remove();
					item.dataset.category = selectorOK;
					menu.insertAdjacentElement( 'beforeend', item );
				} );
			} );
		}
}
