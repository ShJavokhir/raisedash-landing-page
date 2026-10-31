// /uz|ru|es/products/shield: the same page as /products/shield, in the URL's language
// (see src/i18n/server.ts). Unknown locales and /en/… 404.
import { localizedServerSideProps } from "@/i18n/server";

export { default } from "@/pages/products/shield";
export const getServerSideProps = localizedServerSideProps;
