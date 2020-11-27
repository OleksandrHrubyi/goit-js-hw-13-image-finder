import './styles.css';
import { onSearch, clearInputValue} from './js/renderPage_functions';
import { onClickList } from './js/lightBox_template';
import { searchForm, btnClear, galaryList } from './js/refs';




searchForm.addEventListener('submit', onSearch);
btnClear.addEventListener('click', clearInputValue);
galaryList.addEventListener('click', onClickList);













