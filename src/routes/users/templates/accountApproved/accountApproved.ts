export function accountApproved(username: string, price: any) {
  return `
  <div class="email-content">
  <img src="https://via.placeholder.com/90" alt="Welcome" />
  <p>
    Hey James, your account has been verified start enjoying Prepmeets.
  </p>
  <hr />
  <p>
    You can now access your Prepmeets account online or on any device by
    going to
    <a href="https://prepmeetsbywandaprep.com" class="links"
      >https://prepmeetsbywandaprep.com</a
    >
  </p>
  <div class="action_btn_div">
    <a href="#" class="action_btn">Verify email address</a>
  </div>
  </div>
  `;
}
