import { Link } from 'react-router-dom'

interface CategoryTileProps {
  title: string
  slug: string
  image: string
  subtitle?: string
}

export function CategoryTile({ title, slug, image, subtitle }: CategoryTileProps) {
  return (
    <Link
      to={`/category/${slug}`}
      className="group relative h-56 md:h-72 lg:h-96 rounded-xl overflow-hidden block"
      aria-label={`Open ${title} category`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
        style={{ backgroundImage: `url(${image})` }}
        role="img"
        aria-hidden="true"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1">{title}</h3>
        {subtitle && <p className="text-sm md:text-base font-medium">{subtitle}</p>}
      </div>

      {/* Hover Focus Ring */}
      <div className="absolute inset-0 ring-2 ring-transparent group-focus-visible:ring-blue-500 transition-all rounded-xl" />
    </Link>
  )
}
