import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/questionModel.js";

dotenv.config();

const questions = [
  {
    question: "What does 'phishing' typically involve?",
    options: ["Fishing emails", "Fraudulent emails", "Secure emails", "Encrypted emails"],
    correctAnswer: "Fraudulent emails",
    explanation: "Phishing is a scam where fake emails trick people into revealing sensitive information."
  },
  {
    question: "What does VPN stand for?",
    options: ["Virtual Public Network", "Virtual Private Network", "Verified Personal Network", "Virtual Protected Network"],
    correctAnswer: "Virtual Private Network",
    explanation: "A VPN encrypts your internet connection and hides your IP for privacy and security."
  },
  {
    question: "Which of the following is a strong password?",
    options: ["password123", "12345678", "Qwerty!", "Tg7$kLp9@!"],
    correctAnswer: "Tg7$kLp9@!",
    explanation: "Strong passwords mix uppercase, lowercase, numbers, and symbols for better security."
  },
  {
    question: "A firewall is used to:",
    options: ["Encrypt data", "Block unauthorized access", "Create malware", "Delete viruses"],
    correctAnswer: "Block unauthorized access",
    explanation: "Firewalls filter network traffic to block unauthorized access and protect systems."
  },
  {
    question: "What does 'HTTPS' stand for?",
    options: ["Hypertext Transfer Protocol Secure", "High Transfer Protocol Service", "Hyperlink Text Processing System", "Host Transfer Protocol Secure"],
    correctAnswer: "Hypertext Transfer Protocol Secure",
    explanation: "HTTPS encrypts data between browser and website for secure communication."
  },
  {
    question: "Which of these is a form of malware?",
    options: ["Trojan", "VPN", "Firewall", "Antivirus"],
    correctAnswer: "Trojan",
    explanation: "A Trojan is malicious software disguised as legitimate to trick users."
  },
  {
    question: "Ransomware typically demands payment in:",
    options: ["Credit card", "Bitcoin", "PayPal", "Cash"],
    correctAnswer: "Bitcoin",
    explanation: "Ransomware often uses Bitcoin due to its anonymity for receiving payments."
  },
  {
    question: "Which of these is NOT a type of cyber attack?",
    options: ["DDoS", "SQL Injection", "Man-in-the-Middle", "Data Backup"],
    correctAnswer: "Data Backup",
    explanation: "Data backup is a safety measure, not a cyber attack."
  },
  {
    question: "What is social engineering?",
    options: ["Using machines to hack", "Manipulating people to reveal info", "Installing firewalls", "Creating encryption keys"],
    correctAnswer: "Manipulating people to reveal info",
    explanation: "Social engineering tricks people into giving confidential information."
  },
  {
    question: "What does '2FA' stand for?",
    options: ["Two-Factor Authentication", "Two File Access", "Two Form Application", "Trusted Firewall Access"],
    correctAnswer: "Two-Factor Authentication",
    explanation: "2FA adds an extra verification step beyond a password for better security."
  },
  {
    question: "Which port does HTTPS typically use?",
    options: ["80", "21", "443", "25"],
    correctAnswer: "443",
    explanation: "Port 443 is the default for secure HTTPS traffic."
  },
  {
    question: "What does SQL injection target?",
    options: ["Web servers", "Databases", "Network cables", "Firewalls"],
    correctAnswer: "Databases",
    explanation: "SQL injection exploits vulnerabilities to access or modify database data."
  },
  {
    question: "Which is NOT an example of malware?",
    options: ["Worm", "Trojan", "Spyware", "Firewall"],
    correctAnswer: "Firewall",
    explanation: "Firewalls protect systems; worms, trojans, and spyware are malware."
  },
  {
    question: "What does DDoS stand for?",
    options: ["Data Denial of Service", "Distributed Denial of Service", "Domain Denial of Service", "Direct Denial of Service"],
    correctAnswer: "Distributed Denial of Service",
    explanation: "A DDoS attack floods a system from multiple sources to disrupt service."
  },
  {
    question: "Which is a method to secure passwords?",
    options: ["Hashing", "Plain text storage", "Leaving them in emails", "Reusing old passwords"],
    correctAnswer: "Hashing",
    explanation: "Hashing stores passwords in an irreversible, secure format."
  },
  {
    question: "Which device connects two different networks?",
    options: ["Switch", "Router", "Hub", "Repeater"],
    correctAnswer: "Router",
    explanation: "Routers direct data between different networks."
  },
  {
    question: "What is the purpose of an IDS?",
    options: ["Detect intrusions", "Block viruses", "Encrypt files", "Speed up the network"],
    correctAnswer: "Detect intrusions",
    explanation: "An IDS monitors network traffic for suspicious activity."
  },
  {
    question: "Which of these is a secure protocol?",
    options: ["HTTP", "HTTPS", "FTP", "Telnet"],
    correctAnswer: "HTTPS",
    explanation: "HTTPS encrypts communication for secure web browsing."
  },
  {
    question: "What is multi-factor authentication?",
    options: ["Using a single password", "Using multiple security methods", "Changing passwords often", "Encrypting passwords"],
    correctAnswer: "Using multiple security methods",
    explanation: "Multi-factor authentication uses more than one method to verify identity."
  },
  {
    question: "What does encryption do?",
    options: ["Converts data to unreadable format", "Deletes data", "Compresses data", "Copies data"],
    correctAnswer: "Converts data to unreadable format",
    explanation: "Encryption scrambles data so only authorized parties can read it."
  },
  {
    question: "What is a honeypot used for?",
    options: ["Trap hackers", "Store passwords", "Monitor emails", "Scan networks"],
    correctAnswer: "Trap hackers",
    explanation: "A honeypot lures attackers to study their methods."
  },
  {
    question: "Which protocol is used to securely transfer files?",
    options: ["FTP", "SFTP", "HTTP", "SMTP"],
    correctAnswer: "SFTP",
    explanation: "SFTP encrypts file transfers for security."
  },
  {
    question: "Which of the following is a symmetric encryption algorithm?",
    options: ["RSA", "AES", "ECC", "DSA"],
    correctAnswer: "AES",
    explanation: "AES uses the same key for encryption and decryption."
  },
  {
    question: "What is the purpose of penetration testing?",
    options: ["Develop software", "Test network security", "Encrypt files", "Monitor server load"],
    correctAnswer: "Test network security",
    explanation: "Penetration testing simulates attacks to find vulnerabilities."
  },
  {
    question: "Which port is used by SSH?",
    options: ["21", "22", "80", "443"],
    correctAnswer: "22",
    explanation: "Port 22 is the default for secure SSH connections."
  },
  {
    question: "What is the role of a Certificate Authority (CA)?",
    options: ["Issue SSL certificates", "Encrypt emails", "Block malware", "Manage firewalls"],
    correctAnswer: "Issue SSL certificates",
    explanation: "CAs verify and issue digital certificates for secure communication."
  },
  {
    question: "Which is a common hashing algorithm?",
    options: ["SHA-256", "RSA", "AES", "SFTP"],
    correctAnswer: "SHA-256",
    explanation: "SHA-256 produces a fixed-length hash for data integrity."
  },
  {
    question: "What does a brute-force attack do?",
    options: ["Guess passwords repeatedly", "Encrypt files", "Scan networks", "Send phishing emails"],
    correctAnswer: "Guess passwords repeatedly",
    explanation: "Brute-force attacks try all possible password combinations."
  },
  {
    question: "Which is a strong security practice?",
    options: ["Using same password everywhere", "Regular software updates", "Sharing passwords", "Disabling firewalls"],
    correctAnswer: "Regular software updates",
    explanation: "Updates patch vulnerabilities to improve security."
  },
  {
    question: "What is the main function of a firewall?",
    options: ["Block unauthorized access", "Store files", "Encrypt passwords", "Scan ports automatically"],
    correctAnswer: "Block unauthorized access",
    explanation: "Firewalls block harmful or unauthorized network connections."
  },
  {
    question: "What type of attack is a 'Man-in-the-Middle'?",
    options: ["Eavesdropping", "Virus", "Phishing", "DDoS"],
    correctAnswer: "Eavesdropping",
    explanation: "Attackers intercept communication between two parties."
  },
  {
    question: "Which is an example of malware?",
    options: ["Spyware", "SSL", "HTTPS", "VPN"],
    correctAnswer: "Spyware",
    explanation: "Spyware secretly collects user information."
  },
  {
    question: "Which attack targets web applications?",
    options: ["SQL Injection", "Port scanning", "Brute force", "Social engineering"],
    correctAnswer: "SQL Injection",
    explanation: "SQL Injection exploits vulnerabilities in database queries."
  },
  {
    question: "What is a botnet?",
    options: ["Network of compromised devices", "Firewall type", "Encryption tool", "VPN software"],
    correctAnswer: "Network of compromised devices",
    explanation: "A botnet is controlled remotely to perform attacks."
  },
  {
    question: "Which is a secure password storage method?",
    options: ["Hashing", "Plain text", "Excel sheet", "Email"],
    correctAnswer: "Hashing",
    explanation: "Hashing prevents stored passwords from being easily stolen."
  },
  {
    question: "What is two-factor authentication (2FA)?",
    options: ["Password + second verification", "Single password login", "Password sharing", "Encryption"],
    correctAnswer: "Password + second verification",
    explanation: "2FA uses two separate authentication steps."
  },
  {
    question: "Which of these is an intrusion detection system (IDS)?",
    options: ["Monitors network traffic", "Encrypts data", "Hashes passwords", "Manages VPN"],
    correctAnswer: "Monitors network traffic",
    explanation: "IDS detects suspicious network behavior."
  },
  {
    question: "Which attack involves flooding a server?",
    options: ["DDoS", "Phishing", "Trojan", "Malware"],
    correctAnswer: "DDoS",
    explanation: "DDoS overwhelms a server with requests to cause downtime."
  },
  {
    question: "What is ransomware?",
    options: ["Malware demanding payment", "Encryption algorithm", "Firewall type", "Network protocol"],
    correctAnswer: "Malware demanding payment",
    explanation: "Ransomware locks files until a ransom is paid."
  },
  {
    question: "Which protocol is encrypted?",
    options: ["HTTPS", "HTTP", "FTP", "Telnet"],
    correctAnswer: "HTTPS",
    explanation: "HTTPS secures communication using encryption."
  },
  {
    question: "Which is an example of multi-factor authentication?",
    options: ["Password + SMS code", "Single password", "Email only", "Username only"],
    correctAnswer: "Password + SMS code",
    explanation: "MFA combines something you know with something you have."
  },
  {
    question: "What does a VPN do?",
    options: ["Encrypts internet traffic", "Deletes malware", "Blocks emails", "Scans ports"],
    correctAnswer: "Encrypts internet traffic",
    explanation: "A VPN secures internet data and hides your IP."
  },
  {
    question: "Which type of attack uses email scams?",
    options: ["Phishing", "DDoS", "SQL Injection", "Brute-force"],
    correctAnswer: "Phishing",
    explanation: "Phishing emails trick users into revealing sensitive info."
  },
  {
    question: "What does hashing do?",
    options: ["Converts data into fixed-length string", "Encrypts data reversibly", "Deletes files", "Compresses data"],
    correctAnswer: "Converts data into fixed-length string",
    explanation: "Hashing creates a fixed, irreversible value from data."
  },
  {
    question: "Which of the following is a strong encryption algorithm?",
    options: ["AES", "Caesar cipher", "ROT13", "MD5"],
    correctAnswer: "AES",
    explanation: "AES is widely used for secure encryption."
  },
  {
    question: "What is a zero-day vulnerability?",
    options: ["Unknown exploit", "Expired certificate", "Firewall rule", "Encrypted password"],
    correctAnswer: "Unknown exploit",
    explanation: "A zero-day is a flaw unknown to the vendor."
  },
  {
    question: "Which port does HTTPS use by default?",
    options: ["443", "80", "21", "22"],
    correctAnswer: "443",
    explanation: "Port 443 is used for secure HTTPS traffic."
  },
  {
    question: "Which is a social engineering attack?",
    options: ["Phishing email", "SQL Injection", "Port scanning", "VPN use"],
    correctAnswer: "Phishing email",
    explanation: "Phishing emails manipulate people into revealing information."
  },
  {
    question: "What is the purpose of SSL/TLS?",
    options: ["Encrypt communications", "Store files", "Scan for viruses", "Monitor traffic"],
    correctAnswer: "Encrypt communications",
    explanation: "SSL/TLS secures data in transit over networks."
  },
  {
    question: "Which type of malware pretends to be legitimate software?",
    options: ["Trojan", "Worm", "Spyware", "Ransomware"],
    correctAnswer: "Trojan",
    explanation: "A Trojan hides malicious code inside trusted-looking software."
  },
  {
    question: "Which of these is a preventive security measure?",
    options: ["Firewall", "Virus infection", "SQL injection", "Brute-force attack"],
    correctAnswer: "Firewall",
    explanation: "Firewalls prevent unauthorized access to systems."
  },
  {
    question: "Which of these is a hashing function?",
    options: ["SHA-256", "AES", "RSA", "TLS"],
    correctAnswer: "SHA-256",
    explanation: "SHA-256 creates a secure, fixed-length hash value."
  },
  {
    question: "Which port does SSH use?",
    options: ["22", "21", "80", "443"],
    correctAnswer: "22",
    explanation: "SSH uses port 22 for secure remote access."
  },
  {
    question: "Which of these is NOT a type of malware?",
    options: ["Firewall", "Trojan", "Worm", "Spyware"],
    correctAnswer: "Firewall",
    explanation: "Firewalls are protective, not malicious."
  },
  {
    question: "What is the main goal of phishing?",
    options: ["Steal credentials", "Encrypt files", "Scan network", "Block ports"],
    correctAnswer: "Steal credentials",
    explanation: "Phishing aims to steal sensitive user information."
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
