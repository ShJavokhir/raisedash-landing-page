// /uz|ru|es/products/driver-paperwork: the same page as /products/driver-paperwork, in the URL's language
// (see src/i18n/server.ts). Unknown locales and /en/… 404.
import { localizedServerSideProps } from "@/i18n/server";

export { default } from "@/pages/products/driver-paperwork";
export const getServerSideProps = localizedServerSideProps;
