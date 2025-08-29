import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">DevTrip 서비스 이용약관</CardTitle>
          <p className="text-muted-foreground">최종 업데이트: 2024년 12월 15일</p>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">제1조 (목적)</h2>
              <p className="text-sm leading-relaxed">
                이 약관은 DevTrip(이하 "회사")이 제공하는 DevOps 학습 플랫폼 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">제2조 (정의)</h2>
              <ul className="text-sm space-y-2">
                <li>1. "서비스"란 회사가 제공하는 DevOps 기술 학습, 실습, 평가 서비스를 말합니다.</li>
                <li>2. "이용자"란 이 약관에 따라 회사와 서비스 이용계약을 체결하고 서비스를 이용하는 개인 또는 법인을 말합니다.</li>
                <li>3. "계정"이란 서비스 이용을 위해 이용자가 설정한 고유한 식별자를 말합니다.</li>
                <li>4. "콘텐츠"란 서비스 내에서 이용자가 생성, 업로드, 전송하는 텍스트, 이미지, 동영상, 링크 등의 정보를 말합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">제3조 (약관의 명시와 설명 및 개정)</h2>
              <p className="text-sm leading-relaxed mb-2">
                1. 회사는 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 사업자등록번호, 연락처 등을 이용자가 알 수 있도록 서비스 화면에 게시합니다.
              </p>
              <p className="text-sm leading-relaxed mb-2">
                2. 회사는 필요한 경우 이 약관을 개정할 수 있으며, 개정된 약관은 서비스 화면에 공지하거나 기타의 방법으로 이용자에게 공지합니다.
              </p>
              <p className="text-sm leading-relaxed">
                3. 개정된 약관은 공지한 날로부터 효력이 발생합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">제4조 (서비스의 제공 및 변경)</h2>
              <p className="text-sm leading-relaxed mb-2">
                1. 회사가 제공하는 서비스는 다음과 같습니다:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Docker, Kubernetes, Helm 등 DevOps 기술 학습 콘텐츠</li>
                <li>• 실습 환경 및 미션 수행</li>
                <li>• 학습 진도 관리 및 평가</li>
                <li>• 커뮤니티 기능</li>
              </ul>
              <p className="text-sm leading-relaxed mt-2">
                2. 회사는 서비스의 품질 향상을 위해 서비스의 내용을 변경할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">제5조 (서비스 이용계약의 성립)</h2>
              <p className="text-sm leading-relaxed mb-2">
                1. 이용계약은 이용자가 이 약관에 동의하고 회사가 정한 가입 신청을 완료한 시점에 성립합니다.
              </p>
              <p className="text-sm leading-relaxed">
                2. 회사는 다음 각 호에 해당하는 신청에 대해서는 승낙하지 않을 수 있습니다:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• 실명이 아니거나 타인의 명의를 이용한 경우</li>
                <li>• 허위의 정보를 기재하거나 회사가 제시하는 내용을 기재하지 않은 경우</li>
                <li>• 기타 회사가 정한 이용신청요건에 미달하는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">제6조 (개인정보보호)</h2>
              <p className="text-sm leading-relaxed">
                회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 이용에 대해서는 별도의 개인정보처리방침을 적용합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">제7조 (이용자의 의무)</h2>
              <p className="text-sm leading-relaxed mb-2">
                이용자는 다음 각 호의 행위를 하여서는 안 됩니다:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• 타인의 정보 도용</li>
                <li>• 회사가 게시한 정보의 변경</li>
                <li>• 회사가 금지한 정보(컴퓨터 바이러스, 악성코드 등)의 송신 또는 게시</li>
                <li>• 회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 행위</li>
                <li>• 기타 불법적이거나 부당한 행위</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">제8조 (서비스 이용의 제한 및 중지)</h2>
              <p className="text-sm leading-relaxed mb-2">
                회사는 다음 각 호에 해당하는 경우 서비스 이용을 제한하거나 중지할 수 있습니다:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• 이 약관을 위반한 경우</li>
                <li>• 서비스의 정상적인 운영을 방해한 경우</li>
                <li>• 기타 회사가 필요하다고 인정하는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">제9조 (손해배상)</h2>
              <p className="text-sm leading-relaxed">
                회사와 이용자는 서비스 이용과 관련하여 고의 또는 중과실로 상대방에게 손해를 끼친 경우에는 그 손해를 배상할 책임이 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">제10조 (면책조항)</h2>
              <p className="text-sm leading-relaxed mb-2">
                1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
              </p>
              <p className="text-sm leading-relaxed">
                2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">제11조 (재판권 및 준거법)</h2>
              <p className="text-sm leading-relaxed">
                이 약관에 관한 소송은 대한민국 법률에 따라 대한민국 법원에서 진행합니다.
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