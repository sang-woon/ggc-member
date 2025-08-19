// 개선된 페이지 로드 함수들
window.app = window.app || {};

// 홈 페이지 개선
window.app.loadHomePageEnhanced = function() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="page-container" style="position: relative;">
            <!-- 버전 표시 -->
            <div style="
                position: absolute;
                top: -8px;
                right: 8px;
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
            ">
                <span style="font-size: 13px; font-weight: 700;">v2.1</span>
                <span style="opacity: 0.9;">2025.01.18</span>
            </div>
            
            <!-- Enhanced Profile Card - Premium Mobile Design -->
            <div class="gov-card mb-4" style="background: linear-gradient(135deg, #003d7a 0%, #0056b3 100%); color: white; padding: 20px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,61,122,0.2); position: relative; overflow: hidden;">
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
                            <img src="images/annomimus.jpg" alt="김영수 의원" style="width: 100%; height: 100%; object-fit: cover; border-radius: 13px;">
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
                            <h2 class="text-white font-bold text-xl mb-1">김영수 의원</h2>
                            <div class="flex items-center gap-2 text-blue-100 text-sm mb-1">
                                <span class="font-semibold">국민의힘</span>
                                <span style="width: 3px; height: 3px; background: rgba(255,255,255,0.5); border-radius: 50%;"></span>
                                <span>경기 수원시갑</span>
                            </div>
                            <div class="flex items-center gap-2 text-blue-100 text-xs">
                                <div class="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                                    <i class="fas fa-briefcase" style="font-size: 10px;"></i>
                                    <span>교육위원회 위원장</span>
                                    <span class="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px] font-semibold">15명</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Enhanced Status Badges -->
                        <div class="flex flex-wrap gap-2">
                            <span class="inline-flex items-center px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold shadow-sm">
                                <span class="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></span>
                                재직중
                            </span>
                            <span class="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur text-white rounded-full text-xs font-medium border border-white/30">
                                초선
                            </span>
                            <span class="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur text-white rounded-full text-xs font-medium border border-white/30">
                                당선유효
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- Enhanced Quick Stats -->
                <div class="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/20" style="position: relative; z-index: 1;">
                    <div class="text-center p-2 rounded-lg hover:bg-white/10 transition cursor-pointer" onclick="app.navigateTo('attendance')">
                        <div class="text-white text-lg font-bold">98.5%</div>
                        <div class="text-blue-100 text-[11px] font-medium">출석률</div>
                    </div>
                    <div class="text-center p-2 rounded-lg hover:bg-white/10 transition cursor-pointer" onclick="app.navigateTo('bill')">
                        <div class="text-white text-lg font-bold">32건</div>
                        <div class="text-blue-100 text-[11px] font-medium">발의법안</div>
                    </div>
                    <div class="text-center p-2 rounded-lg hover:bg-white/10 transition cursor-pointer" onclick="app.navigateTo('speech')">
                        <div class="text-white text-lg font-bold">15회</div>
                        <div class="text-blue-100 text-[11px] font-medium">발언</div>
                    </div>
                    <div class="text-center p-2 rounded-lg hover:bg-white/10 transition cursor-pointer" onclick="app.navigateTo('civil')">
                        <div class="text-white text-lg font-bold">248건</div>
                        <div class="text-blue-100 text-[11px] font-medium">민원처리</div>
                    </div>
                </div>
            </div>

            <!-- 통계 그리드 -->
            <div class="stats-grid">
                <div class="stat-card-enhanced attendance" data-page="attendance">
                    <div class="stat-icon-box blue">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="stat-value">98.5%</div>
                    <div class="stat-label">본회의 출석률</div>
                    <div class="stat-sublabel">197회/200회</div>
                </div>
                
                <div class="stat-card-enhanced bill" data-page="bill">
                    <div class="stat-icon-box green">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="stat-value">32건</div>
                    <div class="stat-label">발의 법안</div>
                    <div class="stat-sublabel">가결 18건</div>
                </div>
                
                <div class="stat-card-enhanced speech" data-page="speech">
                    <div class="stat-icon-box purple">
                        <i class="fas fa-microphone"></i>
                    </div>
                    <div class="stat-value">15회</div>
                    <div class="stat-label">본회의 발언</div>
                    <div class="stat-sublabel">5분발언 8회</div>
                </div>
                
                <div class="stat-card-enhanced civil" data-page="civil">
                    <div class="stat-icon-box orange">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-value">248건</div>
                    <div class="stat-label">민원 처리</div>
                    <div class="stat-sublabel">처리율 94%</div>
                </div>
            </div>

            <!-- 활동 차트 -->
            <div class="chart-card">
                <div class="chart-header">
                    <h3 class="chart-title">월별 활동 현황</h3>
                    <div class="chart-legend">
                        <div class="legend-item">
                            <span class="legend-dot" style="background: #3b82f6;"></span>
                            <span>출석</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot" style="background: #10b981;"></span>
                            <span>발의</span>
                        </div>
                    </div>
                </div>
                <div style="height: 180px; display: flex; align-items: center; justify-content: center; background: #f9fafb; border-radius: 8px;">
                    <canvas id="monthlyChart"></canvas>
                </div>
            </div>

            <!-- 최근 활동 -->
            <div class="recent-activities">
                <h3 class="gov-title">최근 의정활동</h3>
                <div class="activity-item-enhanced">
                    <div class="activity-icon bg-blue-50" style="background: #eff6ff; color: #3b82f6;">
                        <i class="fas fa-microphone"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">5분 자유발언</div>
                        <div class="activity-desc">청년 주거안정 특별법안 제정 촉구</div>
                        <div class="activity-date">2025.01.15 14:30</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-400"></i>
                </div>
                
                <div class="activity-item-enhanced">
                    <div class="activity-icon bg-green-50" style="background: #f0fdf4; color: #10b981;">
                        <i class="fas fa-file-signature"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">법안 발의</div>
                        <div class="activity-desc">경기도 청년 일자리 창출 지원 조례안</div>
                        <div class="activity-date">2025.01.12 10:00</div>
                    </div>
                    <i class="fas fa-chevron-right text-gray-400"></i>
                </div>
            </div>
        </div>
    `;

    // 차트 초기화 (기존 차트 제거 후 생성)
    setTimeout(() => {
        const canvas = document.getElementById('monthlyChart');
        if (!canvas) return;
        
        try {
            // 방법 1: Chart.getChart 사용
            const existingChart = Chart.getChart('monthlyChart');
            if (existingChart) {
                existingChart.destroy();
            }
        } catch(e) {
            console.log('Chart.getChart 방법 실패, 다른 방법 시도');
        }
        
        try {
            // 방법 2: canvas ID로 직접 접근
            const existingChart2 = Chart.getChart(canvas);
            if (existingChart2) {
                existingChart2.destroy();
            }
        } catch(e) {
            console.log('두 번째 방법도 실패');
        }
        
        // 방법 3: 전역 변수 확인
        if (window.monthlyChartInstance) {
            try {
                window.monthlyChartInstance.destroy();
                window.monthlyChartInstance = null;
            } catch(e) {
                console.log('전역 변수 차트 제거 실패');
            }
        }
        
        // 방법 4: Chart.instances 확인 (Chart.js v2 호환)
        if (window.Chart && window.Chart.instances) {
            Object.keys(window.Chart.instances).forEach(key => {
                try {
                    window.Chart.instances[key].destroy();
                } catch(e) {
                    console.log('인스턴스 제거 실패:', key);
                }
            });
        }
        
        // 캔버스 초기화
        const parent = canvas.parentNode;
        const newCanvas = document.createElement('canvas');
        newCanvas.id = 'monthlyChart';
        parent.replaceChild(newCanvas, canvas);
        
        // 새 차트 생성
        const ctx = newCanvas.getContext('2d');
        window.monthlyChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['7월', '8월', '9월', '10월', '11월', '12월'],
                    datasets: [{
                        label: '출석',
                        data: [95, 98, 100, 97, 99, 98],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4
                    }, {
                        label: '발의',
                        data: [3, 5, 4, 6, 4, 5],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4
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
                            beginAtZero: true
                        }
                    }
                }
            });
    }, 100);
    
    // 통계 카드 클릭 이벤트 바인딩
    setTimeout(() => {
        document.querySelectorAll('.stat-card-enhanced').forEach(card => {
            card.addEventListener('click', function() {
                const page = this.dataset.page;
                if (page && window.app && window.app.navigateTo) {
                    console.log('통계 카드 클릭:', page);
                    window.app.navigateTo(page);
                }
            });
        });
    }, 200);
};

// 디지털 신분증 페이지 개선 - 전체 파란색 배경 프리미엄 카드
window.app.loadDigitalIdPageEnhanced = function() {
    const mainContent = document.getElementById('mainContent');
    
    // 의원 사진 (샘플 데이터 - 실제로는 서버에서 가져옴)
    const memberPhoto = app.memberData.photo || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEzMCIgZmlsbD0iI2Y1ZjVmNSIvPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjZGRkIi8+CiAgPGVsbGlwc2UgY3g9IjUwIiBjeT0iOTUiIHJ4PSIzNSIgcnk9IjM1IiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAiIHk9IjExNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OSIgZm9udC1zaXplPSIxMCI+U2FtcGxlPC90ZXh0Pgo8L3N2Zz4=';
    
    mainContent.innerHTML = `
        <style>
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            @keyframes shimmer {
                0% { background-position: -400px 0; }
                100% { background-position: calc(400px + 100%) 0; }
            }
            
            @keyframes hologram {
                0% { background-position: 0% 0%; }
                50% { background-position: 100% 100%; }
                100% { background-position: 0% 0%; }
            }
            
            @keyframes glow {
                0%, 100% { box-shadow: 0 0 20px rgba(0,91,179,0.3), 0 0 60px rgba(0,61,122,0.1); }
                50% { box-shadow: 0 0 30px rgba(0,91,179,0.4), 0 0 80px rgba(0,61,122,0.2); }
            }
            
            .premium-id-card {
                transform: translateY(0);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
                animation: glow 3s infinite ease-in-out;
            }
            
            .premium-id-card:hover {
                transform: translateY(-4px) rotateX(2deg);
                box-shadow: 0 25px 80px rgba(0,61,122,0.25), 0 0 40px rgba(0,91,179,0.4) !important;
            }
            
            .holographic-pattern {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, 
                    rgba(255,255,255,0.1) 0%, 
                    rgba(255,255,255,0.05) 25%, 
                    rgba(255,255,255,0.15) 50%, 
                    rgba(255,255,255,0.05) 75%, 
                    rgba(255,255,255,0.1) 100%);
                background-size: 40px 40px;
                animation: hologram 4s infinite linear;
                pointer-events: none;
            }
            
            .metallic-border {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, #ffd700, #fff, #ffd700, #fff);
                background-size: 20px 20px;
                animation: shimmer 3s infinite linear;
                padding: 2px;
                border-radius: 22px;
            }
            
            .card-inner {
                background: linear-gradient(135deg, #003d7a 0%, #1e40af 25%, #0056b3 50%, #1e40af 75%, #003d7a 100%);
                border-radius: 20px;
                height: 100%;
                position: relative;
                overflow: hidden;
            }
            
            .premium-photo-frame {
                position: relative;
                background: rgba(255,255,255,0.15);
                border-radius: 16px;
                padding: 3px;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255,255,255,0.3);
                box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2);
            }
            
            .premium-photo-frame::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: linear-gradient(45deg, rgba(255,215,0,0.6), rgba(255,255,255,0.8), rgba(255,215,0,0.6));
                border-radius: 18px;
                z-index: -1;
                animation: shimmer 2s infinite linear;
            }
            
            .glass-panel {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1);
            }
            
            .premium-button {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border: none;
                font-family: 'Noto Sans KR', sans-serif;
                font-weight: 600;
                position: relative;
                overflow: hidden;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
            }
            
            .premium-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                transition: left 0.6s;
            }
            
            .premium-button:hover::before {
                left: 100%;
            }
            
            .premium-button:active {
                transform: scale(0.96);
            }
            
            .security-chip {
                background: linear-gradient(135deg, #ffd700, #ffed4e, #ffd700);
                color: #1a1a1a;
                font-weight: 800;
                text-shadow: 0 1px 2px rgba(0,0,0,0.1);
                box-shadow: 0 4px 12px rgba(255,215,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3);
            }
            
            .nfc-indicator {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 24px;
                height: 24px;
                background: rgba(255,255,255,0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.3);
            }
            
            .premium-text-white {
                color: #ffffff;
                text-shadow: 0 1px 3px rgba(0,0,0,0.3);
            }
            
            .premium-text-light {
                color: rgba(255,255,255,0.9);
                text-shadow: 0 1px 2px rgba(0,0,0,0.2);
            }
            
            .premium-text-soft {
                color: rgba(255,255,255,0.8);
                text-shadow: 0 1px 2px rgba(0,0,0,0.2);
            }
        </style>
        
        <div class="digital-id-container" style="max-width: 430px; margin: 0 auto; padding: 16px;">
            <!-- 전체 파란색 배경 프리미엄 신분증 카드 -->
            <div class="premium-id-card" style="position: relative; border-radius: 22px;">
                <!-- 메탈릭 테두리 -->
                <div class="metallic-border"></div>
                
                <!-- 카드 내부 -->
                <div class="card-inner">
                    <!-- 홀로그램 패턴 -->
                    <div class="holographic-pattern"></div>
                    
                    <!-- NFC 인디케이터 -->
                    <div class="nfc-indicator">
                        <i class="fas fa-wifi" style="font-size: 12px; color: rgba(255,255,255,0.9);"></i>
                    </div>
                    
                    <!-- 상단 헤더 섹션 -->
                    <div style="padding: 24px 24px 20px; position: relative; z-index: 2;">
                        <!-- 로고 및 공식 인증 -->
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                            <!-- 경기도의회 로고 -->
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
                                    <i class="fas fa-landmark premium-text-white" style="font-size: 22px;"></i>
                                </div>
                                <div>
                                    <div class="premium-text-soft" style="font-size: 12px; line-height: 1.2; font-weight: 600;">경기도의회</div>
                                    <div class="premium-text-white" style="font-size: 15px; font-weight: 800; line-height: 1.1; margin-top: 2px;">GYEONGGI COUNCIL</div>
                                </div>
                            </div>
                            
                            <!-- OFFICIAL 배지 -->
                            <div style="text-align: right;">
                                <div class="security-chip" style="padding: 8px 14px; border-radius: 20px; margin-bottom: 6px; font-size: 11px;">
                                    OFFICIAL
                                </div>
                                <div class="premium-text-white" style="font-size: 18px; font-weight: 900; letter-spacing: 1px;">의원증</div>
                            </div>
                        </div>
                        
                        <!-- 중앙 타이틀 -->
                        <div style="text-align: center; padding: 16px 0; border-top: 1px solid rgba(255,255,255,0.2); border-bottom: 1px solid rgba(255,255,255,0.2);">
                            <div class="premium-text-white" style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">도의회의원 디지털 신분증</div>
                            <div class="premium-text-soft" style="font-size: 11px; letter-spacing: 0.5px;">DIGITAL MEMBER IDENTIFICATION</div>
                        </div>
                    </div>
                    
                    <!-- 의원 정보 메인 섹션 -->
                    <div style="padding: 0 24px 24px; position: relative; z-index: 2;">
                        <div style="display: flex; gap: 20px; align-items: flex-start; margin-bottom: 24px;">
                            
                            <!-- 의원 사진 프리미엄 프레임 -->
                            <div class="premium-photo-frame" style="flex-shrink: 0; width: 100px; height: 130px;">
                                <img src="${memberPhoto}" 
                                     alt="${app.memberData.name || '의원'} 사진" 
                                     style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 12px;">
                                <button onclick="app.updateMemberPhoto()" 
                                        style="position: absolute; bottom: 8px; right: 8px; width: 32px; height: 32px; background: rgba(255,255,255,0.9); color: #003d7a; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: all 0.2s; backdrop-filter: blur(10px); border: 2px solid rgba(255,255,255,0.5);">
                                    <i class="fas fa-camera" style="font-size: 12px;"></i>
                                </button>
                            </div>
                            
                            <!-- 의원 기본 정보 -->
                            <div style="flex: 1; padding-top: 8px;">
                                <!-- 이름 및 의원번호 -->
                                <div style="margin-bottom: 18px;">
                                    <div class="premium-text-white" style="font-size: 24px; font-weight: 900; line-height: 1.1; margin-bottom: 6px; letter-spacing: 0.5px;">
                                        ${app.memberData.name || '김영수'}
                                    </div>
                                    <div class="premium-text-soft" style="font-size: 13px; font-weight: 600;">
                                        의원번호: ${app.memberData.memberId || '2024-0815'}
                                    </div>
                                </div>
                                
                                <!-- 상세 정보 그리드 -->
                                <div style="display: grid; gap: 10px;">
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <div style="width: 28px; height: 28px; background: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3);">
                                            <i class="fas fa-flag premium-text-white" style="font-size: 12px;"></i>
                                        </div>
                                        <span class="premium-text-white" style="font-size: 14px; font-weight: 600;">${app.memberData.party || '국민의힘'}</span>
                                    </div>
                                    
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <div style="width: 28px; height: 28px; background: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3);">
                                            <i class="fas fa-map-marker-alt premium-text-white" style="font-size: 12px;"></i>
                                        </div>
                                        <span class="premium-text-white" style="font-size: 14px; font-weight: 600;">${app.memberData.district || '경기 수원시갑'}</span>
                                    </div>
                                    
                                    <div style="display: flex; align-items: center; gap: 12px;">
                                        <div style="width: 28px; height: 28px; background: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3);">
                                            <i class="fas fa-award premium-text-white" style="font-size: 12px;"></i>
                                        </div>
                                        <span class="premium-text-white" style="font-size: 14px; font-weight: 600;">${app.memberData.term || '초선(제11기)'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- QR 코드 및 인증 상태 -->
                        <div class="glass-panel" style="padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 20px;">
                                
                                <!-- QR 코드 -->
                                <div style="text-align: center; flex-shrink: 0;">
                                    <div style="padding: 10px; background: rgba(255,255,255,0.95); border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); border: 2px solid rgba(255,255,255,0.5);">
                                        <canvas id="qrcode" style="border-radius: 8px; display: block;"></canvas>
                                    </div>
                                    <div class="premium-text-soft" style="font-size: 11px; margin-top: 10px; font-weight: 600;">디지털 검증 QR</div>
                                </div>
                                
                                <!-- 인증 상태 정보 -->
                                <div style="flex: 1;">
                                    <!-- 실시간 인증 상태 -->
                                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; padding: 12px; background: rgba(16,185,129,0.2); border-radius: 12px; border: 1px solid rgba(16,185,129,0.4); backdrop-filter: blur(10px);">
                                        <div style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; box-shadow: 0 0 10px #10b981;"></div>
                                        <span class="premium-text-white" style="font-size: 13px; font-weight: 700;">실시간 인증 활성</span>
                                    </div>
                                    
                                    <!-- 유효기간 및 발급기관 -->
                                    <div class="premium-text-soft" style="font-size: 12px; line-height: 1.8; font-weight: 500;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                            <span style="font-weight: 600;">유효기간</span>
                                            <span class="premium-text-white" style="font-weight: 700;">2026.06.30</span>
                                        </div>
                                        <div style="display: flex; justify-content: space-between;">
                                            <span style="font-weight: 600;">발급기관</span>
                                            <span class="premium-text-white" style="font-weight: 700;">경기도의회 사무처</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 임기 정보 -->
                        <div style="background: rgba(255,215,0,0.2); border-radius: 12px; padding: 16px; margin-bottom: 20px; text-align: center; border: 1px solid rgba(255,215,0,0.4); backdrop-filter: blur(10px);">
                            <div class="premium-text-white" style="font-size: 12px; font-weight: 700; margin-bottom: 4px;">의정활동 기간</div>
                            <div class="premium-text-white" style="font-size: 16px; font-weight: 900; letter-spacing: 0.5px;">2022년 7월 - 2026년 6월</div>
                        </div>
                        
                        <!-- 보안 기능 배지 섹션 -->
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                            <div class="glass-panel" style="padding: 12px; font-size: 11px; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700;">
                                <i class="fas fa-shield-alt premium-text-white"></i> 
                                <span class="premium-text-white">블록체인 인증</span>
                            </div>
                            <div class="glass-panel" style="padding: 12px; font-size: 11px; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700;">
                                <i class="fas fa-wifi premium-text-white"></i> 
                                <span class="premium-text-white">NFC 지원</span>
                            </div>
                            <div class="glass-panel" style="padding: 12px; font-size: 11px; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700;">
                                <i class="fas fa-fingerprint premium-text-white"></i> 
                                <span class="premium-text-white">생체인증</span>
                            </div>
                            <div class="glass-panel" style="padding: 12px; font-size: 11px; display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700;">
                                <i class="fas fa-mobile-alt premium-text-white"></i> 
                                <span class="premium-text-white">모바일 월렛</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 프리미엄 액션 버튼들 -->
            <div style="margin-top: 24px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                <button onclick="app.shareDigitalId()" class="premium-button" style="background: linear-gradient(135deg, rgba(0,86,179,0.9), rgba(37,99,235,0.9)); color: white; padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 14px; cursor: pointer; box-shadow: 0 8px 32px rgba(0,86,179,0.2);">
                    <i class="fas fa-share-alt" style="font-size: 16px;"></i>
                    <span style="font-weight: 700;">신분증 공유</span>
                </button>
                <button onclick="app.downloadDigitalId()" class="premium-button" style="background: linear-gradient(135deg, rgba(5,150,105,0.9), rgba(16,185,129,0.9)); color: white; padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 14px; cursor: pointer; box-shadow: 0 8px 32px rgba(16,185,129,0.2);">
                    <i class="fas fa-download" style="font-size: 16px;"></i>
                    <span style="font-weight: 700;">PDF 저장</span>
                </button>
                <button onclick="app.verifyWithBiometric()" class="premium-button" style="background: linear-gradient(135deg, rgba(220,38,38,0.9), rgba(239,68,68,0.9)); color: white; padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 14px; cursor: pointer; box-shadow: 0 8px 32px rgba(220,38,38,0.2);">
                    <i class="fas fa-fingerprint" style="font-size: 16px;"></i>
                    <span style="font-weight: 700;">생체 인증</span>
                </button>
                <button onclick="app.addToWallet()" class="premium-button" style="background: linear-gradient(135deg, rgba(124,58,237,0.9), rgba(139,92,246,0.9)); color: white; padding: 16px; border-radius: 16px; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 14px; cursor: pointer; box-shadow: 0 8px 32px rgba(124,58,237,0.2);">
                    <i class="fas fa-wallet" style="font-size: 16px;"></i>
                    <span style="font-weight: 700;">월렛 추가</span>
                </button>
            </div>
            
            <!-- 프리미엄 활용 안내 카드 -->
            <div class="glass-panel" style="margin-top: 24px; padding: 24px; background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1);">
                <h4 style="font-size: 16px; font-weight: 800; margin-bottom: 16px; color: #003d7a; display: flex; align-items: center; gap: 10px; text-shadow: none;">
                    <i class="fas fa-info-circle" style="color: #0056b3;"></i> 
                    <span style="background: linear-gradient(135deg, #003d7a, #0056b3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">디지털 신분증 활용 안내</span>
                </h4>
                <div style="display: grid; gap: 12px;">
                    <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: rgba(0,61,122,0.05); border-radius: 12px; border-left: 4px solid #003d7a;">
                        <i class="fas fa-shield-check" style="color: #003d7a; font-size: 16px; margin-top: 2px;"></i>
                        <div style="color: #1e40af;">
                            <div style="font-weight: 700; margin-bottom: 4px;">공식 인증 시스템</div>
                            <div style="font-size: 13px; line-height: 1.6;">경기도의회 공식 인증 시스템과 실시간 연동으로 완벽한 신원 확인</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: rgba(0,86,179,0.05); border-radius: 12px; border-left: 4px solid #0056b3;">
                        <i class="fas fa-qrcode" style="color: #0056b3; font-size: 16px; margin-top: 2px;"></i>
                        <div style="color: #1e40af;">
                            <div style="font-weight: 700; margin-bottom: 4px;">QR 즉석 인증</div>
                            <div style="font-size: 13px; line-height: 1.6;">QR 코드 스캔으로 즉석 신원 확인 및 출입 관리 시스템 연동</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: rgba(16,185,129,0.05); border-radius: 12px; border-left: 4px solid #10b981;">
                        <i class="fas fa-mobile-alt" style="color: #10b981; font-size: 16px; margin-top: 2px;"></i>
                        <div style="color: #1e40af;">
                            <div style="font-weight: 700; margin-bottom: 4px;">모바일 월렛 연동</div>
                            <div style="font-size: 13px; line-height: 1.6;">Apple Wallet, Google Pay 저장 지원으로 언제 어디서나 편리하게</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // QR 코드 생성
    setTimeout(() => {
        if (typeof QRious !== 'undefined') {
            const qr = new QRious({
                element: document.getElementById('qrcode'),
                value: `https://ggc.go.kr/verify/${app.memberData.memberId || '2024-0815'}`,
                size: 120,
                level: 'H'
            });
        }
    }, 100);
};

// 디지털 신분증 관련 함수들 추가
window.app.updateMemberPhoto = function() {
    app.showModal('photoUpload', {
        title: '의원 사진 변경',
        content: `
            <div style="text-align: center; padding: 20px;">
                <div style="width: 150px; height: 180px; margin: 0 auto 20px; border: 2px dashed #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #f9fafb;">
                    <i class="fas fa-camera" style="font-size: 48px; color: #9ca3af;"></i>
                </div>
                <input type="file" accept="image/*" id="photoInput" style="display: none;">
                <button onclick="document.getElementById('photoInput').click()" class="btn-primary" style="width: 100%;">
                    <i class="fas fa-upload"></i> 사진 선택
                </button>
                <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">
                    JPG, PNG 형식 (최대 5MB)<br>
                    권장 크기: 3:4 비율
                </p>
            </div>
        `,
        buttons: [
            { text: '취소', class: 'btn-secondary', onclick: 'app.closeModal()' },
            { text: '적용', class: 'btn-primary', onclick: 'app.applyPhoto()' }
        ]
    });
};

window.app.shareDigitalId = function() {
    if (navigator.share) {
        navigator.share({
            title: '경기도의회 의원 디지털 신분증',
            text: `${app.memberData.name} 의원 디지털 신분증`,
            url: `https://ggc.go.kr/member/${app.memberData.memberId}`
        });
    } else {
        app.showToast('공유 링크가 클립보드에 복사되었습니다');
    }
};

window.app.downloadDigitalId = function() {
    app.showToast('PDF 파일 다운로드를 준비중입니다...');
    // PDF 생성 로직
};

window.app.verifyWithBiometric = function() {
    app.showModal('biometric', {
        title: '생체 인증',
        content: `
            <div style="text-align: center; padding: 30px;">
                <i class="fas fa-fingerprint" style="font-size: 64px; color: #dc2626; margin-bottom: 20px;"></i>
                <p style="font-size: 16px; margin-bottom: 10px;">지문을 스캔해주세요</p>
                <p style="font-size: 12px; color: #6b7280;">등록된 지문으로 본인 인증을 진행합니다</p>
            </div>
        `,
        buttons: [
            { text: '취소', class: 'btn-secondary', onclick: 'app.closeModal()' }
        ]
    });
};

window.app.addToWallet = function() {
    app.showToast('모바일 월렛에 추가되었습니다');
};

// 출석 페이지 개선
window.app.loadAttendancePageEnhanced = function() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="attendance-container">
            <div class="attendance-summary-card">
                <h3 class="gov-title">출석 현황 요약</h3>
                <div class="attendance-stats">
                    <div class="attendance-stat-item">
                        <div class="attendance-stat-header">
                            <span class="attendance-type">본회의</span>
                            <span class="attendance-percentage">98.5%</span>
                        </div>
                        <div class="attendance-progress-bar">
                            <div class="attendance-progress-fill" style="width: 98.5%"></div>
                        </div>
                        <div class="attendance-details">
                            <span>출석 197회</span>
                            <span>전체 200회</span>
                        </div>
                    </div>
                    
                    <div class="attendance-stat-item">
                        <div class="attendance-stat-header">
                            <span class="attendance-type">상임위원회</span>
                            <span class="attendance-percentage">96%</span>
                        </div>
                        <div class="attendance-progress-bar">
                            <div class="attendance-progress-fill" style="width: 96%"></div>
                        </div>
                        <div class="attendance-details">
                            <span>출석 48회</span>
                            <span>전체 50회</span>
                        </div>
                    </div>
                    
                    <div class="attendance-stat-item">
                        <div class="attendance-stat-header">
                            <span class="attendance-type">특별위원회</span>
                            <span class="attendance-percentage">100%</span>
                        </div>
                        <div class="attendance-progress-bar">
                            <div class="attendance-progress-fill" style="width: 100%"></div>
                        </div>
                        <div class="attendance-details">
                            <span>출석 15회</span>
                            <span>전체 15회</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="attendance-calendar">
                <h3 class="gov-title">1월 출석 캘린더</h3>
                <div class="calendar-grid">
                    ${generateCalendarDays()}
                </div>
            </div>
        </div>
    `;
    
    function generateCalendarDays() {
        let days = '';
        for (let i = 1; i <= 31; i++) {
            const status = i % 7 === 0 ? 'holiday' : (Math.random() > 0.1 ? 'present' : 'absent');
            days += `<div class="calendar-day ${status}">${i}</div>`;
        }
        return days;
    }
};

// 민원 처리 페이지 개선
window.app.loadCivilPageEnhanced = function() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="civil-container">
            <div class="civil-stats-cards">
                <div class="civil-stat-card">
                    <div class="civil-stat-icon total">
                        <i class="fas fa-inbox"></i>
                    </div>
                    <div class="civil-stat-number">248</div>
                    <div class="civil-stat-label">전체 민원</div>
                </div>
                
                <div class="civil-stat-card">
                    <div class="civil-stat-icon pending">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="civil-stat-number">12</div>
                    <div class="civil-stat-label">대기중</div>
                </div>
                
                <div class="civil-stat-card">
                    <div class="civil-stat-icon processing">
                        <i class="fas fa-spinner"></i>
                    </div>
                    <div class="civil-stat-number">8</div>
                    <div class="civil-stat-label">처리중</div>
                </div>
                
                <div class="civil-stat-card">
                    <div class="civil-stat-icon completed">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="civil-stat-number">228</div>
                    <div class="civil-stat-label">완료</div>
                </div>
            </div>
            
            <div class="civil-list">
                <div class="civil-list-header">
                    <h3 class="gov-title">민원 목록</h3>
                    <div class="civil-filter-tabs">
                        <button class="filter-tab active">전체</button>
                        <button class="filter-tab">대기중</button>
                        <button class="filter-tab">처리중</button>
                        <button class="filter-tab">완료</button>
                    </div>
                </div>
                
                <div class="civil-item">
                    <div class="civil-status-indicator pending"></div>
                    <div class="civil-content">
                        <div class="civil-title">교통 신호 체계 개선 요청</div>
                        <div class="civil-desc">수원시 영통구 매탄동 사거리 신호 시간 조정 요청드립니다.</div>
                        <div class="civil-meta">
                            <span><i class="fas fa-user"></i> 김민준</span>
                            <span><i class="fas fa-calendar"></i> 2025.01.18</span>
                        </div>
                    </div>
                    <button class="ai-response-btn">
                        <i class="fas fa-robot"></i>
                        AI 답변
                    </button>
                </div>
                
                <div class="civil-item">
                    <div class="civil-status-indicator processing"></div>
                    <div class="civil-content">
                        <div class="civil-title">청년 창업 지원 프로그램 문의</div>
                        <div class="civil-desc">경기도 청년 창업 지원 프로그램 신청 자격과 절차에 대해 문의합니다.</div>
                        <div class="civil-meta">
                            <span><i class="fas fa-user"></i> 이서연</span>
                            <span><i class="fas fa-calendar"></i> 2025.01.17</span>
                        </div>
                    </div>
                    <button class="ai-response-btn">
                        <i class="fas fa-robot"></i>
                        AI 답변
                    </button>
                </div>
            </div>
        </div>
    `;
};

// 내정보 페이지 개선
window.app.loadProfilePageEnhanced = function() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="profile-container">
            <div class="profile-header-card">
                <div class="profile-avatar-large">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e5e7eb'/%3E%3Ccircle cx='50' cy='35' r='15' fill='%23d1d5db'/%3E%3Cpath d='M30 70 Q30 60 40 60 H60 Q70 60 70 70 V90 H30 Z' fill='%23d1d5db'/%3E%3C/svg%3E" alt="프로필">
                </div>
                <h2 class="profile-name">김영수 의원</h2>
                <p class="profile-title">경기도의회 교육위원회 위원장</p>
                <div class="profile-badges">
                    <span class="profile-badge">초선</span>
                    <span class="profile-badge">국민의힘</span>
                    <span class="profile-badge">수원시갑</span>
                </div>
            </div>
            
            <div class="profile-section">
                <h3 class="section-title">
                    <i class="fas fa-user"></i>
                    기본 정보
                </h3>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">의원번호</span>
                        <span class="info-value">2024-0815</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">생년월일</span>
                        <span class="info-value">1975.03.15</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">당선일</span>
                        <span class="info-value">2024.06.01</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">임기</span>
                        <span class="info-value">2024.07 ~ 2028.06</span>
                    </div>
                </div>
            </div>
            
            <div class="profile-section">
                <h3 class="section-title">
                    <i class="fas fa-trophy"></i>
                    주요 성과
                </h3>
                <div class="achievement-cards">
                    <div class="achievement-card">
                        <div class="achievement-icon">🏆</div>
                        <div class="achievement-title">우수 의원상</div>
                        <div class="achievement-desc">2024년 하반기</div>
                    </div>
                    <div class="achievement-card">
                        <div class="achievement-icon">📋</div>
                        <div class="achievement-title">법안 왕</div>
                        <div class="achievement-desc">32건 발의</div>
                    </div>
                    <div class="achievement-card">
                        <div class="achievement-icon">🎯</div>
                        <div class="achievement-title">출석 우수</div>
                        <div class="achievement-desc">98.5% 출석률</div>
                    </div>
                    <div class="achievement-card">
                        <div class="achievement-icon">💬</div>
                        <div class="achievement-title">소통 달인</div>
                        <div class="achievement-desc">민원 248건 처리</div>
                    </div>
                </div>
            </div>
            
            <button class="settings-button" onclick="app.navigateTo('settings')">
                <i class="fas fa-cog"></i>
                환경 설정
            </button>
        </div>
    `;
};

// 기존 함수 오버라이드
window.app.loadHomePage = window.app.loadHomePageEnhanced;  // Enhanced 버전 사용
window.app.loadDigitalIdPage = window.app.loadDigitalIdPageEnhanced;
window.app.loadAttendancePage = window.app.loadAttendancePageEnhanced;
window.app.loadCivilPage = window.app.loadCivilPageEnhanced;
window.app.loadInfoPage = window.app.loadProfilePageEnhanced;