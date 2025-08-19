// Enhanced Location-based Activity Tracking System with Google Maps Integration
Object.assign(window.app, {
    // 풍부한 위치 활동 데이터
    locationData: {
        recentActivities: [
            {
                id: 'LOC2025-001',
                type: 'meeting',
                title: '수원시갑 지역 교육현안 간담회',
                location: '수원시 영통구 월드컵로 206 수원월드컵경기장 회의실',
                address: '경기도 수원시 영통구 월드컵로 206',
                coordinates: { lat: 37.2866, lng: 127.0369 },
                startTime: '2025-01-17 14:00',
                endTime: '2025-01-17 16:30',
                duration: '2시간 30분',
                attendees: 45,
                status: 'completed',
                gpsVerified: true,
                distance: '12.3km',
                photos: ['meeting_01.jpg', 'meeting_02.jpg'],
                summary: '지역 학부모 45명과 교육현안 논의. 스마트 교육환경 구축 요청 다수',
                achievements: ['교육예산 증액 건의', '스마트교실 구축 논의', '방과후 프로그램 확대'],
                nextAction: '교육위원회 정책건의서 작성'
            },
            {
                id: 'LOC2025-002', 
                type: 'inspection',
                title: '수원천 수질개선 현장점검',
                location: '수원천 일대 (영통구 구간)',
                address: '경기도 수원시 영통구 하동',
                coordinates: { lat: 37.2924, lng: 127.0454 },
                startTime: '2025-01-16 10:00',
                endTime: '2025-01-16 12:00',
                duration: '2시간',
                participants: ['환경과 팀장', '시민환경감시단 3명'],
                status: 'completed',
                gpsVerified: true,
                distance: '8.7km',
                photos: ['inspection_01.jpg', 'inspection_02.jpg', 'inspection_03.jpg'],
                summary: '수원천 수질개선 사업 진행상황 점검 및 추가 개선방안 논의',
                findings: ['BOD 수치 20% 개선', '생태계 복원 효과 확인', '시민 만족도 상승'],
                followUp: '예산결산특위 수질개선 예산 증액 요청 예정'
            },
            {
                id: 'LOC2025-003',
                type: 'service',
                title: '독거어르신 생활실태 방문조사',
                location: '영통구 원천동 시니어복지센터',
                address: '경기도 수원시 영통구 원천동 123-45',
                coordinates: { lat: 37.2987, lng: 127.0587 },
                startTime: '2025-01-15 13:00',
                endTime: '2025-01-15 17:00',
                duration: '4시간',
                beneficiaries: 23,
                status: 'completed',
                gpsVerified: true,
                distance: '15.2km',
                photos: ['visit_01.jpg', 'visit_02.jpg'],
                summary: '독거어르신 23분 방문, 생활실태 조사 및 복지서비스 안내',
                services: ['건강상담', '복지서비스 연계', '응급연락망 구축'],
                issues: ['의료접근성 부족', '교통편의 부족', '사회적 고립']
            },
            {
                id: 'LOC2025-004',
                type: 'event',
                title: '신년 지역주민 만남의 날',
                location: '수원컨벤션센터 대회의실',
                address: '경기도 수원시 영통구 광교산로 140',
                coordinates: { lat: 37.2863, lng: 127.0438 },
                startTime: '2025-01-10 18:00',
                endTime: '2025-01-10 21:00',
                duration: '3시간',
                attendees: 320,
                status: 'completed',
                gpsVerified: true,
                distance: '9.8km',
                photos: ['event_01.jpg', 'event_02.jpg', 'event_03.jpg'],
                summary: '2025년 신년 인사 및 주요 정책방향 설명, 주민의견 수렴',
                agenda: ['2025년 주요 정책방향', '지역현안 Q&A', '청년정책 설명회'],
                feedback: ['청년 주거정책 관심 높음', '교통인프라 개선 요청', '환경개선 정책 지지']
            },
            {
                id: 'LOC2025-005',
                type: 'business',
                title: '지역 중소기업 경영현황 간담회',
                location: '수원상공회의소 소회의실',
                address: '경기도 수원시 영통구 센트럴타운로 22',
                coordinates: { lat: 37.2756, lng: 127.0523 },
                startTime: '2025-01-12 15:00',
                endTime: '2025-01-12 17:30',
                duration: '2시간 30분',
                companies: 12,
                status: 'completed',
                gpsVerified: true,
                distance: '6.5km',
                photos: ['business_01.jpg'],
                summary: '지역 중소기업 12곳 대표와 경영애로사항 및 정책지원 방안 논의',
                issues: ['인력난 심화', '자금조달 어려움', '규제 개선 필요'],
                solutions: ['청년 취업지원 확대', '정책자금 조건 완화', '원스톱 행정서비스']
            },
            {
                id: 'LOC2025-006',
                type: 'meeting',
                title: '마을버스 노선 개편 주민설명회',
                location: '영통구청 대회의실',
                address: '경기도 수원시 영통구 중부대로 343',
                coordinates: { lat: 37.2892, lng: 127.0631 },
                startTime: '2025-01-14 19:00',
                endTime: '2025-01-14 21:30',
                duration: '2시간 30분',
                attendees: 78,
                status: 'completed',
                gpsVerified: true,
                distance: '11.2km',
                summary: '마을버스 7번 노선 개편안에 대한 주민 의견수렴',
                concerns: ['운행간격 단축 요청', '정류장 추가 설치', '야간운행 연장'],
                resolution: '교통과와 협의 후 개편안 수정 예정'
            },
            {
                id: 'LOC2025-007',
                type: 'inspection',
                title: '어린이 놀이터 안전점검',
                location: '영통구 하동 새솔공원',
                address: '경기도 수원시 영통구 하동 967',
                coordinates: { lat: 37.2934, lng: 127.0512 },
                startTime: '2025-01-13 10:30',
                endTime: '2025-01-13 12:00',
                duration: '1시간 30분',
                facilities: 8,
                status: 'completed',
                gpsVerified: true,
                distance: '7.8km',
                summary: '어린이 놀이시설 8개소 안전상태 점검 및 개선방안 논의',
                findings: ['미끄럼틀 손잡이 교체 필요', '모래사장 추가 필요', '안전펜스 보수'],
                budget: '시설개선 예산 1,200만원 확보 필요'
            }
        ],
        monthlyStats: {
            totalActivities: 28,
            gpsVerifiedActivities: 26,
            totalHours: 78.5,
            totalDistance: '234.7km',
            beneficiaries: 1247,
            uniqueLocations: 18,
            categoryBreakdown: {
                meeting: 12,    // 간담회/회의
                inspection: 6,  // 현장점검
                service: 7,     // 복지서비스
                event: 2,       // 행사
                business: 1     // 기업방문
            }
        }
    },

    // 향상된 위치기반 활동 페이지 로드
    loadLocationTrackingPage: function() {
        const html = `
            <div class="page-container">
                <!-- 실시간 GPS 상태 및 현재 위치 -->
                <div class="gov-card mb-4">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="gov-title">🗺️ 위치기반 활동 추적</h3>
                        <div class="flex gap-2">
                            <button onclick="app.showLocationCertificate()" class="text-green-600 text-sm">
                                <i class="fas fa-certificate mr-1"></i>활동증명서
                            </button>
                            <button onclick="app.toggleGPSTracking()" class="text-blue-600 text-sm">
                                <i class="fas fa-location-arrow mr-1"></i>GPS 추적
                            </button>
                        </div>
                    </div>
                    
                    <!-- GPS 상태 카드 -->
                    <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4 border border-green-200">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <div class="flex items-center mb-2">
                                    <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                                    <span class="text-sm font-medium text-green-800">GPS 활성화됨</span>
                                </div>
                                <div id="currentLocation" class="font-bold text-lg text-gray-800">수원시 영통구 의회사무소</div>
                                <div id="currentAddress" class="text-sm text-gray-600 mt-1">경기도 수원시 영통구 중부대로 210</div>
                                <div class="text-xs text-gray-500 mt-2">
                                    📍 정확도: ±3m | 🕐 마지막 업데이트: 방금 전
                                </div>
                            </div>
                            <div class="text-right">
                                <button onclick="app.checkInCurrentLocation()" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                                    <i class="fas fa-check-circle mr-1"></i>체크인
                                </button>
                                <div class="text-xs text-gray-500 mt-1">활동 시작 시 체크인하세요</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 월간 활동 통계 대시보드 -->
                <div class="gov-card mb-4">
                    <h4 class="font-semibold mb-3">📊 이번 달 활동 현황 (1월)</h4>
                    <div class="grid grid-cols-3 gap-3 mb-4">
                        <div class="bg-blue-50 p-3 rounded-lg text-center border border-blue-200">
                            <div class="text-2xl font-bold text-blue-600">${this.locationData.monthlyStats.totalActivities}</div>
                            <div class="text-xs text-blue-700">총 활동</div>
                            <div class="text-xs text-gray-500 mt-1">GPS 검증: ${this.locationData.monthlyStats.gpsVerifiedActivities}건</div>
                        </div>
                        <div class="bg-green-50 p-3 rounded-lg text-center border border-green-200">
                            <div class="text-2xl font-bold text-green-600">${this.locationData.monthlyStats.totalHours}h</div>
                            <div class="text-xs text-green-700">활동 시간</div>
                            <div class="text-xs text-gray-500 mt-1">이동거리: ${this.locationData.monthlyStats.totalDistance}</div>
                        </div>
                        <div class="bg-purple-50 p-3 rounded-lg text-center border border-purple-200">
                            <div class="text-2xl font-bold text-purple-600">${this.locationData.monthlyStats.beneficiaries.toLocaleString()}</div>
                            <div class="text-xs text-purple-700">수혜자</div>
                            <div class="text-xs text-gray-500 mt-1">${this.locationData.monthlyStats.uniqueLocations}곳 방문</div>
                        </div>
                    </div>
                    
                    <!-- 활동 유형별 현황 -->
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="text-sm font-medium mb-2 text-gray-800">활동 유형별 현황</div>
                        <div class="grid grid-cols-5 gap-2 text-xs">
                            <div class="text-center">
                                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-1">${this.locationData.monthlyStats.categoryBreakdown.meeting}</div>
                                <div class="text-gray-600">간담회</div>
                            </div>
                            <div class="text-center">
                                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-1">${this.locationData.monthlyStats.categoryBreakdown.inspection}</div>
                                <div class="text-gray-600">현장점검</div>
                            </div>
                            <div class="text-center">
                                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-1">${this.locationData.monthlyStats.categoryBreakdown.service}</div>
                                <div class="text-gray-600">복지서비스</div>
                            </div>
                            <div class="text-center">
                                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-1">${this.locationData.monthlyStats.categoryBreakdown.event}</div>
                                <div class="text-gray-600">행사</div>
                            </div>
                            <div class="text-center">
                                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-1">${this.locationData.monthlyStats.categoryBreakdown.business}</div>
                                <div class="text-gray-600">기업방문</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 구글 지도 연동 -->
                <div class="gov-card mb-4">
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="font-semibold">🗺️ 활동 지도</h4>
                        <div class="flex gap-2">
                            <button onclick="app.showAllActivitiesOnMap()" class="text-blue-600 text-sm">
                                <i class="fas fa-map-marked-alt mr-1"></i>전체보기
                            </button>
                            <button onclick="app.openGoogleMaps()" class="text-green-600 text-sm">
                                <i class="fab fa-google mr-1"></i>구글지도
                            </button>
                        </div>
                    </div>
                    
                    <!-- 지도 컨테이너 (구글 지도 또는 정적 지도) -->
                    <div id="mapContainer" class="w-full h-48 bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
                        <div class="h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
                            <div class="text-center">
                                <i class="fas fa-map-marker-alt text-4xl text-blue-600 mb-2"></i>
                                <div class="font-semibold text-gray-800">활동 위치 지도</div>
                                <div class="text-sm text-gray-600 mb-3">최근 7일간 방문한 ${this.locationData.monthlyStats.uniqueLocations}곳의 위치</div>
                                <button onclick="app.loadInteractiveMap()" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                                    <i class="fab fa-google mr-1"></i>구글 지도로 보기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 최근 활동 목록 -->
                <div class="gov-card mb-4">
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="font-semibold">📋 최근 활동 목록</h4>
                        <div class="flex gap-2">
                            <select id="activityFilter" class="text-sm border border-gray-300 rounded px-2 py-1" onchange="app.filterActivities()">
                                <option value="all">전체</option>
                                <option value="meeting">간담회</option>
                                <option value="inspection">현장점검</option>
                                <option value="service">복지서비스</option>
                                <option value="event">행사</option>
                                <option value="business">기업방문</option>
                            </select>
                            <button onclick="app.exportActivityReport()" class="text-green-600 text-sm">
                                <i class="fas fa-download mr-1"></i>보고서
                            </button>
                        </div>
                    </div>
                    
                    <div id="activityList" class="space-y-3">
                        <!-- 활동 목록이 동적으로 생성됩니다 -->
                    </div>
                </div>
            </div>
        `;

        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
            
            // 페이지 로드 후 초기화
            setTimeout(() => {
                this.loadActivityList();
                this.simulateCurrentLocation();
            }, 100);
        }
    },

    // 활동 목록 로드
    loadActivityList: function(filter = 'all') {
        const listContainer = document.getElementById('activityList');
        if (!listContainer) return;

        let activities = this.locationData.recentActivities;
        if (filter !== 'all') {
            activities = activities.filter(activity => activity.type === filter);
        }

        const listHtml = activities.map(activity => {
            const typeInfo = this.getActivityTypeInfo(activity.type);
            const statusColor = activity.gpsVerified ? 'text-green-600' : 'text-orange-600';
            const statusIcon = activity.gpsVerified ? 'fa-check-circle' : 'fa-exclamation-triangle';

            return `
                <div class="activity-item border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer" onclick="app.showLocationActivityDetail('${activity.id}')">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-2">
                                <div class="w-8 h-8 ${typeInfo.bgColor} ${typeInfo.textColor} rounded-full flex items-center justify-center text-sm">
                                    <i class="fas ${typeInfo.icon}"></i>
                                </div>
                                <div>
                                    <h5 class="font-semibold text-gray-900">${activity.title}</h5>
                                    <div class="text-xs text-gray-500">${typeInfo.label}</div>
                                </div>
                            </div>
                            
                            <div class="space-y-1 text-sm text-gray-600">
                                <div class="flex items-center">
                                    <i class="fas fa-map-marker-alt mr-2 text-red-500 w-4"></i>
                                    <span class="truncate">${activity.location}</span>
                                    <button onclick="event.stopPropagation(); app.openLocationInMaps('${activity.address}')" class="ml-2 text-blue-600 hover:text-blue-800">
                                        <i class="fab fa-google text-xs"></i>
                                    </button>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-clock mr-2 text-blue-500 w-4"></i>
                                    <span>${activity.startTime} (${activity.duration})</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-route mr-2 text-purple-500 w-4"></i>
                                    <span>이동거리: ${activity.distance || 'N/A'}</span>
                                </div>
                            </div>
                            
                            <div class="mt-2 text-xs text-gray-700 bg-gray-50 p-2 rounded">
                                ${activity.summary}
                            </div>
                        </div>
                        
                        <div class="ml-3 text-right">
                            <div class="flex items-center ${statusColor} mb-1">
                                <i class="fas ${statusIcon} mr-1"></i>
                                <span class="text-xs font-medium">
                                    ${activity.gpsVerified ? 'GPS 검증됨' : '수동 등록'}
                                </span>
                            </div>
                            ${activity.attendees ? `<div class="text-xs text-gray-500">참석자: ${activity.attendees}명</div>` : ''}
                            ${activity.beneficiaries ? `<div class="text-xs text-gray-500">수혜자: ${activity.beneficiaries}명</div>` : ''}
                            ${activity.companies ? `<div class="text-xs text-gray-500">기업: ${activity.companies}곳</div>` : ''}
                            ${activity.facilities ? `<div class="text-xs text-gray-500">시설: ${activity.facilities}개소</div>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        listContainer.innerHTML = listHtml;
    },

    // 활동 유형 정보 반환
    getActivityTypeInfo: function(type) {
        const typeMap = {
            'meeting': { label: '간담회/회의', icon: 'fa-users', bgColor: 'bg-blue-500', textColor: 'text-white' },
            'inspection': { label: '현장점검', icon: 'fa-search', bgColor: 'bg-orange-500', textColor: 'text-white' },
            'service': { label: '복지서비스', icon: 'fa-heart', bgColor: 'bg-green-500', textColor: 'text-white' },
            'event': { label: '행사', icon: 'fa-calendar-alt', bgColor: 'bg-purple-500', textColor: 'text-white' },
            'business': { label: '기업방문', icon: 'fa-building', bgColor: 'bg-red-500', textColor: 'text-white' }
        };
        return typeMap[type] || { label: '기타', icon: 'fa-circle', bgColor: 'bg-gray-500', textColor: 'text-white' };
    },

    // 현재 위치 시뮬레이션
    simulateCurrentLocation: function() {
        const locationEl = document.getElementById('currentLocation');
        const addressEl = document.getElementById('currentAddress');
        
        if (locationEl && addressEl) {
            // 실제로는 navigator.geolocation API를 사용합니다
            setTimeout(() => {
                locationEl.textContent = '경기도의회 의원회관';
                addressEl.textContent = '경기도 수원시 영통구 중부대로 210 (의원회관 3층)';
            }, 1000);
        }
    },

    // 활동 필터링
    filterActivities: function() {
        const filter = document.getElementById('activityFilter').value;
        this.loadActivityList(filter);
    },

    // 구글 지도에서 위치 열기
    openLocationInMaps: function(address) {
        const encodedAddress = encodeURIComponent(address);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        window.open(googleMapsUrl, '_blank');
    },

    // 구글 지도 열기 (모든 활동 위치)
    openGoogleMaps: function() {
        const center = '경기도 수원시 영통구';
        const encodedCenter = encodeURIComponent(center);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedCenter}`;
        window.open(googleMapsUrl, '_blank');
    },

    // 인터랙티브 지도 로드
    loadInteractiveMap: function() {
        const mapContainer = document.getElementById('mapContainer');
        if (!mapContainer) return;

        // 실제 구현에서는 Google Maps JavaScript API를 사용
        mapContainer.innerHTML = `
            <div class="h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
                <div class="text-center">
                    <i class="fab fa-google text-4xl text-blue-600 mb-2"></i>
                    <div class="font-semibold text-gray-800">구글 지도 로딩 중...</div>
                    <div class="text-sm text-gray-600 mb-3">잠시만 기다려주세요</div>
                    <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        `;

        // 시뮬레이션: 3초 후 지도 로드 완료
        setTimeout(() => {
            this.showSimulatedMap();
        }, 3000);
    },

    // 시뮬레이션된 지도 표시
    showSimulatedMap: function() {
        const mapContainer = document.getElementById('mapContainer');
        if (!mapContainer) return;

        mapContainer.innerHTML = `
            <div class="h-full bg-gray-100 p-4 flex items-center justify-center relative">
                <div class="text-center">
                    <i class="fas fa-map-marked-alt text-6xl text-blue-600 mb-3"></i>
                    <div class="font-bold text-lg text-gray-800">수원시갑 지역구 활동 지도</div>
                    <div class="text-sm text-gray-600 mb-4">최근 한 달간 ${this.locationData.monthlyStats.uniqueLocations}곳 방문</div>
                    
                    <!-- 시뮬레이션된 마커들 -->
                    <div class="grid grid-cols-3 gap-2 text-xs">
                        <div class="bg-blue-500 text-white px-2 py-1 rounded">📍 수원월드컵경기장</div>
                        <div class="bg-green-500 text-white px-2 py-1 rounded">📍 영통구청</div>
                        <div class="bg-orange-500 text-white px-2 py-1 rounded">📍 수원천</div>
                        <div class="bg-purple-500 text-white px-2 py-1 rounded">📍 컨벤션센터</div>
                        <div class="bg-red-500 text-white px-2 py-1 rounded">📍 상공회의소</div>
                        <div class="bg-yellow-600 text-white px-2 py-1 rounded">📍 복지센터</div>
                    </div>
                    
                    <button onclick="app.openGoogleMaps()" class="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                        <i class="fab fa-google mr-1"></i>실제 구글 지도로 보기
                    </button>
                </div>
            </div>
        `;
    },

    // 현재 위치에서 체크인
    checkInCurrentLocation: function() {
        this.showNotification('현재 위치에서 체크인했습니다.', 'success');
        // 실제로는 GPS 좌표를 기록하고 활동을 시작합니다
    },

    // GPS 추적 토글
    toggleGPSTracking: function() {
        this.showNotification('GPS 추적이 활성화되었습니다.', 'success');
        // 실제로는 위치 추적을 시작/중지합니다
    },

    // 활동 증명서 표시
    showLocationCertificate: function() {
        const content = `
            <div class="space-y-4">
                <!-- 공식 헤더 -->
                <div class="text-center border-b border-gray-200 pb-4">
                    <div class="w-16 h-16 mx-auto mb-3 bg-blue-600 rounded-full flex items-center justify-center">
                        <i class="fas fa-certificate text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900">의정활동 증명서</h3>
                    <div class="text-sm text-gray-600">Location-based Activity Certificate</div>
                </div>

                <!-- 의원 정보 -->
                <div class="bg-blue-50 p-4 rounded-lg">
                    <div class="text-center">
                        <div class="font-bold text-lg text-blue-900">김영수 의원</div>
                        <div class="text-sm text-blue-700">경기도의회 의원 (수원시갑)</div>
                        <div class="text-xs text-gray-600 mt-1">교육위원회 위원장</div>
                    </div>
                </div>

                <!-- 증명 내용 -->
                <div class="space-y-3">
                    <div class="border-l-4 border-blue-500 pl-4">
                        <div class="font-semibold text-gray-900">증명 기간</div>
                        <div class="text-sm text-gray-600">2025년 1월 1일 ~ 2025년 1월 17일</div>
                    </div>
                    
                    <div class="border-l-4 border-green-500 pl-4">
                        <div class="font-semibold text-gray-900">총 활동 현황</div>
                        <div class="text-sm text-gray-600">
                            • 총 활동 횟수: ${this.locationData.monthlyStats.totalActivities}회<br>
                            • GPS 검증 활동: ${this.locationData.monthlyStats.gpsVerifiedActivities}회<br>
                            • 총 활동 시간: ${this.locationData.monthlyStats.totalHours}시간<br>
                            • 총 이동 거리: ${this.locationData.monthlyStats.totalDistance}<br>
                            • 수혜자 수: ${this.locationData.monthlyStats.beneficiaries.toLocaleString()}명
                        </div>
                    </div>
                    
                    <div class="border-l-4 border-purple-500 pl-4">
                        <div class="font-semibold text-gray-900">활동 유형별 현황</div>
                        <div class="text-sm text-gray-600">
                            • 간담회/회의: ${this.locationData.monthlyStats.categoryBreakdown.meeting}회<br>
                            • 현장점검: ${this.locationData.monthlyStats.categoryBreakdown.inspection}회<br>
                            • 복지서비스: ${this.locationData.monthlyStats.categoryBreakdown.service}회<br>
                            • 행사참여: ${this.locationData.monthlyStats.categoryBreakdown.event}회<br>
                            • 기업방문: ${this.locationData.monthlyStats.categoryBreakdown.business}회
                        </div>
                    </div>
                </div>

                <!-- 기술적 검증 정보 -->
                <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="text-sm font-semibold text-gray-800 mb-2">기술적 검증 정보</div>
                    <div class="text-xs text-gray-600 space-y-1">
                        <div>✓ GPS 좌표 기반 위치 검증</div>
                        <div>✓ 시간 기록 자동 추적</div>
                        <div>✓ 블록체인 기반 위변조 방지</div>
                        <div>✓ 실시간 동기화 및 백업</div>
                    </div>
                </div>

                <!-- 발급 정보 -->
                <div class="text-center pt-4 border-t border-gray-200">
                    <div class="text-xs text-gray-500">
                        발급일시: ${new Date().toLocaleString('ko-KR')}<br>
                        발급기관: 경기도의회 의정활동 관리시스템<br>
                        문서번호: CERT-${Date.now().toString().slice(-8)}
                    </div>
                </div>
            </div>
        `;

        this.showModal('location-certificate', {
            title: '📜 의정활동 증명서',
            content: content,
            confirmText: '확인',
            modalClass: 'modal-wide certificate-modal',
            showExtraButtons: true,
            extraButtons: [
                {
                    text: '📄 PDF 다운로드',
                    class: 'bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700',
                    onclick: 'app.downloadCertificatePDF()'
                },
                {
                    text: '📧 이메일 발송',
                    class: 'bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700',
                    onclick: 'app.emailCertificate()'
                }
            ]
        });
    },

    // 증명서 PDF 다운로드
    downloadCertificatePDF: function() {
        this.showNotification('증명서 PDF를 생성 중입니다...', 'info');
        setTimeout(() => {
            this.showNotification('증명서 PDF가 다운로드되었습니다.', 'success');
        }, 2000);
    },

    // 증명서 이메일 발송
    emailCertificate: function() {
        const email = prompt('증명서를 발송할 이메일 주소를 입력해주세요:');
        if (email) {
            this.showNotification(`${email}로 증명서를 발송했습니다.`, 'success');
        }
    },

    // 활동 보고서 내보내기
    exportActivityReport: function() {
        this.showNotification('활동 보고서를 생성 중입니다...', 'info');
        setTimeout(() => {
            this.showNotification('활동 보고서가 다운로드되었습니다.', 'success');
        }, 1500);
    },

    // 위치 기반 활동 상세 보기 (이름 변경: showActivityDetail -> showLocationActivityDetail)
    showLocationActivityDetail: function(activityId) {
        const activity = this.locationData.recentActivities.find(a => a.id === activityId);
        if (!activity) return;

        const typeInfo = this.getActivityTypeInfo(activity.type);
        
        const content = `
            <div class="space-y-4">
                <!-- 활동 헤더 -->
                <div class="flex items-start space-x-4 pb-4 border-b border-gray-200">
                    <div class="w-12 h-12 ${typeInfo.bgColor} ${typeInfo.textColor} rounded-full flex items-center justify-center">
                        <i class="fas ${typeInfo.icon} text-lg"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-lg font-bold text-gray-900">${activity.title}</h3>
                        <div class="text-sm text-gray-600">${typeInfo.label}</div>
                        <div class="flex items-center mt-2 space-x-4 text-sm">
                            <span class="flex items-center ${activity.gpsVerified ? 'text-green-600' : 'text-orange-600'}">
                                <i class="fas ${activity.gpsVerified ? 'fa-check-circle' : 'fa-exclamation-triangle'} mr-1"></i>
                                ${activity.gpsVerified ? 'GPS 검증됨' : '수동 등록'}
                            </span>
                            <span class="text-gray-500">ID: ${activity.id}</span>
                        </div>
                    </div>
                </div>

                <!-- 기본 정보 -->
                <div class="grid grid-cols-1 gap-4">
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="font-semibold text-gray-800 mb-2">📍 위치 정보</div>
                        <div class="text-sm text-gray-700">
                            <div class="font-medium">${activity.location}</div>
                            <div class="text-gray-600">${activity.address}</div>
                            <button onclick="app.openLocationInMaps('${activity.address}')" class="mt-2 text-blue-600 hover:text-blue-800 text-xs">
                                <i class="fab fa-google mr-1"></i>구글 지도에서 보기
                            </button>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="font-semibold text-gray-800 mb-2">🕐 시간 정보</div>
                        <div class="text-sm text-gray-700">
                            <div>시작: ${activity.startTime}</div>
                            <div>종료: ${activity.endTime}</div>
                            <div>소요시간: ${activity.duration}</div>
                            ${activity.distance ? `<div>이동거리: ${activity.distance}</div>` : ''}
                        </div>
                    </div>
                </div>

                <!-- 활동 요약 -->
                <div class="bg-blue-50 p-4 rounded-lg">
                    <div class="font-semibold text-blue-900 mb-2">📝 활동 요약</div>
                    <div class="text-sm text-blue-800">${activity.summary}</div>
                </div>

                ${activity.achievements ? `
                <div class="bg-green-50 p-4 rounded-lg">
                    <div class="font-semibold text-green-900 mb-2">🏆 주요 성과</div>
                    <ul class="text-sm text-green-800 space-y-1">
                        ${activity.achievements.map(achievement => `<li>• ${achievement}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                ${activity.issues ? `
                <div class="bg-yellow-50 p-4 rounded-lg">
                    <div class="font-semibold text-yellow-900 mb-2">⚠️ 주요 이슈</div>
                    <ul class="text-sm text-yellow-800 space-y-1">
                        ${activity.issues.map(issue => `<li>• ${issue}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                ${activity.solutions ? `
                <div class="bg-purple-50 p-4 rounded-lg">
                    <div class="font-semibold text-purple-900 mb-2">💡 해결방안</div>
                    <ul class="text-sm text-purple-800 space-y-1">
                        ${activity.solutions.map(solution => `<li>• ${solution}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                <!-- 참여자/수혜자 정보 -->
                <div class="grid grid-cols-2 gap-4 text-sm">
                    ${activity.attendees ? `
                    <div class="bg-gray-50 p-3 rounded-lg text-center">
                        <div class="text-2xl font-bold text-blue-600">${activity.attendees}</div>
                        <div class="text-gray-600">참석자 수</div>
                    </div>
                    ` : ''}
                    ${activity.beneficiaries ? `
                    <div class="bg-gray-50 p-3 rounded-lg text-center">
                        <div class="text-2xl font-bold text-green-600">${activity.beneficiaries}</div>
                        <div class="text-gray-600">수혜자 수</div>
                    </div>
                    ` : ''}
                    ${activity.companies ? `
                    <div class="bg-gray-50 p-3 rounded-lg text-center">
                        <div class="text-2xl font-bold text-purple-600">${activity.companies}</div>
                        <div class="text-gray-600">참여 기업</div>
                    </div>
                    ` : ''}
                    ${activity.facilities ? `
                    <div class="bg-gray-50 p-3 rounded-lg text-center">
                        <div class="text-2xl font-bold text-orange-600">${activity.facilities}</div>
                        <div class="text-gray-600">점검 시설</div>
                    </div>
                    ` : ''}
                </div>

                ${activity.photos && activity.photos.length > 0 ? `
                <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="font-semibold text-gray-800 mb-3">📸 활동 사진 (${activity.photos.length}장)</div>
                    <div class="grid grid-cols-3 gap-2">
                        ${activity.photos.map(photo => `
                            <div class="bg-gray-200 rounded-lg h-16 flex items-center justify-center text-gray-500 text-xs">
                                <i class="fas fa-image mr-1"></i>${photo}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                ${activity.nextAction || activity.followUp ? `
                <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div class="font-semibold text-yellow-900 mb-2">📋 후속 조치</div>
                    <div class="text-sm text-yellow-800">
                        ${activity.nextAction || activity.followUp}
                    </div>
                </div>
                ` : ''}
            </div>
        `;

        this.showModal('activity-detail', {
            title: `📋 ${activity.title}`,
            content: content,
            confirmText: '확인',
            modalClass: 'modal-wide activity-detail-modal'
        });
    }
});