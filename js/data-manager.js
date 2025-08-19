// 중앙 데이터 관리 시스템
// 모든 페이지와 컴포넌트에서 사용하는 통합 데이터 저장소

window.DataManager = {
    // 의원 기본 정보
    memberInfo: {
        name: '김영수',
        memberId: '2024-0815',
        party: '국민의힘',
        district: '경기 수원시갑',
        position: '교육위원회 위원장',
        committees: ['교육위원회(위원장)', '예산결산특별위원회'],
        term: '초선(제11기)',
        photo: 'images/annomimus.jpg',
        status: '재직중',
        electionInfo: {
            valid: true,
            date: '2024.05.30',
            votes: 58420,
            percentage: 52.3
        }
    },

    // 출석 데이터
    attendanceData: {
        plenary: {
            rate: 98.5,
            attended: 197,
            total: 200,
            recentUpdated: '2025.01.18'
        },
        committee: {
            rate: 96.0,
            attended: 48,
            total: 50,
            recentUpdated: '2025.01.18'
        },
        special: {
            rate: 100.0,
            attended: 15,
            total: 15,
            recentUpdated: '2025.01.18'
        },
        history: [
            {
                date: '2025.01.18',
                type: '본회의',
                session: '제372회 경기도의회(임시회) 제3차',
                status: 'present',
                time: '14:00',
                duration: 180
            },
            {
                date: '2025.01.17',
                type: '교육위원회',
                session: '법안심사소위원회',
                status: 'present',
                time: '10:00',
                duration: 120
            },
            {
                date: '2025.01.15',
                type: '본회의',
                session: '제372회 경기도의회(임시회) 제2차',
                status: 'excused',
                time: '14:00',
                reason: '공무 출장'
            },
            {
                date: '2025.01.14',
                type: '예산결산특별위원회',
                session: '2025년도 예산안 심사',
                status: 'present',
                time: '09:00',
                duration: 360
            },
            {
                date: '2025.01.12',
                type: '본회의',
                session: '제372회 경기도의회(임시회) 제1차',
                status: 'present',
                time: '14:00',
                duration: 150
            }
        ]
    },

    // 법안 발의 데이터
    billData: {
        total: 32,
        passed: 18,
        pending: 10,
        rejected: 4,
        recentUpdated: '2025.01.18',
        bills: [
            {
                id: 'B2025-001',
                title: '경기도 청년 주거안정 지원 조례안',
                date: '2025.01.15',
                status: 'pending',
                coSponsors: 12,
                committee: '교육위원회',
                type: '제정',
                priority: 'high'
            },
            {
                id: 'B2024-089',
                title: '경기도 교육환경 개선 특별법안',
                date: '2024.12.20',
                status: 'passed',
                coSponsors: 8,
                committee: '교육위원회',
                type: '개정',
                passedDate: '2025.01.10'
            },
            {
                id: 'B2024-075',
                title: '경기도 중소기업 지원 조례 일부개정안',
                date: '2024.11.15',
                status: 'passed',
                coSponsors: 15,
                committee: '경제노동위원회',
                type: '개정',
                passedDate: '2024.12.28'
            }
        ]
    },

    // 발언 기록 데이터
    speechData: {
        total: 15,
        fiveMinute: 8,
        discussion: 5,
        interpellation: 2,
        recentUpdated: '2025.01.18',
        speeches: [
            {
                id: 'S2025-001',
                type: '5분발언',
                title: '경기도 교육격차 해소 방안 제안',
                date: '2025.01.18',
                session: '제372회 임시회',
                duration: 5,
                views: 1240,
                keywords: ['교육', '격차해소', '공교육']
            },
            {
                id: 'S2025-002',
                type: '토론',
                title: '2025년도 교육예산안 토론',
                date: '2025.01.14',
                session: '제372회 임시회',
                duration: 15,
                views: 820
            },
            {
                id: 'S2024-045',
                type: '질의',
                title: '도교육청 학교폭력 대응 체계 질의',
                date: '2024.12.18',
                session: '제371회 정례회',
                duration: 10,
                views: 2150
            }
        ]
    },

    // 민원 처리 데이터
    civilData: {
        total: 248,
        completed: 233,
        processing: 12,
        pending: 3,
        responseRate: 94,
        avgResponseTime: 3.2, // days
        recentUpdated: '2025.01.18',
        complaints: [
            {
                id: 'C2025-048',
                title: '수원시갑 통학로 안전 개선 요청',
                date: '2025.01.17',
                status: 'processing',
                priority: 'high',
                category: '교통/안전',
                requester: '학부모회',
                deadline: '2025.01.24'
            },
            {
                id: 'C2025-047',
                title: '지역 도서관 운영시간 연장 건의',
                date: '2025.01.16',
                status: 'completed',
                priority: 'medium',
                category: '교육/문화',
                responseDate: '2025.01.18',
                response: '검토 후 2025년 3월부터 시행 예정'
            },
            {
                id: 'C2025-046',
                title: '청년 창업 지원 프로그램 문의',
                date: '2025.01.15',
                status: 'completed',
                priority: 'low',
                category: '경제/일자리',
                responseDate: '2025.01.17'
            }
        ]
    },

    // 예산 심사 데이터
    budgetData: {
        reviewed: 42,
        approved: 38,
        modified: 3,
        rejected: 1,
        totalAmount: '2.5조원',
        recentUpdated: '2025.01.18'
    },

    // 교육 이수 데이터
    educationData: {
        completed: 12,
        required: 15,
        completionRate: 80,
        certificates: 8,
        recentUpdated: '2025.01.18'
    },

    // 월별 활동 통계
    monthlyStats: {
        labels: ['8월', '9월', '10월', '11월', '12월', '1월'],
        data: [45, 52, 48, 58, 55, 62],
        trend: 'increasing'
    },

    // 최근 활동 (메인화면용)
    recentActivities: [
        {
            type: 'speech',
            icon: 'fa-microphone',
            title: '5분 자유발언',
            description: '경기도 교육격차 해소 방안 제안',
            date: '2025.01.18 14:30',
            id: 1
        },
        {
            type: 'bill',
            icon: 'fa-file-signature',
            title: '법안 발의',
            description: '경기도 청년 주거안정 지원 조례안',
            date: '2025.01.15 10:00',
            id: 2
        },
        {
            type: 'civil',
            icon: 'fa-envelope-open',
            title: '민원 답변',
            description: '지역 도서관 운영시간 연장 건의',
            date: '2025.01.18 16:45',
            id: 3
        }
    ],

    // 데이터 가져오기 메서드
    getData: function(key) {
        return this[key] || null;
    },

    // 데이터 업데이트 메서드
    updateData: function(key, value) {
        if (this.hasOwnProperty(key)) {
            this[key] = { ...this[key], ...value };
            this.saveToLocalStorage();
            this.notifyUpdate(key);
        }
    },

    // 출석률 계산
    calculateOverallAttendance: function() {
        const { plenary, committee, special } = this.attendanceData;
        const totalAttended = plenary.attended + committee.attended + special.attended;
        const totalSessions = plenary.total + committee.total + special.total;
        return ((totalAttended / totalSessions) * 100).toFixed(1);
    },

    // 민원 처리율 계산
    calculateCivilResponseRate: function() {
        return ((this.civilData.completed / this.civilData.total) * 100).toFixed(1);
    },

    // LocalStorage 저장
    saveToLocalStorage: function() {
        try {
            localStorage.setItem('memberData', JSON.stringify({
                memberInfo: this.memberInfo,
                attendanceData: this.attendanceData,
                billData: this.billData,
                speechData: this.speechData,
                civilData: this.civilData,
                budgetData: this.budgetData,
                educationData: this.educationData,
                lastUpdated: new Date().toISOString()
            }));
        } catch (e) {
            console.error('데이터 저장 실패:', e);
        }
    },

    // LocalStorage에서 로드
    loadFromLocalStorage: function() {
        try {
            const stored = localStorage.getItem('memberData');
            if (stored) {
                const data = JSON.parse(stored);
                Object.assign(this, data);
                console.log('✅ 저장된 데이터 로드 완료');
            }
        } catch (e) {
            console.error('데이터 로드 실패:', e);
        }
    },

    // 데이터 변경 알림
    notifyUpdate: function(dataType) {
        // 커스텀 이벤트 발생
        window.dispatchEvent(new CustomEvent('dataUpdated', {
            detail: { type: dataType, data: this[dataType] }
        }));
    },

    // 초기화
    init: function() {
        this.loadFromLocalStorage();
        console.log('📊 DataManager 초기화 완료');
        
        // 주기적 자동 저장 (5분마다)
        setInterval(() => {
            this.saveToLocalStorage();
        }, 5 * 60 * 1000);
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    window.DataManager.init();
});