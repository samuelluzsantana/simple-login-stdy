import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo } from "react";

interface LinearGradientProps {
  /** Tamanho base do SVG (altura) */
  size?: number;
  /** Cores do gradiente primário */
  primaryColors?: [string, string];
  /** Cores do gradiente secundário */
  secondaryColors?: [string, string];
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Componente de fundo animado com gradientes circulares
 * Cria um efeito visual dinâmico com círculos que rotacionam e pulsam
 */
const LinearGradient: React.FC<LinearGradientProps> = ({
  size = 400,
  primaryColors = ["#0066FF", "#6FFFDC"],
  secondaryColors = ["#2FCFF2", "#BAEAFF"],
  className = "",
}) => {
  // IDs únicos para evitar conflitos quando múltiplos componentes são renderizados
  const ids = useMemo(
    () => ({
      filter0: `filter0_${Math.random().toString(36).substr(2, 9)}`,
      filter1: `filter1_${Math.random().toString(36).substr(2, 9)}`,
      gradient0: `gradient0_${Math.random().toString(36).substr(2, 9)}`,
      gradient1: `gradient1_${Math.random().toString(36).substr(2, 9)}`,
    }),
    []
  );

  const controlsClockwise = useAnimation();
  const controlsCounterClockwise = useAnimation();
  const controlsCounterClockwise2 = useAnimation();

  useEffect(() => {
    // Animação principal - rotação sentido horário
    controlsClockwise.start({
      rotate: [0, 360],
      opacity: [0.8, 1, 0.8],
      scale: [1, 1.08, 1],
      transition: {
        rotate: { repeat: Infinity, duration: 20, ease: "linear" },
        opacity: { repeat: Infinity, duration: 8, ease: "easeInOut" },
        scale: { repeat: Infinity, duration: 12, ease: "easeInOut" },
      },
    });

    // Animação secundária - rotação anti-horário
    controlsCounterClockwise.start({
      rotate: [0, -360],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.1, 0.8],
      transition: {
        rotate: { repeat: Infinity, duration: 15, ease: "linear" },
        opacity: { repeat: Infinity, duration: 6, ease: "easeInOut" },
        scale: { repeat: Infinity, duration: 10, ease: "easeInOut" },
      },
    });

    // Animação terciária - movimento mais complexo
    controlsCounterClockwise2.start({
      rotate: [0, 180, -90, 360],
      opacity: [0.2, 0.6, 0.2],
      scale: [0.9, 1.05, 0.9],
      transition: {
        rotate: { repeat: Infinity, duration: 25, ease: "easeInOut" },
        opacity: { repeat: Infinity, duration: 12, ease: "easeInOut" },
        scale: { repeat: Infinity, duration: 15, ease: "easeInOut" },
      },
    });
  }, [controlsClockwise, controlsCounterClockwise, controlsCounterClockwise2]);

  const width = size + 100;
  const viewBoxWidth = 323;
  const viewBoxHeight = 361;

  return (
    <motion.svg
      width={width}
      height={size}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Filtro de blur para o círculo principal */}
        <filter
          id={ids.filter0}
          x="0.535263"
          y="0.527451"
          width="359.616"
          height="359.616"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="39.7324"
            result="effect1_foregroundBlur"
          />
        </filter>

        {/* Filtro de blur para círculos secundários */}
        <filter
          id={ids.filter1}
          x="101.697"
          y="28.2676"
          width="226.308"
          height="226.308"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="19.8662"
            result="effect1_foregroundBlur"
          />
        </filter>

        {/* Gradiente primário */}
        <linearGradient
          id={ids.gradient0}
          x1="180.343"
          y1="79.9922"
          x2="180.343"
          y2="280.678"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={primaryColors[0]} />
          <stop offset="1" stopColor={primaryColors[1]} stopOpacity="0.17" />
        </linearGradient>

        {/* Gradiente secundário */}
        <linearGradient
          id={ids.gradient1}
          x1="214.851"
          y1="68"
          x2="214.851"
          y2="214.844"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={secondaryColors[0]} />
          <stop offset="1" stopColor={secondaryColors[1]} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Círculo principal - maior e mais lento */}
      <motion.g
        filter={`url(#${ids.filter0})`}
        animate={controlsClockwise}
        style={{ transformOrigin: "180px 180px" }}
      >
        <circle
          cx="180.343"
          cy="180.335"
          r="100.343"
          fill={`url(#${ids.gradient0})`}
        />
      </motion.g>

      {/* Círculo secundário - rotação anti-horário */}
      <motion.g
        filter={`url(#${ids.filter1})`}
        animate={controlsCounterClockwise}
        style={{ transformOrigin: "214px 141px" }}
      >
        <circle
          cx="214.851"
          cy="141.422"
          r="73.4218"
          fill={`url(#${ids.gradient1})`}
        />
      </motion.g>

      {/* Círculo terciário - movimento complexo */}
      <motion.g
        filter={`url(#${ids.filter1})`}
        animate={controlsCounterClockwise2}
        style={{ transformOrigin: "214px 141px" }}
      >
        <circle
          cx="214.851"
          cy="141.422"
          r="73.4218"
          fill={`url(#${ids.gradient1})`}
        />
      </motion.g>
    </motion.svg>
  );
};

export default LinearGradient;
