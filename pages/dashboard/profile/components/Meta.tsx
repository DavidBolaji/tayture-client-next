import Head from 'next/head';
import { FC } from 'react';

interface MetaProps {
  imageUrl: string | null;
  title:  string;
  desc:  string;
}

const Meta: FC<MetaProps> = ({ imageUrl, title, desc }) => {

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta property="twitter:image" content={imageUrl} />
        </>
      )}
    </Head>
  );
};

export default Meta;
