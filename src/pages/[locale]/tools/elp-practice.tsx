// /uz|ru|es/tools/elp-practice: the same page as /tools/elp-practice, in the URL's language
// (see src/i18n/server.ts). Unknown locales and /en/… 404.
import { localizedServerSideProps } from "@/i18n/server";

export { default } from "@/pages/tools/elp-practice";
export const getServerSideProps = localizedServerSideProps;
