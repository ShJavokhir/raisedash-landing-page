// /uz|ru|es/products/receipts-telegram-bot: the same page as /products/receipts-telegram-bot, in the URL's language
// (see src/i18n/server.ts). Unknown locales and /en/… 404.
import { localizedServerSideProps } from "@/i18n/server";

export { default } from "@/pages/products/receipts-telegram-bot";
export const getServerSideProps = localizedServerSideProps;
