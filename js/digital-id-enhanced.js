// Enhanced Digital ID Card JavaScript - 2025.01.18
// 개선된 디지털 신분증 기능

(function() {
    'use strict';
    
    // 디지털 신분증 개선 기능
    Object.assign(window.app, {
        // 카드 플립 기능
        flipCard: function() {
            const flipper = document.getElementById('idCardFlipper');
            if (flipper) {
                flipper.classList.toggle('flipped');
                
                // 플립 시 진동 피드백 (모바일)
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
                
                // 플립 이벤트 로깅
                console.log('ID Card flipped:', flipper.classList.contains('flipped') ? 'back' : 'front');
            }
        },
        
        // NFC 시뮬레이션
        showNFCModal: function() {
            const nfcIndicator = document.getElementById('nfcIndicator');
            if (nfcIndicator) {
                // NFC 애니메이션 표시
                nfcIndicator.classList.add('active');
                
                // 진동 피드백
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
                
                // 3초 후 애니메이션 제거
                setTimeout(() => {
                    nfcIndicator.classList.remove('active');
                    this.showModalEnhanced('nfcSuccess', {
                        title: 'NFC 태그 성공',
                        icon: 'fas fa-check-circle',
                        content: `
                            <div class="text-center py-8">
                                <div class="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                    <i class="fas fa-check text-3xl text-green-600"></i>
                                </div>
                                <h3 class="text-lg font-semibold mb-2">신분 확인 완료</h3>
                                <p class="text-sm text-gray-600">NFC 태그로 신원이 확인되었습니다.</p>
                                <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <div class="text-xs text-gray-700">인증 시간</div>
                                    <div class="text-sm font-mono font-semibold">${new Date().toLocaleString('ko-KR')}</div>
                                </div>
                            </div>
                        `,
                        confirmText: '확인'
                    });
                }, 1500);
            }
        },
        
        // 생체 인증
        verifyIdentity: function() {
            this.showModalEnhanced('biometric', {
                title: '생체 인증',
                icon: 'fas fa-fingerprint',
                content: `
                    <div class="text-center py-8">
                        <div class="relative w-32 h-32 mx-auto mb-6">
                            <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                            <div class="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                                <i class="fas fa-fingerprint text-5xl text-blue-600"></i>
                            </div>
                        </div>
                        <h3 class="text-lg font-semibold mb-2">지문 인증 중...</h3>
                        <p class="text-sm text-gray-600">홈 버튼에 손가락을 올려주세요</p>
                        <div class="mt-6 space-y-2">
                            <div class="flex items-center justify-center gap-2 text-sm">
                                <i class="fas fa-shield-alt text-green-500"></i>
                                <span>생체 정보는 기기에만 저장됩니다</span>
                            </div>
                        </div>
                    </div>
                `,
                confirmText: '취소'
            });
            
            // 2초 후 자동으로 인증 성공
            setTimeout(() => {
                this.closeModalEnhanced();
                this.showModalEnhanced('biometricSuccess', {
                    title: '인증 성공',
                    icon: 'fas fa-check-circle',
                    content: `
                        <div class="text-center py-6">
                            <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-check text-2xl text-green-600"></i>
                            </div>
                            <p class="text-gray-700">생체 인증이 완료되었습니다.</p>
                        </div>
                    `,
                    confirmText: '확인'
                });
            }, 2000);
        },
        
        // 디지털 신분증 공유
        shareDigitalId: function() {
            const shareData = {
                title: '경기도의회 디지털 신분증',
                text: '김영수 의원 (의원번호: 2024-0815)',
                url: window.location.href
            };
            
            if (navigator.share) {
                navigator.share(shareData)
                    .then(() => console.log('신분증 공유 성공'))
                    .catch((error) => console.log('공유 실패:', error));
            } else {
                // Web Share API를 지원하지 않는 경우
                this.showModalEnhanced('share', {
                    title: '신분증 공유',
                    icon: 'fas fa-share-alt',
                    content: `
                        <div class="space-y-3">
                            <button class="w-full p-3 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2" onclick="app.shareVia('kakao')">
                                <i class="fas fa-comment"></i> 카카오톡으로 공유
                            </button>
                            <button class="w-full p-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2" onclick="app.shareVia('email')">
                                <i class="fas fa-envelope"></i> 이메일로 공유
                            </button>
                            <button class="w-full p-3 bg-gray-600 text-white rounded-lg flex items-center justify-center gap-2" onclick="app.shareVia('qr')">
                                <i class="fas fa-qrcode"></i> QR 코드 생성
                            </button>
                            <button class="w-full p-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2" onclick="app.copyLink()">
                                <i class="fas fa-link"></i> 링크 복사
                            </button>
                        </div>
                    `,
                    footer: false
                });
            }
        },
        
        // 공유 방법별 처리
        shareVia: function(method) {
            switch(method) {
                case 'kakao':
                    console.log('카카오톡 공유');
                    alert('카카오톡으로 공유되었습니다.');
                    break;
                case 'email':
                    window.location.href = 'mailto:?subject=경기도의회 디지털 신분증&body=김영수 의원 디지털 신분증';
                    break;
                case 'qr':
                    this.showQRModal();
                    break;
            }
            this.closeModalEnhanced();
        },
        
        // 링크 복사
        copyLink: function() {
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = window.location.href;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            
            // 피드백 표시
            const originalText = event.target.innerHTML;
            event.target.innerHTML = '<i class="fas fa-check"></i> 복사 완료!';
            event.target.classList.add('bg-green-500', 'text-white');
            
            setTimeout(() => {
                event.target.innerHTML = originalText;
                event.target.classList.remove('bg-green-500', 'text-white');
            }, 2000);
        },
        
        // QR 모달 표시
        showQRModal: function() {
            this.showModalEnhanced('qrShare', {
                title: 'QR 코드 공유',
                icon: 'fas fa-qrcode',
                content: `
                    <div class="text-center py-6">
                        <div class="inline-block p-4 bg-white border-2 border-gray-300 rounded-lg">
                            <canvas id="shareQR"></canvas>
                        </div>
                        <p class="mt-4 text-sm text-gray-600">QR 코드를 스캔하여 디지털 신분증을 확인하세요</p>
                    </div>
                `,
                confirmText: '닫기'
            });
            
            // QR 코드 생성
            setTimeout(() => {
                const qr = new QRious({
                    element: document.getElementById('shareQR'),
                    value: window.location.href,
                    size: 200
                });
            }, 100);
        },
        
        // Apple Wallet에 추가
        addToWallet: function() {
            this.showModalEnhanced('wallet', {
                title: 'Apple Wallet에 추가',
                icon: 'fab fa-apple',
                content: `
                    <div class="text-center py-6">
                        <div class="w-20 h-20 mx-auto mb-4 bg-black rounded-2xl flex items-center justify-center">
                            <i class="fab fa-apple text-3xl text-white"></i>
                        </div>
                        <h3 class="text-lg font-semibold mb-2">Wallet에 추가 중...</h3>
                        <p class="text-sm text-gray-600">디지털 신분증을 Apple Wallet에 추가합니다</p>
                        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                            <div class="text-xs text-gray-500 mb-2">추가될 정보</div>
                            <ul class="text-sm text-left space-y-1">
                                <li>• 의원 정보 및 사진</li>
                                <li>• 디지털 인증 QR 코드</li>
                                <li>• 유효기간 정보</li>
                            </ul>
                        </div>
                    </div>
                `,
                confirmText: '추가하기',
                cancelText: '취소'
            });
        },
        
        // 전화 걸기
        makeCall: function(number) {
            if (confirm(`${number}로 전화를 거시겠습니까?`)) {
                window.location.href = `tel:${number}`;
            }
        },
        
        // 디지털 서명 검증
        verifySignature: function() {
            this.showModalEnhanced('signature', {
                title: '디지털 서명 검증',
                icon: 'fas fa-certificate',
                content: `
                    <div class="space-y-4">
                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div class="flex items-center gap-3 mb-2">
                                <i class="fas fa-check-circle text-green-600 text-xl"></i>
                                <span class="font-semibold text-green-800">서명 유효</span>
                            </div>
                            <p class="text-sm text-green-700">디지털 서명이 검증되었습니다.</p>
                        </div>
                        
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between py-2 border-b">
                                <span class="text-gray-600">서명자</span>
                                <span class="font-medium">김영수 의원</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span class="text-gray-600">서명 날짜</span>
                                <span class="font-medium">2025.01.18</span>
                            </div>
                            <div class="flex justify-between py-2 border-b">
                                <span class="text-gray-600">인증 기관</span>
                                <span class="font-medium">경기도의회</span>
                            </div>
                            <div class="flex justify-between py-2">
                                <span class="text-gray-600">해시값</span>
                                <span class="font-mono text-xs">SHA256: 7f3b9d2a...</span>
                            </div>
                        </div>
                    </div>
                `,
                confirmText: '확인'
            });
        },
        
        // QR 코드 업데이트 (기존 함수 개선)
        updateQRCode: function() {
            const qrCanvas = document.getElementById('qrcode');
            if (qrCanvas && window.QRious) {
                const memberData = {
                    name: '김영수',
                    id: '2024-0815',
                    position: '경기도의회 의원',
                    timestamp: new Date().toISOString()
                };
                
                const qr = new QRious({
                    element: qrCanvas,
                    value: JSON.stringify(memberData),
                    size: 84, // 컨테이너에 맞게 크기 조정
                    level: 'M',
                    background: 'white',
                    foreground: '#003d7a'
                });
            }
        },
        
        // 실시간 시계 업데이트 (페이지 로드 시 호출)
        startDigitalClock: function() {
            const updateClock = () => {
                const now = new Date();
                const timeElement = document.getElementById('current-time');
                if (timeElement) {
                    timeElement.textContent = now.toLocaleTimeString('ko-KR');
                }
                
                // 마지막 인증 시간 업데이트
                const authElement = document.getElementById('last-auth');
                if (authElement) {
                    const lastAuth = localStorage.getItem('lastAuthTime');
                    if (lastAuth) {
                        const diff = Date.now() - parseInt(lastAuth);
                        const minutes = Math.floor(diff / 60000);
                        if (minutes < 1) {
                            authElement.textContent = '방금 전';
                        } else if (minutes < 60) {
                            authElement.textContent = `${minutes}분 전`;
                        } else {
                            authElement.textContent = `${Math.floor(minutes / 60)}시간 전`;
                        }
                    }
                }
            };
            
            updateClock();
            setInterval(updateClock, 1000);
        },
        
        // 디지털 신분증 페이지 초기화
        initDigitalIdPage: function() {
            // QR 코드 생성
            this.updateQRCode();
            
            // 실시간 시계 시작
            this.startDigitalClock();
            
            // 터치 이벤트 최적화 (모바일)
            const flipper = document.getElementById('idCardFlipper');
            if (flipper) {
                let startX = 0;
                flipper.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                }, { passive: true });
                
                flipper.addEventListener('touchend', (e) => {
                    const endX = e.changedTouches[0].clientX;
                    const diff = endX - startX;
                    
                    // 스와이프로 카드 플립
                    if (Math.abs(diff) > 50) {
                        this.flipCard();
                    }
                }, { passive: true });
            }
            
            // 현재 시간으로 인증 시간 저장
            localStorage.setItem('lastAuthTime', Date.now().toString());
        }
    });
    
    // 페이지 로드 시 디지털 신분증 초기화
    const originalLoadPage = window.app.loadPage;
    window.app.loadPage = function(pageName) {
        originalLoadPage.call(this, pageName);
        
        if (pageName === 'digital-id') {
            setTimeout(() => {
                this.initDigitalIdPage();
            }, 100);
        }
    };
})();