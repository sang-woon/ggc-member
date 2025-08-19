// 의원 정보 관리 시스템 - 마이데이터 개념
window.MemberDataManager = {
    // 전체 의원 정보 구조
    defaultMemberData: {
        // 기본 정보
        name: '김호겸',
        nameHanja: '金浩謙',
        birthYear: '1958',
        memberId: '2024-0815',
        photo: null,
        
        // 소속 정보
        party: '국민의힘',
        district: '수원시 제5선거구',
        districtDetail: '팔달구 매교동, 매산동, 고등동, 화서1동, 화서2동',
        committee: '교육기획위원회',
        committeeRole: '위원',
        
        // 연락처 정보
        phone: '031-8008-7813',
        phonePolicy: '031-8008-7523',
        fax: '031-8008-7580',
        email: 'khg9940@hanmail.net',
        office: '1014호',
        consultingOffice: '수원시 팔달구 중부대로 100',
        
        // 경력 정보
        career: [
            { type: '전', content: '경기도의회 8, 9대 의원' },
            { type: '전', content: '국민의힘 윤석렬후보 특별위원장' },
            { type: '전', content: '인구보건복지협회 경기도지회장' },
            { type: '현', content: '국민의힘 경기도당 지도위원' },
            { type: '현', content: '수원시 사회복지시설협의회 운영위원' },
            { type: '현', content: '대한노인회 팔달지회 자문위원' },
            { type: '현', content: '재수원 화성시민연대 회장' },
            { type: '현', content: '경기도교육청 정책자문위원' },
            { type: '현', content: '화서동 방위협의회 자문위원' }
        ],
        
        // SNS 및 웹사이트
        sns: {
            facebook: '',
            instagram: '',
            blog: '',
            youtube: ''
        },
        
        // 의정활동 통계
        statistics: {
            bills: 15,
            speeches: 8,
            questions: 12,
            attendance: 98.5
        }
    },
    
    // 공개/비공개 설정 (마이데이터)
    privacySettings: {
        // true = 공개, false = 비공개
        name: true,
        birthYear: false,
        photo: true,
        party: true,
        district: true,
        districtDetail: true,
        committee: true,
        phone: false,
        phonePolicy: true,
        fax: false,
        email: false,
        office: true,
        consultingOffice: true,
        career: true,
        sns: true,
        statistics: true
    },
    
    // 데이터 연동 설정
    syncSettings: {
        googleContacts: false,
        kakaoProfile: false,
        naverProfile: false,
        governmentAPI: true,
        autoSync: false,
        lastSync: null
    },
    
    // 초기화
    init: function() {
        this.loadData();
        this.loadPrivacySettings();
        this.loadSyncSettings();
    },
    
    // 데이터 로드
    loadData: function() {
        const saved = localStorage.getItem('memberFullData');
        if (saved) {
            this.defaultMemberData = { ...this.defaultMemberData, ...JSON.parse(saved) };
        }
        // 기존 app.memberData와 호환성 유지
        window.app.memberData = {
            name: this.defaultMemberData.name,
            party: this.defaultMemberData.party,
            district: this.defaultMemberData.district,
            memberId: this.defaultMemberData.memberId,
            term: this.defaultMemberData.committeeRole,
            photo: this.defaultMemberData.photo
        };
    },
    
    // 프라이버시 설정 로드
    loadPrivacySettings: function() {
        const saved = localStorage.getItem('memberPrivacySettings');
        if (saved) {
            this.privacySettings = { ...this.privacySettings, ...JSON.parse(saved) };
        }
    },
    
    // 동기화 설정 로드
    loadSyncSettings: function() {
        const saved = localStorage.getItem('memberSyncSettings');
        if (saved) {
            this.syncSettings = { ...this.syncSettings, ...JSON.parse(saved) };
        }
    },
    
    // 데이터 저장
    saveData: function() {
        localStorage.setItem('memberFullData', JSON.stringify(this.defaultMemberData));
        localStorage.setItem('memberPrivacySettings', JSON.stringify(this.privacySettings));
        localStorage.setItem('memberSyncSettings', JSON.stringify(this.syncSettings));
        
        // 기존 app.memberData 업데이트
        window.app.memberData = {
            name: this.defaultMemberData.name,
            party: this.defaultMemberData.party,
            district: this.defaultMemberData.district,
            memberId: this.defaultMemberData.memberId,
            term: this.defaultMemberData.committeeRole,
            photo: this.defaultMemberData.photo
        };
    },
    
    // 공개 데이터만 가져오기
    getPublicData: function() {
        const publicData = {};
        for (const key in this.defaultMemberData) {
            if (this.privacySettings[key] === true) {
                publicData[key] = this.defaultMemberData[key];
            }
        }
        return publicData;
    },
    
    // 특정 필드 업데이트
    updateField: function(field, value) {
        if (field in this.defaultMemberData) {
            this.defaultMemberData[field] = value;
            this.saveData();
            return true;
        }
        return false;
    },
    
    // 프라이버시 설정 업데이트
    updatePrivacy: function(field, isPublic) {
        if (field in this.privacySettings) {
            this.privacySettings[field] = isPublic;
            this.saveData();
            return true;
        }
        return false;
    },
    
    // 경력 추가
    addCareer: function(type, content) {
        this.defaultMemberData.career.push({ type, content });
        this.saveData();
    },
    
    // 경력 삭제
    removeCareer: function(index) {
        if (index >= 0 && index < this.defaultMemberData.career.length) {
            this.defaultMemberData.career.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    },
    
    // 데이터 동기화
    syncData: async function(service) {
        if (!this.syncSettings[service]) {
            return { success: false, message: '동기화가 비활성화되어 있습니다.' };
        }
        
        // 실제 구현 시 각 서비스별 API 연동
        switch(service) {
            case 'governmentAPI':
                // 정부 API와 동기화
                this.syncSettings.lastSync = new Date().toISOString();
                this.saveData();
                return { success: true, message: '정부 API와 동기화되었습니다.' };
                
            case 'googleContacts':
                // Google 연락처와 동기화
                return { success: false, message: 'Google 연동은 준비 중입니다.' };
                
            case 'kakaoProfile':
                // 카카오 프로필과 동기화
                return { success: false, message: '카카오 연동은 준비 중입니다.' };
                
            default:
                return { success: false, message: '지원하지 않는 서비스입니다.' };
        }
    },
    
    // 데이터 내보내기
    exportData: function(format = 'json') {
        const data = this.getPublicData();
        
        if (format === 'json') {
            return JSON.stringify(data, null, 2);
        } else if (format === 'vcard') {
            // vCard 형식으로 내보내기
            let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
            vcard += `FN:${data.name || ''}\n`;
            vcard += `ORG:경기도의회;${data.party || ''}\n`;
            vcard += `TITLE:${data.committeeRole || ''}\n`;
            if (data.phone) vcard += `TEL:${data.phone}\n`;
            if (data.email) vcard += `EMAIL:${data.email}\n`;
            vcard += 'END:VCARD';
            return vcard;
        }
        
        return data;
    },
    
    // 데이터 가져오기
    importData: function(data, format = 'json') {
        try {
            if (format === 'json') {
                const imported = typeof data === 'string' ? JSON.parse(data) : data;
                this.defaultMemberData = { ...this.defaultMemberData, ...imported };
                this.saveData();
                return { success: true, message: '데이터를 가져왔습니다.' };
            }
            return { success: false, message: '지원하지 않는 형식입니다.' };
        } catch (error) {
            return { success: false, message: '데이터 가져오기 실패: ' + error.message };
        }
    }
};

// 초기화
if (window.app) {
    MemberDataManager.init();
}