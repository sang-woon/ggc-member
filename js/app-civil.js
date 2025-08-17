// App Civil - Comprehensive Civil Complaint Management System
Object.assign(window.app, {
    // 자동 새로고침 상태
    autoRefresh: false,
    
    // Load Civil Page
    loadCivilPage: function() {
        const autoRefreshStatus = this.autoRefresh;
        const html = `
            <div class="page-container">
                <!-- 스마트 대시보드 헤더 -->
                <div class="gov-card mb-4">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="gov-title">민원 스마트 대시보드</h3>
                        <button onclick="app.toggleAutoRefresh()" class="text-sm px-3 py-1 rounded ${autoRefreshStatus ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">
                            <i class="fas fa-sync-alt mr-1 ${autoRefreshStatus ? 'animate-spin' : ''}"></i>
                            ${autoRefreshStatus ? '자동새로고침 ON' : '자동새로고침 OFF'}
                        </button>
                    </div>
                    
                    <!-- 즉시 처리 필요 민원 알림 -->
                    <div id="urgentAlerts" class="space-y-2"></div>
                </div>
                
                <!-- 원클릭 민원 처리 섹션 -->
                <div class="gov-card mb-4">
                    <h3 class="gov-title mb-3">빠른 민원 처리</h3>
                    
                    <div class="grid grid-cols-2 gap-3 mb-3">
                        <button onclick="app.oneClickResponse('감사')" class="quick-response-btn bg-green-50 border-green-200 text-green-700">
                            <i class="fas fa-heart mr-2"></i>감사 인사
                        </button>
                        <button onclick="app.oneClickResponse('검토')" class="quick-response-btn bg-blue-50 border-blue-200 text-blue-700">
                            <i class="fas fa-search mr-2"></i>검토 중
                        </button>
                        <button onclick="app.oneClickResponse('완료')" class="quick-response-btn bg-purple-50 border-purple-200 text-purple-700">
                            <i class="fas fa-check-circle mr-2"></i>처리 완료
                        </button>
                        <button onclick="app.oneClickResponse('부서전달')" class="quick-response-btn bg-orange-50 border-orange-200 text-orange-700">
                            <i class="fas fa-share mr-2"></i>부서 전달
                        </button>
                    </div>
                    
                    <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="text-sm font-semibold text-blue-900">AI 자동 답변 생성</div>
                                <div class="text-xs text-blue-700">민원 내용을 분석하여 적절한 답변을 자동 생성합니다</div>
                            </div>
                            <button onclick="app.showSmartComposer()" class="px-4 py-2 bg-white rounded-lg shadow-sm border border-blue-300 text-blue-700 hover:bg-blue-50 transition">
                                <i class="fas fa-magic mr-2"></i>AI 작성
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- 스마트 필터 및 실시간 통계 -->
                <div class="gov-card mb-4">
                    <div class="flex justify-between items-center mb-3">
                        <h4 class="font-semibold">실시간 민원 현황</h4>
                        <div class="flex gap-2">
                            <button onclick="app.showDeptStats()" class="text-blue-600 text-sm">
                                <i class="fas fa-chart-bar mr-1"></i>통계
                            </button>
                            <button onclick="app.exportComplaintData()" class="text-green-600 text-sm">
                                <i class="fas fa-download mr-1"></i>내보내기
                            </button>
                        </div>
                    </div>
                    
                    <!-- 실시간 처리 현황 대시보드 -->
                    <div class="grid grid-cols-2 gap-3 mb-4">
                        <div class="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg border border-red-200" onclick="app.loadUrgentComplaints()">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-lg font-bold text-red-600">3건</div>
                                    <div class="text-xs text-red-700 font-medium">즉시 처리 필요</div>
                                </div>
                                <div class="relative">
                                    <i class="fas fa-exclamation-triangle text-red-500 text-xl"></i>
                                    <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                            <div class="text-xs text-red-600 mt-1">평균 1.2일 경과</div>
                        </div>
                        
                        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200" onclick="app.showTodayTargets()">
                            <div class="flex items-center justify-between">
                                <div>
                                    <div class="text-lg font-bold text-blue-600">8건</div>
                                    <div class="text-xs text-blue-700 font-medium">오늘 처리 목표</div>
                                </div>
                                <i class="fas fa-target text-blue-500 text-xl"></i>
                            </div>
                            <div class="text-xs text-blue-600 mt-1">5건 완료 (62%)</div>
                        </div>
                    </div>
                    
                    <!-- 기존 통계 카드들 (개선된 디자인) -->
                    <div class="grid grid-cols-4 gap-2 mb-3">
                        <div class="stats-card" onclick="app.loadComplaintList('all')">
                            <div class="text-lg font-bold text-gray-700">${this.memberData.civilComplaints}</div>
                            <div class="text-xs text-gray-600">전체</div>
                            <div class="stats-change text-green-600">+12</div>
                        </div>
                        <div class="stats-card bg-orange-50" onclick="app.loadComplaintList('pending')">
                            <div class="text-lg font-bold text-orange-600">15</div>
                            <div class="text-xs text-gray-600">처리중</div>
                            <div class="stats-change text-red-600">+3</div>
                        </div>
                        <div class="stats-card bg-green-50" onclick="app.loadComplaintList('completed')">
                            <div class="text-lg font-bold text-green-600">233</div>
                            <div class="text-xs text-gray-600">완료</div>
                            <div class="stats-change text-green-600">+8</div>
                        </div>
                        <div class="stats-card bg-blue-50" onclick="app.loadComplaintList('이번주')">
                            <div class="text-lg font-bold text-blue-600">23</div>
                            <div class="text-xs text-gray-600">이번주</div>
                            <div class="stats-change text-blue-600">+5</div>
                        </div>
                    </div>
                    
                    <!-- 스마트 필터 탭 -->
                    <div class="flex gap-2 overflow-x-auto pb-2">
                        <button class="smart-tab active" data-filter="all">
                            <i class="fas fa-list mr-1"></i>전체
                        </button>
                        <button class="smart-tab" data-filter="urgent">
                            <i class="fas fa-bolt mr-1"></i>긴급
                        </button>
                        <button class="smart-tab" data-filter="today">
                            <i class="fas fa-calendar-day mr-1"></i>오늘
                        </button>
                        <button class="smart-tab" data-filter="pending">
                            <i class="fas fa-clock mr-1"></i>대기
                        </button>
                        <button class="smart-tab" data-filter="my">
                            <i class="fas fa-user mr-1"></i>내담당
                        </button>
                    </div>
                </div>
                
                <!-- 민원 목록 -->
                <div class="space-y-3" id="complaintList">
                    <!-- Dynamic content will be loaded here -->
                </div>
            </div>
        `;
        
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = html;
            
            // 초기 민원 목록 로드
            this.loadComplaintList('all');
            
            // 스마트 탭 이벤트 리스너 추가
            document.querySelectorAll('.smart-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    // 활성 탭 변경
                    document.querySelectorAll('.smart-tab').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    // 필터 적용
                    const filter = e.target.dataset.filter;
                    this.loadComplaintList(filter);
                });
            });
        }
    },

    // Analyze with AI
    analyzeWithAI: function() {
        const input = document.getElementById('aiComplaintInput');
        if (!input || !input.value.trim()) {
            this.showNotification('민원 내용을 입력해주세요.');
            return;
        }

        const text = input.value.trim();
        this.showLoadingModal('AI가 민원을 분석하고 있습니다...');

        // AI 분석 시뮬레이션
        setTimeout(() => {
            this.hideLoadingModal();
            const analysis = this.analyzeComplaintWithAI(text);
            this.showAIAnalysisResult(analysis);
        }, 2000);
    },

    // Show Loading Modal
    showLoadingModal: function(message) {
        const content = `
            <div class="text-center py-8">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <div class="text-gray-600">${message}</div>
            </div>
        `;

        this.showModal('loading', {
            content: content,
            modalClass: 'loading-modal'
        });
    },

    // Hide Loading Modal
    hideLoadingModal: function() {
        this.closeModal();
    },

    // Analyze Complaint with AI
    analyzeComplaintWithAI: function(text) {
        // AI 분석 시뮬레이션 로직
        const categories = {
            '가로등|조명|전등': { category: '도로/교통', department: '교통정책과' },
            '체육|운동|스포츠': { category: '문화/체육', department: '체육청소년과' },
            '소음|시끄러운|층간소음': { category: '환경', department: '환경보전과' },
            '도로|포트홀|아스팔트': { category: '도로/교통', department: '도로관리과' },
            '쓰레기|청소|환경': { category: '환경', department: '환경보전과' },
            '교육|학교|학생': { category: '교육', department: '교육지원과' },
            '복지|어르신|노인': { category: '복지', department: '복지정책과' }
        };

        let matchedCategory = { category: '기타', department: '민원실' };
        
        for (const [keywords, info] of Object.entries(categories)) {
            const regex = new RegExp(keywords, 'i');
            if (regex.test(text)) {
                matchedCategory = info;
                break;
            }
        }

        // 우선순위 결정 (키워드 기반)
        const urgentKeywords = '긴급|위험|사고|응급';
        const highKeywords = '불편|고장|문제';
        
        let priority = '보통';
        if (new RegExp(urgentKeywords, 'i').test(text)) {
            priority = '긴급';
        } else if (new RegExp(highKeywords, 'i').test(text)) {
            priority = '높음';
        }

        // 제목 생성 (첫 문장 또는 요약)
        let suggestedTitle = text.split('.')[0];
        if (suggestedTitle.length > 30) {
            suggestedTitle = suggestedTitle.substring(0, 30) + '...';
        }
        if (suggestedTitle.length < 10) {
            suggestedTitle = matchedCategory.category + ' 관련 민원';
        }

        // 관련 법령 (시뮬레이션)
        const relatedLaws = [];
        if (matchedCategory.category === '도로/교통') {
            relatedLaws.push('도로교통법', '도로법');
        } else if (matchedCategory.category === '환경') {
            relatedLaws.push('환경정책기본법', '소음진동관리법');
        } else if (matchedCategory.category === '문화/체육') {
            relatedLaws.push('체육시설의 설치이용에 관한 법률');
        }

        return {
            originalText: text,
            suggestedTitle: suggestedTitle,
            category: matchedCategory.category,
            department: matchedCategory.department,
            priority: priority,
            relatedLaws: relatedLaws,
            confidence: 0.85
        };
    },

    // Show AI Analysis Result
    showAIAnalysisResult: function(analysis) {
        const content = `
            <div class="space-y-4">
                <div class="bg-green-50 p-3 rounded border border-green-200">
                    <div class="flex items-center">
                        <i class="fas fa-check-circle text-green-600 mr-2"></i>
                        <span class="text-sm font-semibold text-green-800">AI 분석 완료 (신뢰도: ${Math.round(analysis.confidence * 100)}%)</span>
                    </div>
                </div>

                <div class="space-y-3">
                    <div>
                        <label class="block text-sm font-semibold mb-1">민원 제목</label>
                        <input type="text" class="w-full p-2 border rounded" value="${analysis.suggestedTitle}" id="aiTitle">
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-semibold mb-1">분류</label>
                            <input type="text" class="w-full p-2 border rounded bg-blue-50" value="${analysis.category}" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-1">담당부서</label>
                            <input type="text" class="w-full p-2 border rounded bg-blue-50" value="${analysis.department}" readonly>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-1">우선순위</label>
                        <select class="w-full p-2 border rounded" id="aiPriority">
                            <option value="긴급" ${analysis.priority === '긴급' ? 'selected' : ''}>긴급</option>
                            <option value="높음" ${analysis.priority === '높음' ? 'selected' : ''}>높음</option>
                            <option value="보통" ${analysis.priority === '보통' ? 'selected' : ''}>보통</option>
                            <option value="낮음" ${analysis.priority === '낮음' ? 'selected' : ''}>낮음</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-1">민원 내용</label>
                        <textarea class="w-full p-2 border rounded" rows="4" id="aiContent">${analysis.originalText}</textarea>
                    </div>

                    ${analysis.relatedLaws.length > 0 ? `
                    <div class="bg-gray-50 p-3 rounded">
                        <div class="text-sm font-semibold mb-2">관련 법령</div>
                        <div class="flex flex-wrap gap-2">
                            ${analysis.relatedLaws.map(law => 
                                `<span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">${law}</span>`
                            ).join('')}
                        </div>
                    </div>` : ''}

                    <div class="bg-yellow-50 p-3 rounded border border-yellow-200">
                        <i class="fas fa-info-circle text-yellow-600 mr-2"></i>
                        <span class="text-sm text-yellow-800">AI 분석 결과를 검토하고 필요시 수정하세요.</span>
                    </div>
                </div>
            </div>`;

        this.showModal('ai-analysis', {
            title: 'AI 분석 결과',
            content: content,
            confirmText: '민원 등록',
            cancelText: '수정',
            onConfirm: () => {
                this.submitAIComplaint();
            }
        });
    },

    // Submit AI Complaint
    submitAIComplaint: function() {
        const title = document.getElementById('aiTitle').value;
        const priority = document.getElementById('aiPriority').value;
        const content = document.getElementById('aiContent').value;
        
        // 민원 등록 시뮬레이션
        this.showLoadingModal('민원을 등록하고 있습니다...');
        
        setTimeout(() => {
            this.hideLoadingModal();
            this.showNotification('민원이 성공적으로 등록되었습니다. (접수번호: C2024-' + Date.now().toString().slice(-4) + ')');
            
            // 민원 목록 새로고침
            this.loadComplaintList('all');
            
            // 입력 필드 초기화
            const input = document.getElementById('aiComplaintInput');
            if (input) input.value = '';
        }, 1500);
    },

    // Start Voice Input
    startVoiceInput: function() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showNotification('이 브라우저는 음성 인식을 지원하지 않습니다.');
            return;
        }

        this.showNotification('음성 인식을 시작합니다. 말씀해주세요...');
        
        // 음성 인식 시뮬레이션 (실제 구현시 Web Speech API 사용)
        setTimeout(() => {
            const input = document.getElementById('aiComplaintInput');
            if (input) {
                input.value = '강남구 테헤란로에 가로등이 고장나서 밤에 너무 어두워요. 안전사고가 걱정됩니다.';
                this.showNotification('음성 인식이 완료되었습니다.');
            }
        }, 2000);
    },

    // Load Complaint List
    loadComplaintList: function(filter = 'all') {
        const complaints = [
            {
                id: 'C2024-0156',
                title: '강남구 가로등 고장 신고',
                category: '도로/교통',
                department: '교통정책과',
                status: 'completed',
                priority: '보통',
                date: '2025.01.15',
                dueDate: '2025.01.20',
                progress: 100,
                citizen: '김**',
                contact: '010-****-5678'
            },
            {
                id: 'C2024-0157',
                title: '청소년 체육시설 확충 건의',
                category: '문화/체육',
                department: '체육청소년과',
                status: 'pending',
                priority: '높음',
                date: '2025.01.14',
                dueDate: '2025.01.25',
                progress: 65,
                citizen: '이**',
                contact: '010-****-1234'
            },
            {
                id: 'C2024-0158',
                title: '아파트 소음 관련 민원',
                category: '환경',
                department: '환경보전과',
                status: 'pending',
                priority: '긴급',
                date: '2025.01.16',
                dueDate: '2025.01.18',
                progress: 25,
                citizen: '박**',
                contact: '010-****-9012'
            },
            {
                id: 'C2024-0159',
                title: '도로 포트홀 보수 요청',
                category: '도로/교통',
                department: '도로관리과',
                status: 'completed',
                priority: '높음',
                date: '2025.01.13',
                dueDate: '2025.01.16',
                progress: 100,
                citizen: '최**',
                contact: '010-****-3456'
            }
        ];

        let filteredComplaints = complaints;
        if (filter !== 'all') {
            filteredComplaints = complaints.filter(c => c.status === filter || c.priority === filter);
        }

        const listHtml = filteredComplaints.map(complaint => {
            const statusColor = complaint.status === 'completed' ? 'text-green-600' : 
                               complaint.status === 'pending' ? 'text-orange-600' : 'text-gray-600';
            const priorityColor = complaint.priority === '긴급' ? 'bg-red-100 text-red-700' :
                                 complaint.priority === '높음' ? 'bg-orange-100 text-orange-700' :
                                 'bg-gray-100 text-gray-700';
            
            return `
                <div class="gov-card complaint-item" onclick="app.showComplaintDetail('${complaint.id}')" style="cursor: pointer;">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-sm font-medium text-gray-900">${complaint.title}</span>
                                <span class="text-xs px-2 py-1 rounded ${priorityColor}">${complaint.priority}</span>
                            </div>
                            <div class="flex items-center gap-3 text-xs text-gray-600 mb-2">
                                <span><i class="fas fa-user mr-1"></i>${complaint.citizen}</span>
                                <span><i class="fas fa-calendar mr-1"></i>${complaint.date}</span>
                                <span><i class="fas fa-building mr-1"></i>${complaint.department}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="flex-1 bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full transition-all" style="width: ${complaint.progress}%"></div>
                                </div>
                                <span class="text-xs text-gray-500">${complaint.progress}%</span>
                            </div>
                        </div>
                        <div class="ml-3 text-right">
                            <div class="text-xs ${statusColor} font-medium mb-1">
                                ${complaint.status === 'completed' ? '처리완료' : 
                                  complaint.status === 'pending' ? '처리중' : '대기'}
                            </div>
                            <div class="text-xs text-gray-500">~${complaint.dueDate}</div>
                        </div>
                    </div>
                </div>`;
        }).join('');

        const listContainer = document.getElementById('complaintList');
        if (listContainer) {
            listContainer.innerHTML = listHtml;
        }
    },

    // Show Complaint Detail
    showComplaintDetail: function(complaintId) {
        const complaintData = {
            'C2024-0156': {
                id: 'C2024-0156',
                title: '강남구 가로등 고장 신고',
                category: '도로/교통',
                department: '교통정책과',
                status: 'completed',
                priority: '보통',
                date: '2025.01.15',
                dueDate: '2025.01.20',
                completedDate: '2025.01.19',
                progress: 100,
                citizen: '김영희',
                contact: '010-1234-5678',
                address: '서울시 강남구 테헤란로 123번길',
                content: '테헤란로 123번길 앞 가로등이 며칠째 고장나 있습니다. 밤에 너무 어두워서 안전상 문제가 있어 보입니다. 빠른 수리 부탁드립니다.',
                timeline: [
                    { date: '2025.01.15 09:30', event: '민원 접수', status: 'completed', description: '온라인을 통한 민원 접수' },
                    { date: '2025.01.15 10:15', event: '담당부서 배정', status: 'completed', description: '교통정책과로 업무 배정' },
                    { date: '2025.01.16 14:20', event: '현장 확인', status: 'completed', description: '담당자 현장 방문 및 확인' },
                    { date: '2025.01.17 11:00', event: '수리 작업 시작', status: 'completed', description: '가로등 수리 작업 착수' },
                    { date: '2025.01.19 16:30', event: '작업 완료', status: 'completed', description: '가로등 수리 완료 및 정상 작동 확인' }
                ],
                manager: '이현수 주무관',
                managerContact: '02-123-4567',
                attachments: [
                    { name: '현장사진1.jpg', size: '2.3MB', type: 'image' },
                    { name: '수리완료확인서.pdf', size: '1.1MB', type: 'document' }
                ]
            }
        };

        const complaint = complaintData[complaintId] || {
            id: complaintId,
            title: '민원 상세 정보',
            category: '기타',
            department: '민원실',
            status: 'pending',
            priority: '보통',
            date: '2025.01.01',
            citizen: '시민',
            content: '민원 내용 정보가 없습니다.'
        };

        const statusText = complaint.status === 'completed' ? '처리완료' : 
                          complaint.status === 'pending' ? '처리중' : '대기';
        const statusColor = complaint.status === 'completed' ? 'text-green-600' : 
                           complaint.status === 'pending' ? 'text-orange-600' : 'text-gray-600';

        let content = `
            <div class="space-y-4">
                <!-- 기본 정보 -->
                <div class="bg-gray-50 p-3 rounded">
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <div><span class="text-gray-600">접수번호:</span> ${complaint.id}</div>
                        <div><span class="text-gray-600">상태:</span> 
                            <span class="ml-1 font-medium ${statusColor}">${statusText}</span>
                        </div>
                        <div><span class="text-gray-600">분류:</span> ${complaint.category}</div>
                        <div><span class="text-gray-600">담당부서:</span> ${complaint.department}</div>
                        <div><span class="text-gray-600">접수일:</span> ${complaint.date}</div>
                        ${complaint.completedDate ? `<div><span class="text-gray-600">완료일:</span> ${complaint.completedDate}</div>` : 
                          `<div><span class="text-gray-600">처리예정일:</span> ${complaint.dueDate}</div>`}
                    </div>
                </div>

                <!-- 민원인 정보 -->
                <div>
                    <h4 class="font-semibold mb-2">민원인 정보</h4>
                    <div class="bg-gray-50 p-3 rounded text-sm">
                        <div class="grid grid-cols-1 gap-1">
                            <div><span class="text-gray-600">성명:</span> ${complaint.citizen}</div>
                            ${complaint.contact ? `<div><span class="text-gray-600">연락처:</span> ${complaint.contact}</div>` : ''}
                            ${complaint.address ? `<div><span class="text-gray-600">주소:</span> ${complaint.address}</div>` : ''}
                        </div>
                    </div>
                </div>

                <!-- 민원 내용 -->
                <div>
                    <h4 class="font-semibold mb-2">민원 내용</h4>
                    <div class="bg-gray-50 p-3 rounded text-sm">
                        ${complaint.content}
                    </div>
                </div>`;

        // 처리 담당자 정보
        if (complaint.manager) {
            content += `
                <div>
                    <h4 class="font-semibold mb-2">처리 담당자</h4>
                    <div class="bg-gray-50 p-3 rounded text-sm">
                        <div><span class="text-gray-600">담당자:</span> ${complaint.manager}</div>
                        ${complaint.managerContact ? `<div><span class="text-gray-600">연락처:</span> ${complaint.managerContact}</div>` : ''}
                    </div>
                </div>`;
        }

        // 처리 경과
        if (complaint.timeline) {
            content += `
                <div>
                    <h4 class="font-semibold mb-2">처리 경과</h4>
                    <div class="space-y-2">`;
            
            complaint.timeline.forEach((item, index) => {
                const isCompleted = item.status === 'completed';
                content += `
                    <div class="flex items-start">
                        <div class="flex flex-col items-center mr-3">
                            <div class="w-3 h-3 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}"></div>
                            ${index < complaint.timeline.length - 1 ? '<div class="w-0.5 h-8 bg-gray-200 mt-1"></div>' : ''}
                        </div>
                        <div class="flex-1 pb-4">
                            <div class="text-sm font-medium">${item.event}</div>
                            <div class="text-xs text-gray-600">${item.date}</div>
                            ${item.description ? `<div class="text-xs text-gray-500 mt-1">${item.description}</div>` : ''}
                        </div>
                    </div>`;
            });
            
            content += `
                    </div>
                </div>`;
        }

        // 첨부파일
        if (complaint.attachments && complaint.attachments.length > 0) {
            content += `
                <div>
                    <h4 class="font-semibold mb-2">첨부파일</h4>
                    <div class="space-y-2">`;
            
            complaint.attachments.forEach(file => {
                const icon = file.type === 'image' ? 'fa-image' : 'fa-file-pdf';
                content += `
                    <div class="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                        <div class="flex items-center">
                            <i class="fas ${icon} text-gray-500 mr-2"></i>
                            <span>${file.name}</span>
                        </div>
                        <div class="text-xs text-gray-500">${file.size}</div>
                    </div>`;
            });
            
            content += `
                    </div>
                </div>`;
        }

        content += `</div>`;

        this.showModal('complaint-detail', {
            title: complaint.title,
            content: content,
            confirmText: '확인',
            modalClass: 'modal-scrollable'
        });
    },

    // Show Quick Actions
    showQuickActions: function() {
        const content = `
            <div class="grid grid-cols-2 gap-3">
                <button onclick="app.quickComplaint('도로')" class="quick-action-btn">
                    <i class="fas fa-road text-2xl mb-2"></i>
                    <div class="text-sm">도로 관련</div>
                </button>
                <button onclick="app.quickComplaint('환경')" class="quick-action-btn">
                    <i class="fas fa-leaf text-2xl mb-2"></i>
                    <div class="text-sm">환경 관련</div>
                </button>
                <button onclick="app.quickComplaint('교통')" class="quick-action-btn">
                    <i class="fas fa-traffic-light text-2xl mb-2"></i>
                    <div class="text-sm">교통 관련</div>
                </button>
                <button onclick="app.quickComplaint('복지')" class="quick-action-btn">
                    <i class="fas fa-heart text-2xl mb-2"></i>
                    <div class="text-sm">복지 관련</div>
                </button>
                <button onclick="app.quickComplaint('체육')" class="quick-action-btn">
                    <i class="fas fa-running text-2xl mb-2"></i>
                    <div class="text-sm">체육 관련</div>
                </button>
                <button onclick="app.quickComplaint('기타')" class="quick-action-btn">
                    <i class="fas fa-plus text-2xl mb-2"></i>
                    <div class="text-sm">기타</div>
                </button>
            </div>
        `;

        this.showModal('quick-actions', {
            title: '빠른 민원 등록',
            content: content,
            cancelText: '닫기'
        });
    },

    // Quick Complaint
    quickComplaint: function(category) {
        this.closeModal();
        
        const input = document.getElementById('aiComplaintInput');
        if (input) {
            const templates = {
                '도로': '도로에 포트홀이 생겼습니다. 위치는 ',
                '환경': '환경 관련 문제가 있습니다. ',
                '교통': '교통시설에 문제가 있습니다. ',
                '복지': '복지 서비스 관련 문의드립니다. ',
                '체육': '체육시설 관련 건의사항입니다. ',
                '기타': '기타 민원사항입니다. '
            };
            
            input.value = templates[category] || '';
            input.focus();
        }
    },

    // Show Department Stats
    showDeptStats: function() {
        const content = `
            <div class="space-y-4">
                <div class="text-center mb-4">
                    <div class="text-lg font-semibold">부서별 민원 처리 현황</div>
                    <div class="text-sm text-gray-600">2025년 1월 기준</div>
                </div>
                
                <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                            <div class="font-medium">교통정책과</div>
                            <div class="text-xs text-gray-600">평균 처리기간: 3.2일</div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-blue-600">45건</div>
                            <div class="text-xs text-green-600">완료율 96%</div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                            <div class="font-medium">환경보전과</div>
                            <div class="text-xs text-gray-600">평균 처리기간: 4.1일</div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-blue-600">38건</div>
                            <div class="text-xs text-green-600">완료율 89%</div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                            <div class="font-medium">체육청소년과</div>
                            <div class="text-xs text-gray-600">평균 처리기간: 5.8일</div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-blue-600">22건</div>
                            <div class="text-xs text-orange-600">완료율 82%</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.showModal('dept-stats', {
            title: '부서별 통계',
            content: content,
            confirmText: '확인'
        });
    },

    // 누락된 함수들 추가
    oneClickResponse: function(type) {
        const responses = {
            '감사': '민원을 주신 데 대해 감사드립니다. 신속히 검토하여 처리하겠습니다.',
            '검토': '접수하신 민원을 담당부서에서 검토 중입니다. 처리 완료 시 연락드리겠습니다.',
            '완료': '신고해주신 민원이 처리 완료되었습니다. 이용에 불편을 드려 죄송했습니다.',
            '부서전달': '해당 민원을 관련 부서로 전달하였습니다. 담당부서에서 직접 연락드릴 예정입니다.'
        };
        
        const message = responses[type] || '민원 처리 중입니다.';
        this.showNotification(`${type} 응답이 발송되었습니다: "${message}"`);
    },

    toggleAutoRefresh: function() {
        this.autoRefresh = !this.autoRefresh;
        if (this.autoRefresh) {
            this.startAutoRefresh();
        } else {
            this.stopAutoRefresh();
        }
        // 버튼 상태 업데이트
        this.loadCivilPage();
    },

    startAutoRefresh: function() {
        if (this.refreshInterval) clearInterval(this.refreshInterval);
        this.refreshInterval = setInterval(() => {
            this.loadComplaintList('all');
        }, 30000); // 30초마다 갱신
    },

    stopAutoRefresh: function() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    },

    loadUrgentComplaints: function() {
        this.loadComplaintList('긴급');
        document.querySelectorAll('.smart-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.filter === 'urgent') {
                tab.classList.add('active');
            }
        });
    },

    showTodayTargets: function() {
        this.loadComplaintList('today');
        document.querySelectorAll('.smart-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.filter === 'today') {
                tab.classList.add('active');
            }
        });
    },

    showSmartComposer: function() {
        const content = `
            <div class="space-y-4">
                <div class="bg-blue-50 p-3 rounded border border-blue-200">
                    <div class="flex items-center">
                        <i class="fas fa-magic text-blue-600 mr-2"></i>
                        <span class="text-sm font-semibold text-blue-800">AI 자동 답변 생성기</span>
                    </div>
                    <div class="text-xs text-blue-700 mt-1">민원 내용을 입력하면 적절한 답변을 자동으로 생성합니다.</div>
                </div>

                <div>
                    <label class="block text-sm font-semibold mb-2">민원 내용 입력</label>
                    <textarea id="aiComplaintInput" class="w-full p-3 border rounded-lg" rows="4" 
                        placeholder="민원 내용을 입력하세요. 예: 강남구 테헤란로에 가로등이 고장나서 어두워요"></textarea>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <button onclick="app.analyzeWithAI()" class="btn-primary">
                        <i class="fas fa-brain mr-2"></i>AI 분석
                    </button>
                    <button onclick="app.startVoiceInput()" class="btn-secondary">
                        <i class="fas fa-microphone mr-2"></i>음성 입력
                    </button>
                </div>
            </div>
        `;

        this.showModal('smart-composer', {
            title: 'AI 스마트 작성기',
            content: content,
            cancelText: '닫기'
        });
    },

    exportComplaintData: function() {
        this.showNotification('민원 데이터 내보내기가 시작되었습니다. 잠시 후 다운로드됩니다.');
        
        // CSV 데이터 생성 시뮬레이션
        setTimeout(() => {
            const csvData = 'ID,제목,분류,상태,접수일,처리예정일\n' +
                           'C2024-0156,강남구 가로등 고장 신고,도로/교통,완료,2025.01.15,2025.01.20\n' +
                           'C2024-0157,청소년 체육시설 확충 건의,문화/체육,처리중,2025.01.14,2025.01.25';
            
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = '민원현황_' + new Date().toISOString().split('T')[0] + '.csv';
            link.click();
            
            this.showNotification('민원 데이터가 성공적으로 다운로드되었습니다.');
        }, 1500);
    }
});