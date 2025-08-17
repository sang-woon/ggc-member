// App Modals - Modal System and Detail Views
Object.assign(window.app, {
    // Modal System
    showModal: function(modalId, options = {}) {
        // 기존 모달이 있으면 제거
        this.closeModal();
        
        const modal = document.createElement('div');
        modal.id = 'dynamic-modal';
        modal.className = `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${options.modalClass || ''}`;
        
        const modalContent = document.createElement('div');
        modalContent.className = 'bg-white rounded-lg w-11/12 max-w-md max-h-[90vh] overflow-hidden';
        
        let html = '';
        
        // 모달 헤더
        if (options.title) {
            html += `
                <div class="bg-gray-50 px-4 py-3 border-b">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold">${options.title}</h3>
                        <button onclick="app.closeModal()" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `;
        }
        
        // 모달 본문
        html += `
            <div class="modal-body p-4 ${options.modalClass === 'modal-scrollable' ? 'max-h-96 overflow-y-auto' : ''}">
                ${options.content || ''}
            </div>
        `;
        
        // 모달 푸터
        if (options.confirmText || options.cancelText || options.buttons) {
            html += '<div class="bg-gray-50 px-4 py-3 border-t flex gap-2 justify-end">';
            
            if (options.buttons) {
                options.buttons.forEach(button => {
                    html += `<button onclick="${button.onclick}" class="${button.class || 'btn-secondary'}">${button.text}</button>`;
                });
            } else {
                if (options.cancelText) {
                    html += `<button onclick="app.closeModal()" class="btn-secondary">${options.cancelText}</button>`;
                }
                if (options.confirmText) {
                    const confirmAction = options.onConfirm ? options.onConfirm : 'app.closeModal()';
                    html += `<button onclick="${confirmAction}" class="btn-primary">${options.confirmText}</button>`;
                }
            }
            
            html += '</div>';
        }
        
        modalContent.innerHTML = html;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // 모달 외부 클릭 시 닫기
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // ESC 키로 닫기
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // 바디 스크롤 방지
        document.body.style.overflow = 'hidden';
    },
    
    closeModal: function() {
        const modal = document.getElementById('dynamic-modal');
        if (modal) {
            modal.remove();
        }
        // 바디 스크롤 복원
        document.body.style.overflow = '';
    },
    
    // Show Attendance Detail
    showAttendanceDetail: function(date, type, session) {
        const attendanceData = {
            '2024.01.15': {
                status: '출석',
                arrivalTime: '14:00',
                sessionType: '본회의',
                session: '제398회 국회(임시회) 제3차',
                agenda: [
                    {
                        title: '주택임대차보호법 일부개정법률안',
                        proposer: '김영수 의원 등 15인',
                        result: '가결',
                        vote: '찬성'
                    },
                    {
                        title: '청년 주거안정 특별법안',
                        proposer: '이정민 의원 등 22인',
                        result: '위원회 회부',
                        vote: '찬성'
                    },
                    {
                        title: '임대료 안정화 특별법안',
                        proposer: '박지원 의원 등 18인',
                        result: '심사 보류',
                        vote: '기권'
                    }
                ],
                speeches: [
                    '주택임대차보호법 개정안에 대한 찬성 토론',
                    '청년 주거정책 개선 필요성 강조'
                ]
            },
            '2024.01.14': {
                status: '출석',
                arrivalTime: '10:00',
                sessionType: '교육위원회',
                session: '법안심사소위원회',
                agenda: [
                    {
                        title: '교육기본법 일부개정법률안',
                        proposer: '교육위원회',
                        result: '수정가결',
                        vote: '찬성'
                    }
                ]
            },
            '2024.01.12': {
                status: '청가',
                reason: '지역구 현안 해결 업무',
                replacement: '박지원 의원',
                sessionType: '본회의',
                session: '제398회 국회(임시회) 제2차'
            }
        };

        const data = attendanceData[date] || {
            status: '출석',
            arrivalTime: '14:00',
            sessionType: type,
            session: session
        };

        let content = `
            <div class="space-y-4">
                <div class="bg-gray-50 p-3 rounded">
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <div><span class="text-gray-600">날짜:</span> ${date}</div>
                        <div><span class="text-gray-600">상태:</span> 
                            <span class="ml-1 px-2 py-1 rounded text-xs ${data.status === '출석' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${data.status}</span>
                        </div>
                        <div><span class="text-gray-600">회의:</span> ${data.sessionType}</div>
                        ${data.arrivalTime ? `<div><span class="text-gray-600">도착:</span> ${data.arrivalTime}</div>` : ''}
                    </div>
                </div>
                
                <div>
                    <div class="text-sm font-semibold mb-2">${data.session}</div>
                </div>`;

        if (data.status === '출석' && data.agenda) {
            content += `
                <div class="border-t pt-3">
                    <h4 class="font-semibold mb-2">심사 안건</h4>
                    <div class="space-y-2">`;
            
            data.agenda.forEach((item, index) => {
                content += `
                    <div class="bg-gray-50 p-3 rounded text-sm">
                        <div class="font-medium mb-1">${item.title}</div>
                        <div class="text-gray-600 text-xs mb-2">발의: ${item.proposer}</div>
                        <div class="flex justify-between items-center">
                            <span class="text-xs px-2 py-1 rounded ${item.result === '가결' ? 'bg-green-100 text-green-800' : item.result === '위원회 회부' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">${item.result}</span>
                            <span class="text-xs px-2 py-1 rounded ${item.vote === '찬성' ? 'bg-green-100 text-green-800' : item.vote === '반대' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}">투표: ${item.vote}</span>
                        </div>
                    </div>`;
            });
            
            content += `
                    </div>
                </div>`;

            if (data.speeches && data.speeches.length > 0) {
                content += `
                <div class="border-t pt-3">
                    <h4 class="font-semibold mb-2">발언 내용</h4>
                    <ul class="space-y-1">`;
                data.speeches.forEach(speech => {
                    content += `<li class="text-sm text-gray-600">• ${speech}</li>`;
                });
                content += `</ul></div>`;
            }

            if (data.notes) {
                content += `
                <div class="border-t pt-3">
                    <h4 class="font-semibold mb-2">비고</h4>
                    <p class="text-sm text-gray-600">${data.notes}</p>
                </div>`;
            }
        } else if (data.status === '청가') {
            content += `
                </div>
                <div class="border-t pt-3">
                    <div class="text-sm">
                        <div class="mb-2"><span class="text-gray-600">사유:</span> ${data.reason}</div>
                        <div><span class="text-gray-600">대리:</span> ${data.replacement}</div>
                    </div>
                </div>`;
        }

        content += `
                <div class="border-t pt-3">
                    <button onclick="app.downloadAttendanceRecord('${date}')" class="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
                        <i class="fas fa-download mr-2"></i>출석 기록 다운로드
                    </button>
                </div>
            </div>`;

        this.showModal('attendance-detail', {
            title: '출석 상세 정보',
            content: content,
            confirmText: '확인',
            modalClass: 'modal-scrollable'
        });
    },

    // Download Attendance Record
    downloadAttendanceRecord: function(date) {
        this.showNotification(`${date} 출석 기록을 다운로드합니다.`);
    },

    // Show Bill Detail
    showBillDetail: function(billId) {
        const billData = {
            '2024-001': {
                title: '주택임대차보호법 일부개정법률안',
                billNumber: '제2024-001호',
                type: '대표발의',
                status: '가결',
                proposer: '김영수',
                coProposers: ['이정민', '박지원', '최은영', '정태호', '김성주', '윤석열', '한동훈', '이재명', '김기현', '박찬대', '조국', '안철수', '심상정', '류호정', '용혜인'],
                proposalDate: '2024.01.12',
                committee: '법제사법위원회',
                summary: '임차인 보호 강화를 위한 계약갱신청구권 기간 연장 및 전월세 상한제 개선',
                mainContent: [
                    '계약갱신청구권 행사 기간을 현행 1회에서 2회로 확대',
                    '전월세 인상률 상한을 5%에서 2.5%로 하향 조정',
                    '임대차 분쟁조정위원회 설치 의무화',
                    '보증금 반환 지연 시 지연이자율 상향'
                ],
                timeline: [
                    { date: '2024.01.12', event: '법안 발의', status: 'completed' },
                    { date: '2024.01.15', event: '위원회 회부', status: 'completed' },
                    { date: '2024.01.20', event: '상임위 심사', status: 'completed' },
                    { date: '2024.01.25', event: '법안소위 심사', status: 'completed' },
                    { date: '2024.01.28', event: '본회의 상정', status: 'completed' },
                    { date: '2024.01.30', event: '본회의 가결', status: 'completed' }
                ],
                votes: { yes: 178, no: 42, abstain: 15 },
                documents: [
                    { name: '법안 원문', type: 'PDF', size: '2.3MB' },
                    { name: '검토보고서', type: 'PDF', size: '1.8MB' },
                    { name: '공청회 자료', type: 'PDF', size: '5.2MB' }
                ]
            }
        };

        const bill = billData[billId] || {
            title: '법안 정보',
            billNumber: billId,
            type: '발의',
            status: '심사중',
            proposer: '김영수',
            coProposers: [],
            proposalDate: '2024.01.01',
            committee: '소관위원회',
            summary: '법안 요약 정보',
            mainContent: ['법안 주요 내용'],
            timeline: [],
            votes: null,
            documents: []
        };

        let content = `
            <div class="space-y-4">
                <div class="bg-gray-50 p-3 rounded">
                    <div class="text-sm space-y-1">
                        <div><span class="text-gray-600">법안번호:</span> ${bill.billNumber}</div>
                        <div><span class="text-gray-600">발의구분:</span> ${bill.type}</div>
                        <div><span class="text-gray-600">발의일:</span> ${bill.proposalDate}</div>
                        <div><span class="text-gray-600">소관위:</span> ${bill.committee}</div>
                        <div><span class="text-gray-600">현재상태:</span> 
                            <span class="ml-1 px-2 py-1 rounded text-xs ${bill.status === '가결' ? 'bg-green-100 text-green-800' : bill.status === '심사중' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">${bill.status}</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-2">법안 요약</h4>
                    <p class="text-sm text-gray-700">${bill.summary}</p>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-2">주요 내용</h4>
                    <ul class="text-sm text-gray-700 space-y-1">
                        ${bill.mainContent.map(content => `<li>• ${content}</li>`).join('')}
                    </ul>
                </div>`;

        if (bill.coProposers.length > 0) {
            content += `
                <div>
                    <h4 class="font-semibold mb-2">공동발의자 (${bill.coProposers.length}명)</h4>
                    <div class="text-sm text-gray-600">
                        ${bill.coProposers.slice(0, 5).join(', ')}${bill.coProposers.length > 5 ? ` 외 ${bill.coProposers.length - 5}명` : ''}
                    </div>
                </div>`;
        }

        if (bill.votes) {
            content += `
                <div>
                    <h4 class="font-semibold mb-2">표결 결과</h4>
                    <div class="grid grid-cols-3 gap-2 text-center text-sm">
                        <div class="bg-green-50 p-2 rounded">
                            <div class="font-semibold text-green-600">${bill.votes.yes}</div>
                            <div class="text-xs text-gray-600">찬성</div>
                        </div>
                        <div class="bg-red-50 p-2 rounded">
                            <div class="font-semibold text-red-600">${bill.votes.no}</div>
                            <div class="text-xs text-gray-600">반대</div>
                        </div>
                        <div class="bg-gray-50 p-2 rounded">
                            <div class="font-semibold text-gray-600">${bill.votes.abstain}</div>
                            <div class="text-xs text-gray-600">기권</div>
                        </div>
                    </div>
                </div>`;
        }

        if (bill.timeline.length > 0) {
            content += `
                <div>
                    <h4 class="font-semibold mb-2">처리 경과</h4>
                    <div class="space-y-2">
                        ${bill.timeline.map(item => `
                            <div class="flex items-center text-sm">
                                <div class="w-2 h-2 rounded-full ${item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'} mr-3"></div>
                                <div class="flex-1">
                                    <span class="text-gray-600">${item.date}</span>
                                    <span class="ml-2">${item.event}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
        }

        if (bill.documents.length > 0) {
            content += `
                <div>
                    <h4 class="font-semibold mb-2">관련 문서</h4>
                    <div class="space-y-2">
                        ${bill.documents.map(doc => `
                            <div class="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                                <div class="flex items-center">
                                    <i class="fas fa-file-pdf text-red-500 mr-2"></i>
                                    <span>${doc.name}</span>
                                </div>
                                <div class="text-xs text-gray-500">${doc.size}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
        }

        content += `</div>`;

        this.showModal('bill-detail', {
            title: bill.title,
            content: content,
            confirmText: '확인',
            modalClass: 'modal-scrollable'
        });
    },

    // Show Bill Filters
    showBillFilters: function() {
        const content = `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">발의구분</label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" checked class="mr-2"> 대표발의
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" checked class="mr-2"> 공동발의
                        </label>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">처리상태</label>
                    <div class="space-y-2">
                        <label class="flex items-center">
                            <input type="checkbox" checked class="mr-2"> 가결
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" checked class="mr-2"> 심사중
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" checked class="mr-2"> 계류
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2"> 부결
                        </label>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">기간</label>
                    <div class="grid grid-cols-2 gap-2">
                        <input type="date" class="border rounded px-2 py-1 text-sm">
                        <input type="date" class="border rounded px-2 py-1 text-sm">
                    </div>
                </div>
            </div>
        `;

        this.showModal('bill-filters', {
            title: '법안 필터',
            content: content,
            buttons: [
                { text: '초기화', onclick: 'app.resetBillFilters()', class: 'btn-secondary' },
                { text: '적용', onclick: 'app.applyBillFilters(); app.closeModal();', class: 'btn-primary' }
            ]
        });
    },

    // Show New Bill Form
    showNewBillForm: function() {
        const content = `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">법안명 *</label>
                    <input type="text" placeholder="예: ○○법 일부개정법률안" class="w-full border rounded px-3 py-2 text-sm">
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">발의구분 *</label>
                    <select class="w-full border rounded px-3 py-2 text-sm">
                        <option value="대표발의">대표발의</option>
                        <option value="공동발의">공동발의</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">제안이유</label>
                    <textarea placeholder="법안의 제안 배경과 필요성을 입력하세요" class="w-full border rounded px-3 py-2 text-sm h-20"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">주요내용</label>
                    <textarea placeholder="법안의 주요 개정 내용을 입력하세요" class="w-full border rounded px-3 py-2 text-sm h-20"></textarea>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">공동발의자</label>
                    <input type="text" placeholder="공동발의자를 입력하세요 (쉼표로 구분)" class="w-full border rounded px-3 py-2 text-sm">
                    <div class="text-xs text-gray-500 mt-1">예: 김○○, 이○○, 박○○</div>
                </div>
            </div>
        `;

        this.showModal('new-bill', {
            title: '새 법안 발의',
            content: content,
            buttons: [
                { text: '취소', onclick: 'app.closeModal()', class: 'btn-secondary' },
                { text: '임시저장', onclick: 'app.saveBillDraft(); app.closeModal();', class: 'btn-secondary' },
                { text: '발의하기', onclick: 'app.submitBill(); app.closeModal();', class: 'btn-primary' }
            ]
        });
    },

    // Show Bill Stats
    showBillStats: function(type) {
        const stats = {
            total: { title: '전체 발의 법안', count: 32, details: ['대표발의 18건', '공동발의 14건'] },
            passed: { title: '가결된 법안', count: 18, details: ['본회의 가결 15건', '위원회 가결 3건'] },
            pending: { title: '계류중인 법안', count: 12, details: ['위원회 심사중 8건', '본회의 계류 4건'] },
            rejected: { title: '부결된 법안', count: 2, details: ['본회의 부결 2건'] }
        };

        const stat = stats[type];
        const content = `
            <div class="text-center space-y-4">
                <div class="text-4xl font-bold text-blue-600">${stat.count}건</div>
                <div class="text-lg font-semibold">${stat.title}</div>
                <div class="space-y-1">
                    ${stat.details.map(detail => `<div class="text-sm text-gray-600">${detail}</div>`).join('')}
                </div>
            </div>
        `;

        this.showModal('bill-stats', {
            title: stat.title,
            content: content,
            confirmText: '확인'
        });
    },

    // Show Bill Analytics  
    showBillAnalytics: function() {
        const content = `
            <div class="space-y-4">
                <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">법안 통계</div>
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-blue-50 p-3 rounded text-center">
                        <div class="text-lg font-bold text-blue-600">56.3%</div>
                        <div class="text-xs text-gray-600">가결률</div>
                    </div>
                    <div class="bg-green-50 p-3 rounded text-center">
                        <div class="text-lg font-bold text-green-600">2.7건</div>
                        <div class="text-xs text-gray-600">월평균 발의</div>
                    </div>
                    <div class="bg-purple-50 p-3 rounded text-center">
                        <div class="text-lg font-bold text-purple-600">45일</div>
                        <div class="text-xs text-gray-600">평균 처리기간</div>
                    </div>
                    <div class="bg-orange-50 p-3 rounded text-center">
                        <div class="text-lg font-bold text-orange-600">8.2명</div>
                        <div class="text-xs text-gray-600">평균 공동발의자</div>
                    </div>
                </div>
            </div>
        `;

        this.showModal('bill-analytics', {
            title: '법안 분석',
            content: content,
            confirmText: '확인'
        });
    },

    // Helper functions
    resetBillFilters: function() {
        this.showNotification('필터가 초기화되었습니다.');
    },

    applyBillFilters: function() {
        this.showNotification('필터가 적용되었습니다.');
    },

    saveBillDraft: function() {
        this.showNotification('법안이 임시저장되었습니다.');
    },

    submitBill: function() {
        this.showNotification('법안이 발의되었습니다.');
    },

    showAllBills: function() {
        this.showNotification('전체 법안 목록을 조회합니다.');
    },

    // 출석 상세보기
    showAttendanceDetail: function(date, type, title) {
        this.showModal('attendanceDetail', {
            title: `${date} 출석 상세`,
            content: `
                <div class="space-y-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="font-bold text-blue-800 mb-2">${title}</div>
                        <div class="text-sm text-gray-600 space-y-1">
                            <div><i class="fas fa-calendar mr-2"></i>${date}</div>
                            <div><i class="fas fa-users mr-2"></i>${type}</div>
                            <div><i class="fas fa-clock mr-2"></i>14:00 ~ 18:00</div>
                            <div><i class="fas fa-map-marker-alt mr-2"></i>경기도의회 본회의장</div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">회의 안건</h5>
                        <ul class="text-sm space-y-2">
                            <li class="flex items-center">
                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                경기도 교육환경 개선 조례안
                            </li>
                            <li class="flex items-center">
                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                2025년도 교육청 예산안 심의
                            </li>
                            <li class="flex items-center">
                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                학교급식 지원 확대 방안
                            </li>
                        </ul>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">출석 정보</h5>
                        <div class="bg-green-50 p-3 rounded text-center">
                            <div class="text-green-800 font-bold text-lg">정상 출석</div>
                            <div class="text-sm text-gray-600 mt-1">도착시간: 13:45 | 퇴장시간: 18:15</div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">발언 기록</h5>
                        <div class="text-sm text-gray-600">
                            <div class="bg-gray-50 p-3 rounded">
                                <div class="font-medium mb-1">5분 자유발언</div>
                                <div class="text-xs">"경기도 내 초등학교 급식 품질 개선 방안에 대해 발언드리겠습니다..."</div>
                                <div class="text-xs text-blue-600 mt-2">
                                    <i class="fas fa-clock mr-1"></i>발언시간: 15:30 ~ 15:35
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            showCancel: false
        });
    },

    // 의안 상세보기
    showBillDetail: function(billId, title) {
        this.showModal('billDetail', {
            title: '의안 상세정보',
            content: `
                <div class="space-y-4">
                    <div class="bg-green-50 p-4 rounded-lg">
                        <div class="font-bold text-green-800 mb-2">${title}</div>
                        <div class="text-sm text-gray-600 space-y-1">
                            <div><i class="fas fa-file-alt mr-2"></i>의안번호: ${billId}</div>
                            <div><i class="fas fa-calendar mr-2"></i>발의일: 2024.12.15</div>
                            <div><i class="fas fa-user mr-2"></i>대표발의: 김영수 의원</div>
                            <div><i class="fas fa-users mr-2"></i>공동발의: 3명</div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">의안 요약</h5>
                        <div class="text-sm text-gray-700 leading-relaxed">
                            이 법률안은 경기도 내 사립학교의 투명한 운영과 교육의 질 향상을 위해 
                            사립학교법의 일부를 개정하려는 것으로, 주요 내용은 다음과 같습니다.
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">주요 개정 내용</h5>
                        <ul class="text-sm space-y-2">
                            <li class="flex items-start">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                                <div>
                                    <div class="font-medium">이사회 구성 투명성 강화</div>
                                    <div class="text-gray-600">외부 전문가 비율 30% 이상 의무화</div>
                                </div>
                            </li>
                            <li class="flex items-start">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                                <div>
                                    <div class="font-medium">재정 운영 공개 확대</div>
                                    <div class="text-gray-600">예산 및 결산 공시 의무화</div>
                                </div>
                            </li>
                            <li class="flex items-start">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
                                <div>
                                    <div class="font-medium">교육과정 감시 체계 구축</div>
                                    <div class="text-gray-600">도교육청 정기 감사 권한 강화</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">심의 현황</h5>
                        <div class="space-y-2">
                            <div class="flex justify-between items-center p-3 bg-blue-50 rounded">
                                <span class="text-sm">소관위원회 접수</span>
                                <span class="text-xs text-blue-600">완료 (2024.12.16)</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-yellow-50 rounded">
                                <span class="text-sm">법안심사소위 심의</span>
                                <span class="text-xs text-yellow-600">진행중</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span class="text-sm">교육위원회 의결</span>
                                <span class="text-xs text-gray-500">대기중</span>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span class="text-sm">본회의 의결</span>
                                <span class="text-xs text-gray-500">대기중</span>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            showCancel: false
        });
    },

    // 발언 상세보기
    showSpeechDetail: function(speechId, title) {
        this.showModal('speechDetail', {
            title: '발언 상세정보',
            content: `
                <div class="space-y-4">
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <div class="font-bold text-purple-800 mb-2">${title}</div>
                        <div class="text-sm text-gray-600 space-y-1">
                            <div><i class="fas fa-calendar mr-2"></i>발언일: 2024.12.10</div>
                            <div><i class="fas fa-clock mr-2"></i>발언시간: 15:30 ~ 15:35</div>
                            <div><i class="fas fa-microphone mr-2"></i>발언유형: 5분 자유발언</div>
                            <div><i class="fas fa-users mr-2"></i>회의: 제372회 정기회 본회의</div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">발언 주제</h5>
                        <div class="text-sm font-medium text-gray-800">
                            "경기도 청년 주거안정 특별법안 제정 촉구"
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">발언 요약</h5>
                        <div class="text-sm text-gray-700 leading-relaxed space-y-3">
                            <p>존경하는 도의회 의장님과 동료 의원 여러분, 오늘 저는 경기도 청년들이 직면한 심각한 주거난 문제에 대해 말씀드리고자 합니다.</p>
                            
                            <p>최근 통계에 따르면 경기도 내 청년층의 주거비 부담률이 전국 평균을 크게 웃돌고 있으며, 특히 수원, 성남, 안산 등 주요 도시의 경우 더욱 심각한 상황입니다.</p>
                            
                            <p>이에 저는 경기도 청년 주거안정 특별법안의 조속한 제정을 촉구하며, 다음과 같은 핵심 내용을 제안드립니다.</p>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">주요 제안사항</h5>
                        <ul class="text-sm space-y-2">
                            <li class="flex items-start">
                                <span class="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></span>
                                <div>청년 전용 임대주택 공급 확대 (연간 5,000세대)</div>
                            </li>
                            <li class="flex items-start">
                                <span class="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></span>
                                <div>전세자금 대출 이자 지원 프로그램 확대</div>
                            </li>
                            <li class="flex items-start">
                                <span class="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></span>
                                <div>청년 주거비 지원금 월 20만원 지급</div>
                            </li>
                            <li class="flex items-start">
                                <span class="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></span>
                                <div>공공 셰어하우스 건설 및 운영 지원</div>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">발언 영상</h5>
                        <div class="bg-gray-100 p-4 rounded text-center">
                            <i class="fas fa-play-circle text-4xl text-gray-400 mb-2"></i>
                            <div class="text-sm text-gray-600">발언 영상 재생</div>
                            <div class="text-xs text-gray-500 mt-1">길이: 4분 52초</div>
                        </div>
                    </div>
                </div>
            `,
            showCancel: false
        });
    },

    // 예산 상세보기
    showBudgetDetail: function(budgetId, title) {
        this.showModal('budgetDetail', {
            title: '예산 심사 상세정보',
            content: `
                <div class="space-y-4">
                    <div class="bg-orange-50 p-4 rounded-lg">
                        <div class="font-bold text-orange-800 mb-2">${title}</div>
                        <div class="text-sm text-gray-600 space-y-1">
                            <div><i class="fas fa-calendar mr-2"></i>심사일: 2024.11.25</div>
                            <div><i class="fas fa-won-sign mr-2"></i>예산규모: 125억원</div>
                            <div><i class="fas fa-building mr-2"></i>소관부서: 경기도교육청</div>
                            <div><i class="fas fa-users mr-2"></i>심사위원회: 교육위원회</div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">예산 개요</h5>
                        <div class="text-sm text-gray-700 leading-relaxed">
                            2025년도 경기도 교육환경 개선 사업 예산안은 도내 초·중·고등학교의 
                            교육인프라 현대화와 디지털 교육 환경 구축을 위한 사업입니다.
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">주요 사업별 예산</h5>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center p-3 bg-blue-50 rounded">
                                <div>
                                    <div class="text-sm font-medium">스마트교실 구축</div>
                                    <div class="text-xs text-gray-600">300개 교실 디지털 기자재 설치</div>
                                </div>
                                <div class="text-sm font-bold text-blue-600">45억원</div>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-green-50 rounded">
                                <div>
                                    <div class="text-sm font-medium">급식실 현대화</div>
                                    <div class="text-xs text-gray-600">50개교 급식실 시설 개선</div>
                                </div>
                                <div class="text-sm font-bold text-green-600">35억원</div>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-purple-50 rounded">
                                <div>
                                    <div class="text-sm font-medium">체육관 건립</div>
                                    <div class="text-xs text-gray-600">15개교 다목적 체육관 신축</div>
                                </div>
                                <div class="text-sm font-bold text-purple-600">30억원</div>
                            </div>
                            <div class="flex justify-between items-center p-3 bg-yellow-50 rounded">
                                <div>
                                    <div class="text-sm font-medium">기타 시설 개선</div>
                                    <div class="text-xs text-gray-600">화장실, 도서관 등</div>
                                </div>
                                <div class="text-sm font-bold text-yellow-600">15억원</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">심사 의견</h5>
                        <div class="bg-green-50 p-3 rounded">
                            <div class="text-sm font-medium text-green-800 mb-2">원안 가결</div>
                            <div class="text-xs text-gray-600">
                                "교육환경 개선의 필요성과 시급성을 인정하여 제출된 예산안을 원안대로 가결함. 
                                다만, 사업 추진 시 투명성과 효율성을 보장할 것을 당부함."
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">첨부 의견</h5>
                        <div class="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                            <div class="font-medium mb-1">김영수 의원 의견:</div>
                            <div class="text-xs">
                                "디지털 교육 환경 구축은 미래 교육을 위한 필수 투자이나, 
                                교사 연수 프로그램과 연계하여 실질적 활용도를 높일 것을 제안합니다."
                            </div>
                        </div>
                    </div>
                </div>
            `,
            showCancel: false
        });
    },

    // 위원회 정보 표시
    showCommitteeInfo: function() {
        this.showModal('committeeInfo', {
            title: '교육위원회 구성 정보',
            content: `
                <div class="space-y-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="font-bold text-blue-800 mb-2">교육위원회 (15명 구성)</div>
                        <div class="text-sm text-gray-600 space-y-1">
                            <div><i class="fas fa-user-tie mr-2"></i>위원장: 김영수 의원 (국민의힘)</div>
                            <div><i class="fas fa-users mr-2"></i>위원: 14명 (여당 8명, 야당 6명)</div>
                            <div><i class="fas fa-calendar mr-2"></i>임기: 2024.06.01 ~ 2026.05.31</div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">주요 소관 업무</h5>
                        <ul class="text-sm space-y-2">
                            <li class="flex items-center">
                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                교육정책 수립 및 심의
                            </li>
                            <li class="flex items-center">
                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                교육예산 심사
                            </li>
                            <li class="flex items-center">
                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                교육 관련 조례안 심의
                            </li>
                            <li class="flex items-center">
                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                교육청 국정감사
                            </li>
                        </ul>
                    </div>
                </div>
            `,
            showCancel: false
        });
    },

    // 전체 활동 보기
    showAllActivities: function() {
        this.showNotification('전체 활동 내역을 조회합니다.');
    },

    // 활동 상세보기
    showActivityDetail: function(type, id) {
        const activities = {
            'speech': {
                title: '5분 자유발언',
                content: '청년 주거안정 특별법안 제정 촉구',
                date: '2025.07.15 14:30'
            },
            'bill': {
                title: '법안 발의',
                content: '주택임대차보호법 일부개정법률안',
                date: '2025.07.12 10:00'
            },
            'civil': {
                title: '민원 답변',
                content: '강남구 교통체계 개선 요청 건',
                date: '2025.07.10 16:45'
            }
        };

        const activity = activities[type];
        if (activity) {
            this.showModal('activityDetail', {
                title: activity.title,
                content: `
                    <div class="space-y-4">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="font-bold mb-2">${activity.content}</div>
                            <div class="text-sm text-gray-600">${activity.date}</div>
                        </div>
                        <div class="text-sm text-gray-700">
                            활동 상세 내용이 여기에 표시됩니다.
                        </div>
                    </div>
                `,
                showCancel: false
            });
        }
    },

    // 보도자료 보기
    showPressReleases: function() {
        this.showNotification('보도자료 목록을 조회합니다.');
    },

    // 회의 보기
    showMeetings: function() {
        const meetingsContent = `
            <div class="space-y-4">
                <!-- 오늘의 회의 -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="font-semibold text-blue-900">오늘의 회의</h4>
                        <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            ${new Date().toLocaleDateString('ko-KR')}
                        </span>
                    </div>
                    <div class="space-y-2">
                        <div class="bg-white p-3 rounded border border-blue-100">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="font-medium text-gray-900">교육위원회 정기회의</div>
                                    <div class="text-sm text-gray-600">14:00 - 16:00</div>
                                    <div class="text-xs text-blue-600">회의실 A | 의장 김영수</div>
                                </div>
                                <div class="text-right">
                                    <span class="inline-block w-3 h-3 bg-green-400 rounded-full mr-1"></span>
                                    <span class="text-xs text-green-600 font-medium">진행중</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 이번 주 회의 일정 -->
                <div>
                    <h4 class="font-semibold mb-3 text-gray-900">이번 주 회의 일정</h4>
                    <div class="space-y-3">
                        <div class="bg-gray-50 p-3 rounded border">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="font-medium text-gray-900">예산결산특별위원회</div>
                                    <div class="text-sm text-gray-600 mt-1">2025.01.18 (토) 10:00</div>
                                    <div class="text-xs text-gray-500 mt-1">
                                        <i class="fas fa-map-marker-alt mr-1"></i>대회의실 | 
                                        <i class="fas fa-users ml-2 mr-1"></i>15명 참석 예정
                                    </div>
                                </div>
                                <span class="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">예정</span>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded border">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="font-medium text-gray-900">도시계획관리위원회</div>
                                    <div class="text-sm text-gray-600 mt-1">2025.01.20 (월) 09:30</div>
                                    <div class="text-xs text-gray-500 mt-1">
                                        <i class="fas fa-map-marker-alt mr-1"></i>소회의실 B | 
                                        <i class="fas fa-users ml-2 mr-1"></i>8명 참석 예정
                                    </div>
                                </div>
                                <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">예정</span>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 p-3 rounded border">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <div class="font-medium text-gray-900">임시회 본회의</div>
                                    <div class="text-sm text-gray-600 mt-1">2025.01.22 (수) 14:00</div>
                                    <div class="text-xs text-gray-500 mt-1">
                                        <i class="fas fa-map-marker-alt mr-1"></i>본회의장 | 
                                        <i class="fas fa-users ml-2 mr-1"></i>전체 의원
                                    </div>
                                </div>
                                <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">중요</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 최근 완료된 회의 -->
                <div>
                    <h4 class="font-semibold mb-3 text-gray-900">최근 완료된 회의</h4>
                    <div class="space-y-2">
                        <div class="bg-green-50 p-3 rounded border border-green-100">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="font-medium text-gray-900">교육위원회 임시회의</div>
                                    <div class="text-sm text-gray-600">2025.01.16 (목) 15:00</div>
                                    <div class="text-xs text-green-600 mt-1">
                                        <i class="fas fa-check-circle mr-1"></i>회의록 작성 완료
                                    </div>
                                </div>
                                <button onclick="app.viewMeetingMinutes('2025-01-16')" 
                                    class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition">
                                    회의록 보기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal('meetings', {
            title: '회의 일정 관리',
            content: meetingsContent,
            confirmText: '확인',
            modalClass: 'modal-scrollable'
        });
    },

    // 통계 보기
    showStatistics: function() {
        this.showNotification('통계 분석 페이지로 이동합니다.');
    },

    // 연락처 보기
    showQuickContacts: function() {
        if (!window.contactsData) {
            this.showNotification('연락처 데이터를 불러올 수 없습니다.', 'error');
            return;
        }

        const vipContacts = window.contactsData.getVIPContacts();
        const allDepartments = window.contactsData.contactsDB;

        // VIP 연락처 카드 생성
        const vipContactsHtml = vipContacts.map(contact => {
            const firstChar = contact.name.charAt(0);
            return `
                <div class="contact-card-vip" onclick="app.showContactDetail('${contact.id}')">
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 ${contact.avatar} rounded-full flex items-center justify-center text-white font-bold text-lg">
                            ${firstChar}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold text-gray-900 truncate">${contact.name}</div>
                            <div class="text-xs text-gray-600">${contact.department}</div>
                            <div class="text-xs text-green-600">
                                <i class="fas fa-phone mr-1"></i>${contact.phone}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // 부서별 연락처 생성
        const departmentsHtml = Object.keys(allDepartments).map(deptKey => {
            const dept = allDepartments[deptKey];
            const memberCount = dept.members.length;
            
            const membersHtml = dept.members.map(member => {
                const firstChar = member.name.charAt(0);
                const responsibilities = member.responsibilities.slice(0, 2).join(', ');
                return `
                    <div class="contact-item" onclick="app.showContactDetail('${member.id}')">
                        <div class="contact-avatar ${member.avatar}">${firstChar}</div>
                        <div class="contact-info">
                            <div class="contact-name">${member.name}</div>
                            <div class="contact-detail">${responsibilities}</div>
                            <div class="contact-phone">${member.phone}</div>
                        </div>
                        <div class="contact-actions">
                            <button onclick="event.stopPropagation(); app.callContact('${member.phone}')" class="contact-btn-call">
                                <i class="fas fa-phone"></i>
                            </button>
                            <button onclick="event.stopPropagation(); app.messageContact('${member.phone}')" class="contact-btn-message">
                                <i class="fas fa-comment"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            const colorClass = dept.color === 'purple' ? 'text-purple-600' : 
                             dept.color === 'blue' ? 'text-blue-600' : 
                             dept.color === 'gray' ? 'text-gray-600' : 'text-gray-600';
            
            const badgeClass = dept.color === 'purple' ? 'bg-purple-100 text-purple-700' : 
                              dept.color === 'blue' ? 'bg-blue-100 text-blue-700' : 
                              dept.color === 'gray' ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-700';

            return `
                <div class="contact-department">
                    <div class="contact-dept-header" onclick="app.toggleDepartment('${deptKey}')">
                        <div class="flex items-center">
                            <i class="fas fa-chevron-right transition-transform dept-arrow" id="arrow-${deptKey}"></i>
                            <i class="${dept.icon} ${colorClass} ml-2 mr-3"></i>
                            <span class="font-medium">${dept.title} (${memberCount}명)</span>
                        </div>
                        <span class="text-xs ${badgeClass} px-2 py-1 rounded">${dept.badge}</span>
                    </div>
                    <div class="contact-dept-content" id="dept-${deptKey}" style="display: none;">
                        ${membersHtml}
                    </div>
                </div>
            `;
        }).join('');

        const contactsContent = `
            <div class="space-y-4">
                <!-- 검색 영역 -->
                <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                    <div class="flex items-center gap-3">
                        <div class="flex-1 relative">
                            <input type="text" id="contactSearch" 
                                placeholder="이름, 부서, 직급으로 검색..." 
                                class="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                onkeyup="app.filterContacts(this.value)">
                            <i class="fas fa-search absolute left-3 top-4 text-purple-400"></i>
                        </div>
                        <button onclick="app.showFavoriteContacts()" 
                            class="px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition">
                            <i class="fas fa-star mr-1"></i>즐겨찾기
                        </button>
                    </div>
                </div>

                <!-- 자주 연락하는 분들 -->
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <h4 class="font-semibold text-green-900 mb-3 flex items-center">
                        <i class="fas fa-star text-yellow-500 mr-2"></i>자주 연락하는 분들
                    </h4>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="contact-card-vip" onclick="app.showContactDetail('kim-secretary')">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    김
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="font-semibold text-gray-900 truncate">김민정 비서관</div>
                                    <div class="text-xs text-gray-600">의원실</div>
                                    <div class="text-xs text-green-600">
                                        <i class="fas fa-phone mr-1"></i>010-1234-5678
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="contact-card-vip" onclick="app.showContactDetail('lee-assistant')">
                            <div class="flex items-center space-x-3">
                                <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    이
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="font-semibold text-gray-900 truncate">이현수 보좌관</div>
                                    <div class="text-xs text-gray-600">정책연구</div>
                                    <div class="text-xs text-green-600">
                                        <i class="fas fa-phone mr-1"></i>010-2345-6789
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 부서별 연락처 -->
                <div id="contactsList">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-gray-900 flex items-center">
                            <i class="fas fa-building text-blue-500 mr-2"></i>부서별 연락처
                        </h4>
                        
                        <!-- 의원실 -->
                        <div class="contact-department">
                            <div class="contact-dept-header" onclick="app.toggleDepartment('office')">
                                <div class="flex items-center">
                                    <i class="fas fa-chevron-right transition-transform dept-arrow" id="arrow-office"></i>
                                    <i class="fas fa-user-tie text-purple-600 ml-2 mr-3"></i>
                                    <span class="font-medium">의원실 (4명)</span>
                                </div>
                                <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">핵심</span>
                            </div>
                            <div class="contact-dept-content" id="dept-office" style="display: none;">
                                <div class="contact-item" onclick="app.showContactDetail('kim-secretary')">
                                    <div class="contact-avatar bg-purple-500">김</div>
                                    <div class="contact-info">
                                        <div class="contact-name">김민정 비서관</div>
                                        <div class="contact-detail">일정관리, 대외업무</div>
                                        <div class="contact-phone">010-1234-5678</div>
                                    </div>
                                    <div class="contact-actions">
                                        <button onclick="app.callContact('010-1234-5678')" class="contact-btn-call">
                                            <i class="fas fa-phone"></i>
                                        </button>
                                        <button onclick="app.messageContact('010-1234-5678')" class="contact-btn-message">
                                            <i class="fas fa-comment"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="contact-item" onclick="app.showContactDetail('lee-assistant')">
                                    <div class="contact-avatar bg-green-500">이</div>
                                    <div class="contact-info">
                                        <div class="contact-name">이현수 보좌관</div>
                                        <div class="contact-detail">정책연구, 법안검토</div>
                                        <div class="contact-phone">010-2345-6789</div>
                                    </div>
                                    <div class="contact-actions">
                                        <button onclick="app.callContact('010-2345-6789')" class="contact-btn-call">
                                            <i class="fas fa-phone"></i>
                                        </button>
                                        <button onclick="app.messageContact('010-2345-6789')" class="contact-btn-message">
                                            <i class="fas fa-comment"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 교육위원회 -->
                        <div class="contact-department">
                            <div class="contact-dept-header" onclick="app.toggleDepartment('education')">
                                <div class="flex items-center">
                                    <i class="fas fa-chevron-right transition-transform dept-arrow" id="arrow-education"></i>
                                    <i class="fas fa-graduation-cap text-blue-600 ml-2 mr-3"></i>
                                    <span class="font-medium">교육위원회 (6명)</span>
                                </div>
                                <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">위원회</span>
                            </div>
                            <div class="contact-dept-content" id="dept-education" style="display: none;">
                                <div class="contact-item">
                                    <div class="contact-avatar bg-blue-500">박</div>
                                    <div class="contact-info">
                                        <div class="contact-name">박영훈 위원장</div>
                                        <div class="contact-detail">교육위원회 위원장</div>
                                        <div class="contact-phone">02-788-2345</div>
                                    </div>
                                    <div class="contact-actions">
                                        <button onclick="app.callContact('02-788-2345')" class="contact-btn-call">
                                            <i class="fas fa-phone"></i>
                                        </button>
                                        <button onclick="app.messageContact('02-788-2345')" class="contact-btn-message">
                                            <i class="fas fa-comment"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="contact-item">
                                    <div class="contact-avatar bg-indigo-500">최</div>
                                    <div class="contact-info">
                                        <div class="contact-name">최은영 간사</div>
                                        <div class="contact-detail">교육위원회 간사</div>
                                        <div class="contact-phone">02-788-2346</div>
                                    </div>
                                    <div class="contact-actions">
                                        <button onclick="app.callContact('02-788-2346')" class="contact-btn-call">
                                            <i class="fas fa-phone"></i>
                                        </button>
                                        <button onclick="app.messageContact('02-788-2346')" class="contact-btn-message">
                                            <i class="fas fa-comment"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 의회사무처 -->
                        <div class="contact-department">
                            <div class="contact-dept-header" onclick="app.toggleDepartment('admin')">
                                <div class="flex items-center">
                                    <i class="fas fa-chevron-right transition-transform dept-arrow" id="arrow-admin"></i>
                                    <i class="fas fa-building text-gray-600 ml-2 mr-3"></i>
                                    <span class="font-medium">의회사무처 (8명)</span>
                                </div>
                                <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">행정</span>
                            </div>
                            <div class="contact-dept-content" id="dept-admin" style="display: none;">
                                <div class="contact-item">
                                    <div class="contact-avatar bg-gray-500">정</div>
                                    <div class="contact-info">
                                        <div class="contact-name">정수민 사무처장</div>
                                        <div class="contact-detail">의회사무처 총괄</div>
                                        <div class="contact-phone">02-788-2000</div>
                                    </div>
                                    <div class="contact-actions">
                                        <button onclick="app.callContact('02-788-2000')" class="contact-btn-call">
                                            <i class="fas fa-phone"></i>
                                        </button>
                                        <button onclick="app.messageContact('02-788-2000')" class="contact-btn-message">
                                            <i class="fas fa-comment"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal('contacts', {
            title: '연락처 관리',
            content: contactsContent,
            confirmText: '확인',
            modalClass: 'modal-scrollable contacts-modal'
        });
    },

    // 알림 보기
    showNotifications: function() {
        this.showModal('notifications', {
            title: '알림',
            content: `
                <div class="space-y-3">
                    <div class="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                        <div class="font-medium text-blue-800">새로운 회의 일정</div>
                        <div class="text-sm text-gray-600">내일 14:00 교육위원회 정기회의</div>
                        <div class="text-xs text-gray-500 mt-1">5분 전</div>
                    </div>
                    <div class="bg-green-50 p-3 rounded border-l-4 border-green-500">
                        <div class="font-medium text-green-800">법안 심의 완료</div>
                        <div class="text-sm text-gray-600">사립학교법 개정안이 가결되었습니다</div>
                        <div class="text-xs text-gray-500 mt-1">2시간 전</div>
                    </div>
                    <div class="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
                        <div class="font-medium text-orange-800">민원 답변 요청</div>
                        <div class="text-sm text-gray-600">3건의 민원에 대한 답변이 필요합니다</div>
                        <div class="text-xs text-gray-500 mt-1">1일 전</div>
                    </div>
                </div>
            `,
            showCancel: false
        });
    },

    // 의안 통계별 목록 보기
    showBillStats: function(type) {
        const billData = {
            'total': {
                title: '전체 발의 법안 (32건)',
                bills: [
                    { title: '사립학교법 일부개정법률안', status: '심사중', date: '2024.12.15', type: '대표발의' },
                    { title: '주택임대차보호법 일부개정법률안', status: '가결', date: '2024.12.10', type: '대표발의' },
                    { title: '경기도 교육환경 개선 조례안', status: '접수', date: '2024.12.05', type: '공동발의' },
                    { title: '청년창업 지원 조례 개정안', status: '가결', date: '2024.11.28', type: '대표발의' },
                    { title: '경기도 문화예술 진흥 조례안', status: '계류', date: '2024.11.20', type: '대표발의' },
                    { title: '소상공인 지원 특별법안', status: '가결', date: '2024.11.15', type: '공동발의' },
                    { title: '환경보전 특별회계 설치 조례안', status: '계류', date: '2024.11.10', type: '대표발의' },
                    { title: '청년 주거안정 지원 조례안', status: '가결', date: '2024.11.05', type: '대표발의' }
                ]
            },
            'passed': {
                title: '가결된 법안 (18건)',
                bills: [
                    { title: '주택임대차보호법 일부개정법률안', status: '가결', date: '2024.12.10', type: '대표발의' },
                    { title: '청년창업 지원 조례 개정안', status: '가결', date: '2024.11.28', type: '대표발의' },
                    { title: '소상공인 지원 특별법안', status: '가결', date: '2024.11.15', type: '공동발의' },
                    { title: '청년 주거안정 지원 조례안', status: '가결', date: '2024.11.05', type: '대표발의' },
                    { title: '경기도 도시재생 지원 조례안', status: '가결', date: '2024.10.25', type: '대표발의' },
                    { title: '중소기업 육성 지원 조례 개정안', status: '가결', date: '2024.10.20', type: '공동발의' },
                    { title: '경기도 스마트도시 조성 조례안', status: '가결', date: '2024.10.15', type: '대표발의' },
                    { title: '교통약자 이동편의 증진 조례안', status: '가결', date: '2024.10.10', type: '대표발의' }
                ]
            },
            'pending': {
                title: '계류중인 법안 (12건)',
                bills: [
                    { title: '경기도 문화예술 진흥 조례안', status: '계류', date: '2024.11.20', type: '대표발의' },
                    { title: '환경보전 특별회계 설치 조례안', status: '계류', date: '2024.11.10', type: '대표발의' },
                    { title: '경기도 사회적경제 육성 조례안', status: '계류', date: '2024.10.30', type: '공동발의' },
                    { title: '학교폭력 예방 강화 조례안', status: '계류', date: '2024.10.25', type: '대표발의' },
                    { title: '경기도 평생학습 진흥 조례안', status: '계류', date: '2024.10.18', type: '대표발의' },
                    { title: '공공시설 접근성 개선 조례안', status: '계류', date: '2024.10.12', type: '공동발의' },
                    { title: '경기도 디지털 격차 해소 조례안', status: '계류', date: '2024.10.05', type: '대표발의' },
                    { title: '지역상생발전기금 설치 조례안', status: '계류', date: '2024.09.28', type: '대표발의' }
                ]
            },
            'rejected': {
                title: '부결된 법안 (2건)',
                bills: [
                    { title: '경기도 개발제한구역 관리 조례안', status: '부결', date: '2024.09.15', type: '대표발의' },
                    { title: '지방공무원 복무규정 개정안', status: '부결', date: '2024.08.20', type: '공동발의' }
                ]
            }
        };

        const data = billData[type];
        if (!data) return;

        this.showModal('billStatsList', {
            title: data.title,
            content: `
                <div class="space-y-3 max-h-96 overflow-y-auto">
                    ${data.bills.map(bill => `
                        <div class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer" onclick="app.showBillDetail('bill-${bill.date}', '${bill.title}')">
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-medium text-sm">${bill.title}</div>
                                <span class="px-2 py-1 rounded-full text-xs ${
                                    bill.status === '가결' ? 'bg-green-100 text-green-800' :
                                    bill.status === '계류' ? 'bg-yellow-100 text-yellow-800' :
                                    bill.status === '부결' ? 'bg-red-100 text-red-800' :
                                    bill.status === '심사중' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                }">${bill.status}</span>
                            </div>
                            <div class="flex justify-between items-center text-xs text-gray-600">
                                <span>${bill.type} • ${bill.date}</span>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `,
            showCancel: false
        });
    },

    // Show Notification
    showNotification: function(message, type = 'info') {
        // 기존 알림이 있으면 제거
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-white text-sm ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
        }`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // 3초 후 자동 제거
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    },

    // 연락처 관련 헬퍼 함수들
    toggleDepartment: function(deptId) {
        const content = document.getElementById(`dept-${deptId}`);
        const arrow = document.getElementById(`arrow-${deptId}`);
        
        if (content && arrow) {
            if (content.style.display === 'none') {
                content.style.display = 'block';
                arrow.style.transform = 'rotate(90deg)';
            } else {
                content.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }
        }
    },

    filterContacts: function(searchTerm) {
        const contactsList = document.getElementById('contactsList');
        if (!contactsList) return;
        
        const contactItems = contactsList.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            const name = item.querySelector('.contact-name')?.textContent || '';
            const detail = item.querySelector('.contact-detail')?.textContent || '';
            const phone = item.querySelector('.contact-phone')?.textContent || '';
            
            const matches = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           phone.includes(searchTerm);
            
            item.style.display = matches ? 'flex' : 'none';
        });
    },

    callContact: function(phoneNumber) {
        event.stopPropagation();
        this.showNotification(`전화를 겁니다: ${phoneNumber}`, 'success');
        // 실제 구현에서는 tel: 링크나 전화 앱 연동
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost') {
            // 로컬 환경에서는 알림만 표시
            console.log(`Calling: ${phoneNumber}`);
        } else {
            // 실제 환경에서는 전화 걸기
            window.location.href = `tel:${phoneNumber}`;
        }
    },

    messageContact: function(phoneNumber) {
        event.stopPropagation();
        this.showNotification(`메시지를 보냅니다: ${phoneNumber}`, 'success');
        // 실제 구현에서는 sms: 링크나 메시지 앱 연동
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost') {
            // 로컬 환경에서는 알림만 표시
            console.log(`Messaging: ${phoneNumber}`);
        } else {
            // 실제 환경에서는 메시지 보내기
            window.location.href = `sms:${phoneNumber}`;
        }
    },

    showContactDetail: function(contactId) {
        const contactData = {
            'kim-secretary': {
                name: '김민정 비서관',
                department: '의원실',
                position: '비서관',
                phone: '010-1234-5678',
                email: 'kim.mj@assembly.go.kr',
                office: '의원회관 304호',
                responsibilities: ['일정 관리', '대외 업무', '언론 대응', '방문객 접수'],
                workHours: '09:00 - 18:00',
                extension: '2304'
            },
            'lee-assistant': {
                name: '이현수 보좌관',
                department: '의원실',
                position: '보좌관',
                phone: '010-2345-6789',
                email: 'lee.hs@assembly.go.kr',
                office: '의원회관 304-1호',
                responsibilities: ['정책 연구', '법안 검토', '자료 작성', '현안 분석'],
                workHours: '09:00 - 18:00',
                extension: '2305'
            }
        };

        const contact = contactData[contactId] || {
            name: '연락처 정보',
            department: '미확인',
            position: '직원',
            phone: '02-788-0000',
            email: 'contact@assembly.go.kr',
            office: '의원회관',
            responsibilities: ['업무 담당'],
            workHours: '09:00 - 18:00',
            extension: '0000'
        };

        this.showModal('contactDetail', {
            title: '연락처 상세정보',
            content: `
                <div class="space-y-4">
                    <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                        <div class="flex items-center space-x-4">
                            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                ${contact.name.charAt(0)}
                            </div>
                            <div>
                                <div class="font-bold text-lg text-gray-900">${contact.name}</div>
                                <div class="text-sm text-gray-600">${contact.department} • ${contact.position}</div>
                                <div class="text-xs text-purple-600 mt-1">
                                    <i class="fas fa-clock mr-1"></i>${contact.workHours}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-3">
                        <div class="contact-detail-item">
                            <i class="fas fa-phone text-green-500"></i>
                            <div>
                                <div class="font-medium">휴대전화</div>
                                <div class="text-sm text-gray-600">${contact.phone}</div>
                            </div>
                            <button onclick="app.callContact('${contact.phone}')" class="text-green-600 hover:text-green-700">
                                <i class="fas fa-phone-alt"></i>
                            </button>
                        </div>

                        <div class="contact-detail-item">
                            <i class="fas fa-building text-blue-500"></i>
                            <div>
                                <div class="font-medium">내선번호</div>
                                <div class="text-sm text-gray-600">${contact.extension}</div>
                            </div>
                            <button onclick="app.callContact('02-788-${contact.extension}')" class="text-blue-600 hover:text-blue-700">
                                <i class="fas fa-phone"></i>
                            </button>
                        </div>

                        <div class="contact-detail-item">
                            <i class="fas fa-envelope text-purple-500"></i>
                            <div>
                                <div class="font-medium">이메일</div>
                                <div class="text-sm text-gray-600">${contact.email}</div>
                            </div>
                            <button onclick="window.location.href='mailto:${contact.email}'" class="text-purple-600 hover:text-purple-700">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>

                        <div class="contact-detail-item">
                            <i class="fas fa-map-marker-alt text-red-500"></i>
                            <div>
                                <div class="font-medium">사무실</div>
                                <div class="text-sm text-gray-600">${contact.office}</div>
                            </div>
                        </div>
                    </div>

                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3 text-gray-900">담당 업무</h5>
                        <div class="grid grid-cols-2 gap-2">
                            ${contact.responsibilities.map(responsibility => `
                                <div class="bg-gray-50 px-3 py-2 rounded text-sm text-center">
                                    ${responsibility}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="border-t pt-4 flex gap-2">
                        <button onclick="app.callContact('${contact.phone}')" class="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition">
                            <i class="fas fa-phone mr-2"></i>전화하기
                        </button>
                        <button onclick="app.messageContact('${contact.phone}')" class="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition">
                            <i class="fas fa-comment mr-2"></i>메시지
                        </button>
                    </div>
                </div>
            `,
            confirmText: '확인'
        });
    },

    viewMeetingMinutes: function(date) {
        this.showModal('meetingMinutes', {
            title: `${date} 회의록`,
            content: `
                <div class="space-y-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <div class="font-bold text-blue-800 mb-2">교육위원회 임시회의 회의록</div>
                        <div class="text-sm text-gray-600 space-y-1">
                            <div><i class="fas fa-calendar mr-2"></i>일시: 2025.01.16 (목) 15:00 ~ 16:30</div>
                            <div><i class="fas fa-map-marker-alt mr-2"></i>장소: 교육위원회 회의실</div>
                            <div><i class="fas fa-user-tie mr-2"></i>회의주재: 김영수 위원장</div>
                            <div><i class="fas fa-users mr-2"></i>참석: 15명 (결석 0명)</div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">회의 안건</h5>
                        <div class="space-y-3">
                            <div class="bg-gray-50 p-3 rounded">
                                <div class="font-medium mb-1">1. 경기도 교육환경 개선 조례안 심의</div>
                                <div class="text-sm text-gray-600 mb-2">- 제안자: 김영수 의원 외 5명</div>
                                <div class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full inline-block">원안 가결</div>
                            </div>
                            
                            <div class="bg-gray-50 p-3 rounded">
                                <div class="font-medium mb-1">2. 2025년도 교육청 예산안 검토</div>
                                <div class="text-sm text-gray-600 mb-2">- 총 예산: 125억원</div>
                                <div class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-block">의견 첨부 가결</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <h5 class="font-semibold mb-3">주요 발언 요약</h5>
                        <div class="text-sm text-gray-700 space-y-2">
                            <div class="bg-blue-50 p-3 rounded">
                                <div class="font-medium text-blue-800">김영수 위원장</div>
                                <div class="text-xs text-gray-600 mt-1">
                                    "교육환경 개선은 미래 세대를 위한 필수 투자입니다. 
                                    디지털 기자재 도입과 함께 교사 연수 프로그램도 병행되어야 합니다."
                                </div>
                            </div>
                            
                            <div class="bg-green-50 p-3 rounded">
                                <div class="font-medium text-green-800">이정민 위원</div>
                                <div class="text-xs text-gray-600 mt-1">
                                    "예산 집행의 투명성과 효율성을 위해 분기별 점검 체계가 필요합니다."
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-4">
                        <div class="text-center">
                            <button onclick="app.downloadMeetingMinutes('${date}')" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                                <i class="fas fa-download mr-2"></i>회의록 PDF 다운로드
                            </button>
                        </div>
                    </div>
                </div>
            `,
            confirmText: '확인'
        });
    },

    downloadMeetingMinutes: function(date) {
        this.showNotification(`${date} 회의록을 다운로드합니다.`, 'success');
    },

    showFavoriteContacts: function() {
        this.showNotification('즐겨찾기 연락처를 표시합니다.', 'info');
    }
});