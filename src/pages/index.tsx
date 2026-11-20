import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Search,
  ChevronDown,
  MapPin,
  Star,
  Shield,
  Target,
  Users,
  Cpu,
  Dumbbell,
  MessageSquare,
  Award,
  Dog,
  CheckCircle,
} from 'lucide-react';
import { home } from 'virtual:content';

const categoryIcons: Record<string, React.ReactNode> = {
  'Firearms Training': <Target className="w-6 h-6" />,
  'Tactical Response': <Shield className="w-6 h-6" />,
  'K9 Units': <Dog className="w-6 h-6" />,
  'Leadership': <Users className="w-6 h-6" />,
  'Cyber Crime': <Cpu className="w-6 h-6" />,
  'Detective Skills': <Search className="w-6 h-6" />,
  'Crisis Negotiation': <MessageSquare className="w-6 h-6" />,
  'Physical Fitness': <Dumbbell className="w-6 h-6" />,
};

const listingImages = [
  '/airo-assets/images/pages/home/listing-firearms',
  '/airo-assets/images/pages/home/listing-tactical',
  '/airo-assets/images/pages/home/listing-leadership',
];

const badgeColors: Record<string, string> = {
  'Top Rated': 'bg-primary/20 text-primary border border-primary/30',
  'Featured': 'bg-secondary/40 text-foreground border border-secondary/60',
  'Verified': 'bg-green-900/30 text-green-400 border border-green-700/40',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All Categories');

  return (
    <>
      <Helmet>
        <title>POLICACADEMYTV — Find Your Academy. Forge Your Career.</title>
        <meta
          name="description"
          content="The premier directory for law enforcement training. Browse 1,200+ academies, tactical courses, and professional development programs across all 50 states."
        />
        <meta property="og:title" content="POLICACADEMYTV — Find Your Academy. Forge Your Career." />
        <meta
          property="og:description"
          content="Discover elite law enforcement training programs, academies, and courses across the nation."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <img
            src="/airo-assets/images/pages/home/hero"
            alt="Law enforcement officers in tactical formation"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1080}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 pointer-events-none" />

          {/* Shield watermark */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
            <Shield className="w-96 h-96 text-primary" />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                Law Enforcement Training Directory
              </span>
            </motion.div>

            {/* Headline — editorial, left-offset */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight mb-4"
            >
              <span className="block">{home.hero.headline}</span>
              <span className="block text-primary">{home.hero.headlineAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-base sm:text-lg text-white/70 max-w-2xl mb-10 leading-relaxed"
            >
              {home.hero.subheadline}
            </motion.p>

            {/* Search bar — ListingPro style */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden max-w-3xl"
            >
              <div className="flex items-center gap-3 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-white/20">
                <Search className="w-5 h-5 text-white/50 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  placeholder={home.hero.searchPlaceholder}
                  className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none"
                />
              </div>
              <div className="flex items-center gap-2 px-4 py-3 border-b sm:border-b-0 sm:border-r border-white/20 cursor-pointer">
                <MapPin className="w-4 h-4 text-white/50 shrink-0" />
                <select
                  value={category}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                  className="bg-transparent text-white/70 text-sm outline-none cursor-pointer appearance-none pr-4"
                >
                  <option value="All Categories">All Categories</option>
                  {home.categories.map((cat) => (
                    <option key={cat.id} value={cat.label}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-white/40" />
              </div>
              <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-primary/90 transition-colors duration-200 whitespace-nowrap">
                {home.hero.ctaLabel}
              </button>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              <span className="text-xs text-white/40">Popular:</span>
              {['Firearms Training', 'Tactical Response', 'K9 Units'].map((tag) => (
                <button
                  key={tag}
                  className="text-xs text-white/60 hover:text-primary transition-colors duration-200 underline underline-offset-2"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="bg-secondary border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
            >
              {home.stats.map((stat) => (
                <motion.div key={stat.id} variants={fadeUp} className="flex flex-col items-center gap-1">
                  <span className="font-heading text-4xl md:text-5xl font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-foreground/70 tracking-wide uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-primary" />
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                  Disciplines
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
                {home.categoriesHeading}
              </h2>
              <p className="text-muted-foreground max-w-xl">{home.categoriesSubheading}</p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {home.categories.map((cat) => (
                <motion.div key={cat.id} variants={fadeUp}>
                  <Link
                    to="/listings"
                    className="group flex flex-col gap-3 p-5 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-200">
                      {categoryIcons[cat.label] ?? <Shield className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                        {cat.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cat.count}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURED LISTINGS ── */}
        <section className="py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-px w-6 bg-primary" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                    Featured
                  </span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {home.featuredHeading}
                </h2>
                <p className="text-muted-foreground max-w-xl">{home.featuredSubheading}</p>
              </div>
              <Link
                to="/listings"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
              >
                View all listings →
              </Link>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {home.featuredListings.map((listing, i) => (
                <motion.div
                  key={listing.id}
                  variants={fadeUp}
                  className="group bg-background border border-border rounded-lg overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={listingImages[i]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={600}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded ${badgeColors[listing.badge] ?? badgeColors['Verified']}`}>
                      {listing.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-xs font-medium text-primary">{listing.category}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-base text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                      {listing.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{listing.location}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {listing.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, si) => (
                          <Star
                            key={si}
                            className={`w-3.5 h-3.5 ${si < Math.floor(parseFloat(listing.rating)) ? 'text-primary fill-primary' : 'text-border'}`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          {listing.rating} ({listing.reviews})
                        </span>
                      </div>
                      <Link
                        to="/listings"
                        className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        View Listing →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="py-24 bg-secondary relative overflow-hidden">
          {/* Background shield */}
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Shield className="w-[500px] h-[500px] text-primary" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px w-6 bg-primary" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                    For Institutions
                  </span>
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                  {home.ctaHeading}
                </h2>
                <p className="text-sm font-semibold text-primary mb-3 tracking-wide">
                  {home.ctaSubheading}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">{home.ctaBody}</p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    to="/submit"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm tracking-wide rounded hover:bg-primary/90 transition-colors duration-200"
                  >
                    <Shield className="w-4 h-4" />
                    {home.ctaButtonLabel}
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{home.ctaNote}</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-border">
                  {[
                    { icon: <Award className="w-4 h-4" />, label: 'Verified Listings' },
                    { icon: <Shield className="w-4 h-4" />, label: 'Trusted by Agencies' },
                    { icon: <Users className="w-4 h-4" />, label: '10K+ Officers' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
