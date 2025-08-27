

# **Helm: 쿠버네티스 패키지 관리를 위한 완벽 가이드**

## **서론: Helm을 통한 쿠버네티스 애플리케이션 관리 마스터하기**

### **쿠버네티스 매니페스트 관리의 어려움**

쿠버네티스는 컨테이너화된 애플리케이션을 배포, 확장 및 관리하기 위한 강력한 플랫폼으로 자리 잡았지만, 그 복잡성은 운영의 큰 걸림돌이 되기도 합니다. 애플리케이션을 구성하는 수많은 리소스(Deployment, Service, ConfigMap, Secret 등)는 각각 YAML 매니페스트 파일로 정의됩니다. 간단한 애플리케이션이라도 수십 개의 YAML 파일이 필요할 수 있으며, 애플리케이션이 복잡해질수록 이 파일의 수는 기하급수적으로 증가합니다. 1

이러한 방식은 여러 가지 문제를 야기합니다. 첫째, 개발(Dev), 스테이징(Staging), 운영(Production) 등 여러 환경에 걸쳐 애플리케이션을 배포할 때 설정 값의 미세한 차이로 인해 YAML 파일의 중복이 발생합니다. 이는 수동 오류의 가능성을 높이고, 환경 간의 일관성을 유지하기 어렵게 만듭니다. 2 둘째, 애플리케이션의 버전 관리, 업그레이드, 롤백과 같은 라이프사이클 관리가 복잡해집니다. 어떤 리소스 집합이 특정 애플리케이션 버전에 해당하는지 추적하는 것은 매우 어려운 작업이며, 배포 실패 시 이전의 안정적인 상태로 되돌리는 과정은 고통스러울 수 있습니다. 4 마지막으로, 여러 마이크로서비스로 구성된 복잡한 애플리케이션의 경우, 서비스 간의 의존성을 수동으로 관리하는 것은 거의 불가능에 가깝습니다. 3

### **쿠버네티스 패키지 매니저, Helm의 등장**

이러한 문제들을 해결하기 위해 등장한 것이 바로 Helm입니다. Helm은 쿠버네티스를 위한 패키지 매니저로, 리눅스 환경의 apt나 yum과 유사한 역할을 수행합니다. 1 Helm은 애플리케이션 배포에 필요한 모든 쿠버네티스 리소스 정의와 설정을 '차트(Chart)'라는 하나의 패키지로 묶어 관리합니다. 7 이를 통해 복잡한 YAML 파일들을 직접 다루는 대신, 잘 정의된 차트를 사용하여 단일 명령어로 애플리케이션을 배포, 업그레이드, 삭제할 수 있습니다. 3

Helm은 템플릿 기능을 통해 YAML 매니페스트를 동적으로 생성합니다. 즉, 환경별로 달라지는 설정 값(예: 이미지 태그, 복제본 수, 도메인 이름)을 변수화하여 차트 설치 시 주입할 수 있습니다. 이로써 코드 중복을 제거하고, 여러 환경에 걸쳐 일관된 배포를 보장할 수 있습니다.

### **핵심 가치: 단순성, 재사용성, 관리 용이성**

Helm이 제공하는 핵심 가치는 세 가지로 요약할 수 있습니다. 첫째, **단순성**입니다. 복잡한 kubectl apply \-f 명령어의 연속 대신 helm install이라는 단일 명령어로 전체 애플리케이션 스택을 배포할 수 있어 배포 과정이 극적으로 단순화됩니다. 2 둘째,

**재사용성**입니다. 잘 만들어진 차트는 팀 내부는 물론, Artifact Hub와 같은 공개 저장소를 통해 전 세계 커뮤니티와 공유될 수 있습니다. 이를 통해 검증된 애플리케이션(예: PostgreSQL, Redis, Jenkins)을 손쉽게 클러스터에 설치할 수 있습니다. 6 셋째,

**관리 용이성**입니다. Helm은 배포된 애플리케이션의 버전을 '릴리스(Release)'라는 단위로 추적하며, 모든 변경 사항에 대한 이력을 관리합니다. 덕분에 문제가 발생했을 때 특정 버전으로 손쉽게 롤백할 수 있어 안정적인 애플리케이션 라이프사이클 관리가 가능해집니다. 2 이러한 이점들은 개발자의 생산성을 높이고, 배포 속도를 향상시키며, 복잡한 마이크로서비스 아키텍처의 운영 부담을 크게 줄여줍니다.

## **1장: 핵심 개념과 아키텍처**

Helm을 효과적으로 사용하기 위해서는 그 근간을 이루는 핵심 개념과 아키텍처에 대한 명확한 이해가 필수적입니다. 이 장에서는 Helm의 세 가지 기본 요소인 차트, 릴리스, 리포지토리를 정의하고, Helm 3의 현대적인 아키텍처가 어떻게 쿠버네티스와 상호작용하는지 심도 있게 살펴봅니다.

### **세 가지 기본 개념: 차트, 릴리스, 리포지토리**

Helm의 생태계는 세 가지 핵심 개념을 중심으로 구성됩니다. 이들은 각각 패키징, 실행, 배포의 역할을 담당합니다.

#### **차트 (Chart)**

**차트**는 Helm의 패키징 형식으로, 쿠버네티스 애플리케이션을 실행하는 데 필요한 모든 리소스 정의를 포함하는 파일의 모음입니다. 3 이는 간단한 Memcached 파드 하나를 배포하는 것부터 HTTP 서버, 데이터베이스, 캐시 등을 포함하는 완전한 웹 애플리케이션 스택을 배포하는 것까지 모든 규모의 애플리케이션을 기술할 수 있습니다. 9 차트는 애플리케이션의 청사진(blueprint)과 같아서, 쿠버네티스 리소스(Deployment, Service, Secret, ConfigMap 등)를 정의하는 템플릿화된 YAML 파일과 사용자 정의 설정을 위한 기본값 파일(

values.yaml)로 구성됩니다. 1 이 구조 덕분에 차트는 재사용이 가능하며, 일관된 설정을 통해 여러 환경에 걸쳐 안정적인 배포를 보장합니다.

#### **릴리스 (Release)**

**릴리스**는 쿠버네티스 클러스터에서 실행 중인 차트의 인스턴스입니다. 10 하나의 차트는 동일한 클러스터에 여러 번 설치될 수 있으며, 설치될 때마다 새로운 릴리스가 생성됩니다. 10 예를 들어, MySQL 차트를 두 번 설치하여 클러스터에 두 개의 독립적인 데이터베이스를 운영할 수 있습니다. 각 릴리스는 고유한 이름(release name)을 가지며, 독립적으로 관리되고 업그레이드됩니다. 12 Helm은 각 릴리스의 모든 변경 사항을 리비전(revision)으로 추적하여, 특정 시점의 상태로 쉽게 롤백할 수 있는 강력한 버전 관리 기능을 제공합니다.

#### **리포지토리 (Repository)**

**리포지토리**는 패키징된 차트를 수집하고 공유할 수 있는 저장소입니다. 10 이는 Perl의 CPAN 아카이브나 Fedora의 패키지 데이터베이스와 유사한 개념으로, 쿠버네티스 패키지를 위한 중앙 집중식 배포 지점 역할을 합니다. 10 리포지토리는 기본적으로

index.yaml 파일과 패키징된 차트 아카이브(.tgz 파일)를 호스팅하는 간단한 HTTP 서버입니다. 15 사용자는

helm repo add 명령어를 통해 로컬 Helm 클라이언트에 리포지토리를 추가하고, helm search 명령어로 필요한 차트를 검색하며, helm install 명령어로 차트를 클러스터에 설치할 수 있습니다. 13 Artifact Hub는 수십 개의 공개 리포지토리에서 제공하는 차트를 검색할 수 있는 중앙 허브 역할을 하며, 조직은 내부용 애플리케이션을 위해 비공개 리포지토리를 운영할 수도 있습니다. 15

### **Helm의 현대적 아키텍처: Tiller의 제거**

Helm의 아키텍처는 버전 3에서 중요한 변화를 겪었습니다. 이 변화의 핵심은 Helm 2의 서버 측 컴포넌트였던 '틸러(Tiller)'의 제거입니다.

Helm 2는 클라이언트-서버 모델을 기반으로 했습니다. 사용자는 로컬 머신에서 helm 클라이언트를 실행하고, 이 클라이언트는 쿠버네티스 클러스터 내부에 배포된 Tiller라는 서버 프로세스와 통신했습니다. 17 Tiller는 차트를 렌더링하고 쿠버네티스 API와 통신하여 리소스를 생성, 수정, 삭제하는 역할을 담당했습니다. 그러나 이 구조는 심각한 보안 문제를 내포하고 있었습니다. Tiller는 클러스터 전체에 대한 광범위한 권한(주로

cluster-admin)을 요구했으며, 이는 잠재적인 공격 표면이자 단일 실패 지점이 되었습니다. 18

Helm 3는 이러한 문제를 해결하기 위해 Tiller를 완전히 제거하고 클라이언트 전용 아키텍처로 전환했습니다. 8 이제 Helm 클라이언트는 Tiller를 거치지 않고 쿠버네티스 API 서버와 직접 상호작용합니다. 이 아키텍처 변경은 Helm의 보안 모델을 근본적으로 개선했습니다.

### **Helm과 쿠버네티스 API 서버의 상호작용**

Helm 3의 작동 방식은 kubectl과 매우 유사합니다. Helm 클라이언트는 사용자의 로컬 kubeconfig 파일(\~/.kube/config)을 사용하여 쿠버네티스 API 서버에 대한 인증 및 연결 정보를 얻습니다. 18 이는 Helm이 별도의 인증 시스템을 필요로 하지 않으며, 사용자가 이미

kubectl을 통해 가지고 있는 권한을 그대로 활용한다는 것을 의미합니다.

결과적으로, Helm을 통해 수행할 수 있는 작업은 전적으로 사용자의 역할 기반 접근 제어(RBAC) 권한에 의해 결정됩니다. 18 사용자가 특정 네임스페이스에 리소스를 생성할 권한이 없다면, Helm을 사용해서도 해당 작업을 수행할 수 없습니다. 이로써 쿠버네티스의 네이티브 보안 모델이 Helm 작업에도 일관되게 적용됩니다.

또한, 릴리스에 대한 메타데이터(어떤 차트가 어떤 버전으로, 어떤 값으로 배포되었는지 등)는 더 이상 Tiller가 중앙에서 관리하지 않습니다. 대신, 이 정보는 해당 릴리스가 배포된 네임스페이스 내에 쿠버네티스 시크릿(Secret) 객체로 저장됩니다. 13 이 방식은 릴리스 상태 정보를 클러스터 자체에 분산하여 저장함으로써, Tiller와 같은 중앙 컴포넌트에 대한 의존성을 없애고 상태 관리의 안정성과 이식성을 높입니다.

이러한 아키텍처의 변화는 단순한 기술적 개선을 넘어섭니다. 이는 클라우드 네이티브 생태계의 철학적 변화를 반영하는 중요한 이정표입니다. Helm 2의 Tiller는 클러스터 관리자 수준의 권한을 가진 중앙 컴포넌트를 신뢰하는 '고신뢰(high-trust)' 모델이었습니다. 반면, Helm 3는 사용자의 신원을 쿠버네티스 API 서버를 통해 직접 '검증(verification)'하고, 그 권한 범위 내에서만 작업을 허용하는 '제로 트러스트(zero-trust)' 모델로 전환했습니다. 이 패러다임 전환은 Helm을 현대적인 보안 표준에 부합하게 만들었으며, 엄격한 보안 요구사항을 가진 엔터프라이즈 환경에서 Helm이 널리 채택되는 결정적인 계기가 되었습니다.

## **2장: 설치 및 초기 구성**

이 장에서는 Helm CLI를 설치하고, 차트 리포지토리를 구성하며, 설치가 올바르게 완료되었는지 확인하는 과정을 단계별로 안내합니다. 운영체제별로 다양한 설치 방법을 다루어 어떤 환경에서도 Helm을 시작할 수 있도록 돕습니다.

### **사전 요구사항: 쿠버네티스 클러스터와 kubectl**

Helm을 설치하고 사용하기 전에, 반드시 충족해야 할 두 가지 전제 조건이 있습니다.

1. **작동하는 쿠버네티스 클러스터:** 로컬 개발 환경(예: Minikube, Docker Desktop)이든, 클라우드 기반 서비스(예: GKE, EKS, AKS)든, 접근 가능한 쿠버네티스 클러스터가 필요합니다. 21 Helm은 이 클러스터에 애플리케이션을 배포하고 관리하는 도구입니다.  
2. **구성된 kubectl CLI:** 로컬 머신에 kubectl이 설치되어 있어야 하며, 대상 클러스터와 통신할 수 있도록 kubeconfig 파일이 올바르게 설정되어 있어야 합니다. 21 Helm 3는  
   kubectl과 동일한 kubeconfig 파일을 사용하여 클러스터에 연결하고 인증을 수행하므로, kubectl cluster-info와 같은 명령어가 정상적으로 작동하는지 먼저 확인해야 합니다. 18

### **Helm CLI 설치하기**

Helm은 다양한 운영체제와 환경을 지원하며, 여러 가지 방법으로 설치할 수 있습니다.

#### **Linux**

Linux 사용자는 다음 세 가지 주요 방법 중 하나를 선택할 수 있습니다.

* **바이너리 릴리스에서 설치 (권장):** 가장 직접적인 방법으로, 공식 GitHub 릴리스 페이지에서 최신 바이너리를 다운로드하여 설치합니다. 24  
  Bash  
  \# 원하는 버전의 tar.gz 파일 다운로드  
  $ wget https://get.helm.sh/helm-v3.12.0-linux-amd64.tar.gz

  \# 압축 해제  
  $ tar \-zxvf helm-v3.12.0-linux-amd64.tar.gz

  \# 실행 파일을 PATH에 포함된 디렉터리로 이동  
  $ sudo mv linux-amd64/helm /usr/local/bin/helm

  24  
* **설치 스크립트 사용:** 공식 설치 스크립트를 사용하여 최신 버전을 자동으로 다운로드하고 설치할 수 있습니다. 24  
  Bash  
  $ curl \-fsSL \-o get\_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3  
  $ chmod 700 get\_helm.sh  
  $./get\_helm.sh

* **패키지 매니저 사용:** 각 배포판의 패키지 매니저를 통해 설치할 수도 있습니다.  
  * **Debian/Ubuntu (APT):** 24  
    Bash  
    $ curl https://baltocdn.com/helm/signing.asc | gpg \--dearmor | sudo tee /usr/share/keyrings/helm.gpg \> /dev/null  
    $ sudo apt-get install apt-transport-https \--yes  
    $ echo "deb \[arch=$(dpkg \--print-architecture) signed-by=/usr/share/keyrings/helm.gpg\] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list  
    $ sudo apt-get update  
    $ sudo apt-get install helm

  * **Snap:** 24  
    Bash  
    $ sudo snap install helm \--classic

#### **macOS**

macOS에서는 Homebrew를 사용하는 것이 가장 간편하고 권장되는 방법입니다. 22

Bash

\# Homebrew가 설치되어 있지 않다면 먼저 설치  
$ /bin/bash \-c "$(curl \-fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

\# Homebrew를 사용하여 Helm 설치  
$ brew install helm

#### **Windows**

Windows 사용자는 Chocolatey나 Scoop과 같은 패키지 매니저를 사용하거나, 바이너리를 직접 다운로드하여 설치할 수 있습니다.

* **Chocolatey 사용:** 22  
  PowerShell  
  \# PowerShell을 관리자 권한으로 실행  
  PS\> choco install kubernetes\-helm

* **Scoop 사용:** 22  
  PowerShell  
  PS\> scoop install helm

* **바이너리 릴리스에서 설치:** 27  
  1. 공식 GitHub 릴리스 페이지에서 Windows용 .zip 파일을 다운로드합니다.  
  2. 원하는 위치(예: C:\\helm)에 압축을 풉니다.  
  3. helm.exe가 포함된 디렉터리(예: C:\\helm)를 시스템의 PATH 환경 변수에 추가합니다. 27

### **차트 리포지토리 구성하기**

Helm CLI를 설치한 후에는 차트를 가져올 소스, 즉 리포지토리를 구성해야 합니다.

#### **리포지토리 추가**

helm repo add 명령어를 사용하여 새로운 차트 리포지토리를 추가할 수 있습니다. 이 명령어는 리포지토리에 별칭(NAME)을 부여하고 해당 URL을 등록합니다. 가장 일반적으로 추가하는 리포지토리 중 하나는 다양한 오픈 소스 애플리케이션 차트를 제공하는 Bitnami입니다. 21

Bash

$ helm repo add bitnami https://charts.bitnami.com/bitnami  
"bitnami" has been added to your repositories

21

#### **리포지토리 업데이트**

리포지토리를 추가한 후에는 helm repo update 명령어를 실행하여 로컬 캐시를 최신 상태로 동기화해야 합니다. 이 명령어는 등록된 모든 리포지토리의 index.yaml 파일을 가져와 사용 가능한 차트와 버전 목록을 업데이트합니다. 21

Bash

$ helm repo update  
Hang tight while we grab the latest from your chart repositories...  
...Successfully got an update from the "bitnami" chart repository  
Update Complete. ⎈ Happy Helming\!⎈

#### **차트 검색**

리포지토리 구성이 완료되면 helm search 명령어를 사용하여 필요한 차트를 찾을 수 있습니다.

* helm search repo \[키워드\]: 로컬에 추가된 리포지토리 내에서 차트를 검색합니다. 이 검색은 네트워크 연결 없이 로컬 캐시를 기반으로 수행됩니다. 10  
  Bash  
  $ helm search repo mysql  
  NAME                    CHART VERSION   APP VERSION     DESCRIPTION  
  bitnami/mysql           9.10.5          8.0.32          MySQL is a fast, reliable, scalable, and easy...  
  bitnami/percona-xtradb... 1.1.5           8.0.28-20.1     Percona XtraDB Cluster is a high-availability...

* helm search hub \[키워드\]: Artifact Hub와 같은 중앙 차트 허브에서 공개된 모든 차트를 검색합니다. 이는 아직 로컬에 추가하지 않은 리포지토리의 차트도 찾을 수 있는 강력한 방법입니다. 4  
  Bash  
  $ helm search hub wordpress  
  URL                                             CHART VERSION   APP VERSION     DESCRIPTION  
  https://hub.helm.sh/charts/bitnami/wordpress    15.2.34         6.0.2           Web publishing platform for building blogs and...

...  
\`\`\`

### **설치 확인**

모든 설정이 완료되면 다음 명령어를 사용하여 Helm이 올바르게 설치되고 구성되었는지 최종적으로 확인할 수 있습니다.

* **버전 확인:** helm version 명령어는 설치된 Helm 클라이언트의 버전을 보여줍니다. 22  
  Bash  
  $ helm version  
  version.BuildInfo{Version:"v3.12.0", GitCommit:"...", GitTreeState:"clean", GoVersion:"go1.20.4"}

* **리포지토리 목록 확인:** helm repo list 명령어는 현재 구성된 모든 차트 리포지토리의 목록을 표시합니다. 23  
  Bash  
  $ helm repo list  
  NAME    URL  
  bitnami https://charts.bitnami.com/bitnami

이 단계까지 성공적으로 마쳤다면, 이제 Helm을 사용하여 쿠버네티스 클러스터에 애플리케이션을 배포할 준비가 완료된 것입니다.

## **3장: Helm 차트 구조 심층 분석**

Helm 차트는 단순한 YAML 파일의 집합이 아니라, 애플리케이션의 배포, 구성, 관리를 위한 체계적인 디렉터리 구조를 가집니다. 이 장에서는 helm create 명령어로 생성되는 표준 차트 구조를 파일 및 디렉터리별로 상세히 분석하고, 각 구성 요소의 역할과 중요성을 설명합니다.

### **차트의 해부학: 파일별 상세 분석**

helm create mychart 명령어를 실행하면 다음과 같은 표준 디렉터리 구조가 생성됩니다. 이 구조는 Helm이 차트를 이해하고 렌더링하는 데 필요한 규약입니다. 35

mychart/  
├── Chart.yaml          \# 차트 메타데이터  
├── values.yaml         \# 기본 설정 값  
├── charts/             \# 하위 차트(의존성) 디렉터리  
├── templates/          \# 템플릿 파일 디렉터리  
│   ├── NOTES.txt       \# 설치 후 안내 메시지 템플릿  
│   ├── \_helpers.tpl    \# 재사용 가능한 템플릿 헬퍼  
│   ├── deployment.yaml \# Deployment 리소스 템플릿  
│   ├── service.yaml    \# Service 리소스 템플릿  
│   └──...  
└──.helmignore         \# 패키징 시 제외할 파일 목록

### **Chart.yaml 매니페스트**

Chart.yaml 파일은 차트에 대한 핵심 메타데이터를 담고 있는 필수 파일입니다. Helm은 이 파일을 통해 차트를 식별하고 버전을 관리합니다. 1

* **핵심 필드:**  
  * apiVersion: 차트 API 버전입니다. Helm 3 이상을 사용하는 차트는 v2로 지정해야 합니다. 9  
  * name: 차트의 이름입니다. 소문자와 숫자로 구성되어야 하며, 단어는 대시(-)로 구분합니다. 40  
  * version: 차트의 버전으로, 반드시 시맨틱 버전 2.0.0(SemVer 2\) 형식을 따라야 합니다. 이 버전은 릴리스 관리와 롤백에 중요한 역할을 합니다. 38  
  * appVersion: 차트가 패키징하는 애플리케이션의 버전을 명시하는 필드입니다. 차트 버전과 애플리케이션 버전은 독립적으로 관리될 수 있습니다. 38  
* **정보성 필드 (선택 사항):**  
  * description: 차트에 대한 한 줄 설명입니다.  
  * keywords: 차트를 검색할 때 사용될 키워드 목록입니다.  
  * maintainers: 차트 유지보수 담당자의 이름과 이메일 정보입니다. 40  
* **의존성 관리:**  
  * dependencies: 이 차트가 의존하는 다른 차트(서브차트)를 선언하는 블록입니다. Helm 2의 requirements.yaml 파일을 대체하며, 이름, 버전, 리포지토리 URL을 명시하여 의존성을 관리합니다. 9

### **values.yaml 파일**

values.yaml 파일은 차트의 템플릿에서 사용될 기본 설정 값들을 정의합니다. 이 파일은 차트의 사용자 정의 가능한 모든 파라미터를 노출하는 일종의 'API' 역할을 합니다. 4

사용자는 차트를 설치하거나 업그레이드할 때 이 기본값들을 재정의할 수 있습니다. 재정의는 \-f 또는 \--values 플래그로 별도의 YAML 파일을 전달하거나, \--set 플래그를 사용하여 커맨드 라인에서 직접 특정 값을 지정하는 방식으로 이루어집니다. 10

#### **values.yaml 작성 모범 사례**

효과적인 values.yaml 파일은 차트의 재사용성과 유지보수성을 크게 향상시킵니다.

* **명명 규칙:** 변수 이름은 소문자로 시작하고, 여러 단어로 구성될 경우 카멜 케이스(camelCase)를 사용합니다. (예: replicaCount, imagePullPolicy) 대문자로 시작하는 이름은 Helm의 내장 변수(예: .Release.Name)와 충돌할 수 있으므로 피해야 합니다. 45  
* **플랫(Flat) 구조 선호:** 가능한 한 중첩(nested) 구조보다는 플랫 구조를 사용하는 것이 좋습니다. 플랫 구조는 \--set 플래그를 사용하여 값을 재정의하기 훨씬 쉽고 직관적입니다. 45  
  * **중첩 구조 (재정의가 복잡함):** \--set servers.port=8080  
    YAML  
    servers:  
      \- name: foo  
        port: 80

  * **플랫 구조 (재정의가 쉬움):** \--set servers.foo.port=8080  
    YAML  
    servers:  
      foo:  
        port: 80

* **문자열은 항상 따옴표로 감싸기:** YAML은 타입을 자동으로 변환하는 경향이 있어 예기치 않은 오류를 발생시킬 수 있습니다. 예를 들어, enabled: "false"는 문자열이지만 enabled: false는 불리언 값입니다. 모든 문자열 값을 따옴표로 감싸면 이러한 타입 변환 문제를 예방할 수 있습니다. 45  
* **모든 값에 주석 달기:** values.yaml에 정의된 모든 프로퍼티에는 해당 프로퍼티의 역할을 설명하는 주석을 추가해야 합니다. 이는 차트를 사용하는 다른 사람들에게 훌륭한 문서 역할을 합니다. 45

### **templates/ 디렉터리**

이 디렉터리는 차트의 핵심 로직이 담긴 곳으로, Go 템플릿 엔진을 통해 처리되는 파일들이 위치합니다. 7 Helm은 이 디렉터리 안의 모든 파일(밑줄

\_로 시작하는 파일 제외)을 렌더링하여 최종 쿠버네티스 매니페스트 YAML을 생성합니다. 47

### **charts/ 디렉터리**

이 디렉터리는 차트의 의존성, 즉 서브차트(subchart)를 저장하는 공간입니다. Chart.yaml의 dependencies 필드에 의존성을 선언하고 helm dependency update 명령어를 실행하면, 해당 서브차트들이 이 디렉터리로 다운로드됩니다. 수동으로 차트 파일을 이 디렉터리에 위치시켜 의존성을 관리할 수도 있습니다. 9

### **특수 파일들**

* \_helpers.tpl: 이 파일은 차트 전체에서 재사용할 수 있는 템플릿 조각이나 '명명된 템플릿(named templates)'을 정의하는 관례적인 공간입니다. 파일 이름이 밑줄(\_)로 시작하기 때문에, Helm은 이 파일을 쿠버네티스 매니페스트로 렌더링하지 않고 다른 템플릿에서 include 할 수 있는 헬퍼로 취급합니다. 35  
* NOTES.txt: helm install이 성공적으로 완료된 후 사용자에게 출력되는 메시지를 담은 템플릿 파일입니다. 배포된 애플리케이션에 접근하는 방법이나 다음 단계에 대한 유용한 정보를 제공하는 데 사용됩니다. 35  
* .helmignore: .gitignore 파일과 유사하게, helm package 명령어로 차트를 패키징할 때 포함하지 않을 파일이나 디렉터리 패턴을 지정합니다. 9

잘 정의된 차트 구조는 단순한 파일 정리를 넘어, 차트 제작자와 사용자 간의 명확한 계약(contract) 역할을 합니다. values.yaml 파일은 사용자가 상호작용할 수 있는 공개 API를 정의하며, templates/ 디렉터리는 그 API를 구현하는 내부 로직에 해당합니다. 사용자는 템플릿의 복잡한 내부를 알 필요 없이, 잘 문서화된 values.yaml이라는 API를 통해 애플리케이션의 동작을 제어할 수 있습니다. 이러한 관점은 더 나은 차트 설계를 유도하고, CI/CD 파이프라인과의 통합을 용이하게 하며, 버전 간의 예측 가능한 동작을 보장합니다.

## **4장: Helm 템플릿 엔진 마스터하기**

Helm의 진정한 힘은 Go 템플릿 언어를 기반으로 한 강력한 템플릿 엔진에서 나옵니다. 이 엔진을 통해 정적인 YAML 파일이 동적이고 재사용 가능한 쿠버네티스 매니페스트로 변환됩니다. 이 장에서는 템플릿의 기본 문법부터 시작하여, Helm이 제공하는 내장 객체, 제어 구조, 그리고 복잡한 로직을 구현하기 위한 고급 함수까지 심도 있게 다룹니다.

### **Go 템플릿의 기초**

* **문법:** Helm 템플릿의 모든 동적 요소는 이중 중괄호 {{ }}로 감싸인 '액션(action)' 내에 정의됩니다. 7 이 안에는 변수, 함수 호출, 제어문 등이 위치합니다.  
* **파이프라인:** 유닉스 셸의 파이프(|) 개념과 유사하게, Helm 템플릿은 파이프라인을 지원합니다. 이를 통해 한 함수의 출력을 다음 함수의 입력으로 전달하여 여러 변환 작업을 간결하게 연결할 수 있습니다. 58  
  YAML  
  \#.Values.message 값을 대문자로 변환한 후, 따옴표로 감쌉니다.  
  message: {{.Values.message | upper | quote }}

### **Helm의 내장 객체 활용하기**

Helm은 템플릿 내에서 사용할 수 있는 여러 유용한 내장 객체를 최상위 스코프에 제공합니다. 이 객체들은 릴리스 정보, 설정 값, 클러스터 정보 등에 대한 접근을 가능하게 합니다.

| 객체 이름 | 설명 및 주요 속성 |  |
| :---- | :---- | :---- |
| .Release | 현재 릴리스에 대한 정보를 포함합니다. 9 | \- .Name: 릴리스의 이름. \- .Namespace: 릴리스가 배포될 네임스페이스. \- .IsInstall: 현재 작업이 설치인 경우 true. \- .IsUpgrade: 현재 작업이 업그레이드인 경우 true. \- .Revision: 릴리스의 리비전 번호. |
| .Values | values.yaml 파일 및 사용자 재정의 값에 접근하는 기본 객체입니다. 35 | \- 예: {{.Values.replicaCount }} |
| .Chart | Chart.yaml 파일의 내용을 담고 있습니다. 9 | \- .Name: 차트의 이름. \- .Version: 차트의 버전. \- .AppVersion: 애플리케이션의 버전. |
| .Capabilities | 쿠버네티스 클러스터의 기능 정보를 제공합니다. 9 | \- .KubeVersion.Version: 쿠버네티스 버전. \- .APIVersions.Has "batch/v1": 특정 API 버전의 지원 여부 확인. |
| .Files | 차트 내의 템플릿이 아닌 파일에 접근할 수 있게 해줍니다. 9 | \- .Get "config.toml": 이름으로 파일 내용 가져오기. \- .GetBytes "image.png": 파일 내용을 바이트 배열로 가져오기. |

### **제어 구조를 통한 동적 매니페스트**

Helm 템플릿은 프로그래밍 언어와 유사한 제어 구조를 제공하여 복잡한 로직을 구현할 수 있습니다.

* **if/else:** 조건에 따라 특정 템플릿 블록을 렌더링합니다. 조건은 불리언 값, 값의 존재 여부, 또는 비교 함수의 결과일 수 있습니다. 60  
  YAML  
  {{\- if.Values.ingress.enabled }}  
  apiVersion: networking.k8s.io/v1  
  kind: Ingress

...  
{{- end }}  
\`\`\`

* **with:** 현재 스코프(.)를 특정 객체로 변경하여 템플릿을 간결하게 만듭니다. with 블록 내에서는 변경된 스코프의 속성에 바로 접근할 수 있습니다. 60  
  YAML  
  {{\- with.Values.ingress }}  
  annotations:  
    kubernetes.io/ingress.class: {{.className }}  
  {{\- end }}

* **range:** 리스트나 맵을 순회하며 반복적으로 템플릿 블록을 렌더링합니다. 동적으로 여러 개의 컨테이너, 볼륨, 또는 환경 변수를 생성하는 데 유용합니다. 60  
  YAML  
  ports:  
  {{\- range.Values.service.ports }}  
  \- name: {{.name }}  
    port: {{.port }}  
    targetPort: {{.targetPort }}  
  {{\- end }}

### **재사용 가능한 코드 작성: 명명된 템플릿과 \_helpers.tpl**

* **define과 include:** {{- define "mychart.labels" \-}} 구문을 사용하여 재사용 가능한 템플릿 조각을 '명명된 템플릿'으로 정의할 수 있습니다. 이렇게 정의된 템플릿은 {{- include "mychart.labels". | nindent 4 }}와 같이 include 함수를 사용하여 다른 곳에서 호출할 수 있습니다. 48  
* **\_helpers.tpl:** 관례적으로 이러한 명명된 템플릿들은 templates/\_helpers.tpl 파일에 모아둡니다. 파일 이름이 밑줄로 시작하므로 쿠버네티스 매니페스트로 렌더링되지 않으며, 차트 전체에서 공통으로 사용할 수 있는 라이브러리 역할을 합니다. 35  
* **네임스페이스:** 명명된 템플릿은 전역적으로 접근 가능하므로, 서브차트와의 이름 충돌을 피하기 위해 {{- define "차트이름.헬퍼이름" \-}}과 같이 차트 이름으로 네임스페이스를 지정하는 것이 모범 사례입니다. 48

### **복잡한 로직을 위한 고급 템플릿 함수**

Helm은 Go 템플릿의 기본 함수 외에도 Sprig 라이브러리의 다양한 함수와 자체적인 고급 함수를 제공합니다.

* **lookup:** 템플릿 렌더링 시점에 실행 중인 쿠버네티스 클러스터에 API 요청을 보내 특정 리소스의 정보를 조회하는 강력한 함수입니다. 이를 통해 "만약 특정 시크릿이 존재하지 않으면 새로 생성하라"와 같은 상태 기반의 동적 로직을 구현할 수 있습니다. 58  
  YAML  
  {{\- $secret := lookup "v1" "Secret".Release.Namespace "my-secret" }}  
  {{\- if not $secret }}  
  apiVersion: v1  
  kind: Secret

...  
{{- end }}  
\`\`\`

* **tpl:** 문자열을 템플릿으로 다시 렌더링하는 함수입니다. values.yaml 파일에 다른 값을 참조하는 템플릿 문자열을 값으로 넣고, 이를 실제 템플릿 파일에서 렌더링할 때 매우 유용합니다. 66  
  * values.yaml:  
    YAML  
    configTemplate: "The release name is {{.Release.Name }}"

  * configmap.yaml:  
    YAML  
    data:  
      message: {{ tpl.Values.configTemplate. | quote }}

* **required:** 특정 값이 반드시 사용자에 의해 제공되어야 함을 강제하는 함수입니다. 만약 해당 값이 비어 있으면, 지정된 오류 메시지와 함께 템플릿 렌더링이 실패합니다. 이는 필수 설정 누락으로 인한 배포 실패를 사전에 방지하는 데 도움이 됩니다. 67  
  YAML  
  password: {{ required "A database password is required\!".Values.database.password | quote }}

이러한 템플릿 기능들을 조합하면, 단순한 변수 치환을 넘어 환경에 따라 동적으로 구조가 변하고, 클러스터의 상태에 반응하며, 재사용성이 높은 정교한 차트를 작성할 수 있습니다.

## **5장: Helm 명령어를 활용한 애플리케이션 라이프사이클 관리**

이 장에서는 Helm CLI를 사용하여 애플리케이션의 전체 라이프사이클을 관리하는 데 필요한 핵심 명령어들을 상세히 다룹니다. 각 명령어에 대한 설명, 옵션, 그리고 실제 사용 사례를 통해 차트를 검색하고, 배포하며, 업데이트하고, 문제가 발생했을 때 복구하는 과정을 실습 중심으로 안내합니다.

### **차트 검색 및 검사**

애플리케이션을 배포하기 전에, 원하는 차트를 찾고 그 내용을 검토하는 과정이 필요합니다.

* helm search repo/hub: 사용 가능한 차트를 검색합니다. repo는 로컬에 추가된 리포지토리를, hub는 Artifact Hub를 검색합니다. 10  
  Bash  
  \# Bitnami 리포지토리에서 'redis' 검색  
  $ helm search repo bitnami/redis

  \# Artifact Hub에서 'prometheus' 검색  
  $ helm search hub prometheus

* helm show all|chart|values|readme: 차트를 설치하지 않고 그 내용을 상세히 살펴봅니다. 68  
  * chart: Chart.yaml 파일의 내용을 표시합니다.  
  * values: values.yaml 파일의 기본 설정 값을 표시합니다.  
  * readme: 차트의 README.md 파일을 표시합니다.  
  * all: 위의 모든 정보를 한 번에 출력합니다.

Bash  
\# Bitnami Nginx 차트의 기본 설정 값 확인  
$ helm show values bitnami/nginx

* helm pull: 차트 패키지(.tgz 파일)를 리포지토리에서 로컬 디렉터리로 다운로드합니다. 9  
  Bash  
  \# Bitnami Nginx 차트 다운로드  
  $ helm pull bitnami/nginx \--version 15.0.0

### **애플리케이션 배포**

차트 준비가 완료되면 helm install 명령어를 사용하여 클러스터에 새로운 릴리스를 배포합니다.

* helm install \[릴리스\_이름\]\[차트\]: 새로운 릴리스를 생성하는 기본 명령어입니다. 릴리스 이름은 클러스터 내에서 해당 배포를 식별하는 고유한 이름이 됩니다. 3  
  Bash  
  \# 'my-nginx'라는 이름으로 Bitnami Nginx 차트 설치  
  $ helm install my-nginx bitnami/nginx

* **고급 값 재정의:** 배포 시 설정을 커스터마이징하는 것은 Helm의 핵심 기능입니다.  
  * \-f 또는 \--values: 사용자 정의 values.yaml 파일을 사용하여 기본값을 재정의합니다. 여러 파일을 지정할 경우, 나중에 지정된 파일이 우선순위를 가집니다. 10  
    Bash  
    $ helm install my-nginx bitnami/nginx \-f production-values.yaml

  * \--set: 커맨드 라인에서 직접 특정 값을 설정합니다. 점(.)을 사용하여 중첩된 값에 접근할 수 있습니다. 10  
    Bash  
    $ helm install my-nginx bitnami/nginx \--set replicaCount=3 \--set service.type=LoadBalancer

  * \--set-string, \--set-file: 값을 문자열로 강제하거나, 파일의 내용을 값으로 설정할 때 사용합니다. 72

### **원활한 업데이트 및 복구**

배포된 애플리케이션은 지속적으로 변경됩니다. Helm은 이러한 변경 사항을 안전하게 적용하고, 필요시 이전 상태로 되돌릴 수 있는 강력한 기능을 제공합니다.

* helm upgrade \[릴리스\_이름\]\[차트\]: 기존 릴리스를 새로운 버전의 차트나 새로운 설정 값으로 업그레이드합니다. install과 동일한 값 재정의 플래그를 사용할 수 있습니다. 68  
  * \--install (또는 \-i): 릴리스가 존재하지 않으면 새로 설치하고, 존재하면 업그레이드합니다. CI/CD 파이프라인에서 멱등성(idempotency)을 보장하는 데 매우 유용합니다.  
  * \--reuse-values: 이전 릴리스의 값을 그대로 사용하면서 \--set이나 \-f로 지정된 값만 병합하여 변경합니다. 73  
  * \--atomic: 업그레이드가 실패할 경우, 변경 사항을 자동으로 롤백하여 릴리스를 이전의 성공적인 상태로 되돌립니다. 72

Bash  
\# my-nginx 릴리스의 이미지 태그를 변경하여 업그레이드  
$ helm upgrade my-nginx bitnami/nginx \--set image.tag=1.23.4

* helm rollback \[릴리스\_이름\]\[리비전\]: 릴리스를 지정된 리비전(버전)으로 되돌립니다. 리비전을 지정하지 않으면 바로 이전 버전으로 롤백됩니다. 이는 배포 실패 시 신속한 복구를 위한 핵심 기능입니다. 3  
  Bash  
  \# my-nginx 릴리스의 리비전 1로 롤백  
  $ helm rollback my-nginx 1

### **릴리스 관찰 및 감사**

배포된 릴리스의 상태를 확인하고 변경 이력을 추적하는 것은 운영의 필수 요소입니다.

* helm status \[릴리스\_이름\]: 특정 릴리스의 현재 상태, 배포된 리소스 목록, 그리고 NOTES.txt의 내용을 보여줍니다. 3  
  Bash  
  $ helm status my-nginx

* helm list (또는 helm ls): 배포된 모든 릴리스의 목록을 보여줍니다. \-A 또는 \--all-namespaces 플래그를 사용하면 모든 네임스페이스의 릴리스를 볼 수 있습니다. 68  
  Bash  
  \# 모든 네임스페이스의 릴리스 목록 확인  
  $ helm list \-A

* helm history \[릴리스\_이름\]: 특정 릴리스의 모든 리비전 이력을 보여줍니다. 언제, 어떤 변경 사항으로 업그레이드되었고, 롤백이 발생했는지 등을 추적할 수 있습니다. 68  
  Bash  
  $ helm history my-nginx

### **차트 의존성 관리**

복잡한 애플리케이션은 여러 개의 차트로 구성될 수 있습니다.

* helm dependency update: Chart.yaml 파일의 dependencies 섹션에 명시된 모든 서브차트를 다운로드하여 charts/ 디렉터리에 저장합니다. 41  
  Bash  
  \# 현재 디렉터리 차트의 의존성 업데이트  
  $ helm dependency update.

* helm dependency build: Chart.lock 파일을 기반으로 charts/ 디렉터리를 재구성하여, 정확히 동일한 버전의 의존성을 사용하여 빌드의 재현성을 보장합니다. 41

## **6장: 프로덕션 환경을 위한 고급 Helm 기법**

프로덕션 환경에서는 단순한 배포를 넘어 자동화된 운영, 철저한 품질 관리, 그리고 강력한 보안이 요구됩니다. 이 장에서는 Helm의 고급 기능인 라이프사이클 훅, 차트 테스트, 보안 모범 사례를 다루어 안정적이고 신뢰할 수 있는 프로덕션급 배포를 구현하는 방법을 알아봅니다.

### **라이프사이클 훅을 이용한 운영 작업 자동화**

\*\*라이프사이클 훅(Lifecycle Hooks)\*\*은 릴리스의 생명주기 중 특정 시점(예: 설치 전, 업그레이드 후)에 특정 작업을 실행할 수 있게 해주는 강력한 메커니즘입니다. 훅은 helm.sh/hook 어노테이션이 추가된 일반적인 쿠버네티스 매니페스트(주로 Job 또는 Pod)입니다. 3

* **주요 훅과 사용 사례:**  
  * pre-install: 차트의 리소스가 생성되기 전에 실행됩니다. 애플리케이션에 필요한 데이터베이스 스키마를 초기화하거나, 필요한 시크릿을 미리 생성하는 데 사용됩니다. 17  
  * post-install: 모든 차트 리소스가 클러스터에 로드된 후 실행됩니다. 배포 후 애플리케이션이 정상적으로 작동하는지 확인하는 스모크 테스트(smoke test)를 실행하는 데 이상적입니다. 17  
  * pre-upgrade: 릴리스가 업그레이드되기 전에 실행됩니다. 데이터 손실을 방지하기 위해 데이터베이스 백업 Job을 실행하는 것이 대표적인 사용 사례입니다. 85  
  * post-upgrade: 모든 리소스가 업그레이드된 후 실행됩니다. 업그레이드된 버전이 정상 작동하는지 확인하는 작업을 수행할 수 있습니다.  
  * pre-delete: 릴리스의 리소스가 삭제되기 전에 실행됩니다. 외부 시스템과의 연결을 정상적으로 종료하거나, 영구 볼륨의 데이터를 안전하게 백업하는 데 사용됩니다. 17  
* **훅 관리 어노테이션:**  
  * helm.sh/hook-weight: 여러 훅이 동일한 시점에 실행될 때, 가중치(weight)를 지정하여 실행 순서를 제어합니다. 숫자가 낮을수록 먼저 실행됩니다. 89  
  * helm.sh/hook-delete-policy: 훅이 실행된 후 훅 리소스 자체를 언제 삭제할지 결정합니다. hook-succeeded(성공 시 삭제), hook-failed(실패 시 삭제), before-hook-creation(다음 훅 실행 전 이전 훅 삭제, 기본값) 등의 정책이 있습니다. 89

이러한 훅과 테스트는 단순한 스크립트를 넘어, 운영 절차를 선언적으로 코드화하여 배포 패키지 내에 포함시키는 방법입니다. 이는 차트를 단순한 설정 템플릿에서 자가 관리 능력을 갖춘 애플리케이션 번들로 격상시킵니다. 예를 들어, 데이터베이스 마이그레이션을 위한 pre-upgrade 훅은 "이 릴리스를 업그레이드하기 전에 반드시 이 마이그레이션이 성공해야 한다"는 운영 규칙을 코드화한 것입니다. 이러한 패턴은 수동 오류를 줄이고, 일관성을 보장하며, 애플리케이션의 운영 요구사항을 명시적이고 자동화된 방식으로 관리할 수 있게 해주는 진정한 GitOps의 핵심 요소입니다.

### **차트 품질 보증: 유효성 검사 및 테스트**

안정적인 배포를 위해서는 차트의 품질을 지속적으로 검증해야 합니다.

* helm lint: 차트가 Helm의 모범 사례를 준수하는지, YAML 구문이 올바른지 등을 정적으로 분석하는 도구입니다. CI 파이프라인의 초기 단계에 통합하여 기본적인 오류를 빠르게 잡아낼 수 있습니다. 68  
* helm template \--debug 및 helm install \--dry-run: 템플릿 렌더링 과정에서 발생하는 오류를 디버깅하고, 최종적으로 생성될 쿠버네티스 매니페스트를 확인하는 필수적인 도구입니다. \--dry-run은 실제로 클러스터에 리소스를 배포하지 않고 시뮬레이션만 수행하므로, 배포 전에 설정 값이 올바르게 적용되었는지 안전하게 검증할 수 있습니다. 19  
* helm test: 배포 후 애플리케이션의 기능적 정확성을 검증하기 위한 테스트를 실행합니다. 테스트는 helm.sh/hook: test 어노테이션이 달린 Job 또는 Pod 리소스로 작성됩니다. 96 이 테스트 컨테이너는 배포된 서비스의 엔드포인트에 연결을 시도하거나, 데이터베이스에 쿼리를 실행하는 등 실제 애플리케이션의 동작을 검증하고, 성공적으로 완료되면 종료 코드 0을 반환해야 합니다. 96  
  Bash  
  \# 'my-release'에 대해 정의된 테스트 실행  
  $ helm test my-release

### **보안 모범 사례**

프로덕션 환경에서는 보안이 최우선 과제입니다. Helm 차트 개발 시 다음 보안 관행을 적용해야 합니다.

* **시크릿 관리:** 데이터베이스 암호, API 키와 같은 민감한 정보는 values.yaml 파일이나 Git 리포지토리에 절대 평문으로 저장해서는 안 됩니다. 쿠버네티스 시크릿을 사용할 수 있지만, 더 나은 방법은 HashiCorp Vault와 같은 외부 시크릿 관리 도구와 통합하는 것입니다. Vault Agent Injector나 External Secrets Operator와 같은 도구를 사용하면, 런타임에 파드에 시크릿을 동적으로 주입하여 코드베이스에서 민감한 정보를 완전히 분리할 수 있습니다. 98  
* **NetworkPolicy 구현:** 차트에 NetworkPolicy 리소스를 포함하여 파드 간의 네트워크 트래픽을 제어해야 합니다. "기본적으로 모든 것을 거부(default deny)"하는 정책을 설정하고, 애플리케이션 작동에 필요한 최소한의 통신만 명시적으로 허용하는 것이 좋습니다. 이를 통해 네트워크 분리를 강화하고 공격 표면을 줄일 수 있습니다. 102  
* **PodSecurityContext 및 SecurityContext 적용:** 파드와 컨테이너 수준에서 보안 설정을 강화해야 합니다. securityContext를 사용하여 다음을 강제할 수 있습니다.  
  * **루트가 아닌 사용자로 실행 (runAsNonRoot: true):** 컨테이너 내부에서 루트 권한을 박탈하여 권한 상승 공격을 방지합니다.  
  * **읽기 전용 루트 파일시스템 (readOnlyRootFilesystem: true):** 컨테이너의 파일시스템 변경을 막아 악성 코드의 지속성을 방지합니다.  
  * 불필요한 권한 제거 (capabilities: { drop: \["ALL"\] }): 컨테이너에 필요한 최소한의 리눅스 커널 권한만 부여합니다.  
    이러한 설정은 쿠버네티스의 Pod Security Standards(PSS)의 Baseline 또는 Restricted 프로파일을 준수하는 데 도움이 됩니다. 105

## **7장: Helm을 CI/CD 파이프라인에 통합하기**

Helm의 진정한 가치는 CI/CD(지속적 통합/지속적 배포) 파이프라인에 통합될 때 발휘됩니다. 이 장에서는 Helm을 사용하여 개발부터 프로덕션까지 애플리케이션 배포를 자동화하는 전략과 구체적인 파이프라인 예제를 살펴봅니다.

### **환경 프로모션 전략**

성숙한 DevOps 환경에서는 동일한 애플리케이션 아티팩트(Docker 이미지와 Helm 차트)를 여러 환경(예: 개발, 스테이징, 프로덕션)에 걸쳐 순차적으로 배포하고 검증하는 '프로모션' 전략을 사용합니다. 107

* **개념:** 이 전략의 핵심은 코드나 애플리케이션 로직의 변경 없이, 오직 환경별 설정 값만 변경하여 배포하는 것입니다. 이를 통해 환경 간의 일관성을 유지하고, 프로덕션 배포의 신뢰도를 높일 수 있습니다. 2  
* **구현:** Helm은 이 전략을 매우 효과적으로 지원합니다. 기본 차트와 values.yaml 파일은 그대로 유지하면서, 각 환경에 특화된 설정 값을 담은 별도의 values 파일을 관리합니다(예: values-dev.yaml, values-staging.yaml, values-prod.yaml). 7 CI/CD 파이프라인은 대상 환경에 맞는  
  values 파일을 helm upgrade \--install \-f 명령에 전달하여 동일한 차트를 다른 설정으로 배포합니다.

### **GitHub Actions를 이용한 배포 자동화**

GitHub Actions는 GitHub 네이티브 CI/CD 솔루션으로, Helm 배포를 자동화하는 데 널리 사용됩니다. 다음은 일반적인 배포 워크플로우 예제입니다. 110

* **.github/workflows/deploy.yml 예제:**  
  YAML  
  name: Deploy to Kubernetes

  on:  
    push:  
      branches:  
        \- main

  jobs:  
    deploy:  
      runs-on: ubuntu-latest  
      steps:  
        \- name: Checkout code  
          uses: actions/checkout@v3

        \- name: Configure AWS credentials  
          uses: aws-actions/configure-aws-credentials@v2  
          with:  
            aws-access-key-id: ${{ secrets.AWS\_ACCESS\_KEY\_ID }}  
            aws-secret-access-key: ${{ secrets.AWS\_SECRET\_ACCESS\_KEY }}  
            aws-region: ap-northeast-2

        \- name: Login to Amazon ECR  
          id: login-ecr  
          uses: aws-actions/amazon-ecr-login@v1

        \- name: Build, tag, and push image to Amazon ECR  
          env:  
            ECR\_REGISTRY: ${{ steps.login-ecr.outputs.registry }}  
            ECR\_REPOSITORY: my-app  
            IMAGE\_TAG: ${{ github.sha }}  
          run: |  
            docker build \-t $ECR\_REGISTRY/$ECR\_REPOSITORY:$IMAGE\_TAG.  
            docker push $ECR\_REGISTRY/$ECR\_REPOSITORY:$IMAGE\_TAG

        \- name: Set up Kubeconfig  
          run: aws eks update-kubeconfig \--name my-cluster \--region ap-northeast-2

        \- name: Deploy with Helm  
          run: |  
            helm upgrade \--install my-release./charts/my-app \\  
              \--namespace my-namespace \\  
              \--set image.repository=${{ steps.login-ecr.outputs.registry }}/my-app \\  
              \--set image.tag=${{ github.sha }} \\  
              \--wait

  이 워크플로우는 main 브랜치에 푸시가 발생하면 트리거됩니다. 코드를 체크아웃하고, Docker 이미지를 빌드하여 ECR에 푸시한 다음, helm upgrade \--install 명령어를 사용하여 쿠버네티스 클러스터에 애플리케이션을 배포합니다. 클러스터 접근 정보와 같은 민감한 데이터는 GitHub Actions Secrets를 통해 안전하게 관리됩니다.

### **GitLab CI를 이용한 동적 환경 구축**

GitLab CI는 '리뷰 앱(Review Apps)'이라는 강력한 기능을 통해 동적 환경 생성을 지원합니다. 이는 모든 머지 리퀘스트(Merge Request)에 대해 격리된 임시 환경을 자동으로 생성하여, 변경 사항을 프로덕션에 병합하기 전에 실제와 유사한 환경에서 테스트할 수 있게 해줍니다. 112

* **.gitlab-ci.yml 예제:**  
  YAML  
  stages:  
    \- deploy\_review  
    \- stop\_review

  deploy\_review:  
    stage: deploy\_review  
    image:  
      name: alpine/helm:latest  
      entrypoint: \[""\]  
    script:  
      \- helm upgrade \--install "review-${CI\_COMMIT\_REF\_SLUG}"./my-chart \\  
        \--namespace "review-${CI\_COMMIT\_REF\_SLUG}" \\  
        \--create-namespace \\  
        \--set ingress.host="review-${CI\_COMMIT\_REF\_SLUG}.example.com"  
    environment:  
      name: review/${CI\_COMMIT\_REF\_SLUG}  
      url: https://review-${CI\_COMMIT\_REF\_SLUG}.example.com  
      on\_stop: stop\_review  
    rules:  
      \- if: $CI\_MERGE\_REQUEST\_ID

  stop\_review:  
    stage: stop\_review  
    image:  
      name: alpine/helm:latest  
      entrypoint: \[""\]  
    script:  
      \- helm uninstall "review-${CI\_COMMIT\_REF\_SLUG}" \--namespace "review-${CI\_COMMIT\_REF\_SLUG}"  
    environment:  
      name: review/${CI\_COMMIT\_REF\_SLUG}  
      action: stop  
    rules:  
      \- if: $CI\_MERGE\_REQUEST\_ID  
        when: manual

  이 파이프라인은 머지 리퀘스트가 생성될 때마다 review- 접두사와 브랜치 이름을 조합하여 고유한 릴리스 이름과 네임스페이스를 생성하고, Helm을 사용하여 해당 환경에 애플리케이션을 배포합니다. 머지 리퀘스트가 닫히면 stop\_review 잡을 통해 해당 환경과 관련된 모든 리소스가 자동으로 정리됩니다. GitLab Kubernetes Agent는 CI/CD 잡에서 클러스터로 안전하게 연결하는 권장 방법입니다. 114

### **Jenkins를 이용한 릴리스 오케스트레이션**

Jenkins는 오랫동안 CI/CD 분야의 표준 도구로 사용되어 왔으며, 선언적 파이프라인(Declarative Pipeline)을 통해 Helm 배포를 효과적으로 오케스트레이션할 수 있습니다. 115

* **Jenkinsfile 예제:**  
  Groovy  
  pipeline {  
      agent {  
          kubernetes {  
              yaml '''  
              apiVersion: v1  
              kind: Pod  
              spec:  
                containers:  
                \- name: helm  
                  image: alpine/helm:latest  
                  command:  
                  \- cat  
                  tty: true  
                \- name: docker  
                  image: docker:20.10.17  
                  command:  
                  \- cat  
                  tty: true  
                  volumeMounts:  
                  \- mountPath: /var/run/docker.sock  
                    name: docker-sock  
              volumes:  
              \- name: docker-sock  
                hostPath:  
                  path: /var/run/docker.sock  
              '''  
          }  
      }  
      environment {  
          DOCKER\_REGISTRY\_CREDENTIALS \= credentials('dockerhub-credentials')  
      }  
      stages {  
          stage('Checkout') {  
              steps {  
                  git 'https://github.com/my-org/my-app.git'  
              }  
          }  
          stage('Build and Push Image') {  
              steps {  
                  container('docker') {  
                      sh 'docker build \-t my-org/my-app:${BUILD\_NUMBER}.'  
                      sh 'echo $DOCKER\_REGISTRY\_CREDENTIALS\_PSW | docker login \-u $DOCKER\_REGISTRY\_CREDENTIALS\_USR \--password-stdin'  
                      sh 'docker push my-org/my-app:${BUILD\_NUMBER}'  
                  }  
              }  
          }  
          stage('Deploy to Staging') {  
              steps {  
                  container('helm') {  
                      withKubeConfig(\[credentialsId: 'kubeconfig-staging'\]) {  
                          sh '''  
                          helm upgrade \--install my-app-staging./charts/my-app \\  
                            \--namespace staging \\  
                            \--set image.tag=${BUILD\_NUMBER} \\  
                            \-f./charts/my-app/values-staging.yaml  
                          '''  
                      }  
                  }  
              }  
          }  
      }  
  }

  이 Jenkinsfile은 쿠버네티스 플러그인을 사용하여 동적으로 파이프라인 에이전트 파드를 생성합니다. 각 단계는 별도의 컨테이너에서 실행되며, Jenkins Credentials Store를 통해 Docker 레지스트리 및 쿠버네티스 클러스터 자격 증명을 안전하게 관리합니다. 116

## **결론: Helm과 클라우드 네이티브 패키지 관리의 미래**

이 가이드를 통해 Helm의 기본 개념부터 프로덕션 환경에서 사용되는 고급 기법까지, 쿠버네티스 애플리케이션 관리를 위한 포괄적인 여정을 살펴보았습니다. Helm은 복잡한 YAML 매니페스트의 수동 관리가 야기하는 어려움을 해결하고, 애플리케이션 배포에 **단순성, 재사용성, 관리 용이성**이라는 핵심 가치를 제공함으로써 쿠버네티스 생태계의 필수적인 도구로 자리매김했습니다.

차트라는 표준화된 패키징 형식은 애플리케이션의 정의와 설정을 코드화하여 버전 관리와 협업을 용이하게 합니다. 릴리스라는 개념을 통해 배포된 애플리케이션의 라이프사이클을 명확하게 추적하고, 강력한 롤백 기능으로 운영 안정성을 보장합니다. 또한, Tiller를 제거한 Helm 3의 현대적인 아키텍처는 쿠버네티스의 네이티브 보안 모델과 완벽하게 통합되어 엔터프라이즈 환경의 요구사항을 충족시킵니다.

최근 클라우드 네이티브 패러다임은 선언적 구성을 기반으로 한 **GitOps**로 빠르게 진화하고 있습니다. ArgoCD나 Flux와 같은 GitOps 도구들은 Git 리포지토리를 단일 진실 공급원(Single Source of Truth)으로 삼아 클러스터의 상태를 지속적으로 동기화합니다. 15 이러한 흐름 속에서 Helm의 역할은 더욱 중요해지고 있습니다. GitOps 도구들은 종종 애플리케이션을 정의하고 템플릿화하는 핵심 엔진으로 Helm을 활용합니다. 즉, Git 리포지토리에는 Helm 차트와 환경별

values 파일이 저장되고, GitOps 컨트롤러가 이를 가져와 클러스터에 적용하는 방식입니다. 이는 Helm이 제공하는 패키징 및 템플릿화의 강점과 GitOps의 선언적이고 자동화된 워크플로우가 결합된 강력한 시너지 효과를 창출합니다.

결론적으로, Helm은 단순히 애플리케이션을 설치하는 도구를 넘어, 클라우드 네이티브 애플리케이션의 **정의, 공유, 관리**에 대한 표준을 제시합니다. 앞으로도 마이크로서비스 아키텍처가 더욱 복잡해지고, 다양한 환경에 걸친 배포 자동화의 중요성이 커짐에 따라, Helm과 같은 표준화된 패키지 관리 및 라이프사이클 관리 솔루션은 클라우드 네이티브 개발의 성숙과 성장을 이끄는 핵심 동력으로 계속해서 그 역할을 다할 것입니다.

#### **참고 자료**

1. What is Helm? \- Red Hat, 8월 27, 2025에 액세스, [https://www.redhat.com/en/topics/devops/what-is-helm](https://www.redhat.com/en/topics/devops/what-is-helm)  
2. The Benefits of using Helm\!. Helm also known as the package manager… | by BuildPiper \- Medium, 8월 27, 2025에 액세스, [https://medium.com/buildpiper/the-benefits-of-using-helm-ad2755118a4e](https://medium.com/buildpiper/the-benefits-of-using-helm-ad2755118a4e)  
3. Kubernetes Helm: The Basics and a Quick Tutorial \- Codefresh, 8월 27, 2025에 액세스, [https://codefresh.io/learn/kubernetes-management/kubernetes-helm/](https://codefresh.io/learn/kubernetes-management/kubernetes-helm/)  
4. Helm Concept \- KodeKloud Notes, 8월 27, 2025에 액세스, [https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Helm-Fundamentals/Helm-Concept](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Helm-Fundamentals/Helm-Concept)  
5. What is the advantage of using helm charts in Kubernetes? \- General Discussions, 8월 27, 2025에 액세스, [https://discuss.kubernetes.io/t/what-is-the-advantage-of-using-helm-charts-in-kubernetes/6885](https://discuss.kubernetes.io/t/what-is-the-advantage-of-using-helm-charts-in-kubernetes/6885)  
6. Helm, 8월 27, 2025에 액세스, [https://helm.sh/](https://helm.sh/)  
7. What Is Kubernetes Helm? Architecture, Quick Start, and Best Practices \- Komodor, 8월 27, 2025에 액세스, [https://komodor.com/learn/kubernetes-helm/](https://komodor.com/learn/kubernetes-helm/)  
8. What Is Helm in Kubernetes? \- LogicMonitor, 8월 27, 2025에 액세스, [https://www.logicmonitor.com/blog/what-is-helm-in-kubernetes](https://www.logicmonitor.com/blog/what-is-helm-in-kubernetes)  
9. Charts \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/topics/charts/](https://helm.sh/docs/topics/charts/)  
10. Using Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/intro/using\_helm/](https://helm.sh/docs/intro/using_helm/)  
11. What is Helm? A complete guide \- CircleCI, 8월 27, 2025에 액세스, [https://circleci.com/blog/what-is-helm/](https://circleci.com/blog/what-is-helm/)  
12. What are Helm charts? \- DEV Community, 8월 27, 2025에 액세스, [https://dev.to/amaraiheanacho/what-are-helm-charts-4ck3](https://dev.to/amaraiheanacho/what-are-helm-charts-4ck3)  
13. Helm Components (Charts, Release, Repositories, & More) \- KodeKloud, 8월 27, 2025에 액세스, [https://kodekloud.com/blog/helm-architecture/](https://kodekloud.com/blog/helm-architecture/)  
14. helm.sh, 8월 27, 2025에 액세스, [https://helm.sh/docs/topics/chart\_repository/\#:\~:text=At%20a%20high%20level%2C%20a,run%20your%20own%20chart%20repository.](https://helm.sh/docs/topics/chart_repository/#:~:text=At%20a%20high%20level%2C%20a,run%20your%20own%20chart%20repository.)  
15. What is a helm repo? \- Virtana, 8월 27, 2025에 액세스, [https://www.virtana.com/glossary/what-is-a-helm-repo/](https://www.virtana.com/glossary/what-is-a-helm-repo/)  
16. The Chart Repository Guide \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/topics/chart\_repository/](https://helm.sh/docs/topics/chart_repository/)  
17. Hooks \- Helm v2, 8월 27, 2025에 액세스, [https://v2.helm.sh/docs/charts\_hooks/](https://v2.helm.sh/docs/charts_hooks/)  
18. Helm 3: what are the fundamental commands to know? | Padok \- Theodo Cloud, 8월 27, 2025에 액세스, [https://cloud.theodo.com/en/blog/helm-3-commands](https://cloud.theodo.com/en/blog/helm-3-commands)  
19. What is Helm in Kubernetes? A complete guide \- Glasskube, 8월 27, 2025에 액세스, [https://glasskube.dev/blog/what-is-helm-in-kubernetes/](https://glasskube.dev/blog/what-is-helm-in-kubernetes/)  
20. Kubernetes Distribution Guide \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/topics/kubernetes\_distros/](https://helm.sh/docs/topics/kubernetes_distros/)  
21. Quickstart Guide \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/intro/quickstart/](https://helm.sh/docs/intro/quickstart/)  
22. Installing Helm \- DEV Community, 8월 27, 2025에 액세스, [https://dev.to/idsulik/installing-helm-4k4](https://dev.to/idsulik/installing-helm-4k4)  
23. How To Install Helm For Kubernetes \- DevOpsCube, 8월 27, 2025에 액세스, [https://devopscube.com/install-configure-helm-kubernetes/](https://devopscube.com/install-configure-helm-kubernetes/)  
24. Installing Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/intro/install/](https://helm.sh/docs/intro/install/)  
25. How to install HELM on Ubuntu 22.04 \- Tutorials and How To \- CloudCone, 8월 27, 2025에 액세스, [https://cloudcone.com/docs/article/how-to-install-helm-on-ubuntu-22-04/](https://cloudcone.com/docs/article/how-to-install-helm-on-ubuntu-22-04/)  
26. Installing Helm \- Helm v2, 8월 27, 2025에 액세스, [https://v2.helm.sh/docs/install/](https://v2.helm.sh/docs/install/)  
27. Installing Helm on Mac and Windows \- Kubernetes Training, 8월 27, 2025에 액세스, [https://kubernetestraining.io/blog/installing-helm-on-mac-and-windows](https://kubernetestraining.io/blog/installing-helm-on-mac-and-windows)  
28. How to Install Helm on Mac \- Kubernetes Book \- Matthew Palmer, 8월 27, 2025에 액세스, [https://matthewpalmer.net/kubernetes-app-developer/articles/how-to-install-helm-mac.html](https://matthewpalmer.net/kubernetes-app-developer/articles/how-to-install-helm-mac.html)  
29. helm \- Homebrew Formulae, 8월 27, 2025에 액세스, [https://formulae.brew.sh/formula/helm](https://formulae.brew.sh/formula/helm)  
30. helm/helm: The Kubernetes Package Manager \- GitHub, 8월 27, 2025에 액세스, [https://github.com/helm/helm](https://github.com/helm/helm)  
31. Installing Software on Kubernetes with Helm 3 Package Manager on Windows, 8월 27, 2025에 액세스, [https://blog.cloudsigma.com/installing-software-on-kubernetes-with-helm-3-package-manager-on-windows/](https://blog.cloudsigma.com/installing-software-on-kubernetes-with-helm-3-package-manager-on-windows/)  
32. Install Helm On Windows \- YouTube, 8월 27, 2025에 액세스, [https://www.youtube.com/watch?v=ZKAlKoqlWac](https://www.youtube.com/watch?v=ZKAlKoqlWac)  
33. Using Helm Repositories \- DEV Community, 8월 27, 2025에 액세스, [https://dev.to/idsulik/using-helm-repositories-b3j](https://dev.to/idsulik/using-helm-repositories-b3j)  
34. How to Add, Update or Remove Helm Repositories \- phoenixNAP, 8월 27, 2025에 액세스, [https://phoenixnap.com/kb/helm-repo-add-update-remove](https://phoenixnap.com/kb/helm-repo-add-update-remove)  
35. Getting Started \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_template\_guide/getting\_started/](https://helm.sh/docs/chart_template_guide/getting_started/)  
36. Understand a Helm chart structure \- Bitnami Documentation, 8월 27, 2025에 액세스, [https://docs.bitnami.com/kubernetes/faq/administration/understand-helm-chart/](https://docs.bitnami.com/kubernetes/faq/administration/understand-helm-chart/)  
37. How to Organize Your Helm Charts for Efficient Kubernetes Deployments \- Ananta Cloud, 8월 27, 2025에 액세스, [https://www.anantacloud.com/post/how-to-organize-your-helm-charts-for-efficient-kubernetes-deployments](https://www.anantacloud.com/post/how-to-organize-your-helm-charts-for-efficient-kubernetes-deployments)  
38. Helm Chart Essentials & Writing Effective Charts \- DEV Community, 8월 27, 2025에 액세스, [https://dev.to/hkhelil/helm-chart-essentials-writing-effective-charts-11ca](https://dev.to/hkhelil/helm-chart-essentials-writing-effective-charts-11ca)  
39. Are Helm Charts Written in YAML? \- KodeKloud, 8월 27, 2025에 액세스, [https://kodekloud.com/community/t/are-helm-charts-written-in-yaml/395249](https://kodekloud.com/community/t/are-helm-charts-written-in-yaml/395249)  
40. helm/docs/charts.md at master · a0x8o/helm \- GitHub, 8월 27, 2025에 액세스, [https://github.com/a0x8o/helm/blob/master/docs/charts.md](https://github.com/a0x8o/helm/blob/master/docs/charts.md)  
41. Helm Dependency, 8월 27, 2025에 액세스, [https://helm.sh/docs/helm/helm\_dependency/](https://helm.sh/docs/helm/helm_dependency/)  
42. Helm Chart Dependencies: Overview and Best Practices 2023 | Kubiya Blog, 8월 27, 2025에 액세스, [https://www.kubiya.ai/blog/understanding-helm-chart-dependencies-an-overview](https://www.kubiya.ai/blog/understanding-helm-chart-dependencies-an-overview)  
43. Helm Chart Tutorial: A Step-by-Step Guide with Examples \- DataCamp, 8월 27, 2025에 액세스, [https://www.datacamp.com/tutorial/helm-chart](https://www.datacamp.com/tutorial/helm-chart)  
44. Values Files \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_template\_guide/values\_files/](https://helm.sh/docs/chart_template_guide/values_files/)  
45. Values \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_best\_practices/values/](https://helm.sh/docs/chart_best_practices/values/)  
46. 7 Helm Best Practices with Examples \- KodeKloud, 8월 27, 2025에 액세스, [https://kodekloud.com/blog/helm-best-practices/](https://kodekloud.com/blog/helm-best-practices/)  
47. helm-template \- Kargo Docs, 8월 27, 2025에 액세스, [https://docs.kargo.io/user-guide/reference-docs/promotion-steps/helm-template](https://docs.kargo.io/user-guide/reference-docs/promotion-steps/helm-template)  
48. Templates \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_best\_practices/templates/](https://helm.sh/docs/chart_best_practices/templates/)  
49. Subcharts and Global Values \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_template\_guide/subcharts\_and\_globals/](https://helm.sh/docs/chart_template_guide/subcharts_and_globals/)  
50. Understanding Helm Chart Dependencies: Subcharts, External Dependencies, and Versioning \- Saurabh Adhau's Blog, 8월 27, 2025에 액세스, [https://devopsvoyager.hashnode.dev/understanding-helm-chart-dependencies-subcharts-external-dependencies-and-versioning](https://devopsvoyager.hashnode.dev/understanding-helm-chart-dependencies-subcharts-external-dependencies-and-versioning)  
51. Helm \_helpers.tpl: Calling defined templates in other template definitions \- Stack Overflow, 8월 27, 2025에 액세스, [https://stackoverflow.com/questions/46719082/helm-helpers-tpl-calling-defined-templates-in-other-template-definitions](https://stackoverflow.com/questions/46719082/helm-helpers-tpl-calling-defined-templates-in-other-template-definitions)  
52. Named Templates \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_template\_guide/named\_templates/](https://helm.sh/docs/chart_template_guide/named_templates/)  
53. How to use '\_helpers.tpl' in helm with example \[2 steps\] \- DevOpsHint, 8월 27, 2025에 액세스, [https://www.devopshint.com/how-to-use-template-file-helpers-tpl-in-helm/](https://www.devopshint.com/how-to-use-template-file-helpers-tpl-in-helm/)  
54. Helm masterclass series : Helm builtin objects . | by Sapna Yadav \- Medium, 8월 27, 2025에 액세스, [https://medium.com/@sapnarsy2612/helm-masterclass-series-helm-builtin-objects-b8d3ef618b1c](https://medium.com/@sapnarsy2612/helm-masterclass-series-helm-builtin-objects-b8d3ef618b1c)  
55. The Chart Template Developer's Guide \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_template\_guide/](https://helm.sh/docs/chart_template_guide/)  
56. Accessing Files Inside Templates \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_template\_guide/accessing\_files/](https://helm.sh/docs/chart_template_guide/accessing_files/)  
57. Discover Go template syntax | Nomad \- HashiCorp Developer, 8월 27, 2025에 액세스, [https://developer.hashicorp.com/nomad/tutorials/archive/go-template-syntax](https://developer.hashicorp.com/nomad/tutorials/archive/go-template-syntax)  
58. Template Functions and Pipelines \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_template\_guide/functions\_and\_pipelines/](https://helm.sh/docs/chart_template_guide/functions_and_pipelines/)  
59. Built-in Objects \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_template\_guide/builtin\_objects/](https://helm.sh/docs/chart_template_guide/builtin_objects/)  
60. Flow Control \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_template\_guide/control\_structures/](https://helm.sh/docs/chart_template_guide/control_structures/)  
61. Helm Flow Control with Conditional Control Structures \- KodeKloud, 8월 27, 2025에 액세스, [https://kodekloud.com/blog/helm-flow-control-and-conditionals/](https://kodekloud.com/blog/helm-flow-control-and-conditionals/)  
62. Helm Flow Control Using Conditional Structures: A Guide to Smarter Templates \- Pass4sure, 8월 27, 2025에 액세스, [https://www.pass4sure.com/blog/helm-flow-control-using-conditional-structures-a-guide-to-smarter-templates/](https://www.pass4sure.com/blog/helm-flow-control-using-conditional-structures-a-guide-to-smarter-templates/)  
63. How to Use With and Range Flow Control in Helm | by Aman Jaiswal \- Medium, 8월 27, 2025에 액세스, [https://medium.com/dailydevopstips/how-to-use-with-and-range-flow-control-in-helm-731591d357c6](https://medium.com/dailydevopstips/how-to-use-with-and-range-flow-control-in-helm-731591d357c6)  
64. Variables \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_template\_guide/variables/](https://helm.sh/docs/chart_template_guide/variables/)  
65. Helm Flow Control | Baeldung on Ops, 8월 27, 2025에 액세스, [https://www.baeldung.com/ops/helm-flow-control](https://www.baeldung.com/ops/helm-flow-control)  
66. Helm template guide — advanced functions & examples – Palark | Blog, 8월 27, 2025에 액세스, [https://blog.palark.com/advanced-helm-templating/](https://blog.palark.com/advanced-helm-templating/)  
67. Chart Development Tips and Tricks \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/howto/charts\_tips\_and\_tricks/](https://helm.sh/docs/howto/charts_tips_and_tricks/)  
68. Top HELM command with example usages. | by Krishnendu Bhowmick \- Medium, 8월 27, 2025에 액세스, [https://krishnendubhowmick.medium.com/top-helm-command-with-example-usages-4297820e8fe7](https://krishnendubhowmick.medium.com/top-helm-command-with-example-usages-4297820e8fe7)  
69. Helm Commands, 8월 27, 2025에 액세스, [https://helm.sh/docs/helm/](https://helm.sh/docs/helm/)  
70. Get Chart Information Using the helm show Command | Baeldung on Ops, 8월 27, 2025에 액세스, [https://www.baeldung.com/ops/helm-show-chart-info](https://www.baeldung.com/ops/helm-show-chart-info)  
71. Cheat Sheet \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/intro/cheatsheet/](https://helm.sh/docs/intro/cheatsheet/)  
72. Helm Install, 8월 27, 2025에 액세스, [https://helm.sh/docs/helm/helm\_install/](https://helm.sh/docs/helm/helm_install/)  
73. Helm Upgrade, 8월 27, 2025에 액세스, [https://helm.sh/docs/helm/helm\_upgrade/](https://helm.sh/docs/helm/helm_upgrade/)  
74. Helm Upgrade Guide \- Hazelcast Documentation, 8월 27, 2025에 액세스, [https://docs.hazelcast.com/hazelcast/5.5/kubernetes/helm-upgrade-guide](https://docs.hazelcast.com/hazelcast/5.5/kubernetes/helm-upgrade-guide)  
75. Helm Rollback: The Basics and a Quick Tutorial \- Komodor, 8월 27, 2025에 액세스, [https://komodor.com/learn/helm-rollback-the-basics-and-a-quick-tutorial/](https://komodor.com/learn/helm-rollback-the-basics-and-a-quick-tutorial/)  
76. Helm Rollback, 8월 27, 2025에 액세스, [https://helm.sh/docs/helm/helm\_rollback/](https://helm.sh/docs/helm/helm_rollback/)  
77. Helm rollback to previous release \- kubernetes \- Stack Overflow, 8월 27, 2025에 액세스, [https://stackoverflow.com/questions/51894307/helm-rollback-to-previous-release](https://stackoverflow.com/questions/51894307/helm-rollback-to-previous-release)  
78. Helm Status, 8월 27, 2025에 액세스, [https://helm.sh/docs/helm/helm\_status/](https://helm.sh/docs/helm/helm_status/)  
79. Helm List, 8월 27, 2025에 액세스, [https://helm.sh/docs/helm/helm\_list/](https://helm.sh/docs/helm/helm_list/)  
80. Exploring Helm List Command \- Saurabh Adhau's Blog, 8월 27, 2025에 액세스, [https://devopsvoyager.hashnode.dev/exploring-helm-list-command](https://devopsvoyager.hashnode.dev/exploring-helm-list-command)  
81. Rolling back a Helm chart to a previous spec \- IBM, 8월 27, 2025에 액세스, [https://www.ibm.com/docs/en/imdm/11.6.0?topic=helm-rolling-back-chart-previous-spec](https://www.ibm.com/docs/en/imdm/11.6.0?topic=helm-rolling-back-chart-previous-spec)  
82. Helm Release History with helm history Command \- Saurabh Adhau's Blog, 8월 27, 2025에 액세스, [https://devopsvoyager.hashnode.dev/helm-release-history-with-helm-history-command](https://devopsvoyager.hashnode.dev/helm-release-history-with-helm-history-command)  
83. Helm Dependency Update, 8월 27, 2025에 액세스, [https://helm.sh/docs/helm/helm\_dependency\_update/](https://helm.sh/docs/helm/helm_dependency_update/)  
84. Helm Chart Dependencies \- KodeKloud, 8월 27, 2025에 액세스, [https://kodekloud.com/blog/chart-dependencies/](https://kodekloud.com/blog/chart-dependencies/)  
85. Chart Hooks \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/topics/charts\_hooks/](https://helm.sh/docs/topics/charts_hooks/)  
86. Understanding Helm Chart Hooks \- Blog by Saifeddine Rajhi, 8월 27, 2025에 액세스, [https://seifrajhi.github.io/blog/helm-chart-hooks/](https://seifrajhi.github.io/blog/helm-chart-hooks/)  
87. Demystify Helm Chart Hooks \- YouTube, 8월 27, 2025에 액세스, [https://www.youtube.com/watch?v=pTk9LcLDyYU](https://www.youtube.com/watch?v=pTk9LcLDyYU)  
88. Helm Hooks Are An Anti-Pattern and Should Be Avoided : r/kubernetes \- Reddit, 8월 27, 2025에 액세스, [https://www.reddit.com/r/kubernetes/comments/17p2m95/helm\_hooks\_are\_an\_antipattern\_and\_should\_be/](https://www.reddit.com/r/kubernetes/comments/17p2m95/helm_hooks_are_an_antipattern_and_should_be/)  
89. Chart hooks | kubelabs \- GitHub Pages, 8월 27, 2025에 액세스, [https://collabnix.github.io/kubelabs/Helm101/chart-hooks.html](https://collabnix.github.io/kubelabs/Helm101/chart-hooks.html)  
90. Helm Chart Hooks Tutorial \- Rafay, 8월 27, 2025에 액세스, [https://rafay.co/ai-and-cloud-native-blog/helm-chart-hooks-tutorial/](https://rafay.co/ai-and-cloud-native-blog/helm-chart-hooks-tutorial/)  
91. Chart Hooks \- Helm \- KodeKloud, 8월 27, 2025에 액세스, [https://kodekloud.com/blog/chart-hooks/](https://kodekloud.com/blog/chart-hooks/)  
92. Understanding Helm Hooks: A Guide to Using Hooks in Your Helm Charts, 8월 27, 2025에 액세스, [https://alexandre-vazquez.com/understanding-helm-hooks-a-guide-to-using-hooks-in-your-helm-charts/](https://alexandre-vazquez.com/understanding-helm-hooks-a-guide-to-using-hooks-in-your-helm-charts/)  
93. Debugging Templates \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/chart\_template\_guide/debugging/](https://helm.sh/docs/chart_template_guide/debugging/)  
94. How to use helm lint, helm \--debug \--dry-run and helm template \- DevOpsHint, 8월 27, 2025에 액세스, [https://www.devopshint.com/helm-lint-helm-debug-dry-run-and-helm-template/](https://www.devopshint.com/helm-lint-helm-debug-dry-run-and-helm-template/)  
95. Validating helm chart content \- Stack Overflow, 8월 27, 2025에 액세스, [https://stackoverflow.com/questions/48665209/validating-helm-chart-content](https://stackoverflow.com/questions/48665209/validating-helm-chart-content)  
96. Chart Tests \- Helm, 8월 27, 2025에 액세스, [https://helm.sh/docs/topics/chart\_tests/](https://helm.sh/docs/topics/chart_tests/)  
97. Automated Testing for Kubernetes and Helm Charts using Terratest \- Gruntwork, 8월 27, 2025에 액세스, [https://www.gruntwork.io/blog/automated-testing-for-kubernetes-and-helm-charts-using-terratest](https://www.gruntwork.io/blog/automated-testing-for-kubernetes-and-helm-charts-using-terratest)  
98. Best Practices for Using Helm Charts | Baeldung on Ops, 8월 27, 2025에 액세스, [https://www.baeldung.com/ops/helm-charts-best-practices](https://www.baeldung.com/ops/helm-charts-best-practices)  
99. \[SECURITY FEATURE\]: Helm Chart \- Enterprise Secrets Management Integration (Vault) · Issue \#542 · IBM/mcp-context-forge \- GitHub, 8월 27, 2025에 액세스, [https://github.com/ibm/mcp-context-forge/issues/542](https://github.com/ibm/mcp-context-forge/issues/542)  
100. Configure Vault as a certificate manager in Kubernetes with Helm \- HashiCorp Developer, 8월 27, 2025에 액세스, [https://developer.hashicorp.com/vault/tutorials/archive/kubernetes-cert-manager](https://developer.hashicorp.com/vault/tutorials/archive/kubernetes-cert-manager)  
101. Introduction to Vault to provide secret management in your Kubernetes cluster \- Medium, 8월 27, 2025에 액세스, [https://medium.com/@martin.hodges/introduction-to-vault-to-provide-secret-management-in-your-kubernetes-cluster-658b58372569](https://medium.com/@martin.hodges/introduction-to-vault-to-provide-secret-management-in-your-kubernetes-cluster-658b58372569)  
102. Best Practices for Creating Production-Ready Helm charts \- Broadcom TechDocs, 8월 27, 2025에 액세스, [https://techdocs.broadcom.com/us/en/vmware-tanzu/bitnami-secure-images/bitnami-secure-images/services/bsi-doc/apps-tutorials-production-ready-charts-index.html](https://techdocs.broadcom.com/us/en/vmware-tanzu/bitnami-secure-images/bitnami-secure-images/services/bsi-doc/apps-tutorials-production-ready-charts-index.html)  
103. Integrating Network Policy with Helm for Enhanced Kubernetes Security \- Support Tools, 8월 27, 2025에 액세스, [https://support.tools/integrating-network-policy-with-helm-for-enhanced-kubernetes-security/](https://support.tools/integrating-network-policy-with-helm-for-enhanced-kubernetes-security/)  
104. Configuration Reference \- Zero to JupyterHub with Kubernetes, 8월 27, 2025에 액세스, [https://z2jh.jupyter.org/en/3.0.1/resources/reference.html](https://z2jh.jupyter.org/en/3.0.1/resources/reference.html)  
105. Pod Security Standards \- Kubernetes, 8월 27, 2025에 액세스, [https://kubernetes.io/docs/concepts/security/pod-security-standards/](https://kubernetes.io/docs/concepts/security/pod-security-standards/)  
106. Configure a Security Context for a Pod or Container \- Kubernetes, 8월 27, 2025에 액세스, [https://kubernetes.io/docs/tasks/configure-pod-container/security-context/](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)  
107. Using Helm with Kubernetes: A Guide to Helm Charts and Their Implementation, 8월 27, 2025에 액세스, [https://dev.to/alexmercedcoder/using-helm-with-kubernetes-a-guide-to-helm-charts-and-their-implementation-8dg](https://dev.to/alexmercedcoder/using-helm-with-kubernetes-a-guide-to-helm-charts-and-their-implementation-8dg)  
108. Best practices for promotion between clusters · argoproj argo-cd · Discussion \#5667 · GitHub, 8월 27, 2025에 액세스, [https://github.com/argoproj/argo-cd/discussions/5667](https://github.com/argoproj/argo-cd/discussions/5667)  
109. Working with Helm Values: Common Operations & Best Practices \- Komodor, 8월 27, 2025에 액세스, [https://komodor.com/learn/working-with-helm-values-common-operations-and-best-practices/](https://komodor.com/learn/working-with-helm-values-common-operations-and-best-practices/)  
110. GitHub Actions CI/CD Pipeline for Kubernetes: How to Build, Test & Deploy \- Devtron, 8월 27, 2025에 액세스, [https://devtron.ai/blog/create-ci-cd-pipelines-with-github-actions-for-kubernetes-the-definitive-guide/](https://devtron.ai/blog/create-ci-cd-pipelines-with-github-actions-for-kubernetes-the-definitive-guide/)  
111. Kubernetes with GitHub Actions & Helm: CI/CD for Containers \- Spacelift, 8월 27, 2025에 액세스, [https://spacelift.io/blog/github-actions-kubernetes](https://spacelift.io/blog/github-actions-kubernetes)  
112. Building a Kubernetes CI/CD Pipeline with GitLab and Helm | NextLink Labs, 8월 27, 2025에 액세스, [https://nextlinklabs.com/resources/insights/kubernetes-ci-cd-gitlab-with-helm](https://nextlinklabs.com/resources/insights/kubernetes-ci-cd-gitlab-with-helm)  
113. Environments \- GitLab Docs, 8월 27, 2025에 액세스, [https://docs.gitlab.com/ci/environments/](https://docs.gitlab.com/ci/environments/)  
114. Using GitLab CI/CD with a Kubernetes cluster, 8월 27, 2025에 액세스, [https://docs.gitlab.com/user/clusters/agent/ci\_cd\_workflow/](https://docs.gitlab.com/user/clusters/agent/ci_cd_workflow/)  
115. Easily Automate Your CI/CD Pipeline With Kubernetes, Helm, and Jenkins \- DZone, 8월 27, 2025에 액세스, [https://dzone.com/articles/easily-automate-your-cicd-pipeline-with-jenkins-he](https://dzone.com/articles/easily-automate-your-cicd-pipeline-with-jenkins-he)  
116. Jenkinsfile: Complete Pipeline for Docker and Helm Deployment | by mastinder@gmail.com, 8월 27, 2025에 액세스, [https://medium.com/@mastindergmail1/jenkinsfile-complete-pipeline-for-docker-and-helm-deployment-e46094aec99d](https://medium.com/@mastindergmail1/jenkinsfile-complete-pipeline-for-docker-and-helm-deployment-e46094aec99d)  
117. Using helm to manage an "environment?" \- DevOps Stack Exchange, 8월 27, 2025에 액세스, [https://devops.stackexchange.com/questions/13321/using-helm-to-manage-an-environment](https://devops.stackexchange.com/questions/13321/using-helm-to-manage-an-environment)