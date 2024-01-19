export function welcomeEmailTitle(username: string) {
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
              >Hi Expert </span
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
              >,<br />Welcome to </span
            ><span
              style="
                color: #7a24a1;
                font-size: 52px;
                font-family: Lunema;
                font-weight: 700;
                word-wrap: break-word;
              "
              >Prep</span
            ><span
              style="
                color: #171725;
                font-size: 52px;
                font-family: Lunema;
                font-weight: 400;
                word-wrap: break-word;
              "
              >meets</span
            >
          </div>
    `;
}
