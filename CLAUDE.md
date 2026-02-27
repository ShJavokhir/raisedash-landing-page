Raisedash - Website

- no need to build every time after updating something, only checkiong errors with tsc is enough
- keep design always consistent, learn from homepage
- when adding or modifying a page, update its `lastmod` date in `STATIC_PAGE_DATES` inside `src/pages/sitemap.xml.tsx`. New pages must also be added to the sitemap there.
- when adding a new static page, also add its path to `STATIC_PATHS` in `src/pages/api/indexnow.ts` so it gets submitted to IndexNow.