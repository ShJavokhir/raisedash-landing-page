// /uz|ru|es/products/pti-telegram-bot: the same page as /products/pti-telegram-bot, in the URL's language
// (see src/i18n/server.ts). Unknown locales and /en/… 404.
import { localizedServerSideProps } from "@/i18n/server";

export { default } from "@/pages/products/pti-telegram-bot";
export const getServerSideProps = localizedServerSideProps;
