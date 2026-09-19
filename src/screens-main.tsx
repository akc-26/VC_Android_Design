// Core screens: Splash, Onboarding, Home, Explore, Messages, Profile, Economy, Creator, Settings
import { useState, useEffect } from 'react'
import {
  D, T, Ty, LiveBadge, Avatar, AvatarStack, AudioWaveform, Chip, PrimaryBtn, SecondaryBtn,
  Card, SectionHeader, PageHeader, SearchField, TabBar, EmptyState, StatCard,
  RoomCard, PersonRow, EventCard, CommunityCard, NotificationRow, SettingsRow,
  WalletBalance, GiftTile, RankingRow, ProfileHeader, ProgressBar, Skeleton, SkeletonCard,
  HScrollRow, MessageBubble,
} from './ds'
import type { NavTab } from './ds'

type GoTo = (screen: string) => void

// ─── Splash ───────────────────────────────────────────────────────────────────

export function SplashScreen({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const t = setTimeout(onNext, 2400)
    return () => clearTimeout(t)
  }, [onNext])

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: `radial-gradient(ellipse at 50% 40%, #1A0A5E 0%, ${D.bg} 70%)`,
      position: 'relative', overflow: 'hidden',
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }} viewBox="0 0 390 844" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={D.primary} />
            <stop offset="100%" stopColor={D.accent} />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <path key={i}
            d={`M${-30 + i*15},${480 + i*25} Q195,${300 - i*35} ${420 - i*15},${480 + i*25}`}
            fill="none" stroke="url(#wg)" strokeWidth={1.5} opacity={0.7 - i * 0.08}
          />
        ))}
      </svg>
      <div className="vc-slide-up" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <AudioWaveform active bars={7} height={40} />
        </div>
        <div style={{ ...Ty.display, color: D.text, marginBottom: 12 }}>VoiceCloud</div>
        <div style={{ ...Ty.body, color: D.text2, lineHeight: 1.7 }}>
          Real voices. Real people.<br />Live conversations that matter.
        </div>
      </div>
    </div>
  )
}

// ─── Onboarding ───────────────────────────────────────────────────────────────

export function OnboardingScreen({ onNext }: { onNext: () => void }) {
  const [page, setPage] = useState(0)
  const slides = [
    {
      img: 'photo-1614680376573-df3480f0c6ff',
      title: 'Live Audio\nSocial Community',
      body: 'Join rooms, meet creators, share ideas and be part of something bigger.',
    },
    {
      img: 'photo-1470225620780-dba8ba36b745',
      title: 'Discover Your\nTribe',
      body: 'Explore rooms by topic, follow creators you love, and build meaningful connections.',
    },
    {
      img: 'photo-1516450360452-9312f5e86fc7',
      title: 'Go Live.\nBe Heard.',
      body: 'Host your own room, build your audience, and monetize your voice.',
    },
  ]
  const slide = slides[page]

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: D.bg }}>
      <div style={{ position: 'relative', height: '55%', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={`https://images.unsplash.com/${slide.img}?w=390&h=480&fit=crop&auto=format`}
          alt="Onboarding" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 30%, ${D.bg})` }} />
      </div>
      <div style={{ flex: 1, padding: '0 24px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Outfit', lineHeight: 1.2, marginBottom: 10, whiteSpace: 'pre-line', color: D.text }}>{slide.title}</div>
        <div style={{ ...Ty.body, color: D.text2, marginBottom: 28 }}>{slide.body}</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setPage(i)} style={{ height: 4, width: i === page ? 28 : 8, borderRadius: 2, background: i === page ? D.primary : D.surface3, cursor: 'pointer', transition: 'all 0.2s' }} />
          ))}
        </div>
        {page < slides.length - 1
          ? <PrimaryBtn label="Continue" onClick={() => setPage(p => p + 1)} fullWidth />
          : <PrimaryBtn label="Get Started" onClick={onNext} fullWidth />
        }
        <button onClick={onNext} style={{ marginTop: 14, background: 'none', border: 'none', ...Ty.body, color: D.text3, cursor: 'pointer' }}>
          I already have an account
        </button>
      </div>
    </div>
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────

const ROOMS = [
  { title: 'Mindful Living', host: 'Dr. Sarah Kim', topic: 'Wellness', listeners: '2.1K', live: true, gradient: `linear-gradient(135deg, #059669, #047857)`, hostPhoto: 'photo-1494790108377-be9c29b29330' },
  { title: 'Tech & Innovation', host: 'Alex Carter', topic: 'Technology', listeners: '2.4K', live: false, gradient: `linear-gradient(135deg, #3B82F6, #1D4ED8)`, hostPhoto: 'photo-1507003211169-0a1dd7228f2d' },
  { title: 'Music & Vibes', host: 'DJ Marcus', topic: 'Music', listeners: '1.8K', live: false, gradient: `linear-gradient(135deg, #F97316, #EA580C)`, hostPhoto: 'photo-1472099645785-5658abf4ff4e' },
  { title: 'Startup Stories', host: 'Priya Sharma', topic: 'Business', listeners: '1.5K', live: false, gradient: `linear-gradient(135deg, ${T.primary}, #4C1D95)`, hostPhoto: 'photo-1500648767791-00dcc994a43e' },
]

const PEOPLE_SUGGEST = [
  { name: 'Emma Wilson', username: '@emmaw', photo: 'photo-1544005313-94ddf0286df2', followers: '48.2K' },
  { name: 'James Park', username: '@jamespark', photo: 'photo-1472099645785-5658abf4ff4e', followers: '31K' },
  { name: 'Priya Sharma', username: '@priyash', photo: 'photo-1500648767791-00dcc994a43e', followers: '22.5K' },
]

export function HomeScreen({ goTo }: { goTo: GoTo }) {
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: T.bg }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '52px 16px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <AudioWaveform active bars={4} height={24} />
          <span style={{ fontSize: 17, fontWeight: 700, fontFamily: 'Outfit', color: T.text }}>VoiceCloud</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => goTo('notifications')} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
            <span style={{ fontSize: 22 }}>🔔</span>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: T.live, border: `1.5px solid ${T.bg}` }} />
          </button>
          <button onClick={() => goTo('my-profile')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=36&h=36&fit=crop" size={36} ring />
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '0 16px 16px' }}>
        <SearchField placeholder="Search rooms, people, topics..." onChange={() => goTo('search')} />
      </div>

      {/* Greeting */}
      <div style={{ padding: '0 16px 20px' }}>
        <Card style={{ background: 'linear-gradient(135deg, #ECEAFF 0%, #F7F6FF 100%)', border: `1px solid ${T.primary}22`, padding: '16px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Outfit', color: T.text, marginBottom: 4 }}>Good morning, Alex</div>
              <div style={{ ...Ty.bodySm, color: T.text2, marginBottom: 13 }}>Great conversations are waiting for you!</div>
              <PrimaryBtn label="Join a room" onClick={() => goTo('room-preview')} small />
            </div>
            <div style={{ width: 58, height: 58, borderRadius: 20, background: `linear-gradient(145deg, ${T.primarySoft}, rgba(34,211,238,0.10))`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={T.primary} strokeWidth="1.7" strokeLinecap="round">
                <path d="M8 10v4a4 4 0 0 0 8 0v-4"/><path d="M12 18v3"/><path d="M9 21h6"/><path d="M12 3v3"/><path d="M9 6v3"/><path d="M15 6v3"/>
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Live Now */}
      <div style={{ padding: '0 16px 20px' }}>
        <SectionHeader title="Live Now" action="See all" onAction={() => goTo('rooms')} />
        {ROOMS.filter(r => r.live).map((r, i) => (
          <RoomCard key={i} {...r} hostPhoto={`https://images.unsplash.com/${r.hostPhoto}?w=52&h=52&fit=crop`} onClick={() => goTo('room-preview')} />
        ))}
      </div>

      {/* Popular Rooms */}
      <div style={{ padding: '0 16px 20px' }}>
        <SectionHeader title="Popular Rooms" action="See all" onAction={() => goTo('rooms')} />
        {ROOMS.filter(r => !r.live).slice(0, 3).map((r, i) => (
          <RoomCard key={i} {...r} hostPhoto={`https://images.unsplash.com/${r.hostPhoto}?w=52&h=52&fit=crop`} onClick={() => goTo('room-preview')} />
        ))}
      </div>

      {/* People you may like */}
      <div style={{ padding: '0 0 20px' }}>
        <div style={{ padding: '0 16px' }}>
          <SectionHeader title="People you may like" action="See all" onAction={() => goTo('people')} />
        </div>
        <HScrollRow>
          {PEOPLE_SUGGEST.map((p, i) => (
            <button key={i} onClick={() => goTo('public-profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
              <Card style={{ width: 130, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '16px 12px', textAlign: 'center' }}>
                <Avatar src={`https://images.unsplash.com/${p.photo}?w=56&h=56&fit=crop`} size={56} ring />
                <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600, fontSize: 13 }}>{p.name}</div>
                <div style={{ ...Ty.metadata, color: T.text3 }}>{p.followers} followers</div>
                <SecondaryBtn label="Follow" small />
              </Card>
            </button>
          ))}
        </HScrollRow>
      </div>

      {/* Upcoming Events */}
      <div style={{ padding: '0 16px 20px' }}>
        <SectionHeader title="Upcoming Events" action="See all" onAction={() => goTo('events')} />
        <EventCard
          title="AI & The Future: Panel Discussion"
          host="Alex Carter" date="Tomorrow" time="7:00 PM"
          attendees="1.2K attending"
          coverPhoto="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=390&h=100&fit=crop"
          onClick={() => goTo('event-detail')}
        />
      </div>

      {/* Communities */}
      <div style={{ padding: '0 16px 100px' }}>
        <SectionHeader title="Active Communities" action="See all" onAction={() => goTo('communities')} />
        <CommunityCard name="Tech Innovators" category="Technology" members="12.4K" rooms={8} coverEmoji="💡" joined onClick={() => goTo('community-detail')} />
        <CommunityCard name="Music Creators" category="Music & Arts" members="8.2K" rooms={5} coverEmoji="🎵" onClick={() => goTo('community-detail')} />
      </div>
    </div>
  )
}

// ─── Explore ──────────────────────────────────────────────────────────────────

export function ExploreScreen({ goTo }: { goTo: GoTo }) {
  const [tab, setTab] = useState('All')
  const [category, setCategory] = useState('')
  const TABS = ['All', 'Live', 'Events', 'Communities']
  const CATS = [
    { icon: '🎵', label: 'Music' }, { icon: '💼', label: 'Business' },
    { icon: '📚', label: 'Education' }, { icon: '🎮', label: 'Gaming' },
    { icon: '🌍', label: 'Culture' }, { icon: '🏃', label: 'Sports' },
    { icon: '🎨', label: 'Art' }, { icon: '🔬', label: 'Science' },
    { icon: '💪', label: 'Health' },
  ]

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: T.bg }}>
      <div style={{ padding: '52px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...Ty.screenTitle, color: T.text }}>Explore</span>
        <button onClick={() => goTo('search')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22 }}>🔍</button>
      </div>

      <HScrollRow px={16}>
        {TABS.map(t => <Chip key={t} label={t} active={tab === t} onClick={() => setTab(t)} />)}
      </HScrollRow>

      {/* Featured hero — approved abstract audio-wave treatment */}
      <div style={{ padding: '16px 16px 20px' }}>
        <button onClick={() => goTo('room-preview')} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', height: 170, background: 'linear-gradient(135deg, #132B74 0%, #5B2DCC 45%, #19CFE8 100%)' }}>
            <svg viewBox="0 0 390 170" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.95 }}>
              <defs><linearGradient id="exploreWave" x1="0" x2="1"><stop offset="0" stopColor="#6C4DFF"/><stop offset="0.55" stopColor="#B55CFF"/><stop offset="1" stopColor="#20D7E8"/></linearGradient></defs>
              <path d="M-20 118 C70 20 120 160 200 70 S320 40 420 105 L420 190 L-20 190Z" fill="url(#exploreWave)" opacity="0.82"/>
              <path d="M-20 145 C75 62 120 185 210 94 S325 75 420 128" fill="none" stroke="#FF8BDA" strokeWidth="10" opacity="0.62"/>
              <path d="M-20 105 C65 15 125 150 205 58 S325 28 420 92" fill="none" stroke="#66E8FF" strokeWidth="8" opacity="0.62"/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(7,17,38,0.86) 0%, rgba(7,17,38,0.28) 55%, transparent 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ ...Ty.labelSm, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 1 }}>Featured Live Rooms</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Outfit', color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>AI &amp; The Future</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <LiveBadge count="2.4K listening" />
                  <span style={{ background: '#FFFFFF', color: T.primary, borderRadius: 20, padding: '5px 16px', ...Ty.label, fontWeight: 700 }}>Join</span>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Categories */}
      <div style={{ padding: '0 16px 20px' }}>
        <SectionHeader title="Categories" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {CATS.map(c => (
            <button key={c.label} onClick={() => setCategory(category === c.label ? '' : c.label)} style={{
              background: category === c.label ? T.primarySoft : T.surface2,
              border: `1px solid ${category === c.label ? T.primary : T.border}60`,
              borderRadius: 14, padding: '14px 12px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 24 }}>{c.icon}</span>
              <span style={{ ...Ty.labelSm, color: category === c.label ? T.text : T.text2 }}>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div style={{ padding: '0 16px 20px' }}>
        <SectionHeader title="Trending Rooms" action="See all" onAction={() => goTo('rooms')} />
        {[
          { title: 'The Creator Economy', host: 'Maya Johnson', topic: 'Business', listeners: '2.1K', live: true },
          { title: 'Daily Motivation', host: 'Coach Daniel', topic: 'Wellness', listeners: '1.8K', live: true },
          { title: 'Startup Stories Live', host: 'Priya Sharma', topic: 'Startup', listeners: '1.5K', live: false },
        ].map((r, i) => (
          <RoomCard key={i} {...r} onClick={() => goTo('room-preview')} />
        ))}
      </div>

      {/* Rising Creators */}
      <div style={{ padding: '0 0 100px' }}>
        <div style={{ padding: '0 16px' }}>
          <SectionHeader title="Rising Creators" action="See all" onAction={() => goTo('creators')} />
        </div>
        <HScrollRow>
          {[
            { name: 'Sarah Chen', username: '@sarahc', photo: 'photo-1494790108377-be9c29b29330', followers: '48.2K', topic: 'Wellness' },
            { name: 'James Park', username: '@jpark', photo: 'photo-1472099645785-5658abf4ff4e', followers: '31K', topic: 'Tech' },
            { name: 'Priya Sharma', username: '@priyash', photo: 'photo-1500648767791-00dcc994a43e', followers: '22.5K', topic: 'Business' },
          ].map((c, i) => (
            <button key={i} onClick={() => goTo('public-profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
              <Card style={{ width: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 16, textAlign: 'center' }}>
                <Avatar src={`https://images.unsplash.com/${c.photo}?w=60&h=60&fit=crop`} size={60} ring />
                <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                <Chip label={c.topic} active />
                <div style={{ ...Ty.metadata, color: T.text3 }}>{c.followers} followers</div>
              </Card>
            </button>
          ))}
        </HScrollRow>
      </div>
    </div>
  )
}

// ─── Messages List ────────────────────────────────────────────────────────────

const CONVOS = [
  { name: 'Sarah Chen', preview: 'That was an amazing room!', time: '12:45', unread: 2, photo: 'photo-1494790108377-be9c29b29330', online: true },
  { name: 'Community Crew', preview: 'Ana: New event this weekend! 🎉', time: '10:30', unread: 0, photo: 'photo-1527980965255-d3b416303d12', online: true },
  { name: 'Mike Johnson', preview: "Let's catch up tomorrow?", time: 'Yesterday', unread: 0, photo: 'photo-1472099645785-5658abf4ff4e', online: false },
  { name: 'Designers United', preview: 'Ana: Great discussion today!', time: 'Yesterday', unread: 3, photo: 'photo-1507003211169-0a1dd7228f2d', online: false },
  { name: 'Priya Sharma', preview: 'Sent a voice message 🎙', time: 'Mon', unread: 0, photo: 'photo-1500648767791-00dcc994a43e', online: true },
  { name: 'Tech Minds', preview: 'You: Sounds good!', time: 'Sun', unread: 0, photo: 'photo-1438761681033-6461ffad8d80', online: false },
  { name: 'Daniel Lee', preview: 'Thanks for joining the room!', time: 'Sun', unread: 0, photo: 'photo-1519085360753-af0119f7cbe7', online: false },
]

export function MessagesScreen({ goTo }: { goTo: GoTo }) {
  const [q, setQ] = useState('')
  const filtered = CONVOS.filter(c => c.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '52px 16px 12px' }}>
        <div style={{ ...Ty.screenTitle, color: T.text, marginBottom: 14 }}>Messages</div>
        <SearchField placeholder="Search conversations..." value={q} onChange={setQ} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px' }}>
        {filtered.length === 0
          ? <EmptyState icon="✉" title="No conversations" message="Start a conversation by visiting someone's profile." action="Discover People" onAction={() => goTo('people')} />
          : filtered.map((c, i) => (
            <button key={i} onClick={() => goTo('conversation')} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${T.border}` }}>
                <Avatar src={`https://images.unsplash.com/${c.photo}?w=48&h=48&fit=crop`} size={48} online={c.online} />
                <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                  <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: c.unread > 0 ? 600 : 400 }}>{c.name}</div>
                  <div style={{ ...Ty.bodySm, color: c.unread > 0 ? T.text2 : T.text3, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.preview}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                  <span style={{ ...Ty.labelSm, color: T.text3 }}>{c.time}</span>
                  {c.unread > 0 && (
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', ...Ty.labelSm, color: '#fff' }}>{c.unread}</div>
                  )}
                </div>
              </div>
            </button>
          ))
        }
      </div>
    </div>
  )
}

// ─── Profile (My Profile) ─────────────────────────────────────────────────────

export function MyProfileScreen({ goTo }: { goTo: GoTo }) {
  const [tab, setTab] = useState('Rooms')

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, overflowY: 'auto' }}>
      {/* Banner */}
      <div style={{ height: 120, background: `linear-gradient(135deg, #1A0A5E, #0A1A5E)`, position: 'relative' }}>
        <button onClick={() => goTo('settings')} style={{ position: 'absolute', top: 52, right: 14, background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', fontSize: 16 }}>⚙</button>
      </div>
      <ProfileHeader
        name="Alex Carter" username="@alexcarter"
        bio="Tech enthusiast • Reader • Dreamer&#10;Building a better tomorrow."
        photo="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
        followers="12.4K" following="248" replays="3.2K"
        verified isMe
      />
      <div style={{ padding: '0 16px' }}>
        {/* Quick actions */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          {[{ label: '💰 Economy', screen: 'economy' }, { label: '🏆 Creator', screen: 'creator' }, { label: '👥 Followers', screen: 'followers' }].map(a => (
            <button key={a.label} onClick={() => goTo(a.screen)} style={{
              background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 20, padding: '8px 14px',
              ...Ty.label, color: T.text2, cursor: 'pointer', fontSize: 12,
            }}>{a.label}</button>
          ))}
        </div>

        <TabBar tabs={['Rooms', 'Replays', 'Activity']} active={tab} onChange={setTab} />
        <div style={{ paddingTop: 16, paddingBottom: 100 }}>
          {tab === 'Rooms' && ROOMS.map((r, i) => (
            <RoomCard key={i} {...r} hostPhoto={`https://images.unsplash.com/${r.hostPhoto}?w=52&h=52&fit=crop`} onClick={() => goTo('room-preview')} />
          ))}
          {tab === 'Replays' && (
            <EmptyState icon="▶" title="No replays yet" message="Your recorded rooms will appear here after they end." />
          )}
          {tab === 'Activity' && (
            <>
              {[
                { icon: '🎙', title: 'Joined a room', body: 'Tech & Innovation with Alex Carter', time: '2h ago' },
                { icon: '❤️', title: 'Received a gift', body: 'Sarah Chen sent you 💎 Diamond', time: '5h ago' },
                { icon: '👤', title: 'New follower', body: 'James Park started following you', time: 'Yesterday' },
              ].map((n, i) => <NotificationRow key={i} {...n} />)}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Economy / Wallet ─────────────────────────────────────────────────────────

const GIFTS_DATA = [
  { emoji: '💎', name: 'Diamond', cost: 500 },
  { emoji: '🌟', name: 'Star', cost: 50 },
  { emoji: '🎵', name: 'Note', cost: 30 },
  { emoji: '🚀', name: 'Rocket', cost: 200 },
  { emoji: '💜', name: 'Heart', cost: 20 },
  { emoji: '🔥', name: 'Fire', cost: 80 },
  { emoji: '🎁', name: 'Gift', cost: 100 },
  { emoji: '🌈', name: 'Rainbow', cost: 150 },
]

export function EconomyScreen({ goTo }: { goTo: GoTo }) {
  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, overflowY: 'auto' }}>
      <div style={{ padding: '52px 16px 16px' }}>
        <div style={{ ...Ty.screenTitle, color: T.text, marginBottom: 20 }}>Wallet</div>

        <WalletBalance amount={2480} onAddFunds={() => {}} />

        {/* Quick actions */}
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
          {[
            { icon: '🎁', label: 'Gifts', screen: 'gifts' },
            { icon: '🏪', label: 'Store', screen: 'store' },
            { icon: '📋', label: 'Tasks', screen: 'tasks' },
            { icon: '🏆', label: 'VIP', screen: 'vip' },
          ].map(a => (
            <button key={a.label} onClick={() => goTo(a.screen)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: T.surface2, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{a.icon}</div>
              <span style={{ ...Ty.metadata, color: T.text2 }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Progress */}
        <SectionHeader title="Your Progress" />
        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>⭐</span>
              <span style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600 }}>Level 12</span>
            </div>
            <span style={{ ...Ty.metadata, color: T.text3 }}>600 / 1,000 XP</span>
          </div>
          <ProgressBar value={600} max={1000} />
        </Card>

        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 24 }}>📅</span>
              <div>
                <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600 }}>Daily Check-in</div>
                <div style={{ ...Ty.metadata, color: T.success }}>+ 50 coins</div>
              </div>
            </div>
            <PrimaryBtn label="Claim" small onClick={() => goTo('check-in')} />
          </div>
        </Card>

        {/* Achievements */}
        <SectionHeader title="Achievements" action="See all" />
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', marginBottom: 20 }}>
          {[
            { icon: '🎙', name: 'First Room', done: true },
            { icon: '🔥', name: '7-day Streak', done: true },
            { icon: '👥', name: '100 Followers', done: true },
            { icon: '💎', name: 'VIP Member', done: false },
            { icon: '🏆', name: 'Top Creator', done: false },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: a.done ? T.premiumSoft : T.surface3, border: `2px solid ${a.done ? T.premium : T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, filter: a.done ? 'none' : 'grayscale(1) opacity(0.5)' }}>{a.icon}</div>
              <span style={{ ...Ty.labelSm, color: a.done ? T.text2 : T.text4, textAlign: 'center', width: 60 }}>{a.name}</span>
            </div>
          ))}
        </div>

        {/* Gifts */}
        <SectionHeader title="Send Gifts" action="View all" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          {GIFTS_DATA.map((g, i) => <GiftTile key={i} {...g} />)}
        </div>

        {/* Rankings teaser */}
        <SectionHeader title="This Week's Rankings" action="See all" onAction={() => goTo('rankings')} />
        {[
          { rank: 1, name: 'Sarah Chen', photo: 'photo-1494790108377-be9c29b29330', score: '12,400 XP', badge: 'VIP' },
          { rank: 2, name: 'Alex Carter', photo: 'photo-1507003211169-0a1dd7228f2d', score: '10,200 XP', isMe: true },
          { rank: 3, name: 'James Park', photo: 'photo-1472099645785-5658abf4ff4e', score: '9,800 XP' },
        ].map((r, i) => (
          <RankingRow key={i} {...r} photo={`https://images.unsplash.com/${r.photo}?w=40&h=40&fit=crop`} />
        ))}

        {/* Earnings */}
        <div style={{ marginTop: 20 }}>
          <SectionHeader title="Earnings" />
          <Card style={{ marginBottom: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'Outfit', color: T.success }}>+320 🪙</div>
                <div style={{ ...Ty.metadata, color: T.text3 }}>Today, 12:30 PM</div>
              </div>
              <SecondaryBtn label="View all" small />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ─── Creator Dashboard ────────────────────────────────────────────────────────

export function CreatorScreen({ goTo }: { goTo: GoTo }) {
  const [creatorTab, setCreatorTab] = useState('Overview')
  const bars = [40, 65, 50, 80, 70, 90, 75]
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, overflowY: 'auto' }}>
      <div style={{ padding: '52px 16px 12px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=36&h=36&fit=crop" size={36} ring />
            <div>
              <div style={{ ...Ty.sectionTitle, color: T.text }}>Alex Carter</div>
              <div style={{ ...Ty.labelSm, color: T.text3 }}>Creator</div>
            </div>
          </div>
          <PrimaryBtn label="Go Live" onClick={() => goTo('creator-live-studio')} small />
        </div>

        {/* Creator Nav */}
        <TabBar tabs={['Overview', 'Audience', 'Analytics', 'Earnings']} active={creatorTab} onChange={setCreatorTab} />
        <div style={{ paddingTop: 16 }}>
          {creatorTab === 'Overview' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <StatCard label="Total Followers" value="48.2K" delta="+12%" accentColor={T.accent} icon="👥" />
                <StatCard label="Total Earnings" value="$2,340" delta="+8%" accentColor={T.success} icon="💰" />
                <StatCard label="Rooms Hosted" value="142" delta="+3" accentColor={T.primary} icon="🎙" />
                <StatCard label="Avg. Listeners" value="1.8K" delta="+5%" accentColor={T.premium} icon="👂" />
              </div>

              {/* Weekly chart */}
              <Card style={{ marginBottom: 16 }}>
                <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600, marginBottom: 16 }}>Weekly Listeners</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
                  {bars.map((h, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: '100%', height: h, borderRadius: '4px 4px 0 0', background: i === 5 ? `linear-gradient(to top, ${T.primary}, ${T.primaryStrong})` : T.surface3, transition: 'height 0.3s' }} />
                      <div style={{ ...Ty.labelSm, color: T.text3 }}>{days[i]}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upcoming room */}
              <SectionHeader title="Live / Upcoming" action="See all" />
              <Card style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: T.surface3 }}>
                    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=52&h=52&fit=crop" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600 }}>Tech Talk with Alex</div>
                    <div style={{ ...Ty.metadata, color: T.text3, marginTop: 2 }}>Today • 7:00 PM</div>
                    <div style={{ ...Ty.metadata, color: T.text2, marginTop: 2 }}>1.2K attending</div>
                  </div>
                  <PrimaryBtn label="Start" small onClick={() => goTo('creator-live-studio')} />
                </div>
              </Card>

              {/* Alerts */}
              <SectionHeader title="Alerts" />
              <Card style={{ background: T.premiumSoft, border: `1px solid ${T.premium}40`, marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>🌟</span>
                  <div>
                    <div style={{ ...Ty.bodyMed, color: T.premium, fontWeight: 600 }}>Milestone reached!</div>
                    <div style={{ ...Ty.bodySm, color: T.text2, marginTop: 2 }}>You've hit 48K followers. Unlock VIP creator perks.</div>
                  </div>
                </div>
              </Card>
            </>
          )}
          {creatorTab === 'Audience' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <StatCard label="Followers" value="48.2K" delta="+542 this week" accentColor={T.accent} />
                <StatCard label="Subscribers" value="1.2K" delta="+38 this week" accentColor={T.premium} />
              </div>
              <SectionHeader title="Top Followers" />
              {[
                { name: 'Sarah Chen', username: '@sarahc', photo: 'photo-1494790108377-be9c29b29330', bio: 'Wellness advocate' },
                { name: 'James Park', username: '@jpark', photo: 'photo-1472099645785-5658abf4ff4e', bio: 'Tech & Innovation' },
                { name: 'Maya Wilson', username: '@mayaw', photo: 'photo-1544005313-94ddf0286df2', bio: 'Creator & Podcaster' },
              ].map((p, i) => (
                <PersonRow key={i} {...p} photo={`https://images.unsplash.com/${p.photo}?w=48&h=48&fit=crop`} following onFollow={() => {}} />
              ))}
            </div>
          )}
          {creatorTab === 'Analytics' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <StatCard label="Total Listens" value="184K" delta="+2.3K" accentColor={T.primary} />
                <StatCard label="Avg. Duration" value="24 min" delta="+3 min" accentColor={T.accent} />
                <StatCard label="Replay Views" value="3.2K" delta="+180" accentColor={T.success} />
                <StatCard label="Profile Visits" value="12.8K" delta="+1.4K" accentColor={T.premium} />
              </div>
              <Card>
                <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600, marginBottom: 14 }}>Top Topics</div>
                {[['Technology', 0.72], ['AI', 0.55], ['Business', 0.38], ['Startup', 0.29]].map(([topic, pct]) => (
                  <div key={topic as string} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ ...Ty.bodySm, color: T.text2 }}>{topic}</span>
                      <span style={{ ...Ty.bodySm, color: T.text3 }}>{Math.round((pct as number) * 100)}%</span>
                    </div>
                    <ProgressBar value={(pct as number) * 100} max={100} />
                  </div>
                ))}
              </Card>
            </div>
          )}
          {creatorTab === 'Earnings' && (
            <div>
              <WalletBalance amount={4820} />
              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <StatCard label="This Month" value="$2,340" delta="+8%" accentColor={T.success} />
                <StatCard label="Pending" value="$320" accentColor={T.premium} />
              </div>
              <SectionHeader title="Recent Payouts" action="View all" />
              {[
                { date: 'Dec 1, 2024', amount: '$1,240', status: 'Paid' },
                { date: 'Nov 1, 2024', amount: '$980', status: 'Paid' },
                { date: 'Oct 1, 2024', amount: '$820', status: 'Paid' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${T.border}` }}>
                  <div>
                    <div style={{ ...Ty.bodyMed, color: T.text }}>{p.amount}</div>
                    <div style={{ ...Ty.metadata, color: T.text3, marginTop: 2 }}>{p.date}</div>
                  </div>
                  <span style={{ ...Ty.labelSm, color: T.success, background: T.successSoft, borderRadius: 10, padding: '3px 10px' }}>{p.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ height: 100 }} />
      </div>
    </div>
  )
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export function SettingsScreen({ goTo }: { goTo: GoTo }) {
  const GROUPS = [
    {
      title: 'Account',
      rows: [
        { icon: '👤', label: 'Account & Profile', screen: 'edit-profile' },
        { icon: '🔒', label: 'Privacy', screen: 'privacy' },
        { icon: '🛡', label: 'Security', screen: 'security' },
        { icon: '📱', label: 'Sessions & Devices', screen: 'sessions' },
        { icon: '🔑', label: 'Login Activity', screen: 'login-activity' },
      ],
    },
    {
      title: 'Experience',
      rows: [
        { icon: '🔔', label: 'Notification Preferences', screen: 'notification-preferences' },
        { icon: '🎙', label: 'Voice & Appearance', screen: 'voice-appearance' },
      ],
    },
    {
      title: 'Safety',
      rows: [
        { icon: '🛡', label: 'Safety Center', screen: 'safety-center' },
        { icon: '🚫', label: 'Blocked Users', screen: 'blocked-users' },
        { icon: '🚩', label: 'Reporting', screen: 'reporting' },
      ],
    },
    {
      title: 'Support',
      rows: [
        { icon: '❓', label: 'Help & Support', screen: 'support' },
        { icon: '📋', label: 'CMS Content', screen: 'cms-help' },
        { icon: 'ℹ', label: 'About VoiceCloud', sub: 'v2.4.1', screen: 'cms-about' },
      ],
    },
  ]

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, overflowY: 'auto' }}>
      <div style={{ padding: '52px 16px 16px' }}>
        <div style={{ ...Ty.screenTitle, color: T.text, marginBottom: 20 }}>Settings</div>

        {/* Profile card */}
        <button onClick={() => goTo('my-profile')} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 20px' }}>
          <Card style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop" size={56} ring />
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ ...Ty.sectionTitle, color: T.text }}>Alex Carter</div>
              <div style={{ ...Ty.metadata, color: T.text3 }}>@alexcarter</div>
            </div>
            <span style={{ color: T.text3, fontSize: 18 }}>›</span>
          </Card>
        </button>

        {GROUPS.map(g => (
          <div key={g.title} style={{ marginBottom: 24 }}>
            <div style={{ ...Ty.labelSm, color: T.text3, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{g.title}</div>
            <Card style={{ padding: '0 16px' }}>
              {g.rows.map((r, i) => (
                <SettingsRow key={i} icon={r.icon} label={r.label} sub={(r as any).sub} onClick={() => goTo((r as any).screen)} />
              ))}
            </Card>
          </div>
        ))}

        <div style={{ textAlign: 'center', paddingBottom: 100 }}>
          <button style={{ background: T.liveSoft, border: `1px solid ${T.live}40`, borderRadius: 40, padding: '12px 40px', color: T.live, ...Ty.bodyMed, fontWeight: 600, cursor: 'pointer' }}>Sign Out</button>
        </div>
      </div>
    </div>
  )
}
