// 모바일 UI/UX 개선 - 전체 메뉴 페이지
(function() {
    'use strict';
    
    // 전역 모바일 스타일 적용
    const applyMobileStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            /* 모바일 공통 스타일 */
            .mobile-page-container {
                max-width: 100%;
                padding: 0;
                background: #f9fafb;
                min-height: 100vh;
                padding-bottom: 80px;
            }
            
            .mobile-header {
                background: white;
                padding: 16px;
                border-bottom: 1px solid #e5e7eb;
                position: sticky;
                top: 0;
                z-index: 100;
            }
            
            .mobile-title {
                font-size: 18px;
                font-weight: 600;
                color: #1f2937;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .mobile-title i {
                color: #003d7a;
            }
            
            /* 모바일 카드 */
            .mobile-card {
                background: white;
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                transition: all 0.2s;
            }
            
            .mobile-card:active {
                transform: scale(0.98);
            }
            
            /* 모바일 버튼 */
            .mobile-btn {
                padding: 12px 20px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                border: none;
                cursor: pointer;
                transition: all 0.2s;
                min-height: 44px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            
            .mobile-btn-primary {
                background: #003d7a;
                color: white;
            }
            
            .mobile-btn-secondary {
                background: #f3f4f6;
                color: #374151;
                border: 1px solid #e5e7eb;
            }
            
            /* 모바일 검색바 */
            .mobile-search-container {
                padding: 16px;
                background: white;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .mobile-search-box {
                position: relative;
            }
            
            .mobile-search-input {
                width: 100%;
                padding: 12px 16px 12px 44px;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                font-size: 16px;
                background: #f9fafb;
            }
            
            .mobile-search-icon {
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
                color: #6b7280;
            }
            
            /* 모바일 탭 */
            .mobile-tabs {
                display: flex;
                gap: 8px;
                padding: 16px;
                background: white;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .mobile-tabs::-webkit-scrollbar {
                display: none;
            }
            
            .mobile-tab {
                padding: 10px 16px;
                background: #f3f4f6;
                border: none;
                border-radius: 20px;
                font-size: 14px;
                color: #374151;
                white-space: nowrap;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .mobile-tab.active {
                background: #003d7a;
                color: white;
            }
            
            /* 정보 그리드 */
            .mobile-info-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
                padding: 12px;
                background: #f9fafb;
                border-radius: 8px;
                margin-top: 12px;
            }
            
            .mobile-info-item {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 13px;
                color: #4b5563;
            }
            
            .mobile-info-item i {
                color: #9ca3af;
                font-size: 12px;
                width: 16px;
            }
            
            /* 플로팅 액션 버튼 */
            .mobile-fab {
                position: fixed;
                bottom: 90px;
                right: 20px;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: linear-gradient(135deg, #003d7a 0%, #0056b3 100%);
                color: white;
                border: none;
                box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                cursor: pointer;
                z-index: 1000;
            }
            
            /* 리스트 아이템 */
            .mobile-list-item {
                display: flex;
                align-items: center;
                padding: 12px;
                border-bottom: 1px solid #e5e7eb;
                cursor: pointer;
                transition: background 0.2s;
            }
            
            .mobile-list-item:active {
                background: #f3f4f6;
            }
            
            .mobile-list-item:last-child {
                border-bottom: none;
            }
            
            /* 배지 스타일 */
            .mobile-badge {
                display: inline-flex;
                align-items: center;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 600;
                white-space: nowrap;
            }
            
            .mobile-badge-blue {
                background: #dbeafe;
                color: #1e40af;
            }
            
            .mobile-badge-green {
                background: #dcfce7;
                color: #166534;
            }
            
            .mobile-badge-red {
                background: #fee2e2;
                color: #dc2626;
            }
            
            .mobile-badge-yellow {
                background: #fef3c7;
                color: #92400e;
            }
            
            /* 반응형 */
            @media (max-width: 380px) {
                .mobile-title {
                    font-size: 16px;
                }
                
                .mobile-info-grid {
                    grid-template-columns: 1fr;
                }
                
                .mobile-card {
                    padding: 12px;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // 1. 상임위 의원조회 - 모바일 최적화
    window.app.loadCommitteeMembersPageMobile = function() {
        const html = `
            <div class="mobile-page-container">
                <!-- 헤더 -->
                <div class="mobile-header">
                    <h3 class="mobile-title">
                        <i class="fas fa-users"></i>
                        <span>상임위 의원조회</span>
                    </h3>
                </div>
                
                <!-- 검색바 -->
                <div class="mobile-search-container">
                    <div class="mobile-search-box">
                        <i class="fas fa-search mobile-search-icon"></i>
                        <input type="text" class="mobile-search-input" placeholder="의원명, 정당, 위원회 검색" 
                               onkeyup="app.searchCommitteeMembers(this.value)">
                    </div>
                </div>
                
                <!-- 위원회 필터 탭 -->
                <div class="mobile-tabs">
                    <button class="mobile-tab active" onclick="app.filterCommittee('all')">전체</button>
                    <button class="mobile-tab" onclick="app.filterCommittee('education')">교육위원회</button>
                    <button class="mobile-tab" onclick="app.filterCommittee('economy')">경제실무위원회</button>
                    <button class="mobile-tab" onclick="app.filterCommittee('safety')">안전행정위원회</button>
                    <button class="mobile-tab" onclick="app.filterCommittee('health')">보건복지위원회</button>
                    <button class="mobile-tab" onclick="app.filterCommittee('culture')">문화체육관광위원회</button>
                    <button class="mobile-tab" onclick="app.filterCommittee('construction')">건설교통위원회</button>
                    <button class="mobile-tab" onclick="app.filterCommittee('agriculture')">농정해양위원회</button>
                    <button class="mobile-tab" onclick="app.filterCommittee('women')">여성가족평생교육위원회</button>
                    <button class="mobile-tab" onclick="app.filterCommittee('budget')">예산결산특별위원회</button>
                </div>
                
                <!-- 의원 목록 -->
                <div style="padding: 16px;">
                    ${generateMemberCards()}
                </div>
            </div>
        `;
        
        document.getElementById('mainContent').innerHTML = html;
    };
    
    // 의원 카드 생성
    function generateMemberCards() {
        const members = [
            { name: '김영수', party: '국민의힘', committee: '교육위원회', role: '위원장', district: '수원시갑', phone: '031-8008-7813' },
            { name: '이정민', party: '더불어민주당', committee: '교육위원회', role: '부위원장', district: '성남시을', phone: '031-8008-7814' },
            { name: '박서준', party: '국민의힘', committee: '교육위원회', role: '위원', district: '고양시병', phone: '031-8008-7815' },
            { name: '최지우', party: '더불어민주당', committee: '교육위원회', role: '위원', district: '안양시갑', phone: '031-8008-7816' },
            { name: '정하늘', party: '정의당', committee: '교육위원회', role: '위원', district: '부천시을', phone: '031-8008-7817' }
        ];
        
        return members.map(member => `
            <div class="mobile-card" onclick="app.showMemberDetail('${member.name}')">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                    <div>
                        <h4 style="font-size: 16px; font-weight: 600; color: #1f2937; margin: 0;">
                            ${member.name}
                        </h4>
                        <div style="display: flex; gap: 8px; margin-top: 6px;">
                            <span class="mobile-badge mobile-badge-blue">${member.party}</span>
                            ${member.role === '위원장' ? '<span class="mobile-badge mobile-badge-yellow">위원장</span>' : ''}
                            ${member.role === '부위원장' ? '<span class="mobile-badge mobile-badge-green">부위원장</span>' : ''}
                        </div>
                    </div>
                    <button class="mobile-btn-secondary" style="padding: 8px 12px;" 
                            onclick="event.stopPropagation(); app.callMember('${member.phone}')">
                        <i class="fas fa-phone"></i>
                    </button>
                </div>
                
                <div class="mobile-info-grid">
                    <div class="mobile-info-item">
                        <i class="fas fa-briefcase"></i>
                        <span>${member.committee}</span>
                    </div>
                    <div class="mobile-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${member.district}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // 2. 직원조회 - 모바일 최적화
    window.app.loadStaffDirectoryPageMobile = function() {
        const html = `
            <div class="mobile-page-container">
                <!-- 헤더 -->
                <div class="mobile-header">
                    <h3 class="mobile-title">
                        <i class="fas fa-address-book"></i>
                        <span>직원 조회</span>
                    </h3>
                </div>
                
                <!-- 검색바 -->
                <div class="mobile-search-container">
                    <div class="mobile-search-box">
                        <i class="fas fa-search mobile-search-icon"></i>
                        <input type="text" class="mobile-search-input" placeholder="이름, 부서, 직급으로 검색" 
                               onkeyup="app.searchStaff(this.value)">
                    </div>
                </div>
                
                <!-- 부서 필터 탭 -->
                <div class="mobile-tabs">
                    <button class="mobile-tab active" onclick="app.filterDepartment('all')">전체</button>
                    <button class="mobile-tab" onclick="app.filterDepartment('secretary')">의회사무처</button>
                    <button class="mobile-tab" onclick="app.filterDepartment('planning')">기획관리담당관</button>
                    <button class="mobile-tab" onclick="app.filterDepartment('legislation')">의사담당관</button>
                    <button class="mobile-tab" onclick="app.filterDepartment('pr')">홍보담당관</button>
                    <button class="mobile-tab" onclick="app.filterDepartment('audit')">감사담당관</button>
                </div>
                
                <!-- 직원 목록 -->
                <div style="padding: 16px;">
                    ${generateStaffCards()}
                </div>
            </div>
        `;
        
        document.getElementById('mainContent').innerHTML = html;
    };
    
    // 직원 카드 생성
    function generateStaffCards() {
        const staff = [
            { name: '김철수', position: '사무처장', department: '의회사무처', phone: '031-8008-7001', email: 'kim@gg.go.kr' },
            { name: '이영희', position: '담당관', department: '기획관리담당관', phone: '031-8008-7101', email: 'lee@gg.go.kr' },
            { name: '박민수', position: '주무관', department: '의사담당관', phone: '031-8008-7201', email: 'park@gg.go.kr' },
            { name: '정수진', position: '주무관', department: '홍보담당관', phone: '031-8008-7301', email: 'jung@gg.go.kr' },
            { name: '최동훈', position: '주무관', department: '감사담당관', phone: '031-8008-7401', email: 'choi@gg.go.kr' }
        ];
        
        return staff.map(person => `
            <div class="mobile-card" onclick="app.showStaffDetail('${person.name}')">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <h4 style="font-size: 16px; font-weight: 600; color: #1f2937; margin: 0;">
                            ${person.name}
                        </h4>
                        <p style="font-size: 14px; color: #6b7280; margin: 4px 0;">
                            ${person.position} · ${person.department}
                        </p>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button class="mobile-btn-secondary" style="padding: 8px; width: 36px; height: 36px;" 
                                onclick="event.stopPropagation(); app.callStaff('${person.phone}')">
                            <i class="fas fa-phone"></i>
                        </button>
                        <button class="mobile-btn-secondary" style="padding: 8px; width: 36px; height: 36px;" 
                                onclick="event.stopPropagation(); app.emailStaff('${person.email}')">
                            <i class="fas fa-envelope"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // 3. 의안 발의 - 모바일 최적화
    window.app.loadBillPageMobile = function() {
        const html = `
            <div class="mobile-page-container">
                <!-- 헤더 -->
                <div class="mobile-header">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3 class="mobile-title">
                            <i class="fas fa-file-contract"></i>
                            <span>의안 발의</span>
                        </h3>
                        <button class="mobile-btn-primary" style="padding: 8px 16px;" onclick="app.addNewBill()">
                            <i class="fas fa-plus"></i>
                            <span>새 의안</span>
                        </button>
                    </div>
                </div>
                
                <!-- 통계 카드 -->
                <div style="padding: 16px; background: white; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: 700; color: #003d7a;">32</div>
                            <div style="font-size: 12px; color: #6b7280;">총 발의</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: 700; color: #16a34a;">18</div>
                            <div style="font-size: 12px; color: #6b7280;">가결</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; font-weight: 700; color: #eab308;">8</div>
                            <div style="font-size: 12px; color: #6b7280;">심사중</div>
                        </div>
                    </div>
                </div>
                
                <!-- 필터 탭 -->
                <div class="mobile-tabs">
                    <button class="mobile-tab active" onclick="app.filterBills('all')">전체</button>
                    <button class="mobile-tab" onclick="app.filterBills('passed')">가결</button>
                    <button class="mobile-tab" onclick="app.filterBills('pending')">심사중</button>
                    <button class="mobile-tab" onclick="app.filterBills('rejected')">부결</button>
                    <button class="mobile-tab" onclick="app.filterBills('withdrawn')">철회</button>
                </div>
                
                <!-- 의안 목록 -->
                <div style="padding: 16px;">
                    ${generateBillCards()}
                </div>
            </div>
        `;
        
        document.getElementById('mainContent').innerHTML = html;
    };
    
    // 의안 카드 생성
    function generateBillCards() {
        const bills = [
            { 
                title: '경기도 청년 주거안정 지원 조례안',
                status: 'passed',
                statusText: '가결',
                date: '2025.01.15',
                summary: '청년층의 주거 안정을 위한 지원 방안 마련'
            },
            {
                title: '경기도 미세먼지 저감 특별 조례안',
                status: 'pending',
                statusText: '심사중',
                date: '2025.01.10',
                summary: '미세먼지 저감을 위한 종합적인 대책 수립'
            },
            {
                title: '경기도 소상공인 지원 조례 일부개정안',
                status: 'passed',
                statusText: '가결',
                date: '2025.01.05',
                summary: '코로나19 피해 소상공인 추가 지원'
            }
        ];
        
        return bills.map(bill => `
            <div class="mobile-card" onclick="app.showBillDetail('${bill.title}')">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <h4 style="font-size: 15px; font-weight: 600; color: #1f2937; margin: 0; flex: 1; line-height: 1.3;">
                        ${bill.title}
                    </h4>
                    <span class="mobile-badge ${bill.status === 'passed' ? 'mobile-badge-green' : 
                                                bill.status === 'pending' ? 'mobile-badge-yellow' : 
                                                'mobile-badge-red'}">
                        ${bill.statusText}
                    </span>
                </div>
                <p style="font-size: 13px; color: #6b7280; margin: 8px 0; line-height: 1.4;">
                    ${bill.summary}
                </p>
                <div style="font-size: 12px; color: #9ca3af;">
                    <i class="fas fa-calendar"></i> ${bill.date}
                </div>
            </div>
        `).join('');
    }
    
    // 4. 발언 기록 - 모바일 최적화
    window.app.loadSpeechPageMobile = function() {
        const html = `
            <div class="mobile-page-container">
                <!-- 헤더 -->
                <div class="mobile-header">
                    <h3 class="mobile-title">
                        <i class="fas fa-microphone-alt"></i>
                        <span>발언 기록</span>
                    </h3>
                </div>
                
                <!-- 통계 -->
                <div style="padding: 16px; background: linear-gradient(135deg, #003d7a 0%, #0056b3 100%); color: white;">
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                        <div>
                            <div style="font-size: 28px; font-weight: 700;">15</div>
                            <div style="font-size: 13px; opacity: 0.9;">본회의 발언</div>
                        </div>
                        <div>
                            <div style="font-size: 28px; font-weight: 700;">28</div>
                            <div style="font-size: 13px; opacity: 0.9;">상임위 질의</div>
                        </div>
                    </div>
                </div>
                
                <!-- 발언 유형 필터 -->
                <div class="mobile-tabs">
                    <button class="mobile-tab active" onclick="app.filterSpeech('all')">전체</button>
                    <button class="mobile-tab" onclick="app.filterSpeech('5min')">5분발언</button>
                    <button class="mobile-tab" onclick="app.filterSpeech('question')">대정부질문</button>
                    <button class="mobile-tab" onclick="app.filterSpeech('discussion')">토론</button>
                    <button class="mobile-tab" onclick="app.filterSpeech('suggestion')">건의</button>
                </div>
                
                <!-- 발언 목록 -->
                <div style="padding: 16px;">
                    ${generateSpeechCards()}
                </div>
            </div>
        `;
        
        document.getElementById('mainContent').innerHTML = html;
    };
    
    // 발언 카드 생성
    function generateSpeechCards() {
        const speeches = [
            {
                type: '5분발언',
                title: '청년 주거안정 특별법안 제정 촉구',
                date: '2025.01.17',
                duration: '5분',
                summary: '청년층의 주거 불안정 문제 해결을 위한 특별법 제정 필요성 강조'
            },
            {
                type: '대정부질문',
                title: '교육 예산 증액 필요성',
                date: '2025.01.15',
                duration: '10분',
                summary: '디지털 교육 인프라 구축을 위한 예산 증액 요청'
            },
            {
                type: '토론',
                title: '미세먼지 저감 대책 관련',
                date: '2025.01.12',
                duration: '15분',
                summary: '경기도 미세먼지 저감을 위한 종합 대책 수립 토론'
            }
        ];
        
        return speeches.map(speech => `
            <div class="mobile-card" onclick="app.showSpeechDetail('${speech.title}')">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span class="mobile-badge mobile-badge-blue">${speech.type}</span>
                    <span style="font-size: 12px; color: #6b7280;">
                        <i class="fas fa-clock"></i> ${speech.duration}
                    </span>
                </div>
                <h4 style="font-size: 15px; font-weight: 600; color: #1f2937; margin: 8px 0; line-height: 1.3;">
                    ${speech.title}
                </h4>
                <p style="font-size: 13px; color: #6b7280; margin: 8px 0; line-height: 1.4;">
                    ${speech.summary}
                </p>
                <div style="font-size: 12px; color: #9ca3af;">
                    <i class="fas fa-calendar"></i> ${speech.date}
                </div>
            </div>
        `).join('');
    }
    
    // 5. 민원 처리 - 모바일 최적화
    window.app.loadCivilPageMobile = function() {
        const html = `
            <div class="mobile-page-container">
                <!-- 헤더 -->
                <div class="mobile-header">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h3 class="mobile-title">
                            <i class="fas fa-envelope-open-text"></i>
                            <span>민원 처리</span>
                        </h3>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span class="mobile-badge mobile-badge-green">처리율 94%</span>
                        </div>
                    </div>
                </div>
                
                <!-- 통계 요약 -->
                <div style="padding: 16px; background: white; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center;">
                        <div>
                            <div style="font-size: 20px; font-weight: 700; color: #003d7a;">248</div>
                            <div style="font-size: 11px; color: #6b7280;">총 접수</div>
                        </div>
                        <div>
                            <div style="font-size: 20px; font-weight: 700; color: #16a34a;">233</div>
                            <div style="font-size: 11px; color: #6b7280;">처리완료</div>
                        </div>
                        <div>
                            <div style="font-size: 20px; font-weight: 700; color: #eab308;">15</div>
                            <div style="font-size: 11px; color: #6b7280;">처리중</div>
                        </div>
                    </div>
                </div>
                
                <!-- 카테고리 필터 -->
                <div class="mobile-tabs">
                    <button class="mobile-tab active" onclick="app.filterCivil('all')">전체</button>
                    <button class="mobile-tab" onclick="app.filterCivil('traffic')">교통</button>
                    <button class="mobile-tab" onclick="app.filterCivil('education')">교육</button>
                    <button class="mobile-tab" onclick="app.filterCivil('welfare')">복지</button>
                    <button class="mobile-tab" onclick="app.filterCivil('environment')">환경</button>
                    <button class="mobile-tab" onclick="app.filterCivil('safety')">안전</button>
                </div>
                
                <!-- 민원 목록 -->
                <div style="padding: 16px;">
                    ${generateCivilCards()}
                </div>
                
                <!-- 플로팅 액션 버튼 -->
                <button class="mobile-fab" onclick="app.addNewCivil()">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `;
        
        document.getElementById('mainContent').innerHTML = html;
    };
    
    // 민원 카드 생성
    function generateCivilCards() {
        const civils = [
            {
                category: '교통',
                title: '수원역 주변 교통체증 개선 요청',
                status: 'completed',
                statusText: '처리완료',
                date: '2025.01.16',
                priority: 'high'
            },
            {
                category: '교육',
                title: '초등학교 통학로 안전 시설 설치',
                status: 'processing',
                statusText: '처리중',
                date: '2025.01.15',
                priority: 'urgent'
            },
            {
                category: '환경',
                title: '공원 내 쓰레기통 추가 설치 요청',
                status: 'completed',
                statusText: '처리완료',
                date: '2025.01.14',
                priority: 'normal'
            }
        ];
        
        return civils.map(civil => `
            <div class="mobile-card" onclick="app.showCivilDetail('${civil.title}')">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <div style="display: flex; gap: 6px;">
                        <span class="mobile-badge mobile-badge-blue">${civil.category}</span>
                        ${civil.priority === 'urgent' ? '<span class="mobile-badge mobile-badge-red">긴급</span>' : ''}
                        ${civil.priority === 'high' ? '<span class="mobile-badge mobile-badge-yellow">중요</span>' : ''}
                    </div>
                    <span class="mobile-badge ${civil.status === 'completed' ? 'mobile-badge-green' : 'mobile-badge-yellow'}">
                        ${civil.statusText}
                    </span>
                </div>
                <h4 style="font-size: 15px; font-weight: 600; color: #1f2937; margin: 8px 0; line-height: 1.3;">
                    ${civil.title}
                </h4>
                <div style="font-size: 12px; color: #9ca3af;">
                    <i class="fas fa-calendar"></i> ${civil.date}
                </div>
            </div>
        `).join('');
    }
    
    // 6. 출석 현황 - 모바일 최적화
    window.app.loadAttendancePageMobile = function() {
        const html = `
            <div class="mobile-page-container">
                <!-- 헤더 -->
                <div class="mobile-header">
                    <h3 class="mobile-title">
                        <i class="fas fa-calendar-check"></i>
                        <span>출석 현황</span>
                    </h3>
                </div>
                
                <!-- 출석률 카드 -->
                <div style="padding: 16px; background: linear-gradient(135deg, #003d7a 0%, #0056b3 100%);">
                    <div style="text-align: center; color: white;">
                        <div style="font-size: 48px; font-weight: 700; margin-bottom: 8px;">98.5%</div>
                        <div style="font-size: 14px; opacity: 0.9;">전체 출석률</div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 20px;">
                        <div style="text-align: center; color: white;">
                            <div style="font-size: 20px; font-weight: 600;">98.5%</div>
                            <div style="font-size: 11px; opacity: 0.8;">본회의</div>
                        </div>
                        <div style="text-align: center; color: white;">
                            <div style="font-size: 20px; font-weight: 600;">96%</div>
                            <div style="font-size: 11px; opacity: 0.8;">상임위</div>
                        </div>
                        <div style="text-align: center; color: white;">
                            <div style="font-size: 20px; font-weight: 600;">100%</div>
                            <div style="font-size: 11px; opacity: 0.8;">특별위</div>
                        </div>
                    </div>
                </div>
                
                <!-- 캘린더 섹션 -->
                <div style="padding: 16px; background: white;">
                    <h4 style="font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 12px;">
                        2025년 1월 출석 현황
                    </h4>
                    <div id="attendanceCalendar" style="background: #f9fafb; border-radius: 8px; padding: 12px;">
                        <!-- 간단한 캘린더 UI -->
                        ${generateSimpleCalendar()}
                    </div>
                </div>
                
                <!-- 최근 출석 내역 -->
                <div style="padding: 16px;">
                    <h4 style="font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 12px;">
                        최근 출석 내역
                    </h4>
                    ${generateAttendanceList()}
                </div>
            </div>
        `;
        
        document.getElementById('mainContent').innerHTML = html;
    };
    
    // 간단한 캘린더 생성
    function generateSimpleCalendar() {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        let calendarHTML = '<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px;">';
        
        // 요일 헤더
        days.forEach(day => {
            calendarHTML += `<div style="text-align: center; font-size: 11px; color: #6b7280; padding: 4px;">${day}</div>`;
        });
        
        // 날짜 (간단한 예시)
        for (let i = 1; i <= 31; i++) {
            const isAttended = Math.random() > 0.1;
            calendarHTML += `
                <div style="text-align: center; padding: 8px 4px; border-radius: 4px; 
                            background: ${isAttended ? '#dcfce7' : '#fee2e2'}; 
                            color: ${isAttended ? '#166534' : '#dc2626'};
                            font-size: 12px; cursor: pointer;"
                     onclick="app.showDayDetail(${i})">
                    ${i}
                </div>
            `;
        }
        
        calendarHTML += '</div>';
        return calendarHTML;
    }
    
    // 출석 내역 리스트 생성
    function generateAttendanceList() {
        const attendances = [
            { date: '2025.01.18', type: '본회의', status: '출석', time: '10:00' },
            { date: '2025.01.17', type: '교육위원회', status: '출석', time: '14:00' },
            { date: '2025.01.16', type: '본회의', status: '출석', time: '10:00' },
            { date: '2025.01.15', type: '예결위', status: '청가', time: '09:00' },
            { date: '2025.01.14', type: '본회의', status: '출석', time: '10:00' }
        ];
        
        return attendances.map(item => `
            <div class="mobile-card" onclick="app.showAttendanceDetail('${item.date}')">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-size: 14px; font-weight: 600; color: #1f2937;">
                            ${item.type}
                        </div>
                        <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">
                            <i class="fas fa-calendar"></i> ${item.date} 
                            <i class="fas fa-clock" style="margin-left: 8px;"></i> ${item.time}
                        </div>
                    </div>
                    <span class="mobile-badge ${item.status === '출석' ? 'mobile-badge-green' : 'mobile-badge-yellow'}">
                        ${item.status}
                    </span>
                </div>
            </div>
        `).join('');
    }
    
    // 페이지 라우팅 오버라이드
    const originalLoadPage = window.app.loadPage;
    window.app.loadPage = function(page) {
        // 모바일 최적화 페이지 우선 로드
        switch(page) {
            case 'committee-members':
                window.app.loadCommitteeMembersPageMobile();
                break;
            case 'staff-directory':
                window.app.loadStaffDirectoryPageMobile();
                break;
            case 'bill':
                window.app.loadBillPageMobile();
                break;
            case 'speech':
                window.app.loadSpeechPageMobile();
                break;
            case 'civil':
                window.app.loadCivilPageMobile();
                break;
            case 'attendance':
                window.app.loadAttendancePageMobile();
                break;
            default:
                // 기존 페이지 로더 사용
                if (originalLoadPage) {
                    originalLoadPage.call(this, page);
                }
        }
    };
    
    // 헬퍼 함수들
    window.app.searchCommitteeMembers = function(query) {
        console.log('검색어:', query);
        // 검색 로직 구현
    };
    
    window.app.filterCommittee = function(committee) {
        document.querySelectorAll('.mobile-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');
        console.log('위원회 필터:', committee);
    };
    
    window.app.callMember = function(phone) {
        if (confirm(`${phone}로 전화를 걸까요?`)) {
            window.location.href = `tel:${phone}`;
        }
    };
    
    window.app.showMemberDetail = function(name) {
        app.showToast(`${name} 의원 상세정보`);
    };
    
    // 초기화
    applyMobileStyles();
    console.log('모바일 UI/UX 개선 완료');
    
})();