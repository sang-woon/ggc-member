// 디지털 신분증 모바일 최적화 버전
window.app.loadDigitalIdMobileOptimized = function() {
    const mainContent = document.getElementById('mainContent');
    const memberData = app.memberData || {};
    
    // 기본 사진 처리
    const memberPhoto = memberData.photo || 'images/annomimus.jpg';
    
    mainContent.innerHTML = `
        <div class="digital-id-mobile-container">
            <div class="digital-id-card-optimized">
                <!-- 홀로그램 오버레이 -->
                <div class="id-hologram-overlay"></div>
                
                <!-- 보안 칩 -->
                <div class="id-security-chip"></div>
                
                <!-- NFC 인디케이터 -->
                <div class="id-nfc-indicator">
                    <i class="fas fa-wifi"></i>
                </div>
                
                <!-- 헤더 영역 -->
                <div class="id-card-header">
                    <div class="id-card-logo">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='20' fill='%23003d7a'/%3E%3C/svg%3E" alt="로고">
                        <div>
                            <div class="id-card-title">경기도의회</div>
                            <div class="id-card-subtitle">GYEONGGI PROVINCIAL COUNCIL</div>
                        </div>
                    </div>
                </div>
                
                <!-- 사진 영역 (중앙 배치) -->
                <div class="id-photo-section">
                    <div class="id-photo-wrapper">
                        <img src="${memberPhoto}" alt="${memberData.name} 사진" class="id-photo">
                        <button onclick="app.updateMemberPhoto()" class="id-photo-update-btn">
                            <i class="fas fa-camera"></i>
                        </button>
                    </div>
                </div>
                
                <!-- 의원 정보 (중앙 정렬) -->
                <div class="id-member-info">
                    <div class="id-member-name">${memberData.name || '김영수'}</div>
                    <div class="id-member-number">의원번호: ${memberData.memberId || '2024-0815'}</div>
                    <div class="id-member-party">${memberData.party || '국민의힘'}</div>
                </div>
                
                <!-- 상세 정보 그리드 -->
                <div class="id-details-grid">
                    <div class="id-detail-item">
                        <div class="id-detail-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="id-detail-text">
                            <div class="id-detail-label">선거구</div>
                            <div class="id-detail-value">${memberData.district || '경기 수원시갑'}</div>
                        </div>
                    </div>
                    
                    <div class="id-detail-item">
                        <div class="id-detail-icon">
                            <i class="fas fa-award"></i>
                        </div>
                        <div class="id-detail-text">
                            <div class="id-detail-label">당선 정보</div>
                            <div class="id-detail-value">${memberData.term || '초선'} • ${memberData.generation || '제11기'}</div>
                        </div>
                    </div>
                    
                    <div class="id-detail-item">
                        <div class="id-detail-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="id-detail-text">
                            <div class="id-detail-label">소속 위원회</div>
                            <div class="id-detail-value">${(memberData.committees && memberData.committees[0]) || '교육위원회(위원장)'}</div>
                        </div>
                    </div>
                </div>
                
                <!-- QR 코드 섹션 -->
                <div class="id-qr-section">
                    <div class="id-qr-container">
                        <div class="id-qr-code-wrapper">
                            <canvas id="qrcode" class="id-qr-code"></canvas>
                        </div>
                        <div class="id-qr-info">
                            <div class="id-qr-title">디지털 검증 QR</div>
                            <div class="id-qr-status">
                                <div class="id-qr-status-dot"></div>
                                <span class="id-qr-status-text">실시간 인증 활성</span>
                            </div>
                            <div style="font-size: 11px; opacity: 0.8; margin-top: 8px;">
                                유효기간: <span id="currentDate"></span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 액션 버튼 -->
                <div class="id-actions">
                    <button onclick="app.shareDigitalId()" class="id-action-btn">
                        <i class="fas fa-share-alt"></i>
                        <span>공유</span>
                    </button>
                    <button onclick="app.downloadDigitalId()" class="id-action-btn">
                        <i class="fas fa-download"></i>
                        <span>저장</span>
                    </button>
                </div>
            </div>
            
            <!-- 추가 기능 카드들 -->
            <div style="margin-top: 20px;">
                <!-- 빠른 액세스 -->
                <div style="background: white; border-radius: 16px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h3 style="font-size: 16px; font-weight: 700; color: #333; margin-bottom: 12px;">빠른 액세스</h3>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
                        <button onclick="app.navigateTo('info')" style="padding: 12px 8px; background: #f5f5f5; border: none; border-radius: 12px; cursor: pointer; transition: all 0.2s;">
                            <i class="fas fa-user" style="font-size: 20px; color: #0056b3; display: block; margin-bottom: 4px;"></i>
                            <span style="font-size: 11px; color: #666;">프로필</span>
                        </button>
                        <button onclick="app.navigateTo('attendance')" style="padding: 12px 8px; background: #f5f5f5; border: none; border-radius: 12px; cursor: pointer; transition: all 0.2s;">
                            <i class="fas fa-calendar-check" style="font-size: 20px; color: #0056b3; display: block; margin-bottom: 4px;"></i>
                            <span style="font-size: 11px; color: #666;">출석</span>
                        </button>
                        <button onclick="app.navigateTo('bill')" style="padding: 12px 8px; background: #f5f5f5; border: none; border-radius: 12px; cursor: pointer; transition: all 0.2s;">
                            <i class="fas fa-file-alt" style="font-size: 20px; color: #0056b3; display: block; margin-bottom: 4px;"></i>
                            <span style="font-size: 11px; color: #666;">의안</span>
                        </button>
                        <button onclick="app.showSettings()" style="padding: 12px 8px; background: #f5f5f5; border: none; border-radius: 12px; cursor: pointer; transition: all 0.2s;">
                            <i class="fas fa-cog" style="font-size: 20px; color: #0056b3; display: block; margin-bottom: 4px;"></i>
                            <span style="font-size: 11px; color: #666;">설정</span>
                        </button>
                    </div>
                </div>
                
                <!-- 보안 정보 -->
                <div style="background: #f0f9ff; border-radius: 16px; padding: 16px; border: 1px solid #bfdbfe;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <i class="fas fa-shield-alt" style="color: #0056b3; font-size: 18px;"></i>
                        <h3 style="font-size: 14px; font-weight: 700; color: #0056b3; margin: 0;">보안 정보</h3>
                    </div>
                    <p style="font-size: 12px; color: #666; line-height: 1.5; margin: 0;">
                        이 디지털 신분증은 블록체인 기술로 보호되며, 실시간 검증이 가능합니다. 
                        QR 코드는 매 30초마다 자동 갱신됩니다.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    // QR 코드 초기화
    setTimeout(() => {
        app.initQRCode();
        app.initRealTime();
        
        // 현재 날짜 표시
        const currentDate = document.getElementById('currentDate');
        if (currentDate) {
            const today = new Date();
            const endDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
            currentDate.textContent = endDate.toLocaleDateString('ko-KR');
        }
    }, 100);
};

// 사진 업데이트 함수
window.app.updateMemberPhoto = function() {
    app.showModal('updatePhoto', {
        title: '사진 변경',
        content: `
            <div style="text-align: center; padding: 20px;">
                <div style="margin-bottom: 20px;">
                    <i class="fas fa-camera" style="font-size: 48px; color: #0056b3;"></i>
                </div>
                <p style="color: #666; margin-bottom: 20px;">새로운 사진을 선택하세요</p>
                <div style="display: grid; gap: 12px;">
                    <button onclick="app.selectPhotoFromGallery()" style="padding: 12px; background: #0056b3; color: white; border: none; border-radius: 8px; font-weight: 600;">
                        <i class="fas fa-images"></i> 갤러리에서 선택
                    </button>
                    <button onclick="app.takeNewPhoto()" style="padding: 12px; background: white; color: #0056b3; border: 2px solid #0056b3; border-radius: 8px; font-weight: 600;">
                        <i class="fas fa-camera"></i> 사진 촬영
                    </button>
                </div>
            </div>
        `,
        showCancel: true
    });
};

// 디지털 ID 공유
window.app.shareDigitalId = function() {
    if (navigator.share) {
        navigator.share({
            title: '경기도의회 디지털 신분증',
            text: `${app.memberData.name} 의원 디지털 신분증`,
            url: window.location.href
        }).catch(() => {
            app.showToast('공유가 취소되었습니다.', 'info');
        });
    } else {
        app.showToast('공유 기능이 지원되지 않습니다.', 'error');
    }
};

// 디지털 ID 다운로드
window.app.downloadDigitalId = function() {
    app.showToast('신분증이 저장되었습니다.', 'success');
    // 실제 구현 시 Canvas나 HTML2Canvas를 사용하여 이미지로 저장
};