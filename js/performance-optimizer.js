/**
 * GYEONGGI PROVINCIAL COUNCIL
 * PERFORMANCE OPTIMIZATION SYSTEM
 * 60fps 애니메이션 및 터치 반응 최적화
 */

class PerformanceOptimizer {
    constructor() {
        this.rafCallbacks = new Map();
        this.observers = new Map();
        this.lazyElements = new Set();
        this.touchElements = new WeakMap();
        
        this.init();
    }
    
    init() {
        this.setupRAFManager();
        this.setupIntersectionObserver();
        this.setupResizeObserver();
        this.setupTouchOptimizations();
        this.setupCSSOptimizations();
        this.setupMemoryManagement();
        this.monitorPerformance();
    }
    
    /**
     * RequestAnimationFrame 관리자
     * 60fps 보장을 위한 프레임 관리
     */
    setupRAFManager() {
        this.frameId = null;
        this.frameCallbacks = [];
        this.lastFrameTime = 0;
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;
        
        this.rafLoop = (currentTime) => {
            if (currentTime - this.lastFrameTime >= this.frameInterval) {
                this.frameCallbacks.forEach(callback => {
                    try {
                        callback(currentTime);
                    } catch (error) {
                        console.warn('RAF callback error:', error);
                    }
                });
                
                this.lastFrameTime = currentTime;
            }
            
            if (this.frameCallbacks.length > 0) {
                this.frameId = requestAnimationFrame(this.rafLoop);
            }
        };
    }
    
    addRAFCallback(id, callback) {
        this.rafCallbacks.set(id, callback);
        this.frameCallbacks.push(callback);
        
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.rafLoop);
        }
    }
    
    removeRAFCallback(id) {
        const callback = this.rafCallbacks.get(id);
        if (callback) {
            this.rafCallbacks.delete(id);
            const index = this.frameCallbacks.indexOf(callback);
            if (index > -1) {
                this.frameCallbacks.splice(index, 1);
            }
        }
        
        if (this.frameCallbacks.length === 0 && this.frameId) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }
    
    /**
     * Intersection Observer 설정
     * 뷰포트 기반 최적화
     */
    setupIntersectionObserver() {
        // Lazy loading observer
        this.lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadLazyElement(entry.target);
                    this.lazyObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        // Animation observer
        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                if (entry.isIntersecting) {
                    element.classList.add('animate-in');
                    this.startElementAnimations(element);
                } else {
                    element.classList.remove('animate-in');
                    this.pauseElementAnimations(element);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Preload observer for next sections
        this.preloadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.preloadNextSection(entry.target);
                }
            });
        }, {
            rootMargin: '200px 0px'
        });
    }
    
    /**
     * Resize Observer 설정
     * 동적 레이아웃 최적화
     */
    setupResizeObserver() {
        if (window.ResizeObserver) {
            this.resizeObserver = new ResizeObserver((entries) => {
                // 배치로 처리하여 성능 최적화
                requestAnimationFrame(() => {
                    entries.forEach(entry => {
                        this.handleElementResize(entry);
                    });
                });
            });
        }
    }
    
    /**
     * 터치 최적화
     * 터치 반응 속도 개선
     */
    setupTouchOptimizations() {
        // Passive listeners for better scroll performance
        const passiveEvents = ['touchstart', 'touchmove', 'scroll', 'wheel'];
        
        passiveEvents.forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                // 필요한 경우에만 preventDefault 호출
                if (this.shouldPreventDefault(e)) {
                    e.preventDefault();
                }
            }, { passive: false });
        });
        
        // Touch delegation for better performance
        this.setupTouchDelegation();
        
        // Prevent 300ms click delay
        this.eliminateClickDelay();
    }
    
    setupTouchDelegation() {
        let touchStartTime = 0;
        let touchStartTarget = null;
        
        document.addEventListener('touchstart', (e) => {
            touchStartTime = performance.now();
            touchStartTarget = e.target;
            
            const element = e.target.closest('[data-touch-feedback]');
            if (element) {
                this.addTouchFeedback(element);
            }
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            const touchDuration = performance.now() - touchStartTime;
            
            if (touchStartTarget && touchDuration < 500) {
                const element = touchStartTarget.closest('[data-touch-feedback]');
                if (element) {
                    setTimeout(() => this.removeTouchFeedback(element), 150);
                }
            }
        }, { passive: true });
    }
    
    eliminateClickDelay() {
        // FastClick implementation for older browsers
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartTime = 0;
        
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                touchStartTime = performance.now();
            }
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (e.changedTouches.length === 1) {
                const touchEndTime = performance.now();
                const touchDuration = touchEndTime - touchStartTime;
                const touchDistance = Math.sqrt(
                    Math.pow(e.changedTouches[0].clientX - touchStartX, 2) +
                    Math.pow(e.changedTouches[0].clientY - touchStartY, 2)
                );
                
                // Fast tap detection
                if (touchDuration < 200 && touchDistance < 10) {
                    const target = document.elementFromPoint(
                        e.changedTouches[0].clientX,
                        e.changedTouches[0].clientY
                    );
                    
                    if (target && this.isClickable(target)) {
                        e.preventDefault();
                        target.click();
                    }
                }
            }
        });
    }
    
    /**
     * CSS 최적화
     */
    setupCSSOptimizations() {
        // GPU 가속 활성화
        this.enableGPUAcceleration();
        
        // Critical CSS 관리
        this.manageCriticalCSS();
        
        // Unused CSS 제거
        this.removeUnusedCSS();
    }
    
    enableGPUAcceleration() {
        const acceleratedElements = document.querySelectorAll(`
            .card-interactive,
            .btn-base,
            .modal-content-enhanced,
            .page-transition,
            .bottom-nav-item
        `);
        
        acceleratedElements.forEach(element => {
            element.style.transform = 'translateZ(0)';
            element.style.willChange = 'transform, opacity';
        });
    }
    
    manageCriticalCSS() {
        // Above-the-fold 컨텐츠에 대한 CSS 우선 로드
        const criticalElements = document.querySelectorAll(`
            .header,
            .main-navigation,
            .hero-section,
            .dashboard-cards
        `);
        
        criticalElements.forEach(element => {
            element.style.contain = 'layout style paint';
        });
    }
    
    /**
     * 메모리 관리
     */
    setupMemoryManagement() {
        // 메모리 사용량 모니터링
        this.monitorMemoryUsage();
        
        // 자동 가비지 컬렉션
        this.setupAutoCleanup();
        
        // 이벤트 리스너 정리
        this.trackEventListeners();
    }
    
    monitorMemoryUsage() {
        if (performance.memory) {
            setInterval(() => {
                const memory = performance.memory;
                const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
                const limitMB = Math.round(memory.jsHeapSizeLimit / 1048576);
                
                if (usedMB / limitMB > 0.8) {
                    console.warn('High memory usage detected:', usedMB, 'MB');
                    this.triggerMemoryCleanup();
                }
            }, 30000); // 30초마다 체크
        }
    }
    
    setupAutoCleanup() {
        // 5분마다 자동 정리
        setInterval(() => {
            this.cleanupUnusedElements();
            this.cleanupEventListeners();
            this.clearImageCache();
        }, 300000);
    }
    
    /**
     * 성능 모니터링
     */
    monitorPerformance() {
        // FPS 모니터링
        this.monitorFPS();
        
        // 터치 반응시간 모니터링
        this.monitorTouchResponse();
        
        // 페이지 로드 성능 모니터링
        this.monitorPageLoad();
    }
    
    monitorFPS() {
        let frames = 0;
        let lastTime = performance.now();
        
        const countFPS = () => {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                
                if (fps < 50) {
                    console.warn('Low FPS detected:', fps);
                    this.optimizeForLowFPS();
                }
                
                frames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(countFPS);
        };
        
        requestAnimationFrame(countFPS);
    }
    
    monitorTouchResponse() {
        let touchStartTime = 0;
        
        document.addEventListener('touchstart', () => {
            touchStartTime = performance.now();
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            const responseTime = performance.now() - touchStartTime;
            
            if (responseTime > 100) {
                console.warn('Slow touch response:', responseTime, 'ms');
                this.optimizeForSlowTouch();
            }
        }, { passive: true });
    }
    
    /**
     * 최적화 메서드
     */
    optimizeForLowFPS() {
        // 애니메이션 품질 낮추기
        document.documentElement.style.setProperty('--duration-fast', '0.1s');
        document.documentElement.style.setProperty('--duration-normal', '0.15s');
        
        // 복잡한 애니메이션 비활성화
        const complexAnimations = document.querySelectorAll('.complex-animation');
        complexAnimations.forEach(el => el.classList.add('reduced-motion'));
    }
    
    optimizeForSlowTouch() {
        // 터치 피드백 최적화
        document.body.classList.add('optimize-touch');
        
        // 불필요한 터치 이벤트 제거
        this.cleanupTouchListeners();
    }
    
    /**
     * Lazy Loading 관리
     */
    addLazyElement(element) {
        this.lazyElements.add(element);
        this.lazyObserver.observe(element);
    }
    
    loadLazyElement(element) {
        if (element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
        }
        
        if (element.dataset.background) {
            element.style.backgroundImage = `url(${element.dataset.background})`;
            element.removeAttribute('data-background');
        }
        
        element.classList.add('loaded');
        this.lazyElements.delete(element);
    }
    
    /**
     * 유틸리티 메서드
     */
    addTouchFeedback(element) {
        element.classList.add('touch-active');
        this.touchElements.set(element, Date.now());
    }
    
    removeTouchFeedback(element) {
        element.classList.remove('touch-active');
        this.touchElements.delete(element);
    }
    
    shouldPreventDefault(e) {
        // 스크롤 영역에서는 기본 동작 허용
        if (e.target.closest('.scroll-container')) {
            return false;
        }
        
        // 입력 요소에서는 기본 동작 허용
        if (e.target.matches('input, textarea, select')) {
            return false;
        }
        
        return false; // 대부분의 경우 기본 동작 허용
    }
    
    isClickable(element) {
        return element.matches(`
            button,
            .btn,
            .card-interactive,
            .list-item,
            a,
            [onclick],
            [data-click]
        `);
    }
    
    startElementAnimations(element) {
        const animatedChildren = element.querySelectorAll('[data-animate]');
        animatedChildren.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate-in');
            }, index * 100);
        });
    }
    
    pauseElementAnimations(element) {
        const animatedChildren = element.querySelectorAll('[data-animate]');
        animatedChildren.forEach(child => {
            child.classList.remove('animate-in');
        });
    }
    
    handleElementResize(entry) {
        const element = entry.target;
        const { width, height } = entry.contentRect;
        
        // 크기 변경에 따른 최적화
        if (width < 320) {
            element.classList.add('ultra-compact');
        } else {
            element.classList.remove('ultra-compact');
        }
    }
    
    preloadNextSection(element) {
        const nextSection = element.nextElementSibling;
        if (nextSection && !nextSection.dataset.preloaded) {
            const images = nextSection.querySelectorAll('img[data-src]');
            images.forEach(img => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.dataset.src;
                document.head.appendChild(link);
            });
            
            nextSection.dataset.preloaded = 'true';
        }
    }
    
    triggerMemoryCleanup() {
        // 사용하지 않는 DOM 요소 정리
        this.cleanupUnusedElements();
        
        // 이벤트 리스너 정리
        this.cleanupEventListeners();
        
        // 이미지 캐시 정리
        this.clearImageCache();
        
        // 강제 가비지 컬렉션 (가능한 경우)
        if (window.gc) {
            window.gc();
        }
    }
    
    cleanupUnusedElements() {
        // 화면에 보이지 않는 모달들 정리
        const hiddenModals = document.querySelectorAll('.modal-overlay:not(.active)');
        hiddenModals.forEach(modal => {
            if (!modal.dataset.keep) {
                modal.remove();
            }
        });
    }
    
    cleanupEventListeners() {
        // 만료된 터치 피드백 정리
        this.touchElements.forEach((timestamp, element) => {
            if (Date.now() - timestamp > 5000) {
                this.touchElements.delete(element);
            }
        });
    }
    
    cleanupTouchListeners() {
        // 불필요한 터치 이벤트 리스너 제거
        const unnecessaryElements = document.querySelectorAll('.unnecessary-touch');
        unnecessaryElements.forEach(el => {
            el.style.pointerEvents = 'none';
        });
    }
    
    clearImageCache() {
        // 사용하지 않는 이미지 캐시 정리
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!this.isElementVisible(img)) {
                img.src = '';
            }
        });
    }
    
    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.right > 0
        );
    }
    
    removeUnusedCSS() {
        // 실제 환경에서는 PurgeCSS 등의 도구 사용 권장
        console.log('CSS optimization would be handled by build tools');
    }
    
    trackEventListeners() {
        // 이벤트 리스너 추적 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
            console.log('Event listener tracking enabled');
        }
    }
    
    monitorPageLoad() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                if (loadTime > 3000) {
                    console.warn('Slow page load detected:', loadTime, 'ms');
                }
            }, 0);
        });
    }
}

// 전역 성능 최적화 관리자 초기화
window.performanceOptimizer = new PerformanceOptimizer();

// App 초기화와 통합
if (window.app) {
    const originalInit = window.app.init;
    window.app.init = function() {
        originalInit.call(this);
        
        // 성능 최적화 적용
        window.performanceOptimizer = new PerformanceOptimizer();
        
        // Lazy loading 설정
        document.querySelectorAll('img[data-src]').forEach(img => {
            window.performanceOptimizer.addLazyElement(img);
        });
        
        // 터치 피드백 요소 설정
        document.querySelectorAll('.btn, .card-interactive, .list-item').forEach(el => {
            el.setAttribute('data-touch-feedback', 'true');
        });
    };
}