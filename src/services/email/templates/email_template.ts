export default function email(emailTitle: string, emailContent: string) {
  return `
   <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prepmeets</title>
     <style>
    body {
      width: 100%;
      margin: 0;
      padding: 0;
      background: #f1effe !important;
      /* overflow-x: hidden; */
    }

    .container {
      width: 100%;
      background: #f1effe !important;
      padding: 30px 0;
    }

    .brand-container {
      text-align: left;
      align-items: left;
      margin: 30px 0 0 100px;
    }

    .brand-title {
      color: #2a3f55;
      font-size: 28.4px;
      font-family: Lunema;
      font-weight: 900;
      word-wrap: break-word;
    }

    .brand-title-color {
      color: #7a24a1;
    }

    .brand-subtitle {
      justify-content: center;
      align-items: center;
      gap: 8.28px;
      display: inline-flex;
    }

    .subtitle-text-wrapper {
      margin-left: 10px;
    }

    .subtitle-text {
      text-align: center;
      color: #2a3e55;
      font-family: Nunito Sans;
      font-weight: 600;
      word-wrap: break-word;
    }

    .logo-container {
      text-align: center;
      margin-top: 30px;
    }

    .logo-container img {
      border-radius: 50%;
    }

    .email-title {
      width: 100%;
      text-align: center;
      margin: 20px 0;
    }

    .email-title p {
      width: 80%;
      font-size: 20px;
      margin: auto;
    }

    .email-content-container {
      width: 80%;
      margin: auto;
      min-height: 100px;
      background: white;
      justify-content: center;
      /* overflow: hidden; */
      border-radius: 5px;
      padding: 20px;
    }

    .social-media-container {
      margin: 30px 0;
    }

    .social-media-icons {
      display: flex;
      justify-content: center;
      text-align: center;
    }

    .social-media-icons-inner-div {
      width: 60%;
      margin: auto;
    }

    .social-media-icons img {
      width: 90px;
      height: 90px;
    }

    .footer-text {
      text-align: center;
      color: #171725;
      font-size: 24px;
      font-family: Lunema;
      font-weight: 400;
      word-wrap: break-word;
    }

    .footer-text-bold {
      text-align: center;
      color: #171725;
      font-size: 24px;
      font-family: Lunema;
      font-weight: 700;
      /* word-wrap: break-word; */
    }

    .footer-description {
      text-align: center;
      color: #171725;
      font-size: 24px;
      font-family: Lunema;
      font-weight: 400;
      word-wrap: break-word;
      margin: 10px 0;
    }

    .username {
      font-weight: bold;
    }

    .action_btn_div {
      margin: 50px 0;
    }

    .action_btn {
      background-color: #7a24a1;
      color: white !important;
      border: none;
      border-radius: 30px;
      padding: 20px 60px;
      font-weight: bold;
      text-decoration: none;
    }

    /* Welcome email content styles */
    .email-content {
      text-align: center;
      width: 70%;
      margin: 40px auto;
      font-size: 18px;
    }

    .email-content .links {
      color: #7a24a1;
      text-decoration: none;
    }

    .email-content .activation-code {
      margin: 40px 0;
    }

    .email-content .activation-code span {
      border: 1px dotted #7a24a1;
      border-radius: 30px;
      padding: 10px 35px;
      color: #7a24a1;
      letter-spacing: 5px;
    }

    .expert-welcome-mail {
      text-align: center;
      width: 80%;
      margin: 40px auto;
      font-size: 18px;
    }

    .expert-welcome-mail .expert-welcome-mail-div {
      width: 100%;
      display: flex;
      margin-top: 30px;
    }

    .expert-welcome-mail-div .image-div {
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .expert-welcome-mail-div .image-div img {
      width: 100%;
    }

    .expert-welcome-mail-div .content {
      width: 100%;
      text-align: left;
      padding-left: 10px;
    }

    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
      .brand-container {
        margin: 10px 0 0 10px;
      }

      .email-content-container {
        width: 90%;
      }

      .email-content {
        width: 98%;
      }

      .expert-welcome-mail {
        width: 100%;
      }

      .expert-welcome-mail .expert-welcome-mail-div {
        width: 100%;
        display: block;
      }

      .social-media-icons-inner-div {
        width: 100%;
        margin: auto;
      }
    }
  </style>
  </head>
  <body>
    <div class="container">
      <div class="brand-container">
        <div class="brand-title">
          <span class="brand-title-color">Prep</span>meets
        </div>
        <div class="brand-subtitle">
          <span class="subtitle-text">by</span>
          <span><span class="subtitle-text">Wanda</span>prep</span>
        </div>
      </div>
      <div class="logo-container">
        <img src="https://via.placeholder.com/90" alt="Logo" />
      </div>
      <div class="email-title">
       ${emailTitle}
      </div>
      <div class="email-content-container">
        <!-- Email Content Goes Here -->
        ${emailContent}
      </div>
      <div class="social-media-container">
        <div class="social-media-icons">
          <div class="social-media-icons-inner-div">
            <img src="https://via.placeholder.com/90" alt="Facebook" />
            <img src="https://via.placeholder.com/90" alt="Twitter" />
            <img src="https://via.placeholder.com/90" alt="LinkedIn" />
            <img src="https://via.placeholder.com/90" alt="Instagram" />
            <!-- Add more social media icons as needed -->
          </div>
        </div>
        <div class="footer-text">
          <div class="footer-description">Copyright &copy; 2023</div>
          <div class="footer-text-bold">Prepmeets</div>
          <div class="footer-description">Prepmeets by wandameet</div>
        </div>
      </div>
    </div>
  </body>
</html>

  `;
}

// <p>
//           Hi <span class="username">James</span>, your
//           <span class="brand-title-color">Prep</span>meets account has been
//           approved!
//         </p>
//         <p>
