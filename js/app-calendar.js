// App Calendar - 캘린더 및 일정 관리 기능
Object.assign(window.app, {
    // 캘린더 초기화
    initCalendar: function() {
        const currentDate = new Date();
        window.currentCalendarDate = currentDate;
        this.renderCalendar();
    },

    // 캘린더 렌더링
    renderCalendar: function() {
        const date = window.currentCalendarDate || new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // 월 헤더 업데이트
        const monthElement = document.getElementById('calendarMonth');
        if (monthElement) {
            monthElement.textContent = `${year}년 ${month + 1}월`;
        }

        // 이번 달 첫날과 마지막날
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const calendarDates = document.getElementById('calendarDates');
        if (!calendarDates) return;

        let html = '';
        const today = new Date();
        
        // 회의 일정 데이터
        const schedules = {
            '2025-01-15': [{type: 'complete', title: '국정감사', color: 'bg-green-500'}],
            '2025-01-20': [{type: 'scheduled', title: '상임위', color: 'bg-blue-500'}],
            '2025-01-22': [{type: 'scheduled', title: '법안심의', color: 'bg-blue-500'}],
            '2025-01-25': [{type: 'pending', title: '동의안', color: 'bg-yellow-500'}],
            '2025-01-28': [{type: 'scheduled', title: '본회의', color: 'bg-red-500'}]
        };

        // 6주간 표시
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dateStr = currentDate.toISOString().split('T')[0];
            const isCurrentMonth = currentDate.getMonth() === month;
            const isToday = currentDate.toDateString() === today.toDateString();
            const daySchedules = schedules[dateStr] || [];

            html += `
                <div class="min-h-16 p-1 border-b border-r border-gray-100 ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 cursor-pointer"
                     onclick="app.selectDate('${dateStr}')">
                    <div class="text-sm ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'} ${isToday ? 'font-bold text-blue-600' : ''}">
                        ${currentDate.getDate()}
                    </div>
                    <div class="space-y-1 mt-1">
                        ${daySchedules.map(schedule => `
                            <div class="${schedule.color} text-white text-xs rounded px-1 py-0.5 truncate" title="${schedule.title}">
                                ${schedule.title}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        calendarDates.innerHTML = html;
    },

    // 이전 달
    prevMonth: function() {
        if (window.currentCalendarDate) {
            window.currentCalendarDate.setMonth(window.currentCalendarDate.getMonth() - 1);
            this.renderCalendar();
        }
    },

    // 다음 달  
    nextMonth: function() {
        if (window.currentCalendarDate) {
            window.currentCalendarDate.setMonth(window.currentCalendarDate.getMonth() + 1);
            this.renderCalendar();
        }
    },

    // 날짜 선택
    selectDate: function(dateStr) {
        const schedules = {
            '2025-01-15': [{type: 'complete', title: '교육부 국정감사', time: '10:00-18:00', location: '국정감사장', status: '완료'}],
            '2025-01-20': [{type: 'scheduled', title: '국정감사 결과 보고서 심의', time: '14:00-17:00', location: '교육위원회 회의실', status: '예정'}],
            '2025-01-22': [{type: 'scheduled', title: '사립학교법 개정안 심의', time: '14:00-17:00', location: '교육위원회 회의실', status: '예정'}],
            '2025-01-25': [{type: 'pending', title: '교육감 임명 동의안', time: '미정', location: '미정', status: '검토중'}],
            '2025-01-28': [{type: 'scheduled', title: '제410회 국회 정기회', time: '14:00-18:00', location: '국회 본회의장', status: '예정'}]
        };

        const daySchedules = schedules[dateStr];
        if (!daySchedules || daySchedules.length === 0) {
            app.showNotification('선택한 날짜에 일정이 없습니다.', 'info');
            return;
        }

        const date = new Date(dateStr);
        const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;

        app.showModal('daySchedule', {
            title: `${formattedDate} 일정`,
            content: `
                <div class="space-y-3">
                    ${daySchedules.map(schedule => `
                        <div class="border border-gray-200 rounded-lg p-3">
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-medium">${schedule.title}</div>
                                <span class="px-2 py-1 rounded-full text-xs ${
                                    schedule.status === '완료' ? 'bg-green-100 text-green-800' :
                                    schedule.status === '예정' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }">${schedule.status}</span>
                            </div>
                            <div class="text-sm text-gray-600 space-y-1">
                                <div><i class="fas fa-clock mr-2"></i>${schedule.time}</div>
                                <div><i class="fas fa-map-marker-alt mr-2"></i>${schedule.location}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `,
            showCancel: false
        });
    },

    // 일정 추가
    addSchedule: function() {
        app.showModal('addSchedule', {
            title: '새 일정 추가',
            content: `
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">제목</label>
                        <input type="text" id="scheduleTitle" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="회의 제목을 입력하세요">
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                            <input type="date" id="scheduleDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">시간</label>
                            <input type="time" id="scheduleTime" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">장소</label>
                        <input type="text" id="scheduleLocation" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="회의실 또는 장소">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">유형</label>
                        <select id="scheduleType" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="committee">상임위원회</option>
                            <option value="plenary">본회의</option>
                            <option value="meeting">간담회</option>
                            <option value="other">기타</option>
                        </select>
                    </div>
                </div>
            `,
            showCancel: true,
            onConfirm: () => {
                const title = document.getElementById('scheduleTitle')?.value;
                const date = document.getElementById('scheduleDate')?.value;
                const time = document.getElementById('scheduleTime')?.value;
                const location = document.getElementById('scheduleLocation')?.value;
                
                if (title && date) {
                    app.showNotification('일정이 추가되었습니다.', 'success');
                    app.renderCalendar(); // 캘린더 새로고침
                } else {
                    app.showNotification('제목과 날짜는 필수입니다.', 'error');
                    return false;
                }
            }
        });
    },

    // 일정표 보기 (홈에서 호출)
    showSchedule: function() {
        this.showCommitteeSchedule();
    },

    // 회의 일정 관리
    showCommitteeSchedule: function() {
        app.showModal('committeeSchedule', {
            title: '교육위원회 회의 일정',
            content: `
                <div class="space-y-4">
                    <!-- 캘린더 헤더 -->
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-2">
                            <button onclick="app.prevMonth()" class="p-2 hover:bg-gray-100 rounded">
                                <i class="fas fa-chevron-left text-gray-600"></i>
                            </button>
                            <h3 id="calendarMonth" class="text-lg font-bold text-blue-800">2025년 1월</h3>
                            <button onclick="app.nextMonth()" class="p-2 hover:bg-gray-100 rounded">
                                <i class="fas fa-chevron-right text-gray-600"></i>
                            </button>
                        </div>
                        <div class="flex space-x-2">
                            <button onclick="app.addSchedule()" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                                <i class="fas fa-plus mr-1"></i>일정 추가
                            </button>
                        </div>
                    </div>

                    <!-- 캘린더 본체 -->
                    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <!-- 요일 헤더 -->
                        <div class="grid grid-cols-7 bg-gray-50">
                            <div class="p-2 text-center text-sm font-medium text-red-600">일</div>
                            <div class="p-2 text-center text-sm font-medium text-gray-700">월</div>
                            <div class="p-2 text-center text-sm font-medium text-gray-700">화</div>
                            <div class="p-2 text-center text-sm font-medium text-gray-700">수</div>
                            <div class="p-2 text-center text-sm font-medium text-gray-700">목</div>
                            <div class="p-2 text-center text-sm font-medium text-gray-700">금</div>
                            <div class="p-2 text-center text-sm font-medium text-blue-600">토</div>
                        </div>
                        
                        <!-- 캘린더 날짜 -->
                        <div id="calendarDates" class="grid grid-cols-7">
                            <!-- 동적으로 생성됨 -->
                        </div>
                    </div>

                    <!-- 일정 범례 -->
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="text-sm font-medium mb-2">일정 범례</div>
                        <div class="flex flex-wrap gap-4 text-xs">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                <span>본회의</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                <span>상임위</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span>간담회</span>
                            </div>
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                                <span>기타</span>
                            </div>
                        </div>
                    </div>

                    <!-- 다음 회의 정보 -->
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="font-bold text-blue-800 mb-2">
                            <i class="fas fa-calendar-check mr-2"></i>다음 회의 일정
                        </div>
                        <div class="text-sm text-gray-700">
                            <div class="font-medium">국정감사 결과 보고서 심의</div>
                            <div class="text-gray-600 mt-1">
                                📅 2025년 1월 20일 (월) 14:00-17:00<br>
                                📍 국회의사당 교육위원회 회의실 (9층)
                            </div>
                        </div>
                    </div>
                </div>
            `,
            showCancel: true,
            onConfirm: () => {
                app.showNotification('회의 일정이 캘린더에 동기화되었습니다.', 'success');
            },
            onShow: () => {
                app.initCalendar();
            }
        });
    }
});