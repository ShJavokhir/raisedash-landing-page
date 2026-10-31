// /uz|ru|es/products/driver-coaching: the same page as /products/driver-coaching, in the URL's language
// (see src/i18n/server.ts). Unknown locales and /en/… 404.
import { localizedServerSideProps } from "@/i18n/server";

export { default } from "@/pages/products/driver-coaching";
export const getServerSideProps = localizedServerSideProps;
