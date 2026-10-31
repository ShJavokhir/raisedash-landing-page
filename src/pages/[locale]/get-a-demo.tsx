// /uz|ru|es/get-a-demo: the same page as /get-a-demo, in the URL's language
// (see src/i18n/server.ts). Unknown locales and /en/… 404.
import { localizedServerSideProps } from "@/i18n/server";

export { default } from "@/pages/get-a-demo";
export const getServerSideProps = localizedServerSideProps;
