import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CTARail from "./components/CTARail";
import CartPanel from "./components/CartPanel";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./hooks/useCart";

/*
 * Index stays eagerly imported — it is the entry point for almost every
 * visitor, so lazy-loading it would only add a round trip before first paint.
 * Everything else splits out, which pays for the motion library the story needs.
 */
const Products = lazy(() => import("./pages/Products"));
const About = lazy(() => import("./pages/About"));
const SolarAdvantage = lazy(() => import("./pages/SolarAdvantage"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
/* A working document for choosing the hero photograph, shareable for feedback.
   Unlinked from the navbar on purpose — delete this route, /pages/HeroOptions.tsx
   and the unused entries in heroOptions.ts once the hero is settled. */
const HeroOptions = lazy(() => import("./pages/HeroOptions"));

const queryClient = new QueryClient();

/* Holds the cream page ground while a route chunk arrives, so navigation never
   flashes white against the warm palette. */
const RouteFallback = () => (
  <div className="min-h-screen bg-background" aria-busy="true" />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* CartProvider wraps the router rather than sitting inside a page, because
          the badge has to survive navigation — a provider mounted per route would
          reset the list on every click. */}
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/solar-advantage" element={<SolarAdvantage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/hero-options" element={<HeroOptions />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          {/* Outside <Routes> so the rail persists across navigation instead of
              remounting — and so every future route inherits it for free. */}
          <CTARail />
          {/* One panel for the whole app. Inside the router because its empty
              state links to /products. */}
          <CartPanel />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
