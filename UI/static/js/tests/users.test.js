const Users = require('../scripts/users');


test('User can login', () => {
  expect.assertions(1);
  return Users.Login().then(data => {
    expect(data.name).toEqual('user logged in');
  });
});