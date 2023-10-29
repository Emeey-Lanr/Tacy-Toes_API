import brcypt from "bcryptjs"
import { pool } from "../../config/db"
import nodeMailer from "nodemailer"

export class UserH {
    static async userExist(columnName:string, data:string) {
        // two username should exit, same goes for email also
        try {
         
            const query = `SELECT email FROM user_tb WHERE ${columnName} = $1`
            const checkIfQuery = await pool.query(`${query}`, [data])
         
            if (checkIfQuery.rows.length > 0) {
              return true
            }
            return false
        } catch (error: any) {
         
            return new Error(error.message)
        }
    }
    static async hashPassword(password:string) {
        try {
            const passwordHashing = await brcypt.hash(password, 10)
            return passwordHashing
        } catch (error:any) {
        
            return new Error("Unable to hash password")
        } 
        
    }
    static async verifyPassword(password:string, hashedPassword:string) {
      
          const verifiedPassword = await brcypt.compare(password, hashedPassword)
         return verifiedPassword
        
    }
    static async checkIfEmailOrUsername(emailUsername:string) {
        
            let type = ''
           
            const check = emailUsername.split("@")
          
            if (check.length > 1) {
               return  type = 'email'
            }
          return  type = 'username'
         
       
    }
    static async sendEmail(token: string, userEmail: string, email:string) {
        
        try {
            const transporter = nodeMailer.createTransport({
                service: "gmail",
                auth: {
                    user: `${process.env.APP_EMAIL}`,
                    pass:`${process.env.EMAIL_PASS}`,
                }
                
            })
            const mailOption = {
                from: '',
                to: `${userEmail}`,
                subject: 'Email Verification',
                text: '',
                html:`${email}`
                
            }
            const sendMail =  await transporter.sendMail(mailOption)
        } catch (error:any) {
     
          return new Error("An error occured, couldn't send email")   
        }
        
    }
    
}