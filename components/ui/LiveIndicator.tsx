export default function LiveIndicator() {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-3
        bg-red-600
        text-white
        px-4
        py-2
        rounded-full
        shadow-md
      "
    >

      {/* Equalizador animado */}
      <div className="flex items-end gap-1 h-4">

        <span
          className="
            w-1
            h-2
            bg-white
            rounded-full
            animate-pulse
          "
        />

        <span
          className="
            w-1
            h-4
            bg-white
            rounded-full
            animate-pulse
          "
        />

        <span
          className="
            w-1
            h-3
            bg-white
            rounded-full
            animate-pulse
          "
        />

      </div>


      {/* Texto */}
      <span
        className="
          text-xs
          font-extrabold
          uppercase
          tracking-widest
        "
      >
        Agora no Ar
      </span>


    </div>
  );
}