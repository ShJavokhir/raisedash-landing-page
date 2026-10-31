// /uz|ru|es/tools/samsara-alerts: the same page as /tools/samsara-alerts, in the URL's language
// (see src/i18n/server.ts). Unknown locales and /en/… 404.
import { localizedServerSideProps } from "@/i18n/server";

export { default } from "@/pages/tools/samsara-alerts";
export const getServerSideProps = localizedServerSideProps;
