export const siteConfig = {
  name: "Nallamothu Srinath",
  shortName: "Srinath",
  monogram: "NS",
  title: "Nallamothu Srinath — AI, Data & Interface Engineering",
  description:
    "Portfolio of Nallamothu Srinath, a B.Tech computer science student, AI intern at IBM SkillsBuild, and frontend developer building practical AI systems and interfaces.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "en_IN",
  timeZone: "Asia/Kolkata",
} as const;

export const profile = {
  name: "Nallamothu Srinath",
  firstName: "Nallamothu",
  shortName: "Srinath",
  monogram: "NS",
  pronouns: "He / Him",
  headline:
    "Frontend Developer Intern | Artificial Intelligence Intern | Student at Malla Reddy Deemed to be University",
  role: "AI intern & frontend developer",
  location: "Hyderabad, Telangana, India",
  locationShort: "Hyderabad, IN",
  coordinates: "17.3850° N / 78.4867° E",
  email: "nallamothusrinath999@gmail.com",
  github: "https://github.com/srinath29-git",
  githubHandle: "srinath29-git",
  linkedin: "https://www.linkedin.com/in/srinath2529",
  linkedinHandle: "srinath2529",
  avatar: "/images/srinath-profile.jpg",
  available: true,
  availability: "Open to internships & collaborations",
  currentRole: "AI & IBM Cloud Intern",
  currentOrg: "IBM SkillsBuild × Edunet Foundation",
  educationShort: "B.Tech Computer Science, 2025–2029",
  heroLine: "Intelligence, engineered. Interfaces, felt.",
  heroIntro:
    "I'm Srinath — a B.Tech computer science student and AI intern building practical AI systems, data-driven experiments, and web interfaces that make technology feel effortless.",
  aboutLead:
    "Curiosity is my default state. Building is how I make it useful.",
  aboutBody: [
    "I'm a B.Tech student passionate about artificial intelligence, data science, and software development. I enjoy learning new technologies, solving real-world problems, and building practical projects that strengthen my technical skills.",
    "I've gained hands-on experience through AI internships, working with Python, machine learning concepts, and web technologies while collaborating on real-world tasks. My core skills include Python, AI, data science, web development, cloud computing, Java, HTML, CSS, and problem-solving.",
    "Right now I'm exploring generative AI, agentic systems, retrieval-augmented generation, IBM Cloud, and quantum computing — and looking for opportunities to learn, collaborate, and grow as an aspiring AI and software engineer.",
  ],
  aboutQuote:
    "The most interesting work happens where a model meets an interface — where something intelligent becomes something people can actually use.",
  tags: [
    "Artificial Intelligence",
    "Data Science",
    "Frontend Development",
    "Cloud Computing",
    "Python",
    "Java",
    "SQL",
  ],
} as const;

export const socials = [
  {
    label: "GitHub",
    handle: "srinath29-git",
    href: profile.github,
    icon: "github" as const,
  },
  {
    label: "LinkedIn",
    handle: "srinath2529",
    href: profile.linkedin,
    icon: "linkedin" as const,
  },
  {
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
    icon: "mail" as const,
  },
];

export const navItems = [
  { label: "Index", href: "#top", index: "00" },
  { label: "About", href: "#about", index: "01" },
  { label: "Journey", href: "#journey", index: "02" },
  { label: "Record", href: "#record", index: "03" },
  { label: "Skills", href: "#skills", index: "04" },
  { label: "Work", href: "#work", index: "05" },
  { label: "Proof", href: "#proof", index: "06" },
  { label: "Contact", href: "#contact", index: "09" },
];

export const heroTicker = [
  "Python",
  "Generative AI",
  "Frontend engineering",
  "Data science",
  "IBM Cloud",
  "RAG",
  "Java",
  "Interface design",
  "Problem solving",
  "Continuous learning",
];

export const stats = [
  { value: "03", label: "Internships", detail: "AI + frontend, 2026" },
  { value: "07", label: "Public repos", detail: "On GitHub" },
  { value: "26", label: "LinkedIn skills", detail: "AI, data & web" },
  { value: "’29", label: "Graduating", detail: "B.Tech CSE" },
];

export const highlights = [
  {
    label: "Currently",
    value: "AI & IBM Cloud Intern",
    detail: "IBM SkillsBuild × Edunet Foundation",
  },
  {
    label: "Focus",
    value: "AI × Interface",
    detail: "Models, data, and the web",
  },
  {
    label: "Based in",
    value: "Hyderabad, India",
    detail: "Open to remote work",
  },
];

export type Experience = {
  id: string;
  role: string;
  company: string;
  context?: string;
  type: string;
  start: string;
  end: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  skills: string[];
  accent: string;
  current?: boolean;
};

export const experiences: Experience[] = [
  {
    id: "ibm",
    role: "Artificial Intelligence Intern",
    company: "IBM SkillsBuild",
    context: "via Edunet Foundation",
    type: "Internship",
    start: "2026-08",
    end: "Present",
    period: "Aug 2026 — Present",
    location: "Hyderabad, India · Remote",
    summary:
      "Selected for the IBM SkillsBuild for University Engagements internship in AI & IBM Cloud — a four-week program delivered by Edunet Foundation in collaboration with IBM SkillsBuild.",
    bullets: [
      "Working hands-on with generative AI, LLMs, IBM Granite, agentic AI, and IBM watsonx Orchestrate.",
      "Exploring machine learning, IBM Cloud, Watson Machine Learning, retrieval-augmented generation (RAG), and watsonx Assistant.",
      "Building through applied lab briefs: a Nutrition Agent, Crop Recommendation System, RAG-based Recipe Generator, and College Admission Chatbot.",
      "Getting practical exposure to IBM Data Refinery and quantum computing on the IBM Quantum Platform.",
    ],
    skills: [
      "Generative AI",
      "IBM Granite",
      "watsonx",
      "RAG",
      "IBM Cloud",
      "Machine Learning",
      "Quantum Computing",
    ],
    accent: "#4d8dff",
    current: true,
  },
  {
    id: "decodelabs",
    role: "Frontend Developer",
    company: "Decodelabs",
    type: "Internship",
    start: "2026-07",
    end: "2026-08",
    period: "Jul 2026 — Aug 2026",
    location: "Remote",
    summary:
      "Completed the DecodeLabs Virtual Internship Program in Frontend Development, building responsive layouts and strengthening problem-solving and debugging skills through real-world project work.",
    bullets: [
      "Built a fully responsive web layout with a mobile navigation, hero, services, testimonials, FAQ, and contact sections.",
      "Implemented dark/light mode, animated statistics, scroll reveal, glassmorphism, and a responsive grid with CSS Flexbox and Grid.",
      "Worked through collaborative development tasks with an emphasis on clean structure, debugging, and professional workflow.",
    ],
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Flexbox",
      "CSS Grid",
      "Responsive Design",
    ],
    accent: "#7ce7ff",
  },
  {
    id: "syntecxhub",
    role: "Artificial Intelligence Intern",
    company: "Syntecxhub",
    type: "Internship",
    start: "2026-07",
    end: "2026-08",
    period: "Jul 2026 — Aug 2026",
    location: "Remote",
    summary:
      "An AI internship focused on turning core artificial intelligence concepts into working Python systems — from search algorithms to rule-based reasoning and conversational agents.",
    bullets: [
      "Built a Maze Solver using A* search with a Manhattan-distance heuristic and Matplotlib visualisation.",
      "Implemented a rule-based expert system with a facts base, IF-THEN knowledge base, forward chaining, and an inference log.",
      "Developed a rule-based chatbot with intent matching, a knowledge base, console interaction, and conversation logging.",
    ],
    skills: [
      "Python",
      "Artificial Intelligence",
      "Data Science",
      "SQL",
      "A* Search",
      "Rule-Based Systems",
    ],
    accent: "#b8c6ff",
  },
];

export const education = {
  institution: "Malla Reddy (MR) Deemed to be University",
  degree: "Bachelor of Technology",
  field: "Computer Science",
  period: "Sep 2025 — 2029",
  location: "Hyderabad, Telangana, India",
  focus: ["Data Science", "Cloud Computing", "Problem Solving", "Communication"],
  note: "Currently pursuing a B.Tech in Computer Science with a focus on data science and cloud computing.",
  skills: [
    "Data Science",
    "Cloud Computing",
    "Skilled Multi-tasker",
    "Problem Solving",
    "Communication",
  ],
};

export type SkillGroup = {
  id: string;
  label: string;
  short: string;
  description: string;
  skills: { name: string; context: string; level: "core" | "working" | "exploring" }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    label: "AI & Machine Learning",
    short: "AI / ML",
    description:
      "The conceptual core: how intelligent systems reason, learn, and generate. Built through coursework, certifications, and hands-on AI internships.",
    skills: [
      { name: "Artificial Intelligence", context: "3 internships & IBM credential", level: "core" },
      { name: "Machine Learning", context: "IBM SkillsBuild & IBM credential", level: "core" },
      { name: "Data Science", context: "AI internship & coursework", level: "working" },
      { name: "Prompt Engineering", context: "Getting Started with AI", level: "working" },
      { name: "Reinforcement Learning", context: "IBM credential coursework", level: "working" },
      { name: "Unsupervised Learning", context: "IBM credential coursework", level: "working" },
      { name: "IBM Watson", context: "IBM SkillsBuild internship", level: "working" },
      { name: "Generative AI", context: "IBM SkillsBuild internship", level: "exploring" },
      { name: "Agentic AI", context: "watsonx Orchestrate labs", level: "exploring" },
      { name: "RAG", context: "RAG recipe generator lab", level: "exploring" },
    ],
  },
  {
    id: "languages",
    label: "Languages & Data",
    short: "Languages",
    description:
      "The languages I use to turn ideas into working software — from Python notebooks and algorithms to SQL queries and interactive browser code.",
    skills: [
      { name: "Python", context: "AI internship projects", level: "core" },
      { name: "Java", context: "2 experiences on LinkedIn", level: "working" },
      { name: "SQL", context: "AI internship at Syntecxhub", level: "working" },
      { name: "JavaScript", context: "Frontend at Decodelabs", level: "working" },
      { name: "HTML", context: "Frontend at Decodelabs", level: "core" },
      { name: "HTML5", context: "Frontend at Decodelabs", level: "working" },
      { name: "CSS", context: "Frontend at Decodelabs", level: "core" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Security",
    short: "Cloud",
    description:
      "Cloud foundations from IBM and Google Cloud — storage, compute, identity, network security, and the data tools that make AI systems operable.",
    skills: [
      { name: "IBM Cloud", context: "IBM SkillsBuild internship", level: "working" },
      { name: "Cloud Computing", context: "IBM, Google Cloud & university", level: "working" },
      { name: "Google Cloud Platform", context: "Google Cloud certificate", level: "working" },
      { name: "Google BigQuery", context: "Google Cloud certificate", level: "working" },
      { name: "Google App Engine", context: "Google Cloud certificate", level: "working" },
      { name: "Cloud Storage", context: "Google Cloud certificate", level: "working" },
      { name: "Identity & Access Management", context: "Google Cloud certificate", level: "working" },
      { name: "Network Security", context: "Google Cloud certificate", level: "working" },
    ],
  },
  {
    id: "craft",
    label: "Frontend & Craft",
    short: "Frontend",
    description:
      "The interface layer: structuring responsive layouts, shaping interactions, debugging the details, and communicating clearly with the people around the work.",
    skills: [
      { name: "Front-End Development", context: "Decodelabs internship", level: "core" },
      { name: "Responsive Design", context: "DecodeLabs web layout", level: "working" },
      { name: "Flexbox", context: "DecodeLabs web layout", level: "working" },
      { name: "CSS Grid", context: "DecodeLabs web layout", level: "working" },
      { name: "Problem Solving", context: "University & internships", level: "core" },
      { name: "Communication", context: "University & team projects", level: "working" },
      { name: "Skilled Multi-tasker", context: "University", level: "working" },
    ],
  },
];

export const exploring = [
  "Generative AI",
  "Agentic AI",
  "Retrieval-augmented generation",
  "IBM watsonx",
  "Quantum computing",
  "Interface engineering",
];

export type ProjectCategory = "Applied AI" | "AI & ML" | "Frontend" | "Algorithms";

export type Project = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  categories: ProjectCategory[];
  year: string;
  stack: string[];
  repo: string | null;
  githubRepo?: string;
  live: string | null;
  featured: boolean;
  status: string;
  cover: "amixy" | "agents" | "chat" | "rules" | "maze" | "responsive" | "static";
  role: string;
  timeline: string;
  highlights: string[];
  problem: string;
  approach: string[];
  buildNotes: { title: string; body: string }[];
  learning: string;
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "amixy-ai-core",
    index: "01",
    title: "AMIXY AI Core",
    shortTitle: "AMIXY",
    tagline: "One chat surface, multiple AI models, real streaming.",
    description:
      "A production-ready, multi-provider AI assistant built with React 19, TypeScript, Vite, Tailwind CSS 4, and Convex. AMIXY streams answers from OpenAI and Google Gemini, keeps conversation memory, and bundles eight focused AI tools — from image generation and research to a code lab and prompt optimizer.",
    category: "Applied AI",
    categories: ["Applied AI", "Frontend"],
    year: "2026",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "Convex",
      "OpenAI",
      "Google Gemini",
    ],
    repo: "https://github.com/srinath29-git/amixy-ai-core",
    githubRepo: "amixy-ai-core",
    live: "https://ownai.freebuff.app",
    featured: true,
    status: "Live · public repository",
    cover: "amixy",
    role: "Design & engineering",
    timeline: "Sep 2026",
    highlights: [
      "OpenAI GPT-4o / GPT-4o mini and Google Gemini in one interface",
      "Real SSE token streaming with stop, regenerate, edit & resend",
      "Eight AI tools: compare, image studio, app builder, research, code lab, documents, prompt lab, websites",
      "Server-side provider routing and encrypted credential storage on Convex",
    ],
    problem:
      "Most AI chat apps lock you into one provider and hide the plumbing. The brief for AMIXY was the opposite: make multiple providers feel like one coherent product, keep the streaming experience honest, and give each model room to be compared rather than quietly substituted.",
    approach: [
      "Built the interface in React 19 and TypeScript, with Tailwind CSS 4 for a consistent visual system across mobile, tablet, and desktop.",
      "Moved provider calls and streaming behind Convex so API keys never live in the browser and every request is validated server-side.",
      "Implemented SSE streaming in the client with abort support, preserving partial responses when generation is stopped or a stream fails.",
      "Added an explicit provider router: free, Gemini, or OpenAI is chosen by the user and never silently swapped on failure.",
      "Layered in tools — compare, image studio, app builder, research, code lab, documents, prompt lab, and website generation — on the same model layer.",
    ],
    buildNotes: [
      {
        title: "Streaming that can stop",
        body: "Tokens arrive over SSE. Stop preserves the partial answer; regenerate, retry, and edit-and-resend reuse the same engine instead of bolting on separate flows.",
      },
      {
        title: "Provider truth",
        body: "Model IDs are sent unchanged and errors are classified and surfaced verbatim. There is no fallback path that quietly answers from a different model.",
      },
      {
        title: "Security boundary",
        body: "User credentials are encrypted with AES-256-GCM and scoped to the signed-in account. The client receives masked metadata, never the key.",
      },
    ],
    learning:
      "A multi-model product is mostly a trust problem. The interesting engineering is not calling two APIs — it is making routing, failure, and streaming legible enough that the person typing can believe what they see.",
    note: "Live app and public repository were verified in November 2026. The app is deployed at ownai.freebuff.app.",
  },
  {
    slug: "applied-ai-lab",
    index: "02",
    title: "Applied AI Lab",
    shortTitle: "Applied AI Lab",
    tagline: "Four AI briefs. One internship. A lot of context.",
    description:
      "Applied lab work from the IBM SkillsBuild AI & IBM Cloud internship — a Nutrition Agent, Crop Recommendation System, RAG-based Recipe Generator, and College Admission Chatbot.",
    category: "Applied AI",
    categories: ["Applied AI", "AI & ML"],
    year: "2026",
    stack: [
      "Generative AI",
      "IBM Granite",
      "watsonx Orchestrate",
      "RAG",
      "watsonx Assistant",
      "IBM Cloud",
    ],
    repo: null,
    live: null,
    featured: true,
    status: "Internship work · not public",
    cover: "agents",
    role: "AI intern · lab build",
    timeline: "Aug 2026 — present",
    highlights: [
      "Nutrition Agent",
      "Crop Recommendation System",
      "RAG-based Recipe Generator",
      "College Admission Chatbot",
    ],
    problem:
      "The internship framed four practical briefs around the same question: how do you take modern AI capabilities and put them behind an interface that a real person can use?",
    approach: [
      "Explored agentic patterns with IBM watsonx Orchestrate and conversational design with watsonx Assistant.",
      "Worked with retrieval-augmented generation to ground a recipe assistant in relevant context rather than open-ended generation.",
      "Used IBM Cloud and Watson Machine Learning as the platform layer for the labs.",
      "Documented scope, tools, and build notes without presenting internship labs as shipped products.",
    ],
    buildNotes: [
      {
        title: "Nutrition Agent",
        body: "An agent brief focused on nutrition guidance, built with agentic AI concepts and IBM watsonx tooling.",
      },
      {
        title: "Crop Recommendation System",
        body: "A recommendation brief exploring how data can support crop selection decisions.",
      },
      {
        title: "RAG-based Recipe Generator",
        body: "A retrieval-augmented generation experiment: retrieve context, then generate a useful recipe response.",
      },
      {
        title: "College Admission Chatbot",
        body: "A conversational brief using watsonx Assistant to help prospective students navigate admission questions.",
      },
    ],
    learning:
      "The biggest shift was moving from 'a model that answers' to 'a system that knows what context it needs, which tool to call, and how to explain itself.' That systems view is what I want to keep building on.",
    note: "These were internship lab briefs. No public repository or production metrics exist, so none are claimed here.",
  },
  {
    slug: "rule-based-chatbot",
    index: "03",
    title: "Simple Rule-Based Chatbot",
    shortTitle: "Rule-Based Chatbot",
    tagline: "A small conversational system that knows what it knows.",
    description:
      "A Python chatbot built on rule-based pattern matching — with intents for greetings, help and small talk, a knowledge base, a console interface, and conversation logging.",
    category: "AI & ML",
    categories: ["AI & ML", "Algorithms"],
    year: "2026",
    stack: ["Python", "OOP", "Pattern Matching", "File Handling"],
    repo: "https://github.com/srinath29-git/Simple-Rule-Based-Chatbot",
    githubRepo: "Simple-Rule-Based-Chatbot",
    live: null,
    featured: true,
    status: "Public repository",
    cover: "chat",
    role: "Design & build",
    timeline: "Jul — Aug 2026",
    highlights: [
      "Greeting, help, and small-talk intents",
      "Predefined knowledge base",
      "Interactive console experience",
      "Conversation history logging",
    ],
    problem:
      "Build a chatbot that feels conversational without hiding behind a large language model — a system simple enough to understand end to end, but structured well enough to extend.",
    approach: [
      "Separated intents, knowledge, logging, and the chat loop into distinct modules.",
      "Used rule-based pattern matching to route user messages to the right response.",
      "Kept a knowledge base for predefined questions and answers.",
      "Logged conversations to a text file so future iterations could learn from real exchanges.",
    ],
    buildNotes: [
      {
        title: "Modular by design",
        body: "main.py runs the loop, chatbot.py handles intent routing, knowledge_base.py stores answers, and logger.py records each conversation.",
      },
      {
        title: "Intent-first interaction",
        body: "Greetings, help, and small talk are handled as first-class intents rather than one large conditional block.",
      },
      {
        title: "Built for iteration",
        body: "The conversation log creates a feedback loop: read what people actually asked, then improve the knowledge base.",
      },
    ],
    learning:
      "Rule-based systems teach the value of legible behaviour. Every response has a reason, and every failure is a rule I can inspect and improve.",
  },
  {
    slug: "rule-based-expert-system",
    index: "04",
    title: "Rule-Based Expert System",
    shortTitle: "Expert System",
    tagline: "Forward chaining, made legible.",
    description:
      "A Python expert system that accepts symptoms as facts, applies IF-THEN rules, and shows the reasoning path behind each possible diagnosis and recommendation.",
    category: "AI & ML",
    categories: ["AI & ML", "Algorithms"],
    year: "2026",
    stack: ["Python", "Forward Chaining", "Rule Engine", "Knowledge Base"],
    repo: "https://github.com/srinath29-git/Rule_Based_Expert_System",
    githubRepo: "Rule_Based_Expert_System",
    live: null,
    featured: true,
    status: "Public repository",
    cover: "rules",
    role: "Design & build",
    timeline: "Jul 2026",
    highlights: [
      "Facts base built from user symptoms",
      "IF-THEN knowledge base",
      "Multi-step forward chaining",
      "Visible inference log",
    ],
    problem:
      "Create a small expert system that can reason from symptoms to a possible diagnosis — and, just as importantly, explain how it got there.",
    approach: [
      "Accepted symptoms as input and stored them as facts.",
      "Applied IF-THEN rules through a forward-chaining inference engine.",
      "Allowed newly inferred facts to trigger additional rules until no more could be applied.",
      "Displayed the full reasoning path alongside the diagnosis and recommendations.",
    ],
    buildNotes: [
      {
        title: "A real inference loop",
        body: "The engine does not stop at the first match. New facts feed back into the rule set, enabling multi-step reasoning.",
      },
      {
        title: "Explainability as a feature",
        body: "Every applied rule is printed in an inference log, making the system's reasoning auditable rather than opaque.",
      },
      {
        title: "A clean knowledge boundary",
        body: "Rules, facts, and the inference engine live in separate files, so the knowledge base can grow without rewriting the engine.",
      },
    ],
    learning:
      "Explainability is not a layer added after the fact. In a rule-based system, the reasoning path is the product — and that idea carries into how I think about AI interfaces.",
  },
  {
    slug: "responsive-web-layout",
    index: "05",
    title: "Responsive Web Layout",
    shortTitle: "Responsive Layout",
    tagline: "A responsive system, not just a page.",
    description:
      "A responsive landing page built for a DecodeLabs frontend assignment: mobile-first layout, dark/light mode, animated counters, FAQ accordion, and glassmorphism UI.",
    category: "Frontend",
    categories: ["Frontend"],
    year: "2026",
    stack: ["HTML5", "CSS3", "JavaScript", "Flexbox", "CSS Grid"],
    repo: "https://github.com/srinath29-git/Responsive_Web_Layout",
    githubRepo: "Responsive_Web_Layout",
    live: null,
    featured: true,
    status: "Public repository",
    cover: "responsive",
    role: "Frontend build",
    timeline: "Jul 2026",
    highlights: [
      "Fully responsive navigation and layout",
      "Dark / light mode toggle",
      "Animated statistics & scroll reveal",
      "FAQ accordion and contact form",
    ],
    problem:
      "Take a broad frontend brief — a modern, responsive landing page — and make every section work as a coherent system across mobile, tablet, and desktop.",
    approach: [
      "Started with a mobile-first layout, then expanded the grid at larger breakpoints.",
      "Used Flexbox and CSS Grid for layout rather than fixed widths.",
      "Added JavaScript for the mobile menu, theme toggle, animated counters, FAQ accordion, and scroll-to-top behaviour.",
      "Applied glassmorphism and gradient accents while keeping the content hierarchy clear.",
    ],
    buildNotes: [
      {
        title: "Responsive from the ground up",
        body: "A mobile-first structure, a responsive navigation pattern, and a layout that scales without losing hierarchy.",
      },
      {
        title: "Interaction layer",
        body: "Theme persistence, FAQ accordion, animated statistics, scroll reveal, and a scroll-to-top control bring the static layout to life.",
      },
      {
        title: "Visual system",
        body: "Glass surfaces, modern gradients, and consistent spacing create a polished UI without sacrificing readability.",
      },
    ],
    learning:
      "Responsive design is a set of decisions, not a media query at the end. Building the small screen first forced me to decide what actually mattered in each section.",
  },
  {
    slug: "maze-solver",
    index: "06",
    title: "Maze Solver",
    shortTitle: "Maze Solver",
    tagline: "The shortest path, visualised.",
    description:
      "An A* search implementation with a Manhattan-distance heuristic that reads a maze from a file, finds the shortest path, and renders the result with Matplotlib.",
    category: "Algorithms",
    categories: ["Algorithms", "AI & ML"],
    year: "2026",
    stack: ["Python", "A* Search", "Heapq", "NumPy", "Matplotlib"],
    repo: "https://github.com/srinath29-git/Maze_Solver",
    githubRepo: "Maze_Solver",
    live: null,
    featured: false,
    status: "Public repository",
    cover: "maze",
    role: "Design & build",
    timeline: "Jul 2026",
    highlights: [
      "Reads a maze from a text file",
      "A* with Manhattan-distance heuristic",
      "Heap-based priority queue",
      "Console + graphical visualisation",
    ],
    problem:
      "Implement a classic search algorithm in a way that makes the result visible, not just a console output.",
    approach: [
      "Parsed the maze file and located the start and goal cells.",
      "Used a heap-based priority queue to explore candidates in A* order.",
      "Applied Manhattan distance as the heuristic for a grid with four-direction movement.",
      "Printed the maze and shortest path, then rendered a Matplotlib visualisation saved as an image.",
    ],
    buildNotes: [
      {
        title: "A* from first principles",
        body: "A priority queue, a cost-so-far map, and a heuristic combine to find the shortest path without exploring every possible route.",
      },
      {
        title: "Visual output",
        body: "The path is printed in the console and rendered graphically with Matplotlib, making the algorithm's behaviour easy to inspect.",
      },
      {
        title: "Practical structure",
        body: "Maze input, solving logic, dependencies, and visualisation stay separate and runnable.",
      },
    ],
    learning:
      "Heuristics are a design choice, not a detail. The right heuristic changes the search; the wrong one quietly changes the answer.",
  },
  {
    slug: "static-web-design",
    index: "07",
    title: "Static Web Design",
    shortTitle: "Static Web Design",
    tagline: "A portfolio before the portfolio.",
    description:
      "A modern personal portfolio built with HTML and CSS — responsive sections, smooth navigation, project cards, and a contact form.",
    category: "Frontend",
    categories: ["Frontend"],
    year: "2026",
    stack: ["HTML5", "CSS3", "Font Awesome", "Google Fonts"],
    repo: "https://github.com/srinath29-git/Static_Web_Design",
    githubRepo: "Static_Web_Design",
    live: null,
    featured: false,
    status: "Public repository",
    cover: "static",
    role: "Design & build",
    timeline: "Jul 2026",
    highlights: [
      "Responsive personal portfolio",
      "Hero, about, skills, projects, and education sections",
      "Modern visual hierarchy",
      "Contact section",
    ],
    problem:
      "Build a personal portfolio from scratch with only HTML and CSS — a constraint that forces a clear structure and a strong visual system.",
    approach: [
      "Structured the page around a clear narrative: introduction, about, skills, projects, education, contact.",
      "Built a responsive layout with consistent spacing and typography.",
      "Used Font Awesome and Google Fonts to add character without a framework.",
      "Kept the markup semantic and the styling modular.",
    ],
    buildNotes: [
      {
        title: "Content first",
        body: "Every section earns its place in the story. The structure reads like a narrative, not a checklist.",
      },
      {
        title: "Constraint as a teacher",
        body: "Without a component library, layout and spacing decisions have to be intentional and repeatable.",
      },
      {
        title: "Foundation for this portfolio",
        body: "This project was an early attempt at the same question: how should my work be presented so it feels like me?",
      },
    ],
    learning:
      "A portfolio is a design problem before it is a technology problem. The constraint of plain HTML and CSS made that obvious.",
  },
];

export const projectFilters = [
  "All",
  "Applied AI",
  "AI & ML",
  "Frontend",
  "Algorithms",
] as const;

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  skills: string[];
  credentialUrl: string;
  note: string;
  mark: string;
};

export const certifications: Certification[] = [
  {
    id: "ibm-ai",
    title: "Getting Started with Artificial Intelligence",
    issuer: "IBM",
    issued: "Aug 2026",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Prompt Engineering",
      "Reinforcement Learning",
      "Unsupervised Learning",
    ],
    credentialUrl:
      "https://www.credly.com/badges/deef6228-4698-4d0e-a4d1-ea2e4695f539/linked_in_profile",
    note: "Verified Credly badge issued through IBM SkillsBuild.",
    mark: "IBM",
  },
  {
    id: "google-cloud",
    title: "Google Cloud Computing Foundations Certificate",
    issuer: "Google Cloud",
    issued: "Jun 2026",
    skills: [
      "Cloud Computing",
      "Google Cloud Platform",
      "Google BigQuery",
      "Google App Engine",
      "Cloud Storage",
      "Network Security",
      "Identity & Access Management",
    ],
    credentialUrl:
      "https://www.credly.com/badges/d5dfb16d-1bf6-4b81-9991-2a5a8acfee68/linked_in_profile",
    note: "Verified Credly badge from Google Cloud.",
    mark: "G",
  },
];

export type LearningItem = {
  title: string;
  issuer: string;
  date: string;
  detail: string;
  meta?: string;
  type: "Course" | "Program" | "Participation";
};

export const learningLog: LearningItem[] = [
  {
    title: "Digital Skills: Artificial Intelligence",
    issuer: "Accenture",
    date: "2026",
    detail:
      "Completed the course with an overall score of 91%, covering AI fundamentals, generative AI, automation, and the relationship between AI and humans at work.",
    meta: "Overall score 91%",
    type: "Course",
  },
  {
    title: "Information Security",
    issuer: "Saylor University · Skill India Digital Hub",
    date: "30 Jul 2026",
    detail:
      "Completed a 46-hour online skilling course covering information security concepts, cybersecurity fundamentals, and protecting digital information.",
    meta: "46 hours",
    type: "Course",
  },
  {
    title: "Data Science for Everyone",
    issuer: "Reliance Foundation Skilling Academy",
    date: "2026",
    detail:
      "Built foundational understanding of data science, data-driven thinking, and analytical concepts across industries.",
    type: "Course",
  },
  {
    title: "QuizOff 2026 — India's Biggest AI Quiz",
    issuer: "CampusCrew · Unstop",
    date: "2026",
    detail:
      "Participated in an AI quiz that brought together 5,25,000+ students from 48,500+ institutions across 35+ countries.",
    meta: "5.25L+ participants",
    type: "Participation",
  },
];

export type TimelineItem = {
  id: string;
  year: string;
  date: string;
  title: string;
  org: string;
  type: "Education" | "Internship" | "Certification" | "Milestone";
  description: string;
  tags: string[];
  relatedProject?: string;
};

export const timeline: TimelineItem[] = [
  {
    id: "now",
    year: "Now",
    date: "Present",
    title: "Building at the AI × interface layer",
    org: "Hyderabad, India",
    type: "Milestone",
    description:
      "Currently interning in AI & IBM Cloud, exploring generative AI and agentic systems, and looking for the next opportunity to learn, collaborate, and build.",
    tags: ["Generative AI", "RAG", "Frontend", "Open to work"],
  },
  {
    id: "ibm",
    year: "2026",
    date: "Aug 2026",
    title: "Selected for IBM SkillsBuild AI & IBM Cloud internship",
    org: "IBM SkillsBuild × Edunet Foundation",
    type: "Internship",
    description:
      "Started a four-week AI & IBM Cloud internship for university engagements, working with IBM Granite, watsonx Orchestrate, RAG, Watson Machine Learning, and IBM Quantum.",
    tags: ["IBM Cloud", "watsonx", "RAG", "Agents"],
    relatedProject: "applied-ai-lab",
  },
  {
    id: "ibm-cert",
    year: "2026",
    date: "Aug 2026",
    title: "Earned the IBM Getting Started with AI credential",
    org: "IBM",
    type: "Certification",
    description:
      "Completed IBM's AI foundation credential, covering artificial intelligence, machine learning, prompt engineering, reinforcement learning, and unsupervised learning.",
    tags: ["Artificial Intelligence", "Machine Learning", "Prompt Engineering"],
  },
  {
    id: "decodelabs",
    year: "2026",
    date: "Jul — Aug 2026",
    title: "Frontend Developer internship at Decodelabs",
    org: "Decodelabs",
    type: "Internship",
    description:
      "Completed the DecodeLabs virtual frontend internship, building responsive layouts and strengthening debugging, collaboration, and frontend fundamentals.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive design"],
    relatedProject: "responsive-web-layout",
  },
  {
    id: "syntecxhub",
    year: "2026",
    date: "Jul — Aug 2026",
    title: "Artificial Intelligence internship at Syntecxhub",
    org: "Syntecxhub",
    type: "Internship",
    description:
      "Turned AI fundamentals into working Python systems: an A* maze solver, a forward-chaining expert system, and a rule-based chatbot.",
    tags: ["Python", "A*", "Expert systems", "Chatbots"],
    relatedProject: "rule-based-expert-system",
  },
  {
    id: "google",
    year: "2026",
    date: "Jun 2026",
    title: "Google Cloud Computing Foundations Certificate",
    org: "Google Cloud",
    type: "Certification",
    description:
      "Built cloud foundations across Google Cloud Platform, BigQuery, App Engine, cloud storage, network security, and identity and access management.",
    tags: ["Google Cloud", "BigQuery", "Cloud Storage", "IAM"],
  },
  {
    id: "btech",
    year: "2025",
    date: "Sep 2025",
    title: "Started B.Tech in Computer Science",
    org: "Malla Reddy (MR) Deemed to be University",
    type: "Education",
    description:
      "Began a B.Tech in Computer Science with a focus on data science, cloud computing, problem solving, and communication. Expected graduation: 2029.",
    tags: ["Computer Science", "Data Science", "Cloud Computing"],
  },
];

export const interests = [
  {
    index: "01",
    title: "Applied AI",
    body: "Generative models, agentic workflows, and retrieval systems. I'm most interested in the unglamorous middle: context, tools, evaluation, and the interface that makes it all usable.",
    tags: ["Generative AI", "Agents", "RAG"],
  },
  {
    index: "02",
    title: "Interface craft",
    body: "Responsive layouts, motion, typography, and interaction details. The web is where an idea becomes something another person can actually touch.",
    tags: ["Frontend", "Motion", "Accessibility"],
  },
  {
    index: "03",
    title: "Cloud & data",
    body: "How intelligent systems are deployed, stored, secured, and observed. IBM Cloud and Google Cloud are the two platforms I've explored so far.",
    tags: ["IBM Cloud", "GCP", "Data"],
  },
  {
    index: "04",
    title: "Quantum curiosity",
    body: "Early exposure through the IBM Quantum Platform during my AI internship. Not an expert — just genuinely curious about what changes when the underlying model of computation does.",
    tags: ["IBM Quantum", "Exploring"],
  },
];

export const principles = [
  {
    index: "01",
    title: "Learn by building",
    body: "Every concept I've studied has become more real when it turns into a repository, a running program, or a page someone can use.",
  },
  {
    index: "02",
    title: "Make complexity legible",
    body: "A reasoning log, a clear README, a well-named component. The best technical work explains itself.",
  },
  {
    index: "03",
    title: "Ship the interface, not just the model",
    body: "Intelligence is only useful when it reaches a person. I care about both the system underneath and the experience on top.",
  },
];

export const goals = [
  "Grow into an AI and software engineer who can take an idea from model to interface.",
  "Keep learning in public through internships, certifications, and real projects.",
  "Contribute to work that solves practical problems — and feels considered to use.",
];

export const contactCopy = {
  eyebrow: "Have a problem worth solving?",
  title: "Let's make it real.",
  body: "I'm open to internships, collaborations, and conversations about AI, data, cloud, and frontend engineering. If there's something interesting on your mind, my inbox is open.",
};
