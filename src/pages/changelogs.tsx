import { GetServerSideProps } from "next";

// Redirect /changelogs to /product-updates
export default function ChangelogsRedirect() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/product-updates",
      permanent: true,
    },
  };
};
