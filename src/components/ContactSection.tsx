import React from 'react';
import { Mail, Phone, Instagram, MapPin, Leaf } from 'lucide-react';

const contactDetails = [
  {
    label: 'Email Us',
    value: 'ayusyaexp@gmail.com',
    description: 'General & B2B inquiries',
    link: 'mailto:ayusyaexp@gmail.com',
    icon: Mail
  },
  {
    label: 'Call',
    value: '8333832277',
    description: 'Talk to our nutrition-focused team',
    link: 'tel:+918333832277',
    icon: Phone
  },
  {
    label: 'Social',
    value: '@ayusya_smartnutrition',
    description: 'Daily solar-powered goodness',
    link: 'https://instagram.com/ayusya_smartnutrition',
    icon: Instagram
  },
  {
    label: 'Location',
    value: 'Ayusya Foods Industry · India',
    description: 'Rooted in local farms, serving globally',
    link: undefined,
    icon: MapPin
  }
];

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-ayusya-lightGreen via-white to-amber-50">
      <div className="container mx-auto">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6 rounded-[32px] border border-amber-100 bg-white/90 p-8 shadow-lg">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-700">Contact Us</p>
            <h2 className="heading-lg text-ayusya-brown">Let&apos;s Build Smart, Healthy Lives Together</h2>
            <p className="text-gray-700">
              Whether you&apos;re sourcing for retail shelves, wellness programs, or your family pantry, AYUSYA Foods Industry is
              ready to tailor solar-crafted solutions for you.
            </p>
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-50/70 p-6 text-emerald-900 flex items-center gap-4">
              <Leaf className="h-10 w-10 text-emerald-600" />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Closing Motto</p>
                <p className="text-lg font-serif">Live Better. Feel Stronger. Thrive Every Day.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/60 p-4 text-center text-sm uppercase tracking-[0.3em] text-amber-800">
              Placeholder Visual
            </div>
          </div>

          <div className="space-y-4">
            {contactDetails.map(({ label, value, description, link, icon: Icon }) => {
              const cardClasses =
                'flex flex-col gap-2 rounded-2xl border border-amber-100 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md';

              if (link) {
                const isExternal = link.startsWith('http');
                return (
                  <a
                    key={label}
                    href={link}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    className={cardClasses}
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-ayusya-green/15 p-2 text-ayusya-brown">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-700">{label}</p>
                    </div>
                    <p className="text-lg font-semibold text-ayusya-brown">{value}</p>
                    <p className="text-sm text-gray-600">{description}</p>
                  </a>
                );
              }

              return (
                <div key={label} className={cardClasses}>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-ayusya-green/15 p-2 text-ayusya-brown">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-700">{label}</p>
                  </div>
                  <p className="text-lg font-semibold text-ayusya-brown">{value}</p>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              );
            })}
            <div className="rounded-[28px] border border-amber-200 bg-gradient-to-r from-amber-50 to-green-50 p-6 text-center text-sm text-amber-900">
              Prefer a detailed catalogue or samples? Drop us a note—we respond within 24 hours with customized options.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

