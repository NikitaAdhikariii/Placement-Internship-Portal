const express = require("express");
const router = express.Router();
const studyMaterial = {
  Google: {
    rounds: ["Online assessment (DSA)", "Phone screen", "3x technical", "System design", "Googleyness"],
    topics: [
      { name: "Arrays and strings", difficulty: "easy" },
      { name: "Trees and graphs", difficulty: "medium" },
      { name: "Dynamic programming", difficulty: "hard" },
      { name: "System design at scale", difficulty: "hard" }
    ],
    resources: [
      { name: "Blind 75 LeetCode list", type: "DSA", url: "https://leetcode.com/discuss/general-discussion/460599" },
      { name: "NeetCode.io", type: "Video", url: "https://neetcode.io" },
      { name: "System Design Primer", type: "GitHub", url: "https://github.com/donnemartin/system-design-primer" }
    ],
    tip: "Google values problem-solving process over correct answers. Always think out loud."
  },
  Amazon: {
    rounds: ["Online assessment", "2x technical", "Bar raiser", "Leadership Principles interview"],
    topics: [
      { name: "Arrays and sorting", difficulty: "easy" },
      { name: "Trees and recursion", difficulty: "medium" },
      { name: "Leadership Principles", difficulty: "medium" },
      { name: "Concurrency basics", difficulty: "hard" }
    ],
    resources: [
      { name: "LeetCode Amazon tag", type: "DSA", url: "https://leetcode.com/company/amazon/" },
      { name: "Grokking System Design", type: "Course", url: "https://www.designgurus.io/course/grokking-the-system-design-interview" }
    ],
    tip: "Amazon is heavy on Leadership Principles. Prepare 2 STAR stories per principle."
  },
  Microsoft: {
    rounds: ["Online assessment", "3x technical", "As-appropriate round"],
    topics: [
      { name: "Linked lists", difficulty: "easy" },
      { name: "Graph BFS and DFS", difficulty: "medium" },
      { name: "OOP and design patterns", difficulty: "medium" }
    ],
    resources: [
      { name: "LeetCode Microsoft tag", type: "DSA", url: "https://leetcode.com/company/microsoft/" },
      { name: "Azure Fundamentals AZ-900", type: "Cert", url: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/" }
    ],
    tip: "Microsoft values collaboration. Be ready to discuss how you work in teams."
  },
  Flipkart: {
    rounds: ["Machine coding", "Technical x2", "System design", "HR"],
    topics: [
      { name: "Machine coding LLD", difficulty: "hard" },
      { name: "Database design", difficulty: "medium" },
      { name: "HLD e-commerce scale", difficulty: "hard" }
    ],
    resources: [
      { name: "Refactoring Guru", type: "Guide", url: "https://refactoring.guru/design-patterns" },
      { name: "InterviewBit", type: "Practice", url: "https://www.interviewbit.com" }
    ],
    tip: "Machine coding round is make-or-break. Practice building clean OOP systems in 90 minutes."
  },
  Razorpay: {
    rounds: ["Coding round", "Technical interview", "System design", "HR"],
    topics: [
      { name: "REST APIs and HTTP", difficulty: "easy" },
      { name: "Node.js event loop", difficulty: "medium" },
      { name: "Payment systems design", difficulty: "hard" }
    ],
    resources: [
      { name: "Razorpay engineering blog", type: "Blog", url: "https://engineering.razorpay.com" },
      { name: "System Design Primer", type: "GitHub", url: "https://github.com/donnemartin/system-design-primer" }
    ],
    tip: "Razorpay loves deep dives into backend systems. Know your Node.js event loop inside out."
  },
  Infosys: {
    rounds: ["InfyTQ test", "Technical interview", "HR interview"],
    topics: [
      { name: "Basic DSA", difficulty: "easy" },
      { name: "OOP concepts", difficulty: "easy" },
      { name: "DBMS fundamentals", difficulty: "easy" }
    ],
    resources: [
      { name: "InfyTQ platform", type: "Practice", url: "https://infytq.onlineinfosys.com" },
      { name: "GeeksForGeeks", type: "DSA", url: "https://www.geeksforgeeks.org" }
    ],
    tip: "Infosys campus hiring focuses on aptitude and basics. InfyTQ certification helps a lot."
  },
  TCS: {
    rounds: ["TCS NQT", "Technical interview", "Managerial", "HR"],
    topics: [
      { name: "Quantitative aptitude", difficulty: "easy" },
      { name: "Coding 2 problems", difficulty: "medium" },
      { name: "Core CS fundamentals", difficulty: "easy" }
    ],
    resources: [
      { name: "PrepInsta TCS", type: "Practice", url: "https://prepinsta.com/tcs/" },
      { name: "IndiaBix", type: "Aptitude", url: "https://www.indiabix.com" }
    ],
    tip: "TCS NQT score determines your role. Score high for TCS Digital or Prime profile."
  },
  Wipro: {
    rounds: ["NLTH test", "Technical interview", "HR"],
    topics: [
      { name: "Aptitude and reasoning", difficulty: "easy" },
      { name: "Basic programming", difficulty: "easy" },
      { name: "SQL basics", difficulty: "easy" }
    ],
    resources: [
      { name: "Wipro NLTH prep", type: "Guide", url: "https://prepinsta.com/wipro/" },
      { name: "IndiaBix", type: "Aptitude", url: "https://www.indiabix.com" }
    ],
    tip: "Wipro focuses on communication skills. Be confident and clear in your HR round."
  }
};
router.get("/companies", (req, res) => { res.json(Object.keys(studyMaterial)); });
router.get("/:company", (req, res) => {
  const data = studyMaterial[req.params.company];
  if (!data) return res.status(404).json({ message: "Not found" });
  res.json({ company: req.params.company, ...data });
});
module.exports = router;
