// /uz|ru|es/products/freight-payroll: the same page as /products/freight-payroll, in the URL's language
// (see src/i18n/server.ts). Unknown locales and /en/… 404.
import { localizedServerSideProps } from "@/i18n/server";

export { default } from "@/pages/products/freight-payroll";
export const getServerSideProps = localizedServerSideProps;
