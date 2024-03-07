class OTPGenerator {
  otpMap: Map<string, { otp: number; expiryTime: number }>;
  expiryTime: number;

  constructor() {
    this.otpMap = new Map();
    this.expiryTime = 30 * 60 * 1000; // Expiry time in milliseconds (30 minutes)
  }

  generateOTP(identifier: string): number {
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`Generated OTP ${otp} for identifier ${identifier}`);

    // Set expiry time for the OTP
    const expiryTime = Date.now() + this.expiryTime;

    // Store OTP and expiry time in the map
    this.otpMap.set(identifier, { otp, expiryTime });

    // Set timer to clear OTP after expiry
    setTimeout(() => {
      this.clearOTP(identifier);
      console.log(`OTP expired for identifier ${identifier}`);
    }, this.expiryTime);

    return otp; // Return the generated OTP
  }

  clearOTP(identifier: string): void {
    this.otpMap.delete(identifier);
  }

  isValidOTP(identifier: string, userInput: number): boolean {
    const storedOTP = this.otpMap.get(identifier);

    // Check if OTP exists and is not expired
    if (
      storedOTP &&
      storedOTP.otp === userInput &&
      Date.now() < storedOTP.expiryTime
    ) {
      return true;
    }
    return false;
  }
}

export default OTPGenerator;
