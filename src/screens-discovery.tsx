// Phase A — Consumer / Discovery
// Rooms · People · Creators · Search · Community Search
// Public Profile · My Profile · Followers · Following · Friends

import { useState } from 'react'
import {
  T, Ty, LiveBadge, Avatar, AudioWaveform, Chip, PrimaryBtn, SecondaryBtn,
  Card, SectionHeader, PageHeader, SearchField, TabBar, EmptyState,
  RoomCard, PersonRow, CreatorCard, CommunityCard, Skeleton, SkeletonCard,
  SkeletonPersonRow, ProfileHeader, HScrollRow, StatCard, ProgressBar,
} from './ds'

type GoTo = (screen: string) => void

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_ROOMS = [
  { title: 'Tech & Innovation', host: 'Alex Carter', topic: 'Technology', listeners: '2.4K', live: true, gradient: `linear-gradient(135deg, #3B82F6, #1D4ED8)`, hostPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=52&h=52&fit=crop' },
  { title: 'Mindful Living', host: 'Dr. Sarah Kim', topic: 'Wellness', listeners: '2.1K', live: true, gradient: `linear-gradient(135deg, #059669, #047857)`, hostPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=52&h=52&fit=crop' },
  { title: 'Music & Vibes', host: 'DJ Marcus', topic: 'Music', listeners: '1.8K', live: false, gradient: `linear-gradient(135deg, #F97316, #EA580C)`, hostPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=52&h=52&fit=crop' },
  { title: 'Startup Stories', host: 'Priya Sharma', topic: 'Business', listeners: '1.5K', live: false, gradient: `linear-gradient(135deg, #6C4DFF, #4C1D95)`, hostPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=52&h=52&fit=crop' },
  { title: 'The Creator Economy', host: 'Maya Johnson', topic: 'Business', listeners: '2.1K', live: true, gradient: `linear-gradient(135deg, #DB2777, #9D174D)`, hostPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=52&h=52&fit=crop' },
  { title: 'AI & The Future', host: 'Daniel Lee', topic: 'Technology', listeners: '1.9K', live: true, gradient: `linear-gradient(135deg, #0EA5E9, #0369A1)`, hostPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=52&h=52&fit=crop' },
  { title: 'Daily Motivation', host: 'Coach James', topic: 'Wellness', listeners: '1.4K', live: false, gradient: `linear-gradient(135deg, #F59E0B, #B45309)`, hostPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=52&h=52&fit=crop', scheduledAt: 'Tomorrow 8 AM' },
  { title: 'Book Club Live', host: 'Emma Wilson', topic: 'Books', listeners: '980', live: false, gradient: `linear-gradient(135deg, #8B5CF6, #6D28D9)`, hostPhoto: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=52&h=52&fit=crop', scheduledAt: 'Today 6 PM' },
]

const PEOPLE_DATA = [
  { name: 'Sarah Chen', username: '@sarahc', bio: 'Wellness advocate • Podcaster', photo: 'photo-1494790108377-be9c29b29330', followers: '48.2K', following: false, online: true },
  { name: 'James Park', username: '@jpark', bio: 'Tech & Innovation enthusiast', photo: 'photo-1472099645785-5658abf4ff4e', followers: '31K', following: false, online: true },
  { name: 'Maya Johnson', username: '@mayaj', bio: 'Creator • Speaker • Mom', photo: 'photo-1544005313-94ddf0286df2', followers: '22.5K', following: true, online: false },
  { name: 'Daniel Lee', username: '@daniell', bio: 'AI researcher, building the future', photo: 'photo-1438761681033-6461ffad8d80', followers: '18.8K', following: false, online: true },
  { name: 'Priya Sharma', username: '@priyash', bio: 'Startup founder • Investor', photo: 'photo-1500648767791-00dcc994a43e', followers: '14.2K', following: false, online: false },
  { name: 'Emma Wilson', username: '@emmaw', bio: 'Book lover • Reader • Writer', photo: 'photo-1527980965255-d3b416303d12', followers: '12.1K', following: true, online: true },
  { name: 'Marcus Hill', username: '@marcush', bio: 'DJ • Music producer', photo: 'photo-1519085360753-af0119f7cbe7', followers: '9.4K', following: false, online: false },
  { name: 'Lily Zhang', username: '@lilyz', bio: 'Artist • Creative director', photo: 'photo-1580489944761-15a19d654956', followers: '7.8K', following: false, online: true },
]

const CREATORS_DATA = [
  { name: 'Sarah Chen', username: '@sarahc', photo: 'photo-1494790108377-be9c29b29330', followers: '48.2K', topic: 'Wellness', verified: true },
  { name: 'Alex Carter', username: '@alexc', photo: 'photo-1507003211169-0a1dd7228f2d', followers: '32.1K', topic: 'Tech', verified: true },
  { name: 'Maya Johnson', username: '@mayaj', photo: 'photo-1544005313-94ddf0286df2', followers: '28.5K', topic: 'Business', verified: false },
  { name: 'James Park', username: '@jpark', photo: 'photo-1472099645785-5658abf4ff4e', followers: '22.8K', topic: 'Tech', verified: true },
  { name: 'Priya Sharma', username: '@priyash', photo: 'photo-1500648767791-00dcc994a43e', followers: '18.4K', topic: 'Startup', verified: false },
  { name: 'Emma Wilson', username: '@emmaw', photo: 'photo-1527980965255-d3b416303d12', followers: '14.2K', topic: 'Books', verified: false },
]

// ─── Rooms Screen ─────────────────────────────────────────────────────────────

export function RoomsScreen({ goTo }: { goTo: GoTo }) {
  const [filter, setFilter] = useState('All')
  const [category, setCategory] = useState('All')
  const FILTERS = ['All', 'Live', 'Scheduled', 'Trending']
  const CATS = ['All', 'Technology', 'Wellness', 'Music', 'Business', 'Books']

  const filtered = ALL_ROOMS.filter(r => {
    const matchFilter = filter === 'All' || (filter === 'Live' && r.live) || (filter === 'Scheduled' && r.scheduledAt) || filter === 'Trending'
    const matchCat = category === 'All' || r.topic === category
    return matchFilter && matchCat
  })

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Rooms" onBack={() => goTo('home')} right={
        <button onClick={() => goTo('search')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22 }}>🔍</button>
      } />
      <div style={{ padding: '0 16px 12px' }}>
        <SearchField placeholder="Search rooms..." />
      </div>
      <HScrollRow px={16}>
        {FILTERS.map(f => <Chip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />)}
      </HScrollRow>
      <div style={{ height: 8 }} />
      <HScrollRow px={16}>
        {CATS.map(c => <Chip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />)}
      </HScrollRow>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 100px' }}>
        {filtered.length === 0
          ? <EmptyState icon="🎙" title="No rooms found" message="Try a different filter or search term." action="Clear filters" onAction={() => { setFilter('All'); setCategory('All') }} />
          : filtered.map((r, i) => <RoomCard key={i} {...r} onClick={() => goTo('room-preview')} />)
        }
      </div>
    </div>
  )
}

// ─── People Screen ────────────────────────────────────────────────────────────

export function PeopleScreen({ goTo }: { goTo: GoTo }) {
  const [tab, setTab] = useState('Suggested')
  const [q, setQ] = useState('')
  const TABS = ['Suggested', 'Popular', 'Friends']
  const [followStates, setFollowStates] = useState<Record<string, boolean>>(
    Object.fromEntries(PEOPLE_DATA.map(p => [p.username, p.following]))
  )

  const people = PEOPLE_DATA.filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.username.toLowerCase().includes(q.toLowerCase()))

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="People" onBack={() => goTo('home')} />
      <div style={{ padding: '0 16px 12px' }}>
        <SearchField placeholder="Search people..." value={q} onChange={setQ} />
      </div>
      <div style={{ padding: '0 16px' }}>
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px' }}>
        {people.length === 0
          ? <EmptyState icon="👤" title="No people found" message="Try a different name or username." />
          : people.map(p => (
            <PersonRow
              key={p.username}
              name={p.name} username={p.username} bio={p.bio}
              photo={`https://images.unsplash.com/${p.photo}?w=48&h=48&fit=crop`}
              online={p.online}
              following={followStates[p.username]}
              onFollow={() => setFollowStates(s => ({ ...s, [p.username]: !s[p.username] }))}
              onClick={() => goTo('public-profile')}
            />
          ))
        }
      </div>
    </div>
  )
}

// ─── Creators Screen ──────────────────────────────────────────────────────────

export function CreatorsScreen({ goTo }: { goTo: GoTo }) {
  const [tab, setTab] = useState('Rising')
  const TABS = ['Rising', 'Top', 'New']

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Creators" onBack={() => goTo('home')} />
      <div style={{ padding: '0 16px' }}>
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>

      {/* Featured creator */}
      <div style={{ padding: '16px 16px 12px' }}>
        <button onClick={() => goTo('public-profile')} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', height: 140 }}>
            <img src="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=390&h=140&fit=crop&auto=format" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,10,24,0.92) 50%, transparent)' }} />
            <div style={{ position: 'absolute', inset: 0, padding: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop" size={60} ring />
              <div>
                <div style={{ ...Ty.labelSm, color: T.premium, marginBottom: 4 }}>⭐ Featured Creator</div>
                <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Outfit', color: T.text }}>Sarah Chen ✓</div>
                <div style={{ ...Ty.metadata, color: T.text2, marginTop: 2 }}>48.2K followers • Wellness</div>
                <div style={{ marginTop: 8 }}>
                  <SecondaryBtn label="Follow" small />
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px' }}>
        <SectionHeader title={tab === 'Rising' ? 'Rising Creators' : tab === 'Top' ? 'Top Creators' : 'New Creators'} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {CREATORS_DATA.map((c, i) => (
            <CreatorCard key={i} {...c}
              photo={`https://images.unsplash.com/${c.photo}?w=60&h=60&fit=crop`}
              onClick={() => goTo('public-profile')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Search Screen ────────────────────────────────────────────────────────────

export function SearchScreen({ goTo }: { goTo: GoTo }) {
  const [q, setQ] = useState('')
  const [tab, setTab] = useState('All')
  const TABS = ['All', 'Rooms', 'People', 'Communities', 'Events']
  const TRENDING = ['AI & Technology', 'Morning Motivation', 'Startup Growth', 'Music Vibes', 'Wellness', 'Book Club']

  const hasQuery = q.trim().length > 0

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '52px 16px 12px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => goTo('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text3, fontSize: 16 }}>‹</button>
          <div style={{ flex: 1 }}>
            <SearchField placeholder="Rooms, people, topics..." value={q} onChange={setQ} autoFocus />
          </div>
        </div>
      </div>

      {!hasQuery ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px' }}>
          <SectionHeader title="Trending" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {TRENDING.map(t => <Chip key={t} label={t} onClick={() => setQ(t)} />)}
          </div>

          <SectionHeader title="Recent Searches" />
          {['tech innovation', 'sarah chen', 'AI & Future'].map((s, i) => (
            <button key={i} onClick={() => setQ(s)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 16, color: T.text3 }}>🕐</span>
              <span style={{ ...Ty.bodyMed, color: T.text2 }}>{s}</span>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '0 16px' }}>
            <TabBar tabs={TABS} active={tab} onChange={setTab} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 100px' }}>
            {(tab === 'All' || tab === 'Rooms') && (
              <div style={{ marginBottom: 20 }}>
                {tab === 'All' && <SectionHeader title="Rooms" action="See all" onAction={() => setTab('Rooms')} />}
                {ALL_ROOMS.filter(r => r.title.toLowerCase().includes(q.toLowerCase()) || r.topic.toLowerCase().includes(q.toLowerCase())).slice(0, tab === 'All' ? 2 : 8).map((r, i) => (
                  <RoomCard key={i} {...r} onClick={() => goTo('room-preview')} />
                ))}
              </div>
            )}
            {(tab === 'All' || tab === 'People') && (
              <div style={{ marginBottom: 20 }}>
                {tab === 'All' && <SectionHeader title="People" action="See all" onAction={() => setTab('People')} />}
                {PEOPLE_DATA.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.username.toLowerCase().includes(q.toLowerCase())).slice(0, tab === 'All' ? 3 : 8).map(p => (
                  <PersonRow key={p.username} {...p}
                    photo={`https://images.unsplash.com/${p.photo}?w=48&h=48&fit=crop`}
                    following={p.following}
                    onFollow={() => {}}
                    onClick={() => goTo('public-profile')}
                  />
                ))}
              </div>
            )}
            {(tab === 'All' || tab === 'Communities') && (
              <div style={{ marginBottom: 20 }}>
                {tab === 'All' && <SectionHeader title="Communities" action="See all" onAction={() => setTab('Communities')} />}
                {[
                  { name: 'Tech Innovators', category: 'Technology', members: '12.4K', rooms: 8, coverEmoji: '💡' },
                  { name: 'Music Creators', category: 'Music & Arts', members: '8.2K', rooms: 5, coverEmoji: '🎵' },
                ].filter(c => c.name.toLowerCase().includes(q.toLowerCase())).map((c, i) => (
                  <CommunityCard key={i} {...c} onClick={() => goTo('community-detail')} />
                ))}
              </div>
            )}
            {ALL_ROOMS.filter(r => r.title.toLowerCase().includes(q.toLowerCase())).length === 0 &&
             PEOPLE_DATA.filter(p => p.name.toLowerCase().includes(q.toLowerCase())).length === 0 && (
              <EmptyState icon="🔍" title={`No results for "${q}"`} message="Try different keywords or browse categories." action="Clear search" onAction={() => setQ('')} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Community Search Screen ──────────────────────────────────────────────────

export function CommunitySearchScreen({ goTo }: { goTo: GoTo }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const CATS = ['All', 'Technology', 'Music', 'Business', 'Wellness', 'Art', 'Sports']
  const COMMUNITIES = [
    { name: 'Tech Innovators', category: 'Technology', members: '12.4K', rooms: 8, coverEmoji: '💡', joined: true },
    { name: 'Music Creators', category: 'Music & Arts', members: '8.2K', rooms: 5, coverEmoji: '🎵', joined: false },
    { name: 'Startup Builders', category: 'Business', members: '6.1K', rooms: 12, coverEmoji: '🚀', joined: false },
    { name: 'Daily Wellness', category: 'Wellness', members: '4.8K', rooms: 6, coverEmoji: '🌿', joined: false },
    { name: 'AI & Future', category: 'Technology', members: '9.7K', rooms: 14, coverEmoji: '🤖', joined: false },
    { name: 'Creative Minds', category: 'Art', members: '3.2K', rooms: 4, coverEmoji: '🎨', joined: true },
  ]

  const filtered = COMMUNITIES.filter(c =>
    (cat === 'All' || c.category === cat) &&
    (!q || c.name.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Find Communities" onBack={() => goTo('communities')} />
      <div style={{ padding: '0 16px 12px' }}>
        <SearchField placeholder="Search communities..." value={q} onChange={setQ} />
      </div>
      <HScrollRow px={16}>
        {CATS.map(c => <Chip key={c} label={c} active={cat === c} onClick={() => setCat(c)} />)}
      </HScrollRow>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 100px' }}>
        {filtered.length === 0
          ? <EmptyState icon="🌐" title="No communities found" message="Try a different category or search term." />
          : filtered.map((c, i) => <CommunityCard key={i} {...c} onClick={() => goTo('community-detail')} />)
        }
      </div>
    </div>
  )
}

// ─── Public Profile Screen ────────────────────────────────────────────────────

export function PublicProfileScreen({ goTo }: { goTo: GoTo }) {
  const [tab, setTab] = useState('Rooms')
  const [following, setFollowing] = useState(false)

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, overflowY: 'auto' }}>
      {/* Banner */}
      <div style={{ height: 120, background: `linear-gradient(135deg, #0F172A, #1E3A5F)`, position: 'relative' }}>
        <button onClick={() => goTo('home')} style={{ position: 'absolute', top: 52, left: 14, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', fontSize: 18 }}>‹</button>
        <button style={{ position: 'absolute', top: 52, right: 14, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', fontSize: 18 }}>⋯</button>
      </div>
      <ProfileHeader
        name="Sarah Chen" username="@sarahc"
        bio="Wellness advocate • Podcaster • Speaker&#10;Living intentionally. Building community."
        photo="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
        followers="48.2K" following="320" replays="1.8K"
        verified
        onFollow={() => setFollowing(f => !f)}
        onMessage={() => goTo('conversation')}
      />
      <div style={{ padding: '0 16px' }}>
        {/* Mutual followers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '10px 14px', background: T.surface2, borderRadius: 12, border: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex' }}>
            {['photo-1472099645785-5658abf4ff4e', 'photo-1500648767791-00dcc994a43e', 'photo-1438761681033-6461ffad8d80'].map((p, i) => (
              <img key={i} src={`https://images.unsplash.com/${p}?w=22&h=22&fit=crop`} style={{ width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${T.surface2}`, marginLeft: i > 0 ? -6 : 0 }} alt="" />
            ))}
          </div>
          <span style={{ ...Ty.metadata, color: T.text3 }}>Followed by James, Priya and 12 others you follow</span>
        </div>

        <TabBar tabs={['Rooms', 'Replays', 'Activity']} active={tab} onChange={setTab} />
        <div style={{ paddingTop: 16, paddingBottom: 100 }}>
          {tab === 'Rooms' && ALL_ROOMS.filter(r => r.host === 'Dr. Sarah Kim' || r.host === 'Sarah Chen').concat(ALL_ROOMS.slice(0, 2)).map((r, i) => (
            <RoomCard key={i} {...r} onClick={() => goTo('room-preview')} />
          ))}
          {tab === 'Replays' && (
            <>
              {[
                { title: 'Morning Wellness Check-in', host: 'Sarah Chen', topic: 'Wellness', listeners: '1.4K', live: false },
                { title: 'Mindfulness for Creators', host: 'Sarah Chen', topic: 'Wellness', listeners: '980', live: false },
              ].map((r, i) => <RoomCard key={i} {...r} onClick={() => goTo('room-preview')} />)}
            </>
          )}
          {tab === 'Activity' && (
            <>
              {[
                { icon: '🎙', title: 'Hosted a room', body: 'Mindful Living — 2.1K listeners', time: '2h ago', unread: false },
                { icon: '👤', title: 'New milestone', body: 'Reached 48K followers!', time: 'Yesterday', unread: false },
              ].map((n, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: T.surface3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{n.icon}</div>
                  <div>
                    <div style={{ ...Ty.bodyMed, color: T.text }}>{n.title}</div>
                    <div style={{ ...Ty.metadata, color: T.text3, marginTop: 2 }}>{n.body}</div>
                    <div style={{ ...Ty.labelSm, color: T.text4, marginTop: 4 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Followers Screen ─────────────────────────────────────────────────────────

export function FollowersScreen({ goTo }: { goTo: GoTo }) {
  const [tab, setTab] = useState('Followers')
  const TABS = ['Followers', 'Following', 'Friends']
  const [q, setQ] = useState('')

  const people = PEOPLE_DATA.filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Alex Carter" onBack={() => goTo('my-profile')} />
      <div style={{ padding: '0 16px' }}>
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>
      <div style={{ padding: '8px 16px 12px' }}>
        <SearchField placeholder={`Search ${tab.toLowerCase()}...`} value={q} onChange={setQ} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px' }}>
        {people.length === 0
          ? <EmptyState icon="👤" title={`No ${tab.toLowerCase()} found`} message="Try a different search term." />
          : people.map(p => (
            <PersonRow
              key={p.username} {...p}
              photo={`https://images.unsplash.com/${p.photo}?w=48&h=48&fit=crop`}
              following={tab === 'Following' ? true : p.following}
              onFollow={() => {}}
              onClick={() => goTo('public-profile')}
            />
          ))
        }
      </div>
    </div>
  )
}
