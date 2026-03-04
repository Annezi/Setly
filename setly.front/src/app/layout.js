import "./globals.css";
import DisableImageDrag from "./components/globals/DisableImageDrag";
import { LikedChecklistsProvider } from "./lib/liked-checklists-context";

export const metadata = {
  title: "Setly - чекпланы для планирования путешествий",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <head>
            </head>
            <body>
                <LikedChecklistsProvider>
                    <DisableImageDrag />
                    {children}
                </LikedChecklistsProvider>
            </body>
        </html>
    );
}