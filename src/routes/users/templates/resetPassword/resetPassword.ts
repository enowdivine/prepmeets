export function resetPasswordTitle() {
  return `
  <p>Reset Your Password</p>
    `;
}

export function resetPassword(url: string) {
  return `
  <div class="email-content">
  <img src="https://via.placeholder.com/90" alt="Welcome" />
  <h4>Hello,</h4>
  <p>
    we recently received a request for a forgotten password. To change
    your prepmeet account password, please click on below link
  </p>
  <p>
    If you did not request this change, you do not need to do anything.
    Thanks,
  </p>
  <div class="action_btn_div">
    <a href="${url}" target="_blank" class="action_btn">Reset your password</a>
  </div>
  </div>
  `;
}
