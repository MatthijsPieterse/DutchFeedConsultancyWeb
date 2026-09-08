import { useState } from "react"

interface FlipCardProps {
  emoji: string
  label: string
  color: string
  imageUrl: string
  imageAttribution?: {
    source?: string
    sourceUrl?: string
    license?: string
    licenseUrl?: string
  }
  species: string[]
  description: string
  tags: string[]
  variant?: "compact" | "full"
}

export default function FlipCard({
  emoji,
  label,
  color,
  imageUrl,
  imageAttribution,
  species,
  description,
  tags,
  variant = "full",
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card${flipped ? " flipped" : ""} cursor-pointer h-full [perspective:1000px]`}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          setFlipped((f) => !f)
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`${label} — click to see details`}
    >
      <div className="flip-card-inner rounded-xl overflow-hidden shadow-md">
        {/* FRONT */}
        <div className="flip-card-face flip-card-front rounded-xl overflow-hidden">
          <img
            src={imageUrl}
            alt={label}
            className="w-full h-full object-cover"
            data-source={imageAttribution?.source}
            data-source-url={imageAttribution?.sourceUrl}
            data-license={imageAttribution?.license}
            data-license-url={imageAttribution?.licenseUrl}
          />
          {/* Bottom overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 px-4 py-3"
            style={{
              background: `linear-gradient(transparent, ${color}ee)`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{emoji}</span>
              <span className="font-display font-bold text-white text-sm leading-tight">
                {label}
              </span>
            </div>
          </div>
          {/* Flip hint */}
          <div
            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.25)]"
          >
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
        </div>

        {/* BACK */}
        <div
          className="flip-card-face flip-card-back rounded-xl flex flex-col"
          style={{ background: color }}
        >
          <div className="flex-1 p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{emoji}</span>
              <h3 className="font-display font-bold text-white text-base leading-tight">
                {label}
              </h3>
            </div>

            {variant === "full" && (
              <p
                className="text-white text-xs leading-relaxed opacity-90"
              >
                {description}
              </p>
            )}

            <div>
              <p
                className="text-white text-xs font-bold uppercase tracking-wider mb-1.5 opacity-[0.65]"
              >
                Example Species
              </p>
              <div className="flex flex-wrap gap-1">
                {species.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 rounded-full text-white bg-[rgba(255,255,255,0.2)] text-[0.65rem]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {variant === "full" && (
              <div>
                <p
                  className="text-white text-xs font-bold uppercase tracking-wider mb-1.5 opacity-[0.65]"
                >
                  Focus areas
                </p>
                <div className="flex flex-wrap gap-1">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full font-medium text-white bg-[rgba(0,0,0,0.2)] text-[0.65rem]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
