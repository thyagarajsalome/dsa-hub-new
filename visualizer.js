// ── DSA HUB · VISUALIZER MODULE ──
// Factory pattern: each viz returns a DOM element

const Visualizer = (() => {

  // ── ARRAY VISUALIZER ──
  function arrayViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);
    let arr = [15, 8, 23, 4, 42, 16, 7];

    function render(highlights = {}) {
      container.innerHTML = '';
      arr.forEach((v, i) => {
        const cell = document.createElement('div');
        cell.className = 'arr-cell';
        const box = document.createElement('div');
        box.className = 'arr-box' +
          (highlights.highlight === i ? ' highlight' :
           highlights.active === i   ? ' active'    :
           highlights.found === i    ? ' found'     :
           highlights.compare && highlights.compare.includes(i) ? ' compare' :
           highlights.sorted && i >= highlights.sorted ? ' sorted' : '');
        box.textContent = v;
        const idx = document.createElement('div');
        idx.className = 'arr-idx';
        idx.textContent = i;
        cell.appendChild(box);
        cell.appendChild(idx);
        container.appendChild(cell);
      });
    }

    // Search animation
    async function search(target) {
      log.textContent = `Searching for ${target}...`;
      for (let i = 0; i < arr.length; i++) {
        render({ highlight: i });
        log.textContent = `Checking index ${i}: arr[${i}] = ${arr[i]}`;
        await delay(400);
        if (arr[i] === target) {
          render({ found: i });
          log.textContent = `✓ Found ${target} at index ${i}!`;
          return;
        }
      }
      render({});
      log.textContent = `✗ ${target} not found in array.`;
    }

    // Shuffle
    function shuffle() {
      arr = arr.map(v => Math.floor(Math.random() * 60) + 1);
      render({});
      log.textContent = 'Array shuffled!';
    }

    render({});
    return { render, search, shuffle, arr: () => arr };
  }

  // ── LINKED LIST VISUALIZER ──
  function linkedListViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);
    let list = [5, 10, 20, 30];

    function render(highlightIdx = -1) {
      container.innerHTML = '';
      list.forEach((v, i) => {
        const node = document.createElement('div');
        node.className = 'll-node';

        const box = document.createElement('div');
        box.className = 'll-box' + (i === highlightIdx ? ' highlight' : '');

        const val = document.createElement('div');
        val.className = 'll-val';
        val.textContent = v;

        const ptr = document.createElement('div');
        ptr.className = 'll-ptr';
        ptr.textContent = i < list.length - 1 ? '→' : 'null';

        box.appendChild(val);
        box.appendChild(ptr);
        node.appendChild(box);

        if (i < list.length - 1) {
          const arrow = document.createElement('div');
          arrow.className = 'll-arrow';
          arrow.textContent = '→';
          node.appendChild(arrow);
        } else {
          const nil = document.createElement('div');
          nil.className = 'll-null';
          nil.textContent = 'NULL';
          const arrow2 = document.createElement('div');
          arrow2.className = 'll-arrow';
          arrow2.textContent = '→';
          node.appendChild(arrow2);
          node.appendChild(nil);
        }

        container.appendChild(node);
      });
    }

    async function insertFront(val) {
      list.unshift(val);
      render(0);
      log.textContent = `Inserted ${val} at head — O(1) operation`;
    }

    async function insertEnd(val) {
      list.push(val);
      render(list.length - 1);
      log.textContent = `Inserted ${val} at tail — O(n) traversal required`;
    }

    async function traverse() {
      log.textContent = 'Traversing...';
      for (let i = 0; i < list.length; i++) {
        render(i);
        log.textContent = `Visiting node ${i}: data = ${list[i]}`;
        await delay(500);
      }
      render(-1);
      log.textContent = `Traversal complete! Visited ${list.length} nodes — O(n)`;
    }

    function deleteHead() {
      if (!list.length) return;
      const val = list.shift();
      render(-1);
      log.textContent = `Deleted head (${val}) — O(1)`;
    }

    render();
    return { insertFront, insertEnd, traverse, deleteHead };
  }

  // ── STACK VISUALIZER ──
  function stackViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);
    let stack = [];

    function render() {
      container.innerHTML = '';
      const label = document.createElement('div');
      label.style.cssText = 'font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-bottom:8px;letter-spacing:2px;';
      label.textContent = 'TOP';
      container.appendChild(label);

      const viz = document.createElement('div');
      viz.className = 'stack-viz';
      stack.forEach((v, i) => {
        const item = document.createElement('div');
        item.className = 'stack-item' + (i === stack.length - 1 ? ' top-item' : '');
        item.textContent = v;
        viz.appendChild(item);
      });
      if (!stack.length) {
        const empty = document.createElement('div');
        empty.style.cssText = 'color:var(--text3);font-family:var(--font-mono);font-size:12px;';
        empty.textContent = '[ empty ]';
        viz.appendChild(empty);
      }
      container.appendChild(viz);
    }

    function push(val) {
      if (stack.length >= 6) { log.textContent = 'Stack Overflow!'; return; }
      stack.push(val);
      render();
      log.textContent = `push(${val}) → Top is now ${val}`;
    }

    function pop() {
      if (!stack.length) { log.textContent = 'Stack Underflow!'; return; }
      const v = stack.pop();
      render();
      log.textContent = `pop() → Removed ${v}, Top is now ${stack[stack.length-1] ?? 'empty'}`;
    }

    function peek() {
      log.textContent = stack.length
        ? `peek() → ${stack[stack.length-1]} (top element)`
        : 'Stack is empty!';
    }

    render();
    return { push, pop, peek };
  }

  // ── QUEUE VISUALIZER ──
  function queueViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);
    let queue = [1, 2, 3];

    function render() {
      container.innerHTML = '';

      const frontLbl = document.createElement('div');
      frontLbl.style.cssText = 'font-family:var(--font-mono);font-size:9px;color:var(--accent2);letter-spacing:2px;text-align:center;margin-bottom:4px;';
      frontLbl.textContent = 'FRONT (dequeue)';
      container.appendChild(frontLbl);

      const viz = document.createElement('div');
      viz.className = 'queue-viz';

      if (!queue.length) {
        const empty = document.createElement('div');
        empty.style.cssText = 'color:var(--text3);font-family:var(--font-mono);font-size:12px;padding:10px 20px;';
        empty.textContent = '[ empty ]';
        viz.appendChild(empty);
      } else {
        queue.forEach((v, i) => {
          const item = document.createElement('div');
          item.className = 'queue-item' +
            (i === 0 ? ' front' : i === queue.length - 1 ? ' rear' : '');
          item.textContent = v;
          viz.appendChild(item);
          if (i < queue.length - 1) {
            const arr = document.createElement('span');
            arr.style.cssText = 'color:var(--text3);font-size:14px;';
            arr.textContent = '→';
            viz.appendChild(arr);
          }
        });
      }
      container.appendChild(viz);

      const rearLbl = document.createElement('div');
      rearLbl.style.cssText = 'font-family:var(--font-mono);font-size:9px;color:var(--accent);letter-spacing:2px;text-align:right;margin-top:4px;';
      rearLbl.textContent = 'REAR (enqueue)';
      container.appendChild(rearLbl);
    }

    function enqueue(val) {
      if (queue.length >= 7) { log.textContent = 'Queue is full!'; return; }
      queue.push(val);
      render();
      log.textContent = `enqueue(${val}) → Added at rear`;
    }

    function dequeue() {
      if (!queue.length) { log.textContent = 'Queue is empty!'; return; }
      const v = queue.shift();
      render();
      log.textContent = `dequeue() → Removed ${v} from front`;
    }

    render();
    return { enqueue, dequeue };
  }

  // ── SORTING BAR VISUALIZER ──
  function sortingViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);
    let arr = [64, 34, 25, 12, 22, 11, 90, 45];
    let sorting = false;

    function render(state = {}) {
      container.innerHTML = '';
      const wrap = document.createElement('div');
      wrap.className = 'bar-chart';
      const maxV = Math.max(...arr);
      arr.forEach((v, i) => {
        const bw = document.createElement('div');
        bw.className = 'bar-wrap';
        const bar = document.createElement('div');
        bar.className = 'bar' +
          (state.comparing && state.comparing.includes(i) ? ' comparing' :
           state.pivot === i ? ' pivot' :
           state.sorted && state.sorted.includes(i) ? ' sorted' : '');
        bar.style.height = Math.round((v / maxV) * 140) + 'px';
        const lbl = document.createElement('div');
        lbl.className = 'bar-val';
        lbl.textContent = v;
        bw.appendChild(bar);
        bw.appendChild(lbl);
        wrap.appendChild(bw);
      });
      container.appendChild(wrap);
    }

    async function bubbleSort() {
      if (sorting) return;
      sorting = true;
      const sorted = new Set();
      log.textContent = 'Bubble Sort starting...';
      for (let i = 0; i < arr.length - 1; i++) {
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
          render({ comparing: [j, j+1], sorted: [...sorted].map(x=>x) });
          log.textContent = `Comparing arr[${j}]=${arr[j]} and arr[${j+1}]=${arr[j+1]}`;
          await delay(300);
          if (arr[j] > arr[j+1]) {
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            swapped = true;
            render({ comparing: [j, j+1] });
            await delay(200);
          }
        }
        sorted.add(arr.length - 1 - i);
        if (!swapped) break;
      }
      arr.forEach((_, i) => sorted.add(i));
      render({ sorted: [...sorted] });
      log.textContent = '✓ Bubble Sort complete! O(n²) comparisons made.';
      sorting = false;
    }

    async function quickSort() {
      if (sorting) return;
      sorting = true;
      log.textContent = 'Quick Sort starting...';
      await qs(0, arr.length - 1);
      render({ sorted: arr.map((_, i) => i) });
      log.textContent = '✓ Quick Sort complete! O(n log n) average.';
      sorting = false;
    }

    async function qs(low, high) {
      if (low >= high) return;
      let pivot = arr[high];
      let i = low - 1;
      render({ pivot: high });
      log.textContent = `Pivot = ${pivot}`;
      await delay(400);
      for (let j = low; j < high; j++) {
        render({ comparing: [j, high], pivot: high });
        await delay(200);
        if (arr[j] <= pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          render({ comparing: [i, j], pivot: high });
          await delay(200);
        }
      }
      [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
      await qs(low, i);
      await qs(i+2, high);
    }

    async function insertionSort() {
      if (sorting) return;
      sorting = true;
      const sorted = [0];
      for (let i = 1; i < arr.length; i++) {
        let key = arr[i], j = i - 1;
        render({ comparing: [i] });
        log.textContent = `Inserting ${key} into sorted portion`;
        await delay(350);
        while (j >= 0 && arr[j] > key) {
          arr[j+1] = arr[j]; j--;
          render({ comparing: [j+1] });
          await delay(200);
        }
        arr[j+1] = key;
        sorted.push(i);
        render({ sorted: [...sorted] });
        await delay(300);
      }
      render({ sorted: arr.map((_,i)=>i) });
      log.textContent = '✓ Insertion Sort complete! Best for nearly-sorted data.';
      sorting = false;
    }

    function reset() {
      arr = [64, 34, 25, 12, 22, 11, 90, 45];
      render({});
      log.textContent = 'Array reset.';
      sorting = false;
    }

    function shuffle() {
      arr = Array.from({length: 8}, () => Math.floor(Math.random()*80)+5);
      render({});
      log.textContent = 'Shuffled!';
      sorting = false;
    }

    render({});
    return { bubbleSort, quickSort, insertionSort, reset, shuffle };
  }

  // ── BINARY SEARCH VISUALIZER ──
  function binarySearchViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);
    let arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

    function render(state = {}) {
      container.innerHTML = '';
      arr.forEach((v, i) => {
        const cell = document.createElement('div');
        cell.className = 'arr-cell';
        const box = document.createElement('div');
        let cls = 'arr-box';
        if (state.found === i) cls += ' found';
        else if (i === state.mid) cls += ' highlight';
        else if (state.left !== undefined && i >= state.left && i <= state.right) cls += ' active';
        else if (state.left !== undefined) cls += ''; // dim
        box.className = cls;
        box.style.opacity = (state.left !== undefined && (i < state.left || i > state.right) && state.found !== i) ? '0.3' : '1';
        box.textContent = v;
        const idx = document.createElement('div');
        idx.className = 'arr-idx';
        idx.textContent = i;
        cell.appendChild(box);
        cell.appendChild(idx);
        container.appendChild(cell);
      });
    }

    async function search(target) {
      let left = 0, right = arr.length - 1;
      log.textContent = `Searching for ${target}...`;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        render({ left, right, mid });
        log.textContent = `L=${left} M=${mid} R=${right} → arr[${mid}]=${arr[mid]}`;
        await delay(700);
        if (arr[mid] === target) {
          render({ found: mid });
          log.textContent = `✓ Found ${target} at index ${mid}! (${Math.log2(arr.length).toFixed(0)} steps max)`;
          return;
        }
        if (arr[mid] < target) { left = mid + 1; log.textContent += ' → Go RIGHT'; }
        else                    { right = mid - 1; log.textContent += ' → Go LEFT'; }
        await delay(400);
      }
      render({});
      log.textContent = `✗ ${target} not found!`;
    }

    render();
    return { search };
  }

  // ── TREE SVG VISUALIZER ──
  function treeViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);

    const tree = {
      val: 50,
      left: {
        val: 30,
        left: { val: 20, left: null, right: null },
        right: { val: 40, left: null, right: null }
      },
      right: {
        val: 70,
        left: { val: 60, left: null, right: null },
        right: { val: 80, left: null, right: null }
      }
    };

    let highlighted = new Set();

    function getPositions(node, x, y, dx) {
      if (!node) return [];
      const nodes = [{ val: node.val, x, y }];
      if (node.left)  nodes.push(...getPositions(node.left,  x - dx, y + 70, dx * 0.55));
      if (node.right) nodes.push(...getPositions(node.right, x + dx, y + 70, dx * 0.55));
      return nodes;
    }

    function getEdges(node, x, y, dx) {
      if (!node) return [];
      const edges = [];
      if (node.left) {
        edges.push({ x1: x, y1: y, x2: x - dx, y2: y + 70 });
        edges.push(...getEdges(node.left, x - dx, y + 70, dx * 0.55));
      }
      if (node.right) {
        edges.push({ x1: x, y1: y, x2: x + dx, y2: y + 70 });
        edges.push(...getEdges(node.right, x + dx, y + 70, dx * 0.55));
      }
      return edges;
    }

    function render() {
      const positions = getPositions(tree, 300, 50, 110);
      const edges     = getEdges(tree, 300, 50, 110);
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 600 240');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '240');

      edges.forEach(e => {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', e.x1); line.setAttribute('y1', e.y1);
        line.setAttribute('x2', e.x2); line.setAttribute('y2', e.y2);
        line.setAttribute('stroke', '#252830');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
      });

      positions.forEach(p => {
        const isHl = highlighted.has(p.val);
        const g = document.createElementNS(svgNS, 'g');
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', p.x); circle.setAttribute('cy', p.y); circle.setAttribute('r', '22');
        circle.setAttribute('fill', isHl ? 'rgba(240,192,64,0.2)' : 'var(--bg3)');
        circle.setAttribute('stroke', isHl ? 'var(--accent)' : 'var(--border)');
        circle.setAttribute('stroke-width', isHl ? '2.5' : '1.5');
        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', p.x); text.setAttribute('y', p.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-family', 'Space Mono, monospace');
        text.setAttribute('font-size', '13');
        text.setAttribute('font-weight', '700');
        text.setAttribute('fill', isHl ? 'var(--accent)' : '#abb2bf');
        text.textContent = p.val;
        g.appendChild(circle); g.appendChild(text);
        svg.appendChild(g);
      });

      container.innerHTML = '';
      container.appendChild(svg);
    }

    async function inorder(node) {
      if (!node) return;
      await inorder(node.left);
      highlighted.add(node.val);
      render();
      log.textContent = `Visiting: ${node.val} | Inorder so far: ${[...highlighted].sort((a,b)=>a-b).join(' → ')}`;
      await delay(500);
      await inorder(node.right);
    }

    async function runInorder() {
      highlighted.clear();
      log.textContent = 'Starting Inorder traversal (Left → Root → Right)...';
      await inorder(tree);
      log.textContent = `✓ Inorder complete: ${[...highlighted].sort((a,b)=>a-b).join(' → ')} (sorted!)`;
    }

    async function search(target) {
      highlighted.clear();
      let node = tree;
      log.textContent = `Searching BST for ${target}...`;
      while (node) {
        highlighted.add(node.val);
        render();
        await delay(500);
        if (node.val === target) {
          log.textContent = `✓ Found ${target}! BST search is O(log n) — only ${highlighted.size} nodes checked.`;
          return;
        }
        log.textContent = `At ${node.val}: ${target} < ${node.val} ? Go ${target < node.val ? 'LEFT' : 'RIGHT'}`;
        node = target < node.val ? node.left : node.right;
      }
      log.textContent = `✗ ${target} not found.`;
    }

    render();
    return { runInorder, search };
  }

  // ── GRAPH BFS/DFS ──
  function graphViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);

    const nodes = [
      { id: 0, x: 120, y: 70,  label: 'A' },
      { id: 1, x: 280, y: 60,  label: 'B' },
      { id: 2, x: 420, y: 80,  label: 'C' },
      { id: 3, x: 80,  y: 180, label: 'D' },
      { id: 4, x: 240, y: 180, label: 'E' },
      { id: 5, x: 380, y: 190, label: 'F' },
    ];
    const edges = [[0,1],[0,3],[1,2],[1,4],[2,5],[3,4],[4,5]];
    let visited = new Set();
    let edgeVisited = new Set();

    function render() {
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 520 250');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '250');

      edges.forEach(([u, v]) => {
        const key = `${u}-${v}`;
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', nodes[u].x); line.setAttribute('y1', nodes[u].y);
        line.setAttribute('x2', nodes[v].x); line.setAttribute('y2', nodes[v].y);
        line.setAttribute('stroke', edgeVisited.has(key) ? 'var(--accent)' : 'var(--border)');
        line.setAttribute('stroke-width', edgeVisited.has(key) ? '3' : '2');
        svg.appendChild(line);
      });

      nodes.forEach(n => {
        const isV = visited.has(n.id);
        const g = document.createElementNS(svgNS, 'g');
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx', n.x); circle.setAttribute('cy', n.y); circle.setAttribute('r', '20');
        circle.setAttribute('fill', isV ? 'rgba(240,192,64,0.2)' : 'var(--bg3)');
        circle.setAttribute('stroke', isV ? 'var(--accent)' : 'var(--border)');
        circle.setAttribute('stroke-width', '2');
        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x', n.x); text.setAttribute('y', n.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-family', 'Space Mono, monospace');
        text.setAttribute('font-size', '14'); text.setAttribute('font-weight', '700');
        text.setAttribute('fill', isV ? 'var(--accent)' : '#abb2bf');
        text.textContent = n.label;
        g.appendChild(circle); g.appendChild(text);
        svg.appendChild(g);
      });

      container.innerHTML = '';
      container.appendChild(svg);
    }

    function getAdjacent(id) {
      return edges
        .filter(([u,v]) => u===id || v===id)
        .map(([u,v]) => u===id ? v : u);
    }

    async function bfs() {
      visited.clear(); edgeVisited.clear();
      const queue = [0]; visited.add(0);
      const order = [];
      log.textContent = 'BFS: Level-by-level traversal from A...';
      render();
      await delay(400);
      while (queue.length) {
        const cur = queue.shift();
        order.push(nodes[cur].label);
        render();
        log.textContent = `BFS visiting: ${nodes[cur].label} | Order so far: ${order.join(' → ')}`;
        await delay(500);
        for (const nb of getAdjacent(cur)) {
          if (!visited.has(nb)) {
            visited.add(nb);
            edgeVisited.add(`${Math.min(cur,nb)}-${Math.max(cur,nb)}`);
            queue.push(nb);
          }
        }
      }
      log.textContent = `✓ BFS complete: ${order.join(' → ')}. Uses: Shortest path, Social networks`;
    }

    async function dfs() {
      visited.clear(); edgeVisited.clear();
      const order = [];
      log.textContent = 'DFS: Depth-first traversal from A...';
      render();
      async function dfsRec(id) {
        visited.add(id);
        order.push(nodes[id].label);
        render();
        log.textContent = `DFS visiting: ${nodes[id].label} | Order: ${order.join(' → ')}`;
        await delay(500);
        for (const nb of getAdjacent(id)) {
          if (!visited.has(nb)) {
            edgeVisited.add(`${Math.min(id,nb)}-${Math.max(id,nb)}`);
            await dfsRec(nb);
          }
        }
      }
      await dfsRec(0);
      log.textContent = `✓ DFS complete: ${order.join(' → ')}. Uses: Maze solving, topological sort`;
    }

    function reset() {
      visited.clear(); edgeVisited.clear();
      render();
      log.textContent = 'Graph reset.';
    }

    render();
    return { bfs, dfs, reset };
  }

  // ── HASH TABLE VISUALIZER ──
  function hashViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);
    const SIZE = 7;
    let table = Array(SIZE).fill(null).map(() => []);

    function hashFn(key) {
      let h = 0;
      for (let c of key) h = (h * 31 + c.charCodeAt(0)) % SIZE;
      return h;
    }

    function render(highlight = -1) {
      const wrap = document.createElement('div');
      wrap.className = 'hash-table';
      table.forEach((slot, i) => {
        const idx = document.createElement('div');
        idx.className = 'hash-idx';
        idx.textContent = i;
        if (i === highlight) {
          idx.style.borderColor = 'var(--accent)';
          idx.style.color = 'var(--accent)';
        }
        const slotEl = document.createElement('div');
        slotEl.className = 'hash-slot' + (slot.length ? ' filled' : '');
        if (i === highlight) slotEl.style.borderColor = 'var(--accent)';
        slot.forEach(kv => {
          const kvEl = document.createElement('div');
          kvEl.className = 'hash-kv';
          kvEl.textContent = `${kv.k}:${kv.v}`;
          slotEl.appendChild(kvEl);
        });
        wrap.appendChild(idx);
        wrap.appendChild(slotEl);
      });
      container.innerHTML = '';
      container.appendChild(wrap);
    }

    async function insert(key, val) {
      const idx = hashFn(key);
      const existing = table[idx].findIndex(kv => kv.k === key);
      if (existing >= 0) table[idx][existing].v = val;
      else table[idx].push({ k: key, v: val });
      render(idx);
      log.textContent = `hash("${key}") = ${idx} → Inserted {${key}: ${val}}`;
    }

    async function search(key) {
      const idx = hashFn(key);
      render(idx);
      const found = table[idx].find(kv => kv.k === key);
      log.textContent = found
        ? `hash("${key}") = ${idx} → Found! Value = ${found.v}`
        : `hash("${key}") = ${idx} → Not found`;
    }

    // Pre-populate
    insert('name', 'Alice');
    insert('age', 25);
    insert('city', 'Delhi');

    return { insert, search };
  }

  // ── RECURSION: FIBONACCI TREE ──
  function recursionViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);

    function buildFibTree(n, x, y, dx) {
      if (n < 0) return [];
      const nodes = [{ n, x, y }];
      const base = n <= 1;
      if (!base) {
        nodes.push(...buildFibTree(n-1, x - dx, y+65, dx*0.55));
        nodes.push(...buildFibTree(n-2, x + dx, y+65, dx*0.55));
      }
      return nodes;
    }

    function buildFibEdges(n, x, y, dx) {
      if (n <= 1) return [];
      const edges = [
        { x1: x, y1: y, x2: x - dx, y2: y + 65 },
        { x1: x, y1: y, x2: x + dx, y2: y + 65 },
      ];
      edges.push(...buildFibEdges(n-1, x-dx, y+65, dx*0.55));
      edges.push(...buildFibEdges(n-2, x+dx, y+65, dx*0.55));
      return edges;
    }

    function render(n) {
      if (n > 5) n = 5;
      const nodes = buildFibTree(n, 300, 40, 120);
      const edges = buildFibEdges(n, 300, 40, 120);
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 600 280');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '260');

      edges.forEach(e => {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1',e.x1);line.setAttribute('y1',e.y1);
        line.setAttribute('x2',e.x2);line.setAttribute('y2',e.y2);
        line.setAttribute('stroke','#252830');line.setAttribute('stroke-width','1.5');
        svg.appendChild(line);
      });

      nodes.forEach(p => {
        const base = p.n <= 1;
        const g = document.createElementNS(svgNS, 'g');
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx',p.x);circle.setAttribute('cy',p.y);circle.setAttribute('r','18');
        circle.setAttribute('fill', base ? 'rgba(74,240,176,0.15)' : 'var(--bg3)');
        circle.setAttribute('stroke', base ? 'var(--accent2)' : 'var(--border)');
        circle.setAttribute('stroke-width','1.5');
        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x',p.x);text.setAttribute('y',p.y+5);
        text.setAttribute('text-anchor','middle');
        text.setAttribute('font-family','Space Mono');text.setAttribute('font-size','11');
        text.setAttribute('fill', base ? 'var(--accent2)' : '#abb2bf');
        text.textContent = `F(${p.n})`;
        g.appendChild(circle);g.appendChild(text);
        svg.appendChild(g);
      });

      container.innerHTML = '';
      container.appendChild(svg);
      log.textContent = `Fibonacci call tree for F(${n}) — shows overlapping subproblems!`;
    }

    render(4);
    return { render };
  }

  // ── DP TABLE VISUALIZER ──
  function dpViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);

    async function coinChange(coins, amount) {
      const dp = Array(amount + 1).fill(amount + 1);
      dp[0] = 0;
      log.textContent = 'Building DP table for Coin Change...';

      for (let step = 1; step <= amount; step++) {
        for (const c of coins) {
          if (c <= step && dp[step - c] + 1 < dp[step]) {
            dp[step] = dp[step - c] + 1;
          }
        }
        renderTable(dp, amount, step);
        log.textContent = `dp[${step}] = ${dp[step] > amount ? '∞' : dp[step]} coins`;
        await delay(180);
      }
      log.textContent = `✓ Min coins for ${amount}: ${dp[amount]}. Used coins: ${coins.join(', ')}`;
    }

    function renderTable(dp, amount, current) {
      const wrap = document.createElement('div');
      wrap.style.overflowX = 'auto';
      const table = document.createElement('table');
      table.className = 'dp-table';

      const hRow = document.createElement('tr');
      for (let i = 0; i <= amount; i++) {
        const th = document.createElement('th');
        th.textContent = i;
        hRow.appendChild(th);
      }
      table.appendChild(hRow);

      const dRow = document.createElement('tr');
      for (let i = 0; i <= amount; i++) {
        const td = document.createElement('td');
        td.textContent = dp[i] > amount ? '∞' : dp[i];
        if (i === current) td.className = 'current';
        else if (dp[i] <= amount) td.className = 'filled';
        dRow.appendChild(td);
      }
      table.appendChild(dRow);
      wrap.appendChild(table);
      container.innerHTML = '';
      container.appendChild(wrap);
    }

    return { coinChange };
  }

  // ── HEAP VISUALIZER ──
  function heapViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);
    let heap = [10, 8, 7, 5, 3, 6, 2];

    function getPositions() {
      const pos = [];
      const levels = Math.ceil(Math.log2(heap.length + 1));
      heap.forEach((v, i) => {
        const level = Math.floor(Math.log2(i + 1));
        const posInLevel = i - (Math.pow(2, level) - 1);
        const totalInLevel = Math.pow(2, level);
        const x = (posInLevel + 0.5) / totalInLevel * 500 + 50;
        const y = level * 65 + 40;
        pos.push({ v, i, x, y });
      });
      return pos;
    }

    function render(highlight = -1) {
      const positions = getPositions();
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 600 200');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '200');

      // Draw edges
      positions.forEach(p => {
        const leftIdx = 2 * p.i + 1, rightIdx = 2 * p.i + 2;
        [leftIdx, rightIdx].forEach(ci => {
          if (ci < heap.length) {
            const ch = positions[ci];
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1',p.x);line.setAttribute('y1',p.y);
            line.setAttribute('x2',ch.x);line.setAttribute('y2',ch.y);
            line.setAttribute('stroke','#252830');line.setAttribute('stroke-width','2');
            svg.appendChild(line);
          }
        });
      });

      positions.forEach(p => {
        const hl = p.i === highlight || p.i === 0;
        const g = document.createElementNS(svgNS, 'g');
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx',p.x);circle.setAttribute('cy',p.y);circle.setAttribute('r','20');
        circle.setAttribute('fill', p.i===0 ? 'rgba(240,192,64,0.2)' : p.i===highlight ? 'rgba(74,240,176,0.15)' : 'var(--bg3)');
        circle.setAttribute('stroke', p.i===0 ? 'var(--accent)' : p.i===highlight ? 'var(--accent2)' : 'var(--border)');
        circle.setAttribute('stroke-width','1.5');
        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x',p.x);text.setAttribute('y',p.y+5);
        text.setAttribute('text-anchor','middle');
        text.setAttribute('font-family','Space Mono');text.setAttribute('font-size','13');text.setAttribute('font-weight','700');
        text.setAttribute('fill', p.i===0 ? 'var(--accent)' : '#abb2bf');
        text.textContent = p.v;
        g.appendChild(circle);g.appendChild(text);
        svg.appendChild(g);
      });

      container.innerHTML = '';
      container.appendChild(svg);
    }

    async function insert(val) {
      heap.push(val);
      let i = heap.length - 1;
      log.textContent = `Inserting ${val}... bubbling up`;
      render(i);
      while (i > 0) {
        const parent = Math.floor((i - 1) / 2);
        if (heap[parent] < heap[i]) {
          [heap[parent], heap[i]] = [heap[i], heap[parent]];
          i = parent;
          render(i);
          log.textContent = `Swapped with parent — heap property maintained`;
          await delay(500);
        } else break;
      }
      render(-1);
      log.textContent = `✓ Inserted ${val}. Max = ${heap[0]}`;
    }

    async function extractMax() {
      if (!heap.length) return;
      const max = heap[0];
      heap[0] = heap.pop();
      let i = 0;
      log.textContent = `Extracting max (${max})... heapifying down`;
      render(0);
      await delay(400);
      while (true) {
        const l = 2*i+1, r = 2*i+2;
        let largest = i;
        if (l < heap.length && heap[l] > heap[largest]) largest = l;
        if (r < heap.length && heap[r] > heap[largest]) largest = r;
        if (largest === i) break;
        [heap[largest], heap[i]] = [heap[i], heap[largest]];
        i = largest;
        render(i);
        await delay(400);
      }
      render(-1);
      log.textContent = `✓ Extracted ${max}. New max = ${heap[0]}`;
    }

    render();
    return { insert, extractMax };
  }

  // ── TRIE VISUALIZER ──
  function trieViz(containerId, logId) {
    const container = document.getElementById(containerId);
    const log       = document.getElementById(logId);

    // Build trie from words
    const words = ['app', 'apple', 'apt', 'bat', 'ball'];
    const root = { char: '', children: {}, end: false };

    words.forEach(word => {
      let node = root;
      for (const ch of word) {
        if (!node.children[ch]) node.children[ch] = { char: ch, children: {}, end: false };
        node = node.children[ch];
      }
      node.end = true;
    });

    let highlightedPath = new Set();

    function getNodes(node, x, y, dx, depth) {
      const result = [{ char: node.char || 'ROOT', x, y, end: node.end, depth }];
      const keys = Object.keys(node.children);
      const total = keys.length;
      keys.forEach((k, i) => {
        const childX = x + (i - (total-1)/2) * dx;
        result.push({ from: { x, y }, to: { x: childX, y: y+65 }, char: k });
        result.push(...getNodes(node.children[k], childX, y+65, dx/Math.max(1,total*0.6), depth+1));
      });
      return result;
    }

    function render() {
      const items = getNodes(root, 280, 35, 120, 0);
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 560 230');
      svg.setAttribute('width','100%');svg.setAttribute('height','230');

      items.filter(i => i.from).forEach(item => {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1',item.from.x);line.setAttribute('y1',item.from.y);
        line.setAttribute('x2',item.to.x);line.setAttribute('y2',item.to.y);
        line.setAttribute('stroke', highlightedPath.has(item.char) ? 'var(--accent)' : '#252830');
        line.setAttribute('stroke-width','2');
        svg.appendChild(line);
        // edge label
        const lbl = document.createElementNS(svgNS, 'text');
        lbl.setAttribute('x',(item.from.x+item.to.x)/2+6);
        lbl.setAttribute('y',(item.from.y+item.to.y)/2);
        lbl.setAttribute('font-family','Space Mono');lbl.setAttribute('font-size','10');
        lbl.setAttribute('fill', highlightedPath.has(item.char) ? 'var(--accent)' : 'var(--text3)');
        lbl.textContent = item.char;
        svg.appendChild(lbl);
      });

      items.filter(i => !i.from).forEach(item => {
        const g = document.createElementNS(svgNS, 'g');
        const isHL = highlightedPath.has(item.char) || item.char === 'ROOT';
        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('cx',item.x);circle.setAttribute('cy',item.y);circle.setAttribute('r','18');
        circle.setAttribute('fill', item.end ? 'rgba(74,240,176,0.15)' : 'var(--bg3)');
        circle.setAttribute('stroke', item.end ? 'var(--accent2)' : '#252830');
        circle.setAttribute('stroke-width','1.5');
        const text = document.createElementNS(svgNS, 'text');
        text.setAttribute('x',item.x);text.setAttribute('y',item.y+5);
        text.setAttribute('text-anchor','middle');
        text.setAttribute('font-family','Space Mono');text.setAttribute('font-size','11');text.setAttribute('font-weight','700');
        text.setAttribute('fill', item.end ? 'var(--accent2)' : '#5c6370');
        text.textContent = item.char === 'ROOT' ? '◉' : '';
        g.appendChild(circle);g.appendChild(text);
        svg.appendChild(g);
      });

      container.innerHTML = '';
      container.appendChild(svg);
    }

    async function searchWord(word) {
      highlightedPath.clear();
      log.textContent = `Searching for "${word}"...`;
      let node = root;
      for (const ch of word) {
        if (!node.children[ch]) {
          render();
          log.textContent = `✗ Prefix "${word.slice(0, highlightedPath.size+1)}" not found`;
          return;
        }
        highlightedPath.add(ch);
        render();
        log.textContent = `Following '${ch}' → ...`;
        await delay(400);
        node = node.children[ch];
      }
      render();
      log.textContent = node.end
        ? `✓ "${word}" found! O(${word.length}) time — length of word only`
        : `"${word}" is a prefix but not a complete word`;
    }

    render();
    return { searchWord };
  }

  // Helper
  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  return {
    arrayViz, linkedListViz, stackViz, queueViz,
    sortingViz, binarySearchViz, treeViz,
    graphViz, hashViz, recursionViz, dpViz,
    heapViz, trieViz
  };
})();
