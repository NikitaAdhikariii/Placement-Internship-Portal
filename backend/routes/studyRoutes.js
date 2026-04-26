const express = require("express");
const router = express.Router();

const studyMaterial = {
  Google: {
    rounds: ["Online assessment (DSA)", "Phone screen", "3x technical", "System design", "Googleyness"],
    topics: [
      { name: "Arrays & strings", difficulty: "easy" },
      { name: "Trees & graphs", difficulty: "medium" },
      { name: "Dynamic programming", difficulty: "hard" },
      { name: "System design at scale", difficulty: "hard" },
      { name: "Behavioral (STAR method)", difficulty: "easy" }
    ],
    resources: [
      { name: "Blind 75 LeetCode list", type: "DSA", url: "https://leetcode.com/discuss/general-discussion/460599" },
      { name: "Designing Data-Intensive Applications", type: "Book", url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/" },
      { name: "NeetCode.io", type: "Video", url: "https://neetcode.io" },
      { name: "System Design Primer", type: "GitHub", url: "https://github.com/donnemartin/system-design-primer" }
    ],
    tip: "Google values problem-solving process over correct answers. Always think out loud."
  },
  Amazon: {
    rounds: ["Online assessment", "2x technical", "Bar raiser", "Leadership Principles interview"],
    topics: [
      { name: "Arrays & sorting", difficulty: "easy" },
      { name: "Trees & recursion", difficulty: "medium" },
      { name: "Amazon Leadership Principles (16)", difficulty: "medium" },
      { name: "OOP design", difficulty: "medium" },
      { name: "Concurrency basics", difficulty: "hard" }
    ],
    resources: [
      { name: "Amazon LP answer bank", type: "Guide", url: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles" },
      { name: "Grokking System Design", type: "Course", url: "https://www.designgurus.io/course/grokking-the-system-design-interview" },
      { name: "LeetCode Amazon tag", type: "DSA", url: "https://leetcode.com/company/amazon/" },
      { name: "InterviewBit", type: "Practice", url: "https://www.interviewbit.com" }
    ],
    tip: "Amazon is heavy on Leadership Principles — prepare 2 STAR stories per principle."
  },
  Microsoft: {
    rounds: ["Online assessment", "3x technical", "As-appropriate round"],
    topics: [
      { name: "Linked lists", difficulty: "easy" },
      { name: "Binary search", difficulty: "easy" },
      { name: "Graph BFS/DFS", difficulty: "medium" },
      { name: "OOP & design patterns", difficulty: "medium" },
      { name: "SQL & databases", difficulty: "easy" }
    ],
    resources: [
      { name: "LeetCode Microsoft tag", type: "DSA", url: "https://leetcode.com/company/microsoft/" },
      { name: "Head First Design Patterns", type: "Book", url: "https://www.oreilly.com/library/view/head-first-design/0596007124/" },
      { name: "Azure Fundamentals (AZ-900)", type: "Cert", url: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/" },
      { name: "Pramp mock interviews", type: "Practice", url: "https://www.pramp.com" }
    ],
    tip: "Microsoft values collaboration. Be ready to discuss how you work in teams."
  },
  Flipkart: {
    rounds: ["Machine coding", "Technical x2", "System design", "HR"],
    topics: [
      { name: "Machine coding (LLD)", difficulty: "hard" },
      { name: "Java collections & streams", difficulty: "medium" },
      { name: "Database design", difficulty: "medium" },
      { name: "HLD (e-commerce scale)", difficulty: "hard" },
      { name: "Concurrency & threads", difficulty: "hard" }
    ],
    resources: [
      { name: "Refactoring Guru (design patterns)", type: "Guide", url: "https://refactoring.guru/design-patterns" },
      { name: "Designing Data-Intensive Applications", type: "Book", url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/" },
      { name: "InterviewBit", type: "Practice", url: "https://www.interviewbit.com" },
      { name: "LeetCode Flipkart tag", type: "DSA", url: "https://leetcode.com/company/flipkart/" }
    ],
    tip: "Machine coding round is make-or-break. Practice building clean OOP systems in 90 minutes."
  },
  Razorpay: {
    rounds: ["Coding round", "Technical interview", "System design", "HR"],
    topics: [
      { name: "REST APIs & HTTP", difficulty: "easy" },
      { name: "SQL & indexing", difficulty: "medium" },
      { name: "Node.js internals & event loop", difficulty: "medium" },
      { name: "Payment systems design", difficulty: "hard" },
      { name: "Security & encryption basics", difficulty: "medium" }
    ],
    resources: [
      { name: "High Scalability blog", type: "Blog", url: "http://highscalability.com" },
      { name: "Razorpay engineering blog", type: "Blog", url: "https://engineering.razorpay.com" },
      { name: "System Design Primer", type: "GitHub", url: "https://github.com/donnemartin/system-design-primer" },
      { name: "LeetCode medium list", type: "DSA", url: "https://leetcode.com/problemset/all/?difficulty=MEDIUM" }
    ],
    tip: "Razorpay loves deep dives into backend systems. Know your Node.js event loop inside out."
  },
  Infosys: {
    rounds: ["InfyTQ test", "Technical interview", "HR interview"],
    topics: [
      { name: "Basic DSA (arrays, strings)", difficulty: "easy" },
      { name: "OOP concepts", difficulty: "easy" },
      { name: "DBMS fundamentals", difficulty: "easy" },
      { name: "Networking basics", difficulty: "easy" },
      { name: "Verbal & aptitude", difficulty: "easy" }
    ],
    resources: [
      { name: "InfyTQ platform", type: "Practice", url: "https://infytq.onlineinfosys.com" },
      { name: "GeeksForGeeks basics", type: "DSA", url: "https://www.geeksforgeeks.org" },
      { name: "IndiaBix aptitude", type: "Aptitude", url: "https://www.indiabix.com" },
      { name: "JavaTPoint", type: "Guide", url: "https://www.javatpoint.com" }
    ],
    tip: "Infosys campus hiring focuses on aptitude and basics. InfyTQ certification helps a lot."
  },
  TCS: {
    rounds: ["TCS NQT", "Technical interview", "Managerial", "HR"],
    topics: [
      { name: "Quantitative aptitude", difficulty: "easy" },
      { name: "Logical reasoning", difficulty: "easy" },
      { name: "Coding (2 problems)", difficulty: "medium" },
      { name: "Core CS fundamentals", difficulty: "easy" },
      { name: "English communication", difficulty: "easy" }
    ],
    resources: [
      { name: "TCS NQT prep guide", type: "Guide", url: "https://learning.tcsionhub.in/hub/national-qualifier-test/" },
      { name: "PrepInsta TCS", type: "Practice", url: "https://prepinsta.com/tcs/" },
      { name: "IndiaBix", type: "Aptitude", url: "https://www.indiabix.com" },
      { name: "GeeksForGeeks", type: "DSA", url: "https://www.geeksforgeeks.org" }
    ],
    tip: "TCS NQT score determines your role. Score high for TCS Digital / Prime profile."
  },
  Wipro: {
    rounds: ["WILP/NLTH test", "Technical interview", "HR"],
    topics: [
      { name: "Aptitude & reasoning", difficulty: "easy" },
      { name: "Basic programming (C/Java)", difficulty: "easy" },
      { name: "OS & networking", difficulty: "easy" },
      { name: "SQL basics", difficulty: "easy" },
      { name: "Verbal ability", difficulty: "easy" }
    ],
    resources: [
      { name: "Wipro NLTH prep", type: "Guide", url: "https://prepinsta.com/wipro/" },
      { name: "GeeksForGeeks", type: "DSA", url: "https://www.geeksforgeeks.org" },
      { name: "IndiaBix", type: "Aptitude", url: "https://www.indiabix.com" },
      { name: "W3Schools", type: "Guide", url: "https://www.w3schools.com" }
    ],
    tip: "Wipro focuses on communication skills. Be confident and clear in your HR round."
  }
};

router.get("/companies", (req, res) => {
  res.json(Object.keys(studyMaterial));
});

router.get("/:company", (req, res) => {
  const company = req.params.company;
  const data = studyMaterial[company];
  if (!data) return res.status(404).json({ message: "Study material not found for this company" });
  res.json({ company, ...data });
});

module.exports = router;