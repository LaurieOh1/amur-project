import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const isImageLike = (val) =>
  typeof val === 'string' && /\.(png|jpe?g|gif|webp|svg)$/i.test(val);

const GridMotion = ({ items = [], gradientColor = 'white' }) => {
  const gridRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseXRef = useRef(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);
  const combinedItems = (items?.length ? items : defaultItems).slice(0, totalItems);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e) => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount =
          ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) *
          direction;

        gsap.to(row, {
          x: moveAmount,
          duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      removeAnimationLoop();
    };
  }, []);

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="w-full h-screen overflow-hidden relative flex items-center justify-center"
        style={{ background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)` }}
      >
        <div className="absolute inset-0 pointer-events-none z-[4]" />

        <div className="gap-4 flex-none relative w-[180vw] h-[180vh] grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-center z-[2]">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4 grid-cols-7"
              style={{ willChange: 'transform, filter' }}
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {[...Array(7)].map((_, itemIndex) => {
                const idx = rowIndex * 7 + itemIndex;
                const content = combinedItems[idx];

                // 1) JSX passed in -> render as-is
                if (content && typeof content === 'object' && 'type' in content) {
                  return (
                    <div key={`jsx-${rowIndex}-${itemIndex}`} className="relative">
                      <div className="relative w-full h-full overflow-hidden rounded-[10px] bg-[#111] flex items-center justify-center text-white text-[1.5rem]">
                        <div className="p-4 text-center z-[1]">{content}</div>
                      </div>
                    </div>
                  );
                }

                // 2) Image-like string (imported url or public path)
                if (isImageLike(content)) {
                  return (
                    <div key={`img-${rowIndex}-${itemIndex}`} className="relative">
                      <div className="relative w-full h-full overflow-hidden rounded-[10px] bg-[#111]">
                        <img
                          src={content}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                }

                // 3) Fallback to text
                return (
                  <div key={`txt-${rowIndex}-${itemIndex}`} className="relative">
                    <div className="relative w-full h-full overflow-hidden rounded-[10px] bg-[#111] flex items-center justify-center text-white text-[1.5rem] p-4">
                      {String(content ?? '')}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        
        <div className="absolute inset-0 z-[6] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-[7] text-center px-6">
            <h2 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight">
              Explore Our Members’ Gallery
            </h2>
            <p className="text-white/90 mt-3 md:mt-4 text-base md:text-lg max-w-2xl mx-auto">
              Discover real routines, results, and stories from our community.
            </p>
            <a
              href="/gallery"
              className="inline-block mt-6 md:mt-8 px-6 py-3 md:px-8 md:py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              View Gallery
            </a>
          </div>
        </div>

        <div className="relative w-full h-full top-0 left-0 pointer-events-none" />
      </section>
    </div>
  );
};

export default GridMotion;
