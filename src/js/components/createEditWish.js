import { ROUTE_NEW_WISH, API_URL } from './const.js';
import { createElement, createOptionsCurrency, handleImageFileSelection } from './helper.js';
import { sendDataWish, getWish, updateDataWish, deleteWish } from './serviceAPI';

export const createEditWish = async id => {
	const wishData = id !== ROUTE_NEW_WISH && (await getWish(id));

	const sectionEditWish = createElement('section', {
		className: 'edit edit_wish',
	});

	const container = createElement('div', { className: 'container' });
	const formWish = createElement('form', {
		className: 'edit__form',
	});

	formWish.addEventListener('submit', async e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		if (!wishData) {
			await sendDataWish(data);
		} else {
			await updateDataWish(id, data);
		}
		history.back();
	});

	const editWish = createElement('fieldset', {
		className: 'edit__wish',
	});
	const labelTitle = createElement('label', {
		className: 'edit__label',
	});
	const labelTextTitle = createElement('span', {
		className: 'edit__label-text',
		textContent: 'Описание',
	});

	const inputTitle = createElement('input', {
		className: 'edit__input',
		name: 'title',
		type: 'text',
		value: wishData.title ?? '',
	});

	labelTitle.append(labelTextTitle, inputTitle);

	const labelCategory = createElement('label', {
		className: 'edit__label',
	});
	const labelTextCategory = createElement('span', {
		className: 'edit__label-text',
		textContent: 'Категория:',
	});

	const inputCategory = createElement('input', {
		className: 'edit__input',
		name: 'category',
		type: 'text',
		value: wishData.category ?? '',
	});

	labelCategory.append(labelTextCategory, inputCategory);

	const priceWrapper = createElement('div', { className: 'edit__wish-price' });

	const labelPrice = createElement('label', {
		className: 'edit__label edit__label_price',
	});
	const labelTextPrice = createElement('span', {
		className: 'edit__label-text',
		textContent: 'Цена:',
	});

	const inputPrice = createElement('input', {
		className: 'edit__input',
		name: 'price',
		type: 'number',
		value: wishData.price ?? '',
	});

	labelPrice.append(labelTextPrice, inputPrice);

	const labelCurrency = createElement('label', {
		className: 'edit__label edit__label_select edit__label_price',
	});

	const selectCurrency = createElement('select', {
		className: 'edit__select edit__select_currency',
		name: 'currency',
	});

	createOptionsCurrency(selectCurrency, wishData.currency);

	labelCurrency.append(selectCurrency);
	priceWrapper.append(labelPrice, labelCurrency);

	const labelLink = createElement('label', {
		className: 'edit__label',
	});
	const labelTextLink = createElement('span', {
		className: 'edit__label-text',
		textContent: 'Ссылка:',
	});

	const inputLink = createElement('input', {
		className: 'edit__input',
		name: 'link',
		type: 'text',
		value: wishData.link ?? '',
	});

	labelLink.append(labelTextLink, inputLink);

	editWish.append(labelTitle, labelCategory, priceWrapper, labelLink);

	const editWishPhoto = createElement('fieldset', { className: 'edit__wish-photo' });

	const labelPhoto = createElement('label', { className: 'edit__label-photo' });

	const photo = createElement('img', {
		className: 'edit__wish-image',
		src: wishData.image ? `${API_URL}/${wishData.image}` : 'assets/img/no-photo.png',
		alt: 'Фото желания',
	});

	const inputPhoto = createElement('input', {
		type: 'file',
		className: 'edit__input-file edit__input-file_wish',
		accept: 'image/jpeg, image/png',
	});

	labelPhoto.append(photo, inputPhoto);

	const btnPhotoDelete = createElement('button', {
		type: 'button',
		className: 'edit__wish-delete',
		innerHTML: `
			<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M18.8961 16.6875C18.5999 16.4115 18.2081 16.2612 17.8033 16.2684C17.3985 16.2755 17.0123 16.4395 16.726 16.7258C16.4398 17.0121 16.2758 17.3983 16.2686 17.8031C16.2615 18.2079 16.4117 18.5996 16.6877 18.8958L20.7919 23L16.6877 27.1042C16.5342 27.2472 16.4111 27.4197 16.3257 27.6114C16.2403 27.803 16.1944 28.0099 16.1907 28.2197C16.187 28.4295 16.2256 28.6379 16.3042 28.8325C16.3827 29.027 16.4997 29.2038 16.6481 29.3522C16.7964 29.5005 16.9732 29.6175 17.1677 29.6961C17.3623 29.7747 17.5707 29.8133 17.7805 29.8096C17.9903 29.8059 18.1972 29.7599 18.3889 29.6745C18.5805 29.5891 18.753 29.466 18.8961 29.3125L23.0002 25.2083L27.1044 29.3125C27.4006 29.5885 27.7924 29.7388 28.1972 29.7316C28.602 29.7245 28.9882 29.5605 29.2745 29.2742C29.5607 28.9879 29.7247 28.6017 29.7319 28.1969C29.739 27.7921 29.5887 27.4004 29.3127 27.1042L25.2086 23L29.3127 18.8958C29.4663 18.7528 29.5894 18.5803 29.6748 18.3886C29.7602 18.197 29.8061 17.99 29.8098 17.7802C29.8135 17.5705 29.7749 17.3621 29.6963 17.1675C29.6177 16.9729 29.5008 16.7962 29.3524 16.6478C29.204 16.4995 29.0273 16.3825 28.8327 16.3039C28.6382 16.2253 28.4298 16.1867 28.22 16.1904C28.0102 16.1941 27.8033 16.2401 27.6116 16.3255C27.42 16.4109 27.2475 16.534 27.1044 16.6875L23.0002 20.7917L18.8961 16.6875Z" fill="#365ABA"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M23.1191 0.604187H22.8816C18.0712 0.604187 14.3024 0.604187 11.3607 1.00002C8.35241 1.40419 5.97741 2.25002 4.11283 4.11252C2.24824 5.9771 1.40449 8.3521 1.00033 11.3625C0.604492 14.3021 0.604492 18.0709 0.604492 22.8813V23.1188C0.604492 27.9292 0.604492 31.6979 1.00033 34.6396C1.40449 37.6479 2.25033 40.0229 4.11283 41.8875C5.97741 43.7521 8.35241 44.5959 11.3628 45C14.3024 45.3959 18.0712 45.3959 22.8816 45.3959H23.1191C27.9295 45.3959 31.6982 45.3959 34.6399 45C37.6482 44.5959 40.0232 43.75 41.8878 41.8875C43.7524 40.0229 44.5962 37.6479 45.0003 34.6375C45.3962 31.6979 45.3962 27.9292 45.3962 23.1188V22.8813C45.3962 18.0709 45.3962 14.3021 45.0003 11.3604C44.5962 8.3521 43.7503 5.9771 41.8878 4.11252C40.0232 2.24794 37.6482 1.40419 34.6378 1.00002C31.6982 0.604187 27.9295 0.604187 23.1191 0.604187ZM6.32324 6.32294C7.51074 5.13544 9.11491 4.45419 11.7795 4.09585C14.4878 3.73335 18.0462 3.72919 23.0003 3.72919C27.9545 3.72919 31.5128 3.73335 34.2212 4.09585C36.8857 4.45419 38.492 5.13752 39.6795 6.32294C40.8649 7.51044 41.5462 9.1146 41.9045 11.7792C42.267 14.4875 42.2712 18.0459 42.2712 23C42.2712 27.9542 42.267 31.5125 41.9045 34.2209C41.5462 36.8854 40.8628 38.4917 39.6774 39.6792C38.4899 40.8646 36.8857 41.5459 34.2212 41.9042C31.5128 42.2667 27.9545 42.2709 23.0003 42.2709C18.0462 42.2709 14.4878 42.2667 11.7795 41.9042C9.11491 41.5459 7.50866 40.8625 6.32116 39.6771C5.13574 38.4896 4.45449 36.8854 4.09616 34.2209C3.73366 31.5125 3.72949 27.9542 3.72949 23C3.72949 18.0459 3.73366 14.4875 4.09616 11.7792C4.45449 9.1146 5.13783 7.51044 6.32324 6.32294Z" fill="#365ABA"/>
			</svg>           
		`,
		style: (photo.src.includes(API_URL) && !photo.src.includes('empty')) || 'display: none;',
	});

	const editHiddenInput = createElement('input', {
		type: 'hidden',
		name: 'image',
		value: wishData.image ? `${API_URL}/${wishData.image}` : '',
	});

	inputPhoto.addEventListener('change', () => {
		btnPhotoDelete.style.display = 'block';
	});

	btnPhotoDelete.addEventListener('click', () => {
		photo.src = 'assets/img/no-photo.png';
		editHiddenInput.value = '';
		inputPhoto.value = '';
		btnPhotoDelete.style.display = 'none';
	});

	handleImageFileSelection(inputPhoto, photo, editHiddenInput);

	editWishPhoto.append(labelPhoto, btnPhotoDelete, editHiddenInput);

	const editSubmitWrapper = createElement('div', {
		className: 'edit__submit-wrapper',
	});

	const btnSaveWish = createElement('button', {
		className: 'edit__submit-btn btn',
		textContent: 'Сохранить изменения',
		type: 'submit',
	});

	editSubmitWrapper.append(btnSaveWish);

	if (wishData) {
		const btnDeleteWish = createElement('button', {
			className: 'edit__submit-btn btn',
			textContent: 'Удалить желание',
			type: 'button',
		});
	}

	btnDeleteWish.addEventListener('click', async () => {
		await deleteWish(id);
		history.back();
	});

	editSubmitWrapper.append(btnDeleteWish);

	formWish.append(editWish, editWishPhoto, editSubmitWrapper);

	container.append(formWish);
	sectionEditWish.append(container);

	return { sectionEditWish, formWish };
};
