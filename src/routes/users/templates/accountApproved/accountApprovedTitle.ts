export function accountApproved(username: string) {
  return `
  <p>
  Hi <span class="username">${username}</span>, your
  <span class="brand-title-color">Prep</span>meets account has been
  approved!
  </p>
  `;
}
