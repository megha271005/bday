import React, { useState } from "react"
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel"
import { birthdayConfig } from "@/data/birthdayConfig"
import { Maximize2, X, Calendar, MapPin, Sparkles, LayoutGrid, Layers } from "lucide-react"

interface GalleryItem {
  id: number
  title: string
  date: string
  location: string
  caption: string
  image: string
  fallbackImage: string
  tag: string
  rotation?: string
}

export const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null)
  const [viewMode, setViewMode] = useState<"coverflow" | "scrapbook">("coverflow")

  const photos = birthdayConfig.gallery.items

  // Prepare slides for CoverflowCarousel
  const coverflowSlides = photos.map((photo) => ({
    src: photo.image,
    alt: photo.title,
    title: photo.title,
    subtitle: `${photo.date} • ${photo.location}`,
    meta: [
      { label: "Date", value: photo.date },
      { label: "Place", value: photo.location },
      { label: "Memory", value: photo.tag },
    ],
  }))

  return (
    <div className="w-full">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setViewMode("coverflow")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
            viewMode === "coverflow"
              ? "bg-blush-300 text-midnight shadow-md font-semibold"
              : "glass-card text-cream-200/80 hover:text-cream-100"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>3D Coverflow Carousel</span>
        </button>
        <button
          onClick={() => setViewMode("scrapbook")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
            viewMode === "scrapbook"
              ? "bg-blush-300 text-midnight shadow-md font-semibold"
              : "glass-card text-cream-200/80 hover:text-cream-100"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Scrapbook Polaroids</span>
        </button>
      </div>

      {/* 3D Coverflow Mode */}
      {viewMode === "coverflow" ? (
        <div className="py-4">
          <p className="text-center text-xs text-blush-300/80 mb-2 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-gold" />
            Drag horizontally or use arrow keys to browse through our memory carousel
          </p>
          <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-blush-300/20 shadow-2xl">
            <CoverflowCarousel
              slides={coverflowSlides}
              cardWidth="clamp(220px, 32vw, 360px)"
              showCaption
              showPagination
              showNavigation
              className="py-4"
              cardClassName="border-4 border-cream-100/90 shadow-2xl rounded-2xl bg-midnight"
            />
          </div>
        </div>
      ) : (
        /* Scrapbook Polaroid Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-20 hover:rotate-0 ${
                photo.rotation || ""
              }`}
            >
              {/* Polaroid Card */}
              <div className="bg-cream-100 text-midnight p-4 pb-6 rounded-sm shadow-xl border border-cream-200 relative">
                {/* Washi Tape Effect at top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-blush-200/80 backdrop-blur-sm -rotate-2 border border-dashed border-rose-300/50 shadow-sm" />

                {/* Photo Frame */}
                <div className="aspect-square w-full overflow-hidden bg-neutral-900 rounded-sm relative">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    onError={(e) => {
                      // Fallback to Unsplash URL if local image is unavailable
                      const target = e.target as HTMLImageElement
                      if (target.src !== photo.fallbackImage) {
                        target.src = photo.fallbackImage
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                    <span className="p-2 rounded-full bg-white/80 text-midnight backdrop-blur shadow">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Handwritten Note underneath */}
                <div className="mt-4 px-1">
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-rose-500" />
                      {photo.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold-dark" />
                      {photo.location}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-neutral-900 text-base mb-1">
                    {photo.title}
                  </h3>
                  <p className="font-handwriting text-lg text-rose-700 leading-snug">
                    "{photo.caption}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-cream-100 text-midnight rounded-xl p-5 shadow-2xl border border-gold/40 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-3 -right-3 p-2 bg-midnight text-cream-100 rounded-full border border-blush-300 hover:scale-110 transition-transform shadow-lg"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full max-h-[60vh] overflow-hidden rounded-lg bg-neutral-900 mb-4">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = selectedPhoto.fallbackImage
                }}
                className="w-full h-full max-h-[60vh] object-contain"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  {selectedPhoto.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                  {selectedPhoto.location}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-neutral-900">
                {selectedPhoto.title}
              </h3>
              <p className="font-handwriting text-2xl text-rose-700 pt-1">
                "{selectedPhoto.caption}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default PhotoGallery
