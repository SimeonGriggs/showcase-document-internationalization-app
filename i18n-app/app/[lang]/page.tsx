import Link from "next/link";
import { clientFetch } from "../sanity";
import LocaleSwitcher from "./components/locale-switcher";
import type { SanityDocument } from "@sanity/client";
import { groq } from "next-sanity";

export default async function IndexPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const data = await clientFetch<SanityDocument[]>(
    groq`*[
      _type == "lesson" 
      && language == $lang 
      && defined(slug.current)
    ]`,
    { lang }
  );

  return (
    <div className="prose mx-auto p-12">
      <LocaleSwitcher current={lang} />
      {data.length > 0 ? (
        <>
          <h1>Lessons</h1>
          <ul>
            {data.map((lesson) => (
              <li key={lesson._id}>
                <Link href={`/${lang}/${lesson.slug.current}`}>
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h1>No lessons found</h1>
      )}
    </div>
  );
}
