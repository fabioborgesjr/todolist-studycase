import '../css/main.css';
import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'

import { todos } from './todoReducer';
import { render } from './view';
import { registerEventHandlers } from './events';

todos.subscribe(() => render(document.body, todos.getState()));

registerEventHandlers();