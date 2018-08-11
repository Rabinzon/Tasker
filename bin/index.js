import getServer from '../';

const port = process.env.PORT || 4000;

getServer().listen(port, () => {
  console.log(`server listen on port ::${port}`);
});
