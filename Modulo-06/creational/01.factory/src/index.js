const UserFactory = require('./factory/userFactory');

(async () => {
  const userFactory = await UserFactory.createInstance();
})();
