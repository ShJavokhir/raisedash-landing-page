// /uz|ru|es/products/feedback-telegram-bot: the same page as /products/feedback-telegram-bot, in the URL's language
// (see src/i18n/server.ts). Unknown locales and /en/… 404.
import { localizedServerSideProps } from "@/i18n/server";

export { default } from "@/pages/products/feedback-telegram-bot";
export const getServerSideProps = localizedServerSideProps;
