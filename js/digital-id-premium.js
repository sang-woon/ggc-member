// 프리미엄 파란색 디지털 신분증 디자인
window.app.loadDigitalIdPremium = function() {
    const mainContent = document.getElementById('mainContent');
    
    // 의원 사진 (기본 이미지 또는 실제 사진)
    const memberPhoto = app.memberData.photo || 'images/annomimus.jpg';
    
    mainContent.innerHTML = `
        <style>
            @keyframes hologram {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            
            @keyframes shimmer {
                0% { background-position: -200px 0; }
                100% { background-position: calc(200px + 100%) 0; }
            }
            
            @keyframes glow {
                0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.2), 0 20px 60px rgba(0,61,122,0.4); }
                50% { box-shadow: 0 0 30px rgba(255,255,255,0.3), 0 20px 80px rgba(0,61,122,0.5); }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.6; }
            }
            
            .premium-card {
                background: linear-gradient(135deg, #003d7a 0%, #0056b3 50%, #003d7a 100%);
                border-radius: 20px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0,61,122,0.4);
                animation: glow 3s ease-in-out infinite;
                transition: transform 0.3s ease;
            }
            
            .premium-card:hover {
                transform: translateY(-5px) rotateX(5deg);
                box-shadow: 0 30px 80px rgba(0,61,122,0.5);
            }
            
            .premium-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(
                    105deg,
                    transparent 40%,
                    rgba(255,255,255,0.1) 45%,
                    rgba(255,255,255,0.05) 50%,
                    transparent 55%
                );
                animation: hologram 4s linear infinite;
                pointer-events: none;
            }
            
            .metallic-border {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border: 2px solid;
                border-image: linear-gradient(
                    45deg,
                    #ffd700,
                    #ffffff,
                    #ffd700,
                    #ffffff
                );
                border-image-slice: 1;
                border-radius: 20px;
                animation: shimmer 3s linear infinite;
                pointer-events: none;
            }
            
            .premium-text-white {
                color: white !important;
                text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            
            .premium-text-light {
                color: rgba(255,255,255,0.9) !important;
                text-shadow: 0 1px 3px rgba(0,0,0,0.2);
            }
            
            .premium-text-soft {
                color: rgba(255,255,255,0.8) !important;
            }
            
            .glass-panel {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 12px;
            }
        </style>
        
        <div class="digital-id-container" style="max-width: 430px; margin: 0 auto; padding: 20px; font-family: 'Noto Sans KR', sans-serif;">
            <!-- 프리미엄 파란색 카드 -->
            <div class="premium-card" style="padding: 0; position: relative; min-height: 520px;">
                <div class="metallic-border"></div>
                
                <!-- 헤더 영역 -->
                <div style="padding: 24px 24px 20px; position: relative; z-index: 2;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <!-- 로고와 타이틀 -->
                        <div>
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                                <div class="glass-panel" style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;">
                                    <i class="fas fa-landmark premium-text-white" style="font-size: 24px;"></i>
                                </div>
                                <div>
                                    <div class="premium-text-white" style="font-size: 18px; font-weight: 700;">경기도의회</div>
                                    <div class="premium-text-soft" style="font-size: 10px; letter-spacing: 1px;">GYEONGGI COUNCIL</div>
                                </div>
                            </div>
                            <div class="premium-text-light" style="font-size: 14px; margin-top: 8px;">도의회의원 디지털 신분증</div>
                        </div>
                        
                        <!-- OFFICIAL 배지와 NFC -->
                        <div style="text-align: right;">
                            <div class="glass-panel" style="display: inline-block; padding: 6px 12px; margin-bottom: 8px; background: linear-gradient(135deg, #ffd700, #ffed4e);">
                                <span style="color: #003d7a; font-size: 10px; font-weight: 700; letter-spacing: 1px;">OFFICIAL</span>
                            </div>
                            <div style="width: 30px; height: 30px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; margin-left: auto; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-wifi premium-text-soft" style="font-size: 14px; transform: rotate(90deg);"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 본체 콘텐츠 -->
                <div style="padding: 0 24px 24px; position: relative; z-index: 2;">
                    <!-- 의원 정보 섹션 -->
                    <div style="display: flex; gap: 20px; margin-bottom: 24px;">
                        <!-- 사진 -->
                        <div style="position: relative;">
                            <div style="width: 100px; height: 130px; border-radius: 12px; overflow: hidden; border: 3px solid rgba(255,215,0,0.3); box-shadow: 0 8px 24px rgba(0,0,0,0.3); background: linear-gradient(135deg, #ffd700, #ffffff, #ffd700); padding: 2px;">
                                <div style="width: 100%; height: 100%; border-radius: 10px; overflow: hidden; position: relative;">
                                    <img src="${memberPhoto}" alt="${app.memberData.name || '의원'}" style="width: 100%; height: 100%; object-fit: cover;">
                                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%); animation: shimmer 3s linear infinite;"></div>
                                </div>
                            </div>
                            <button onclick="app.updateMemberPhoto()" class="glass-panel" style="position: absolute; bottom: -8px; right: -8px; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 2px solid rgba(255,255,255,0.3);">
                                <i class="fas fa-camera premium-text-white" style="font-size: 14px;"></i>
                            </button>
                        </div>
                        
                        <!-- 정보 -->
                        <div style="flex: 1;">
                            <div class="premium-text-white" style="font-size: 24px; font-weight: 700; margin-bottom: 4px;">
                                ${app.memberData.name || '김영수'}
                            </div>
                            <div class="premium-text-light" style="font-size: 13px; margin-bottom: 12px;">
                                ${app.memberData.memberId || '2024-0815'}
                            </div>
                            
                            <div style="display: grid; gap: 8px;">
                                <div class="glass-panel" style="padding: 6px 10px; display: flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-flag premium-text-soft" style="width: 16px; font-size: 12px;"></i>
                                    <span class="premium-text-white" style="font-size: 13px;">${app.memberData.party || '국민의힘'}</span>
                                </div>
                                <div class="glass-panel" style="padding: 6px 10px; display: flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-map-marker-alt premium-text-soft" style="width: 16px; font-size: 12px;"></i>
                                    <span class="premium-text-white" style="font-size: 13px;">${app.memberData.district || '경기 수원시갑'}</span>
                                </div>
                                <div class="glass-panel" style="padding: 6px 10px; display: flex; align-items: center; gap: 8px;">
                                    <i class="fas fa-award premium-text-soft" style="width: 16px; font-size: 12px;"></i>
                                    <span class="premium-text-white" style="font-size: 13px;">${app.memberData.term || '초선(제11기)'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 임기 정보 -->
                    <div class="glass-panel" style="padding: 10px; text-align: center; margin-bottom: 20px; background: rgba(255,215,0,0.1); border-color: rgba(255,215,0,0.3);">
                        <div class="premium-text-white" style="font-size: 12px; margin-bottom: 2px;">임기</div>
                        <div class="premium-text-white" style="font-size: 14px; font-weight: 600;">2022.07.01 - 2026.06.30</div>
                    </div>
                    
                    <!-- QR 코드와 검증 -->
                    <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                        <div style="background: white; padding: 8px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                            <canvas id="qrcode" style="display: block;"></canvas>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite;"></div>
                                <span class="premium-text-white" style="font-size: 13px; font-weight: 600;">실시간 인증 활성</span>
                            </div>
                            <div class="premium-text-soft" style="font-size: 11px; line-height: 1.5;">
                                블록체인 검증 완료<br>
                                발급: 경기도의회 사무처
                            </div>
                        </div>
                    </div>
                    
                    <!-- 보안 기능 배지 -->
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 20px;">
                        <div class="glass-panel" style="padding: 10px; text-align: center; background: linear-gradient(135deg, rgba(0,61,122,0.3), rgba(0,86,179,0.3));">
                            <i class="fas fa-shield-alt premium-text-white" style="font-size: 20px; margin-bottom: 4px;"></i>
                            <div class="premium-text-soft" style="font-size: 10px;">블록체인</div>
                        </div>
                        <div class="glass-panel" style="padding: 10px; text-align: center; background: linear-gradient(135deg, rgba(16,185,129,0.3), rgba(5,150,105,0.3));">
                            <i class="fas fa-wifi premium-text-white" style="font-size: 20px; margin-bottom: 4px;"></i>
                            <div class="premium-text-soft" style="font-size: 10px;">NFC</div>
                        </div>
                        <div class="glass-panel" style="padding: 10px; text-align: center; background: linear-gradient(135deg, rgba(220,38,38,0.3), rgba(185,28,28,0.3));">
                            <i class="fas fa-fingerprint premium-text-white" style="font-size: 20px; margin-bottom: 4px;"></i>
                            <div class="premium-text-soft" style="font-size: 10px;">생체인증</div>
                        </div>
                        <div class="glass-panel" style="padding: 10px; text-align: center; background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(109,40,217,0.3));">
                            <i class="fas fa-wallet premium-text-white" style="font-size: 20px; margin-bottom: 4px;"></i>
                            <div class="premium-text-soft" style="font-size: 10px;">모바일 월렛</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 액션 버튼 -->
            <div style="margin-top: 24px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                <button onclick="app.shareDigitalId()" class="glass-panel premium-text-white" style="padding: 14px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, #003d7a, #0056b3); border: none; position: relative; overflow: hidden;">
                    <i class="fas fa-share-alt"></i>
                    <span>공유하기</span>
                    <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); animation: shimmer 2s infinite;"></div>
                </button>
                <button onclick="app.addToWallet()" class="glass-panel premium-text-white" style="padding: 14px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, #7c3aed, #a855f7); border: none; position: relative; overflow: hidden;">
                    <i class="fas fa-wallet"></i>
                    <span>월렛 추가</span>
                    <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); animation: shimmer 2s infinite;"></div>
                </button>
            </div>
        </div>
    `;
    
    // QR 코드 생성
    setTimeout(() => {
        if (typeof QRious !== 'undefined') {
            const qr = new QRious({
                element: document.getElementById('qrcode'),
                value: `https://ggc.go.kr/member/${app.memberData.memberId || '2024-0815'}`,
                size: 100,
                level: 'H'
            });
        }
    }, 100);
};

// 기존 함수 오버라이드
window.app.loadDigitalIdPage = window.app.loadDigitalIdPremium;