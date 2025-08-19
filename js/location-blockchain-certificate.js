// 블록체인 기반 의정활동 증명서 시스템
window.LocationCertificate = {
    // 블록체인 시뮬레이션 (실제로는 이더리움 등 블록체인 네트워크 연동)
    blockchain: {
        chain: [],
        currentBlockId: 0,
        
        // 블록 생성
        createBlock: function(data) {
            const previousBlock = this.chain[this.chain.length - 1];
            const block = {
                id: ++this.currentBlockId,
                timestamp: new Date().getTime(),
                data: data,
                previousHash: previousBlock ? previousBlock.hash : '0',
                nonce: 0,
                hash: ''
            };
            
            // 해시 계산 (간단한 시뮬레이션)
            block.hash = this.calculateHash(block);
            this.chain.push(block);
            return block;
        },
        
        // 해시 계산 함수
        calculateHash: function(block) {
            const dataString = JSON.stringify({
                id: block.id,
                timestamp: block.timestamp,
                data: block.data,
                previousHash: block.previousHash,
                nonce: block.nonce
            });
            // UTF-8 문자열을 안전하게 인코딩
            // 실제로는 SHA-256 등 암호화 해시 사용
            try {
                // UTF-8 인코딩을 위한 처리
                const utf8String = encodeURIComponent(dataString).replace(/%([0-9A-F]{2})/g,
                    function(match, p1) {
                        return String.fromCharCode('0x' + p1);
                    });
                return btoa(utf8String).substring(0, 64);
            } catch (e) {
                // 폴백: 간단한 해시 생성
                let hash = 0;
                for (let i = 0; i < dataString.length; i++) {
                    const char = dataString.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash = hash & hash; // Convert to 32bit integer
                }
                return Math.abs(hash).toString(36).padEnd(64, '0').substring(0, 64);
            }
        },
        
        // 체인 검증
        verifyChain: function() {
            for (let i = 1; i < this.chain.length; i++) {
                const currentBlock = this.chain[i];
                const previousBlock = this.chain[i - 1];
                
                if (currentBlock.previousHash !== previousBlock.hash) {
                    return false;
                }
                
                if (currentBlock.hash !== this.calculateHash(currentBlock)) {
                    return false;
                }
            }
            return true;
        }
    },
    
    // 50개의 샘플 활동 데이터 생성
    generateSampleActivities: function() {
        const activities = [];
        const types = ['meeting', 'inspection', 'service', 'event', 'business', 'legislation', 'campaign'];
        const locations = [
            { name: '수원시청', address: '경기도 수원시 팔달구 효원로 241', lat: 37.2636, lng: 127.0286 },
            { name: '경기도의회', address: '경기도 수원시 영통구 도청로 30', lat: 37.2765, lng: 127.0442 },
            { name: '수원컨벤션센터', address: '경기도 수원시 영통구 광교산로 140', lat: 37.2863, lng: 127.0438 },
            { name: '영통구청', address: '경기도 수원시 영통구 효원로 407', lat: 37.2595, lng: 127.0466 },
            { name: '수원시 보건소', address: '경기도 수원시 팔달구 팔달산로 6', lat: 37.2685, lng: 127.0165 },
            { name: '수원역', address: '경기도 수원시 팔달구 덕영대로 924', lat: 37.2659, lng: 126.9996 },
            { name: '광교호수공원', address: '경기도 수원시 영통구 광교호수로 57', lat: 37.2797, lng: 127.0673 },
            { name: '수원월드컵경기장', address: '경기도 수원시 영통구 월드컵로 206', lat: 37.2866, lng: 127.0369 }
        ];
        
        const titles = [
            '지역 교육현안 간담회', '환경개선 현장점검', '복지시설 방문', '주민과의 대화',
            '중소기업 지원 간담회', '법안 공청회', '정책 토론회', '예산 심의회의',
            '시민 안전점검', '청년정책 간담회', '노인복지 현장방문', '교통문제 현장조사',
            '도시재생사업 점검', '문화예술 지원 행사', '농업정책 간담회', '스마트시티 현장방문'
        ];
        
        // 현재 날짜부터 과거 6개월간의 활동 생성
        const now = new Date();
        
        for (let i = 0; i < 50; i++) {
            const daysAgo = Math.floor(Math.random() * 180); // 최근 6개월
            const activityDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
            const location = locations[Math.floor(Math.random() * locations.length)];
            const type = types[Math.floor(Math.random() * types.length)];
            
            const activity = {
                id: `LOC2025-${String(i + 1).padStart(3, '0')}`,
                type: type,
                title: titles[Math.floor(Math.random() * titles.length)],
                location: location.name,
                address: location.address,
                coordinates: { lat: location.lat, lng: location.lng },
                date: activityDate.toISOString().split('T')[0],
                startTime: `${9 + Math.floor(Math.random() * 10)}:00`, // 9시~18시
                duration: `${1 + Math.floor(Math.random() * 4)}시간`,
                participants: 10 + Math.floor(Math.random() * 100),
                status: 'completed',
                gpsVerified: Math.random() > 0.1, // 90% GPS 인증
                summary: `의정활동 내용 요약 #${i + 1}`,
                // 블록체인 정보
                blockchainId: null,
                blockHash: null,
                transactionHash: null,
                verified: false
            };
            
            // 블록체인에 기록
            const block = this.blockchain.createBlock(activity);
            activity.blockchainId = block.id;
            activity.blockHash = block.hash;
            activity.transactionHash = `0x${block.hash.substring(0, 40)}`;
            activity.verified = true;
            
            activities.push(activity);
        }
        
        // 날짜 순으로 정렬
        activities.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return activities;
    },
    
    // 증명서 생성
    generateCertificate: function(activity) {
        const certificateId = `CERT-${activity.id}-${Date.now()}`;
        const issueDate = new Date().toLocaleString('ko-KR');
        
        return {
            certificateId: certificateId,
            activityId: activity.id,
            type: '의정활동 증명서',
            issuer: '경기도의회 블록체인 인증 시스템',
            issueDate: issueDate,
            member: {
                name: (typeof MemberDataManager !== 'undefined' && MemberDataManager.defaultMemberData) ? 
                      MemberDataManager.defaultMemberData.name : '김호겸',
                memberId: (typeof MemberDataManager !== 'undefined' && MemberDataManager.defaultMemberData) ? 
                          MemberDataManager.defaultMemberData.memberId : '2024-0815',
                party: (typeof MemberDataManager !== 'undefined' && MemberDataManager.defaultMemberData) ? 
                       MemberDataManager.defaultMemberData.party : '국민의힘',
                district: (typeof MemberDataManager !== 'undefined' && MemberDataManager.defaultMemberData) ? 
                          MemberDataManager.defaultMemberData.district : '수원시 제5선거구'
            },
            activity: {
                title: activity.title,
                type: activity.type,
                date: activity.date,
                time: activity.startTime,
                duration: activity.duration,
                location: activity.location,
                address: activity.address,
                coordinates: activity.coordinates,
                participants: activity.participants,
                gpsVerified: activity.gpsVerified,
                summary: activity.summary
            },
            blockchain: {
                blockId: activity.blockchainId,
                blockHash: activity.blockHash,
                transactionHash: activity.transactionHash,
                timestamp: new Date().getTime(),
                network: 'Ethereum Mainnet (Simulated)',
                verified: true
            },
            verification: {
                qrCode: `https://ggc.go.kr/verify/${certificateId}`,
                digitalSignature: this.generateDigitalSignature(activity),
                hashAlgorithm: 'SHA-256',
                encryptionMethod: 'RSA-2048'
            }
        };
    },
    
    // 디지털 서명 생성 (시뮬레이션)
    generateDigitalSignature: function(data) {
        const dataString = JSON.stringify(data);
        try {
            // UTF-8 인코딩을 위한 처리
            const utf8String = encodeURIComponent(dataString).replace(/%([0-9A-F]{2})/g,
                function(match, p1) {
                    return String.fromCharCode('0x' + p1);
                });
            return btoa(utf8String).substring(0, 128);
        } catch (e) {
            // 폴백: 간단한 서명 생성
            let hash = 0;
            for (let i = 0; i < dataString.length; i++) {
                const char = dataString.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return Math.abs(hash).toString(36).padEnd(128, '0').substring(0, 128);
        }
    },
    
    // 증명서 HTML 생성
    renderCertificate: function(certificate) {
        return `
            <div class="certificate-container" style="max-width: 800px; margin: 0 auto; background: white; border: 2px solid #003d7a; border-radius: 12px; padding: 30px; position: relative;">
                <!-- 워터마크 -->
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 120px; color: rgba(0,61,122,0.05); font-weight: bold; z-index: 0; pointer-events: none;">
                    VERIFIED
                </div>
                
                <!-- 헤더 -->
                <div style="text-align: center; margin-bottom: 30px; position: relative; z-index: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <img src="https://www.ggc.go.kr/site/main/images/sub/logo_anniversary_100.png" 
                             alt="경기도의회" style="height: 60px;">
                        <div style="text-align: right;">
                            <div style="font-size: 12px; color: #666;">증명서 번호</div>
                            <div style="font-size: 14px; font-weight: bold; color: #003d7a;">${certificate.certificateId}</div>
                        </div>
                    </div>
                    <h1 style="font-size: 28px; color: #003d7a; margin: 20px 0; font-weight: bold;">
                        의정활동 증명서
                    </h1>
                    <div style="font-size: 14px; color: #666;">
                        Legislative Activity Certificate
                    </div>
                </div>
                
                <!-- 블록체인 인증 배지 -->
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                    <i class="fas fa-shield-alt" style="margin-right: 8px;"></i>
                    <strong>블록체인 인증 완료</strong> - 위변조 불가능한 원본 증명서
                </div>
                
                <!-- 의원 정보 -->
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="font-size: 16px; color: #333; margin-bottom: 10px;">의원 정보</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                        <div><strong>성명:</strong> ${certificate.member.name}</div>
                        <div><strong>의원번호:</strong> ${certificate.member.memberId}</div>
                        <div><strong>소속정당:</strong> ${certificate.member.party}</div>
                        <div><strong>선거구:</strong> ${certificate.member.district}</div>
                    </div>
                </div>
                
                <!-- 활동 내용 -->
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="font-size: 16px; color: #333; margin-bottom: 10px;">활동 내용</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><strong>활동명:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">${certificate.activity.title}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><strong>활동유형:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">
                                ${this.getActivityTypeLabel(certificate.activity.type)}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><strong>일시:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">
                                ${certificate.activity.date} ${certificate.activity.time} (${certificate.activity.duration})
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><strong>장소:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">
                                ${certificate.activity.location}<br>
                                <small style="color: #666;">${certificate.activity.address}</small>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><strong>참여인원:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">${certificate.activity.participants}명</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;"><strong>GPS 인증:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #dee2e6;">
                                ${certificate.activity.gpsVerified ? 
                                    '<span style="color: #28a745;"><i class="fas fa-check-circle"></i> 인증완료</span>' : 
                                    '<span style="color: #6c757d;">미인증</span>'}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>활동요약:</strong></td>
                            <td style="padding: 8px;">${certificate.activity.summary}</td>
                        </tr>
                    </table>
                </div>
                
                <!-- 블록체인 정보 -->
                <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #bee5eb;">
                    <h3 style="font-size: 16px; color: #333; margin-bottom: 10px;">
                        <i class="fas fa-link"></i> 블록체인 검증 정보
                    </h3>
                    <div style="font-size: 12px; line-height: 1.8;">
                        <div><strong>Block ID:</strong> ${certificate.blockchain.blockId}</div>
                        <div><strong>Block Hash:</strong> <code style="background: #fff; padding: 2px 4px; border-radius: 3px; font-size: 11px;">${certificate.blockchain.blockHash}</code></div>
                        <div><strong>Transaction Hash:</strong> <code style="background: #fff; padding: 2px 4px; border-radius: 3px; font-size: 11px;">${certificate.blockchain.transactionHash}</code></div>
                        <div><strong>Network:</strong> ${certificate.blockchain.network}</div>
                        <div><strong>Timestamp:</strong> ${new Date(certificate.blockchain.timestamp).toLocaleString('ko-KR')}</div>
                        <div style="margin-top: 8px; color: #28a745;">
                            <i class="fas fa-check-circle"></i> <strong>블록체인 검증 완료</strong>
                        </div>
                    </div>
                </div>
                
                <!-- QR 코드 및 디지털 서명 -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #dee2e6;">
                    <div style="text-align: center;">
                        <canvas id="certQRCode" style="border: 1px solid #dee2e6;"></canvas>
                        <div style="font-size: 11px; color: #666; margin-top: 5px;">검증 QR 코드</div>
                    </div>
                    <div style="flex: 1; padding: 0 20px;">
                        <div style="font-size: 12px; color: #666; margin-bottom: 5px;">디지털 서명:</div>
                        <div style="background: #f8f9fa; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 10px; word-break: break-all; color: #495057;">
                            ${certificate.verification.digitalSignature}
                        </div>
                    </div>
                </div>
                
                <!-- 발급 정보 -->
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #666; font-size: 12px;">
                    <div><strong>발급기관:</strong> ${certificate.issuer}</div>
                    <div><strong>발급일시:</strong> ${certificate.issueDate}</div>
                    <div style="margin-top: 10px; color: #003d7a;">
                        본 증명서는 블록체인 기술로 보호되며, 위변조가 불가능합니다.
                    </div>
                </div>
                
                <!-- 인쇄/다운로드 버튼 -->
                <div style="margin-top: 30px; text-align: center; no-print;">
                    <button onclick="window.print()" class="btn-primary" style="margin-right: 10px;">
                        <i class="fas fa-print"></i> 인쇄
                    </button>
                    <button onclick="LocationCertificate.downloadPDF('${certificate.certificateId}')" class="btn-secondary">
                        <i class="fas fa-download"></i> PDF 다운로드
                    </button>
                </div>
            </div>
            
            <style>
                @media print {
                    .no-print { display: none !important; }
                    .certificate-container { border: 1px solid #000 !important; }
                }
            </style>
        `;
    },
    
    // 활동 유형 라벨
    getActivityTypeLabel: function(type) {
        const labels = {
            meeting: '회의/간담회',
            inspection: '현장점검',
            service: '봉사활동',
            event: '행사참석',
            business: '기업지원',
            legislation: '입법활동',
            campaign: '캠페인'
        };
        return labels[type] || type;
    },
    
    // PDF 다운로드 (실제로는 서버에서 생성)
    downloadPDF: function(certificateId) {
        app.showToast('PDF 다운로드를 준비중입니다...');
        // 실제로는 서버 API 호출하여 PDF 생성
        setTimeout(() => {
            app.showToast('PDF가 다운로드되었습니다.');
        }, 2000);
    },
    
    // 초기화
    init: function() {
        // 제네시스 블록 생성
        this.blockchain.createBlock({ type: 'genesis', timestamp: Date.now() });
    }
};

// 초기화
LocationCertificate.init();