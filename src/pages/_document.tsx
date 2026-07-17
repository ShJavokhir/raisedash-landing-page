import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to CDN for faster image loading */}
        <link rel="preconnect" href="https://cdn.raisedash.com" />
        <link rel="dns-prefetch" href="https://cdn.raisedash.com" />

        {/* Inline theme init: default light, apply saved dark before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var stored = localStorage.getItem('theme');
                  // Default to light theme, only apply dark if explicitly set to 'dark'
                  var isDark = stored === 'dark';
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    // Always default to light theme
                    document.documentElement.classList.remove('dark');
                    // Set light as default in localStorage if not already set
                    if (!stored) {
                      localStorage.setItem('theme', 'light');
                    }
                  }
                  // Keep <meta name="theme-color"> in sync with the Paper background.
                  // NOTE: these two hex values duplicate THEME_COLOR_DARK/LIGHT in
                  // src/lib/theme.ts — change both together.
                  var meta = document.querySelector('meta[name="theme-color"]');
                  if (!meta) {
                    meta = document.createElement('meta');
                    meta.setAttribute('name', 'theme-color');
                    document.head.appendChild(meta);
                  }
                  meta.setAttribute('content', isDark ? '#1a1918' : '#f7f7f4');
                } catch (e) {}
              })();
            `,
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
