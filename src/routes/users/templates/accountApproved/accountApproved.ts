export function accountApproved(username: string, price: any) {
  return `
        <div
  style="
    left: 266px;
    top: 343px;
    position: absolute;
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
        width: 579px;
        text-align: center;
        color: #5e5e5e;
        font-size: 24px;
        font-family: Lunema;
        font-weight: 400;
        word-wrap: break-word;
      "
    >
      Hey James, your account has been verified start enjoying Prepmeets.
    </div>
    <div style="width: 485px; height: 0px; border: 1px #e5e5e5 solid"></div>
    <div style="width: 579px; text-align: center">
      <span
        style="
          color: #5e5e5e;
          font-size: 24px;
          font-family: Lunema;
          font-weight: 400;
          word-wrap: break-word;
        "
        >You can now access your </span
      ><span
        style="
          color: #5e5e5e;
          font-size: 24px;
          font-family: Lunema;
          font-weight: 700;
          word-wrap: break-word;
        "
        >Prep</span
      ><span
        style="
          color: #5e5e5e;
          font-size: 24px;
          font-family: Lunema;
          font-weight: 400;
          word-wrap: break-word;
        "
        >meets account online or on any device by going to </span
      ><span
        style="
          color: #7a24a1;
          font-size: 24px;
          font-family: Lunema;
          font-weight: 400;
          word-wrap: break-word;
        "
        >https://prepmeetsbywandaprep.com</span
      >
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
      background: linear-gradient(0deg, #7a24a1 0%, #7a24a1 100%),
        linear-gradient(0deg, #7a24a1 0%, #7a24a1 100%);
      border-radius: 60px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      display: inline-flex;
      cursor: pointer;
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
      Get started
    </div>
  </div>
</div>
<img
  style="
    width: 252px;
    height: 252px;
    left: 430px;
    top: 63px;
    position: absolute;
    background: linear-gradient(0deg, #d3faff 0%, #d3faff 100%);
    border-radius: 8px;
  "
  src="../../../assets/mailTemplateFiles/handphone.png"
/>
  `;
}
