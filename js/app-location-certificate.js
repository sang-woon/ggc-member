// 위치 기반 활동 상세보기 및 증명서 기능
(function() {
    window.app = window.app || {};
    
    // 활동 상세보기 및 증명서 표시
    window.app.showLocationDetail = function(activityId) {
        console.log('📋 활동 상세보기:', activityId);
        
        // 데이터에서 활동 찾기
        const activities = JSON.parse(localStorage.getItem('userLocationActivities') || '[]');
        const activity = activities.find(a => a.id === activityId);
        
        if (!activity) {
            alert('활동 정보를 찾을 수 없습니다.');
            return;
        }
        
        // 증명서 HTML 생성
        const certificateHTML = `
            <div id="activity-certificate-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <!-- 헤더 -->
                    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-2xl font-bold mb-2">의정활동 증명서</h2>
                                <p class="text-blue-100">경기도의회 의원 의정활동 관리시스템</p>
                            </div>
                            <button onclick="app.closeCertificate()" class="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- 증명서 본문 -->
                    <div class="p-6" id="certificate-content">
                        <!-- 증명서 번호 및 발급일 -->
                        <div class="border-b pb-4 mb-4">
                            <div class="flex justify-between text-sm text-gray-600">
                                <span>증명서 번호: ${activity.id}</span>
                                <span>발급일: ${new Date().toLocaleDateString('ko-KR')}</span>
                            </div>
                        </div>
                        
                        <!-- 의원 정보 -->
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-3 text-gray-800">
                                <i class="fas fa-user-tie mr-2 text-blue-600"></i>의원 정보
                            </h3>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <div class="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span class="text-gray-600">성명:</span>
                                        <span class="font-medium ml-2">김영수</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600">소속:</span>
                                        <span class="font-medium ml-2">경기도의회</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600">지역구:</span>
                                        <span class="font-medium ml-2">수원시갑</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600">의원번호:</span>
                                        <span class="font-medium ml-2">2024-0815</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 활동 상세 정보 -->
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-3 text-gray-800">
                                <i class="fas fa-calendar-check mr-2 text-blue-600"></i>활동 내용
                            </h3>
                            <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                                <h4 class="font-bold text-lg mb-2 text-blue-900">${activity.title}</h4>
                                <div class="space-y-2 text-sm">
                                    <div class="flex items-start">
                                        <i class="fas fa-tag mr-2 text-blue-600 mt-1"></i>
                                        <div>
                                            <span class="text-gray-600">활동 유형:</span>
                                            <span class="ml-2 font-medium">${getActivityTypeName(activity.type)}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <i class="fas fa-map-marker-alt mr-2 text-red-500 mt-1"></i>
                                        <div>
                                            <span class="text-gray-600">장소:</span>
                                            <span class="ml-2 font-medium">${activity.location}</span>
                                            ${activity.district ? `<span class="ml-2 text-gray-500">(${activity.district})</span>` : ''}
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <i class="fas fa-clock mr-2 text-green-600 mt-1"></i>
                                        <div>
                                            <span class="text-gray-600">일시:</span>
                                            <span class="ml-2 font-medium">${formatDateTime(activity.startTime)} ~ ${formatTime(activity.endTime)}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-start">
                                        <i class="fas fa-hourglass-half mr-2 text-orange-600 mt-1"></i>
                                        <div>
                                            <span class="text-gray-600">소요시간:</span>
                                            <span class="ml-2 font-medium">${activity.duration || '미정'}</span>
                                        </div>
                                    </div>
                                    ${activity.attendees ? `
                                    <div class="flex items-start">
                                        <i class="fas fa-users mr-2 text-purple-600 mt-1"></i>
                                        <div>
                                            <span class="text-gray-600">참석자:</span>
                                            <span class="ml-2 font-medium">${activity.attendees}명</span>
                                        </div>
                                    </div>
                                    ` : ''}
                                    ${activity.distance ? `
                                    <div class="flex items-start">
                                        <i class="fas fa-route mr-2 text-indigo-600 mt-1"></i>
                                        <div>
                                            <span class="text-gray-600">이동거리:</span>
                                            <span class="ml-2 font-medium">${activity.distance}</span>
                                        </div>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                        
                        <!-- GPS 인증 정보 -->
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-3 text-gray-800">
                                <i class="fas fa-location-arrow mr-2 text-blue-600"></i>위치 인증
                            </h3>
                            <div class="bg-green-50 border border-green-200 p-4 rounded-lg">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        ${activity.gpsVerified ? `
                                            <i class="fas fa-check-circle text-green-600 text-2xl mr-3"></i>
                                            <div>
                                                <div class="font-medium text-green-800">GPS 인증 완료</div>
                                                <div class="text-xs text-green-600">위치 정보가 확인되었습니다</div>
                                            </div>
                                        ` : `
                                            <i class="fas fa-exclamation-circle text-orange-600 text-2xl mr-3"></i>
                                            <div>
                                                <div class="font-medium text-orange-800">GPS 미인증</div>
                                                <div class="text-xs text-orange-600">위치 정보 없음</div>
                                            </div>
                                        `}
                                    </div>
                                    <div class="text-right text-sm text-gray-600">
                                        <div>상태: <span class="font-medium">${getStatusName(activity.status)}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- QR 코드 및 인증 정보 -->
                        <div class="mb-6">
                            <div class="bg-gray-100 p-6 rounded-lg text-center">
                                <canvas id="activity-qr-code" class="mx-auto mb-3"></canvas>
                                <p class="text-xs text-gray-600">이 QR코드로 활동 내용을 확인할 수 있습니다</p>
                                <p class="text-xs text-gray-500 mt-1">문서번호: ${generateDocNumber(activity)}</p>
                            </div>
                        </div>
                        
                        <!-- 서명 영역 -->
                        <div class="border-t pt-4">
                            <div class="text-center">
                                <p class="text-sm text-gray-600 mb-2">
                                    위 내용이 사실임을 증명합니다.
                                </p>
                                <p class="font-bold text-lg mb-1">경기도의회</p>
                                <p class="text-sm text-gray-600">의정활동 관리시스템</p>
                                <div class="mt-4">
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Ctext x='100' y='35' text-anchor='middle' font-size='20' fill='%23003d7a' font-weight='bold'%3E경기도의회%3C/text%3E%3C/svg%3E" 
                                         alt="도장" class="h-16 mx-auto opacity-50">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 버튼 영역 -->
                    <div class="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-between">
                        <button onclick="app.printCertificate()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                            <i class="fas fa-print mr-2"></i>인쇄
                        </button>
                        <div class="space-x-2">
                            <button onclick="app.downloadCertificate('${activity.id}')" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                                <i class="fas fa-download mr-2"></i>저장
                            </button>
                            <button onclick="app.shareCertificate('${activity.id}')" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                                <i class="fas fa-share-alt mr-2"></i>공유
                            </button>
                            <button onclick="app.closeCertificate()" class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // DOM에 추가
        document.body.insertAdjacentHTML('beforeend', certificateHTML);
        
        // QR 코드 생성
        setTimeout(() => {
            generateQRCode(activity);
        }, 100);
    };
    
    // 증명서 닫기
    window.app.closeCertificate = function() {
        const modal = document.getElementById('activity-certificate-modal');
        if (modal) {
            modal.remove();
        }
    };
    
    // 증명서 인쇄
    window.app.printCertificate = function() {
        const content = document.getElementById('certificate-content');
        if (content) {
            const printWindow = window.open('', '', 'width=800,height=600');
            printWindow.document.write(`
                <html>
                <head>
                    <title>의정활동 증명서</title>
                    <link rel="stylesheet" href="https://cdn.tailwindcss.com">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
                </head>
                <body class="p-8">
                    ${content.innerHTML}
                </body>
                </html>
            `);
            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
            }, 500);
        }
    };
    
    // 증명서 다운로드
    window.app.downloadCertificate = function(activityId) {
        alert(`증명서 다운로드: ${activityId}\nPDF 파일로 저장됩니다.`);
        // 실제로는 PDF 생성 라이브러리를 사용해야 함
    };
    
    // 증명서 공유
    window.app.shareCertificate = function(activityId) {
        const shareUrl = `${window.location.origin}#certificate/${activityId}`;
        if (navigator.share) {
            navigator.share({
                title: '의정활동 증명서',
                text: '경기도의회 의정활동 증명서입니다.',
                url: shareUrl
            });
        } else {
            // 클립보드에 복사
            navigator.clipboard.writeText(shareUrl);
            alert('증명서 링크가 클립보드에 복사되었습니다.');
        }
    };
    
    // 헬퍼 함수들
    function getActivityTypeName(type) {
        const types = {
            'meeting': '회의/간담회',
            'inspection': '현장 시찰',
            'event': '행사 참석',
            'service': '민원 상담',
            'consultation': '상담/협의'
        };
        return types[type] || type;
    }
    
    function getStatusName(status) {
        const statuses = {
            'completed': '완료',
            'scheduled': '예정',
            'in-progress': '진행중',
            'cancelled': '취소'
        };
        return statuses[status] || status;
    }
    
    function formatDateTime(dateTimeStr) {
        if (!dateTimeStr) return '미정';
        const [date, time] = dateTimeStr.split(' ');
        const [year, month, day] = date.split('-');
        return `${year}년 ${month}월 ${day}일 ${time || ''}`;
    }
    
    function formatTime(dateTimeStr) {
        if (!dateTimeStr) return '';
        const time = dateTimeStr.split(' ')[1];
        return time || '';
    }
    
    function generateDocNumber(activity) {
        const date = new Date();
        return `GG-${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}-${activity.id}`;
    }
    
    function generateQRCode(activity) {
        const canvas = document.getElementById('activity-qr-code');
        if (canvas && window.QRious) {
            const qr = new QRious({
                element: canvas,
                value: JSON.stringify({
                    id: activity.id,
                    title: activity.title,
                    date: activity.date,
                    location: activity.location
                }),
                size: 150,
                level: 'M'
            });
        }
    }
    
    console.log('✅ 위치 기반 활동 증명서 기능 로드 완료');
})();