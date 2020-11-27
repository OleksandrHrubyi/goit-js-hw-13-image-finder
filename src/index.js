import './styles.css';
import { onSearch, clearInputValue, onClickList } from './js/functions';
import { searchForm, btnClear, galaryList } from './js/refs';



searchForm.addEventListener('submit', onSearch);
btnClear.addEventListener('click', clearInputValue);
galaryList.addEventListener('click', onClickList);













