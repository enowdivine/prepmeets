export function resetPasswordTitle() {
  return `
  <p>Reset Your Password</p>
    `;
}

export function resetPassword(code: number) {
  return `
  <div class="email-content">
  <img src="https://via.placeholder.com/90" alt="Welcome" />
  <h4>Hello,</h4>
  <p>
    we recently received a request for a forgotten password. To change
    your prepmeet account password, use the code below
  </p>
  <div class="activation-code">
    <span>${code}</span>
  </div>
  <p>
    If you did not request this change, you do not need to do anything.
    Thanks,
  </p>
  </div>
  `;
}

// <p>
//     If you did not request this change, you do not need to do anything.
//     Thanks,
//   </p>
//   <div class="action_btn_div">
//     <a href="${url}" target="_blank" class="action_btn">Reset your password</a>
//   </div>
