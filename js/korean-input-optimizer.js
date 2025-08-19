// 한글 모바일 입력 최적화 모듈
// Korean Mobile Input Optimization Module

window.KoreanInputOptimizer = {
    // 한글 입력 최적화 설정
    config: {
        // 한글 키보드 타입 매핑
        inputTypes: {
            name: 'text', // 이름 입력
            title: 'text', // 제목 입력
            content: 'textarea', // 내용 입력
            phone: 'tel', // 전화번호
            email: 'email', // 이메일
            number: 'number' // 숫자
        },
        
        // 한글 입력 패턴
        patterns: {
            koreanName: /^[가-힣]{2,10}$/,
            koreanTitle: /^[가-힣\s\d().,!?-]{2,100}$/,
            mixedText: /^[가-힣a-zA-Z\d\s.,!?()-]{1,500}$/,
            phoneNumber: /^\d{2,3}-\d{3,4}-\d{4}$/,
            memberCode: /^[A-Z]\d{6}$/
        },
        
        // 한글 자동완성 키워드
        autocomplete: {
            government: [
                '경기도의회', '도의원', '의원님', '위원장님', '부위원장님',
                '상임위원회', '특별위원회', '소위원회', '기획재정위원회',
                '본회의', '위원회', '정례회', '임시회', '예산심사',
                '행정사무감사', '국정감사', '의안발의', '조례안',
                '5분자유발언', '도정질문', '질의응답', '토론',
                '민원처리', '민원사항', '시민요청', '주민건의',
                '공청회', '간담회', '정책토론회', '현장방문'
            ],
            locations: [
                '수원시', '고양시', '용인시', '성남시', '부천시',
                '안산시', '안양시', '남양주시', '화성시', '평택시',
                '의정부시', '시흥시', '파주시', '김포시', '광명시',
                '광주시', '군포시', '하남시', '오산시', '이천시',
                '양주시', '구리시', '안성시', '포천시', '의왕시',
                '여주시', '양평군', '동두천시', '과천시', '가평군', '연천군'
            ],
            committees: [
                '기획재정위원회', '행정사무감사위원회', '교육위원회',
                '보건복지위원회', '환경위원회', '건설교통위원회',
                '경제과학기술위원회', '농정해양위원회', '예산심사특별위원회'
            ]
        }
    },

    // 입력 필드 최적화 함수
    optimizeInputField: function(element, type = 'general') {
        if (!element) return;

        // 기본 한글 최적화 설정
        element.setAttribute('lang', 'ko-KR');
        element.setAttribute('inputmode', this.getInputMode(type));
        element.style.fontFamily = "'Noto Sans KR', sans-serif";
        element.style.wordBreak = 'keep-all';
        element.style.overflowWrap = 'break-word';

        // 모바일 최적화
        if (this.isMobile()) {
            element.style.fontSize = '16px'; // iOS 줌 방지
            element.setAttribute('autocapitalize', 'off');
            element.setAttribute('autocorrect', 'off');
            element.setAttribute('spellcheck', 'false');
        }

        // 타입별 특화 설정
        this.applyTypeSpecificSettings(element, type);

        // 이벤트 리스너 추가
        this.attachInputEventListeners(element, type);
    },

    // 입력 모드 결정
    getInputMode: function(type) {
        const inputModes = {
            korean: 'text',
            name: 'text',
            title: 'text',
            content: 'text',
            phone: 'tel',
            email: 'email',
            number: 'numeric',
            search: 'search'
        };
        return inputModes[type] || 'text';
    },

    // 모바일 디바이스 감지
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // 타입별 특화 설정
    applyTypeSpecificSettings: function(element, type) {
        switch (type) {
            case 'korean-name':
                element.setAttribute('maxlength', '10');
                element.setAttribute('placeholder', '예: 김영수');
                element.setAttribute('pattern', '[가-힣]{2,10}');
                break;
                
            case 'korean-title':
                element.setAttribute('maxlength', '100');
                element.setAttribute('placeholder', '예: 경기도 교통정책 개선에 관한 조례안');
                break;
                
            case 'phone':
                element.setAttribute('maxlength', '13');
                element.setAttribute('placeholder', '예: 031-123-4567');
                element.setAttribute('pattern', '[0-9-]+');
                break;
                
            case 'member-code':
                element.setAttribute('maxlength', '7');
                element.setAttribute('placeholder', '예: M240001');
                element.setAttribute('pattern', '[A-Z][0-9]{6}');
                element.style.textTransform = 'uppercase';
                break;
                
            case 'korean-content':
                if (element.tagName === 'TEXTAREA') {
                    element.setAttribute('rows', '5');
                    element.setAttribute('placeholder', '내용을 입력해 주세요...');
                    element.style.resize = 'vertical';
                    element.style.minHeight = '120px';
                }
                break;
        }
    },

    // 입력 이벤트 리스너 추가
    attachInputEventListeners: function(element, type) {
        // 실시간 유효성 검사
        element.addEventListener('input', (e) => {
            this.handleInput(e.target, type);
        });

        // 포커스 시 키보드 최적화
        element.addEventListener('focus', (e) => {
            this.handleFocus(e.target, type);
        });

        // 블러 시 유효성 검사
        element.addEventListener('blur', (e) => {
            this.handleBlur(e.target, type);
        });

        // 한글 조합 완료 감지
        element.addEventListener('compositionend', (e) => {
            this.handleCompositionEnd(e.target, type);
        });
    },

    // 입력 핸들러
    handleInput: function(element, type) {
        const value = element.value;
        
        // 실시간 자동완성 표시
        if (value.length >= 2) {
            this.showAutocomplete(element, value, type);
        } else {
            this.hideAutocomplete(element);
        }

        // 입력 검증 표시
        this.validateInput(element, type);
    },

    // 포커스 핸들러
    handleFocus: function(element, type) {
        // 입력 도움말 표시
        this.showInputHelper(element, type);
        
        // 모바일에서 키보드 타입 최적화
        if (this.isMobile()) {
            this.optimizeMobileKeyboard(element, type);
        }
    },

    // 블러 핸들러
    handleBlur: function(element, type) {
        this.hideAutocomplete(element);
        this.hideInputHelper(element);
        this.finalValidation(element, type);
    },

    // 한글 조합 완료 핸들러
    handleCompositionEnd: function(element, type) {
        // 한글 조합 완료 후 추가 처리
        if (type === 'korean-name' || type === 'korean-title') {
            this.formatKoreanText(element);
        }
    },

    // 자동완성 표시
    showAutocomplete: function(element, value, type) {
        const suggestions = this.getSuggestions(value, type);
        if (suggestions.length === 0) return;

        // 기존 자동완성 제거
        this.hideAutocomplete(element);

        // 자동완성 컨테이너 생성
        const autocompleteContainer = document.createElement('div');
        autocompleteContainer.className = 'korean-autocomplete';
        autocompleteContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 0.375rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-height: 200px;
            overflow-y: auto;
            font-family: 'Noto Sans KR', sans-serif;
        `;

        suggestions.forEach((suggestion, index) => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item korean-caption';
            item.textContent = suggestion;
            item.style.cssText = `
                padding: 0.75rem 1rem;
                cursor: pointer;
                border-bottom: 1px solid #f1f5f9;
                transition: background-color 0.15s;
            `;
            
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = '#f8fafc';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'white';
            });
            
            item.addEventListener('click', () => {
                element.value = suggestion;
                this.hideAutocomplete(element);
                element.focus();
                // 입력 이벤트 트리거
                element.dispatchEvent(new Event('input', { bubbles: true }));
            });

            autocompleteContainer.appendChild(item);
        });

        // 부모 요소에 상대 위치 설정
        const parent = element.parentElement;
        if (parent.style.position !== 'relative' && parent.style.position !== 'absolute') {
            parent.style.position = 'relative';
        }

        parent.appendChild(autocompleteContainer);
    },

    // 자동완성 숨기기
    hideAutocomplete: function(element) {
        const existing = element.parentElement?.querySelector('.korean-autocomplete');
        if (existing) {
            existing.remove();
        }
    },

    // 제안어 가져오기
    getSuggestions: function(value, type) {
        const lowerValue = value.toLowerCase();
        let pool = [];

        switch (type) {
            case 'korean-name':
            case 'korean-title':
            case 'korean-content':
                pool = this.config.autocomplete.government;
                break;
            case 'location':
                pool = this.config.autocomplete.locations;
                break;
            case 'committee':
                pool = this.config.autocomplete.committees;
                break;
            default:
                pool = [
                    ...this.config.autocomplete.government,
                    ...this.config.autocomplete.locations,
                    ...this.config.autocomplete.committees
                ];
        }

        return pool
            .filter(item => item.includes(value))
            .slice(0, 5);
    },

    // 입력 검증
    validateInput: function(element, type) {
        const value = element.value;
        let isValid = true;
        let message = '';

        switch (type) {
            case 'korean-name':
                isValid = this.config.patterns.koreanName.test(value) || value === '';
                message = isValid ? '' : '한글 2-10자로 입력해 주세요';
                break;
                
            case 'korean-title':
                isValid = this.config.patterns.koreanTitle.test(value) || value === '';
                message = isValid ? '' : '한글, 숫자, 기호 2-100자로 입력해 주세요';
                break;
                
            case 'phone':
                isValid = this.config.patterns.phoneNumber.test(value) || value === '';
                message = isValid ? '' : '올바른 전화번호 형식을 입력해 주세요 (예: 031-123-4567)';
                break;
                
            case 'member-code':
                isValid = this.config.patterns.memberCode.test(value) || value === '';
                message = isValid ? '' : '올바른 의원코드를 입력해 주세요 (예: M240001)';
                break;
        }

        this.showValidationMessage(element, isValid, message);
        return isValid;
    },

    // 유효성 검사 메시지 표시
    showValidationMessage: function(element, isValid, message) {
        // 기존 메시지 제거
        const existingMessage = element.parentElement?.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        if (!isValid && message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'validation-message korean-caption';
            messageElement.textContent = message;
            messageElement.style.cssText = `
                color: #dc2626;
                font-size: 0.75rem;
                margin-top: 0.25rem;
                font-family: 'Noto Sans KR', sans-serif;
            `;
            
            element.parentElement.appendChild(messageElement);
        }

        // 입력 필드 스타일 업데이트
        if (isValid) {
            element.style.borderColor = '#d1d5db';
        } else {
            element.style.borderColor = '#dc2626';
        }
    },

    // 입력 도움말 표시
    showInputHelper: function(element, type) {
        const helpers = {
            'korean-name': '한글 이름을 입력해 주세요',
            'korean-title': '조례안 제목을 입력해 주세요',
            'phone': '전화번호는 하이픈(-) 포함하여 입력해 주세요',
            'member-code': '의원코드는 M으로 시작하는 7자리입니다'
        };

        const helper = helpers[type];
        if (!helper) return;

        const helpElement = document.createElement('div');
        helpElement.className = 'input-helper korean-caption';
        helpElement.textContent = helper;
        helpElement.style.cssText = `
            color: #6b7280;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            font-family: 'Noto Sans KR', sans-serif;
        `;

        element.parentElement.appendChild(helpElement);
    },

    // 입력 도움말 숨기기
    hideInputHelper: function(element) {
        const existing = element.parentElement?.querySelector('.input-helper');
        if (existing) {
            existing.remove();
        }
    },

    // 모바일 키보드 최적화
    optimizeMobileKeyboard: function(element, type) {
        // iOS Safari에서 키보드 타입 최적화
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            switch (type) {
                case 'phone':
                    element.setAttribute('pattern', '[0-9]*');
                    break;
                case 'member-code':
                    element.setAttribute('pattern', '[A-Z0-9]*');
                    break;
            }
        }
    },

    // 한글 텍스트 포맷팅
    formatKoreanText: function(element) {
        let value = element.value;
        
        // 연속된 공백 제거
        value = value.replace(/\s+/g, ' ');
        
        // 앞뒤 공백 제거
        value = value.trim();
        
        element.value = value;
    },

    // 최종 유효성 검사
    finalValidation: function(element, type) {
        const isValid = this.validateInput(element, type);
        
        if (!isValid) {
            // 포커스 스타일 추가
            element.classList.add('invalid-input');
        } else {
            element.classList.remove('invalid-input');
        }
        
        return isValid;
    },

    // 페이지의 모든 입력 필드 최적화
    optimizeAllInputs: function() {
        // 이름 입력 필드
        document.querySelectorAll('input[data-korean="name"]').forEach(input => {
            this.optimizeInputField(input, 'korean-name');
        });

        // 제목 입력 필드
        document.querySelectorAll('input[data-korean="title"]').forEach(input => {
            this.optimizeInputField(input, 'korean-title');
        });

        // 내용 입력 필드
        document.querySelectorAll('textarea[data-korean="content"]').forEach(textarea => {
            this.optimizeInputField(textarea, 'korean-content');
        });

        // 전화번호 입력 필드
        document.querySelectorAll('input[data-korean="phone"]').forEach(input => {
            this.optimizeInputField(input, 'phone');
        });

        // 의원코드 입력 필드
        document.querySelectorAll('input[data-korean="member-code"]').forEach(input => {
            this.optimizeInputField(input, 'member-code');
        });

        console.log('✅ 한글 입력 최적화가 적용되었습니다.');
    }
};

// 페이지 로드 시 자동 최적화
document.addEventListener('DOMContentLoaded', function() {
    window.KoreanInputOptimizer.optimizeAllInputs();
});

// 동적으로 추가된 입력 필드 감지
const inputObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const inputs = node.querySelectorAll('input[data-korean], textarea[data-korean]');
                inputs.forEach(input => {
                    const koreanType = input.getAttribute('data-korean');
                    window.KoreanInputOptimizer.optimizeInputField(input, koreanType);
                });
            }
        });
    });
});

inputObserver.observe(document.body, {
    childList: true,
    subtree: true
});

console.log('✅ 한글 모바일 입력 최적화 모듈이 로드되었습니다.');