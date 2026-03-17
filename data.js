// ============================================================
// DSA-HUB — Data Layer (Single Source of Truth)
// Design Pattern: Module + Repository Pattern
// ============================================================

const DSA_DATA = {
  topics: [
    { id: 'home', icon: '⬡', label: 'Home', group: null },
    { id: 'intro', icon: '📐', label: 'What is DSA?', group: 'Foundations', difficulty: 'easy' },
    { id: 'complexity', icon: '⏱', label: 'Time & Space Complexity', group: 'Foundations', difficulty: 'easy' },
    { id: 'recursion', icon: '🔄', label: 'Recursion', group: 'Foundations', difficulty: 'medium' },
    { id: 'array', icon: '▦', label: 'Arrays', group: 'Linear Structures', difficulty: 'easy' },
    { id: 'linkedlist', icon: '⛓', label: 'Linked Lists', group: 'Linear Structures', difficulty: 'medium' },
    { id: 'stack', icon: '📚', label: 'Stacks', group: 'Linear Structures', difficulty: 'easy' },
    { id: 'queue', icon: '🎫', label: 'Queues', group: 'Linear Structures', difficulty: 'easy' },
    { id: 'tree', icon: '🌳', label: 'Trees & BST', group: 'Trees', difficulty: 'medium' },
    { id: 'heap', icon: '⛰', label: 'Heap / Priority Queue', group: 'Trees', difficulty: 'medium' },
    { id: 'trie', icon: '🔤', label: 'Trie', group: 'Trees', difficulty: 'hard' },
    { id: 'hashing', icon: '#', label: 'Hashing', group: 'Hashing', difficulty: 'medium' },
    { id: 'graph', icon: '🕸', label: 'Graphs', group: 'Graphs', difficulty: 'hard' },
    { id: 'graph-algo', icon: '🗺', label: 'Graph Algorithms', group: 'Graphs', difficulty: 'hard' },
    { id: 'sorting', icon: '⇅', label: 'Sorting Algorithms', group: 'Sorting & Searching', difficulty: 'medium' },
    { id: 'searching', icon: '🔍', label: 'Searching Algorithms', group: 'Sorting & Searching', difficulty: 'easy' },
    { id: 'dp', icon: '🧮', label: 'Dynamic Programming', group: 'Advanced', difficulty: 'hard' },
    { id: 'greedy', icon: '💡', label: 'Greedy Algorithms', group: 'Advanced', difficulty: 'medium' },
    { id: 'divide', icon: '✂', label: 'Divide & Conquer', group: 'Advanced', difficulty: 'medium' },
  ],
  pages: {}
};

DSA_DATA.pages['intro'] = {
  title: 'What is DSA?', subtitle: 'The foundation of computer science & programming', icon: '📐',
  sections: [
    { type: 'explanation', title: 'Data Structures & Algorithms',
      content: `A <strong>Data Structure</strong> organizes data in memory for efficient access. An <strong>Algorithm</strong> is a step-by-step procedure to solve a problem.<br><br>Together, DSA defines <em>how</em> programs think and perform at scale.` },
    { type: 'realworld', title: 'Real World Examples', items: [
      { icon: '📱', title: 'Contacts App', desc: 'Hash map for O(1) name lookup. Sorted array for display.', tag: 'Array + Hash' },
      { icon: '🌐', title: 'Google Maps', desc: "Dijkstra's algorithm finds shortest routes in a graph of roads.", tag: 'Graph' },
      { icon: '💻', title: 'Browser History', desc: 'Back/forward navigation uses a Stack to track pages.', tag: 'Stack' },
      { icon: '🎵', title: 'Spotify Queue', desc: 'Music queue uses Queue + Priority Queue for playlist management.', tag: 'Queue' },
      { icon: '📦', title: 'Amazon Search', desc: 'Autocomplete uses Tries; product lookup uses Hash Tables.', tag: 'Trie + Hash' },
      { icon: '🏦', title: 'Bank Transactions', desc: 'Transaction logs chain operations using Linked Lists.', tag: 'Linked List' }
    ]},
    { type: 'callout', kind: 'info', text: '<strong>Why learn DSA?</strong> Every top tech company — Google, Amazon, Microsoft, Flipkart — tests DSA in interviews. It teaches you HOW to think as a programmer.' }
  ]
};

DSA_DATA.pages['complexity'] = {
  title: 'Time & Space Complexity', subtitle: 'Measuring algorithm efficiency with Big-O notation', icon: '⏱',
  sections: [
    { type: 'explanation', title: 'What is Big-O Notation?',
      content: `Big-O describes how runtime or memory grows as input size <strong>n</strong> increases. We always use the <strong>worst-case</strong>.<br><br>Drop constants & lower terms: <code>3n² + 5n + 2</code> → <code>O(n²)</code>` },
    { type: 'complexity-chart' },
    { type: 'complexity-table', items: [
      { op: 'Constant', val: 'O(1)', cls: 'o-const', example: 'Array index access' },
      { op: 'Logarithmic', val: 'O(log n)', cls: 'o-log', example: 'Binary search' },
      { op: 'Linear', val: 'O(n)', cls: 'o-n', example: 'Linear search' },
      { op: 'Linearithmic', val: 'O(n log n)', cls: 'o-nlog', example: 'Merge sort' },
      { op: 'Quadratic', val: 'O(n²)', cls: 'o-n2', example: 'Bubble sort' },
    ]},
    { type: 'code', lang: 'C', title: 'Complexity Examples in C',
      code: `<span class="cmt">// O(1) — Constant Time</span>
<span class="type">int</span> <span class="fn">getFirst</span>(<span class="type">int</span> arr[]) { <span class="kw">return</span> arr[<span class="num">0</span>]; }

<span class="cmt">// O(n) — Linear Time</span>
<span class="type">int</span> <span class="fn">linearSearch</span>(<span class="type">int</span> arr[], <span class="type">int</span> n, <span class="type">int</span> key) {
    <span class="kw">for</span> (<span class="type">int</span> i = <span class="num">0</span>; i < n; i++)
        <span class="kw">if</span> (arr[i] == key) <span class="kw">return</span> i;
    <span class="kw">return</span> -<span class="num">1</span>;
}

<span class="cmt">// O(log n) — Binary Search</span>
<span class="type">int</span> <span class="fn">binarySearch</span>(<span class="type">int</span> arr[], <span class="type">int</span> n, <span class="type">int</span> key) {
    <span class="type">int</span> lo=<span class="num">0</span>, hi=n-<span class="num">1</span>;
    <span class="kw">while</span>(lo<=hi) {
        <span class="type">int</span> mid = lo+(hi-lo)/<span class="num">2</span>;
        <span class="kw">if</span>(arr[mid]==key) <span class="kw">return</span> mid;
        <span class="kw">else if</span>(arr[mid]<key) lo=mid+<span class="num">1</span>;
        <span class="kw">else</span> hi=mid-<span class="num">1</span>;
    }
    <span class="kw">return</span> -<span class="num">1</span>;
}` },
    { type: 'quiz', question: 'What is the time complexity of accessing arr[i] in a C array?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], answer: 2,
      explanation: 'Array access is O(1) — we compute: base_address + i × sizeof(int) in one step.' }
  ]
};

DSA_DATA.pages['recursion'] = {
  title: 'Recursion', subtitle: 'A function that calls itself to solve smaller sub-problems', icon: '🔄',
  sections: [
    { type: 'explanation', title: 'The Recursion Concept',
      content: `Every recursive function needs:<br><strong>1. Base Case</strong> — Stop condition<br><strong>2. Recursive Case</strong> — Call itself with smaller input<br><strong>3. Progress</strong> — Each call moves toward base case` },
    { type: 'code', lang: 'C', title: 'Factorial & Fibonacci',
      code: `<span class="cmt">// Factorial: n! = n × (n-1)!</span>
<span class="type">int</span> <span class="fn">factorial</span>(<span class="type">int</span> n) {
    <span class="kw">if</span> (n == <span class="num">0</span>) <span class="kw">return</span> <span class="num">1</span>;       <span class="cmt">// Base case</span>
    <span class="kw">return</span> n * <span class="fn">factorial</span>(n-<span class="num">1</span>);   <span class="cmt">// Recursive</span>
}
<span class="cmt">// factorial(4): 4→3→2→1→0(=1) unwinds to 24</span>

<span class="cmt">// Fibonacci: F(n) = F(n-1) + F(n-2)</span>
<span class="type">int</span> <span class="fn">fib</span>(<span class="type">int</span> n) {
    <span class="kw">if</span> (n <= <span class="num">1</span>) <span class="kw">return</span> n;
    <span class="kw">return</span> <span class="fn">fib</span>(n-<span class="num">1</span>) + <span class="fn">fib</span>(n-<span class="num">2</span>);
}` },
    { type: 'recursion-viz' },
    { type: 'callout', kind: 'warning', text: '<strong>Stack Overflow:</strong> Without a base case, recursion is infinite → program crashes. Always define a clear stopping condition!' }
  ]
};

DSA_DATA.pages['array'] = {
  title: 'Arrays', subtitle: 'The most fundamental — contiguous memory storage', icon: '▦',
  sections: [
    { type: 'explanation', title: 'What is an Array?',
      content: `An array stores elements in <strong>contiguous memory</strong>. Access any element in O(1) via its index.<br><br>For <code>int arr[5]</code> starting at address 1000: arr[0]=1000, arr[1]=1004, arr[2]=1008... (4 bytes each)` },
    { type: 'array-viz' },
    { type: 'code', lang: 'C', title: 'Array Operations in C',
      code: `<span class="type">int</span> arr[<span class="num">5</span>] = {<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>, <span class="num">40</span>, <span class="num">50</span>};

<span class="cmt">// Access — O(1)</span>
<span class="type">int</span> x = arr[<span class="num">2</span>]; <span class="cmt">// x = 30</span>

<span class="cmt">// Traverse — O(n)</span>
<span class="kw">for</span>(<span class="type">int</span> i=<span class="num">0</span>; i<<span class="num">5</span>; i++) <span class="fn">printf</span>(<span class="str">"%d "</span>, arr[i]);

<span class="cmt">// Delete at index k — shift left O(n)</span>
<span class="kw">for</span>(<span class="type">int</span> j=k; j<n-<span class="num">1</span>; j++) arr[j]=arr[j+<span class="num">1</span>];
n--;

<span class="cmt">// 2D Array (3×3 matrix)</span>
<span class="type">int</span> mat[<span class="num">3</span>][<span class="num">3</span>] = {{<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>},{<span class="num">4</span>,<span class="num">5</span>,<span class="num">6</span>},{<span class="num">7</span>,<span class="num">8</span>,<span class="num">9</span>}};` },
    { type: 'complexity-cards', items: [
      { op: 'Access', val: 'O(1)', cls: 'o-const' },
      { op: 'Search', val: 'O(n)', cls: 'o-n' },
      { op: 'Insert end', val: 'O(1)', cls: 'o-const' },
      { op: 'Insert mid', val: 'O(n)', cls: 'o-n' },
      { op: 'Delete', val: 'O(n)', cls: 'o-n' },
    ]},
    { type: 'realworld', title: 'Real World Uses', items: [
      { icon: '🖼', title: 'Image Processing', desc: 'Images are 2D arrays of pixels. Every filter is a matrix operation.', tag: '2D Array' },
      { icon: '📊', title: 'Spreadsheets', desc: 'Excel cells are a 2D array — O(1) access to any cell.', tag: '2D Array' },
      { icon: '🎮', title: 'Game Boards', desc: 'Chess, Sudoku, Tic-Tac-Toe — all use 2D arrays for the board.', tag: '2D Array' },
    ]}
  ]
};

DSA_DATA.pages['linkedlist'] = {
  title: 'Linked Lists', subtitle: 'Dynamic nodes connected via pointers', icon: '⛓',
  sections: [
    { type: 'explanation', title: 'What is a Linked List?',
      content: `A Linked List is nodes where each contains <strong>data + a pointer</strong> to the next. Nodes are NOT in contiguous memory.<br><br>Types: <strong>Singly</strong> → one direction | <strong>Doubly</strong> → both directions | <strong>Circular</strong> → tail links to head` },
    { type: 'linkedlist-viz' },
    { type: 'code', lang: 'C', title: 'Linked List in C',
      code: `<span class="kw">struct</span> <span class="type">Node</span> { <span class="type">int</span> data; <span class="kw">struct</span> <span class="type">Node</span>* next; };

<span class="kw">struct</span> <span class="type">Node</span>* <span class="fn">newNode</span>(<span class="type">int</span> val) {
    <span class="kw">struct</span> <span class="type">Node</span>* n = <span class="fn">malloc</span>(<span class="kw">sizeof</span>(<span class="kw">struct</span> <span class="type">Node</span>));
    n->data = val; n->next = <span class="type">NULL</span>;
    <span class="kw">return</span> n;
}

<span class="cmt">// Insert at front — O(1)</span>
<span class="type">void</span> <span class="fn">insertFront</span>(<span class="kw">struct</span> <span class="type">Node</span>** head, <span class="type">int</span> val) {
    <span class="kw">struct</span> <span class="type">Node</span>* n = <span class="fn">newNode</span>(val);
    n->next = *head; *head = n;
}

<span class="cmt">// Traverse & print — O(n)</span>
<span class="type">void</span> <span class="fn">print</span>(<span class="kw">struct</span> <span class="type">Node</span>* head) {
    <span class="kw">while</span>(head) { <span class="fn">printf</span>(<span class="str">"%d→"</span>,head->data); head=head->next; }
    <span class="fn">printf</span>(<span class="str">"NULL\n"</span>);
}` },
    { type: 'complexity-cards', items: [
      { op: 'Access', val: 'O(n)', cls: 'o-n' },
      { op: 'Search', val: 'O(n)', cls: 'o-n' },
      { op: 'Insert head', val: 'O(1)', cls: 'o-const' },
      { op: 'Insert tail', val: 'O(n)', cls: 'o-n' },
      { op: 'Delete', val: 'O(n)', cls: 'o-n' },
    ]}
  ]
};

DSA_DATA.pages['stack'] = {
  title: 'Stacks', subtitle: 'Last In, First Out (LIFO) — like a stack of plates', icon: '📚',
  sections: [
    { type: 'explanation', title: 'Stack — LIFO Principle',
      content: `Stack = <strong>LIFO</strong>. You always add and remove from the <strong>top</strong>.<br><br><code>push(x)</code> — add to top | <code>pop()</code> — remove top | <code>peek()</code> — view top` },
    { type: 'stack-viz' },
    { type: 'code', lang: 'C', title: 'Stack in C',
      code: `<span class="kw">#define</span> MAX <span class="num">100</span>
<span class="kw">struct</span> <span class="type">Stack</span> { <span class="type">int</span> items[MAX], top; };
<span class="type">void</span> <span class="fn">init</span>(<span class="kw">struct</span> <span class="type">Stack</span>* s) { s->top = -<span class="num">1</span>; }

<span class="cmt">// Push — O(1)</span>
<span class="type">void</span> <span class="fn">push</span>(<span class="kw">struct</span> <span class="type">Stack</span>* s, <span class="type">int</span> v) {
    <span class="kw">if</span>(s->top == MAX-<span class="num">1</span>) { <span class="fn">printf</span>(<span class="str">"Overflow!\n"</span>); <span class="kw">return</span>; }
    s->items[++s->top] = v;
}

<span class="cmt">// Pop — O(1)</span>
<span class="type">int</span> <span class="fn">pop</span>(<span class="kw">struct</span> <span class="type">Stack</span>* s) {
    <span class="kw">if</span>(s->top==-<span class="num">1</span>) { <span class="fn">printf</span>(<span class="str">"Underflow!\n"</span>); <span class="kw">return</span> -<span class="num">1</span>; }
    <span class="kw">return</span> s->items[s->top--];
}` },
    { type: 'realworld', title: 'Real World Uses', items: [
      { icon: '🌐', title: 'Browser Back Button', desc: 'Each URL is pushed. Back button pops the last URL.', tag: 'LIFO' },
      { icon: '↩', title: 'Undo/Redo', desc: 'Text editors use two stacks — undo and redo.', tag: 'LIFO' },
      { icon: '📞', title: 'Function Call Stack', desc: 'CPU tracks function calls and return addresses via stack.', tag: 'Call Stack' },
    ]}
  ]
};

DSA_DATA.pages['queue'] = {
  title: 'Queues', subtitle: 'First In, First Out (FIFO) — like a ticket line', icon: '🎫',
  sections: [
    { type: 'explanation', title: 'Queue — FIFO Principle',
      content: `Queue = <strong>FIFO</strong>. First person in line, first to be served.<br><br><code>enqueue(x)</code> — add to rear | <code>dequeue()</code> — remove from front | <code>peek()</code> — view front` },
    { type: 'queue-viz' },
    { type: 'code', lang: 'C', title: 'Queue in C',
      code: `<span class="kw">#define</span> MAX <span class="num">100</span>
<span class="kw">struct</span> <span class="type">Queue</span> { <span class="type">int</span> items[MAX], front, rear; };
<span class="type">void</span> <span class="fn">init</span>(<span class="kw">struct</span> <span class="type">Queue</span>* q) { q->front=q->rear=-<span class="num">1</span>; }

<span class="cmt">// Enqueue — O(1)</span>
<span class="type">void</span> <span class="fn">enqueue</span>(<span class="kw">struct</span> <span class="type">Queue</span>* q, <span class="type">int</span> v) {
    <span class="kw">if</span>(q->rear==MAX-<span class="num">1</span>){<span class="fn">printf</span>(<span class="str">"Full!\n"</span>);<span class="kw">return</span>;}
    <span class="kw">if</span>(q->front==-<span class="num">1</span>) q->front=<span class="num">0</span>;
    q->items[++q->rear] = v;
}

<span class="cmt">// Dequeue — O(1)</span>
<span class="type">int</span> <span class="fn">dequeue</span>(<span class="kw">struct</span> <span class="type">Queue</span>* q) {
    <span class="kw">if</span>(q->front==-<span class="num">1</span>){<span class="fn">printf</span>(<span class="str">"Empty!\n"</span>);<span class="kw">return</span> -<span class="num">1</span>;}
    <span class="type">int</span> v=q->items[q->front++];
    <span class="kw">if</span>(q->front>q->rear) q->front=q->rear=-<span class="num">1</span>;
    <span class="kw">return</span> v;
}` },
    { type: 'realworld', title: 'Real World Uses', items: [
      { icon: '🖨', title: 'Printer Spool', desc: 'Print jobs are queued — first sent, first printed.', tag: 'FIFO' },
      { icon: '📱', title: 'Message Delivery', desc: 'WhatsApp queues messages for in-order delivery.', tag: 'FIFO' },
      { icon: '🎮', title: 'BFS Traversal', desc: 'Breadth-First Search in game maps and AI uses a queue.', tag: 'BFS' },
    ]}
  ]
};

DSA_DATA.pages['tree'] = {
  title: 'Trees & BST', subtitle: 'Hierarchical data with parent-child relationships', icon: '🌳',
  sections: [
    { type: 'explanation', title: 'Binary Search Tree',
      content: `<strong>BST Rule:</strong> For every node — all left values < node < all right values.<br><br>This property gives O(log n) average search — halving the tree at each step.` },
    { type: 'tree-viz' },
    { type: 'code', lang: 'C', title: 'BST in C',
      code: `<span class="kw">struct</span> <span class="type">Node</span> { <span class="type">int</span> data; <span class="kw">struct</span> <span class="type">Node</span> *left, *right; };

<span class="cmt">// Insert — O(log n) avg</span>
<span class="kw">struct</span> <span class="type">Node</span>* <span class="fn">insert</span>(<span class="kw">struct</span> <span class="type">Node</span>* r, <span class="type">int</span> v) {
    <span class="kw">if</span>(!r) <span class="kw">return</span> <span class="fn">newNode</span>(v);
    <span class="kw">if</span>(v < r->data) r->left  = <span class="fn">insert</span>(r->left,  v);
    <span class="kw">else if</span>(v > r->data) r->right = <span class="fn">insert</span>(r->right, v);
    <span class="kw">return</span> r;
}

<span class="cmt">// Inorder (sorted output!)</span>
<span class="type">void</span> <span class="fn">inorder</span>(<span class="kw">struct</span> <span class="type">Node</span>* r) {
    <span class="kw">if</span>(!r) <span class="kw">return</span>;
    <span class="fn">inorder</span>(r->left);
    <span class="fn">printf</span>(<span class="str">"%d "</span>, r->data);
    <span class="fn">inorder</span>(r->right);
}` },
    { type: 'complexity-cards', items: [
      { op: 'Search avg', val: 'O(log n)', cls: 'o-log' },
      { op: 'Insert avg', val: 'O(log n)', cls: 'o-log' },
      { op: 'Delete avg', val: 'O(log n)', cls: 'o-log' },
      { op: 'Worst case', val: 'O(n)', cls: 'o-n' },
    ]}
  ]
};

DSA_DATA.pages['hashing'] = {
  title: 'Hashing', subtitle: 'O(1) average access using hash functions', icon: '#',
  sections: [
    { type: 'explanation', title: 'What is Hashing?',
      content: `A <strong>Hash Function</strong> maps a key to an array index: <code>index = key % table_size</code>.<br><br><strong>Collision</strong> = two keys map to same index. Resolved via <em>chaining</em> (linked list per bucket) or <em>open addressing</em>.` },
    { type: 'hash-viz' },
    { type: 'code', lang: 'C', title: 'Hash Table with Chaining',
      code: `<span class="kw">#define</span> SIZE <span class="num">7</span>
<span class="kw">struct</span> <span class="type">Node</span> { <span class="type">int</span> key, val; <span class="kw">struct</span> <span class="type">Node</span>* next; };
<span class="kw">struct</span> <span class="type">Node</span>* table[SIZE] = {<span class="num">0</span>};

<span class="type">int</span> <span class="fn">hash</span>(<span class="type">int</span> key) { <span class="kw">return</span> key % SIZE; }

<span class="cmt">// Insert — O(1) avg</span>
<span class="type">void</span> <span class="fn">insert</span>(<span class="type">int</span> key, <span class="type">int</span> val) {
    <span class="type">int</span> idx = <span class="fn">hash</span>(key);
    <span class="kw">struct</span> <span class="type">Node</span>* n = <span class="fn">newNode</span>(key,val);
    n->next = table[idx]; table[idx] = n;
}

<span class="cmt">// Search — O(1) avg, O(n) worst</span>
<span class="type">int</span> <span class="fn">search</span>(<span class="type">int</span> key) {
    <span class="kw">struct</span> <span class="type">Node</span>* c = table[<span class="fn">hash</span>(key)];
    <span class="kw">while</span>(c){ <span class="kw">if</span>(c->key==key) <span class="kw">return</span> c->val; c=c->next; }
    <span class="kw">return</span> -<span class="num">1</span>;
}` }
  ]
};

DSA_DATA.pages['sorting'] = {
  title: 'Sorting Algorithms', subtitle: 'From O(n²) basics to O(n log n) champions', icon: '⇅',
  sections: [
    { type: 'explanation', title: 'Why Sorting Matters',
      content: `Sorting enables binary search, database indexing, and many algorithms. The right sort algorithm depends on data size, memory limits, and whether data is partially sorted.` },
    { type: 'sorting-viz' },
    { type: 'algo-compare', algorithms: [
      { name: 'Bubble Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: '✓' },
      { name: 'Selection Sort', best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: '✗' },
      { name: 'Insertion Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: '✓' },
      { name: 'Merge Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: '✓' },
      { name: 'Quick Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: '✗' },
    ]},
    { type: 'code', lang: 'C', title: 'Merge Sort in C',
      code: `<span class="type">void</span> <span class="fn">merge</span>(<span class="type">int</span> a[], <span class="type">int</span> l, <span class="type">int</span> m, <span class="type">int</span> r) {
    <span class="type">int</span> n1=m-l+<span class="num">1</span>, n2=r-m, L[n1], R[n2], i=<span class="num">0</span>,j=<span class="num">0</span>,k=l;
    <span class="kw">for</span>(<span class="type">int</span> x=<span class="num">0</span>;x<n1;x++) L[x]=a[l+x];
    <span class="kw">for</span>(<span class="type">int</span> x=<span class="num">0</span>;x<n2;x++) R[x]=a[m+<span class="num">1</span>+x];
    <span class="kw">while</span>(i<n1&&j<n2) a[k++]=L[i]<=R[j]?L[i++]:R[j++];
    <span class="kw">while</span>(i<n1) a[k++]=L[i++];
    <span class="kw">while</span>(j<n2) a[k++]=R[j++];
}
<span class="type">void</span> <span class="fn">mergeSort</span>(<span class="type">int</span> a[], <span class="type">int</span> l, <span class="type">int</span> r) {
    <span class="kw">if</span>(l<r) {
        <span class="type">int</span> m=l+(r-l)/<span class="num">2</span>;
        <span class="fn">mergeSort</span>(a,l,m); <span class="fn">mergeSort</span>(a,m+<span class="num">1</span>,r); <span class="fn">merge</span>(a,l,m,r);
    }
}` }
  ]
};

DSA_DATA.pages['searching'] = {
  title: 'Searching Algorithms', subtitle: 'Finding elements efficiently', icon: '🔍',
  sections: [
    { type: 'explanation', title: 'Linear vs Binary Search',
      content: `<strong>Linear Search</strong> — Check every element. Works on unsorted data. O(n).<br><br><strong>Binary Search</strong> — Sorted arrays only. Halve the search space each step. O(log n). For n=1,000,000 → only ~20 steps!` },
    { type: 'search-viz' },
    { type: 'code', lang: 'C', title: 'Binary Search in C',
      code: `<span class="cmt">// Binary Search — O(log n)</span>
<span class="type">int</span> <span class="fn">binarySearch</span>(<span class="type">int</span> arr[], <span class="type">int</span> n, <span class="type">int</span> key) {
    <span class="type">int</span> lo=<span class="num">0</span>, hi=n-<span class="num">1</span>;
    <span class="kw">while</span>(lo <= hi) {
        <span class="type">int</span> mid = lo + (hi-lo)/<span class="num">2</span>;
        <span class="kw">if</span>(arr[mid] == key) <span class="kw">return</span> mid;   <span class="cmt">// Found!</span>
        <span class="kw">else if</span>(arr[mid] < key) lo=mid+<span class="num">1</span>; <span class="cmt">// Go right</span>
        <span class="kw">else</span> hi = mid-<span class="num">1</span>;                 <span class="cmt">// Go left</span>
    }
    <span class="kw">return</span> -<span class="num">1</span>; <span class="cmt">// Not found</span>
}` }
  ]
};

DSA_DATA.pages['graph'] = {
  title: 'Graphs', subtitle: 'Vertices connected by edges — the most versatile DS', icon: '🕸',
  sections: [
    { type: 'explanation', title: 'Graph Fundamentals',
      content: `G = (V, E) — <strong>Vertices</strong> (nodes) + <strong>Edges</strong> (connections).<br>Directed vs Undirected | Weighted vs Unweighted<br><br><strong>Adjacency List</strong> (O(V+E) space) is preferred over Adjacency Matrix (O(V²)) for sparse graphs.` },
    { type: 'graph-viz' },
    { type: 'code', lang: 'C', title: 'BFS & DFS in C',
      code: `<span class="kw">#define</span> V <span class="num">6</span>
<span class="type">int</span> adj[V][V];

<span class="cmt">// BFS — O(V + E)</span>
<span class="type">void</span> <span class="fn">bfs</span>(<span class="type">int</span> s) {
    <span class="type">int</span> vis[V]={<span class="num">0</span>}, q[V], f=<span class="num">0</span>, r=<span class="num">0</span>;
    vis[s]=<span class="num">1</span>; q[r++]=s;
    <span class="kw">while</span>(f<r) {
        <span class="type">int</span> v=q[f++]; <span class="fn">printf</span>(<span class="str">"%d "</span>,v);
        <span class="kw">for</span>(<span class="type">int</span> i=<span class="num">0</span>;i<V;i++)
            <span class="kw">if</span>(adj[v][i]&&!vis[i]){vis[i]=<span class="num">1</span>;q[r++]=i;}
    }
}

<span class="cmt">// DFS — O(V + E)</span>
<span class="type">void</span> <span class="fn">dfs</span>(<span class="type">int</span> v, <span class="type">int</span> vis[]) {
    vis[v]=<span class="num">1</span>; <span class="fn">printf</span>(<span class="str">"%d "</span>,v);
    <span class="kw">for</span>(<span class="type">int</span> i=<span class="num">0</span>;i<V;i++)
        <span class="kw">if</span>(adj[v][i]&&!vis[i]) <span class="fn">dfs</span>(i,vis);
}` }
  ]
};

DSA_DATA.pages['dp'] = {
  title: 'Dynamic Programming', subtitle: 'Memoize overlapping subproblems for speed', icon: '🧮',
  sections: [
    { type: 'explanation', title: 'What is Dynamic Programming?',
      content: `DP = <strong>Recursion + Memoization</strong>. Store results of sub-problems to avoid recomputation.<br><br><strong>Top-Down</strong> (Memoization): Recursive + cache | <strong>Bottom-Up</strong> (Tabulation): Fill a table iteratively from base cases.` },
    { type: 'dp-viz' },
    { type: 'code', lang: 'C', title: 'Fibonacci DP & 0/1 Knapsack',
      code: `<span class="cmt">// Memoized Fibonacci — O(n)</span>
<span class="type">int</span> memo[<span class="num">100</span>];
<span class="type">int</span> <span class="fn">fib</span>(<span class="type">int</span> n) {
    <span class="kw">if</span>(n<=<span class="num">1</span>) <span class="kw">return</span> n;
    <span class="kw">if</span>(memo[n]!=-<span class="num">1</span>) <span class="kw">return</span> memo[n]; <span class="cmt">// Cache hit!</span>
    <span class="kw">return</span> memo[n] = <span class="fn">fib</span>(n-<span class="num">1</span>)+<span class="fn">fib</span>(n-<span class="num">2</span>);
}

<span class="cmt">// 0/1 Knapsack — O(n×W)</span>
<span class="type">int</span> <span class="fn">knapsack</span>(<span class="type">int</span> W, <span class="type">int</span> wt[], <span class="type">int</span> val[], <span class="type">int</span> n) {
    <span class="type">int</span> dp[n+<span class="num">1</span>][W+<span class="num">1</span>];
    <span class="kw">for</span>(<span class="type">int</span> i=<span class="num">0</span>;i<=n;i++) <span class="kw">for</span>(<span class="type">int</span> w=<span class="num">0</span>;w<=W;w++) {
        <span class="kw">if</span>(i==<span class="num">0</span>||w==<span class="num">0</span>) dp[i][w]=<span class="num">0</span>;
        <span class="kw">else if</span>(wt[i-<span class="num">1</span>]<=w)
            dp[i][w]=<span class="fn">max</span>(val[i-<span class="num">1</span>]+dp[i-<span class="num">1</span>][w-wt[i-<span class="num">1</span>]], dp[i-<span class="num">1</span>][w]);
        <span class="kw">else</span> dp[i][w]=dp[i-<span class="num">1</span>][w];
    }
    <span class="kw">return</span> dp[n][W];
}` },
    { type: 'callout', kind: 'info', text: '<strong>DP Hint:</strong> If a problem asks for minimum/maximum/count and has overlapping subproblems — think DP!' }
  ]
};

DSA_DATA.pages['heap'] = {
  title: 'Heap / Priority Queue', subtitle: 'Complete binary tree with heap property', icon: '⛰',
  sections: [
    { type: 'explanation', title: 'What is a Heap?',
      content: `A <strong>Max-Heap</strong>: every parent ≥ its children. The maximum element is always at the root.<br><br>Stored as an array: node at i → left child: <code>2i+1</code>, right: <code>2i+2</code>, parent: <code>(i-1)/2</code>` },
    { type: 'heap-viz' },
    { type: 'code', lang: 'C', title: 'Heap Operations in C',
      code: `<span class="type">void</span> <span class="fn">heapifyDown</span>(<span class="type">int</span> a[], <span class="type">int</span> n, <span class="type">int</span> i) {
    <span class="type">int</span> lg=i, l=<span class="num">2</span>*i+<span class="num">1</span>, r=<span class="num">2</span>*i+<span class="num">2</span>;
    <span class="kw">if</span>(l<n && a[l]>a[lg]) lg=l;
    <span class="kw">if</span>(r<n && a[r]>a[lg]) lg=r;
    <span class="kw">if</span>(lg!=i) { <span class="fn">swap</span>(&a[i],&a[lg]); <span class="fn">heapifyDown</span>(a,n,lg); }
}

<span class="cmt">// Build max heap — O(n)</span>
<span class="type">void</span> <span class="fn">buildHeap</span>(<span class="type">int</span> a[], <span class="type">int</span> n) {
    <span class="kw">for</span>(<span class="type">int</span> i=n/<span class="num">2</span>-<span class="num">1</span>; i>=<span class="num">0</span>; i--) <span class="fn">heapifyDown</span>(a,n,i);
}

<span class="cmt">// Heap Sort — O(n log n)</span>
<span class="type">void</span> <span class="fn">heapSort</span>(<span class="type">int</span> a[], <span class="type">int</span> n) {
    <span class="fn">buildHeap</span>(a,n);
    <span class="kw">for</span>(<span class="type">int</span> i=n-<span class="num">1</span>;i><span class="num">0</span>;i--) { <span class="fn">swap</span>(&a[<span class="num">0</span>],&a[i]); <span class="fn">heapifyDown</span>(a,i,<span class="num">0</span>); }
}` }
  ]
};

DSA_DATA.pages['trie'] = {
  title: 'Trie', subtitle: 'Prefix tree for O(L) string operations', icon: '🔤',
  sections: [
    { type: 'explanation', title: 'What is a Trie?',
      content: `A Trie stores strings where each path root→node = a prefix. Search is <strong>O(L)</strong> (L = word length), completely independent of how many words are stored!<br><br>Used in: Autocomplete, Spell-checkers, IP routing tables.` },
    { type: 'code', lang: 'C', title: 'Trie in C',
      code: `<span class="kw">#define</span> ALPHA <span class="num">26</span>
<span class="kw">struct</span> <span class="type">TrieNode</span> {
    <span class="kw">struct</span> <span class="type">TrieNode</span>* ch[ALPHA]; <span class="type">int</span> isEnd;
};

<span class="type">void</span> <span class="fn">insert</span>(<span class="kw">struct</span> <span class="type">TrieNode</span>* root, <span class="type">char</span>* w) {
    <span class="kw">struct</span> <span class="type">TrieNode</span>* c = root;
    <span class="kw">while</span>(*w) {
        <span class="type">int</span> i = *w-<span class="str">'a'</span>;
        <span class="kw">if</span>(!c->ch[i]) c->ch[i] = <span class="fn">newTrieNode</span>();
        c = c->ch[i]; w++;
    }
    c->isEnd = <span class="num">1</span>;
}

<span class="type">int</span> <span class="fn">search</span>(<span class="kw">struct</span> <span class="type">TrieNode</span>* root, <span class="type">char</span>* w) {
    <span class="kw">struct</span> <span class="type">TrieNode</span>* c = root;
    <span class="kw">while</span>(*w) {
        <span class="type">int</span> i = *w-<span class="str">'a'</span>;
        <span class="kw">if</span>(!c->ch[i]) <span class="kw">return</span> <span class="num">0</span>;
        c = c->ch[i]; w++;
    }
    <span class="kw">return</span> c->isEnd;
}` },
    { type: 'realworld', title: 'Real World Uses', items: [
      { icon: '🔍', title: 'Autocomplete', desc: 'Google search suggestions: as you type, trie finds all matching prefixes.', tag: 'Prefix Search' },
      { icon: '📝', title: 'Spell Checker', desc: 'IDE and Word spell-check: O(L) lookup per word typed.', tag: 'String' },
    ]}
  ]
};

DSA_DATA.pages['graph-algo'] = {
  title: 'Graph Algorithms', subtitle: "Dijkstra, Topological Sort, MST and more", icon: '🗺',
  sections: [
    { type: 'explanation', title: "Dijkstra's Shortest Path",
      content: `Finds shortest path from source to all vertices in a weighted graph (non-negative weights).<br><br>Uses a <strong>greedy approach</strong> with a min-heap: always process the nearest unvisited vertex. Time: <strong>O((V+E) log V)</strong>` },
    { type: 'code', lang: 'C', title: "Dijkstra's Algorithm",
      code: `<span class="kw">#define</span> V <span class="num">5</span>
<span class="kw">#define</span> INF <span class="num">99999</span>

<span class="type">int</span> <span class="fn">minVertex</span>(<span class="type">int</span> dist[], <span class="type">int</span> vis[]) {
    <span class="type">int</span> min=INF, idx=-<span class="num">1</span>;
    <span class="kw">for</span>(<span class="type">int</span> v=<span class="num">0</span>;v<V;v++)
        <span class="kw">if</span>(!vis[v]&&dist[v]<min){min=dist[v];idx=v;}
    <span class="kw">return</span> idx;
}
<span class="type">void</span> <span class="fn">dijkstra</span>(<span class="type">int</span> g[][V], <span class="type">int</span> src) {
    <span class="type">int</span> dist[V], vis[V]={<span class="num">0</span>};
    <span class="kw">for</span>(<span class="type">int</span> i=<span class="num">0</span>;i<V;i++) dist[i]=INF;
    dist[src]=<span class="num">0</span>;
    <span class="kw">for</span>(<span class="type">int</span> c=<span class="num">0</span>;c<V-<span class="num">1</span>;c++){
        <span class="type">int</span> u=<span class="fn">minVertex</span>(dist,vis); vis[u]=<span class="num">1</span>;
        <span class="kw">for</span>(<span class="type">int</span> v=<span class="num">0</span>;v<V;v++)
            <span class="kw">if</span>(!vis[v]&&g[u][v]&&dist[u]+g[u][v]<dist[v])
                dist[v]=dist[u]+g[u][v];
    }
}` }
  ]
};

DSA_DATA.pages['greedy'] = {
  title: 'Greedy Algorithms', subtitle: 'Locally optimal choices → globally optimal solution', icon: '💡',
  sections: [
    { type: 'explanation', title: 'Greedy Strategy',
      content: `Greedy makes the <strong>best local choice</strong> at each step without backtracking.<br><br>Works when the problem has: <strong>Greedy Choice Property</strong> + <strong>Optimal Substructure</strong>.` },
    { type: 'code', lang: 'C', title: 'Activity Selection & Coin Change',
      code: `<span class="cmt">// Activity Selection (max non-overlapping activities)</span>
<span class="type">void</span> <span class="fn">activitySelect</span>(<span class="type">int</span> s[], <span class="type">int</span> e[], <span class="type">int</span> n) {
    <span class="cmt">// Sort by end time first, then greedily pick</span>
    <span class="type">int</span> last = -<span class="num">1</span>;
    <span class="kw">for</span>(<span class="type">int</span> i=<span class="num">0</span>;i<n;i++)
        <span class="kw">if</span>(s[i] >= last) { <span class="fn">printf</span>(<span class="str">"A%d "</span>,i); last=e[i]; }
}

<span class="cmt">// Coin Change (greedy — works for standard denominations)</span>
<span class="type">void</span> <span class="fn">coinChange</span>(<span class="type">int</span> coins[], <span class="type">int</span> nc, <span class="type">int</span> amount) {
    <span class="cmt">// Use largest coin that fits</span>
    <span class="kw">for</span>(<span class="type">int</span> i=nc-<span class="num">1</span>; i>=<span class="num">0</span> && amount>0; i--)
        <span class="kw">while</span>(amount >= coins[i]) {
            <span class="fn">printf</span>(<span class="str">"%d "</span>, coins[i]);
            amount -= coins[i];
        }
}` },
    { type: 'realworld', title: 'Classic Greedy Problems', items: [
      { icon: '🪙', title: 'Coin Change', desc: 'Minimum coins for a value using largest denominations first.', tag: 'Greedy' },
      { icon: '📦', title: 'Fractional Knapsack', desc: 'Maximize value by taking highest value/weight ratio first.', tag: 'Greedy' },
      { icon: '🌲', title: "Prim's / Kruskal's", desc: 'Minimum Spanning Tree — greedy graph algorithms.', tag: 'Graph' },
    ]}
  ]
};

DSA_DATA.pages['divide'] = {
  title: 'Divide & Conquer', subtitle: 'Split → Solve → Combine', icon: '✂',
  sections: [
    { type: 'explanation', title: 'The D&C Paradigm',
      content: `<strong>1. Divide</strong> — Split into smaller sub-problems<br><strong>2. Conquer</strong> — Solve recursively<br><strong>3. Combine</strong> — Merge the results<br><br>Master Theorem governs D&C complexity: T(n) = aT(n/b) + f(n)` },
    { type: 'realworld', title: 'Classic D&C Algorithms', items: [
      { icon: '⇅', title: 'Merge Sort', desc: 'Divide array in half, sort each half, merge — O(n log n).', tag: 'Sorting' },
      { icon: '⚡', title: 'Quick Sort', desc: 'Partition around pivot, sort each partition recursively.', tag: 'Sorting' },
      { icon: '🔢', title: 'Binary Search', desc: 'Divide search space in half at each step — O(log n).', tag: 'Search' },
      { icon: '🔢', title: 'Strassen Matrix', desc: "Multiplies matrices in O(n^2.81) instead of O(n³).", tag: 'Matrix' },
    ]},
    { type: 'code', lang: 'C', title: 'Quick Sort in C',
      code: `<span class="type">int</span> <span class="fn">partition</span>(<span class="type">int</span> a[], <span class="type">int</span> lo, <span class="type">int</span> hi) {
    <span class="type">int</span> pivot=a[hi], i=lo-<span class="num">1</span>;
    <span class="kw">for</span>(<span class="type">int</span> j=lo;j<hi;j++)
        <span class="kw">if</span>(a[j]<=pivot) { i++; <span class="fn">swap</span>(&a[i],&a[j]); }
    <span class="fn">swap</span>(&a[i+<span class="num">1</span>],&a[hi]);
    <span class="kw">return</span> i+<span class="num">1</span>;
}
<span class="type">void</span> <span class="fn">quickSort</span>(<span class="type">int</span> a[], <span class="type">int</span> lo, <span class="type">int</span> hi) {
    <span class="kw">if</span>(lo<hi) {
        <span class="type">int</span> p=<span class="fn">partition</span>(a,lo,hi);
        <span class="fn">quickSort</span>(a,lo,p-<span class="num">1</span>); <span class="fn">quickSort</span>(a,p+<span class="num">1</span>,hi);
    }
}` }
  ]
};
