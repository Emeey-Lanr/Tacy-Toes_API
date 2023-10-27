export class Email {
 static async emailVerification (token: string)  {
    let email = ` <div style="width: 500px; margin:  0 auto;">
        <h1 style="font-family: sans-serif; color: black; ">Tacky Toes</h1>
        <p style="font-family: sans-serif; color: gray; font-size: 0.9rem; line-height: 1.4rem;">Thanks for creating a tacky toes account but your email verification is needed for further engagement with  tacky-toes</p>
        <div>
            <p style="font-family: sans-serif; color: gray; text-align: center; font-size: 0.8rem;">verfiy your email using these numbers</p>
            <div style="display: flex; margin:  0 auto; justify-content: space-between; align-items: center;">
                <div style="border: 1px solid gray;  width:40px; margin:0 5px; border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">${
                  token.split("")[0]
                }</p></div>
                <div style="border: 1px solid gray; width:40px; margin:0 5px;  border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">${
                  token.split("")[1]
                }</p></div>
                <div style="border: 1px solid gray;  width:40px; margin:0 5px; border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">${
                  token.split("")[2]
                }</p></div>
                <div style="border: 1px solid gray; width:40px; margin:0 5px;  border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">${
                  token.split("")[3]
                }</p></div>
            </div>

        </div>
     </div>`;
    return email
  };
}

