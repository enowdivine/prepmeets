export function verifyEmailTitle(username: string) {
  return `
  <p>
  Hi <span class="username">${username}</span>, Just a friendly reminder to
  verify your email address.
  </p>
  `;
}
