import Link from "next/link";
import { clientFetch } from "../../sanity";

import type { SanityDocument } from "@sanity/client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";

export async function generateStaticParams() {
  const lessonSlugsAndLanguages = await clientFetch(groq`*[
        _type == "lesson" 
        && defined(language) 
        && defined(slug.current)]{
          "lang": language,
          "slug": slug.current
        }`);

  return lessonSlugsAndLanguages;
}

export default async function IndexPage({
  params: { lang, slug },
}: {
  params: { lang: string; slug: string };
}) {
  const data = await clientFetch<SanityDocument>(
    groq`*[
      _type == "lesson" 
      && language == $lang 
      && slug.current == $slug
    ][0]{
      title,
      content,
      "translations": *[
        _type == "translation.metadata" 
        && references(^._id)
      ][0].translations[].value->{
        title,
        language,
        "slug": slug.current
      }
    }`,
    { lang, slug }
  );

  return (
    <div className="prose mx-auto p-12">
      {data?.translations?.length > 0 ? (
        <ul>
          {data.translations.map((translation: any) => (
            <li key={translation.slug}>
              {translation.language === lang ? (
                <span>{translation.title}</span>
              ) : (
                <Link href={`/${translation.language}/${translation.slug}`}>
                  {translation.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : null}
      <hr />
      {data?.title ? <h1>{data.title}</h1> : null}
      {data?.content?.length > 0 ? <PortableText value={data.content} /> : null}
    </div>
  );
}
