/* ============================================================
   해탈컴퍼니 — Admin Panel
   - bottom-left ⚙ button + Ctrl+Shift+A toggle
   - text overrides via window.HAETAL_TEXTS  (selector-based)
   - sound overrides via window.HAETAL_SOUNDS (event-name → audio file path)
   - persists to localStorage scoped by file path
   - JSON export / import for sharing across kiosks
   ============================================================ */
(function(){
  if (window.__haetalAdminLoaded) return;
  window.__haetalAdminLoaded = true;

  var STORAGE_KEY = 'haetal_admin_' + (location.pathname || 'default');

  function loadStore(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { texts: {}, sounds: {}, tts: { mode: 'male' } };
      var v = JSON.parse(raw);
      v.texts = v.texts || {};
      v.sounds = v.sounds || {};
      v.tts = v.tts || { mode: 'male' };  /* 디폴트 = 남자 부처 톤 */
      return v;
    } catch(e){ return { texts: {}, sounds: {}, tts: { mode: 'male' } }; }
  }
  function saveStore(s){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch(e){}
  }
  var store = loadStore();
  window.__haetalStore = store;

  /* ---------- text application ---------- */
  function applyText(key, value){
    var manifest = (window.HAETAL_TEXTS || []).find(function(m){ return m.key === key; });
    if (!manifest) return;
    var nodes = document.querySelectorAll(manifest.selector);
    nodes.forEach(function(n){
      // preserve <small> and other inner structure for known special selectors
      if (manifest.html) {
        n.innerHTML = value;
      } else {
        n.textContent = value;
      }
    });
  }
  function applyAllTexts(){
    var manifest = window.HAETAL_TEXTS || [];
    manifest.forEach(function(m){
      var v = store.texts[m.key];
      if (v != null && v !== '') applyText(m.key, v);
    });
  }

  /* ---------- sound dispatch ---------- */
  // file fires CustomEvent 'haetal-sound' with detail = event-name
  // we look up store.sounds[name] → path; if present, play the file
  window.addEventListener('haetal-sound', function(ev){
    var name = ev.detail;
    if (!name) return;
    var entry = store.sounds[name];
    if (!entry || !entry.path) return;
    try {
      var a = new Audio(entry.path);
      a.volume = (entry.volume == null) ? 1 : Math.max(0, Math.min(1, entry.volume));
      a.play().catch(function(){});
    } catch(e){}
  });
  // helper for files to call directly
  window.playHaetalEvent = function(name){
    window.dispatchEvent(new CustomEvent('haetal-sound', { detail: name }));
  };

  /* ---------- styles ---------- */
  var css = (
    '#haetalAdminBtn{position:fixed;left:18px;bottom:18px;width:46px;height:46px;border-radius:50%;'+
    'background:rgba(20,16,8,0.85);color:#FFD86B;border:1px solid #FFD86B;cursor:pointer;'+
    'font-family:"IBM Plex Mono",monospace;font-size:18px;z-index:99998;display:flex;'+
    'align-items:center;justify-content:center;backdrop-filter:blur(6px);'+
    'box-shadow:0 2px 12px rgba(0,0,0,0.5);transition:all .2s;letter-spacing:0;}'+
    '#haetalAdminBtn:hover{background:#FFD86B;color:#1a1108;transform:scale(1.05);}'+
    '#haetalAdminPanel{position:fixed;inset:0;background:rgba(8,6,2,0.92);z-index:99999;'+
    'display:none;align-items:center;justify-content:center;backdrop-filter:blur(8px);'+
    'font-family:"Pretendard",-apple-system,BlinkMacSystemFont,sans-serif;color:#F5E9C9;}'+
    '#haetalAdminPanel.open{display:flex;}'+
    '#haetalAdminCard{background:#1a1108;border:1px solid #FFD86B;width:min(1100px,94vw);'+
    'height:min(820px,92vh);display:flex;flex-direction:column;}'+
    '.haAd-head{padding:18px 26px;border-bottom:1px solid rgba(255,216,107,0.3);'+
    'display:flex;align-items:center;justify-content:space-between;background:#0c0805;}'+
    '.haAd-head h1{font-family:"Noto Serif KR",serif;font-weight:900;font-size:22px;'+
    'letter-spacing:0.2em;color:#FFD86B;margin:0;}'+
    '.haAd-head h1 small{display:block;font-family:"IBM Plex Mono",monospace;font-weight:400;'+
    'font-size:9px;letter-spacing:0.4em;color:#E8B636;margin-top:4px;opacity:0.7;}'+
    '.haAd-close{background:transparent;border:1px solid #FFD86B;color:#FFD86B;'+
    'padding:8px 16px;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:0.3em;'+
    'cursor:pointer;}'+
    '.haAd-close:hover{background:#FFD86B;color:#1a1108;}'+
    '.haAd-tabs{display:flex;border-bottom:1px solid rgba(255,216,107,0.2);background:#0c0805;}'+
    '.haAd-tab{padding:14px 26px;background:transparent;border:0;color:#A89472;'+
    'font-family:"Noto Serif KR",serif;font-weight:700;font-size:13px;letter-spacing:0.3em;'+
    'cursor:pointer;border-bottom:2px solid transparent;}'+
    '.haAd-tab.active{color:#FFD86B;border-bottom-color:#FFD86B;background:rgba(255,216,107,0.05);}'+
    '.haAd-body{flex:1;overflow-y:auto;padding:24px 32px;}'+
    '.haAd-section{margin-bottom:32px;}'+
    '.haAd-section-title{font-family:"Noto Serif KR",serif;font-weight:700;font-size:13px;'+
    'letter-spacing:0.4em;color:#FFD86B;border-bottom:1px solid rgba(255,216,107,0.3);'+
    'padding-bottom:8px;margin-bottom:16px;}'+
    '.haAd-row{display:grid;grid-template-columns:240px 1fr 80px;gap:14px;align-items:start;'+
    'margin-bottom:14px;}'+
    '.haAd-label{padding-top:8px;}'+
    '.haAd-label .ko{font-family:"Pretendard",sans-serif;font-size:13px;color:#F5E9C9;display:block;}'+
    '.haAd-label .en{font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:0.2em;'+
    'color:#A89472;display:block;margin-top:2px;}'+
    '.haAd-input,.haAd-textarea{width:100%;background:#0c0805;border:1px solid rgba(255,216,107,0.3);'+
    'color:#F5E9C9;padding:10px 12px;font-family:"Pretendard",sans-serif;font-size:13px;'+
    'border-radius:0;outline:none;transition:border-color .15s;}'+
    '.haAd-input:focus,.haAd-textarea:focus{border-color:#FFD86B;}'+
    '.haAd-textarea{resize:vertical;min-height:60px;font-family:"Noto Serif KR",serif;line-height:1.6;}'+
    '.haAd-action{display:flex;flex-direction:column;gap:6px;}'+
    '.haAd-btn{background:transparent;border:1px solid rgba(255,216,107,0.4);color:#FFD86B;'+
    'padding:8px 10px;font-family:"IBM Plex Mono",monospace;font-size:9px;letter-spacing:0.2em;'+
    'cursor:pointer;}'+
    '.haAd-btn:hover{background:#FFD86B;color:#1a1108;}'+
    '.haAd-btn.danger{border-color:#C8201A;color:#FFA8A0;}'+
    '.haAd-btn.danger:hover{background:#C8201A;color:#F5E9C9;}'+
    '.haAd-foot{padding:14px 26px;border-top:1px solid rgba(255,216,107,0.3);background:#0c0805;'+
    'display:flex;justify-content:space-between;align-items:center;gap:12px;}'+
    '.haAd-status{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:0.3em;'+
    'color:#A89472;}'+
    '.haAd-status .ok{color:#7ED9A8;}'+
    '.haAd-foot-actions{display:flex;gap:10px;}'+
    '.haAd-help{font-family:"Pretendard",sans-serif;font-size:11px;color:#A89472;'+
    'background:rgba(255,216,107,0.05);border-left:2px solid #FFD86B;padding:10px 14px;'+
    'margin-bottom:18px;line-height:1.6;}'
  );

  var styleEl = document.createElement('style');
  styleEl.id = 'haetalAdminStyle';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ---------- DOM ---------- */
  var btn = document.createElement('button');
  btn.id = 'haetalAdminBtn';
  btn.title = '관리자 열기 (Ctrl+Shift+A)';
  btn.textContent = '⚙';
  document.body.appendChild(btn);

  var panel = document.createElement('div');
  panel.id = 'haetalAdminPanel';
  panel.innerHTML = (
    '<div id="haetalAdminCard">'+
    '  <div class="haAd-head">'+
    '    <h1>管理 · ADMIN<small>해탈컴퍼니 운영자 패널</small></h1>'+
    '    <button class="haAd-close" data-act="close">CLOSE · ESC</button>'+
    '  </div>'+
    '  <div class="haAd-tabs">'+
    '    <button class="haAd-tab active" data-tab="texts">텍스트</button>'+
    '    <button class="haAd-tab" data-tab="oracles">점괘 문구</button>'+
    '    <button class="haAd-tab" data-tab="sounds">사운드</button>'+
    '    <button class="haAd-tab" data-tab="print">프린트</button>'+
    '    <button class="haAd-tab" data-tab="data">백업</button>'+
    '  </div>'+
    '  <div class="haAd-body" id="haAdBody"></div>'+
    '  <div class="haAd-foot">'+
    '    <span class="haAd-status" id="haAdStatus">변경 사항이 즉시 반영됩니다 · localStorage에 자동 저장</span>'+
    '    <div class="haAd-foot-actions">'+
    '      <button class="haAd-btn danger" data-act="resetAll">모두 초기화</button>'+
    '      <button class="haAd-btn" data-act="close2">닫기</button>'+
    '    </div>'+
    '  </div>'+
    '</div>'
  );
  document.body.appendChild(panel);

  var body = panel.querySelector('#haAdBody');
  var status = panel.querySelector('#haAdStatus');
  var currentTab = 'texts';

  function flash(msg, ok){
    status.innerHTML = '<span class="' + (ok ? 'ok' : '') + '">' + msg + '</span>';
    setTimeout(function(){
      status.innerHTML = '변경 사항이 즉시 반영됩니다 · localStorage에 자동 저장';
    }, 2400);
  }

  /* ---------- tab: TEXTS ---------- */
  function renderTexts(){
    var manifest = window.HAETAL_TEXTS || [];
    if (!manifest.length){
      body.innerHTML = '<div class="haAd-help">이 페이지에 등록된 텍스트 키가 없습니다.</div>';
      return;
    }
    var groups = {};
    manifest.forEach(function(m){
      var g = m.section || '기타';
      (groups[g] = groups[g] || []).push(m);
    });
    var html = '<div class="haAd-help">현장에서 바로 문구를 바꿀 수 있어요. 줄바꿈은 그대로 반영됩니다. 길이가 너무 길면 화면 깨짐 주의.</div>';
    Object.keys(groups).forEach(function(g){
      html += '<div class="haAd-section"><div class="haAd-section-title">' + g + '</div>';
      groups[g].forEach(function(m){
        var current = (store.texts[m.key] != null) ? store.texts[m.key] : (m.default || '');
        var isLong = (m.long || (current && current.length > 40));
        var input = isLong
          ? '<textarea class="haAd-textarea" data-key="' + m.key + '" rows="3">' + escapeHtml(current) + '</textarea>'
          : '<input class="haAd-input" data-key="' + m.key + '" value="' + escapeAttr(current) + '">';
        html += '<div class="haAd-row">' +
                '  <div class="haAd-label"><span class="ko">' + (m.label||m.key) + '</span><span class="en">' + (m.note||m.key) + '</span></div>' +
                '  ' + input +
                '  <div class="haAd-action"><button class="haAd-btn" data-reset="' + m.key + '">기본값</button></div>' +
                '</div>';
      });
      html += '</div>';
    });
    body.innerHTML = html;

    body.querySelectorAll('[data-key]').forEach(function(el){
      el.addEventListener('input', function(){
        var k = el.getAttribute('data-key');
        store.texts[k] = el.value;
        applyText(k, el.value);
        saveStore(store);
      });
    });
    body.querySelectorAll('[data-reset]').forEach(function(el){
      el.addEventListener('click', function(){
        var k = el.getAttribute('data-reset');
        var m = manifest.find(function(x){ return x.key === k; });
        delete store.texts[k];
        saveStore(store);
        if (m) applyText(k, m.default || '');
        var inp = body.querySelector('[data-key="'+k+'"]');
        if (inp) inp.value = (m && m.default) || '';
        flash('기본값으로 복원', true);
      });
    });
  }

  /* ---------- tab: PRINT (운영자 프린트 셋업 전용) ---------- */
  function renderPrint(){
    var html = '<div class="haAd-help" style="line-height:1.7;">' +
      '<b>프린트 셋업 — 운영자 1회 셋업용</b><br>' +
      '관람객 메인 흐름 = 다이얼로그 X · 시뮬레이션만 · OS가 기억한 프린터로 자동 출력.<br>' +
      '<b>첫 셋업 시</b> = 아래 "프린트 테스트" 버튼 클릭 → 다이얼로그 → 프린터·사이즈·컬러 셋팅 (한 번).<br>' +
      '<b>iPad/iOS</b> = AirPrint 프린터 첫 선택 후 = OS가 기억 = 이후 관람객 출력 = 같은 프린터로 자동.' +
      '</div>';
    html += '<div class="haAd-section">' +
      '<div class="haAd-section-title">프린트 테스트</div>' +
      '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">' +
      '  <button class="haAd-btn" data-act="print-test" style="font-size:14px;padding:14px 24px;">▶ 프린트 테스트 (다이얼로그 호출)</button>' +
      '  <span style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:#A89472;">샘플 부적으로 테스트 인쇄</span>' +
      '</div></div>';
    body.innerHTML = html;

    /* 프린트 테스트 버튼 이벤트 */
    var ptEl = body.querySelector('[data-act="print-test"]');
    if (ptEl) ptEl.addEventListener('click', function(){
      panel.classList.remove('open');
      try {
        if (typeof window.goPrint === 'function') {
          window.goPrint();
          setTimeout(function(){ try { window.print(); } catch(e){} }, 2800);
        } else {
          window.print();
        }
        flash('프린트 테스트 → 다이얼로그 호출', true);
      } catch(e) { flash('실패', false); }
    });
  }

  /* ---------- tab: SOUNDS (음원 이벤트) ---------- */
  function renderSounds(){
    var manifest = window.HAETAL_SOUNDS || [];
    var html = '<div class="haAd-help">' +
      '<b>사운드 이벤트</b> — 프로젝트 폴더에 음원(.mp3·.wav·.m4a) 두고 경로 입력. 빈 칸 = 기본 신디 사운드.' +
      '</div>';
    html += '<div class="haAd-section"><div class="haAd-section-title">이벤트 → 음원 파일</div>';
    manifest.forEach(function(m){
      var entry = store.sounds[m.key] || {};
      var path = entry.path || '';
      var vol  = (entry.volume == null) ? 1 : entry.volume;
      html += '<div class="haAd-row" style="grid-template-columns:240px 1fr 220px;">' +
              '  <div class="haAd-label"><span class="ko">' + (m.label||m.key) + '</span><span class="en">' + m.key + '</span></div>' +
              '  <input class="haAd-input" data-sound-path="' + m.key + '" placeholder="sounds/예시.mp3" value="' + escapeAttr(path) + '">' +
              '  <div class="haAd-action" style="flex-direction:row;align-items:center;gap:8px;">' +
              '    <span style="font-family:\'IBM Plex Mono\',monospace;font-size:9px;color:#A89472;">VOL</span>' +
              '    <input type="range" min="0" max="1" step="0.05" data-sound-vol="' + m.key + '" value="' + vol + '" style="flex:1;accent-color:#FFD86B;">' +
              '    <button class="haAd-btn" data-sound-test="' + m.key + '" style="white-space:nowrap;">▶ TEST</button>' +
              '  </div>' +
              '</div>';
    });
    html += '</div>';
    body.innerHTML = html;

    body.querySelectorAll('[data-sound-path]').forEach(function(el){
      el.addEventListener('input', function(){
        var k = el.getAttribute('data-sound-path');
        store.sounds[k] = store.sounds[k] || {};
        store.sounds[k].path = el.value;
        saveStore(store);
      });
    });
    body.querySelectorAll('[data-sound-vol]').forEach(function(el){
      el.addEventListener('input', function(){
        var k = el.getAttribute('data-sound-vol');
        store.sounds[k] = store.sounds[k] || {};
        store.sounds[k].volume = parseFloat(el.value);
        saveStore(store);
      });
    });
    body.querySelectorAll('[data-sound-test]').forEach(function(el){
      el.addEventListener('click', function(){
        var k = el.getAttribute('data-sound-test');
        var entry = store.sounds[k] || {};
        if (!entry.path) { flash('경로가 비어있습니다 · 기본 신디 재생', false); window.dispatchEvent(new CustomEvent('haetal-sound', {detail:k})); return; }
        try {
          var a = new Audio(entry.path);
          a.volume = entry.volume == null ? 1 : entry.volume;
          a.play().then(function(){ flash('재생 OK · '+entry.path, true); }).catch(function(err){ flash('재생 실패 · 경로 확인', false); });
        } catch(e){ flash('재생 실패', false); }
      });
    });



  }

  /* ---------- tab: DATA ---------- */
  function renderData(){
    body.innerHTML = (
      '<div class="haAd-help">설정을 JSON 파일로 내보내고, 다른 키오스크에 붙여넣어 동일한 운영 값을 공유할 수 있습니다.</div>'+
      '<div class="haAd-section"><div class="haAd-section-title">현재 설정 (편집 가능)</div>'+
      '<textarea class="haAd-textarea" id="haAdJson" rows="18" style="font-family:\'IBM Plex Mono\',monospace;font-size:11px;">' + escapeHtml(JSON.stringify(store, null, 2)) + '</textarea>'+
      '<div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;">'+
      '  <button class="haAd-btn" data-act="apply">▼ 위 JSON 적용</button>'+
      '  <button class="haAd-btn" data-act="copy">📋 클립보드 복사</button>'+
      '  <button class="haAd-btn" data-act="download">⬇ 파일 다운로드</button>'+
      '  <label class="haAd-btn" style="cursor:pointer;">⬆ 파일 업로드<input type="file" accept="application/json" id="haAdUpload" style="display:none;"></label>'+
      '</div></div>'
    );
    body.querySelector('[data-act="apply"]').addEventListener('click', function(){
      try {
        var v = JSON.parse(body.querySelector('#haAdJson').value);
        v.texts = v.texts || {}; v.sounds = v.sounds || {};
        store = v;
        window.__haetalStore = store;
        saveStore(store);
        applyAllTexts();
        flash('적용됨', true);
      } catch(e){ flash('JSON 파싱 실패', false); }
    });
    body.querySelector('[data-act="copy"]').addEventListener('click', function(){
      navigator.clipboard.writeText(JSON.stringify(store, null, 2)).then(function(){ flash('복사됨', true); });
    });
    body.querySelector('[data-act="download"]').addEventListener('click', function(){
      var blob = new Blob([JSON.stringify(store, null, 2)], { type:'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'haetal-admin-' + (new Date().toISOString().slice(0,10)) + '.json';
      a.click();
      flash('다운로드 시작', true);
    });
    body.querySelector('#haAdUpload').addEventListener('change', function(ev){
      var f = ev.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function(){
        try {
          var v = JSON.parse(r.result);
          v.texts = v.texts || {}; v.sounds = v.sounds || {};
          store = v;
          window.__haetalStore = store;
          saveStore(store);
          applyAllTexts();
          renderData();
          flash('업로드 적용됨', true);
        } catch(e){ flash('파일 파싱 실패', false); }
      };
      r.readAsText(f);
    });
  }

  /* ---------- tab: ORACLES (부적 문구 5×4 = 20개) ---------- */
  function renderOracles(){
    var defaults = window.HAETAL_ORACLES_DEFAULT || {};
    if (!store.oracles) store.oracles = {};
    var cats = [
      { key: 'love',     label: '愛 · 연애운',   hue: '#C8201A' },
      { key: 'money',    label: '財 · 재물운',   hue: '#E96A21' },
      { key: 'health',   label: '康 · 건강운',   hue: '#2EA862' },
      { key: 'work',     label: '業 · 일운',     hue: '#7C3AED' },
      { key: 'relation', label: '緣 · 인간관계', hue: '#1E63C5' }
    ];
    var html = '<div class="haAd-help">' +
      '<b>점괘 문구</b> = 5 카테고리 × 4 등급 = 총 20개. 관람객이 = 절 3번 후 = 자기 카테고리에서 무작위 1개 받음.<br>' +
      '<b>등급:</b> 大 吉 (가장 좋음) → 中 吉 → 吉 → 小 吉<br>' +
      '<b>저장:</b> 자동 · 빈 칸 = 기본값 사용 · "기본값" 버튼 = 그 칸만 복원' +
      '</div>';
    cats.forEach(function(cat){
      html += '<div class="haAd-section">' +
              '<div class="haAd-section-title" style="color:' + cat.hue + ';border-bottom-color:' + cat.hue + ';">' + cat.label + '</div>';
      var defArr = defaults[cat.key] || [];
      var curArr = store.oracles[cat.key] || [];
      [0,1,2,3].forEach(function(i){
        var def = defArr[i] || { grade:'-', en:'-', text:'' };
        var cur = curArr[i] || def;
        var text = (cur.text != null) ? cur.text : def.text;
        html += '<div class="haAd-row" style="grid-template-columns:120px 1fr 80px;align-items:start;margin-bottom:12px;">' +
                '  <div class="haAd-label">' +
                '    <span class="ko" style="font-family:\'Noto Serif KR\',serif;font-weight:900;font-size:20px;color:' + cat.hue + ';display:block;">' + (def.grade) + '</span>' +
                '    <span class="en">' + (def.en) + '</span>' +
                '  </div>' +
                '  <textarea class="haAd-textarea" data-oracle-cat="' + cat.key + '" data-oracle-idx="' + i + '" rows="2" style="font-family:\'Gowun Batang\',serif;line-height:1.7;">' + escapeHtml(text) + '</textarea>' +
                '  <div class="haAd-action"><button class="haAd-btn" data-oracle-reset="' + cat.key + '" data-oracle-reset-idx="' + i + '">기본값</button></div>' +
                '</div>';
      });
      html += '</div>';
    });
    body.innerHTML = html;

    body.querySelectorAll('[data-oracle-cat]').forEach(function(el){
      el.addEventListener('input', function(){
        var c = el.getAttribute('data-oracle-cat');
        var i = parseInt(el.getAttribute('data-oracle-idx'));
        if (!store.oracles[c]) {
          store.oracles[c] = JSON.parse(JSON.stringify(defaults[c] || []));
        }
        while (store.oracles[c].length <= i) store.oracles[c].push({ grade:'-', en:'-', text:'' });
        var def = (defaults[c] || [])[i] || {};
        store.oracles[c][i] = {
          grade: store.oracles[c][i].grade || def.grade,
          en:    store.oracles[c][i].en    || def.en,
          text:  el.value
        };
        saveStore(store);
        if (typeof window.applyHaetalOraclesOverride === 'function') window.applyHaetalOraclesOverride();
      });
    });
    body.querySelectorAll('[data-oracle-reset]').forEach(function(el){
      el.addEventListener('click', function(){
        var c = el.getAttribute('data-oracle-reset');
        var i = parseInt(el.getAttribute('data-oracle-reset-idx'));
        var def = (defaults[c] || [])[i];
        if (!def) return;
        if (!store.oracles[c]) store.oracles[c] = JSON.parse(JSON.stringify(defaults[c] || []));
        store.oracles[c][i] = JSON.parse(JSON.stringify(def));
        saveStore(store);
        var ta = body.querySelector('[data-oracle-cat="'+c+'"][data-oracle-idx="'+i+'"]');
        if (ta) ta.value = def.text;
        flash('기본값으로 복원', true);
        if (typeof window.applyHaetalOraclesOverride === 'function') window.applyHaetalOraclesOverride();
      });
    });
  }

  function render(){
    if (currentTab === 'texts') renderTexts();
    else if (currentTab === 'oracles') renderOracles();
    else if (currentTab === 'sounds') renderSounds();
    else if (currentTab === 'print') renderPrint();
    else renderData();
    panel.querySelectorAll('.haAd-tab').forEach(function(t){
      t.classList.toggle('active', t.getAttribute('data-tab') === currentTab);
    });
  }

  function open(){ panel.classList.add('open'); render(); }
  function close(){ panel.classList.remove('open'); }

  btn.addEventListener('click', open);
  panel.addEventListener('click', function(ev){
    var t = ev.target;
    if (t.matches('.haAd-tab')) { currentTab = t.getAttribute('data-tab'); render(); return; }
    if (t.matches('[data-act="close"]') || t.matches('[data-act="close2"]')) { close(); return; }
    if (t.matches('[data-act="resetAll"]')) {
      if (confirm('모든 텍스트·사운드 설정을 초기화할까요?')) {
        store = { texts:{}, sounds:{} };
        window.__haetalStore = store;
        saveStore(store);
        // restore defaults visually
        (window.HAETAL_TEXTS || []).forEach(function(m){ applyText(m.key, m.default || ''); });
        render();
        flash('초기화 완료', true);
      }
    }
    if (t === panel) close();
  });

  document.addEventListener('keydown', function(ev){
    if ((ev.ctrlKey || ev.metaKey) && ev.shiftKey && (ev.key === 'A' || ev.key === 'a')) {
      ev.preventDefault();
      if (panel.classList.contains('open')) close(); else open();
    } else if (ev.key === 'Escape' && panel.classList.contains('open')) {
      close();
    }
  });

  /* ---------- helpers ---------- */
  function escapeHtml(s){ return String(s==null?'':s).replace(/[&<>]/g, function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;'})[c];}); }
  function escapeAttr(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];}); }

  /* ---------- bootstrap on DOM ready ---------- */
  function init(){ applyAllTexts(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
