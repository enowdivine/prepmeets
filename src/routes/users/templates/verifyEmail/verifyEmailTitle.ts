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
