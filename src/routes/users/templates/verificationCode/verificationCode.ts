export function verificationCodeTitle() {
  return `
  <p>Activation Code</p>
    `;
}

export function verificationCode(code: any) {
  return `
<div class="email-content">
  <img src="https://via.placeholder.com/90" alt="Welcome" />
  <div class="activation-code">
    <span>${code}</span>
  </div>
  <p>
    You are ready to setup your account. 
    Use the code above to activate your account.
  </p>
</div>
    `;
}

// <div class="action_btn_div">
//   <a href="#" class="action_btn">
//     Activate your account
//   </a>
// </div>;
