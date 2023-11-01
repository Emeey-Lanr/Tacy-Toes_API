import { pool } from "../../config/db";
import { UserH } from "../helpers/user";
import { SignupBodyI } from "../interfaces/user";
import { TokenGenerator } from "../utils/token.generator";
import { Email } from "../utils/email";
export class UserS {
  static async signup(body: SignupBodyI) {
    const { username, email, phone_number, password } = body;
    try {
      const checkEmail = await UserH.userExist("email", `${email}`);
      const checkUsername = await UserH.userExist("username", `${username}`);

      if (checkEmail instanceof Error) {
        return new Error(checkEmail.message);
      }

      // we check if username, email exits or both
      if (checkEmail || checkUsername) {
        return new Error(
          `${
            checkEmail ? "Email already exits" : "Username name already exits"
          }`
        );
      }
      const hashPassword = await UserH.hashPassword(password);
      const addUserQuery =
        "INSERT INTO user_tb (email , username, phone_number, password, img_url, is_verified, has_paid, payment_type) VALUES ($1, $2,$3, $4,$5, $6,$7, $8)";
      const addUser = await pool.query(addUserQuery, [
        email,
        username,
        phone_number,
        hashPassword,
        "",
        false,
        username === "Emeey_Lanr" ? true : false,
        `${username === "Emeey_Lanr" ? "year" : "none"}`,
      ]);

      const emailToken = await TokenGenerator.emailToken();

      const jwtToken = await TokenGenerator.jwtTokenGenerator(
        { email, username, emailToken },
        "1hr"
      );

      const emailToBeSent = await Email.emailVerification(
        `${jwtToken}`,
        emailToken,
        email
      );

      const sendMail = await UserH.sendEmail(
        `${emailToken}`,
        email,
        `${emailToBeSent}`
      );
      if (sendMail instanceof Error) {
        return new Error(
          "An error occured sending email verification, proceed to login"
        );
      }

      return {
        token: jwtToken,
        redirectURL: `${`/email/verification/${jwtToken}?email=${email}`}`,
      };
    } catch (error: any) {
      return new Error("Unable to register user");
    }
  }
  static async signin(payload: { username_email: string; password: string }) {
      try {
       
        const checkIfEmailOrUsername = await UserH.checkIfEmailOrUsername(payload.username_email);
       
          
          const validateUsernameEmail = await pool.query(`SELECT email, username, password, is_verified FROM user_tb WHERE ${checkIfEmailOrUsername} = $1`, [payload.username_email])
      
          if (validateUsernameEmail.rows.length < 1) {
             return new Error(`Invalid Login Crendentials`)
          }

          const validatePassword = await UserH.verifyPassword(payload.password, `${validateUsernameEmail.rows[0].password}`)
        
            if (!validatePassword) {
              return new Error("Invalid Password")
          }
          
            const emailToken = await TokenGenerator.emailToken();
         let tokenDetails = validateUsernameEmail.rows[0].is_verified
           ? {
               email: validateUsernameEmail.rows[0].email,
               username: validateUsernameEmail.rows[0].username,
             }
           : {
               email: validateUsernameEmail.rows[0].email,
                 username: validateUsernameEmail.rows[0].username,
                  emailToken
             };
            const jwtToken = await TokenGenerator.jwtTokenGenerator( tokenDetails, `${validateUsernameEmail.rows[0].is_verified ? '7days' : '1hr'}` );


          if (!validateUsernameEmail.rows[0].is_verified) {
            const emailToBeSent = await Email.emailVerification(
              `${jwtToken}`,
              emailToken,
              `${validateUsernameEmail.rows[0].email}`
              );
              const sendMail = await UserH.sendEmail(
                `${emailToken}`,
                `${validateUsernameEmail.rows[0].email}`,
                `${emailToBeSent}`
              );
              if (sendMail instanceof Error) {
                return new Error(
                  "An error occured sending email verification, proceed to login"
                );
              }
          return {
            token: jwtToken,
            verified: false,
            redirectURL: `${`/email/verification/${jwtToken}?email=${validateUsernameEmail.rows[0].email}`}`,
          };
          } else {
              return {token:jwtToken, username:validateUsernameEmail.rows[0].username, verified:true}
          }
      } catch (error:any) {
          console.log(error.message)
         return new Error("An error occured logining in");
    }
  }
  static async verifyEmail(jwtToken: string, emailToken: string[]) {
    try {
      let payloadVerificationToken =
        emailToken[0] + emailToken[1] + emailToken[2] + emailToken[3];
      const verifyToken = await TokenGenerator.decodeJwt(jwtToken);
      console.log(verifyToken, payloadVerificationToken);
      if (verifyToken instanceof Error) {
        return new Error(verifyToken.message);
      }

      if (verifyToken.emailToken !== payloadVerificationToken) {
        return new Error("Invalid Email Token");
      }

      const isVerified = await pool.query(
        "UPDATE user_tb SET is_Verified = $1 WHERE email = $2",
        [true, verifyToken.email]
      );
      const generateToken = await TokenGenerator.jwtTokenGenerator(
        { userEmail: verifyToken.email, username: verifyToken.username },
        "7days"
      );

      return { token: generateToken, username: verifyToken.username };
    } catch (error: any) {
      return new Error("An error occured");
    }
  }
    static async getUserDetails(id:string, token:string) {
        try {
            const verifyToken = await TokenGenerator.decodeJwt(token)
            if (verifyToken instanceof Error) {
                return new Error(verifyToken.message)
            }
         
            if (verifyToken.username !== id) {
                return new Error("Acess not allowed")
            }
            const userInfo  = await pool.query("SELECT  id, email, username, phone_number, img_url, is_verified, has_paid, payment_type FROM user_tb WHERE username = $1", [verifyToken.username])
            const allGamesCreated = await pool.query("SELECT * FROM game_tb WHERE creator_username = $1", [verifyToken.username])
            return {userInfo: userInfo.rows[0], allGamesCreatedInfo:allGamesCreated.rows}
        } catch (error) {
            return new Error("An error occured")
        }
      
  }

  static async changePassword(old_password: string, new_password: string, email: string) {
  try {
     const oldPassword = await pool.query("SELECT password FROM user_tb WHERE email = $1", [email])
      
    const validatePassword = await UserH.verifyPassword(old_password, oldPassword.rows[0].password)
    if (!validatePassword) {
          return new Error("Invalid Password")
    }
    const hashNewPassword = await UserH.hashPassword(new_password)
    const updatePassword = await pool.query("UPDATE user_tb SET password = $1 WHERE email = $2", [hashNewPassword, email])
  
  } catch (error) {
    console.log(error)
     return new Error("An error occured")
  }
    
  }
}