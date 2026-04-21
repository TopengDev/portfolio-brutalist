export type UseRow = { k: string; v: string };

export const hardware: UseRow[] = [
  { k: "Daily driver", v: "Arch Linux laptop, 32GB RAM" },
  { k: "Phone", v: "Android, Pulse install as a dogfood" },
  { k: "Keyboard", v: "Mechanical, blue switches" },
  { k: "Display", v: "Single 27\" 1440p, matte" },
  { k: "Audio", v: "Wired IEMs — focus on latency over bass" },
  { k: "Printer testbed", v: "Xprinter XP-58IIH thermal · JetDirect :9100" },
];

export const software: UseRow[] = [
  { k: "Editor", v: "Neovim + Claude Code" },
  { k: "Terminal", v: "Alacritty + tmux" },
  { k: "Shell", v: "bash + zsh" },
  { k: "Browser", v: "qutebrowser (primary), Chromium for DevTools" },
  { k: "Music", v: "mpv + yt-dlp (piped by a skill)" },
  { k: "OS", v: "Arch Linux, Hyprland" },
  { k: "Versioning", v: "Git, GitHub Actions CI/CD" },
  { k: "Comms", v: "WhatsApp + agent-to-agent via attn" },
];
