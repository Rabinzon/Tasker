import $ from 'jquery';
import 'jquery-ujs';
import '@fortawesome/fontawesome-free/js/all';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './styles/base.scss';

$(() => {
  $('[data-toggle="tooltip"]').tooltip();
});
