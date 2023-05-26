"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { supportedLanguages } from "../../../../i18n";

export default function LocaleSwitcher({ current }: { current: string }) {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {supportedLanguages.map((locale) => {
          return (
            <li key={locale.id}>
              {current === locale.id ? (
                <>
                  {locale.title} ({locale.id})
                </>
              ) : (
                <Link href={redirectedPathName(locale.id)}>
                  {locale.title} ({locale.id})
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
