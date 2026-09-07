import type { Page } from "../App"
import FlipCard from "../components/FlipCard"
import {
  assetUrl,
  serviceSections,
  servicesContent,
  species,
} from "../content/content"

interface ServicesProps {
  navigate?: (page: Page, sectionId?: string) => void
}

export default function Services({ navigate }: ServicesProps) {
  return (
    <div className="bg-cream min-h-full">
      <div className="bg-navy text-white py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <span
            className="text-xs font-display font-bold uppercase tracking-widest text-blue-muted"
          >
            {servicesContent.header.eyebrow}
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white mt-2">
            {servicesContent.header.title}
          </h1>
          <p className="mt-3 max-w-2xl text-blue-muted">
            {servicesContent.header.intro}
          </p>
        </div>
      </div>
      <section className="py-14 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-red">
              {servicesContent.speciesSection.eyebrow}
            </span>
            <h2 className="font-display font-extrabold text-3xl text-navy mt-1">
              {servicesContent.speciesSection.title}
            </h2>
            <p className="text-muted-text mt-2 max-w-2xl">
              {servicesContent.speciesSection.intro}
            </p>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[380px]"
          >
            {species.map((item) => (
              <FlipCard
                key={item.label}
                emoji={item.emoji}
                label={item.label}
                color={item.color}
                imageUrl={assetUrl(item.image)}
                imageAttribution={item.attribution}
                species={item.species}
                description={item.description}
                tags={item.tags}
                variant="full"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-14 px-6 bg-cream">
        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <span className="text-xs font-display font-bold uppercase tracking-widest text-red">
              {servicesContent.overview.eyebrow}
            </span>
            <h2 className="font-display font-extrabold text-3xl text-navy mt-1">
              {servicesContent.overview.title}
            </h2>
          </div>
          {serviceSections.map((section, index) => {
            const imageLeft = index % 2 === 0
            return (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-24 bg-white rounded-xl overflow-hidden shadow-sm border border-warm-gray"
              >
                <div
                  className={`flex flex-col ${
                    imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className="lg:w-2/5 shrink-0 bg-warm-gray min-h-[280px]"
                  >
                    <img
                      src={assetUrl(section.image)}
                      alt={section.imageAlt}
                      className="w-full h-full object-cover"
                      data-source={section.attribution?.source}
                      data-source-url={section.attribution?.sourceUrl}
                      data-license={section.attribution?.license}
                      data-license-url={section.attribution?.licenseUrl}
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="font-display font-extrabold text-2xl text-navy mb-3">
                      {section.title}
                    </h3>
                    <p
                      className="text-navy leading-relaxed mb-6 text-base opacity-75"
                    >
                      {section.intro}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                      {section.services.map((service) => (
                        <div key={service.title}>
                          <div className="flex items-start gap-2 mb-1">
                            <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-red" />
                            <h4 className="font-display font-bold text-sm text-navy leading-snug">
                              {service.title}
                            </h4>
                          </div>
                          <p
                            className="text-xs leading-relaxed pl-3.5 text-muted-text"
                          >
                            {service.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <section className="py-12 px-6 bg-white border-t border-warm-gray">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-blue">
              {servicesContent.bestmix.eyebrow}
            </span>
            <h2 className="font-display font-extrabold text-2xl text-navy mt-1 mb-3">
              {servicesContent.bestmix.title}
            </h2>
            <p className="text-muted-text leading-relaxed max-w-xl">
              {servicesContent.bestmix.text}
            </p>
          </div>
          <div
            className="shrink-0 rounded-xl px-8 py-7 text-center bg-navy min-w-[200px]"
          >
            <p className="font-display font-extrabold text-4xl text-white mb-1">
              {servicesContent.bestmix.stat}
            </p>
            <p
              className="text-sm uppercase tracking-wide font-semibold text-blue-muted"
            >
              {servicesContent.bestmix.statLabel}
            </p>
          </div>
        </div>
      </section>
      <section className="py-14 px-6 bg-red">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white">
              {servicesContent.cta.title}
            </h2>
            <p className="text-white mt-2 opacity-90">
              {servicesContent.cta.text}
            </p>
          </div>
          {navigate && (
            <button
              onClick={() => navigate("about", "contact")}
              className="shrink-0 bg-white text-red font-display font-extrabold text-sm uppercase tracking-wide px-7 py-3 rounded hover:bg-cream transition-colors"
            >
              {servicesContent.cta.button}
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
