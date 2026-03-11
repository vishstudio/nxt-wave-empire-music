export const assets = [
  {
    id: 1,
    title: "Sega Percussion Loop 120BPM",
    category: "Drum Loops",
    duration: "3:45",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/mauritius/800/800",
    price: "$4.99",
    storeUrl: "#",
  },
  {
    id: 2,
    title: "Tropical House Synth Chords",
    category: "Melody Loops",
    duration: "2:30",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/sega/800/800",
    price: "$5.99",
    storeUrl: "#",
  },
  {
    id: 3,
    title: "Deep Bassline 105BPM",
    category: "Bass Loops",
    duration: "4:12",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/island/800/800",
    price: "$3.99",
    storeUrl: "#",
  },
  {
    id: 4,
    title: "Island Vocal Chops",
    category: "Vocal Loops",
    duration: "3:18",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://picsum.photos/seed/tropical/800/800",
    price: "$2.99",
    storeUrl: "#",
  },
];

export const videos = [
  {
    id: "1",
    title: "Summer Vibes Mix 2026",
    views: "1.2M",
    thumbnail: "https://picsum.photos/seed/summer/1280/720",
    url: "https://www.youtube.com/@waveempiremusic",
  },
  {
    id: "2",
    title: "Mauritian Sega Beat Making Session",
    views: "850K",
    thumbnail: "https://picsum.photos/seed/sega2/1280/720",
    url: "https://www.youtube.com/@waveempiremusic",
  },
  {
    id: "3",
    title: "Wave Empire - The Journey",
    views: "2.4M",
    thumbnail: "https://picsum.photos/seed/journey/1280/720",
    url: "https://www.youtube.com/@waveempiremusic",
  },
  {
    id: "4",
    title: "Studio Vlog #42",
    views: "420K",
    thumbnail: "https://picsum.photos/seed/studio/1280/720",
    url: "https://www.youtube.com/@waveempiremusic",
  },
];

export const posts = [
  {
    image: "https://picsum.photos/seed/studio1/600/600",
    description:
      "Late-night studio session building warm island drums and thick synth layers for the next Wave Empire drop.",
  },
  {
    image: "https://picsum.photos/seed/live/600/600",
    description:
      "Live crowd energy was unreal tonight. Thank you for every shout, jump, and singalong from start to finish.",
  },
  {
    image: "https://picsum.photos/seed/gear/600/600",
    description:
      "Favorite setup this week: analog keys, dusty percussion, and a new bass chain that hits exactly right.",
  },
  {
    image: "https://picsum.photos/seed/team/600/600",
    description:
      "Team huddle before final mixdown. Everyone locked in and pushing this record to the next level.",
  },
  {
    image: "https://picsum.photos/seed/event/600/600",
    description:
      "Backstage moments before showtime. Lights up, heart racing, and the first kick drum ready to land.",
  },
  {
    image: "https://picsum.photos/seed/studio2/600/600",
    description:
      "Another writing day in the lab. Capturing melodies inspired by ocean wind and city night drives.",
  },
  {
    image: "https://picsum.photos/seed/dj/600/600",
    description:
      "DJ set highlights from the weekend—heavy grooves, clean transitions, and nonstop movement on the floor.",
  },
  {
    image: "https://picsum.photos/seed/crowd/600/600",
    description:
      "Nothing compares to this view. Grateful for a community that keeps showing up and showing love.",
  },
];

export const team = [
  {
    name: "Ejilen Chelapen",
    stage: "Ejilen",
    role: "Producer / DJ",
    specialty: "Afro / House",
    bio: "Ejilen brings infectious grooves and a signature sound to every Wave Empire release and live set.",
    image: "https://picsum.photos/seed/ejilen/800/800",
    socials: { instagram: "#", twitter: "#", soundcloud: "#" },
  },
  {
    name: "Aveelesh Seenarain",
    stage: "Avi S",
    role: "Producer / DJ",
    specialty: "Electronic / Pop",
    bio: "Avi S is known for melodic hooks and energetic performances, blending modern pop with electronic beats.",
    image: "https://picsum.photos/seed/avi/800/800",
    socials: { instagram: "#", twitter: "#", soundcloud: "#" },
  },
  {
    name: "Sheesh",
    stage: "sish",
    role: "Producer",
    specialty: "Trap / Experimental",
    bio: "sish pushes boundaries with bold sound design and genre-bending productions for the Wave Empire collective.",
    image: "https://picsum.photos/seed/sish/800/800",
    socials: { instagram: "#", twitter: "#", soundcloud: "#" },
  },
];

export type Asset = (typeof assets)[number];
export type Video = (typeof videos)[number];
export type Post = (typeof posts)[number];
export type TeamMember = (typeof team)[number];
