// Enhanced Interactive Map Component with Route Display and Location Markers
Object.assign(window.app, {
    // 인터랙티브 지도 시스템
    interactiveMap: {
        // 지도 인스턴스 및 설정
        mapInstance: null,
        mapContainer: null,
        currentLayer: 'roadmap', // roadmap, satellite, hybrid, terrain
        
        // 마커 및 경로 관리
        markers: new Map(),
        routes: [],
        currentRoute: null,
        
        // 지도 상태
        isInitialized: false,
        isTracking: false,
        centerLocked: false,
        
        // 기본 설정
        defaultCenter: { lat: 37.2866, lng: 127.0369 }, // 수원시청
        defaultZoom: 15,
        
        // 마커 아이콘 설정
        markerIcons: {
            current: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="12" fill="#3b82f6" stroke="white" stroke-width="3"/>
                        <circle cx="16" cy="16" r="4" fill="white"/>
                    </svg>
                `),
                scaledSize: { width: 32, height: 32 }
            },
            meeting: {
                url: 'data:image/svg+xml;base64,' + btoa(`
                    <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0C7.2 0 0 7.2 0 16s16 24 16 24 16-15.2 16-24S24.8 0 16 0z" fill="#10b981"/>
                        <circle cx="16" cy="16" r="8" fill="white"/>
                        <path d="M12 16l3 3 6-6" stroke="#10b981" stroke-width="2" fill="none"/>
                    </svg>
                `),
                scaledSize: { width: 32, height: 40 }
            },
            inspection: {
                url: 'data:image/svg+xml;base64=' + btoa(`
                    <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0C7.2 0 0 7.2 0 16s16 24 16 24 16-15.2 16-24S24.8 0 16 0z" fill="#f59e0b"/>
                        <circle cx="16" cy="16" r="8" fill="white"/>
                        <path d="M16 10v8M12 14h8" stroke="#f59e0b" stroke-width="2"/>
                    </svg>
                `),
                scaledSize: { width: 32, height: 40 }
            },
            complaint: {
                url: 'data:image/svg+xml;base64=' + btoa(`
                    <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0C7.2 0 0 7.2 0 16s16 24 16 24 16-15.2 16-24S24.8 0 16 0z" fill="#ef4444"/>
                        <circle cx="16" cy="16" r="8" fill="white"/>
                        <text x="16" y="20" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="bold">!</text>
                    </svg>
                `),
                scaledSize: { width: 32, height: 40 }
            }
        },

        // 지도 초기화
        initialize: function(containerId = 'locationMap') {
            this.mapContainer = document.getElementById(containerId);
            if (!this.mapContainer) {
                console.warn('Map container not found:', containerId);
                return false;
            }

            // 실제 환경에서는 Google Maps 또는 Kakao Maps API 사용
            // 여기서는 시뮬레이션으로 구현
            this.createSimulatedMap();
            this.setupEventListeners();
            this.isInitialized = true;
            
            console.log('🗺️ Interactive map initialized');
            return true;
        },

        // 시뮬레이션 지도 생성
        createSimulatedMap: function() {
            this.mapContainer.innerHTML = `
                <div class="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                    <!-- 지도 컨트롤 -->
                    <div class="absolute top-4 right-4 z-10 space-y-2">
                        <div class="bg-white rounded-lg shadow-lg p-2">
                            <button id="mapZoomIn" class="btn btn-ghost btn-sm">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button id="mapZoomOut" class="btn btn-ghost btn-sm">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                        <div class="bg-white rounded-lg shadow-lg p-2">
                            <button id="mapCurrentLocation" class="btn btn-ghost btn-sm">
                                <i class="fas fa-crosshairs"></i>
                            </button>
                        </div>
                        <div class="bg-white rounded-lg shadow-lg p-2">
                            <select id="mapLayerSelect" class="text-xs border-0 bg-transparent">
                                <option value="roadmap">일반</option>
                                <option value="satellite">위성</option>
                                <option value="hybrid">혼합</option>
                                <option value="terrain">지형</option>
                            </select>
                        </div>
                    </div>

                    <!-- 지도 영역 -->
                    <div id="mapCanvas" class="w-full h-full relative">
                        <!-- 격자 배경 -->
                        <div class="absolute inset-0 opacity-20">
                            <svg width="100%" height="100%">
                                <defs>
                                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#374151" stroke-width="1"/>
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                            </svg>
                        </div>

                        <!-- 도로 시뮬레이션 -->
                        <div class="absolute inset-0">
                            <svg width="100%" height="100%" class="pointer-events-none">
                                <!-- 주요 도로 -->
                                <path d="M 50 200 Q 200 100 350 150 Q 450 200 550 180" 
                                      stroke="#6b7280" stroke-width="8" fill="none" opacity="0.7"/>
                                <path d="M 100 50 L 100 300 Q 150 350 200 300 L 200 400" 
                                      stroke="#6b7280" stroke-width="6" fill="none" opacity="0.7"/>
                                <path d="M 0 250 L 600 250" 
                                      stroke="#6b7280" stroke-width="4" fill="none" opacity="0.7"/>
                            </svg>
                        </div>

                        <!-- 마커 컨테이너 -->
                        <div id="mapMarkers" class="absolute inset-0 pointer-events-none">
                            <!-- 동적으로 생성되는 마커들 -->
                        </div>

                        <!-- 경로 표시 -->
                        <div id="mapRoutes" class="absolute inset-0 pointer-events-none">
                            <!-- 동적으로 생성되는 경로들 -->
                        </div>

                        <!-- 정보창 컨테이너 -->
                        <div id="mapInfoWindows" class="absolute inset-0 pointer-events-auto">
                            <!-- 동적으로 생성되는 정보창들 -->
                        </div>
                    </div>

                    <!-- 지도 하단 정보 -->
                    <div class="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-xs shadow-lg">
                        <div class="font-semibold">실시간 지도</div>
                        <div class="text-muted-foreground">수원시 영통구 일대</div>
                        <div id="mapCoordinates" class="font-mono text-blue-600">
                            ${window.app.locationService?.currentPosition ? 
                                `${window.app.locationService.currentPosition.lat.toFixed(6)}, ${window.app.locationService.currentPosition.lng.toFixed(6)}` : 
                                '37.286600, 127.036900'
                            }
                        </div>
                    </div>

                    <!-- 범례 -->
                    <div class="absolute top-4 left-4 bg-white/90 rounded-lg p-3 text-xs shadow-lg">
                        <div class="font-semibold mb-2">범례</div>
                        <div class="space-y-1">
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span>현재 위치</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>회의/간담회</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span>현장점검</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span>민원 처리</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // 초기 마커 및 경로 표시
            this.loadInitialMarkers();
            this.loadSampleRoute();
        },

        // 이벤트 리스너 설정
        setupEventListeners: function() {
            // 줌 컨트롤
            const zoomInBtn = document.getElementById('mapZoomIn');
            const zoomOutBtn = document.getElementById('mapZoomOut');
            const currentLocationBtn = document.getElementById('mapCurrentLocation');
            const layerSelect = document.getElementById('mapLayerSelect');

            if (zoomInBtn) {
                zoomInBtn.addEventListener('click', () => this.zoomIn());
            }
            if (zoomOutBtn) {
                zoomOutBtn.addEventListener('click', () => this.zoomOut());
            }
            if (currentLocationBtn) {
                currentLocationBtn.addEventListener('click', () => this.centerToCurrentLocation());
            }
            if (layerSelect) {
                layerSelect.addEventListener('change', (e) => this.changeLayer(e.target.value));
            }

            // 지도 클릭 이벤트
            const mapCanvas = document.getElementById('mapCanvas');
            if (mapCanvas) {
                mapCanvas.addEventListener('click', (e) => this.handleMapClick(e));
                mapCanvas.addEventListener('contextmenu', (e) => this.handleMapRightClick(e));
            }
        },

        // 초기 마커 로드
        loadInitialMarkers: function() {
            const sampleMarkers = [
                {
                    id: 'current',
                    type: 'current',
                    position: window.app.locationService?.currentPosition || this.defaultCenter,
                    title: '현재 위치',
                    description: '실시간 GPS 위치',
                    clickable: true
                },
                {
                    id: 'meeting1',
                    type: 'meeting',
                    position: { lat: 37.2856, lng: 127.0389 },
                    title: '수원시갑 지역 교육현안 간담회',
                    description: '지역 학부모 45명과 교육현안 논의',
                    timestamp: '2025-01-17 14:00',
                    clickable: true
                },
                {
                    id: 'inspection1',
                    type: 'inspection',
                    position: { lat: 37.2924, lng: 127.0454 },
                    title: '수원천 수질개선 현장점검',
                    description: 'BOD 수치 20% 개선 확인',
                    timestamp: '2025-01-16 10:00',
                    clickable: true
                },
                {
                    id: 'complaint1',
                    type: 'complaint',
                    position: { lat: 37.2876, lng: 127.0356 },
                    title: '가로등 고장 신고 처리',
                    description: '테헤란로 123번길 가로등 수리 완료',
                    timestamp: '2025-01-15 09:30',
                    clickable: true
                }
            ];

            sampleMarkers.forEach(marker => this.addMarker(marker));
        },

        // 샘플 경로 로드
        loadSampleRoute: function() {
            const routePoints = [
                { lat: 37.2866, lng: 127.0369 }, // 수원시청
                { lat: 37.2856, lng: 127.0389 }, // 간담회 장소
                { lat: 37.2924, lng: 127.0454 }, // 현장점검 장소
                { lat: 37.2876, lng: 127.0356 }  // 민원 처리 장소
            ];

            this.addRoute({
                id: 'dailyRoute',
                points: routePoints,
                color: '#3b82f6',
                width: 3,
                title: '오늘의 활동 경로',
                distance: '12.5km',
                duration: '45분'
            });
        },

        // 마커 추가
        addMarker: function(markerData) {
            const markersContainer = document.getElementById('mapMarkers');
            if (!markersContainer) return;

            // 지도 좌표를 픽셀 좌표로 변환 (시뮬레이션)
            const pixelPos = this.latLngToPixel(markerData.position);
            
            const markerElement = document.createElement('div');
            markerElement.className = 'absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-10';
            markerElement.style.left = pixelPos.x + 'px';
            markerElement.style.top = pixelPos.y + 'px';
            markerElement.dataset.markerId = markerData.id;

            // 마커 아이콘 설정
            const iconConfig = this.markerIcons[markerData.type] || this.markerIcons.current;
            
            markerElement.innerHTML = `
                <div class="marker-icon relative">
                    <div class="w-8 h-10 flex items-center justify-center">
                        ${this.getMarkerIconSVG(markerData.type)}
                    </div>
                    ${markerData.type === 'current' ? `
                        <div class="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-20"></div>
                    ` : ''}
                </div>
            `;

            // 클릭 이벤트
            if (markerData.clickable) {
                markerElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showMarkerInfo(markerData);
                });
            }

            // 호버 효과
            markerElement.addEventListener('mouseenter', () => {
                markerElement.style.transform = 'translateX(-50%) translateY(-100%) scale(1.1)';
            });
            markerElement.addEventListener('mouseleave', () => {
                markerElement.style.transform = 'translateX(-50%) translateY(-100%) scale(1)';
            });

            markersContainer.appendChild(markerElement);
            this.markers.set(markerData.id, { element: markerElement, data: markerData });
        },

        // 마커 아이콘 SVG 생성
        getMarkerIconSVG: function(type) {
            const iconColors = {
                current: '#3b82f6',
                meeting: '#10b981',
                inspection: '#f59e0b',
                complaint: '#ef4444'
            };

            const color = iconColors[type] || iconColors.current;

            if (type === 'current') {
                return `
                    <svg width="32" height="32" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="3"/>
                        <circle cx="16" cy="16" r="4" fill="white"/>
                    </svg>
                `;
            } else {
                const icons = {
                    meeting: 'M12 16l3 3 6-6',
                    inspection: 'M16 10v8M12 14h8',
                    complaint: 'M16 12v4M16 20h.01'
                };

                return `
                    <svg width="32" height="40" viewBox="0 0 32 40">
                        <path d="M16 0C7.2 0 0 7.2 0 16s16 24 16 24 16-15.2 16-24S24.8 0 16 0z" fill="${color}"/>
                        <circle cx="16" cy="16" r="8" fill="white"/>
                        ${type === 'complaint' ? 
                            `<text x="16" y="20" text-anchor="middle" fill="${color}" font-size="12" font-weight="bold">!</text>` :
                            `<path d="${icons[type]}" stroke="${color}" stroke-width="2" fill="none"/>`
                        }
                    </svg>
                `;
            }
        },

        // 경로 추가
        addRoute: function(routeData) {
            const routesContainer = document.getElementById('mapRoutes');
            if (!routesContainer) return;

            const routeElement = document.createElement('div');
            routeElement.className = 'absolute inset-0';
            routeElement.dataset.routeId = routeData.id;

            // 경로 점들을 픽셀 좌표로 변환
            const pixelPoints = routeData.points.map(point => this.latLngToPixel(point));

            // SVG 경로 생성
            const pathData = pixelPoints.map((point, index) => {
                return index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`;
            }).join(' ');

            routeElement.innerHTML = `
                <svg width="100%" height="100%" class="pointer-events-none">
                    <path d="${pathData}" 
                          stroke="${routeData.color}" 
                          stroke-width="${routeData.width}" 
                          fill="none" 
                          stroke-dasharray="${routeData.dashed ? '10,5' : 'none'}"
                          opacity="0.8"/>
                </svg>
            `;

            routesContainer.appendChild(routeElement);
            this.routes.push({ element: routeElement, data: routeData });
        },

        // 마커 정보 표시
        showMarkerInfo: function(markerData) {
            const infoContent = `
                <div class="space-y-3">
                    <div>
                        <h4 class="font-semibold text-sm">${markerData.title}</h4>
                        <p class="text-xs text-muted-foreground">${markerData.description}</p>
                    </div>
                    
                    ${markerData.timestamp ? `
                        <div class="text-xs text-muted-foreground">
                            <i class="fas fa-clock mr-1"></i>${markerData.timestamp}
                        </div>
                    ` : ''}
                    
                    <div class="text-xs font-mono text-blue-600">
                        ${markerData.position.lat.toFixed(6)}, ${markerData.position.lng.toFixed(6)}
                    </div>
                    
                    <div class="flex gap-2">
                        <button onclick="app.interactiveMap.centerToMarker('${markerData.id}')" class="btn btn-outline btn-sm">
                            <i class="fas fa-crosshairs mr-1"></i>중심으로
                        </button>
                        ${markerData.type !== 'current' ? `
                            <button onclick="app.interactiveMap.showRouteToMarker('${markerData.id}')" class="btn btn-outline btn-sm">
                                <i class="fas fa-route mr-1"></i>경로
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;

            window.app.showModal('marker-info', {
                title: `📍 ${markerData.title}`,
                content: infoContent,
                confirmText: '닫기'
            });
        },

        // 위경도를 픽셀 좌표로 변환 (시뮬레이션)
        latLngToPixel: function(latLng) {
            const mapBounds = this.mapContainer.getBoundingClientRect();
            
            // 간단한 메르카토르 투영 시뮬레이션
            const centerLat = this.defaultCenter.lat;
            const centerLng = this.defaultCenter.lng;
            
            const scale = 100000; // 임의의 스케일
            const x = (latLng.lng - centerLng) * scale + mapBounds.width / 2;
            const y = (centerLat - latLng.lat) * scale + mapBounds.height / 2;
            
            return { x: Math.max(0, Math.min(mapBounds.width, x)), 
                    y: Math.max(0, Math.min(mapBounds.height, y)) };
        },

        // 현재 위치로 중심 이동
        centerToCurrentLocation: function() {
            if (window.app.locationService?.currentPosition) {
                this.updateCurrentLocationMarker(window.app.locationService.currentPosition);
                window.app.showNotification('현재 위치로 지도를 이동했습니다.');
            } else {
                window.app.showNotification('현재 위치 정보가 없습니다.', 'error');
            }
        },

        // 특정 마커로 중심 이동
        centerToMarker: function(markerId) {
            const marker = this.markers.get(markerId);
            if (marker) {
                window.app.closeModal();
                window.app.showNotification(`${marker.data.title}로 지도를 이동했습니다.`);
            }
        },

        // 마커까지의 경로 표시
        showRouteToMarker: function(markerId) {
            const marker = this.markers.get(markerId);
            const currentPos = window.app.locationService?.currentPosition;
            
            if (marker && currentPos) {
                this.addRoute({
                    id: 'routeTo' + markerId,
                    points: [currentPos, marker.data.position],
                    color: '#ef4444',
                    width: 3,
                    dashed: true,
                    title: `${marker.data.title}까지의 경로`
                });
                
                window.app.closeModal();
                window.app.showNotification('경로가 표시되었습니다.');
            }
        },

        // 현재 위치 마커 업데이트
        updateCurrentLocationMarker: function(position) {
            const currentMarker = this.markers.get('current');
            if (currentMarker) {
                // 마커 위치 업데이트
                currentMarker.data.position = position;
                const pixelPos = this.latLngToPixel(position);
                currentMarker.element.style.left = pixelPos.x + 'px';
                currentMarker.element.style.top = pixelPos.y + 'px';

                // 좌표 정보 업데이트
                const coordElement = document.getElementById('mapCoordinates');
                if (coordElement) {
                    coordElement.textContent = `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`;
                }
            }
        },

        // 줌 인
        zoomIn: function() {
            this.defaultZoom = Math.min(this.defaultZoom + 1, 20);
            this.updateMapScale();
            window.app.showNotification('지도를 확대했습니다.');
        },

        // 줌 아웃
        zoomOut: function() {
            this.defaultZoom = Math.max(this.defaultZoom - 1, 1);
            this.updateMapScale();
            window.app.showNotification('지도를 축소했습니다.');
        },

        // 지도 스케일 업데이트
        updateMapScale: function() {
            const mapCanvas = document.getElementById('mapCanvas');
            if (mapCanvas) {
                const scale = this.defaultZoom / 15; // 기본 줌 레벨 기준
                mapCanvas.style.transform = `scale(${scale})`;
                mapCanvas.style.transformOrigin = 'center';
            }
        },

        // 레이어 변경
        changeLayer: function(layerType) {
            this.currentLayer = layerType;
            const mapCanvas = document.getElementById('mapCanvas');
            if (mapCanvas) {
                // 레이어에 따른 배경 변경
                const layerStyles = {
                    roadmap: 'from-green-100 to-blue-100',
                    satellite: 'from-green-200 to-brown-200',
                    hybrid: 'from-green-150 to-blue-150',
                    terrain: 'from-green-200 to-yellow-100'
                };
                
                const parentElement = mapCanvas.parentElement;
                parentElement.className = parentElement.className.replace(/from-\w+-\d+ to-\w+-\d+/, layerStyles[layerType]);
            }
            window.app.showNotification(`지도 유형을 ${layerType}로 변경했습니다.`);
        },

        // 지도 클릭 처리
        handleMapClick: function(event) {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            console.log('Map clicked at:', x, y);
            // 실제 구현에서는 픽셀을 위경도로 변환하여 처리
        },

        // 지도 우클릭 처리
        handleMapRightClick: function(event) {
            event.preventDefault();
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            // 컨텍스트 메뉴 표시
            this.showContextMenu(x, y);
        },

        // 컨텍스트 메뉴 표시
        showContextMenu: function(x, y) {
            const contextMenu = document.createElement('div');
            contextMenu.className = 'fixed z-50 bg-white border rounded-lg shadow-lg py-2 min-w-48';
            contextMenu.style.left = x + 'px';
            contextMenu.style.top = y + 'px';
            
            contextMenu.innerHTML = `
                <button class="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm" onclick="app.interactiveMap.addMarkerAtPosition(${x}, ${y})">
                    <i class="fas fa-map-pin mr-2"></i>마커 추가
                </button>
                <button class="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm" onclick="app.interactiveMap.measureDistance()">
                    <i class="fas fa-ruler mr-2"></i>거리 측정
                </button>
                <button class="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm" onclick="app.interactiveMap.centerHere(${x}, ${y})">
                    <i class="fas fa-crosshairs mr-2"></i>여기를 중심으로
                </button>
            `;
            
            document.body.appendChild(contextMenu);
            
            // 외부 클릭시 메뉴 제거
            setTimeout(() => {
                document.addEventListener('click', function removeMenu() {
                    contextMenu.remove();
                    document.removeEventListener('click', removeMenu);
                });
            }, 100);
        },

        // 위치에 마커 추가
        addMarkerAtPosition: function(x, y) {
            // 픽셀을 위경도로 변환 (시뮬레이션)
            const latLng = this.pixelToLatLng(x, y);
            
            this.addMarker({
                id: 'custom_' + Date.now(),
                type: 'meeting',
                position: latLng,
                title: '사용자 마커',
                description: '수동으로 추가된 마커',
                clickable: true
            });
            
            window.app.showNotification('마커가 추가되었습니다.');
        },

        // 픽셀을 위경도로 변환 (시뮬레이션)
        pixelToLatLng: function(x, y) {
            const mapBounds = this.mapContainer.getBoundingClientRect();
            const centerLat = this.defaultCenter.lat;
            const centerLng = this.defaultCenter.lng;
            
            const scale = 100000; // 임의의 스케일
            const lat = centerLat - (y - mapBounds.height / 2) / scale;
            const lng = centerLng + (x - mapBounds.width / 2) / scale;
            
            return { lat, lng };
        },

        // 거리 측정 시작
        measureDistance: function() {
            window.app.showNotification('거리 측정 기능은 준비 중입니다.');
        },

        // 지정 위치를 중심으로
        centerHere: function(x, y) {
            window.app.showNotification('지도 중심을 이동했습니다.');
        },

        // 모든 마커 제거
        clearMarkers: function() {
            const markersContainer = document.getElementById('mapMarkers');
            if (markersContainer) {
                markersContainer.innerHTML = '';
                this.markers.clear();
            }
        },

        // 모든 경로 제거
        clearRoutes: function() {
            const routesContainer = document.getElementById('mapRoutes');
            if (routesContainer) {
                routesContainer.innerHTML = '';
                this.routes = [];
            }
        },

        // 지도 새로고침
        refresh: function() {
            this.clearMarkers();
            this.clearRoutes();
            this.loadInitialMarkers();
            this.loadSampleRoute();
            window.app.showNotification('지도를 새로고침했습니다.');
        }
    },

    // 지도 시스템 초기화
    initInteractiveMap: function(containerId) {
        return this.interactiveMap.initialize(containerId);
    }
});