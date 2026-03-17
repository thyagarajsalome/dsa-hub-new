// ============================================================
// DSA-HUB — Data Layer 
// Single Source of Truth for App Navigation & Code Snippets
// ============================================================

const DSA = {
  topics: [
    { id: 'home', icon: '⬡', name: 'Home', desc: 'Main dashboard' },
    { id: 'complexity', icon: '⏱', name: 'Time & Space Complexity', desc: 'Measuring algorithm efficiency with Big-O notation', difficulty: 'easy' },
    { id: 'arrays', icon: '▦', name: 'Arrays', desc: 'The most fundamental — contiguous memory storage', difficulty: 'easy' },
    { id: 'linkedlist', icon: '⛓', name: 'Linked Lists', desc: 'Dynamic nodes connected via pointers', difficulty: 'medium' },
    { id: 'stack', icon: '📚', name: 'Stacks', desc: 'Last In, First Out (LIFO) — like a stack of plates', difficulty: 'easy' },
    { id: 'queue', icon: '🎫', name: 'Queues', desc: 'First In, First Out (FIFO) — like a ticket line', difficulty: 'easy' },
    { id: 'trees', icon: '🌳', name: 'Trees & BST', desc: 'Hierarchical data with parent-child relationships', difficulty: 'medium' },
    { id: 'graphs', icon: '🕸', name: 'Graphs', desc: 'Vertices connected by edges — the most versatile DS', difficulty: 'hard' },
    { id: 'hashing', icon: '#', name: 'Hashing', desc: 'O(1) average access using hash functions', difficulty: 'medium' },
    { id: 'sorting', icon: '⇅', name: 'Sorting Algorithms', desc: 'From O(n²) basics to O(n log n) champions', difficulty: 'medium' },
    { id: 'searching', icon: '🔍', name: 'Searching Algorithms', desc: 'Finding elements efficiently', difficulty: 'easy' },
    { id: 'recursion', icon: '🔄', name: 'Recursion', desc: 'A function that calls itself to solve smaller sub-problems', difficulty: 'medium' },
    { id: 'dp', icon: '🧮', name: 'Dynamic Programming', desc: 'Memoize overlapping subproblems for speed', difficulty: 'hard' },
    { id: 'heap', icon: '⛰', name: 'Heap / Priority Queue', desc: 'Complete binary tree with heap property', difficulty: 'medium' },
    { id: 'trie', icon: '🔤', name: 'Trie', desc: 'Prefix tree for O(L) string operations', difficulty: 'hard' },
    { id: 'realworld', icon: '⊕', name: 'Real World Uses', desc: 'Everyday applications of Data Structures and Algorithms', difficulty: 'easy' }
  ],
  code: {
    array_basics: `int arr[5] = {10, 20, 30, 40, 50};

// Access — O(1)
int x = arr[2]; // x = 30

// Traverse — O(n)
for(int i=0; i<5; i++) {
    printf("%d ", arr[i]);
}

// Delete at index k — shift left O(n)
for(int j=k; j<n-1; j++) {
    arr[j] = arr[j+1];
}
n--;

// 2D Array (3×3 matrix)
int mat[3][3] = {
    {1,2,3},
    {4,5,6},
    {7,8,9}
};`,
    linkedlist_basics: `struct Node { 
    int data; 
    struct Node* next; 
};

struct Node* newNode(int val) {
    struct Node* n = malloc(sizeof(struct Node));
    n->data = val; 
    n->next = NULL;
    return n;
}

// Insert at front — O(1)
void insertFront(struct Node** head, int val) {
    struct Node* n = newNode(val);
    n->next = *head; 
    *head = n;
}

// Traverse & print — O(n)
void print(struct Node* head) {
    while(head) { 
        printf("%d→", head->data); 
        head = head->next; 
    }
    printf("NULL\\n");
}`,
    stack_basics: `#define MAX 100
struct Stack { int items[MAX], top; };
void init(struct Stack* s) { s->top = -1; }

// Push — O(1)
void push(struct Stack* s, int v) {
    if(s->top == MAX-1) { printf("Overflow!\\n"); return; }
    s->items[++s->top] = v;
}

// Pop — O(1)
int pop(struct Stack* s) {
    if(s->top == -1) { printf("Underflow!\\n"); return -1; }
    return s->items[s->top--];
}`,
    queue_basics: `#define MAX 100
struct Queue { int items[MAX], front, rear; };
void init(struct Queue* q) { q->front = q->rear = -1; }

// Enqueue — O(1)
void enqueue(struct Queue* q, int v) {
    if(q->rear == MAX-1) { printf("Full!\\n"); return; }
    if(q->front == -1) q->front = 0;
    q->items[++q->rear] = v;
}

// Dequeue — O(1)
int dequeue(struct Queue* q) {
    if(q->front == -1) { printf("Empty!\\n"); return -1; }
    int v = q->items[q->front++];
    if(q->front > q->rear) q->front = q->rear = -1;
    return v;
}`,
    bst_basics: `struct Node { int data; struct Node *left, *right; };

// Insert — O(log n) avg
struct Node* insert(struct Node* r, int v) {
    if(!r) return newNode(v);
    if(v < r->data) r->left = insert(r->left, v);
    else if(v > r->data) r->right = insert(r->right, v);
    return r;
}

// Inorder (sorted output!)
void inorder(struct Node* r) {
    if(!r) return;
    inorder(r->left);
    printf("%d ", r->data);
    inorder(r->right);
}`,
    graph_bfs_dfs: `#define V 6
int adj[V][V];

// BFS — O(V + E)
void bfs(int s) {
    int vis[V]={0}, q[V], f=0, r=0;
    vis[s]=1; q[r++]=s;
    while(f<r) {
        int v=q[f++]; printf("%d ",v);
        for(int i=0; i<V; i++)
            if(adj[v][i] && !vis[i]) { vis[i]=1; q[r++]=i; }
    }
}

// DFS — O(V + E)
void dfs(int v, int vis[]) {
    vis[v]=1; printf("%d ",v);
    for(int i=0; i<V; i++)
        if(adj[v][i] && !vis[i]) dfs(i,vis);
}`,
    hashing_basics: `#define SIZE 7
struct Node { int key, val; struct Node* next; };
struct Node* table[SIZE] = {0};

int hash(int key) { return key % SIZE; }

// Insert — O(1) avg
void insert(int key, int val) {
    int idx = hash(key);
    struct Node* n = newNode(key,val);
    n->next = table[idx]; table[idx] = n;
}

// Search — O(1) avg, O(n) worst
int search(int key) {
    struct Node* c = table[hash(key)];
    while(c){ if(c->key==key) return c->val; c=c->next; }
    return -1;
}`,
    bubble_sort: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    merge_sort: `void merge(int a[], int l, int m, int r) {
    int n1=m-l+1, n2=r-m, L[n1], R[n2], i=0,j=0,k=l;
    for(int x=0; x<n1; x++) L[x]=a[l+x];
    for(int x=0; x<n2; x++) R[x]=a[m+1+x];
    while(i<n1 && j<n2) a[k++]=L[i]<=R[j]?L[i++]:R[j++];
    while(i<n1) a[k++]=L[i++];
    while(j<n2) a[k++]=R[j++];
}

void mergeSort(int a[], int l, int r) {
    if(l<r) {
        int m=l+(r-l)/2;
        mergeSort(a,l,m); mergeSort(a,m+1,r); merge(a,l,m,r);
    }
}`,
    binary_search: `// Binary Search — O(log n)
int binarySearch(int arr[], int n, int key) {
    int lo=0, hi=n-1;
    while(lo <= hi) {
        int mid = lo + (hi-lo)/2;
        if(arr[mid] == key) return mid;   // Found!
        else if(arr[mid] < key) lo=mid+1; // Go right
        else hi = mid-1;                 // Go left
    }
    return -1; // Not found
}`,
    recursion_examples: `// Factorial: n! = n × (n-1)!
int factorial(int n) {
    if (n == 0) return 1;       // Base case
    return n * factorial(n-1);  // Recursive
}

// Fibonacci: F(n) = F(n-1) + F(n-2)
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}`,
    dp_examples: `// Memoized Fibonacci — O(n)
int memo[100];
int fib(int n) {
    if(n<=1) return n;
    if(memo[n]!=-1) return memo[n]; // Cache hit!
    return memo[n] = fib(n-1)+fib(n-2);
}

// 0/1 Knapsack — O(n×W)
int knapsack(int W, int wt[], int val[], int n) {
    int dp[n+1][W+1];
    for(int i=0; i<=n; i++) for(int w=0; w<=W; w++) {
        if(i==0||w==0) dp[i][w]=0;
        else if(wt[i-1]<=w)
            dp[i][w]=max(val[i-1]+dp[i-1][w-wt[i-1]], dp[i-1][w]);
        else dp[i][w]=dp[i-1][w];
    }
    return dp[n][W];
}`,
    heap_basics: `void heapifyDown(int a[], int n, int i) {
    int lg=i, l=2*i+1, r=2*i+2;
    if(l<n && a[l]>a[lg]) lg=l;
    if(r<n && a[r]>a[lg]) lg=r;
    if(lg!=i) { swap(&a[i],&a[lg]); heapifyDown(a,n,lg); }
}

// Build max heap — O(n)
void buildHeap(int a[], int n) {
    for(int i=n/2-1; i>=0; i--) heapifyDown(a,n,i);
}

// Heap Sort — O(n log n)
void heapSort(int a[], int n) {
    buildHeap(a,n);
    for(int i=n-1; i>0; i--) { swap(&a[0],&a[i]); heapifyDown(a,i,0); }
}`,
    trie_basics: `#define ALPHA 26
struct TrieNode {
    struct TrieNode* ch[ALPHA]; int isEnd;
};

void insert(struct TrieNode* root, char* w) {
    struct TrieNode* c = root;
    while(*w) {
        int i = *w-'a';
        if(!c->ch[i]) c->ch[i] = newTrieNode();
        c = c->ch[i]; w++;
    }
    c->isEnd = 1;
}

int search(struct TrieNode* root, char* w) {
    struct TrieNode* c = root;
    while(*w) {
        int i = *w-'a';
        if(!c->ch[i]) return 0;
        c = c->ch[i]; w++;
    }
    return c->isEnd;
}`
  }
};