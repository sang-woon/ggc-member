// Enhanced Attendance Calendar System - 2025.01.18
// 출석 현황 캘린더 시스템

(function() {
    'use strict';
    
    // 출석 캘린더 기능 확장
    window.AttendanceCalendar = {
        currentDate: new Date(),
        viewMode: 'month', // 'month', 'week', 'day'
        attendanceData: {},
        
        // 초기화
        init: function() {
            this.currentDate = new Date();
            this.loadAttendanceData();
            this.render();
        },
        
        // 출석 데이터 로드
        loadAttendanceData: function() {
            // 샘플 출석 데이터
            this.attendanceData = {
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
            };
        },
        
        // 렌더링
        render: function() {
            const container = document.getElementById('attendanceCalendarContainer');
            if (!container) return;
            
            let html = `
                <div class="attendance-calendar-wrapper">
                    ${this.renderHeader()}
                    ${this.renderViewSwitcher()}
                    ${this.renderCalendarBody()}
                    ${this.renderStats()}
                </div>
            `;
            
            container.innerHTML = html;
            this.attachEventListeners();
        },
        
        // 헤더 렌더링
        renderHeader: function() {
            const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();
            
            return `
                <div class="calendar-header">
                    <div class="calendar-nav">
                        <button onclick="AttendanceCalendar.previousPeriod()" class="nav-btn">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <h3 class="calendar-title">
                            ${year}년 ${monthNames[month]}
                        </h3>
                        <button onclick="AttendanceCalendar.nextPeriod()" class="nav-btn">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <button onclick="AttendanceCalendar.goToToday()" class="today-btn">
                        <i class="fas fa-calendar-day"></i> 오늘
                    </button>
                </div>
            `;
        },
        
        // 뷰 전환 버튼
        renderViewSwitcher: function() {
            return `
                <div class="view-switcher">
                    <button class="view-btn ${this.viewMode === 'day' ? 'active' : ''}" 
                            onclick="AttendanceCalendar.setViewMode('day')">
                        일간
                    </button>
                    <button class="view-btn ${this.viewMode === 'week' ? 'active' : ''}" 
                            onclick="AttendanceCalendar.setViewMode('week')">
                        주간
                    </button>
                    <button class="view-btn ${this.viewMode === 'month' ? 'active' : ''}" 
                            onclick="AttendanceCalendar.setViewMode('month')">
                        월간
                    </button>
                </div>
            `;
        },
        
        // 캘린더 본체 렌더링
        renderCalendarBody: function() {
            switch(this.viewMode) {
                case 'day':
                    return this.renderDayView();
                case 'week':
                    return this.renderWeekView();
                case 'month':
                default:
                    return this.renderMonthView();
            }
        },
        
        // 월간 뷰
        renderMonthView: function() {
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());
            
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
                const attendance = this.attendanceData[dateStr];
                
                html += `
                    <div class="calendar-date ${!isCurrentMonth ? 'other-month' : ''} 
                                ${isToday ? 'today' : ''} 
                                ${isSunday ? 'sunday' : ''} 
                                ${isSaturday ? 'saturday' : ''}"
                         onclick="AttendanceCalendar.showDayDetail('${dateStr}')">
                        <div class="date-number">${currentDate.getDate()}</div>
                `;
                
                if (attendance) {
                    const statusClass = this.getStatusClass(attendance.status);
                    const typeIcon = this.getTypeIcon(attendance.type);
                    
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
            
            return html;
        },
        
        // 주간 뷰
        renderWeekView: function() {
            const startOfWeek = new Date(this.currentDate);
            const day = startOfWeek.getDay();
            startOfWeek.setDate(startOfWeek.getDate() - day);
            
            let html = `
                <div class="calendar-grid week-view">
                    <div class="week-header">
            `;
            
            const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            for (let i = 0; i < 7; i++) {
                const currentDate = new Date(startOfWeek);
                currentDate.setDate(startOfWeek.getDate() + i);
                const isToday = currentDate.getTime() === today.getTime();
                
                html += `
                    <div class="week-day-header ${isToday ? 'today' : ''}">
                        <div class="weekday-name">${weekDays[i]}</div>
                        <div class="weekday-date">${currentDate.getDate()}</div>
                    </div>
                `;
            }
            
            html += `
                    </div>
                    <div class="week-content">
            `;
            
            // 시간대별 그리드
            for (let hour = 8; hour <= 20; hour++) {
                html += `
                    <div class="hour-row">
                        <div class="hour-label">${hour}:00</div>
                        <div class="hour-cells">
                `;
                
                for (let day = 0; day < 7; day++) {
                    const currentDate = new Date(startOfWeek);
                    currentDate.setDate(startOfWeek.getDate() + day);
                    const dateStr = this.formatDate(currentDate);
                    const attendance = this.attendanceData[dateStr];
                    
                    html += `<div class="hour-cell">`;
                    
                    if (attendance && hour === 14) { // 예시로 14시에 회의 표시
                        const statusClass = this.getStatusClass(attendance.status);
                        html += `
                            <div class="week-event ${statusClass}" 
                                 onclick="AttendanceCalendar.showDayDetail('${dateStr}')">
                                <div class="event-time">14:00</div>
                                <div class="event-title">${attendance.title}</div>
                            </div>
                        `;
                    }
                    
                    html += `</div>`;
                }
                
                html += `
                        </div>
                    </div>
                `;
            }
            
            html += `
                    </div>
                </div>
            `;
            
            return html;
        },
        
        // 일간 뷰
        renderDayView: function() {
            const dateStr = this.formatDate(this.currentDate);
            const attendance = this.attendanceData[dateStr];
            const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
            const dayName = dayNames[this.currentDate.getDay()];
            
            let html = `
                <div class="calendar-grid day-view">
                    <div class="day-header">
                        <h4>${this.currentDate.getFullYear()}년 ${this.currentDate.getMonth() + 1}월 ${this.currentDate.getDate()}일 ${dayName}</h4>
                    </div>
                    <div class="day-timeline">
            `;
            
            // 시간대별 일정
            for (let hour = 8; hour <= 20; hour++) {
                const isEventTime = attendance && hour === 14;
                
                html += `
                    <div class="timeline-row ${isEventTime ? 'has-event' : ''}">
                        <div class="timeline-hour">${hour}:00</div>
                        <div class="timeline-content">
                `;
                
                if (isEventTime) {
                    const statusClass = this.getStatusClass(attendance.status);
                    const typeIcon = this.getTypeIcon(attendance.type);
                    
                    html += `
                        <div class="day-event ${statusClass}">
                            <i class="${typeIcon}"></i>
                            <div class="event-details">
                                <div class="event-title">${attendance.title}</div>
                                <div class="event-status">${this.getStatusText(attendance.status)}</div>
                                ${attendance.reason ? `<div class="event-reason">${attendance.reason}</div>` : ''}
                            </div>
                        </div>
                    `;
                }
                
                html += `
                        </div>
                    </div>
                `;
            }
            
            html += `
                    </div>
                </div>
            `;
            
            return html;
        },
        
        // 통계 렌더링
        renderStats: function() {
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();
            const monthData = this.getMonthStats(year, month);
            
            return `
                <div class="attendance-stats">
                    <div class="stat-card">
                        <div class="stat-icon present">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${monthData.present}</div>
                            <div class="stat-label">출석</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon excused">
                            <i class="fas fa-calendar-times"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${monthData.excused}</div>
                            <div class="stat-label">청가</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon absent">
                            <i class="fas fa-times-circle"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${monthData.absent}</div>
                            <div class="stat-label">결석</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon rate">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${monthData.rate}%</div>
                            <div class="stat-label">출석률</div>
                        </div>
                    </div>
                </div>
            `;
        },
        
        // 월별 통계 계산
        getMonthStats: function(year, month) {
            let present = 0, excused = 0, absent = 0, scheduled = 0;
            
            Object.entries(this.attendanceData).forEach(([dateStr, data]) => {
                const date = new Date(dateStr);
                if (date.getFullYear() === year && date.getMonth() === month) {
                    switch(data.status) {
                        case 'present': present++; break;
                        case 'excused': excused++; break;
                        case 'absent': absent++; break;
                        case 'scheduled': scheduled++; break;
                    }
                }
            });
            
            const total = present + excused + absent;
            const rate = total > 0 ? Math.round((present / total) * 100) : 100;
            
            return { present, excused, absent, scheduled, rate };
        },
        
        // 날짜 상세 보기
        showDayDetail: function(dateStr) {
            const attendance = this.attendanceData[dateStr];
            if (!attendance) {
                window.app.showNotification('해당 날짜에 일정이 없습니다.', 'info');
                return;
            }
            
            const date = new Date(dateStr);
            const statusText = this.getStatusText(attendance.status);
            const statusClass = this.getStatusClass(attendance.status);
            const typeIcon = this.getTypeIcon(attendance.type);
            
            window.app.showModalEnhanced('attendanceDetail', {
                title: '출석 상세 정보',
                icon: 'fas fa-calendar-check',
                content: `
                    <div class="attendance-detail-modal">
                        <div class="detail-header ${statusClass}">
                            <i class="${typeIcon}"></i>
                            <span>${statusText}</span>
                        </div>
                        <div class="detail-content">
                            <h4>${attendance.title}</h4>
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
                                    <span>국회의사당 ${attendance.type === 'plenary' ? '본회의장' : '교육위원회 회의실'}</span>
                                </div>
                                ${attendance.reason ? `
                                    <div class="info-item">
                                        <i class="fas fa-info-circle"></i>
                                        <span>사유: ${attendance.reason}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `,
                confirmText: '확인'
            });
        },
        
        // 뷰 모드 설정
        setViewMode: function(mode) {
            this.viewMode = mode;
            this.render();
        },
        
        // 이전 기간
        previousPeriod: function() {
            switch(this.viewMode) {
                case 'day':
                    this.currentDate.setDate(this.currentDate.getDate() - 1);
                    break;
                case 'week':
                    this.currentDate.setDate(this.currentDate.getDate() - 7);
                    break;
                case 'month':
                    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                    break;
            }
            this.render();
        },
        
        // 다음 기간
        nextPeriod: function() {
            switch(this.viewMode) {
                case 'day':
                    this.currentDate.setDate(this.currentDate.getDate() + 1);
                    break;
                case 'week':
                    this.currentDate.setDate(this.currentDate.getDate() + 7);
                    break;
                case 'month':
                    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                    break;
            }
            this.render();
        },
        
        // 오늘로 이동
        goToToday: function() {
            this.currentDate = new Date();
            this.render();
        },
        
        // 유틸리티 함수들
        formatDate: function(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        
        getStatusClass: function(status) {
            const classes = {
                'present': 'status-present',
                'excused': 'status-excused',
                'absent': 'status-absent',
                'scheduled': 'status-scheduled'
            };
            return classes[status] || '';
        },
        
        getStatusText: function(status) {
            const texts = {
                'present': '출석',
                'excused': '청가',
                'absent': '결석',
                'scheduled': '예정'
            };
            return texts[status] || '';
        },
        
        getTypeIcon: function(type) {
            const icons = {
                'plenary': 'fas fa-users',
                'committee': 'fas fa-user-tie',
                'meeting': 'fas fa-handshake'
            };
            return icons[type] || 'fas fa-calendar';
        },
        
        // 이벤트 리스너 연결
        attachEventListeners: function() {
            // 필요한 이벤트 리스너 추가
        }
    };
    
    // 전역 객체에 연결
    window.AttendanceCalendar = AttendanceCalendar;
    
    // 디버깅용 로그
    console.log('AttendanceCalendar 모듈 로드 완료', window.AttendanceCalendar);
})();