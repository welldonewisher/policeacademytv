import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { Play, Clock, Eye, Shield } from 'lucide-react';
import { videos } from 'virtual:content';

const categoryColors: Record<string, string> = {
  'Tactical Response': 'bg-red-900/30 text-red-400 border-red-700/40',
  'Leadership': 'bg-primary/20 text-primary border-primary/30',
  'Firearms Training': 'bg-orange-900/30 text-orange-400 border-orange-700/40',
  'K9 Units': 'bg-green-900/30 text-green-400 border-green-700/40',
  'Crisis Negotiation': 'bg-purple-900/30 text-purple-400 border-purple-700/40',
  'Physical Fitness': 'bg-blue-900/30 text-blue-400 border-blue-700/40',
  'Cyber Crime': 'bg-cyan-900/30 text-cyan-400 border-cyan-700/40',
  'Detective Skills': 'bg-yellow-900/30 text-yellow-400 border-yellow-700/40',
  'Patrol': 'bg-secondary/40 text-foreground border-border',
  'Academy Life': 'bg-secondary/40 text-foreground border-border',
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
} as const;

export default function VideosPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  function handleCardClick(video: { id: string; youtubeId: string; title: string }) {
    if (video.youtubeId) {
      window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank', 'noopener,noreferrer');
    } else {
      setActiveVideo(video.id);
    }
  }

  return (
    <>
      <Helmet>
        <title>Videos — POLICACADEMYTV</title>
        <meta
          name="description"
          content="Watch law enforcement training videos, tactical breakdowns, academy spotlights, and expert instruction from POLICACADEMYTV."
        />
        <meta property="og:title" content="Videos — POLICACADEMYTV" />
        <meta property="og:description" content="Exclusive law enforcement training videos and tactical breakdowns." />
        <meta property="og:type" content="website" />
      </Helmet>

      <main>
        {/* PAGE HERO */}
        <section className="relative pt-32 pb-16 bg-background overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/30 via-transparent to-transparent" />
            <div className="absolute -top-24 -right-24 opacity-5">
              <Shield className="w-[400px] h-[400px] text-primary" />
            </div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-6 bg-primary" />
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                  Video Library
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
                {videos.hero.headline}
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
                {videos.hero.subheadline}
              </p>
            </motion.div>
          </div>
        </section>

        {/* VIDEO GRID 4x3 */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
            >
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {videos.sectionHeading}
                </h2>
                <p className="text-sm text-muted-foreground">{videos.sectionSubheading}</p>
              </div>
              <span className="text-xs text-muted-foreground border border-border rounded px-3 py-1.5">
                {videos.videos.length} videos
              </span>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {videos.videos.map((video) => (
                <motion.div key={video.id} variants={fadeUp}>
                  <div
                    className="group relative bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:border-primary/50 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1"
                    onClick={() => handleCardClick(video)}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      {video.youtubeId ? (
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          width={480}
                          height={270}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary/60 relative">
                          <img
                            src="/airo-assets/images/pages/videos/thumbnail-placeholder"
                            alt={video.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                          <Shield className="relative z-10 w-10 h-10 text-primary opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300" />
                        </div>
                      )}

                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="flex flex-col items-center gap-1.5 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                          <div className="w-11 h-11 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-black/50">
                            <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
                          </div>
                          {video.youtubeId && (
                            <span className="text-xs font-semibold text-white bg-black/70 px-2 py-0.5 rounded">
                              Watch on YouTube
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Duration badge */}
                      {video.duration && (
                        <span className="absolute bottom-2 right-2 text-xs font-semibold bg-black/80 text-white px-1.5 py-0.5 rounded">
                          {video.duration}
                        </span>
                      )}

                      {/* Category badge */}
                      <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded border ${categoryColors[video.category] ?? 'bg-secondary/40 text-foreground border-border'}`}>
                        {video.category}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="p-3.5">
                      <h3 className="font-heading font-semibold text-sm text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {video.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {video.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* YOUTUBE MODAL */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {(() => {
                const vid = videos.videos.find((v) => v.id === activeVideo);
                if (!vid) return null;
                if (vid.youtubeId) {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  );
                }
                return (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-secondary to-background">
                    <Shield className="w-16 h-16 text-primary opacity-60" />
                    <p className="text-foreground font-heading font-semibold text-lg text-center px-8">
                      {vid.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      YouTube link coming soon — paste your video URL to activate.
                    </p>
                  </div>
                );
              })()}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white transition-colors"
                aria-label="Close video"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </main>
    </>
  );
}
