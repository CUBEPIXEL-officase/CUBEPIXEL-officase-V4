import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, ZoomIn, X } from 'lucide-react';

interface SpecialNoticeSubpageProps {
  onClose: () => void;
}

const NOTICE_IMAGES = [
  {
    id: 'notice-1',
    title: '特別公告 (一)',
    page: '1 / 2',
    driveId: '1tQu22VKpHVpshSjC7Uj7QNuaS6Wjv81h',
    primaryUrl: 'https://lh3.googleusercontent.com/d/1tQu22VKpHVpshSjC7Uj7QNuaS6Wjv81h',
    fallbackUrl: 'https://drive.google.com/thumbnail?id=1tQu22VKpHVpshSjC7Uj7QNuaS6Wjv81h&sz=w1500',
    directDriveLink: 'https://drive.google.com/file/d/1tQu22VKpHVpshSjC7Uj7QNuaS6Wjv81h/view?usp=sharing'
  },
  {
    id: 'notice-2',
    title: '特別公告 (二)',
    page: '2 / 2',
    driveId: '1U9Dv7dMwjO0zbzkagDjcluffqyNI0zjZ',
    primaryUrl: 'https://lh3.googleusercontent.com/d/1U9Dv7dMwjO0zbzkagDjcluffqyNI0zjZ',
    fallbackUrl: 'https://drive.google.com/thumbnail?id=1U9Dv7dMwjO0zbzkagDjcluffqyNI0zjZ&sz=w1500',
    directDriveLink: 'https://drive.google.com/file/d/1U9Dv7dMwjO0zbzkagDjcluffqyNI0zjZ/view?usp=sharing'
  }
];

export const SpecialNoticeSubpage: React.FC<SpecialNoticeSubpageProps> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToPage = (index: number) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: containerWidth * index,
        behavior: 'smooth'
      });
      setCurrentPage(index);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== currentPage && index >= 0 && index < NOTICE_IMAGES.length) {
        setCurrentPage(index);
      }
    }
  };

  return (
    <motion.div
      key="special_notice_subpage"
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 150 }}
      transition={{ type: "spring", damping: 25, stiffness: 180 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-between p-3 sm:p-4 bg-[#05070c]/98 backdrop-blur-xl w-full h-full text-white"
    >
      {/* Top Back/Close bar */}
      <div className="w-full flex justify-between items-center text-[9px] tracking-widest text-white/50 uppercase pt-2 pb-2 z-40 font-mono border-b border-white/20">
        <button 
          onClick={onClose}
          className="flex items-center gap-1 text-white hover:text-gray-300 font-bold tracking-widest cursor-pointer active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>返回</span>
        </button>
        <div className="flex items-center gap-1.5 text-white font-bold">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>SPECIAL ANNOUNCEMENT // 特別公告</span>
        </div>
      </div>

      {/* Scrollable Main Content Container */}
      <div className="flex-1 w-full overflow-y-auto py-2 px-1 my-auto flex flex-col items-center justify-start gap-2.5 custom-scrollbar">
        <div className="w-full max-w-lg text-center space-y-2.5">
          
          {/* Header Title Badge */}
          <div className="flex flex-col items-center gap-1">
            <div className="inline-flex items-center gap-2 py-0.5 px-3 bg-black/90 border border-white/40 rounded-full text-white text-[10px] font-mono font-black tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <span className="text-white">📢</span>
              <span>常態發布 OFFICIAL NOTICE</span>
            </div>
            
            <h3 className="text-base sm:text-lg font-black text-white tracking-wider font-rounded drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
              特別公告（常態發布）
            </h3>
          </div>

          {/* Large Carousel Slider Container (左右滑動 / 捲動翻頁) */}
          <div className="relative w-full flex flex-col items-center">
            
            {/* Scrollable Snap Container */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {NOTICE_IMAGES.map((item, index) => (
                <div 
                  key={item.id}
                  className="w-full shrink-0 snap-center flex flex-col items-center justify-center p-1 cursor-pointer group"
                  onClick={() => setSelectedImage(item.primaryUrl)}
                >
                  <div className="relative w-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.primaryUrl}
                      alt={item.title}
                      className="w-full h-auto max-h-[58vh] sm:max-h-[64vh] object-contain rounded-none transition-transform duration-300 group-hover:scale-[1.01]"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (!target.src.includes('thumbnail')) {
                          target.src = item.fallbackUrl;
                        }
                      }}
                    />
                    
                    {/* Hover Click to Zoom Hint */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs font-mono font-bold">
                      <ZoomIn className="w-4 h-4" />
                      <span>點擊放大檢視</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Left / Right Quick Turn Controls */}
            {currentPage > 0 && (
              <button
                onClick={() => scrollToPage(currentPage - 1)}
                className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black border border-white/30 text-white transition-all shadow-lg active:scale-90 z-20 cursor-pointer"
                title="上一頁"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {currentPage < NOTICE_IMAGES.length - 1 && (
              <button
                onClick={() => scrollToPage(currentPage + 1)}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black border border-white/30 text-white transition-all shadow-lg active:scale-90 z-20 cursor-pointer"
                title="下一頁"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Pagination Indicators & Swipe Hint */}
          <div className="flex flex-col items-center justify-center gap-1.5 pt-1">
            <div className="flex items-center gap-2">
              {NOTICE_IMAGES.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  onClick={() => scrollToPage(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentPage === idx 
                      ? 'w-6 h-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                  title={`切換至第 ${idx + 1} 頁`}
                />
              ))}
            </div>
            
            <div className="text-[10px] text-white/70 font-mono flex items-center gap-1.5">
              <span>第 {currentPage + 1} / {NOTICE_IMAGES.length} 頁</span>
              <span>•</span>
              <span>左右滑動翻頁或點擊放大</span>
            </div>
          </div>

          {/* Extra Info Notice */}
          <div className="p-2.5 bg-white/[0.04] border border-white/20 rounded-xl text-center space-y-0.5">
            <div className="text-[10px] text-white/90 font-mono font-bold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>本區塊為常態發布公告，隨時可於首頁右下角快速查閱</span>
            </div>
            <p className="text-[9px] text-white/50 font-mono">
              如有任何問題或配合事項，歡迎隨時洽詢居酒屋官方人員
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Button to exit */}
      <div className="w-full flex flex-col gap-2 max-w-sm px-4 mt-1 z-40">
        <button 
          onClick={onClose}
          className="w-full py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all duration-200 cursor-pointer border border-white/20"
        >
          關閉公告
        </button>
      </div>

      {/* Lightbox Modal for Zoomed Image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-5"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Close Button */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer active:scale-95 transition-transform"
                title="關閉放大"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Preview Image */}
            <div 
              className="relative max-w-full max-h-[85vh] overflow-auto flex items-center justify-center p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage}
                alt="特別公告 放大檢視"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-[10px] text-white/60 font-mono pt-3">
              點擊任意處或右上角關閉
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
