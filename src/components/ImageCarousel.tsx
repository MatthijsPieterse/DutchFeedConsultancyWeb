import { useEffect, useState } from "react"
import { assetUrl, carouselItems } from "../content/content"

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => {
      goTo((current + 1) % carouselItems.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [current])

  const goTo = (index: number) => {
    if (transitioning) return
    setTransitioning(true)
    window.setTimeout(() => {
      setCurrent(index)
      setTransitioning(false)
    }, 300)
  }

  const slide = carouselItems[current]

  return (
    <div
      className="relative w-full overflow-hidden bg-navy h-[560px]"
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${transitioning ? "opacity-0" : "opacity-100"}`}
      >
        <img
          src={assetUrl(slide.image)}
          alt={slide.imageAlt}
          className="w-full h-full object-cover"
          data-source={slide.attribution?.source}
          data-source-url={slide.attribution?.sourceUrl}
          data-license={slide.attribution?.license}
          data-license-url={slide.attribution?.licenseUrl}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,34,68,0.82)_40%,rgba(13,34,68,0.35)_100%)]"
        />
      </div>

      <div
        className={`relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 pb-16 transition-opacity duration-500 ${transitioning ? "opacity-0" : "opacity-100"}`}
      >
        <span
          className="inline-block mb-3 text-xs font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit bg-red text-white"
        >
          {slide.label}
        </span>
        <h1
          className="font-display font-extrabold text-white mb-3 leading-tight text-[clamp(1.8rem,4vw,3rem)]"
        >
          {slide.heading}
        </h1>
        <p className="text-white text-lg max-w-xl opacity-[0.88]">
          {slide.subheading}
        </p>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex gap-2">
        {carouselItems.map((item, index) => (
          <button
            key={item.heading}
            onClick={() => goTo(index)}
            className={`rounded-full transition-all duration-300 h-2 ${index === current ? "w-7 bg-red" : "w-2 bg-[rgba(255,255,255,0.5)]"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() =>
          goTo((current - 1 + carouselItems.length) % carouselItems.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-[rgba(13,34,68,0.6)]"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % carouselItems.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-[rgba(13,34,68,0.6)]"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )
}
