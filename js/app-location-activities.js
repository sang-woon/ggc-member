// 위치기반 활동 페이지 - 50개 샘플 데이터와 증명서 기능
window.app.loadLocationActivitiesPage = function() {
    // 50개 샘플 데이터 생성
    const activities = LocationCertificate.generateSampleActivities();
    
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
                    <button onclick="app.filterActivities('business')" class="filter-btn" data-filter="business">
                        기업지원
                    </button>
                    <button onclick="app.filterActivities('legislation')" class="filter-btn" data-filter="legislation">
                        입법활동
                    </button>
                </div>
            </div>
            
            <!-- 활동 목록 -->
            <div class="activities-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 16px;">
                ${activities.map(activity => `
                    <div class="activity-card gov-card" data-type="${activity.type}" style="cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden;"
                         onclick="app.showActivityCertificate('${activity.id}')">
                        <!-- 블록체인 인증 마크 -->
                        ${activity.verified ? `
                            <div style="position: absolute; top: 10px; right: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 1;">
                                <i class="fas fa-link" style="font-size: 14px;"></i>
                            </div>
                        ` : ''}
                        
                        <!-- 활동 유형 배지 -->
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                            <span class="activity-type-badge ${activity.type}" style="padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">
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
            
            .activity-type-badge {
                display: inline-block;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .activity-type-badge.meeting { background: #dbeafe; color: #1e40af; }
            .activity-type-badge.inspection { background: #dcfce7; color: #166534; }
            .activity-type-badge.service { background: #fef3c7; color: #92400e; }
            .activity-type-badge.event { background: #fce7f3; color: #9f1239; }
            .activity-type-badge.business { background: #e9d5ff; color: #6b21a8; }
            .activity-type-badge.legislation { background: #fed7aa; color: #9a3412; }
            .activity-type-badge.campaign { background: #ccfbf1; color: #134e4a; }
        </style>
    `;
    
    document.getElementById('mainContent').innerHTML = html;
    
    // 활동 데이터를 전역 변수에 저장
    window.currentActivities = activities;
};

// 활동 필터링
window.app.filterActivities = function(type) {
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

// 활동 증명서 표시
window.app.showActivityCertificate = function(activityId) {
    const activity = window.currentActivities.find(a => a.id === activityId);
    if (!activity) return;
    
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
                    <p style="color: #6b7280; margin-bottom: 20px;">
                        모든 활동 기록이 블록체인에 안전하게 저장되어 있으며,<br>
                        위변조되지 않았음이 확인되었습니다.
                    </p>
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: left;">
                        <div style="font-size: 13px; line-height: 1.8;">
                            <div><strong>검증된 블록 수:</strong> ${LocationCertificate.blockchain.chain.length}</div>
                            <div><strong>최초 블록:</strong> ${new Date(LocationCertificate.blockchain.chain[0].timestamp).toLocaleString('ko-KR')}</div>
                            <div><strong>최근 블록:</strong> ${new Date(LocationCertificate.blockchain.chain[LocationCertificate.blockchain.chain.length - 1].timestamp).toLocaleString('ko-KR')}</div>
                            <div><strong>해시 알고리즘:</strong> SHA-256</div>
                            <div><strong>네트워크:</strong> Ethereum Mainnet (Simulated)</div>
                        </div>
                    </div>
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
        app.showToast('블록체인 검증 실패 - 데이터 무결성 문제가 발견되었습니다.', 'error');
    }
};

// 활동 내보내기
window.app.exportActivities = function() {
    const data = {
        exportDate: new Date().toISOString(),
        member: (typeof MemberDataManager !== 'undefined' && MemberDataManager.defaultMemberData) ? 
                MemberDataManager.defaultMemberData : {
                    name: '김호겸',
                    memberId: '2024-0815',
                    party: '국민의힘',
                    district: '수원시 제5선거구'
                },
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
    a.download = `legislative_activities_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    app.showToast('활동 데이터를 내보냈습니다.');
};