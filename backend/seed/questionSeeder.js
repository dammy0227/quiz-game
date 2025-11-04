import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/questionModel.js";

dotenv.config();

const questions = [
  {
    question: "Which three are major categories of elements in a Security Operations Center (SOC)?",
    options: ["Technologies", "Internet connection", "Processes", "People", "Database engine", "Data center"],
    correctAnswer: ["Technologies", "Processes", "People"],
    explanation:
      "A Security Operations Center (SOC) is built on three main pillars: People, Processes, and Technologies. People analyze and respond to incidents, processes guide operations, and technologies provide the tools for monitoring and defense.",
    level: "easy",
  },
  {
    question: "Which two statements are characteristics of a virus?",
    options: [
      "A virus typically requires end-user activation.",
      "A virus can be dormant and then activate at a specific time or date.",
      "A virus replicates itself independently over networks.",
      "A virus provides attackers with sensitive data automatically.",
    ],
    correctAnswer: [
      "A virus typically requires end-user activation.",
      "A virus can be dormant and then activate at a specific time or date.",
    ],
    explanation:
      "Viruses attach to legitimate programs or files and activate when executed by a user. Some remain dormant until triggered by a specific condition like a date or event.",
    level: "easy",
  },
  {
    question: "What is a characteristic of a Trojan horse as it relates to network security?",
    options: [
      "Malware is contained in a seemingly legitimate executable program.",
      "Too much information is destined for a particular memory block.",
      "Extreme quantities of data are sent to a network interface.",
      "An electronic dictionary is used to obtain a password.",
    ],
    correctAnswer: "Malware is contained in a seemingly legitimate executable program.",
    explanation:
      "A Trojan horse disguises itself as a harmless program or file. Once installed, it can create backdoors, steal data, or allow unauthorized access.",
    level: "easy",
  },
  {
    question: "What technique is commonly used in social engineering attacks?",
    options: ["Phishing", "Buffer overflow", "Man-in-the-middle", "Packet sniffing"],
    correctAnswer: "Phishing",
    explanation:
      "Phishing tricks users into revealing confidential information such as passwords or credit card details by posing as a trusted source, usually through emails or fake websites.",
    level: "easy",
  },
  {
    question: "What is the main purpose of implementing VLANs on a network?",
    options: [
      "They can separate user traffic.",
      "They prevent Layer 2 loops.",
      "They eliminate network collisions.",
      "They allow switches to forward Layer 3 packets without routers.",
    ],
    correctAnswer: "They can separate user traffic.",
    explanation:
      "VLANs logically segment a network into different broadcast domains. This helps improve performance, security, and manageability by separating user groups.",
    level: "easy",
  },
  {
    question: "What is the dark web?",
    options: [
      "It is part of the internet that can only be accessed with special software.",
      "It is a website that reports cybercrime news.",
      "It is a place where hackers sell data legally.",
      "It is a type of search engine for private browsing.",
    ],
    correctAnswer: "It is part of the internet that can only be accessed with special software.",
    explanation:
      "The dark web is an encrypted network that requires special browsers like Tor. It is often used for anonymity and sometimes for illegal activities.",
    level: "easy",
  },
  {
    question: "Which type of malware locks files and demands payment for their release?",
    options: ["Adware", "Spyware", "Ransomware", "Rootkit"],
    correctAnswer: "Ransomware",
    explanation:
      "Ransomware encrypts a user’s files and demands a ransom, often in cryptocurrency, to restore access. It usually spreads through phishing emails or malicious links.",
    level: "easy",
  },
  {
    question: "Which type of security threat best describes a rogue access point?",
    options: [
      "An unauthorized wireless access point connected to a secure network.",
      "A device that intercepts encrypted traffic.",
      "A fake DNS server redirecting users.",
      "A script that launches DDoS attacks.",
    ],
    correctAnswer: "An unauthorized wireless access point connected to a secure network.",
    explanation:
      "A rogue access point is installed without authorization and can be exploited by attackers to intercept or inject malicious traffic into a network.",
    level: "easy",
  },
  {
    question: "Which two are examples of personally identifiable information (PII)?",
    options: [
      "First name",
      "Street address",
      "Credit card number",
      "IP address",
      "Language preference",
    ],
    correctAnswer: ["Street address", "Credit card number"],
    explanation:
      "PII includes any data that can identify a specific individual, such as full address, date of birth, national ID, or credit card information.",
    level: "easy",
  },
  {
    question: "What is the main purpose of cyberwarfare?",
    options: [
      "To gain advantage over adversaries.",
      "To protect data centers.",
      "To simulate training for soldiers.",
      "To disrupt social media.",
    ],
    correctAnswer: "To gain advantage over adversaries.",
    explanation:
      "Cyberwarfare involves government-backed cyberattacks on another nation’s systems to gain strategic, political, or military advantage.",
    level: "easy",
  },
  {
    question: "Why do IoT devices pose greater risks than other computing devices?",
    options: [
      "Most IoT devices do not receive frequent firmware updates.",
      "IoT devices cannot connect securely to the internet.",
      "IoT devices have built-in firewalls disabled by default.",
      "IoT devices use private IPs only.",
    ],
    correctAnswer: "Most IoT devices do not receive frequent firmware updates.",
    explanation:
      "IoT devices often lack proper security updates and can be exploited to gain access to a network. Many also use weak default credentials.",
    level: "easy",
  },
  {
    question: "Which cyber attack involves many computers sending requests to overwhelm a target?",
    options: ["DDoS", "MITM", "ARP spoofing", "Ping sweep"],
    correctAnswer: "DDoS",
    explanation:
      "A Distributed Denial of Service (DDoS) attack uses multiple compromised systems to flood a target with traffic, making it unavailable to legitimate users.",
    level: "easy",
  },
  {
    question: "What is the main purpose of encryption?",
    options: [
      "To protect data confidentiality during storage or transmission.",
      "To compress data for faster transmission.",
      "To authenticate users on the network.",
      "To hide malware from detection tools.",
    ],
    correctAnswer: "To protect data confidentiality during storage or transmission.",
    explanation:
      "Encryption ensures that only authorized users can read data by converting it into an unreadable format using cryptographic algorithms.",
    level: "easy",
  },
  {
    question: "Which type of address is unique to every network interface card (NIC)?",
    options: ["IP address", "MAC address", "Network ID", "Broadcast address"],
    correctAnswer: "MAC address",
    explanation:
      "A MAC address is a physical hardware identifier assigned to a device’s network interface, making it unique on a local network.",
    level: "easy",
  },
  {
    question: "Which type of tool allows administrators to capture and analyze network traffic?",
    options: ["Packet capture software", "Ticketing system", "Firewall", "Log manager"],
    correctAnswer: "Packet capture software",
    explanation:
      "Packet capture tools like Wireshark allow network professionals to view detailed network transactions for troubleshooting and security monitoring.",
    level: "easy",
  },
  {
    question: "Which AAA component verifies user identity before granting access?",
    options: ["Authentication", "Authorization", "Accounting", "Auditing"],
    correctAnswer: "Authentication",
    explanation:
      "Authentication confirms a user’s identity using credentials such as passwords, biometrics, or tokens before allowing access to resources.",
    level: "easy",
  },
  {
    question: "Which protocol is used to share files and printers over a network?",
    options: ["FTP", "HTTP", "SMB", "DNS"],
    correctAnswer: "SMB",
    explanation:
      "Server Message Block (SMB) is a client/server protocol that enables file and printer sharing on Windows-based networks.",
    level: "easy",
  },
  {
    question: "Which statement describes the function of a firewall?",
    options: [
      "It filters traffic based on defined security rules.",
      "It manages user accounts in a network.",
      "It stores encrypted passwords.",
      "It blocks viruses automatically.",
    ],
    correctAnswer: "It filters traffic based on defined security rules.",
    explanation:
      "A firewall monitors and controls network traffic using security rules, acting as a barrier between trusted and untrusted networks.",
    level: "easy",
  },
  {
    question: "Which device operates at Layer 2 and regenerates signals out of all other ports?",
    options: ["Hub", "Switch", "Router", "Bridge"],
    correctAnswer: "Hub",
    explanation:
      "A hub works at the Data Link Layer (Layer 2) and broadcasts incoming signals to all connected devices without filtering.",
    level: "easy",
  },
  {
    question: "Which network device divides a LAN into multiple collision domains?",
    options: ["Switch", "Hub", "Repeater", "Access point"],
    correctAnswer: "Switch",
    explanation:
      "Switches create separate collision domains for each connected device, improving performance and reducing data collisions.",
    level: "easy",
  },

  {
    question: "What is a host-based intrusion detection system (HIDS)?",
    options: [
      "It identifies potential attacks and sends alerts but does not stop the traffic.",
      "It prevents attacks by scanning the entire network for anomalies.",
      "It is a hardware device used to monitor network perimeters.",
      "It analyzes only external traffic coming from the internet.",
    ],
    correctAnswer: "It identifies potential attacks and sends alerts but does not stop the traffic.",
    explanation:
      "A Host-based Intrusion Detection System (HIDS) runs on individual hosts or devices, monitoring log files, system calls, and configuration changes. It detects suspicious activities but usually cannot block them in real time.",
    level: "intermediate",
  },
  {
    question: "Which protocol is a client/server file-sharing protocol and also a request/response protocol?",
    options: ["FTP", "UDP", "TCP", "SMB"],
    correctAnswer: "SMB",
    explanation:
      "The Server Message Block (SMB) protocol is used for file and printer sharing between systems. It operates in a request/response manner, allowing clients to access shared resources on a network.",
    level: "intermediate",
  },
  {
    question: "What is a description of a DNS zone transfer?",
    options: [
      "Transferring blocks of DNS data from one DNS server to another server.",
      "Forwarding a DNS request from a client to a cache server.",
      "Finding an IP address match and sending it to a requesting client.",
      "Mapping multiple domain names to one IP address.",
    ],
    correctAnswer: "Transferring blocks of DNS data from one DNS server to another server.",
    explanation:
      "A DNS zone transfer allows replication of DNS databases between primary and secondary servers. Attackers may exploit it to gather detailed domain information if not properly secured.",
    level: "intermediate",
  },
  {
    question: "Which command is used to view the MAC address a host uses to reach its default gateway?",
    options: ["arp -a", "ipconfig /all", "netstat -r", "route print"],
    correctAnswer: "arp -a",
    explanation:
      "The `arp -a` command displays the ARP table, showing IP-to-MAC address mappings, which can be used to verify the gateway’s physical address or detect spoofing attempts.",
    level: "intermediate",
  },
  {
    question: "What happens when a computer receives an IP address in the range 169.254.x.x?",
    options: [
      "It failed to obtain an address from a DHCP server.",
      "It successfully connected to the network gateway.",
      "It is using a public IP address.",
      "It is connected to a VPN tunnel.",
    ],
    correctAnswer: "It failed to obtain an address from a DHCP server.",
    explanation:
      "An IP in the 169.254.x.x range is an Automatic Private IP Addressing (APIPA) address assigned when DHCP fails, allowing limited local connectivity but no internet access.",
    level: "intermediate",
  },
  {
    question: "Which email protocol allows synchronization of folders between server and client devices?",
    options: ["IMAP", "POP3", "SMTP", "MIME"],
    correctAnswer: "IMAP",
    explanation:
      "IMAP (Internet Message Access Protocol) keeps messages on the mail server and synchronizes folders across multiple devices, unlike POP3 which downloads and deletes emails.",
    level: "intermediate",
  },
  {
    question: "Which type of cyber attack involves overwhelming a target with large amounts of traffic?",
    options: ["DDoS", "Phishing", "SQL Injection", "Rogue Access"],
    correctAnswer: "DDoS",
    explanation:
      "A Distributed Denial of Service (DDoS) attack floods a target system or network with excessive traffic from multiple compromised computers, making it unavailable to users.",
    level: "intermediate",
  },
  {
    question: "Which two methods can be used to harden a computing device?",
    options: [
      "Enforce the password history mechanism.",
      "Update security patches regularly.",
      "Allow USB auto-detection for all devices.",
      "Keep all default services enabled.",
    ],
    correctAnswer: ["Enforce the password history mechanism.", "Update security patches regularly."],
    explanation:
      "Hardening strengthens system security by using strong password policies, removing unnecessary services, and applying software updates to fix vulnerabilities.",
    level: "intermediate",
  },
  {
    question: "Which statement describes the function of the Server Message Block (SMB) protocol?",
    options: [
      "It is used to share network resources.",
      "It is used to stream video data over the internet.",
      "It is used for managing remote users.",
      "It is used for encrypting emails.",
    ],
    correctAnswer: "It is used to share network resources.",
    explanation:
      "SMB is mainly used for file and printer sharing between systems in a network. It operates at the application layer using TCP/IP for communication.",
    level: "intermediate",
  },
  {
    question: "Which Windows tool can secure stand-alone computers that are not part of a domain?",
    options: ["Local Security Policy", "Windows Firewall", "Group Policy Editor", "Registry Editor"],
    correctAnswer: "Local Security Policy",
    explanation:
      "Local Security Policy in Windows allows administrators to configure security settings like password policies, user rights, and audit rules for single computers not joined to Active Directory.",
    level: "intermediate",
  },
  {
    question: "Which technology was designed to replace the legacy BIOS program?",
    options: ["UEFI", "MBR", "RAM", "POST"],
    correctAnswer: "UEFI",
    explanation:
      "UEFI (Unified Extensible Firmware Interface) replaces the traditional BIOS, offering faster boot times, larger disk support, and a graphical interface for managing system firmware settings.",
    level: "intermediate",
  },
  {
    question: "Which statement describes a VPN?",
    options: [
      "A VPN uses virtual connections to create a private network over a public network.",
      "A VPN is a hardware device that stores encryption keys.",
      "A VPN uses satellites to establish global connectivity.",
      "A VPN requires a direct wired connection between users.",
    ],
    correctAnswer: "A VPN uses virtual connections to create a private network over a public network.",
    explanation:
      "A Virtual Private Network (VPN) creates an encrypted tunnel between devices across the internet, ensuring secure communication and privacy.",
    level: "intermediate",
  },
  {
    question: "Which protocol is commonly used to translate domain names into IP addresses?",
    options: ["DNS", "FTP", "SMTP", "SNMP"],
    correctAnswer: "DNS",
    explanation:
      "The Domain Name System (DNS) translates human-readable domain names into IP addresses that computers use to identify each other on the network.",
    level: "intermediate",
  },
  {
    question: "Which Windows feature allows administrators to block an application from accessing the Internet?",
    options: [
      "Windows Defender Firewall with Advanced Security",
      "Local Security Policy",
      "Computer Management",
      "User Account Control",
    ],
    correctAnswer: "Windows Defender Firewall with Advanced Security",
    explanation:
      "Administrators can create inbound and outbound rules in Windows Defender Firewall to allow or block specific applications from using the network.",
    level: "intermediate",
  },
  {
    question: "Which cybersecurity role verifies that an alert represents a true incident and not a false positive?",
    options: ["Alert Analyst", "Threat Hunter", "SOC Manager", "Incident Responder"],
    correctAnswer: "Alert Analyst",
    explanation:
      "Alert Analysts are responsible for reviewing and validating alerts triggered by monitoring tools to determine whether they indicate real security incidents.",
    level: "intermediate",
  },
  {
    question: "Which cybersecurity framework is commonly used to assess organizational security maturity?",
    options: ["NIST", "WPA2", "MD5", "SHA-256"],
    correctAnswer: "NIST",
    explanation:
      "The NIST Cybersecurity Framework (CSF) provides guidelines for organizations to identify, protect, detect, respond to, and recover from cybersecurity threats, helping assess and improve security maturity.",
    level: "hard",
  },
  {
    question: "What type of attack involves manipulating input fields to execute unauthorized database queries?",
    options: ["SQL Injection", "Cross-Site Scripting", "Buffer Overflow", "Man-in-the-Middle"],
    correctAnswer: "SQL Injection",
    explanation:
      "SQL Injection attacks exploit vulnerabilities in input fields by injecting SQL commands, allowing attackers to manipulate databases and access sensitive information.",
    level: "hard",
  },
  {
    question: "In asymmetric encryption, which key is used to decrypt data encrypted with the public key?",
    options: ["Private key", "Public key", "Session key", "Hash key"],
    correctAnswer: "Private key",
    explanation:
      "In asymmetric encryption, data encrypted with a public key can only be decrypted with the corresponding private key, ensuring confidentiality and authentication.",
    level: "hard",
  },
  {
    question: "Which type of malware disguises itself as legitimate software but performs malicious actions?",
    options: ["Trojan Horse", "Worm", "Spyware", "Rootkit"],
    correctAnswer: "Trojan Horse",
    explanation:
      "A Trojan Horse appears to be a useful or harmless program but executes malicious code when run, often giving attackers remote access or control.",
    level: "hard",
  },
  {
    question: "Which tool is commonly used to intercept and analyze HTTP requests and responses?",
    options: ["Burp Suite", "Wireshark", "Metasploit", "John the Ripper"],
    correctAnswer: "Burp Suite",
    explanation:
      "Burp Suite is a powerful web vulnerability scanner used to intercept, analyze, and manipulate HTTP requests and responses during penetration testing.",
    level: "hard",
  },
  {
    question: "What is the primary function of a Security Information and Event Management (SIEM) system?",
    options: [
      "Collect and analyze security event logs from multiple sources",
      "Detect and block phishing emails",
      "Encrypt sensitive data automatically",
      "Perform automatic network backups",
    ],
    correctAnswer: "Collect and analyze security event logs from multiple sources",
    explanation:
      "SIEM systems aggregate and correlate logs from firewalls, IDS, servers, and other devices to detect patterns and potential threats in real time.",
    level: "hard",
  },
  {
    question: "Which cybersecurity attack leverages flaws in wireless network protocols to intercept traffic?",
    options: ["Evil Twin Attack", "Pharming", "DNS Spoofing", "ARP Poisoning"],
    correctAnswer: "Evil Twin Attack",
    explanation:
      "An Evil Twin attack involves setting up a rogue Wi-Fi access point that mimics a legitimate one, tricking users into connecting so the attacker can capture credentials and data.",
    level: "hard",
  },
  {
    question: "What is the main difference between IDS and IPS?",
    options: [
      "IDS detects and alerts, while IPS detects and blocks malicious activity.",
      "IDS blocks traffic, while IPS only logs it.",
      "IDS is hardware-based, while IPS is software-based.",
      "IDS works offline, while IPS works online.",
    ],
    correctAnswer: "IDS detects and alerts, while IPS detects and blocks malicious activity.",
    explanation:
      "Intrusion Detection Systems (IDS) monitor and alert administrators of suspicious activity, while Intrusion Prevention Systems (IPS) can actively block or prevent those threats.",
    level: "hard",
  },
  {
    question: "Which encryption algorithm uses a 128-bit block size and variable key lengths of 128, 192, or 256 bits?",
    options: ["AES", "DES", "RSA", "Blowfish"],
    correctAnswer: "AES",
    explanation:
      "Advanced Encryption Standard (AES) is a symmetric encryption algorithm widely used for data protection due to its strength and efficiency.",
    level: "hard",
  },
  {
    question: "What is a common technique used by attackers to maintain persistence after gaining access to a system?",
    options: ["Creating new user accounts", "Running antivirus scans", "Clearing logs", "Disabling network access"],
    correctAnswer: "Creating new user accounts",
    explanation:
      "Attackers often create hidden or privileged user accounts to maintain long-term access to compromised systems even after reboots or patches.",
    level: "hard",
  },
  {
    question: "Which type of cyber attack exploits vulnerabilities in memory management to overwrite system memory?",
    options: ["Buffer Overflow", "Cross-Site Scripting", "Phishing", "Man-in-the-Middle"],
    correctAnswer: "Buffer Overflow",
    explanation:
      "Buffer overflow attacks exploit improper memory handling by injecting excessive data into a buffer, allowing attackers to execute arbitrary code or crash the system.",
    level: "hard",
  },
  {
    question: "What is the main goal of penetration testing?",
    options: [
      "Identify and exploit vulnerabilities before attackers do",
      "Encrypt all sensitive files in the network",
      "Monitor all network traffic in real time",
      "Create new firewalls and IDS rules",
    ],
    correctAnswer: "Identify and exploit vulnerabilities before attackers do",
    explanation:
      "Penetration testing simulates real-world attacks to identify and exploit vulnerabilities in systems, helping organizations strengthen their defenses.",
    level: "hard",
  },
  {
    question: "Which technique allows attackers to inject malicious scripts into trusted websites?",
    options: ["Cross-Site Scripting (XSS)", "Phishing", "SQL Injection", "DoS"],
    correctAnswer: "Cross-Site Scripting (XSS)",
    explanation:
      "XSS attacks inject malicious scripts into web pages viewed by others, allowing attackers to steal cookies, session tokens, or user credentials.",
    level: "hard",
  },
  {
    question: "Which Linux command can be used to find open ports and running services?",
    options: ["netstat -tuln", "ls -la", "chmod +x", "ps aux"],
    correctAnswer: "netstat -tuln",
    explanation:
      "The command `netstat -tuln` lists all active TCP and UDP listening ports, helping administrators identify open network services and potential attack vectors.",
    level: "hard",
  },
  {
    question: "Which type of vulnerability allows unauthorized access through poorly configured authentication mechanisms?",
    options: ["Broken Authentication", "Insecure Deserialization", "Cross-Site Request Forgery", "Race Condition"],
    correctAnswer: "Broken Authentication",
    explanation:
      "Broken Authentication vulnerabilities occur when authentication mechanisms are misconfigured, allowing attackers to compromise passwords, tokens, or session IDs.",
    level: "hard",
  },
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
