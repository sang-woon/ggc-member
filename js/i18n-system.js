// 다국어 지원 시스템 (Internationalization)
// 한국어(ko), 영어(en) 지원

class I18nSystem {
    constructor() {
        this.currentLanguage = 'ko';
        this.fallbackLanguage = 'ko';
        this.translations = new Map();
        this.observers = [];
        this.isInitialized = false;
        
        // 지원 언어 목록
        this.supportedLanguages = {
            ko: {
                name: '한국어',
                nativeName: '한국어',
                flag: '🇰🇷',
                dir: 'ltr',
                dateFormat: 'YYYY년 MM월 DD일',
                timeFormat: 'HH:mm',
                numberFormat: 'ko-KR'
            },
            en: {
                name: 'English',
                nativeName: 'English',
                flag: '🇺🇸',
                dir: 'ltr',
                dateFormat: 'MMM DD, YYYY',
                timeFormat: 'h:mm A',
                numberFormat: 'en-US'
            }
        };

        this.init();
    }

    async init() {
        try {
            // 저장된 언어 설정 로드
            this.loadLanguagePreference();
            
            // 번역 데이터 로드
            await this.loadTranslations();
            
            // UI 설정
            this.setupLanguageUI();
            
            // 현재 언어로 UI 업데이트
            this.updateUI();
            
            this.isInitialized = true;
            console.log('다국어 시스템 초기화 완료:', this.currentLanguage);
        } catch (error) {
            console.error('다국어 시스템 초기화 실패:', error);
        }
    }

    loadLanguagePreference() {
        // 로컬 스토리지에서 언어 설정 로드
        const saved = localStorage.getItem('preferredLanguage');
        if (saved && this.supportedLanguages[saved]) {
            this.currentLanguage = saved;
        } else {
            // 브라우저 언어 감지
            const browserLang = navigator.language.split('-')[0];
            if (this.supportedLanguages[browserLang]) {
                this.currentLanguage = browserLang;
            }
        }
    }

    async loadTranslations() {
        // 번역 데이터 정의 (실제 환경에서는 JSON 파일에서 로드)
        const translations = {
            ko: {
                // 공통
                common: {
                    loading: '로딩 중...',
                    error: '오류',
                    success: '성공',
                    cancel: '취소',
                    confirm: '확인',
                    save: '저장',
                    delete: '삭제',
                    edit: '편집',
                    close: '닫기',
                    search: '검색',
                    refresh: '새로고침',
                    back: '뒤로',
                    next: '다음',
                    previous: '이전',
                    yes: '예',
                    no: '아니오',
                    download: '다운로드',
                    upload: '업로드',
                    print: '인쇄',
                    share: '공유'
                },
                
                // 헤더 및 내비게이션
                navigation: {
                    home: '홈',
                    digitalId: '디지털 의원증',
                    memberInfo: '의원 정보',
                    attendance: '출석 현황',
                    billProposal: '의안 발의',
                    speechRecord: '발언 기록',
                    civilComplaint: '민원 처리',
                    budgetReview: '예산 심사',
                    committeeMembers: '위원회 위원',
                    parliamentOffice: '의회사무처',
                    education: '교육 이수',
                    statistics: '통계 분석',
                    settings: '환경 설정',
                    locationTracking: '위치기반 활동',
                    logout: '로그아웃',
                    menu: '메뉴',
                    notifications: '알림',
                    aiRecommendations: 'AI 추천',
                    digitalSignature: '디지털 서명'
                },
                
                // 메인 페이지
                home: {
                    welcome: '안녕하세요, {name} 의원님',
                    welcomeMessage: '오늘도 활기찬 의정활동 되세요!',
                    attendanceRate: '출석률',
                    billsProposed: '발의 의안',
                    complaintsProcessed: '민원 처리',
                    speechRecords: '발언 기록',
                    monthlyActivity: '월별 의정활동',
                    todaysSchedule: '오늘의 일정',
                    noSchedule: '오늘 예정된 일정이 없습니다.'
                },
                
                // 알림
                notifications: {
                    title: '알림',
                    markAllRead: '모두 읽음',
                    settings: '알림 설정',
                    empty: '새로운 알림이 없습니다.',
                    generalSettings: '일반 설정',
                    pushNotifications: '푸시 알림',
                    sound: '소리',
                    vibration: '진동',
                    categorySettings: '카테고리별 알림',
                    meeting: '회의',
                    bill: '의안',
                    complaint: '민원',
                    schedule: '일정',
                    system: '시스템'
                },
                
                // 음성 어시스턴트
                voice: {
                    title: '음성 어시스턴트',
                    description: '음성 명령으로 앱을 편리하게 사용하세요.',
                    instructions: '오른쪽 하단의 마이크 버튼을 누르거나 길게 눌러서 시작할 수 있습니다.',
                    examples: '예시 명령어:',
                    exampleCommands: '"출석 현황", "의안 발의", "민원 처리", "오늘 일정", "알림 확인"',
                    doNotShowAgain: '다시 보지 않기',
                    listening: '듣고 있습니다...',
                    error: '음성 인식 중 오류가 발생했습니다.'
                },
                
                // QR 스캐너
                qr: {
                    title: 'QR 코드 스캔',
                    instructions: 'QR 코드를 프레임 안에 맞춰주세요',
                    toggleCamera: '카메라 전환',
                    flash: '플래시',
                    memberCardAuth: '본인 인증이 완료되었습니다.',
                    otherMemberCard: '다른 의원의 의원증입니다.',
                    documentVerifying: '문서 {docId} 인증 중...',
                    documentValid: '문서 인증이 완료되었습니다.',
                    documentInvalid: '문서 인증에 실패했습니다.',
                    attendanceChecked: '출석 체크 완료',
                    meetingAttendance: '회의 참석 확인됨',
                    facilityAccess: '접근 권한 확인됨',
                    websiteDetected: '웹사이트 링크가 감지되었습니다.',
                    unsafeLink: '안전하지 않은 링크입니다.',
                    copiedToClipboard: '클립보드에 복사되었습니다.'
                },
                
                // 날짜 및 시간
                datetime: {
                    now: '방금 전',
                    minutesAgo: '{count}분 전',
                    hoursAgo: '{count}시간 전',
                    daysAgo: '{count}일 전',
                    today: '오늘',
                    yesterday: '어제',
                    tomorrow: '내일',
                    thisWeek: '이번 주',
                    thisMonth: '이번 달',
                    thisYear: '올해'
                },
                
                // 설정
                settings: {
                    title: '환경 설정',
                    language: '언어',
                    notifications: '알림 설정',
                    privacy: '개인정보',
                    about: '앱 정보',
                    version: '버전',
                    developer: '개발자',
                    support: '지원',
                    feedback: '피드백'
                }
            },
            
            en: {
                // Common
                common: {
                    loading: 'Loading...',
                    error: 'Error',
                    success: 'Success',
                    cancel: 'Cancel',
                    confirm: 'Confirm',
                    save: 'Save',
                    delete: 'Delete',
                    edit: 'Edit',
                    close: 'Close',
                    search: 'Search',
                    refresh: 'Refresh',
                    back: 'Back',
                    next: 'Next',
                    previous: 'Previous',
                    yes: 'Yes',
                    no: 'No',
                    download: 'Download',
                    upload: 'Upload',
                    print: 'Print',
                    share: 'Share'
                },
                
                // Header and navigation
                navigation: {
                    home: 'Home',
                    digitalId: 'Digital ID Card',
                    memberInfo: 'Member Info',
                    attendance: 'Attendance',
                    billProposal: 'Bill Proposal',
                    speechRecord: 'Speech Record',
                    civilComplaint: 'Civil Complaints',
                    budgetReview: 'Budget Review',
                    committeeMembers: 'Committee Members',
                    parliamentOffice: 'Parliament Office',
                    education: 'Education',
                    statistics: 'Statistics',
                    settings: 'Settings',
                    locationTracking: 'Location Activity',
                    logout: 'Logout',
                    menu: 'Menu',
                    notifications: 'Notifications',
                    aiRecommendations: 'AI Recommendations',
                    digitalSignature: 'Digital Signature'
                },
                
                // Home page
                home: {
                    welcome: 'Hello, Representative {name}',
                    welcomeMessage: 'Have a productive day in parliament!',
                    attendanceRate: 'Attendance Rate',
                    billsProposed: 'Bills Proposed',
                    complaintsProcessed: 'Complaints Processed',
                    speechRecords: 'Speech Records',
                    monthlyActivity: 'Monthly Activity',
                    todaysSchedule: "Today's Schedule",
                    noSchedule: 'No events scheduled for today.'
                },
                
                // Notifications
                notifications: {
                    title: 'Notifications',
                    markAllRead: 'Mark All Read',
                    settings: 'Notification Settings',
                    empty: 'No new notifications.',
                    generalSettings: 'General Settings',
                    pushNotifications: 'Push Notifications',
                    sound: 'Sound',
                    vibration: 'Vibration',
                    categorySettings: 'Category Settings',
                    meeting: 'Meetings',
                    bill: 'Bills',
                    complaint: 'Complaints',
                    schedule: 'Schedule',
                    system: 'System'
                },
                
                // Voice assistant
                voice: {
                    title: 'Voice Assistant',
                    description: 'Use voice commands to navigate the app conveniently.',
                    instructions: 'Tap or long-press the microphone button in the bottom right corner to start.',
                    examples: 'Example commands:',
                    exampleCommands: '"Attendance", "Bill Proposal", "Civil Complaints", "Today\'s Schedule", "Notifications"',
                    doNotShowAgain: "Don't Show Again",
                    listening: 'Listening...',
                    error: 'Voice recognition error occurred.'
                },
                
                // QR Scanner
                qr: {
                    title: 'QR Code Scanner',
                    instructions: 'Align the QR code within the frame',
                    toggleCamera: 'Switch Camera',
                    flash: 'Flash',
                    memberCardAuth: 'Member authentication completed.',
                    otherMemberCard: 'This is another member\'s ID card.',
                    documentVerifying: 'Verifying document {docId}...',
                    documentValid: 'Document verification completed.',
                    documentInvalid: 'Document verification failed.',
                    attendanceChecked: 'Attendance checked',
                    meetingAttendance: 'Meeting attendance confirmed',
                    facilityAccess: 'Access authorized',
                    websiteDetected: 'Website link detected.',
                    unsafeLink: 'Unsafe link detected.',
                    copiedToClipboard: 'Copied to clipboard.'
                },
                
                // Date and time
                datetime: {
                    now: 'Just now',
                    minutesAgo: '{count} minutes ago',
                    hoursAgo: '{count} hours ago',
                    daysAgo: '{count} days ago',
                    today: 'Today',
                    yesterday: 'Yesterday',
                    tomorrow: 'Tomorrow',
                    thisWeek: 'This week',
                    thisMonth: 'This month',
                    thisYear: 'This year'
                },
                
                // Settings
                settings: {
                    title: 'Settings',
                    language: 'Language',
                    notifications: 'Notifications',
                    privacy: 'Privacy',
                    about: 'About',
                    version: 'Version',
                    developer: 'Developer',
                    support: 'Support',
                    feedback: 'Feedback'
                }
            }
        };

        // 번역 데이터 저장
        for (const [lang, data] of Object.entries(translations)) {
            this.translations.set(lang, data);
        }
    }

    setupLanguageUI() {
        // 헤더에 언어 선택 버튼 추가
        this.addLanguageSelector();
    }

    addLanguageSelector() {
        const header = document.querySelector('header .flex');
        if (header && !document.getElementById('languageSelector')) {
            const langBtn = document.createElement('button');
            langBtn.id = 'languageSelector';
            langBtn.className = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9';
            langBtn.title = 'Language / 언어';
            langBtn.onclick = () => this.showLanguageModal();
            
            // 현재 언어 플래그 표시
            const currentLang = this.supportedLanguages[this.currentLanguage];
            langBtn.innerHTML = `<span class="text-lg">${currentLang.flag}</span>`;
            
            // QR 스캔 버튼 앞에 삽입
            const qrBtn = document.getElementById('qrScanButton');
            if (qrBtn) {
                header.insertBefore(langBtn, qrBtn);
            } else {
                // 알림 버튼 앞에 삽입
                const notificationBtn = header.querySelector('button:last-child');
                header.insertBefore(langBtn, notificationBtn);
            }
        }
    }

    showLanguageModal() {
        const modalHTML = `
            <div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onclick="closeLanguageModal(event)">
                <div class="bg-white rounded-lg max-w-sm w-full" onclick="event.stopPropagation()">
                    <!-- Header -->
                    <div class="flex items-center justify-between p-4 border-b">
                        <h2 class="text-lg font-semibold">${this.t('settings.language')}</h2>
                        <button onclick="closeLanguageModal()" 
                                class="p-1 hover:bg-gray-100 rounded">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <!-- Language Options -->
                    <div class="p-4 space-y-2">
                        ${Object.entries(this.supportedLanguages).map(([code, lang]) => `
                            <button onclick="changeLanguage('${code}')" 
                                    class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                                        code === this.currentLanguage ? 'bg-blue-50 border border-blue-200' : ''
                                    }">
                                <span class="text-xl">${lang.flag}</span>
                                <div class="flex-1 text-left">
                                    <div class="font-medium">${lang.nativeName}</div>
                                    <div class="text-sm text-gray-500">${lang.name}</div>
                                </div>
                                ${code === this.currentLanguage ? '<i class="fas fa-check text-blue-600"></i>' : ''}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modalsContainer').innerHTML = modalHTML;
        
        // 전역 함수 등록
        window.closeLanguageModal = (event) => {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('modalsContainer').innerHTML = '';
        };
        
        window.changeLanguage = (langCode) => {
            this.setLanguage(langCode);
            window.closeLanguageModal();
        };
    }

    // 언어 변경
    setLanguage(langCode) {
        if (!this.supportedLanguages[langCode]) {
            console.warn('지원되지 않는 언어:', langCode);
            return;
        }

        const oldLanguage = this.currentLanguage;
        this.currentLanguage = langCode;
        
        // 로컬 스토리지에 저장
        localStorage.setItem('preferredLanguage', langCode);
        
        // UI 업데이트
        this.updateUI();
        
        // 언어 선택 버튼 업데이트
        this.updateLanguageButton();
        
        // 관찰자들에게 알림
        this.notifyObservers(oldLanguage, langCode);
        
        console.log('언어 변경:', oldLanguage, '->', langCode);
    }

    updateLanguageButton() {
        const btn = document.getElementById('languageSelector');
        if (btn) {
            const currentLang = this.supportedLanguages[this.currentLanguage];
            btn.innerHTML = `<span class="text-lg">${currentLang.flag}</span>`;
        }
    }

    // UI 전체 업데이트
    updateUI() {
        // data-i18n 속성을 가진 모든 요소 업데이트
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (translation && translation !== key) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // 문서 방향 설정
        const langConfig = this.supportedLanguages[this.currentLanguage];
        document.documentElement.dir = langConfig.dir;
        document.documentElement.lang = this.currentLanguage;
        
        // 폰트 설정 (한국어일 때 Noto Sans KR 우선)
        if (this.currentLanguage === 'ko') {
            document.body.style.fontFamily = "'Noto Sans KR', 'Inter', sans-serif";
        } else {
            document.body.style.fontFamily = "'Inter', 'Noto Sans KR', sans-serif";
        }
    }

    // 번역 함수
    t(key, params = {}) {
        const translations = this.translations.get(this.currentLanguage) || 
                           this.translations.get(this.fallbackLanguage);
        
        if (!translations) return key;
        
        // 중첩된 키 지원 (예: 'home.welcome')
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // 키를 찾을 수 없으면 원본 키 반환
            }
        }
        
        if (typeof value !== 'string') return key;
        
        // 매개변수 치환
        return this.interpolate(value, params);
    }

    // 문자열 보간
    interpolate(text, params) {
        if (!params || Object.keys(params).length === 0) return text;
        
        return text.replace(/\{(\w+)\}/g, (match, key) => {
            return params.hasOwnProperty(key) ? params[key] : match;
        });
    }

    // 날짜 포맷팅
    formatDate(date, format = 'short') {
        const langConfig = this.supportedLanguages[this.currentLanguage];
        const options = {};
        
        switch (format) {
            case 'short':
                options.year = 'numeric';
                options.month = 'short';
                options.day = 'numeric';
                break;
            case 'long':
                options.year = 'numeric';
                options.month = 'long';
                options.day = 'numeric';
                options.weekday = 'long';
                break;
            case 'time':
                options.hour = '2-digit';
                options.minute = '2-digit';
                if (this.currentLanguage === 'en') {
                    options.hour12 = true;
                }
                break;
            case 'datetime':
                options.year = 'numeric';
                options.month = 'short';
                options.day = 'numeric';
                options.hour = '2-digit';
                options.minute = '2-digit';
                if (this.currentLanguage === 'en') {
                    options.hour12 = true;
                }
                break;
        }
        
        return new Intl.DateTimeFormat(langConfig.numberFormat, options).format(date);
    }

    // 숫자 포맷팅
    formatNumber(number, format = 'decimal') {
        const langConfig = this.supportedLanguages[this.currentLanguage];
        
        switch (format) {
            case 'percent':
                return new Intl.NumberFormat(langConfig.numberFormat, {
                    style: 'percent'
                }).format(number / 100);
            case 'currency':
                return new Intl.NumberFormat(langConfig.numberFormat, {
                    style: 'currency',
                    currency: 'KRW'
                }).format(number);
            default:
                return new Intl.NumberFormat(langConfig.numberFormat).format(number);
        }
    }

    // 상대 시간 표시
    getRelativeTime(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) {
            return this.t('datetime.now');
        } else if (minutes < 60) {
            return this.t('datetime.minutesAgo', { count: minutes });
        } else if (hours < 24) {
            return this.t('datetime.hoursAgo', { count: hours });
        } else {
            return this.t('datetime.daysAgo', { count: days });
        }
    }

    // 관찰자 패턴
    addObserver(callback) {
        this.observers.push(callback);
    }

    removeObserver(callback) {
        const index = this.observers.indexOf(callback);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers(oldLang, newLang) {
        this.observers.forEach(callback => {
            try {
                callback(oldLang, newLang);
            } catch (error) {
                console.error('다국어 관찰자 콜백 오류:', error);
            }
        });
    }

    // 현재 언어 정보
    getCurrentLanguage() {
        return {
            code: this.currentLanguage,
            ...this.supportedLanguages[this.currentLanguage]
        };
    }

    // 지원 언어 목록
    getSupportedLanguages() {
        return { ...this.supportedLanguages };
    }

    // 다국어 텍스트 동적 추가
    addTranslations(langCode, namespace, translations) {
        if (!this.translations.has(langCode)) {
            this.translations.set(langCode, {});
        }
        
        const langTranslations = this.translations.get(langCode);
        langTranslations[namespace] = { ...langTranslations[namespace], ...translations };
    }

    // HTML 요소에 다국어 속성 추가
    setI18nAttribute(element, key) {
        element.setAttribute('data-i18n', key);
        element.textContent = this.t(key);
    }

    // 정리
    destroy() {
        const btn = document.getElementById('languageSelector');
        if (btn) btn.remove();
        
        this.observers = [];
    }
}

// 전역 인스턴스 생성
window.i18n = new I18nSystem();