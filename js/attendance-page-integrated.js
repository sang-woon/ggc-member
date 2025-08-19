// Attendance Page with Integrated Calendar - 2025.01.18
// 출석 페이지 통합 캘린더

(function() {
    'use strict';
    
    // 기존 loadAttendancePage 함수를 완전히 대체
    window.app.loadAttendancePage = function() {
        console.log('출석 페이지 로딩 시작');
        
        const html = `
            <div class="page-container">
                <!-- 출석 현황 요약 -->
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">
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
                
                <!-- 출석 캘린더 -->
                <div class="gov-card mb-4">
                    <div class="attendance-calendar-wrapper">
                        <!-- 캘린더 헤더 -->
                        <div class="calendar-header">
                            <div class="calendar-nav">
                                <button onclick="app.attendancePrevMonth()" class="nav-btn">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <h3 class="calendar-title" id="attendanceCalendarTitle">
                                    2025년 1월
                                </h3>
                                <button onclick="app.attendanceNextMonth()" class="nav-btn">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            <button onclick="app.attendanceToday()" class="today-btn">
                                <i class="fas fa-calendar-day"></i> 오늘
                            </button>
                        </div>
                        
                        <!-- 뷰 전환 버튼 -->
                        <div class="view-switcher">
                            <button class="view-btn" onclick="app.setAttendanceView('day')">
                                일간
                            </button>
                            <button class="view-btn" onclick="app.setAttendanceView('week')">
                                주간
                            </button>
                            <button class="view-btn active" onclick="app.setAttendanceView('month')">
                                월간
                            </button>
                        </div>
                        
                        <!-- 캘린더 본체 -->
                        <div id="attendanceCalendarBody">
                            <!-- 동적으로 렌더링됩니다 -->
                        </div>
                        
                        <!-- 통계 -->
                        <div class="attendance-stats">
                            <div class="stat-card">
                                <div class="stat-icon present">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                                <div class="stat-info">
                                    <div class="stat-value" id="statPresent">12</div>
                                    <div class="stat-label">출석</div>
                                </div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-icon excused">
                                    <i class="fas fa-calendar-times"></i>
                                </div>
                                <div class="stat-info">
                                    <div class="stat-value" id="statExcused">1</div>
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
                                    <div class="stat-value" id="statRate">92%</div>
                                    <div class="stat-label">출석률</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 최근 출석 내역 -->
                <div class="gov-card">
                    <h4 class="font-semibold mb-3">최근 출석 내역</h4>
                    <div class="attendance-list">
                        <div class="attendance-item" onclick="app.showAttendanceDetail('2025-01-17')" style="cursor: pointer;">
                            <div class="attendance-date">2025.01.17</div>
                            <div class="attendance-info">
                                <div class="attendance-type">교육위원회</div>
                                <div class="attendance-desc">전체회의</div>
                            </div>
                            <div class="attendance-status status-present">출석</div>
                            <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                        </div>
                        <div class="attendance-item" onclick="app.showAttendanceDetail('2025-01-16')" style="cursor: pointer;">
                            <div class="attendance-date">2025.01.16</div>
                            <div class="attendance-info">
                                <div class="attendance-type">본회의</div>
                                <div class="attendance-desc">제410회 국회(임시회) 제4차</div>
                            </div>
                            <div class="attendance-status status-present">출석</div>
                            <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                        </div>
                        <div class="attendance-item" onclick="app.showAttendanceDetail('2025-01-15')" style="cursor: pointer;">
                            <div class="attendance-date">2025.01.15</div>
                            <div class="attendance-info">
                                <div class="attendance-type">교육위원회</div>
                                <div class="attendance-desc">예산결산소위</div>
                            </div>
                            <div class="attendance-status status-present">출석</div>
                            <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
            
            // 캘린더 초기화
            setTimeout(() => {
                this.initAttendanceCalendar();
            }, 100);
        }
    };
    
    // 캘린더 관련 데이터와 함수들
    window.app.attendanceData = {
        currentDate: new Date(),
        viewMode: 'month',
        events: {
            '2025-01-06': { type: 'plenary', status: 'present', title: '제410회 국회(임시회) 제1차 본회의' },
            '2025-01-08': { type: 'committee', status: 'present', title: '교육위원회 전체회의' },
            '2025-01-10': { type: 'plenary', status: 'present', title: '제410회 국회(임시회) 제2차 본회의' },
            '2025-01-13': { type: 'committee', status: 'present', title: '교육위원회 법안심사소위' },
            '2025-01-14': { type: 'plenary', status: 'excused', title: '제410회 국회(임시회) 제3차 본회의', reason: '공무 출장' },
            '2025-01-15': { type: 'committee', status: 'present', title: '교육위원회 예산결산소위' },
            '2025-01-16': { type: 'plenary', status: 'present', title: '제410회 국회(임시회) 제4차 본회의' },
            '2025-01-17': { type: 'committee', status: 'present', title: '교육위원회 전체회의' },
            '2025-01-20': { type: 'plenary', status: 'scheduled', title: '제411회 국회(정기회) 제1차 본회의' },
            '2025-01-22': { type: 'committee', status: 'scheduled', title: '교육위원회 법안심사' },
            '2025-01-24': { type: 'plenary', status: 'scheduled', title: '제411회 국회(정기회) 제2차 본회의' },
            '2025-01-27': { type: 'committee', status: 'scheduled', title: '교육위원회 국정감사' },
            '2025-01-29': { type: 'plenary', status: 'scheduled', title: '제411회 국회(정기회) 제3차 본회의' }
        }
    };
    
    // 캘린더 초기화
    window.app.initAttendanceCalendar = function() {
        console.log('출석 캘린더 초기화');
        this.renderAttendanceCalendar();
    };
    
    // 캘린더 렌더링
    window.app.renderAttendanceCalendar = function() {
        const year = this.attendanceData.currentDate.getFullYear();
        const month = this.attendanceData.currentDate.getMonth();
        const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
        
        // 타이틀 업데이트
        const titleElement = document.getElementById('attendanceCalendarTitle');
        if (titleElement) {
            titleElement.textContent = `${year}년 ${monthNames[month]}`;
        }
        
        // 캘린더 본체 렌더링
        const calendarBody = document.getElementById('attendanceCalendarBody');
        if (!calendarBody) return;
        
        let html = `
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
                <div class="dates-grid">
        `;
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            const dateStr = this.formatDate(currentDate);
            const isCurrentMonth = currentDate.getMonth() === month;
            const isToday = currentDate.getTime() === today.getTime();
            const isSunday = currentDate.getDay() === 0;
            const isSaturday = currentDate.getDay() === 6;
            const event = this.attendanceData.events[dateStr];
            
            html += `
                <div class="calendar-date ${!isCurrentMonth ? 'other-month' : ''} 
                            ${isToday ? 'today' : ''} 
                            ${isSunday ? 'sunday' : ''} 
                            ${isSaturday ? 'saturday' : ''}"
                     onclick="app.showAttendanceDetail('${dateStr}')">
                    <div class="date-number">${currentDate.getDate()}</div>
            `;
            
            if (event) {
                const statusClass = this.getAttendanceStatusClass(event.status);
                const typeIcon = this.getAttendanceTypeIcon(event.type);
                
                html += `
                    <div class="attendance-indicator ${statusClass}">
                        <i class="${typeIcon}"></i>
                    </div>
                `;
            }
            
            html += `</div>`;
        }
        
        html += `
                </div>
            </div>
        `;
        
        calendarBody.innerHTML = html;
        
        // 통계 업데이트
        this.updateAttendanceStats(year, month);
    };
    
    // 통계 업데이트
    window.app.updateAttendanceStats = function(year, month) {
        let present = 0, excused = 0, absent = 0;
        
        Object.entries(this.attendanceData.events).forEach(([dateStr, event]) => {
            const date = new Date(dateStr);
            if (date.getFullYear() === year && date.getMonth() === month) {
                switch(event.status) {
                    case 'present': present++; break;
                    case 'excused': excused++; break;
                    case 'absent': absent++; break;
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
    
    // 이전 달
    window.app.attendancePrevMonth = function() {
        this.attendanceData.currentDate.setMonth(this.attendanceData.currentDate.getMonth() - 1);
        this.renderAttendanceCalendar();
    };
    
    // 다음 달
    window.app.attendanceNextMonth = function() {
        this.attendanceData.currentDate.setMonth(this.attendanceData.currentDate.getMonth() + 1);
        this.renderAttendanceCalendar();
    };
    
    // 오늘로 이동
    window.app.attendanceToday = function() {
        this.attendanceData.currentDate = new Date();
        this.renderAttendanceCalendar();
    };
    
    // 뷰 모드 설정
    window.app.setAttendanceView = function(mode) {
        this.attendanceData.viewMode = mode;
        
        // 버튼 활성화 상태 업데이트
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.includes(mode === 'day' ? '일간' : mode === 'week' ? '주간' : '월간')) {
                btn.classList.add('active');
            }
        });
        
        // TODO: 뷰에 따른 렌더링 변경
        this.renderAttendanceCalendar();
    };
    
    // 출석 상세 보기
    window.app.showAttendanceDetail = function(dateStr) {
        const event = this.attendanceData.events[dateStr];
        if (!event) {
            this.showNotification('해당 날짜에 일정이 없습니다.', 'info');
            return;
        }
        
        const date = new Date(dateStr);
        const statusText = this.getAttendanceStatusText(event.status);
        const statusClass = this.getAttendanceStatusClass(event.status);
        
        this.showModalEnhanced('attendanceDetail', {
            title: '출석 상세 정보',
            icon: 'fas fa-calendar-check',
            content: `
                <div class="attendance-detail-modal">
                    <div class="detail-header ${statusClass}">
                        <i class="fas fa-check-circle"></i>
                        <span>${statusText}</span>
                    </div>
                    <div class="detail-content">
                        <h4>${event.title}</h4>
                        <div class="detail-info">
                            <div class="info-item">
                                <i class="fas fa-calendar"></i>
                                <span>${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-clock"></i>
                                <span>14:00 - 17:00</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>국회의사당 ${event.type === 'plenary' ? '본회의장' : '교육위원회 회의실'}</span>
                            </div>
                            ${event.reason ? `
                                <div class="info-item">
                                    <i class="fas fa-info-circle"></i>
                                    <span>사유: ${event.reason}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `,
            confirmText: '확인'
        });
    };
    
    // 유틸리티 함수들
    window.app.formatDate = function(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    window.app.getAttendanceStatusClass = function(status) {
        const classes = {
            'present': 'status-present',
            'excused': 'status-excused',
            'absent': 'status-absent',
            'scheduled': 'status-scheduled'
        };
        return classes[status] || '';
    };
    
    window.app.getAttendanceStatusText = function(status) {
        const texts = {
            'present': '출석',
            'excused': '청가',
            'absent': '결석',
            'scheduled': '예정'
        };
        return texts[status] || '';
    };
    
    window.app.getAttendanceTypeIcon = function(type) {
        const icons = {
            'plenary': 'fas fa-users',
            'committee': 'fas fa-user-tie',
            'meeting': 'fas fa-handshake'
        };
        return icons[type] || 'fas fa-calendar';
    };
    
    console.log('출석 페이지 통합 모듈 로드 완료');
})();