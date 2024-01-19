export function verifyEmailTitle(username: string) {
  return `
          <div style="width: 679px; text-align: center">
        <span
          style="
            color: #171725;
            font-size: 52px;
            font-family: Lunema;
            font-weight: 400;
            word-wrap: break-word;
          "
          >Hi </span
        ><span
          style="
            color: #171725;
            font-size: 52px;
            font-family: Lunema;
            font-weight: 700;
            word-wrap: break-word;
          "
          >${username}</span
        ><span
          style="
            color: #171725;
            font-size: 52px;
            font-family: Lunema;
            font-weight: 400;
            word-wrap: break-word;
          "
          >,<br />Just a friendly reminder to verify your email address.</span
        >
      </div>
  `;
}

export function verifyEmail() {
  return `
        <div
            style="
              align-self: stretch;
              height: 233px;
              padding-top: 7.89px;
              padding-bottom: 8.89px;
              padding-right: 15px;
              justify-content: center;
              align-items: center;
              display: inline-flex;
            "
          >
            <div
              style="
                width: 233px;
                align-self: stretch;
                justify-content: center;
                align-items: center;
                display: inline-flex;
              "
            >
              <img
                style="width: 233px; height: 216.22px"
                src="../../../assets/mailTemplateFiles/clock.png"
              />
            </div>
          </div>
          <div
            style="
              align-self: stretch;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              gap: 58px;
              display: inline-flex;
            "
          >
            <div
              style="
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                gap: 25px;
                display: flex;
              "
            >
              <div
                style="
                  width: 739px;
                  text-align: center;
                  color: #5e5e5e;
                  font-size: 20px;
                  font-family: Montserrat;
                  font-weight: 500;
                  word-wrap: break-word;
                "
              >
                Hey James, you are almost ready to start your enjoying
                Prepmeets.<br />Simply click the purple button below to verify
                your email address. For security reasons, please help us by
                verifying your email address.
              </div>
            </div>
            <div
              style="
                width: 335px;
                height: 60px;
                padding-left: 40px;
                padding-right: 40px;
                padding-top: 20px;
                padding-bottom: 20px;
                background: #7a24a1;
                border-radius: 60px;
                justify-content: center;
                align-items: center;
                gap: 8px;
                display: inline-flex;
              "
            >
              <div
                style="
                  text-align: center;
                  color: white;
                  font-size: 18px;
                  font-family: Montserrat;
                  font-weight: 700;
                  word-wrap: break-word;
                "
              >
                Verify email address
              </div>
            </div>
          </div>
    `;
}
