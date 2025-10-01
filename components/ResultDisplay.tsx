import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { GeneratedContent } from '../types';
import { useTranslation } from '../i18n/context';
import { downloadImage } from '../utils/fileUtils';

interface ResultDisplayProps {
  content: GeneratedContent;
  onUseImageAsInput: (imageUrl: string) => void;
  onImageClick: (imageUrl: string) => void;
  originalImageUrl: string | null;
  onRegenerate: () => void;
  isGenerating: boolean;
}

type ViewMode = 'result' | 'side-by-side' | 'slider';
type TwoStepViewMode = 'result' | 'grid' | 'slider';
type ImageSelection = 'Original' | 'Line Art' | 'Final Result';

const ResultDisplay: React.FC<ResultDisplayProps> = ({ content, onUseImageAsInput, onImageClick, originalImageUrl, onRegenerate, isGenerating }) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<ViewMode>('slider');
  const [twoStepViewMode, setTwoStepViewMode] = useState<TwoStepViewMode>('slider');
  
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const [sliderLeft, setSliderLeft] = useState<ImageSelection>('Original');
  const [sliderRight, setSliderRight] = useState<ImageSelection>('Final Result');

  useEffect(() => {
    // When new content is generated, default to slider view if possible.
    if (content.imageUrl && originalImageUrl) {
      if (content.secondaryImageUrl) {
        setTwoStepViewMode('slider');
      } else {
        setViewMode('slider');
      }
    } else {
      // Fallback to result view if not a comparable image result
      if (content.secondaryImageUrl) {
        setTwoStepViewMode('result');
      } else {
        setViewMode('result');
      }
    }
  }, [content, originalImageUrl]);
  
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
        if (entries[0]) {
            setContainerWidth(entries[0].contentRect.width);
        }
    });
    const currentRef = sliderContainerRef.current;
    if (currentRef) {
        observer.observe(currentRef);
    }
    return () => {
        if (currentRef) {
            observer.unobserve(currentRef);
        }
    };
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging || !sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, [isDragging]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
        e.preventDefault(); // prevent scrolling on mobile
    }
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault(); // prevent scrolling while dragging
        handleDragMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
      window.addEventListener('touchcancel', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('touchcancel', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);


  const handleDownload = () => {
    if (!content.imageUrl) return;
    const fileExtension = content.imageUrl.split(';')[0].split('/')[1] || 'png';
    downloadImage(content.imageUrl, `generated-image-${Date.now()}.${fileExtension}`);
  };

  const handleDownloadBoth = () => {
    if (content.secondaryImageUrl) {
        downloadImage(content.secondaryImageUrl, `line-art-${Date.now()}.png`);
    }
    if (content.imageUrl) {
        downloadImage(content.imageUrl, `final-result-${Date.now()}.png`);
    }
  };
  
  const handleDownloadComparison = useCallback(async () => {
    const imagesToLoad: {url: string | null, img: HTMLImageElement}[] = [
        { url: originalImageUrl, img: new Image() },
    ];
    if (content.secondaryImageUrl && content.imageUrl) {
        imagesToLoad.push({ url: content.secondaryImageUrl, img: new Image() });
        imagesToLoad.push({ url: content.imageUrl, img: new Image() });
    } else if (content.imageUrl) {
        imagesToLoad.push({ url: content.imageUrl, img: new Image() });
    }

    const validImages = imagesToLoad.filter(item => item.url);
    if (validImages.length < 2) return;

    const loadPromises = validImages.map(item => {
        item.img.crossOrigin = 'anonymous';
        item.img.src = item.url!;
        return new Promise(resolve => item.img.onload = resolve);
    });

    await Promise.all(loadPromises);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const totalWidth = validImages.reduce((sum, item) => sum + item.img.width, 0);
    const maxHeight = Math.max(...validImages.map(item => item.img.height));

    canvas.width = totalWidth;
    canvas.height = maxHeight;
    
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim();
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let currentX = 0;
    for (const item of validImages) {
        ctx.drawImage(item.img, currentX, (maxHeight - item.img.height) / 2);
        currentX += item.img.width;
    }

    downloadImage(canvas.toDataURL('image/png'), `comparison-image-${Date.now()}.png`);

  }, [originalImageUrl, content.imageUrl, content.secondaryImageUrl]);

  const ActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; isPrimary?: boolean; className?: string; disabled?: boolean; }> = ({ onClick, children, isPrimary, className, disabled }) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={`flex-1 py-2 px-4 font-semibold rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            isPrimary 
            ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-on-accent)] shadow-[var(--accent-shadow)] hover:from-[var(--accent-primary-hover)] hover:to-[var(--accent-secondary-hover)]' 
            : 'bg-[rgba(107,114,128,0.2)] hover:bg-[rgba(107,114,128,0.4)] text-[var(--text-primary)]'
        } ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
        {children}
    </button>
  );
  
  const ViewSwitcherButton: React.FC<{ mode: TwoStepViewMode | ViewMode; currentMode: TwoStepViewMode | ViewMode; onClick: () => void; children: React.ReactNode }> = ({ mode, currentMode, onClick, children }) => (
      <button
        onClick={onClick}
        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors duration-200 ${
        currentMode === mode
            ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-on-accent)]'
            : 'text-[var(--text-primary)] hover:bg-[rgba(107,114,128,0.2)]'
        }`}
      >
        {children}
      </button>
  );

  // Special view for two-step results
  if (content.secondaryImageUrl && content.imageUrl && originalImageUrl) {
    const imageMap: Record<ImageSelection, string> = { 'Original': originalImageUrl, 'Line Art': content.secondaryImageUrl, 'Final Result': content.imageUrl };
    const imageOptions: ImageSelection[] = ['Original', 'Line Art', 'Final Result'];
    const leftImageSrc = imageMap[sliderLeft];
    const rightImageSrc = imageMap[sliderRight];
    
    const twoStepViewModes: TwoStepViewMode[] = ['result', 'grid', 'slider'];

    return (
       <div className="w-full h-full flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-full flex justify-center">
            <div className="p-1 bg-[var(--bg-secondary)] rounded-lg flex items-center gap-1">
                {twoStepViewModes.map(mode => (
                    <ViewSwitcherButton key={mode} mode={mode} currentMode={twoStepViewMode} onClick={() => setTwoStepViewMode(mode)}>
                        {t(`resultDisplay.viewModes.${mode}`)}
                    </ViewSwitcherButton>
                ))}
            </div>
        </div>
        
        {twoStepViewMode === 'result' && (
            <div className="w-full h-full flex flex-col items-center gap-4 flex-grow">
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2 flex-grow">
                {[
                    { src: content.secondaryImageUrl, label: t('resultDisplay.labels.lineArt') },
                    { src: content.imageUrl, label: t('resultDisplay.labels.finalResult') },
                ].map(({ src, label }) => (
                    <div key={label} className="relative rounded-lg overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-primary)] flex items-center justify-center flex-col p-1 aspect-square md:aspect-auto">
                    <img src={src!} alt={label} className="max-w-full max-h-full object-contain cursor-pointer" onClick={() => onImageClick(src!)} />
                    <div className="absolute bottom-1 right-1 text-xs bg-black/50 text-white px-2 py-1 rounded">{label}</div>
                    </div>
                ))}
                </div>
            </div>
        )}
        {twoStepViewMode === 'grid' && (
             <div className="w-full h-full flex flex-col items-center gap-4 flex-grow">
                <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-2 flex-grow">
                {[
                    { src: originalImageUrl, label: t('resultDisplay.labels.original') },
                    { src: content.secondaryImageUrl, label: t('resultDisplay.labels.lineArt') },
                    { src: content.imageUrl, label: t('resultDisplay.labels.finalResult') },
                ].map(({ src, label }) => (
                    <div key={label} className="relative rounded-lg overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-primary)] flex items-center justify-center flex-col p-1 aspect-square">
                    <img src={src!} alt={label} className="max-w-full max-h-full object-contain cursor-pointer" onClick={() => onImageClick(src!)} />
                    <div className="absolute bottom-1 right-1 text-xs bg-black/50 text-white px-2 py-1 rounded">{label}</div>
                    </div>
                ))}
                </div>
            </div>
        )}
        {twoStepViewMode === 'slider' && (
          <div className="w-full flex-grow flex flex-col gap-2 items-center">
            <div className="flex items-center gap-2 text-sm">
                <select value={sliderLeft} onChange={e => setSliderLeft(e.target.value as ImageSelection)} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-md p-1">
                    {imageOptions.map(opt => <option key={`left-${opt}`} value={opt}>{t(`resultDisplay.labels.${opt.toLowerCase().replace(/\s/g, '')}`)}</option>)}
                </select>
                <span>{t('resultDisplay.sliderPicker.vs')}</span>
                <select value={sliderRight} onChange={e => setSliderRight(e.target.value as ImageSelection)} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-md p-1">
                    {imageOptions.map(opt => <option key={`right-${opt}`} value={opt}>{t(`resultDisplay.labels.${opt.toLowerCase().replace(/\s/g, '')}`)}</option>)}
                </select>
            </div>
            <div
                ref={sliderContainerRef}
                style={{ touchAction: 'none' }}
                className="relative w-full aspect-square rounded-lg overflow-hidden cursor-ew-resize select-none bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-inner"
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
            >
                {/* Right image (background) */}
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <img src={rightImageSrc} alt={sliderRight} className="max-w-full max-h-full object-contain" />
                </div>

                {/* Left image (foreground, clipped by width) */}
                <div
                    className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
                    style={{ width: `${sliderPosition}%` }}
                >
                    <div
                        className="h-full flex items-center justify-center"
                        style={{ width: `${containerWidth}px` }}
                    >
                        <img src={leftImageSrc} alt={sliderLeft} className="max-w-full max-h-full object-contain" />
                    </div>
                </div>
                
                {/* Slider handle */}
                <div className="absolute top-0 h-full w-1 bg-white/50 backdrop-blur-sm cursor-ew-resize pointer-events-none z-30" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}>
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white/50 border-2 border-white flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                    </div>
                </div>
            </div>
          </div>
        )}
        
        <div className="w-full flex flex-col md:flex-row gap-3 mt-auto">
             <ActionButton onClick={onRegenerate} className="md:hidden" disabled={isGenerating}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 10a8 8 0 0114.95-2.95l-2.45 1.76" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 14a8 8 0 01-14.95 2.95l2.45-1.76" />
                </svg>
                <span>{t('app.regenerate')}</span>
            </ActionButton>
            <ActionButton onClick={handleDownloadBoth}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M6 12a2 2 0 100-4 2 2 0 000 4z" /><path d="M14 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M2 6a1 1 0 011-1h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6zm14 0H4v8h12V6z" clipRule="evenodd" /></svg>
                <span>{t('resultDisplay.actions.downloadBoth')}</span>
            </ActionButton>
            <ActionButton onClick={() => onUseImageAsInput(content.imageUrl!)} isPrimary>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2-2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                <span>{t('resultDisplay.actions.useFinalAsInput')}</span>
            </ActionButton>
        </div>
      </div>
    );
  }

  // Regular one-step result with comparison
  if (content.imageUrl && originalImageUrl) {
    const viewModes: ViewMode[] = ['result', 'side-by-side', 'slider'];
    
    return (
       <div className="w-full h-full flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-full flex justify-center">
            <div className="p-1 bg-[var(--bg-secondary)] rounded-lg flex items-center gap-1">
                {viewModes.map(mode => (
                    <ViewSwitcherButton key={mode} mode={mode} currentMode={viewMode} onClick={() => setViewMode(mode)}>
                        {t(`resultDisplay.viewModes.${mode.replace(/-/g, '')}`)}
                    </ViewSwitcherButton>
                ))}
            </div>
        </div>
        
        {viewMode === 'result' && (
             <div className="w-full flex-grow relative bg-[var(--bg-primary)] rounded-lg overflow-hidden shadow-inner border border-[var(--border-primary)] flex items-center justify-center">
                <img src={content.imageUrl} alt={t('resultDisplay.labels.generated')} className="max-w-full max-h-full object-contain cursor-pointer" onClick={() => onImageClick(content.imageUrl!)} />
             </div>
        )}
        {viewMode === 'side-by-side' && (
            <div className="w-full grid grid-cols-2 gap-2 flex-grow">
                {[
                    { src: originalImageUrl, label: t('resultDisplay.labels.original') },
                    { src: content.imageUrl, label: t('resultDisplay.labels.generated') },
                ].map(({ src, label }) => (
                    <div key={label} className="relative rounded-lg overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-primary)] flex items-center justify-center flex-col p-1">
                        <img src={src} alt={label} className="max-w-full max-h-full object-contain cursor-pointer" onClick={() => onImageClick(src!)} />
                        <div className="absolute bottom-1 right-1 text-xs bg-black/50 text-white px-2 py-1 rounded">{label}</div>
                    </div>
                ))}
            </div>
        )}
        {viewMode === 'slider' && (
            <div
                ref={sliderContainerRef}
                style={{ touchAction: 'none' }}
                className="relative w-full aspect-square rounded-lg overflow-hidden cursor-ew-resize select-none bg-[var(--bg-primary)] border border-[var(--border-primary)] shadow-inner"
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
            >
                {/* Generated image (background) */}
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <img src={content.imageUrl} alt={t('resultDisplay.labels.generated')} className="max-w-full max-h-full object-contain" />
                </div>
                
                {/* Original image (foreground, clipped by width) */}
                <div
                    className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
                    style={{ width: `${sliderPosition}%` }}
                >
                    <div
                        className="h-full flex items-center justify-center"
                        style={{ width: `${containerWidth}px` }}
                    >
                        <img src={originalImageUrl!} alt={t('resultDisplay.labels.original')} className="max-w-full max-h-full object-contain" />
                    </div>
                </div>

                {/* Slider handle */}
                <div className="absolute top-0 h-full w-1 bg-white/50 backdrop-blur-sm cursor-ew-resize pointer-events-none z-30" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}>
                    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white/50 border-2 border-white flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
                    </div>
                </div>
            </div>
        )}
        
        <div className="w-full flex flex-col md:flex-row gap-3 mt-auto">
             <ActionButton onClick={onRegenerate} className="md:hidden" disabled={isGenerating}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 10a8 8 0 0114.95-2.95l-2.45 1.76" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 14a8 8 0 01-14.95 2.95l2.45-1.76" />
                </svg>
                <span>{t('app.regenerate')}</span>
            </ActionButton>
            <ActionButton onClick={handleDownload}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                <span>{t('resultDisplay.actions.download')}</span>
            </ActionButton>
            <ActionButton onClick={() => onUseImageAsInput(content.imageUrl!)} isPrimary>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2-2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                <span>{t('resultDisplay.actions.useAsInput')}</span>
            </ActionButton>
        </div>
       </div>
    );
  }
  
  // Fallback for single image result without original for comparison
  if (content.imageUrl) {
     return (
        <div className="w-full h-full flex flex-col items-center gap-4 animate-fade-in">
             <div className="w-full flex-grow relative bg-[var(--bg-primary)] rounded-lg overflow-hidden shadow-inner border border-[var(--border-primary)] flex items-center justify-center">
                <img src={content.imageUrl} alt={t('resultDisplay.labels.generated')} className="max-w-full max-h-full object-contain cursor-pointer" onClick={() => onImageClick(content.imageUrl!)} />
             </div>
             <div className="w-full flex flex-col md:flex-row gap-3 mt-auto">
                 <ActionButton onClick={onRegenerate} className="md:hidden" disabled={isGenerating}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 10a8 8 0 0114.95-2.95l-2.45 1.76" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 14a8 8 0 01-14.95 2.95l2.45-1.76" />
                    </svg>
                    <span>{t('app.regenerate')}</span>
                </ActionButton>
                <ActionButton onClick={handleDownload}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    <span>{t('resultDisplay.actions.download')}</span>
                </ActionButton>
                <ActionButton onClick={() => onUseImageAsInput(content.imageUrl!)} isPrimary>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2-2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                    <span>{t('resultDisplay.actions.useAsInput')}</span>
                </ActionButton>
            </div>
        </div>
     );
  }
  
  return null;
};

export default ResultDisplay;