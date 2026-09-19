// Phase C — Live Audio Depth
// Room Preview · Live Room (full) · Stage · Speakers · Listeners
// Speaker Request · Speaker Invitation · Reactions · Gifts · Chat
// All connection states · Room Paused · Room Ended
// Invitation: Pending · Accepted · Declined

import { useState, useEffect } from 'react'
import {
  D, T, Ty, LiveBadge, Avatar, AudioWaveform, Chip, PrimaryBtn, SecondaryBtn, IconBtn,
  Card, SectionHeader, PageHeader, TabBar, EmptyState, GiftTile, MessageBubble,
  ConnectionBanner, HScrollRow,
} from './ds'

type GoTo = (screen: string) => void

// ─── Shared stage data ────────────────────────────────────────────────────────

const SPEAKERS = [
  { name: 'Alex Carter', role: 'Host', photo: 'photo-1507003211169-0a1dd7228f2d', speaking: true, muted: false },
  { name: 'Sarah', role: 'Co-host', photo: 'photo-1494790108377-be9c29b29330', speaking: false, muted: false },
  { name: 'James', role: 'Speaker', photo: 'photo-1472099645785-5658abf4ff4e', speaking: false, muted: true },
  { name: 'Priya', role: 'Speaker', photo: 'photo-1500648767791-00dcc994a43e', speaking: false, muted: false },
]

const LISTENERS = [
  { name: 'Maya', photo: 'photo-1544005313-94ddf0286df2' },
  { name: 'Daniel', photo: 'photo-1438761681033-6461ffad8d80' },
  { name: 'Emma', photo: 'photo-1527980965255-d3b416303d12' },
  { name: 'Marcus', photo: 'photo-1519085360753-af0119f7cbe7' },
  { name: 'Lily', photo: 'photo-1580489944761-15a19d654956' },
  { name: 'Ryan', photo: 'photo-1599566150163-29194dcaad36' },
]

// ─── Room Preview Screen ──────────────────────────────────────────────────────

export function RoomPreviewScreen({ goTo }: { goTo: GoTo }) {
  const [saved, setSaved] = useState(false)

  return (
    <div style={{ width: '100%', height: '100%', background: D.bg, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ padding: '52px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => goTo('home')} style={{ width: 36, height: 36, borderRadius: '50%', background: D.surface2, border: `1px solid ${D.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: D.text, fontSize: 18 }}>‹</button>
        <LiveBadge count="2.4K" />
        <button style={{ background: 'none', border: 'none', color: D.text3, fontSize: 22, cursor: 'pointer' }}>⋯</button>
      </div>

      {/* Room hero */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px 20px' }}>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=90&h=90&fit=crop"
            size={90} speaking ring
          />
          <div style={{ position: 'absolute', bottom: 2, right: 2, background: D.primary, borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${D.bg}`, fontSize: 14 }}>🎤</div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'Outfit', color: D.text, textAlign: 'center', marginBottom: 4 }}>Alex Carter</div>
        <div style={{ ...Ty.bodySm, color: D.text3, marginBottom: 14 }}>Tech Enthusiast • Founder</div>
        <AudioWaveform active bars={9} height={36} />
      </div>

      {/* Room info */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Outfit', color: D.text, lineHeight: 1.3, marginBottom: 10 }}>
            The Future of AI: Opportunities and Challenges
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Chip dark label="Technology" active />
            <Chip dark label="AI" />
            <Chip dark label="Innovation" />
          </div>
        </div>
        <div style={{ ...Ty.body, color: D.text2, lineHeight: 1.6, textAlign: 'center', marginBottom: 16 }}>
          Join us for an engaging discussion on how AI is shaping our world and what opportunities lie ahead.
        </div>

        {/* Room meta */}
        <Card dark style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 16px', marginBottom: 20 }}>
          {[{ icon: '🔓', label: 'Public' }, { icon: '👥', label: '2.4K' }, { icon: '⏱', label: '48 min' }].map(m => (
            <div key={m.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 20 }}>{m.icon}</span>
              <span style={{ ...Ty.metadata, color: D.text3 }}>{m.label}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Speakers on stage */}
      <div style={{ padding: '0 16px 20px' }}>
        <SectionHeader title="On Stage" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {SPEAKERS.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ position: 'relative' }}>
                <Avatar src={`https://images.unsplash.com/${s.photo}?w=52&h=52&fit=crop`} size={52} speaking={s.speaking} />
                {s.muted && <div style={{ position: 'absolute', bottom: 0, right: 0, background: D.live, borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${D.bg}`, fontSize: 9 }}>🔇</div>}
              </div>
              <div style={{ ...Ty.labelSm, color: D.text2, textAlign: 'center' }}>{s.name}</div>
              <div style={{ ...Ty.labelSm, color: D.text3, fontSize: 10, textAlign: 'center' }}>{s.role}</div>
            </div>
          ))}
        </div>

        {/* Listeners */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex' }}>
            {LISTENERS.slice(0, 5).map((l, i) => (
              <img key={i} src={`https://images.unsplash.com/${l.photo}?w=24&h=24&fit=crop`} style={{ width: 24, height: 24, borderRadius: '50%', border: `1.5px solid ${D.bg}`, marginLeft: i > 0 ? -8 : 0, zIndex: 5 - i }} alt="" />
            ))}
          </div>
          <span style={{ ...Ty.metadata, color: D.text3 }}>and 2,394 more listening</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: '0 16px 32px', marginTop: 'auto' }}>
        <PrimaryBtn dark label="Join Room" onClick={() => goTo('live-room')} fullWidth />
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}>
          {[
            { icon: saved ? '🔖' : '🔖', label: saved ? 'Saved' : 'Save', action: () => setSaved(s => !s) },
            { icon: '↗', label: 'Share', action: () => {} },
            { icon: '🚩', label: 'Report', action: () => {} },
          ].map(a => (
            <button key={a.label} onClick={a.action} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: saved && a.label === 'Save' ? D.primarySoft : D.surface2, border: `1px solid ${saved && a.label === 'Save' ? D.primary : D.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{a.icon}</div>
              <span style={{ ...Ty.metadata, color: D.text3 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Live Room (full experience) ──────────────────────────────────────────────

export function LiveRoomScreen({ goTo }: { goTo: GoTo }) {
  const [muted, setMuted] = useState(false)
  const [handRaised, setHandRaised] = useState(false)
  const [panel, setPanel] = useState<'none' | 'chat' | 'reactions' | 'gifts' | 'speakers' | 'listeners'>('none')
  const [chatMessages, setChatMessages] = useState([
    { name: 'Maya', text: 'This is such an interesting topic!', fromMe: false, photo: 'photo-1544005313-94ddf0286df2', time: '12:32' },
    { name: 'Daniel', text: 'Great points about AI safety! 👏', fromMe: false, photo: 'photo-1438761681033-6461ffad8d80', time: '12:33' },
    { name: 'Priya', text: 'Love this discussion! 💡', fromMe: false, photo: 'photo-1500648767791-00dcc994a43e', time: '12:34' },
    { name: 'You', text: 'What do you think about AGI timelines?', fromMe: true, time: '12:35' },
    { name: 'Emma', text: 'Really important question!', fromMe: false, photo: 'photo-1527980965255-d3b416303d12', time: '12:35' },
  ])
  const [chatInput, setChatInput] = useState('')
  const [liveReactions, setLiveReactions] = useState<string[]>([])

  const sendReaction = (emoji: string) => {
    setLiveReactions(r => [...r.slice(-6), emoji])
    setTimeout(() => setLiveReactions(r => r.slice(1)), 2000)
  }

  const sendChat = () => {
    if (!chatInput.trim()) return
    setChatMessages(m => [...m, { name: 'You', text: chatInput, fromMe: true, time: 'Now', photo: undefined as any }])
    setChatInput('')
  }

  const REACTIONS_EMOJI = ['❤️', '🔥', '👏', '😮', '💡', '🎉', '💯', '✨']
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

  return (
    <div style={{ width: '100%', height: '100%', background: `radial-gradient(ellipse at 50% 20%, #1A0A5E 0%, ${D.bg} 65%)`, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Floating reactions */}
      <div style={{ position: 'absolute', right: 16, bottom: 120, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 50, pointerEvents: 'none' }}>
        {liveReactions.map((r, i) => (
          <div key={i} className="vc-slide-up" style={{ fontSize: 28, animation: 'slide-up 0.3s ease-out, float 2s ease-in-out infinite' }}>{r}</div>
        ))}
      </div>

      {/* Top bar */}
      <div style={{ padding: '52px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => goTo('home')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: 16, color: D.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...Ty.bodyMed, color: D.text, fontFamily: 'Outfit', fontWeight: 600 }}>Tech & Innovation</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 2 }}>
            <LiveBadge />
            <span style={{ ...Ty.metadata, color: D.text3 }}>2.4K listening</span>
          </div>
        </div>
        <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: 16, color: D.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⋯</button>
      </div>

      {/* Waveform */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
        <AudioWaveform active bars={14} height={36} />
      </div>

      {/* Stage */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Main speaker hero */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 16 }}>
          <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" size={80} speaking ring />
          <div style={{ ...Ty.sectionTitle, color: D.text, marginTop: 8 }}>Alex Carter</div>
          <div style={{ ...Ty.metadata, color: D.accent, marginTop: 2 }}>🎙 Speaking</div>
        </div>

        {/* Co-speakers */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, paddingBottom: 12 }}>
          {SPEAKERS.slice(1).map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ position: 'relative' }}>
                <Avatar src={`https://images.unsplash.com/${s.photo}?w=48&h=48&fit=crop`} size={48} />
                {s.muted && <div style={{ position: 'absolute', bottom: 0, right: 0, background: D.live, borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${D.bg}`, fontSize: 8 }}>🔇</div>}
              </div>
              <div style={{ ...Ty.labelSm, color: D.text2, fontSize: 10 }}>{s.name}</div>
            </div>
          ))}
        </div>

        {/* Chat feed (when panel = none) */}
        {panel === 'none' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
            {chatMessages.slice(-4).map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                {!m.fromMe && m.photo && <img src={`https://images.unsplash.com/${m.photo}?w=24&h=24&fit=crop`} style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0 }} alt="" />}
                {m.fromMe && <div style={{ width: 24, flexShrink: 0 }} />}
                <div style={{ background: m.fromMe ? D.primarySoft : 'rgba(255,255,255,0.07)', borderRadius: 12, padding: '6px 12px', border: `1px solid ${m.fromMe ? D.primary + '33' : D.border}` }}>
                  {!m.fromMe && <span style={{ ...Ty.labelSm, color: D.primary, marginRight: 6 }}>{m.name}</span>}
                  <span style={{ ...Ty.bodySm, color: D.text2 }}>{m.text}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chat panel */}
        {panel === 'chat' && (
          <div style={{ flex: 1, background: `${D.surface}ee`, backdropFilter: 'blur(12px)', borderTopLeftRadius: 24, borderTopRightRadius: 24, border: `1px solid ${D.border}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 16px 8px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ ...Ty.bodyMed, color: D.text, fontWeight: 600 }}>Chat</span>
              <button onClick={() => setPanel('none')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: D.text3, fontSize: 18 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
              {chatMessages.map((m, i) => (
                <MessageBubble dark key={i} text={m.text} fromMe={m.fromMe} time={m.time}
                  photo={m.photo ? `https://images.unsplash.com/${m.photo}?w=28&h=28&fit=crop` : undefined}
                />
              ))}
            </div>
            <div style={{ padding: '8px 12px 16px', display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, background: D.surface2, borderRadius: 20, padding: '9px 14px', border: `1px solid ${D.border2}` }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} placeholder="Say something..." style={{ width: '100%', background: 'none', border: 'none', outline: 'none', color: D.text, ...Ty.body }} />
              </div>
              <button onClick={sendChat} style={{ width: 40, height: 40, borderRadius: '50%', background: chatInput ? D.primary : D.surface3, border: 'none', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>↑</button>
            </div>
          </div>
        )}

        {/* Reactions panel */}
        {panel === 'reactions' && (
          <div style={{ background: `${D.surface}ee`, backdropFilter: 'blur(12px)', borderTopLeftRadius: 24, borderTopRightRadius: 24, border: `1px solid ${D.border}`, padding: '16px 16px 8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ ...Ty.bodyMed, color: D.text, fontWeight: 600 }}>React</span>
              <button onClick={() => setPanel('none')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: D.text3, fontSize: 18 }}>✕</button>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', paddingBottom: 8 }}>
              {REACTIONS_EMOJI.map(e => (
                <button key={e} onClick={() => { sendReaction(e); setPanel('none') }} style={{ width: 52, height: 52, borderRadius: 16, background: D.surface2, border: `1px solid ${D.border}`, fontSize: 26, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.1s' }}>{e}</button>
              ))}
            </div>
          </div>
        )}

        {/* Gifts panel */}
        {panel === 'gifts' && (
          <div style={{ background: `${D.surface}ee`, backdropFilter: 'blur(12px)', borderTopLeftRadius: 24, borderTopRightRadius: 24, border: `1px solid ${D.border}`, padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ ...Ty.bodyMed, color: D.text, fontWeight: 600 }}>Send a Gift</span>
              <button onClick={() => setPanel('none')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: D.text3, fontSize: 18 }}>✕</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <span style={{ fontSize: 14 }}>🪙</span>
              <span style={{ ...Ty.bodyMed, color: D.premium }}>2,480</span>
              <span style={{ ...Ty.metadata, color: D.text3 }}>balance</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {GIFTS_DATA.map((g, i) => <GiftTile dark key={i} {...g} onSend={() => { sendReaction(g.emoji); setPanel('none') }} />)}
            </div>
          </div>
        )}

        {/* Speakers panel */}
        {panel === 'speakers' && (
          <div style={{ background: `${D.surface}ee`, backdropFilter: 'blur(12px)', borderTopLeftRadius: 24, borderTopRightRadius: 24, border: `1px solid ${D.border}`, padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ ...Ty.bodyMed, color: D.text, fontWeight: 600 }}>Speakers ({SPEAKERS.length})</span>
              <button onClick={() => setPanel('none')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: D.text3, fontSize: 18 }}>✕</button>
            </div>
            {SPEAKERS.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < SPEAKERS.length - 1 ? `1px solid ${D.border}` : 'none' }}>
                <Avatar src={`https://images.unsplash.com/${s.photo}?w=44&h=44&fit=crop`} size={44} speaking={s.speaking} />
                <div style={{ flex: 1 }}>
                  <div style={{ ...Ty.bodyMed, color: D.text }}>{s.name}</div>
                  <div style={{ ...Ty.metadata, color: s.speaking ? D.accent : D.text3, marginTop: 2 }}>{s.speaking ? '🎙 Speaking' : s.muted ? '🔇 Muted' : s.role}</div>
                </div>
                {i === 0 && <span style={{ ...Ty.labelSm, color: D.primary, background: D.primarySoft, borderRadius: 10, padding: '2px 8px' }}>Host</span>}
              </div>
            ))}
          </div>
        )}

        {/* Listeners panel */}
        {panel === 'listeners' && (
          <div style={{ background: `${D.surface}ee`, backdropFilter: 'blur(12px)', borderTopLeftRadius: 24, borderTopRightRadius: 24, border: `1px solid ${D.border}`, padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ ...Ty.bodyMed, color: D.text, fontWeight: 600 }}>Listeners (2,394)</span>
              <button onClick={() => setPanel('none')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: D.text3, fontSize: 18 }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
              {[...LISTENERS, ...LISTENERS].map((l, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <Avatar src={`https://images.unsplash.com/${l.photo}?w=44&h=44&fit=crop`} size={44} />
                  <span style={{ ...Ty.labelSm, color: D.text3, textAlign: 'center', fontSize: 9 }}>{l.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div style={{ padding: '10px 16px 24px', background: `${D.surface}cc`, backdropFilter: 'blur(16px)', borderTop: `1px solid ${D.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {[
            { icon: '💬', label: 'Chat', id: 'chat' as const },
            { icon: muted ? '🔇' : '🎙', label: muted ? 'Unmute' : 'Raise', id: 'raise' as const },
            { icon: '✋', label: handRaised ? 'Lower' : 'Hand', id: 'hand' as const },
            { icon: '⚡', label: 'React', id: 'reactions' as const },
            { icon: '🎁', label: 'Gift', id: 'gifts' as const },
          ].map(a => (
            <button key={a.id} onClick={() => {
              if (a.id === 'raise') setMuted(m => !m)
              else if (a.id === 'hand') setHandRaised(h => !h)
              // 'speakers' not in action ids — handled via footer buttons below
              else if (a.id === 'reactions') setPanel(p => p === 'reactions' ? 'none' : 'reactions')
              else if (a.id === 'gifts') setPanel(p => p === 'gifts' ? 'none' : 'gifts')
              else if (a.id === 'chat') setPanel(p => p === 'chat' ? 'none' : 'chat')
            }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%',
                background: (a.id === 'chat' && panel === 'chat') || (a.id === 'reactions' && panel === 'reactions') || (a.id === 'gifts' && panel === 'gifts') || (a.id === 'hand' && handRaised) ? D.primary : D.surface2,
                border: `1px solid ${D.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>{a.icon}</div>
              <span style={{ ...Ty.labelSm, color: D.text3, fontSize: 9 }}>{a.label}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 10 }}>
          <button onClick={() => setPanel(p => p === 'speakers' ? 'none' : 'speakers')} style={{ background: 'none', border: 'none', cursor: 'pointer', ...Ty.metadata, color: D.text3 }}>
            👥 {SPEAKERS.length} speakers
          </button>
          <button onClick={() => setPanel(p => p === 'listeners' ? 'none' : 'listeners')} style={{ background: 'none', border: 'none', cursor: 'pointer', ...Ty.metadata, color: D.text3 }}>
            👂 2.4K listeners
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Speaker Request Screen ───────────────────────────────────────────────────

export function SpeakerRequestScreen({ goTo }: { goTo: GoTo }) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'accepted' | 'declined'>('idle')

  return (
    <div style={{ width: '100%', height: '100%', background: D.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Dimmed live room behind */}
      <div style={{ flex: 1, opacity: 0.3, background: `radial-gradient(ellipse at 50% 20%, #1A0A5E 0%, ${D.bg} 65%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 80 }}>
        <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" size={80} speaking />
        <div style={{ ...Ty.sectionTitle, color: D.text, marginTop: 12 }}>Alex Carter</div>
        <div style={{ ...Ty.metadata, color: D.accent, marginTop: 4 }}>Speaking</div>
      </div>

      {/* Sheet */}
      <div style={{ background: D.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, border: `1px solid ${D.border}`, padding: '20px 24px 32px' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: D.border2, margin: '0 auto 20px' }} />

        {status === 'idle' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎙</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Outfit', color: D.text, marginBottom: 8 }}>Request to Speak</div>
              <div style={{ ...Ty.body, color: D.text2 }}>The host will receive your request. Once approved, you'll be moved to the stage.</div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <SecondaryBtn dark label="Cancel" onClick={() => goTo('live-room')} />
              <PrimaryBtn dark label="Send Request ✋" onClick={() => setStatus('pending')} fullWidth />
            </div>
          </>
        )}

        {status === 'pending' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12, animation: 'float 2s ease-in-out infinite' }}>✋</div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Outfit', color: D.text, marginBottom: 8 }}>Request Sent</div>
            <div style={{ ...Ty.body, color: D.text2, marginBottom: 20 }}>Waiting for the host to approve your request...</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
              {[0, 1, 2].map(i => (
                <div key={i} className="vc-live-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: D.primary, animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
            <SecondaryBtn dark label="Cancel Request" onClick={() => { setStatus('idle'); goTo('live-room') }} />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Speaker Invitation Screen ────────────────────────────────────────────────

export function SpeakerInvitationScreen({ goTo }: { goTo: GoTo }) {
  const [responded, setResponded] = useState<'none' | 'accepted' | 'declined'>('none')

  return (
    <div style={{ width: '100%', height: '100%', background: D.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ flex: 1, opacity: 0.3, background: `radial-gradient(ellipse at 50% 20%, #1A0A5E 0%, ${D.bg} 65%)` }} />

      <div style={{ background: D.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, border: `1px solid ${D.border}`, padding: '20px 24px 32px' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: D.border2, margin: '0 auto 20px' }} />

        {responded === 'none' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=52&h=52&fit=crop" size={52} ring />
              <div>
                <div style={{ ...Ty.label, color: D.primary, marginBottom: 4 }}>🎙 Stage Invitation</div>
                <div style={{ ...Ty.bodyMed, color: D.text, fontWeight: 600 }}>Alex Carter invited you to speak!</div>
                <div style={{ ...Ty.metadata, color: D.text3, marginTop: 2 }}>Host of Tech & Innovation</div>
              </div>
            </div>
            <div style={{ ...Ty.body, color: D.text2, marginBottom: 24 }}>
              You've been invited to join the stage. You can speak and interact with the room once you accept.
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <SecondaryBtn dark label="Decline" onClick={() => setResponded('declined')} />
              <PrimaryBtn dark label="Accept — Join Stage 🎙" onClick={() => setResponded('accepted')} fullWidth />
            </div>
          </>
        )}

        {responded === 'accepted' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎙</div>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Outfit', color: D.text, marginBottom: 8 }}>Welcome to the stage!</div>
            <div style={{ ...Ty.body, color: D.text2, marginBottom: 20 }}>You're now a speaker. The audience can hear you when you unmute.</div>
            <PrimaryBtn dark label="Go to Live Room" onClick={() => goTo('live-room')} fullWidth />
          </div>
        )}

        {responded === 'declined' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>👋</div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Outfit', color: D.text, marginBottom: 8 }}>Invitation Declined</div>
            <div style={{ ...Ty.body, color: D.text2, marginBottom: 20 }}>No worries! You'll remain as a listener.</div>
            <SecondaryBtn dark label="Back to Room" onClick={() => goTo('live-room')} />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Live Connection State Screens ────────────────────────────────────────────

function LiveStateScreen({ icon, title, body, children, goTo }: {
  icon: string; title: string; body: string; children?: React.ReactNode; goTo: GoTo
}) {
  return (
    <div style={{ width: '100%', height: '100%', background: `radial-gradient(ellipse at 50% 30%, #1A0A5E 0%, ${D.bg} 70%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
      <div style={{ fontSize: 56, marginBottom: 24 }}>{icon}</div>
      <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'Outfit', color: D.text, marginBottom: 12, lineHeight: 1.2 }}>{title}</div>
      <div style={{ ...Ty.body, color: D.text2, lineHeight: 1.7, maxWidth: 280, marginBottom: 32 }}>{body}</div>
      {children}
    </div>
  )
}

export function LivePreparingScreen({ goTo }: { goTo: GoTo }) {
  return (
    <LiveStateScreen icon="⏳" title="Getting your room ready..." body="We're setting up your audio connection. This will only take a moment." goTo={goTo}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="vc-live-dot" style={{ width: 10, height: 10, borderRadius: '50%', background: D.accent, animationDelay: `${i * 0.3}s` }} />
        ))}
      </div>
      <AudioWaveform active bars={8} height={40} color={D.accent} />
    </LiveStateScreen>
  )
}

export function LiveConnectingScreen({ goTo }: { goTo: GoTo }) {
  return (
    <LiveStateScreen icon="📡" title="Joining the conversation..." body="Connecting you to the live room. Almost there!" goTo={goTo}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', border: `3px solid ${D.primarySoft}`, borderTop: `3px solid ${D.primary}`, animation: 'spin 1s linear infinite', marginBottom: 24 }} />
      <SecondaryBtn dark label="Cancel" onClick={() => goTo('home')} />
    </LiveStateScreen>
  )
}

export function LiveReconnectingScreen({ goTo }: { goTo: GoTo }) {
  return (
    <LiveStateScreen icon="🔄" title="Connection interrupted" body="Your audio connection dropped. We're automatically reconnecting you..." goTo={goTo}>
      <ConnectionBanner dark state="reconnecting" />
      <div style={{ marginTop: 20 }}>
        <SecondaryBtn dark label="Leave room" onClick={() => goTo('home')} />
      </div>
    </LiveStateScreen>
  )
}

export function LiveInterruptedScreen({ goTo }: { goTo: GoTo }) {
  return (
    <LiveStateScreen icon="⚡" title="Audio interrupted" body="Something interrupted your audio connection. Check your microphone and network, then try again." goTo={goTo}>
      <div style={{ display: 'flex', gap: 12 }}>
        <SecondaryBtn dark label="Leave" onClick={() => goTo('home')} />
        <PrimaryBtn dark label="Try Again" onClick={() => goTo('live-room')} />
      </div>
    </LiveStateScreen>
  )
}

export function LiveDisconnectedScreen({ goTo }: { goTo: GoTo }) {
  return (
    <LiveStateScreen icon="🔌" title="You've been disconnected" body="You were disconnected from the room. This may be due to a network issue." goTo={goTo}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
        <PrimaryBtn dark label="Rejoin Room" onClick={() => goTo('live-connecting')} fullWidth />
        <SecondaryBtn dark label="Back to Home" onClick={() => goTo('home')} />
      </div>
    </LiveStateScreen>
  )
}

// ─── Room Paused Screen ───────────────────────────────────────────────────────

export function RoomPausedScreen({ goTo }: { goTo: GoTo }) {
  return (
    <div style={{ width: '100%', height: '100%', background: `radial-gradient(ellipse at 50% 30%, #1A0A5E 0%, ${D.bg} 70%)`, display: 'flex', flexDirection: 'column' }}>
      {/* Dimmed stage */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
        <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" size={80} />
        <div style={{ ...Ty.sectionTitle, color: D.text, marginTop: 12 }}>Alex Carter</div>
      </div>

      {/* Pause overlay */}
      <div style={{ background: `${D.surface}f0`, backdropFilter: 'blur(20px)', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: '28px 24px 40px', textAlign: 'center', border: `1px solid ${D.border}` }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: D.surface3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' }}>⏸</div>
        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Outfit', color: D.text, marginBottom: 8 }}>Room Paused</div>
        <div style={{ ...Ty.body, color: D.text2, marginBottom: 24 }}>The host has temporarily paused this room. It will resume shortly.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SecondaryBtn dark label="Explore other rooms" onClick={() => goTo('explore')} />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', ...Ty.metadata, color: D.text3 }}>Leave room</button>
        </div>
      </div>
    </div>
  )
}

// ─── Room Ended Screen ────────────────────────────────────────────────────────

export function RoomEndedScreen({ goTo }: { goTo: GoTo }) {
  return (
    <div style={{ width: '100%', height: '100%', background: D.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: D.surface2, border: `2px solid ${D.border2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 24 }}>🎙</div>
      <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'Outfit', color: D.text, marginBottom: 8 }}>Room Ended</div>
      <div style={{ ...Ty.body, color: D.text2, lineHeight: 1.7, maxWidth: 280, marginBottom: 12 }}>
        This room has ended. Thanks for joining the conversation!
      </div>
      <div style={{ ...Ty.bodyMed, color: D.text3, marginBottom: 24 }}>48 min • 2,438 listeners</div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
        {[{ label: 'Listened', val: '48 min' }, { label: 'Reactions', val: '342' }, { label: 'Gifts', val: '🎁 × 28' }].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Outfit', color: D.text }}>{s.val}</div>
            <div style={{ ...Ty.labelSm, color: D.text3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
        <PrimaryBtn dark label="Explore more rooms" onClick={() => goTo('explore')} fullWidth />
        <SecondaryBtn dark label="View replay (when available)" onClick={() => goTo('home')} />
      </div>
    </div>
  )
}
