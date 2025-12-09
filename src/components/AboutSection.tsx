
import React from 'react';

const commitments = [
  {
    title: 'Vision',
    description:
      'To be a leading name in sustainable food preservation, creating a healthier future by reducing post-harvest losses globally.'
  },
  {
    title: 'Sustainable Sourcing',
    description:
      'We use Farm-to-Factory Integration, collaborating directly with local farmers for fair pricing and complete traceability.'
  },
  {
    title: 'Quality Standard',
    description:
      'Every batch is shelf-stable, chemical-free, and preservative-free so families can trust what they serve and store.'
  },
  {
    title: 'Motto',
    description: 'Healing Begins Where Nature Whispers and Light Listens.'
  }
];

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-gradient-to-br from-white via-ayusya-cream to-amber-50">
      <div className="container mx-auto">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="w-full space-y-6 rounded-[32px] border border-amber-100 bg-white/90 p-8 shadow-lg lg:w-1/2">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-700">Our Story & Commitment</p>
            <h2 className="heading-lg text-ayusya-brown">
              Ayusya: A Mother&apos;s Wish for Lasting Wellness, Rooted in Holistic Health.
            </h2>
            <p className="paragraph text-gray-700">
              Ayusya was born from a mother&apos;s heartfelt desire to nurture her family, promoting wellness and supporting
              healthy lives from childhood to the golden years.
            </p>
            <p className="text-base text-gray-600">
              Our mission is to create high-quality, natural products that support well-being at every stage—offering
              nutrition that feels homemade yet stays pantry-ready thanks to eco-hybrid solar dehydration.
            </p>
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-50/70 p-6 text-emerald-900">
              <p className="font-serif text-lg italic">
                “We craft wellness staples that keep nature’s rhythm alive in every kitchen, preserving nutrients as if they
                were freshly harvested.”
              </p>
            </div>
          </div>

          <div className="w-full space-y-6 lg:w-1/2">
            <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-green-100 to-amber-50 p-6 shadow-lg">
              <div className="h-56 rounded-2xl bg-green-500/20">
                <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.5em] text-green-700/80">
                  Placeholder Visual
                </div>
              </div>
              <p className="mt-4 text-center text-sm uppercase tracking-[0.4em] text-amber-800">Holistic Wellness</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {commitments.map((item) => (
                <div key={item.title} className="rounded-2xl border border-amber-200/60 bg-white/95 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-700">{item.title}</p>
                  <p className="mt-3 text-sm text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
