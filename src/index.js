import $ from 'jquery';
import 'jquery-ujs';
import '@fortawesome/fontawesome-free/js/all';
import './styles/base.scss';


import Column from './Column';

$(() => new Column().render());
