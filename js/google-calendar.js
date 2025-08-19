// Google Calendar Style Implementation - 2025.01.18
// 구글 캘린더 스타일 구현

(function() {
    'use strict';
    
    // 회의 유형 정의 (색상은 구글 캘린더 스타일)
    const MEETING_TYPES = {
        plenary: { 
            name: '본회의', 
            color: '#db4437',  // 빨간색
            textColor: 'white'
        },
        committee: { 
            name: '상임위', 
            color: '#4285f4',  // 파란색
            textColor: 'white'
        },
        special: { 
            name: '특별위', 
            color: '#673ab7',  // 보라색
            textColor: 'white'
        },
        training: { 
            name: '의원연수', 
            color: '#0f9d58',  // 초록색
            textColor: 'white'
        },
        audit: { 
            name: '행정사무감사', 
            color: '#ff6d00',  // 주황색
            textColor: 'white'
        },
        budget: { 
            name: '예산심의', 
            color: '#00acc1',  // 청록색
            textColor: 'white'
        },
        localActivity: {
            name: '바로일기 교육 복부',
            color: '#0f9d58',  // 초록색
            textColor: 'white'
        }
    };
    
    // 구글 캘린더 스타일 렌더링
    window.app.renderGoogleCalendar = function() {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;
        
        // calendarData 초기화 체크
        if (!this.calendarData) {
            this.initCalendarData();
        }
        
        const year = this.calendarData.currentDate.getFullYear();
        const month = this.calendarData.currentDate.getMonth();
        const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
        
        // 최근 출석 이력 생성
        const recentAttendance = this.getRecentAttendance();
        
        // HTML 구조 생성
        let html = `
            <!-- 최근 출석 이력 -->
            <div class="recent-attendance-card" style="background: white; border-radius: 8px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.12);">
                <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #3c4043;">
                    <i class="fas fa-history" style="color: #1a73e8; margin-right: 8px;"></i>
                    최근 출석 이력
                </h3>
                <div class="recent-attendance-list" style="display: flex; flex-direction: column; gap: 8px;">
                    ${recentAttendance}
                </div>
            </div>
            
            <div class="google-calendar-wrapper">
                <!-- 캘린더 헤더 -->
                <div class="gcal-header">
                    <div class="gcal-nav">
                        <button class="gcal-today-btn" onclick="app.calendarToday()">
                            오늘
                        </button>
                        <button class="gcal-nav-btn" onclick="app.calendarPrevMonth()">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="gcal-nav-btn" onclick="app.calendarNextMonth()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <h2 class="gcal-title">${year}년 ${monthNames[month]}</h2>
                    </div>
                    <div class="gcal-view-selector">
                        <button class="gcal-view-btn active">월</button>
                        <button class="gcal-view-btn">주</button>
                        <button class="gcal-view-btn">일</button>
                    </div>
                </div>
                
                <!-- 캘린더 그리드 -->
                <table class="gcal-grid">
                    <thead>
                        <tr class="gcal-weekdays">
                            <th class="gcal-weekday">일</th>
                            <th class="gcal-weekday">월</th>
                            <th class="gcal-weekday">화</th>
                            <th class="gcal-weekday">수</th>
                            <th class="gcal-weekday">목</th>
                            <th class="gcal-weekday">금</th>
                            <th class="gcal-weekday">토</th>
                        </tr>
                    </thead>
                    <tbody class="gcal-dates" id="gcalDates">
                        ${this.generateCalendarDates(year, month)}
                    </tbody>
                </table>
                
                <!-- 범례 -->
                <div class="gcal-legend">
                    <div class="gcal-legend-title">일정 유형</div>
                    <div class="gcal-legend-items">
                        ${Object.entries(MEETING_TYPES).map(([key, type]) => `
                            <label class="gcal-legend-item">
                                <input type="checkbox" checked data-type="${key}">
                                <span class="gcal-legend-color" style="background: ${type.color}"></span>
                                <span>${type.name}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        mainContent.innerHTML = html;
        
        // 이벤트 리스너 추가
        this.attachGoogleCalendarEvents();
    };
    
    // 캘린더 날짜 생성
    window.app.generateCalendarDates = function(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let html = '';
        let currentWeek = '<tr class="gcal-week">';
        
        // 6주 생성
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dateStr = this.formatDate(currentDate);
            const isCurrentMonth = currentDate.getMonth() === month;
            const isToday = currentDate.getTime() === today.getTime();
            const dayNum = currentDate.getDate();
            
            // 새로운 주 시작
            if (i > 0 && i % 7 === 0) {
                html += currentWeek + '</tr>';
                currentWeek = '<tr class="gcal-week">';
            }
            
            let cellClass = 'gcal-date';
            if (!isCurrentMonth) cellClass += ' other-month';
            if (isToday) cellClass += ' today';
            
            currentWeek += `<td class="${cellClass}" data-date="${dateStr}">`;
            currentWeek += `<div class="gcal-date-number">${isToday ? `<span class="today-badge">${dayNum}</span>` : dayNum}</div>`;
            
            // 해당 날짜의 이벤트들 가져오기
            const events = this.getEventsForDate(dateStr);
            if (events && events.length > 0) {
                currentWeek += '<div class="gcal-events">';
                
                // 최대 3개까지 표시
                const displayEvents = events.slice(0, 3);
                displayEvents.forEach(event => {
                    const type = this.getEventType(event);
                    const typeInfo = MEETING_TYPES[type] || MEETING_TYPES.committee;
                    const timeStr = event.time ? `${event.time} ` : '';
                    currentWeek += `
                        <div class="gcal-event ${type}" 
                             style="background: ${typeInfo.color}; color: ${typeInfo.textColor}; font-size: 11px; padding: 2px 4px; margin: 1px 0; border-radius: 3px; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                             onclick="app.showEventDetail('${dateStr}', '${event.id || ''}')">
                            ${timeStr}${event.title}
                        </div>
                    `;
                });
                
                // 더 많은 이벤트가 있으면 표시
                if (events.length > 3) {
                    currentWeek += `<div class="gcal-more">+${events.length - 3}개 더보기</div>`;
                }
                
                currentWeek += '</div>';
            }
            
            currentWeek += '</td>';
        }
        
        html += currentWeek + '</tr>';
        return html;
    };
    
    // 날짜별 이벤트 가져오기 (여러 개 지원)
    window.app.getEventsForDate = function(dateStr) {
        const events = [];
        
        // calendarData가 없으면 초기화
        if (!this.calendarData || !this.calendarData.events) {
            this.initCalendarData();
        }
        
        const mainEvent = this.calendarData.events[dateStr];
        if (mainEvent) {
            events.push(mainEvent);
        }
        
        // 추가 이벤트는 calendarData.events에 모두 포함되어 있으므로 별도 처리 불필요
        
        return events;
    };
    
    // 이벤트 타입 판별
    window.app.getEventType = function(event) {
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
        } else if (title.includes('바로일기')) {
            return 'localActivity';
        } else if (title.includes('위원회')) {
            return 'committee';
        }
        
        return event.type || 'committee';
    };
    
    // 이벤트 상세 보기
    window.app.showEventDetail = function(dateStr, eventId) {
        const events = this.getEventsForDate(dateStr);
        if (!events || events.length === 0) return;
        
        const event = events[0]; // 첫 번째 이벤트 표시
        const date = new Date(dateStr);
        const type = this.getEventType(event);
        const typeInfo = MEETING_TYPES[type];
        
        const modalContent = `
            <div class="gcal-event-detail">
                <div class="gcal-event-header" style="background: ${typeInfo.color}; color: ${typeInfo.textColor}">
                    <h3>${event.title}</h3>
                </div>
                <div class="gcal-event-body">
                    <div class="gcal-event-info">
                        <i class="fas fa-calendar"></i>
                        <span>${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일</span>
                    </div>
                    ${event.time ? `
                    <div class="gcal-event-info">
                        <i class="fas fa-clock"></i>
                        <span>${event.time}</span>
                    </div>
                    ` : ''}
                    <div class="gcal-event-info">
                        <i class="fas fa-tag"></i>
                        <span>${typeInfo.name}</span>
                    </div>
                </div>
            </div>
        `;
        
        // showModal 함수가 없으면 간단한 alert 사용
        if (this.showModal) {
            this.showModal('eventDetail', {
                title: '일정 상세',
                content: modalContent,
                confirmText: '확인'
            });
        } else {
            alert(`${event.title}\n${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일\n${event.time || ''}`);
        }
    };
    
    // 이벤트 리스너 추가
    window.app.attachGoogleCalendarEvents = function() {
        // 범례 체크박스 이벤트
        document.querySelectorAll('.gcal-legend-item input').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const type = e.target.dataset.type;
                const checked = e.target.checked;
                
                // 해당 타입의 이벤트 표시/숨김
                document.querySelectorAll(`.gcal-event.${type}`).forEach(event => {
                    event.style.display = checked ? 'block' : 'none';
                });
            });
        });
    };
    
    // 캘린더 데이터 초기화
    window.app.initCalendarData = function() {
        if (!this.calendarData) {
            this.calendarData = {
                currentDate: new Date(),
                viewMode: 'month',
                events: {}
            };
        }
        
        // 2025년 전체 일정 데이터 추가
        this.calendarData.events = {
            // 2025년 1월
            '2025-01-02': { type: 'plenary', status: 'present', title: '제376회 임시회 개회', time: '10:00' },
            '2025-01-06': { type: 'committee', status: 'present', title: '교육행정위원회', time: '10:00' },
            '2025-01-07': { type: 'committee', status: 'present', title: '경제노동위원회', time: '10:00' },
            '2025-01-08': { type: 'committee', status: 'present', title: '도시환경위원회', time: '10:00' },
            '2025-01-09': { type: 'committee', status: 'present', title: '문화체육관광위원회', time: '10:00' },
            '2025-01-10': { type: 'plenary', status: 'present', title: '제376회 임시회 폐회', time: '14:00' },
            '2025-01-13': { type: 'training', status: 'present', title: '의원 연수 - 정책 세미나', time: '09:00' },
            '2025-01-14': { type: 'training', status: 'present', title: '의원 연수 - 법안 심사 교육', time: '09:00' },
            '2025-01-15': { type: 'committee', status: 'present', title: '예산결산특별위원회', time: '10:00' },
            '2025-01-16': { type: 'committee', status: 'present', title: '예산결산특별위원회', time: '10:00' },
            '2025-01-17': { type: 'committee', status: 'excused', title: '예산결산특별위원회', time: '10:00', reason: '병가' },
            
            // 2025년 2월
            '2025-02-03': { type: 'plenary', status: 'scheduled', title: '제377회 임시회 개회', time: '10:00' },
            '2025-02-04': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-02-05': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-02-06': { type: 'committee', status: 'scheduled', title: '도시환경위원회', time: '10:00' },
            '2025-02-07': { type: 'committee', status: 'scheduled', title: '문화체육관광위원회', time: '10:00' },
            '2025-02-10': { type: 'special', status: 'scheduled', title: '특별위원회 - 지역균형발전', time: '10:00' },
            '2025-02-11': { type: 'special', status: 'scheduled', title: '특별위원회 - 지역균형발전', time: '10:00' },
            '2025-02-12': { type: 'plenary', status: 'scheduled', title: '제377회 임시회 폐회', time: '14:00' },
            
            // 2025년 3월
            '2025-03-03': { type: 'plenary', status: 'scheduled', title: '제378회 임시회 개회', time: '10:00' },
            '2025-03-04': { type: 'audit', status: 'scheduled', title: '행정사무감사 준비', time: '09:00' },
            '2025-03-05': { type: 'audit', status: 'scheduled', title: '행정사무감사 - 교육청', time: '09:00' },
            '2025-03-06': { type: 'audit', status: 'scheduled', title: '행정사무감사 - 도청', time: '09:00' },
            '2025-03-07': { type: 'audit', status: 'scheduled', title: '행정사무감사 - 산하기관', time: '09:00' },
            '2025-03-10': { type: 'committee', status: 'scheduled', title: '상임위원회 전체회의', time: '10:00' },
            '2025-03-11': { type: 'committee', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-03-12': { type: 'plenary', status: 'scheduled', title: '제378회 임시회 폐회', time: '14:00' },
            
            // 2025년 4월
            '2025-04-07': { type: 'plenary', status: 'scheduled', title: '제379회 임시회 개회', time: '10:00' },
            '2025-04-08': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-04-09': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-04-10': { type: 'committee', status: 'scheduled', title: '도시환경위원회', time: '10:00' },
            '2025-04-11': { type: 'committee', status: 'scheduled', title: '문화체육관광위원회', time: '10:00' },
            '2025-04-14': { type: 'budget', status: 'scheduled', title: '추경예산 심의', time: '10:00' },
            '2025-04-15': { type: 'budget', status: 'scheduled', title: '추경예산 심의', time: '10:00' },
            '2025-04-16': { type: 'budget', status: 'scheduled', title: '추경예산 심의', time: '10:00' },
            '2025-04-17': { type: 'plenary', status: 'scheduled', title: '제379회 임시회 폐회', time: '14:00' },
            
            // 2025년 5월
            '2025-05-02': { type: 'plenary', status: 'scheduled', title: '제380회 임시회 개회', time: '10:00' },
            '2025-05-07': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-05-08': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-05-09': { type: 'committee', status: 'scheduled', title: '도시환경위원회', time: '10:00' },
            '2025-05-12': { type: 'committee', status: 'scheduled', title: '문화체육관광위원회', time: '10:00' },
            '2025-05-13': { type: 'special', status: 'scheduled', title: '특별위원회 - 청년정책', time: '10:00' },
            '2025-05-14': { type: 'special', status: 'scheduled', title: '특별위원회 - 청년정책', time: '10:00' },
            '2025-05-15': { type: 'plenary', status: 'scheduled', title: '제380회 임시회 폐회', time: '14:00' },
            
            // 2025년 6월 - 이미지 참조
            '2025-06-06': { type: 'audit', status: 'scheduled', title: '현충일', time: '', isHoliday: true },
            '2025-06-10': { type: 'plenary', status: 'scheduled', title: '본회의(1)', time: '10:00' },
            '2025-06-11': { type: 'plenary', status: 'scheduled', title: '본회의(2)', time: '10:00' },
            '2025-06-12': { type: 'plenary', status: 'scheduled', title: '본회의(3)', time: '10:00' },
            '2025-06-13': { type: 'committee', status: 'scheduled', title: '상임위 활동', time: '10:00' },
            '2025-06-16': { type: 'committee', status: 'scheduled', title: '예결위 활동', time: '10:00' },
            '2025-06-17': { type: 'committee', status: 'scheduled', title: '예결위 활동', time: '10:00' },
            '2025-06-18': { type: 'committee', status: 'scheduled', title: '예결위 활동', time: '10:00' },
            '2025-06-19': { type: 'committee', status: 'scheduled', title: '예결위 활동', time: '10:00' },
            '2025-06-20': { type: 'committee', status: 'scheduled', title: '예결위 활동', time: '10:00' },
            '2025-06-23': { type: 'committee', status: 'scheduled', title: '예결위 활동', time: '10:00' },
            '2025-06-24': { type: 'committee', status: 'scheduled', title: '예결위 활동', time: '10:00' },
            '2025-06-25': { type: 'committee', status: 'scheduled', title: '예결위 활동', time: '10:00' },
            '2025-06-26': { type: 'committee', status: 'scheduled', title: '예결위 활동', time: '10:00' },
            '2025-06-27': { type: 'plenary', status: 'scheduled', title: '본회의(4)', time: '10:00' },
            
            // 2025년 7월
            '2025-07-07': { type: 'plenary', status: 'scheduled', title: '제382회 임시회 개회', time: '10:00' },
            '2025-07-08': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-07-09': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-07-10': { type: 'committee', status: 'scheduled', title: '도시환경위원회', time: '10:00' },
            '2025-07-11': { type: 'committee', status: 'scheduled', title: '문화체육관광위원회', time: '10:00' },
            '2025-07-14': { type: 'training', status: 'scheduled', title: '하계 의원연수', time: '09:00' },
            '2025-07-15': { type: 'training', status: 'scheduled', title: '하계 의원연수', time: '09:00' },
            '2025-07-16': { type: 'training', status: 'scheduled', title: '하계 의원연수', time: '09:00' },
            '2025-07-17': { type: 'plenary', status: 'scheduled', title: '제382회 임시회 폐회', time: '14:00' },
            
            // 2025년 8월
            '2025-08-04': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-05': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-06': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-07': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-08': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-11': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-12': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-13': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-14': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-15': { type: 'audit', status: 'scheduled', title: '광복절', time: '', isHoliday: true },
            '2025-08-18': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-19': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-20': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-21': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-22': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-25': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-26': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-27': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-28': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            '2025-08-29': { type: 'training', status: 'scheduled', title: '의원 지역활동', time: '09:00' },
            
            // 2025년 9월 - 실제 데이터 반영
            '2025-09-01': { type: 'audit', status: 'scheduled', title: '9월 1일', time: '', isHoliday: false },
            '2025-09-09': { type: 'training', status: 'scheduled', title: '의원_본회의', time: '10:00' },
            '2025-09-10': { type: 'training', status: 'scheduled', title: '의원_본회의', time: '10:00' },
            '2025-09-11': { type: 'committee', status: 'scheduled', title: '의원_상임위', time: '10:00' },
            '2025-09-12': { type: 'committee', status: 'scheduled', title: '의원_상임위', time: '10:00' },
            '2025-09-14': { type: 'committee', status: 'scheduled', title: '의원_상임위', time: '10:00' },
            '2025-09-15': { type: 'committee', status: 'scheduled', title: '의원_상임위', time: '10:00' },
            '2025-09-16': { type: 'committee', status: 'scheduled', title: '의원_상임위', time: '10:00' },
            '2025-09-17': { type: 'committee', status: 'scheduled', title: '의원_상임위', time: '10:00' },
            '2025-09-18': { type: 'committee', status: 'scheduled', title: '의원_상임위', time: '10:00' },
            '2025-09-19': { type: 'plenary', status: 'scheduled', title: '의원_본회의', time: '10:00' },
            '2025-09-22': { type: 'training', status: 'scheduled', title: '바로일기 교육 복부', time: '09:00' },
            '2025-09-23': { type: 'training', status: 'scheduled', title: '바로일기 교육 복부', time: '09:00' },
            '2025-09-24': { type: 'training', status: 'scheduled', title: '바로일기 교육 복부', time: '09:00' },
            '2025-09-25': { type: 'training', status: 'scheduled', title: '바로일기 교육 복부', time: '09:00' },
            '2025-09-26': { type: 'training', status: 'scheduled', title: '바로일기 교육 복부', time: '09:00' },
            
            // 2025년 10월
            '2025-10-01': { type: 'audit', status: 'scheduled', title: '국군의날', time: '', isHoliday: true },
            '2025-10-02': { type: 'committee', status: 'scheduled', title: '상임위 활동', time: '10:00' },
            '2025-10-03': { type: 'audit', status: 'scheduled', title: '개천절', time: '', isHoliday: true },
            '2025-10-06': { type: 'plenary', status: 'scheduled', title: '본회의(1)', time: '10:00' },
            '2025-10-07': { type: 'plenary', status: 'scheduled', title: '본회의(2)', time: '10:00' },
            '2025-10-08': { type: 'plenary', status: 'scheduled', title: '본회의(3)', time: '10:00' },
            '2025-10-09': { type: 'audit', status: 'scheduled', title: '한글날', time: '', isHoliday: true },
            '2025-10-10': { type: 'committee', status: 'scheduled', title: '상임위 활동', time: '10:00' },
            '2025-10-13': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-14': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-15': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-16': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-17': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-20': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-21': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-22': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-23': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-24': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-27': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-28': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-29': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-30': { type: 'audit', status: 'scheduled', title: '행정사무감사', time: '09:00' },
            '2025-10-31': { type: 'plenary', status: 'scheduled', title: '본회의(4)', time: '10:00' },
            
            // 2025년 11월
            '2025-11-03': { type: 'plenary', status: 'scheduled', title: '제385회 정례회 개회', time: '10:00' },
            '2025-11-04': { type: 'budget', status: 'scheduled', title: '예산안 제안설명', time: '10:00' },
            '2025-11-05': { type: 'budget', status: 'scheduled', title: '예산안 제안설명', time: '10:00' },
            '2025-11-06': { type: 'committee', status: 'scheduled', title: '상임위 예산 심의', time: '10:00' },
            '2025-11-07': { type: 'committee', status: 'scheduled', title: '상임위 예산 심의', time: '10:00' },
            '2025-11-10': { type: 'committee', status: 'scheduled', title: '상임위 예산 심의', time: '10:00' },
            '2025-11-11': { type: 'committee', status: 'scheduled', title: '상임위 예산 심의', time: '10:00' },
            '2025-11-12': { type: 'budget', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-11-13': { type: 'budget', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-11-14': { type: 'budget', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-11-17': { type: 'budget', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-11-18': { type: 'budget', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-11-19': { type: 'budget', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-11-20': { type: 'plenary', status: 'scheduled', title: '예산안 의결', time: '10:00' },
            '2025-11-21': { type: 'plenary', status: 'scheduled', title: '제385회 정례회 폐회', time: '14:00' },
            
            // 2025년 12월
            '2025-12-01': { type: 'plenary', status: 'scheduled', title: '제386회 임시회 개회', time: '10:00' },
            '2025-12-02': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-12-03': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-12-04': { type: 'committee', status: 'scheduled', title: '도시환경위원회', time: '10:00' },
            '2025-12-05': { type: 'committee', status: 'scheduled', title: '문화체육관광위원회', time: '10:00' },
            '2025-12-08': { type: 'special', status: 'scheduled', title: '특별위원회', time: '10:00' },
            '2025-12-09': { type: 'special', status: 'scheduled', title: '특별위원회', time: '10:00' },
            '2025-12-10': { type: 'plenary', status: 'scheduled', title: '제386회 임시회 폐회', time: '14:00' },
            '2025-12-15': { type: 'training', status: 'scheduled', title: '동계 의원연수', time: '09:00' },
            '2025-12-16': { type: 'training', status: 'scheduled', title: '동계 의원연수', time: '09:00' },
            '2025-12-17': { type: 'training', status: 'scheduled', title: '동계 의원연수', time: '09:00' },
            '2025-12-22': { type: 'training', status: 'scheduled', title: '송년 간담회', time: '14:00' }
        };
    };
    
    // 최근 출석 이력 가져오기
    window.app.getRecentAttendance = function() {
        const today = new Date();
        const recentEvents = [];
        
        // 최근 30일간의 출석 이력 찾기
        for (let i = 0; i < 30; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dateStr = this.formatDate(checkDate);
            
            if (this.calendarData.events[dateStr]) {
                const event = this.calendarData.events[dateStr];
                if (event.status === 'present' || event.status === 'excused') {
                    recentEvents.push({
                        date: checkDate,
                        dateStr: dateStr,
                        event: event
                    });
                }
            }
            
            if (recentEvents.length >= 5) break; // 최근 5개만 표시
        }
        
        if (recentEvents.length === 0) {
            return '<div style="color: #70757a; font-size: 14px;">최근 출석 이력이 없습니다.</div>';
        }
        
        return recentEvents.map(item => {
            const date = item.date;
            const event = item.event;
            const statusColor = event.status === 'present' ? '#0f9d58' : '#fbbc04';
            const statusText = event.status === 'present' ? '출석' : '청가';
            const statusIcon = event.status === 'present' ? 'fa-check-circle' : 'fa-calendar-times';
            
            return `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px; background: #f8f9fa; border-radius: 4px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="color: ${statusColor};">
                            <i class="fas ${statusIcon}"></i>
                        </div>
                        <div>
                            <div style="font-size: 14px; color: #202124; font-weight: 500;">${event.title}</div>
                            <div style="font-size: 12px; color: #70757a;">${date.getMonth() + 1}월 ${date.getDate()}일 ${event.time || ''}</div>
                        </div>
                    </div>
                    <div style="padding: 2px 8px; background: ${statusColor}; color: white; border-radius: 12px; font-size: 11px;">
                        ${statusText}
                    </div>
                </div>
            `;
        }).join('');
    };
    
    // 캘린더 네비게이션 함수들
    window.app.calendarPrevMonth = function() {
        this.calendarData.currentDate.setMonth(this.calendarData.currentDate.getMonth() - 1);
        this.renderGoogleCalendar();
    };
    
    window.app.calendarNextMonth = function() {
        this.calendarData.currentDate.setMonth(this.calendarData.currentDate.getMonth() + 1);
        this.renderGoogleCalendar();
    };
    
    window.app.calendarToday = function() {
        this.calendarData.currentDate = new Date();
        this.renderGoogleCalendar();
    };
    
    // 날짜 포맷 함수
    window.app.formatDate = function(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    // 출석 페이지 로드 시 구글 캘린더 스타일 적용
    window.app.loadAttendancePage = function() {
        console.log('구글 캘린더 스타일 출석 페이지 로딩');
        this.initCalendarData();
        console.log('캘린더 데이터 초기화 완료:', this.calendarData);
        this.renderGoogleCalendar();
        console.log('구글 캘린더 렌더링 완료');
    };
    
    console.log('Google Calendar 스타일 모듈 로드 완료');
})();