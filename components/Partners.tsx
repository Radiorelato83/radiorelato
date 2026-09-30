import Image from "next/image";

const partners = [
  {
    id: 1,
    name: "ProDesportista",
    description: "Comunicação, imagem e gestão no desporto.",
    image: "/partners/prodesportista.png",
    imageClass: "h-[100px] w-[220px]",
  },
  {
    id: 2,
    name: "Josaida Comércio & Serviços",
    description: "Comércio e serviços.",
    image: "/partners/josaida.png",
    imageClass: "h-[105px] w-[230px]",
  },
  {
    id: 3,
    name: "Banga M'bote",
    description: "Parceiro da Rádio Relato.",
    image: "/partners/banga-mbote.png",
    imageClass: "h-[105px] w-[230px]",
  },
  {
    id: 4,
    name: "PRIME STUDIO",
    description: "Design e comunicação visual.",
    image: "/partners/prime-studio.png",
    imageClass: "h-[105px] w-[230px]",
  },
];

export default function Partners() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8">

        {/* Cabeçalho */}
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-red-600">
            Rede Rádio Relato
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-blue-950 md:text-4xl">
            Parceiros
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
            Marcas e entidades que fazem parte da nossa rede e contribuem
            para o crescimento da Rádio Relato.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group flex min-h-[210px] flex-col items-center justify-between rounded-2xl border border-gray-200 bg-[#f8fafc] px-6 py-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg"
            >

              {/* Logo */}
              <div className="flex h-[125px] w-full items-center justify-center">
                <div
                  className={`relative ${partner.imageClass} transition duration-300 group-hover:scale-105`}
                >
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    sizes="230px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Descrição */}
              <p className="mt-3 text-xs leading-5 text-gray-400">
                {partner.description}
              </p>

            </div>
          ))}
        </div>

        {/* Texto final */}
        <div className="mt-8 text-center">
          <p className="text-xs font-medium text-gray-400">
            A Rádio Relato valoriza parcerias que aproximam o desporto,
            a comunicação e o mundo empresarial.
          </p>
        </div>

      </div>
    </section>
  );
}