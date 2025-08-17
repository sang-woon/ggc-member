// 통합 연락처 데이터 시스템
window.contactsData = {
    // 중앙화된 연락처 데이터베이스
    contactsDB: {
        // 의원실 연락처
        office: {
            title: '의원실',
            icon: 'fas fa-user-tie',
            color: 'purple',
            badge: '핵심',
            members: [
                {
                    id: 'kim-secretary',
                    name: '김민정 비서관',
                    position: '비서관',
                    department: '의원실',
                    phone: '010-1234-5678',
                    extension: '2304',
                    email: 'kim.mj@assembly.go.kr',
                    office: '의원회관 304호',
                    responsibilities: ['일정 관리', '대외 업무', '언론 대응', '방문객 접수'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-purple-500',
                    isVIP: true,
                    recentContact: '2시간 전'
                },
                {
                    id: 'lee-assistant',
                    name: '이현수 보좌관',
                    position: '보좌관',
                    department: '의원실',
                    phone: '010-2345-6789',
                    extension: '2305',
                    email: 'lee.hs@assembly.go.kr',
                    office: '의원회관 304-1호',
                    responsibilities: ['정책 연구', '법안 검토', '자료 작성', '현안 분석'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-green-500',
                    isVIP: true,
                    recentContact: '1일 전'
                },
                {
                    id: 'park-researcher',
                    name: '박지영 연구원',
                    position: '정책연구원',
                    department: '의원실',
                    phone: '010-3456-7890',
                    extension: '2306',
                    email: 'park.jy@assembly.go.kr',
                    office: '의원회관 304-2호',
                    responsibilities: ['정책 분석', '자료 수집', '보고서 작성', '국정감사 지원'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-blue-500',
                    isVIP: false,
                    recentContact: '3일 전'
                },
                {
                    id: 'choi-intern',
                    name: '최수민 인턴',
                    position: '인턴',
                    department: '의원실',
                    phone: '010-4567-8901',
                    extension: '2307',
                    email: 'choi.sm@assembly.go.kr',
                    office: '의원회관 304-3호',
                    responsibilities: ['자료 정리', '일정 보조', '방문객 안내', '전화 응대'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-pink-500',
                    isVIP: false,
                    recentContact: '1주일 전'
                }
            ]
        },

        // 교육위원회 연락처
        education: {
            title: '교육위원회',
            icon: 'fas fa-graduation-cap',
            color: 'blue',
            badge: '위원회',
            members: [
                {
                    id: 'park-chairman',
                    name: '박영훈 위원장',
                    position: '위원장',
                    department: '교육위원회',
                    phone: '02-788-2345',
                    extension: '2345',
                    email: 'park.yh@assembly.go.kr',
                    office: '의원회관 205호',
                    responsibilities: ['위원회 총괄', '의사진행', '대외협력', '정책조정'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-blue-500',
                    isVIP: false,
                    recentContact: '5일 전'
                },
                {
                    id: 'choi-secretary',
                    name: '최은영 간사',
                    position: '간사',
                    department: '교육위원회',
                    phone: '02-788-2346',
                    extension: '2346',
                    email: 'choi.ey@assembly.go.kr',
                    office: '의원회관 206호',
                    responsibilities: ['회의 준비', '안건 관리', '의사록 작성', '위원 연락'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-indigo-500',
                    isVIP: false,
                    recentContact: '1주일 전'
                },
                {
                    id: 'kim-member1',
                    name: '김정호 위원',
                    position: '위원',
                    department: '교육위원회',
                    phone: '02-788-2347',
                    extension: '2347',
                    email: 'kim.jh@assembly.go.kr',
                    office: '의원회관 207호',
                    responsibilities: ['교육정책 심의', '예산 검토', '현장 시찰', '정책 제안'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-green-500',
                    isVIP: false,
                    recentContact: '2주일 전'
                },
                {
                    id: 'lee-member2',
                    name: '이소영 위원',
                    position: '위원',
                    department: '교육위원회',
                    phone: '02-788-2348',
                    extension: '2348',
                    email: 'lee.sy@assembly.go.kr',
                    office: '의원회관 208호',
                    responsibilities: ['사학 정책', '대학 입시', '교원 정책', '교육예산'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-purple-500',
                    isVIP: false,
                    recentContact: '3주일 전'
                },
                {
                    id: 'jung-member3',
                    name: '정태영 위원',
                    position: '위원',
                    department: '교육위원회',
                    phone: '02-788-2349',
                    extension: '2349',
                    email: 'jung.ty@assembly.go.kr',
                    office: '의원회관 209호',
                    responsibilities: ['초중등 교육', '교육과정', '교육복지', '디지털 교육'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-teal-500',
                    isVIP: false,
                    recentContact: '1달 전'
                },
                {
                    id: 'han-member4',
                    name: '한미라 위원',
                    position: '위원',
                    department: '교육위원회',
                    phone: '02-788-2350',
                    extension: '2350',
                    email: 'han.mr@assembly.go.kr',
                    office: '의원회관 210호',
                    responsibilities: ['평생교육', '직업교육', '교육격차 해소', '교육 국정감사'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-orange-500',
                    isVIP: false,
                    recentContact: '1달 전'
                }
            ]
        },

        // 의회사무처 연락처
        admin: {
            title: '의회사무처',
            icon: 'fas fa-building',
            color: 'gray',
            badge: '행정',
            members: [
                {
                    id: 'jung-director',
                    name: '정수민 사무처장',
                    position: '사무처장',
                    department: '의회사무처',
                    phone: '02-788-2000',
                    extension: '2000',
                    email: 'jung.sm@assembly.go.kr',
                    office: '의원회관 101호',
                    responsibilities: ['사무처 총괄', '의회 운영', '예산 관리', '인사 관리'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-gray-500',
                    isVIP: false,
                    recentContact: '1주일 전'
                },
                {
                    id: 'kim-planning',
                    name: '김영철 기획담당관',
                    position: '기획담당관',
                    department: '의회사무처',
                    phone: '02-788-2001',
                    extension: '2001',
                    email: 'kim.yc@assembly.go.kr',
                    office: '의원회관 102호',
                    responsibilities: ['기획 업무', '예산 편성', '성과 관리', '조직 운영'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-slate-500',
                    isVIP: false,
                    recentContact: '2주일 전'
                },
                {
                    id: 'lee-legislative',
                    name: '이정민 의사담당관',
                    position: '의사담당관',
                    department: '의회사무처',
                    phone: '02-788-2002',
                    extension: '2002',
                    email: 'lee.jm@assembly.go.kr',
                    office: '의원회관 103호',
                    responsibilities: ['의사 진행', '회의록 작성', '안건 관리', '의정활동 지원'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-zinc-500',
                    isVIP: false,
                    recentContact: '3주일 전'
                },
                {
                    id: 'park-legal',
                    name: '박서연 법제담당관',
                    position: '법제담당관',
                    department: '의회사무처',
                    phone: '02-788-2003',
                    extension: '2003',
                    email: 'park.sy@assembly.go.kr',
                    office: '의원회관 104호',
                    responsibilities: ['법령 검토', '조례 심사', '법제 자문', '계약 검토'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-stone-500',
                    isVIP: false,
                    recentContact: '1달 전'
                },
                {
                    id: 'choi-general',
                    name: '최민수 총무담당관',
                    position: '총무담당관',
                    department: '의회사무처',
                    phone: '02-788-2004',
                    extension: '2004',
                    email: 'choi.ms@assembly.go.kr',
                    office: '의원회관 105호',
                    responsibilities: ['인사 관리', '급여 업무', '복리후생', '청사 관리'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-neutral-500',
                    isVIP: false,
                    recentContact: '1달 전'
                },
                {
                    id: 'yoon-finance',
                    name: '윤태호 재정담당관',
                    position: '재정담당관',
                    department: '의회사무처',
                    phone: '02-788-2005',
                    extension: '2005',
                    email: 'yoon.th@assembly.go.kr',
                    office: '의원회관 106호',
                    responsibilities: ['예산 집행', '회계 관리', '감사 업무', '재정 분석'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-gray-600',
                    isVIP: false,
                    recentContact: '2달 전'
                },
                {
                    id: 'song-it',
                    name: '송지훈 정보화담당관',
                    position: '정보화담당관',
                    department: '의회사무처',
                    phone: '02-788-2006',
                    extension: '2006',
                    email: 'song.jh@assembly.go.kr',
                    office: '의원회관 107호',
                    responsibilities: ['IT 인프라', '시스템 운영', '홈페이지 관리', '디지털 전환'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-slate-600',
                    isVIP: false,
                    recentContact: '2달 전'
                },
                {
                    id: 'kang-public',
                    name: '강혜진 홍보담당관',
                    position: '홍보담당관',
                    department: '의회사무처',
                    phone: '02-788-2007',
                    extension: '2007',
                    email: 'kang.hj@assembly.go.kr',
                    office: '의원회관 108호',
                    responsibilities: ['언론 대응', '홍보 기획', 'SNS 관리', '보도자료 작성'],
                    workHours: '09:00 - 18:00',
                    avatar: 'bg-zinc-600',
                    isVIP: false,
                    recentContact: '3달 전'
                }
            ]
        }
    },

    // VIP 연락처 목록 (자주 연락하는 분들)
    getVIPContacts: function() {
        const allContacts = this.getAllContacts();
        return allContacts.filter(contact => contact.isVIP);
    },

    // 전체 연락처 목록 가져오기
    getAllContacts: function() {
        const contacts = [];
        Object.keys(this.contactsDB).forEach(deptKey => {
            const dept = this.contactsDB[deptKey];
            dept.members.forEach(member => {
                contacts.push({
                    ...member,
                    departmentKey: deptKey,
                    departmentTitle: dept.title,
                    departmentIcon: dept.icon,
                    departmentColor: dept.color,
                    departmentBadge: dept.badge
                });
            });
        });
        return contacts;
    },

    // 특정 부서 연락처 가져오기
    getDepartmentContacts: function(deptKey) {
        return this.contactsDB[deptKey] || null;
    },

    // 특정 연락처 찾기
    getContactById: function(contactId) {
        const allContacts = this.getAllContacts();
        return allContacts.find(contact => contact.id === contactId);
    },

    // 연락처 검색
    searchContacts: function(query) {
        if (!query) return this.getAllContacts();
        
        const allContacts = this.getAllContacts();
        const searchTerm = query.toLowerCase();
        
        return allContacts.filter(contact => 
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.position.toLowerCase().includes(searchTerm) ||
            contact.department.toLowerCase().includes(searchTerm) ||
            contact.phone.includes(searchTerm) ||
            contact.responsibilities.some(resp => resp.toLowerCase().includes(searchTerm))
        );
    },

    // 즐겨찾기 연락처 관리
    favorites: JSON.parse(localStorage.getItem('contactFavorites') || '[]'),
    
    addFavorite: function(contactId) {
        if (!this.favorites.includes(contactId)) {
            this.favorites.push(contactId);
            localStorage.setItem('contactFavorites', JSON.stringify(this.favorites));
        }
    },

    removeFavorite: function(contactId) {
        this.favorites = this.favorites.filter(id => id !== contactId);
        localStorage.setItem('contactFavorites', JSON.stringify(this.favorites));
    },

    isFavorite: function(contactId) {
        return this.favorites.includes(contactId);
    },

    getFavoriteContacts: function() {
        return this.favorites.map(id => this.getContactById(id)).filter(Boolean);
    }
};