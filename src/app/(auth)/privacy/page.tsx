import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">DevTrip 개인정보 처리방침</CardTitle>
          <p className="text-muted-foreground">최종 업데이트: 2024년 12월 15일</p>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. 개인정보의 처리 목적</h2>
              <p className="text-sm leading-relaxed mb-2">
                DevTrip(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
                <li>• 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증</li>
                <li>• 학습 진도 관리 및 맞춤형 교육 서비스 제공</li>
                <li>• 민원사무 처리</li>
                <li>• 마케팅 및 광고에의 활용</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. 개인정보의 처리 및 보유 기간</h2>
              <p className="text-sm leading-relaxed mb-2">
                회사는 정보주체로부터 개인정보를 수집할 때 동의받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다:</p>
                <ul className="text-sm space-y-1">
                  <li>• 회원정보: 회원 탈퇴 시까지 (관계법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지)</li>
                  <li>• 학습기록: 회원 탈퇴 후 3년</li>
                  <li>• 결제정보: 전자상거래법에 따라 5년</li>
                  <li>• 쿠키, 로그기록: 1년</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. 처리하는 개인정보의 항목 작성</h2>
              <p className="text-sm leading-relaxed mb-2">
                회사는 다음의 개인정보 항목을 처리하고 있습니다.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">필수항목:</p>
                  <p className="text-sm">이메일, 이름, 성, 비밀번호</p>
                </div>
                <div>
                  <p className="text-sm font-medium">선택항목:</p>
                  <p className="text-sm">전화번호, 직업, 관심 기술스택</p>
                </div>
                <div>
                  <p className="text-sm font-medium">자동 수집 항목:</p>
                  <p className="text-sm">IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록, 불량이용기록 등</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. 개인정보의 제3자 제공에 관한 사항</h2>
              <p className="text-sm leading-relaxed mb-2">
                회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              </p>
              <p className="text-sm leading-relaxed">
                현재 회사는 개인정보를 제3자에게 제공하고 있지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. 개인정보처리 위탁</h2>
              <p className="text-sm leading-relaxed mb-2">
                회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">위탁업체 및 위탁업무 내용:</p>
                <ul className="text-sm space-y-1">
                  <li>• 클라우드 서비스 제공업체: 데이터 저장 및 백업</li>
                  <li>• 이메일 발송 서비스: 회원 가입 확인, 비밀번호 재설정 등</li>
                  <li>• 결제대행 서비스: 결제정보 처리</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. 정보주체의 권리·의무 및 그 행사방법</h2>
              <p className="text-sm leading-relaxed mb-2">
                정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• 개인정보 처리현황 통지요구</li>
                <li>• 개인정보 열람요구</li>
                <li>• 개인정보 정정·삭제요구</li>
                <li>• 개인정보 처리정지요구</li>
              </ul>
              <p className="text-sm leading-relaxed mt-2">
                위의 권리 행사는 회사에 대해 서면, 전화, 전자우편을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. 개인정보의 파기</h2>
              <p className="text-sm leading-relaxed mb-2">
                회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">파기절차 및 방법:</p>
                <ul className="text-sm space-y-1">
                  <li>• 파기절차: 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</li>
                  <li>• 파기방법: 전자적 파일형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. 개인정보의 안전성 확보 조치</h2>
              <p className="text-sm leading-relaxed mb-2">
                회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• 개인정보 취급 직원의 최소화 및 교육</li>
                <li>• 개인정보의 암호화</li>
                <li>• 해킹 등에 대비한 기술적 대책</li>
                <li>• 개인정보에 대한 접근 제한</li>
                <li>• 접속기록의 보관 및 위변조 방지</li>
                <li>• 문서보안을 위한 잠금장치 사용</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. 개인정보 보호책임자</h2>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">개인정보 보호책임자 연락처:</p>
                <ul className="text-sm space-y-1">
                  <li>• 성명: 김개발</li>
                  <li>• 직책: CTO</li>
                  <li>• 이메일: privacy@devtrip.com</li>
                  <li>• 전화번호: 02-1234-5678</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. 개인정보 처리방침 변경</h2>
              <p className="text-sm leading-relaxed">
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t">
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/signup">동의하고 가입하기</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">이전으로</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}