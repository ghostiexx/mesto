import { 
    userInfo, 
    btnEdit, 
    btnAdd,
    formValidator,
    formValidatorTwo,
    popupWithEditForm,
    popupWithAddForm,
    cardSection
} from '../scripts/utils/constants.js';
import { setInputValues } from '../scripts/utils/functions.js';
import './index.css';

cardSection.render();

formValidator.enableValidation();
formValidatorTwo.enableValidation();

btnEdit.addEventListener('click', () => { 
    popupWithEditForm.open();
    setInputValues(userInfo);
});

btnAdd.addEventListener('click', (e) => { 
    popupWithAddForm.open(e); 
});