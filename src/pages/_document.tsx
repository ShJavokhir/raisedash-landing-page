import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Inline theme init: default light, apply saved dark before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var stored = localStorage.getItem('theme');
                  // Default to light theme, only apply dark if explicitly set to 'dark'
                  if (stored === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    // Always default to light theme
                    document.documentElement.classList.remove('dark');
                    // Set light as default in localStorage if not already set
                    if (!stored) {
                      localStorage.setItem('theme', 'light');
                    }
                  }
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
