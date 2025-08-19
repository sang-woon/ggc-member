// 위치기반 활동 페이지 - 모바일 최적화 버전
window.app.loadLocationActivitiesPageMobile = function() {
    // 샘플 데이터 생성
    const activities = window.LocationCertificate ? LocationCertificate.generateSampleActivities() : generateDefaultActivities();
    
    const html = `
        <div class="location-mobile-container">
            <!-- 모바일 헤더 -->
            <div class="location-mobile-header">
                <div class="location-header-top">
                    <h3 class="location-title">
                        <i class="fas fa-map-marked-alt"></i>
                        <span>위치기반 활동</span>
                    </h3>
                    <button onclick="app.showLocationMenu()" class="location-menu-btn">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </div>
                
                <!-- 블록체인 인증 배지 -->
                <div class="blockchain-badge">
                    <i class="fas fa-link"></i>
                    <span>블록체인 인증</span>
                    <span class="badge-status">활성</span>
                </div>
            </div>
            
            <!-- 모바일 통계 카드 (스와이프 가능) -->
            <div class="location-stats-container">
                <div class="location-stats-scroll">
                    <div class="stat-card stat-blue">
                        <div class="stat-icon">
                            <i class="fas fa-list-check"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${activities.length}</div>
                            <div class="stat-label">총 활동</div>
                        </div>
                    </div>
                    
                    <div class="stat-card stat-green">
                        <div class="stat-icon">
                            <i class="fas fa-map-pin"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${activities.filter(a => a.gpsVerified).length}</div>
                            <div class="stat-label">GPS 인증</div>
                        </div>
                    </div>
                    
                    <div class="stat-card stat-orange">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${activities.reduce((sum, a) => sum + (a.participants || 0), 0).toLocaleString()}</div>
                            <div class="stat-label">참여인원</div>
                        </div>
                    </div>
                    
                    <div class="stat-card stat-purple">
                        <div class="stat-icon">
                            <i class="fas fa-shield-check"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">100%</div>
                            <div class="stat-label">블록체인</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 모바일 필터 (가로 스크롤) -->
            <div class="location-filter-container">
                <div class="location-filter-scroll">
                    <button onclick="app.filterActivities('all')" class="filter-chip active" data-filter="all">
                        <i class="fas fa-th"></i>
                        <span>전체</span>
                    </button>
                    <button onclick="app.filterActivities('meeting')" class="filter-chip" data-filter="meeting">
                        <i class="fas fa-handshake"></i>
                        <span>회의</span>
                    </button>
                    <button onclick="app.filterActivities('inspection')" class="filter-chip" data-filter="inspection">
                        <i class="fas fa-search"></i>
                        <span>현장점검</span>
                    </button>
                    <button onclick="app.filterActivities('service')" class="filter-chip" data-filter="service">
                        <i class="fas fa-hands-helping"></i>
                        <span>봉사</span>
                    </button>
                    <button onclick="app.filterActivities('event')" class="filter-chip" data-filter="event">
                        <i class="fas fa-calendar-star"></i>
                        <span>행사</span>
                    </button>
                    <button onclick="app.filterActivities('business')" class="filter-chip" data-filter="business">
                        <i class="fas fa-building"></i>
                        <span>기업지원</span>
                    </button>
                    <button onclick="app.filterActivities('legislation')" class="filter-chip" data-filter="legislation">
                        <i class="fas fa-gavel"></i>
                        <span>입법</span>
                    </button>
                </div>
            </div>
            
            <!-- 모바일 활동 리스트 -->
            <div class="location-activities-list">
                ${activities.map(activity => `
                    <div class="activity-mobile-card" data-type="${activity.type}" onclick="app.showActivityDetail('${activity.id}')">
                        <!-- 상단 헤더 -->
                        <div class="activity-card-header">
                            <span class="activity-type-tag ${activity.type}">
                                ${getActivityTypeLabel(activity.type)}
                            </span>
                            <div class="activity-badges">
                                ${activity.gpsVerified ? '<span class="gps-badge"><i class="fas fa-map-marker-alt"></i></span>' : ''}
                                ${activity.verified ? '<span class="blockchain-badge-sm"><i class="fas fa-link"></i></span>' : ''}
                            </div>
                        </div>
                        
                        <!-- 제목 및 내용 -->
                        <div class="activity-card-body">
                            <h4 class="activity-title">${activity.title}</h4>
                            <p class="activity-summary">${activity.summary}</p>
                        </div>
                        
                        <!-- 정보 그리드 -->
                        <div class="activity-info-grid">
                            <div class="info-item">
                                <i class="fas fa-calendar"></i>
                                <span>${activity.date}</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-clock"></i>
                                <span>${activity.duration}</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${activity.location}</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-users"></i>
                                <span>${activity.participants}명</span>
                            </div>
                        </div>
                        
                        <!-- 하단 액션 -->
                        <div class="activity-card-footer">
                            <span class="blockchain-id">Block #${activity.blockchainId}</span>
                            <button class="cert-btn" onclick="event.stopPropagation(); app.showActivityCertificate('${activity.id}')">
                                <i class="fas fa-certificate"></i>
                                증명서
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- 플로팅 액션 버튼 -->
            <button class="location-fab" onclick="app.addNewActivity()">
                <i class="fas fa-plus"></i>
            </button>
        </div>
        
        <style>
            /* 모바일 컨테이너 */
            .location-mobile-container {
                max-width: 100%;
                padding-bottom: 80px;
            }
            
            /* 모바일 헤더 */
            .location-mobile-header {
                background: white;
                padding: 16px;
                border-bottom: 1px solid #e5e7eb;
                position: sticky;
                top: 0;
                z-index: 10;
            }
            
            .location-header-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }
            
            .location-title {
                font-size: 18px;
                font-weight: 600;
                color: #1f2937;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .location-title i {
                color: #003d7a;
            }
            
            .location-menu-btn {
                width: 36px;
                height: 36px;
                border: none;
                background: #f3f4f6;
                border-radius: 8px;
                color: #374151;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            
            .blockchain-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 12px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
            }
            
            .badge-status {
                padding: 2px 6px;
                background: rgba(255,255,255,0.3);
                border-radius: 10px;
                font-size: 10px;
            }
            
            /* 통계 카드 */
            .location-stats-container {
                padding: 16px;
                background: #f9fafb;
                overflow: hidden;
            }
            
            .location-stats-scroll {
                display: flex;
                gap: 12px;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                padding-bottom: 4px;
            }
            
            .stat-card {
                min-width: 140px;
                background: white;
                border-radius: 12px;
                padding: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            }
            
            .stat-icon {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
            }
            
            .stat-blue .stat-icon { background: #dbeafe; color: #1e40af; }
            .stat-green .stat-icon { background: #dcfce7; color: #166534; }
            .stat-orange .stat-icon { background: #fed7aa; color: #9a3412; }
            .stat-purple .stat-icon { background: #e9d5ff; color: #6b21a8; }
            
            .stat-content {
                flex: 1;
            }
            
            .stat-value {
                font-size: 20px;
                font-weight: 700;
                color: #1f2937;
            }
            
            .stat-label {
                font-size: 11px;
                color: #6b7280;
                margin-top: 2px;
            }
            
            /* 필터 */
            .location-filter-container {
                padding: 12px 16px;
                background: white;
                border-bottom: 1px solid #e5e7eb;
                overflow: hidden;
            }
            
            .location-filter-scroll {
                display: flex;
                gap: 8px;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }
            
            .filter-chip {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 8px 14px;
                background: #f3f4f6;
                border: 1px solid #e5e7eb;
                border-radius: 20px;
                font-size: 13px;
                color: #374151;
                white-space: nowrap;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .filter-chip i {
                font-size: 12px;
            }
            
            .filter-chip.active {
                background: #003d7a;
                color: white;
                border-color: #003d7a;
            }
            
            /* 활동 카드 */
            .location-activities-list {
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .activity-mobile-card {
                background: white;
                border-radius: 12px;
                padding: 16px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .activity-mobile-card:active {
                transform: scale(0.98);
            }
            
            .activity-card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 12px;
            }
            
            .activity-type-tag {
                padding: 4px 10px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .activity-type-tag.meeting { background: #dbeafe; color: #1e40af; }
            .activity-type-tag.inspection { background: #dcfce7; color: #166534; }
            .activity-type-tag.service { background: #fef3c7; color: #92400e; }
            .activity-type-tag.event { background: #fce7f3; color: #9f1239; }
            .activity-type-tag.business { background: #e9d5ff; color: #6b21a8; }
            .activity-type-tag.legislation { background: #fed7aa; color: #9a3412; }
            
            .activity-badges {
                display: flex;
                gap: 6px;
            }
            
            .gps-badge, .blockchain-badge-sm {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
            }
            
            .gps-badge {
                background: #dcfce7;
                color: #166534;
            }
            
            .blockchain-badge-sm {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            
            .activity-card-body {
                margin-bottom: 12px;
            }
            
            .activity-title {
                font-size: 15px;
                font-weight: 600;
                color: #1f2937;
                margin: 0 0 6px 0;
                line-height: 1.3;
            }
            
            .activity-summary {
                font-size: 13px;
                color: #6b7280;
                margin: 0;
                line-height: 1.4;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            
            .activity-info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
                padding: 12px;
                background: #f9fafb;
                border-radius: 8px;
                margin-bottom: 12px;
            }
            
            .info-item {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12px;
                color: #4b5563;
            }
            
            .info-item i {
                color: #9ca3af;
                width: 14px;
            }
            
            .activity-card-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 12px;
                border-top: 1px solid #e5e7eb;
            }
            
            .blockchain-id {
                font-size: 10px;
                color: #9ca3af;
                font-family: monospace;
            }
            
            .cert-btn {
                padding: 6px 12px;
                background: #003d7a;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 4px;
                cursor: pointer;
            }
            
            /* 플로팅 액션 버튼 */
            .location-fab {
                position: fixed;
                bottom: 90px;
                right: 20px;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                cursor: pointer;
                z-index: 100;
                transition: all 0.3s;
            }
            
            .location-fab:active {
                transform: scale(0.9);
            }
            
            /* 스크롤바 숨기기 */
            .location-stats-scroll::-webkit-scrollbar,
            .location-filter-scroll::-webkit-scrollbar {
                display: none;
            }
            
            /* 모바일 반응형 */
            @media (max-width: 380px) {
                .location-title span {
                    font-size: 16px;
                }
                
                .stat-card {
                    min-width: 120px;
                    padding: 12px;
                }
                
                .stat-value {
                    font-size: 18px;
                }
                
                .activity-info-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
    
    // 활동 데이터를 전역 변수에 저장
    window.currentActivities = activities;
};

// 활동 유형 라벨 헬퍼 함수
function getActivityTypeLabel(type) {
    const labels = {
        'meeting': '회의',
        'inspection': '현장점검',
        'service': '봉사활동',
        'event': '행사참석',
        'business': '기업지원',
        'legislation': '입법활동',
        'campaign': '캠페인'
    };
    return labels[type] || type;
}

// 기본 샘플 데이터 생성 (LocationCertificate가 없을 경우)
function generateDefaultActivities() {
    const types = ['meeting', 'inspection', 'service', 'event', 'business', 'legislation'];
    const activities = [];
    
    for (let i = 0; i < 20; i++) {
        activities.push({
            id: `ACT-${Date.now()}-${i}`,
            type: types[Math.floor(Math.random() * types.length)],
            title: `의정활동 ${i + 1}`,
            summary: '지역 주민과의 소통을 통한 현안 해결 방안 모색',
            date: '2025.01.18',
            startTime: '14:00',
            duration: '2시간',
            location: '경기도의회',
            participants: Math.floor(Math.random() * 50) + 10,
            gpsVerified: Math.random() > 0.3,
            verified: true,
            blockchainId: Math.floor(Math.random() * 100000)
        });
    }
    
    return activities;
}

// 활동 상세 보기
window.app.showActivityDetail = function(activityId) {
    const activity = window.currentActivities.find(a => a.id === activityId);
    if (!activity) return;
    
    app.showModal('activityDetail', {
        title: '활동 상세정보',
        content: `
            <div style="padding: 16px;">
                <div style="margin-bottom: 16px;">
                    <span class="activity-type-tag ${activity.type}" style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">
                        ${getActivityTypeLabel(activity.type)}
                    </span>
                </div>
                
                <h3 style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 12px;">
                    ${activity.title}
                </h3>
                
                <p style="font-size: 14px; color: #4b5563; line-height: 1.5; margin-bottom: 16px;">
                    ${activity.summary}
                </p>
                
                <div style="background: #f9fafb; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                    <div style="display: grid; gap: 8px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-calendar" style="color: #6b7280; width: 16px;"></i>
                            <span style="font-size: 14px; color: #374151;">${activity.date} ${activity.startTime}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-clock" style="color: #6b7280; width: 16px;"></i>
                            <span style="font-size: 14px; color: #374151;">소요시간: ${activity.duration}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-map-marker-alt" style="color: #6b7280; width: 16px;"></i>
                            <span style="font-size: 14px; color: #374151;">${activity.location}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-users" style="color: #6b7280; width: 16px;"></i>
                            <span style="font-size: 14px; color: #374151;">참여인원: ${activity.participants}명</span>
                        </div>
                    </div>
                </div>
                
                ${activity.gpsVerified ? `
                    <div style="background: #dcfce7; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-check-circle" style="color: #166534;"></i>
                            <span style="font-size: 13px; color: #166534; font-weight: 500;">GPS 위치 인증 완료</span>
                        </div>
                    </div>
                ` : ''}
                
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-size: 11px; opacity: 0.9;">블록체인 ID</div>
                            <div style="font-size: 14px; font-weight: 600; font-family: monospace;">
                                #${activity.blockchainId}
                            </div>
                        </div>
                        <button onclick="app.showActivityCertificate('${activity.id}')" style="padding: 8px 16px; background: white; color: #667eea; border: none; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer;">
                            <i class="fas fa-certificate"></i> 증명서 발급
                        </button>
                    </div>
                </div>
            </div>
        `,
        buttons: [
            {
                text: '닫기',
                class: 'bg-gray-500 text-white',
                onclick: 'app.closeModal()'
            }
        ]
    });
};

// 위치 메뉴 표시
window.app.showLocationMenu = function() {
    app.showModal('locationMenu', {
        title: '위치기반 활동 메뉴',
        content: `
            <div style="padding: 16px;">
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <button onclick="app.exportActivities(); app.closeModal();" class="menu-option">
                        <i class="fas fa-download"></i>
                        <span>데이터 내보내기</span>
                    </button>
                    <button onclick="app.verifyBlockchain(); app.closeModal();" class="menu-option">
                        <i class="fas fa-shield-alt"></i>
                        <span>블록체인 검증</span>
                    </button>
                    <button onclick="app.showActivityStats(); app.closeModal();" class="menu-option">
                        <i class="fas fa-chart-pie"></i>
                        <span>통계 보기</span>
                    </button>
                    <button onclick="app.showSettings(); app.closeModal();" class="menu-option">
                        <i class="fas fa-cog"></i>
                        <span>설정</span>
                    </button>
                </div>
            </div>
        `,
        buttons: [
            {
                text: '닫기',
                class: 'bg-gray-500 text-white',
                onclick: 'app.closeModal()'
            }
        ]
    });
};

// 새 활동 추가
window.app.addNewActivity = function() {
    app.showToast('새 활동 추가 기능은 준비 중입니다.', 'info');
};

// 초기화 - 모바일 버전 사용
window.app.loadLocationActivitiesPage = window.app.loadLocationActivitiesPageMobile;

// CSS 추가
const style = document.createElement('style');
style.textContent = `
    .menu-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: #f3f4f6;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
        color: #374151;
        cursor: pointer;
        transition: all 0.2s;
        width: 100%;
        text-align: left;
    }
    
    .menu-option:hover {
        background: #e5e7eb;
    }
    
    .menu-option i {
        width: 20px;
        color: #6b7280;
    }
`;
document.head.appendChild(style);