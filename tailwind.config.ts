import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@arkcit/engine/dist/**/*.d.ts",
    "./node_modules/@arkcit/engine/dist/**/*.{js,mjs,cjs}",
    "./node_modules/@arkcit/engine-react/dist/**/*.d.ts",
    "./node_modules/@arkcit/engine-react/dist/**/*.{js,mjs,cjs}",
    "./node_modules/@arkcit/react-ui/dist/**/*.d.ts",
    "./node_modules/@arkcit/react-ui/dist/**/*.{js,mjs,cjs}"
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"]
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        surface: {
          DEFAULT: "var(--color-surface)",
          hover: "var(--color-surface-hover)"
        },
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)"
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)"
        },
        ring: "var(--color-ring)",
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          active: "var(--color-primary-active)",
          foreground: "var(--color-primary-foreground)",
          soft: "var(--color-primary-soft)",
          "soft-foreground": "var(--color-primary-soft-foreground)"
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          hover: "var(--color-secondary-hover)",
          foreground: "var(--color-secondary-foreground)",
          soft: "var(--color-secondary-soft)",
          "soft-foreground": "var(--color-secondary-soft-foreground)"
        },
        success: {
          DEFAULT: "var(--color-success)",
          hover: "var(--color-success-hover)",
          foreground: "var(--color-success-foreground)",
          soft: "var(--color-success-soft)",
          "soft-foreground": "var(--color-success-soft-foreground)"
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          hover: "var(--color-warning-hover)",
          foreground: "var(--color-warning-foreground)",
          soft: "var(--color-warning-soft)",
          "soft-foreground": "var(--color-warning-soft-foreground)"
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          hover: "var(--color-danger-hover)",
          foreground: "var(--color-danger-foreground)",
          soft: "var(--color-danger-soft)",
          "soft-foreground": "var(--color-danger-soft-foreground)"
        },
        info: {
          DEFAULT: "var(--color-info)",
          hover: "var(--color-info-hover)",
          foreground: "var(--color-info-foreground)",
          soft: "var(--color-info-soft)",
          "soft-foreground": "var(--color-info-soft-foreground)"
        },
        "glass-bg": "var(--glass-bg)",
        "glass-border": "var(--glass-border)",
        "glass-highlight": "var(--glass-highlight)",
        "ghost-hover": "var(--ghost-bg-hover)",
        "ghost-foreground": "var(--ghost-foreground)",
        "ghost-primary-hover": "var(--ghost-primary-bg-hover)",
        "ghost-primary-foreground": "var(--ghost-primary-foreground)",
        "ghost-secondary-hover": "var(--ghost-secondary-bg-hover)",
        "ghost-secondary-foreground": "var(--ghost-secondary-foreground)",
        "ghost-success-hover": "var(--ghost-success-bg-hover)",
        "ghost-success-foreground": "var(--ghost-success-foreground)",
        "ghost-warning-hover": "var(--ghost-warning-bg-hover)",
        "ghost-warning-foreground": "var(--ghost-warning-foreground)",
        "ghost-danger-hover": "var(--ghost-danger-bg-hover)",
        "ghost-danger-foreground": "var(--ghost-danger-foreground)",
        "ghost-info-hover": "var(--ghost-info-bg-hover)",
        "ghost-info-foreground": "var(--ghost-info-foreground)"
      },
      boxShadow: {
        glass: "var(--shadow-glass)"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)"
      }
    }
  }
};

export default config;
