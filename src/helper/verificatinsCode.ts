export const generateVerificationCode =  async ()=> {
    // Generates a random number between 1000 and 9999
    return Math.floor(1000 + Math.random() * 9000);
  }