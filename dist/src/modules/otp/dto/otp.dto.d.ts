export declare class SendOtpDto {
    type: 'email' | 'phone';
    identifier: string;
}
export declare class VerifyOtpDto {
    type: 'email' | 'phone';
    identifier: string;
    otp: string;
    name?: string;
}
