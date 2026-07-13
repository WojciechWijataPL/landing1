import FadeIn from "./FadeIn";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    alt: "Ocieplone poddasze pianą PUR",
    caption: "Poddasze użytkowe",
    big: true,
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    alt: "Ekipa podczas prac izolacyjnych",
    caption: "Natrysk na skosach",
  },
  {
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
    alt: "Pomiar i przygotowanie do izolacji",
    caption: "Pomiar wilgotności",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    alt: "Nowoczesny dom jednorodzinny",
    caption: "Dom jednorodzinny",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    alt: "Konstrukcja dachu przed ociepleniem",
    caption: "Więźba przed pracą",
  },
];

export default function Gallery() {
  return (
    <section id="realizacje" className="bg-slate-50 py-20 md:py-28">
      <div className="container">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Nasze realizacje
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Poddasza, skosy i stropodachy ocieplone pianą natryskową na terenie
            województwa łódzkiego.
          </p>
        </FadeIn>

        <FadeIn
          delay={0.1}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {photos.map((p) => (
            <figure
              key={p.src}
              className={`group relative overflow-hidden rounded-2xl shadow-sm ${
                p.big ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  p.big ? "h-64 md:h-full" : "h-40 md:h-48"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-4 text-sm font-semibold text-white drop-shadow">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </FadeIn>

        <p className="mt-4 text-center text-xs text-slate-400">
          Zdjęcia poglądowe. Galeria własnych realizacji w przygotowaniu.
        </p>
      </div>
    </section>
  );
}
