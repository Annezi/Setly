import "./globals.css";

export const metadata = {
  title: {
    default: "Setly Admin",
    template: "%s — Setly Admin",
  },
  description: "Панель администратора Setly",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
