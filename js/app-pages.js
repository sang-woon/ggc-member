// App Pages - Page Loading and Content Management
Object.assign(window.app, {
    // Load Home Page - Original Design with Photos and Tailwind
    loadHomePage: function() {
        console.log('🏠 loadHomePage 함수 실행됨 - 원본 템플릿 사용');
        const template = document.getElementById('homePage');
        if (template) {
            const content = template.content.cloneNode(true);
            const mainContent = document.getElementById('mainContent');
            if (mainContent) {
                mainContent.innerHTML = '';
                
                // 버전 표시 추가
                const versionBadge = document.createElement('div');
                versionBadge.style.cssText = `
                    position: fixed;
                    top: 60px;
                    right: 10px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                `;
                versionBadge.innerHTML = `
                    <span style="font-size: 13px; font-weight: 700;">v2.1</span>
                    <span style="opacity: 0.9;">2025.01.18</span>
                `;
                mainContent.appendChild(versionBadge);
                mainContent.appendChild(content);
                
                // 이벤트 리스너 추가 - 이벤트 위임 방식 사용
                setTimeout(() => {
                    console.log('이벤트 위임 설정 시작...');
                    
                    // 이벤트 위임을 위한 클릭 핸들러
                    mainContent.addEventListener('click', function(e) {
                        const target = e.target;
                        
                        // 클릭된 요소 또는 부모 요소 확인
                        const clickedElement = target.closest('[onclick]');
                        
                        if (clickedElement) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const onclickAttr = clickedElement.getAttribute('onclick');
                            console.log('클릭 감지:', onclickAttr);
                            
                            // onclick 속성의 내용을 직접 실행
                            try {
                                // eval을 사용하여 실행 (window.app 컨텍스트에서)
                                eval(onclickAttr);
                                console.log('✅ 함수 실행 성공');
                            } catch(err) {
                                console.error('❌ onclick 실행 오류:', err);
                                console.error('오류 상세:', err.stack);
                                
                                // 함수 이름과 파라미터를 파싱해서 직접 호출
                                try {
                                    const match = onclickAttr.match(/window\.app\.(\w+)\((.*?)\)/);
                                    if (match) {
                                        const funcName = match[1];
                                        const params = match[2];
                                        
                                        console.log('함수명:', funcName);
                                        console.log('파라미터:', params);
                                        
                                        if (window.app[funcName]) {
                                            if (params) {
                                                // 파라미터가 있는 경우
                                                const paramArray = params.split(',').map(p => {
                                                    const trimmed = p.trim();
                                                    // 문자열인 경우 따옴표 제거
                                                    if ((trimmed.startsWith("'") && trimmed.endsWith("'")) || 
                                                        (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
                                                        return trimmed.slice(1, -1);
                                                    }
                                                    // 숫자인 경우
                                                    if (!isNaN(trimmed)) {
                                                        return parseInt(trimmed);
                                                    }
                                                    return trimmed;
                                                });
                                                window.app[funcName](...paramArray);
                                            } else {
                                                // 파라미터가 없는 경우
                                                window.app[funcName]();
                                            }
                                            console.log('✅ 직접 호출 성공');
                                        } else {
                                            console.error('❌ 함수를 찾을 수 없습니다:', funcName);
                                        }
                                    }
                                } catch(err2) {
                                    console.error('❌ 직접 호출 실패:', err2);
                                }
                            }
                        }
                    });
                    
                    console.log('✅ 이벤트 위임 설정 완료');
                    
                    // 차트 초기화
                    this.initMonthlyChart();
                }, 100);
            }
        }
    },

    // 의정활동 성과보고서 표시
    showPerformanceReport: function() {
        const content = `
            <div class="space-y-6">
                <!-- 종합 성과 개요 -->
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                    <h3 class="text-xl font-bold mb-4">📊 김영수 의원 의정활동 종합 성과</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-white bg-opacity-20 rounded-lg p-3">
                            <div class="text-2xl font-bold">98.5%</div>
                            <div class="text-sm opacity-90">출석률 (전체 평균 대비 +12.3%)</div>
                        </div>
                        <div class="bg-white bg-opacity-20 rounded-lg p-3">
                            <div class="text-2xl font-bold">32건</div>
                            <div class="text-sm opacity-90">법안 발의 (동기 의원 평균 18건)</div>
                        </div>
                        <div class="bg-white bg-opacity-20 rounded-lg p-3">
                            <div class="text-2xl font-bold">248건</div>
                            <div class="text-sm opacity-90">민원 처리 (처리율 94%)</div>
                        </div>
                        <div class="bg-white bg-opacity-20 rounded-lg p-3">
                            <div class="text-2xl font-bold">15회</div>
                            <div class="text-sm opacity-90">본회의 발언 (5분발언 8회)</div>
                        </div>
                    </div>
                </div>

                <!-- 월별 활동 추이 -->
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 class="font-semibold mb-3 flex items-center">
                        <i class="fas fa-chart-line mr-2 text-blue-600"></i>
                        월별 의정활동 추이 (2024.6월 - 2025.1월)
                    </h4>
                    <div class="relative h-32 bg-gray-50 rounded flex items-end justify-around p-2">
                        <div class="flex flex-col items-center">
                            <div class="w-6 bg-blue-500 rounded-t" style="height: 45px;"></div>
                            <span class="text-xs mt-1">6월</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="w-6 bg-blue-500 rounded-t" style="height: 60px;"></div>
                            <span class="text-xs mt-1">7월</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="w-6 bg-blue-500 rounded-t" style="height: 75px;"></div>
                            <span class="text-xs mt-1">8월</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="w-6 bg-blue-500 rounded-t" style="height: 85px;"></div>
                            <span class="text-xs mt-1">9월</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="w-6 bg-blue-500 rounded-t" style="height: 95px;"></div>
                            <span class="text-xs mt-1">10월</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="w-6 bg-blue-500 rounded-t" style="height: 100px;"></div>
                            <span class="text-xs mt-1">11월</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="w-6 bg-blue-500 rounded-t" style="height: 110px;"></div>
                            <span class="text-xs mt-1">12월</span>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="w-6 bg-green-500 rounded-t" style="height: 120px;"></div>
                            <span class="text-xs mt-1">1월</span>
                        </div>
                    </div>
                </div>

                <!-- 주요 성과 및 업적 -->
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 class="font-semibold mb-3 flex items-center">
                        <i class="fas fa-trophy mr-2 text-yellow-600"></i>
                        주요 성과 및 업적
                    </h4>
                    <div class="space-y-3">
                        <div class="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                            <i class="fas fa-medal text-green-600 mt-1"></i>
                            <div>
                                <div class="font-medium text-green-800">교육위원회 위원장 취임</div>
                                <div class="text-sm text-green-700">2024년 7월, 전체 15명 위원으로 구성된 교육위원회 위원장으로 선출</div>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                            <i class="fas fa-gavel text-blue-600 mt-1"></i>
                            <div>
                                <div class="font-medium text-blue-800">청년 주거안정 특별법안 대표발의</div>
                                <div class="text-sm text-blue-700">2024년 12월, 청년층 주거 문제 해결을 위한 포괄적 법안 제출</div>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                            <i class="fas fa-users text-purple-600 mt-1"></i>
                            <div>
                                <div class="font-medium text-purple-800">지역 교육발전 협의체 구성</div>
                                <div class="text-sm text-purple-700">수원시갑 지역 내 학교, 학부모, 지역사회가 참여하는 협의체 출범</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 분야별 활동 현황 -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                        <h5 class="font-semibold mb-3 text-gray-800">💼 위원회 활동</h5>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>교육위원회 출석</span>
                                <span class="font-medium text-green-600">48/50회 (96%)</span>
                            </div>
                            <div class="flex justify-between">
                                <span>예산결산특위 출석</span>
                                <span class="font-medium text-green-600">15/15회 (100%)</span>
                            </div>
                            <div class="flex justify-between">
                                <span>법안심사소위 참여</span>
                                <span class="font-medium text-blue-600">23회</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-4 rounded-lg border border-gray-200">
                        <h5 class="font-semibold mb-3 text-gray-800">🏛️ 본회의 활동</h5>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>본회의 출석</span>
                                <span class="font-medium text-green-600">197/200회 (98.5%)</span>
                            </div>
                            <div class="flex justify-between">
                                <span>대정부질문</span>
                                <span class="font-medium text-blue-600">4회</span>
                            </div>
                            <div class="flex justify-between">
                                <span>5분 자유발언</span>
                                <span class="font-medium text-blue-600">8회</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 지역구 활동 -->
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 class="font-semibold mb-3 flex items-center">
                        <i class="fas fa-map-marker-alt mr-2 text-red-600"></i>
                        수원시갑 지역구 활동 현황
                    </h4>
                    <div class="grid grid-cols-3 gap-3 text-sm">
                        <div class="text-center p-3 bg-gray-50 rounded">
                            <div class="text-lg font-bold text-blue-600">156회</div>
                            <div class="text-gray-600">현장방문</div>
                        </div>
                        <div class="text-center p-3 bg-gray-50 rounded">
                            <div class="text-lg font-bold text-green-600">89회</div>
                            <div class="text-gray-600">주민간담회</div>
                        </div>
                        <div class="text-center p-3 bg-gray-50 rounded">
                            <div class="text-lg font-bold text-purple-600">67개</div>
                            <div class="text-gray-600">지역현안 해결</div>
                        </div>
                    </div>
                </div>

                <!-- 언론 활동 및 보도자료 -->
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 class="font-semibold mb-3 flex items-center">
                        <i class="fas fa-newspaper mr-2 text-gray-600"></i>
                        언론 활동 및 홍보
                    </h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span>보도자료 발표</span>
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">34건</span>
                        </div>
                        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span>언론 인터뷰</span>
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">18회</span>
                        </div>
                        <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span>SNS 소통 게시물</span>
                            <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">127개</span>
                        </div>
                    </div>
                </div>
                
                <!-- 향후 계획 -->
                <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 class="font-semibold mb-3 flex items-center text-yellow-800">
                        <i class="fas fa-lightbulb mr-2"></i>
                        향후 추진 계획 (2025년)
                    </h4>
                    <ul class="space-y-2 text-sm text-yellow-800">
                        <li class="flex items-start">
                            <i class="fas fa-chevron-right mr-2 mt-1 text-xs"></i>
                            <span>청년 주거안정 특별법안 국회 통과 추진</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-chevron-right mr-2 mt-1 text-xs"></i>
                            <span>수원시갑 지역 교육인프라 확충 프로젝트</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-chevron-right mr-2 mt-1 text-xs"></i>
                            <span>스마트 교육 도시 조성을 위한 조례 제정</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-chevron-right mr-2 mt-1 text-xs"></i>
                            <span>취약계층 교육지원 강화 방안 마련</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;

        this.showModal('performance-report', {
            title: '📈 의정활동 성과보고서',
            content: content,
            modalClass: 'modal-scrollable modal-wide',
            buttons: [
                {
                    text: '📄 PDF 다운로드',
                    class: 'bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 mr-2',
                    onclick: 'app.downloadPerformanceReport()'
                },
                {
                    text: '📊 상세 통계',
                    class: 'bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 mr-2',
                    onclick: 'app.showDetailedStats()'
                },
                {
                    text: '확인',
                    class: 'btn-primary',
                    onclick: 'app.closeModal()'
                }
            ]
        });
    },

    // 성과보고서 PDF 다운로드 (시뮬레이션)
    downloadPerformanceReport: function() {
        this.showNotification('성과보고서 PDF를 생성 중입니다...', 'info');
        setTimeout(() => {
            this.showNotification('성과보고서가 다운로드되었습니다.', 'success');
        }, 2000);
    },

    // 상세 통계 보기
    showDetailedStats: function() {
        this.closeModal();
        this.navigateTo('report');
    },

    // 월간 차트 초기화
    initMonthlyChart: function() {
        const canvas = document.getElementById('monthlyChart');
        if (canvas && typeof Chart !== 'undefined') {
            // Chart.js의 getChart 메서드로 기존 차트 확인
            const existingChart = Chart.getChart(canvas);
            if (existingChart) {
                existingChart.destroy();
            }
            
            // 기존 차트가 있다면 제거
            if (this.monthlyChart && typeof this.monthlyChart.destroy === 'function') {
                try {
                    this.monthlyChart.destroy();
                } catch(e) {
                    console.log('차트 제거 중 오류:', e);
                }
                this.monthlyChart = null;
            }
            
            const ctx = canvas.getContext('2d');
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
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
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

    // QR 코드 초기화
    initQRCode: function() {
        const qrContainer = document.getElementById('qrcode');
        if (qrContainer) {
            // QRious가 로드되지 않은 경우 대체 QR 코드 생성
            if (typeof QRious !== 'undefined') {
                try {
                    const qr = new QRious({
                        element: qrContainer,
                        value: `https://member.gg.go.kr/verify/${this.memberData.memberId}?timestamp=${Date.now()}`,
                        size: 120,
                        level: 'H'
                    });
                } catch (error) {
                    this.createFallbackQR(qrContainer);
                }
            } else {
                this.createFallbackQR(qrContainer);
            }
        }
    },

    // 대체 QR 코드 생성
    createFallbackQR: function(container) {
        container.innerHTML = `
            <div class="w-30 h-30 bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                <div class="text-center">
                    <i class="fas fa-qrcode text-2xl text-gray-500 mb-1"></i>
                    <div class="text-xs text-gray-500">QR 코드</div>
                </div>
            </div>
        `;
    },

    // 실시간 시간 업데이트
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
            
            const lastAuthElement = document.getElementById('last-auth');
            if (lastAuthElement) {
                lastAuthElement.textContent = '방금 전';
            }
        };
        
        updateTime();
        setInterval(updateTime, 1000);
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
                
                // 캘린더 초기화
                setTimeout(() => {
                    if (window.AttendanceCalendar) {
                        console.log('출석 캘린더 초기화 시작');
                        window.AttendanceCalendar.init();
                    } else {
                        console.error('AttendanceCalendar 객체를 찾을 수 없습니다');
                    }
                }, 100);
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
                            <img src="images/annomimus.jpg" alt="김영수 의원" class="w-full h-full object-cover">
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
                            <div><i class="fas fa-phone mr-2 text-gray-500"></i>031-xxx-xxxx</div>
                            <div><i class="fas fa-envelope mr-2 text-gray-500"></i>kimys@gg.go.kr</div>
                            <div><i class="fas fa-building mr-2 text-gray-500"></i>경기도의회 xxx호</div>
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
                        <div class="activity-item" onclick="app.showBillDetail('2024-001', '주택임대차보호법 일부개정법률안')" style="cursor: pointer;">
                            <div class="activity-icon bg-green-50">
                                <i class="fas fa-file-signature text-green-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">주택임대차보호법 일부개정법률안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-blue-600">대표발의</span> • 2024.12.15 • 공동발의자 15명
                                </div>
                                <div class="activity-date text-xs">교육위원회 심사완료</div>
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
                        
                        <div class="activity-item" onclick="app.showBillDetail('2024-002', '사립학교법 일부개정법률안')" style="cursor: pointer;">
                            <div class="activity-icon bg-blue-50">
                                <i class="fas fa-file-alt text-blue-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">사립학교법 일부개정법률안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-blue-600">대표발의</span> • 2024.12.10 • 공동발의자 8명
                                </div>
                                <div class="activity-date text-xs">교육위원회 심사중</div>
                                <div class="flex gap-2 mt-2">
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">교육</span>
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">투명성</span>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="gov-badge">심사중</span>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                            </div>
                        </div>
                        
                        <div class="activity-item" onclick="app.showBillDetail('2024-003', '경기도 교육환경 개선 조례안')" style="cursor: pointer;">
                            <div class="activity-icon bg-purple-50">
                                <i class="fas fa-scroll text-purple-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">경기도 교육환경 개선 조례안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-green-600">공동발의</span> • 2024.12.05 • 대표발의: 박○○
                                </div>
                                <div class="activity-date text-xs">교육위원회 접수</div>
                                <div class="flex gap-2 mt-2">
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">교육환경</span>
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">조례</span>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="gov-badge">접수</span>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                            </div>
                        </div>
                        
                        <div class="activity-item" onclick="app.showBillDetail('2024-004', '청년창업 지원 조례 개정안')" style="cursor: pointer;">
                            <div class="activity-icon bg-orange-50">
                                <i class="fas fa-rocket text-orange-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">청년창업 지원 조례 개정안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-blue-600">대표발의</span> • 2024.11.28 • 공동발의자 12명
                                </div>
                                <div class="activity-date text-xs">경제노동위원회 가결</div>
                                <div class="flex gap-2 mt-2">
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">청년</span>
                                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">창업</span>
                                </div>
                            </div>
                            <div class="text-right">
                                <span class="gov-badge gov-badge-active">가결</span>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 새 법안 발의 -->
                <div class="gov-card">
                    <button class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition" onclick="app.showNewBillForm()">
                        <i class="fas fa-plus mr-2"></i>
                        새 법안 발의하기
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
                    
                    <!-- 통계 요약 -->
                    <div class="grid grid-cols-3 gap-3 mb-4">
                        <div class="text-center p-3 bg-blue-50 rounded">
                            <div class="text-xl font-bold text-blue-600">${this.memberData.speeches}</div>
                            <div class="text-xs text-gray-600">총 발언 횟수</div>
                        </div>
                        <div class="text-center p-3 bg-green-50 rounded">
                            <div class="text-xl font-bold text-green-600">8</div>
                            <div class="text-xs text-gray-600">5분 자유발언</div>
                        </div>
                        <div class="text-center p-3 bg-purple-50 rounded">
                            <div class="text-xl font-bold text-purple-600">7</div>
                            <div class="text-xs text-gray-600">도정질문</div>
                        </div>
                    </div>
                    
                    <!-- 발언 유형 필터 -->
                    <div class="flex gap-2 overflow-x-auto pb-2">
                        <button class="px-3 py-1 bg-blue-600 text-white rounded-full text-xs whitespace-nowrap">전체</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">5분 자유발언</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">도정질문</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">긴급현안질문</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">대정부질문</button>
                    </div>
                </div>
                
                <!-- 최근 발언 목록 -->
                <div class="gov-card">
                    <h4 class="font-semibold mb-3">최근 발언 내역</h4>
                    
                    <div class="space-y-3">
                        <div class="activity-item" onclick="app.showSpeechDetail('2024-s001', '청년 주거안정 특별법안 제정 촉구')" style="cursor: pointer;">
                            <div class="activity-icon bg-blue-50">
                                <i class="fas fa-microphone text-blue-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">청년 주거안정 특별법안 제정 촉구</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-blue-600">5분 자유발언</span> • 2025.01.15 14:30
                                </div>
                                <div class="activity-date text-xs">제372회 경기도의회(임시회) 제3차 본회의</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                        
                        <div class="activity-item" onclick="app.showSpeechDetail('2024-s002', '교육환경 개선 방안 질의')" style="cursor: pointer;">
                            <div class="activity-icon bg-purple-50">
                                <i class="fas fa-question-circle text-purple-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">교육환경 개선 방안 질의</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-purple-600">도정질문</span> • 2025.01.12 15:45
                                </div>
                                <div class="activity-date text-xs">교육위원회 정기회의</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                        
                        <div class="activity-item" onclick="app.showSpeechDetail('2024-s003', '소상공인 지원 정책 확대 요청')" style="cursor: pointer;">
                            <div class="activity-icon bg-green-50">
                                <i class="fas fa-hand-holding-heart text-green-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">소상공인 지원 정책 확대 요청</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-green-600">긴급현안질문</span> • 2025.01.08 10:20
                                </div>
                                <div class="activity-date text-xs">제372회 경기도의회(임시회) 제2차 본회의</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                        
                        <div class="activity-item" onclick="app.showSpeechDetail('2024-s004', '지역균형발전 촉진방안')" style="cursor: pointer;">
                            <div class="activity-icon bg-orange-50">
                                <i class="fas fa-balance-scale text-orange-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">지역균형발전 촉진방안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-orange-600">대정부질문</span> • 2025.01.05 14:15
                                </div>
                                <div class="activity-date text-xs">제372회 경기도의회(임시회) 제1차 본회의</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                        
                        <div class="activity-item" onclick="app.showSpeechDetail('2024-s005', '학교급식 품질관리 강화')" style="cursor: pointer;">
                            <div class="activity-icon bg-blue-50">
                                <i class="fas fa-utensils text-blue-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">학교급식 품질관리 강화</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-blue-600">5분 자유발언</span> • 2024.12.28 16:00
                                </div>
                                <div class="activity-date text-xs">제371회 경기도의회(정기회) 본회의</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </div>
                        
                        <div class="activity-item" onclick="app.showSpeechDetail('2024-s002')" style="cursor: pointer;">
                            <div class="activity-icon bg-green-50">
                                <i class="fas fa-question-circle text-green-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">교육 예산 편성 관련 도정질문</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-green-600">도정질문</span> • 2025.07.10 10:15
                                </div>
                                <div class="activity-date text-xs">제372회 경기도의회(임시회) 제2차 본회의</div>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
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
                <!-- 예산 심사 현황 요약 -->
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">
                        <i class="fas fa-calculator text-orange-600 mr-2"></i>
                        예산 심사 현황
                    </h3>
                    
                    <!-- 통계 요약 -->
                    <div class="grid grid-cols-3 gap-3 mb-4">
                        <div class="text-center p-3 bg-blue-50 rounded">
                            <div class="text-xl font-bold text-blue-600">15</div>
                            <div class="text-xs text-gray-600">심사 완료</div>
                        </div>
                        <div class="text-center p-3 bg-orange-50 rounded">
                            <div class="text-xl font-bold text-orange-600">3</div>
                            <div class="text-xs text-gray-600">심사 중</div>
                        </div>
                        <div class="text-center p-3 bg-purple-50 rounded">
                            <div class="text-xl font-bold text-purple-600">2,500억</div>
                            <div class="text-xs text-gray-600">총 심사 예산</div>
                        </div>
                    </div>
                    
                    <!-- 심사 유형 필터 -->
                    <div class="flex gap-2 overflow-x-auto pb-2">
                        <button class="px-3 py-1 bg-blue-600 text-white rounded-full text-xs whitespace-nowrap">전체</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">본예산</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">추경예산</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">특별회계</button>
                        <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs whitespace-nowrap">기금</button>
                    </div>
                </div>
                
                <!-- 최근 예산 심사 내역 -->
                <div class="gov-card">
                    <h4 class="font-semibold mb-3">최근 예산 심사 내역</h4>
                    
                    <div class="space-y-3">
                        <div class="activity-item" onclick="app.showBudgetDetail('2025-b001', '2025년도 교육환경 개선 사업 예산안')" style="cursor: pointer;">
                            <div class="activity-icon bg-orange-50">
                                <i class="fas fa-school text-orange-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">2025년도 교육환경 개선 사업 예산안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-orange-600">본예산</span> • 125억원 • 2024.11.25 심사
                                </div>
                                <div class="activity-date text-xs">경기도교육청 소관 • 교육위원회</div>
                            </div>
                            <div class="text-right">
                                <span class="gov-badge gov-badge-active">가결</span>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                            </div>
                        </div>
                        
                        <div class="activity-item" onclick="app.showBudgetDetail('2025-b002', '청년 일자리 창출 사업 예산안')" style="cursor: pointer;">
                            <div class="activity-icon bg-green-50">
                                <i class="fas fa-users text-green-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">청년 일자리 창출 사업 예산안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-green-600">특별회계</span> • 85억원 • 2024.11.20 심사
                                </div>
                                <div class="activity-date text-xs">경기도 소관 • 경제노동위원회</div>
                            </div>
                            <div class="text-right">
                                <span class="gov-badge gov-badge-active">가결</span>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                            </div>
                        </div>
                        
                        <div class="activity-item" onclick="app.showBudgetDetail('2025-b003', '도시재생 뉴딜사업 예산안')" style="cursor: pointer;">
                            <div class="activity-icon bg-blue-50">
                                <i class="fas fa-building text-blue-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">도시재생 뉴딜사업 예산안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-blue-600">본예산</span> • 200억원 • 2024.11.15 심사
                                </div>
                                <div class="activity-date text-xs">경기도 소관 • 건설교통위원회</div>
                            </div>
                            <div class="text-right">
                                <span class="gov-badge">심사중</span>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                            </div>
                        </div>
                        
                        <div class="activity-item" onclick="app.showBudgetDetail('2025-b004', '경기도 문화예술 진흥 기금')" style="cursor: pointer;">
                            <div class="activity-icon bg-purple-50">
                                <i class="fas fa-palette text-purple-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">경기도 문화예술 진흥 기금</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-purple-600">기금</span> • 50억원 • 2024.11.10 심사
                                </div>
                                <div class="activity-date text-xs">경기도 소관 • 문화체육관광위원회</div>
                            </div>
                            <div class="text-right">
                                <span class="gov-badge gov-badge-active">가결</span>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
                            </div>
                        </div>
                        
                        <div class="activity-item" onclick="app.showBudgetDetail('2025-b005', '환경보전 특별회계 예산안')" style="cursor: pointer;">
                            <div class="activity-icon bg-green-50">
                                <i class="fas fa-leaf text-green-600"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">환경보전 특별회계 예산안</div>
                                <div class="activity-desc text-xs">
                                    <span class="text-green-600">특별회계</span> • 180억원 • 2024.11.05 심사
                                </div>
                                <div class="activity-date text-xs">경기도 소관 • 환경농정위원회</div>
                            </div>
                            <div class="text-right">
                                <span class="gov-badge gov-badge-active">가결</span>
                                <i class="fas fa-chevron-right text-gray-400 ml-2"></i>
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
                <div class="gov-card">
                    <h3 class="gov-title mb-4">교육 이수</h3>
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-book-reader text-4xl mb-4"></i>
                        <div>교육 이수 기능은 준비 중입니다.</div>
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
                <!-- 상임위 현황 요약 -->
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">
                        <i class="fas fa-users text-blue-600 mr-2"></i>
                        상임위 의원조직 관리
                    </h3>
                    
                    <!-- 내 상임위 정보 -->
                    <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="text-sm text-gray-600">내 소속 상임위</div>
                                <div class="font-bold text-lg text-blue-800">교육위원회 (위원장)</div>
                                <div class="text-sm text-gray-600 mt-1">총 20명 의원 • 여당 11명, 야당 9명</div>
                            </div>
                            <div class="text-right">
                                <div class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">위원장</div>
                                <div class="text-xs text-gray-600 mt-1">임기: 2024.06 ~ 2026.05</div>
                            </div>
                        </div>
                    </div>

                    <!-- 빠른 액션 버튼 -->
                    <div class="grid grid-cols-2 gap-3 mb-4">
                        <button onclick="app.showCommitteeSchedule()" class="bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-blue-700 transition-colors">
                            <i class="fas fa-calendar-alt mr-2"></i>
                            회의 일정 관리
                        </button>
                        <button onclick="app.showEducationCommitteeContacts()" class="bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-green-700 transition-colors">
                            <i class="fas fa-address-book mr-2"></i>
                            위원회 연락처
                        </button>
                    </div>
                </div>

                <!-- 위원회별 필터 -->
                <div class="gov-card mb-4">
                    <h4 class="font-bold mb-3">위원회별 조회</h4>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <button onclick="app.filterCommittee('all')" class="committee-filter active bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">전체</button>
                        <button onclick="app.filterCommittee('favorites')" class="committee-filter bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm">
                            <i class="fas fa-star mr-1"></i>즐겨찾기
                        </button>
                        <button onclick="app.filterCommittee('education')" class="committee-filter bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm">교육위원회</button>
                        <button onclick="app.filterCommittee('budget')" class="committee-filter bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm">예산결산특별위원회</button>
                        <button onclick="app.filterCommittee('justice')" class="committee-filter bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm">법제사법위원회</button>
                        <button onclick="app.filterCommittee('economy')" class="committee-filter bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm">기획재정위원회</button>
                    </div>

                    <!-- 검색 -->
                    <div class="relative">
                        <input type="text" id="memberSearch" placeholder="의원명, 지역구, 정당으로 검색..." 
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               oninput="app.searchMembers(this.value)">
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>

                <!-- 의원 목록 -->
                <div class="gov-card">
                    <div class="flex items-center justify-between mb-4">
                        <h4 class="font-bold">의원 목록</h4>
                        <div class="flex items-center space-x-2">
                            <button onclick="app.exportMemberList()" class="text-blue-600 text-sm hover:underline">
                                <i class="fas fa-download mr-1"></i>연락처 내보내기
                            </button>
                        </div>
                    </div>
                    
                    <div id="membersList" class="space-y-3">
                        <!-- 동적으로 생성되는 의원 목록 -->
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
            // 의원 목록 초기화
            this.initCommitteeMembers();
        }
    },

    // 상임위 의원 목록 초기화
    initCommitteeMembers: function() {
        const members = [
            {
                name: '김영수',
                party: '국민의힘',
                district: '경기 수원시갑',
                committee: 'education',
                role: '위원장',
                phone: '02-788-2001',
                email: 'kim@assembly.go.kr',
                office: '국회의사당 502호',
                isChairman: true,
                isMe: true
            },
            {
                name: '이민정',
                party: '더불어민주당',
                district: '서울 강남구을',
                committee: 'education',
                role: '간사',
                phone: '02-788-2002',
                email: 'lee@assembly.go.kr',
                office: '국회의사당 505호',
                isChairman: false,
                isMe: false
            },
            {
                name: '박철수',
                party: '국민의힘',
                district: '부산 해운대구갑',
                committee: 'education',
                role: '위원',
                phone: '02-788-2003',
                email: 'park@assembly.go.kr',
                office: '국회의사당 510호',
                isChairman: false,
                isMe: false
            },
            {
                name: '정미영',
                party: '더불어민주당',
                district: '대구 중구남구',
                committee: 'budget',
                role: '위원',
                phone: '02-788-2004',
                email: 'jung@assembly.go.kr',
                office: '국회의사당 515호',
                isChairman: false,
                isMe: false
            },
            {
                name: '최준호',
                party: '국민의힘',
                district: '인천 연수구',
                committee: 'justice',
                role: '위원',
                phone: '02-788-2005',
                email: 'choi@assembly.go.kr',
                office: '국회의사당 520호',
                isChairman: false,
                isMe: false
            }
        ];

        this.displayMembers(members);
        window.currentMembers = members; // 전역 저장
    },

    // 의원 목록 표시
    displayMembers: function(members) {
        const membersList = document.getElementById('membersList');
        if (!membersList) return;

        const html = members.map(member => `
            <div class="member-card bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-gray-500"></i>
                        </div>
                        <div>
                            <div class="flex items-center space-x-2">
                                <span class="font-bold text-lg">${member.name}</span>
                                ${member.isMe ? '<span class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">본인</span>' : ''}
                                ${member.isChairman ? '<span class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">위원장</span>' : ''}
                                ${member.role === '간사' ? '<span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs">간사</span>' : ''}
                            </div>
                            <div class="text-sm text-gray-600">${member.party} • ${member.district}</div>
                            <div class="text-xs text-gray-500 mt-1">${this.getCommitteeName(member.committee)}</div>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <button onclick="app.toggleFavorite('${member.name}')" class="favorite-btn bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs hover:bg-yellow-400 transition-colors" data-member="${member.name}">
                            <i class="fas fa-star mr-1"></i><span class="favorite-text">즐찾</span>
                        </button>
                        <button onclick="app.callMember('${member.phone}')" class="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors">
                            <i class="fas fa-phone mr-1"></i>전화
                        </button>
                        <button onclick="app.showMemberDetail('${member.name}')" class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
                            <i class="fas fa-info-circle mr-1"></i>상세
                        </button>
                    </div>
                </div>
                
                <!-- 상세 정보 (접을 수 있음) -->
                <div class="mt-3 pt-3 border-t border-gray-100 text-sm space-y-1">
                    <div><i class="fas fa-envelope text-gray-400 mr-2 w-4"></i>${member.email}</div>
                    <div><i class="fas fa-map-marker-alt text-gray-400 mr-2 w-4"></i>${member.office}</div>
                    
                    <!-- 메모 영역 -->
                    <div class="mt-2">
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-500">개인 메모</span>
                            <button onclick="app.editMemo('${member.name}')" class="text-blue-500 text-xs hover:underline">
                                <i class="fas fa-edit mr-1"></i>편집
                            </button>
                        </div>
                        <div id="memo-${member.name}" class="text-xs text-gray-600 mt-1 bg-yellow-50 p-2 rounded min-h-8">
                            <!-- 저장된 메모가 여기에 표시됨 -->
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        membersList.innerHTML = html;
        
        // 즐겨찾기와 메모 상태 복원
        this.restoreFavoritesAndMemos();
    },

    // 즐겨찾기와 메모 상태 복원
    restoreFavoritesAndMemos: function() {
        const favorites = JSON.parse(localStorage.getItem('memberFavorites') || '[]');
        const memos = JSON.parse(localStorage.getItem('memberMemos') || '{}');
        
        // 즐겨찾기 버튼 상태 복원
        favorites.forEach(memberName => {
            const btn = document.querySelector(`[data-member="${memberName}"]`);
            if (btn) {
                btn.classList.remove('bg-gray-200', 'text-gray-700');
                btn.classList.add('bg-yellow-400', 'text-white');
                btn.querySelector('.favorite-text').textContent = '★';
            }
        });
        
        // 메모 내용 복원
        Object.keys(memos).forEach(memberName => {
            const memoElement = document.getElementById(`memo-${memberName}`);
            if (memoElement && memos[memberName]) {
                memoElement.textContent = memos[memberName];
            }
        });
    },

    // 즐겨찾기 토글
    toggleFavorite: function(memberName) {
        const favorites = JSON.parse(localStorage.getItem('memberFavorites') || '[]');
        const btn = document.querySelector(`[data-member="${memberName}"]`);
        const isFavorite = favorites.includes(memberName);
        
        if (isFavorite) {
            // 즐겨찾기 제거
            const index = favorites.indexOf(memberName);
            favorites.splice(index, 1);
            btn.classList.remove('bg-yellow-400', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
            btn.querySelector('.favorite-text').textContent = '즐찾';
            app.showToast(`${memberName} 의원이 즐겨찾기에서 제거되었습니다.`, 'info');
        } else {
            // 즐겨찾기 추가
            favorites.push(memberName);
            btn.classList.remove('bg-gray-200', 'text-gray-700');
            btn.classList.add('bg-yellow-400', 'text-white');
            btn.querySelector('.favorite-text').textContent = '★';
            app.showToast(`${memberName} 의원이 즐겨찾기에 추가되었습니다.`, 'success');
        }
        
        localStorage.setItem('memberFavorites', JSON.stringify(favorites));
    },

    // 메모 편집
    editMemo: function(memberName) {
        const memos = JSON.parse(localStorage.getItem('memberMemos') || '{}');
        const currentMemo = memos[memberName] || '';
        
        app.showModal('editMemo', {
            title: `${memberName} 의원 메모`,
            content: `
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">개인 메모</label>
                        <textarea id="memoText" rows="5" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="${memberName} 의원에 대한 메모를 작성하세요...">${currentMemo}</textarea>
                    </div>
                    <div class="text-xs text-gray-500">
                        <i class="fas fa-info-circle mr-1"></i>
                        메모는 기기에 안전하게 저장되며 본인만 볼 수 있습니다.
                    </div>
                </div>
            `,
            showCancel: true,
            onConfirm: () => {
                const newMemo = document.getElementById('memoText')?.value.trim() || '';
                
                if (newMemo) {
                    memos[memberName] = newMemo;
                    app.showToast('메모가 저장되었습니다.', 'success');
                } else {
                    delete memos[memberName];
                    app.showToast('메모가 삭제되었습니다.', 'info');
                }
                
                localStorage.setItem('memberMemos', JSON.stringify(memos));
                
                // 메모 영역 업데이트
                const memoElement = document.getElementById(`memo-${memberName}`);
                if (memoElement) {
                    memoElement.textContent = newMemo || '';
                }
            }
        });
    },

    // 위원회명 변환
    getCommitteeName: function(code) {
        const names = {
            'education': '교육위원회',
            'budget': '예산결산특별위원회',
            'justice': '법제사법위원회',
            'economy': '기획재정위원회'
        };
        return names[code] || '기타위원회';
    },

    // 위원회 필터링
    filterCommittee: function(committee) {
        const buttons = document.querySelectorAll('.committee-filter');
        buttons.forEach(btn => {
            btn.classList.remove('active', 'bg-blue-600', 'text-white');
            if (!btn.classList.contains('bg-yellow-500')) {
                btn.classList.add('bg-gray-200', 'text-gray-700');
            }
        });
        
        // 즐겨찾기 버튼 특별 처리
        if (committee === 'favorites') {
            event.target.classList.add('active');
            event.target.classList.remove('bg-gray-200', 'text-gray-700');
        } else {
            event.target.classList.add('active', 'bg-blue-600', 'text-white');
            event.target.classList.remove('bg-gray-200', 'text-gray-700');
        }

        let filteredMembers = window.currentMembers || [];
        
        if (committee === 'favorites') {
            // 즐겨찾기 필터
            const favorites = JSON.parse(localStorage.getItem('memberFavorites') || '[]');
            filteredMembers = filteredMembers.filter(member => favorites.includes(member.name));
        } else if (committee !== 'all') {
            // 위원회별 필터
            filteredMembers = filteredMembers.filter(member => member.committee === committee);
        }
        
        this.displayMembers(filteredMembers);
    },

    // 의원 검색
    searchMembers: function(query) {
        if (!window.currentMembers) return;
        
        const filtered = window.currentMembers.filter(member => 
            member.name.includes(query) ||
            member.party.includes(query) ||
            member.district.includes(query)
        );
        
        this.displayMembers(filtered);
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
                app.showToast('회의 일정이 캘린더에 동기화되었습니다.', 'success');
            },
            onShow: () => {
                app.initCalendar();
            }
        });
    },

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
            app.showToast('선택한 날짜에 일정이 없습니다.', 'info');
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
                    app.showToast('일정이 추가되었습니다.', 'success');
                    app.renderCalendar(); // 캘린더 새로고침
                } else {
                    app.showToast('제목과 날짜는 필수입니다.', 'error');
                    return false;
                }
            }
        });
    },

    // 의원 연락처 모달
    showMemberDirectory: function() {
        app.showModal('memberDirectory', {
            title: '교육위원회 연락처',
            content: `
                <div class="space-y-3">
                    <div class="text-sm text-gray-600 mb-4">빠른 연락을 위한 주요 의원 연락처입니다.</div>
                    
                    <div class="bg-blue-50 p-3 rounded">
                        <div class="font-bold">김영수 위원장 (본인)</div>
                        <div class="text-sm">📞 02-788-2001 • ✉️ kim@assembly.go.kr</div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-bold">이민정 간사 (더불어민주당)</div>
                        <div class="text-sm">📞 02-788-2002 • ✉️ lee@assembly.go.kr</div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="font-bold">박철수 위원 (국민의힘)</div>
                        <div class="text-sm">📞 02-788-2003 • ✉️ park@assembly.go.kr</div>
                    </div>
                    
                    <div class="mt-4 p-3 bg-yellow-50 rounded">
                        <div class="text-sm text-yellow-800">
                            <i class="fas fa-info-circle mr-2"></i>
                            긴급 연락 시 위원장실 (02-788-2001)로 우선 연락하세요.
                        </div>
                    </div>
                </div>
            `,
            showCancel: false
        });
    },

    // 의원 전화걸기
    callMember: function(phone) {
        if (confirm(`${phone}로 전화를 걸까요?`)) {
            // 실제로는 전화 앱 실행
            window.location.href = `tel:${phone}`;
            app.showToast('전화 연결 중...', 'info');
        }
    },

    // 의원 상세 정보
    showMemberDetail: function(memberName) {
        const member = window.currentMembers?.find(m => m.name === memberName);
        if (!member) return;
        
        app.showModal('memberDetail', {
            title: `${member.name} 의원 상세정보`,
            content: `
                <div class="space-y-4">
                    <div class="text-center">
                        <div class="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <i class="fas fa-user text-2xl text-gray-500"></i>
                        </div>
                        <div class="font-bold text-xl">${member.name}</div>
                        <div class="text-gray-600">${member.party} • ${member.district}</div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div class="font-medium text-gray-700">소속 위원회</div>
                            <div>${this.getCommitteeName(member.committee)}</div>
                        </div>
                        <div>
                            <div class="font-medium text-gray-700">직책</div>
                            <div>${member.role}</div>
                        </div>
                        <div>
                            <div class="font-medium text-gray-700">전화번호</div>
                            <div>${member.phone}</div>
                        </div>
                        <div>
                            <div class="font-medium text-gray-700">이메일</div>
                            <div class="text-xs">${member.email}</div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="font-medium text-gray-700 mb-2">사무실 위치</div>
                        <div class="text-sm">${member.office}</div>
                    </div>
                    
                    <div class="flex space-x-2 pt-4">
                        <button onclick="app.callMember('${member.phone}')" class="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">
                            <i class="fas fa-phone mr-2"></i>전화걸기
                        </button>
                        <button onclick="window.location.href='mailto:${member.email}'" class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            <i class="fas fa-envelope mr-2"></i>이메일
                        </button>
                    </div>
                </div>
            `,
            showCancel: false
        });
    },

    // 연락처 내보내기
    exportMemberList: function() {
        const csvContent = window.currentMembers?.map(member => 
            `${member.name},${member.party},${member.district},${member.phone},${member.email},${member.office}`
        ).join('\n');
        
        const header = '이름,정당,지역구,전화번호,이메일,사무실\n';
        const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', '상임위_의원_연락처.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            app.showToast('연락처 파일이 다운로드되었습니다.', 'success');
        }
    },
    
    // Load Staff Directory Page
    loadStaffDirectoryPage: function() {
        const html = `
            <div class="page-container">
                <!-- 탭 헤더 -->
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">
                        <i class="fas fa-address-book text-blue-600 mr-2"></i>
                        직원 조회
                    </h3>
                    
                    <!-- 탭 메뉴 -->
                    <div class="flex space-x-2 mb-4">
                        <button onclick="app.switchStaffTab('parliament')" class="staff-tab active bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            의회사무처
                        </button>
                        <button onclick="app.switchStaffTab('executive')" class="staff-tab bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                            집행부
                        </button>
                    </div>

                    <!-- 검색 -->
                    <div class="relative mb-4">
                        <input type="text" id="staffSearch" placeholder="이름, 부서, 직책으로 검색..." 
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               oninput="app.searchStaff(this.value)">
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>

                    <!-- 빠른 액션 -->
                    <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 mb-4">
                        <button onclick="app.showStaffDirectoryContacts()" class="w-full bg-gray-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-gray-700 transition-colors">
                            <i class="fas fa-address-book mr-2"></i>
                            의회사무처 전체 연락처 보기
                        </button>
                    </div>

                    <!-- 부서별 필터 -->
                    <div id="departmentFilters" class="flex flex-wrap gap-2 mb-4">
                        <!-- 동적으로 생성됨 -->
                    </div>
                </div>

                <!-- 직원 목록 -->
                <div class="gov-card">
                    <div class="flex items-center justify-between mb-4">
                        <h4 class="font-bold">직원 목록</h4>
                        <div class="flex items-center space-x-2">
                            <button onclick="app.exportStaffList()" class="text-blue-600 text-sm hover:underline">
                                <i class="fas fa-download mr-1"></i>연락처 내보내기
                            </button>
                        </div>
                    </div>
                    
                    <div id="staffList" class="space-y-3">
                        <!-- 동적으로 생성되는 직원 목록 -->
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
            // 직원 목록 초기화
            this.initStaffDirectory();
        }
    },

    // 직원 목록 초기화
    initStaffDirectory: function() {
        // 의회사무처 직원 데이터
        const parliamentStaff = [
            {
                name: '박사무관',
                department: '의사국',
                position: '의사국장',
                phone: '02-788-3001',
                email: 'park.clerk@assembly.go.kr',
                office: '의사국 3층 301호',
                responsibilities: ['본회의 운영', '회의록 작성', '의사일정 관리'],
                type: 'parliament'
            },
            {
                name: '김주무관',
                department: '의사국',
                position: '주무관',
                phone: '02-788-3002',
                email: 'kim.staff@assembly.go.kr',
                office: '의사국 3층 302호',
                responsibilities: ['상임위 지원', '회의 준비'],
                type: 'parliament'
            },
            {
                name: '이총무',
                department: '총무과',
                position: '총무과장',
                phone: '02-788-3101',
                email: 'lee.admin@assembly.go.kr',
                office: '총무과 2층 201호',
                responsibilities: ['인사 관리', '예산 편성', '시설 관리'],
                type: 'parliament'
            },
            {
                name: '정법무관',
                department: '법제처',
                position: '법제처장',
                phone: '02-788-3201',
                email: 'jung.legal@assembly.go.kr',
                office: '법제처 4층 401호',
                responsibilities: ['법안 검토', '법제 자문', '조례 심사'],
                type: 'parliament'
            },
            {
                name: '최비서관',
                department: '의장실',
                position: '비서관',
                phone: '02-788-3301',
                email: 'choi.sec@assembly.go.kr',
                office: '의장실 5층 501호',
                responsibilities: ['의장 비서', '일정 관리', '대외 업무'],
                type: 'parliament'
            }
        ];

        // 집행부 직원 데이터
        const executiveStaff = [
            {
                name: '홍국장',
                department: '기획재정과',
                position: '과장',
                phone: '031-249-2001',
                email: 'hong.finance@suwon.go.kr',
                office: '시청 본관 3층',
                responsibilities: ['예산 편성', '재정 운용', '투자 심사'],
                type: 'executive'
            },
            {
                name: '서교육장',
                department: '교육지원과',
                position: '교육장',
                phone: '031-249-2101',
                email: 'seo.edu@suwon.go.kr',
                office: '교육청 본관 2층',
                responsibilities: ['교육 정책', '학교 지원', '교육 예산'],
                type: 'executive'
            },
            {
                name: '임복지관',
                department: '사회복지과',
                position: '과장',
                phone: '031-249-2201',
                email: 'lim.welfare@suwon.go.kr',
                office: '시청 별관 1층',
                responsibilities: ['복지 정책', '사회보장', '취약계층 지원'],
                type: 'executive'
            },
            {
                name: '강환경관',
                department: '환경정책과',
                position: '과장',
                phone: '031-249-2301',
                email: 'kang.env@suwon.go.kr',
                office: '시청 본관 4층',
                responsibilities: ['환경 보전', '폐기물 관리', '대기질 개선'],
                type: 'executive'
            },
            {
                name: '조문화관',
                department: '문화체육과',
                position: '과장',
                phone: '031-249-2401',
                email: 'cho.culture@suwon.go.kr',
                office: '문화센터 2층',
                responsibilities: ['문화 정책', '체육 진흥', '관광 개발'],
                type: 'executive'
            }
        ];

        window.currentStaff = {
            parliament: parliamentStaff,
            executive: executiveStaff
        };

        window.currentStaffType = 'parliament';
        this.displayStaff('parliament');
        this.updateDepartmentFilters('parliament');
    },

    // 직원 탭 전환
    switchStaffTab: function(type) {
        const buttons = document.querySelectorAll('.staff-tab');
        buttons.forEach(btn => {
            btn.classList.remove('active', 'bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        });
        
        event.target.classList.add('active', 'bg-blue-600', 'text-white');
        event.target.classList.remove('bg-gray-200', 'text-gray-700');

        window.currentStaffType = type;
        this.displayStaff(type);
        this.updateDepartmentFilters(type);
    },

    // 부서별 필터 업데이트
    updateDepartmentFilters: function(type) {
        const staff = window.currentStaff[type];
        const departments = [...new Set(staff.map(s => s.department))];
        
        const filtersElement = document.getElementById('departmentFilters');
        if (!filtersElement) return;

        const html = `
            <button onclick="app.filterStaffDepartment('all')" class="dept-filter active bg-blue-600 text-white px-3 py-2 rounded-lg text-sm">전체</button>
            ${departments.map(dept => `
                <button onclick="app.filterStaffDepartment('${dept}')" class="dept-filter bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm">${dept}</button>
            `).join('')}
        `;
        
        filtersElement.innerHTML = html;
    },

    // 직원 목록 표시
    displayStaff: function(type) {
        const staff = window.currentStaff[type];
        const staffList = document.getElementById('staffList');
        if (!staffList) return;

        const html = staff.map(person => `
            <div class="staff-card bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <i class="fas fa-user-tie text-gray-500"></i>
                        </div>
                        <div>
                            <div class="flex items-center space-x-2">
                                <span class="font-bold text-lg">${person.name}</span>
                                <span class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">${person.position}</span>
                            </div>
                            <div class="text-sm text-gray-600">${person.department}</div>
                            <div class="text-xs text-gray-500 mt-1">${person.responsibilities.join(', ')}</div>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <button onclick="app.toggleStaffFavorite('${person.name}')" class="staff-favorite-btn bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs hover:bg-yellow-400 transition-colors" data-staff="${person.name}">
                            <i class="fas fa-star mr-1"></i><span class="favorite-text">즐찾</span>
                        </button>
                        <button onclick="app.callStaff('${person.phone}')" class="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors">
                            <i class="fas fa-phone mr-1"></i>전화
                        </button>
                        <button onclick="app.showStaffDetail('${person.name}')" class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
                            <i class="fas fa-info-circle mr-1"></i>상세
                        </button>
                    </div>
                </div>
                
                <!-- 상세 정보 -->
                <div class="mt-3 pt-3 border-t border-gray-100 text-sm space-y-1">
                    <div><i class="fas fa-envelope text-gray-400 mr-2 w-4"></i>${person.email}</div>
                    <div><i class="fas fa-map-marker-alt text-gray-400 mr-2 w-4"></i>${person.office}</div>
                    
                    <!-- 메모 영역 -->
                    <div class="mt-2">
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-500">개인 메모</span>
                            <button onclick="app.editStaffMemo('${person.name}')" class="text-blue-500 text-xs hover:underline">
                                <i class="fas fa-edit mr-1"></i>편집
                            </button>
                        </div>
                        <div id="staff-memo-${person.name}" class="text-xs text-gray-600 mt-1 bg-yellow-50 p-2 rounded min-h-8">
                            <!-- 저장된 메모가 여기에 표시됨 -->
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        staffList.innerHTML = html;
        
        // 즐겨찾기와 메모 상태 복원
        this.restoreStaffFavoritesAndMemos();
    },

    // 직원 즐겨찾기와 메모 상태 복원
    restoreStaffFavoritesAndMemos: function() {
        const favorites = JSON.parse(localStorage.getItem('staffFavorites') || '[]');
        const memos = JSON.parse(localStorage.getItem('staffMemos') || '{}');
        
        // 즐겨찾기 버튼 상태 복원
        favorites.forEach(staffName => {
            const btn = document.querySelector(`[data-staff="${staffName}"]`);
            if (btn) {
                btn.classList.remove('bg-gray-200', 'text-gray-700');
                btn.classList.add('bg-yellow-400', 'text-white');
                btn.querySelector('.favorite-text').textContent = '★';
            }
        });
        
        // 메모 내용 복원
        Object.keys(memos).forEach(staffName => {
            const memoElement = document.getElementById(`staff-memo-${staffName}`);
            if (memoElement && memos[staffName]) {
                memoElement.textContent = memos[staffName];
            }
        });
    },

    // 부서별 필터링
    filterStaffDepartment: function(department) {
        const buttons = document.querySelectorAll('.dept-filter');
        buttons.forEach(btn => {
            btn.classList.remove('active', 'bg-blue-600', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
        });
        
        event.target.classList.add('active', 'bg-blue-600', 'text-white');
        event.target.classList.remove('bg-gray-200', 'text-gray-700');

        const allStaff = window.currentStaff[window.currentStaffType];
        let filteredStaff = allStaff;
        
        if (department !== 'all') {
            filteredStaff = allStaff.filter(staff => staff.department === department);
        }
        
        this.displayFilteredStaff(filteredStaff);
    },

    // 필터된 직원 목록 표시
    displayFilteredStaff: function(staff) {
        const staffList = document.getElementById('staffList');
        if (!staffList) return;

        const html = staff.map(person => `
            <div class="staff-card bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <i class="fas fa-user-tie text-gray-500"></i>
                        </div>
                        <div>
                            <div class="flex items-center space-x-2">
                                <span class="font-bold text-lg">${person.name}</span>
                                <span class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">${person.position}</span>
                            </div>
                            <div class="text-sm text-gray-600">${person.department}</div>
                            <div class="text-xs text-gray-500 mt-1">${person.responsibilities.join(', ')}</div>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <button onclick="app.toggleStaffFavorite('${person.name}')" class="staff-favorite-btn bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs hover:bg-yellow-400 transition-colors" data-staff="${person.name}">
                            <i class="fas fa-star mr-1"></i><span class="favorite-text">즐찾</span>
                        </button>
                        <button onclick="app.callStaff('${person.phone}')" class="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors">
                            <i class="fas fa-phone mr-1"></i>전화
                        </button>
                        <button onclick="app.showStaffDetail('${person.name}')" class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
                            <i class="fas fa-info-circle mr-1"></i>상세
                        </button>
                    </div>
                </div>
                
                <!-- 상세 정보 -->
                <div class="mt-3 pt-3 border-t border-gray-100 text-sm space-y-1">
                    <div><i class="fas fa-envelope text-gray-400 mr-2 w-4"></i>${person.email}</div>
                    <div><i class="fas fa-map-marker-alt text-gray-400 mr-2 w-4"></i>${person.office}</div>
                    
                    <!-- 메모 영역 -->
                    <div class="mt-2">
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-500">개인 메모</span>
                            <button onclick="app.editStaffMemo('${person.name}')" class="text-blue-500 text-xs hover:underline">
                                <i class="fas fa-edit mr-1"></i>편집
                            </button>
                        </div>
                        <div id="staff-memo-${person.name}" class="text-xs text-gray-600 mt-1 bg-yellow-50 p-2 rounded min-h-8">
                            <!-- 저장된 메모가 여기에 표시됨 -->
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        staffList.innerHTML = html;
        this.restoreStaffFavoritesAndMemos();
    },

    // 직원 검색
    searchStaff: function(query) {
        const allStaff = window.currentStaff[window.currentStaffType];
        if (!allStaff) return;
        
        const filtered = allStaff.filter(staff => 
            staff.name.includes(query) ||
            staff.department.includes(query) ||
            staff.position.includes(query) ||
            staff.responsibilities.some(r => r.includes(query))
        );
        
        this.displayFilteredStaff(filtered);
    },

    // 직원 즐겨찾기 토글
    toggleStaffFavorite: function(staffName) {
        const favorites = JSON.parse(localStorage.getItem('staffFavorites') || '[]');
        const btn = document.querySelector(`[data-staff="${staffName}"]`);
        const isFavorite = favorites.includes(staffName);
        
        if (isFavorite) {
            const index = favorites.indexOf(staffName);
            favorites.splice(index, 1);
            btn.classList.remove('bg-yellow-400', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-700');
            btn.querySelector('.favorite-text').textContent = '즐찾';
            app.showToast(`${staffName}이 즐겨찾기에서 제거되었습니다.`, 'info');
        } else {
            favorites.push(staffName);
            btn.classList.remove('bg-gray-200', 'text-gray-700');
            btn.classList.add('bg-yellow-400', 'text-white');
            btn.querySelector('.favorite-text').textContent = '★';
            app.showToast(`${staffName}이 즐겨찾기에 추가되었습니다.`, 'success');
        }
        
        localStorage.setItem('staffFavorites', JSON.stringify(favorites));
    },

    // 직원 메모 편집
    editStaffMemo: function(staffName) {
        const memos = JSON.parse(localStorage.getItem('staffMemos') || '{}');
        const currentMemo = memos[staffName] || '';
        
        app.showModal('editStaffMemo', {
            title: `${staffName} 메모`,
            content: `
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">개인 메모</label>
                        <textarea id="staffMemoText" rows="5" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="${staffName}에 대한 메모를 작성하세요...">${currentMemo}</textarea>
                    </div>
                    <div class="text-xs text-gray-500">
                        <i class="fas fa-info-circle mr-1"></i>
                        메모는 기기에 안전하게 저장되며 본인만 볼 수 있습니다.
                    </div>
                </div>
            `,
            showCancel: true,
            onConfirm: () => {
                const newMemo = document.getElementById('staffMemoText')?.value.trim() || '';
                
                if (newMemo) {
                    memos[staffName] = newMemo;
                    app.showToast('메모가 저장되었습니다.', 'success');
                } else {
                    delete memos[staffName];
                    app.showToast('메모가 삭제되었습니다.', 'info');
                }
                
                localStorage.setItem('staffMemos', JSON.stringify(memos));
                
                // 메모 영역 업데이트
                const memoElement = document.getElementById(`staff-memo-${staffName}`);
                if (memoElement) {
                    memoElement.textContent = newMemo || '';
                }
            }
        });
    },

    // 직원 전화걸기
    callStaff: function(phone) {
        if (confirm(`${phone}로 전화를 걸까요?`)) {
            window.location.href = `tel:${phone}`;
            app.showToast('전화 연결 중...', 'info');
        }
    },

    // 직원 상세 정보
    showStaffDetail: function(staffName) {
        const allStaff = [...window.currentStaff.parliament, ...window.currentStaff.executive];
        const staff = allStaff.find(s => s.name === staffName);
        if (!staff) return;
        
        app.showModal('staffDetail', {
            title: `${staff.name} 상세정보`,
            content: `
                <div class="space-y-4">
                    <div class="text-center">
                        <div class="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <i class="fas fa-user-tie text-2xl text-gray-500"></i>
                        </div>
                        <div class="font-bold text-xl">${staff.name}</div>
                        <div class="text-gray-600">${staff.department} • ${staff.position}</div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <div class="font-medium text-gray-700">부서</div>
                            <div>${staff.department}</div>
                        </div>
                        <div>
                            <div class="font-medium text-gray-700">직책</div>
                            <div>${staff.position}</div>
                        </div>
                        <div>
                            <div class="font-medium text-gray-700">전화번호</div>
                            <div>${staff.phone}</div>
                        </div>
                        <div>
                            <div class="font-medium text-gray-700">이메일</div>
                            <div class="text-xs">${staff.email}</div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="font-medium text-gray-700 mb-2">사무실 위치</div>
                        <div class="text-sm">${staff.office}</div>
                    </div>
                    
                    <div>
                        <div class="font-medium text-gray-700 mb-2">담당 업무</div>
                        <div class="flex flex-wrap gap-2">
                            ${staff.responsibilities.map(resp => `
                                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">${resp}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="flex space-x-2 pt-4">
                        <button onclick="app.callStaff('${staff.phone}')" class="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">
                            <i class="fas fa-phone mr-2"></i>전화걸기
                        </button>
                        <button onclick="window.location.href='mailto:${staff.email}'" class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            <i class="fas fa-envelope mr-2"></i>이메일
                        </button>
                    </div>
                </div>
            `,
            showCancel: false
        });
    },

    // 직원 연락처 내보내기
    exportStaffList: function() {
        const allStaff = window.currentStaff[window.currentStaffType];
        const csvContent = allStaff.map(staff => 
            `${staff.name},${staff.department},${staff.position},${staff.phone},${staff.email},${staff.office}`
        ).join('\n');
        
        const header = '이름,부서,직책,전화번호,이메일,사무실\n';
        const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            const fileName = window.currentStaffType === 'parliament' ? '의회사무처_연락처.csv' : '집행부_연락처.csv';
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            app.showToast('연락처 파일이 다운로드되었습니다.', 'success');
        }
    },

    // GPS 위치 기반 활동 추적 페이지
    loadLocationTrackingPage: function() {
        const html = `
            <div class="page-container">
                <!-- 현재 위치 정보 -->
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-4">
                        <i class="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                        위치 기반 활동 추적
                    </h3>
                    
                    <!-- 현재 위치 카드 -->
                    <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 mb-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="text-sm text-gray-600">현재 위치</div>
                                <div id="currentLocation" class="font-bold text-lg text-green-800">위치 확인 중...</div>
                                <div id="currentAddress" class="text-sm text-gray-600 mt-1">정확한 주소를 확인하고 있습니다</div>
                            </div>
                            <div class="text-right">
                                <button onclick="app.refreshLocation()" class="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
                                    <i class="fas fa-sync-alt mr-1"></i>새로고침
                                </button>
                                <div class="text-xs text-gray-600 mt-1" id="lastUpdate">마지막 업데이트: --</div>
                            </div>
                        </div>
                    </div>

                    <!-- 활동 인증 버튼 -->
                    <div class="grid grid-cols-2 gap-3 mb-4">
                        <button onclick="app.recordActivity('meeting')" class="bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-blue-700 transition-colors">
                            <i class="fas fa-handshake mr-2"></i>
                            회의/간담회
                        </button>
                        <button onclick="app.recordActivity('inspection')" class="bg-purple-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-purple-700 transition-colors">
                            <i class="fas fa-search mr-2"></i>
                            현장 시찰
                        </button>
                        <button onclick="app.recordActivity('event')" class="bg-orange-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-orange-700 transition-colors">
                            <i class="fas fa-calendar-check mr-2"></i>
                            행사 참석
                        </button>
                        <button onclick="app.recordActivity('service')" class="bg-green-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-green-700 transition-colors">
                            <i class="fas fa-users mr-2"></i>
                            민원 상담
                        </button>
                    </div>
                </div>

                <!-- 오늘의 활동 -->
                <div class="gov-card mb-4">
                    <h4 class="font-bold mb-3">
                        <i class="fas fa-calendar-day mr-2"></i>오늘의 활동
                    </h4>
                    <div id="todayActivities" class="space-y-3">
                        <!-- 동적으로 생성됨 -->
                    </div>
                </div>

                <!-- 활동 통계 -->
                <div class="gov-card mb-4">
                    <h4 class="font-bold mb-3">
                        <i class="fas fa-chart-bar mr-2"></i>이번 달 활동 통계
                    </h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-blue-50 p-3 rounded-lg text-center">
                            <div class="text-2xl font-bold text-blue-600" id="meetingCount">12</div>
                            <div class="text-sm text-gray-600">회의/간담회</div>
                        </div>
                        <div class="bg-purple-50 p-3 rounded-lg text-center">
                            <div class="text-2xl font-bold text-purple-600" id="inspectionCount">8</div>
                            <div class="text-sm text-gray-600">현장 시찰</div>
                        </div>
                        <div class="bg-orange-50 p-3 rounded-lg text-center">
                            <div class="text-2xl font-bold text-orange-600" id="eventCount">15</div>
                            <div class="text-sm text-gray-600">행사 참석</div>
                        </div>
                        <div class="bg-green-50 p-3 rounded-lg text-center">
                            <div class="text-2xl font-bold text-green-600" id="serviceCount">23</div>
                            <div class="text-sm text-gray-600">민원 상담</div>
                        </div>
                    </div>
                </div>

                <!-- 지역별 활동 현황 -->
                <div class="gov-card">
                    <div class="flex items-center justify-between mb-4">
                        <h4 class="font-bold">
                            <i class="fas fa-map mr-2"></i>지역별 활동 현황
                        </h4>
                        <button onclick="app.exportLocationData()" class="text-blue-600 text-sm hover:underline">
                            <i class="fas fa-download mr-1"></i>데이터 내보내기
                        </button>
                    </div>
                    
                    <div id="locationActivities" class="space-y-3">
                        <!-- 동적으로 생성됨 -->
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
            // 위치 추적 초기화
            this.initLocationTracking();
        }
    },

    // 위치 추적 초기화
    initLocationTracking: function() {
        this.getCurrentLocation();
        this.loadTodayActivities();
        this.loadLocationActivities();
        this.updateActivityStats();
    },

    // 현재 위치 가져오기
    getCurrentLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // 모의 주소 변환 (실제로는 역지오코딩 API 사용)
                    this.displayLocationInfo(lat, lng);
                    
                    // 현재 위치 저장
                    localStorage.setItem('lastKnownLocation', JSON.stringify({
                        lat: lat,
                        lng: lng,
                        timestamp: new Date().toISOString()
                    }));
                },
                (error) => {
                    console.error('위치 정보를 가져올 수 없습니다:', error);
                    document.getElementById('currentLocation').textContent = '위치 정보 없음';
                    document.getElementById('currentAddress').textContent = 'GPS 사용이 제한되어 있습니다';
                }
            );
        } else {
            document.getElementById('currentLocation').textContent = 'GPS 미지원';
            document.getElementById('currentAddress').textContent = '이 기기에서는 위치 서비스를 지원하지 않습니다';
        }
    },

    // 위치 정보 표시
    displayLocationInfo: function(lat, lng) {
        // 수원시 내 주요 지역 구분 (예시)
        let location = '수원시';
        let address = '경기도 수원시';
        
        // 간단한 지역 구분 로직 (실제로는 정확한 역지오코딩 API 사용)
        if (lat > 37.275 && lng > 127.015) {
            location = '수원시 영통구';
            address = '경기도 수원시 영통구 일대';
        } else if (lat > 37.265) {
            location = '수원시 팔달구';
            address = '경기도 수원시 팔달구 일대';
        } else {
            location = '수원시 장안구';
            address = '경기도 수원시 장안구 일대';
        }
        
        document.getElementById('currentLocation').textContent = location;
        document.getElementById('currentAddress').textContent = address;
        document.getElementById('lastUpdate').textContent = `마지막 업데이트: ${new Date().toLocaleTimeString()}`;
    },

    // 위치 새로고침
    refreshLocation: function() {
        document.getElementById('currentLocation').textContent = '위치 확인 중...';
        document.getElementById('currentAddress').textContent = '정확한 주소를 확인하고 있습니다';
        
        setTimeout(() => {
            this.getCurrentLocation();
        }, 1000);
    },

    // 활동 기록
    recordActivity: function(type) {
        const typeNames = {
            'meeting': '회의/간담회',
            'inspection': '현장 시찰',
            'event': '행사 참석',
            'service': '민원 상담'
        };
        
        const currentLocation = localStorage.getItem('lastKnownLocation');
        if (!currentLocation) {
            app.showToast('위치 정보를 먼저 확인해주세요.', 'error');
            return;
        }
        
        const location = JSON.parse(currentLocation);
        const now = new Date();
        
        app.showModal('recordActivity', {
            title: `${typeNames[type]} 활동 기록`,
            content: `
                <div class="space-y-4">
                    <div class="bg-blue-50 p-3 rounded-lg">
                        <div class="text-sm text-blue-800 font-medium">현재 위치에서 활동을 기록합니다</div>
                        <div class="text-xs text-gray-600 mt-1">
                            📍 ${document.getElementById('currentAddress').textContent}<br>
                            🕐 ${now.toLocaleString()}
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">활동 내용</label>
                        <textarea id="activityDescription" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="${typeNames[type]} 활동의 구체적인 내용을 입력하세요..."></textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">참석자/관련자</label>
                        <input type="text" id="activityParticipants" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="참석자나 관련자를 입력하세요">
                    </div>
                    
                    <div class="text-xs text-gray-500">
                        <i class="fas fa-info-circle mr-1"></i>
                        GPS 위치 정보와 함께 안전하게 저장됩니다.
                    </div>
                </div>
            `,
            showCancel: true,
            onConfirm: () => {
                const description = document.getElementById('activityDescription')?.value.trim();
                const participants = document.getElementById('activityParticipants')?.value.trim();
                
                if (!description) {
                    app.showToast('활동 내용을 입력해주세요.', 'error');
                    return false;
                }
                
                // 활동 데이터 저장
                const activities = JSON.parse(localStorage.getItem('locationActivities') || '[]');
                const newActivity = {
                    id: Date.now(),
                    type: type,
                    typeName: typeNames[type],
                    description: description,
                    participants: participants,
                    location: location,
                    address: document.getElementById('currentAddress').textContent,
                    timestamp: now.toISOString(),
                    date: now.toISOString().split('T')[0]
                };
                
                activities.unshift(newActivity);
                localStorage.setItem('locationActivities', JSON.stringify(activities));
                
                app.showToast('활동이 성공적으로 기록되었습니다.', 'success');
                
                // 화면 업데이트
                this.loadTodayActivities();
                this.loadLocationActivities();
                this.updateActivityStats();
            }
        });
    },

    // 오늘의 활동 로드
    loadTodayActivities: function() {
        const activities = JSON.parse(localStorage.getItem('locationActivities') || '[]');
        const today = new Date().toISOString().split('T')[0];
        const todayActivities = activities.filter(activity => activity.date === today);
        
        const container = document.getElementById('todayActivities');
        if (!container) return;
        
        if (todayActivities.length === 0) {
            container.innerHTML = `
                <div class="text-center py-4 text-gray-500">
                    <i class="fas fa-calendar-times text-2xl mb-2"></i>
                    <div>오늘 기록된 활동이 없습니다</div>
                </div>
            `;
            return;
        }
        
        const html = todayActivities.map(activity => `
            <div class="bg-white border border-gray-200 rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                        <span class="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">${activity.typeName}</span>
                        <span class="text-sm text-gray-600">${new Date(activity.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <button onclick="app.deleteActivity(${activity.id})" class="text-red-500 text-xs hover:underline">
                        <i class="fas fa-trash mr-1"></i>삭제
                    </button>
                </div>
                <div class="text-sm font-medium mb-1">${activity.description}</div>
                <div class="text-xs text-gray-500">
                    <div><i class="fas fa-map-marker-alt mr-1"></i>${activity.address}</div>
                    ${activity.participants ? `<div><i class="fas fa-users mr-1"></i>${activity.participants}</div>` : ''}
                </div>
            </div>
        `).join('');
        
        container.innerHTML = html;
    },

    // 지역별 활동 로드
    loadLocationActivities: function() {
        const activities = JSON.parse(localStorage.getItem('locationActivities') || '[]');
        const locationGroups = {};
        
        // 지역별로 그룹화
        activities.forEach(activity => {
            const locationKey = activity.address.split(' ').slice(0, 3).join(' '); // 시, 구까지만
            if (!locationGroups[locationKey]) {
                locationGroups[locationKey] = [];
            }
            locationGroups[locationKey].push(activity);
        });
        
        const container = document.getElementById('locationActivities');
        if (!container) return;
        
        const locations = Object.keys(locationGroups);
        if (locations.length === 0) {
            container.innerHTML = `
                <div class="text-center py-4 text-gray-500">
                    <i class="fas fa-map text-2xl mb-2"></i>
                    <div>기록된 지역별 활동이 없습니다</div>
                </div>
            `;
            return;
        }
        
        const html = locations.map(location => {
            const locationActivities = locationGroups[location];
            const activityCounts = {};
            
            locationActivities.forEach(activity => {
                activityCounts[activity.type] = (activityCounts[activity.type] || 0) + 1;
            });
            
            return `
                <div class="bg-white border border-gray-200 rounded-lg p-3">
                    <div class="flex items-center justify-between mb-2">
                        <div class="font-medium">${location}</div>
                        <div class="text-sm text-gray-600">총 ${locationActivities.length}건</div>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        ${Object.keys(activityCounts).map(type => {
                            const typeNames = {
                                'meeting': '회의',
                                'inspection': '시찰',
                                'event': '행사',
                                'service': '민원'
                            };
                            const colors = {
                                'meeting': 'bg-blue-100 text-blue-800',
                                'inspection': 'bg-purple-100 text-purple-800',
                                'event': 'bg-orange-100 text-orange-800',
                                'service': 'bg-green-100 text-green-800'
                            };
                            return `
                                <span class="${colors[type]} px-2 py-1 rounded-full text-xs">
                                    ${typeNames[type]} ${activityCounts[type]}건
                                </span>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = html;
    },

    // 활동 통계 업데이트
    updateActivityStats: function() {
        const activities = JSON.parse(localStorage.getItem('locationActivities') || '[]');
        const thisMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        const monthlyActivities = activities.filter(activity => activity.timestamp.startsWith(thisMonth));
        
        const counts = {
            meeting: 0,
            inspection: 0,
            event: 0,
            service: 0
        };
        
        monthlyActivities.forEach(activity => {
            counts[activity.type]++;
        });
        
        document.getElementById('meetingCount').textContent = counts.meeting;
        document.getElementById('inspectionCount').textContent = counts.inspection;
        document.getElementById('eventCount').textContent = counts.event;
        document.getElementById('serviceCount').textContent = counts.service;
    },

    // 활동 삭제
    deleteActivity: function(activityId) {
        if (confirm('이 활동 기록을 삭제하시겠습니까?')) {
            const activities = JSON.parse(localStorage.getItem('locationActivities') || '[]');
            const filteredActivities = activities.filter(activity => activity.id !== activityId);
            localStorage.setItem('locationActivities', JSON.stringify(filteredActivities));
            
            app.showToast('활동 기록이 삭제되었습니다.', 'info');
            
            // 화면 업데이트
            this.loadTodayActivities();
            this.loadLocationActivities();
            this.updateActivityStats();
        }
    },

    // 위치 데이터 내보내기
    exportLocationData: function() {
        const activities = JSON.parse(localStorage.getItem('locationActivities') || '[]');
        
        if (activities.length === 0) {
            app.showToast('내보낼 데이터가 없습니다.', 'info');
            return;
        }
        
        const csvContent = activities.map(activity => 
            `${new Date(activity.timestamp).toLocaleString()},${activity.typeName},${activity.description},${activity.address},${activity.participants || ''}`
        ).join('\n');
        
        const header = '날짜시간,활동유형,활동내용,위치,참석자\n';
        const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', '위치기반_활동기록.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            app.showToast('활동 데이터가 다운로드되었습니다.', 'success');
        }
    },
    
    // Load Report Page
    loadReportPage: function() {
        const html = `
            <div class="page-container">
                <div class="gov-card">
                    <h3 class="gov-title mb-4">통계 분석</h3>
                    <div class="text-center py-8 text-gray-500">
                        <i class="fas fa-chart-line text-4xl mb-4"></i>
                        <div>통계 분석 기능은 준비 중입니다.</div>
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
        }
    },
    
    // Initialize Monthly Chart (Duplicate function - fixed)
    initMonthlyChartDuplicate: function() {
        const canvas = document.getElementById('monthlyChart');
        if (canvas && window.Chart) {
            // Chart.js의 getChart 메서드로 기존 차트 확인
            const existingChart = Chart.getChart(canvas);
            if (existingChart) {
                existingChart.destroy();
            }
            
            // 기존 차트가 있으면 제거
            if (window.homePageChart) {
                try {
                    window.homePageChart.destroy();
                } catch(e) {
                    console.log('차트 제거 중 오류:', e);
                }
                window.homePageChart = null;
            }
            
            const ctx = canvas.getContext('2d');
            window.homePageChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['7월', '8월', '9월', '10월', '11월', '12월'],
                    datasets: [{
                        label: '본회의 출석',
                        data: [12, 8, 15, 10, 7, 9],
                        borderColor: '#003d7a',
                        backgroundColor: 'rgba(0, 61, 122, 0.1)',
                        tension: 0.4
                    }, {
                        label: '법안 발의',
                        data: [3, 2, 6, 4, 3, 5],
                        borderColor: '#0056b3',
                        backgroundColor: 'rgba(0, 86, 179, 0.1)',
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
        const qrElement = document.getElementById('qrcode');
        if (qrElement && window.QRious) {
            const qr = new QRious({
                element: qrElement,
                value: `${this.memberData.name}-${this.memberData.memberId}-${Date.now()}`,
                size: 120,
                foreground: '#003d7a',
                background: 'white'
            });
        }
    },
    
    // Initialize Real Time
    initRealTime: function() {
        this.updateRealTime();
        setInterval(() => {
            this.updateRealTime();
        }, 1000);
    },
    
    // Update Real Time
    updateRealTime: function() {
        const timeElement = document.getElementById('current-time');
        const authElement = document.getElementById('last-auth');
        
        if (timeElement) {
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString('ko-KR');
        }
        
        if (authElement) {
            authElement.textContent = '방금 전';
        }
    }
});// Cache buster: %date% %time%
