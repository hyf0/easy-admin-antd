export async function login(username, password) {
  if (username === 'admin' || username === 'user') {
    return {
      user: {
        name: 'YunfeiHe',
        roles: [username],
      },
      token: 'token123456789',
    };
  }
  return null;
}
