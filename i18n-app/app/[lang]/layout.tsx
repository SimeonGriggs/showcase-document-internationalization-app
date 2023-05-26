import { supportedLanguages } from "../../../i18n";

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang: lang.id }));
}

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>
        {children}
        <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
      </body>
    </html>
  );
}
