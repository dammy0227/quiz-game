import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/questionModel.js";

dotenv.config();

const questions = [
  // Original 20 questions
  {
    question: "What does 'phishing' typically involve?",
    options: ["Fishing emails", "Fraudulent emails", "Secure emails", "Encrypted emails"],
    correctAnswer: "Fraudulent emails"
  },
  {
    question: "What does VPN stand for?",
    options: ["Virtual Public Network", "Virtual Private Network", "Verified Personal Network", "Virtual Protected Network"],
    correctAnswer: "Virtual Private Network"
  },
  {
    question: "Which of the following is a strong password?",
    options: ["password123", "12345678", "Qwerty!", "Tg7$kLp9@!"],
    correctAnswer: "Tg7$kLp9@!"
  },
  {
    question: "A firewall is used to:",
    options: ["Encrypt data", "Block unauthorized access", "Create malware", "Delete viruses"],
    correctAnswer: "Block unauthorized access"
  },
  {
    question: "What does 'HTTPS' stand for?",
    options: ["Hypertext Transfer Protocol Secure", "High Transfer Protocol Service", "Hyperlink Text Processing System", "Host Transfer Protocol Secure"],
    correctAnswer: "Hypertext Transfer Protocol Secure"
  },
  {
    question: "Which of these is a form of malware?",
    options: ["Trojan", "VPN", "Firewall", "Antivirus"],
    correctAnswer: "Trojan"
  },
  {
    question: "Ransomware typically demands payment in:",
    options: ["Credit card", "Bitcoin", "PayPal", "Cash"],
    correctAnswer: "Bitcoin"
  },
  {
    question: "Which of these is NOT a type of cyber attack?",
    options: ["DDoS", "SQL Injection", "Man-in-the-Middle", "Data Backup"],
    correctAnswer: "Data Backup"
  },
  {
    question: "What is social engineering?",
    options: ["Using machines to hack", "Manipulating people to reveal info", "Installing firewalls", "Creating encryption keys"],
    correctAnswer: "Manipulating people to reveal info"
  },
  {
    question: "What does '2FA' stand for?",
    options: ["Two-Factor Authentication", "Two File Access", "Two Form Application", "Trusted Firewall Access"],
    correctAnswer: "Two-Factor Authentication"
  },
  {
    question: "Which port does HTTPS typically use?",
    options: ["80", "21", "443", "25"],
    correctAnswer: "443"
  },
  {
    question: "What does SQL injection target?",
    options: ["Web servers", "Databases", "Network cables", "Firewalls"],
    correctAnswer: "Databases"
  },
  {
    question: "Which is NOT an example of malware?",
    options: ["Worm", "Trojan", "Spyware", "Firewall"],
    correctAnswer: "Firewall"
  },
  {
    question: "What does DDoS stand for?",
    options: ["Data Denial of Service", "Distributed Denial of Service", "Domain Denial of Service", "Direct Denial of Service"],
    correctAnswer: "Distributed Denial of Service"
  },
  {
    question: "Which is a method to secure passwords?",
    options: ["Hashing", "Plain text storage", "Leaving them in emails", "Reusing old passwords"],
    correctAnswer: "Hashing"
  },
  {
    question: "Which device connects two different networks?",
    options: ["Switch", "Router", "Hub", "Repeater"],
    correctAnswer: "Router"
  },
  {
    question: "What is the purpose of an IDS?",
    options: ["Detect intrusions", "Block viruses", "Encrypt files", "Speed up the network"],
    correctAnswer: "Detect intrusions"
  },
  {
    question: "Which of these is a secure protocol?",
    options: ["HTTP", "HTTPS", "FTP", "Telnet"],
    correctAnswer: "HTTPS"
  },
  {
    question: "What is multi-factor authentication?",
    options: ["Using a single password", "Using multiple security methods", "Changing passwords often", "Encrypting passwords"],
    correctAnswer: "Using multiple security methods"
  },
  {
    question: "What does encryption do?",
    options: ["Converts data to unreadable format", "Deletes data", "Compresses data", "Copies data"],
    correctAnswer: "Converts data to unreadable format"
  },

  // 30 more questions
  {
    question: "What is a honeypot used for?",
    options: ["Trap hackers", "Store passwords", "Monitor emails", "Scan networks"],
    correctAnswer: "Trap hackers"
  },
  {
    question: "Which protocol is used to securely transfer files?",
    options: ["FTP", "SFTP", "HTTP", "SMTP"],
    correctAnswer: "SFTP"
  },
  {
    question: "Which of the following is a symmetric encryption algorithm?",
    options: ["RSA", "AES", "ECC", "DSA"],
    correctAnswer: "AES"
  },
  {
    question: "What is the purpose of penetration testing?",
    options: ["Develop software", "Test network security", "Encrypt files", "Monitor server load"],
    correctAnswer: "Test network security"
  },
  {
    question: "Which port is used by SSH?",
    options: ["21", "22", "80", "443"],
    correctAnswer: "22"
  },
  {
    question: "What is the role of a Certificate Authority (CA)?",
    options: ["Issue SSL certificates", "Encrypt emails", "Block malware", "Manage firewalls"],
    correctAnswer: "Issue SSL certificates"
  },
  {
    question: "Which is a common hashing algorithm?",
    options: ["SHA-256", "RSA", "AES", "SFTP"],
    correctAnswer: "SHA-256"
  },
  {
    question: "What does a brute-force attack do?",
    options: ["Guess passwords repeatedly", "Encrypt files", "Scan networks", "Send phishing emails"],
    correctAnswer: "Guess passwords repeatedly"
  },
  {
    question: "Which is a strong security practice?",
    options: ["Using same password everywhere", "Regular software updates", "Sharing passwords", "Disabling firewalls"],
    correctAnswer: "Regular software updates"
  },
  {
    question: "What is the main function of a firewall?",
    options: ["Block unauthorized access", "Store files", "Encrypt passwords", "Scan ports automatically"],
    correctAnswer: "Block unauthorized access"
  },
  {
    question: "What type of attack is a 'Man-in-the-Middle'?",
    options: ["Eavesdropping", "Virus", "Phishing", "DDoS"],
    correctAnswer: "Eavesdropping"
  },
  {
    question: "Which is an example of malware?",
    options: ["Spyware", "SSL", "HTTPS", "VPN"],
    correctAnswer: "Spyware"
  },
  {
    question: "What is social engineering?",
    options: ["Manipulating people", "Using malware", "Encrypting data", "Network scanning"],
    correctAnswer: "Manipulating people"
  },
  {
    question: "Which attack targets web applications?",
    options: ["SQL Injection", "Port scanning", "Brute force", "Social engineering"],
    correctAnswer: "SQL Injection"
  },
  {
    question: "What is a botnet?",
    options: ["Network of compromised devices", "Firewall type", "Encryption tool", "VPN software"],
    correctAnswer: "Network of compromised devices"
  },
  {
    question: "Which is a secure password storage method?",
    options: ["Hashing", "Plain text", "Excel sheet", "Email"],
    correctAnswer: "Hashing"
  },
  {
    question: "What is two-factor authentication (2FA)?",
    options: ["Password + second verification", "Single password login", "Password sharing", "Encryption"],
    correctAnswer: "Password + second verification"
  },
  {
    question: "Which of these is an intrusion detection system (IDS)?",
    options: ["Monitors network traffic", "Encrypts data", "Hashes passwords", "Manages VPN"],
    correctAnswer: "Monitors network traffic"
  },
  {
    question: "Which attack involves flooding a server?",
    options: ["DDoS", "Phishing", "Trojan", "Malware"],
    correctAnswer: "DDoS"
  },
  {
    question: "What is ransomware?",
    options: ["Malware demanding payment", "Encryption algorithm", "Firewall type", "Network protocol"],
    correctAnswer: "Malware demanding payment"
  },
  {
    question: "Which protocol is encrypted?",
    options: ["HTTPS", "HTTP", "FTP", "Telnet"],
    correctAnswer: "HTTPS"
  },
  {
    question: "Which is an example of multi-factor authentication?",
    options: ["Password + SMS code", "Single password", "Email only", "Username only"],
    correctAnswer: "Password + SMS code"
  },
  {
    question: "What does a VPN do?",
    options: ["Encrypts internet traffic", "Deletes malware", "Blocks emails", "Scans ports"],
    correctAnswer: "Encrypts internet traffic"
  },
  {
    question: "Which type of attack uses email scams?",
    options: ["Phishing", "DDoS", "SQL Injection", "Brute-force"],
    correctAnswer: "Phishing"
  },
  {
    question: "What does hashing do?",
    options: ["Converts data into fixed-length string", "Encrypts data reversibly", "Deletes files", "Compresses data"],
    correctAnswer: "Converts data into fixed-length string"
  },
  {
    question: "Which of the following is a strong encryption algorithm?",
    options: ["AES", "Caesar cipher", "ROT13", "MD5"],
    correctAnswer: "AES"
  },
  {
    question: "What is a zero-day vulnerability?",
    options: ["Unknown exploit", "Expired certificate", "Firewall rule", "Encrypted password"],
    correctAnswer: "Unknown exploit"
  },
  {
    question: "Which port does HTTPS use by default?",
    options: ["443", "80", "21", "22"],
    correctAnswer: "443"
  },
  {
    question: "Which is a social engineering attack?",
    options: ["Phishing email", "SQL Injection", "Port scanning", "VPN use"],
    correctAnswer: "Phishing email"
  },
  {
    question: "What is the purpose of SSL/TLS?",
    options: ["Encrypt communications", "Store files", "Scan for viruses", "Monitor traffic"],
    correctAnswer: "Encrypt communications"
  },
  {
    question: "Which type of malware pretends to be legitimate software?",
    options: ["Trojan", "Worm", "Spyware", "Ransomware"],
    correctAnswer: "Trojan"
  },
  {
    question: "Which of these is a preventive security measure?",
    options: ["Firewall", "Virus infection", "SQL injection", "Brute-force attack"],
    correctAnswer: "Firewall"
  },
  {
    question: "Which of these is a hashing function?",
    options: ["SHA-256", "AES", "RSA", "TLS"],
    correctAnswer: "SHA-256"
  },
  {
    question: "Which port does SSH use?",
    options: ["22", "21", "80", "443"],
    correctAnswer: "22"
  },
  {
    question: "Which of these is NOT a type of malware?",
    options: ["Firewall", "Trojan", "Worm", "Spyware"],
    correctAnswer: "Firewall"
  },
  {
    question: "What is the main goal of phishing?",
    options: ["Steal credentials", "Encrypt files", "Scan network", "Block ports"],
    correctAnswer: "Steal credentials"
  }
];

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Question.deleteMany();
    await Question.insertMany(questions);
    console.log("✅ Questions Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding questions:", error);
    process.exit(1);
  }
};

seedQuestions();
