"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    static emailVerification(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = ` <div style="width: 500px; margin:  0 auto;">
        <h1 style="font-family: sans-serif; color: black; ">Tacky Toes</h1>
        <p style="font-family: sans-serif; color: gray; font-size: 0.9rem; line-height: 1.4rem;">Thanks for creating a tacky toes account but your email verification is needed for further engagement with  tacky-toes</p>
        <div>
            <p style="font-family: sans-serif; color: gray; text-align: center; font-size: 0.8rem;">verfiy your email using these numbers</p>
            <div style="display: grid; grid-template-columns: 20% 20% 20% 20%; width: 70%; margin:  0 auto; justify-content: space-between; align-items: center;">
                <div style="border: 1px solid gray; border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">${token.split("")[0]}</p></div>
                <div style="border: 1px solid gray; border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">${token.split("")[1]}</p></div>
                <div style="border: 1px solid gray; border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">${token.split("")[2]}</p></div>
                <div style="border: 1px solid gray; border-radius: 2.5px; display: flex; justify-content: center; align-items: center; height: 40px; ">
                <p style="font-size: 1.5rem; font-weight: bold; color: black; font-family: sans-serif;">${token.split("")[3]}</p></div>
            </div>

        </div>
     </div>`;
            return email;
        });
    }
    ;
}
exports.Email = Email;
