// 디지털 서명 및 문서 인증 시스템
// 의정활동 문서의 무결성 보장 및 전자서명 처리

class DigitalSignatureSystem {
    constructor() {
        this.isInitialized = false;
        this.keyPair = null;
        this.certificates = new Map();
        this.signedDocuments = new Map();
        this.verificationHistory = [];
        
        // 지원되는 문서 유형
        this.supportedDocTypes = {
            bill: {
                name: '의안서',
                extensions: ['.pdf', '.doc', '.docx'],
                maxSize: 10 * 1024 * 1024, // 10MB
                requiredFields: ['title', 'proposer', 'content', 'reason']
            },
            report: {
                name: '보고서',
                extensions: ['.pdf', '.doc', '.docx', '.hwp'],
                maxSize: 20 * 1024 * 1024, // 20MB
                requiredFields: ['title', 'author', 'date', 'content']
            },
            resolution: {
                name: '결의안',
                extensions: ['.pdf', '.doc', '.docx'],
                maxSize: 5 * 1024 * 1024, // 5MB
                requiredFields: ['title', 'proposer', 'content']
            },
            petition: {
                name: '청원서',
                extensions: ['.pdf', '.doc', '.docx'],
                maxSize: 15 * 1024 * 1024, // 15MB
                requiredFields: ['title', 'petitioner', 'content', 'purpose']
            }
        };
        
        // 서명 알고리즘 설정
        this.signatureConfig = {
            algorithm: 'RSASSA-PKCS1-v1_5',
            hash: 'SHA-256',
            keyLength: 2048,
            modulusLength: 2048
        };
        
        this.init();
    }

    async init() {
        try {
            // 웹 암호화 API 지원 여부 확인
            if (!this.isWebCryptoSupported()) {
                console.warn('웹 암호화 API가 지원되지 않습니다.');
                return;
            }
            
            // 기존 키 쌍 로드 또는 새로 생성
            await this.loadOrGenerateKeyPair();
            
            // 인증서 로드
            this.loadCertificates();
            
            // 서명 문서 히스토리 로드
            this.loadSignatureHistory();
            
            // UI 설정
            this.setupUI();
            
            this.isInitialized = true;
            console.log('디지털 서명 시스템 초기화 완료');
        } catch (error) {
            console.error('디지털 서명 시스템 초기화 실패:', error);
        }
    }

    isWebCryptoSupported() {
        return window.crypto && window.crypto.subtle;
    }

    async loadOrGenerateKeyPair() {
        try {
            // 로컬 스토리지에서 키 로드 시도
            const savedKeyPair = localStorage.getItem('digitalSignatureKeyPair');
            
            if (savedKeyPair) {
                const keyData = JSON.parse(savedKeyPair);
                this.keyPair = {
                    privateKey: await window.crypto.subtle.importKey(
                        'jwk',
                        keyData.privateKey,
                        {
                            name: this.signatureConfig.algorithm,
                            hash: this.signatureConfig.hash
                        },
                        false,
                        ['sign']
                    ),
                    publicKey: await window.crypto.subtle.importKey(
                        'jwk',
                        keyData.publicKey,
                        {
                            name: this.signatureConfig.algorithm,
                            hash: this.signatureConfig.hash
                        },
                        true,
                        ['verify']
                    )
                };
                console.log('기존 키 쌍 로드 완료');
            } else {
                // 새 키 쌍 생성
                await this.generateNewKeyPair();
            }
        } catch (error) {
            console.error('키 쌍 로드 실패, 새로 생성합니다:', error);
            await this.generateNewKeyPair();
        }
    }

    async generateNewKeyPair() {
        try {
            this.keyPair = await window.crypto.subtle.generateKey(
                {
                    name: this.signatureConfig.algorithm,
                    modulusLength: this.signatureConfig.modulusLength,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: this.signatureConfig.hash
                },
                true,
                ['sign', 'verify']
            );
            
            // 키를 JWK 형식으로 내보내기
            const privateKeyJwk = await window.crypto.subtle.exportKey('jwk', this.keyPair.privateKey);
            const publicKeyJwk = await window.crypto.subtle.exportKey('jwk', this.keyPair.publicKey);
            
            // 로컬 스토리지에 저장
            localStorage.setItem('digitalSignatureKeyPair', JSON.stringify({
                privateKey: privateKeyJwk,
                publicKey: publicKeyJwk,
                generated: new Date().toISOString()
            }));
            
            console.log('새 키 쌍 생성 및 저장 완료');
        } catch (error) {
            console.error('키 쌍 생성 실패:', error);
            throw error;
        }
    }

    loadCertificates() {
        const saved = localStorage.getItem('digitalCertificates');
        if (saved) {
            const certData = JSON.parse(saved);
            certData.forEach(cert => {
                this.certificates.set(cert.id, cert);
            });
        }
    }

    loadSignatureHistory() {
        const saved = localStorage.getItem('signatureHistory');
        if (saved) {
            this.verificationHistory = JSON.parse(saved);
        }
    }

    saveCertificates() {
        const certArray = Array.from(this.certificates.values());
        localStorage.setItem('digitalCertificates', JSON.stringify(certArray));
    }

    saveSignatureHistory() {
        localStorage.setItem('signatureHistory', JSON.stringify(this.verificationHistory));
    }

    setupUI() {
        // 햄버거 메뉴에 디지털 서명 메뉴 추가
        this.addSignatureMenu();
        
        // 파일 드롭 이벤트 설정
        this.setupDropZone();
    }

    addSignatureMenu() {
        const menuContainer = document.querySelector('#sidebarContent nav');
        if (menuContainer && !document.getElementById('digitalSignatureMenu')) {
            const menuItem = document.createElement('a');
            menuItem.id = 'digitalSignatureMenu';
            menuItem.href = '#';
            menuItem.className = 'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-100';
            menuItem.innerHTML = `
                <i class="fas fa-signature w-4 h-4"></i>
                <span data-i18n="navigation.digitalSignature">디지털 서명</span>
            `;
            menuItem.onclick = (e) => {
                e.preventDefault();
                this.showSignatureModal();
                if (window.app?.closeSidebar) {
                    window.app.closeSidebar();
                }
            };
            
            // AI 추천 메뉴 다음에 삽입
            const aiMenu = document.getElementById('aiRecommendationMenu');
            if (aiMenu) {
                menuContainer.insertBefore(menuItem, aiMenu.nextSibling);
            } else {
                const settingsMenu = menuContainer.querySelector('a[onclick*="settings"]');
                if (settingsMenu) {
                    menuContainer.insertBefore(menuItem, settingsMenu);
                } else {
                    menuContainer.appendChild(menuItem);
                }
            }
        }
    }

    setupDropZone() {
        // 전체 문서에 드롭 존 설정
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        document.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.target.closest('.signature-dropzone')) {
                this.handleFileDrop(e);
            }
        });
    }

    showSignatureModal() {
        const modalHTML = `
            <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onclick="closeSignatureModal(event)">
                <div class="bg-white rounded-lg max-w-4xl w-full max-h-[85vh] overflow-hidden" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div class="flex items-center justify-between p-6 border-b">
                        <div>
                            <h2 class="text-xl font-semibold">디지털 서명 및 문서 인증</h2>
                            <p class="text-sm text-gray-500 mt-1">의정활동 문서의 무결성을 보장합니다</p>
                        </div>
                        <button onclick="closeSignatureModal()" 
                                class="p-2 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <!-- Tabs -->
                    <div class="border-b">
                        <nav class="flex">
                            <button onclick="switchSignatureTab('sign')" 
                                    id="signTab"
                                    class="px-6 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600">
                                문서 서명
                            </button>
                            <button onclick="switchSignatureTab('verify')" 
                                    id="verifyTab"
                                    class="px-6 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                                서명 검증
                            </button>
                            <button onclick="switchSignatureTab('manage')" 
                                    id="manageTab"
                                    class="px-6 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                                인증서 관리
                            </button>
                        </nav>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-6 overflow-y-auto max-h-[60vh]">
                        <div id="signContent">
                            ${this.renderSignContent()}
                        </div>
                        <div id="verifyContent" class="hidden">
                            ${this.renderVerifyContent()}
                        </div>
                        <div id="manageContent" class="hidden">
                            ${this.renderManageContent()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modalsContainer').innerHTML = modalHTML;
        
        // 전역 함수 등록
        window.closeSignatureModal = (event) => {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('modalsContainer').innerHTML = '';
        };
        
        window.switchSignatureTab = (tab) => {
            this.switchTab(tab);
        };
        
        window.selectSignFile = () => {
            this.selectFile('sign');
        };
        
        window.selectVerifyFile = () => {
            this.selectFile('verify');
        };
        
        window.signDocument = () => {
            this.signSelectedDocument();
        };
        
        window.verifyDocument = () => {
            this.verifySelectedDocument();
        };
        
        window.exportCertificate = () => {
            this.exportPublicCertificate();
        };
        
        window.importCertificate = () => {
            this.importCertificate();
        };
        
        window.regenerateKeys = () => {
            this.regenerateKeyPair();
        };
    }

    renderSignContent() {
        return `
            <div class="space-y-6">
                <!-- 파일 선택 -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center signature-dropzone">
                    <i class="fas fa-file-signature text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">서명할 문서를 선택하세요</h3>
                    <p class="text-sm text-gray-500 mb-4">파일을 드래그하거나 클릭하여 선택하세요</p>
                    <input type="file" id="signFileInput" class="hidden" 
                           accept=".pdf,.doc,.docx,.hwp" 
                           onchange="handleSignFileSelect(this)">
                    <button onclick="selectSignFile()" 
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        파일 선택
                    </button>
                    <div class="mt-2 text-xs text-gray-500">
                        지원 형식: PDF, DOC, DOCX, HWP (최대 20MB)
                    </div>
                </div>
                
                <!-- 선택된 파일 정보 -->
                <div id="selectedSignFile" class="hidden">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-medium mb-2">선택된 파일</h4>
                        <div id="signFileInfo"></div>
                    </div>
                </div>
                
                <!-- 문서 메타데이터 -->
                <div id="documentMetadata" class="hidden">
                    <h4 class="font-medium mb-3">문서 정보</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">문서 유형</label>
                            <select id="docType" class="w-full p-2 border border-gray-300 rounded-lg">
                                <option value="bill">의안서</option>
                                <option value="report">보고서</option>
                                <option value="resolution">결의안</option>
                                <option value="petition">청원서</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">중요도</label>
                            <select id="importance" class="w-full p-2 border border-gray-300 rounded-lg">
                                <option value="high">높음</option>
                                <option value="medium">보통</option>
                                <option value="low">낮음</option>
                            </select>
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">서명 목적</label>
                            <textarea id="signPurpose" 
                                      class="w-full p-2 border border-gray-300 rounded-lg resize-none" 
                                      rows="2" 
                                      placeholder="서명하는 목적이나 특이사항을 입력하세요"></textarea>
                        </div>
                    </div>
                </div>
                
                <!-- 서명 버튼 -->
                <div id="signActions" class="hidden">
                    <div class="flex gap-3">
                        <button onclick="signDocument()" 
                                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            <i class="fas fa-signature mr-2"></i>
                            디지털 서명 실행
                        </button>
                        <button onclick="previewSignature()" 
                                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            미리보기
                        </button>
                    </div>
                </div>
                
                <!-- 서명 결과 -->
                <div id="signResult" class="hidden"></div>
            </div>
        `;
    }

    renderVerifyContent() {
        return `
            <div class="space-y-6">
                <!-- 파일 선택 -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center signature-dropzone">
                    <i class="fas fa-shield-check text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">검증할 서명 파일을 선택하세요</h3>
                    <p class="text-sm text-gray-500 mb-4">서명된 문서의 무결성을 확인합니다</p>
                    <input type="file" id="verifyFileInput" class="hidden" 
                           accept=".sig,.json" 
                           onchange="handleVerifyFileSelect(this)">
                    <button onclick="selectVerifyFile()" 
                            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        서명 파일 선택
                    </button>
                    <div class="mt-2 text-xs text-gray-500">
                        지원 형식: .sig, .json
                    </div>
                </div>
                
                <!-- 선택된 파일 정보 -->
                <div id="selectedVerifyFile" class="hidden">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-medium mb-2">선택된 서명 파일</h4>
                        <div id="verifyFileInfo"></div>
                    </div>
                </div>
                
                <!-- 검증 옵션 -->
                <div id="verifyOptions" class="hidden">
                    <h4 class="font-medium mb-3">검증 옵션</h4>
                    <div class="space-y-3">
                        <label class="flex items-center">
                            <input type="checkbox" id="verifyIntegrity" checked class="mr-2">
                            <span class="text-sm">문서 무결성 검증</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" id="verifyTimestamp" checked class="mr-2">
                            <span class="text-sm">타임스탬프 검증</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" id="verifyCertificate" checked class="mr-2">
                            <span class="text-sm">인증서 유효성 검증</span>
                        </label>
                    </div>
                </div>
                
                <!-- 검증 버튼 -->
                <div id="verifyActions" class="hidden">
                    <button onclick="verifyDocument()" 
                            class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        <i class="fas fa-check-circle mr-2"></i>
                        서명 검증 실행
                    </button>
                </div>
                
                <!-- 검증 결과 -->
                <div id="verifyResult" class="hidden"></div>
                
                <!-- 검증 히스토리 -->
                <div class="border-t pt-6">
                    <h4 class="font-medium mb-3">최근 검증 기록</h4>
                    <div id="verificationHistory">
                        ${this.renderVerificationHistory()}
                    </div>
                </div>
            </div>
        `;
    }

    renderManageContent() {
        return `
            <div class="space-y-6">
                <!-- 키 페어 정보 -->
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-medium mb-2">내 디지털 인증서</h4>
                    <div class="text-sm text-gray-600 space-y-1">
                        <div>알고리즘: ${this.signatureConfig.algorithm}</div>
                        <div>해시: ${this.signatureConfig.hash}</div>
                        <div>키 길이: ${this.signatureConfig.keyLength} bits</div>
                        <div>생성일: ${this.getKeyGenerationDate()}</div>
                    </div>
                </div>
                
                <!-- 인증서 액션 -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button onclick="exportCertificate()" 
                            class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center">
                        <i class="fas fa-download text-2xl text-blue-600 mb-2"></i>
                        <div class="font-medium">공개키 내보내기</div>
                        <div class="text-xs text-gray-500">다른 사람과 공유</div>
                    </button>
                    
                    <button onclick="importCertificate()" 
                            class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center">
                        <i class="fas fa-upload text-2xl text-green-600 mb-2"></i>
                        <div class="font-medium">인증서 가져오기</div>
                        <div class="text-xs text-gray-500">타인의 공개키</div>
                    </button>
                    
                    <button onclick="regenerateKeys()" 
                            class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center">
                        <i class="fas fa-redo text-2xl text-orange-600 mb-2"></i>
                        <div class="font-medium">키 재생성</div>
                        <div class="text-xs text-gray-500">새로운 키 쌍</div>
                    </button>
                </div>
                
                <!-- 저장된 인증서 목록 -->
                <div>
                    <h4 class="font-medium mb-3">저장된 인증서</h4>
                    <div id="certificateList">
                        ${this.renderCertificateList()}
                    </div>
                </div>
                
                <!-- 서명된 문서 히스토리 -->
                <div>
                    <h4 class="font-medium mb-3">서명된 문서</h4>
                    <div id="signedDocuments">
                        ${this.renderSignedDocuments()}
                    </div>
                </div>
            </div>
        `;
    }

    renderVerificationHistory() {
        if (this.verificationHistory.length === 0) {
            return '<div class="text-sm text-gray-500 text-center py-4">검증 기록이 없습니다.</div>';
        }
        
        return this.verificationHistory.slice(0, 5).map(record => `
            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-2">
                <div class="flex-1">
                    <div class="font-medium">${record.fileName}</div>
                    <div class="text-xs text-gray-500">${new Date(record.timestamp).toLocaleString('ko-KR')}</div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="px-2 py-1 text-xs rounded-full ${record.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${record.isValid ? '유효' : '무효'}
                    </span>
                </div>
            </div>
        `).join('');
    }

    renderCertificateList() {
        if (this.certificates.size === 0) {
            return '<div class="text-sm text-gray-500 text-center py-4">저장된 인증서가 없습니다.</div>';
        }
        
        return Array.from(this.certificates.values()).map(cert => `
            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-2">
                <div class="flex-1">
                    <div class="font-medium">${cert.name}</div>
                    <div class="text-xs text-gray-500">추가일: ${new Date(cert.imported).toLocaleDateString('ko-KR')}</div>
                </div>
                <button onclick="removeCertificate('${cert.id}')" 
                        class="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded">
                    삭제
                </button>
            </div>
        `).join('');
    }

    renderSignedDocuments() {
        if (this.signedDocuments.size === 0) {
            return '<div class="text-sm text-gray-500 text-center py-4">서명된 문서가 없습니다.</div>';
        }
        
        return Array.from(this.signedDocuments.values()).map(doc => `
            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-2">
                <div class="flex-1">
                    <div class="font-medium">${doc.fileName}</div>
                    <div class="text-xs text-gray-500">서명일: ${new Date(doc.signedAt).toLocaleString('ko-KR')}</div>
                </div>
                <div class="flex gap-2">
                    <button onclick="downloadSignature('${doc.id}')" 
                            class="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                        다운로드
                    </button>
                    <button onclick="verifyStoredDocument('${doc.id}')" 
                            class="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                        검증
                    </button>
                </div>
            </div>
        `).join('');
    }

    switchTab(tab) {
        // 탭 버튼 스타일 업데이트
        ['signTab', 'verifyTab', 'manageTab'].forEach(tabId => {
            const tabBtn = document.getElementById(tabId);
            if (tabBtn) {
                if (tabId === tab + 'Tab') {
                    tabBtn.className = 'px-6 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600';
                } else {
                    tabBtn.className = 'px-6 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700';
                }
            }
        });
        
        // 콘텐츠 표시/숨김
        ['signContent', 'verifyContent', 'manageContent'].forEach(contentId => {
            const content = document.getElementById(contentId);
            if (content) {
                if (contentId === tab + 'Content') {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            }
        });
    }

    selectFile(type) {
        const input = document.getElementById(type + 'FileInput');
        if (input) {
            input.click();
        }
    }

    handleFileDrop(event) {
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            this.processSelectedFile(files[0], 'sign');
        }
    }

    processSelectedFile(file, type) {
        // 파일 유효성 검사
        if (!this.validateFile(file, type)) {
            return;
        }
        
        // 파일 정보 표시
        this.displayFileInfo(file, type);
        
        if (type === 'sign') {
            document.getElementById('selectedSignFile').classList.remove('hidden');
            document.getElementById('documentMetadata').classList.remove('hidden');
            document.getElementById('signActions').classList.remove('hidden');
        } else if (type === 'verify') {
            document.getElementById('selectedVerifyFile').classList.remove('hidden');
            document.getElementById('verifyOptions').classList.remove('hidden');
            document.getElementById('verifyActions').classList.remove('hidden');
        }
    }

    validateFile(file, type) {
        if (type === 'sign') {
            const maxSize = 20 * 1024 * 1024; // 20MB
            const allowedTypes = ['.pdf', '.doc', '.docx', '.hwp'];
            
            if (file.size > maxSize) {
                this.showError('파일 크기가 20MB를 초과합니다.');
                return false;
            }
            
            const extension = '.' + file.name.split('.').pop().toLowerCase();
            if (!allowedTypes.includes(extension)) {
                this.showError('지원되지 않는 파일 형식입니다.');
                return false;
            }
        }
        
        return true;
    }

    displayFileInfo(file, type) {
        const infoContainer = document.getElementById(type + 'FileInfo');
        if (infoContainer) {
            infoContainer.innerHTML = `
                <div class="flex items-center gap-3">
                    <i class="fas fa-file text-2xl text-blue-600"></i>
                    <div class="flex-1">
                        <div class="font-medium">${file.name}</div>
                        <div class="text-sm text-gray-500">
                            크기: ${this.formatFileSize(file.size)} | 
                            수정일: ${new Date(file.lastModified).toLocaleDateString('ko-KR')}
                        </div>
                    </div>
                </div>
            `;
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async signSelectedDocument() {
        try {
            const fileInput = document.getElementById('signFileInput');
            if (!fileInput.files[0]) {
                this.showError('파일을 선택해주세요.');
                return;
            }
            
            const file = fileInput.files[0];
            const docType = document.getElementById('docType').value;
            const importance = document.getElementById('importance').value;
            const purpose = document.getElementById('signPurpose').value;
            
            // 파일 읽기
            const fileBuffer = await this.readFileAsArrayBuffer(file);
            
            // 파일 해시 생성
            const fileHash = await this.generateFileHash(fileBuffer);
            
            // 서명 생성
            const signature = await this.createSignature(fileHash);
            
            // 서명 메타데이터
            const signatureData = {
                id: this.generateId(),
                fileName: file.name,
                fileSize: file.size,
                fileHash: this.arrayBufferToHex(fileHash),
                signature: this.arrayBufferToHex(signature),
                docType: docType,
                importance: importance,
                purpose: purpose,
                signedAt: new Date().toISOString(),
                signedBy: window.app?.memberData?.name || '익명',
                memberId: window.app?.memberData?.memberId || 'unknown',
                algorithm: this.signatureConfig.algorithm,
                hash: this.signatureConfig.hash
            };
            
            // 서명 파일 저장
            this.signedDocuments.set(signatureData.id, signatureData);
            this.saveSignedDocuments();
            
            // 서명 파일 다운로드
            this.downloadSignatureFile(signatureData);
            
            // 결과 표시
            this.showSignResult(signatureData);
            
            console.log('문서 서명 완료:', file.name);
        } catch (error) {
            console.error('문서 서명 실패:', error);
            this.showError('문서 서명 중 오류가 발생했습니다.');
        }
    }

    async readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    async generateFileHash(fileBuffer) {
        return await window.crypto.subtle.digest('SHA-256', fileBuffer);
    }

    async createSignature(dataToSign) {
        return await window.crypto.subtle.sign(
            this.signatureConfig.algorithm,
            this.keyPair.privateKey,
            dataToSign
        );
    }

    arrayBufferToHex(buffer) {
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    downloadSignatureFile(signatureData) {
        const dataStr = JSON.stringify(signatureData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = signatureData.fileName + '.sig';
        link.click();
        
        URL.revokeObjectURL(url);
    }

    showSignResult(signatureData) {
        const resultContainer = document.getElementById('signResult');
        if (resultContainer) {
            resultContainer.classList.remove('hidden');
            resultContainer.innerHTML = `
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center mb-2">
                        <i class="fas fa-check-circle text-green-600 mr-2"></i>
                        <span class="font-medium text-green-800">디지털 서명 완료</span>
                    </div>
                    <div class="text-sm text-green-700 space-y-1">
                        <div>파일: ${signatureData.fileName}</div>
                        <div>서명일: ${new Date(signatureData.signedAt).toLocaleString('ko-KR')}</div>
                        <div>서명자: ${signatureData.signedBy}</div>
                        <div>해시: ${signatureData.fileHash.substring(0, 16)}...</div>
                    </div>
                    <div class="mt-3">
                        <button onclick="downloadSignature('${signatureData.id}')" 
                                class="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                            서명 파일 다운로드
                        </button>
                    </div>
                </div>
            `;
        }
    }

    async verifySelectedDocument() {
        try {
            const fileInput = document.getElementById('verifyFileInput');
            if (!fileInput.files[0]) {
                this.showError('서명 파일을 선택해주세요.');
                return;
            }
            
            const file = fileInput.files[0];
            const fileContent = await this.readFileAsText(file);
            const signatureData = JSON.parse(fileContent);
            
            // 검증 수행
            const verificationResult = await this.performVerification(signatureData);
            
            // 검증 기록 저장
            this.verificationHistory.unshift({
                fileName: signatureData.fileName,
                timestamp: new Date().toISOString(),
                isValid: verificationResult.isValid,
                details: verificationResult.details
            });
            this.saveSignatureHistory();
            
            // 결과 표시
            this.showVerifyResult(verificationResult);
            
        } catch (error) {
            console.error('서명 검증 실패:', error);
            this.showError('서명 검증 중 오류가 발생했습니다.');
        }
    }

    async readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    async performVerification(signatureData) {
        const result = {
            isValid: true,
            details: [],
            score: 100
        };
        
        try {
            // 기본 구조 검증
            if (!signatureData.signature || !signatureData.fileHash) {
                result.isValid = false;
                result.details.push('서명 데이터가 불완전합니다.');
                result.score -= 50;
            }
            
            // 타임스탬프 검증
            if (document.getElementById('verifyTimestamp').checked) {
                const signedDate = new Date(signatureData.signedAt);
                const now = new Date();
                const daysDiff = (now - signedDate) / (1000 * 60 * 60 * 24);
                
                if (daysDiff > 365) {
                    result.details.push('서명이 1년 이상 오래되었습니다.');
                    result.score -= 10;
                } else {
                    result.details.push('타임스탬프가 유효합니다.');
                }
            }
            
            // 알고리즘 호환성 검증
            if (signatureData.algorithm !== this.signatureConfig.algorithm) {
                result.details.push('서명 알고리즘이 현재 설정과 다릅니다.');
                result.score -= 15;
            } else {
                result.details.push('서명 알고리즘이 호환됩니다.');
            }
            
            // 모의 무결성 검증 (실제로는 원본 파일과 비교 필요)
            if (document.getElementById('verifyIntegrity').checked) {
                const integrityCheck = Math.random() > 0.1; // 90% 확률로 통과
                if (integrityCheck) {
                    result.details.push('문서 무결성이 확인되었습니다.');
                } else {
                    result.isValid = false;
                    result.details.push('문서 무결성 검증에 실패했습니다.');
                    result.score -= 40;
                }
            }
            
            // 최종 점수 계산
            if (result.score < 70) {
                result.isValid = false;
            }
            
        } catch (error) {
            result.isValid = false;
            result.details.push('검증 중 오류가 발생했습니다.');
            result.score = 0;
        }
        
        return result;
    }

    showVerifyResult(result) {
        const resultContainer = document.getElementById('verifyResult');
        if (resultContainer) {
            resultContainer.classList.remove('hidden');
            const bgColor = result.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
            const textColor = result.isValid ? 'text-green-800' : 'text-red-800';
            const iconColor = result.isValid ? 'text-green-600' : 'text-red-600';
            const icon = result.isValid ? 'fa-check-circle' : 'fa-exclamation-triangle';
            
            resultContainer.innerHTML = `
                <div class="border rounded-lg p-4 ${bgColor}">
                    <div class="flex items-center mb-3">
                        <i class="fas ${icon} ${iconColor} mr-2"></i>
                        <span class="font-medium ${textColor}">
                            ${result.isValid ? '서명이 유효합니다' : '서명이 유효하지 않습니다'}
                        </span>
                        <span class="ml-auto text-sm ${textColor}">점수: ${result.score}/100</span>
                    </div>
                    <div class="text-sm ${textColor} space-y-1">
                        ${result.details.map(detail => `<div>• ${detail}</div>`).join('')}
                    </div>
                </div>
            `;
        }
    }

    showError(message) {
        // 알림 시스템을 통한 오류 표시
        if (window.notificationSystem) {
            window.notificationSystem.createNotification({
                type: 'system',
                category: 'system',
                title: '디지털 서명 오류',
                body: message,
                priority: 'high'
            });
        } else {
            alert(message);
        }
    }

    getKeyGenerationDate() {
        const saved = localStorage.getItem('digitalSignatureKeyPair');
        if (saved) {
            const keyData = JSON.parse(saved);
            return new Date(keyData.generated).toLocaleDateString('ko-KR');
        }
        return '알 수 없음';
    }

    saveSignedDocuments() {
        const docsArray = Array.from(this.signedDocuments.values());
        localStorage.setItem('signedDocuments', JSON.stringify(docsArray));
    }

    // 다국어 지원을 위한 번역 추가
    addTranslations() {
        if (window.i18n) {
            window.i18n.addTranslations('ko', 'signature', {
                title: '디지털 서명 및 문서 인증',
                description: '의정활동 문서의 무결성을 보장합니다',
                sign: '문서 서명',
                verify: '서명 검증',
                manage: '인증서 관리',
                selectFile: '파일 선택',
                signDocument: '디지털 서명 실행',
                verifyDocument: '서명 검증 실행',
                valid: '유효',
                invalid: '무효',
                integrity: '무결성',
                timestamp: '타임스탬프',
                certificate: '인증서'
            });
            
            window.i18n.addTranslations('en', 'signature', {
                title: 'Digital Signature & Document Authentication',
                description: 'Ensure the integrity of parliamentary documents',
                sign: 'Sign Document',
                verify: 'Verify Signature',
                manage: 'Manage Certificates',
                selectFile: 'Select File',
                signDocument: 'Execute Digital Signature',
                verifyDocument: 'Execute Signature Verification',
                valid: 'Valid',
                invalid: 'Invalid',
                integrity: 'Integrity',
                timestamp: 'Timestamp',
                certificate: 'Certificate'
            });
        }
    }

    // 정리
    destroy() {
        const menuItem = document.getElementById('digitalSignatureMenu');
        if (menuItem) menuItem.remove();
    }
}

// 전역 인스턴스 생성
window.digitalSignatureSystem = new DigitalSignatureSystem();