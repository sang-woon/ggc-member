// 통합 페이지 로더 - DataManager와 연동
Object.assign(window.app, {
    // 홈페이지 로드 (DataManager 데이터 사용)
    loadHomePageIntegrated: function() {
        console.log('🏠 통합 홈페이지 로딩...');
        
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;
        
        // DataManager에서 데이터 가져오기
        const memberInfo = DataManager.memberInfo;
        const attendance = DataManager.attendanceData;
        const bills = DataManager.billData;
        const speeches = DataManager.speechData;
        const civil = DataManager.civilData;
        const recentActivities = DataManager.recentActivities;
        const monthlyStats = DataManager.monthlyStats;
        
        // 홈페이지 HTML 생성
        const homeHTML = `
            <div class="page-container">
                <!-- 정부 공지사항 -->
                <div class="gov-notice">
                    <i class="fas fa-info-circle mr-2"></i>
                    <span>2025년도 제372회 경기도의회(임시회) 진행중</span>
                </div>
                
                <!-- Enhanced Profile Card - Premium Mobile Design -->
                <div class="mb-4" style="background: linear-gradient(135deg, #003d7a 0%, #0056b3 100%); color: white; padding: 20px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,61,122,0.2); position: relative; overflow: hidden;">
                    <!-- Background Pattern -->
                    <div style="position: absolute; top: 0; right: -50px; opacity: 0.1;">
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="80" fill="white"/>
                            <circle cx="100" cy="100" r="60" fill="none" stroke="white" stroke-width="2"/>
                            <circle cx="100" cy="100" r="40" fill="none" stroke="white" stroke-width="2"/>
                        </svg>
                    </div>
                    
                    <!-- Header with Title and Actions -->
                    <div class="flex items-center justify-between mb-4" style="position: relative; z-index: 1;">
                        <div class="flex items-center gap-2">
                            <div style="width: 4px; height: 20px; background: white; border-radius: 2px;"></div>
                            <h3 class="text-white font-bold text-lg">의원 정보</h3>
                        </div>
                        <div class="flex gap-2">
                            <button class="bg-white text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-blue-50 transition flex items-center gap-1" onclick="app.showPerformanceReport()">
                                <i class="fas fa-chart-line text-[10px]"></i>
                                <span>성과보고서</span>
                            </button>
                            <button class="bg-white/20 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-white/30 transition flex items-center gap-1 border border-white/30" onclick="app.navigateTo('digital-id')">
                                <i class="fas fa-id-card text-[10px]"></i>
                                <span>신분증</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Member Profile Section -->
                    <div class="flex items-start gap-4" style="position: relative; z-index: 1;">
                        <!-- Enhanced Photo Container -->
                        <div class="relative" style="flex-shrink: 0;">
                            <div class="member-photo-container" 
                                 onclick="app.showMemberDetails()" 
                                 style="width: 85px; height: 85px; border-radius: 16px; overflow: hidden; cursor: pointer; position: relative; background: white; padding: 3px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                                <img src="${memberInfo.photo}" alt="${memberInfo.name} 의원" style="width: 100%; height: 100%; object-fit: cover; border-radius: 13px;">
                                <!-- Interactive Overlay -->
                                <div style="position: absolute; inset: 3px; background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%); border-radius: 13px; opacity: 0; transition: opacity 0.2s;" 
                                     onmouseover="this.style.opacity='1'" 
                                     onmouseout="this.style.opacity='0'">
                                    <div style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);">
                                        <i class="fas fa-search-plus text-white text-sm"></i>
                                    </div>
                                </div>
                            </div>
                            <!-- Status Badge -->
                            <div style="position: absolute; bottom: -2px; right: -2px; width: 24px; height: 24px; background: #10b981; border: 3px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-check text-white" style="font-size: 10px;"></i>
                            </div>
                        </div>
                        
                        <!-- Member Information -->
                        <div class="flex-1 min-w-0">
                            <div class="mb-2">
                                <h2 class="text-white font-bold text-xl mb-1">${memberInfo.name} 의원</h2>
                                <div class="flex items-center gap-2 text-blue-100 text-sm mb-1">
                                    <span class="font-semibold">${memberInfo.party}</span>
                                    <span style="width: 3px; height: 3px; background: rgba(255,255,255,0.5); border-radius: 50%;"></span>
                                    <span>${memberInfo.district}</span>
                                </div>
                                <div class="flex items-center gap-2 text-blue-100 text-xs">
                                    <div class="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                                        <i class="fas fa-briefcase" style="font-size: 10px;"></i>
                                        <span>${memberInfo.position}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Enhanced Status Badges -->
                            <div class="flex flex-wrap gap-2">
                                <span class="inline-flex items-center px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold shadow-sm">
                                    <span class="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></span>
                                    ${memberInfo.status}
                                </span>
                                <span class="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur text-white rounded-full text-xs font-medium border border-white/30">
                                    ${memberInfo.term}
                                </span>
                                <span class="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur text-white rounded-full text-xs font-medium border border-white/30">
                                    당선유효
                                </span>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <!-- 빠른 통계 그리드 - 별도 섹션 -->
                <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="gov-stat-card" onclick="app.navigateTo('attendance')">
                        <div class="gov-stat-icon bg-blue-100 text-blue-600">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <div class="gov-stat-content">
                            <div class="gov-stat-value">${attendance.plenary.rate}%</div>
                            <div class="gov-stat-label">본회의 출석률</div>
                            <div class="gov-stat-detail">${attendance.plenary.attended}회/${attendance.plenary.total}회</div>
                        </div>
                    </div>
                    
                    <div class="gov-stat-card" onclick="app.navigateTo('bill')">
                        <div class="gov-stat-icon bg-green-100 text-green-600">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="gov-stat-content">
                            <div class="gov-stat-value">${bills.total}건</div>
                            <div class="gov-stat-label">발의 법안</div>
                            <div class="gov-stat-detail">가결 ${bills.passed}건</div>
                        </div>
                    </div>
                    
                    <div class="gov-stat-card" onclick="app.navigateTo('speech')">
                        <div class="gov-stat-icon bg-purple-100 text-purple-600">
                            <i class="fas fa-microphone"></i>
                        </div>
                        <div class="gov-stat-content">
                            <div class="gov-stat-value">${speeches.total}회</div>
                            <div class="gov-stat-label">본회의 발언</div>
                            <div class="gov-stat-detail">5분발언 ${speeches.fiveMinute}회</div>
                        </div>
                    </div>
                    
                    <div class="gov-stat-card" onclick="app.navigateTo('civil')">
                        <div class="gov-stat-icon bg-orange-100 text-orange-600">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="gov-stat-content">
                            <div class="gov-stat-value">${civil.total}건</div>
                            <div class="gov-stat-label">민원 처리</div>
                            <div class="gov-stat-detail">처리율 ${civil.responseRate}%</div>
                        </div>
                    </div>
                </div>
                
                <!-- 활동 차트 -->
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-3">월별 활동 현황</h3>
                    <div class="relative h-48">
                        <canvas id="monthlyChart"></canvas>
                    </div>
                </div>
                
                <!-- 최근 활동 -->
                <div class="gov-card mb-4">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="gov-title">최근 의정활동</h3>
                        <button class="text-blue-600 text-sm" onclick="window.app.showAllActivities()">전체보기</button>
                    </div>
                    <div class="space-y-3">
                        ${recentActivities.map(activity => `
                            <div class="activity-item" onclick="window.app.showActivityDetail('${activity.type}', ${activity.id})">
                                <div class="activity-icon bg-${this.getActivityColor(activity.type)}-50">
                                    <i class="fas ${activity.icon} text-${this.getActivityColor(activity.type)}-600"></i>
                                </div>
                                <div class="activity-content">
                                    <div class="activity-title">${activity.title}</div>
                                    <div class="activity-desc">${activity.description}</div>
                                    <div class="activity-date">${activity.date}</div>
                                </div>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- 바로가기 메뉴 -->
                <div class="gov-card">
                    <h3 class="gov-title mb-3">바로가기</h3>
                    <div class="grid grid-cols-3 gap-3 mb-3">
                        <button class="quick-menu-item" onclick="window.app.showPressReleases()">
                            <i class="fas fa-newspaper text-red-600"></i>
                            <span>보도자료</span>
                        </button>
                        <button class="quick-menu-item" onclick="window.app.showSchedule()">
                            <i class="fas fa-calendar-alt text-blue-600"></i>
                            <span>일정표</span>
                        </button>
                        <button class="quick-menu-item" onclick="window.app.showMeetings()">
                            <i class="fas fa-users text-purple-600"></i>
                            <span>회의</span>
                        </button>
                    </div>
                    <div class="grid grid-cols-3 gap-3">
                        <button class="quick-menu-item" onclick="window.app.showStatistics()">
                            <i class="fas fa-chart-bar text-green-600"></i>
                            <span>통계</span>
                        </button>
                        <button class="quick-menu-item" onclick="window.app.showQuickContacts()">
                            <i class="fas fa-address-book text-orange-600"></i>
                            <span>연락처</span>
                        </button>
                        <button class="quick-menu-item" onclick="window.app.showNotifications()">
                            <i class="fas fa-bell text-yellow-600"></i>
                            <span>알림</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        mainContent.innerHTML = homeHTML;
        
        // 차트 초기화
        setTimeout(() => {
            this.initMonthlyChartWithData(monthlyStats);
            this.setupEventDelegation();
        }, 100);
    },
    
    // 활동 타입별 색상
    getActivityColor: function(type) {
        const colors = {
            'speech': 'blue',
            'bill': 'green',
            'civil': 'orange'
        };
        return colors[type] || 'gray';
    },
    
    // 차트 초기화 (DataManager 데이터 사용)
    initMonthlyChartWithData: function(data) {
        const canvas = document.getElementById('monthlyChart');
        if (canvas && window.Chart) {
            new Chart(canvas, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: '활동 건수',
                        data: data.data,
                        borderColor: '#0056b3',
                        backgroundColor: 'rgba(0, 86, 179, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                borderDash: [5, 5]
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    },
    
    // 이벤트 위임 설정
    setupEventDelegation: function() {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;
        
        mainContent.addEventListener('click', function(e) {
            const target = e.target;
            const clickedElement = target.closest('[onclick]');
            
            if (clickedElement) {
                e.preventDefault();
                e.stopPropagation();
                
                const onclickAttr = clickedElement.getAttribute('onclick');
                console.log('클릭 감지:', onclickAttr);
                
                try {
                    eval(onclickAttr);
                    console.log('✅ 함수 실행 성공');
                } catch(err) {
                    console.error('❌ onclick 실행 오류:', err);
                }
            }
        });
    },
    
    // 데이터 업데이트 시 UI 새로고침
    refreshUI: function() {
        const currentPage = this.currentPage || 'home';
        if (currentPage === 'home') {
            this.loadHomePageIntegrated();
        }
    }
});

// 기존 loadHomePage를 통합 버전으로 교체
window.app.loadHomePage = window.app.loadHomePageIntegrated;

// 데이터 업데이트 이벤트 리스너
window.addEventListener('dataUpdated', function(e) {
    console.log('📊 데이터 업데이트됨:', e.detail.type);
    if (window.app.currentPage === 'home') {
        window.app.refreshUI();
    }
});