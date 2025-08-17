// App Core - Main Application Controller and Navigation
window.app = {
    currentPage: 'home',
    isAuthenticated: true,
    authToken: 'temp_token_' + Date.now(),
    memberData: {
        name: '김영수',
        party: '국민의힘',
        district: '경기 수원시갑',
        memberId: '2024-0815',
        generation: '제11기',
        term: '초선',
        committees: ['교육위원회(위원장)', '예산결산특별위원회'],
        photo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f3f4f6'/%3E%3Ccircle cx='50' cy='35' r='15' fill='%23d1d5db'/%3E%3Cpath d='M20 75 Q20 60 35 60 H65 Q80 60 80 75 V85 Q80 90 75 90 H25 Q20 90 20 85 Z' fill='%23d1d5db'/%3E%3C/svg%3E",
        attendanceRate: {
            plenary: 98.5,
            standing: 96,
            special: 100
        },
        bills: 32,
        speeches: 15,
        civilComplaints: 248
    },
    
    // Initialize Application
    init: function() {
        console.log('앱 초기화 시작...');
        this.setupEventListeners();
        this.setupOverlay();
        this.setupAuth();
        this.loadPage('home');
        console.log('의정활동 관리시스템 초기화 완료');
    },
    
    // Setup Authentication
    setupAuth: function() {
        localStorage.setItem('authToken', this.authToken);
        localStorage.setItem('memberData', JSON.stringify(this.memberData));
        localStorage.setItem('isAuthenticated', 'true');
        console.log('인증 상태 설정 완료');
    },
    
    // Check Authentication Status
    checkAuth: function() {
        const token = localStorage.getItem('authToken');
        const isAuth = localStorage.getItem('isAuthenticated');
        
        if (!token || isAuth !== 'true') {
            this.isAuthenticated = false;
            console.log('인증 실패 - 로그인 필요');
            return false;
        }
        
        this.isAuthenticated = true;
        console.log('인증 성공');
        return true;
    },
    
    // Setup Event Listeners
    setupEventListeners: function() {
        console.log('이벤트 리스너 설정 중...');
        
        // Menu Toggle with improved functionality
        const menuToggle = document.getElementById('menuToggle');
        const sideMenu = document.getElementById('sideMenu');
        
        console.log('메뉴 토글 버튼:', menuToggle);
        console.log('사이드 메뉴:', sideMenu);
        
        if (menuToggle && sideMenu) {
            console.log('메뉴 토글 이벤트 리스너 추가중...');
            
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🍔 햄버거 메뉴 클릭됨!');
                
                const isActive = sideMenu.classList.contains('active');
                console.log('현재 메뉴 상태:', isActive ? '열림' : '닫힘');
                
                if (isActive) {
                    console.log('메뉴 닫기 실행');
                    this.closeSideMenu();
                } else {
                    console.log('메뉴 열기 실행');
                    this.openSideMenu();
                }
            });
            
            // 터치 이벤트도 추가
            menuToggle.addEventListener('touchstart', (e) => {
                console.log('터치 이벤트 감지');
            });
            
            console.log('메뉴 토글 이벤트 리스너 추가 완료');
        } else {
            console.error('메뉴 토글 버튼 또는 사이드 메뉴를 찾을 수 없음!');
        }
        
        // Menu Items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                console.log('메뉴 아이템 클릭:', page);
                if (page) {
                    this.navigateTo(page);
                    this.closeSideMenu();
                }
            });
        });
        
        // Bottom Navigation
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                console.log('하단 네비 클릭:', page);
                if (page) {
                    this.navigateTo(page);
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const sideMenu = document.getElementById('sideMenu');
            const menuToggle = document.getElementById('menuToggle');
            
            if (sideMenu && menuToggle && 
                !sideMenu.contains(e.target) && 
                !menuToggle.contains(e.target) && 
                sideMenu.classList.contains('active')) {
                this.closeSideMenu();
            }
        });
        
        console.log('이벤트 리스너 설정 완료');
    },
    
    // Open Side Menu
    openSideMenu: function() {
        console.log('🔓 사이드 메뉴 열기 함수 호출됨');
        const sideMenu = document.getElementById('sideMenu');
        if (sideMenu) {
            sideMenu.classList.add('active');
            console.log('✅ 사이드 메뉴에 active 클래스 추가됨');
            
            // 메뉴가 실제로 열렸는지 확인
            setTimeout(() => {
                const computedStyle = window.getComputedStyle(sideMenu);
                console.log('메뉴 left 위치:', computedStyle.left);
            }, 100);
        } else {
            console.error('❌ 사이드 메뉴 요소를 찾을 수 없음');
        }
        
        if (this.overlay) {
            this.overlay.classList.add('active');
            console.log('✅ 오버레이 활성화됨');
        } else {
            console.log('⚠️ 오버레이 없음');
        }
        
        // 바디 스크롤 방지
        document.body.style.overflow = 'hidden';
    },
    
    // Setup Overlay
    setupOverlay: function() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'overlay';
        this.overlay.addEventListener('click', () => {
            this.closeSideMenu();
        });
        document.body.appendChild(this.overlay);
    },
    
    // Close Side Menu
    closeSideMenu: function() {
        console.log('🔒 사이드 메뉴 닫기 함수 호출됨');
        const sideMenu = document.getElementById('sideMenu');
        if (sideMenu) {
            sideMenu.classList.remove('active');
            console.log('✅ 사이드 메뉴에서 active 클래스 제거됨');
        }
        if (this.overlay) {
            this.overlay.classList.remove('active');
            console.log('✅ 오버레이 비활성화됨');
        }
        
        // 바디 스크롤 복원
        document.body.style.overflow = '';
    },
    
    // Navigate to Page
    navigateTo: function(page) {
        console.log('페이지 이동:', page);
        this.currentPage = page;
        this.updateActiveNav(page);
        this.loadPage(page);
    },
    
    // Update Active Navigation
    updateActiveNav: function(page) {
        // Side menu
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });
        
        // Bottom navigation
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });
    },
    
    // Load Page Content
    loadPage: function(page) {
        console.log('페이지 로딩:', page);
        
        switch (page) {
            case 'home':
                this.loadHomePage();
                break;
            case 'digital-id':
                this.loadDigitalIdPage();
                break;
            case 'info':
                this.loadInfoPage();
                break;
            case 'attendance':
                this.loadAttendancePage();
                break;
            case 'bill':
                this.loadBillPage();
                break;
            case 'speech':
                this.loadSpeechPage();
                break;
            case 'budget':
                this.loadBudgetPage();
                break;
            case 'civil':
                this.loadCivilPage();
                break;
            case 'education':
                this.loadEducationPage();
                break;
            case 'committee-members':
                this.loadCommitteeMembersPage();
                break;
            case 'staff-directory':
                this.loadStaffDirectoryPage();
                break;
            case 'location-tracking':
                this.loadLocationTrackingPage();
                break;
            case 'report':
                this.loadReportPage();
                break;
            case 'settings':
                this.loadSettingsPage();
                break;
            case 'profile':
                this.loadInfoPage(); // 프로필과 정보 페이지를 같게 처리
                break;
            default:
                this.loadHomePage();
        }
        
        // 페이지 로딩 완료 후 스크롤을 맨 위로
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료 - 앱 초기화 시작');
    window.app.init();
});