'use client';

import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';
import { useState, useMemo } from 'react';
import type React from 'react';

interface CarouselProps {
  children?: React.ReactNode;
  label?: string;
  required?: boolean;
}

export default function CarouselViewport({
  children,
  label = '',
  required = false,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Crear un array limpio solo con elementos válidos (no null/undefined)
  const validItems = useMemo(() => {
    if (!children) return [];

    const childrenArray = Array.isArray(children) ? children : [children];
    return childrenArray.filter(
      child => child !== null && child !== undefined && child !== false,
    );
  }, [children]);

  const totalItems = validItems.length;
  const itemWidth = 196; // 176 + 20px de margin (10px cada lado)
  const viewportWidth = 600; // Ancho del contenedor visible
  const itemsVisible = Math.floor(viewportWidth / itemWidth); // Cuántas imágenes se ven simultáneamente

  // Calcular el índice máximo al que podemos navegar
  const maxIndex = Math.max(0, totalItems - itemsVisible);

  const handleNext = () => {
    if (isAnimating || currentIndex >= maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setCurrentIndex(currentIndex - 1);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Si no hay items válidos, no renderizar el carousel
  if (totalItems === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        No hay imágenes disponibles
      </div>
    );
  }

  // Si hay menos imágenes que las que caben en el viewport, no mostrar flechas
  const showNavigation = totalItems > itemsVisible;

  // Calcular la posición de translateX
  const translateX = -(currentIndex * itemWidth);

  return (
    <div>
      {label && (
        <h3
          style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}
        >
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </h3>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Flecha izquierda - solo visible si podemos ir hacia atrás */}
        {showNavigation && currentIndex > 0 && (
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isAnimating ? 0.5 : 1,
            }}
          >
            <IconArrowNarrowLeft size={24} />
          </button>
        )}

        {/* Espacio para mantener el layout cuando la flecha no está visible */}
        {(!showNavigation || currentIndex === 0) && (
          <div style={{ width: '40px', height: '40px' }} />
        )}

        <div
          style={{
            width: `${viewportWidth}px`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {validItems.map((item, index) => (
              <div
                key={`item-${index}`}
                style={{
                  width: '176px',
                  margin: '0 10px',
                  flexShrink: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Flecha derecha - solo visible si hay más contenido que mostrar hacia la derecha */}
        {showNavigation && currentIndex < maxIndex && (
          <button
            onClick={handleNext}
            disabled={isAnimating}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isAnimating ? 0.5 : 1,
            }}
          >
            <IconArrowNarrowRight size={24} />
          </button>
        )}

        {/* Espacio para mantener el layout cuando la flecha no está visible */}
        {(!showNavigation || currentIndex >= maxIndex) && (
          <div style={{ width: '40px', height: '40px' }} />
        )}
      </div>

      {/* Indicador de posición - solo si hay navegación */}
      {showNavigation && (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>
            Mostrando {Math.min(itemsVisible, totalItems - currentIndex)} de{' '}
            {totalItems} imágenes
          </span>
        </div>
      )}
    </div>
  );
}
