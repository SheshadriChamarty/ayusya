import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import CatalogueLink from "./CatalogueLink";
import BronzeBadge from "./illustrations/BronzeBadge";
import LeafMotif from "./illustrations/LeafMotif";
import Reveal from "./story/Reveal";
import ChapterCTA from "./story/ChapterCTA";
import {
  ADDRESS_FULL,
  ADDRESS_SHORT,
  COMPANY_NAME,
  EMAIL,
  FSSAI_LICENSE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  whatsappUrl,
} from "@/lib/contact";

/**
 * The contact block.
 *
 * WhatsApp is listed first and styled as the primary route on purpose: it is the
 * only channel that converts here, since there is no payment step on the site —
 * even the product list checks out into a WhatsApp message. The other four exist
 * so the business looks reachable, not because they are equal.
 *
 * This replaces the last of the four grey "Placeholder Visual" boxes and the last
 * of the `ayusya-*` bridge classes — the migration alias block in
 * tailwind.config.ts can now go.
 */

const CHANNELS = [
  {
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    description: "The fastest way to reach us — we reply here first",
    link: whatsappUrl(),
    icon: MessageCircle,
    primary: true,
  },
  {
    label: "Email",
    value: EMAIL,
    description: "Retail, B2B and bulk enquiries",
    link: `mailto:${EMAIL}`,
    icon: Mail,
  },
  {
    label: "Call",
    value: PHONE_DISPLAY,
    description: "If you would rather just talk it through",
    link: `tel:${PHONE_TEL}`,
    icon: Phone,
  },
  {
    label: "Instagram",
    value: `@${INSTAGRAM_HANDLE}`,
    description: "What came out of the tunnel this week",
    link: INSTAGRAM_URL,
    icon: Instagram,
  },
  {
    label: "Where we are",
    value: COMPANY_NAME,
    description: ADDRESS_SHORT,
    link: undefined,
    icon: MapPin,
  },
];

const ContactSection = () => (
  <section id="contact" className="relative overflow-x-clip bg-cream-100">
    <div className="pointer-events-none absolute -bottom-12 -left-8 h-56 w-40 text-sku-moringa/12 md:h-72 md:w-52">
      <LeafMotif animate />
    </div>

    <div className="container relative z-10 mx-auto px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Talk to us</p>
            <h2 className="heading-lg max-w-xl">
              Every order starts as a conversation.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="paragraph mt-7 max-w-lg">
              Whether you are stocking a shelf, running a wellness programme, or
              just filling your own pantry — tell us what you need and we will tell
              you what we have, what it costs and when it can reach you.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <ChapterCTA lead="whatsapp" whatsappLabel="Message us on WhatsApp" />
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 lg:gap-8">
              {[
                { label: "Solar Dried", value: "100%" },
                { label: "No Additives", value: "0" },
                { label: "Made in Gudivada" },
                { label: "FSSAI Certified" },
              ].map((badge) => (
                <div key={badge.label} className="mx-auto h-24 w-24 text-bronze md:h-28 md:w-28">
                  <BronzeBadge label={badge.label} value={badge.value} />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="script-accent mt-12 text-2xl md:text-3xl">
              Live better. Feel stronger. Thrive every day.
            </p>
          </Reveal>
        </div>

        <div className="space-y-4">
          {CHANNELS.map(({ label, value, description, link, icon: Icon, primary }) => {
            const card = (
              <>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <p className="eyebrow">{label}</p>
                </div>
                <p className="mt-3 font-display text-lg font-semibold text-primary">
                  {value}
                </p>
                <p className="mt-1 text-sm text-umber-light">{description}</p>
              </>
            );

            const shell = [
              "block rounded-3xl border bg-cream-50 p-6 shadow-warm transition-all duration-300",
              primary
                ? "border-primary/50 ring-1 ring-primary/20"
                : "border-caramel/40",
              link && "hover:-translate-y-1 hover:border-primary hover:shadow-warm-lg",
            ]
              .filter(Boolean)
              .join(" ");

            if (!link) {
              return (
                <div key={label} className={shell}>
                  {card}
                  <address className="mt-4 border-t border-caramel/30 pt-4 text-sm not-italic leading-relaxed text-umber">
                    {ADDRESS_FULL}
                  </address>
                  <p className="mt-3 text-xs text-umber-light">
                    FSSAI Central Licence {FSSAI_LICENSE}
                  </p>
                </div>
              );
            }

            const isExternal = link.startsWith("http");
            return (
              <a
                key={label}
                href={link}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer noopener" : undefined}
                className={shell}
              >
                {card}
              </a>
            );
          })}

          <div className="rounded-3xl border border-dashed border-caramel/60 bg-cream-50 p-6 text-center">
            <p className="text-sm leading-relaxed text-umber-light">
              Want the whole range on paper? The catalogue has every product, with
              benefits and usage.
            </p>
            <CatalogueLink variant="quiet" label="Open the catalogue" className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
