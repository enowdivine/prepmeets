export function welcomeBackTitle(username: string) {
  return `
  <p>Hi <span class="username">${username}</span>, Welcome back</p>
  `;
}

export function welcomeBack() {
  return `
  <div class="email-content">
  <img src="https://via.placeholder.com/90" alt="Welcome" />
  <p>
    Welcome back! We missed you. Join back in on certifications,
    interviews and exam preparations.Let’s get you your dream job
  </p>
  <div class="action_btn_div">
    <a href="#" class="action_btn">Log in to your account</a>
  </div>
  <p>
    Or simplycopy and paste the link below in your browser if the button
    does not work.
    <a href="https://prepmeetsbywandaprep.com" target="_blank" class="links"
      >https://prepmeetsbywandaprep.com</a
    >
  </p>
  </div>
  `;
}
