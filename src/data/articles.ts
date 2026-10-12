import { Article } from '../types';

export const HERO_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9QiVjR1xqB8KcOIfpnmQIfMFQQLfrpCabsZQ5alIRaopX2QN0jj70KaWKewOp0DSe7AsaVMS7-RWSe7__0mLQPFxXycyhZq_QObvqYUhu2TQLI07RyNYB1-o6LhwjDgP-6UtJASDAh97l1dTe5abcsu_f4vugPFKamxwBwmWri5c9hjcknEB_B4qVgWltePR_Hw_FFufc7G8tiVgeYeLbGQpq3L3Y0BFEtTPVRi6Ttp1Os-_zZkOdiA';

export const ARTICLES: Article[] = [
  {
    id: 'israel-airspace-strikes',
    section: 'World',
    subSection: 'Middle East',
    tag: 'Live Updates',
    tagType: 'live',
    title: 'Israel and Tensions: Airspace Has Hit in New Round of Strikes',
    summary: 'Air defenses were activated over multiple key zones following overnight explosions. Officials said coordinated drones targeted radar sites, while regional allies called for an immediate cessation of escalated attacks.',
    authors: [
      { name: 'Jonathan Green', role: 'Jerusalem Bureau Chief' },
      { name: 'Sarah Almousawi', role: 'Senior Geopolitical Correspondent' }
    ],
    publishedAt: 'October 13, 2025',
    timeAgo: '12 MIN AGO',
    readTime: '6-min read',
    audioDuration: '5:45',
    commentsCount: 384,
    bullets: [
      'Diplomats assemble in Geneva for emergency consultations.',
      'Commercial flights diverted over Mediterranean corridors.'
    ],
    paragraphs: [
      'JERUSALEM — Air defense sirens echoed across multiple districts before sunrise on Monday as emergency radar interceptors met an incoming barrage of aerial drones and missile salvos, marking one of the steepest escalations in cross-border military friction in months.',
      'Military officials in Tel Aviv reported that early detection batteries intercepted the preponderance of airborne threats. However, shrapnel damage and localized power outages were confirmed in industrial corridors along northern air routes, prompting aviation regulators across Southern Europe and the Levant to reroute commercial corridors immediately.',
      'In Geneva, emergency consultations began behind closed doors at the United Nations European headquarters. Diplomats from six nations sought to establish a cooling-off protocol before scheduled bilateral summits could be jeopardized by further nocturnal strikes.',
      '“The threshold between calculated posturing and catastrophic miscalculation has reached its narrowest point,” said a senior European envoy present in Geneva, speaking on the condition of anonymity to describe the sensitive exchanges.',
      'Civil defense authorities urged residents in outlying municipal zones to remain within reasonable distance of reinforced shelters, while local hospitals shifted non-urgent procedures to preserve reserve emergency capacity.'
    ],
    pullQuote: {
      text: 'The threshold between calculated posturing and catastrophic miscalculation has reached its narrowest point.',
      attribution: 'Senior European Envoy in Geneva'
    }
  },
  {
    id: 'saudi-arabia-infrastructure',
    section: 'Business',
    subSection: 'International Economy',
    tag: 'Analysis',
    tagType: 'analysis',
    title: 'Saudi Arabia May Free Option on Next Host at Heart of Its Ambitions',
    summary: "The kingdom's mega-infrastructure wave enters a critical evaluation cycle as global investors weigh high yields against regional instability.",
    authors: [
      { name: 'Vivian Nereim', role: 'Gulf Business Correspondent' }
    ],
    publishedAt: 'October 13, 2025',
    timeAgo: '1 HOUR AGO',
    readTime: '5-min read',
    audioDuration: '4:30',
    commentsCount: 142,
    paragraphs: [
      'RIYADH, Saudi Arabia — As cranes continue to punctuate the skyline across Riyadh and coastal desert plains, sovereign economic planners are recalibrating the timeline and financing vehicles underpinning the kingdom’s trillion-dollar Vision transformation.',
      'Faced with tighter global borrowing conditions and heightened regional turbulence, financial authorities have begun examining structured private-public partnerships and selective debt syndications to maintain liquidity for cornerstone entertainment and logistics hubs.',
      'Institutional asset managers gathered this week for closed-door roundtables noted that while energy export revenues remain substantial, the sheer capital intensity of concurrent mega-projects demands more targeted prioritization of immediate economic returns.',
      '“The focus is shifting from headline scale to operational execution and sustainable yield,” said Tariq Al-Hassan, an energy infrastructure strategist based in Dubai.'
    ]
  },
  {
    id: 'climate-winds-aviation',
    section: 'Business',
    subSection: 'Climate & Transport',
    title: 'How Climate Shifting Winds Are Redefining Commercial Aviation Routes',
    summary: 'More severe clear-air turbulence and shifting jet streams force carriers to spend millions rethinking route maps.',
    authors: [
      { name: 'Eric Lipton', role: 'Aviation & Climate Correspondent' }
    ],
    publishedAt: 'October 13, 2025',
    timeAgo: '2 HOURS AGO',
    readTime: '4-min read',
    audioDuration: '3:50',
    commentsCount: 89,
    paragraphs: [
      'WASHINGTON — For decades, transatlantic flight paths followed predictable atmospheric currents, allowing flight dispatchers to calculate fuel burn and arrival windows down to the minute.',
      'Now, rapid warming in the upper troposphere is destabilizing the North Atlantic jet stream, generating unprecedented waves of clear-air turbulence that radar cannot readily detect and forcing international carriers to adopt longer, more circuitous oceanic paths.',
      'Airlines are investing in real-time lidar detection sensors and specialized machine learning predictive routing software to minimize both crew injuries and the hundreds of millions of dollars in unexpected fuel expenditures.',
      'Flight crews report that what used to be rare occurrences of severe vertical shear are becoming weekly navigational puzzles across mid-latitude routes.'
    ]
  },
  {
    id: 'families-sift-ruin',
    section: 'World',
    subSection: 'Dispatches',
    title: 'Across Stricken Districts, Families Sift Through Ruin and Weigh What Remains',
    summary: 'From shattered coastal neighborhoods to the interior hills, residents returned to discover what survived an unprecedented weekend of shelling. Humanitarian relief convoys encountered severe bottlenecks at border crossings.',
    authors: [
      { name: 'David Zucchino', role: 'Foreign Affairs Writer' },
      { name: 'Hiba Yazbek', role: 'Staff Reporter' }
    ],
    publishedAt: 'October 13, 2025',
    timeAgo: '34 MIN AGO',
    readTime: '7-min read',
    audioDuration: '6:15',
    imageUrl: HERO_IMAGE_URL,
    imageCaption: 'Photographs via European Pressphoto Agency',
    commentsCount: 421,
    paragraphs: [
      'BEIRUT — In the gray dawn of Monday, the dust hung like a dense veil over the coastal avenues where residential tenements had once stood three deep against the Mediterranean tide. Families walked slowly through streets coated in pulverized concrete, carrying whatever belongings could fit into plastic crates and canvas duffel bags.',
      'Neighbors called out names across debris piles, seeking news of relatives who had stayed behind when the first warning sirens sounded on Friday afternoon. Power lines dangled into waterlogged gutters, and the acrid scent of scorched insulation lingered in the salt air.',
      'Aid agencies reported that dozens of loaded transport lorries carrying potable water, surgical sutures, and thermal blankets were stopped at inspection checkpoints thirty miles outside the city perimeter, caught in procedural inspections even as local medical clinics operated on battery reserves.',
      '“You build a life in thirty years, brick by brick, and within twenty seconds you are left deciding whether to carry your daughter’s school diploma or an iron kettle,” said Miriam Touma, 54, standing in the ruins of her third-floor apartment.',
      'Municipal water pumps were knocked out in at least four districts, prompting civil protection brigades to dispatch water tankers to central roundabouts where lines quickly swelled around municipal distribution valves.'
    ],
    pullQuote: {
      text: 'You build a life in thirty years, brick by brick, and within twenty seconds you are left deciding whether to carry a diploma or an iron kettle.',
      attribution: 'Miriam Touma, resident'
    }
  },
  {
    id: 'fed-interest-rates',
    section: 'Business',
    subSection: 'The Economy',
    title: 'Federal Reserve Signals Caution on Interest Cut Pace',
    summary: 'Persistent wage gains in retail and technology sectors complicate the trajectory for future meetings.',
    authors: [
      { name: 'Jeanna Smialek', role: 'Federal Reserve Correspondent' }
    ],
    publishedAt: 'October 13, 2025',
    timeAgo: '45 MIN AGO',
    readTime: '4-min read',
    audioDuration: '4:10',
    commentsCount: 204,
    paragraphs: [
      'WASHINGTON — Federal Reserve policymakers pushed back against Wall Street expectations of rapid, sequential rate cuts this autumn, citing unexpectedly robust hiring in services and sticky core consumer pricing metrics.',
      'In public remarks delivered at regional business forums, two voting members of the Federal Open Market Committee emphasized that while inflation has decelerated substantially from its pandemic peak, the central bank’s dual mandate requires verifying that price stability is permanently anchored.',
      'Bond yields edged higher following the speeches, reflecting a market reassessment that benchmark rates may stay elevated through the early months of next year.',
      'Economists point out that productivity numbers continue to baffle traditional models, keeping gross domestic product growth resilient even against elevated borrowing rates for mortgages and auto loans.'
    ]
  },
  {
    id: 'museum-curation-transformation',
    section: 'Arts',
    subSection: 'Museums & Design',
    title: 'The Quiet Transformation of Modern Museum Curation',
    summary: 'Major collections are quietly parting with marquee loans to highlight long-neglected permanent holdings.',
    authors: [
      { name: 'Robin Pogrebin', role: 'Cultural Institutions Reporter' }
    ],
    publishedAt: 'October 13, 2025',
    timeAgo: '1 HOUR AGO',
    readTime: '5-min read',
    audioDuration: '5:00',
    commentsCount: 95,
    paragraphs: [
      'NEW YORK — For three decades, the business model of world-class art museums rested on the spectacle of the blockbuster loan show: soaring insurance fees, complex transit crates, and lines that wrapped around city blocks for rare masterpieces on brief loan.',
      'Today, curators from London to Chicago are dramatically shifting course. Driven by prohibitive courier expenses, climate commitments, and a cultural mandate to re-examine subterranean archives, directors are rediscovering treasures that spent decades in climate-controlled basement vaults.',
      'Permanent collection re-hangings are now drawing record attendances, showcasing forgotten female modernists, indigenous tapestries, and regional printmakers beside iconic Impressionist oils.',
      '“We realized our greatest storytelling assets were not flying in on cargo jets, but sleeping on floor minus-three,” said Elena Morris, lead curator of contemporary exhibitions.'
    ]
  },
  {
    id: 'bret-stephens-adversaries',
    section: 'Opinion',
    subSection: 'Columnists',
    tag: 'Opinion',
    tagType: 'opinion',
    title: 'The True Price of Pretending Our Adversaries Are Bluffing',
    summary: 'Deterrence is not a posture; it is a capability coupled with an unambiguous willingness to respond before the red line is crossed.',
    authors: [
      { name: 'Bret Stephens', role: 'Opinion Columnist' }
    ],
    publishedAt: 'October 13, 2025',
    timeAgo: '2 HOURS AGO',
    readTime: '6-min read',
    audioDuration: '5:30',
    commentsCount: 712,
    paragraphs: [
      'In foreign policy, nothing is as perilous as comforting oneself with the thought that an opponent’s public bellicosity is mere domestic theater.',
      'Over the past decade, Western capitals have repeatedly made the mistake of diagnosing revisionist regimes through the lens of cost-benefit rationality. We assumed economic interdependency would dissuade territorial ambition, and that symbolic sanctions would compensate for hollowed-out munitions reserves.',
      'The events of this weekend in the Middle East and Eastern Europe should dispel that illusion forever. Deterrence cannot survive when adversary leadership calculates that the price of aggression is negotiable, but the price of retreat is unacceptable.',
      'To rebuild credulity, the democratic alliance must move from rhetorical condemnation to rapid industrial replenishment and clear, unmistakable enforcement triggers.'
    ]
  },
  {
    id: 'michelle-goldberg-polls',
    section: 'Opinion',
    subSection: 'Columnists',
    tag: 'Opinion',
    tagType: 'opinion',
    title: 'What the New Polls Actually Say About the American Center',
    summary: 'Beneath the rhetoric of extreme division, voters are coalescing around pragmatism on energy, cost of living, and institutional trust.',
    authors: [
      { name: 'Michelle Goldberg', role: 'Opinion Columnist' }
    ],
    publishedAt: 'October 13, 2025',
    timeAgo: '3 HOURS AGO',
    readTime: '5-min read',
    audioDuration: '4:45',
    commentsCount: 630,
    paragraphs: [
      'If you consume political commentary purely through social feeds or cable debate panels, you could easily believe the American electorate has fractured into irreconcilable ideological tribes.',
      'Yet a comprehensive battery of nonpartisan voter surveys conducted this month tells a remarkably different, far more grounded story.',
      'Across swing districts from Michigan to Arizona, the voters who actually determine elections are displaying a stubborn, exhausted pragmatism. They support clean energy investments, but oppose abrupt bans on natural gas. They champion border security, but recoil from cruelty.',
      'The party that stops speaking in theoretical purity tests and addresses the mundane mechanics of grocery bills, childcare stipends, and dependable civic services will find an immense, untapped majority waiting.'
    ]
  },
  {
    id: 'aris-thorne-deep-brain',
    section: 'Opinion',
    subSection: 'Guest Essay',
    tag: 'Guest Essay',
    tagType: 'guest',
    title: 'We Can Finally Map the Deep Brain, but Who Will Own the Discoveries?',
    summary: 'Breakthrough connectome imaging gives researchers access to the deepest circuits of human thought. The battle over licensing these coordinates has already begun.',
    authors: [
      { name: 'Dr. Aris Thorne', role: 'Professor of Neurotechnology at Columbia University' }
    ],
    publishedAt: 'October 13, 2025',
    timeAgo: '4 HOURS AGO',
    readTime: '7-min read',
    audioDuration: '6:50',
    commentsCount: 318,
    paragraphs: [
      'For the first time in human history, synchrotron X-ray microscopy and ultra-dense electrode arrays allow us to trace synaptic pathways through the human hippocampus at sub-micron resolution.',
      'We are witnessing the emergence of the complete neural atlas — the precise biological architecture through which memory is formed, fear is dampened, and decision-making crystallizes.',
      'Yet as academic consortia celebrate this milestone, venture-backed neural interface startups are filing preemptive patent applications over the functional algorithmic maps derived from this public research.',
      'If we permit the fundamental cartography of human cognition to be proprietary and closed behind paywalled APIs, we risk turning the most intimate terrain of our biology into a toll road for future medicine.'
    ]
  },
  // Additional section articles for full browsing
  {
    id: 'wirecutter-fall-headphones',
    section: 'Wirecutter',
    subSection: 'Electronics',
    title: 'The Best Noise-Canceling Headphones for Long-Haul Travel and Busy Offices',
    summary: 'After 120 hours of testing across subway lines, cafes, and test chambers, our top pick remains unbeatable on comfort.',
    authors: [{ name: 'Lauren Dragan', role: 'Senior Audio Editor' }],
    publishedAt: 'October 13, 2025',
    timeAgo: '5 HOURS AGO',
    readTime: '8-min read',
    audioDuration: '5:10',
    commentsCount: 167,
    paragraphs: [
      'Whether you are trying to concentrate in an open office or sleep through engine hum on a red-eye flight, active noise cancellation is the single best audio investment you can make.',
      'In our latest round of testing, we evaluated seventeen leading models, measuring both acoustic isolation curves and real-world microphone clarity during outdoor calls in gusty winds.',
      'Our top pick delivers class-leading passive seal, velvety memory foam earcups, and an intuitive physical toggle that avoids frustrating accidental touch gestures.'
    ]
  },
  {
    id: 'cooking-autumn-soup',
    section: 'Cooking',
    subSection: 'Recipes',
    title: 'A Velvety Roasted Squash Soup With Brown Butter and Crispy Sage',
    summary: 'Caramelizing kabocha squash with whole shallots creates an unmatched depth of autumn sweetness in under an hour.',
    authors: [{ name: 'Alison Roman', role: 'Contributing Recipe Developer' }],
    publishedAt: 'October 13, 2025',
    timeAgo: '6 HOURS AGO',
    readTime: '3-min read',
    commentsCount: 450,
    paragraphs: [
      'The secret to truly extraordinary squash soup is not heavy cream or complex stocks — it is roasting the squash until the edges are dark amber and caramelized before blending.',
      'Using Japanese kabocha squash retains a chestnut-like richness that butternut simply cannot match. Finish each bowl with foaming brown butter, crackling sage leaves, and coarse flaky sea salt.'
    ]
  },
  {
    id: 'athletic-champions-league',
    section: 'The Athletic',
    subSection: 'Football',
    title: 'Tactical Breakdown: How High-Press Counters Are Dominating European Football',
    summary: 'A new generation of young coaches is abandoning slow possession builds in favor of ultra-rapid vertical transitions.',
    authors: [{ name: 'Michael Cox', role: 'Tactical Analyst' }],
    publishedAt: 'October 13, 2025',
    timeAgo: '7 HOURS AGO',
    readTime: '6-min read',
    commentsCount: 220,
    paragraphs: [
      'For over a decade, European club football was defined by the positional orthodoxy of sustained possession: recycling passes across defensive lines until an opening appeared.',
      'This season’s continental tournament data demonstrates a definitive pivot. Teams with under 45% possession are winning at the highest rate in modern tournament history, leveraging coordinated pressing traps and lightning-fast direct passes.'
    ]
  }
];

export const NAV_SECTIONS = [
  'U.S.',
  'World',
  'Business',
  'Arts',
  'Lifestyle',
  'Opinion',
  'Audio',
  'Games',
  'Cooking',
  'Wirecutter',
  'The Athletic'
];

export const EDITIONS: ('U.S.' | 'International' | 'Canada' | 'Español' | '中文')[] = [
  'U.S.',
  'International',
  'Canada',
  'Español',
  '中文'
];
