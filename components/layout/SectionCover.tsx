import Image from "next/image";

type SectionCoverProps = {
  src: string;
  title: string;
  description?: string;
  alt?: string;
};

export default function SectionCover({
  src,
  title,
  description,
  alt,
}: SectionCoverProps) {
  return (
    <section className="relative isolate h-[220px] overflow-hidden bg-blue-950 text-white sm:h-[290px] lg:h-[350px]">
      <Image
        src={src}
        alt={alt ?? `Capa da secção ${title}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-950/45 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-5 pb-7 sm:px-8 sm:pb-10">
        <div className="max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-200 sm:text-sm">
            Rádio Relato
          </p>

          <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {description && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}