import jwt from "jsonwebtoken"

export  class TokenGenerator {
  static async jwtTokenGenerator(the_token: any) {
        try {
                const generatedToken = await jwt.sign(
                  { data: the_token },
                  `${process.env.JWT_SECRET}`,
                  { expiresIn: "1hr" }
                );
                return generatedToken;
        } catch (error) {
            
        }
    
    }
    static async emailToken() {
         let token =
           String(Math.floor(Math.random() * 10)) +
           String(Math.floor(Math.random() * 10)) +
           String(Math.floor(Math.random() * 10)) +
            String(Math.floor(Math.random() * 10));
        return token
    }
}