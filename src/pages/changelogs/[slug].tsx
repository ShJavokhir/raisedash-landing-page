import { GetServerSideProps } from "next";

// Redirect /changelogs/[slug] to /product-updates/[slug]
export default function ChangelogSlugRedirect() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  return {
    redirect: {
      destination: `/product-updates/${slug}`,
      permanent: true,
    },
  };
};
