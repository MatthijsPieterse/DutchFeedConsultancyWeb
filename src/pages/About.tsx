import { aboutContent, assetUrl, siteContent } from "../content/content"

export default function About() {
  const { contact } = siteContent
  return (
    <div className="bg-cream min-h-full">
      <div className="bg-navy text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <span
            className="text-xs font-display font-bold uppercase tracking-widest text-blue-muted"
          >
            {aboutContent.header.eyebrow}
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white mt-2">
            {aboutContent.header.title}
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-xl overflow-hidden shadow-sm bg-warm-gray aspect-square">
              <img
                src={assetUrl(aboutContent.portrait.image)}
                alt={aboutContent.portrait.alt}
                className="w-full h-full object-cover"
                data-source={aboutContent.portrait.attribution?.source}
                data-source-url={aboutContent.portrait.attribution?.sourceUrl}
                data-license={aboutContent.portrait.attribution?.license}
                data-license-url={aboutContent.portrait.attribution?.licenseUrl}
              />
            </div>
            <div
              id="contact"
              className="scroll-mt-24 bg-white rounded-xl p-6 shadow-sm border border-warm-gray"
            >
              <h3 className="font-display font-bold text-base text-navy mb-4 uppercase tracking-wide">
                {aboutContent.contactHeading}
              </h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-text uppercase tracking-wide font-semibold">
                    Consultant
                  </dt>
                  <dd className="text-navy">{contact.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-text uppercase tracking-wide font-semibold">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue hover:underline"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-text uppercase tracking-wide font-semibold">
                    Phone
                  </dt>
                  <dd className="text-navy">{contact.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-text uppercase tracking-wide font-semibold">
                    Location
                  </dt>
                  <dd className="text-navy">{contact.location}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-text uppercase tracking-wide font-semibold">
                    Languages
                  </dt>
                  <dd className="text-navy">{contact.languages}</dd>
                </div>
              </dl>
              <a
                href={`mailto:${contact.email}`}
                className="mt-6 block w-full text-center py-3 bg-navy text-white font-display font-bold text-sm uppercase tracking-wide rounded hover:bg-navy-light transition-colors"
              >
                {aboutContent.messageButton}
              </a>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="text-xs font-display font-bold uppercase tracking-widest text-red">
                {aboutContent.background.eyebrow}
              </span>
              <h2 className="font-display font-extrabold text-3xl text-navy mt-1 mb-5">
                {aboutContent.background.title}
              </h2>
              <div
                className="space-y-4 text-navy leading-relaxed opacity-90"
              >
                {aboutContent.background.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-navy mb-5">
                {aboutContent.expertise.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutContent.expertise.items.map((group) => (
                  <div
                    key={group.title}
                    className="bg-white rounded-lg p-5 border border-warm-gray border-l-4"
                    style={{ borderLeftColor: group.color }}
                  >
                    <h4 className="font-display font-bold text-base text-navy mb-3">
                      {group.title}
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-text">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span style={{ color: group.color }}>•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-7 border border-warm-gray">
              <h3 className="font-display font-bold text-lg text-navy mb-5">
                {aboutContent.approach.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {aboutContent.approach.items.map((item) => (
                  <div key={item.title}>
                    <h4 className="font-display font-bold text-navy mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-text leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
