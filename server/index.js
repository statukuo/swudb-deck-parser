import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import { Form, InputGroup, Button, Modal, Image, Row, Col, Container, Stack, Spinner } from "react-bootstrap";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function DeckSearch(props) {
  const [searchUrl, setSearchUrl] = useState("");
  return /* @__PURE__ */ jsx(Form, { children: /* @__PURE__ */ jsxs(InputGroup, { children: [
    /* @__PURE__ */ jsx(Form.Control, { type: "email", placeholder: "Paste SWUDB url here", onChange: (t) => setSearchUrl(t.target.value) }),
    /* @__PURE__ */ jsx(Button, { variant: "outline-secondary", onClick: () => props.searchDeck(searchUrl), children: "Load deck" })
  ] }) });
}
function CardPreview(props) {
  const handleClose = () => props.setShow(false);
  return /* @__PURE__ */ jsxs(Modal, { show: props.show, onHide: handleClose, children: [
    /* @__PURE__ */ jsx(Modal.Header, { closeButton: true, children: /* @__PURE__ */ jsx(Modal.Title, { children: "Card preview" }) }),
    /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx(Image, { src: props.cardImage, fluid: true }) })
  ] });
}
function Aspect(props) {
  const aspectStyle = {
    maxWidth: "2rem",
    width: "50%"
  };
  return /* @__PURE__ */ jsx(Image, { src: "/aspect" + props.aspectNumber + ".png", style: aspectStyle });
}
function Rarity(props) {
  const aspectStyle = {
    maxWidth: "2rem",
    width: "200%"
  };
  return /* @__PURE__ */ jsx(Image, { src: "/rarity" + props.rarityNumber + ".png", style: aspectStyle });
}
function Card(props) {
  const carStyle = {
    color: "white",
    backgroundColor: props.nth % 2 === 0 ? "#18181b" : "#09090b"
  };
  return /* @__PURE__ */ jsxs(Row, { onClick: () => props.openPreview(props.defaultImagePath), style: carStyle, className: "pt-2 pb-2", children: [
    /* @__PURE__ */ jsxs(Col, { xs: "1", children: [
      props.count,
      "x"
    ] }),
    /* @__PURE__ */ jsx(Col, { xs: "1", children: /* @__PURE__ */ jsx(Rarity, { rarityNumber: props.defaultRarity }) }),
    /* @__PURE__ */ jsx(Col, { xs: "6", className: "text-start", children: props.cardName }),
    /* @__PURE__ */ jsx(Col, { xs: "2", children: props.aspects.map((aspect) => /* @__PURE__ */ jsx(Aspect, { aspectNumber: aspect })) }),
    /* @__PURE__ */ jsxs(Col, { xs: "1", children: [
      "#",
      props.defaultCardNumber
    ] })
  ] });
}
function DeckData(props) {
  if (!props.deckData) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  const base = props.deckData.base;
  const leaders = [props.deckData.leader, props.deckData.secondLeader];
  function openCardPreview(imagePath) {
    props.openPreview(imagePath);
  }
  const titleStyle = {
    color: "white",
    backgroundColor: "#09090b",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    marginTop: "1rem",
    fontWeight: "800"
  };
  return /* @__PURE__ */ jsxs(Container, { className: "p-5", children: [
    /* @__PURE__ */ jsx(Row, { style: titleStyle, children: /* @__PURE__ */ jsx("p", { className: "h4", children: "Base" }) }),
    /* @__PURE__ */ jsx(
      Card,
      {
        cardName: base.cardName,
        defaultCardNumber: base.defaultCardNumber,
        defaultImagePath: base.defaultImagePath,
        aspects: base.aspects,
        count: 1,
        openPreview: openCardPreview,
        defaultRarity: base.defaultRarity,
        nth: 0
      },
      0
    ),
    /* @__PURE__ */ jsx(Row, { style: titleStyle, children: /* @__PURE__ */ jsx("p", { className: "h4", children: "Leader" }) }),
    leaders.map((leader, idx) => {
      if (!leader) {
        return /* @__PURE__ */ jsx(Fragment, {});
      }
      return /* @__PURE__ */ jsx(
        Card,
        {
          cardName: leader.cardName,
          defaultCardNumber: leader.defaultCardNumber,
          defaultImagePath: leader.defaultImagePath,
          aspects: leader.aspects,
          defaultRarity: leader.defaultRarity,
          count: 1,
          openPreview: openCardPreview,
          nth: idx
        },
        idx
      );
    }),
    Object.keys(props.deckData.deckSets).map((setId) => {
      var _a;
      const setData = (_a = props.deckData) == null ? void 0 : _a.deckSets[setId];
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Row, { style: titleStyle, children: /* @__PURE__ */ jsxs("p", { className: "h4", children: [
          "Deck ",
          setId
        ] }) }),
        setData.map((card, idx) => {
          return /* @__PURE__ */ jsx(
            Card,
            {
              cardName: card.cardName,
              defaultCardNumber: card.defaultCardNumber,
              defaultImagePath: card.defaultImagePath,
              aspects: card.aspects,
              count: card.count,
              openPreview: openCardPreview,
              defaultRarity: card.defaultRarity,
              nth: idx
            },
            idx
          );
        })
      ] });
    }),
    Object.keys(props.deckData.sideBoardSets).map((setId) => {
      var _a;
      const setData = (_a = props.deckData) == null ? void 0 : _a.sideBoardSets[setId];
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Row, { style: titleStyle, children: /* @__PURE__ */ jsxs("p", { className: "h4", children: [
          "Sideboard ",
          setId
        ] }) }),
        setData.map((card, idx) => {
          return /* @__PURE__ */ jsx(
            Card,
            {
              cardName: card.cardName,
              defaultCardNumber: card.defaultCardNumber,
              defaultImagePath: card.defaultImagePath,
              aspects: card.aspects,
              count: card.count,
              openPreview: openCardPreview,
              defaultRarity: card.defaultRarity,
              nth: idx
            },
            idx
          );
        })
      ] });
    })
  ] });
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  const [deckData, setDeckData] = useState(void 0);
  const [showCardPreview, setShowCardPreview] = useState(false);
  const [cardPreview, setCardPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function searchDeck(url) {
    setIsLoading(true);
    setDeckData(void 0);
    const response = await fetch("https://cors-anywhere.com/https://swudb.com/api/deck/" + url.split("/").at(-1));
    const data = await response.json();
    const deckSets = {};
    const sideBoardSets = {};
    data.shuffledDeck.reduce((acc, current) => {
      if (current.count > 0) {
        if (!deckSets[current.card.defaultExpansionAbbreviation]) {
          deckSets[current.card.defaultExpansionAbbreviation] = [];
        }
        deckSets[current.card.defaultExpansionAbbreviation].push({
          cardName: current.card.cardName + (current.card.title ? ", " + current.card.title : ""),
          defaultCardNumber: parseInt(current.card.defaultCardNumber),
          defaultImagePath: current.card.defaultImagePath,
          aspects: current.card.aspects,
          defaultRarity: current.card.defaultRarity,
          count: current.count
        });
      }
      if (current.sideboardCount > 0) {
        if (!sideBoardSets[current.card.defaultExpansionAbbreviation]) {
          sideBoardSets[current.card.defaultExpansionAbbreviation] = [];
        }
        sideBoardSets[current.card.defaultExpansionAbbreviation].push({
          cardName: current.card.cardName + (current.card.title ? ", " + current.card.title : ""),
          defaultCardNumber: parseInt(current.card.defaultCardNumber),
          defaultImagePath: current.card.defaultImagePath,
          aspects: current.card.aspects,
          defaultRarity: current.card.defaultRarity,
          count: current.count
        });
      }
    }, {});
    Object.keys(deckSets).forEach((setId) => {
      deckSets[setId].sort((a, b) => a.defaultCardNumber - b.defaultCardNumber);
    });
    Object.keys(sideBoardSets).forEach((setId) => {
      sideBoardSets[setId].sort((a, b) => a.defaultCardNumber - b.defaultCardNumber);
    });
    setIsLoading(false);
    setDeckData({
      ...data,
      deckSets,
      sideBoardSets
    });
  }
  function openPreview(imagePath) {
    setCardPreview("https://swudb.com/images" + imagePath.replace("~", ""));
    setShowCardPreview(true);
  }
  return /* @__PURE__ */ jsx("main", {
    className: "container-fluid",
    children: /* @__PURE__ */ jsxs("div", {
      className: "text-center pt-5",
      children: [/* @__PURE__ */ jsx(CardPreview, {
        show: showCardPreview,
        setShow: setShowCardPreview,
        cardImage: cardPreview
      }), /* @__PURE__ */ jsxs(Stack, {
        gap: 3,
        children: [/* @__PURE__ */ jsx(Container, {
          children: /* @__PURE__ */ jsx(Row, {
            className: "justify-content-lg-center",
            children: /* @__PURE__ */ jsx(Col, {
              xs: true,
              lg: "8",
              children: /* @__PURE__ */ jsx(DeckSearch, {
                searchDeck
              })
            })
          })
        }), /* @__PURE__ */ jsx(DeckData, {
          deckData,
          openPreview
        }), isLoading && /* @__PURE__ */ jsx(Container, {
          children: /* @__PURE__ */ jsx(Row, {
            className: "justify-content-lg-center",
            children: /* @__PURE__ */ jsx(Col, {
              xs: true,
              lg: "8",
              children: /* @__PURE__ */ jsx(Spinner, {
                animation: "border",
                role: "status",
                children: /* @__PURE__ */ jsx("span", {
                  className: "visually-hidden",
                  children: "Loading..."
                })
              })
            })
          })
        })]
      })]
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BmC-vfOj.js", "imports": ["/assets/chunk-NL6KNZEE-DmD5sGTh.js", "/assets/index-DuNNyYrl.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BHSC1opM.js", "imports": ["/assets/chunk-NL6KNZEE-DmD5sGTh.js", "/assets/index-DuNNyYrl.js"], "css": ["/assets/root-2b_J5J8F.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DbH2LTLa.js", "imports": ["/assets/chunk-NL6KNZEE-DmD5sGTh.js", "/assets/index-DuNNyYrl.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-53fa2176.js", "version": "53fa2176", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
