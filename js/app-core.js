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
        photo: "images/annomimus.jpg",
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
        
        // MemberDataManager 초기화
        if (window.MemberDataManager && typeof window.MemberDataManager.init === 'function') {
            window.MemberDataManager.init();
            console.log('MemberDataManager 초기화 완료');
        }
        
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
            
            const self = this; // this 컨텍스트 저장
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🍔 햄버거 메뉴 클릭됨!');
                
                const isActive = sideMenu.classList.contains('active');
                console.log('현재 메뉴 상태:', isActive ? '열림' : '닫힘');
                
                if (isActive) {
                    console.log('메뉴 닫기 실행');
                    self.closeSideMenu();
                } else {
                    console.log('메뉴 열기 실행');
                    self.openSideMenu();
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
        const self2 = this;
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.dataset.page;
                console.log('메뉴 아이템 클릭:', page);
                if (page) {
                    self2.navigateTo(page);
                    self2.closeSideMenu();
                }
            });
        });
        
        // Bottom Navigation
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.dataset.page;
                console.log('하단 네비 클릭:', page);
                if (page) {
                    self2.navigateTo(page);
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
    
    // Show Toast Message
    showToast: function(message, type = 'success') {
        // 기존 토스트 제거
        const existingToast = document.querySelector('.toast-message');
        if (existingToast) {
            existingToast.remove();
        }
        
        // 토스트 생성
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6b7280'};
            color: white;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // 애니메이션
        setTimeout(() => toast.style.opacity = '1', 10);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
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
        
        // 캐시 클리어를 위한 타임스탬프 추가
        const timestamp = Date.now();
        
        switch (page) {
            case 'home':
                // 캐시 버스팅을 위해 직접 호출
                console.log('홈페이지 로딩 - 타임스탬프:', timestamp);
                this.loadHomePage();
                break;
            case 'digital-id':
                // 모바일 최적화 버전 사용
                if (window.app.loadDigitalIdMobileOptimized) {
                    this.loadDigitalIdMobileOptimized();
                } else {
                    this.loadDigitalIdPage();
                }
                break;
            case 'info':
                this.loadInfoPage();
                break;
            case 'member-profile':
                this.loadMemberProfilePage();
                break;
            case 'attendance':
                this.loadAttendancePage();
                // 캘린더 초기화
                setTimeout(() => {
                    if (window.AttendanceCalendar) {
                        window.AttendanceCalendar.init();
                    }
                }, 100);
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
                // 새로운 블록체인 기반 위치 활동 페이지 사용
                if (typeof window.app.loadLocationActivitiesPage === 'function') {
                    this.loadLocationActivitiesPage();
                } else {
                    // 기존 페이지로 폴백
                    this.loadLocationTrackingPage();
                }
                break;
            case 'report':
                this.loadReportPage();
                break;
            case 'settings':
                this.loadSettingsPage();
                break;
            case 'profile':
                // member-profile-page.js의 loadMemberProfilePage 함수 호출
                if (typeof this.loadMemberProfilePage === 'function') {
                    this.loadMemberProfilePage();
                } else {
                    console.error('loadMemberProfilePage 함수를 찾을 수 없습니다. member-profile-page.js가 로드되었는지 확인하세요.');
                    this.loadInfoPage(); // 폴백으로 정보 페이지 표시
                }
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
    
    // 초기화 전 상태 확인
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    console.log('초기화 전 - 메뉴 토글 버튼:', menuToggle);
    console.log('초기화 전 - 사이드 메뉴:', sideMenu);
    
    // Show Member Details - Display member info popup when photo is clicked
    window.app.showMemberDetails = function() {
        const memberData = this.memberData;
        
        this.showModal('memberDetailsModal', {
            title: '의원 상세정보',
            content: `
                <div class="space-y-4">
                    <!-- Member Photo and Basic Info -->
                    <div class="flex items-center gap-4 pb-4 border-b">
                        <img src="${memberData.photo}" alt="${memberData.name}" 
                             class="w-24 h-24 rounded-lg object-cover border-2 border-gray-200">
                        <div>
                            <h3 class="text-lg font-bold text-gray-900">${memberData.name}</h3>
                            <p class="text-sm text-gray-600">${memberData.party}</p>
                            <p class="text-sm text-gray-600">${memberData.district}</p>
                            <div class="flex gap-2 mt-2">
                                <span class="gov-badge gov-badge-active text-xs">재직중</span>
                                <span class="gov-badge text-xs">${memberData.term}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Detailed Information -->
                    <div class="space-y-3">
                        <div class="flex justify-between items-center py-2 border-b border-gray-100">
                            <span class="text-sm text-gray-600">의원번호</span>
                            <span class="text-sm font-medium text-gray-900">${memberData.memberId}</span>
                        </div>
                        <div class="flex justify-between items-center py-2 border-b border-gray-100">
                            <span class="text-sm text-gray-600">소속 위원회</span>
                            <span class="text-sm font-medium text-gray-900">${memberData.committees.join(', ')}</span>
                        </div>
                        <div class="flex justify-between items-center py-2 border-b border-gray-100">
                            <span class="text-sm text-gray-600">회기</span>
                            <span class="text-sm font-medium text-gray-900">${memberData.generation}</span>
                        </div>
                    </div>
                    
                    <!-- Activity Stats -->
                    <div class="grid grid-cols-2 gap-3 pt-3">
                        <div class="bg-blue-50 rounded-lg p-3 text-center cursor-pointer hover:bg-blue-100 transition" 
                             onclick="app.navigateTo('attendance'); app.closeModal();">
                            <div class="text-2xl font-bold text-blue-600">${memberData.attendanceRate.plenary}%</div>
                            <div class="text-xs text-gray-600">본회의 출석률</div>
                        </div>
                        <div class="bg-green-50 rounded-lg p-3 text-center cursor-pointer hover:bg-green-100 transition" 
                             onclick="app.navigateTo('bill'); app.closeModal();">
                            <div class="text-2xl font-bold text-green-600">${memberData.bills}건</div>
                            <div class="text-xs text-gray-600">발의 법안</div>
                        </div>
                        <div class="bg-purple-50 rounded-lg p-3 text-center cursor-pointer hover:bg-purple-100 transition" 
                             onclick="app.navigateTo('speech'); app.closeModal();">
                            <div class="text-2xl font-bold text-purple-600">${memberData.speeches}회</div>
                            <div class="text-xs text-gray-600">본회의 발언</div>
                        </div>
                        <div class="bg-orange-50 rounded-lg p-3 text-center cursor-pointer hover:bg-orange-100 transition" 
                             onclick="app.navigateTo('civil'); app.closeModal();">
                            <div class="text-2xl font-bold text-orange-600">${memberData.civilComplaints}건</div>
                            <div class="text-xs text-gray-600">민원 처리</div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div class="grid grid-cols-2 gap-2 pt-3">
                        <button onclick="app.navigateTo('info'); app.closeModal();" 
                                class="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                            <i class="fas fa-user mr-2"></i>전체 프로필
                        </button>
                        <button onclick="app.navigateTo('digital-id'); app.closeModal();" 
                                class="bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition">
                            <i class="fas fa-id-card mr-2"></i>디지털 신분증
                        </button>
                    </div>
                </div>
            `,
            buttons: [
                {
                    text: '닫기',
                    class: 'bg-gray-500 text-white',
                    onclick: 'app.closeModal()'
                }
            ]
        });
    };
    
    // 초기화 실행
    window.app.init();

    // 함수 등록 확인
    console.log('함수 등록 상태:');
    console.log('- showActivityDetail:', typeof window.app.showActivityDetail);
    console.log('- showPressReleases:', typeof window.app.showPressReleases);
    console.log('- showSchedule:', typeof window.app.showSchedule);
    console.log('- showMeetings:', typeof window.app.showMeetings);
    console.log('- showStatistics:', typeof window.app.showStatistics);
    console.log('- showQuickContacts:', typeof window.app.showQuickContacts);
    console.log('- showAllActivities:', typeof window.app.showAllActivities);
    console.log('- showCommitteeInfo:', typeof window.app.showCommitteeInfo);
    console.log('- showPerformanceReport:', typeof window.app.showPerformanceReport);
    console.log('- showMemberDetails:', typeof window.app.showMemberDetails);
});