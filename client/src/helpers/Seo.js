import { Helmet } from 'react-helmet';

export const Seo = ({ description, title, lang = 'en', meta, richresult }) => {
  const { favicon } = '';

  const metaTitle = `CodersGala | ${title}`;
  const metaDescription =
    "CodersGala's only purpose is to provide coding knowledge, such as Web development that includes HTML CSS JS Node React MongoDb, Machine Learning, Data Structures and Algorithm" ||
    description;

  return (
    <Helmet
      title={metaTitle}
      htmlAttributes={{ lang }}
      meta={[
        { name: `description`, content: metaDescription },
        { property: `og:title`, content: metaTitle },
        { property: `og:description`, content: metaDescription },
        { property: `og:type`, content: `website` },
        { name: `twitter:card`, content: `summary` },
        { name: `twitter:title`, content: metaTitle },
        { name: `twitter:description`, content: metaDescription },
      ].concat(meta)}
      link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
      script={[
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(richresult),
        },
      ]}
    />
  );
};
