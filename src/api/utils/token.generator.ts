import jwt from "jsonwebtoken"

export  class TokenGenerator {
  static async jwtTokenGenerator(the_token: any, expiringTime:string) {
        try {
                const generatedToken = await jwt.sign(
                  { data: the_token },
                  `${process.env.JWT_SECRET}`,
                  { expiresIn: `${expiringTime}` }
                );
                return generatedToken;
        } catch (error) {
            return  new Error("unable to generate token")
        }
    
  }
  static async decodeJwt(token:string) {
    try {
      const {data} = await jwt.verify(token, `${process.env.JWT_SECRET}`) as {data:any | string}
     
      return data
      
    } catch (error) {
      return new Error("Invalid Token")
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