const otps = new Map(); // In-memory OTP storage for demo

exports.sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) return res.status(400).json({ error: 'Phone number is required' });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps.set(phoneNumber, otp);

  // SIMULATION: Log to console so user can see it
  console.log('\n----------------------------------------');
  console.log(`🚀 SMS SENT TO: ${phoneNumber}`);
  console.log(`🔑 VERIFICATION CODE: ${otp}`);
  console.log('----------------------------------------\n');

  res.json({ success: true, message: 'OTP sent successfully (Simulated)' });
};

exports.verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber || !otp) return res.status(400).json({ error: 'Missing data' });

  const storedOTP = otps.get(phoneNumber);

  if (storedOTP === otp) {
    otps.delete(phoneNumber); // Clear after use
    res.json({ 
      success: true, 
      user: {
        id: 'user-' + phoneNumber.slice(-4),
        phoneNumber,
        username: `Explorer_${phoneNumber.slice(-4)}`,
        xp: 1540,
        level: 42
      }
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid verification code' });
  }
};
