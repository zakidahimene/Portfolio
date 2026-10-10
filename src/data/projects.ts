import media from './media';
import { u } from '../lib/url';

export type Img = { src: string; sm: string; w: number; h: number; alt: string; caption?: string };

/**
 * A project page is a sequence of blocks, read top to bottom:
 * - text:    numbered heading on the left, paragraphs on the right
 * - media:   a row of images, optionally with text beside them (side: 'left' puts text first)
 * - callout: a single bold statement
 * - docs:    downloadable files
 */
export type Block =
  | { kind: 'text'; heading: string; body: string[] }
  | { kind: 'media'; images: Img[]; text?: string; heading?: string; side?: 'left' | 'right' }
  | { kind: 'callout'; text: string }
  | { kind: 'docs'; heading: string; files: { title: string; desc: string; href: string; size: string }[] };

export type Project = {
  slug: string;
  no: string;
  title: string;
  short: string;
  kicker: string;
  year: string;
  role: string;
  context: string;
  tags: string[];
  summary: string;
  cover: Img;
  stats: { value: string; label: string }[];
  blocks: Block[];
  video?: { src: string; poster: string; segments: [number, number][]; caption: string; focus?: boolean };
  gallery?: Img[];
};

type Slug = keyof typeof media;
const img = <S extends Slug>(slug: S, key: keyof (typeof media)[S] & string, alt: string, caption?: string): Img => ({
  ...((media[slug] as Record<string, { src: string; sm: string; w: number; h: number }>)[key]),
  alt,
  caption,
});

export const projects: Project[] = [
  {
    slug: 'entia',
    no: '01',
    title: 'Entia — Liberty Analyser Packaging',
    short: 'Entia Packaging',
    kicker: 'Medical device packaging',
    year: '2026',
    role: 'Student intern · end-to-end designer',
    context: 'Entia, London',
    tags: ['Product design', 'Packaging', 'User research', 'Prototyping'],
    summary:
      "I redesigned the shipping packaging for Entia's Liberty analyser, a medical device for at-home blood monitoring. I owned the whole project, from first sketches to a prototype ready to manufacture. The final design went into production and now ships to Entia's customers.",
    cover: img('entia', 'final-cradle', 'Final Entia packaging: foam cradle holding the Liberty analyser inside the box'),
    stats: [
      { value: '−60%', label: 'Packaging footprint' },
      { value: '3×', label: 'User experience, by stakeholder feedback' },
      { value: 'Jun 2026', label: 'In production and shipping' },
    ],
    blocks: [
      {
        kind: 'media',
        heading: 'Final Design',
        images: [
          img('entia', 'final-closed', 'Final box, closed, with carry handle cut-outs', 'Closed box'),
          img('entia', 'final-device', 'Analyser seated in its foam tray', 'Analyser layer'),
          img('entia', 'final-cradle', 'Foam cradle locking the analyser in place', 'Protective cradle'),
          img('entia', 'final-accessories', 'Accessories in a fitted foam layer', 'Accessories layer'),
        ],
      },
      {
        kind: 'text',
        heading: 'Brief',
        body: [
          "The Liberty analyser is a medical device sent to people's homes for at-home blood monitoring, and many of its users are elderly. The brief was to make the packaging smaller, protect the device better in transit, and make it easier to handle and unpack.",
        ],
      },
      {
        kind: 'media',
        heading: 'Process',
        images: [img('entia', 'old-box', 'The original packaging: a large taped cardboard box', 'Original packaging')],
        text: "The original packaging was far too large and took up too much space. Because it couldn't be reused, it cost Entia £100 every time they used it, and both material and shipping costs were high.",
      },
      {
        kind: 'media',
        images: [img('entia', 'layout-sketch', 'Layout sketches comparing a flat and a vertical arrangement', 'Flat vs vertical layout sketches')],
        text: 'I sketched initial designs to explore different ways to arrange the box.',
      },
      {
        kind: 'media',
        images: [
          img('entia', 'old-device', 'Analyser inside the original box', 'Analyser in the original box'),
          img('entia', 'old-accessories', 'Accessories in the original box', 'Accessories in the original box'),
        ],
        text: 'I worked out the layout of the contents before building the prototype.',
      },
      {
        kind: 'media',
        images: [
          img('entia', 'proto-insert', 'Prototype foam insert inside the box', 'Foam insert'),
          img('entia', 'proto-accessories', 'Prototype accessories layer', 'Accessories layer'),
          img('entia', 'proto-foam', 'Prototype foam layer with cut-out', 'Foam layer'),
          img('entia', 'proto-device', 'Prototype with the analyser seated', 'Analyser seated'),
        ],
        text: 'I built the first prototype from cardboard and foam, the same materials the real box would use. I presented it to the CEO and engineers, the CEO chose to go ahead with the design, and the final box was built.',
      },
      {
        kind: 'text',
        heading: 'Outcome',
        body: [
          'The final design takes up 60% less space than the old packaging. Based on stakeholder feedback, it improved the user experience about three times. Entia chose it for production, and it has packaged devices shipped to customers since June 2026.',
        ],
      },
    ],
  },
  {
    slug: 'mealmap',
    no: '02',
    title: 'MealMap — Redefining the Campus Meal Experience',
    short: 'MealMap',
    kicker: 'Campus dining kiosk',
    year: '2026',
    role: 'Electronics development',
    context: 'Human-Centred Design Engineering · Imperial · team of 5',
    tags: ['ESP32', 'RFID / NFC', 'Human-centred design', 'CAD & 3D printing'],
    summary:
      "Imperial's canteens offer so much choice that deciding what to eat becomes hard. MealMap is a kiosk and web app that filters campus food by your dietary needs, budget and taste, and lets you pre-order it. You sign in by tapping your card. I developed the electronics for the prototype.",
    cover: img('mealmap', 'mm-01', 'Render of the MealMap kiosk on campus with two touchscreens and a tap point'),
    stats: [
      { value: '8.2/10', label: 'Rated "impactful" by testers' },
      { value: '14', label: 'Students in scenario testing' },
      { value: '100%', label: 'Of interviewees found campus food hard to navigate as freshers' },
    ],
    blocks: [
      {
        kind: 'text',
        heading: 'Problem',
        body: [
          'Campus menus, nutrition details, dietary information and queue lengths are spread across separate food outlets. Our interviews showed that students, especially new ones, end up making rushed, low-confidence choices or falling back on the same safe meal every day.',
        ],
      },
      {
        kind: 'text',
        heading: 'My Role: Electronics',
        body: [
          'I built the system that reads a user\'s card and links it to their account. It started as a breadboard prototype using an ESP32 and an RFID reader. I then moved it to a compact soldered perfboard "sandwich" that fits inside a 3D printed case.',
          "We first planned a wired link to the tablet, but the iPad couldn't support it, so I switched to wireless. The ESP32 communicates with the web platform and its database, so a tap signs the user in and loads their saved preferences.",
        ],
      },
      {
        kind: 'text',
        heading: 'Testing',
        body: [
          '14 students went through three role-play scenarios: finding a meal that fits a dietary requirement, ordering as fast as possible, and browsing without a plan. On a 10-point scale, testers scored MealMap 8.2 for impact and 7.9 for everyday usefulness.',
        ],
      },
    ],
    gallery: [
      img('mealmap', 'mm-02', 'Soldered perfboard stack with ESP32 and RFID reader'),
      img('mealmap', 'mm-03', 'RFID reader mounted in a 3D printed enclosure'),
      img('mealmap', 'mm-04', 'Compact 3D printed electronics case'),
      img('mealmap', 'mm-05', 'Tablet running MealMap, prompting the user to tap their card'),
      img('mealmap', 'mm-06', 'User testing session with the kiosk prototype'),
      img('mealmap', 'mm-07', 'MealMap web app showing filters and a campus map'),
      img('mealmap', 'mm-08', 'Sketches of twenty kiosk form factors'),
      img('mealmap', 'mm-09', 'Renders of tablet stand variations'),
      img('mealmap', 'mm-10', 'Render of the PlatePay tap point'),
    ],
  },
  {
    slug: 'robot-arm',
    no: '03',
    title: '6-Axis Robot Arm',
    short: '6-Axis Robot Arm',
    kicker: 'Vision-guided pick & place',
    year: '2026 — ongoing',
    role: 'Design, build & programming',
    context: 'Personal project',
    tags: ['C++', 'Python', 'PID control', 'Computer vision', 'CAD'],
    summary:
      'I designed and built a 6-axis robot arm that picks up coloured blocks and sorts them into zones. I use it to research PID control loops and machine learning for robotics.',
    cover: img('robot-arm', 'arm-01', 'The 6-axis robot arm posed with its gripper raised'),
    stats: [
      { value: '6', label: 'Axes of motion' },
      { value: 'ML', label: 'Computer vision for colour sorting' },
      { value: 'PID', label: 'Closed-loop joint control' },
    ],
    blocks: [
      {
        kind: 'text',
        heading: 'Build',
        body: [
          'The arm is 3D printed and driven by servos through a custom controller. I developed it in stages, from a breadboard servo rig to a full arm on a test board, and fixed mechanical and electrical problems at each step.',
        ],
      },
      {
        kind: 'text',
        heading: 'Control & Vision',
        body: [
          'A machine-learning computer vision system finds each block and its colour. PID control drives each joint to its target, so the arm moves accurately and repeats its moves reliably.',
        ],
      },
    ],
    video: {
      src: u('/media/robot-arm/robot-arm.mp4'),
      poster: u('/media/robot-arm/robot-arm-poster.webp'),
      segments: [[2, 19]],
      caption: 'Movement of the robot arm using a phone app',
      focus: true,
    },
    gallery: [
      img('robot-arm', 'arm-02', 'Robot arm standing upright in the lab'),
      img('robot-arm', 'arm-03', 'Robot arm reaching forward'),
      img('robot-arm', 'arm-04', 'Arm assembly mid-build with servo wiring'),
      img('robot-arm', 'arm-05', 'Arm mounted on a test board with control electronics'),
      img('robot-arm', 'arm-06', 'Breadboarded controller with jumper wiring'),
      img('robot-arm', 'arm-07', 'Controller board with battery pack'),
      img('robot-arm', 'arm-08', 'Servos and driver board laid out for testing'),
      img('robot-arm', 'arm-09', 'Servo test rig on a breadboard'),
    ],
  },
  {
    slug: 'unibots',
    no: '04',
    title: 'Imperial Unibots',
    short: 'Imperial Unibots',
    kicker: 'Autonomous competition robot',
    year: '2025 — ongoing',
    role: 'Electrical team lead',
    context: 'Imperial Unibots team',
    tags: ['PCB design', 'C++', 'Raspberry Pi', 'ESP32', 'CAD'],
    summary:
      "I lead the electronics sub-team of Imperial's Unibots robot. It's an autonomous robot that collects balls of different sizes and drops them into a goal. I designed and prototyped all of its electronics.",
    cover: img('unibots', 'team', 'The Imperial Unibots team with the other competitors around the arena'),
    stats: [
      { value: '3rd', label: 'Place at regionals' },
      { value: '28', label: 'Teams competing' },
      { value: 'Lead', label: 'Electronics sub-team' },
    ],
    blocks: [
      {
        kind: 'text',
        heading: 'Electronics',
        body: [
          "The robot's electronics connect a Raspberry Pi and an ESP32 to the sensors, drive motors and power system. We moved from breadboards to stacked perfboards that fit inside the chassis.",
        ],
      },
      {
        kind: 'text',
        heading: 'Team',
        body: [
          'I worked with the mechanical and software sub-teams to build the robot, test it on the arena and improve it between runs. At the regional round we placed third out of 28 teams.',
        ],
      },
      {
        kind: 'media',
        heading: 'Circuit Design',
        images: [
          img('unibots', 'block-diagram', 'Block diagram of the robot circuit: Raspberry Pi, two ESP32s, motor drivers and buck converters', 'Circuit block diagram'),
          img('unibots', 'wiring-diagram', 'Illustrated wiring diagram of the components', 'Wiring diagram'),
        ],
        text: "I kept the circuit diagram deliberately simple so that teammates who can't read schematics could still build the electronics.",
      },
      {
        kind: 'media',
        images: [img('unibots', 'electronics-proto', 'Electronics prototyped on a breadboard with motors and batteries', 'Bench prototype')],
        text: 'I connected and tested all the electronics on the bench first, to catch any mistakes before fitting them into the chassis.',
      },
      { kind: 'callout', text: 'The day before the competition, the Raspberry Pi we were using was unexpectedly fried.' },
      {
        kind: 'media',
        side: 'left',
        images: [img('unibots', 'regionals-robot', 'The stripped-back regionals robot beside its third place certificate', 'Regionals robot, 3rd place')],
        text: 'On the day of regionals we took the robot apart and rebuilt it to collect balls better. We aimed for a bare-bones robot with as much point-scoring potential as possible.',
      },
      {
        kind: 'media',
        heading: 'Nationals',
        images: [
          img('unibots', 'nationals-build', 'Nationals robot mid-build with the collector and wiring', 'Rebuild in progress'),
          img('unibots', 'nationals-collector', 'New ball collector mechanism', 'New collector'),
        ],
        text: 'For nationals we fully rebuilt the robot, learning from our past mistakes to make it as good as possible.',
      },
      {
        kind: 'media',
        images: [
          img('unibots', 'nationals-robot', 'The robot built for nationals with its electronics bay exposed', 'Electronics bay'),
          img('unibots', 'nationals-robot-2', 'The finished nationals robot at inspection', 'At inspection'),
        ],
        text: 'The robot built for nationals.',
      },
      {
        kind: 'media',
        side: 'left',
        images: [img('unibots', 'nationals-test', 'The robot being tested on the floor with ping pong balls', 'Testing')],
        text: 'We tested the robot before nationals.',
      },
    ],
    gallery: [
      img('unibots', 'arena-1', 'Team running the robot on the competition arena'),
      img('unibots', 'arena-2', 'Teammates watching a run in the arena'),
      img('unibots', 'perfboard', 'Stacked perfboard with Raspberry Pi and power regulation'),
      img('unibots', 'team-table', 'Competitors gathered around the arena'),
    ],
  },
  {
    slug: 'hackathon',
    no: '05',
    title: 'Hamster Wheelchair',
    short: 'Hamster Wheelchair',
    kicker: 'Terrible Ideas Hackathon',
    year: '2026',
    role: 'Electronics',
    context: 'Terrible Ideas Hackathon · team project',
    tags: ['Electronics', 'Motor control', 'Rapid prototyping'],
    summary:
      'At a hackathon dedicated to terrible ideas, our team built a wheelchair driven by a hamster. I built the electronics that turn the hamster\'s movements into motor commands. We won the "Most Terrible Idea Yet" award.',
    cover: img('hackathon', 'hack-01', 'The hackathon team holding up the hamster enclosure'),
    stats: [
      { value: '1', label: 'Hamster in command' },
      { value: 'Won', label: '"Most Terrible Idea Yet"' },
      { value: 'Elec.', label: 'My part of the build' },
    ],
    blocks: [
      {
        kind: 'text',
        heading: 'The Idea',
        body: [
          "The hamster rides in a clear tub above a wooden drive base, and its movements steer the chair. It's a ridiculous idea, but we engineered it properly.",
        ],
      },
      {
        kind: 'text',
        heading: 'Electronics',
        body: [
          "I built the motor-driver electronics that turn the hamster's movements into drive commands. Everything was built fast and debugged on the workshop floor.",
        ],
      },
    ],
    video: {
      src: u('/media/hackathon/hackathon.mp4'),
      poster: u('/media/hackathon/hackathon-poster.webp'),
      segments: [
        [5, 8.6],
        [9, 14.5],
        [28, 33.8],
      ],
      caption: 'Build chaos, the pilot, and the first drive',
    },
    gallery: [
      img('hackathon', 'hack-02', 'The hamster-controlled chair: a wooden cart with an upright frame'),
      img('hackathon', 'hack-03', 'The hamster in its tub above the drive base'),
      img('hackathon', 'hack-04', 'Motor driver wired up on the bench'),
      img('hackathon', 'hack-05', 'Debugging the electronics on a laptop'),
      img('hackathon', 'hack-06', 'Fitting wheels to the chassis'),
      img('hackathon', 'hack-07', 'Assembling the drive base with teammates'),
    ],
  },
];

// MealMap: full reports at the end of the page
projects[1].blocks.push({
  kind: 'docs',
  heading: 'Read the Full Portfolios',
  files: [
    {
      title: 'RevAMP — Term 2 Discovery Report',
      desc: 'Research, user interviews and concept development',
      href: u('/docs/mealmap-term2-revamp.pdf'),
      size: 'PDF · 58 MB',
    },
    {
      title: 'MealMap — Term 3 Delivery Report',
      desc: 'Final design, electronics, testing and evaluation',
      href: u('/docs/mealmap-term3-portfolio.pdf'),
      size: 'PDF · 69 MB',
    },
  ],
});

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
