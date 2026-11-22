export type ConciergeLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ConciergeAnswer = {
  text: string;
  links?: ConciergeLink[];
};

type Intent = {
  keywords: string[];
  answer: ConciergeAnswer;
};

const intents: Intent[] = [
  {
    keywords: ["now", "current", "currently", "doing", "internship", "ibm", "edunet", "work"],
    answer: {
      text: "Srinath is currently an Artificial Intelligence Intern on the IBM SkillsBuild for University Engagements program, delivered by Edunet Foundation in collaboration with IBM SkillsBuild. The work covers generative AI, LLMs, IBM Granite, agentic AI with watsonx Orchestrate, RAG, IBM Cloud, and quantum computing. He also has frontend and AI internship experience from Decodelabs and Syntecxhub.",
      links: [
        { label: "View experience", href: "#record" },
        { label: "See the AI lab work", href: "/work/applied-ai-lab" },
      ],
    },
  },
  {
    keywords: ["project", "projects", "work", "portfolio", "build", "built", "github", "repo"],
    answer: {
      text: "His public work includes a Simple Rule-Based Chatbot, a forward-chaining Rule-Based Expert System, an A* Maze Solver, a DecodeLabs Responsive Web Layout, and a Static Web Design portfolio. The IBM internship also involved applied AI labs: a Nutrition Agent, Crop Recommendation System, RAG-based Recipe Generator, and College Admission Chatbot.",
      links: [
        { label: "Explore all work", href: "#work" },
        { label: "GitHub profile", href: "https://github.com/srinath29-git", external: true },
      ],
    },
  },
  {
    keywords: ["best", "favourite", "favorite", "highlight", "proud", "standout"],
    answer: {
      text: "The applied AI lab is the clearest picture of where he's heading — it connects generative AI, RAG, agents, and cloud tooling to practical briefs. For public code, the Rule-Based Expert System is the most complete demonstration of reasoning and explainability end to end.",
      links: [
        { label: "Applied AI Lab", href: "/work/applied-ai-lab" },
        { label: "Expert System", href: "/work/rule-based-expert-system" },
      ],
    },
  },
  {
    keywords: ["skill", "skills", "stack", "technology", "technologies", "tools", "python", "java", "python"],
    answer: {
      text: "His LinkedIn lists 26 skills. The core set spans Artificial Intelligence, Machine Learning, Data Science, Python, Java, SQL, JavaScript, HTML, CSS, frontend development, cloud computing, IBM Cloud, IBM Watson, Google Cloud Platform, BigQuery, IAM, network security, problem solving, and communication. He is currently exploring generative AI, agentic AI, RAG, and quantum computing.",
      links: [{ label: "See the capability matrix", href: "#skills" }],
    },
  },
  {
    keywords: ["education", "study", "studying", "college", "university", "btech", "b.tech", "degree", "student"],
    answer: {
      text: "He is pursuing a Bachelor of Technology in Computer Science at Malla Reddy (MR) Deemed to be University in Hyderabad, from September 2025 to 2029. His listed focus areas are data science, cloud computing, problem solving, and communication.",
      links: [{ label: "Education record", href: "#record" }],
    },
  },
  {
    keywords: ["cert", "certificate", "certification", "credential", "ibm", "google", "accenture", "course"],
    answer: {
      text: "Verified credentials include Getting Started with Artificial Intelligence from IBM (Aug 2026) and the Google Cloud Computing Foundations Certificate from Google Cloud (Jun 2026). Additional learning includes Accenture's Digital Skills: Artificial Intelligence course with a 91% score, a 46-hour Information Security course from Saylor University, Data Science for Everyone from Reliance Foundation, and participation in QuizOff 2026.",
      links: [{ label: "See the proof", href: "#proof" }],
    },
  },
  {
    keywords: ["resume", "cv", "download", "pdf"],
    answer: {
      text: "The résumé is a one-page PDF built from the same verified profile information. You can download it directly or view the web version.",
      links: [
        { label: "Download PDF", href: "/resume/Nallamothu-Srinath-Resume.pdf" },
        { label: "View résumé", href: "/resume" },
      ],
    },
  },
  {
    keywords: ["contact", "email", "reach", "hire", "connect", "available", "availability", "open"],
    answer: {
      text: "Srinath is open to internships, collaborations, and conversations about AI, data, cloud, and frontend engineering. You can email him at nallamothusrinath999@gmail.com or use the contact form on this site.",
      links: [
        { label: "Contact form", href: "#contact" },
        { label: "Send an email", href: "mailto:nallamothusrinath999@gmail.com", external: true },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/srinath2529", external: true },
      ],
    },
  },
  {
    keywords: ["location", "where", "based", "hyderabad", "remote", "relocate"],
    answer: {
      text: "He is based in Hyderabad, Telangana, India, and his internship experience has been remote-friendly. The portfolio lists him as open to remote work.",
      links: [{ label: "Get in touch", href: "#contact" }],
    },
  },
  {
    keywords: ["frontend", "front-end", "web", "design", "ui", "interface"],
    answer: {
      text: "His frontend work started with HTML, CSS, and JavaScript, then moved into a DecodeLabs internship building a responsive landing page with dark/light mode, responsive navigation, animated statistics, an FAQ accordion, and glassmorphism UI. He now cares about the full interface layer around AI systems.",
      links: [
        { label: "Responsive Web Layout", href: "/work/responsive-web-layout" },
        { label: "See the work", href: "#work" },
      ],
    },
  },
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "data science", "rag", "agent", "generative"],
    answer: {
      text: "His AI foundation comes from coursework and three internships. Public projects include a rule-based chatbot and a forward-chaining expert system; the IBM internship added exposure to generative AI, IBM Granite, agentic AI, watsonx Orchestrate, RAG, Watson Machine Learning, and IBM Quantum.",
      links: [{ label: "AI & ML work", href: "#work" }],
    },
  },
  {
    keywords: ["quantum", "ibm quantum"],
    answer: {
      text: "Quantum computing is an early exploration, not a claimed specialty. He was exposed to the IBM Quantum Platform during the IBM SkillsBuild AI & IBM Cloud internship and is curious about what changes when the underlying model of computation does.",
      links: [{ label: "Explore interests", href: "#next" }],
    },
  },
];

const fallback: ConciergeAnswer = {
  text: "I can only answer from Srinath's verified portfolio information. Try asking about his experience, projects, skills, education, certifications, résumé, or how to get in touch.",
  links: [
    { label: "About Srinath", href: "#about" },
    { label: "View work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
};

export function answerQuestion(question: string): ConciergeAnswer {
  const normalized = question.toLowerCase().replace(/[^\w\s+.#-]/g, " ");
  let best: { score: number; intent: Intent } | null = null;

  for (const intent of intents) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (normalized.includes(keyword)) {
        score += keyword.includes(" ") ? 3 : 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, intent };
    }
  }

  return best ? best.intent.answer : fallback;
}

export const conciergePrompts = [
  "What is Srinath doing now?",
  "Show me the strongest work.",
  "What are his core skills?",
  "How can I contact him?",
];
