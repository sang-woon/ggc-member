/**
 * GYEONGGI PROVINCIAL COUNCIL
 * MOBILE INTERACTION PATTERNS
 * 모바일 최적화 인터랙션 시스템
 */

// Mobile Interaction Manager
class MobileInteractions {
    constructor() {
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.isSwipeEnabled = true;
        this.swipeThreshold = 50;
        this.velocityThreshold = 0.3;
        
        this.init();
    }
    
    init() {
        this.setupSwipeGestures();
        this.setupPullToRefresh();
        this.setupInfiniteScroll();
        this.setupTouchFeedback();
        this.setupVibration();
        this.setupGestureNavigation();
    }
    
    /**
     * 스와이프 제스처 시스템
     */
    setupSwipeGestures() {
        let startTime;
        
        document.addEventListener('touchstart', (e) => {
            if (!this.isSwipeEnabled) return;
            
            const touch = e.touches[0];
            this.touchStartX = touch.clientX;
            this.touchStartY = touch.clientY;
            startTime = Date.now();
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!this.isSwipeEnabled) return;
            
            const touch = e.touches[0];
            this.touchEndX = touch.clientX;
            this.touchEndY = touch.clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!this.isSwipeEnabled) return;
            
            const endTime = Date.now();
            const timeDiff = endTime - startTime;
            const distanceX = Math.abs(this.touchEndX - this.touchStartX);
            const distanceY = Math.abs(this.touchEndY - this.touchStartY);
            const velocity = Math.max(distanceX, distanceY) / timeDiff;
            
            if (velocity > this.velocityThreshold && distanceX > this.swipeThreshold) {
                this.handleSwipe();
            }
        }, { passive: true });
    }
    
    handleSwipe() {
        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;
        
        // 가로 스와이프가 세로 스와이프보다 큰 경우
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                this.onSwipeRight();
            } else {
                this.onSwipeLeft();
            }
        } else {
            if (deltaY > 0) {
                this.onSwipeDown();
            } else {
                this.onSwipeUp();
            }
        }
    }
    
    onSwipeLeft() {
        // 다음 페이지로 이동 또는 사이드 메뉴 닫기
        if (document.body.classList.contains('menu-open')) {
            window.app.toggleMenu();
            return;
        }
        
        // 페이지 네비게이션
        this.navigateNext();
    }
    
    onSwipeRight() {
        // 이전 페이지로 이동 또는 사이드 메뉴 열기
        if (window.app.currentPage !== 'home') {
            this.navigatePrevious();
        } else {
            window.app.toggleMenu();
        }
    }
    
    onSwipeUp() {
        // 모달이나 바텀시트 열기
        this.showQuickActions();
    }
    
    onSwipeDown() {
        // 새로고침 또는 모달 닫기
        if (document.querySelector('.modal-overlay.active')) {
            this.closeTopModal();
        } else {
            this.triggerRefresh();
        }
    }
    
    /**
     * Pull to Refresh 구현
     */
    setupPullToRefresh() {
        let startY = 0;
        let currentY = 0;
        let isRefreshing = false;
        let pullDistance = 0;
        
        const refreshThreshold = 100;
        const maxPullDistance = 150;
        
        // Refresh indicator 생성
        this.createRefreshIndicator();
        
        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0 && !isRefreshing) {
                startY = e.touches[0].clientY;
            }
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (window.scrollY === 0 && !isRefreshing && startY > 0) {
                currentY = e.touches[0].clientY;
                pullDistance = Math.min(currentY - startY, maxPullDistance);
                
                if (pullDistance > 0) {
                    e.preventDefault();
                    this.updateRefreshIndicator(pullDistance, refreshThreshold);
                }
            }
        });
        
        document.addEventListener('touchend', () => {
            if (pullDistance >= refreshThreshold && !isRefreshing) {
                this.triggerRefresh();
            } else {
                this.resetRefreshIndicator();
            }
            startY = 0;
            pullDistance = 0;
        }, { passive: true });
    }
    
    createRefreshIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'refresh-indicator';
        indicator.innerHTML = `
            <div class="refresh-spinner">
                <i class="fas fa-sync-alt"></i>
            </div>
            <div class="refresh-text">새로고침하려면 당겨주세요</div>
        `;
        document.body.appendChild(indicator);
    }
    
    updateRefreshIndicator(distance, threshold) {
        const indicator = document.querySelector('.refresh-indicator');
        const progress = Math.min(distance / threshold, 1);
        const rotation = progress * 180;
        
        indicator.style.transform = `translateY(${Math.min(distance - 50, 0)}px)`;
        indicator.style.opacity = progress;
        
        const spinner = indicator.querySelector('.refresh-spinner i');
        spinner.style.transform = `rotate(${rotation}deg)`;
        
        const text = indicator.querySelector('.refresh-text');
        text.textContent = progress >= 1 ? '놓으면 새로고침' : '새로고침하려면 당겨주세요';
    }
    
    resetRefreshIndicator() {
        const indicator = document.querySelector('.refresh-indicator');
        indicator.style.transform = 'translateY(-50px)';
        indicator.style.opacity = '0';
    }
    
    triggerRefresh() {
        const indicator = document.querySelector('.refresh-indicator');
        const text = indicator.querySelector('.refresh-text');
        const spinner = indicator.querySelector('.refresh-spinner i');
        
        text.textContent = '새로고침 중...';
        spinner.style.animation = 'spin 1s linear infinite';
        
        // 햅틱 피드백
        this.vibrate(50);
        
        // 실제 새로고침 로직
        setTimeout(() => {
            window.app.refreshCurrentPage();
            this.resetRefreshIndicator();
            spinner.style.animation = '';
        }, 1500);
    }
    
    /**
     * 무한 스크롤 구현
     */
    setupInfiniteScroll() {
        let isLoading = false;
        const loadThreshold = 200; // 하단에서 200px 떨어진 지점
        
        window.addEventListener('scroll', () => {
            if (isLoading) return;
            
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            if (documentHeight - scrollPosition < loadThreshold) {
                this.loadMoreContent();
            }
        }, { passive: true });
    }
    
    loadMoreContent() {
        // 로딩 상태 표시
        this.showLoadingIndicator();
        
        // 현재 페이지에 따른 추가 콘텐츠 로드
        const currentPage = window.app.currentPage;
        
        setTimeout(() => {
            switch (currentPage) {
                case 'attendance':
                    this.loadMoreAttendance();
                    break;
                case 'bill-proposal':
                    this.loadMoreBills();
                    break;
                case 'civil-complaint':
                    this.loadMoreComplaints();
                    break;
                default:
                    this.hideLoadingIndicator();
                    return;
            }
            
            this.hideLoadingIndicator();
        }, 1000);
    }
    
    showLoadingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'infinite-loading';
        indicator.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">추가 내용을 불러오는 중...</div>
        `;
        document.body.appendChild(indicator);
    }
    
    hideLoadingIndicator() {
        const indicator = document.querySelector('.infinite-loading');
        if (indicator) {
            indicator.remove();
        }
    }
    
    /**
     * 터치 피드백 시스템
     */
    setupTouchFeedback() {
        // 모든 인터랙티브 요소에 터치 피드백 추가
        const interactiveElements = 'button, .btn, .card-interactive, .list-item, a, input, select, textarea';
        
        document.addEventListener('touchstart', (e) => {
            const element = e.target.closest(interactiveElements);
            if (element) {
                this.addTouchFeedback(element);
            }
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            const element = e.target.closest(interactiveElements);
            if (element) {
                setTimeout(() => this.removeTouchFeedback(element), 150);
            }
        }, { passive: true });
        
        document.addEventListener('touchcancel', (e) => {
            const element = e.target.closest(interactiveElements);
            if (element) {
                this.removeTouchFeedback(element);
            }
        }, { passive: true });
    }
    
    addTouchFeedback(element) {
        element.classList.add('touch-active');
        
        // 리플 효과 추가
        if (!element.querySelector('.ripple')) {
            this.createRippleEffect(element);
        }
    }
    
    removeTouchFeedback(element) {
        element.classList.remove('touch-active');
    }
    
    createRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        
        element.appendChild(ripple);
        
        // 애니메이션 완료 후 제거
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    /**
     * 햅틱 피드백 (진동)
     */
    setupVibration() {
        this.isVibrationEnabled = localStorage.getItem('vibrationEnabled') !== 'false';
    }
    
    vibrate(pattern) {
        if (!this.isVibrationEnabled || !navigator.vibrate) return;
        navigator.vibrate(pattern);
    }
    
    /**
     * 제스처 기반 네비게이션
     */
    setupGestureNavigation() {
        // 뒤로가기 제스처
        this.setupBackGesture();
        
        // 탭 간 전환 제스처
        this.setupTabSwitchGesture();
    }
    
    setupBackGesture() {
        let startX = 0;
        let currentX = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
            const deltaX = currentX - startX;
            
            // 화면 왼쪽 가장자리에서 시작한 오른쪽 스와이프
            if (startX < 20 && deltaX > 50) {
                this.showBackGestureIndicator(deltaX);
            }
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            const deltaX = currentX - startX;
            
            if (startX < 20 && deltaX > 100) {
                this.navigateBack();
            }
            
            this.hideBackGestureIndicator();
        }, { passive: true });
    }
    
    showBackGestureIndicator(distance) {
        let indicator = document.querySelector('.back-gesture-indicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'back-gesture-indicator';
            indicator.innerHTML = '<i class="fas fa-arrow-left"></i>';
            document.body.appendChild(indicator);
        }
        
        const opacity = Math.min(distance / 100, 1);
        indicator.style.opacity = opacity;
        indicator.style.transform = `translateX(${Math.min(distance - 20, 50)}px)`;
    }
    
    hideBackGestureIndicator() {
        const indicator = document.querySelector('.back-gesture-indicator');
        if (indicator) {
            indicator.style.opacity = '0';
            indicator.style.transform = 'translateX(-20px)';
        }
    }
    
    /**
     * 네비게이션 헬퍼 메서드
     */
    navigateNext() {
        const pages = ['home', 'digital-id', 'attendance', 'member-info', 'bill-proposal'];
        const currentIndex = pages.indexOf(window.app.currentPage);
        
        if (currentIndex < pages.length - 1) {
            window.app.navigateTo(pages[currentIndex + 1]);
            this.vibrate(10);
        }
    }
    
    navigatePrevious() {
        const pages = ['home', 'digital-id', 'attendance', 'member-info', 'bill-proposal'];
        const currentIndex = pages.indexOf(window.app.currentPage);
        
        if (currentIndex > 0) {
            window.app.navigateTo(pages[currentIndex - 1]);
            this.vibrate(10);
        }
    }
    
    navigateBack() {
        if (window.app.currentPage !== 'home') {
            window.app.navigateTo('home');
            this.vibrate(20);
        }
    }
    
    showQuickActions() {
        // 빠른 실행 메뉴 표시
        window.app.showModal('quick-actions', {
            title: '빠른 실행',
            content: this.getQuickActionsContent()
        });
    }
    
    closeTopModal() {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            window.app.hideModal();
            this.vibrate(10);
        }
    }
    
    getQuickActionsContent() {
        return `
            <div class="quick-actions-grid">
                <div class="quick-action" onclick="app.navigateTo('digital-id')">
                    <i class="fas fa-id-card"></i>
                    <span>디지털 신분증</span>
                </div>
                <div class="quick-action" onclick="app.navigateTo('attendance')">
                    <i class="fas fa-calendar-check"></i>
                    <span>출석 현황</span>
                </div>
                <div class="quick-action" onclick="app.navigateTo('bill-proposal')">
                    <i class="fas fa-file-alt"></i>
                    <span>법안 발의</span>
                </div>
                <div class="quick-action" onclick="app.navigateTo('civil-complaint')">
                    <i class="fas fa-comments"></i>
                    <span>민원 처리</span>
                </div>
            </div>
        `;
    }
    
    /**
     * 인터랙션 활성화/비활성화
     */
    enableSwipe() {
        this.isSwipeEnabled = true;
    }
    
    disableSwipe() {
        this.isSwipeEnabled = false;
    }
    
    /**
     * 페이지별 추가 콘텐츠 로드 메서드
     */
    loadMoreAttendance() {
        // 출석 현황 추가 데이터 로드
        console.log('Loading more attendance data...');
    }
    
    loadMoreBills() {
        // 법안 발의 추가 데이터 로드
        console.log('Loading more bill data...');
    }
    
    loadMoreComplaints() {
        // 민원 처리 추가 데이터 로드
        console.log('Loading more complaint data...');
    }
}

// 전역 인터랙션 매니저 초기화
window.mobileInteractions = new MobileInteractions();

// App 초기화 시 인터랙션 설정
if (window.app) {
    const originalInit = window.app.init;
    window.app.init = function() {
        originalInit.call(this);
        window.mobileInteractions = new MobileInteractions();
    };
}