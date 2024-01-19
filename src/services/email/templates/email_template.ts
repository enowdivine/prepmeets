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
        background: #f1effe;
        /* overflow-x: hidden; */
      }

      .container {
        width: 100%;
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

      .subtitle-text {
        text-align: center;
        color: #2a3e55;
        font-size: 12.41px;
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
        width: 30%;
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
      /* Extra small devices (phones, 600px and down) */
      @media only screen and (max-width: 600px) {
        .brand-container {
          margin: 10px 0 0 10px;
        }
        .email-content-container {
          width: 90%;
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
          <svg
            width="69"
            height="13"
            viewBox="0 0 69 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Vector">
              <path
                d="M5.77861 3.60627L5.79629 3.88919L5.84345 7.79704C5.84345 8.13104 5.95937 8.45915 6.1912 8.78137C6.41125 9.02106 6.74133 9.14091 7.18143 9.14091C7.85729 9.14091 8.28561 8.83442 8.46636 8.22142C8.5253 8.05638 8.55477 7.8658 8.55477 7.64968V3.61806H9.92812V7.67915C9.92812 8.54756 9.62752 9.27648 9.02631 9.8659C8.53513 10.2981 7.91624 10.5143 7.16964 10.5143C6.30516 10.5143 5.61554 10.2235 5.10078 9.64192C4.59781 10.2235 3.89836 10.5143 3.00245 10.5143C1.84719 10.5143 1.02789 10.0015 0.54457 8.97588C0.363815 8.55935 0.273438 8.15658 0.273438 7.76757V3.61806H1.64678V7.72631C1.64678 8.18998 1.81772 8.58097 2.15958 8.89925C2.38749 9.06036 2.68416 9.14091 3.0496 9.14091C3.64295 9.14091 4.04572 8.89925 4.25791 8.41593C4.35615 8.16837 4.40526 7.94832 4.40526 7.75578V3.61806H4.4701L5.77861 3.60627Z"
                fill="#2A3F55"
              />
              <path
                d="M13.9715 3.61806C14.7103 3.61806 15.394 3.844 16.0227 4.29589H16.0404V3.61806H17.4137V10.5143H16.0404V9.83643C15.3999 10.2883 14.7456 10.5143 14.0776 10.5143H13.8949C12.8615 10.5143 11.9675 10.0624 11.2131 9.1586C10.7494 8.50631 10.5175 7.81079 10.5175 7.07205C10.5175 5.92858 11.0107 4.98354 11.997 4.23695C12.606 3.82435 13.2642 3.61806 13.9715 3.61806ZM11.8909 7.06026C11.8909 7.83044 12.2583 8.44343 12.9931 8.89925C13.3035 9.06036 13.6198 9.14091 13.9421 9.14091H14.0305C14.6553 9.14091 15.1995 8.85013 15.6632 8.26857C15.9147 7.88742 16.0404 7.51019 16.0404 7.13689V7.04258C16.0404 6.32349 15.6985 5.73604 15.0148 5.28022C14.6651 5.08768 14.3134 4.9914 13.9597 4.9914C13.2996 4.9914 12.7416 5.28218 12.2858 5.86374C12.0225 6.25276 11.8909 6.6516 11.8909 7.06026Z"
                fill="#2A3F55"
              />
              <path
                d="M18.0032 3.61806H19.3765V4.21926H19.3942C19.9718 3.81846 20.6555 3.61806 21.4454 3.61806C22.9779 3.61806 24.0427 4.30768 24.64 5.68692C24.8129 6.13881 24.8994 6.58087 24.8994 7.01311V10.5143H23.526V7.06026C23.526 6.50621 23.3492 6.01699 22.9955 5.59261C22.6262 5.19181 22.1094 4.9914 21.4454 4.9914C20.5023 4.9914 19.8677 5.3981 19.5415 6.2115C19.4315 6.49835 19.3765 6.79503 19.3765 7.10152V10.5143H18.0032V3.61806Z"
                fill="#2A3F55"
              />
              <path
                d="M31.0116 0.164062H32.385V10.5143H31.0116V9.83643C30.3711 10.2883 29.6913 10.5143 28.9722 10.5143H28.9015C27.7895 10.5143 26.8523 10.0211 26.09 9.03482C25.6892 8.41396 25.4888 7.75578 25.4888 7.06026C25.4888 5.92858 25.9819 4.98354 26.9682 4.22516C27.5812 3.82042 28.2492 3.61806 28.9722 3.61806C29.6953 3.61806 30.3692 3.844 30.9939 4.29589H31.0116V0.164062ZM26.8621 7.07205C26.8621 7.80293 27.204 8.39628 27.8877 8.8521C28.2099 9.04464 28.5714 9.14091 28.9722 9.14091C29.656 9.14091 30.2257 8.82459 30.6816 8.19195C30.9016 7.83437 31.0116 7.47679 31.0116 7.11921V7.01311C31.0116 6.36868 30.7091 5.81659 30.1039 5.35684C29.7424 5.11322 29.3455 4.9914 28.9133 4.9914C28.2414 4.9914 27.6736 5.3038 27.2099 5.92858C26.978 6.29402 26.8621 6.67518 26.8621 7.07205Z"
                fill="#2A3F55"
              />
              <path
                d="M36.4284 3.61806C37.1671 3.61806 37.8509 3.844 38.4796 4.29589H38.4973V3.61806H39.8706V10.5143H38.4973V9.83643C37.8568 10.2883 37.2025 10.5143 36.5345 10.5143H36.3518C35.3183 10.5143 34.4244 10.0624 33.6699 9.1586C33.2062 8.50631 32.9744 7.81079 32.9744 7.07205C32.9744 5.92858 33.4675 4.98354 34.4538 4.23695C35.0629 3.82435 35.7211 3.61806 36.4284 3.61806ZM34.3477 7.06026C34.3477 7.83044 34.7151 8.44343 35.45 8.89925C35.7604 9.06036 36.0767 9.14091 36.3989 9.14091H36.4873C37.1121 9.14091 37.6563 8.85013 38.12 8.26857C38.3715 7.88742 38.4973 7.51019 38.4973 7.13689V7.04258C38.4973 6.32349 38.1554 5.73604 37.4717 5.28022C37.1219 5.08768 36.7703 4.9914 36.4166 4.9914C35.7565 4.9914 35.1985 5.28218 34.7427 5.86374C34.4794 6.25276 34.3477 6.6516 34.3477 7.06026Z"
                fill="#2A3F55"
              />
              <path
                d="M44.9049 3.87737C46.8484 3.87737 48.2245 5.32592 48.2245 7.25733C48.2245 9.18874 46.8484 10.6494 44.9049 10.6494C43.7098 10.6494 42.6958 10.0699 42.1164 9.15253V12.8343H41.5249V3.99808H41.9474L42.0802 5.4225C42.6596 4.48093 43.6857 3.87737 44.9049 3.87737ZM44.8687 10.082C46.4621 10.082 47.633 8.88696 47.633 7.25733C47.633 5.63978 46.4621 4.44472 44.8687 4.44472C43.2873 4.44472 42.0923 5.65185 42.0923 7.25733C42.0923 8.86282 43.2873 10.082 44.8687 10.082Z"
                fill="#2A3F55"
              />
              <path
                d="M52.73 3.98601H53.2974V4.54129H52.6817C51.378 4.54129 50.5451 5.50699 50.5451 6.89519V10.5166H49.9536V3.99808H50.3882L50.4968 5.28971C50.9314 4.46886 51.6919 3.98601 52.73 3.98601Z"
                fill="#2A3F55"
              />
              <path
                d="M60.2549 7.24526C60.2549 7.31769 60.2429 7.40219 60.2429 7.47462H54.3279C54.4124 8.9956 55.5351 10.0699 57.0198 10.0699C58.0942 10.0699 58.9512 9.53881 59.4341 8.62139H60.0618C59.4582 9.92509 58.3839 10.6494 57.0198 10.6494C55.1488 10.6494 53.7364 9.18874 53.7364 7.25733C53.7364 5.338 55.1488 3.87737 57.0198 3.87737C58.9271 3.87737 60.2549 5.35007 60.2549 7.24526ZM57.0198 4.43265C55.5713 4.43265 54.4849 5.45871 54.3279 6.91934H59.6635C59.5307 5.4225 58.4322 4.43265 57.0198 4.43265Z"
                fill="#2A3F55"
              />
              <path
                d="M65.3223 3.87737C67.2658 3.87737 68.642 5.32592 68.642 7.25733C68.642 9.18874 67.2658 10.6494 65.3223 10.6494C64.1273 10.6494 63.1133 10.0699 62.5339 9.15253V12.8343H61.9424V3.99808H62.3649L62.4977 5.4225C63.0771 4.48093 64.1031 3.87737 65.3223 3.87737ZM65.2861 10.082C66.8795 10.082 68.0505 8.88696 68.0505 7.25733C68.0505 5.63978 66.8795 4.44472 65.2861 4.44472C63.7048 4.44472 62.5097 5.65185 62.5097 7.25733C62.5097 8.86282 63.7048 10.082 65.2861 10.082Z"
                fill="#2A3F55"
              />
            </g>
          </svg>
        </div>
      </div>
      <div class="logo-container">
        <img src="https://via.placeholder.com/90" alt="Logo" />
      </div>
      <div class="email-title">
        <p>
          Hi <span class="username">James</span>, your
          <span class="brand-title-color">Prep</span>meets account has been
          approved!
        </p>
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
