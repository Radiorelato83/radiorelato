import Image from "next/image";

const partners = [
  {
    id: 1,
    name: "ProDesportista",
    description: "Comunicação, imagem e gestão no desporto.",
    image: "/partners/prodesportista.png",
    imageClass: "h-[125px] w-[285px]",
  },
  {
    id: 2,
    name: "Josaida Comércio & Serviços",
    description: "Comércio e serviços.",
    image: "/partners/josaida.png",
    imageClass: "h-[130px] w-[295px]",
  },
  {
    id: 3,
    name: "Banga M'bote",
    description: "Parceiro da Rádio Relato.",
    image: "/partners/banga-mbote.png",
    imageClass: "h-[130px] w-[295px]",
  },
  {
    id: 4,
    name: "PRIME STUDIO",
    description: "Design e comunicação visual.",
    image: "/partners/prime-studio.png",
    imageClass: "h-[130px] w-[295px]",
  },
];

export default function Partners() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8">

        {/* CABEÇALHO */}

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

        {/* PARCEIROS */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {partners.map((partner, index) => (

            <div
              key={partner.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >

              {/* ÁREA DO LOGO */}

              <div className="relative flex h-[155px] items-center justify-center overflow-hidden px-3">

                {/* detalhe de identidade */}

                <div
                  className={`absolute left-0 top-0 h-1 w-full ${
                    index % 2 === 0
                      ? "bg-blue-900"
                      : "bg-red-600"
                  }`}
                />

                <div
                  className={`relative ${partner.imageClass} transition-transform duration-300 group-hover:scale-[1.04]`}
                >

                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    sizes="295px"
                    className="object-contain"
                  />

                </div>

              </div>

              {/* INFORMAÇÃO */}

              <div className="border-t border-gray-200 bg-white px-4 py-3 text-center">

                <h3 className="text-sm font-black text-blue-950">
                  {partner.name}
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {partner.description}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* TEXTO FINAL */}

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