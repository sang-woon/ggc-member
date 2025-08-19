// Fixed Attendance Calendar - 2025.01.18
// 출석 캘린더 수정 버전

(function() {
    'use strict';
    
    // 기존 loadAttendancePage 함수 완전 대체
    window.app.loadAttendancePage = function() {
        console.log('출석 페이지 로딩 - 수정된 버전');
        
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;
        
        // HTML 직접 생성
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
                                <div class="stat-value" id="statPresent">14</div>
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
                                <div class="stat-value" id="statRate">93%</div>
                                <div class="stat-label">출석률</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 최근 출석 내역 -->
                <div class="gov-card">
                    <h4 class="font-semibold mb-3">최근 출석 내역</h4>
                    <div class="attendance-list">
                        <div class="attendance-item" onclick="app.showAttendanceDetail('2025-01-17')">
                            <div class="attendance-date">2025.01.17</div>
                            <div class="attendance-info">
                                <div class="attendance-type">본회의</div>
                                <div class="attendance-desc">제376회 제3차 본회의</div>
                            </div>
                            <div class="attendance-status status-present">출석</div>
                            <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                        </div>
                        <div class="attendance-item" onclick="app.showAttendanceDetail('2025-01-16')">
                            <div class="attendance-date">2025.01.16</div>
                            <div class="attendance-info">
                                <div class="attendance-type">안전행정위원회</div>
                                <div class="attendance-desc">상임위원회 회의</div>
                            </div>
                            <div class="attendance-status status-present">출석</div>
                            <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                        </div>
                        <div class="attendance-item" onclick="app.showAttendanceDetail('2025-01-15')">
                            <div class="attendance-date">2025.01.15</div>
                            <div class="attendance-info">
                                <div class="attendance-type">농정해양위원회</div>
                                <div class="attendance-desc">상임위원회 회의</div>
                            </div>
                            <div class="attendance-status status-excused">청가</div>
                            <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                        </div>
                        <div class="attendance-item" onclick="app.showAttendanceDetail('2025-01-14')">
                            <div class="attendance-date">2025.01.14</div>
                            <div class="attendance-info">
                                <div class="attendance-type">보건복지위원회</div>
                                <div class="attendance-desc">상임위원회 회의</div>
                            </div>
                            <div class="attendance-status status-present">출석</div>
                            <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                        </div>
                        <div class="attendance-item" onclick="app.showAttendanceDetail('2025-01-13')">
                            <div class="attendance-date">2025.01.13</div>
                            <div class="attendance-info">
                                <div class="attendance-type">기획재정위원회</div>
                                <div class="attendance-desc">상임위원회 회의</div>
                            </div>
                            <div class="attendance-status status-present">출석</div>
                            <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
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
    
    // 캘린더 데이터 - 2025년 경기도의회 연간 회기 일정
    window.app.calendarData = {
        currentDate: new Date(),
        viewMode: 'month',
        events: {
            // 2025년 1월 - 제376회 임시회
            '2025-01-02': { type: 'plenary', status: 'present', title: '제376회 임시회 개회', time: '10:00' },
            '2025-01-03': { type: 'committee', status: 'present', title: '교육행정위원회', time: '10:00' },
            '2025-01-06': { type: 'committee', status: 'present', title: '기획재정위원회', time: '10:00' },
            '2025-01-07': { type: 'committee', status: 'present', title: '경제노동위원회', time: '10:00' },
            '2025-01-08': { type: 'committee', status: 'present', title: '건설교통위원회', time: '10:00' },
            '2025-01-09': { type: 'committee', status: 'present', title: '문화체육관광위원회', time: '10:00' },
            '2025-01-10': { type: 'plenary', status: 'present', title: '제376회 제2차 본회의', time: '14:00' },
            '2025-01-13': { type: 'committee', status: 'present', title: '보건복지위원회', time: '10:00' },
            '2025-01-14': { type: 'committee', status: 'present', title: '농정해양위원회', time: '10:00' },
            '2025-01-15': { type: 'committee', status: 'excused', title: '안전행정위원회', time: '10:00', reason: '공무 출장' },
            '2025-01-16': { type: 'committee', status: 'present', title: '도시환경위원회', time: '10:00' },
            '2025-01-17': { type: 'plenary', status: 'present', title: '제376회 제3차 본회의', time: '14:00' },
            '2025-01-20': { type: 'committee', status: 'scheduled', title: '여성가족평생교육위원회', time: '10:00' },
            '2025-01-21': { type: 'committee', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-01-22': { type: 'plenary', status: 'scheduled', title: '제376회 제4차 본회의', time: '14:00' },
            '2025-01-23': { type: 'committee', status: 'scheduled', title: '운영위원회', time: '10:00' },
            '2025-01-24': { type: 'plenary', status: 'scheduled', title: '제376회 폐회', time: '14:00' },
            
            // 2025년 2월 - 제377회 임시회
            '2025-02-03': { type: 'plenary', status: 'scheduled', title: '제377회 임시회 개회', time: '10:00' },
            '2025-02-04': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-02-05': { type: 'committee', status: 'scheduled', title: '기획재정위원회', time: '10:00' },
            '2025-02-06': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-02-07': { type: 'plenary', status: 'scheduled', title: '제377회 제2차 본회의', time: '14:00' },
            '2025-02-10': { type: 'committee', status: 'scheduled', title: '건설교통위원회', time: '10:00' },
            '2025-02-11': { type: 'committee', status: 'scheduled', title: '보건복지위원회', time: '10:00' },
            '2025-02-12': { type: 'committee', status: 'scheduled', title: '문화체육관광위원회', time: '10:00' },
            '2025-02-13': { type: 'committee', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-02-14': { type: 'plenary', status: 'scheduled', title: '제377회 폐회', time: '14:00' },
            '2025-02-17': { type: 'committee', status: 'scheduled', title: '행정사무감사 준비', time: '10:00' },
            '2025-02-18': { type: 'committee', status: 'scheduled', title: '행정사무감사 준비', time: '10:00' },
            '2025-02-19': { type: 'committee', status: 'scheduled', title: '행정사무감사 준비', time: '10:00' },
            '2025-02-20': { type: 'plenary', status: 'scheduled', title: '의원 연수', time: '09:00' },
            '2025-02-21': { type: 'plenary', status: 'scheduled', title: '의원 연수', time: '09:00' },
            
            // 2025년 3월 - 제378회 임시회
            '2025-03-03': { type: 'plenary', status: 'scheduled', title: '제378회 임시회 개회', time: '10:00' },
            '2025-03-04': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-03-05': { type: 'committee', status: 'scheduled', title: '기획재정위원회', time: '10:00' },
            '2025-03-06': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-03-07': { type: 'plenary', status: 'scheduled', title: '제378회 제2차 본회의', time: '14:00' },
            '2025-03-10': { type: 'committee', status: 'scheduled', title: '건설교통위원회', time: '10:00' },
            '2025-03-11': { type: 'committee', status: 'scheduled', title: '보건복지위원회', time: '10:00' },
            '2025-03-12': { type: 'committee', status: 'scheduled', title: '농정해양위원회', time: '10:00' },
            '2025-03-13': { type: 'committee', status: 'scheduled', title: '안전행정위원회', time: '10:00' },
            '2025-03-14': { type: 'plenary', status: 'scheduled', title: '제378회 제3차 본회의', time: '14:00' },
            '2025-03-17': { type: 'committee', status: 'scheduled', title: '도시환경위원회', time: '10:00' },
            '2025-03-18': { type: 'committee', status: 'scheduled', title: '문화체육관광위원회', time: '10:00' },
            '2025-03-19': { type: 'committee', status: 'scheduled', title: '여성가족평생교육위원회', time: '10:00' },
            '2025-03-20': { type: 'committee', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-03-21': { type: 'plenary', status: 'scheduled', title: '제378회 폐회', time: '14:00' },
            
            // 2025년 4월 - 제379회 임시회
            '2025-04-07': { type: 'plenary', status: 'scheduled', title: '제379회 임시회 개회', time: '10:00' },
            '2025-04-08': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-04-09': { type: 'committee', status: 'scheduled', title: '기획재정위원회', time: '10:00' },
            '2025-04-10': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-04-11': { type: 'plenary', status: 'scheduled', title: '제379회 제2차 본회의', time: '14:00' },
            '2025-04-14': { type: 'committee', status: 'scheduled', title: '건설교통위원회', time: '10:00' },
            '2025-04-15': { type: 'committee', status: 'scheduled', title: '보건복지위원회', time: '10:00' },
            '2025-04-16': { type: 'committee', status: 'scheduled', title: '농정해양위원회', time: '10:00' },
            '2025-04-17': { type: 'committee', status: 'scheduled', title: '안전행정위원회', time: '10:00' },
            '2025-04-18': { type: 'plenary', status: 'scheduled', title: '제379회 폐회', time: '14:00' },
            
            // 2025년 5월 - 제380회 임시회 
            '2025-05-02': { type: 'plenary', status: 'scheduled', title: '제380회 임시회 개회', time: '10:00' },
            '2025-05-07': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-05-08': { type: 'committee', status: 'scheduled', title: '기획재정위원회', time: '10:00' },
            '2025-05-09': { type: 'plenary', status: 'scheduled', title: '제380회 제2차 본회의', time: '14:00' },
            '2025-05-12': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-05-13': { type: 'committee', status: 'scheduled', title: '건설교통위원회', time: '10:00' },
            '2025-05-14': { type: 'committee', status: 'scheduled', title: '보건복지위원회', time: '10:00' },
            '2025-05-15': { type: 'committee', status: 'scheduled', title: '문화체육관광위원회', time: '10:00' },
            '2025-05-16': { type: 'plenary', status: 'scheduled', title: '제380회 폐회', time: '14:00' },
            
            // 2025년 6월 - 제381회 제1차 정례회
            '2025-06-02': { type: 'plenary', status: 'scheduled', title: '제381회 제1차 정례회 개회', time: '10:00' },
            '2025-06-03': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-06-04': { type: 'committee', status: 'scheduled', title: '기획재정위원회', time: '10:00' },
            '2025-06-05': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-06-09': { type: 'committee', status: 'scheduled', title: '건설교통위원회', time: '10:00' },
            '2025-06-10': { type: 'committee', status: 'scheduled', title: '보건복지위원회', time: '10:00' },
            '2025-06-11': { type: 'committee', status: 'scheduled', title: '농정해양위원회', time: '10:00' },
            '2025-06-12': { type: 'committee', status: 'scheduled', title: '안전행정위원회', time: '10:00' },
            '2025-06-13': { type: 'plenary', status: 'scheduled', title: '제381회 제2차 본회의', time: '14:00' },
            '2025-06-16': { type: 'committee', status: 'scheduled', title: '도시환경위원회', time: '10:00' },
            '2025-06-17': { type: 'committee', status: 'scheduled', title: '문화체육관광위원회', time: '10:00' },
            '2025-06-18': { type: 'committee', status: 'scheduled', title: '여성가족평생교육위원회', time: '10:00' },
            '2025-06-19': { type: 'committee', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-06-20': { type: 'plenary', status: 'scheduled', title: '제381회 폐회', time: '14:00' },
            
            // 2025년 7월 - 제382회 임시회
            '2025-07-07': { type: 'plenary', status: 'scheduled', title: '제382회 임시회 개회', time: '10:00' },
            '2025-07-08': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-07-09': { type: 'committee', status: 'scheduled', title: '기획재정위원회', time: '10:00' },
            '2025-07-10': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-07-11': { type: 'plenary', status: 'scheduled', title: '제382회 제2차 본회의', time: '14:00' },
            '2025-07-14': { type: 'committee', status: 'scheduled', title: '건설교통위원회', time: '10:00' },
            '2025-07-15': { type: 'committee', status: 'scheduled', title: '보건복지위원회', time: '10:00' },
            '2025-07-16': { type: 'committee', status: 'scheduled', title: '농정해양위원회', time: '10:00' },
            '2025-07-17': { type: 'committee', status: 'scheduled', title: '안전행정위원회', time: '10:00' },
            '2025-07-18': { type: 'plenary', status: 'scheduled', title: '제382회 폐회', time: '14:00' },
            
            // 2025년 8월 - 하계 휴회 및 특별 활동
            '2025-08-01': { type: 'committee', status: 'scheduled', title: '하계 휴회 시작', time: '10:00' },
            '2025-08-04': { type: 'training', status: 'scheduled', title: '의원 연수 - 정책개발', time: '09:00' },
            '2025-08-05': { type: 'training', status: 'scheduled', title: '의원 연수 - 입법활동', time: '09:00' },
            '2025-08-06': { type: 'training', status: 'scheduled', title: '의원 연수 - 예산분석', time: '09:00' },
            '2025-08-07': { type: 'training', status: 'scheduled', title: '의원 연수 - 지방자치', time: '09:00' },
            '2025-08-08': { type: 'training', status: 'scheduled', title: '의원 연수 - 종합토론', time: '09:00' },
            '2025-08-11': { type: 'committee', status: 'scheduled', title: '지역 현안 점검', time: '10:00' },
            '2025-08-12': { type: 'committee', status: 'scheduled', title: '민원 현장 방문', time: '10:00' },
            '2025-08-13': { type: 'committee', status: 'scheduled', title: '시군 협의회', time: '14:00' },
            '2025-08-14': { type: 'committee', status: 'scheduled', title: '정책 연구회', time: '10:00' },
            '2025-08-18': { type: 'committee', status: 'scheduled', title: '의정보고회 준비', time: '10:00' },
            '2025-08-19': { type: 'committee', status: 'scheduled', title: '주민 간담회', time: '14:00' },
            '2025-08-20': { type: 'committee', status: 'scheduled', title: '의정보고회', time: '14:00' },
            '2025-08-21': { type: 'committee', status: 'scheduled', title: '정책토론회', time: '10:00' },
            '2025-08-22': { type: 'committee', status: 'scheduled', title: '9월 회기 준비', time: '10:00' },
            '2025-08-25': { type: 'committee', status: 'scheduled', title: '상임위 사전회의', time: '10:00' },
            '2025-08-26': { type: 'committee', status: 'scheduled', title: '법안 검토회의', time: '10:00' },
            '2025-08-27': { type: 'committee', status: 'scheduled', title: '예산안 사전검토', time: '10:00' },
            '2025-08-28': { type: 'committee', status: 'scheduled', title: '정책자료 준비', time: '10:00' },
            '2025-08-29': { type: 'committee', status: 'scheduled', title: '하계 휴회 종료', time: '14:00' },
            
            // 2025년 9월 - 제383회 임시회
            '2025-09-01': { type: 'plenary', status: 'scheduled', title: '제383회 임시회 개회', time: '10:00' },
            '2025-09-02': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-09-03': { type: 'committee', status: 'scheduled', title: '기획재정위원회', time: '10:00' },
            '2025-09-04': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-09-05': { type: 'plenary', status: 'scheduled', title: '제383회 제2차 본회의', time: '14:00' },
            '2025-09-15': { type: 'committee', status: 'scheduled', title: '건설교통위원회', time: '10:00' },
            '2025-09-16': { type: 'committee', status: 'scheduled', title: '보건복지위원회', time: '10:00' },
            '2025-09-17': { type: 'committee', status: 'scheduled', title: '농정해양위원회', time: '10:00' },
            '2025-09-18': { type: 'committee', status: 'scheduled', title: '안전행정위원회', time: '10:00' },
            '2025-09-19': { type: 'plenary', status: 'scheduled', title: '제383회 폐회', time: '14:00' },
            
            // 2025년 10월 - 제384회 임시회 (행정사무감사)
            '2025-10-06': { type: 'plenary', status: 'scheduled', title: '제384회 임시회 개회(행정사무감사)', time: '10:00' },
            '2025-10-07': { type: 'committee', status: 'scheduled', title: '교육행정위원회 감사', time: '10:00' },
            '2025-10-08': { type: 'committee', status: 'scheduled', title: '기획재정위원회 감사', time: '10:00' },
            '2025-10-10': { type: 'committee', status: 'scheduled', title: '경제노동위원회 감사', time: '10:00' },
            '2025-10-13': { type: 'committee', status: 'scheduled', title: '건설교통위원회 감사', time: '10:00' },
            '2025-10-14': { type: 'committee', status: 'scheduled', title: '보건복지위원회 감사', time: '10:00' },
            '2025-10-15': { type: 'committee', status: 'scheduled', title: '농정해양위원회 감사', time: '10:00' },
            '2025-10-16': { type: 'committee', status: 'scheduled', title: '안전행정위원회 감사', time: '10:00' },
            '2025-10-17': { type: 'plenary', status: 'scheduled', title: '제384회 제2차 본회의', time: '14:00' },
            '2025-10-20': { type: 'committee', status: 'scheduled', title: '도시환경위원회 감사', time: '10:00' },
            '2025-10-21': { type: 'committee', status: 'scheduled', title: '문화체육관광위원회 감사', time: '10:00' },
            '2025-10-22': { type: 'committee', status: 'scheduled', title: '여성가족평생교육위원회 감사', time: '10:00' },
            '2025-10-23': { type: 'committee', status: 'scheduled', title: '감사 결과 정리', time: '10:00' },
            '2025-10-24': { type: 'plenary', status: 'scheduled', title: '제384회 폐회', time: '14:00' },
            
            // 2025년 11월 - 제385회 제2차 정례회 (예산심의)
            '2025-11-03': { type: 'plenary', status: 'scheduled', title: '제385회 제2차 정례회 개회', time: '10:00' },
            '2025-11-04': { type: 'committee', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-11-05': { type: 'committee', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-11-06': { type: 'committee', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-11-07': { type: 'plenary', status: 'scheduled', title: '제385회 제2차 본회의', time: '14:00' },
            '2025-11-10': { type: 'committee', status: 'scheduled', title: '교육행정위원회 예산심의', time: '10:00' },
            '2025-11-11': { type: 'committee', status: 'scheduled', title: '기획재정위원회 예산심의', time: '10:00' },
            '2025-11-12': { type: 'committee', status: 'scheduled', title: '경제노동위원회 예산심의', time: '10:00' },
            '2025-11-13': { type: 'committee', status: 'scheduled', title: '건설교통위원회 예산심의', time: '10:00' },
            '2025-11-14': { type: 'plenary', status: 'scheduled', title: '제385회 제3차 본회의', time: '14:00' },
            '2025-11-17': { type: 'committee', status: 'scheduled', title: '보건복지위원회 예산심의', time: '10:00' },
            '2025-11-18': { type: 'committee', status: 'scheduled', title: '농정해양위원회 예산심의', time: '10:00' },
            '2025-11-19': { type: 'committee', status: 'scheduled', title: '안전행정위원회 예산심의', time: '10:00' },
            '2025-11-20': { type: 'committee', status: 'scheduled', title: '예산결산특별위원회 종합심사', time: '10:00' },
            '2025-11-21': { type: 'plenary', status: 'scheduled', title: '제385회 제4차 본회의', time: '14:00' },
            '2025-11-24': { type: 'committee', status: 'scheduled', title: '도시환경위원회 예산심의', time: '10:00' },
            '2025-11-25': { type: 'committee', status: 'scheduled', title: '문화체육관광위원회 예산심의', time: '10:00' },
            '2025-11-26': { type: 'committee', status: 'scheduled', title: '여성가족평생교육위원회 예산심의', time: '10:00' },
            '2025-11-27': { type: 'committee', status: 'scheduled', title: '예산결산특별위원회 최종심사', time: '10:00' },
            '2025-11-28': { type: 'plenary', status: 'scheduled', title: '제385회 폐회', time: '14:00' },
            
            // 2025년 12월 - 제386회 임시회
            '2025-12-08': { type: 'plenary', status: 'scheduled', title: '제386회 임시회 개회', time: '10:00' },
            '2025-12-09': { type: 'committee', status: 'scheduled', title: '교육행정위원회', time: '10:00' },
            '2025-12-10': { type: 'committee', status: 'scheduled', title: '기획재정위원회', time: '10:00' },
            '2025-12-11': { type: 'committee', status: 'scheduled', title: '경제노동위원회', time: '10:00' },
            '2025-12-12': { type: 'plenary', status: 'scheduled', title: '제386회 제2차 본회의', time: '14:00' },
            '2025-12-15': { type: 'committee', status: 'scheduled', title: '건설교통위원회', time: '10:00' },
            '2025-12-16': { type: 'committee', status: 'scheduled', title: '보건복지위원회', time: '10:00' },
            '2025-12-17': { type: 'committee', status: 'scheduled', title: '운영위원회', time: '10:00' },
            '2025-12-18': { type: 'committee', status: 'scheduled', title: '예산결산특별위원회', time: '10:00' },
            '2025-12-19': { type: 'plenary', status: 'scheduled', title: '제386회 폐회', time: '14:00' },
            '2025-12-22': { type: 'plenary', status: 'scheduled', title: '송년 의원 간담회', time: '14:00' },
            '2025-12-23': { type: 'committee', status: 'scheduled', title: '2026년도 의사일정 협의', time: '10:00' }
        }
    };
    
    // 캘린더 초기화
    window.app.initCalendar = function() {
        console.log('캘린더 초기화');
        this.renderCalendar();
    };
    
    // 캘린더 렌더링 - 테이블 방식
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
        const lastDay = new Date(year, month + 1, 0);
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
                
                html += `<div class="${classes}" onclick="app.showDateDetail('${dateStr}')">`;
                html += `<div class="date-number">${currentDate.getDate()}</div>`;
                
                if (event) {
                    const statusClass = this.getStatusClass(event.status);
                    const icon = event.type === 'plenary' ? 'fa-users' : 'fa-user-tie';
                    html += `<div class="attendance-indicator ${statusClass}">`;
                    html += `<i class="fas ${icon}"></i>`;
                    html += `</div>`;
                }
                
                html += '</div>';
            }
            
            html += '</div>';
        }
        
        container.innerHTML = html;
        
        // 통계 업데이트
        this.updateMonthStats();
    };
    
    // 월별 통계 업데이트
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
    
    // 이전 달
    window.app.calendarPrevMonth = function() {
        this.calendarData.currentDate.setMonth(this.calendarData.currentDate.getMonth() - 1);
        this.renderCalendar();
    };
    
    // 다음 달
    window.app.calendarNextMonth = function() {
        this.calendarData.currentDate.setMonth(this.calendarData.currentDate.getMonth() + 1);
        this.renderCalendar();
    };
    
    // 오늘로 이동
    window.app.calendarToday = function() {
        this.calendarData.currentDate = new Date();
        this.renderCalendar();
    };
    
    // 뷰 모드 설정
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
    
    // 날짜 상세 보기
    window.app.showDateDetail = function(dateStr) {
        const event = this.calendarData.events[dateStr];
        if (!event) {
            this.showNotification('해당 날짜에 일정이 없습니다.', 'info');
            return;
        }
        
        this.showAttendanceDetail(dateStr);
    };
    
    // 출석 상세 보기
    window.app.showAttendanceDetail = function(dateStr) {
        const event = this.calendarData.events[dateStr];
        if (!event) return;
        
        const date = new Date(dateStr);
        const statusText = this.getStatusText(event.status);
        const statusClass = this.getStatusClass(event.status);
        
        const location = event.type === 'plenary' ? '본회의장' : 
                        event.title.includes('위원회') ? event.title.replace('위원회', '위원회 회의실') : 
                        '회의실';
        
        this.showModalEnhanced('attendanceDetail', {
            title: '출석 상세 정보',
            icon: 'fas fa-calendar-check',
            content: `
                <div class="attendance-detail-modal">
                    <div class="detail-header ${statusClass}" style="padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                        <i class="fas fa-check-circle"></i>
                        <span>${statusText}</span>
                    </div>
                    <div class="detail-content">
                        <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">${event.title}</h4>
                        <div class="detail-info">
                            <div class="info-item" style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                                <i class="fas fa-calendar" style="width: 20px; color: #9ca3af;"></i>
                                <span>${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일</span>
                            </div>
                            <div class="info-item" style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                                <i class="fas fa-clock" style="width: 20px; color: #9ca3af;"></i>
                                <span>${event.time || '10:00'} - ${event.time === '10:00' ? '12:00' : '17:00'}</span>
                            </div>
                            <div class="info-item" style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                                <i class="fas fa-map-marker-alt" style="width: 20px; color: #9ca3af;"></i>
                                <span>경기도의회 ${location}</span>
                            </div>
                            ${event.reason ? `
                                <div class="info-item" style="padding: 8px 0;">
                                    <i class="fas fa-info-circle" style="width: 20px; color: #9ca3af;"></i>
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
    
    window.app.getStatusClass = function(status) {
        const classes = {
            'present': 'status-present',
            'excused': 'status-excused',
            'absent': 'status-absent',
            'scheduled': 'status-scheduled'
        };
        return classes[status] || '';
    };
    
    window.app.getStatusText = function(status) {
        const texts = {
            'present': '출석',
            'excused': '청가',
            'absent': '결석',
            'scheduled': '예정'
        };
        return texts[status] || '';
    };
    
    console.log('출석 캘린더 수정 버전 로드 완료');
})();