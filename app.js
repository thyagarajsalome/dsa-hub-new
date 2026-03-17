// ── DSA HUB · APP CONTROLLER ──
// Observer pattern for page routing + progress tracking

const App = (() => {
  const visited = new Set(['home']);
  const TOTAL = 13; // excluding home & realworld from topic count

  // ── ROUTER ──
  function navigate(page) {
    const content = document.getElementById('mainContent');

    // Render page
    const renderer = Pages[page] || Pages.home;
    content.innerHTML = renderer();
    content.scrollTop = 0;

    // Update nav
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });

    // Mark visited
    if (page !== 'home') {
      visited.add(page);
      document.querySelectorAll('.nav-item').forEach(el => {
        if (visited.has(el.dataset.page) && el.dataset.page !== 'home') {
          el.classList.add('visited');
        }
      });
      updateProgress();
    }

    // Close sidebar on mobile
    document.getElementById('sidebar').classList.remove('open');

    // Mount visualizers after DOM is ready
    setTimeout(() => mountViz(page), 50);

    // Mount Big-O chart
    if (page === 'complexity') {
      setTimeout(drawBigOChart, 80);
    }
  }

  // ── MOUNT VISUALIZERS ──
  function mountViz(page) {
    const v = Visualizer;
    switch (page) {
      case 'arrays':
        window.arrViz = v.arrayViz('arrCanvas', 'arrLog');
        break;
      case 'linkedlist':
        window.llViz = v.linkedListViz('llCanvas', 'llLog');
        break;
      case 'stack':
        window.stackViz = v.stackViz('stackCanvas', 'stackLog');
        break;
      case 'queue':
        window.queueViz = v.queueViz('queueCanvas', 'queueLog');
        break;
      case 'trees':
        window.treeViz = v.treeViz('treeCanvas', 'treeLog');
        break;
      case 'graphs':
        window.graphViz = v.graphViz('graphCanvas', 'graphLog');
        break;
      case 'hashing':
        window.hashViz = v.hashViz('hashCanvas', 'hashLog');
        break;
      case 'sorting':
        window.sortViz = v.sortingViz('sortCanvas', 'sortLog');
        break;
      case 'searching':
        window.bsViz = v.binarySearchViz('bsCanvas', 'bsLog');
        break;
      case 'recursion':
        window.recViz = v.recursionViz('recCanvas', 'recLog');
        break;
      case 'dp':
        window.dpViz = v.dpViz('dpCanvas', 'dpLog');
        break;
      case 'heap':
        window.heapViz = v.heapViz('heapCanvas', 'heapLog');
        break;
      case 'trie':
        window.trieViz = v.trieViz('trieCanvas', 'trieLog');
        break;
    }
  }

  // ── PROGRESS ──
  function updateProgress() {
    const topics = ['complexity','arrays','linkedlist','stack','queue','trees','graphs','hashing','sorting','searching','recursion','dp','heap','trie'];
    const done = topics.filter(t => visited.has(t)).length;
    const pct = Math.round((done / topics.length) * 100);
    const fill = document.getElementById('globalProgress');
    const lbl  = document.getElementById('progressPct');
    if (fill) fill.style.width = pct + '%';
    if (lbl)  lbl.textContent = `${done} / ${topics.length} topics`;
  }

  // ── BIG-O CHART ──
  function drawBigOChart() {
    const canvas = document.getElementById('bigoCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const n = 20;
    const maxY = 400;

    // Dark background
    ctx.fillStyle = '#111318';
    ctx.fillRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = '#252830';
    ctx.lineWidth = 1;
    for (let y = 0; y <= H; y += 40) {
      ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W - 20, y); ctx.stroke();
    }
    for (let x = 40; x <= W - 20; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H - 30); ctx.stroke();
    }

    const curves = [
      { fn: i => 1,               color: '#4af0b0', label: 'O(1)',      pos: 1 },
      { fn: i => Math.log2(i+1),  color: '#80a0ff', label: 'O(log n)', pos: 1.5 },
      { fn: i => i,               color: '#f0c040', label: 'O(n)',      pos: null },
      { fn: i => i * Math.log2(i+1), color: '#f0c040', label: 'O(n log n)', pos: null, dash: [4,3] },
      { fn: i => i * i,           color: '#f05080', label: 'O(n²)',     pos: null },
    ];

    function toCanvas(i, val) {
      const x = 40 + (i / n) * (W - 60);
      const y = H - 30 - (val / maxY) * (H - 50);
      return [x, Math.max(5, Math.min(H - 30, y))];
    }

    curves.forEach(c => {
      ctx.beginPath();
      ctx.strokeStyle = c.color;
      ctx.lineWidth = 2.5;
      ctx.setLineDash(c.dash || []);
      let first = true;
      for (let i = 1; i <= n; i++) {
        const val = c.fn(i);
        const [x, y] = toCanvas(i, val);
        if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Label at right end
      const lastVal = c.fn(n);
      const [lx, ly] = toCanvas(n, lastVal);
      if (ly > 10 && ly < H - 30) {
        ctx.fillStyle = c.color;
        ctx.font = '11px Space Mono, monospace';
        ctx.fillText(c.label, lx + 6, ly + 4);
      }
    });

    // Axes
    ctx.strokeStyle = '#555d6d';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(40, H - 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, H - 30); ctx.lineTo(W - 20, H - 30); ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#555d6d';
    ctx.font = '10px Space Mono, monospace';
    ctx.fillText('n →', W - 40, H - 12);
    ctx.fillText('ops ↑', 2, 16);
  }

  // ── TAB SWITCHER ──
  function switchTab(btn, panelId) {
    const parent = btn.closest('.content-area') || document.getElementById('mainContent');
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');
  }

  // ── INIT ──
  function init() {
    // Nav clicks
    document.addEventListener('click', e => {
      const navItem = e.target.closest('.nav-item');
      if (navItem && navItem.dataset.page) {
        e.preventDefault();
        navigate(navItem.dataset.page);
      }
      const topicCard = e.target.closest('.topic-card');
      if (topicCard && topicCard.dataset.page) {
        e.preventDefault();
        navigate(topicCard.dataset.page);
      }
    });

    // Hamburger
    document.getElementById('hamburger').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
    });

    // Close sidebar on overlay click
    document.addEventListener('click', e => {
      const sidebar = document.getElementById('sidebar');
      const hamburger = document.getElementById('hamburger');
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== hamburger) {
        sidebar.classList.remove('open');
      }
    });

    // Modal
    document.getElementById('btnClose').addEventListener('click', () => {
      document.getElementById('modalOverlay').classList.remove('open');
    });
    document.getElementById('modalOverlay').addEventListener('click', e => {
      if (e.target === document.getElementById('modalOverlay'))
        document.getElementById('modalOverlay').classList.remove('open');
    });
    document.getElementById('btnCopy').addEventListener('click', () => {
      const code = document.getElementById('modalCode').textContent;
      navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('btnCopy');
        btn.textContent = '✓ Copied!';
        setTimeout(() => btn.textContent = '⎘ Copy', 2000);
      });
    });

    // Keyboard close modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.getElementById('modalOverlay').classList.remove('open');
    });

    // Load home
    navigate('home');
  }

  return { init, navigate, switchTab, drawBigOChart };
})();

// ── BOOT ──
document.addEventListener('DOMContentLoaded', App.init);
