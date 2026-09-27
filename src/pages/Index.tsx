import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryProgress from "@/components/story/StoryProgress";
import Hero from "@/components/story/Hero";
import Wish from "@/components/story/chapters/01Wish";
import Loss from "@/components/story/chapters/02Loss";
import Farm from "@/components/story/chapters/03Farm";
import SunChapter from "@/components/story/chapters/04Sun";
import Seal from "@/components/story/chapters/05Seal";
import Kitchen from "@/components/story/chapters/06Kitchen";
import Shelf from "@/components/story/chapters/07Shelf";

/**
 * The homepage is the story, in order.
 *
 * Chapters are imported eagerly rather than lazily: they are the page, so
 * deferring any of them would mean the narrative arrives in visible pieces as
 * the reader scrolls into it. The route splitting that pays for this sits in
 * App.tsx, where every *other* page is lazy.
 *
 * Reading order is load-bearing — ① wish, ② stakes, ③ alliance, ④ transformation,
 * ⑤ promise, ⑥ payoff, ⑦ invitation. Each chapter ends in a CTA, so there is no
 * point on the page from which /products is more than one click away.
 */
const Index = () => (
  <div className="flex min-h-screen flex-col">
    <StoryProgress />
    <Navbar />
    <main className="flex-grow">
      {/* Outside the chapter sequence: the photograph opens the page, and the
          Golden Thread starts below it at ① where the story does. */}
      <Hero />
      <Wish />
      <Loss />
      <Farm />
      <SunChapter />
      <Seal />
      <Kitchen />
      <Shelf />
    </main>
    <Footer />
  </div>
);

export default Index;
