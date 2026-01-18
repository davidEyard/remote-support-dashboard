export const initialTickets = [
  {
    id: "t1",
    title: "Can't Access Email Account",
    status: "Open",
    priority: "High",
    category: "Account Issue",
    timeAgo: "15m ago",
    description:
      "User unable to access email due to repeated password error. They report it started this morning after a password change.",
    stepsTaken: [
      "Checked user credentials and verified account exists.",
      "Initiated password reset and asked user to retry login.",
      "Issue still persists, investigating further...",
    ],
  },
  {
    id: "t2",
    title: "Wi-Fi Not Connecting",
    status: "In Progress",
    priority: "Medium",
    category: "Network",
    timeAgo: "1h ago",
    description:
      "User cannot connect to office Wi-Fi. Other devices connect normally. User reports 'Unable to join network'.",
    stepsTaken: [
      "Restarted Wi-Fi on device and forgot/rejoined network.",
      "Verified correct password and DHCP settings.",
      "Checking router/AP logs and trying alternate SSID.",
    ],
  },
  {
    id: "t3",
    title: "Printer Not Responding",
    status: "Open",
    priority: "Low",
    category: "Hardware",
    timeAgo: "2h ago",
    description:
      "Printer appears offline for user, but is powered on. Print jobs are stuck in queue.",
    stepsTaken: [
      "Checked printer power and network connection.",
      "Cleared stuck jobs from print queue.",
      "Re-added printer and verified driver selection.",
    ],
  },
  {
    id: "t4",
    title: "VPN Connection Failed",
    status: "Resolved",
    priority: "High",
    category: "VPN",
    timeAgo: "Yesterday",
    description:
      "VPN client fails to connect with authentication error. User cannot access internal tools remotely.",
    stepsTaken: [
      "Verified user permissions and MFA status.",
      "Updated VPN client and re-imported config.",
      "Confirmed connection success and internal access restored.",
    ],
  },
  {
    id: "t5",
    title: "Slow Computer Performance",
    status: "Open",
    priority: "Medium",
    category: "Software",
    timeAgo: "Yesterday",
    description:
      "Device is running slow, apps take a long time to open. User suspects updates running in background.",
    stepsTaken: [
      "Checked startup apps and background processes.",
      "Verified disk space and ran basic health checks.",
      "Scheduled OS update + restart window with user.",
    ],
  },
];