// import { CacheProvider } from '@emotion/react';
// import createEmotionServer from '@emotion/server/create-instance';
// import type { Request, Response } from 'express';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { createStaticRouter, StaticRouterProvider, type StaticHandlerContext } from 'react-router-dom';
// import createEmotionCache from './contexts/emotion-cache';
// import routes from './routes/routes';
// import { readFileSync } from 'fs';
// import { cwd } from 'process';

// export const render = async (req: Request, resp: Response) => {
//   console.log(req.url, ' - in main.server.tsx');
//   try {
//     const serverContext: StaticHandlerContext = {
//       actionData: null,
//       actionHeaders: {},
//       basename: undefined,
//       errors: null,
//       loaderData: {},
//       loaderHeaders: {},
//       location: { key: 'route', pathname: req.url, state: {}, search: '', hash: '' },
//       matches: [],
//       statusCode: 200,
//       _deepestRenderedBoundaryId: null
//     };

//     const staticRouter = createStaticRouter(routes, serverContext);

//     const cache = createEmotionCache();
//     const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
//     // const callbackName = isbot(req.headers['user-agent']) ? 'onAllReady' : 'onShellReady';

//     const appContent = ReactDOMServer.renderToString(
//       <React.StrictMode>
//         <CacheProvider value={cache}>
//           <StaticRouterProvider router={staticRouter} context={serverContext} />
//         </CacheProvider>
//       </React.StrictMode>
//     );

//     const emotionChunks = extractCriticalToChunks(appContent);
//     const emotionCss = constructStyleTagsFromChunks(emotionChunks);

//     const htmlTemplate = readFileSync(`${cwd()}/index.html`, 'utf-8');

//     const finalHtml = htmlTemplate
//       .replace('<!--ssr-inject-->', appContent)
//       .replace('</head>', emotionCss + '\n</head>');

//     resp.setHeader('Content-Type', 'text/html');
//     resp.status(200).send(finalHtml);
//   } catch (error) {
//     console.error(error);
//     resp.status(500).send(`
//       <html>
//         <body>
//           <h1>Server Rendering Error</h1>
//           <pre>${(error as Error).stack}</pre>
//         </body>
//       </html>
//     `);
//   }
// };
// /**
//  *     const finalHtml = `
//     <!doctype html>
//       <html lang="en">
//         <head>
//           <meta charset="utf-8" />
//           <meta name="viewport" content="width=device-width, initial-scale=1" />
//           <title>Portfolio for Andrew Klapper</title>
//           <meta name="title" content="Portfolio for Andrew Klapper" />
//           <meta name="description" content="Personal developer portfolio" />
//           <meta name="keywords" content="Typescript, react, portfolio, developer" />
//           <meta name="robots" content="index, follow" />
//           <meta name="language" content="English" />
//           <meta name="author" content="Andrew Klapper" />
//           <link rel="icon" type="image/x-icon" href="/favicon.ico" />
//           <link rel="stylesheet" href="/styles.css" />
//           <meta name="mui/emotion-insertion-point" content="" />
//           ${emotionCss}
//         </head>

//         <body>
//         <div class="background" id="background" data-testid="background"></div>
//         <div class="background-overlay" id="background-overlay" data-testid="background-overlay"></div>
//         <div id="root">${appContent}</div>
//         <script type="module" src="/client/browser.mjs"></script>
//           </body>
//       </html>
//       `;
//  */
// export default render;

// // let indexHtml: null | string = null;

// // export function handleRequest(indexPath: string) {
// //   return function render(req: Request, resp: Response) {
// //     let didError = false;

// //     if (!indexHtml) {
// //       indexHtml = fs.readFileSync(indexPath).toString();
// //     }

// //     const [htmlStart, htmlEnd] = indexHtml.split(`<div id="root"></div>`);

// //     const cache = createEmotionCache();
// //     const sheets = new ServerStyleSheets();

// //     // For bots (e.g. search engines), the content will not be streamed but render all at once.
// //     // For users, content should be streamed to the user as they are ready.
// //     const callbackName = isbot(req.headers['user-agent']) ? 'onAllReady' : 'onShellReady';

// //     const stream = ReactDOMServer.renderToPipeableStream(
// //       sheets.collect(
// //         <StaticRouter location={req.url}>
// //           <CacheProvider value={cache}>
// //             <App />
// //           </CacheProvider>
// //         </StaticRouter>
// //       ),
// //       {
// //         [callbackName]() {
// //           resp.statusCode = didError ? 500 : 200;
// //           resp.setHeader('Content-type', 'text/html; charset=utf-8');
// //           resp.write(`${htmlStart}<div id="root"><style id="jss-server-side">${sheets.toString()}</style>`);
// //           stream.pipe(resp);
// //           resp.write(`</div>${htmlEnd}`);
// //         },
// //         onShellError(error) {
// //           console.error(error);
// //           resp.statusCode = 500;
// //           resp.send('<!doctype html><h1>Server Error</h1>');
// //         },
// //         onError(error) {
// //           didError = true;
// //           console.error(error);
// //         }
// //       }
// //     );
// //     console.log(sheets);
// //   };
// // }
