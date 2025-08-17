// Fixed App Object - Main Application Controller
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
    },
    
    // Load Home Page
    loadHomePage: function() {
        const template = document.getElementById('homePage');
        if (template) {
            const content = template.content.cloneNode(true);
            const mainContent = document.getElementById('mainContent');
            if (mainContent) {
                mainContent.innerHTML = '';
                mainContent.appendChild(content);
                
                // 차트 초기화
                setTimeout(() => {
                    this.initMonthlyChart();
                }, 100);
            }
        }
    },
    
    // Load Digital ID Page
    loadDigitalIdPage: function() {
        const template = document.getElementById('digitalIdPage');
        if (template) {
            const content = template.content.cloneNode(true);
            const mainContent = document.getElementById('mainContent');
            if (mainContent) {
                mainContent.innerHTML = '';
                mainContent.appendChild(content);
                
                // QR 코드 및 시간 초기화
                setTimeout(() => {
                    this.initQRCode();
                    this.initRealTime();
                }, 100);
            }
        }
    },
    
    // Load Attendance Page  
    loadAttendancePage: function() {
        const template = document.getElementById('attendancePage');
        if (template) {
            const content = template.content.cloneNode(true);
            const mainContent = document.getElementById('mainContent');
            if (mainContent) {
                mainContent.innerHTML = '';
                mainContent.appendChild(content);
            }
        }
    },
    
    // Load Info Page
    loadInfoPage: function() {
        const html = `
            <div class="page-container">
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">의원 상세정보</h3>
                    
                    <div class="flex items-start space-x-4 mb-4">
                        <div class="w-24 h-30 rounded overflow-hidden border">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 120'%3E%3Crect width='96' height='120' fill='%23f3f4f6'/%3E%3Ccircle cx='48' cy='35' r='15' fill='%23d1d5db'/%3E%3Cpath d='M20 85 Q20 70 30 70 H66 Q76 70 76 85 V100 H20 Z' fill='%23d1d5db'/%3E%3C/svg%3E" alt="임시 익명 프로필" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1">
                            <h4 class="font-bold text-lg mb-2">${this.memberData.name}</h4>
                            <div class="space-y-2 text-sm">
                                <div><span class="text-gray-600">생년월일:</span> 1975.08.15</div>
                                <div><span class="text-gray-600">소속정당:</span> ${this.memberData.party}</div>
                                <div><span class="text-gray-600">지역구:</span> ${this.memberData.district}</div>
                                <div><span class="text-gray-600">당선횟수:</span> ${this.memberData.term} (${this.memberData.generation})</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-2">학력</h5>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li>• 서울대학교 법학과 졸업</li>
                            <li>• 하버드대학교 케네디스쿨 석사</li>
                        </ul>
                    </div>
                    
                    <div class="border-t pt-4 mt-4">
                        <h5 class="font-semibold mb-2">주요 경력</h5>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li>• 前 법무부 검사</li>
                            <li>• 前 서울시 정책특보</li>
                            <li>• 現 교육위원회 위원장</li>
                        </ul>
                    </div>
                    
                    <div class="border-t pt-4 mt-4">
                        <h5 class="font-semibold mb-2">연락처</h5>
                        <div class="text-sm space-y-1">
                            <div><i class="fas fa-phone mr-2 text-gray-500"></i>02-784-xxxx</div>
                            <div><i class="fas fa-envelope mr-2 text-gray-500"></i>kimys@assembly.go.kr</div>
                            <div><i class="fas fa-building mr-2 text-gray-500"></i>국회의원회관 xxx호</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Load Bill Page
    loadBillPage: function() {
        const html = `
            <div class="page-container">
                <!-- 검색 및 필터 -->
                <div class="gov-card mb-4">
                    <div class="flex items-center gap-2 mb-3">
                        <div class="flex-1 relative">
                            <input type="text" placeholder="법안명 또는 키워드 검색" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500">
                            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                        <button class="px-3 py-2 bg-gray-100 rounded-lg text-sm" onclick="app.showBillFilters()">
                            <i class="fas fa-filter mr-1"></i>필터
                        </button>
                    </div>
                    
                    <div class="flex gap-2 overflow-x-auto pb-2">
                        <button class="px-3 py-1 bg-blue-600 text-white rounded-full text-xs whitespace-nowrap">전체</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">대표발의</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">공동발의</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">가결</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">심사중</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">계류</button>
                    </div>
                </div>
                
                <!-- 통계 요약 -->
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">의안 발의 현황</h3>
                    
                    <div class="grid grid-cols-4 gap-2 mb-4">
                        <div class="text-center p-3 bg-blue-50 rounded" onclick="app.showBillStats('total')">
                            <div class="text-2xl font-bold text-blue-600">${this.memberData.bills}</div>
                            <div class="text-xs text-gray-600">총 발의</div>
                        </div>
                        <div class="text-center p-3 bg-green-50 rounded" onclick="app.showBillStats('passed')">
                            <div class="text-2xl font-bold text-green-600">18</div>
                            <div class="text-xs text-gray-600">가결</div>
                        </div>
                        <div class="text-center p-3 bg-orange-50 rounded" onclick="app.showBillStats('pending')">
                            <div class="text-2xl font-bold text-orange-600">12</div>
                            <div class="text-xs text-gray-600">계류중</div>
                        </div>
                        <div class="text-center p-3 bg-red-50 rounded" onclick="app.showBillStats('rejected')">
                            <div class="text-2xl font-bold text-red-600">2</div>
                            <div class="text-xs text-gray-600">부결</div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-3">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm text-gray-600">가결률</span>
                            <span class="text-sm font-bold">56.3%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-green-600 h-2 rounded-full" style="width: 56.3%"></div>
                        </div>
                    </div>
                </div>
                
                <!-- 최근 발의 법안 -->
                <div class="gov-card mb-4">
                    <div class="flex justify-between items-center mb-3">
                        <h4 class="font-semibold">최근 발의 법안</h4>
                        <button class="text-blue-600 text-sm" onclick="app.showAllBills()">전체보기</button>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="activity-item" onclick="app.showBillDetail('2024-001')" style="cursor: pointer;">
                            <div class="activity-icon bg-green-50">
                                <i class="fas fa-file-signature text-green-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">주택임대차보호법 일부개정법률안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-blue-600">대표발의</span> • 2024.01.12 • 공동발의자 15명
                                </div>
                                <div class="activity-date text-xs">법제사법위원회 심사완료</div>
                                <div class="flex gap-2 mt-2">
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">임대차</span>
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">주거안정</span>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="gov-badge gov-badge-active">가결</span>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                            </div>
                        </div>
                        
                        <div class="activity-item" onclick="app.showBillDetail('2024-002')" style="cursor: pointer;">
                            <div class="activity-icon bg-blue-50">
                                <i class="fas fa-file-alt text-blue-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">청년 주거안정 특별법안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-green-600">공동발의</span> • 2024.01.08 • 대표발의자: 이정민 의원
                                </div>
                                <div class="activity-date text-xs">국토교통위원회 상정</div>
                                <div class="flex gap-2 mt-2">
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">청년정책</span>
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">주거복지</span>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="gov-badge bg-blue-100 text-blue-700">심사중</span>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                            </div>
                        </div>
                        
                        <div class="activity-item" onclick="app.showBillDetail('2024-003')" style="cursor: pointer;">
                            <div class="activity-icon bg-orange-50">
                                <i class="fas fa-file-contract text-orange-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">교육기본법 일부개정법률안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-blue-600">대표발의</span> • 2024.01.05 • 공동발의자 23명
                                </div>
                                <div class="activity-date text-xs">교육위원회 접수</div>
                                <div class="flex gap-2 mt-2">
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">교육개혁</span>
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">학생인권</span>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="gov-badge bg-gray-100 text-gray-700">계류중</span>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 액션 버튼 -->
                <div class="grid grid-cols-2 gap-3">
                    <button class="btn-primary" onclick="app.showNewBillForm()">
                        <i class="fas fa-plus mr-2"></i>새 법안 발의
                    </button>
                    <button class="btn-secondary" onclick="app.showBillAnalytics()">
                        <i class="fas fa-chart-bar mr-2"></i>통계 분석
                    </button>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Load Speech Page
    loadSpeechPage: function() {
        const html = `
            <div class="page-container">
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">발언 기록</h3>
                    
                    <div class="grid grid-cols-2 gap-3 mb-4">
                        <div class="gov-stat-card">
                            <div class="gov-stat-icon bg-blue-100 text-blue-600">
                                <i class="fas fa-microphone"></i>
                            </div>
                            <div class="gov-stat-content">
                                <div class="gov-stat-value">${this.memberData.speeches}</div>
                                <div class="gov-stat-label">본회의 발언</div>
                            </div>
                        </div>
                        <div class="gov-stat-card">
                            <div class="gov-stat-icon bg-purple-100 text-purple-600">
                                <i class="fas fa-comments"></i>
                            </div>
                            <div class="gov-stat-content">
                                <div class="gov-stat-value">28</div>
                                <div class="gov-stat-label">상임위 질의</div>
                            </div>
                        </div>
                    </div>
                    
                    <h4 class="font-semibold mb-3">최근 발언</h4>
                    <div class="space-y-3">
                        <div class="activity-item">
                            <div class="activity-icon bg-blue-50">
                                <i class="fas fa-microphone text-blue-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">5분 자유발언</div>
                                <div class="activity-desc">청년 주거안정 특별법안 제정 촉구</div>
                                <div class="activity-date">2024.01.15 본회의</div>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-icon bg-purple-50">
                                <i class="fas fa-question-circle text-purple-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">대정부 질문</div>
                                <div class="activity-desc">교육부 - AI 교육 정책 관련</div>
                                <div class="activity-date">2024.01.10 교육위원회</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Load Committee Members Page
    loadCommitteeMembersPage: function() {
        const html = `
            <div class="page-container">
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">상임위 의원조회</h3>
                    
                    <div class="mb-4">
                        <select class="w-full p-2 border border-gray-300 rounded" onchange="app.filterCommitteeMembers(this.value)">
                            <option value="education">교육위원회</option>
                            <option value="budget">예산결산특별위원회</option>
                            <option value="justice">법제사법위원회</option>
                            <option value="admin">행정안전위원회</option>
                        </select>
                    </div>
                    
                    <div class="space-y-3" id="committeeMembers">
                        <div class="member-item">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i class="fas fa-user text-blue-600"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="font-medium">김영수 <span class="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">위원장</span></div>
                                    <div class="text-sm text-gray-600">국민의힘 • 서울 강남구갑</div>
                                </div>
                                <button class="text-blue-600 text-sm">연락</button>
                            </div>
                        </div>
                        <div class="member-item">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <i class="fas fa-user text-green-600"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="font-medium">이민호</div>
                                    <div class="text-sm text-gray-600">더불어민주당 • 부산 해운대구을</div>
                                </div>
                                <button class="text-blue-600 text-sm">연락</button>
                            </div>
                        </div>
                        <div class="member-item">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <i class="fas fa-user text-purple-600"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="font-medium">박수진</div>
                                    <div class="text-sm text-gray-600">국민의힘 • 경기 성남시분당구갑</div>
                                </div>
                                <button class="text-blue-600 text-sm">연락</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Load Staff Directory Page
    loadStaffDirectoryPage: function() {
        const html = `
            <div class="page-container">
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">의회사무처</h3>
                    
                    <div class="space-y-4">
                        <div class="staff-department">
                            <h4 class="font-semibold text-lg mb-3">주요 부서</h4>
                            <div class="space-y-3">
                                <div class="staff-item">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="font-medium">의사국</div>
                                            <div class="text-sm text-gray-600">본회의 및 위원회 운영</div>
                                        </div>
                                        <div class="text-right text-sm">
                                            <div class="text-blue-600">02-788-2100</div>
                                            <div class="text-gray-500">국회의사당 2층</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="staff-item">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="font-medium">법제예산정책처</div>
                                            <div class="text-sm text-gray-600">법제 및 예산 지원</div>
                                        </div>
                                        <div class="text-right text-sm">
                                            <div class="text-blue-600">02-788-4000</div>
                                            <div class="text-gray-500">국회의사당 별관</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="staff-item">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <div class="font-medium">국정감사관</div>
                                            <div class="text-sm text-gray-600">국정감사 및 조사</div>
                                        </div>
                                        <div class="text-right text-sm">
                                            <div class="text-blue-600">02-788-3000</div>
                                            <div class="text-gray-500">국회의사당 3층</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="staff-department">
                            <h4 class="font-semibold text-lg mb-3">편의시설</h4>
                            <div class="grid grid-cols-2 gap-3 text-sm">
                                <div>• 의원식당: 02-788-2900</div>
                                <div>• 우체국: 02-788-2950</div>
                                <div>• 은행: 02-788-2960</div>
                                <div>• 이발소: 02-788-2970</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Load Education Page
    loadEducationPage: function() {
        const html = `
            <div class="page-container">
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">교육 이수</h3>
                    
                    <div class="education-progress mb-4">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium">의무교육 이수율</span>
                            <span class="text-sm font-semibold text-green-600">85%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-green-500 h-2 rounded-full" style="width: 85%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">12개 과정 중 10개 완료</div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="education-item">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="font-medium">국회의원 기본과정</div>
                                    <div class="text-sm text-gray-600">의정활동 기초 및 윤리</div>
                                    <div class="text-xs text-gray-500">2024.05.30 이수</div>
                                </div>
                                <div class="text-center">
                                    <span class="gov-badge gov-badge-active">완료</span>
                                    <div class="text-xs text-green-600 mt-1">98점</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="education-item">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="font-medium">법안 발의 실무</div>
                                    <div class="text-sm text-gray-600">입법 과정 및 실무</div>
                                    <div class="text-xs text-gray-500">2024.06.15 이수</div>
                                </div>
                                <div class="text-center">
                                    <span class="gov-badge gov-badge-active">완료</span>
                                    <div class="text-xs text-green-600 mt-1">95점</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="education-item">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="font-medium">AI 시대 교육정책</div>
                                    <div class="text-sm text-gray-600">디지털 전환과 교육</div>
                                    <div class="text-xs text-orange-600">진행중 (70%)</div>
                                </div>
                                <div class="text-center">
                                    <span class="gov-badge bg-orange-100 text-orange-700">진행중</span>
                                    <button class="text-xs text-blue-600 mt-1">계속하기</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="education-item">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="font-medium">예산 심사 과정</div>
                                    <div class="text-sm text-gray-600">국가예산 분석 및 심사</div>
                                    <div class="text-xs text-gray-500">미이수</div>
                                </div>
                                <div class="text-center">
                                    <span class="gov-badge bg-gray-100 text-gray-700">대기</span>
                                    <button class="text-xs text-blue-600 mt-1">신청하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Load Budget Page
    loadBudgetPage: function() {
        const html = `
            <div class="page-container">
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">예산 심사</h3>
                    
                    <div class="grid grid-cols-2 gap-3 mb-4">
                        <div class="text-center p-3 bg-blue-50 rounded">
                            <div class="text-xl font-bold text-blue-600">15건</div>
                            <div class="text-xs text-gray-600">심사 완료</div>
                        </div>
                        <div class="text-center p-3 bg-orange-50 rounded">
                            <div class="text-xl font-bold text-orange-600">3건</div>
                            <div class="text-xs text-gray-600">심사 중</div>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="budget-item">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="font-medium">2025년 교육부 예산</div>
                                    <div class="text-sm text-gray-600">105조 2,000억원</div>
                                    <div class="text-xs text-gray-500">예산결산특별위원회</div>
                                </div>
                                <div class="text-center">
                                    <span class="gov-badge bg-orange-100 text-orange-700">심사중</span>
                                    <button class="text-xs text-blue-600 mt-1">상세보기</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="budget-item">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="font-medium">AI 교육 특별예산</div>
                                    <div class="text-sm text-gray-600">2조 5,000억원</div>
                                    <div class="text-xs text-gray-500">교육위원회</div>
                                </div>
                                <div class="text-center">
                                    <span class="gov-badge gov-badge-active">승인</span>
                                    <div class="text-xs text-green-600 mt-1">2024.12.20</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="budget-item">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="font-medium">청소년 복지 예산</div>
                                    <div class="text-sm text-gray-600">8,500억원</div>
                                    <div class="text-xs text-gray-500">교육위원회</div>
                                </div>
                                <div class="text-center">
                                    <span class="gov-badge gov-badge-active">승인</span>
                                    <div class="text-xs text-green-600 mt-1">2024.11.15</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Load Report Page
    loadReportPage: function() {
        const html = `
            <div class="page-container">
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">통계 분석</h3>
                    
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="stat-card bg-blue-50 p-4 rounded-lg text-center">
                            <div class="text-2xl font-bold text-blue-600">${this.memberData.attendanceRate.plenary}%</div>
                            <div class="text-sm text-blue-600">본회의 출석률</div>
                            <div class="text-xs text-gray-500">전체 평균: 94.2%</div>
                            <div class="text-xs text-green-600">+4.3%p ↑</div>
                        </div>
                        <div class="stat-card bg-green-50 p-4 rounded-lg text-center">
                            <div class="text-2xl font-bold text-green-600">${this.memberData.bills}</div>
                            <div class="text-sm text-green-600">발의 법안</div>
                            <div class="text-xs text-gray-500">전체 평균: 18건</div>
                            <div class="text-xs text-green-600">+14건 ↑</div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 class="font-medium mb-3">의정활동 지수</h4>
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm">종합 평가</span>
                            <span class="text-lg font-bold text-green-600">우수</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-green-500 h-3 rounded-full" style="width: 88%"></div>
                        </div>
                        <div class="text-xs text-gray-600 mt-2">
                            상위 12% (전체 300명 중 36위)
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-sm">출석률</span>
                            <div class="flex items-center">
                                <div class="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: 98.5%"></div>
                                </div>
                                <span class="text-sm font-medium">98.5%</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm">법안 발의 활동</span>
                            <div class="flex items-center">
                                <div class="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: 85%"></div>
                                </div>
                                <span class="text-sm font-medium">우수</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm">민원 처리</span>
                            <div class="flex items-center">
                                <div class="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                    <div class="bg-purple-500 h-2 rounded-full" style="width: 94%"></div>
                                </div>
                                <span class="text-sm font-medium">94%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button class="btn-primary w-full" onclick="app.generateReport()">
                    <i class="fas fa-download mr-2"></i>상세 보고서 다운로드
                </button>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Load Settings Page
    loadSettingsPage: function() {
        const html = `
            <div class="page-container">
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">환경 설정</h3>
                    
                    <div class="space-y-4">
                        <div class="setting-group">
                            <h4 class="font-medium mb-3">알림 설정</h4>
                            <div class="space-y-3">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">회의 일정 알림</span>
                                    <label class="switch">
                                        <input type="checkbox" checked>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">법안 상태 변경 알림</span>
                                    <label class="switch">
                                        <input type="checkbox" checked>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-sm">신규 민원 알림</span>
                                    <label class="switch">
                                        <input type="checkbox">
                                        <span class="slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="setting-group">
                            <h4 class="font-medium mb-3">보안 설정</h4>
                            <div class="space-y-3">
                                <button class="w-full text-left p-3 border border-gray-300 rounded-lg">
                                    <div class="font-medium">비밀번호 변경</div>
                                    <div class="text-sm text-gray-600">마지막 변경: 2024.12.15</div>
                                </button>
                                <button class="w-full text-left p-3 border border-gray-300 rounded-lg">
                                    <div class="font-medium">생체 인증 설정</div>
                                    <div class="text-sm text-gray-600">지문, 얼굴 인식</div>
                                </button>
                            </div>
                        </div>
                        
                        <div class="setting-group">
                            <h4 class="font-medium mb-3">앱 정보</h4>
                            <div class="space-y-2 text-sm text-gray-600">
                                <div>버전: 1.0.0</div>
                                <div>마지막 업데이트: 2025.01.16</div>
                                <div>개발: 국회사무처 디지털정보팀</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button class="btn-secondary w-full mb-2">
                    <i class="fas fa-sign-out-alt mr-2"></i>로그아웃
                </button>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Load Civil Page
    loadCivilPage: function() {
        const html = `
            <div class="page-container">
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">민원 처리 현황</h3>
                    
                    <div class="attendance-summary mb-4">
                        <div class="attendance-stat">
                            <div class="attendance-label">처리율</div>
                            <div class="attendance-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 94%"></div>
                                </div>
                                <span class="progress-text">94%</span>
                            </div>
                            <div class="attendance-detail">처리 233건 / 접수 ${this.memberData.civilComplaints}건</div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-2 mb-4">
                        <div class="text-center p-3 bg-green-50 rounded">
                            <div class="text-xl font-bold text-green-600">233</div>
                            <div class="text-xs">처리완료</div>
                        </div>
                        <div class="text-center p-3 bg-orange-50 rounded">
                            <div class="text-xl font-bold text-orange-600">15</div>
                            <div class="text-xs">처리중</div>
                        </div>
                        <div class="text-center p-3 bg-blue-50 rounded">
                            <div class="text-xl font-bold text-blue-600">3</div>
                            <div class="text-xs">신규접수</div>
                        </div>
                    </div>
                    
                    <h4 class="font-semibold mb-3">민원 목록</h4>
                    <div class="space-y-3">
                        <div class="activity-item">
                            <div class="activity-content">
                                <div class="activity-title">교통체계 개선 요청</div>
                                <div class="activity-desc">강남구 테헤란로 일대 • #교통체증 #신호체계</div>
                                <div class="activity-date">2025-01-10 접수 • 우선순위: 높음</div>
                            </div>
                            <div class="flex flex-col items-end">
                                <span class="gov-badge bg-blue-100 text-blue-700">처리중</span>
                                <span class="text-xs text-gray-500 mt-1">45%</span>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-content">
                                <div class="activity-title">학교 시설 개선 요청</div>
                                <div class="activity-desc">강남초등학교 체육관 • #학교시설 #안전</div>
                                <div class="activity-date">2025-01-08 접수 • 우선순위: 매우높음</div>
                            </div>
                            <div class="flex flex-col items-end">
                                <span class="gov-badge gov-badge-active">완료</span>
                                <span class="text-xs text-gray-500 mt-1">100%</span>
                            </div>
                        </div>
                        
                        <div class="activity-item">
                            <div class="activity-content">
                                <div class="activity-title">노인복지센터 프로그램 확대</div>
                                <div class="activity-desc">강남구 일원동 • #노인복지 #문화프로그램</div>
                                <div class="activity-date">2025-01-15 접수 • 우선순위: 보통</div>
                            </div>
                            <div class="flex flex-col items-end">
                                <span class="gov-badge bg-gray-100 text-gray-700">접수</span>
                                <span class="text-xs text-gray-500 mt-1">5%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button class="btn-primary w-full">
                    <i class="fas fa-plus mr-2"></i>민원 등록
                </button>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Show Placeholder Page
    showPlaceholderPage: function(title, icon) {
        const html = `
            <div class="page-container">
                <div class="gov-card text-center py-8">
                    <div class="text-4xl text-gray-400 mb-4">
                        <i class="fas fa-${icon}"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-700 mb-2">${title}</h3>
                    <p class="text-gray-500 mb-4">이 기능은 개발 중입니다.</p>
                    <button class="btn-primary" onclick="app.navigateTo('home')">
                        <i class="fas fa-home mr-2"></i>홈으로 돌아가기
                    </button>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Initialize Monthly Chart
    initMonthlyChart: function() {
        const canvas = document.getElementById('monthlyChart');
        if (canvas && typeof Chart !== 'undefined') {
            const ctx = canvas.getContext('2d');
            
            // 기존 차트가 있다면 제거
            if (this.monthlyChart && typeof this.monthlyChart.destroy === 'function') {
                this.monthlyChart.destroy();
            }
            
            this.monthlyChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월'],
                    datasets: [{
                        label: '본회의 출석',
                        data: [8, 12, 10, 15, 18, 14, 16, 20],
                        borderColor: '#0056b3',
                        backgroundColor: 'rgba(0, 86, 179, 0.1)',
                        tension: 0.4
                    }, {
                        label: '법안 발의',
                        data: [2, 4, 3, 6, 5, 4, 6, 8],
                        borderColor: '#16a34a',
                        backgroundColor: 'rgba(22, 163, 74, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    },
    
    // Initialize QR Code
    initQRCode: function() {
        const qrContainer = document.getElementById('qrcode');
        if (qrContainer) {
            // QRious가 로드되지 않은 경우 대체 QR 코드 생성
            if (typeof QRious !== 'undefined') {
                try {
                    const canvas = document.createElement('canvas');
                    qrContainer.appendChild(canvas);
                    
                    const qr = new QRious({
                        element: canvas,
                        size: 104,
                        value: `https://assembly.gov.kr/verify/${this.memberData.memberId}-${Date.now()}`,
                        foreground: '#1e40af',
                        background: '#ffffff',
                        backgroundAlpha: 1,
                        foregroundAlpha: 1,
                        level: 'M'
                    });
                    
                    console.log('QR 코드 생성 완료');
                } catch (error) {
                    console.log('QR 코드 생성 실패, 대체 이미지 사용');
                    this.createFallbackQR(qrContainer);
                }
            } else {
                console.log('QRious 라이브러리 없음, 대체 이미지 사용');
                this.createFallbackQR(qrContainer);
            }
        }
    },
    
    // Create Fallback QR Code
    createFallbackQR: function(container) {
        const qrSvg = `
            <svg width="104" height="104" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                <rect width="25" height="25" fill="white"/>
                <g fill="#1e40af">
                    <rect x="0" y="0" width="7" height="7"/>
                    <rect x="2" y="2" width="3" height="3" fill="white"/>
                    <rect x="18" y="0" width="7" height="7"/>
                    <rect x="20" y="2" width="3" height="3" fill="white"/>
                    <rect x="0" y="18" width="7" height="7"/>
                    <rect x="2" y="20" width="3" height="3" fill="white"/>
                    <rect x="8" y="8" width="9" height="9"/>
                    <rect x="10" y="10" width="5" height="5" fill="white"/>
                    <rect x="12" y="12" width="1" height="1"/>
                    <!-- QR pattern -->
                    <rect x="8" y="0" width="1" height="1"/>
                    <rect x="10" y="0" width="1" height="1"/>
                    <rect x="12" y="0" width="1" height="1"/>
                    <rect x="14" y="0" width="1" height="1"/>
                    <rect x="16" y="0" width="1" height="1"/>
                </g>
            </svg>
        `;
        container.innerHTML = qrSvg;
    },
    
    // Initialize Real Time Updates
    initRealTime: function() {
        const updateTime = () => {
            const now = new Date();
            const timeStr = now.toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            
            const timeElement = document.getElementById('current-time');
            if (timeElement) {
                timeElement.textContent = timeStr;
            }
            
            // 마지막 인증 시간 업데이트
            const lastAuthElement = document.getElementById('last-auth');
            if (lastAuthElement) {
                lastAuthElement.textContent = '방금 전 (실시간 인증)';
            }
        };
        
        updateTime();
        // 실시간 시계 인터벌
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
        this.timeInterval = setInterval(updateTime, 1000);
        
        console.log('실시간 시계 시작됨');
    },
    
    // Utility Functions
    showCommitteeInfo: function() {
        const modalHtml = `
            <div class="committee-modal-overlay" onclick="this.remove()">
                <div class="committee-modal" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">교육위원회</h3>
                        <button class="text-gray-400 hover:text-gray-600 text-xl" onclick="this.closest('.committee-modal-overlay').remove()">×</button>
                    </div>
                    <div class="space-y-4">
                        <div class="bg-blue-50 p-3 rounded-lg">
                            <div class="font-medium text-blue-800">위원장: 김영수 의원</div>
                            <div class="text-sm text-blue-600">임기: 2024.06 ~ 2026.05</div>
                        </div>
                        <div>
                            <h4 class="font-medium mb-2">구성 현황</h4>
                            <div class="text-sm text-gray-600">
                                <div>• 총 15명 (여당 8명, 야당 7명)</div>
                                <div>• 소관 부처: 교육부, 과학기술정보통신부</div>
                                <div>• 주요 업무: 교육정책, 과학기술진흥, 청소년 정책</div>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-medium mb-2">최근 주요 안건</h4>
                            <div class="space-y-1 text-sm">
                                <div>• AI 교육 활성화 방안 논의</div>
                                <div>• 대학 등록금 지원 확대</div>
                                <div>• 청소년 온라인 안전 대책</div>
                            </div>
                        </div>
                    </div>
                    <button class="btn-primary w-full mt-4" onclick="this.closest('.committee-modal-overlay').remove()">
                        확인
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },
    
    showAllActivities: function() {
        const modalHtml = `
            <div class="activities-modal-overlay" onclick="this.remove()">
                <div class="activities-modal" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">전체 의정활동</h3>
                        <button class="text-gray-400 hover:text-gray-600 text-xl" onclick="this.closest('.activities-modal-overlay').remove()">×</button>
                    </div>
                    <div class="space-y-3 max-h-96 overflow-y-auto">
                        <div class="activity-item">
                            <div class="activity-icon bg-blue-50">
                                <i class="fas fa-microphone text-blue-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">5분 자유발언</div>
                                <div class="activity-desc">청년 주거안정 특별법안 제정 촉구</div>
                                <div class="activity-date">2025.01.15 14:30</div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon bg-green-50">
                                <i class="fas fa-file-signature text-green-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">법안 발의</div>
                                <div class="activity-desc">주택임대차보호법 일부개정법률안</div>
                                <div class="activity-date">2025.01.12 10:00</div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon bg-orange-50">
                                <i class="fas fa-envelope-open text-orange-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">민원 답변</div>
                                <div class="activity-desc">강남구 교통체계 개선 요청 건</div>
                                <div class="activity-date">2025.01.10 16:45</div>
                            </div>
                        </div>
                    </div>
                    <button class="btn-primary w-full mt-4" onclick="this.closest('.activities-modal-overlay').remove()">
                        확인
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },
    
    showActivityDetail: function(type, id) {
        const activities = {
            'speech': {
                1: { title: '5분 자유발언', content: '청년 주거안정 특별법안 제정 촉구', date: '2025.01.15', location: '본회의장' }
            },
            'bill': {
                2: { title: '법안 발의', content: '주택임대차보호법 일부개정법률안', date: '2025.01.12', status: '법제사법위원회 심사 중' }
            },
            'civil': {
                3: { title: '민원 답변', content: '강남구 교통체계 개선 요청 건', date: '2025.01.10', status: '처리완료' }
            }
        };
        
        const activity = activities[type]?.[id] || { title: '활동 정보', content: '상세 내용을 불러올 수 없습니다.' };
        
        const modalHtml = `
            <div class="activity-detail-overlay" onclick="this.remove()">
                <div class="activity-detail-modal" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">${activity.title}</h3>
                        <button class="text-gray-400 hover:text-gray-600 text-xl" onclick="this.closest('.activity-detail-overlay').remove()">×</button>
                    </div>
                    <div class="space-y-3">
                        <div><strong>내용:</strong> ${activity.content}</div>
                        <div><strong>날짜:</strong> ${activity.date}</div>
                        ${activity.location ? `<div><strong>장소:</strong> ${activity.location}</div>` : ''}
                        ${activity.status ? `<div><strong>상태:</strong> ${activity.status}</div>` : ''}
                    </div>
                    <button class="btn-primary w-full mt-4" onclick="this.closest('.activity-detail-overlay').remove()">
                        확인
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },
    
    generateReport: function() {
        const modalHtml = `
            <div class="report-modal-overlay" onclick="this.remove()">
                <div class="report-modal" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">의정활동 보고서 생성</h3>
                        <button class="text-gray-400 hover:text-gray-600 text-xl" onclick="this.closest('.report-modal-overlay').remove()">×</button>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">보고서 기간</label>
                            <select class="w-full p-2 border border-gray-300 rounded">
                                <option>최근 1개월</option>
                                <option>최근 3개월</option>
                                <option>최근 6개월</option>
                                <option>전체 기간</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">포함할 내용</label>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input type="checkbox" checked class="mr-2"> 출석 현황
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" checked class="mr-2"> 법안 발의
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" checked class="mr-2"> 발언 기록
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" checked class="mr-2"> 민원 처리
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2 mt-6">
                        <button class="btn-secondary flex-1" onclick="this.closest('.report-modal-overlay').remove()">
                            취소
                        </button>
                        <button class="btn-primary flex-1" onclick="app.downloadReport(); this.closest('.report-modal-overlay').remove();">
                            <i class="fas fa-download mr-2"></i>생성
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },
    
    downloadReport: function() {
        // 실제로는 PDF 생성 로직이 들어갈 것
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = '보고서가 생성되었습니다.';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },
    
    showSchedule: function() {
        const modalHtml = `
            <div class="schedule-modal-overlay" onclick="this.remove()">
                <div class="schedule-modal" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">일정표</h3>
                        <button class="text-gray-400 hover:text-gray-600 text-xl" onclick="this.closest('.schedule-modal-overlay').remove()">×</button>
                    </div>
                    <div class="space-y-3 max-h-96 overflow-y-auto">
                        <div class="schedule-item">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="font-medium">본회의</div>
                                    <div class="text-sm text-gray-600">제398회 국회(임시회) 제4차</div>
                                </div>
                                <div class="text-right text-sm">
                                    <div>01.18 (목)</div>
                                    <div class="text-blue-600">14:00</div>
                                </div>
                            </div>
                        </div>
                        <div class="schedule-item">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="font-medium">교육위원회</div>
                                    <div class="text-sm text-gray-600">법안심사소위원회</div>
                                </div>
                                <div class="text-right text-sm">
                                    <div>01.19 (금)</div>
                                    <div class="text-blue-600">10:00</div>
                                </div>
                            </div>
                        </div>
                        <div class="schedule-item">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="font-medium">예산결산특별위원회</div>
                                    <div class="text-sm text-gray-600">2025년 예산 검토</div>
                                </div>
                                <div class="text-right text-sm">
                                    <div>01.22 (월)</div>
                                    <div class="text-blue-600">15:30</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn-primary w-full mt-4" onclick="this.closest('.schedule-modal-overlay').remove()">
                        확인
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },
    
    showMeetings: function() {
        const modalHtml = `
            <div class="meetings-modal-overlay" onclick="this.remove()">
                <div class="meetings-modal" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">회의 일정</h3>
                        <button class="text-gray-400 hover:text-gray-600 text-xl" onclick="this.closest('.meetings-modal-overlay').remove()">×</button>
                    </div>
                    <div class="space-y-3 max-h-96 overflow-y-auto">
                        <div class="meeting-item">
                            <div class="flex items-start gap-3">
                                <div class="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                                <div class="flex-1">
                                    <div class="font-medium">긴급 당대표 회의</div>
                                    <div class="text-sm text-gray-600">정책 현안 논의</div>
                                    <div class="text-xs text-red-600 mt-1">오늘 16:00 | 국회 당사 회의실</div>
                                </div>
                            </div>
                        </div>
                        <div class="meeting-item">
                            <div class="flex items-start gap-3">
                                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                <div class="flex-1">
                                    <div class="font-medium">교육정책 간담회</div>
                                    <div class="text-sm text-gray-600">AI 교육 도입 방안</div>
                                    <div class="text-xs text-blue-600 mt-1">01.17 (수) 10:00 | 교육위원회실</div>
                                </div>
                            </div>
                        </div>
                        <div class="meeting-item">
                            <div class="flex items-start gap-3">
                                <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                <div class="flex-1">
                                    <div class="font-medium">지역구 현안 회의</div>
                                    <div class="text-sm text-gray-600">강남구 교통 문제</div>
                                    <div class="text-xs text-green-600 mt-1">01.20 (토) 14:00 | 지역사무소</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn-primary w-full mt-4" onclick="this.closest('.meetings-modal-overlay').remove()">
                        확인
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },
    
    showStatistics: function() {
        const modalHtml = `
            <div class="statistics-modal-overlay" onclick="this.remove()">
                <div class="statistics-modal" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">통계 분석</h3>
                        <button class="text-gray-400 hover:text-gray-600 text-xl" onclick="this.closest('.statistics-modal-overlay').remove()">×</button>
                    </div>
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-blue-50 p-3 rounded-lg text-center">
                                <div class="text-2xl font-bold text-blue-600">98.5%</div>
                                <div class="text-xs text-blue-600">출석률</div>
                                <div class="text-xs text-gray-500">전체 평균: 94.2%</div>
                            </div>
                            <div class="bg-green-50 p-3 rounded-lg text-center">
                                <div class="text-2xl font-bold text-green-600">32건</div>
                                <div class="text-xs text-green-600">법안 발의</div>
                                <div class="text-xs text-gray-500">전체 평균: 18건</div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="text-sm">활동 지수</span>
                                <span class="text-sm font-semibold text-green-600">우수</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: 85%"></div>
                            </div>
                        </div>
                        <div class="text-xs text-gray-600">
                            * 의정활동 지수는 출석률, 발의 건수, 발언 횟수, 민원 처리율을 종합하여 산출됩니다.
                        </div>
                    </div>
                    <button class="btn-primary w-full mt-4" onclick="this.closest('.statistics-modal-overlay').remove()">
                        확인
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },
    
    showHelp: function() {
        const modalHtml = `
            <div class="help-modal-overlay" onclick="this.remove()">
                <div class="help-modal" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">도움말</h3>
                        <button class="text-gray-400 hover:text-gray-600 text-xl" onclick="this.closest('.help-modal-overlay').remove()">×</button>
                    </div>
                    <div class="space-y-4 max-h-96 overflow-y-auto">
                        <div class="help-section">
                            <h4 class="font-medium mb-2">주요 기능</h4>
                            <ul class="text-sm text-gray-600 space-y-1">
                                <li>• 의정활동 통계 및 현황 조회</li>
                                <li>• 디지털 신분증 및 QR 인증</li>
                                <li>• 출석, 법안, 발언, 민원 관리</li>
                                <li>• 일정 및 회의 관리</li>
                            </ul>
                        </div>
                        <div class="help-section">
                            <h4 class="font-medium mb-2">사용법</h4>
                            <ul class="text-sm text-gray-600 space-y-1">
                                <li>• 메뉴 버튼으로 전체 메뉴 접근</li>
                                <li>• 하단 네비게이션으로 주요 기능 바로가기</li>
                                <li>• 통계 카드 클릭으로 상세 정보 확인</li>
                            </ul>
                        </div>
                        <div class="help-section">
                            <h4 class="font-medium mb-2">문의처</h4>
                            <div class="text-sm text-gray-600">
                                <div>전화: 02-784-xxxx</div>
                                <div>이메일: support@assembly.go.kr</div>
                            </div>
                        </div>
                    </div>
                    <button class="btn-primary w-full mt-4" onclick="this.closest('.help-modal-overlay').remove()">
                        확인
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },
    
    showNotifications: function() {
        const modalHtml = `
            <div class="notifications-modal-overlay" onclick="this.remove()">
                <div class="notifications-modal" onclick="event.stopPropagation()">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold">알림 <span class="text-sm bg-red-500 text-white px-2 py-1 rounded-full">3</span></h3>
                        <button class="text-gray-400 hover:text-gray-600 text-xl" onclick="this.closest('.notifications-modal-overlay').remove()">×</button>
                    </div>
                    <div class="space-y-3 max-h-96 overflow-y-auto">
                        <div class="notification-item bg-blue-50 border-l-4 border-blue-500 p-3">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="font-medium text-blue-800">본회의 일정 변경</div>
                                    <div class="text-sm text-blue-600 mt-1">제398회 국회 제4차 본회의가 01.18(목) 14:00로 변경되었습니다.</div>
                                    <div class="text-xs text-gray-500 mt-2">2시간 전</div>
                                </div>
                                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                        </div>
                        <div class="notification-item bg-green-50 border-l-4 border-green-500 p-3">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="font-medium text-green-800">법안 가결</div>
                                    <div class="text-sm text-green-600 mt-1">주택임대차보호법 일부개정법률안이 법제사법위원회를 통과했습니다.</div>
                                    <div class="text-xs text-gray-500 mt-2">1일 전</div>
                                </div>
                                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                        <div class="notification-item bg-orange-50 border-l-4 border-orange-500 p-3">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="font-medium text-orange-800">신규 민원 접수</div>
                                    <div class="text-sm text-orange-600 mt-1">강남구 교통체계 개선 관련 민원이 접수되었습니다.</div>
                                    <div class="text-xs text-gray-500 mt-2">2일 전</div>
                                </div>
                                <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <button class="btn-primary w-full mt-4" onclick="this.closest('.notifications-modal-overlay').remove()">
                        모두 읽음 처리
                    </button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },
    
    verifyIdentity: function() {
        const modalHtml = `
            <div class="identity-modal-overlay" onclick="this.remove()">
                <div class="identity-modal" onclick="event.stopPropagation()">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-fingerprint text-blue-600 text-2xl"></i>
                        </div>
                        <h3 class="text-lg font-bold mb-2">생체 인증</h3>
                        <p class="text-gray-600 mb-6">지문을 센서에 올려주세요</p>
                        <div class="fingerprint-animation mb-6">
                            <div class="w-20 h-20 border-4 border-blue-200 rounded-full flex items-center justify-center mx-auto animate-pulse">
                                <i class="fas fa-fingerprint text-blue-400 text-2xl"></i>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <button class="btn-primary w-full" onclick="app.completeVerification(); this.closest('.identity-modal-overlay').remove();">
                                <i class="fas fa-check mr-2"></i>인증 완료 (시뮬레이션)
                            </button>
                            <button class="btn-secondary w-full" onclick="this.closest('.identity-modal-overlay').remove()">
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },
    
    completeVerification: function() {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = '<i class="fas fa-check mr-2"></i>생체 인증이 완료되었습니다.';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },
    
    shareDigitalId: function() {
        if (navigator.share) {
            navigator.share({
                title: '디지털 의원 신분증',
                text: '김영수 의원 (국민의힘, 경기도의회)',
                url: window.location.href
            });
        } else {
            // 클립보드 복사 대체
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.innerHTML = '<i class="fas fa-copy mr-2"></i>링크가 클립보드에 복사되었습니다.';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
            });
        }
    },

    // Show Press Releases
    showPressReleases: function() {
        const html = `
            <div class="page-container">
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">보도자료 관리</h3>
                    
                    <!-- 검색 및 필터 -->
                    <div class="flex items-center gap-2 mb-4">
                        <div class="flex-1 relative">
                            <input type="text" placeholder="보도자료 검색" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm">
                            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                        <button class="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                            <i class="fas fa-plus mr-1"></i>작성
                        </button>
                    </div>
                    
                    <!-- 보도자료 목록 -->
                    <div class="space-y-3">
                        <div class="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer" onclick="app.showPressReleaseDetail('2025-001')">
                            <div class="flex items-start justify-between mb-2">
                                <span class="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">배포완료</span>
                                <span class="text-xs text-gray-500">2025.01.15 14:30</span>
                            </div>
                            <h4 class="font-semibold text-sm mb-1">김영수 의원, 청년 주거안정 특별법안 대표발의</h4>
                            <p class="text-xs text-gray-600 line-clamp-2">
                                경기도의회 김영수 의원(국민의힘, 수원시 제1선거구)은 청년층의 주거 안정을 위한 특별법안을 대표발의했다고 15일 밝혔다...
                            </p>
                            <div class="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                <span><i class="fas fa-eye mr-1"></i>조회 523</span>
                                <span><i class="fas fa-newspaper mr-1"></i>언론보도 12건</span>
                                <span><i class="fas fa-share-alt mr-1"></i>공유 45</span>
                            </div>
                        </div>
                        
                        <div class="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer" onclick="app.showPressReleaseDetail('2025-002')">
                            <div class="flex items-start justify-between mb-2">
                                <span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">예정</span>
                                <span class="text-xs text-gray-500">2025.01.18 10:00</span>
                            </div>
                            <h4 class="font-semibold text-sm mb-1">교육위원회, 학교폭력 예방 종합대책 발표 예정</h4>
                            <p class="text-xs text-gray-600 line-clamp-2">
                                경기도의회 교육위원회는 오는 18일 학교폭력 예방을 위한 종합대책을 발표할 예정이다...
                            </p>
                            <div class="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                <span><i class="fas fa-clock mr-1"></i>예약배포</span>
                                <button class="text-blue-600"><i class="fas fa-edit mr-1"></i>수정</button>
                            </div>
                        </div>
                        
                        <div class="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer" onclick="app.showPressReleaseDetail('2025-003')">
                            <div class="flex items-start justify-between mb-2">
                                <span class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">임시저장</span>
                                <span class="text-xs text-gray-500">2025.01.14 16:20</span>
                            </div>
                            <h4 class="font-semibold text-sm mb-1">도정질문 관련 보도자료 (작성중)</h4>
                            <p class="text-xs text-gray-600 line-clamp-2">
                                경기도 교육청의 학생 안전 대책에 대한 도정질문 내용 정리중...
                            </p>
                            <div class="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                <button class="text-blue-600"><i class="fas fa-edit mr-1"></i>계속 작성</button>
                                <button class="text-red-600"><i class="fas fa-trash mr-1"></i>삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 언론 모니터링 -->
                <div class="gov-card">
                    <h4 class="font-semibold mb-3">언론 보도 현황</h4>
                    <div class="space-y-2">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-600">오늘 보도</span>
                            <span class="font-semibold">3건</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-600">이번 주 보도</span>
                            <span class="font-semibold">12건</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-600">이번 달 보도</span>
                            <span class="font-semibold">45건</span>
                        </div>
                    </div>
                    <button class="btn-secondary w-full mt-3" onclick="app.showMediaMonitoring()">
                        <i class="fas fa-chart-line mr-2"></i>상세 분석
                    </button>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },

    // Show Quick Contacts
    showQuickContacts: function() {
        const html = `
            <div class="page-container">
                <!-- 즐겨찾기 연락처 -->
                <div class="gov-card mb-4">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="gov-title">즐겨찾기 연락처</h3>
                        <button class="text-blue-600 text-sm" onclick="app.manageContacts()">
                            <i class="fas fa-cog"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-2">
                        <div class="contact-item" onclick="app.callContact('031-123-4567')">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <i class="fas fa-building text-blue-600"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="font-medium text-sm">교육정책과</div>
                                    <div class="text-xs text-gray-600">과장 박정훈</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-xs text-gray-500">031-123-4567</div>
                                    <div class="flex gap-2 mt-1">
                                        <i class="fas fa-phone text-green-500 text-xs"></i>
                                        <i class="fas fa-comment text-blue-500 text-xs"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 text-xs text-gray-500 italic">
                                "학교폭력 예방 프로그램 담당"
                            </div>
                        </div>
                        
                        <div class="contact-item" onclick="app.callContact('031-234-5678')">
                            <div class="flex items-center">
                                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <i class="fas fa-user-tie text-green-600"></i>
                                </div>
                                <div class="flex-1">
                                    <div class="font-medium text-sm">주택정책과</div>
                                    <div class="text-xs text-gray-600">과장 이민수</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-xs text-gray-500">031-234-5678</div>
                                    <div class="flex gap-2 mt-1">
                                        <i class="fas fa-phone text-green-500 text-xs"></i>
                                        <i class="fas fa-comment text-blue-500 text-xs"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 text-xs text-gray-500 italic">
                                "청년 주거 정책 총괄"
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 자주 연락한 부서 -->
                <div class="gov-card mb-4">
                    <h4 class="font-semibold mb-3">자주 연락한 부서</h4>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="p-3 bg-gray-50 rounded text-left hover:bg-gray-100">
                            <div class="text-sm font-medium">교육정책과</div>
                            <div class="text-xs text-gray-600 mt-1">최근: 2일 전</div>
                        </button>
                        <button class="p-3 bg-gray-50 rounded text-left hover:bg-gray-100">
                            <div class="text-sm font-medium">주택정책과</div>
                            <div class="text-xs text-gray-600 mt-1">최근: 3일 전</div>
                        </button>
                        <button class="p-3 bg-gray-50 rounded text-left hover:bg-gray-100">
                            <div class="text-sm font-medium">보건정책과</div>
                            <div class="text-xs text-gray-600 mt-1">최근: 1주 전</div>
                        </button>
                        <button class="p-3 bg-gray-50 rounded text-left hover:bg-gray-100">
                            <div class="text-sm font-medium">도시계획과</div>
                            <div class="text-xs text-gray-600 mt-1">최근: 2주 전</div>
                        </button>
                    </div>
                </div>
                
                <!-- 빠른 검색 -->
                <div class="gov-card">
                    <h4 class="font-semibold mb-3">직원 검색</h4>
                    <div class="relative mb-3">
                        <input type="text" placeholder="이름, 부서, 직급으로 검색" 
                               class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                        <button class="btn-secondary text-xs" onclick="app.navigateTo('committee-members')">
                            <i class="fas fa-users mr-1"></i>의원 조회
                        </button>
                        <button class="btn-secondary text-xs" onclick="app.navigateTo('staff-directory')">
                            <i class="fas fa-building mr-1"></i>의회사무처
                        </button>
                        <button class="btn-secondary text-xs" onclick="app.showExecutiveContacts()">
                            <i class="fas fa-landmark mr-1"></i>집행부
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },

    // Show Attendance Details
    showAttendanceDetail: function(date, type, sessionName) {
        const attendanceData = {
            '2024.01.15': {
                type: '본회의',
                session: '제398회 국회(임시회) 제3차',
                status: '출석',
                startTime: '14:00',
                endTime: '18:30',
                duration: '4시간 30분',
                agendas: [
                    { title: '청년 주거안정 특별법안', result: '가결', vote: '찬성' },
                    { title: '주택임대차보호법 일부개정법률안', result: '가결', vote: '찬성' },
                    { title: '도시 및 주거환경정비법 일부개정법률안', result: '부결', vote: '반대' },
                    { title: '공공주택 특별법 일부개정법률안', result: '가결', vote: '찬성' },
                    { title: '부동산 거래신고 등에 관한 법률 일부개정법률안', result: '계류', vote: '미표결' }
                ],
                speeches: ['5분 자유발언 - 청년 주거안정 대책 촉구'],
                notes: '교육위원회 위원장 자격으로 관련 법안 설명'
            },
            '2024.01.14': {
                type: '교육위원회',
                session: '법안심사소위원회',
                status: '출석',
                startTime: '10:00',
                endTime: '12:30',
                duration: '2시간 30분',
                agendas: [
                    { title: '학교폭력예방법 개정안', result: '심사중', vote: '토론참여' },
                    { title: '교육기본법 일부개정안', result: '가결', vote: '찬성' },
                    { title: '사립학교법 개정안', result: '보류', vote: '추가검토요청' }
                ],
                speeches: ['위원장 개회사', '법안 심사 총평'],
                notes: '위원장으로서 회의 주재'
            },
            '2024.01.12': {
                type: '본회의',
                session: '제398회 국회(임시회) 제2차',
                status: '청가',
                reason: '해외 의회 교류 행사 참석',
                replacement: '부위원장 대리 출석'
            }
        };

        const data = attendanceData[date] || {
            type: type || '본회의',
            session: sessionName || '회의 정보',
            status: '출석',
            startTime: '14:00',
            endTime: '17:00',
            duration: '3시간',
            agendas: [
                { title: '안건 1', result: '가결', vote: '찬성' },
                { title: '안건 2', result: '심사중', vote: '토론참여' }
            ]
        };

        let content = `
            <div class="space-y-4">
                <div class="bg-blue-50 p-3 rounded">
                    <div class="font-semibold text-blue-900">${data.session}</div>
                    <div class="text-sm text-blue-700 mt-1">${date} | ${data.type}</div>
                </div>
                
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <span class="text-gray-600">출석 상태:</span>
                        <span class="font-semibold ml-2 ${data.status === '출석' ? 'text-green-600' : 'text-orange-600'}">${data.status}</span>
                    </div>`;

        if (data.status === '출석') {
            content += `
                    <div>
                        <span class="text-gray-600">참석 시간:</span>
                        <span class="font-semibold ml-2">${data.duration}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">시작:</span>
                        <span class="ml-2">${data.startTime}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">종료:</span>
                        <span class="ml-2">${data.endTime}</span>
                    </div>
                </div>
                
                <div class="border-t pt-3">
                    <h4 class="font-semibold mb-2">심사 안건 (${data.agendas.length}건)</h4>
                    <div class="space-y-2">`;

            data.agendas.forEach(agenda => {
                const voteColor = agenda.vote === '찬성' ? 'text-green-600' : 
                                 agenda.vote === '반대' ? 'text-red-600' : 'text-gray-600';
                const resultBadge = agenda.result === '가결' ? 'bg-green-100 text-green-700' :
                                   agenda.result === '부결' ? 'bg-red-100 text-red-700' :
                                   agenda.result === '계류' ? 'bg-yellow-100 text-yellow-700' :
                                   'bg-gray-100 text-gray-700';
                
                content += `
                        <div class="bg-gray-50 p-2 rounded">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <div class="text-sm font-medium">${agenda.title}</div>
                                    <div class="flex items-center gap-3 mt-1">
                                        <span class="text-xs px-2 py-1 rounded ${resultBadge}">${agenda.result}</span>
                                        <span class="text-xs ${voteColor}">
                                            <i class="fas fa-vote-yea mr-1"></i>${agenda.vote}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            });

            content += `
                    </div>
                </div>`;

            if (data.speeches && data.speeches.length > 0) {
                content += `
                <div class="border-t pt-3">
                    <h4 class="font-semibold mb-2">발언 내용</h4>
                    <ul class="space-y-1">`;
                data.speeches.forEach(speech => {
                    content += `<li class="text-sm text-gray-600">• ${speech}</li>`;
                });
                content += `</ul></div>`;
            }

            if (data.notes) {
                content += `
                <div class="border-t pt-3">
                    <h4 class="font-semibold mb-2">비고</h4>
                    <p class="text-sm text-gray-600">${data.notes}</p>
                </div>`;
            }
        } else if (data.status === '청가') {
            content += `
                </div>
                <div class="border-t pt-3">
                    <div class="text-sm">
                        <div class="mb-2"><span class="text-gray-600">사유:</span> ${data.reason}</div>
                        <div><span class="text-gray-600">대리:</span> ${data.replacement}</div>
                    </div>
                </div>`;
        }

        content += `
                <div class="border-t pt-3">
                    <button onclick="app.downloadAttendanceRecord('${date}')" class="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
                        <i class="fas fa-download mr-2"></i>출석 기록 다운로드
                    </button>
                </div>
            </div>`;

        this.showModal('attendance-detail', {
            title: '출석 상세 정보',
            content: content,
            confirmText: '확인',
            modalClass: 'modal-scrollable'
        });
    },

    // Download Attendance Record
    downloadAttendanceRecord: function(date) {
        this.showNotification(`${date} 출석 기록을 다운로드합니다.`);
    },

    // Show Bill Detail
    showBillDetail: function(billId) {
        const billData = {
            '2024-001': {
                title: '주택임대차보호법 일부개정법률안',
                billNumber: '제2024-001호',
                type: '대표발의',
                status: '가결',
                proposer: '김영수',
                coProposers: ['이정민', '박지원', '최은영', '정태호', '김성주', '윤석열', '한동훈', '이재명', '김기현', '박찬대', '조국', '안철수', '심상정', '류호정', '용혜인'],
                proposalDate: '2024.01.12',
                committee: '법제사법위원회',
                summary: '임차인 보호 강화를 위한 계약갱신청구권 기간 연장 및 전월세 상한제 개선',
                mainContent: [
                    '계약갱신청구권 행사 기간을 현행 1회에서 2회로 확대',
                    '전월세 인상률 상한을 5%에서 2.5%로 하향 조정',
                    '임대차 분쟁조정위원회 설치 의무화',
                    '보증금 반환 지연 시 지연이자율 상향'
                ],
                timeline: [
                    { date: '2024.01.12', event: '법안 발의', status: 'completed' },
                    { date: '2024.01.15', event: '위원회 회부', status: 'completed' },
                    { date: '2024.01.20', event: '상임위 심사', status: 'completed' },
                    { date: '2024.01.25', event: '법안소위 심사', status: 'completed' },
                    { date: '2024.01.28', event: '본회의 상정', status: 'completed' },
                    { date: '2024.01.30', event: '본회의 가결', status: 'completed' }
                ],
                votes: { yes: 178, no: 42, abstain: 15 },
                documents: [
                    { name: '법안 원문', type: 'PDF', size: '2.3MB' },
                    { name: '검토보고서', type: 'PDF', size: '1.8MB' },
                    { name: '공청회 자료', type: 'PDF', size: '5.2MB' }
                ]
            }
        };

        const bill = billData[billId] || {
            title: '법안 정보',
            billNumber: billId,
            type: '발의',
            status: '심사중',
            proposer: '김영수',
            coProposers: [],
            proposalDate: '2024.01.01',
            committee: '소관위원회',
            summary: '법안 요약 정보',
            mainContent: ['주요 내용 1', '주요 내용 2'],
            timeline: [],
            votes: { yes: 0, no: 0, abstain: 0 },
            documents: []
        };

        const statusColor = bill.status === '가결' ? 'text-green-600' : 
                           bill.status === '부결' ? 'text-red-600' : 
                           bill.status === '심사중' ? 'text-blue-600' : 'text-gray-600';

        let content = `
            <div class="space-y-4" style="max-height: 70vh; overflow-y: auto;">
                <!-- 법안 헤더 -->
                <div class="bg-blue-50 p-4 rounded-lg">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="font-bold text-lg text-blue-900">${bill.title}</h3>
                            <p class="text-sm text-blue-700 mt-1">${bill.billNumber}</p>
                        </div>
                        <span class="px-3 py-1 bg-white rounded-full text-sm font-semibold ${statusColor}">
                            ${bill.status}
                        </span>
                    </div>
                </div>
                
                <!-- 발의 정보 -->
                <div class="bg-gray-50 p-3 rounded">
                    <div class="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span class="text-gray-600">발의 유형:</span>
                            <span class="font-semibold ml-2">${bill.type}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">발의일:</span>
                            <span class="font-semibold ml-2">${bill.proposalDate}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">대표발의:</span>
                            <span class="font-semibold ml-2">${bill.proposer}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">소관위:</span>
                            <span class="font-semibold ml-2">${bill.committee}</span>
                        </div>
                    </div>
                </div>
                
                <!-- 법안 요약 -->
                <div>
                    <h4 class="font-semibold mb-2">법안 요약</h4>
                    <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded">${bill.summary}</p>
                </div>
                
                <!-- 주요 내용 -->
                <div>
                    <h4 class="font-semibold mb-2">주요 내용</h4>
                    <ul class="space-y-2">`;
        
        bill.mainContent.forEach(content => {
            content += `
                        <li class="text-sm text-gray-700 flex items-start">
                            <i class="fas fa-check text-green-500 mr-2 mt-1 text-xs"></i>
                            <span>${content}</span>
                        </li>`;
        });
        
        content += `
                    </ul>
                </div>
                
                <!-- 공동발의자 -->
                <div>
                    <h4 class="font-semibold mb-2">공동발의자 (${bill.coProposers.length}명)</h4>
                    <div class="flex flex-wrap gap-2">
                        ${bill.coProposers.slice(0, 10).map(name => 
                            `<span class="text-xs px-2 py-1 bg-gray-100 rounded">${name}</span>`
                        ).join('')}
                        ${bill.coProposers.length > 10 ? 
                            `<span class="text-xs px-2 py-1 bg-gray-200 rounded">+${bill.coProposers.length - 10}명</span>` : ''}
                    </div>
                </div>
                
                <!-- 처리 경과 -->
                <div>
                    <h4 class="font-semibold mb-2">처리 경과</h4>
                    <div class="space-y-2">`;
        
        if (bill.timeline.length > 0) {
            bill.timeline.forEach(item => {
                const iconColor = item.status === 'completed' ? 'text-green-500' : 'text-gray-400';
                content += `
                        <div class="flex items-center text-sm">
                            <i class="fas fa-check-circle ${iconColor} mr-3"></i>
                            <span class="text-gray-600 w-24">${item.date}</span>
                            <span class="font-medium">${item.event}</span>
                        </div>`;
            });
        }
        
        if (bill.status === '가결' && bill.votes) {
            content += `
                </div>
                
                <!-- 표결 결과 -->
                <div>
                    <h4 class="font-semibold mb-2">본회의 표결 결과</h4>
                    <div class="grid grid-cols-3 gap-2 text-center">
                        <div class="bg-green-50 p-3 rounded">
                            <div class="text-2xl font-bold text-green-600">${bill.votes.yes}</div>
                            <div class="text-xs text-gray-600">찬성</div>
                        </div>
                        <div class="bg-red-50 p-3 rounded">
                            <div class="text-2xl font-bold text-red-600">${bill.votes.no}</div>
                            <div class="text-xs text-gray-600">반대</div>
                        </div>
                        <div class="bg-gray-50 p-3 rounded">
                            <div class="text-2xl font-bold text-gray-600">${bill.votes.abstain}</div>
                            <div class="text-xs text-gray-600">기권</div>
                        </div>
                    </div>`;
        }
        
        content += `
                </div>
                
                <!-- 관련 문서 -->
                <div>
                    <h4 class="font-semibold mb-2">관련 문서</h4>
                    <div class="space-y-2">`;
        
        bill.documents.forEach(doc => {
            content += `
                        <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div class="flex items-center">
                                <i class="fas fa-file-pdf text-red-500 mr-2"></i>
                                <span class="text-sm">${doc.name}</span>
                                <span class="text-xs text-gray-500 ml-2">(${doc.size})</span>
                            </div>
                            <button class="text-blue-600 text-sm" onclick="app.downloadBillDocument('${doc.name}')">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>`;
        });
        
        content += `
                    </div>
                </div>
                
                <!-- 액션 버튼 -->
                <div class="grid grid-cols-2 gap-3 pt-3 border-t">
                    <button class="btn-secondary text-sm" onclick="app.shareBill('${billId}')">
                        <i class="fas fa-share-alt mr-2"></i>공유
                    </button>
                    <button class="btn-primary text-sm" onclick="app.downloadBillReport('${billId}')">
                        <i class="fas fa-download mr-2"></i>보고서 다운로드
                    </button>
                </div>
            </div>`;

        this.showModal('bill-detail', {
            title: '법안 상세 정보',
            content: content,
            confirmText: '닫기'
        });
    },

    // Show Bill Filters
    showBillFilters: function() {
        const content = `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-2">발의 유형</label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" checked> 대표발의
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" checked> 공동발의
                        </label>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">처리 상태</label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" checked> 가결
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" checked> 심사중
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" checked> 계류
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2"> 부결
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2"> 철회
                        </label>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">기간</label>
                    <div class="grid grid-cols-2 gap-2">
                        <input type="date" class="p-2 border rounded text-sm">
                        <input type="date" class="p-2 border rounded text-sm">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">소관 위원회</label>
                    <select class="w-full p-2 border rounded text-sm">
                        <option>전체</option>
                        <option>교육위원회</option>
                        <option>법제사법위원회</option>
                        <option>국토교통위원회</option>
                        <option>보건복지위원회</option>
                        <option>기획재정위원회</option>
                    </select>
                </div>
            </div>`;

        this.showModal('bill-filters', {
            title: '법안 검색 필터',
            content: content,
            confirmText: '적용',
            cancelText: '초기화',
            onConfirm: () => {
                this.showNotification('필터가 적용되었습니다.');
            }
        });
    },

    // Show New Bill Form
    showNewBillForm: function() {
        const content = `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-2">법안명 <span class="text-red-500">*</span></label>
                    <input type="text" class="w-full p-2 border rounded" placeholder="예: ○○법 일부개정법률안">
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">발의 유형 <span class="text-red-500">*</span></label>
                    <select class="w-full p-2 border rounded">
                        <option>대표발의</option>
                        <option>공동발의</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">제안 이유</label>
                    <textarea class="w-full p-2 border rounded" rows="3" placeholder="법안 발의 배경 및 필요성"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">주요 내용</label>
                    <textarea class="w-full p-2 border rounded" rows="4" placeholder="개정 또는 제정 내용의 핵심 사항"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">공동발의자 추가</label>
                    <div class="flex gap-2">
                        <input type="text" class="flex-1 p-2 border rounded" placeholder="의원명 검색">
                        <button class="px-4 py-2 bg-blue-600 text-white rounded">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="mt-2 flex flex-wrap gap-2">
                        <span class="text-xs px-2 py-1 bg-gray-100 rounded">이정민 <i class="fas fa-times ml-1 cursor-pointer"></i></span>
                        <span class="text-xs px-2 py-1 bg-gray-100 rounded">박지원 <i class="fas fa-times ml-1 cursor-pointer"></i></span>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">첨부 파일</label>
                    <div class="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                        <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                        <p class="text-sm text-gray-600">파일을 드래그하거나 클릭하여 업로드</p>
                        <p class="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (최대 10MB)</p>
                    </div>
                </div>
                
                <div class="bg-yellow-50 p-3 rounded">
                    <i class="fas fa-info-circle text-yellow-600 mr-2"></i>
                    <span class="text-sm text-yellow-800">법안 발의 후 법제실 검토를 거쳐 정식 등록됩니다.</span>
                </div>
            </div>`;

        this.showModal('new-bill', {
            title: '새 법안 발의',
            content: content,
            confirmText: '발의하기',
            cancelText: '임시저장',
            onConfirm: () => {
                this.showNotification('법안이 성공적으로 발의되었습니다.');
            }
        });
    },

    // Download Bill Document
    downloadBillDocument: function(docName) {
        this.showNotification(`${docName} 다운로드를 시작합니다.`);
    },

    // Share Bill
    shareBill: function(billId) {
        if (navigator.share) {
            navigator.share({
                title: '법안 공유',
                text: '주택임대차보호법 일부개정법률안',
                url: window.location.href + '#bill/' + billId
            });
        } else {
            this.showNotification('링크가 클립보드에 복사되었습니다.');
        }
    },

    // Download Bill Report  
    downloadBillReport: function(billId) {
        this.showNotification('법안 보고서 다운로드를 시작합니다.');
    },

    // Show Bill Stats
    showBillStats: function(type) {
        const titles = {
            'total': '총 발의 법안 통계',
            'passed': '가결 법안 분석',
            'pending': '계류 중 법안 현황',
            'rejected': '부결 법안 분석'
        };

        this.showModal('bill-stats', {
            title: titles[type] || '법안 통계',
            content: `
                <div class="space-y-4">
                    <div class="text-center py-8">
                        <i class="fas fa-chart-pie text-4xl text-blue-600 mb-4"></i>
                        <p class="text-gray-600">상세 통계 분석 화면</p>
                    </div>
                </div>`,
            confirmText: '닫기'
        });
    },

    // Show Bill Analytics
    showBillAnalytics: function() {
        this.showModal('bill-analytics', {
            title: '법안 발의 통계 분석',
            content: `
                <div class="space-y-4">
                    <div class="text-center py-8">
                        <i class="fas fa-chart-bar text-4xl text-green-600 mb-4"></i>
                        <p class="text-gray-600">종합 통계 분석 대시보드</p>
                    </div>
                </div>`,
            confirmText: '닫기'
        });
    },

    // Load Civil Complaint Page
    loadCivilPage: function() {
        const content = `
            <div class="page-container">
                <!-- 요약 통계 카드 -->
                <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="gov-stat-card bg-blue-50">
                        <div class="gov-stat-icon bg-blue-100 text-blue-600">
                            <i class="fas fa-inbox"></i>
                        </div>
                        <div class="gov-stat-content">
                            <div class="gov-stat-value">248건</div>
                            <div class="gov-stat-label">총 접수</div>
                        </div>
                    </div>
                    
                    <div class="gov-stat-card bg-green-50">
                        <div class="gov-stat-icon bg-green-100 text-green-600">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="gov-stat-content">
                            <div class="gov-stat-value">232건</div>
                            <div class="gov-stat-label">처리완료</div>
                        </div>
                    </div>
                    
                    <div class="gov-stat-card bg-orange-50">
                        <div class="gov-stat-icon bg-orange-100 text-orange-600">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="gov-stat-content">
                            <div class="gov-stat-value">16건</div>
                            <div class="gov-stat-label">처리중</div>
                        </div>
                    </div>
                    
                    <div class="gov-stat-card bg-purple-50">
                        <div class="gov-stat-icon bg-purple-100 text-purple-600">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="gov-stat-content">
                            <div class="gov-stat-value">93.5%</div>
                            <div class="gov-stat-label">처리율</div>
                        </div>
                    </div>
                </div>

                <!-- AI 빠른 민원 등록 -->
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-3">
                        <i class="fas fa-robot text-blue-600 mr-2"></i>
                        AI 민원 빠른 등록
                    </h3>
                    <div class="space-y-3">
                        <div class="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-microphone text-blue-600 mr-2"></i>
                                <span class="text-sm font-medium text-blue-800">음성 또는 간단 입력으로 등록</span>
                            </div>
                            <textarea id="aiComplaintInput" class="w-full p-3 border rounded resize-none" rows="3" 
                                placeholder="예: '강남구 XX로에 가로등이 고장났어요', '청소년을 위한 체육시설 확충이 필요합니다'"></textarea>
                        </div>
                        <div class="flex gap-2">
                            <button class="flex-1 btn-primary" onclick="app.startAIComplaintInput()">
                                <i class="fas fa-magic mr-2"></i>AI 분석 및 등록
                            </button>
                            <button class="px-4 py-2 border border-gray-300 rounded text-gray-700" onclick="app.startVoiceInput()">
                                <i class="fas fa-microphone"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 필터 및 검색 -->
                <div class="gov-card mb-4">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="gov-title">민원 목록</h3>
                        <div class="flex gap-2">
                            <button class="btn-secondary text-sm" onclick="app.showComplaintFilters()">
                                <i class="fas fa-filter mr-1"></i>필터
                            </button>
                            <button class="btn-primary text-sm" onclick="app.showNewComplaintForm()">
                                <i class="fas fa-plus mr-1"></i>상세등록
                            </button>
                        </div>
                    </div>
                    
                    <!-- 빠른 필터 탭 -->
                    <div class="flex gap-1 mb-3 overflow-x-auto">
                        <button class="complaint-tab active" data-status="all" onclick="app.filterComplaints('all')">
                            전체 <span class="tab-count">248</span>
                        </button>
                        <button class="complaint-tab" data-status="pending" onclick="app.filterComplaints('pending')">
                            처리중 <span class="tab-count">16</span>
                        </button>
                        <button class="complaint-tab" data-status="completed" onclick="app.filterComplaints('completed')">
                            완료 <span class="tab-count">232</span>
                        </button>
                        <button class="complaint-tab" data-status="urgent" onclick="app.filterComplaints('urgent')">
                            긴급 <span class="tab-count">3</span>
                        </button>
                    </div>
                </div>

                <!-- 민원 목록 -->
                <div class="space-y-3" id="complaintList">
                    <!-- 민원 항목들이 여기에 동적으로 로드됩니다 -->
                </div>

                <!-- 부서별 통계 -->
                <div class="gov-card mt-4">
                    <h3 class="gov-title mb-3">부서별 민원 현황</h3>
                    <div class="space-y-2">
                        <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span class="text-sm">도시계획과</span>
                            <div class="flex items-center gap-3">
                                <span class="text-xs text-gray-600">45건</span>
                                <div class="w-16 bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span class="text-sm">교통정책과</span>
                            <div class="flex items-center gap-3">
                                <span class="text-xs text-gray-600">38건</span>
                                <div class="w-16 bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-600 h-2 rounded-full" style="width: 63%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span class="text-sm">환경보전과</span>
                            <div class="flex items-center gap-3">
                                <span class="text-xs text-gray-600">32건</span>
                                <div class="w-16 bg-gray-200 rounded-full h-2">
                                    <div class="bg-orange-600 h-2 rounded-full" style="width: 53%"></div>
                                </div>
                            </div>
                        </div>
                        <button class="w-full text-center text-blue-600 text-sm py-2" onclick="app.showDepartmentStats()">
                            전체 부서별 현황 보기 <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>`;

        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = content;
            this.loadComplaintList('all');
        }
    },

    // Start AI Complaint Input
    startAIComplaintInput: function() {
        const input = document.getElementById('aiComplaintInput');
        const text = input.value.trim();
        
        if (!text) {
            this.showNotification('내용을 입력해주세요.');
            return;
        }

        // AI 분석 시뮬레이션
        this.showLoadingModal('AI가 민원 내용을 분석하고 있습니다...');
        
        setTimeout(() => {
            this.hideLoadingModal();
            const aiAnalysis = this.analyzeComplaintWithAI(text);
            this.showAIAnalysisResult(aiAnalysis);
        }, 2000);
    },

    // Analyze Complaint with AI (Simulated)
    analyzeComplaintWithAI: function(text) {
        // AI 분석 결과 시뮬레이션
        const keywords = text.toLowerCase();
        let category = '기타';
        let department = '일반민원담당관';
        let priority = '보통';
        let suggestedTitle = '';
        let relatedLaws = [];

        if (keywords.includes('가로등') || keywords.includes('조명') || keywords.includes('불빛')) {
            category = '도로/교통';
            department = '교통정책과';
            suggestedTitle = '가로등 고장 신고';
            relatedLaws = ['도로법', '도로교통법'];
        } else if (keywords.includes('체육') || keywords.includes('운동') || keywords.includes('스포츠')) {
            category = '문화/체육';
            department = '체육청소년과';
            suggestedTitle = '체육시설 관련 건의';
            relatedLaws = ['체육시설의 설치·이용에 관한 법률'];
        } else if (keywords.includes('환경') || keywords.includes('쓰레기') || keywords.includes('오염')) {
            category = '환경';
            department = '환경보전과';
            suggestedTitle = '환경 개선 관련 민원';
            relatedLaws = ['환경정책기본법'];
        } else if (keywords.includes('교육') || keywords.includes('학교') || keywords.includes('학생')) {
            category = '교육';
            department = '교육협력과';
            suggestedTitle = '교육 관련 건의';
            relatedLaws = ['교육기본법'];
        }

        if (keywords.includes('긴급') || keywords.includes('위험') || keywords.includes('사고')) {
            priority = '긴급';
        }

        return {
            originalText: text,
            category: category,
            department: department,
            priority: priority,
            suggestedTitle: suggestedTitle,
            relatedLaws: relatedLaws,
            confidence: Math.floor(Math.random() * 20) + 80 // 80-99%
        };
    },

    // Show AI Analysis Result
    showAIAnalysisResult: function(analysis) {
        const content = `
            <div class="space-y-4">
                <div class="bg-green-50 p-3 rounded border border-green-200">
                    <div class="flex items-center mb-2">
                        <i class="fas fa-check-circle text-green-600 mr-2"></i>
                        <span class="font-semibold text-green-800">AI 분석 완료</span>
                        <span class="ml-auto text-sm text-green-600">${analysis.confidence}% 정확도</span>
                    </div>
                    <p class="text-sm text-green-700">민원 내용을 분석하여 자동 분류했습니다.</p>
                </div>

                <div class="space-y-3">
                    <div>
                        <label class="block text-sm font-semibold mb-1">제목 (AI 제안)</label>
                        <input type="text" class="w-full p-2 border rounded" value="${analysis.suggestedTitle}" id="aiTitle">
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-semibold mb-1">분류</label>
                            <input type="text" class="w-full p-2 border rounded bg-blue-50" value="${analysis.category}" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-1">담당부서</label>
                            <input type="text" class="w-full p-2 border rounded bg-blue-50" value="${analysis.department}" readonly>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-1">우선순위</label>
                        <select class="w-full p-2 border rounded" id="aiPriority">
                            <option value="긴급" ${analysis.priority === '긴급' ? 'selected' : ''}>긴급</option>
                            <option value="높음" ${analysis.priority === '높음' ? 'selected' : ''}>높음</option>
                            <option value="보통" ${analysis.priority === '보통' ? 'selected' : ''}>보통</option>
                            <option value="낮음" ${analysis.priority === '낮음' ? 'selected' : ''}>낮음</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-1">민원 내용</label>
                        <textarea class="w-full p-2 border rounded" rows="4" id="aiContent">${analysis.originalText}</textarea>
                    </div>

                    ${analysis.relatedLaws.length > 0 ? `
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="text-sm font-semibold mb-2">관련 법령</div>
                        <div class="flex flex-wrap gap-2">
                            ${analysis.relatedLaws.map(law => 
                                `<span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">${law}</span>`
                            ).join('')}
                        </div>
                    </div>` : ''}

                    <div class="bg-yellow-50 p-3 rounded border border-yellow-200">
                        <i class="fas fa-info-circle text-yellow-600 mr-2"></i>
                        <span class="text-sm text-yellow-800">AI 분석 결과를 검토하고 필요시 수정하세요.</span>
                    </div>
                </div>
            </div>`;

        this.showModal('ai-analysis', {
            title: 'AI 분석 결과',
            content: content,
            confirmText: '민원 등록',
            cancelText: '수정',
            onConfirm: () => {
                this.submitAIComplaint();
            }
        });
    },

    // Submit AI Complaint
    submitAIComplaint: function() {
        const title = document.getElementById('aiTitle').value;
        const priority = document.getElementById('aiPriority').value;
        const content = document.getElementById('aiContent').value;
        
        // 민원 등록 시뮬레이션
        this.showLoadingModal('민원을 등록하고 있습니다...');
        
        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('민원이 성공적으로 등록되었습니다. (접수번호: C2024-' + Date.now().toString().slice(-4) + ')');
            
            // 민원 목록 새로고침
            this.loadComplaintList('all');
            
            // 입력 필드 초기화
            const input = document.getElementById('aiComplaintInput');
            if (input) input.value = '';
        }, 1500);
    },

    // Start Voice Input
    startVoiceInput: function() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showNotification('이 브라우저는 음성 인식을 지원하지 않습니다.');
            return;
        }

        this.showNotification('음성 인식을 시작합니다. 말씀해주세요...');
        
        // 음성 인식 시뮬레이션 (실제 구현시 Web Speech API 사용)
        setTimeout(() => {
            const input = document.getElementById('aiComplaintInput');
            if (input) {
                input.value = '강남구 테헤란로에 가로등이 고장나서 밤에 너무 어두워요. 안전사고가 걱정됩니다.';
                this.showNotification('음성 인식이 완료되었습니다.');
            }
        }, 2000);
    },

    // Load Complaint List
    loadComplaintList: function(filter = 'all') {
        const complaints = [
            {
                id: 'C2024-0156',
                title: '강남구 가로등 고장 신고',
                category: '도로/교통',
                department: '교통정책과',
                status: 'completed',
                priority: '보통',
                date: '2025.01.15',
                dueDate: '2025.01.20',
                progress: 100,
                citizen: '김**',
                contact: '010-****-5678'
            },
            {
                id: 'C2024-0157',
                title: '청소년 체육시설 확충 건의',
                category: '문화/체육',
                department: '체육청소년과',
                status: 'pending',
                priority: '높음',
                date: '2025.01.14',
                dueDate: '2025.01.25',
                progress: 65,
                citizen: '이**',
                contact: '010-****-1234'
            },
            {
                id: 'C2024-0158',
                title: '아파트 소음 관련 민원',
                category: '환경',
                department: '환경보전과',
                status: 'pending',
                priority: '긴급',
                date: '2025.01.16',
                dueDate: '2025.01.18',
                progress: 25,
                citizen: '박**',
                contact: '010-****-9012'
            },
            {
                id: 'C2024-0159',
                title: '도로 포트홀 보수 요청',
                category: '도로/교통',
                department: '도로관리과',
                status: 'completed',
                priority: '높음',
                date: '2025.01.13',
                dueDate: '2025.01.16',
                progress: 100,
                citizen: '최**',
                contact: '010-****-3456'
            }
        ];

        let filteredComplaints = complaints;
        if (filter !== 'all') {
            filteredComplaints = complaints.filter(c => c.status === filter || c.priority === filter);
        }

        const listHtml = filteredComplaints.map(complaint => {
            const statusColor = complaint.status === 'completed' ? 'text-green-600' : 
                               complaint.status === 'pending' ? 'text-orange-600' : 'text-gray-600';
            const priorityColor = complaint.priority === '긴급' ? 'bg-red-100 text-red-700' :
                                 complaint.priority === '높음' ? 'bg-orange-100 text-orange-700' :
                                 'bg-gray-100 text-gray-700';
            
            return `
                <div class="gov-card complaint-item" onclick="app.showComplaintDetail('${complaint.id}')">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-sm font-medium text-gray-900">${complaint.title}</span>
                                <span class="text-xs px-2 py-1 rounded ${priorityColor}">${complaint.priority}</span>
                            </div>
                            <div class="flex items-center gap-3 text-xs text-gray-600 mb-2">
                                <span><i class="fas fa-user mr-1"></i>${complaint.citizen}</span>
                                <span><i class="fas fa-calendar mr-1"></i>${complaint.date}</span>
                                <span><i class="fas fa-building mr-1"></i>${complaint.department}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="flex-1 bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full transition-all" style="width: ${complaint.progress}%"></div>
                                </div>
                                <span class="text-xs text-gray-500">${complaint.progress}%</span>
                            </div>
                        </div>
                        <div class="ml-3 text-right">
                            <div class="text-xs ${statusColor} font-medium mb-1">
                                ${complaint.status === 'completed' ? '처리완료' : 
                                  complaint.status === 'pending' ? '처리중' : '대기'}
                            </div>
                            <div class="text-xs text-gray-500">~${complaint.dueDate}</div>
                        </div>
                    </div>
                </div>`;
        }).join('');

        const listContainer = document.getElementById('complaintList');
        if (listContainer) {
            listContainer.innerHTML = listHtml;
        }

        // 탭 활성화 상태 업데이트
        document.querySelectorAll('.complaint-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.status === filter) {
                tab.classList.add('active');
            }
        });
    },

    // Filter Complaints
    filterComplaints: function(status) {
        this.loadComplaintList(status);
    },

    // Show Complaint Detail
    showComplaintDetail: function(complaintId) {
        const complaintData = {
            'C2024-0156': {
                id: 'C2024-0156',
                title: '강남구 가로등 고장 신고',
                category: '도로/교통',
                department: '교통정책과',
                status: 'completed',
                priority: '보통',
                content: '테헤란로 112번길과 113번길 사이 가로등 3개가 고장나서 밤에 매우 어둡습니다. 보행자 안전에 위험하니 빠른 수리 부탁드립니다.',
                location: '서울시 강남구 테헤란로 112번길',
                submissionDate: '2025.01.15 14:30',
                dueDate: '2025.01.20',
                completionDate: '2025.01.18 16:45',
                citizen: {
                    name: '김민수',
                    phone: '010-1234-5678',
                    email: 'kim***@email.com',
                    address: '강남구 테헤란로 ***'
                },
                manager: {
                    name: '박정호 주무관',
                    phone: '02-2100-1234',
                    email: 'park.jh@gg.go.kr',
                    department: '교통정책과'
                },
                timeline: [
                    { date: '2025.01.15 14:30', event: '민원 접수', status: 'completed', note: 'AI 자동 분석 완료' },
                    { date: '2025.01.15 15:15', event: '담당부서 배정', status: 'completed', note: '교통정책과 배정' },
                    { date: '2025.01.16 09:00', event: '현장 확인', status: 'completed', note: '가로등 3개 고장 확인' },
                    { date: '2025.01.17 14:00', event: '수리 작업 시작', status: 'completed', note: '전기공사업체 출동' },
                    { date: '2025.01.18 16:45', event: '수리 완료', status: 'completed', note: '정상 작동 확인' },
                    { date: '2025.01.18 17:00', event: '처리 완료', status: 'completed', note: '민원인 만족도 조사 실시' }
                ],
                attachments: [
                    { name: '현장사진1.jpg', size: '2.3MB', type: 'image' },
                    { name: '수리완료사진.jpg', size: '1.8MB', type: 'image' },
                    { name: '작업보고서.pdf', size: '856KB', type: 'pdf' }
                ],
                satisfaction: 5,
                feedback: '신속한 처리에 감사드립니다. 이제 밤길이 안전해졌어요.'
            }
        };

        const complaint = complaintData[complaintId] || {
            id: complaintId,
            title: '민원 정보',
            status: 'pending',
            content: '민원 내용을 불러오는 중입니다...'
        };

        const statusColor = complaint.status === 'completed' ? 'text-green-600' : 
                           complaint.status === 'pending' ? 'text-orange-600' : 'text-gray-600';
        const priorityColor = complaint.priority === '긴급' ? 'bg-red-100 text-red-700' :
                             complaint.priority === '높음' ? 'bg-orange-100 text-orange-700' :
                             'bg-gray-100 text-gray-700';

        let content = `
            <div class="space-y-4" style="max-height: 80vh; overflow-y: auto;">
                <!-- 민원 헤더 -->
                <div class="bg-blue-50 p-4 rounded-lg">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="font-bold text-lg text-blue-900">${complaint.title}</h3>
                            <p class="text-sm text-blue-700 mt-1">접수번호: ${complaint.id}</p>
                        </div>
                        <div class="text-right">
                            <span class="px-3 py-1 bg-white rounded-full text-sm font-semibold ${statusColor}">
                                ${complaint.status === 'completed' ? '처리완료' : 
                                  complaint.status === 'pending' ? '처리중' : '대기'}
                            </span>
                            <div class="mt-1">
                                <span class="text-xs px-2 py-1 rounded ${priorityColor}">${complaint.priority}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 기본 정보 -->
                <div class="bg-gray-50 p-3 rounded">
                    <div class="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span class="text-gray-600">분류:</span>
                            <span class="font-semibold ml-2">${complaint.category}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">담당부서:</span>
                            <span class="font-semibold ml-2">${complaint.department}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">접수일:</span>
                            <span class="font-semibold ml-2">${complaint.submissionDate}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">처리기한:</span>
                            <span class="font-semibold ml-2">${complaint.dueDate}</span>
                        </div>
                    </div>
                </div>

                <!-- 민원 내용 -->
                <div>
                    <h4 class="font-semibold mb-2">민원 내용</h4>
                    <div class="bg-gray-50 p-3 rounded">
                        <p class="text-sm text-gray-700">${complaint.content}</p>
                        ${complaint.location ? `
                        <div class="mt-2 pt-2 border-t border-gray-200">
                            <span class="text-xs text-gray-600">위치: ${complaint.location}</span>
                        </div>` : ''}
                    </div>
                </div>

                <!-- 처리 담당자 -->
                ${complaint.manager ? `
                <div>
                    <h4 class="font-semibold mb-2">처리 담당자</h4>
                    <div class="bg-blue-50 p-3 rounded">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-medium text-blue-900">${complaint.manager.name}</div>
                                <div class="text-sm text-blue-700">${complaint.manager.department}</div>
                            </div>
                            <div class="text-right text-sm">
                                <div class="text-blue-700">${complaint.manager.phone}</div>
                                <div class="text-blue-600">${complaint.manager.email}</div>
                            </div>
                        </div>
                    </div>
                </div>` : ''}

                <!-- 처리 진행 상황 -->
                ${complaint.timeline ? `
                <div>
                    <h4 class="font-semibold mb-2">처리 진행 상황</h4>
                    <div class="space-y-3">
                        ${complaint.timeline.map(item => {
                            const iconColor = item.status === 'completed' ? 'text-green-500' : 'text-gray-400';
                            return `
                            <div class="flex items-start">
                                <i class="fas fa-check-circle ${iconColor} mr-3 mt-1"></i>
                                <div class="flex-1">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <div class="font-medium text-sm">${item.event}</div>
                                            <div class="text-xs text-gray-600">${item.date}</div>
                                        </div>
                                    </div>
                                    ${item.note ? `<div class="text-xs text-gray-500 mt-1">${item.note}</div>` : ''}
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>` : ''}

                <!-- 첨부 파일 -->
                ${complaint.attachments && complaint.attachments.length > 0 ? `
                <div>
                    <h4 class="font-semibold mb-2">첨부 파일</h4>
                    <div class="space-y-2">
                        ${complaint.attachments.map(file => `
                        <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div class="flex items-center">
                                <i class="fas fa-${file.type === 'image' ? 'image' : 'file-pdf'} text-blue-500 mr-2"></i>
                                <span class="text-sm">${file.name}</span>
                                <span class="text-xs text-gray-500 ml-2">(${file.size})</span>
                            </div>
                            <button class="text-blue-600 text-sm" onclick="app.downloadComplaintFile('${file.name}')">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>`).join('')}
                    </div>
                </div>` : ''}

                <!-- 만족도 및 피드백 -->
                ${complaint.satisfaction && complaint.status === 'completed' ? `
                <div>
                    <h4 class="font-semibold mb-2">처리 만족도</h4>
                    <div class="bg-green-50 p-3 rounded">
                        <div class="flex items-center mb-2">
                            <span class="text-sm font-medium mr-2">만족도:</span>
                            ${Array(complaint.satisfaction).fill('★').join('')}
                            ${Array(5-complaint.satisfaction).fill('☆').join('')}
                            <span class="text-sm text-green-700 ml-2">(${complaint.satisfaction}/5)</span>
                        </div>
                        ${complaint.feedback ? `
                        <div class="text-sm text-green-800 mt-2">
                            <i class="fas fa-quote-left mr-1"></i>
                            ${complaint.feedback}
                        </div>` : ''}
                    </div>
                </div>` : ''}
            </div>`;

        this.showModal('complaint-detail', {
            title: '민원 상세 정보',
            content: content,
            confirmText: '닫기',
            modalClass: 'modal-scrollable'
        });
    },

    // Show Loading Modal
    showLoadingModal: function(message) {
        const content = `
            <div class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p class="text-gray-600">${message}</p>
            </div>`;

        this.showModal('loading', {
            title: '',
            content: content,
            hideButtons: true
        });
    },

    // Hide Loading Modal
    hideLoadingModal: function() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    // Show Department Stats
    showDepartmentStats: function() {
        const content = `
            <div class="space-y-4">
                <div class="text-center py-8">
                    <i class="fas fa-chart-pie text-4xl text-blue-600 mb-4"></i>
                    <p class="text-gray-600">부서별 민원 현황 상세 분석</p>
                </div>
            </div>`;

        this.showModal('dept-stats', {
            title: '부서별 민원 통계',
            content: content,
            confirmText: '닫기'
        });
    },

    // Download Complaint File
    downloadComplaintFile: function(fileName) {
        this.showNotification(`${fileName} 다운로드를 시작합니다.`);
    },

    // Show New Complaint Form
    showNewComplaintForm: function() {
        const content = `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-2">민원 제목 <span class="text-red-500">*</span></label>
                    <input type="text" class="w-full p-2 border rounded" placeholder="민원 제목을 입력하세요">
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-sm font-semibold mb-2">분류</label>
                        <select class="w-full p-2 border rounded">
                            <option>도로/교통</option>
                            <option>환경</option>
                            <option>문화/체육</option>
                            <option>교육</option>
                            <option>복지</option>
                            <option>기타</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-2">우선순위</label>
                        <select class="w-full p-2 border rounded">
                            <option>보통</option>
                            <option>높음</option>
                            <option>긴급</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">민원 내용 <span class="text-red-500">*</span></label>
                    <textarea class="w-full p-2 border rounded" rows="4" placeholder="민원 내용을 상세히 입력하세요"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">위치 정보</label>
                    <input type="text" class="w-full p-2 border rounded" placeholder="해당 위치를 입력하세요">
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">첨부 파일</label>
                    <div class="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                        <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                        <p class="text-sm text-gray-600">파일을 드래그하거나 클릭하여 업로드</p>
                        <p class="text-xs text-gray-500 mt-1">JPG, PNG, PDF (최대 10MB)</p>
                    </div>
                </div>
            </div>`;

        this.showModal('new-complaint', {
            title: '민원 등록',
            content: content,
            confirmText: '등록하기',
            cancelText: '취소',
            onConfirm: () => {
                this.showNotification('민원이 성공적으로 등록되었습니다.');
            }
        });
    },

    // Show Complaint Filters
    showComplaintFilters: function() {
        const content = `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold mb-2">분류</label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" checked> 도로/교통
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" checked> 환경
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" checked> 문화/체육
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" checked> 교육
                        </label>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">처리 상태</label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" checked> 처리완료
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2" checked> 처리중
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2"> 대기
                        </label>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">기간</label>
                    <div class="grid grid-cols-2 gap-2">
                        <input type="date" class="p-2 border rounded text-sm">
                        <input type="date" class="p-2 border rounded text-sm">
                    </div>
                </div>
            </div>`;

        this.showModal('complaint-filters', {
            title: '민원 필터',
            content: content,
            confirmText: '적용',
            cancelText: '초기화',
            onConfirm: () => {
                this.showNotification('필터가 적용되었습니다.');
            }
        });
    },

    // Load Settings Page
    loadSettingsPage: function() {
        const content = `
            <div class="page-container">
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">계정 관리</h3>
                    
                    <div class="space-y-3">
                        <div class="setting-item" onclick="app.showPasswordChange()">
                            <div class="setting-icon">
                                <i class="fas fa-lock text-blue-600"></i>
                            </div>
                            <div class="setting-content">
                                <div class="setting-title">비밀번호 변경</div>
                                <div class="setting-desc">보안을 위해 정기적으로 비밀번호를 변경하세요</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                        
                        <div class="setting-item" onclick="app.showBiometricSettings()">
                            <div class="setting-icon">
                                <i class="fas fa-fingerprint text-green-600"></i>
                            </div>
                            <div class="setting-content">
                                <div class="setting-title">생체인증 설정</div>
                                <div class="setting-desc">지문, 얼굴 인식으로 편리한 로그인</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                        
                        <div class="setting-item" onclick="app.showPinSettings()">
                            <div class="setting-icon">
                                <i class="fas fa-mobile-alt text-purple-600"></i>
                            </div>
                            <div class="setting-content">
                                <div class="setting-title">PIN 번호 설정</div>
                                <div class="setting-desc">6자리 PIN으로 빠른 인증</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                    </div>
                </div>

                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">알림 설정</h3>
                    
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-medium">회의 알림</div>
                                <div class="text-sm text-gray-600">본회의, 위원회 일정 알림</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-medium">민원 알림</div>
                                <div class="text-sm text-gray-600">새 민원 접수 및 처리 현황</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-medium">시스템 알림</div>
                                <div class="text-sm text-gray-600">시스템 업데이트 및 공지사항</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="gov-card">
                    <h3 class="gov-title mb-4">기타 설정</h3>
                    
                    <div class="space-y-3">
                        <div class="setting-item" onclick="app.showVersionInfo()">
                            <div class="setting-icon">
                                <i class="fas fa-info-circle text-gray-600"></i>
                            </div>
                            <div class="setting-content">
                                <div class="setting-title">앱 정보</div>
                                <div class="setting-desc">버전 2.0.0</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                        
                        <div class="setting-item" onclick="app.showHelp()">
                            <div class="setting-icon">
                                <i class="fas fa-question-circle text-blue-600"></i>
                            </div>
                            <div class="setting-content">
                                <div class="setting-title">도움말</div>
                                <div class="setting-desc">사용법 및 FAQ</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                        
                        <div class="setting-item" onclick="app.showPrivacyPolicy()">
                            <div class="setting-icon">
                                <i class="fas fa-shield-alt text-green-600"></i>
                            </div>
                            <div class="setting-content">
                                <div class="setting-title">개인정보처리방침</div>
                                <div class="setting-desc">개인정보 보호 정책</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                    </div>
                </div>
            </div>`;

        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = content;
        }
    },

    // Show Password Change
    showPasswordChange: function() {
        const content = `
            <div class="space-y-4">
                <div class="bg-blue-50 p-3 rounded border border-blue-200">
                    <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                    <span class="text-sm text-blue-800">보안을 위해 본인인증 후 비밀번호를 변경할 수 있습니다.</span>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">현재 비밀번호</label>
                    <input type="password" class="w-full p-2 border rounded" placeholder="현재 비밀번호를 입력하세요" id="currentPassword">
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">새 비밀번호</label>
                    <input type="password" class="w-full p-2 border rounded" placeholder="새 비밀번호를 입력하세요" id="newPassword">
                    <div class="text-xs text-gray-500 mt-1">8자 이상, 영문/숫자/특수문자 조합</div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">새 비밀번호 확인</label>
                    <input type="password" class="w-full p-2 border rounded" placeholder="새 비밀번호를 다시 입력하세요" id="confirmPassword">
                </div>
                
                <div class="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <div class="text-sm font-semibold text-yellow-800 mb-2">본인인증 필수</div>
                    <div class="text-xs text-yellow-700">비밀번호 변경을 위해 휴대폰 인증이 필요합니다.</div>
                </div>
            </div>`;

        this.showModal('password-change', {
            title: '비밀번호 변경',
            content: content,
            confirmText: '인증 후 변경',
            cancelText: '취소',
            onConfirm: () => {
                this.startPhoneVerification();
            }
        });
    },

    // Start Phone Verification
    startPhoneVerification: function() {
        const content = `
            <div class="space-y-4">
                <div class="text-center">
                    <i class="fas fa-mobile-alt text-4xl text-blue-600 mb-4"></i>
                    <h3 class="text-lg font-semibold mb-2">휴대폰 본인인증</h3>
                    <p class="text-sm text-gray-600">등록된 휴대폰으로 인증번호를 발송합니다.</p>
                </div>
                
                <div class="bg-gray-50 p-3 rounded">
                    <div class="text-sm text-gray-600">인증번호 발송</div>
                    <div class="font-semibold">010-****-5678</div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">인증번호 입력</label>
                    <div class="flex gap-2">
                        <input type="text" class="flex-1 p-2 border rounded text-center" maxlength="6" placeholder="6자리" id="verificationCode">
                        <button class="px-4 py-2 bg-blue-600 text-white rounded text-sm" onclick="app.sendVerificationCode()">
                            <span id="sendCodeText">발송</span>
                            <span id="countdownText" style="display: none;"></span>
                        </button>
                    </div>
                </div>
                
                <div class="text-xs text-gray-500">
                    • 인증번호는 3분간 유효합니다<br>
                    • 최대 5회까지 재발송 가능합니다
                </div>
            </div>`;

        this.showModal('phone-verification', {
            title: '본인인증',
            content: content,
            confirmText: '인증 확인',
            cancelText: '취소',
            onConfirm: () => {
                this.verifyPhoneCode();
            }
        });
    },

    // Send Verification Code
    sendVerificationCode: function() {
        const sendButton = document.getElementById('sendCodeText');
        const countdownText = document.getElementById('countdownText');
        
        if (sendButton && countdownText) {
            sendButton.style.display = 'none';
            countdownText.style.display = 'inline';
            
            let countdown = 180; // 3분
            const timer = setInterval(() => {
                const minutes = Math.floor(countdown / 60);
                const seconds = countdown % 60;
                countdownText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                countdown--;
                if (countdown < 0) {
                    clearInterval(timer);
                    sendButton.style.display = 'inline';
                    countdownText.style.display = 'none';
                    sendButton.textContent = '재발송';
                }
            }, 1000);
        }
        
        this.showNotification('인증번호가 발송되었습니다.');
    },

    // Verify Phone Code
    verifyPhoneCode: function() {
        const code = document.getElementById('verificationCode').value;
        
        if (!code || code.length !== 6) {
            this.showNotification('인증번호 6자리를 입력해주세요.');
            return;
        }
        
        // 인증번호 검증 시뮬레이션
        this.showLoadingModal('인증번호를 확인하고 있습니다...');
        
        setTimeout(() => {
            this.hideLoadingModal();
            if (code === '123456') {
                this.showNotification('휴대폰 인증이 완료되었습니다.');
                this.setupBiometricAuth();
            } else {
                this.showNotification('인증번호가 올바르지 않습니다.');
            }
        }, 2000);
    },

    // Setup Biometric Authentication
    setupBiometricAuth: function() {
        const content = `
            <div class="space-y-4">
                <div class="text-center">
                    <i class="fas fa-fingerprint text-4xl text-green-600 mb-4"></i>
                    <h3 class="text-lg font-semibold mb-2">생체인증 등록</h3>
                    <p class="text-sm text-gray-600">지문 또는 얼굴 인식을 등록하여 편리하게 로그인하세요.</p>
                </div>
                
                <div class="space-y-3">
                    <div class="auth-option selected" onclick="app.selectAuthType('fingerprint')">
                        <div class="auth-icon">
                            <i class="fas fa-fingerprint text-green-600"></i>
                        </div>
                        <div class="auth-info">
                            <div class="auth-title">지문 인식</div>
                            <div class="auth-desc">Touch ID 또는 지문 센서</div>
                        </div>
                        <i class="fas fa-check text-green-600" id="fingerprintCheck"></i>
                    </div>
                    
                    <div class="auth-option" onclick="app.selectAuthType('face')">
                        <div class="auth-icon">
                            <i class="fas fa-user-circle text-blue-600"></i>
                        </div>
                        <div class="auth-info">
                            <div class="auth-title">얼굴 인식</div>
                            <div class="auth-desc">Face ID 또는 얼굴 스캔</div>
                        </div>
                        <i class="fas fa-check text-green-600" id="faceCheck" style="display: none;"></i>
                    </div>
                </div>
                
                <div class="bg-blue-50 p-3 rounded border border-blue-200">
                    <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                    <span class="text-sm text-blue-800">생체인증은 기기에 저장되며 서버로 전송되지 않습니다.</span>
                </div>
            </div>`;

        this.showModal('biometric-setup', {
            title: '생체인증 설정',
            content: content,
            confirmText: '등록하기',
            cancelText: '건너뛰기',
            onConfirm: () => {
                this.registerBiometric();
            },
            onCancel: () => {
                this.setupPinAuth();
            }
        });
    },

    // Select Auth Type
    selectAuthType: function(type) {
        document.querySelectorAll('.auth-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        if (type === 'fingerprint') {
            document.querySelector('.auth-option').classList.add('selected');
            document.getElementById('fingerprintCheck').style.display = 'inline';
            document.getElementById('faceCheck').style.display = 'none';
        } else {
            document.querySelectorAll('.auth-option')[1].classList.add('selected');
            document.getElementById('faceCheck').style.display = 'inline';
            document.getElementById('fingerprintCheck').style.display = 'none';
        }
    },

    // Register Biometric
    registerBiometric: function() {
        this.showLoadingModal('생체인증을 등록하고 있습니다...');
        
        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('생체인증이 성공적으로 등록되었습니다.');
            this.setupPinAuth();
        }, 3000);
    },

    // Setup PIN Authentication
    setupPinAuth: function() {
        const content = `
            <div class="space-y-4">
                <div class="text-center">
                    <i class="fas fa-mobile-alt text-4xl text-purple-600 mb-4"></i>
                    <h3 class="text-lg font-semibold mb-2">PIN 번호 설정</h3>
                    <p class="text-sm text-gray-600">6자리 PIN 번호로 빠르게 인증할 수 있습니다.</p>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">PIN 번호 입력</label>
                    <div class="pin-input-container">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinFocus(this, 0)">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinFocus(this, 1)">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinFocus(this, 2)">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinFocus(this, 3)">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinFocus(this, 4)">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinFocus(this, 5)">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold mb-2">PIN 번호 확인</label>
                    <div class="pin-input-container">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinConfirmFocus(this, 0)">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinConfirmFocus(this, 1)">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinConfirmFocus(this, 2)">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinConfirmFocus(this, 3)">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinConfirmFocus(this, 4)">
                        <input type="password" maxlength="1" class="pin-digit" onkeyup="app.movePinConfirmFocus(this, 5)">
                    </div>
                </div>
                
                <div class="text-xs text-gray-500">
                    • PIN 번호는 숫자만 입력 가능합니다<br>
                    • 생일, 전화번호 등 추측 가능한 번호는 피해주세요
                </div>
            </div>`;

        this.showModal('pin-setup', {
            title: 'PIN 번호 설정',
            content: content,
            confirmText: '설정 완료',
            cancelText: '건너뛰기',
            onConfirm: () => {
                this.savePinSettings();
            },
            onCancel: () => {
                this.completePasswordChange();
            }
        });
    },

    // Move PIN Focus
    movePinFocus: function(element, index) {
        if (element.value.length === 1 && index < 5) {
            const pinDigits = document.querySelectorAll('.pin-input-container')[0].querySelectorAll('.pin-digit');
            pinDigits[index + 1].focus();
        }
    },

    // Move PIN Confirm Focus
    movePinConfirmFocus: function(element, index) {
        if (element.value.length === 1 && index < 5) {
            const pinDigits = document.querySelectorAll('.pin-input-container')[1].querySelectorAll('.pin-digit');
            pinDigits[index + 1].focus();
        }
    },

    // Save PIN Settings
    savePinSettings: function() {
        const pinInputs = document.querySelectorAll('.pin-input-container')[0].querySelectorAll('.pin-digit');
        const confirmInputs = document.querySelectorAll('.pin-input-container')[1].querySelectorAll('.pin-digit');
        
        let pin = '';
        let confirmPin = '';
        
        pinInputs.forEach(input => pin += input.value);
        confirmInputs.forEach(input => confirmPin += input.value);
        
        if (pin.length !== 6 || confirmPin.length !== 6) {
            this.showNotification('PIN 번호 6자리를 모두 입력해주세요.');
            return;
        }
        
        if (pin !== confirmPin) {
            this.showNotification('PIN 번호가 일치하지 않습니다.');
            return;
        }
        
        this.showLoadingModal('PIN 번호를 설정하고 있습니다...');
        
        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('PIN 번호가 성공적으로 설정되었습니다.');
            this.completePasswordChange();
        }, 1500);
    },

    // Complete Password Change
    completePasswordChange: function() {
        const content = `
            <div class="text-center py-6">
                <i class="fas fa-check-circle text-5xl text-green-600 mb-4"></i>
                <h3 class="text-lg font-semibold mb-2">보안 설정 완료</h3>
                <p class="text-sm text-gray-600 mb-4">모든 보안 설정이 성공적으로 완료되었습니다.</p>
                
                <div class="bg-green-50 p-4 rounded text-left">
                    <div class="text-sm font-semibold text-green-800 mb-2">완료된 설정</div>
                    <div class="space-y-1 text-xs text-green-700">
                        <div><i class="fas fa-check mr-2"></i>비밀번호 변경</div>
                        <div><i class="fas fa-check mr-2"></i>휴대폰 본인인증</div>
                        <div><i class="fas fa-check mr-2"></i>생체인증 등록</div>
                        <div><i class="fas fa-check mr-2"></i>PIN 번호 설정</div>
                    </div>
                </div>
                
                <div class="text-xs text-gray-500 mt-4">
                    다음 로그인부터 새로운 인증 방법을 사용할 수 있습니다.
                </div>
            </div>`;

        this.showModal('security-complete', {
            title: '설정 완료',
            content: content,
            confirmText: '확인',
            hideCancel: true,
            onConfirm: () => {
                this.loadSettingsPage();
            }
        });
    },

    // Show Biometric Settings
    showBiometricSettings: function() {
        const content = `
            <div class="space-y-4">
                <div class="text-center">
                    <i class="fas fa-fingerprint text-4xl text-green-600 mb-4"></i>
                    <h3 class="text-lg font-semibold mb-2">생체인증 관리</h3>
                </div>
                
                <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                            <div class="font-medium">지문 인식</div>
                            <div class="text-sm text-gray-600">등록됨</div>
                        </div>
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                    
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                            <div class="font-medium">얼굴 인식</div>
                            <div class="text-sm text-gray-600">미등록</div>
                        </div>
                        <button class="text-blue-600 text-sm">등록</button>
                    </div>
                </div>
                
                <div class="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                    <span class="text-sm text-yellow-800">생체인증 해제 시 비밀번호가 필요합니다.</span>
                </div>
            </div>`;

        this.showModal('biometric-settings', {
            title: '생체인증 설정',
            content: content,
            confirmText: '저장',
            cancelText: '취소'
        });
    },

    // Show PIN Settings
    showPinSettings: function() {
        const content = `
            <div class="space-y-4">
                <div class="text-center">
                    <i class="fas fa-mobile-alt text-4xl text-purple-600 mb-4"></i>
                    <h3 class="text-lg font-semibold mb-2">PIN 번호 관리</h3>
                </div>
                
                <div class="bg-green-50 p-3 rounded border border-green-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="font-medium text-green-800">PIN 번호 등록됨</div>
                            <div class="text-sm text-green-600">마지막 변경: 2025.01.16</div>
                        </div>
                        <i class="fas fa-check-circle text-green-600"></i>
                    </div>
                </div>
                
                <div class="space-y-3">
                    <button class="w-full p-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-50" onclick="app.changePinNumber()">
                        <i class="fas fa-edit mr-2"></i>PIN 번호 변경
                    </button>
                    
                    <button class="w-full p-3 border border-red-600 text-red-600 rounded hover:bg-red-50" onclick="app.disablePinAuth()">
                        <i class="fas fa-trash mr-2"></i>PIN 인증 해제
                    </button>
                </div>
                
                <div class="text-xs text-gray-500">
                    • PIN 번호 변경 시 본인인증이 필요합니다<br>
                    • PIN 인증 해제 후 재등록까지 24시간이 소요됩니다
                </div>
            </div>`;

        this.showModal('pin-settings', {
            title: 'PIN 번호 설정',
            content: content,
            confirmText: '닫기'
        });
    },

    // Change PIN Number
    changePinNumber: function() {
        this.showNotification('PIN 번호 변경을 위해 본인인증을 진행합니다.');
        this.startPhoneVerification();
    },

    // Disable PIN Auth
    disablePinAuth: function() {
        this.showModal('confirm-disable-pin', {
            title: 'PIN 인증 해제',
            content: `
                <div class="text-center py-6">
                    <i class="fas fa-exclamation-triangle text-4xl text-yellow-600 mb-4"></i>
                    <h3 class="text-lg font-semibold mb-2">PIN 인증을 해제하시겠습니까?</h3>
                    <p class="text-sm text-gray-600 mb-4">해제 후 재등록까지 24시간이 소요됩니다.</p>
                    
                    <div class="bg-red-50 p-3 rounded text-left">
                        <div class="text-sm text-red-800">
                            PIN 인증 해제 시:<br>
                            • 빠른 로그인이 불가능합니다<br>
                            • 비밀번호 입력이 필요합니다<br>
                            • 재등록까지 24시간 대기
                        </div>
                    </div>
                </div>`,
            confirmText: '해제하기',
            cancelText: '취소',
            onConfirm: () => {
                this.showNotification('PIN 인증이 해제되었습니다.');
            }
        });
    },

    // Show Version Info
    showVersionInfo: function() {
        const content = `
            <div class="text-center py-6">
                <i class="fas fa-mobile-alt text-4xl text-blue-600 mb-4"></i>
                <h3 class="text-lg font-semibold mb-2">경기도의회 의정활동 관리시스템</h3>
                <p class="text-sm text-gray-600 mb-6">Version 2.0.0</p>
                
                <div class="space-y-3 text-left">
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="text-sm font-semibold mb-1">최근 업데이트</div>
                        <div class="text-xs text-gray-600">2025.01.16</div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="text-sm font-semibold mb-1">개발사</div>
                        <div class="text-xs text-gray-600">경기도의회 디지털혁신팀</div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="text-sm font-semibold mb-1">문의</div>
                        <div class="text-xs text-gray-600">support@gg.go.kr</div>
                    </div>
                </div>
            </div>`;

        this.showModal('version-info', {
            title: '앱 정보',
            content: content,
            confirmText: '확인'
        });
    },

    // Show Help
    showHelp: function() {
        const content = `
            <div class="space-y-4">
                <div class="help-section">
                    <h4 class="font-semibold mb-2">자주 묻는 질문</h4>
                    <div class="space-y-2">
                        <div class="help-item" onclick="app.toggleHelp(1)">
                            <div class="flex justify-between items-center">
                                <span class="text-sm">비밀번호를 잊어버렸어요</span>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="help-answer" id="help-1" style="display: none;">
                                <p class="text-xs text-gray-600 mt-2">
                                    설정 > 비밀번호 변경에서 휴대폰 인증을 통해 새 비밀번호를 설정할 수 있습니다.
                                </p>
                            </div>
                        </div>
                        
                        <div class="help-item" onclick="app.toggleHelp(2)">
                            <div class="flex justify-between items-center">
                                <span class="text-sm">생체인증이 안 돼요</span>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="help-answer" id="help-2" style="display: none;">
                                <p class="text-xs text-gray-600 mt-2">
                                    기기 설정에서 생체인증이 활성화되어 있는지 확인하고, 앱 권한을 허용해주세요.
                                </p>
                            </div>
                        </div>
                        
                        <div class="help-item" onclick="app.toggleHelp(3)">
                            <div class="flex justify-between items-center">
                                <span class="text-sm">민원은 어떻게 등록하나요?</span>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="help-answer" id="help-3" style="display: none;">
                                <p class="text-xs text-gray-600 mt-2">
                                    민원 처리 페이지에서 AI 빠른 등록 또는 상세 등록을 통해 민원을 접수할 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-blue-50 p-3 rounded">
                    <div class="text-sm font-semibold text-blue-800 mb-1">고객센터</div>
                    <div class="text-xs text-blue-700">
                        전화: 031-8008-2000<br>
                        이메일: support@gg.go.kr<br>
                        운영시간: 평일 09:00~18:00
                    </div>
                </div>
            </div>`;

        this.showModal('help', {
            title: '도움말',
            content: content,
            confirmText: '확인'
        });
    },

    // Toggle Help
    toggleHelp: function(id) {
        const answer = document.getElementById(`help-${id}`);
        if (answer) {
            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        }
    },

    // Show Privacy Policy
    showPrivacyPolicy: function() {
        const content = `
            <div class="space-y-4 text-sm">
                <div>
                    <h4 class="font-semibold mb-2">개인정보처리방침</h4>
                    <p class="text-xs text-gray-600">
                        경기도의회는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 
                        개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 
                        처리방침을 두고 있습니다.
                    </p>
                </div>
                
                <div>
                    <h5 class="font-semibold mb-1">수집하는 개인정보 항목</h5>
                    <p class="text-xs text-gray-600">
                        • 필수항목: 이름, 의원번호, 소속정당, 지역구<br>
                        • 선택항목: 생체정보(지문, 얼굴), PIN 번호
                    </p>
                </div>
                
                <div>
                    <h5 class="font-semibold mb-1">개인정보의 처리목적</h5>
                    <p class="text-xs text-gray-600">
                        • 의정활동 관리 및 지원<br>
                        • 본인인증 및 보안<br>
                        • 서비스 개선 및 통계분석
                    </p>
                </div>
                
                <div>
                    <h5 class="font-semibold mb-1">개인정보 보관기간</h5>
                    <p class="text-xs text-gray-600">
                        의원 임기 종료 후 3년간 보관 후 파기
                    </p>
                </div>
                
                <div class="bg-gray-50 p-3 rounded">
                    <p class="text-xs text-gray-600">
                        개인정보 관련 문의사항이 있으시면 개인정보보호책임자에게 연락주시기 바랍니다.<br>
                        담당자: 정보보안팀 (privacy@gg.go.kr)
                    </p>
                </div>
            </div>`;

        this.showModal('privacy-policy', {
            title: '개인정보처리방침',
            content: content,
            confirmText: '확인'
        });
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로딩 완료, 앱 초기화 시작');
    if (window.app && typeof window.app.init === 'function') {
        window.app.init();
    }
});