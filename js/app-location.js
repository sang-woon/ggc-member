// App Location - GPS 위치 기반 활동 추적 기능
Object.assign(window.app, {
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
        this.initSampleData(); // 임시 데이터 초기화
        this.loadTodayActivities();
        this.loadLocationActivities();
        this.updateActivityStats();
    },

    // 임시 데이터 초기화 (개발용)
    initSampleData: function() {
        const existingData = localStorage.getItem('locationActivities');
        if (!existingData || JSON.parse(existingData).length === 0) {
            const sampleActivities = [
                // 오늘 활동
                {
                    id: Date.now() - 1000,
                    type: 'meeting',
                    typeName: '회의/간담회',
                    description: '수원시 교육 발전 간담회',
                    participants: '수원시 교육장, 학부모 대표 15명',
                    location: { lat: 37.275, lng: 127.015, timestamp: new Date().toISOString() },
                    address: '경기도 수원시 영통구 일대',
                    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1시간 전
                    date: new Date().toISOString().split('T')[0]
                },
                {
                    id: Date.now() - 2000,
                    type: 'service',
                    typeName: '민원 상담',
                    description: '아파트 단지 내 어린이집 설립 관련 민원',
                    participants: '주민 대표 8명',
                    location: { lat: 37.265, lng: 127.012, timestamp: new Date().toISOString() },
                    address: '경기도 수원시 팔달구 일대',
                    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2시간 전
                    date: new Date().toISOString().split('T')[0]
                },
                
                // 어제 활동
                {
                    id: Date.now() - 3000,
                    type: 'inspection',
                    typeName: '현장 시찰',
                    description: '수원천 생태공원 조성 현황 점검',
                    participants: '수원시 환경담당자, 시민단체 관계자',
                    location: { lat: 37.270, lng: 127.005, timestamp: new Date().toISOString() },
                    address: '경기도 수원시 장안구 일대',
                    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1일 전
                    date: new Date(Date.now() - 86400000).toISOString().split('T')[0]
                },
                {
                    id: Date.now() - 4000,
                    type: 'event',
                    typeName: '행사 참석',
                    description: '수원화성문화제 개막식 참석',
                    participants: '수원시장, 문화예술단체 관계자 50여명',
                    location: { lat: 37.267, lng: 127.016, timestamp: new Date().toISOString() },
                    address: '경기도 수원시 팔달구 일대',
                    timestamp: new Date(Date.now() - 90000000).toISOString(), // 1일 전
                    date: new Date(Date.now() - 86400000).toISOString().split('T')[0]
                },
                
                // 지난주 활동들
                {
                    id: Date.now() - 5000,
                    type: 'meeting',
                    typeName: '회의/간담회',
                    description: '청년 창업 지원 방안 논의',
                    participants: '청년창업가 12명, 수원시 경제정책과',
                    location: { lat: 37.280, lng: 127.020, timestamp: new Date().toISOString() },
                    address: '경기도 수원시 영통구 일대',
                    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3일 전
                    date: new Date(Date.now() - 259200000).toISOString().split('T')[0]
                },
                {
                    id: Date.now() - 6000,
                    type: 'service',
                    typeName: '민원 상담',
                    description: '권선구 교통 체증 해결 방안 상담',
                    participants: '권선구 주민 대표 20명',
                    location: { lat: 37.258, lng: 127.008, timestamp: new Date().toISOString() },
                    address: '경기도 수원시 권선구 일대',
                    timestamp: new Date(Date.now() - 345600000).toISOString(), // 4일 전
                    date: new Date(Date.now() - 345600000).toISOString().split('T')[0]
                },
                {
                    id: Date.now() - 7000,
                    type: 'inspection',
                    typeName: '현장 시찰',
                    description: '수원역 주변 재개발 현장 점검',
                    participants: '수원시 도시계획과, 주민대책위원회',
                    location: { lat: 37.266, lng: 127.001, timestamp: new Date().toISOString() },
                    address: '경기도 수원시 팔달구 일대',
                    timestamp: new Date(Date.now() - 432000000).toISOString(), // 5일 전
                    date: new Date(Date.now() - 432000000).toISOString().split('T')[0]
                },
                {
                    id: Date.now() - 8000,
                    type: 'event',
                    typeName: '행사 참석',
                    description: '영통구 주민센터 신청사 준공식',
                    participants: '영통구청장, 지역 주민 100여명',
                    location: { lat: 37.274, lng: 127.018, timestamp: new Date().toISOString() },
                    address: '경기도 수원시 영통구 일대',
                    timestamp: new Date(Date.now() - 518400000).toISOString(), // 6일 전
                    date: new Date(Date.now() - 518400000).toISOString().split('T')[0]
                },
                {
                    id: Date.now() - 9000,
                    type: 'meeting',
                    typeName: '회의/간담회',
                    description: '장안구 소상공인 지원 간담회',
                    participants: '장안구 소상공인회 임원진 8명',
                    location: { lat: 37.272, lng: 127.009, timestamp: new Date().toISOString() },
                    address: '경기도 수원시 장안구 일대',
                    timestamp: new Date(Date.now() - 604800000).toISOString(), // 7일 전
                    date: new Date(Date.now() - 604800000).toISOString().split('T')[0]
                },
                {
                    id: Date.now() - 10000,
                    type: 'service',
                    typeName: '민원 상담',
                    description: '영통구 공원 시설 개선 요청',
                    participants: '아파트 입주자 대표 6명',
                    location: { lat: 37.278, lng: 127.022, timestamp: new Date().toISOString() },
                    address: '경기도 수원시 영통구 일대',
                    timestamp: new Date(Date.now() - 691200000).toISOString(), // 8일 전
                    date: new Date(Date.now() - 691200000).toISOString().split('T')[0]
                }
            ];
            
            localStorage.setItem('locationActivities', JSON.stringify(sampleActivities));
        }
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
            app.showNotification('위치 정보를 먼저 확인해주세요.', 'error');
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
                    app.showNotification('활동 내용을 입력해주세요.', 'error');
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
                
                app.showNotification('활동이 성공적으로 기록되었습니다.', 'success');
                
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

    // 지역별 활동 로드 (개선된 버전)
    loadLocationActivities: function() {
        const activities = JSON.parse(localStorage.getItem('locationActivities') || '[]');
        
        // 수원시 4개 구별로 분류
        const districtGroups = {
            '영통구': [],
            '팔달구': [],
            '장안구': [],
            '권선구': []
        };
        
        // 활동을 구별로 분류
        activities.forEach(activity => {
            const address = activity.address;
            if (address.includes('영통구')) {
                districtGroups['영통구'].push(activity);
            } else if (address.includes('팔달구')) {
                districtGroups['팔달구'].push(activity);
            } else if (address.includes('장안구')) {
                districtGroups['장안구'].push(activity);
            } else if (address.includes('권선구')) {
                districtGroups['권선구'].push(activity);
            }
        });
        
        const container = document.getElementById('locationActivities');
        if (!container) return;
        
        // 총 활동이 없는 경우
        const totalActivities = Object.values(districtGroups).flat().length;
        if (totalActivities === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-map-marked-alt text-4xl mb-3"></i>
                    <div class="font-medium mb-1">지역별 활동 기록이 없습니다</div>
                    <div class="text-sm">위치 기반 활동을 기록해보세요</div>
                </div>
            `;
            return;
        }
        
        // 구별 카드 생성
        const html = Object.keys(districtGroups).map(district => {
            const districtActivities = districtGroups[district];
            const activityCounts = {
                'meeting': 0,
                'inspection': 0,
                'event': 0,
                'service': 0
            };
            
            // 활동 유형별 카운트
            districtActivities.forEach(activity => {
                activityCounts[activity.type] = (activityCounts[activity.type] || 0) + 1;
            });
            
            // 최근 활동 찾기
            const recentActivity = districtActivities.length > 0 ? 
                districtActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0] : null;
            
            // 활동 수에 따른 배경색 결정
            const totalCount = districtActivities.length;
            const backgroundClass = totalCount === 0 ? 'bg-gray-50' : 
                                  totalCount <= 2 ? 'bg-blue-50' :
                                  totalCount <= 4 ? 'bg-green-50' : 'bg-purple-50';
            
            const textClass = totalCount === 0 ? 'text-gray-600' :
                             totalCount <= 2 ? 'text-blue-800' :
                             totalCount <= 4 ? 'text-green-800' : 'text-purple-800';
            
            return `
                <div class="border border-gray-200 rounded-lg p-4 ${backgroundClass} hover:shadow-md transition-shadow cursor-pointer" 
                     onclick="app.showDistrictDetails('${district}')">
                    <!-- 구 헤더 -->
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mr-3">
                                <i class="fas fa-map-marker-alt ${textClass}"></i>
                            </div>
                            <div>
                                <div class="font-bold ${textClass}">수원시 ${district}</div>
                                <div class="text-sm text-gray-600">총 ${totalCount}건 활동</div>
                            </div>
                        </div>
                        <div class="text-right">
                            ${totalCount > 0 ? `
                                <div class="text-2xl font-bold ${textClass}">${totalCount}</div>
                                <div class="text-xs text-gray-500">건</div>
                            ` : `
                                <div class="text-gray-400">
                                    <i class="fas fa-minus-circle text-xl"></i>
                                </div>
                            `}
                        </div>
                    </div>
                    
                    ${totalCount > 0 ? `
                        <!-- 활동 유형별 분포 -->
                        <div class="grid grid-cols-4 gap-1 mb-3">
                            <div class="text-center p-2 bg-white rounded">
                                <div class="text-blue-600 font-bold">${activityCounts.meeting}</div>
                                <div class="text-xs text-gray-600">회의</div>
                            </div>
                            <div class="text-center p-2 bg-white rounded">
                                <div class="text-purple-600 font-bold">${activityCounts.inspection}</div>
                                <div class="text-xs text-gray-600">시찰</div>
                            </div>
                            <div class="text-center p-2 bg-white rounded">
                                <div class="text-orange-600 font-bold">${activityCounts.event}</div>
                                <div class="text-xs text-gray-600">행사</div>
                            </div>
                            <div class="text-center p-2 bg-white rounded">
                                <div class="text-green-600 font-bold">${activityCounts.service}</div>
                                <div class="text-xs text-gray-600">민원</div>
                            </div>
                        </div>
                        
                        <!-- 최근 활동 -->
                        <div class="bg-white p-3 rounded border-l-4 border-blue-500">
                            <div class="text-sm font-medium text-gray-800 mb-1">최근 활동</div>
                            <div class="text-xs text-gray-600">${recentActivity.description}</div>
                            <div class="text-xs text-gray-500 mt-1">
                                <i class="fas fa-clock mr-1"></i>
                                ${new Date(recentActivity.timestamp).toLocaleDateString()}
                            </div>
                        </div>
                    ` : `
                        <!-- 활동 없음 표시 -->
                        <div class="text-center py-4 text-gray-400">
                            <i class="fas fa-calendar-times text-2xl mb-2"></i>
                            <div class="text-sm">활동 기록이 없습니다</div>
                        </div>
                    `}
                    
                    <!-- 클릭 안내 -->
                    <div class="flex items-center justify-center mt-3 pt-3 border-t border-gray-200">
                        <span class="text-xs text-gray-500">
                            <i class="fas fa-eye mr-1"></i>클릭하여 상세보기
                        </span>
                    </div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = `
            <div class="grid grid-cols-1 gap-4">
                ${html}
            </div>
            
            <!-- 활동 요약 -->
            <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="font-bold text-gray-800">지역별 활동 요약</div>
                        <div class="text-sm text-gray-600">수원시 전체 ${totalActivities}건의 활동이 기록되었습니다</div>
                    </div>
                    <div class="text-right">
                        <button onclick="app.showLocationMap()" class="text-blue-600 text-sm hover:underline">
                            <i class="fas fa-map mr-1"></i>지도로 보기
                        </button>
                    </div>
                </div>
            </div>
        `;
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
            
            app.showNotification('활동 기록이 삭제되었습니다.', 'info');
            
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
            app.showNotification('내보낼 데이터가 없습니다.', 'info');
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
            app.showNotification('활동 데이터가 다운로드되었습니다.', 'success');
        }
    },

    // 구별 상세 활동 보기
    showDistrictDetails: function(district) {
        const activities = JSON.parse(localStorage.getItem('locationActivities') || '[]');
        const districtActivities = activities.filter(activity => activity.address.includes(district));
        
        if (districtActivities.length === 0) {
            app.showNotification(`${district}에 기록된 활동이 없습니다.`, 'info');
            return;
        }

        // 시간순으로 정렬
        districtActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        app.showModal('districtDetails', {
            title: `수원시 ${district} 활동 내역`,
            content: `
                <div class="space-y-4">
                    <!-- 구 요약 정보 -->
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-bold text-blue-800">수원시 ${district}</div>
                                <div class="text-sm text-gray-600">총 ${districtActivities.length}건의 활동</div>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-bold text-blue-600">${districtActivities.length}</div>
                                <div class="text-xs text-gray-500">건</div>
                            </div>
                        </div>
                    </div>

                    <!-- 활동 목록 -->
                    <div class="space-y-3 max-h-96 overflow-y-auto">
                        ${districtActivities.map(activity => `
                            <div class="bg-white border border-gray-200 rounded-lg p-3">
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center space-x-2">
                                        <span class="px-2 py-1 rounded-full text-xs ${
                                            activity.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                                            activity.type === 'inspection' ? 'bg-purple-100 text-purple-800' :
                                            activity.type === 'event' ? 'bg-orange-100 text-orange-800' :
                                            'bg-green-100 text-green-800'
                                        }">${activity.typeName}</span>
                                        <span class="text-sm text-gray-600">${new Date(activity.timestamp).toLocaleDateString()}</span>
                                    </div>
                                    <span class="text-xs text-gray-500">${new Date(activity.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <div class="text-sm font-medium mb-1">${activity.description}</div>
                                ${activity.participants ? `
                                    <div class="text-xs text-gray-600">
                                        <i class="fas fa-users mr-1"></i>${activity.participants}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>

                    <!-- 활동 유형별 통계 -->
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">활동 유형별 통계</h5>
                        <div class="grid grid-cols-2 gap-3">
                            ${['meeting', 'inspection', 'event', 'service'].map(type => {
                                const count = districtActivities.filter(a => a.type === type).length;
                                const typeNames = {
                                    'meeting': '회의/간담회',
                                    'inspection': '현장 시찰',
                                    'event': '행사 참석',
                                    'service': '민원 상담'
                                };
                                const colors = {
                                    'meeting': 'text-blue-600',
                                    'inspection': 'text-purple-600',
                                    'event': 'text-orange-600',
                                    'service': 'text-green-600'
                                };
                                return `
                                    <div class="text-center p-2 bg-gray-50 rounded">
                                        <div class="text-lg font-bold ${colors[type]}">${count}</div>
                                        <div class="text-xs text-gray-600">${typeNames[type]}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `,
            showCancel: false
        });
    },

    // 지도로 보기 (모의)
    showLocationMap: function() {
        app.showModal('locationMap', {
            title: '지역별 활동 지도',
            content: `
                <div class="space-y-4">
                    <div class="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                        <div class="text-center text-gray-500">
                            <i class="fas fa-map-marked-alt text-4xl mb-3"></i>
                            <div class="font-medium mb-1">수원시 활동 지도</div>
                            <div class="text-sm">향후 지도 API 연동 예정</div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-3">
                        <div class="bg-blue-50 p-3 rounded">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                <span class="text-sm">영통구 (4건)</span>
                            </div>
                        </div>
                        <div class="bg-green-50 p-3 rounded">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span class="text-sm">팔달구 (3건)</span>
                            </div>
                        </div>
                        <div class="bg-purple-50 p-3 rounded">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                                <span class="text-sm">장안구 (2건)</span>
                            </div>
                        </div>
                        <div class="bg-orange-50 p-3 rounded">
                            <div class="flex items-center">
                                <div class="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                                <span class="text-sm">권선구 (1건)</span>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            showCancel: false
        });
    }
});