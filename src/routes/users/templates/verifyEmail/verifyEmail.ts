export function verifyEmailTitle(username: string) {
  return `
  <p>
  Hi <span class="username">${username}</span>, Just a friendly reminder to
  verify your email address.
  </p>
  `;
}

export function verifyEmail(username: string, url: string) {
  return `
  <div class="email-content">
  <img src="https://via.placeholder.com/90" alt="Welcome" />
  <p>
    Hey ${username}, you are almost ready to start your enjoying Prepmeets.
    Simply click the purple button below to verify your email address.
  </p>
  <p>
    For security reasons, please help us by verifying your email
    address.
  </p>
  <div class="action_btn_div">
    <a href="${url}" target="_blank" class="action_btn">Verify email address</a>
  </div>
  </div>
    `;
}
