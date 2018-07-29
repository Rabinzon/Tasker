import welcome from './welcome';
import users from './users';
import sessions from './sessions';
import board from './board';
import columns from './columns';

const controllers = [
  welcome, users, sessions, board, columns,
];

export default (router, container) => controllers.forEach(f => f(router, container));
