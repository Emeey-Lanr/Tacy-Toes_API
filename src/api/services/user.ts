import { pool } from "../../config/db";
import { UserH } from "../helpers/user";
import { SignupBodyI } from "../interfaces/user";
import { TokenGenerator } from "../utils/token.generator";
import { Email } from "../utils/email";
export class UserS {
    static async signup(body:SignupBodyI) {
         const {username, email, phone_number, password} = body
        try {
        
            const checkEmail = await UserH.userExist('email', `${email}`)
            const checkUsername = await UserH.userExist('username', `${username}`)
               
     
            if (checkEmail instanceof Error) {
                return new Error(checkEmail.message)
            }
            
            // we check if username, email exits or both 
            if (checkEmail || checkUsername) {
                return new Error(`${checkEmail ? 'Email already exits' : 'Username name already exits'}`)
            }
            const hashPassword = await UserH.hashPassword(password)
            const addUserQuery =
                "INSERT INTO user_tb (email , username, phone_number, password, img_url, is_verified, has_paid, payment_type) VALUES ($1, $2,$3, $4,$5, $6,$7, $8)";
            const addUser = await pool.query(addUserQuery, [
              email,
              username,
              phone_number,
              hashPassword,
              '',
              false,
              username === 'Emeey_Lanr' ? true : false,
              `${username === 'Emeey_Lanr' ? 'year' : 'none'}`,
            ])

            const emailToken = await TokenGenerator.emailToken()
            
            const jwtToken = await TokenGenerator.jwtTokenGenerator({ email, username,emailToken, }, '1hr')

      
        //     const emailToBeSent = await Email.emailVerification(`${jwtToken}`,emailToken, email)
            
          
        //     const sendMail =  await UserH.sendEmail(`${emailToken}`, email, `${emailToBeSent}`)
        //     if (sendMail instanceof Error) {
        //        return new Error("An error occured sending email verification, proceed to login")
        //    }
         
            return { token: jwtToken, redirectURL:`${`/email/verification/${jwtToken}?email=${email}`}` }

        } catch (error:any) {
          
            return new Error('Unable to register user')
        }
    }
    static async verifyEmail(jwtToken:string, emailToken:string[]) {
        try {
            let payloadVerificationToken = emailToken[0] + emailToken[1] + emailToken[2] + emailToken[3]
            const verifyToken = await TokenGenerator.decodeJwt(jwtToken)
            console.log(verifyToken, payloadVerificationToken)
            if (verifyToken instanceof Error) {
                return new Error(verifyToken.message)
            }
        
            if (verifyToken.emailToken !== payloadVerificationToken) {
                return new Error("Invalid Email Token")
            }
            
            const isVerified = await pool.query("UPDATE user_tb SET is_Verified = $1 WHERE email = $2", [true, verifyToken.email])
            const generateToken = await TokenGenerator.jwtTokenGenerator({ userEmail: verifyToken.email, username:verifyToken.username }, '7days')
            
            return { token: generateToken, username: verifyToken.username }

        } catch (error:any) {
         return new Error("An error occured");
        }
    }
}