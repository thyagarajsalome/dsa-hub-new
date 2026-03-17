// ── DSA HUB · PAGES MODULE ──
// Template Method pattern: each page builds on a common layout

const Pages = (() => {

  function showCode(title, codeKey, lang) {
    const langNames = { c: 'C', cpp: 'C++', js: 'JavaScript' };
    document.getElementById('modalTitle').textContent = `${title} — ${langNames[lang]} Implementation`;
    document.getElementById('modalCode').innerHTML = syntaxHighlight(DSA.code[codeKey][lang]);
    document.getElementById('modalOverlay').classList.add('open');
  }

  function syntaxHighlight(code) {
    if (!code) return '';
    return code
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/(\/\/[^\n]*)/g,'<span class="cm">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g,'<span class="cm">$1</span>')
      // Added JS and C++ keywords to the highlight block
      .replace(/\b(int|char|float|double|void|return|if|else|while|for|break|continue|struct|typedef|NULL|include|define|malloc|free|sizeof|printf|scanf|let|const|var|function|class|new|this|cout|cin|endl|vector|namespace|using|public|private|std|nullptr|console|log|push|pop|shift|unshift|length)\b/g,'<span class="kw">$1</span>')
      .replace(/\b([a-z_][a-z_0-9]*)\s*(?=\()/g,'<span class="fn">$1</span>')
      .replace(/\b(\d+)\b/g,'<span class="num">$1</span>')
      .replace(/"([^"]*)"/g,'<span class="str">"$1"</span>')
      .replace(/'([^']*)'/g,'<span class="str">\'$1\'</span>');
  }

  function codeBlock(title, codeKey) {
    const defaultLang = 'c';
    const cCode = DSA.code[codeKey][defaultLang];
    return `
    <div class="code-snippet" data-key="${codeKey}">
      <div class="code-header">
        <select class="code-lang-select" onchange="Pages.updateCodeBlock(this, '${title}')">
          <option value="c" selected>C</option>
          <option value="cpp">C++</option>
          <option value="js">JavaScript</option>
        </select>
        <button class="code-btn" onclick="Pages.showCode('${title}', '${codeKey}', '${defaultLang}')">
          ⊞ View Full Code
        </button>
      </div>
      <pre class="code-preview">${syntaxHighlight(cCode.split('\n').slice(0,12).join('\n'))}
<span class="cm">  // ... (click to view full implementation)</span></pre>
    </div>`;
  }

  function updateCodeBlock(selectElem, title) {
    const lang = selectElem.value;
    const container = selectElem.closest('.code-snippet');
    const codeKey = container.dataset.key;
    const codeStr = DSA.code[codeKey][lang];
    
    // Update preview block
    const pre = container.querySelector('.code-preview');
    pre.innerHTML = syntaxHighlight(codeStr.split('\n').slice(0,12).join('\n')) + '\n<span class="cm">  // ... (click to view full implementation)</span>';
    
    // Update modal button onclick event
    const btn = container.querySelector('.code-btn');
    btn.setAttribute('onclick', `Pages.showCode('${title}', '${codeKey}', '${lang}')`);
  }

  function complexityRow(chips) {
    return `<div class="complexity-row">${chips.map(([label,val,color])=>
      `<div class="cplx-chip">
        <span class="cplx-label">${label}</span>
        <span class="cplx-val ${color}">${val}</span>
      </div>`).join('')}</div>`;
  }

  // ────────────── HOME ──────────────
  function home() {
    return `
    <div class="home-hero animate-in">
      <h1>Master <span>Data Structures</span><br/>& Algorithms</h1>
      <p>An interactive learning platform for BCA students. Visualize, code, and understand every DSA concept from scratch — with real C implementations.</p>
      <div class="hero-tags">
        <span class="hero-tag">13 Topics</span>
        <span class="hero-tag">C Language</span>
        <span class="hero-tag">Interactive Viz</span>
        <span class="hero-tag">Real World Uses</span>
        <span class="hero-tag">BCA Friendly</span>
      </div>
    </div>
    <div class="content-area animate-in">
      <div class="section-title">All Topics</div>
      <div class="topic-grid">
        ${DSA.topics.filter(t=>t.id!=='home').map(t=>`
        <a class="topic-card" href="#" data-page="${t.id}">
          <div class="topic-card-icon">${t.icon}</div>
          <div class="topic-card-name">${t.name}</div>
          <div class="topic-card-desc">${t.desc}</div>
        </a>`).join('')}
      </div>
    </div>`;
  }

  // ────────────── COMPLEXITY ──────────────
  function complexity() {
    return `
    <div class="page-hero animate-in" data-glyph="O(n)">
      <span class="page-tag">Foundation</span>
      <h1 class="page-title">Big-O Complexity</h1>
      <p class="page-desc">Measure how algorithm performance scales with input size. The language of efficiency.</p>
    </div>
    <div class="content-area animate-in">
      <div class="section-title">Complexity Classes</div>
      <div class="card-grid">
        ${[
          ['O(1)', 'Constant','Array access, hash lookup','Easy','o1'],
          ['O(log n)','Logarithmic','Binary search, BST ops','Easy','ologn'],
          ['O(n)','Linear','Traversal, linear search','Easy','on'],
          ['O(n log n)','Linearithmic','Merge sort, heap sort','Med','ologn'],
          ['O(n²)','Quadratic','Bubble sort, naive string match','Med','on2'],
          ['O(2ⁿ)','Exponential','Naive Fibonacci, power set','Hard','on2'],
        ].map(([o,name,ex,badge,cls])=>`
        <div class="card">
          <div class="card-icon" style="font-family:var(--font-mono);font-size:22px;color:var(--${cls==='o1'?'accent2':cls==='ologn'?'accent4':cls==='on'?'accent':'accent3'})">${o}</div>
          <div class="card-title">${name}</div>
          <div class="card-desc">${ex}</div>
          <span class="card-badge badge-${badge.toLowerCase()==='easy'?'easy':badge.toLowerCase()==='med'?'med':'hard'}">${badge}</span>
        </div>`).join('')}
      </div>

      <div class="section-title">Growth Rate Chart</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Big-O Growth Curves (n = 1 to 20)</span>
        </div>
        <div class="viz-canvas" style="padding:16px">
          <canvas id="bigoCanvas" width="700" height="240" style="width:100%;height:240px;"></canvas>
        </div>
      </div>

      <div class="section-title">Complexity Comparison Table</div>
      <table class="cmp-table">
        <tr><th>Data Structure</th><th>Access</th><th>Search</th><th>Insertion</th><th>Deletion</th></tr>
        ${[
          ['Array', 'O(1)', 'O(n)', 'O(n)', 'O(n)'],
          ['Linked List', 'O(n)', 'O(n)', 'O(1)*', 'O(1)*'],
          ['Stack/Queue', 'O(n)', 'O(n)', 'O(1)', 'O(1)'],
          ['Hash Table', 'O(1)*', 'O(1)*', 'O(1)*', 'O(1)*'],
          ['BST (avg)', 'O(log n)', 'O(log n)', 'O(log n)', 'O(log n)'],
          ['Heap', 'O(1)*', 'O(n)', 'O(log n)', 'O(log n)'],
        ].map(([ds,...ops])=>`
        <tr>
          <td style="font-weight:600">${ds}</td>
          ${ops.map(o=>`<td class="${o.includes('1)')&&!o.includes('n')?'o1':o.includes('log')&&!o.includes('n²')?'ologn':o.includes('n)')||o.includes('n)*')?'on':'on2'}">${o}</td>`).join('')}
        </tr>`).join('')}
      </table>

      <div class="info-box yellow">
        <h4>💡 Golden Rule</h4>
        <p>Drop constants and lower-order terms. O(3n + 5) = O(n). We care about the <strong>rate of growth</strong>, not the exact count.</p>
      </div>
    </div>`;
  }

  // ────────────── ARRAYS ──────────────
  function arrays() {
    return `
    <div class="page-hero animate-in" data-glyph="[ ]">
      <span class="page-tag">Linear Structure</span>
      <h1 class="page-title">Arrays</h1>
      <p class="page-desc">Contiguous block of memory. The most fundamental data structure. Index = instant access.</p>
    </div>
    <div class="content-area animate-in">
      ${complexityRow([['Access','O(1)','o1'],['Search','O(n)','on'],['Insert','O(n)','on'],['Delete','O(n)','on'],['Space','O(n)','ologn']])}

      <div class="section-title">Interactive Array Visualizer</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Array operations demo</span>
          <input type="number" id="searchVal" value="23" min="1" max="99"/>
          <button class="btn btn-primary" onclick="window.arrViz.search(parseInt(document.getElementById('searchVal').value))">Search</button>
          <button class="btn btn-secondary" onclick="window.arrViz.shuffle()">Shuffle</button>
        </div>
        <div class="viz-canvas" id="arrCanvas"></div>
        <div class="viz-log" id="arrLog">Click Search to find a value using linear search.</div>
      </div>

      ${codeBlock('Arrays', 'array_basics')}

      <div class="section-title">Key Properties</div>
      <div class="card-grid">
        ${[
          ['▦','Zero-indexed','arr[0] is first, arr[n-1] is last'],
          ['⚡','O(1) Random Access','Know the index? Get it instantly'],
          ['📦','Fixed Size','Declared once; size cannot change (in C)'],
          ['🔗','Contiguous Memory','All elements stored one after another'],
        ].map(([i,t,d])=>`<div class="card"><div class="card-icon">${i}</div><div class="card-title">${t}</div><div class="card-desc">${d}</div></div>`).join('')}
      </div>

      <div class="info-box green">
        <h4>🌍 Real World Uses</h4>
        <ul>
          <li><strong>Image pixels</strong> — A 1080p image is a 2D array of 1920×1080 pixels</li>
          <li><strong>Spreadsheets</strong> — Excel cells are a 2D array of values</li>
          <li><strong>Leaderboards</strong> — Sorted array of player scores</li>
        </ul>
      </div>
    </div>`;
  }

  // ────────────── LINKED LIST ──────────────
  function linkedlist() {
    return `
    <div class="page-hero animate-in" data-glyph="→">
      <span class="page-tag">Linear Structure</span>
      <h1 class="page-title">Linked Lists</h1>
      <p class="page-desc">Dynamic nodes connected by pointers. Insert & delete at head in O(1) — no shifting needed.</p>
    </div>
    <div class="content-area animate-in">
      ${complexityRow([['Head Insert','O(1)','o1'],['Search','O(n)','on'],['Tail Insert','O(n)','on'],['Delete','O(n)','on'],['Space','O(n)','ologn']])}

      <div class="section-title">Interactive Linked List</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Linked list operations</span>
          <button class="btn btn-primary" onclick="window.llViz.insertFront(Math.floor(Math.random()*90)+1)">Insert Front</button>
          <button class="btn btn-green" onclick="window.llViz.insertEnd(Math.floor(Math.random()*90)+1)">Insert End</button>
          <button class="btn btn-secondary" onclick="window.llViz.traverse()">Traverse</button>
          <button class="btn btn-red" onclick="window.llViz.deleteHead()">Delete Head</button>
        </div>
        <div class="viz-canvas" id="llCanvas" style="overflow-x:auto;flex-wrap:nowrap;justify-content:flex-start;padding:28px 24px;"></div>
        <div class="viz-log" id="llLog">Click operations above to interact.</div>
      </div>

      ${codeBlock('Linked List', 'linkedlist_basics')}

      <div class="section-title">Types of Linked Lists</div>
      <div class="card-grid">
        ${[
          ['Singly Linked','A → B → C → NULL','Each node points to next only','Easy'],
          ['Doubly Linked','NULL ← A ⇄ B ⇄ C → NULL','Each node points both ways','Med'],
          ['Circular','A → B → C → A','Last node points back to head','Med'],
        ].map(([t,diag,d,badge])=>`
        <div class="card">
          <div class="card-title">${t}</div>
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--accent4);margin:8px 0;">${diag}</div>
          <div class="card-desc">${d}</div>
          <span class="card-badge badge-${badge.toLowerCase()==='easy'?'easy':'med'}">${badge}</span>
        </div>`).join('')}
      </div>

      <div class="info-box">
        <h4>💡 Array vs Linked List</h4>
        <ul>
          <li>Arrays: Fast access O(1), slow insert/delete O(n)</li>
          <li>Linked Lists: Slow access O(n), fast head insert O(1)</li>
          <li>Use arrays when you read more than write</li>
          <li>Use linked lists when you insert/delete frequently</li>
        </ul>
      </div>
    </div>`;
  }

  // ────────────── STACK ──────────────
  function stack() {
    return `
    <div class="page-hero animate-in" data-glyph="LIFO">
      <span class="page-tag">Linear Structure</span>
      <h1 class="page-title">Stacks</h1>
      <p class="page-desc">Last In, First Out. Like a stack of plates — you can only add or remove from the top.</p>
    </div>
    <div class="content-area animate-in">
      ${complexityRow([['Push','O(1)','o1'],['Pop','O(1)','o1'],['Peek','O(1)','o1'],['Search','O(n)','on'],['Space','O(n)','ologn']])}

      <div class="section-title">Interactive Stack</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Stack: Last In, First Out</span>
          <input type="number" id="stackVal" value="42" min="1" max="99"/>
          <button class="btn btn-primary" onclick="window.stackViz.push(parseInt(document.getElementById('stackVal').value)||42)">Push</button>
          <button class="btn btn-red" onclick="window.stackViz.pop()">Pop</button>
          <button class="btn btn-secondary" onclick="window.stackViz.peek()">Peek</button>
        </div>
        <div class="viz-canvas" id="stackCanvas" style="flex-direction:column;gap:0;padding:20px 24px;"></div>
        <div class="viz-log" id="stackLog">Click Push to add elements to the stack.</div>
      </div>

      ${codeBlock('Stack', 'stack_basics')}

      <div class="section-title">Real World Applications</div>
      <div class="card-grid">
        ${[
          ['🔙','Browser Back Button','Each visited URL is pushed; back button pops'],
          ['↩️','Undo/Redo','Every action pushed; Ctrl+Z pops last action'],
          ['( )','Bracket Matching','Compilers use stacks to validate {[()]}'],
          ['📞','Function Call Stack','CPU uses stack to manage recursive calls'],
        ].map(([i,t,d])=>`<div class="card"><div class="card-icon">${i}</div><div class="card-title">${t}</div><div class="card-desc">${d}</div></div>`).join('')}
      </div>
    </div>`;
  }

  // ────────────── QUEUE ──────────────
  function queue() {
    return `
    <div class="page-hero animate-in" data-glyph="FIFO">
      <span class="page-tag">Linear Structure</span>
      <h1 class="page-title">Queues</h1>
      <p class="page-desc">First In, First Out. Like a line at a ticket counter — fair order preserved.</p>
    </div>
    <div class="content-area animate-in">
      ${complexityRow([['Enqueue','O(1)','o1'],['Dequeue','O(1)','o1'],['Front','O(1)','o1'],['Search','O(n)','on'],['Space','O(n)','ologn']])}

      <div class="section-title">Interactive Queue</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Queue: First In, First Out</span>
          <input type="number" id="queueVal" value="7" min="1" max="99"/>
          <button class="btn btn-primary" onclick="window.queueViz.enqueue(parseInt(document.getElementById('queueVal').value)||7)">Enqueue</button>
          <button class="btn btn-red" onclick="window.queueViz.dequeue()">Dequeue</button>
        </div>
        <div class="viz-canvas" id="queueCanvas" style="flex-direction:column;align-items:stretch;"></div>
        <div class="viz-log" id="queueLog">Enqueue adds to rear, Dequeue removes from front.</div>
      </div>

      ${codeBlock('Queue', 'queue_basics')}

      <div class="section-title">Queue Variants</div>
      <div class="card-grid">
        ${[
          ['Simple Queue','FIFO, basic operations','OS process scheduling'],
          ['Circular Queue','Rear wraps to front','Memory-efficient buffer'],
          ['Priority Queue','Higher priority served first','Hospital triage, Dijkstra'],
          ['Deque','Insert/delete both ends','Sliding window problems'],
        ].map(([t,d,use])=>`
        <div class="card">
          <div class="card-title">${t}</div>
          <div class="card-desc">${d}</div>
          <div style="margin-top:8px;font-size:12px;color:var(--accent4);">Use: ${use}</div>
        </div>`).join('')}
      </div>
    </div>`;
  }

  // ────────────── TREES ──────────────
  function trees() {
    return `
    <div class="page-hero animate-in" data-glyph="⑂">
      <span class="page-tag">Non-Linear</span>
      <h1 class="page-title">Trees & BST</h1>
      <p class="page-desc">Hierarchical data structure. Binary Search Tree gives O(log n) search, insert, delete.</p>
    </div>
    <div class="content-area animate-in">
      ${complexityRow([['Search (avg)','O(log n)','ologn'],['Insert','O(log n)','ologn'],['Delete','O(log n)','ologn'],['Traversal','O(n)','on'],['Space','O(n)','ologn']])}

      <div class="section-title">Interactive BST Visualizer</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Binary Search Tree: 50 → root</span>
          <button class="btn btn-primary" onclick="window.treeViz.runInorder()">Inorder Traversal</button>
          <input type="number" id="treeSearch" value="60" min="1" max="99"/>
          <button class="btn btn-secondary" onclick="window.treeViz.search(parseInt(document.getElementById('treeSearch').value))">Search</button>
        </div>
        <div class="viz-canvas" id="treeCanvas" style="flex-direction:column;min-height:250px;"></div>
        <div class="viz-log" id="treeLog">Click Inorder to see sorted traversal, or search for a value.</div>
      </div>

      ${codeBlock('Binary Search Tree', 'bst_basics')}

      <div class="section-title">Tree Traversals</div>
      <div class="card-grid">
        ${[
          ['Inorder','Left → Root → Right','Gives sorted output in BST!','Easy'],
          ['Preorder','Root → Left → Right','Used to copy a tree','Easy'],
          ['Postorder','Left → Right → Root','Used to delete a tree','Easy'],
          ['Level-order','BFS level by level','Shortest path in unweighted','Med'],
        ].map(([t,order,use,badge])=>`
        <div class="card">
          <div class="card-title">${t}</div>
          <div style="font-family:var(--font-mono);font-size:11px;color:var(--accent4);margin:6px 0;">${order}</div>
          <div class="card-desc">${use}</div>
          <span class="card-badge badge-${badge.toLowerCase()}">${badge}</span>
        </div>`).join('')}
      </div>

      <div class="info-box green">
        <h4>🌍 Real World Uses</h4>
        <ul>
          <li><strong>File System</strong> — Your folder structure is a tree</li>
          <li><strong>HTML DOM</strong> — Every webpage is a tree of tags</li>
          <li><strong>Database indexes</strong> — B-Trees power MySQL indexes</li>
        </ul>
      </div>
    </div>`;
  }

  // ────────────── GRAPHS ──────────────
  function graphs() {
    return `
    <div class="page-hero animate-in" data-glyph="◎">
      <span class="page-tag">Non-Linear</span>
      <h1 class="page-title">Graphs</h1>
      <p class="page-desc">Vertices (nodes) connected by edges. Model networks, maps, social connections — anything relational.</p>
    </div>
    <div class="content-area animate-in">
      ${complexityRow([['BFS/DFS','O(V+E)','on'],['Space (Adj List)','O(V+E)','on'],['Space (Matrix)','O(V²)','on2'],['Add Edge','O(1)','o1'],['Find Neighbor','O(V)','on']])}

      <div class="section-title">Graph BFS & DFS Visualizer</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Undirected graph — 6 nodes</span>
          <button class="btn btn-primary" onclick="window.graphViz.bfs()">▶ BFS</button>
          <button class="btn btn-green" onclick="window.graphViz.dfs()">▶ DFS</button>
          <button class="btn btn-secondary" onclick="window.graphViz.reset()">Reset</button>
        </div>
        <div class="viz-canvas" id="graphCanvas" style="min-height:260px;flex-direction:column;"></div>
        <div class="viz-log" id="graphLog">Click BFS or DFS to start traversal from node A.</div>
      </div>

      ${codeBlock('Graph BFS & DFS', 'graph_bfs_dfs')}

      <div class="section-title">BFS vs DFS</div>
      <table class="cmp-table">
        <tr><th>Feature</th><th>BFS</th><th>DFS</th></tr>
        <tr><td>Data Structure</td><td>Queue</td><td>Stack / Recursion</td></tr>
        <tr><td>Traversal</td><td>Level by level</td><td>Deep first</td></tr>
        <tr><td>Shortest Path</td><td class="o1">✓ Guaranteed</td><td class="on2">✗ Not guaranteed</td></tr>
        <tr><td>Memory</td><td>More (wide graphs)</td><td>Less (deep graphs)</td></tr>
        <tr><td>Use Case</td><td>Social networks, GPS</td><td>Maze, Topological sort</td></tr>
      </table>

      <div class="info-box green">
        <h4>🌍 Real World Uses</h4>
        <ul>
          <li><strong>Google Maps</strong> — Dijkstra's algorithm on a road graph</li>
          <li><strong>Facebook</strong> — Friend suggestions via BFS (mutual friends)</li>
          <li><strong>Web Crawler</strong> — BFS/DFS to index the internet</li>
        </ul>
      </div>
    </div>`;
  }

  // ────────────── HASHING ──────────────
  function hashing() {
    return `
    <div class="page-hero animate-in" data-glyph="#">
      <span class="page-tag">Non-Linear</span>
      <h1 class="page-title">Hashing</h1>
      <p class="page-desc">Map any key to an index in O(1). The magic behind dictionaries, caches, and databases.</p>
    </div>
    <div class="content-area animate-in">
      ${complexityRow([['Search','O(1)*','o1'],['Insert','O(1)*','o1'],['Delete','O(1)*','o1'],['Worst case','O(n)','on'],['Space','O(n)','ologn']])}

      <div class="section-title">Interactive Hash Table (Size 7)</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Hash table with chaining</span>
          <input type="text" id="hashKey" value="phone" style="width:90px;"/>
          <input type="text" id="hashVal" value="999" style="width:70px;"/>
          <button class="btn btn-primary" onclick="window.hashViz.insert(document.getElementById('hashKey').value, document.getElementById('hashVal').value)">Insert</button>
          <button class="btn btn-secondary" onclick="window.hashViz.search(document.getElementById('hashKey').value)">Search</button>
        </div>
        <div class="viz-canvas" id="hashCanvas" style="flex-direction:column;align-items:stretch;padding:16px 20px;"></div>
        <div class="viz-log" id="hashLog">Pre-loaded with 3 entries. Add more!</div>
      </div>

      ${codeBlock('Hash Table', 'hashing_basics')}

      <div class="section-title">Collision Resolution</div>
      <div class="card-grid">
        ${[
          ['Chaining','Each slot holds a linked list of items','Simple, common in practice'],
          ['Open Addressing','Find next empty slot (linear probe)','Better cache performance'],
          ['Double Hashing','Use a second hash for step size','Reduces clustering'],
        ].map(([t,d,pro])=>`
        <div class="card">
          <div class="card-title">${t}</div>
          <div class="card-desc">${d}</div>
          <div style="margin-top:8px;font-size:12px;color:var(--accent2);">Pro: ${pro}</div>
        </div>`).join('')}
      </div>
    </div>`;
  }

  // ────────────── SORTING ──────────────
  function sorting() {
    return `
    <div class="page-hero animate-in" data-glyph="↕">
      <span class="page-tag">Algorithms</span>
      <h1 class="page-title">Sorting Algorithms</h1>
      <p class="page-desc">Arrange elements in order. The most studied class of algorithms — choose wisely for your data.</p>
    </div>
    <div class="content-area animate-in">
      <div class="section-title">Sorting Race Visualizer</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Sorting bars — watch them order themselves</span>
          <button class="btn btn-primary" onclick="window.sortViz.bubbleSort()">Bubble Sort</button>
          <button class="btn btn-green" onclick="window.sortViz.quickSort()">Quick Sort</button>
          <button class="btn btn-secondary" onclick="window.sortViz.insertionSort()">Insertion Sort</button>
          <button class="btn btn-red" onclick="window.sortViz.shuffle()">Shuffle</button>
          <button class="btn btn-secondary" onclick="window.sortViz.reset()">Reset</button>
        </div>
        <div class="viz-canvas" id="sortCanvas" style="align-items:flex-end;justify-content:center;min-height:200px;"></div>
        <div class="viz-log" id="sortLog">Pick a sorting algorithm above!</div>
      </div>

      <div class="section-title">Algorithm Comparison</div>
      <table class="cmp-table">
        <tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Stable?</th></tr>
        ${[
          ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', '✓'],
          ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', '✗'],
          ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', '✓'],
          ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', '✓'],
          ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', '✗'],
          ['Heap Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', '✗'],
        ].map(([n,b,a,w,s])=>`
        <tr>
          <td style="font-weight:600">${n}</td>
          <td class="${b.includes('log')?'ologn':b==='O(n)'?'on':'on2'}">${b}</td>
          <td class="${a.includes('log')?'ologn':a==='O(n)'?'on':'on2'}">${a}</td>
          <td class="${w.includes('log')?'ologn':w==='O(n)'?'on':'on2'}">${w}</td>
          <td style="color:${s==='✓'?'var(--accent2)':'var(--accent3)'}">${s}</td>
        </tr>`).join('')}
      </table>

      <div class="tabs">
        <button class="tab-btn active" onclick="App.switchTab(this,'bubble')">Bubble</button>
        <button class="tab-btn" onclick="App.switchTab(this,'merge')">Merge / Quick</button>
      </div>
      <div id="bubble" class="tab-panel active">${codeBlock('Bubble / Insertion Sort', 'bubble_sort')}</div>
      <div id="merge" class="tab-panel">${codeBlock('Merge Sort / Quick Sort', 'merge_sort')}</div>
    </div>`;
  }

  // ────────────── SEARCHING ──────────────
  function searching() {
    return `
    <div class="page-hero animate-in" data-glyph="⌕">
      <span class="page-tag">Algorithms</span>
      <h1 class="page-title">Searching</h1>
      <p class="page-desc">Find elements efficiently. Binary search cuts problem space in half each step — O(log n) magic.</p>
    </div>
    <div class="content-area animate-in">
      ${complexityRow([['Linear Search','O(n)','on'],['Binary Search','O(log n)','ologn'],['Hash Search','O(1)','o1'],['BST Search','O(log n)','ologn'],['Space','O(1)','o1']])}

      <div class="section-title">Binary Search Visualizer</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Sorted array — binary search in action</span>
          <input type="number" id="bsTarget" value="23" min="1" max="99"/>
          <button class="btn btn-primary" onclick="window.bsViz.search(parseInt(document.getElementById('bsTarget').value))">Binary Search</button>
        </div>
        <div class="viz-canvas" id="bsCanvas"></div>
        <div class="viz-log" id="bsLog">Enter a number and click Binary Search. Watch how it eliminates half each time!</div>
      </div>

      ${codeBlock('Binary Search', 'binary_search')}

      <div class="info-box yellow">
        <h4>⚡ Why Binary Search is Powerful</h4>
        <p>For 1 billion elements: Linear search needs up to 1,000,000,000 steps. Binary search needs only <strong>~30 steps</strong> (log₂ 10⁹ ≈ 30). That's the power of O(log n).</p>
      </div>
    </div>`;
  }

  // ────────────── RECURSION ──────────────
  function recursion() {
    return `
    <div class="page-hero animate-in" data-glyph="↺">
      <span class="page-tag">Algorithms</span>
      <h1 class="page-title">Recursion</h1>
      <p class="page-desc">A function that calls itself. Every recursive solution needs a base case + recursive case.</p>
    </div>
    <div class="content-area animate-in">
      <div class="section-title">Fibonacci Call Tree</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Recursive call tree — see overlapping subproblems</span>
          ${[3,4,5].map(n=>`<button class="btn btn-secondary" onclick="window.recViz.render(${n})">F(${n})</button>`).join('')}
        </div>
        <div class="viz-canvas" id="recCanvas" style="flex-direction:column;min-height:270px;"></div>
        <div class="viz-log" id="recLog">Green nodes are base cases F(0) and F(1).</div>
      </div>

      ${codeBlock('Recursion Examples', 'recursion_examples')}

      <div class="section-title">Recursion vs Iteration</div>
      <table class="cmp-table">
        <tr><th>Aspect</th><th>Recursion</th><th>Iteration</th></tr>
        <tr><td>Code clarity</td><td class="o1">Often cleaner</td><td>Can be verbose</td></tr>
        <tr><td>Memory</td><td class="on2">Stack frames used</td><td class="o1">Minimal overhead</td></tr>
        <tr><td>Speed</td><td>Slightly slower</td><td class="ologn">Generally faster</td></tr>
        <tr><td>Stack overflow risk</td><td class="on2">Yes (deep recursion)</td><td class="o1">No</td></tr>
        <tr><td>Best for</td><td>Trees, graphs, divide & conquer</td><td>Simple loops</td></tr>
      </table>

      <div class="info-box">
        <h4>🔑 Three Laws of Recursion</h4>
        <ul>
          <li><strong>Base Case:</strong> Every recursion must have a case that doesn't recurse</li>
          <li><strong>Progress:</strong> Each call must move toward the base case</li>
          <li><strong>Trust:</strong> Assume the recursive call works correctly</li>
        </ul>
      </div>
    </div>`;
  }

  // ────────────── DYNAMIC PROGRAMMING ──────────────
  function dp() {
    return `
    <div class="page-hero animate-in" data-glyph="◈">
      <span class="page-tag">Advanced Algorithm</span>
      <h1 class="page-title">Dynamic Programming</h1>
      <p class="page-desc">Store answers to subproblems. Turn exponential recursion into polynomial time.</p>
    </div>
    <div class="content-area animate-in">
      <div class="info-box yellow">
        <h4>💡 What is DP?</h4>
        <p>DP = <strong>Recursion + Memoization</strong>. If a problem has overlapping subproblems and optimal substructure, DP solves it efficiently by storing results instead of recomputing.</p>
      </div>

      <div class="section-title">Coin Change DP Table</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Coin Change: coins [1,5,6,9], amount = 11</span>
          <button class="btn btn-primary" onclick="window.dpViz.coinChange([1,5,6,9], 11)">▶ Animate DP</button>
        </div>
        <div class="viz-canvas" id="dpCanvas" style="flex-direction:column;padding:20px;"></div>
        <div class="viz-log" id="dpLog">Click Animate to watch the DP table fill bottom-up!</div>
      </div>

      ${codeBlock('Dynamic Programming', 'dp_examples')}

      <div class="section-title">Classic DP Problems</div>
      <div class="card-grid">
        ${[
          ['Fibonacci','Overlapping: F(n-1) + F(n-2)','O(n) with memo vs O(2ⁿ) naive','Easy'],
          ['0/1 Knapsack','Max value within weight limit','2D dp[items][weight]','Med'],
          ['LCS','Longest Common Subsequence','Text diff, DNA comparison','Med'],
          ['Coin Change','Minimum coins for amount','dp[amount] = min(dp[amount-coin]+1)','Med'],
          ["Longest Inc. Subseq.",'LIS of an array','O(n log n) with patience sort','Hard'],
          ['Edit Distance','Min ops to convert string','Used in spell checkers','Hard'],
        ].map(([t,d,how,badge])=>`
        <div class="card">
          <div class="card-title">${t}</div>
          <div class="card-desc">${d}</div>
          <div style="margin-top:6px;font-size:11px;font-family:var(--font-mono);color:var(--accent4);">${how}</div>
          <span class="card-badge badge-${badge.toLowerCase()==='easy'?'easy':badge.toLowerCase()==='med'?'med':'hard'}">${badge}</span>
        </div>`).join('')}
      </div>
    </div>`;
  }

  // ────────────── HEAP ──────────────
  function heap() {
    return `
    <div class="page-hero animate-in" data-glyph="△">
      <span class="page-tag">Non-Linear</span>
      <h1 class="page-title">Heaps</h1>
      <p class="page-desc">Complete binary tree with heap property. Extract max/min always in O(log n).</p>
    </div>
    <div class="content-area animate-in">
      ${complexityRow([['Get Max/Min','O(1)','o1'],['Insert','O(log n)','ologn'],['Extract','O(log n)','ologn'],['Build Heap','O(n)','on'],['Heap Sort','O(n log n)','ologn']])}

      <div class="section-title">Interactive Max-Heap</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Max-Heap: parent ≥ children always</span>
          <input type="number" id="heapVal" value="15" min="1" max="99"/>
          <button class="btn btn-primary" onclick="window.heapViz.insert(parseInt(document.getElementById('heapVal').value)||15)">Insert</button>
          <button class="btn btn-red" onclick="window.heapViz.extractMax()">Extract Max</button>
        </div>
        <div class="viz-canvas" id="heapCanvas" style="flex-direction:column;min-height:220px;"></div>
        <div class="viz-log" id="heapLog">Yellow node = max (root). Insert values to see heapify-up!</div>
      </div>

      ${codeBlock('Heap', 'heap_basics')}

      <div class="info-box green">
        <h4>🌍 Real World Uses</h4>
        <ul>
          <li><strong>Priority Queue</strong> — OS task scheduling by priority</li>
          <li><strong>Dijkstra's Algorithm</strong> — Shortest path using min-heap</li>
          <li><strong>Top-K Elements</strong> — Finding K largest numbers in a stream</li>
          <li><strong>Heap Sort</strong> — O(n log n) in-place sorting</li>
        </ul>
      </div>
    </div>`;
  }

  // ────────────── TRIE ──────────────
  function trie() {
    return `
    <div class="page-hero animate-in" data-glyph="✦">
      <span class="page-tag">Advanced</span>
      <h1 class="page-title">Tries (Prefix Trees)</h1>
      <p class="page-desc">Tree for string storage. Every path from root to end spells a word. O(L) operations — independent of n!</p>
    </div>
    <div class="content-area animate-in">
      ${complexityRow([['Search','O(L)','o1'],['Insert','O(L)','o1'],['Prefix','O(L)','o1'],['Space','O(N·L)','on'],['L = word length','-','']])}

      <div class="section-title">Trie Visualizer</div>
      <div class="viz-container">
        <div class="viz-toolbar">
          <span class="viz-title">// Words: app, apple, apt, bat, ball</span>
          ${['app','apple','apt','bat','ball'].map(w=>`<button class="btn btn-secondary" onclick="window.trieViz.searchWord('${w}')">${w}</button>`).join('')}
        </div>
        <div class="viz-canvas" id="trieCanvas" style="flex-direction:column;min-height:240px;"></div>
        <div class="viz-log" id="trieLog">Click a word to trace the search path through the trie!</div>
      </div>

      ${codeBlock('Trie', 'trie_basics')}

      <div class="info-box green">
        <h4>🌍 Real World Uses</h4>
        <ul>
          <li><strong>Google Autocomplete</strong> — Prefix search as you type</li>
          <li><strong>Spell Checkers</strong> — Quickly check if word exists</li>
          <li><strong>IP Routing</strong> — Routers match IP prefixes</li>
          <li><strong>T9 Keyboard</strong> — Phone predictive text uses tries</li>
        </ul>
      </div>
    </div>`;
  }

  // ────────────── REAL WORLD ──────────────
  function realworld() {
    const apps = [
      { icon:'🗺️', name:'Google Maps / GPS', sub:'Graph Algorithms',
        desc:'Road network = weighted graph. Dijkstra\'s algorithm finds shortest path. A* improves with heuristics. BFS for unweighted.',
        tags:['Graphs','Dijkstra','A*','Priority Queue'] },
      { icon:'🔍', name:'Google Search', sub:'Inverted Index + PageRank',
        desc:'Every webpage is a graph node. PageRank uses matrix operations on link graph. Autocomplete uses Tries for O(L) prefix search.',
        tags:['Tries','Graphs','Hash Tables','Sorting'] },
      { icon:'📘', name:'Facebook / Instagram', sub:'Social Graph',
        desc:'Friend connections = undirected graph. BFS finds mutual friends. Feed is a priority queue sorted by relevance score.',
        tags:['BFS','Graphs','Heap','Hash Tables'] },
      { icon:'🎵', name:'Spotify / Netflix', sub:'Recommendation Engine',
        desc:'User-item matrix (2D array). Collaborative filtering compares arrays. Priority queues serve top recommendations fast.',
        tags:['Arrays','Sorting','Hash Tables','Graphs'] },
      { icon:'📦', name:'E-commerce (Amazon)', sub:'Product Search & Cart',
        desc:'Product catalog = hash table for O(1) lookup. Search uses inverted index. Cart = linked list. Checkout = stack of operations.',
        tags:['Hash Tables','Tries','Linked Lists','Arrays'] },
      { icon:'🏦', name:'Banking Systems', sub:'Transactions & Queues',
        desc:'Transaction logs = arrays. ATM queue = circular queue. Fraud detection uses graph analysis (unusual patterns). Sorting for statements.',
        tags:['Queues','Arrays','Graphs','Sorting'] },
      { icon:'🎮', name:'Game Development', sub:'Pathfinding & State',
        desc:'Game map = 2D array or graph. A* pathfinding for NPC movement. Undo/redo = stack. Inventory = hash map.',
        tags:['A*','Graphs','Stack','Arrays'] },
      { icon:'🏥', name:'Hospital / Emergency', sub:'Priority Queues',
        desc:'ER triage = max-heap by severity. Patient records = hash map by ID. Appointment scheduling = min-heap by time.',
        tags:['Heap','Hash Tables','Queues'] },
      { icon:'🔐', name:'Cybersecurity', sub:'Encryption & Detection',
        desc:'Hash functions (SHA-256) for passwords. Bloom filters (hash-based) for fast IP blocklisting. Graphs for network anomaly detection.',
        tags:['Hash Tables','Graphs','Arrays'] },
    ];

    return `
    <div class="page-hero animate-in" data-glyph="⊕">
      <span class="page-tag">Capstone</span>
      <h1 class="page-title">Real World Applications</h1>
      <p class="page-desc">Every app you use every day is built on DSA. Here's how the theory maps to the real world.</p>
    </div>
    <div class="content-area animate-in">
      ${apps.map(a=>`
      <div class="rw-card">
        <div class="rw-card-head">
          <div class="rw-icon">${a.icon}</div>
          <div>
            <div class="rw-title">${a.name}</div>
            <div class="rw-subtitle">${a.sub}</div>
          </div>
        </div>
        <p style="color:var(--text2);font-size:13.5px;line-height:1.6;">${a.desc}</p>
        <div class="rw-tags">${a.tags.map(t=>`<span class="rw-tag">${t}</span>`).join('')}</div>
      </div>`).join('')}

      <div class="info-box yellow" style="margin-top:8px;">
        <h4>🎓 Key Takeaway for BCA Students</h4>
        <p>DSA is not just for exams. Every software job interview tests your DSA knowledge, and every production system uses these concepts daily. Master DSA = master your career.</p>
      </div>
    </div>`;
  }

  return {
    home, complexity, arrays, linkedlist, stack, queue,
    trees, graphs, hashing, sorting, searching,
    recursion, dp, heap, trie, realworld, showCode, updateCodeBlock
  };
})();