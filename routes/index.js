import welcome from './welcome';
import users from './users';
import sessions from './sessions';
import board from './board';
import columns from './columns';
import profile from './profile';
import tags from './tags';
import tasks from './tasks';
import taskTags from './taskTags';

const controllers = [
  welcome, users, sessions, board, columns,
  tags, tasks, profile, taskTags,
];

export default (router, container) => controllers.forEach(f => f(router, container));
