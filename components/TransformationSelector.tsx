import React, { useRef, useState } from 'react';
import type { Transformation } from '../types';
import { useTranslation } from '../i18n/context';

interface TransformationSelectorProps {
  transformations: Transformation[];
  onSelect: (transformation: Transformation) => void;
  hasPreviousResult: boolean;
  onOrderChange: (newOrder: Transformation[]) => void;
  activeCategory: Transformation | null;
  setActiveCategory: (category: Transformation | null) => void;
}

const TransformationSelector: React.FC<TransformationSelectorProps> = ({ 
  transformations, 
  onSelect, 
  hasPreviousResult, 
  onOrderChange, 
  activeCategory, 
  setActiveCategory 
}) => {
  const { t } = useTranslation();
  const dragItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragItemIndex.current = index;
    setDragging(true);
    const target = e.currentTarget;
    setTimeout(() => {
      target.classList.add('opacity-40', 'scale-95');
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragOverItemIndex.current = index;
  };

  const handleDragEnd = (e: React.DragEvent<HTMLButtonElement>) => {
    setDragging(false);
    e.currentTarget.classList.remove('opacity-40', 'scale-95');

    if (dragItemIndex.current !== null && dragOverItemIndex.current !== null && dragItemIndex.current !== dragOverItemIndex.current) {
      const newTransformations = [...transformations];
      const draggedItemContent = newTransformations.splice(dragItemIndex.current, 1)[0];
      newTransformations.splice(dragOverItemIndex.current, 0, draggedItemContent);
      onOrderChange(newTransformations);
    }
    
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
  };
  
  const handleItemClick = (item: Transformation) => {
    if (item.items && item.items.length > 0) {
      setActiveCategory(item);
    } else {
      onSelect(item);
    }
  };

  const renderGrid = (items: Transformation[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
      {items.map((trans, index) => (
        <button
          key={trans.key}
          draggable={!activeCategory} // Only allow dragging categories
          onDragStart={(e) => !activeCategory && handleDragStart(e, index)}
          onDragEnter={(e) => !activeCategory && handleDragEnter(e, index)}
          onDragEnd={!activeCategory && handleDragEnd}
          onDragOver={!activeCategory && handleDragOver}
          onClick={() => handleItemClick(trans)}
          className={`group flex flex-col items-center justify-center text-center p-4 aspect-square bg-[var(--bg-card)] rounded-xl border border-[var(--border-primary)] hover:border-[var(--accent-primary)] transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] focus:ring-[var(--accent-primary)] ${
            !activeCategory ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
          } ${dragging && !activeCategory ? 'border-dashed' : ''}`}
        >
          <span className="text-4xl mb-2 transition-transform duration-200 group-hover:scale-110">{trans.emoji}</span>
          <span className="font-semibold text-sm text-[var(--text-primary)]">{t(trans.titleKey)}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      {!activeCategory ? (
        <>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-[var(--accent-primary)]">{t('transformationSelector.title')}</h2>
          <p className="text-base sm:text-lg text-center text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            {hasPreviousResult 
              ? t('transformationSelector.descriptionWithResult')
              : t('transformationSelector.description')
            }
          </p>
          {renderGrid(transformations)}
        </>
      ) : (
        <div>
          <div className="mb-8 flex items-center gap-4">
            <button
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-2 text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-[rgba(107,114,128,0.1)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t('app.back')}
            </button>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center gap-3">
              <span className="text-4xl">{activeCategory.emoji}</span>
              {t(activeCategory.titleKey)}
            </h2>
          </div>
          {renderGrid(activeCategory.items || [])}
        </div>
      )}
    </div>
  );
};

export default TransformationSelector;
