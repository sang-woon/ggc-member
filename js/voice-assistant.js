// 음성 검색 및 음성 명령 시스템
// Web Speech API를 활용한 실용적인 음성 기능

class VoiceAssistant {
    constructor() {
        this.recognition = null;
        this.synthesis = null;
        this.isListening = false;
        this.isAvailable = false;
        this.currentLanguage = 'ko-KR';
        this.confidenceThreshold = 0.7;
        
        // 음성 명령 패턴
        this.commands = {
            navigation: {
                patterns: [
                    { regex: /메인|홈|대시보드/i, action: 'home', response: '메인 화면으로 이동합니다.' },
                    { regex: /출석|참석/i, action: 'attendance', response: '출석 현황을 확인합니다.' },
                    { regex: /의원증|신분증|아이디/i, action: 'digital-id', response: '디지털 의원증을 표시합니다.' },
                    { regex: /의안|발의/i, action: 'bill-proposal', response: '의안 발의 현황을 확인합니다.' },
                    { regex: /발언|기록/i, action: 'speech-record', response: '발언 기록을 확인합니다.' },
                    { regex: /민원|민원처리/i, action: 'civil-complaint', response: '민원 처리 현황을 확인합니다.' },
                    { regex: /예산|심사/i, action: 'budget-review', response: '예산 심사 현황을 확인합니다.' },
                    { regex: /통계|분석/i, action: 'statistics', response: '통계 분석을 확인합니다.' },
                    { regex: /설정|환경설정/i, action: 'settings', response: '환경 설정으로 이동합니다.' },
                    { regex: /위치|활동/i, action: 'location-tracking', response: '위치 기반 활동을 확인합니다.' }
                ]
            },
            functionality: {
                patterns: [
                    { regex: /알림|공지/i, action: 'showNotifications', response: '알림을 확인합니다.' },
                    { regex: /메뉴|네비게이션/i, action: 'toggleMenu', response: '메뉴를 열겠습니다.' },
                    { regex: /새로고침|업데이트/i, action: 'refresh', response: '화면을 새로고침합니다.' },
                    { regex: /검색|찾기/i, action: 'search', response: '검색 기능을 실행합니다.' },
                    { regex: /도움말|헬프/i, action: 'help', response: '도움말을 표시합니다.' },
                    { regex: /로그아웃|종료/i, action: 'logout', response: '로그아웃 하시겠습니까?', confirm: true }
                ]
            },
            information: {
                patterns: [
                    { regex: /(오늘|일정|스케줄)/i, action: 'todaySchedule', response: '오늘의 일정을 확인합니다.' },
                    { regex: /(출석률|참석률)/i, action: 'attendanceRate', response: '출석률을 확인합니다.' },
                    { regex: /(의안.*수|발의.*수)/i, action: 'billCount', response: '의안 발의 수를 확인합니다.' },
                    { regex: /(민원.*수|민원.*건수)/i, action: 'complaintCount', response: '민원 처리 건수를 확인합니다.' },
                    { regex: /(시간|지금.*시간)/i, action: 'currentTime', response: null },
                    { regex: /(날씨|기상)/i, action: 'weather', response: '날씨 정보를 확인합니다.' }
                ]
            },
            emergency: {
                patterns: [
                    { regex: /(긴급|응급|비상)/i, action: 'emergency', response: '긴급 상황 프로토콜을 실행합니다.' },
                    { regex: /(문제|오류|에러)/i, action: 'reportIssue', response: '문제 신고 절차를 안내합니다.' }
                ]
            }
        };
        
        // 자주 사용되는 키워드
        this.quickActions = {
            '출석': 'attendance',
            '의안': 'bill-proposal',
            '민원': 'civil-complaint',
            '통계': 'statistics',
            '설정': 'settings'
        };
        
        this.init();
    }

    async init() {
        try {
            // 브라우저 지원 여부 확인
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                console.warn('음성 인식이 지원되지 않는 브라우저입니다.');
                return;
            }

            if (!('speechSynthesis' in window)) {
                console.warn('음성 합성이 지원되지 않는 브라우저입니다.');
                return;
            }

            this.setupSpeechRecognition();
            this.setupSpeechSynthesis();
            this.setupUI();
            this.isAvailable = true;
            
            console.log('음성 어시스턴트 초기화 완료');
            
            // 초기 안내 메시지 (선택적)
            if (localStorage.getItem('voiceIntroShown') !== 'true') {
                setTimeout(() => {
                    this.showVoiceIntroduction();
                }, 2000);
            }
            
        } catch (error) {
            console.error('음성 어시스턴트 초기화 실패:', error);
        }
    }

    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = this.currentLanguage;
        this.recognition.maxAlternatives = 3;

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI();
            console.log('음성 인식 시작');
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateUI();
            console.log('음성 인식 종료');
        };

        this.recognition.onresult = (event) => {
            const results = Array.from(event.results);
            const transcript = results[0][0].transcript;
            const confidence = results[0][0].confidence;
            
            console.log('음성 인식 결과:', transcript, '신뢰도:', confidence);
            
            if (confidence >= this.confidenceThreshold) {
                this.processVoiceCommand(transcript);
            } else {
                this.speak('죄송합니다. 명확하게 들리지 않았습니다. 다시 말씀해 주세요.');
            }
        };

        this.recognition.onerror = (event) => {
            console.error('음성 인식 오류:', event.error);
            this.isListening = false;
            this.updateUI();
            
            let errorMessage = '음성 인식 중 오류가 발생했습니다.';
            switch (event.error) {
                case 'no-speech':
                    errorMessage = '음성이 감지되지 않았습니다.';
                    break;
                case 'audio-capture':
                    errorMessage = '마이크에 접근할 수 없습니다.';
                    break;
                case 'not-allowed':
                    errorMessage = '마이크 권한이 필요합니다.';
                    break;
                case 'network':
                    errorMessage = '네트워크 연결을 확인해주세요.';
                    break;
            }
            
            this.speak(errorMessage);
        };
    }

    setupSpeechSynthesis() {
        this.synthesis = window.speechSynthesis;
        
        // 한국어 음성 선택
        this.getKoreanVoice().then(voice => {
            this.selectedVoice = voice;
        });
    }

    async getKoreanVoice() {
        return new Promise((resolve) => {
            const getVoices = () => {
                const voices = this.synthesis.getVoices();
                const koreanVoice = voices.find(voice => 
                    voice.lang.includes('ko') || voice.name.includes('Korean')
                ) || voices[0];
                resolve(koreanVoice);
            };

            if (this.synthesis.getVoices().length > 0) {
                getVoices();
            } else {
                this.synthesis.onvoiceschanged = getVoices;
            }
        });
    }

    setupUI() {
        // 플로팅 음성 버튼 생성
        if (!document.getElementById('voiceAssistantButton')) {
            const button = document.createElement('button');
            button.id = 'voiceAssistantButton';
            button.className = 'fixed bottom-20 right-4 z-40 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110';
            button.innerHTML = '<i class="fas fa-microphone text-xl"></i>';
            button.onclick = () => this.toggleListening();
            button.title = '음성 명령 (클릭하거나 길게 누르기)';
            
            // 길게 누르기 이벤트
            let longPressTimer;
            
            button.addEventListener('mousedown', () => {
                longPressTimer = setTimeout(() => {
                    this.startListening();
                }, 500);
            });
            
            button.addEventListener('mouseup', () => {
                clearTimeout(longPressTimer);
            });
            
            button.addEventListener('mouseleave', () => {
                clearTimeout(longPressTimer);
            });
            
            // 터치 이벤트
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                longPressTimer = setTimeout(() => {
                    this.startListening();
                }, 500);
            });
            
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                clearTimeout(longPressTimer);
            });
            
            document.body.appendChild(button);
        }

        // 음성 인식 상태 표시
        if (!document.getElementById('voiceStatus')) {
            const status = document.createElement('div');
            status.id = 'voiceStatus';
            status.className = 'fixed bottom-36 right-4 z-40 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-lg hidden';
            status.innerHTML = `
                <div class="flex items-center gap-2">
                    <div class="voice-indicator">
                        <div class="voice-wave"></div>
                        <div class="voice-wave"></div>
                        <div class="voice-wave"></div>
                    </div>
                    <span class="text-sm text-gray-700">듣고 있습니다...</span>
                </div>
            `;
            document.body.appendChild(status);
        }

        // 음성 인식 애니메이션 스타일
        if (!document.getElementById('voiceStyles')) {
            const styles = document.createElement('style');
            styles.id = 'voiceStyles';
            styles.textContent = `
                .voice-indicator {
                    display: flex;
                    gap: 2px;
                    align-items: end;
                    height: 20px;
                }
                
                .voice-wave {
                    width: 3px;
                    background: #3b82f6;
                    border-radius: 2px;
                    animation: voice-wave 1.2s infinite ease-in-out;
                }
                
                .voice-wave:nth-child(2) {
                    animation-delay: 0.1s;
                }
                
                .voice-wave:nth-child(3) {
                    animation-delay: 0.2s;
                }
                
                @keyframes voice-wave {
                    0%, 40%, 100% {
                        height: 8px;
                    }
                    20% {
                        height: 20px;
                    }
                }
                
                .voice-listening {
                    background: #ef4444 !important;
                    animation: pulse 1s infinite;
                }
                
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }

    updateUI() {
        const button = document.getElementById('voiceAssistantButton');
        const status = document.getElementById('voiceStatus');
        
        if (button) {
            if (this.isListening) {
                button.classList.add('voice-listening');
                button.innerHTML = '<i class="fas fa-stop text-xl"></i>';
            } else {
                button.classList.remove('voice-listening');
                button.innerHTML = '<i class="fas fa-microphone text-xl"></i>';
            }
        }
        
        if (status) {
            if (this.isListening) {
                status.classList.remove('hidden');
            } else {
                status.classList.add('hidden');
            }
        }
    }

    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        if (!this.isAvailable || this.isListening) return;
        
        try {
            this.recognition.start();
        } catch (error) {
            console.error('음성 인식 시작 실패:', error);
            this.speak('음성 인식을 시작할 수 없습니다.');
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    processVoiceCommand(transcript) {
        console.log('음성 명령 처리:', transcript);
        
        const normalizedInput = transcript.toLowerCase().trim();
        let commandExecuted = false;

        // 1. 직접 키워드 매칭
        for (const [keyword, action] of Object.entries(this.quickActions)) {
            if (normalizedInput.includes(keyword)) {
                this.executeAction({ action, response: `${keyword} 화면으로 이동합니다.` });
                commandExecuted = true;
                break;
            }
        }

        // 2. 패턴 매칭
        if (!commandExecuted) {
            for (const [category, commands] of Object.entries(this.commands)) {
                for (const command of commands.patterns) {
                    if (command.regex.test(normalizedInput)) {
                        this.executeAction(command, normalizedInput);
                        commandExecuted = true;
                        break;
                    }
                }
                if (commandExecuted) break;
            }
        }

        // 3. 검색 기능
        if (!commandExecuted && normalizedInput.includes('검색')) {
            const searchTerm = normalizedInput.replace(/검색|찾아|찾기/g, '').trim();
            if (searchTerm) {
                this.performSearch(searchTerm);
                commandExecuted = true;
            }
        }

        // 4. 명령어 인식 실패
        if (!commandExecuted) {
            this.handleUnknownCommand(transcript);
        }
    }

    executeAction(command, input = '') {
        console.log('명령 실행:', command);

        // 확인이 필요한 명령어
        if (command.confirm) {
            this.confirmAction(command);
            return;
        }

        if (command.response) {
            this.speak(command.response);
        }

        // 액션 실행
        switch (command.action) {
            // 내비게이션
            case 'home':
            case 'attendance':
            case 'digital-id':
            case 'bill-proposal':
            case 'speech-record':
            case 'civil-complaint':
            case 'budget-review':
            case 'statistics':
            case 'settings':
            case 'location-tracking':
                if (window.app && window.app.navigateTo) {
                    window.app.navigateTo(command.action);
                }
                break;

            // 기능 실행
            case 'showNotifications':
                if (window.showNotificationModal) {
                    window.showNotificationModal();
                }
                break;

            case 'toggleMenu':
                if (window.app && window.app.toggleMenu) {
                    window.app.toggleMenu();
                }
                break;

            case 'refresh':
                window.location.reload();
                break;

            case 'search':
                this.showVoiceSearch();
                break;

            case 'help':
                this.showVoiceHelp();
                break;

            // 정보 조회
            case 'todaySchedule':
                this.provideTodaySchedule();
                break;

            case 'attendanceRate':
                this.provideAttendanceRate();
                break;

            case 'billCount':
                this.provideBillCount();
                break;

            case 'complaintCount':
                this.provideComplaintCount();
                break;

            case 'currentTime':
                this.provideCurrentTime();
                break;

            case 'weather':
                this.provideWeather();
                break;

            // 긴급 상황
            case 'emergency':
                this.handleEmergency();
                break;

            case 'reportIssue':
                this.handleIssueReport();
                break;

            default:
                console.warn('알 수 없는 액션:', command.action);
        }
    }

    confirmAction(command) {
        const confirmMessage = `${command.response} 계속하시겠습니까? "예" 또는 "아니오"라고 말씀해 주세요.`;
        this.speak(confirmMessage);
        
        // 확인 응답 대기
        setTimeout(() => {
            this.waitForConfirmation(command);
        }, 3000);
    }

    waitForConfirmation(command) {
        const originalOnResult = this.recognition.onresult;
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            
            if (transcript.includes('예') || transcript.includes('네') || transcript.includes('확인')) {
                this.speak('확인되었습니다.');
                if (command.action === 'logout' && window.app && window.app.logout) {
                    window.app.logout();
                }
            } else {
                this.speak('취소되었습니다.');
            }
            
            // 원래 핸들러로 복원
            this.recognition.onresult = originalOnResult;
        };
        
        this.startListening();
    }

    performSearch(searchTerm) {
        this.speak(`"${searchTerm}"를 검색합니다.`);
        
        // 실제 검색 로직 구현
        const searchResults = this.searchInApp(searchTerm);
        
        if (searchResults.length > 0) {
            const result = searchResults[0];
            this.speak(`${result.title}을 찾았습니다. 이동하시겠습니까?`);
            
            setTimeout(() => {
                if (window.app && window.app.navigateTo) {
                    window.app.navigateTo(result.page);
                }
            }, 2000);
        } else {
            this.speak(`"${searchTerm}"에 대한 검색 결과를 찾을 수 없습니다.`);
        }
    }

    searchInApp(searchTerm) {
        const searchableContent = [
            { title: '출석 현황', page: 'attendance', keywords: ['출석', '참석', '회의'] },
            { title: '의안 발의', page: 'bill-proposal', keywords: ['의안', '발의', '법안'] },
            { title: '민원 처리', page: 'civil-complaint', keywords: ['민원', '신청', '처리'] },
            { title: '발언 기록', page: 'speech-record', keywords: ['발언', '연설', '기록'] },
            { title: '예산 심사', page: 'budget-review', keywords: ['예산', '심사', '재정'] },
            { title: '통계 분석', page: 'statistics', keywords: ['통계', '분석', '데이터'] }
        ];

        return searchableContent.filter(item => 
            item.keywords.some(keyword => 
                searchTerm.includes(keyword) || keyword.includes(searchTerm)
            )
        );
    }

    // 정보 제공 메서드들
    provideTodaySchedule() {
        const schedule = [
            '오전 10시 기획재정위원회 회의',
            '오후 2시 지역구 현장 방문'
        ];
        
        const message = schedule.length > 0 
            ? `오늘의 일정은 ${schedule.join(', ')} 입니다.`
            : '오늘 예정된 일정이 없습니다.';
            
        this.speak(message);
    }

    provideAttendanceRate() {
        const rate = window.app?.memberData?.attendanceRate?.plenary || 95;
        this.speak(`현재 출석률은 ${rate}퍼센트입니다.`);
    }

    provideBillCount() {
        const count = window.app?.memberData?.bills || 12;
        this.speak(`현재까지 ${count}건의 의안을 발의하셨습니다.`);
    }

    provideComplaintCount() {
        const count = window.app?.memberData?.civilComplaints || 48;
        this.speak(`현재까지 ${count}건의 민원을 처리하셨습니다.`);
    }

    provideCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ko-KR', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        this.speak(`현재 시간은 ${timeString}입니다.`);
    }

    provideWeather() {
        // 실제 환경에서는 날씨 API 연동
        this.speak('현재 날씨 정보를 확인하고 있습니다. 맑음, 기온 22도입니다.');
    }

    handleEmergency() {
        this.speak('긴급 상황이 감지되었습니다. 관련 담당자에게 연락하겠습니다.');
        
        // 실제 환경에서는 긴급 연락처 호출 로직
        if (window.notificationSystem) {
            window.notificationSystem.createNotification({
                type: 'emergency',
                category: 'system',
                title: '긴급 상황 발생',
                body: '음성 어시스턴트를 통해 긴급 상황이 신고되었습니다.',
                priority: 'high'
            });
        }
    }

    handleIssueReport() {
        this.speak('문제를 신고해 주셔서 감사합니다. 기술 지원팀에 연락하겠습니다.');
        
        if (window.notificationSystem) {
            window.notificationSystem.createNotification({
                type: 'system',
                category: 'system',
                title: '기술 문제 신고',
                body: '사용자가 음성을 통해 기술 문제를 신고했습니다.',
                priority: 'medium'
            });
        }
    }

    handleUnknownCommand(transcript) {
        const suggestions = [
            '메인 화면으로 가기',
            '출석 현황 확인',
            '알림 보기',
            '오늘 일정 확인'
        ];
        
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        
        this.speak(`죄송합니다. "${transcript}" 명령을 이해하지 못했습니다. "${randomSuggestion}" 같은 명령을 시도해 보세요.`);
    }

    showVoiceSearch() {
        this.speak('검색어를 말씀해 주세요.');
        
        setTimeout(() => {
            const originalOnResult = this.recognition.onresult;
            
            this.recognition.onresult = (event) => {
                const searchTerm = event.results[0][0].transcript;
                this.performSearch(searchTerm);
                this.recognition.onresult = originalOnResult;
            };
            
            this.startListening();
        }, 1500);
    }

    showVoiceHelp() {
        const helpMessage = `
            음성 명령 도움말입니다. 
            "메인", "출석", "의안", "민원", "통계" 등으로 화면을 이동할 수 있습니다.
            "알림"으로 알림을 확인하고, "오늘 일정"으로 일정을 확인할 수 있습니다.
            "검색"이라고 말한 후 찾고 싶은 내용을 말씀해 주세요.
        `;
        
        this.speak(helpMessage);
    }

    showVoiceIntroduction() {
        const introModal = `
            <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-microphone text-blue-600 text-2xl"></i>
                        </div>
                        <h2 class="text-xl font-bold mb-2">음성 어시스턴트</h2>
                        <p class="text-gray-600 mb-4">
                            음성 명령으로 앱을 편리하게 사용하세요.<br>
                            오른쪽 하단의 마이크 버튼을 누르거나<br>
                            길게 눌러서 시작할 수 있습니다.
                        </p>
                        <div class="text-sm text-gray-500 mb-6">
                            <p><strong>예시 명령어:</strong></p>
                            <p>"출석 현황", "의안 발의", "민원 처리"<br>"오늘 일정", "알림 확인"</p>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="closeVoiceIntro(false)" 
                                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                다시 보지 않기
                            </button>
                            <button onclick="closeVoiceIntro(true)" 
                                    class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const container = document.getElementById('modalsContainer') || document.body;
        container.insertAdjacentHTML('beforeend', introModal);
        
        // 전역 함수로 등록
        window.closeVoiceIntro = (showAgain) => {
            if (!showAgain) {
                localStorage.setItem('voiceIntroShown', 'true');
            }
            document.querySelector('.fixed.inset-0.z-50').remove();
        };
    }

    speak(message) {
        if (!this.synthesis || !message) return;
        
        // 진행 중인 음성 중단
        this.synthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        }
        
        utterance.onerror = (event) => {
            console.error('음성 합성 오류:', event.error);
        };
        
        this.synthesis.speak(utterance);
    }

    // 설정 메서드들
    setLanguage(language) {
        this.currentLanguage = language;
        if (this.recognition) {
            this.recognition.lang = language;
        }
    }

    setConfidenceThreshold(threshold) {
        this.confidenceThreshold = Math.max(0.1, Math.min(1.0, threshold));
    }

    isSupported() {
        return this.isAvailable;
    }

    // 정리
    destroy() {
        if (this.recognition) {
            this.recognition.stop();
        }
        
        if (this.synthesis) {
            this.synthesis.cancel();
        }
        
        // UI 요소 제거
        const button = document.getElementById('voiceAssistantButton');
        const status = document.getElementById('voiceStatus');
        const styles = document.getElementById('voiceStyles');
        
        if (button) button.remove();
        if (status) status.remove();
        if (styles) styles.remove();
    }
}

// 전역 인스턴스 생성
window.voiceAssistant = new VoiceAssistant();