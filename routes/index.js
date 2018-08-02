import welcome from './welcome';
import users from './users';
import sessions from './sessions';
import board from './board';
import columns from './columns';
import tags from './tags';
import cards from './cards';

const controllers = [
  welcome, users, sessions, board, columns,
  tags, cards,
];

export default (router, container) => controllers.forEach(f => f(router, container));
