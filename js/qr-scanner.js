// QR 코드 스캐너 시스템
// 의원증 인증, 문서 검증, 출입 관리 등에 활용

class QRScanner {
    constructor() {
        this.isScanning = false;
        this.stream = null;
        this.video = null;
        this.canvas = null;
        this.context = null;
        this.scanInterval = null;
        this.isInitialized = false;
        this.facingMode = 'environment'; // 후면 카메라 기본
        
        // QR 코드 처리 패턴
        this.qrPatterns = {
            memberCard: {
                regex: /^GGC-MEMBER-(\d{4}-\d{4})$/,
                handler: this.handleMemberCardScan.bind(this)
            },
            document: {
                regex: /^GGC-DOC-([A-Z0-9]{8})$/,
                handler: this.handleDocumentScan.bind(this)
            },
            attendance: {
                regex: /^GGC-ATT-(\d{8})-(\d{4})$/,
                handler: this.handleAttendanceScan.bind(this)
            },
            meeting: {
                regex: /^GGC-MEET-(\d{8})-([A-Z0-9]{6})$/,
                handler: this.handleMeetingScan.bind(this)
            },
            facility: {
                regex: /^GGC-FACILITY-([A-Z0-9]{6})$/,
                handler: this.handleFacilityScan.bind(this)
            },
            url: {
                regex: /^https?:\/\/.+/,
                handler: this.handleUrlScan.bind(this)
            },
            general: {
                regex: /.+/,
                handler: this.handleGeneralScan.bind(this)
            }
        };
        
        this.init();
    }

    async init() {
        try {
            // 카메라 권한 확인
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                console.warn('카메라가 지원되지 않는 환경입니다.');
                return;
            }

            this.setupUI();
            this.isInitialized = true;
            
            console.log('QR 스캐너 초기화 완료');
        } catch (error) {
            console.error('QR 스캐너 초기화 실패:', error);
        }
    }

    setupUI() {
        // QR 스캔 버튼을 헤더에 추가
        this.addScanButton();
        
        // QR 스캔 모달 스타일
        this.addStyles();
    }

    addScanButton() {
        // 헤더에 QR 스캔 버튼 추가
        const header = document.querySelector('header .flex');
        if (header && !document.getElementById('qrScanButton')) {
            const scanBtn = document.createElement('button');
            scanBtn.id = 'qrScanButton';
            scanBtn.className = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9';
            scanBtn.innerHTML = '<i class="fas fa-qrcode text-lg"></i>';
            scanBtn.title = 'QR 코드 스캔';
            scanBtn.onclick = () => this.showScanModal();
            
            // 알림 버튼 앞에 삽입
            const notificationBtn = header.querySelector('button:last-child');
            header.insertBefore(scanBtn, notificationBtn);
        }
    }

    addStyles() {
        if (!document.getElementById('qrScannerStyles')) {
            const styles = document.createElement('style');
            styles.id = 'qrScannerStyles';
            styles.textContent = `
                .qr-scanner-container {
                    position: relative;
                    width: 100%;
                    max-width: 400px;
                    margin: 0 auto;
                }
                
                .qr-scanner-video {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                    border-radius: 8px;
                    background: #000;
                }
                
                .qr-scanner-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                }
                
                .qr-scanner-frame {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 200px;
                    height: 200px;
                    border: 2px solid #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
                }
                
                .qr-scanner-corners {
                    position: absolute;
                    inset: -8px;
                }
                
                .qr-scanner-corner {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    border: 3px solid #3b82f6;
                }
                
                .qr-scanner-corner.top-left {
                    top: 0;
                    left: 0;
                    border-right: none;
                    border-bottom: none;
                }
                
                .qr-scanner-corner.top-right {
                    top: 0;
                    right: 0;
                    border-left: none;
                    border-bottom: none;
                }
                
                .qr-scanner-corner.bottom-left {
                    bottom: 0;
                    left: 0;
                    border-right: none;
                    border-top: none;
                }
                
                .qr-scanner-corner.bottom-right {
                    bottom: 0;
                    right: 0;
                    border-left: none;
                    border-top: none;
                }
                
                .qr-scanner-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
                    animation: qr-scan-line 2s linear infinite;
                }
                
                @keyframes qr-scan-line {
                    0% {
                        top: 0;
                        opacity: 1;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        top: 100%;
                        opacity: 0;
                    }
                }
                
                .qr-result-success {
                    background: #10b981;
                    color: white;
                    padding: 12px;
                    border-radius: 8px;
                    margin-top: 16px;
                    text-align: center;
                    animation: qr-result-fade 0.3s ease-in;
                }
                
                .qr-result-error {
                    background: #ef4444;
                    color: white;
                    padding: 12px;
                    border-radius: 8px;
                    margin-top: 16px;
                    text-align: center;
                    animation: qr-result-fade 0.3s ease-in;
                }
                
                @keyframes qr-result-fade {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .qr-scanner-controls {
                    display: flex;
                    gap: 8px;
                    margin-top: 16px;
                    justify-content: center;
                }
                
                .qr-scanner-button {
                    padding: 8px 16px;
                    border-radius: 6px;
                    border: none;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                
                .qr-scanner-button.primary {
                    background: #3b82f6;
                    color: white;
                }
                
                .qr-scanner-button.primary:hover {
                    background: #2563eb;
                }
                
                .qr-scanner-button.secondary {
                    background: #e5e7eb;
                    color: #374151;
                }
                
                .qr-scanner-button.secondary:hover {
                    background: #d1d5db;
                }
            `;
            document.head.appendChild(styles);
        }
    }

    showScanModal() {
        const modalHTML = `
            <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onclick="closeScanModal(event)">
                <div class="bg-white rounded-lg max-w-md w-full" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div class="flex items-center justify-between p-4 border-b">
                        <h2 class="text-lg font-semibold">QR 코드 스캔</h2>
                        <button onclick="closeScanModal()" 
                                class="p-1 hover:bg-gray-100 rounded">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <!-- Scanner Content -->
                    <div class="p-4">
                        <div class="qr-scanner-container">
                            <video id="qrVideo" class="qr-scanner-video" playsinline></video>
                            <div class="qr-scanner-overlay">
                                <div class="qr-scanner-frame">
                                    <div class="qr-scanner-corners">
                                        <div class="qr-scanner-corner top-left"></div>
                                        <div class="qr-scanner-corner top-right"></div>
                                        <div class="qr-scanner-corner bottom-left"></div>
                                        <div class="qr-scanner-corner bottom-right"></div>
                                    </div>
                                    <div class="qr-scanner-line"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="qrResult"></div>
                        
                        <div class="qr-scanner-controls">
                            <button onclick="toggleCamera()" class="qr-scanner-button secondary">
                                <i class="fas fa-camera-rotate"></i> 카메라 전환
                            </button>
                            <button onclick="toggleFlash()" class="qr-scanner-button secondary">
                                <i class="fas fa-flashlight"></i> 플래시
                            </button>
                        </div>
                        
                        <div class="text-center text-sm text-gray-500 mt-4">
                            QR 코드를 프레임 안에 맞춰주세요
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modalsContainer').innerHTML = modalHTML;
        
        // 전역 함수 등록
        window.closeScanModal = this.closeScanModal.bind(this);
        window.toggleCamera = this.toggleCamera.bind(this);
        window.toggleFlash = this.toggleFlash.bind(this);
        
        // 스캐너 시작
        this.startScanning();
    }

    closeScanModal(event) {
        if (event && event.target !== event.currentTarget) return;
        
        this.stopScanning();
        document.getElementById('modalsContainer').innerHTML = '';
    }

    async startScanning() {
        try {
            this.video = document.getElementById('qrVideo');
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
            
            // 카메라 스트림 시작
            await this.startCamera();
            
            // QR 코드 감지 시작
            this.isScanning = true;
            this.scanInterval = setInterval(() => {
                this.scanForQR();
            }, 500);
            
        } catch (error) {
            console.error('QR 스캔 시작 실패:', error);
            this.showResult('카메라에 접근할 수 없습니다.', 'error');
        }
    }

    async startCamera() {
        const constraints = {
            video: {
                facingMode: this.facingMode,
                width: { ideal: 400 },
                height: { ideal: 300 }
            }
        };

        try {
            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = this.stream;
            await this.video.play();
        } catch (error) {
            // 후면 카메라 실패시 전면 카메라 시도
            if (this.facingMode === 'environment') {
                this.facingMode = 'user';
                constraints.video.facingMode = 'user';
                this.stream = await navigator.mediaDevices.getUserMedia(constraints);
                this.video.srcObject = this.stream;
                await this.video.play();
            } else {
                throw error;
            }
        }
    }

    stopScanning() {
        this.isScanning = false;
        
        if (this.scanInterval) {
            clearInterval(this.scanInterval);
            this.scanInterval = null;
        }
        
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        if (this.video) {
            this.video.srcObject = null;
        }
    }

    async toggleCamera() {
        this.facingMode = this.facingMode === 'environment' ? 'user' : 'environment';
        
        if (this.isScanning) {
            this.stopScanning();
            await new Promise(resolve => setTimeout(resolve, 100));
            this.startScanning();
        }
    }

    async toggleFlash() {
        if (!this.stream) return;
        
        const track = this.stream.getVideoTracks()[0];
        if (!track || !track.getCapabilities) return;
        
        const capabilities = track.getCapabilities();
        if (!capabilities.torch) {
            this.showResult('플래시가 지원되지 않습니다.', 'error');
            return;
        }
        
        try {
            const settings = track.getSettings();
            await track.applyConstraints({
                advanced: [{ torch: !settings.torch }]
            });
        } catch (error) {
            console.error('플래시 토글 실패:', error);
        }
    }

    scanForQR() {
        if (!this.video || !this.isScanning) return;
        
        try {
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
            
            this.context.drawImage(this.video, 0, 0);
            const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            
            // QR 코드 디코딩 (간단한 패턴 매칭 사용)
            const qrCode = this.decodeQR(imageData);
            
            if (qrCode) {
                this.processQRCode(qrCode);
            }
        } catch (error) {
            console.error('QR 스캔 오류:', error);
        }
    }

    decodeQR(imageData) {
        // 실제 환경에서는 jsQR 라이브러리나 ZXing 라이브러리 사용 권장
        // 여기서는 간단한 시뮬레이션으로 구현
        
        // 개발 환경에서 테스트용 QR 코드 시뮬레이션
        if (Math.random() < 0.1) { // 10% 확률로 QR 감지 시뮬레이션
            const testCodes = [
                'GGC-MEMBER-2024-0815',
                'GGC-DOC-A1B2C3D4',
                'GGC-ATT-20241201-1030',
                'GGC-MEET-20241201-ABC123',
                'GGC-FACILITY-HALL01',
                'https://ggc.go.kr/member/info',
                '경기도의회 테스트 QR 코드'
            ];
            return testCodes[Math.floor(Math.random() * testCodes.length)];
        }
        
        return null;
    }

    processQRCode(qrData) {
        console.log('QR 코드 감지:', qrData);
        
        // 스캔 중지
        this.stopScanning();
        
        // 패턴 매칭 및 처리
        for (const [type, pattern] of Object.entries(this.qrPatterns)) {
            if (pattern.regex.test(qrData)) {
                pattern.handler(qrData, type);
                return;
            }
        }
        
        // 매칭되지 않은 경우 일반 처리
        this.handleGeneralScan(qrData);
    }

    // QR 코드 유형별 처리 메서드들

    handleMemberCardScan(qrData, type) {
        const match = qrData.match(this.qrPatterns.memberCard.regex);
        const memberId = match[1];
        
        const currentMemberId = window.app?.memberData?.memberId;
        
        if (memberId === currentMemberId) {
            this.showResult('본인 인증이 완료되었습니다.', 'success');
            
            // 출석 체크 자동 처리
            if (window.notificationSystem) {
                window.notificationSystem.createNotification({
                    type: 'attendance',
                    category: 'system',
                    title: '출석 체크 완료',
                    body: 'QR 코드 인증으로 출석이 처리되었습니다.',
                    priority: 'medium'
                });
            }
        } else {
            this.showResult('다른 의원의 의원증입니다.', 'error');
        }
    }

    handleDocumentScan(qrData, type) {
        const match = qrData.match(this.qrPatterns.document.regex);
        const docId = match[1];
        
        this.showResult(`문서 ${docId} 인증 중...`, 'success');
        
        // 문서 검증 API 호출 시뮬레이션
        setTimeout(() => {
            const isValid = Math.random() > 0.2; // 80% 확률로 유효
            
            if (isValid) {
                this.showResult('문서 인증이 완료되었습니다.', 'success');
                
                if (window.notificationSystem) {
                    window.notificationSystem.createNotification({
                        type: 'system',
                        category: 'system',
                        title: '문서 인증 완료',
                        body: `문서 ${docId}의 진위가 확인되었습니다.`,
                        priority: 'medium'
                    });
                }
            } else {
                this.showResult('문서 인증에 실패했습니다.', 'error');
            }
        }, 2000);
    }

    handleAttendanceScan(qrData, type) {
        const match = qrData.match(this.qrPatterns.attendance.regex);
        const date = match[1];
        const time = match[2];
        
        this.showResult(`${date} ${time} 출석 체크 완료`, 'success');
        
        if (window.app?.navigateTo) {
            setTimeout(() => {
                this.closeScanModal();
                window.app.navigateTo('attendance');
            }, 2000);
        }
    }

    handleMeetingScan(qrData, type) {
        const match = qrData.match(this.qrPatterns.meeting.regex);
        const date = match[1];
        const meetingId = match[2];
        
        this.showResult(`회의 ${meetingId} 참석 확인됨`, 'success');
        
        if (window.notificationSystem) {
            window.notificationSystem.createNotification({
                type: 'meeting',
                category: 'meeting',
                title: '회의 참석 확인',
                body: `${date} 회의에 참석하셨습니다.`,
                priority: 'medium'
            });
        }
    }

    handleFacilityScan(qrData, type) {
        const match = qrData.match(this.qrPatterns.facility.regex);
        const facilityId = match[1];
        
        const facilityNames = {
            'HALL01': '본회의장',
            'COMM01': '위원회실 1',
            'COMM02': '위원회실 2',
            'MEET01': '회의실 A',
            'MEET02': '회의실 B'
        };
        
        const facilityName = facilityNames[facilityId] || `시설 ${facilityId}`;
        
        this.showResult(`${facilityName} 접근 권한 확인됨`, 'success');
        
        if (window.notificationSystem) {
            window.notificationSystem.createNotification({
                type: 'system',
                category: 'system',
                title: '시설 출입 기록',
                body: `${facilityName}에 출입하셨습니다.`,
                priority: 'low'
            });
        }
    }

    handleUrlScan(qrData, type) {
        this.showResult('웹사이트 링크가 감지되었습니다.', 'success');
        
        // 안전한 URL인지 확인
        if (this.isSafeUrl(qrData)) {
            const openLink = confirm(`다음 링크를 열겠습니까?\n${qrData}`);
            if (openLink) {
                window.open(qrData, '_blank');
            }
        } else {
            this.showResult('안전하지 않은 링크입니다.', 'error');
        }
    }

    handleGeneralScan(qrData, type) {
        this.showResult(`QR 코드 내용: ${qrData}`, 'success');
        
        // 클립보드에 복사
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(qrData).then(() => {
                setTimeout(() => {
                    this.showResult('클립보드에 복사되었습니다.', 'success');
                }, 1000);
            });
        }
    }

    isSafeUrl(url) {
        try {
            const urlObj = new URL(url);
            const safeDomains = [
                'ggc.go.kr',
                'gyeonggi.go.kr',
                'gov.kr'
            ];
            
            return safeDomains.some(domain => 
                urlObj.hostname.includes(domain)
            );
        } catch {
            return false;
        }
    }

    showResult(message, type) {
        const resultDiv = document.getElementById('qrResult');
        if (!resultDiv) return;
        
        resultDiv.innerHTML = `
            <div class="qr-result-${type}">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                ${message}
            </div>
        `;
        
        // 음성 피드백
        if (window.voiceAssistant) {
            window.voiceAssistant.speak(message);
        }
        
        // 성공시 진동 피드백
        if (type === 'success' && 'vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    // 수동 QR 코드 입력
    showManualInput() {
        const inputModal = `
            <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h2 class="text-lg font-semibold mb-4">QR 코드 수동 입력</h2>
                    
                    <textarea id="manualQrInput" 
                              class="w-full p-3 border border-gray-300 rounded-lg resize-none"
                              rows="4"
                              placeholder="QR 코드 내용을 입력하세요..."></textarea>
                    
                    <div class="flex gap-2 mt-4">
                        <button onclick="closeManualInput()" 
                                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            취소
                        </button>
                        <button onclick="processManualInput()" 
                                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            처리
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modalsContainer').innerHTML = inputModal;
        
        window.closeManualInput = () => {
            document.getElementById('modalsContainer').innerHTML = '';
        };
        
        window.processManualInput = () => {
            const input = document.getElementById('manualQrInput').value.trim();
            if (input) {
                this.processQRCode(input);
            }
            window.closeManualInput();
        };
    }

    // 공개 메서드들
    isSupported() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    // QR 코드 생성 (기존 디지털 의원증과 연계)
    generateMemberQR() {
        const memberId = window.app?.memberData?.memberId;
        if (!memberId) return null;
        
        return `GGC-MEMBER-${memberId}`;
    }

    // 정리
    destroy() {
        this.stopScanning();
        
        const button = document.getElementById('qrScanButton');
        const styles = document.getElementById('qrScannerStyles');
        
        if (button) button.remove();
        if (styles) styles.remove();
    }
}

// 전역 인스턴스 생성
window.qrScanner = new QRScanner();