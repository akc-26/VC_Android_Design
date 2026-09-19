// Phase B — Social / Engagement
// Communities · Community Detail · Community Creation · Community Management
// Community Members · Community Events · Events · Event Detail
// Conversation (chat thread) · Notifications

import { useState } from 'react'
import {
  T, Ty, LiveBadge, Avatar, AudioWaveform, Chip, PrimaryBtn, SecondaryBtn,
  Card, SectionHeader, PageHeader, SearchField, TabBar, EmptyState,
  RoomCard, PersonRow, EventCard, CommunityCard, NotificationRow, SettingsRow,
  MessageBubble, HScrollRow, ProgressBar,
} from './ds'

type GoTo = (screen: string) => void

// ─── Communities Screen ───────────────────────────────────────────────────────

const MY_COMMUNITIES = [
  { name: 'Tech Innovators', category: 'Technology', members: '12.4K', rooms: 8, coverEmoji: '💡', joined: true },
  { name: 'Creative Minds', category: 'Art & Design', members: '3.2K', rooms: 4, coverEmoji: '🎨', joined: true },
]
const DISCOVER_COMMUNITIES = [
  { name: 'Music Creators', category: 'Music & Arts', members: '8.2K', rooms: 5, coverEmoji: '🎵', joined: false },
  { name: 'Startup Builders', category: 'Business', members: '6.1K', rooms: 12, coverEmoji: '🚀', joined: false },
  { name: 'Daily Wellness', category: 'Wellness', members: '4.8K', rooms: 6, coverEmoji: '🌿', joined: false },
  { name: 'AI & Future', category: 'Technology', members: '9.7K', rooms: 14, coverEmoji: '🤖', joined: false },
  { name: 'Book Club', category: 'Education', members: '2.6K', rooms: 3, coverEmoji: '📚', joined: false },
  { name: 'Sports Talk', category: 'Sports', members: '5.4K', rooms: 7, coverEmoji: '⚽', joined: false },
]

export function CommunitiesScreen({ goTo }: { goTo: GoTo }) {
  const [tab, setTab] = useState('My Communities')
  const TABS = ['My Communities', 'Discover', 'Events']

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '52px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...Ty.screenTitle, color: T.text }}>Communities</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => goTo('community-search')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22 }}>🔍</button>
          <PrimaryBtn label="+ Create" onClick={() => goTo('community-create')} small />
        </div>
      </div>
      <div style={{ padding: '0 16px' }}>
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 100px' }}>
        {tab === 'My Communities' && (
          MY_COMMUNITIES.length === 0
            ? <EmptyState icon="🌐" title="No communities yet" message="Discover and join communities around your interests." action="Discover" onAction={() => setTab('Discover')} />
            : MY_COMMUNITIES.map((c, i) => <CommunityCard key={i} {...c} onClick={() => goTo('community-detail')} />)
        )}
        {tab === 'Discover' && DISCOVER_COMMUNITIES.map((c, i) => (
          <CommunityCard key={i} {...c} onClick={() => goTo('community-detail')} />
        ))}
        {tab === 'Events' && (
          <>
            <EventCard title="AI Roundtable" host="Tech Innovators" date="Today" time="6:00 PM" attendees="432 attending" coverPhoto="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=390&h=100&fit=crop" onClick={() => goTo('event-detail')} />
            <EventCard title="Creator Masterclass" host="Creative Minds" date="Tomorrow" time="3:00 PM" attendees="218 attending" onClick={() => goTo('event-detail')} />
            <EventCard title="Music Open Mic" host="Music Creators" date="Sat, Dec 9" time="7:30 PM" attendees="156 attending" onClick={() => goTo('event-detail')} />
          </>
        )}
      </div>
    </div>
  )
}

// ─── Community Detail Screen ──────────────────────────────────────────────────

export function CommunityDetailScreen({ goTo }: { goTo: GoTo }) {
  const [tab, setTab] = useState('Rooms')
  const [joined, setJoined] = useState(true)
  const TABS = ['Rooms', 'Members', 'Events', 'About']

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, overflowY: 'auto' }}>
      {/* Cover */}
      <div style={{ height: 140, background: `linear-gradient(135deg, #1E3A5F, #0F172A)`, position: 'relative' }}>
        <button onClick={() => goTo('communities')} style={{ position: 'absolute', top: 52, left: 14, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', fontSize: 18 }}>‹</button>
        <button onClick={() => goTo('community-manage')} style={{ position: 'absolute', top: 52, right: 14, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', fontSize: 18 }}>⚙</button>
        <div style={{ position: 'absolute', bottom: -28, left: 20, width: 56, height: 56, borderRadius: 16, background: T.surface2, border: `3px solid ${T.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>💡</div>
      </div>

      <div style={{ padding: '40px 16px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Outfit', color: T.text }}>Tech Innovators</div>
            <div style={{ ...Ty.metadata, color: T.text3, marginTop: 2 }}>Technology • Public Community</div>
          </div>
          <button onClick={() => setJoined(j => !j)} style={{
            background: joined ? T.surface3 : T.primary,
            border: `1px solid ${joined ? T.border : 'transparent'}`,
            borderRadius: 20, padding: '8px 20px', color: joined ? T.text2 : '#fff',
            ...Ty.label, cursor: 'pointer',
          }}>{joined ? 'Joined ✓' : 'Join'}</button>
        </div>

        <div style={{ ...Ty.body, color: T.text2, lineHeight: 1.6, marginBottom: 14 }}>
          A community for technology enthusiasts, innovators, and forward-thinkers. Join our rooms to discuss the latest in AI, startups, and emerging tech.
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
          {[
            { label: 'Members', val: '12.4K' },
            { label: 'Rooms', val: '8 live' },
            { label: 'Events', val: '3 upcoming' },
          ].map(s => (
            <button key={s.label} onClick={() => setTab(s.label === 'Members' ? 'Members' : s.label === 'Rooms' ? 'Rooms' : 'Events')} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: 17, fontWeight: 700, fontFamily: 'Outfit', color: T.text }}>{s.val}</div>
              <div style={{ ...Ty.labelSm, color: T.text3 }}>{s.label}</div>
            </button>
          ))}
        </div>

        {/* Admins */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ ...Ty.labelSm, color: T.text3, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Admins</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { name: 'Alex Carter', photo: 'photo-1507003211169-0a1dd7228f2d' },
              { name: 'Sarah Chen', photo: 'photo-1494790108377-be9c29b29330' },
            ].map((a, i) => (
              <button key={i} onClick={() => goTo('public-profile')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 20, padding: '6px 12px', cursor: 'pointer' }}>
                <Avatar src={`https://images.unsplash.com/${a.photo}?w=24&h=24&fit=crop`} size={24} />
                <span style={{ ...Ty.metadata, color: T.text2 }}>{a.name}</span>
              </button>
            ))}
          </div>
        </div>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />
        <div style={{ paddingTop: 16, paddingBottom: 100 }}>
          {tab === 'Rooms' && (
            <>
              {[
                { title: 'AI Weekly Roundtable', host: 'Alex Carter', topic: 'Technology', listeners: '480', live: true },
                { title: 'Startup Funding 101', host: 'Sarah Chen', topic: 'Business', listeners: '320', live: false },
                { title: 'Dev Tools & Tips', host: 'James Park', topic: 'Technology', listeners: '210', live: false },
              ].map((r, i) => <RoomCard key={i} {...r} onClick={() => goTo('room-preview')} />)}
            </>
          )}
          {tab === 'Members' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ ...Ty.metadata, color: T.text3 }}>12,400 members</span>
                <SecondaryBtn label="Manage" small onClick={() => goTo('community-members')} />
              </div>
              {[
                { name: 'Alex Carter', username: '@alexc', photo: 'photo-1507003211169-0a1dd7228f2d', bio: 'Admin', role: 'Admin', online: true },
                { name: 'Sarah Chen', username: '@sarahc', photo: 'photo-1494790108377-be9c29b29330', bio: 'Admin', role: 'Admin', online: true },
                { name: 'James Park', username: '@jpark', photo: 'photo-1472099645785-5658abf4ff4e', bio: 'Moderator', role: 'Mod', online: false },
                { name: 'Maya Johnson', username: '@mayaj', photo: 'photo-1544005313-94ddf0286df2', bio: 'Member', online: false },
              ].map((m, i) => <PersonRow key={i} {...m} photo={`https://images.unsplash.com/${m.photo}?w=48&h=48&fit=crop`} onClick={() => goTo('public-profile')} />)}
            </div>
          )}
          {tab === 'Events' && (
            <>
              <EventCard title="AI Roundtable" host="Alex Carter" date="Today" time="6:00 PM" attendees="432 attending" coverPhoto="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=390&h=100&fit=crop" onClick={() => goTo('event-detail')} />
              <EventCard title="Startup Pitch Night" host="Sarah Chen" date="Fri, Dec 8" time="7:00 PM" attendees="218 attending" onClick={() => goTo('event-detail')} />
            </>
          )}
          {tab === 'About' && (
            <div>
              <Card style={{ marginBottom: 12 }}>
                <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600, marginBottom: 8 }}>About</div>
                <div style={{ ...Ty.body, color: T.text2, lineHeight: 1.7 }}>Tech Innovators is a space for people who believe in the transformative power of technology. We host weekly discussions, panels, and workshops covering AI, startups, software development, and the future of work.</div>
              </Card>
              <Card>
                <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600, marginBottom: 12 }}>Community Rules</div>
                {['Be respectful and constructive', 'No spam or self-promotion without approval', 'Stay on topic', 'Support fellow members'].map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    <span style={{ ...Ty.bodyMed, color: T.primary }}{...{}}>{i + 1}.</span>
                    <span style={{ ...Ty.body, color: T.text2 }}>{r}</span>
                  </div>
                ))}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Community Creation Screen ────────────────────────────────────────────────

export function CommunityCreateScreen({ goTo }: { goTo: GoTo }) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [type, setType] = useState('Public')
  const [cat, setCat] = useState('')
  const TYPES = ['Public', 'Private', 'Invite Only']
  const CATS = ['Technology', 'Music', 'Business', 'Wellness', 'Education', 'Art', 'Sports', 'Gaming']
  const [emoji, setEmoji] = useState('🌐')
  const EMOJIS = ['🌐', '💡', '🎵', '🚀', '🌿', '🎨', '📚', '⚽', '🤖', '💼']

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Create Community" onBack={() => goTo('communities')} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 24px' }}>
        {/* Cover emoji picker */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: 24, background: T.surface2, border: `2px dashed ${T.border2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginBottom: 12 }}>{emoji}</div>
          <HScrollRow>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => setEmoji(e)} style={{ width: 44, height: 44, borderRadius: 12, background: emoji === e ? T.primarySoft : T.surface2, border: `1px solid ${emoji === e ? T.primary : T.border}`, fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{e}</button>
            ))}
          </HScrollRow>
        </div>

        {/* Name */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ ...Ty.labelSm, color: T.text3, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Community Name</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Tech Innovators" style={{ width: '100%', background: T.surface2, border: `1px solid ${T.border2}`, borderRadius: 14, padding: '12px 16px', color: T.text, ...Ty.body, outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Description */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ ...Ty.labelSm, color: T.text3, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Description</div>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="What is your community about?" rows={4} style={{ width: '100%', background: T.surface2, border: `1px solid ${T.border2}`, borderRadius: 14, padding: '12px 16px', color: T.text, ...Ty.body, outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Category */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ ...Ty.labelSm, color: T.text3, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Category</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATS.map(c => <Chip key={c} label={c} active={cat === c} onClick={() => setCat(c)} />)}
          </div>
        </div>

        {/* Type */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ ...Ty.labelSm, color: T.text3, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Visibility</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)} style={{
                flex: 1, padding: '10px 0', borderRadius: 12,
                background: type === t ? T.primarySoft : T.surface2,
                border: `1px solid ${type === t ? T.primary : T.border}`,
                color: type === t ? T.text : T.text2, ...Ty.metadata, fontWeight: 500, cursor: 'pointer',
              }}>{t}</button>
            ))}
          </div>
        </div>

        <PrimaryBtn label="Create Community" onClick={() => goTo('community-detail')} fullWidth disabled={!name || !cat} />
      </div>
    </div>
  )
}

// ─── Community Management ─────────────────────────────────────────────────────

export function CommunityManageScreen({ goTo }: { goTo: GoTo }) {
  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, overflowY: 'auto' }}>
      <PageHeader title="Manage Community" onBack={() => goTo('community-detail')} />
      <div style={{ padding: '0 16px 100px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Members', value: '12.4K', icon: '👥' },
            { label: 'Rooms Today', value: '8', icon: '🎙' },
            { label: 'New Today', value: '+42', icon: '📈' },
            { label: 'Events', value: '3', icon: '📅' },
          ].map(s => (
            <Card key={s.label}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <div>
                  <div style={{ ...Ty.labelSm, color: T.text3 }}>{s.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Outfit', color: T.text }}>{s.value}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ ...Ty.labelSm, color: T.text3, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Settings</div>
        <Card style={{ padding: '0 16px', marginBottom: 20 }}>
          <SettingsRow icon="✏" label="Edit Community Info" onClick={() => {}} />
          <SettingsRow icon="🖼" label="Cover Photo" onClick={() => {}} />
          <SettingsRow icon="📋" label="Community Rules" onClick={() => {}} />
          <SettingsRow icon="🔒" label="Privacy Settings" onClick={() => {}} />
        </Card>

        <div style={{ ...Ty.labelSm, color: T.text3, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Members</div>
        <Card style={{ padding: '0 16px', marginBottom: 20 }}>
          <SettingsRow icon="👥" label="Manage Members" onClick={() => goTo('community-members')} sub="12,400 members" />
          <SettingsRow icon="🛡" label="Moderators" onClick={() => {}} sub="3 moderators" />
          <SettingsRow icon="🚫" label="Banned Members" onClick={() => {}} sub="2 banned" />
          <SettingsRow icon="📨" label="Pending Requests" onClick={() => {}} sub="14 pending" right={<div style={{ background: T.primary, borderRadius: 10, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', ...Ty.labelSm, color: '#fff' }}>14</div>} />
        </Card>

        <div style={{ ...Ty.labelSm, color: T.text3, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Moderation</div>
        <Card style={{ padding: '0 16px', marginBottom: 20 }}>
          <SettingsRow icon="🚩" label="Reported Content" onClick={() => {}} sub="2 reports" />
          <SettingsRow icon="🔔" label="Notification Settings" onClick={() => {}} />
        </Card>

        <button style={{ width: '100%', padding: '13px 0', background: T.liveSoft, border: `1px solid ${T.live}40`, borderRadius: 40, color: T.live, ...Ty.bodyMed, fontWeight: 600, cursor: 'pointer' }}>
          Archive Community
        </button>
      </div>
    </div>
  )
}

// ─── Community Members Screen ─────────────────────────────────────────────────

export function CommunityMembersScreen({ goTo }: { goTo: GoTo }) {
  const [tab, setTab] = useState('All')
  const [q, setQ] = useState('')
  const TABS = ['All', 'Admins', 'Moderators']
  const MEMBERS = [
    { name: 'Alex Carter', username: '@alexc', photo: 'photo-1507003211169-0a1dd7228f2d', role: 'Admin', online: true },
    { name: 'Sarah Chen', username: '@sarahc', photo: 'photo-1494790108377-be9c29b29330', role: 'Admin', online: true },
    { name: 'James Park', username: '@jpark', photo: 'photo-1472099645785-5658abf4ff4e', role: 'Mod', online: false },
    { name: 'Maya Johnson', username: '@mayaj', photo: 'photo-1544005313-94ddf0286df2', role: '', online: false },
    { name: 'Daniel Lee', username: '@daniell', photo: 'photo-1438761681033-6461ffad8d80', role: '', online: true },
    { name: 'Emma Wilson', username: '@emmaw', photo: 'photo-1527980965255-d3b416303d12', role: '', online: true },
    { name: 'Priya Sharma', username: '@priyash', photo: 'photo-1500648767791-00dcc994a43e', role: '', online: false },
  ]

  const filtered = MEMBERS.filter(m => {
    const matchTab = tab === 'All' || (tab === 'Admins' && m.role === 'Admin') || (tab === 'Moderators' && m.role === 'Mod')
    const matchQ = !q || m.name.toLowerCase().includes(q.toLowerCase())
    return matchTab && matchQ
  })

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Members" onBack={() => goTo('community-detail')} right={
        <span style={{ ...Ty.metadata, color: T.text3 }}>12.4K</span>
      } />
      <div style={{ padding: '0 16px 12px' }}>
        <SearchField placeholder="Search members..." value={q} onChange={setQ} />
      </div>
      <div style={{ padding: '0 16px' }}>
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px' }}>
        {filtered.map((m, i) => (
          <PersonRow key={i} name={m.name} username={m.username}
            photo={`https://images.unsplash.com/${m.photo}?w=48&h=48&fit=crop`}
            online={m.online} role={m.role || undefined}
            onClick={() => goTo('public-profile')}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Events Screen ────────────────────────────────────────────────────────────

const EVENTS_DATA = [
  { title: 'AI Roundtable Panel', host: 'Tech Innovators', date: 'Today', time: '6:00 PM', attendees: '432 attending', coverPhoto: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=390&h=100&fit=crop' },
  { title: 'Creator Masterclass', host: 'Sarah Chen', date: 'Tomorrow', time: '3:00 PM', attendees: '218 attending', coverPhoto: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=390&h=100&fit=crop' },
  { title: 'Music Open Mic Night', host: 'Music Creators', date: 'Fri, Dec 8', time: '7:30 PM', attendees: '156 attending' },
  { title: 'Startup Pitch Night', host: 'Startup Builders', date: 'Sat, Dec 9', time: '6:00 PM', attendees: '340 attending' },
  { title: 'Morning Wellness Live', host: 'Daily Wellness', date: 'Sun, Dec 10', time: '8:00 AM', attendees: '89 attending' },
  { title: 'Book Club: Year-End Picks', host: 'Book Club', date: 'Mon, Dec 11', time: '7:00 PM', attendees: '124 attending' },
]

export function EventsScreen({ goTo }: { goTo: GoTo }) {
  const [tab, setTab] = useState('Upcoming')
  const TABS = ['Upcoming', 'Live', 'My Events']

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '52px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...Ty.screenTitle, color: T.text }}>Events</span>
        <button onClick={() => goTo('search')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22 }}>🔍</button>
      </div>
      <div style={{ padding: '0 16px' }}>
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 100px' }}>
        {tab === 'Upcoming' && EVENTS_DATA.map((e, i) => (
          <EventCard key={i} {...e} onClick={() => goTo('event-detail')} />
        ))}
        {tab === 'Live' && (
          <>
            <div style={{ marginBottom: 12 }}>
              <LiveBadge count="2 live now" />
            </div>
            {EVENTS_DATA.slice(0, 1).map((e, i) => <EventCard key={i} {...e} onClick={() => goTo('event-detail')} />)}
            <EmptyState icon="📅" title="More events starting soon" message="Check back later for more live events." />
          </>
        )}
        {tab === 'My Events' && (
          <EmptyState icon="📅" title="No events yet" message="RSVP to events to see them here." action="Browse Events" onAction={() => setTab('Upcoming')} />
        )}
      </div>
    </div>
  )
}

// ─── Event Detail Screen ──────────────────────────────────────────────────────

export function EventDetailScreen({ goTo }: { goTo: GoTo }) {
  const [rsvp, setRsvp] = useState(false)

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, overflowY: 'auto' }}>
      {/* Cover */}
      <div style={{ position: 'relative', height: 200 }}>
        <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=390&h=200&fit=crop&auto=format" alt="Event" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(8,10,24,0.95))' }} />
        <button onClick={() => goTo('events')} style={{ position: 'absolute', top: 52, left: 14, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', fontSize: 18 }}>‹</button>
        <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
          <div style={{ background: T.premiumSoft, border: `1px solid ${T.premium}40`, borderRadius: 20, padding: '3px 12px', display: 'inline-block', ...Ty.labelSm, color: T.premium, marginBottom: 8 }}>Upcoming Event</div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', color: T.text, lineHeight: 1.2 }}>AI Roundtable Panel</div>
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>
        {/* Key info */}
        <Card style={{ marginBottom: 16 }}>
          {[
            { icon: '📅', label: 'Date & Time', val: 'Today, December 7 • 6:00 PM' },
            { icon: '🎙', label: 'Host', val: 'Tech Innovators Community' },
            { icon: '👥', label: 'Attendees', val: '432 attending' },
            { icon: '🔓', label: 'Access', val: 'Public — Anyone can join' },
          ].map((info, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 3 ? `1px solid ${T.border}` : 'none' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{info.icon}</span>
              <div>
                <div style={{ ...Ty.labelSm, color: T.text3 }}>{info.label}</div>
                <div style={{ ...Ty.bodyMed, color: T.text, marginTop: 2 }}>{info.val}</div>
              </div>
            </div>
          ))}
        </Card>

        {/* Description */}
        <div style={{ marginBottom: 20 }}>
          <SectionHeader title="About This Event" />
          <div style={{ ...Ty.body, color: T.text2, lineHeight: 1.7 }}>
            Join us for an engaging panel discussion on artificial intelligence — from its current capabilities to the opportunities and challenges it presents for society, business, and creativity. Top voices in tech will share their perspectives.
          </div>
        </div>

        {/* Speakers */}
        <div style={{ marginBottom: 20 }}>
          <SectionHeader title="Speakers" />
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { name: 'Alex Carter', photo: 'photo-1507003211169-0a1dd7228f2d' },
              { name: 'Sarah Chen', photo: 'photo-1494790108377-be9c29b29330' },
              { name: 'James Park', photo: 'photo-1472099645785-5658abf4ff4e' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <Avatar src={`https://images.unsplash.com/${s.photo}?w=52&h=52&fit=crop`} size={52} ring />
                <span style={{ ...Ty.labelSm, color: T.text2, textAlign: 'center', width: 60 }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RSVP */}
        <div style={{ display: 'flex', gap: 12, paddingBottom: 100 }}>
          <PrimaryBtn label={rsvp ? '✓ Going' : 'RSVP — Going'} onClick={() => setRsvp(r => !r)} fullWidth />
          <button style={{ width: 48, height: 48, borderRadius: '50%', background: T.surface2, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 20, flexShrink: 0 }}>↗</button>
        </div>
      </div>
    </div>
  )
}

// ─── Conversation Screen ──────────────────────────────────────────────────────

export function ConversationScreen({ goTo }: { goTo: GoTo }) {
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState([
    { text: 'Hey! Great room today 🎙', fromMe: false, time: '12:30' },
    { text: 'Thanks! It was a really engaging conversation.', fromMe: true, time: '12:31' },
    { text: 'That was an amazing room! The AI discussion was so insightful.', fromMe: false, time: '12:45' },
    { text: 'Totally! We should do a follow-up session next week.', fromMe: true, time: '12:46' },
    { text: 'Yes! I\'ll let the community know. When are you free?', fromMe: false, time: '12:47' },
    { text: 'Thursday evening works for me — around 7pm?', fromMe: true, time: '12:48' },
    { text: 'Perfect! I\'ll set it up 🙌', fromMe: false, time: '12:50' },
  ])

  const send = () => {
    if (!msg.trim()) return
    setMessages(m => [...m, { text: msg, fromMe: true, time: 'Now' }])
    setMsg('')
  }

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '52px 16px 12px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.border}` }}>
        <button onClick={() => goTo('messages')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text3, fontSize: 20 }}>‹</button>
        <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop" size={40} online />
        <div style={{ flex: 1 }}>
          <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600 }}>Sarah Chen</div>
          <div style={{ ...Ty.labelSm, color: T.success }}>Active now</div>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>🎙</button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>⋯</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
        <div style={{ textAlign: 'center', ...Ty.labelSm, color: T.text4, marginBottom: 16 }}>Today 12:30 PM</div>
        {messages.map((m, i) => (
          <MessageBubble key={i} text={m.text} fromMe={m.fromMe} time={m.time}
            photo={m.fromMe ? undefined : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=28&h=28&fit=crop'}
          />
        ))}
      </div>

      {/* Composer */}
      <div style={{ padding: '12px 16px 24px', background: T.surface, borderTop: `1px solid ${T.border}`, display: 'flex', gap: 10, alignItems: 'flex-end' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: T.text3, flexShrink: 0 }}>📎</button>
        <div style={{ flex: 1, background: T.surface2, borderRadius: 20, padding: '10px 14px', border: `1px solid ${T.border2}` }}>
          <input
            value={msg} onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Write a message..." style={{ width: '100%', background: 'none', border: 'none', outline: 'none', color: T.text, ...Ty.body }}
          />
        </div>
        <button onClick={send} style={{ width: 44, height: 44, borderRadius: '50%', background: msg ? T.primary : T.surface3, border: 'none', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>↑</button>
      </div>
    </div>
  )
}

// ─── Notifications Screen ─────────────────────────────────────────────────────

export function NotificationsScreen({ goTo }: { goTo: GoTo }) {
  const [tab, setTab] = useState('All')
  const TABS = ['All', 'Rooms', 'Social', 'Economy']

  const NOTIFS = [
    { icon: '👤', title: 'James Park started following you', body: 'You now have 12,401 followers.', time: '2m ago', unread: true, photo: 'photo-1472099645785-5658abf4ff4e' },
    { icon: '🎙', title: 'Tech & Innovation is going live!', body: 'Alex Carter just started a room. Join now.', time: '8m ago', unread: true },
    { icon: '🎁', title: 'You received a gift!', body: 'Sarah Chen sent you 💎 Diamond × 3', time: '24m ago', unread: true, photo: 'photo-1494790108377-be9c29b29330' },
    { icon: '✋', title: 'Speaker request accepted', body: 'You\'re now on stage in AI & The Future.', time: '1h ago', unread: false },
    { icon: '💬', title: 'Maya Johnson replied to your message', body: '"Yes! Totally agree with your take on that."', time: '2h ago', unread: false, photo: 'photo-1544005313-94ddf0286df2' },
    { icon: '📅', title: 'Event reminder', body: 'AI Roundtable Panel starts in 30 minutes.', time: '4h ago', unread: false },
    { icon: '⭐', title: 'You leveled up!', body: 'Congratulations! You\'re now Level 12. Keep going!', time: 'Yesterday', unread: false },
    { icon: '💼', title: 'New community invitation', body: 'You\'ve been invited to join Startup Builders.', time: 'Yesterday', unread: false },
    { icon: '🔔', title: 'Weekly summary', body: 'You had 8 room sessions and gained 342 followers this week.', time: '2 days ago', unread: false },
  ]

  const filtered = tab === 'All' ? NOTIFS
    : tab === 'Rooms' ? NOTIFS.filter(n => n.icon === '🎙' || n.icon === '✋' || n.icon === '📅')
    : tab === 'Social' ? NOTIFS.filter(n => n.icon === '👤' || n.icon === '💬' || n.icon === '💼')
    : NOTIFS.filter(n => n.icon === '🎁' || n.icon === '⭐')

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '52px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...Ty.screenTitle, color: T.text }}>Notifications</span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', ...Ty.label, color: T.primary }}>Mark all read</button>
      </div>
      <div style={{ padding: '0 16px' }}>
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 100px' }}>
        {filtered.length === 0
          ? <EmptyState icon="🔔" title="No notifications" message="You're all caught up!" />
          : filtered.map((n, i) => (
            <NotificationRow key={i} {...n}
              photo={n.photo ? `https://images.unsplash.com/${n.photo}?w=44&h=44&fit=crop` : undefined}
            />
          ))
        }
      </div>
    </div>
  )
}
