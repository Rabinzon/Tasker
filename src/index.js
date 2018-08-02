import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './styles/navbar.css';
import './styles/base.css';

import Column from './Column';

$(() => new Column().render());
