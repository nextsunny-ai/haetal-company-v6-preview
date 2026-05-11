/* ============================================================
   해탈 컴퍼니 — 어드민 매니페스트
   - HAETAL_TEXTS  : 화면 텍스트 (selector + key + default)
   - HAETAL_SOUNDS : 사운드 이벤트 풀 (외부 파일 매핑)
   ============================================================ */
(function(){

window.HAETAL_TEXTS = [
  /* INTRO */
  { section: '인트로 화면', key: 'intro.eyebrow', label: 'Eyebrow (영문)', selector: '#intro .intro-eyebrow', default: 'HAETAL · COMPANY · BUSAN' },
  { section: '인트로 화면', key: 'intro.title.han.left',  label: '한자 좌 (解)',  selector: '#intro .intro-title-row .han:first-of-type', default: '解' },
  { section: '인트로 화면', key: 'intro.title.ko',        label: '한글 타이틀',   selector: '#intro .intro-title-row .ko', default: '해탈 컴퍼니' },
  { section: '인트로 화면', key: 'intro.title.han.right', label: '한자 우 (脫)',  selector: '#intro .intro-title-row .han:last-of-type', default: '脫' },
  { section: '인트로 화면', key: 'intro.cta',     label: '시작 버튼',     selector: '#intro .intro-cta', default: '點 擊 入 場  ·  TAP TO ENTER' },
  { section: '인트로 화면', key: 'intro.foot.ko', label: '하단 한국어',   selector: '#intro .foot-bar span:nth-of-type(2)', default: '방석에 앉아 절을 시작하소서' },
  { section: '인트로 화면', key: 'intro.foot.en', label: '하단 영문',     selector: '#intro .foot-bar span:nth-of-type(4)', default: 'SIT ON CUSHION · BEGIN BOW' },

  /* CATEGORY */
  { section: '카테고리 선택', key: 'cat.step',     label: '단계 (영문)',   selector: '#category .cat-step', default: 'SELECT · YOUR · PATH' },
  { section: '카테고리 선택', key: 'cat.title',    label: '메인 타이틀',   selector: '#category .cat-title', default: '오늘 무엇을 <em>여쭐까요</em>', html: true },
  { section: '카테고리 선택', key: 'cat.sub',      label: '서브카피',      selector: '#category .cat-sub',   default: '다섯 갈래의 길 中 하나를 택하소서' },
  /* 카테고리 5개 */
  { section: '카테고리 선택', key: 'cat.love.label',  label: '愛 라벨',      selector: '.cat-card[data-hue="red"] .label',    default: '연애운' },
  { section: '카테고리 선택', key: 'cat.love.desc',   label: '愛 설명',      selector: '.cat-card[data-hue="red"] .desc',     default: '사랑·인연·마음의 길' },
  { section: '카테고리 선택', key: 'cat.money.label', label: '財 라벨',      selector: '.cat-card[data-hue="orange"] .label', default: '재물운' },
  { section: '카테고리 선택', key: 'cat.money.desc',  label: '財 설명',      selector: '.cat-card[data-hue="orange"] .desc',  default: '금전·부귀·돈의 흐름' },
  { section: '카테고리 선택', key: 'cat.health.label',label: '康 라벨',      selector: '.cat-card[data-hue="green"] .label',  default: '건강운' },
  { section: '카테고리 선택', key: 'cat.health.desc', label: '康 설명',      selector: '.cat-card[data-hue="green"] .desc',   default: '몸과 마음·회복' },
  { section: '카테고리 선택', key: 'cat.work.label',  label: '業 라벨',      selector: '.cat-card[data-hue="violet"] .label', default: '일운' },
  { section: '카테고리 선택', key: 'cat.work.desc',   label: '業 설명',      selector: '.cat-card[data-hue="violet"] .desc',  default: '사업·시험·성취' },
  { section: '카테고리 선택', key: 'cat.relation.label',label: '緣 라벨',    selector: '.cat-card[data-hue="blue"] .label',   default: '인간관계' },
  { section: '카테고리 선택', key: 'cat.relation.desc',label: '緣 설명',     selector: '.cat-card[data-hue="blue"] .desc',    default: '친구·가족·인연' },
  { section: '카테고리 선택', key: 'cat.foot.ko',    label: '하단 한국어',   selector: '#category .foot-bar span:nth-of-type(2)', default: '木簡을 가볍게 두드리소서 · TAP A WOODEN TABLET' },

  /* RITUAL */
  { section: '의식 화면 (절)', key: 'ritual.step',  label: '단계 (영문)',   selector: '#ritual .ritual-step', default: 'RITUAL · THREE BOWS' },
  { section: '의식 화면 (절)', key: 'ritual.title', label: '메인 타이틀',   selector: '#ritual .ritual-title', default: '합장 후 <em>세 번 절</em>하소서', html: true },
  { section: '의식 화면 (절)', key: 'ritual.sub',   label: '서브카피',      selector: '#ritual .ritual-sub',   default: '마음을 모으고 정성을 다하면 부처의 답을 들을 수 있나니' },
  { section: '의식 화면 (절)', key: 'ritual.left.h',     label: '좌측 상단', selector: '#ritual .ritual-side.left .h',     default: '— OF SILENCE —' },
  { section: '의식 화면 (절)', key: 'ritual.left.quote', label: '좌측 인용', selector: '#ritual .ritual-side.left .quote', default: '"고개를 숙이는 것은<br>곧 마음을 펴는 것이라"', html: true },
  { section: '의식 화면 (절)', key: 'ritual.left.hanja', label: '좌측 한자', selector: '#ritual .ritual-side.left .hanja-stack', default: '默 念<br>三 思', html: true },
  { section: '의식 화면 (절)', key: 'ritual.right.h',     label: '우측 상단', selector: '#ritual .ritual-side.right .h',     default: '— BOW THRICE —' },
  { section: '의식 화면 (절)', key: 'ritual.right.quote', label: '우측 인용', selector: '#ritual .ritual-side.right .quote', default: '"한 번 절은 몸을<br>두 번 절은 입을<br>세 번 절은 마음을 비운다"', html: true },
  { section: '의식 화면 (절)', key: 'ritual.right.hanja', label: '우측 한자', selector: '#ritual .ritual-side.right .hanja-stack', default: '三 拜<br>淸 心', html: true },

  /* ORACLE */
  { section: '점괘 화면', key: 'oracle.step', label: '단계 (영문)', selector: '#oracle .oracle-step', default: '— ORACLE · 부처의 답 —' },
  { section: '점괘 화면', key: 'oracle.scroll.head', label: '두루마리 헤더', selector: '#oracle .oracle-scroll-head', default: '— SCROLL OF TODAY · 두 루 마 리 —' },
  { section: '점괘 화면', key: 'oracle.btn.tts',  label: 'TTS 버튼', selector: '#ttsBtn', default: '<span class="tts-pulse idle" id="ttsPulse"><span></span><span></span><span></span><span></span><span></span></span>부처 말씀 듣기 [S]', html: true },
  { section: '점괘 화면', key: 'oracle.btn.print',label: '부적 받기', selector: '#oracle .oracle-btn.primary', default: '▸ 부적 받기 [P]' },

  /* PRINTING */
  { section: '인쇄 화면', key: 'print.title', label: '인쇄 중 타이틀', selector: '#printing .print-title', default: '부 적 <em>출 력</em> 중', html: true },
  { section: '인쇄 화면', key: 'print.sub',   label: '인쇄 중 서브',   selector: '#printing .print-sub',   default: 'PRINTING · ABOUT 8 SEC' },
  { section: '인쇄 화면', key: 'print.done.step',  label: '발행 단계',   selector: '.done-step', default: '★ ISSUED · 발행 완료 ★' },
  { section: '인쇄 화면', key: 'print.done.msg',   label: '완료 메시지', selector: '.done-msg',  default: '<em>부적</em><br>발행되었나니', html: true },
  { section: '인쇄 화면', key: 'print.done.tag',   label: '완료 카피',   selector: '.done-tag',  default: '"오늘 받은 한 장의 부적이<br>그대의 하루를 지키리라"', html: true },
  { section: '인쇄 화면', key: 'print.done.cta',   label: '다시 버튼',   selector: '.done-cta',  default: '다른 점괘 청하기 [SPACE]' }
];

window.HAETAL_SOUNDS = [
  { key: 'bell',     label: '범종 (점괘 받을 때)' },
  { key: 'woodfish', label: '목어 (절·카테고리 클릭)' }
];

/* ---------- 부적 문구 풀 (어드민 백업 탭의 JSON 편집을 통해 변경 가능) ---------- */
/* store.oracles[cat] = [{ grade, en, text }, ...] 형태로 저장됨 */
/* 페이지 JS는 store.oracles[cat] || ORACLES[cat] fallback 패턴 사용 */
window.HAETAL_ORACLES_DEFAULT = {
  love: [
    { grade: '大 吉', en: 'GREAT',  text: '인연은 멀리 있지 않다. 오늘 마주칠 한 사람의 미소가 곧 그대를 깨우는 종소리이리라.' },
    { grade: '中 吉', en: 'MIDDLE', text: '서두르지 마라. 봄꽃이 가을에 피지 않듯, 그대의 사람은 정해진 때에 오느니.' },
    { grade: '吉',   en: 'FAIR',   text: '마음을 비우면 길이 보이고, 미움을 내려두면 사랑이 깃드나니.' },
    { grade: '小 吉', en: 'SMALL',  text: '오래 기다린 답장은 곧 도달할 것이다. 그러나 먼저 그대의 마음을 정돈하라.' }
  ],
  money: [
    { grade: '大 吉', en: 'GREAT',  text: '동남쪽에서 재물의 기운이 일어나리니, 작은 일을 가벼이 여기지 마라.' },
    { grade: '中 吉', en: 'MIDDLE', text: '쌓는 것보다 쓰는 것이 어렵다. 베푸는 자에게 재물은 다시 흐른다.' },
    { grade: '吉',   en: 'FAIR',   text: '오늘의 한 푼이 내일의 한 짐이 되리니. 헛된 욕망을 멀리하라.' },
    { grade: '小 吉', en: 'SMALL',  text: '큰 물결은 멀리 있다. 작은 시냇물부터 길러야 강이 되느니.' }
  ],
  health: [
    { grade: '大 吉', en: 'GREAT',  text: '몸은 마음의 그림자라. 오늘 한 잔의 차가 그대의 봄을 부른다.' },
    { grade: '中 吉', en: 'MIDDLE', text: '잠은 약과 같으니, 오늘은 일찍 몸을 누이고 내일을 맞이하라.' },
    { grade: '吉',   en: 'FAIR',   text: '걷는 자에게 길이 열리고, 숨 쉬는 자에게 평안이 깃든다.' },
    { grade: '小 吉', en: 'SMALL',  text: '작은 통증을 가벼이 여기지 마라. 그러나 두려움도 만들지 마라.' }
  ],
  work: [
    { grade: '大 吉', en: 'GREAT',  text: '뜻을 세운 자에게 길은 비킨다. 망설이는 한 번이 일생을 가르는 한 걸음이리라.' },
    { grade: '中 吉', en: 'MIDDLE', text: '오늘의 작은 마무리가 내일의 큰 시작이 되나니. 끝을 잘 맺으라.' },
    { grade: '吉',   en: 'FAIR',   text: '동료의 말을 가볍게 듣지 마라. 그 안에 그대가 보지 못한 답이 있다.' },
    { grade: '小 吉', en: 'SMALL',  text: '서두름은 실수를 부른다. 천천히 가도 길은 멀어지지 않느니.' }
  ],
  relation: [
    { grade: '大 吉', en: 'GREAT',  text: '오랜 친구로부터 소식이 닿으리니, 그 인연을 가벼이 여기지 마라.' },
    { grade: '中 吉', en: 'MIDDLE', text: '말하는 것보다 듣는 것이 큰 공덕이라. 오늘은 귀를 열라.' },
    { grade: '吉',   en: 'FAIR',   text: '미움도 사랑도 모두 흘러간다. 다만 오늘의 한 마디만 정성껏 하라.' },
    { grade: '小 吉', en: 'SMALL',  text: '거리는 마음의 척도가 아니라. 멀리 있어도 가까운 사람을 기억하라.' }
  ]
};

})();
