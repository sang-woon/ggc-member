// 위치기반 활동 페이지 - 디버그 버전
console.log('[DEBUG] app-location-activities-debug.js 로드 시작');

// LocationCertificate 체크
if (typeof LocationCertificate === 'undefined') {
    console.error('[ERROR] LocationCertificate가 정의되지 않았습니다!');
    // 임시 mock 객체 생성
    window.LocationCertificate = {
        generateSampleActivities: function() {
            console.log('[DEBUG] Mock generateSampleActivities 호출');
            const activities = [];
            for (let i = 0; i < 50; i++) {
                activities.push({
                    id: `LOC2025-${String(i + 1).padStart(3, '0')}`,
                    type: ['meeting', 'inspection', 'service', 'event'][i % 4],
                    title: `테스트 활동 #${i + 1}`,
                    location: '경기도의회',
                    address: '경기도 수원시 영통구 도청로 30',
                    date: new Date().toISOString().split('T')[0],
                    startTime: '10:00',
                    duration: '2시간',
                    participants: 50,
                    gpsVerified: true,
                    summary: `활동 요약 #${i + 1}`,
                    blockchainId: i + 1,
                    blockHash: `hash_${i + 1}`,
                    transactionHash: `0x${i + 1}`,
                    verified: true
                });
            }
            return activities;
        },
        getActivityTypeLabel: function(type) {
            const labels = {
                meeting: '회의/간담회',
                inspection: '현장점검',
                service: '봉사활동',
                event: '행사참석'
            };
            return labels[type] || type;
        },
        generateCertificate: function(activity) {
            return {
                certificateId: `CERT-${activity.id}`,
                activity: activity,
                verification: {
                    qrCode: 'https://ggc.go.kr/verify/test'
                }
            };
        },
        renderCertificate: function(cert) {
            return `
                <div style="padding: 20px; background: white;">
                    <h2>의정활동 증명서</h2>
                    <p>활동: ${cert.activity.title}</p>
                    <p>날짜: ${cert.activity.date}</p>
                    <p>장소: ${cert.activity.location}</p>
                    <canvas id="certQRCode"></canvas>
                </div>
            `;
        },
        blockchain: {
            chain: [{}, {}, {}],
            verifyChain: function() { return true; }
        }
    };
}

// 페이지 로드 함수
window.app = window.app || {};
window.app.loadLocationActivitiesPage = function() {
    console.log('[DEBUG] loadLocationActivitiesPage 함수 호출');
    
    try {
        // 50개 샘플 데이터 생성
        const activities = LocationCertificate.generateSampleActivities();
        console.log(`[DEBUG] ${activities.length}개 활동 생성됨`);
        
        const html = `
            <div class="page-container" style="max-width: 1200px; margin: 0 auto;">
                <!-- 헤더 -->
                <div class="gov-card mb-4">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 class="gov-title">
                            <i class="fas fa-map-marked-alt text-blue-600 mr-2"></i>
                            위치기반 의정활동 기록
                            <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-left: 8px;">
                                <i class="fas fa-link"></i> 블록체인 인증
                            </span>
                        </h3>
                        <div style="display: flex; gap: 8px;">
                            <button onclick="app.exportActivities()" class="btn-secondary" style="padding: 8px 16px; font-size: 14px;">
                                <i class="fas fa-download mr-2"></i>내보내기
                            </button>
                            <button onclick="app.verifyBlockchain()" class="btn-primary" style="padding: 8px 16px; font-size: 14px;">
                                <i class="fas fa-shield-alt mr-2"></i>블록체인 검증
                            </button>
                        </div>
                    </div>
                    
                    <!-- 통계 요약 -->
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px;">
                        <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: #0369a1;">${activities.length}</div>
                            <div style="font-size: 12px; color: #64748b;">총 활동 수</div>
                        </div>
                        <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: #16a34a;">
                                ${activities.filter(a => a.gpsVerified).length}
                            </div>
                            <div style="font-size: 12px; color: #64748b;">GPS 인증</div>
                        </div>
                        <div style="background: #fef3c7; padding: 12px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: #d97706;">
                                ${activities.reduce((sum, a) => sum + (a.participants || 0), 0).toLocaleString()}
                            </div>
                            <div style="font-size: 12px; color: #64748b;">총 참여인원</div>
                        </div>
                        <div style="background: #fce7f3; padding: 12px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 24px; font-weight: bold; color: #db2777;">100%</div>
                            <div style="font-size: 12px; color: #64748b;">블록체인 기록</div>
                        </div>
                    </div>
                    
                    <!-- 필터 -->
                    <div style="display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;">
                        <button onclick="app.filterActivities('all')" class="filter-btn active" data-filter="all">
                            전체
                        </button>
                        <button onclick="app.filterActivities('meeting')" class="filter-btn" data-filter="meeting">
                            회의/간담회
                        </button>
                        <button onclick="app.filterActivities('inspection')" class="filter-btn" data-filter="inspection">
                            현장점검
                        </button>
                        <button onclick="app.filterActivities('service')" class="filter-btn" data-filter="service">
                            봉사활동
                        </button>
                        <button onclick="app.filterActivities('event')" class="filter-btn" data-filter="event">
                            행사참석
                        </button>
                    </div>
                </div>
                
                <!-- 활동 목록 -->
                <div class="activities-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 16px;">
                    ${activities.slice(0, 10).map(activity => `
                        <div class="activity-card gov-card" data-type="${activity.type}" 
                             style="cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden;"
                             onclick="app.showActivityCertificate('${activity.id}')">
                            <!-- 블록체인 인증 마크 -->
                            ${activity.verified ? `
                                <div style="position: absolute; top: 10px; right: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 1;">
                                    <i class="fas fa-link" style="font-size: 14px;"></i>
                                </div>
                            ` : ''}
                            
                            <!-- 활동 유형 배지 -->
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                                <span class="activity-type-badge ${activity.type}" style="padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; background: #dbeafe; color: #1e40af;">
                                    ${LocationCertificate.getActivityTypeLabel(activity.type)}
                                </span>
                                ${activity.gpsVerified ? `
                                    <span style="color: #10b981; font-size: 11px;">
                                        <i class="fas fa-map-marker-alt"></i> GPS
                                    </span>
                                ` : ''}
                            </div>
                            
                            <!-- 제목 -->
                            <h4 style="font-size: 15px; font-weight: 600; color: #1f2937; margin-bottom: 8px; line-height: 1.4;">
                                ${activity.title}
                            </h4>
                            
                            <!-- 정보 -->
                            <div style="font-size: 13px; color: #6b7280; line-height: 1.6;">
                                <div style="margin-bottom: 4px;">
                                    <i class="fas fa-calendar" style="width: 16px; color: #9ca3af;"></i>
                                    ${activity.date} ${activity.startTime}
                                </div>
                                <div style="margin-bottom: 4px;">
                                    <i class="fas fa-clock" style="width: 16px; color: #9ca3af;"></i>
                                    ${activity.duration}
                                </div>
                                <div style="margin-bottom: 4px;">
                                    <i class="fas fa-map-marker-alt" style="width: 16px; color: #9ca3af;"></i>
                                    ${activity.location}
                                </div>
                                <div style="margin-bottom: 8px;">
                                    <i class="fas fa-users" style="width: 16px; color: #9ca3af;"></i>
                                    참여: ${activity.participants}명
                                </div>
                            </div>
                            
                            <!-- 요약 -->
                            <div style="font-size: 12px; color: #4b5563; padding: 8px; background: #f9fafb; border-radius: 6px; margin-bottom: 12px;">
                                ${activity.summary}
                            </div>
                            
                            <!-- 블록체인 정보 -->
                            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #e5e7eb;">
                                <div style="font-size: 10px; color: #9ca3af;">
                                    Block #${activity.blockchainId}
                                </div>
                                <button class="btn-sm" style="padding: 4px 8px; background: #003d7a; color: white; border: none; border-radius: 4px; font-size: 11px;">
                                    <i class="fas fa-certificate"></i> 증명서 발급
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <p style="color: #6b7280;">처음 10개 활동만 표시됩니다. (총 ${activities.length}개)</p>
                </div>
            </div>
            
            <style>
                .activity-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                
                .filter-btn {
                    padding: 8px 16px;
                    background: #f3f4f6;
                    border: 1px solid #d1d5db;
                    border-radius: 20px;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .filter-btn:hover {
                    background: #e5e7eb;
                }
                
                .filter-btn.active {
                    background: #003d7a;
                    color: white;
                    border-color: #003d7a;
                }
            </style>
        `;
        
        const container = document.getElementById('mainContent');
        if (container) {
            container.innerHTML = html;
            console.log('[DEBUG] HTML 렌더링 완료');
        } else {
            console.error('[ERROR] mainContent 컨테이너를 찾을 수 없습니다');
        }
        
        // 활동 데이터를 전역 변수에 저장
        window.currentActivities = activities;
        
    } catch (error) {
        console.error('[ERROR] 페이지 로드 중 오류:', error);
        document.getElementById('mainContent').innerHTML = `
            <div class="gov-card" style="background: #fee; padding: 20px;">
                <h3 style="color: #c00;">오류 발생</h3>
                <p>${error.message}</p>
                <pre>${error.stack}</pre>
            </div>
        `;
    }
};

// 필터링 함수
window.app.filterActivities = function(type) {
    console.log('[DEBUG] filterActivities 호출:', type);
    
    // 버튼 활성화 상태 변경
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === type) {
            btn.classList.add('active');
        }
    });
    
    // 카드 필터링
    document.querySelectorAll('.activity-card').forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// 증명서 표시
window.app.showActivityCertificate = function(activityId) {
    console.log('[DEBUG] showActivityCertificate 호출:', activityId);
    
    const activity = window.currentActivities.find(a => a.id === activityId);
    if (!activity) {
        console.error('[ERROR] 활동을 찾을 수 없습니다:', activityId);
        return;
    }
    
    // 증명서 생성
    const certificate = LocationCertificate.generateCertificate(activity);
    
    // 모달로 증명서 표시
    app.showModal('activityCertificate', {
        title: '의정활동 증명서',
        size: 'xl',
        content: LocationCertificate.renderCertificate(certificate),
        buttons: [
            {
                text: '닫기',
                class: 'btn-secondary',
                onclick: 'app.closeModal()'
            }
        ]
    });
    
    // QR 코드 생성
    setTimeout(() => {
        if (typeof QRious !== 'undefined' && document.getElementById('certQRCode')) {
            const qr = new QRious({
                element: document.getElementById('certQRCode'),
                value: certificate.verification.qrCode,
                size: 120,
                level: 'H'
            });
        }
    }, 100);
};

// 블록체인 검증
window.app.verifyBlockchain = function() {
    console.log('[DEBUG] verifyBlockchain 호출');
    
    const isValid = LocationCertificate.blockchain.verifyChain();
    
    if (isValid) {
        app.showModal('blockchainVerify', {
            title: '블록체인 검증 결과',
            content: `
                <div style="text-align: center; padding: 30px;">
                    <div style="font-size: 64px; color: #10b981; margin-bottom: 20px;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 style="color: #111827; margin-bottom: 12px;">블록체인 무결성 검증 완료</h3>
                    <p style="color: #6b7280;">
                        모든 활동 기록이 블록체인에 안전하게 저장되어 있으며,<br>
                        위변조되지 않았음이 확인되었습니다.
                    </p>
                </div>
            `,
            buttons: [
                {
                    text: '확인',
                    class: 'btn-primary',
                    onclick: 'app.closeModal()'
                }
            ]
        });
    } else {
        app.showToast('블록체인 검증 실패', 'error');
    }
};

// 활동 내보내기
window.app.exportActivities = function() {
    console.log('[DEBUG] exportActivities 호출');
    
    const data = {
        exportDate: new Date().toISOString(),
        activities: window.currentActivities,
        blockchain: {
            blocks: LocationCertificate.blockchain.chain.length,
            verified: LocationCertificate.blockchain.verifyChain()
        }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activities_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    app.showToast('활동 데이터를 내보냈습니다.');
};

console.log('[DEBUG] app-location-activities-debug.js 로드 완료');