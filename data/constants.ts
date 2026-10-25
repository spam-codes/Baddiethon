export const DISCORD_URL = "https://discord.gg/EAGZJbEdp8";

export const TRACKS = [
  { name: "AI Agents", text: "Autonomous agents, AI tools, creative use cases or just something weird.", ideas: ["An agent that handles a chore end to end", "A tool that makes a boring workflow disappear", "Something strange that only an agent could do"] },
  { name: "Consumer Apps", text: "Build products people actually want to use. Fun, useful or both.", ideas: ["A small app for a daily habit", "Something your friends would use this week", "A fix for an annoying everyday task"] },
  { name: "Web3 & Crypto", text: "DeFi, onchain apps, new primitives, or anything experimental.", ideas: ["An onchain app with real users in mind", "A new primitive nobody has tried yet", "An experiment that makes crypto easier to use"] },
  { name: "Open Track", text: "Literally anything. If it's a product and people can use it, you're good.", ideas: ["Silly, serious or niche, all welcome", "A product that doesn't fit the other tracks", "Anything people want to use"] }
];

export const PRIZES = [
  { name: "1st Place", amt: "₹1,00,000", list: ["Trophy + Certificates", "Goodies & Swags", "Showcase & Community Spotlight"] },
  { name: "2nd Place", amt: "₹50,000", list: ["Trophy + Certificates", "Goodies & Swags", "Showcase & Community Spotlight"] },
  { name: "3rd Place", amt: "₹25,000", list: ["Trophy + Certificates", "Goodies & Swags", "Showcase & Community Spotlight"] },
  { name: "Special Prizes", amt: "", list: ["Best AI Agent", "Most Creative / Fun", "Best Real User Adoption", "More surprises..."] }
];

export const STEPS = [
  { date: "Oct 30", title: "Registrations Close", icon: "i-doc", text: "Last date to register your team.", at: [9, 30] as [number, number] },
  { date: "Oct 30", title: "Idea PPT Submission", icon: "i-doc", text: "Submit a short PPT explaining your idea.", at: [9, 30] as [number, number] },
  { date: "Nov 03", title: "Round 1 Results", icon: "i-mega", text: "Top 100 teams move to Round 2.", at: [10, 3] as [number, number] },
  { date: "Nov 03 – Nov 12", title: "Round 2 Build", icon: "i-code", text: "Build your product and submit.", at: [10, 3] as [number, number], end: [10, 12] as [number, number] },
  { date: "Nov 20", title: "Final Round & Results", icon: "i-trophy", text: "Present, showcase and win!", at: [10, 20] as [number, number] }
];

export const FAQ = [
  ["Who can participate?", "Anyone who likes building things. Students, working developers, designers and first-timers are all welcome."],
  ["Do I need to have a team?", "Register your team before Oct 30. If you are looking for teammates, ask in the Discord."],
  ["What can I build?", "Anything that fits the four tracks: AI Agents, Consumer Apps, Web3 & Crypto, or the Open Track. If people can use it, you're good."],
  ["Does PPT submission guarantee selection?", "No. Teams submit a short PPT on Oct 30, and the top 100 teams move to Round 2 when results are out on Nov 03."],
  ["What are the judging criteria?", "Judges look at how original the idea is, how well it is built, and whether real people use it. Full criteria are shared on the Discord."],
  ["Will there be mentorship?", "Join the Discord to ask questions and get help from the community while you build."],
  ["Is it completely online?", "Yes. Every round, from the idea PPT to the final presentation, happens online."]
];
