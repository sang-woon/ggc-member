// 경기도의회 한국어 용어 표준화 모듈
// Korean Terminology Standardization for Gyeonggi Provincial Assembly

window.KoreanTerminology = {
    // 경기도의회 공식 용어집
    officialTerms: {
        // 의회 관련
        assembly: '경기도의회',
        assemblyman: '도의원',
        assemblywoman: '도의원',
        member: '의원',
        chairperson: '의장',
        viceChairperson: '부의장',
        
        // 위원회 관련
        committee: '위원회',
        standingCommittee: '상임위원회',
        specialCommittee: '특별위원회',
        subcommittee: '소위원회',
        committeeChair: '위원장',
        committeeViceChair: '부위원장',
        committeeMember: '위원',
        
        // 위원회 명칭 표준화
        planningFinance: '기획재정위원회',
        administration: '행정사무감사위원회',
        education: '교육위원회',
        welfare: '보건복지위원회',
        environment: '환경위원회',
        construction: '건설교통위원회',
        economy: '경제과학기술위원회',
        agriculture: '농정해양위원회',
        
        // 의정활동 관련
        legislation: '의정활동',
        bill: '의안',
        proposal: '발의',
        ordinance: '조례',
        regulation: '규칙',
        resolution: '결의안',
        
        // 회의 관련
        session: '회기',
        plenarySessions: '본회의',
        committeeSession: '위원회',
        extraordinarySession: '임시회',
        regularSession: '정례회',
        
        // 민원 관련
        petition: '민원',
        complaint: '민원',
        citizenRequest: '주민요청',
        publicHearing: '공청회',
        
        // 예산 관련
        budget: '예산',
        budgetReview: '예산심사',
        budgetCommittee: '예산심사특별위원회',
        supplementaryBudget: '추가경정예산',
        
        // 감사 관련
        audit: '감사',
        administrativeAudit: '행정사무감사',
        inspection: '국정감사',
        
        // 발언 관련
        speech: '발언',
        fiveMinuteSpeech: '5분 자유발언',
        interpellation: '도정질문',
        questions: '질의',
        
        // 출석 관련
        attendance: '출석',
        absence: '결석',
        leave: '출장',
        present: '출석',
        absent: '불참'
    },

    // 경어체 표준 문구
    formalPhrases: {
        // 인사말
        greeting: '안녕하십니까',
        thankYou: '감사합니다',
        please: '부탁드립니다',
        excuse: '실례합니다',
        
        // 공식 문서 표현
        respectfully: '경의를 표합니다',
        humblyRequest: '삼가 요청드립니다',
        notification: '알려드립니다',
        guidance: '안내드립니다',
        
        // 회의 표현
        meetingStart: '회의를 시작하겠습니다',
        meetingEnd: '회의를 마치겠습니다',
        takesFloor: '발언권을 드리겠습니다',
        
        // 민원 처리 표현
        received: '접수되었습니다',
        processing: '처리 중입니다',
        completed: '완료되었습니다',
        reviewed: '검토되었습니다'
    },

    // 날짜/시간 한국식 포맷
    dateTimeFormats: {
        fullDate: 'YYYY년 MM월 DD일',
        monthDay: 'MM월 DD일',
        yearMonth: 'YYYY년 MM월',
        timeFormat: 'A h:mm',
        fullDateTime: 'YYYY년 MM월 DD일 A h:mm',
        
        // 요일
        weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
        
        // 시간 표현
        morning: '오전',
        afternoon: '오후',
        today: '오늘',
        yesterday: '어제',
        tomorrow: '내일'
    },

    // 상태 표시 한국어
    statusTexts: {
        // 민원 상태
        pending: '접수',
        inProgress: '처리중',
        completed: '완료',
        cancelled: '취소',
        urgent: '긴급',
        
        // 의안 상태
        proposed: '발의',
        reviewing: '심사중',
        passed: '가결',
        rejected: '부결',
        withdrawn: '철회',
        
        // 회의 상태
        scheduled: '예정',
        ongoing: '진행중',
        finished: '종료',
        postponed: '연기',
        
        // 출석 상태
        present: '출석',
        absent: '결석',
        excused: '불참',
        late: '지각'
    },

    // 정중한 에러 메시지
    errorMessages: {
        networkError: '네트워크 연결을 확인해 주십시오.',
        serverError: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주십시오.',
        notFound: '요청하신 정보를 찾을 수 없습니다.',
        accessDenied: '접근 권한이 없습니다.',
        invalidInput: '입력하신 정보를 다시 확인해 주십시오.',
        sessionExpired: '세션이 만료되었습니다. 다시 로그인해 주십시오.',
        fileUploadError: '파일 업로드 중 오류가 발생했습니다.',
        validationError: '필수 항목을 모두 입력해 주십시오.'
    },

    // 성공 메시지
    successMessages: {
        saved: '성공적으로 저장되었습니다.',
        submitted: '성공적으로 제출되었습니다.',
        updated: '성공적으로 업데이트되었습니다.',
        deleted: '성공적으로 삭제되었습니다.',
        sent: '성공적으로 전송되었습니다.',
        completed: '성공적으로 완료되었습니다.'
    },

    // 정부 공문서 표준 문구
    officialPhrases: {
        // 공문 시작
        documentStart: '귀하의 무궁한 발전을 기원합니다.',
        reference: '귀하의 요청에 관하여',
        
        // 공문 마무리
        documentEnd: '업무에 참고하시기 바랍니다.',
        closing: '감사합니다.',
        
        // 의회 공식 표현
        onBehalfOf: '경기도의회를 대표하여',
        inAccordanceWith: '관련 법령에 따라',
        afterDeliberation: '심의를 거쳐',
        hereby: '이에',
        
        // 민원 공식 표현
        petitionReceived: '귀하의 민원을 접수하였습니다.',
        underReview: '관련 부서에서 검토 중입니다.',
        willNotify: '처리 결과를 별도로 통지해 드리겠습니다.'
    },

    // 한국어 입력 최적화 설정
    inputOptimization: {
        // 자동완성 추천어 (정부/의회 용어)
        suggestions: [
            '경기도의회', '도의원', '상임위원회', '특별위원회',
            '본회의', '예산심사', '행정사무감사', '의안발의',
            '조례안', '5분발언', '도정질문', '민원처리',
            '공청회', '간담회', '현장방문', '정책토론회'
        ],
        
        // 입력 검증 패턴
        patterns: {
            memberName: /^[가-힣]{2,4}$/,
            committeeName: /^[가-힣]+위원회$/,
            billTitle: /^[가-힣\s\d()]+조례(\(안\))?$/,
            phoneNumber: /^\d{2,3}-\d{3,4}-\d{4}$/
        }
    },

    // 용어 변환 함수
    convertToFormal: function(text) {
        if (!text) return text;
        
        // 비공식 → 공식 용어 변환
        const conversions = {
            '위원': '위원님',
            '의원': '의원님',
            '민원': '민원사항',
            '처리': '처리',
            '검토': '검토',
            '완료': '완료'
        };
        
        let result = text;
        for (const [informal, formal] of Object.entries(conversions)) {
            result = result.replace(new RegExp(informal, 'g'), formal);
        }
        
        return result;
    },

    // 날짜 한국식 포맷팅
    formatDate: function(date, format = 'fullDate') {
        if (!date) return '';
        
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const hours = d.getHours();
        const minutes = d.getMinutes();
        
        switch (format) {
            case 'fullDate':
                return `${year}년 ${month}월 ${day}일`;
            case 'monthDay':
                return `${month}월 ${day}일`;
            case 'yearMonth':
                return `${year}년 ${month}월`;
            case 'timeFormat':
                const period = hours < 12 ? '오전' : '오후';
                const hour12 = hours % 12 || 12;
                return `${period} ${hour12}:${minutes.toString().padStart(2, '0')}`;
            case 'fullDateTime':
                const period2 = hours < 12 ? '오전' : '오후';
                const hour12_2 = hours % 12 || 12;
                return `${year}년 ${month}월 ${day}일 ${period2} ${hour12_2}:${minutes.toString().padStart(2, '0')}`;
            default:
                return `${year}년 ${month}월 ${day}일`;
        }
    },

    // 숫자 한국식 포맷팅
    formatNumber: function(number) {
        if (number === null || number === undefined) return '';
        
        // 천 단위 콤마 추가
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    // 정중한 메시지 생성
    createPoliteMessage: function(type, content) {
        const prefix = this.formalPhrases.respectfully;
        const suffix = this.formalPhrases.thankYou;
        
        return `${prefix} ${content} ${suffix}`;
    },

    // 입력 필드 한글 최적화
    optimizeInput: function(element) {
        if (!element) return;
        
        // 한글 입력 최적화 속성 설정
        element.setAttribute('lang', 'ko');
        element.style.fontFamily = "'Noto Sans KR', sans-serif";
        element.style.wordBreak = 'keep-all';
        element.style.overflowWrap = 'break-word';
        
        // 자동완성 설정 (정부 용어)
        if (element.type === 'text' || element.tagName === 'TEXTAREA') {
            element.setAttribute('autocomplete', 'off');
            element.setAttribute('spellcheck', 'false');
        }
    }
};

// 전역 함수로 등록
window.formatKoreanDate = window.KoreanTerminology.formatDate;
window.formatKoreanNumber = window.KoreanTerminology.formatNumber;
window.optimizeKoreanInput = window.KoreanTerminology.optimizeInput;

// 페이지 로드 시 모든 입력 요소 최적화
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], textarea, select');
    inputs.forEach(input => window.KoreanTerminology.optimizeInput(input));
});

console.log('✅ 경기도의회 한국어 용어 표준화 모듈이 로드되었습니다.');