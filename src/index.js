import './styles.css';
import { onSearch, clearInputValue} from './js/renderPageFunctions';
import { onClickList } from './js/lightBoxTemplate';
import { searchForm, btnClear, galaryList } from './js/refs';




searchForm.addEventListener('submit', onSearch);
btnClear.addEventListener('click', clearInputValue);
galaryList.addEventListener('click', onClickList);










