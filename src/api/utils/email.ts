export class Email {
 static async emailVerification (jwtToken:string, token: string, userEmail:string)  {
    let email =    ` <div style="width: 500px; margin:  0 auto;">
        <h1 style="font-family: sans-serif; text-align:center; color: black; ">Tacky Toes</h1>
        <p style="font-family: sans-serif; color: gray; font-size: 0.9rem; line-height: 1.4rem; text-align:center;">Thanks for creating a tacky toes account but your email verification is needed for further engagement with  tacky-toes</p>
        <div>
            <p style="font-family: sans-serif; color: gray; text-align: center; font-size: 0.8rem;">verfiy your email using these numbers</p>
            <div style="display: flex; margin:  0 auto; justify-content: center; align-items: center;">
                <div style="border: 1px solid gray;  width:40px; margin:0 5px; border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">
                ${token.split("")[0]}</p></div>
                <div style="border: 1px solid gray; width:40px; margin:0 5px;  border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">
                ${token.split("")[1]}</p></div>
                <div style="border: 1px solid gray;  width:40px; margin:0 5px; border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">
                ${token.split("")[2]}</p></div>
                <div style="border: 1px solid gray; width:40px; margin:0 5px;  border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">
                ${token.split("")[3]}</p></div>
            </div>
           <a style="text-decoration:none;" href="http://localhost:3000/email/verification/${jwtToken}?email=${userEmail}">
               <div style="width:300px;height:40px; background:black;color:white; display:flex; justify-content:center; align-items:center; font-family:sans-serif;
               border-radius:3px; margin:20px auto;">
                    Proceed
               </div>
              
            </a>

        </div>
     </div>`
    
  
    return email
    };
    static async passwordResetEmail(username:string,token:string) {
        let email = `
         <div style="width: 500px; margin:  0 auto;">
        <h1 style="font-family: sans-serif; text-align:center; color: black; ">Tacky Toes</h1>

        <div>

            <div style="display: flex; font-size:1rem;  margin:  0 auto; justify-content: center; align-items: center;">
               Click on the button below to reset your forgot password
            </div>
           <a style="text-decoration:none;" href="http://localhost:3000/login/reset/${token}">
               <div style="width:300px;height:40px; position:relative; background:black;color:white; display:flex; justify-content:center; align-items:center; font-family:sans-serif;
               border-radius:3px; margin:20px auto;">
                    <p style="position:absolute; left:0; top:0; bottom:0; right:0;">proceed</p> 
               </div>
              
            </a>

        </div>
     </div>
        `
        return email
    }  
}

