// Enhanced Calendar with Legend and Visual Design - 2025.01.18
// 범례와 시각적 디자인이 개선된 캘린더

(function() {
    'use strict';
    
    // 회의 유형 정의
    const MEETING_TYPES = {
        plenary: { 
            name: '본회의', 
            icon: 'fa-users', 
            color: '#dc2626',
            shortName: '본회'
        },
        committee: { 
            name: '상임위원회', 
            icon: 'fa-user-tie', 
            color: '#2563eb',
            shortName: '상임'
        },
        special: { 
            name: '특별위원회', 
            icon: 'fa-star', 
            color: '#7c3aed',
            shortName: '특위'
        },
        training: { 
            name: '의원연수', 
            icon: 'fa-graduation-cap', 
            color: '#059669',
            shortName: '연수'
        },
        audit: { 
            name: '행정사무감사', 
            icon: 'fa-search', 
            color: '#ea580c',
            shortName: '감사'
        },
        budget: { 
            name: '예산심의', 
            icon: 'fa-coins', 
            color: '#0891b2',
            shortName: '예산'
        }
    };
    
    // 회의 유형 판별 함수
    window.app.getMeetingType = function(event) {
        if (!event) return null;
        
        // 타이틀 기반 판별
        const title = event.title || '';
        
        if (title.includes('예산') || title.includes('결산')) {
            return 'budget';
        } else if (title.includes('감사')) {
            return 'audit';
        } else if (title.includes('연수') || title.includes('간담회')) {
            return 'training';
        } else if (title.includes('특별위') || title.includes('특위')) {
            return 'special';
        } else if (title.includes('본회의') || title.includes('개회') || title.includes('폐회')) {
            return 'plenary';
        } else if (title.includes('위원회')) {
            return 'committee';
        }
        
        // type 필드 기반 판별 (폴백)
        return event.type || 'committee';
    };
    
    // 개선된 loadAttendancePage 함수
    window.app.loadAttendancePage = function() {
        console.log('Enhanced 출석 페이지 로딩');
        
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;
        
        mainContent.innerHTML = `
            <div class="page-container">
                <!-- 출석 현황 요약 -->
                <div class="gov-card">
                    <h3 class="gov-title">
                        <i class="fas fa-calendar-check text-blue-600 mr-2"></i>
                        출석 현황
                    </h3>
                    
                    <div class="attendance-summary">
                        <div class="attendance-stat">
                            <div class="attendance-label">본회의</div>
                            <div class="attendance-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 98.5%"></div>
                                </div>
                                <span class="progress-text">98.5%</span>
                            </div>
                            <div class="attendance-detail">출석 197회 / 전체 200회</div>
                        </div>
                        
                        <div class="attendance-stat">
                            <div class="attendance-label">상임위원회</div>
                            <div class="attendance-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 96%"></div>
                                </div>
                                <span class="progress-text">96%</span>
                            </div>
                            <div class="attendance-detail">출석 48회 / 전체 50회</div>
                        </div>
                        
                        <div class="attendance-stat">
                            <div class="attendance-label">특별위원회</div>
                            <div class="attendance-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 100%"></div>
                                </div>
                                <span class="progress-text">100%</span>
                            </div>
                            <div class="attendance-detail">출석 15회 / 전체 15회</div>
                        </div>
                    </div>
                </div>
                
                <!-- 캘린더 섹션 -->
                <div class="attendance-calendar-wrapper">
                    <!-- 캘린더 헤더 -->
                    <div class="calendar-header">
                        <div class="calendar-nav">
                            <button class="nav-btn" onclick="app.calendarPrevMonth()">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <h3 class="calendar-title" id="calendarTitle">
                                2025년 1월
                            </h3>
                            <button class="nav-btn" onclick="app.calendarNextMonth()">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <button class="today-btn" onclick="app.calendarToday()">
                            <i class="fas fa-calendar-day"></i> 오늘
                        </button>
                    </div>
                    
                    <!-- 뷰 전환 버튼 -->
                    <div class="view-switcher">
                        <button class="view-btn" onclick="app.setCalendarView('day')">
                            일간
                        </button>
                        <button class="view-btn" onclick="app.setCalendarView('week')">
                            주간
                        </button>
                        <button class="view-btn active" onclick="app.setCalendarView('month')">
                            월간
                        </button>
                    </div>
                    
                    <!-- 빠른 필터 -->
                    <div class="quick-filters">
                        <button class="filter-btn active" onclick="app.filterEvents('all')">
                            전체
                        </button>
                        <button class="filter-btn" onclick="app.filterEvents('plenary')">
                            본회의
                        </button>
                        <button class="filter-btn" onclick="app.filterEvents('committee')">
                            상임위
                        </button>
                        <button class="filter-btn" onclick="app.filterEvents('special')">
                            특별위
                        </button>
                        <button class="filter-btn" onclick="app.filterEvents('audit')">
                            감사
                        </button>
                    </div>
                    
                    <!-- 범례 -->
                    <div class="calendar-legend">
                        <div class="legend-item">
                            <div class="legend-dot plenary">
                                <i class="fas fa-users"></i>
                            </div>
                            <span>본회의</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-dot committee">
                                <i class="fas fa-user-tie"></i>
                            </div>
                            <span>상임위원회</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-dot special">
                                <i class="fas fa-star"></i>
                            </div>
                            <span>특별위원회</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-dot training">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <span>의원연수</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-dot audit">
                                <i class="fas fa-search"></i>
                            </div>
                            <span>행정사무감사</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-dot budget">
                                <i class="fas fa-coins"></i>
                            </div>
                            <span>예산심의</span>
                        </div>
                    </div>
                    
                    <!-- 캘린더 본체 -->
                    <div class="calendar-grid month-view">
                        <div class="weekday-header">
                            <div class="weekday sun">일</div>
                            <div class="weekday">월</div>
                            <div class="weekday">화</div>
                            <div class="weekday">수</div>
                            <div class="weekday">목</div>
                            <div class="weekday">금</div>
                            <div class="weekday sat">토</div>
                        </div>
                        <div id="calendarDates" class="dates-grid">
                            <!-- 동적으로 생성됩니다 -->
                        </div>
                    </div>
                    
                    <!-- 통계 -->
                    <div class="attendance-stats">
                        <div class="stat-card">
                            <div class="stat-icon present">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value" id="statPresent">0</div>
                                <div class="stat-label">출석</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon excused">
                                <i class="fas fa-calendar-times"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value" id="statExcused">0</div>
                                <div class="stat-label">청가</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon absent">
                                <i class="fas fa-times-circle"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value" id="statAbsent">0</div>
                                <div class="stat-label">결석</div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon rate">
                                <i class="fas fa-percentage"></i>
                            </div>
                            <div class="stat-info">
                                <div class="stat-value" id="statRate">0%</div>
                                <div class="stat-label">출석률</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 캘린더 초기화
        setTimeout(() => {
            this.initCalendar();
        }, 100);
    };
    
    // 캘린더 렌더링 개선
    window.app.renderCalendar = function() {
        const container = document.getElementById('calendarDates');
        if (!container) return;
        
        const year = this.calendarData.currentDate.getFullYear();
        const month = this.calendarData.currentDate.getMonth();
        const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
        
        // 타이틀 업데이트
        const titleEl = document.getElementById('calendarTitle');
        if (titleEl) {
            titleEl.textContent = `${year}년 ${monthNames[month]}`;
        }
        
        // 달의 첫날과 마지막날
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let html = '';
        
        // 6주 × 7일 = 42일 생성
        for (let week = 0; week < 6; week++) {
            html += '<div class="dates-week">';
            
            for (let day = 0; day < 7; day++) {
                const cellIndex = week * 7 + day;
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + cellIndex);
                
                const dateStr = this.formatDate(currentDate);
                const isCurrentMonth = currentDate.getMonth() === month;
                const isToday = currentDate.getTime() === today.getTime();
                const isSunday = currentDate.getDay() === 0;
                const isSaturday = currentDate.getDay() === 6;
                const event = this.calendarData.events[dateStr];
                
                let classes = 'calendar-date';
                if (!isCurrentMonth) classes += ' other-month';
                if (isToday) classes += ' today';
                if (isSunday) classes += ' sunday';
                if (isSaturday) classes += ' saturday';
                
                // 이벤트가 있으면 해당 유형 클래스 추가
                if (event) {
                    const meetingType = this.getMeetingType(event);
                    classes += ` has-event ${meetingType}`;
                }
                
                html += `<div class="${classes}" onclick="app.showEnhancedDetail('${dateStr}')">`;
                html += `<div class="date-number">${currentDate.getDate()}</div>`;
                
                // 이벤트가 있으면 인디케이터 추가
                if (event) {
                    const meetingType = this.getMeetingType(event);
                    const typeInfo = MEETING_TYPES[meetingType];
                    
                    // 출석 상태 뱃지
                    html += `<div class="status-badge ${event.status}"></div>`;
                    
                    // 이벤트 인디케이터
                    html += `<div class="event-indicator type-${meetingType}">`;
                    html += `<i class="fas ${typeInfo.icon}"></i>`;
                    html += `<span class="event-type-text">${typeInfo.shortName}</span>`;
                    html += `</div>`;
                    
                    // 툴팁
                    html += `<div class="event-tooltip">${event.title}</div>`;
                }
                
                html += '</div>';
            }
            
            html += '</div>';
        }
        
        container.innerHTML = html;
        
        // 통계 업데이트
        this.updateMonthStats();
    };
    
    // 월별 통계 업데이트 함수 추가
    window.app.updateMonthStats = function() {
        const year = this.calendarData.currentDate.getFullYear();
        const month = this.calendarData.currentDate.getMonth();
        
        let present = 0, excused = 0, absent = 0, scheduled = 0;
        
        // 현재 월의 이벤트만 카운트
        Object.entries(this.calendarData.events).forEach(([dateStr, event]) => {
            const date = new Date(dateStr);
            if (date.getFullYear() === year && date.getMonth() === month) {
                switch(event.status) {
                    case 'present': present++; break;
                    case 'excused': excused++; break;
                    case 'absent': absent++; break;
                    case 'scheduled': scheduled++; break;
                }
            }
        });
        
        const total = present + excused + absent;
        const rate = total > 0 ? Math.round((present / total) * 100) : 100;
        
        // DOM 업데이트
        const statPresent = document.getElementById('statPresent');
        const statExcused = document.getElementById('statExcused');
        const statAbsent = document.getElementById('statAbsent');
        const statRate = document.getElementById('statRate');
        
        if (statPresent) statPresent.textContent = present;
        if (statExcused) statExcused.textContent = excused;
        if (statAbsent) statAbsent.textContent = absent;
        if (statRate) statRate.textContent = rate + '%';
    };
    
    // 향상된 상세보기 모달
    window.app.showEnhancedDetail = function(dateStr) {
        const event = this.calendarData.events[dateStr];
        if (!event) {
            this.showNotification('해당 날짜에 일정이 없습니다.', 'info');
            return;
        }
        
        const date = new Date(dateStr);
        const meetingType = this.getMeetingType(event);
        const typeInfo = MEETING_TYPES[meetingType];
        const statusText = this.getStatusText(event.status);
        
        const location = event.title.includes('본회의') ? '본회의장' : 
                        event.title.includes('위원회') ? event.title + ' 회의실' : 
                        '회의실';
        
        const modalContent = `
            <div class="event-detail-modal">
                <div class="event-detail-header ${meetingType}">
                    <i class="fas ${typeInfo.icon}"></i>
                    <span>${typeInfo.name}</span>
                </div>
                
                <div class="event-detail-content">
                    <div class="event-detail-title">${event.title}</div>
                    
                    <div class="event-detail-info">
                        <div class="event-info-item">
                            <i class="fas fa-calendar"></i>
                            <span><strong>날짜:</strong> ${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일</span>
                        </div>
                        
                        <div class="event-info-item">
                            <i class="fas fa-clock"></i>
                            <span><strong>시간:</strong> ${event.time || '10:00'} - ${event.time === '10:00' ? '12:00' : '17:00'}</span>
                        </div>
                        
                        <div class="event-info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span><strong>장소:</strong> 경기도의회 ${location}</span>
                        </div>
                        
                        ${event.reason ? `
                        <div class="event-info-item">
                            <i class="fas fa-info-circle"></i>
                            <span><strong>사유:</strong> ${event.reason}</span>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="attendance-status-card ${event.status}">
                        <span class="attendance-status-text">
                            <i class="fas fa-circle-check"></i> ${statusText}
                        </span>
                        <span class="attendance-status-icon">
                            ${event.status === 'present' ? '✓' : 
                              event.status === 'excused' ? '○' : 
                              event.status === 'absent' ? '✗' : '…'}
                        </span>
                    </div>
                    
                    <div class="event-actions">
                        <button class="event-action-btn" onclick="app.viewAgenda('${dateStr}')">
                            <i class="fas fa-file-alt"></i> 의사일정
                        </button>
                        <button class="event-action-btn" onclick="app.viewMaterials('${dateStr}')">
                            <i class="fas fa-folder-open"></i> 회의자료
                        </button>
                        <button class="event-action-btn primary" onclick="app.editAttendance('${dateStr}')">
                            <i class="fas fa-edit"></i> 수정
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.showModalEnhanced('eventDetail', {
            title: '일정 상세 정보',
            icon: `fas ${typeInfo.icon}`,
            content: modalContent,
            confirmText: '확인'
        });
    };
    
    // 필터링 기능
    window.app.filterEvents = function(type) {
        // 필터 버튼 활성화 상태 변경
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // 캘린더 날짜 필터링
        const dates = document.querySelectorAll('.calendar-date');
        dates.forEach(date => {
            if (type === 'all') {
                date.style.display = 'flex';
            } else {
                if (date.classList.contains(type)) {
                    date.style.display = 'flex';
                } else {
                    date.style.display = 'none';
                }
            }
        });
    };
    
    // 더미 액션 함수들
    window.app.viewAgenda = function(dateStr) {
        this.showNotification('의사일정을 불러오는 중...', 'info');
    };
    
    window.app.viewMaterials = function(dateStr) {
        this.showNotification('회의자료를 불러오는 중...', 'info');
    };
    
    window.app.editAttendance = function(dateStr) {
        this.showNotification('출석 정보 수정 모드', 'info');
    };
    
    // 캘린더 네비게이션 함수들
    window.app.calendarPrevMonth = function() {
        this.calendarData.currentDate.setMonth(this.calendarData.currentDate.getMonth() - 1);
        this.renderCalendar();
    };
    
    window.app.calendarNextMonth = function() {
        this.calendarData.currentDate.setMonth(this.calendarData.currentDate.getMonth() + 1);
        this.renderCalendar();
    };
    
    window.app.calendarToday = function() {
        this.calendarData.currentDate = new Date();
        this.renderCalendar();
    };
    
    window.app.setCalendarView = function(mode) {
        this.calendarData.viewMode = mode;
        
        // 버튼 활성화 상태 업데이트
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.includes(mode === 'day' ? '일간' : mode === 'week' ? '주간' : '월간')) {
                btn.classList.add('active');
            }
        });
        
        // 뷰 모드에 따른 렌더링 (현재는 월간만 구현)
        this.renderCalendar();
    };
    
    // 캘린더 초기화 함수
    window.app.initCalendar = function() {
        console.log('Enhanced 캘린더 초기화');
        this.renderCalendar();
    };
    
    // 날짜 포맷 함수
    window.app.formatDate = function(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    // 상태 텍스트 반환 함수
    window.app.getStatusText = function(status) {
        const texts = {
            'present': '출석',
            'excused': '청가',
            'absent': '결석',
            'scheduled': '예정'
        };
        return texts[status] || '';
    };
    
    console.log('Enhanced Calendar 모듈 로드 완료');
})();