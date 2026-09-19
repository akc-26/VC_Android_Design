// VoiceCloud Design System 2.0
// Single source of truth for all tokens, components, and patterns.

import type { CSSProperties, ReactNode } from 'react'

// ─── Design Tokens ────────────────────────────────────────────────────────────

export const T = {
  // Approved VoiceCloud visual system — light consumer / creator surfaces.
  bg:            '#F7F8FC',
  surface:       '#FFFFFF',
  surface2:      '#F2F4FA',
  surface3:      '#E9ECF5',
  surface4:      '#DDE2EF',
  primary:       '#6C4DFF',
  primaryStrong: '#8B72FF',
  primarySoft:   'rgba(108,77,255,0.10)',
  accent:        '#22D3EE',
  accentSoft:    'rgba(34,211,238,0.10)',
  premium:       '#F59E0B',
  premiumSoft:   'rgba(245,158,11,0.12)',
  live:          '#EF4444',
  liveSoft:      'rgba(239,68,68,0.10)',
  success:       '#10B981',
  successSoft:   'rgba(16,185,129,0.10)',
  warning:       '#F97316',
  text:          '#0F172A',
  text2:         '#475569',
  text3:         '#64748B',
  text4:         '#94A3B8',
  border:        'rgba(15,23,42,0.08)',
  border2:       'rgba(15,23,42,0.12)',

  radiusSm:  10,
  radius:    16,
  radiusLg:  20,
  radiusXl:  28,

  sp4:   4,
  sp8:   8,
  sp12:  12,
  sp16:  16,
  sp20:  20,
  sp24:  24,
  sp32:  32,
  sp40:  40,
}

// Approved dark treatment used only for the live room / room preview / launch
// surfaces shown in the reference board.
export const D = {
  ...T,
  bg:            '#071126',
  surface:       '#0D1833',
  surface2:      '#111F40',
  surface3:      '#18284D',
  surface4:      '#20335E',
  text:          '#FFFFFF',
  text2:         '#C9D2EA',
  text3:         '#8E9AB8',
  text4:         '#65718F',
  border:        'rgba(255,255,255,0.08)',
  border2:       'rgba(255,255,255,0.14)',
  primarySoft:   'rgba(108,77,255,0.18)',
  accentSoft:    'rgba(34,211,238,0.14)',
  premiumSoft:   'rgba(245,158,11,0.15)',
  liveSoft:      'rgba(239,68,68,0.14)',
  successSoft:   'rgba(16,185,129,0.14)',
}


// ─── Typography helpers ───────────────────────────────────────────────────────

export const Ty = {
  display:    { fontSize: 32, fontWeight: 800, fontFamily: 'Outfit', lineHeight: 1.15, letterSpacing: -0.5 },
  screenTitle:{ fontSize: 22, fontWeight: 800, fontFamily: 'Outfit', lineHeight: 1.2 },
  sectionTitle:{ fontSize: 16, fontWeight: 700, fontFamily: 'Outfit' },
  body:       { fontSize: 14, fontWeight: 400, fontFamily: 'Inter', lineHeight: 1.6 },
  bodyMed:    { fontSize: 14, fontWeight: 500, fontFamily: 'Inter' },
  bodySm:     { fontSize: 13, fontWeight: 400, fontFamily: 'Inter' },
  metadata:   { fontSize: 12, fontWeight: 400, fontFamily: 'Inter' },
  metadataMed:{ fontSize: 12, fontWeight: 500, fontFamily: 'Inter' },
  label:      { fontSize: 13, fontWeight: 600, fontFamily: 'Outfit' },
  labelSm:    { fontSize: 11, fontWeight: 600, fontFamily: 'Outfit', letterSpacing: 0.5 },
  mono:       { fontSize: 12, fontFamily: 'monospace' },
}

// ─── Live Badge ───────────────────────────────────────────────────────────────

export function LiveBadge({ count, small }: { count?: string; small?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4,
      background: T.liveSoft, border: `1px solid ${T.live}40`,
      borderRadius: 20, padding: small ? '2px 6px' : '2px 8px' }}>
      <span className="vc-live-dot" style={{ width: small ? 5 : 6, height: small ? 5 : 6, borderRadius: '50%', background: T.live, display: 'inline-block', flexShrink: 0 }} />
      <span style={{ ...Ty.labelSm, color: T.live, fontSize: small ? 10 : 11 }}>LIVE</span>
      {count && <span style={{ ...Ty.metadata, color: T.text3 }}>{count}</span>}
    </span>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

export function Avatar({
  src, size = 40, speaking = false, ring = false, online = false,
  placeholder = '?',
}: {
  src?: string; size?: number; speaking?: boolean; ring?: boolean; online?: boolean; placeholder?: string;
}) {
  return (
    <div className={speaking ? 'vc-speaking' : ''} style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0, position: 'relative',
      border: speaking ? `2px solid ${T.primary}` : ring ? `2px solid ${T.primary}` : '2px solid transparent',
      boxShadow: speaking ? `0 0 0 4px ${T.primary}33` : 'none',
      overflow: 'visible',
    }}>
      <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden',
        background: T.surface3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {src
          ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ ...Ty.label, color: T.text3, fontSize: size * 0.35 }}>{placeholder}</span>
        }
      </div>
      {online && (
        <div style={{ position: 'absolute', bottom: 1, right: 1, width: Math.max(8, size * 0.22), height: Math.max(8, size * 0.22),
          borderRadius: '50%', background: T.success, border: `2px solid ${T.bg}` }} />
      )}
    </div>
  )
}

// ─── Avatar Stack ─────────────────────────────────────────────────────────────

export function AvatarStack({ srcs, size = 24, max = 4 }: { srcs: string[]; size?: number; max?: number }) {
  const visible = srcs.slice(0, max)
  return (
    <div style={{ display: 'flex' }}>
      {visible.map((s, i) => (
        <div key={i} style={{ marginLeft: i > 0 ? -size * 0.3 : 0, zIndex: visible.length - i }}>
          <Avatar src={s} size={size} />
        </div>
      ))}
    </div>
  )
}

// ─── Audio Waveform ───────────────────────────────────────────────────────────

export function AudioWaveform({ active = true, bars = 5, height = 32, color = T.primary, accentColor = T.accent }: {
  active?: boolean; bars?: number; height?: number; color?: string; accentColor?: string;
}) {
  const pattern = [0.4, 0.7, 1, 0.75, 0.5, 0.85, 0.65, 1, 0.8, 0.55, 0.9, 0.6]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div key={i} className={active ? 'vc-wave-bar' : ''} style={{
          width: 3, height: pattern[i % pattern.length] * height,
          borderRadius: 2,
          background: `linear-gradient(to top, ${color}, ${accentColor})`,
          animationDelay: `${i * 0.11}s`,
          opacity: active ? 1 : 0.2,
        }} />
      ))}
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function Skeleton({ w = '100%', h = 16, radius = 8, style = {} }: {
  w?: number | string; h?: number | string; radius?: number; style?: CSSProperties;
}) {
  return (
    <div style={{
      width: w, height: h, borderRadius: radius,
      background: `linear-gradient(90deg, ${T.surface2} 25%, ${T.surface3} 50%, ${T.surface2} 75%)`,
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      ...style,
    }} />
  )
}

export function SkeletonPersonRow() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0' }}>
      <Skeleton w={48} h={48} radius={24} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton w="60%" h={14} />
        <Skeleton w="40%" h={12} />
      </div>
      <Skeleton w={70} h={32} radius={20} />
    </div>
  )
}

export function SkeletonCard({ height = 80 }: { height?: number }) {
  return <Skeleton w="100%" h={height} radius={16} style={{ marginBottom: 10 }} />
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

export function Chip({ label, active = false, onClick, icon, dark = false }: {
  label: string; active?: boolean; onClick?: () => void; icon?: string; dark?: boolean;
}) {
  const C = dark ? D : T
  return (
    <button onClick={onClick} style={{
      padding: '6px 14px', borderRadius: 20,
      background: active ? C.primary : C.surface2,
      color: active ? '#fff' : C.text2,
      border: `1px solid ${active ? 'transparent' : C.border}`,
      ...Ty.bodySm, fontWeight: 500,
      cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
      display: 'flex', alignItems: 'center', gap: 5,
    }}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  )
}

// ─── Buttons ──────────────────────────────────────────────────────────────────

export function PrimaryBtn({ label, onClick, fullWidth = false, small = false, icon, disabled = false, dark = false }: {
  label: string; onClick?: () => void; fullWidth?: boolean; small?: boolean; icon?: string; disabled?: boolean; dark?: boolean;
}) {
  const C = dark ? D : T
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: fullWidth ? '100%' : 'auto',
      padding: small ? '8px 20px' : '13px 24px',
      borderRadius: 40,
      background: disabled
        ? C.surface3
        : `linear-gradient(135deg, ${C.primary}, ${C.primaryStrong})`,
      color: disabled ? C.text3 : '#fff',
      fontSize: small ? 13 : 15, fontWeight: 600, fontFamily: 'Outfit',
      border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: disabled ? 'none' : `0 8px 24px ${C.primary}2E`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      flexShrink: 0,
    }}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  )
}

export function SecondaryBtn({ label, onClick, small = false, icon, dark = false }: {
  label: string; onClick?: () => void; small?: boolean; icon?: string; dark?: boolean;
}) {
  const C = dark ? D : T
  return (
    <button onClick={onClick} style={{
      padding: small ? '7px 16px' : '10px 20px', borderRadius: 40,
      background: C.surface2, color: C.text2,
      fontSize: small ? 12 : 14, fontWeight: 500, fontFamily: 'Inter',
      border: `1px solid ${C.border2}`, cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0,
    }}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  )
}

export function IconBtn({ icon, onClick, active = false, size = 44, bg, dark = false }: {
  icon: React.ReactNode; onClick?: () => void; active?: boolean; size?: number; bg?: string; dark?: boolean;
}) {
  const C = dark ? D : T
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: '50%',
      background: bg || (active ? C.primary : C.surface2),
      border: `1px solid ${active ? 'transparent' : C.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.45, cursor: 'pointer',
      boxShadow: active ? `0 4px 16px ${C.primary}44` : 'none',
      flexShrink: 0,
    }}>
      {icon}
    </button>
  )
}

export function LiveBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: 56, height: 56, borderRadius: '50%',
      background: `linear-gradient(135deg, ${T.live}, #DC2626)`,
      border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 24, cursor: 'pointer', boxShadow: `0 4px 20px ${T.live}66`,
    }}>🔴</button>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({ children, style = {}, onClick, dark = false }: {
  children: ReactNode; style?: CSSProperties; onClick?: () => void; dark?: boolean;
}) {
  const C = dark ? D : T
  return (
    <div onClick={onClick} style={{
      background: C.surface, borderRadius: C.radius, padding: C.sp16,
      border: `1px solid ${C.border}`,
      boxShadow: '0 6px 24px rgba(15,23,42,0.055)',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>
      {children}
    </div>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────

export function SectionHeader({ title, action, onAction }: {
  title: string; action?: string; onAction?: () => void;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: T.sp12 }}>
      <span style={{ ...Ty.sectionTitle, color: T.text }}>{title}</span>
      {action && (
        <button onClick={onAction} style={{ background: 'none', border: 'none', cursor: 'pointer', ...Ty.label, color: T.primary }}>{action}</button>
      )}
    </div>
  )
}

// ─── Page Header ──────────────────────────────────────────────────────────────

export function PageHeader({ title, onBack, right, dark = false }: {
  title: string; onBack?: () => void; right?: ReactNode; dark?: boolean;
}) {
  const C = dark ? D : T
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '52px 16px 12px' }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: '50%', background: C.surface2,
          border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer', color: C.text, fontSize: 18, flexShrink: 0,
        }}>‹</button>
      )}
      <span style={{ ...Ty.screenTitle, color: C.text, flex: 1 }}>{title}</span>
      {right}
    </div>
  )
}

// ─── Search Field ─────────────────────────────────────────────────────────────

export function SearchField({ placeholder = 'Search...', value = '', onChange, autoFocus = false }: {
  placeholder?: string; value?: string; onChange?: (v: string) => void; autoFocus?: boolean;
}) {
  return (
    <div style={{ background: T.surface, borderRadius: 40, padding: '10px 16px',
      display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${T.border2}` }}>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: T.text3, flexShrink: 0 }}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, background: 'none', border: 'none', outline: 'none',
          color: T.text, ...Ty.body, caretColor: T.primary }}
      />
      {value && (
        <button onClick={() => onChange?.('')} style={{ background: 'none', border: 'none', color: T.text3, cursor: 'pointer', fontSize: 16 }}>✕</button>
      )}
    </div>
  )
}

// ─── Tab Bar ──────────────────────────────────────────────────────────────────

export function TabBar({ tabs, active, onChange, dark = false }: {
  tabs: string[]; active: string; onChange: (t: string) => void; dark?: boolean;
}) {
  const C = dark ? D : T
  return (
    <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}` }}>
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)} style={{
          flex: 1, padding: '12px 0', background: 'none', border: 'none', cursor: 'pointer',
          ...Ty.bodyMed, fontWeight: active === t ? 600 : 400,
          color: active === t ? C.primary : C.text3,
          borderBottom: `2px solid ${active === t ? C.primary : 'transparent'}`,
          transition: 'all 0.15s',
        }}>{t}</button>
      ))}
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

export function EmptyState({ icon, title, message, action, onAction, dark = false }: {
  icon: ReactNode; title: string; message: string; action?: string; onAction?: () => void; dark?: boolean;
}) {
  const C = dark ? D : T
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 32px', textAlign: 'center', gap: 12 }}>
      <div style={{ fontSize: 48, marginBottom: 4 }}>{icon}</div>
      <div style={{ ...Ty.sectionTitle, color: C.text }}>{title}</div>
      <div style={{ ...Ty.body, color: C.text3 }}>{message}</div>
      {action && <div style={{ marginTop: 8 }}><PrimaryBtn label={action} onClick={onAction} small dark={dark} /></div>}
    </div>
  )
}

// ─── Error State ──────────────────────────────────────────────────────────────

export function ErrorState({ message = 'Something went wrong', onRetry }: {
  message?: string; onRetry?: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 32px', gap: 12, textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: T.liveSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>⚠</div>
      <div style={{ ...Ty.bodyMed, color: T.text }}>{message}</div>
      {onRetry && <SecondaryBtn label="Try again" onClick={onRetry} small />}
    </div>
  )
}

// ─── Room Card ────────────────────────────────────────────────────────────────

export function RoomCard({ title, host, hostPhoto, topic, listeners, live, scheduledAt, gradient, onClick }: {
  title: string; host: string; hostPhoto?: string; topic: string;
  listeners: string; live?: boolean; scheduledAt?: string;
  gradient?: string; onClick?: () => void;
}) {
  const bg = gradient || `linear-gradient(135deg, ${T.primary}88, ${T.accent}44)`
  return (
    <button onClick={onClick} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 10 }}>
      <Card style={{ display: 'flex', gap: 12, padding: '12px 14px' }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, overflow: 'hidden' }}>
          {hostPhoto
            ? <img src={hostPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : '🎙'}
        </div>
        <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
          <div style={{ ...Ty.bodyMed, color: T.text, fontFamily: 'Outfit', fontWeight: 600,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
          <div style={{ ...Ty.metadata, color: T.text3, marginTop: 2 }}>{host} · {topic}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
            {live ? <LiveBadge /> : null}
            {scheduledAt && <span style={{ ...Ty.metadata, color: T.text3 }}>⏰ {scheduledAt}</span>}
            <span style={{ ...Ty.metadata, color: T.text3 }}>👥 {listeners}</span>
          </div>
        </div>
        {live && (
          <button style={{ background: T.primary, border: 'none', borderRadius: 20, padding: '6px 14px',
            color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', alignSelf: 'center', flexShrink: 0 }}>
            Join
          </button>
        )}
      </Card>
    </button>
  )
}

// ─── Person Row ───────────────────────────────────────────────────────────────

export function PersonRow({ name, username, bio, photo, following = false, online = false, role, onFollow, onClick }: {
  name: string; username: string; bio?: string; photo?: string;
  following?: boolean; online?: boolean; role?: string;
  onFollow?: () => void; onClick?: () => void;
}) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 0', borderBottom: `1px solid ${T.border}`, cursor: onClick ? 'pointer' : 'default' }}>
      <Avatar src={photo} size={48} online={online} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600 }}>{name}</span>
          {role && <span style={{ ...Ty.labelSm, color: T.primary, background: T.primarySoft, borderRadius: 10, padding: '1px 6px' }}>{role}</span>}
        </div>
        <div style={{ ...Ty.metadata, color: T.text3, marginTop: 2 }}>{username}</div>
        {bio && <div style={{ ...Ty.metadata, color: T.text2, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bio}</div>}
      </div>
      {onFollow && (
        <button onClick={e => { e.stopPropagation(); onFollow() }} style={{
          background: following ? T.surface3 : T.primary,
          border: following ? `1px solid ${T.border2}` : 'none',
          borderRadius: 20, padding: '7px 16px', color: following ? T.text2 : '#fff',
          ...Ty.label, fontSize: 12, cursor: 'pointer', flexShrink: 0,
        }}>
          {following ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  )
}

// ─── Creator Card ─────────────────────────────────────────────────────────────

export function CreatorCard({ name, username, photo, followers, topic, verified = false, onClick }: {
  name: string; username: string; photo?: string; followers: string;
  topic: string; verified?: boolean; onClick?: () => void;
}) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '16px 12px', textAlign: 'center' }}>
        <Avatar src={photo} size={60} ring />
        <div>
          <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600 }}>
            {name}{verified && ' ✓'}
          </div>
          <div style={{ ...Ty.metadata, color: T.text3, marginTop: 2 }}>{username}</div>
        </div>
        <div style={{ ...Ty.labelSm, color: T.accent, background: T.accentSoft, borderRadius: 10, padding: '2px 10px' }}>{topic}</div>
        <div style={{ ...Ty.metadata, color: T.text3 }}>{followers} followers</div>
        <SecondaryBtn label="Follow" small />
      </Card>
    </button>
  )
}

// ─── Event Card ───────────────────────────────────────────────────────────────

export function EventCard({ title, host, date, time, attendees, coverPhoto, onClick }: {
  title: string; host: string; date: string; time: string;
  attendees: string; coverPhoto?: string; onClick?: () => void;
}) {
  return (
    <button onClick={onClick} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 10px' }}>
      <Card style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ height: 100, background: coverPhoto ? 'none' : `linear-gradient(135deg, ${T.primary}66, ${T.accent}44)`, position: 'relative' }}>
          {coverPhoto && <img src={coverPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(8,10,24,0.8))' }} />
          <div style={{ position: 'absolute', top: 10, left: 12 }}>
            <span style={{ background: T.premiumSoft, border: `1px solid ${T.premium}40`, borderRadius: 20, padding: '3px 10px', ...Ty.labelSm, color: T.premium }}>Event</span>
          </div>
        </div>
        <div style={{ padding: '12px 14px' }}>
          <div style={{ ...Ty.bodyMed, color: T.text, fontFamily: 'Outfit', fontWeight: 600, marginBottom: 6 }}>{title}</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ ...Ty.metadata, color: T.text3 }}>📅 {date}</span>
            <span style={{ ...Ty.metadata, color: T.text3 }}>⏰ {time}</span>
            <span style={{ ...Ty.metadata, color: T.text3 }}>👥 {attendees}</span>
          </div>
          <div style={{ ...Ty.metadata, color: T.text3, marginTop: 4 }}>by {host}</div>
        </div>
      </Card>
    </button>
  )
}

// ─── Community Card ───────────────────────────────────────────────────────────

export function CommunityCard({ name, category, members, rooms, coverEmoji = '🌐', joined = false, onClick }: {
  name: string; category: string; members: string; rooms: number;
  coverEmoji?: string; joined?: boolean; onClick?: () => void;
}) {
  return (
    <button onClick={onClick} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 10px' }}>
      <Card style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 14px' }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: T.surface3,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
          {coverEmoji}
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ ...Ty.bodyMed, color: T.text, fontWeight: 600 }}>{name}</div>
          <div style={{ ...Ty.metadata, color: T.text3, marginTop: 2 }}>{category}</div>
          <div style={{ ...Ty.metadata, color: T.text3, marginTop: 4, display: 'flex', gap: 10 }}>
            <span>👥 {members}</span>
            <span>🎙 {rooms} rooms</span>
          </div>
        </div>
        <button style={{
          background: joined ? T.surface3 : T.primarySoft,
          border: `1px solid ${joined ? T.border : T.primary}60`,
          borderRadius: 20, padding: '6px 14px',
          color: joined ? T.text2 : T.primary, ...Ty.label, fontSize: 12, cursor: 'pointer', flexShrink: 0,
        }}>{joined ? 'Joined' : 'Join'}</button>
      </Card>
    </button>
  )
}

// ─── Notification Row ─────────────────────────────────────────────────────────

export function NotificationRow({ icon, title, body, time, unread = false, photo }: {
  icon?: string; title: string; body: string; time: string; unread?: boolean; photo?: string;
}) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: `1px solid ${T.border}`, alignItems: 'flex-start', position: 'relative' }}>
      {unread && <div style={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, borderRadius: '50%', background: T.primary }} />}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {photo ? <Avatar src={photo} size={44} /> : (
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: T.surface3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</div>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...Ty.bodyMed, color: unread ? T.text : T.text2, fontWeight: unread ? 600 : 400 }}>{title}</div>
        <div style={{ ...Ty.metadata, color: T.text3, marginTop: 3, lineHeight: 1.4 }}>{body}</div>
        <div style={{ ...Ty.labelSm, color: T.text4, marginTop: 4 }}>{time}</div>
      </div>
    </div>
  )
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

export function MessageBubble({ text, fromMe = false, time, photo, dark = false }: {
  text: string; fromMe?: boolean; time?: string; photo?: string; dark?: boolean;
}) {
  const C = dark ? D : T
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', justifyContent: fromMe ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
      {!fromMe && <Avatar src={photo} size={28} />}
      <div>
        <div style={{
          background: fromMe ? `linear-gradient(135deg, ${C.primary}, ${C.primaryStrong})` : C.surface2,
          borderRadius: fromMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          padding: '10px 14px', maxWidth: 220,
          border: fromMe ? 'none' : `1px solid ${C.border}`,
        }}>
          <span style={{ ...Ty.body, color: C.text, lineHeight: 1.5 }}>{text}</span>
        </div>
        {time && <div style={{ ...Ty.labelSm, color: C.text4, marginTop: 4, textAlign: fromMe ? 'right' : 'left' }}>{time}</div>}
      </div>
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

export function StatCard({ label, value, delta, icon, accentColor }: {
  label: string; value: string; delta?: string; icon?: string; accentColor?: string;
}) {
  const positive = delta && delta.startsWith('+')
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{ ...Ty.metadata, color: T.text3 }}>{label}</span>
        {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      </div>
      <div style={{ ...Ty.display, color: accentColor || T.text, fontSize: 24, marginBottom: 4 }}>{value}</div>
      {delta && <div style={{ ...Ty.metadataMed, color: positive ? T.success : T.live }}>{delta}</div>}
    </Card>
  )
}

// ─── Wallet Balance ───────────────────────────────────────────────────────────

export function WalletBalance({ amount, onAddFunds }: { amount: number; onAddFunds?: () => void }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, #E9E7FF 0%, #F8F8FF 100%)`,
      borderRadius: T.radiusXl, padding: T.sp20,
      border: `1px solid ${T.primary}22`,
      boxShadow: '0 8px 26px rgba(108,77,255,0.08)',
    }}>
      <div style={{ ...Ty.metadata, color: T.text2, marginBottom: 8 }}>Your Balance</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🪙</span>
          <span style={{ fontSize: 36, fontWeight: 800, fontFamily: 'Outfit', color: T.text }}>{amount.toLocaleString()}</span>
        </div>
        {onAddFunds && <PrimaryBtn label="+ Add Funds" onClick={onAddFunds} small />}
      </div>
    </div>
  )
}

// ─── Gift Tile ────────────────────────────────────────────────────────────────

export function GiftTile({ emoji, name, cost, onSend, dark = false }: {
  emoji: string; name: string; cost: number; onSend?: () => void; dark?: boolean;
}) {
  const C = dark ? D : T
  return (
    <button onClick={onSend} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: C.radius, padding: 12, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: 28 }}>{emoji}</span>
      <span style={{ ...Ty.labelSm, color: C.text2 }}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <span style={{ fontSize: 11 }}>🪙</span>
        <span style={{ ...Ty.metadataMed, color: C.premium }}>{cost}</span>
      </div>
    </button>
  )
}

// ─── Ranking Row ──────────────────────────────────────────────────────────────

export function RankingRow({ rank, name, photo, score, badge, isMe = false }: {
  rank: number; name: string; photo?: string; score: string; badge?: string; isMe?: boolean;
}) {
  const rankColors: Record<number, string> = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' }
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
      background: isMe ? T.primarySoft : 'transparent',
      borderRadius: T.radiusSm, marginBottom: 2,
      border: isMe ? `1px solid ${T.primary}40` : `1px solid transparent`,
    }}>
      <div style={{ width: 28, textAlign: 'center',
        fontSize: rank <= 3 ? 18 : 14, color: rankColors[rank] || T.text3,
        fontWeight: 700, fontFamily: 'Outfit', flexShrink: 0 }}>
        {rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}
      </div>
      <Avatar src={photo} size={40} ring={isMe} />
      <div style={{ flex: 1 }}>
        <span style={{ ...Ty.bodyMed, color: T.text, fontWeight: isMe ? 700 : 500 }}>{name}</span>
        {badge && <span style={{ ...Ty.labelSm, color: T.premium, background: T.premiumSoft, borderRadius: 10, padding: '1px 8px', marginLeft: 8 }}>{badge}</span>}
      </div>
      <span style={{ ...Ty.bodyMed, color: T.accent, fontFamily: 'Outfit', fontWeight: 700 }}>{score}</span>
    </div>
  )
}

// ─── Settings Row ─────────────────────────────────────────────────────────────

export function SettingsRow({ icon, label, sub, right, onClick, destructive = false }: {
  icon: ReactNode; label: string; sub?: string; right?: ReactNode; onClick?: () => void; destructive?: boolean;
}) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
      borderBottom: `1px solid ${T.border}`, cursor: onClick ? 'pointer' : 'default',
    }}>
      <div style={{ width: 36, height: 36, borderRadius: T.radiusSm, background: T.surface3,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ ...Ty.bodyMed, color: destructive ? T.live : T.text }}>{label}</div>
        {sub && <div style={{ ...Ty.metadata, color: T.text3, marginTop: 2 }}>{sub}</div>}
      </div>
      {right !== undefined ? right : (
        <span style={{ color: T.text3, fontSize: 18 }}>›</span>
      )}
    </div>
  )
}

// ─── Profile Header ───────────────────────────────────────────────────────────

export function ProfileHeader({ name, username, bio, photo, followers, following, replays, verified = false, isMe = false, onFollow, onMessage }: {
  name: string; username: string; bio?: string; photo?: string;
  followers: string; following: string; replays: string;
  verified?: boolean; isMe?: boolean;
  onFollow?: () => void; onMessage?: () => void;
}) {
  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{ marginTop: -40, marginBottom: 12 }}>
        <Avatar src={photo} size={80} ring />
      </div>
      <div style={{ ...Ty.screenTitle, color: T.text, fontSize: 20, marginBottom: 2 }}>
        {name} {verified && <span style={{ fontSize: 14, color: T.accent }}>✓</span>}
      </div>
      <div style={{ ...Ty.metadata, color: T.text3, marginBottom: 8 }}>{username}</div>
      {bio && <div style={{ ...Ty.body, color: T.text2, lineHeight: 1.6, marginBottom: 12 }}>{bio}</div>}
      <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
        {[{ label: 'Following', val: following }, { label: 'Followers', val: followers }, { label: 'Replays', val: replays }].map(s => (
          <div key={s.label}>
            <div style={{ fontSize: 17, fontWeight: 700, fontFamily: 'Outfit', color: T.text }}>{s.val}</div>
            <div style={{ ...Ty.labelSm, color: T.text3 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {isMe
          ? <SecondaryBtn label="Edit Profile" icon="✏" />
          : <>
              <PrimaryBtn label="Follow" onClick={onFollow} />
              <SecondaryBtn label="Message" onClick={onMessage} icon="✉" />
            </>
        }
      </div>
    </div>
  )
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

export type NavTab = 'home' | 'discover' | 'live' | 'messages' | 'profile'

export function BottomNav({ active, onChange, unreadMessages = false }: {
  active: NavTab; onChange: (t: NavTab) => void; unreadMessages?: boolean;
}) {
  const tabs: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'discover', label: 'Discover' },
    { id: 'live', label: 'Live' },
    { id: 'messages', label: 'Messages' },
    { id: 'profile', label: 'Profile' },
  ]
  const NavIcon = ({ id, active }: { id: NavTab; active: boolean }) => {
    const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: active ? T.primary : T.text3, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
    if (id === 'home') return <svg {...common}><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></svg>
    if (id === 'discover') return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
    if (id === 'messages') return <svg {...common}><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-4-.9L4 20l1.2-3.3A7.1 7.1 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5a7.5 7.5 0 0 1 8 7Z"/></svg>
    return <svg {...common}>{id === 'profile' ? <><circle cx="12" cy="8" r="3.2"/><path d="M5 20a7 7 0 0 1 14 0"/></> : <><path d="M12 4v16"/><path d="M8 7v10"/><path d="M16 8v8"/><circle cx="12" cy="12" r="9"/></>}</svg>
  }
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(18px)',
      borderTop: `1px solid ${T.border}`, padding: '8px 0 18px',
      boxShadow: '0 -6px 24px rgba(15,23,42,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around', zIndex: 100,
    }}>
      {tabs.map(tab => {
        const isLive = tab.id === 'live'
        const isActive = active === tab.id
        return (
          <button key={tab.id} onClick={() => onChange(tab.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: isLive ? 0 : '4px 8px', position: 'relative',
          }}>
            {isLive ? (
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: `linear-gradient(135deg, ${T.primary}, ${T.primaryStrong})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 24px ${T.primary}55`, fontSize: 22, marginTop: -22,
              }}><svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"><path d="M8 10v4a4 4 0 0 0 8 0v-4"/><path d="M12 18v3"/><path d="M9 21h6"/><path d="M12 3v3"/><path d="M9 6v3"/><path d="M15 6v3"/></svg></div>
            ) : (
              <>
                <div style={{ position: 'relative' }}>
                  <NavIcon id={tab.id} active={isActive} />
                  {tab.id === 'messages' && unreadMessages && (
                    <div style={{ position: 'absolute', top: -2, right: -4, width: 8, height: 8, borderRadius: '50%', background: T.live, border: `1.5px solid ${T.bg}` }} />
                  )}
                </div>
                <span style={{ ...Ty.labelSm, fontSize: 10, color: isActive ? T.primary : T.text3 }}>{tab.label}</span>
                {isActive && <div style={{ position: 'absolute', bottom: -8, width: 20, height: 2, borderRadius: 1, background: T.primary }} />}
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─── Status Bar ───────────────────────────────────────────────────────────────

export function StatusBar({ transparent = false, dark = false }: { transparent?: boolean; dark?: boolean }) {
  const theme = dark ? D : T
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 44, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px 0 20px',
      background: 'transparent',
      pointerEvents: 'none',
    }}>
      <span style={{ ...Ty.label, color: theme.text }}>9:41</span>
      <div style={{ width: 100, height: 28, borderRadius: 20, background: '#000', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0 }} />
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <span style={{ ...Ty.labelSm, color: theme.text }}>▂▄█</span>
        <span style={{ ...Ty.labelSm, color: theme.text }}>WiFi</span>
        <span style={{ ...Ty.labelSm, color: theme.text }}>🔋</span>
      </div>
    </div>
  )
}

// ─── Horizontal Scroll Row ────────────────────────────────────────────────────

export function HScrollRow({ children, gap = 12, px = 16 }: { children: ReactNode; gap?: number; px?: number }) {
  return (
    <div style={{ display: 'flex', gap, overflowX: 'auto', padding: `0 ${px}px`, paddingBottom: 4 }}>
      {children}
    </div>
  )
}

// ─── Section Divider ──────────────────────────────────────────────────────────

export function Divider() {
  return <div style={{ height: 1, background: T.border, margin: '4px 0' }} />
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

export function ProgressBar({ value, max, color = T.primary }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div style={{ background: T.surface3, borderRadius: 4, height: 6, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: `linear-gradient(to right, ${color}, ${T.accent})`, transition: 'width 0.5s ease' }} />
    </div>
  )
}

// ─── Connection State Banner ──────────────────────────────────────────────────

export function ConnectionBanner({ state, onAction, dark = false }: {
  state: 'preparing' | 'connecting' | 'reconnecting' | 'interrupted' | 'disconnected';
  onAction?: () => void; dark?: boolean;
}) {
  const C = dark ? D : T
  const config = {
    preparing:    { icon: '⏳', msg: 'Getting your room ready...', color: C.accent, bg: C.accentSoft },
    connecting:   { icon: '📡', msg: 'Joining the conversation...', color: C.primary, bg: C.primarySoft },
    reconnecting: { icon: '🔄', msg: 'Connection interrupted. Reconnecting...', color: C.warning, bg: `${C.warning}15` },
    interrupted:  { icon: '⚡', msg: 'Audio interrupted. Check your connection.', color: C.warning, bg: `${C.warning}15` },
    disconnected: { icon: '🔌', msg: "You've been disconnected.", color: C.live, bg: C.liveSoft },
  }[state]

  return (
    <div style={{
      margin: '0 16px', borderRadius: C.radius, padding: '12px 16px',
      background: config.bg, border: `1px solid ${config.color}40`,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{ fontSize: 20 }}>{config.icon}</span>
      <span style={{ ...Ty.bodyMed, color: config.color, flex: 1 }}>{config.msg}</span>
      {onAction && <SecondaryBtn label="Retry" onClick={onAction} small dark={dark} />}
    </div>
  )
}
