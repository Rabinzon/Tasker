import welcome from './welcome';
import users from './users';
import sessions from './sessions';
import board from './board';
import columns from './columns';
import profile from './profile';
import tags from './tags';
import cards from './tasks';

const controllers = [
  welcome, users, sessions, board, columns,
  tags, cards, profile,
];

export default (router, container) => controllers.forEach(f => f(router, container));
