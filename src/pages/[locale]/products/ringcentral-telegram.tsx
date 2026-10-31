// /uz|ru|es/products/ringcentral-telegram: the same page as /products/ringcentral-telegram, in the URL's language
// (see src/i18n/server.ts). Unknown locales and /en/… 404.
import { localizedServerSideProps } from "@/i18n/server";

export { default } from "@/pages/products/ringcentral-telegram";
export const getServerSideProps = localizedServerSideProps;
