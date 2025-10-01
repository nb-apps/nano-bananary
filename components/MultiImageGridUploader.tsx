import React, { useCallback, useState } from 'react';
import { useTranslation } from '../i18n/context';

interface MultiImageGridUploaderProps {
    imageUrls: string[];
    onImagesChange: (dataUrls: string[]) => void;
    maxImages: number;
}

const MultiImageGridUploader: React.FC<MultiImageGridUploaderProps> = ({ imageUrls, onImagesChange, maxImages }) => {
    const { t } = useTranslation();
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = useCallback((files: FileList) => {
        const newUrls: string[] = [];
        const filesToProcess = Array.from(files).slice(0, maxImages - imageUrls.length);

        if (filesToProcess.length === 0) return;

        let processedCount = 0;
        filesToProcess.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                newUrls.push(e.target?.result as string);
                processedCount++;
                if (processedCount === filesToProcess.length) {
                    const allUrls = [...imageUrls, ...newUrls];
                    onImagesChange(allUrls);
                }
            };
            reader.readAsDataURL(file);
        });
    }, [imageUrls, maxImages, onImagesChange]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) handleFiles(event.target.files);
    };
    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); event.stopPropagation(); setIsDragging(false);
        if (event.dataTransfer.files) handleFiles(event.dataTransfer.files);
    }, [handleFiles]);
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };

    const removeImage = (indexToRemove: number) => {
        const newUrls = imageUrls.filter((_, index) => index !== indexToRemove);
        onImagesChange(newUrls);
    };
    
    const inputId = `multi-image-upload`;

    return (
        <div className="grid grid-cols-2 gap-4">
            {imageUrls.map((url, index) => (
                <div key={index} className="relative w-full aspect-square bg-[var(--bg-secondary)] rounded-lg overflow-hidden group">
                    <img src={url} alt={`Uploaded image ${index + 1}`} className="w-full h-full object-contain" />
                    <button 
                        onClick={() => removeImage(index)} 
                        className="absolute top-2 right-2 z-10 p-1 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100" 
                        aria-label={`Remove image ${index + 1}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                </div>
            ))}

            {imageUrls.length < maxImages && (
                 <div
                    onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
                    className={`relative w-full aspect-square bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center transition-colors duration-200 border-2 border-dashed border-[var(--border-primary)] ${
                    isDragging ? 'outline-dashed outline-2 outline-offset-2 outline-[var(--accent-primary)] bg-[rgba(249,115,22,0.1)]' : ''
                    }`}
                >
                    <label htmlFor={inputId} className="flex flex-col items-center justify-center text-[var(--text-tertiary)] cursor-pointer w-full h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                        <p className="text-sm font-semibold">{t('imageEditor.upload')}</p>
                        <p className="text-xs text-center px-2">{`(${imageUrls.length}/${maxImages}) ${t('imageEditor.dragAndDrop')}`}</p>
                        <input id={inputId} type="file" className="hidden" onChange={handleFileChange} accept="image/*" multiple />
                    </label>
                </div>
            )}
        </div>
    );
};

export default MultiImageGridUploader;