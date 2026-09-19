import { useState, type ReactNode } from 'react'
import {
  T, Ty, PageHeader, SectionHeader, Card, PrimaryBtn, SecondaryBtn, IconBtn, SearchField, TabBar,
  EmptyState, ErrorState, Skeleton, RoomCard, PersonRow, CreatorCard, EventCard, CommunityCard,
  NotificationRow, MessageBubble, StatCard, WalletBalance, GiftTile, RankingRow, SettingsRow,
  ProfileHeader, AudioWaveform, Avatar, LiveBadge, ProgressBar, ConnectionBanner, HScrollRow,
} from './ds'
import { MessagesScreen } from './screens-main'
import { useHost, type HostRoom } from './host-store'
import { ConversationScreen } from './screens-social'

type GoTo = (screen: string) => void

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    back: <path d="M19 12H5m7 7-7-7 7-7" />,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/></>,
    shield: <path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z" />,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    bell: <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    wallet: <><path d="M4 7a2 2 0 0 1 2-2h13v14H6a2 2 0 0 1-2-2V7Z"/><path d="M4 8h15"/><circle cx="16" cy="13" r="1" fill="currentColor" stroke="none"/></>,
    chart: <><path d="M4 19V5M4 19h16"/><path d="m7 15 3-4 3 2 5-7"/></>,
    gear: <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6v3m0 14v3M4.9 4.9 7 7m10 10 2.1 2.1M2 12h3m14 0h3M4.9 19.1 7 17m10-10 2.1-2.1" />,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.4 2.4 0 1 1 4.1 1.7c-1.2 1.1-1.8 1.4-1.8 3"/><path d="M12 17h.01"/></>,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    mic: <><rect x="8" y="3" width="8" height="12" rx="4"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></>,
    users: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M14 18a5 5 0 0 1 7 2"/></>,
    calendar: <><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 9h16"/></>,
    gift: <><path d="M4 10h16v10H4zM3 7h18v3H3zM12 7v13"/><path d="M12 7H8.5A2.5 2.5 0 1 1 11 4.5C11 3 12 3 12 3M12 7h3.5A2.5 2.5 0 1 0 13 4.5C13 3 12 3 12 3"/></>,
    flag: <><path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5"/></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    key: <><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8m-3 3 2 2m-5 1 2 2"/></>,
    logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M9 12h9"/></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M5 21h14"/></>,
    edit: <path d="m4 16 0 4 4 0 11-11-4-4L4 16Zm9-9 4 4"/>,
    play: <path d="m9 6 9 6-9 6V6Z" fill="currentColor" stroke="none"/>,
    pause: <><path d="M8 5v14M16 5v14"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name] ?? paths.more}</svg>
}

function Screen({ children, title, goTo, right, subtitle }: { children: ReactNode; title: string; goTo: GoTo; right?: ReactNode; subtitle?: string }) {
  return <div style={{ minHeight: '100%', padding: '58px 16px 104px', background: T.bg, color: T.text }}>
    <PageHeader title={title} onBack={() => goTo('home')} right={right} />
    {subtitle && <div style={{ color: T.text2, fontSize: 13, margin: '-4px 0 20px' }}>{subtitle}</div>}
    {children}
  </div>
}

function SubTabs({ tabs, active, setActive }: { tabs: string[]; active: string; setActive: (v: string) => void }) {
  return <TabBar tabs={tabs} active={active} onChange={setActive} />
}

export function SignInScreen({ goTo }: { goTo: GoTo }) {
  return <Screen title="Welcome back" goTo={goTo} subtitle="Sign in to continue to VoiceCloud.">
    <Card style={{ padding: 20 }}>
      <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Your voice, your community.</div>
      <div style={{ color: T.text2, lineHeight: 1.5, marginBottom: 24 }}>Join live conversations, follow creators and keep your communities close.</div>
      <div style={{ display: 'grid', gap: 10 }}>
        <PrimaryBtn label="Continue with Google" fullWidth onClick={() => goTo('home')} />
        <SecondaryBtn label="Continue with phone" onClick={() => goTo('otp')} />
        <SecondaryBtn label="Create account" onClick={() => goTo('register')} />
      </div>
      <div style={{ textAlign: 'center', marginTop: 20, color: T.text3, fontSize: 12 }}>By continuing, you agree to the Terms and Privacy Policy.</div>
    </Card>
    <SectionHeader title="Account help" />
    <div style={{ display: 'grid', gap: 8 }}>
      <SettingsRow icon={<Icon name="key" />} label="Forgot password" onClick={() => goTo('forgot-password')} />
      <SettingsRow icon={<Icon name="lock" />} label="Reset password" onClick={() => goTo('reset-password')} />
      <SettingsRow icon={<Icon name="user" />} label="Continue as guest" onClick={() => goTo('guest-upgrade')} />
    </div>
  </Screen>
}

export function RegisterScreen({ goTo }: { goTo: GoTo }) { return <FormScreen title="Create account" goTo={goTo} fields={['Name','Username','Email or phone','Password']} action="Create account" onAction={() => goTo('otp')} footer="Already have an account? Sign in" /> }
export function OtpScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Verify your phone" goTo={goTo} subtitle="Enter the six-digit code we sent to your phone."><Card style={{ padding: 20 }}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8, marginBottom: 20 }}>{[1,2,3,4,5,6].map(i => <div key={i} style={{ height: 54, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, display:'grid', placeItems:'center', fontSize:22, fontWeight:700 }}>{i === 1 ? '•' : ''}</div>)}</div><PrimaryBtn label="Verify" fullWidth onClick={() => goTo('home')} /><SecondaryBtn label="Resend code" onClick={() => {}} /></Card></Screen> }
export function ForgotPasswordScreen({ goTo }: { goTo: GoTo }) { return <FormScreen title="Forgot password" goTo={goTo} fields={['Email or phone']} action="Send reset link" onAction={() => goTo('reset-password')} /> }
export function ResetPasswordScreen({ goTo }: { goTo: GoTo }) { return <FormScreen title="Create new password" goTo={goTo} fields={['New password','Confirm password']} action="Update password" onAction={() => goTo('home')} /> }
export function GuestUpgradeScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Create your account" goTo={goTo} subtitle="Keep your profile, follows and room activity across devices."><Card style={{padding:20}}><div style={{display:'grid',gap:10}}><PrimaryBtn label="Create account" fullWidth onClick={() => goTo('register')} /><SecondaryBtn label="Sign in" onClick={() => goTo('sign-in')} /></div></Card></Screen> }
export function SessionExpiredScreen({ goTo }: { goTo: GoTo }) { return <StateScreen title="Session expired" message="For your security, please sign in again." icon="lock" primary="Sign in" goTo={goTo} target="sign-in" /> }

function FormScreen({ title, goTo, fields, action, onAction, footer }: { title:string; goTo:GoTo; fields:string[]; action:string; onAction:()=>void; footer?:string }) { return <Screen title={title} goTo={goTo}><Card style={{padding:20,display:'grid',gap:12}}>{fields.map(f=><label key={f} style={{display:'grid',gap:6,fontSize:12,color:T.text2}}>{f}<input placeholder={f} style={{height:48,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 14px',outline:'none'}} /></label>)}<PrimaryBtn label={action} fullWidth onClick={onAction}/>{footer&&<div style={{fontSize:12,color:T.text3,textAlign:'center'}}>{footer}</div>}</Card></Screen> }
function StateScreen({title,message,icon,primary,goTo,target}:{title:string;message:string;icon:string;primary:string;goTo:GoTo;target:string}) { return <Screen title={title} goTo={goTo}><div style={{padding:'60px 20px',textAlign:'center'}}><div style={{width:72,height:72,borderRadius:24,background:T.surface,display:'grid',placeItems:'center',margin:'0 auto 20px',color:T.primary}}><Icon name={icon} size={30}/></div><div style={{fontSize:24,fontWeight:800}}>{title}</div><div style={{color:T.text2,lineHeight:1.5,margin:'10px auto 24px',maxWidth:290}}>{message}</div><PrimaryBtn label={primary} fullWidth onClick={()=>goTo(target)}/></div></Screen> }

function statusLabel(status: HostRoom['status']) {
  return status === 'live' ? 'LIVE' : status === 'scheduled' ? 'SCHEDULED' : status.toUpperCase()
}

function HostRoomCard({ room, goTo }: { room: HostRoom; goTo: GoTo }) {
  const { actions } = useHost()
  return <Card style={{ padding: 16 }}>
    <div style={{ display:'flex', justifyContent:'space-between', gap:10, alignItems:'flex-start' }}>
      <div><LiveBadge count={statusLabel(room.status)} /><div style={{fontSize:18,fontWeight:800,marginTop:10}}>{room.title}</div><div style={{color:T.text2,fontSize:12,marginTop:4}}>{room.topic} · {room.startAt}</div></div>
      <IconBtn icon={<Icon name="more" />} onClick={()=>goTo('room-settings')} />
    </div>
    <div style={{display:'flex',gap:8,marginTop:14}}>
      {room.status === 'scheduled' && <PrimaryBtn label="Start now" onClick={()=>{ actions.startRoom(room.id); goTo('live-console') }} />}
      {room.status === 'live' && <PrimaryBtn label="Open console" onClick={()=>goTo('live-console')} />}
      {room.status === 'paused' && <PrimaryBtn label="Resume" onClick={()=>{ actions.startRoom(room.id); goTo('live-console') }} />}
      {room.status !== 'live' && room.status !== 'ended' && <SecondaryBtn label="Manage" onClick={()=>{actions.setActiveRoom(room.id);goTo('room-management')}} />}
      {room.status === 'live' && <SecondaryBtn label="Pause" onClick={()=>actions.pauseRoom(room.id)} />}
      {room.status !== 'ended' && <SecondaryBtn label="End" onClick={()=>actions.endRoom(room.id)} />}
    </div>
  </Card>
}

export function HostStudioScreen({ goTo }: { goTo: GoTo }) {
  const { rooms, participants, verificationStep, hostProfile } = useHost()
  const upcoming = rooms.filter(r=>r.status==='scheduled').length
  const live = rooms.find(r=>r.status==='live')
  return <Screen title="Host Studio" goTo={goTo} right={<IconBtn icon={<Icon name="more"/>}/>} subtitle={`${hostProfile.displayName} · ${hostProfile.handle}`}>
    <div style={{display:'grid',gap:12}}>
      <Card style={{padding:18,background:`linear-gradient(145deg, ${T.surface}, ${T.surface2})`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><LiveBadge count={live ? 'LIVE' : 'READY'}/><span style={{fontSize:12,color:T.text2}}>{participants.filter(p=>p.state!=='removed').length} active participants</span></div>
        <div style={{fontSize:24,fontWeight:800,marginTop:12}}>{live ? live.title : 'Ready to host'}</div>
        <div style={{color:T.text2,margin:'6px 0 18px'}}>{live ? `${live.audience.toLocaleString()} listening now` : 'Create, schedule and run your live rooms from one workspace.'}</div>
        <PrimaryBtn label={live ? 'Open live console' : 'Create room'} fullWidth onClick={()=>goTo(live ? 'live-console' : 'room-create')} />
      </Card>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
        <StatCard label="Upcoming" value={String(upcoming)} icon={<Icon name="calendar"/>}/><StatCard label="Audience" value="12.8K" delta="+8.4%" icon={<Icon name="users"/>}/><StatCard label="Verification" value={`${verificationStep}/3`} icon={<Icon name="shield"/>}/>
      </div>
      <SectionHeader title="Your rooms" />
      {rooms.slice(0,3).map(room=><HostRoomCard key={room.id} room={room} goTo={goTo}/>)}
      <SectionHeader title="Host tools"/>
      <SettingsRow icon={<Icon name="mic"/>} label="Live console" sub="Stage, speakers, chat and moderation" onClick={()=>goTo('live-console')}/>
      <SettingsRow icon={<Icon name="calendar"/>} label="Scheduling" sub="Create and manage upcoming rooms" onClick={()=>goTo('scheduling')}/>
      <SettingsRow icon={<Icon name="shield"/>} label="Participants & moderation" onClick={()=>goTo('participant-management')}/>
      <SettingsRow icon={<Icon name="check"/>} label="Host verification" onClick={()=>goTo('host-verification')}/>
    </div>
  </Screen>
}

export function RoomCreateScreen({ goTo }: { goTo: GoTo }) {
  const { actions } = useHost()
  const [title,setTitle]=useState('')
  const [topic,setTopic]=useState('')
  const [description,setDescription]=useState('')
  const [startAt,setStartAt]=useState('Today · 8:00 PM')
  const [visibility,setVisibility]=useState<HostRoom['visibility']>('Public')
  const canCreate=title.trim().length>2 && topic.trim().length>1
  const field=(label:string,value:string,set:(v:string)=>void)=><label style={{display:'grid',gap:6,fontSize:12,color:T.text2}}>{label}<input value={value} onChange={e=>set(e.target.value)} placeholder={label} style={{height:48,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 14px',outline:'none'}}/></label>
  return <Screen title="Create room" goTo={goTo} subtitle="Configure the room before it becomes visible to your audience."><Card style={{padding:18,display:'grid',gap:12}}>
    {field('Room title',title,setTitle)}{field('Topic',topic,setTopic)}{field('Description',description,setDescription)}{field('Start time',startAt,setStartAt)}
    <label style={{display:'grid',gap:6,fontSize:12,color:T.text2}}>Visibility<select value={visibility} onChange={e=>setVisibility(e.target.value as HostRoom['visibility'])} style={{height:48,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 14px'}}><option>Public</option><option>Followers</option><option>Invite only</option></select></label>
    <div style={{display:'grid',gap:8,marginTop:6}}><PrimaryBtn label={startAt ? 'Schedule room' : 'Create room'} fullWidth disabled={!canCreate} onClick={()=>{const id=actions.createRoom({title,topic,description,visibility,startAt,recording:true,replay:true,chat:true,gifts:true,whoCanSpeak:'Approved speakers'});actions.setActiveRoom(id);goTo('room-management')}}/><SecondaryBtn label="Save as draft" fullWidth onClick={()=>{const id=actions.createRoom({title:title||'Untitled room',topic:topic||'General',description,visibility,startAt:'',recording:true,replay:true,chat:true,gifts:true,whoCanSpeak:'Approved speakers'});actions.updateRoom(id,{status:'draft'});actions.setActiveRoom(id);goTo('room-management')}}/></div>
  </Card></Screen>
}

export function RoomManagementScreen({ goTo }: { goTo: GoTo }) {
  const { rooms, activeRoomId, actions } = useHost()
  const room=rooms.find(r=>r.id===activeRoomId) ?? rooms[0]
  if(!room) return <EmptyState icon={<Icon name="mic"/>} title="No rooms" message="Create your first room to begin hosting." action="Create room" onAction={()=>goTo('room-create')}/>
  return <Screen title="Room management" goTo={goTo}><Card style={{padding:18}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}><LiveBadge count={statusLabel(room.status)}/><span style={{fontSize:12,color:T.text2}}>{room.visibility}</span></div><div style={{fontSize:20,fontWeight:800,marginTop:10}}>{room.title}</div><div style={{color:T.text2,margin:'6px 0 16px'}}>{room.topic} · {room.startAt}</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>{room.status!=='live'&&room.status!=='ended'&&<PrimaryBtn label="Start room" onClick={()=>{actions.startRoom(room.id);goTo('live-console')}}/>}<SecondaryBtn label="Room settings" onClick={()=>goTo('room-settings')}/></div></Card>
    <SectionHeader title="Room controls"/><SettingsRow icon={<Icon name="users"/>} label="Participant management" onClick={()=>goTo('participant-management')}/><SettingsRow icon={<Icon name="calendar"/>} label="Schedule" onClick={()=>goTo('scheduling')}/><SettingsRow icon={<Icon name="flag"/>} label="Safety and reporting" onClick={()=>goTo('reporting')}/><SettingsRow icon={<Icon name="download"/>} label="Replay & recording" right={room.recording?'On':'Off'} />
  </Screen>
}

export function RoomSettingsScreen({ goTo }: { goTo: GoTo }) {
  const { rooms, activeRoomId, actions } = useHost(); const room=rooms.find(r=>r.id===activeRoomId) ?? rooms[0]
  const toggle=(key:'recording'|'replay'|'chat'|'gifts')=>actions.updateRoom(room.id,{[key]:!room[key]})
  return <Screen title="Room settings" goTo={goTo}><Card style={{padding:16}}><div style={{fontWeight:800,fontSize:18}}>{room.title}</div><div style={{color:T.text2,fontSize:12,marginTop:4}}>Room configuration applies to the active host room.</div></Card><SectionHeader title="Access"/><SettingsRow icon={<Icon name="eye"/>} label="Visibility" right={room.visibility}/><SettingsRow icon={<Icon name="mic"/>} label="Who can speak" right={room.whoCanSpeak}/><SectionHeader title="Experience"/><SettingsRow icon={<Icon name="download"/>} label="Recording" right={room.recording?'On':'Off'} onClick={()=>toggle('recording')}/><SettingsRow icon={<Icon name="play"/>} label="Replay" right={room.replay?'On':'Off'} onClick={()=>toggle('replay')}/><SettingsRow icon={<Icon name="users"/>} label="Chat" right={room.chat?'On':'Off'} onClick={()=>toggle('chat')}/><SettingsRow icon={<Icon name="gift"/>} label="Gifts" right={room.gifts?'On':'Off'} onClick={()=>toggle('gifts')}/></Screen>
}

export function LiveConsoleScreen({ goTo }: { goTo: GoTo }) {
  const { rooms, activeRoomId, participants, polls, quizzes, actions } = useHost(); const room=rooms.find(r=>r.id===activeRoomId) ?? rooms[0]; const [tab,setTab]=useState('Stage'); const [muted,setMuted]=useState(false)
  const speakers=participants.filter(p=>p.role==='Host'||p.role==='Co-host'||p.role==='Speaker').filter(p=>p.state!=='removed')
  return <Screen title="Live console" goTo={goTo} right={<LiveBadge count={statusLabel(room.status)}/>}><SubTabs tabs={['Stage','Chat','Tools']} active={tab} setActive={setTab}/>
    {tab==='Stage'&&<><Card style={{padding:16}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontWeight:800}}>{room.title}</div><div style={{color:T.text2,fontSize:12}}>{room.status==='live' ? `${room.audience.toLocaleString()} listening` : 'Room not live'}</div></div><AudioWaveform bars={18} height={36}/></div></Card><SectionHeader title="Speakers"/>{speakers.map(p=><PersonRow key={p.id} name={p.name} username={p.username} role={p.role} online={p.online} onClick={()=>goTo('moderation-actions')}/>) }<SectionHeader title="Host controls"/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}><SecondaryBtn label={muted?'Unmute':'Mute'} icon={<Icon name="mic"/>} onClick={()=>setMuted(v=>!v)}/><SecondaryBtn label="Pause" icon={<Icon name="pause"/>} onClick={()=>actions.pauseRoom(room.id)}/><SecondaryBtn label="End room" icon={<Icon name="close"/>} onClick={()=>actions.endRoom(room.id)}/><PrimaryBtn label="Room settings" onClick={()=>goTo('room-settings')}/></div></>}
    {tab==='Chat'&&<ConversationScreen goTo={goTo}/>} 
    {tab==='Tools'&&<><SettingsRow icon={<Icon name="plus"/>} label="Create poll" sub={`${polls.length} published`} onClick={()=>goTo('poll')}/><SettingsRow icon={<Icon name="check"/>} label="Create quiz" sub={`${quizzes.length} published`} onClick={()=>goTo('quiz')}/><SettingsRow icon={<Icon name="gift"/>} label="Gifts" onClick={()=>goTo('gifts')}/><SettingsRow icon={<Icon name="users"/>} label="Participants" onClick={()=>goTo('participant-management')}/><SettingsRow icon={<Icon name="flag"/>} label="Report / safety" onClick={()=>goTo('reporting')}/></>}
  </Screen>
}

export function SchedulingScreen({ goTo }: { goTo: GoTo }) { const { rooms, actions }=useHost(); const scheduled=rooms.filter(r=>r.status==='scheduled'||r.status==='draft'); return <Screen title="Scheduling" goTo={goTo} right={<IconBtn icon={<Icon name="plus"/>} onClick={()=>goTo('room-create')}/>} subtitle="Upcoming rooms, reminders and schedule changes.">{scheduled.length===0?<EmptyState icon={<Icon name="calendar"/>} title="No scheduled rooms" message="Create a room to put an event on your schedule." action="Create room" onAction={()=>goTo('room-create')}/>:scheduled.map(r=><Card key={r.id} style={{padding:16,marginBottom:10}}><div style={{display:'flex',justifyContent:'space-between'}}><div><div style={{fontWeight:800}}>{r.title}</div><div style={{color:T.text2,fontSize:12,marginTop:4}}>{r.startAt} · {r.visibility}</div></div><LiveBadge count={statusLabel(r.status)}/></div><div style={{display:'flex',gap:8,marginTop:12}}><PrimaryBtn label="Manage" onClick={()=>{actions.setActiveRoom(r.id);goTo('room-management')}}/><SecondaryBtn label="Cancel" onClick={()=>actions.endRoom(r.id)}/></div></Card>)}</Screen> }

export function ParticipantManagementScreen({ goTo }: { goTo: GoTo }) { const {participants}=useHost(); const active=participants.filter(p=>p.state!=='removed'); return <Screen title="Participants" goTo={goTo}><SearchField placeholder="Search participants..."/><SectionHeader title={`Speakers · ${active.filter(p=>p.role!=='Listener').length}`}/>{active.filter(p=>p.role!=='Listener').map(p=><PersonRow key={p.id} name={p.name} username={p.username} role={p.role} online={p.online} onClick={()=>goTo('moderation-actions')}/>) }<SectionHeader title={`Listeners · ${active.filter(p=>p.role==='Listener').length}`}/>{active.filter(p=>p.role==='Listener').map(p=><PersonRow key={p.id} name={p.name} username={p.username} role={p.role} online={p.online} onClick={()=>goTo('moderation-actions')}/>) }<PrimaryBtn label="Open moderation" fullWidth onClick={()=>goTo('moderation-actions')}/></Screen> }

export function ModerationActionsScreen({ goTo }: { goTo: GoTo }) { const {participants,actions}=useHost(); const [selected,setSelected]=useState(participants.find(p=>p.role==='Speaker')?.id ?? participants[0]?.id ?? ''); const p=participants.find(x=>x.id===selected); return <Screen title="Moderation" goTo={goTo}><Card style={{padding:16,display:'grid',gap:8}}><label style={{fontSize:12,color:T.text2}}>Participant<select value={selected} onChange={e=>setSelected(e.target.value)} style={{marginTop:6,width:'100%',height:44,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 10px'}}>{participants.filter(x=>x.state!=='removed').map(x=><option key={x.id} value={x.id}>{x.name} · {x.role}</option>)}</select></label>{p&&<><div style={{fontWeight:800,marginTop:8}}>{p.name}</div><div style={{fontSize:12,color:T.text2}}>{p.username} · {p.state}</div><SecondaryBtn label={p.state==='muted'?'Unmute':'Mute participant'} onClick={()=>actions.setParticipant(p.id,{state:p.state==='muted'?'active':'muted'})}/><SecondaryBtn label={p.state==='restricted'?'Remove restriction':'Restrict participant'} onClick={()=>actions.setParticipant(p.id,{state:p.state==='restricted'?'active':'restricted'})}/><SecondaryBtn label="Remove from room" onClick={()=>actions.setParticipant(p.id,{state:'removed'})}/><SecondaryBtn label="Report participant" onClick={()=>goTo('reporting')}/></>}</Card></Screen> }

export function PollScreen({ goTo }: { goTo: GoTo }) { const {actions}=useHost(); const [question,setQuestion]=useState(''); const [options,setOptions]=useState(['','']); const update=(i:number,v:string)=>setOptions(o=>o.map((x,n)=>n===i?v:x)); return <Screen title="Create poll" goTo={goTo}><Card style={{padding:18,display:'grid',gap:10}}><label style={{fontSize:12,color:T.text2}}>Question<input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask your audience..." style={{display:'block',marginTop:6,width:'100%',height:48,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 12px'}}/></label>{options.map((o,i)=><label key={i} style={{fontSize:12,color:T.text2}}>Option {i+1}<input value={o} onChange={e=>update(i,e.target.value)} style={{display:'block',marginTop:6,width:'100%',height:44,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 12px'}}/></label>)}<SecondaryBtn label="Add option" onClick={()=>setOptions(o=>[...o,''])}/><PrimaryBtn label="Publish poll" fullWidth disabled={!question.trim()||options.filter(Boolean).length<2} onClick={()=>{actions.publishPoll(question,options.filter(Boolean));goTo('live-console')}}/></Card></Screen> }

export function QuizScreen({ goTo }: { goTo: GoTo }) { const {actions}=useHost(); const [question,setQuestion]=useState(''); const [correct,setCorrect]=useState(''); const [options,setOptions]=useState(['','']); const update=(i:number,v:string)=>setOptions(o=>o.map((x,n)=>n===i?v:x)); return <Screen title="Create quiz" goTo={goTo}><Card style={{padding:18,display:'grid',gap:10}}><label style={{fontSize:12,color:T.text2}}>Question<input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask a multiple-choice question..." style={{display:'block',marginTop:6,width:'100%',height:48,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 12px'}}/></label>{options.map((o,i)=><label key={i} style={{fontSize:12,color:T.text2}}>Option {i+1}<input value={o} onChange={e=>update(i,e.target.value)} style={{display:'block',marginTop:6,width:'100%',height:44,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 12px'}}/></label>)}<label style={{fontSize:12,color:T.text2}}>Correct answer<select value={correct} onChange={e=>setCorrect(e.target.value)} style={{display:'block',marginTop:6,width:'100%',height:44,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 12px'}}><option value="">Choose answer</option>{options.filter(Boolean).map(o=><option key={o}>{o}</option>)}</select></label><PrimaryBtn label="Publish quiz" fullWidth disabled={!question.trim()||!correct||options.filter(Boolean).length<2} onClick={()=>{actions.publishQuiz(question,correct,options.filter(Boolean));goTo('live-console')}}/></Card></Screen> }

export function HostVerificationScreen({ goTo }: { goTo: GoTo }) { const {verificationStep,verified,actions}=useHost(); const labels=['Identity','Profile & safety','Final review']; return <Screen title="Host verification" goTo={goTo} subtitle="Verification controls access to host capabilities and safety-sensitive tools."><Card style={{padding:18}}><ProgressBar value={verificationStep} max={3}/><div style={{fontWeight:800,marginTop:14}}>{verified?'Verified host':`${verificationStep} of 3 steps complete`}</div><div style={{display:'grid',gap:8,margin:'16px 0'}}>{labels.map((x,i)=><div key={x} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:`1px solid ${T.border}`}}><span>{i<verificationStep?'✓ ':''}{x}</span><span style={{color:T.text2,fontSize:12}}>{i<verificationStep?'Complete':'Pending'}</span></div>)}</div>{!verified&&<PrimaryBtn label={verificationStep===2?'Submit final review':'Continue verification'} fullWidth onClick={actions.advanceVerification}/>}</Card></Screen> }

export function ReportingScreen({ goTo }: { goTo: GoTo }) { const [reason,setReason]=useState('Harassment or abuse'); const [details,setDetails]=useState(''); return <Screen title="Report" goTo={goTo}><Card style={{padding:18,display:'grid',gap:10}}><div style={{fontWeight:800}}>Safety report</div><label style={{fontSize:12,color:T.text2}}>Reason<select value={reason} onChange={e=>setReason(e.target.value)} style={{display:'block',marginTop:6,width:'100%',height:46,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 12px'}}>{['Harassment or abuse','Spam or scams','Unsafe content','Impersonation','Other'].map(x=><option key={x}>{x}</option>)}</select></label><label style={{fontSize:12,color:T.text2}}>Details<textarea value={details} onChange={e=>setDetails(e.target.value)} placeholder="Add context for the safety team" style={{display:'block',marginTop:6,width:'100%',minHeight:110,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:12,resize:'vertical'}}/></label><PrimaryBtn label="Submit report" fullWidth onClick={()=>goTo('report-confirmation')}/></Card></Screen> }
export function ReportConfirmationScreen({ goTo }: { goTo: GoTo }) { return <StateScreen title="Report submitted" message="Thank you. Our safety team will review the report and take action according to VoiceCloud policy." icon="check" primary="Done" goTo={goTo} target="host-studio" /> }

export function GiftsScreen({ goTo }: { goTo: GoTo }) {
  const gifts = [
    { emoji: '💎', name: 'Diamond', cost: 500 },
    { emoji: '🌟', name: 'Star', cost: 50 },
    { emoji: '🎵', name: 'Note', cost: 30 },
    { emoji: '🚀', name: 'Rocket', cost: 200 },
    { emoji: '💜', name: 'Heart', cost: 20 },
    { emoji: '🔥', name: 'Fire', cost: 80 },
    { emoji: '🎁', name: 'Gift', cost: 100 },
    { emoji: '🌈', name: 'Rainbow', cost: 150 },
  ]
  return <Screen title="Gifts" goTo={goTo} subtitle="Choose a gift to send in a live room.">
    <WalletBalance amount={2480} />
    <SectionHeader title="Gift collection" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
      {gifts.map(g => <GiftTile key={g.name} {...g} onSend={() => goTo('room-preview')} />)}
    </div>
  </Screen>
}

export function VipScreen({ goTo }: { goTo: GoTo }) { return <Screen title="VIP" goTo={goTo}><Card style={{padding:20}}><div style={{fontSize:28,fontWeight:800}}>VIP Lounge</div><div style={{color:T.text2,margin:'6px 0 18px'}}>Unlock premium profile and community perks.</div><PrimaryBtn label="Explore VIP" fullWidth/></Card><SectionHeader title="Benefits"/><SettingsRow icon={<Icon name="check"/>} label="Premium profile treatment"/><SettingsRow icon={<Icon name="gift"/>} label="Exclusive gifts"/><SettingsRow icon={<Icon name="users"/>} label="VIP community access"/></Screen> }
export function StoreScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Store" goTo={goTo}><SubTabs tabs={['Featured','Gifts','Inventory']} active="Featured" setActive={()=>{}}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>{['Premium Badge','Golden Mic','Spotlight','Creator Gift'].map((x,i)=><GiftTile key={x} emoji="" name={x} cost={[120,240,400,800][i]}/>)}</div></Screen> }
export function TasksScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Tasks & achievements" goTo={goTo}><Card style={{padding:18}}><div style={{display:'flex',justifyContent:'space-between'}}><div><div style={{fontSize:12,color:T.text2}}>XP</div><div style={{fontSize:28,fontWeight:800}}>2,480</div></div><div style={{textAlign:'right'}}><div style={{fontSize:12,color:T.text2}}>Level</div><div style={{fontWeight:800}}>12</div></div></div><ProgressBar value={68} max={100}/></Card><SectionHeader title="Tasks"/><SettingsRow icon={<Icon name="check"/>} label="Join 3 live rooms" sub="2 / 3 complete"/><SettingsRow icon={<Icon name="users"/>} label="Follow 5 creators" sub="4 / 5 complete"/><SettingsRow icon={<Icon name="calendar"/>} label="Attend an event" sub="Complete today"/></Screen> }
export function CheckInScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Daily check-in" goTo={goTo}><Card style={{padding:20,textAlign:'center'}}><div style={{fontSize:26,fontWeight:800}}>7 day streak</div><div style={{color:T.text2,margin:'8px 0 20px'}}>Check in today to keep your streak and earn XP.</div><PrimaryBtn label="Check in" fullWidth onClick={()=>goTo('tasks')}/></Card></Screen> }
export function ReferralsScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Referrals" goTo={goTo}><Card style={{padding:20}}><div style={{fontSize:24,fontWeight:800}}>Invite your people</div><div style={{color:T.text2,margin:'6px 0 18px'}}>Share your referral code and earn rewards when friends join.</div><div style={{height:52,borderRadius:14,background:T.surface,display:'grid',placeItems:'center',fontWeight:800,letterSpacing:2,marginBottom:12}}>VC-7H4K9</div><PrimaryBtn label="Share referral" fullWidth/></Card></Screen> }
export function ScheduledTicketsScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Room tickets" goTo={goTo}><EmptyState icon={<Icon name="calendar"/>} title="No tickets yet" message="Tickets for eligible scheduled rooms will appear here." action="Explore events" onAction={()=>goTo('events')}/></Screen> }

export function EditProfileScreen({ goTo }: { goTo: GoTo }) { return <FormScreen title="Edit profile" goTo={goTo} fields={['Name','Username','Bio','Website']} action="Save changes" onAction={()=>goTo('my-profile')} /> }
export function ReplayPlayerScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Replay" goTo={goTo}><Card style={{padding:0,overflow:'hidden'}}><div style={{height:220,display:'grid',placeItems:'center',background:'linear-gradient(145deg,#151922,#0b0e14)'}}><IconBtn icon={<Icon name="play"/>} size={56}/></div><div style={{padding:16}}><div style={{fontWeight:800,fontSize:18}}>Building in Public</div><div style={{color:T.text2,fontSize:12,marginTop:4}}>Alex Carter · 42 min</div></div></Card><ProgressBar value={32} max={100}/></Screen> }
export function VisitorsScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Profile visitors" goTo={goTo}><PersonRow name="Maya Singh" username="@maya" online/><PersonRow name="Jordan Lee" username="@jordan"/><PersonRow name="Taylor Kim" username="@taylor" online/></Screen> }
export function BlockedUsersScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Blocked users" goTo={goTo}><PersonRow name="Chris Morgan" username="@chris"/><PersonRow name="Riley Chen" username="@riley"/><EmptyState icon={<Icon name="shield"/>} title="Blocking is private" message="Blocked people cannot view or interact with your profile according to your privacy settings." /></Screen> }

export function NotificationPreferencesScreen({ goTo }: { goTo: GoTo }) { return <SettingsPage title="Notification preferences" goTo={goTo} rows={['Live rooms you follow','Messages','Mentions and replies','Community activity','Events','Creator updates']} toggles /> }
export function PrivacyScreen({ goTo }: { goTo: GoTo }) { return <SettingsPage title="Privacy" goTo={goTo} rows={['Profile visibility','Who can message you','Who can follow you','Activity visibility','Blocked users']} /> }
export function VoiceAppearanceScreen({ goTo }: { goTo: GoTo }) { return <SettingsPage title="Voice & appearance" goTo={goTo} rows={['Theme','Reduced motion','Audio quality','Captions','Sound effects']} /> }
export function SecurityScreen({ goTo }: { goTo: GoTo }) { return <SettingsPage title="Security" goTo={goTo} rows={['Password','Two-step verification','Login alerts','Passkeys']} /> }
export function SessionsScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Sessions & devices" goTo={goTo}><Card style={{padding:16}}><div style={{fontWeight:800}}>This device</div><div style={{color:T.text2,fontSize:12,marginTop:4}}>Windows · Active now</div></Card><SectionHeader title="Other sessions"/><SettingsRow icon={<Icon name="user"/>} label="Android phone" sub="Last active 2 hours ago" right="Sign out"/><SettingsRow icon={<Icon name="user"/>} label="Chrome browser" sub="Last active yesterday" right="Sign out"/></Screen> }
export function LoginActivityScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Login activity" goTo={goTo}><NotificationRow icon={<Icon name="lock"/>} title="New sign-in" body="Windows · Chrome" time="Now" unread/><NotificationRow icon={<Icon name="lock"/>} title="Successful sign-in" body="Android" time="Yesterday"/></Screen> }
export function SafetyCenterScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Safety Center" goTo={goTo}><Card style={{padding:18}}><div style={{fontSize:22,fontWeight:800}}>Stay in control</div><div style={{color:T.text2,marginTop:6,lineHeight:1.5}}>Manage privacy, reporting and interaction controls from one place.</div></Card><SettingsRow icon={<Icon name="shield"/>} label="Privacy" onClick={()=>goTo('privacy')}/><SettingsRow icon={<Icon name="flag"/>} label="Reporting" onClick={()=>goTo('reporting')}/><SettingsRow icon={<Icon name="lock"/>} label="Blocked users" onClick={()=>goTo('blocked-users')}/></Screen> }
export function SupportScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Support" goTo={goTo}><SettingsRow icon={<Icon name="help"/>} label="Help Center"/><SettingsRow icon={<Icon name="user"/>} label="Contact support"/><SettingsRow icon={<Icon name="shield"/>} label="Safety Center" onClick={()=>goTo('safety-center')}/></Screen> }
export function CmsContentScreen({ goTo, kind }: { goTo: GoTo; kind: string }) { return <Screen title={kind} goTo={goTo}><Card style={{padding:18}}><div style={{fontWeight:800,marginBottom:8}}>{kind}</div><div style={{color:T.text2,lineHeight:1.6}}>This content area is designed for managed VoiceCloud content while preserving the same presentation language as the rest of the product.</div></Card></Screen> }

export function CreatorLiveStudioScreen({ goTo }: { goTo: GoTo }) { const { rooms, activeRoomId, actions, participants }=useHost(); const room=rooms.find(r=>r.id===activeRoomId)||rooms[0]; return <Screen title="Creator Live Studio" goTo={goTo} right={<LiveBadge count={room.status==='live'?'LIVE':'READY'}/>}><Card style={{padding:18}}><div style={{fontSize:24,fontWeight:800}}>{room.status==='live'?room.title:'Go live with your audience'}</div><div style={{color:T.text2,margin:'6px 0 18px'}}>{room.status==='live'?`${room.audience.toLocaleString()} listeners · ${participants.filter(p=>p.online).length} active participants`:'Configure your room, stage and audience before starting.'}</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}><PrimaryBtn label={room.status==='live'?'Open console':'Start live room'} onClick={()=>{actions.startRoom(room.id);goTo('live-console')}}/><SecondaryBtn label="Manage room" onClick={()=>goTo('room-management')}/></div></Card><SectionHeader title="Studio tools"/><SettingsRow icon={<Icon name="mic"/>} label="Stage setup" sub="Speaker permissions and room audio" onClick={()=>goTo('room-settings')}/><SettingsRow icon={<Icon name="users"/>} label="Audience controls" sub="Participants and moderation" onClick={()=>goTo('participant-management')}/><SettingsRow icon={<Icon name="gift"/>} label="Gifts and interactions" onClick={()=>goTo('gifts')}/><SettingsRow icon={<Icon name="chart"/>} label="Live analytics" onClick={()=>goTo('creator-analytics')}/></Screen> }
export function CreatorProfileScreen({ goTo }: { goTo: GoTo }) { const {hostProfile,actions}=useHost(); const [editing,setEditing]=useState(false); const [name,setName]=useState(hostProfile.displayName); const [bio,setBio]=useState(hostProfile.bio); return <Screen title="Creator profile" goTo={goTo}><ProfileHeader name={hostProfile.displayName} username={hostProfile.handle} bio={hostProfile.bio} photo="" followers="128K" following="842" replays="36" verified onMessage={()=>goTo('creator-messages')}/>{editing?<Card style={{padding:16,display:'grid',gap:10}}><input value={name} onChange={e=>setName(e.target.value)} style={{height:46,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 12px'}}/><textarea value={bio} onChange={e=>setBio(e.target.value)} style={{minHeight:90,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:12}}/><PrimaryBtn label="Save profile" fullWidth onClick={()=>{actions.updateHostProfile({displayName:name,bio});setEditing(false)}}/></Card>:<PrimaryBtn label="Edit creator profile" fullWidth onClick={()=>setEditing(true)}/>}</Screen> }
export function CreatorSettingsScreen({ goTo }: { goTo: GoTo }) { const {settings,actions}=useHost(); return <Screen title="Creator settings" goTo={goTo}><SectionHeader title="Live defaults"/><SettingsRow icon={<Icon name="download"/>} label="Recording" right={settings.recording?'On':'Off'} onClick={()=>actions.updateSettings({recording:!settings.recording})}/><SettingsRow icon={<Icon name="play"/>} label="Replay" right={settings.replay?'On':'Off'} onClick={()=>actions.updateSettings({replay:!settings.replay})}/><SettingsRow icon={<Icon name="users"/>} label="Chat" right={settings.chat?'On':'Off'} onClick={()=>actions.updateSettings({chat:!settings.chat})}/><SettingsRow icon={<Icon name="gift"/>} label="Gifts" right={settings.gifts?'On':'Off'} onClick={()=>actions.updateSettings({gifts:!settings.gifts})}/><SectionHeader title="Account"/><SettingsRow icon={<Icon name="user"/>} label="Creator profile" onClick={()=>goTo('creator-profile')}/><SettingsRow icon={<Icon name="check"/>} label="Verification" onClick={()=>goTo('creator-verification')}/><SettingsRow icon={<Icon name="wallet"/>} label="Payout settings" onClick={()=>goTo('creator-payouts')}/></Screen> }
export function CreatorHelpScreen({ goTo }: { goTo: GoTo }) { return <SupportScreen goTo={goTo}/> }
export function CreatorAudienceScreen({ goTo }: { goTo: GoTo }) { const {participants}=useHost(); return <Screen title="Audience" goTo={goTo}><SubTabs tabs={['Overview','Followers','Subscribers']} active="Overview" setActive={()=>{}}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><StatCard label="Followers" value="128K" delta="+4.2%" icon={<Icon name="users"/>}/><StatCard label="Subscribers" value="3.8K" delta="+7.1%" icon={<Icon name="users"/>}/></div><SectionHeader title="Live audience"/>{participants.filter(p=>p.role==='Listener').map(p=><PersonRow key={p.id} name={p.name} username={p.username} role={p.role} online={p.online} onClick={()=>goTo('moderation-actions')}/>)}</Screen> }
export function CreatorSubscribersScreen({ goTo }: { goTo: GoTo }) { const [subscribers,setSubscribers]=useState(['Maya Singh','Jordan Lee','Taylor Kim']); return <Screen title="Subscribers" goTo={goTo}><div style={{display:'grid',gap:8}}>{subscribers.map(name=><PersonRow key={name} name={name} username={`@${name.split(' ')[0].toLowerCase()}`} role="Subscriber" onClick={()=>setSubscribers(s=>s)}/>)}</div></Screen> }
export function CreatorPlansScreen({ goTo }: { goTo: GoTo }) { const [enabled,setEnabled]=useState(true); const [price,setPrice]=useState('9.99'); return <Screen title="Plans" goTo={goTo}><Card style={{padding:18}}><div style={{display:'flex',justifyContent:'space-between'}}><div><div style={{fontSize:20,fontWeight:800}}>Creator Plus</div><div style={{color:T.text2,marginTop:4}}>Monthly supporter plan</div></div><button onClick={()=>setEnabled(v=>!v)} style={{border:0,borderRadius:20,padding:'6px 10px',background:enabled?T.primary:T.surface2,color:T.text}}>{enabled?'Active':'Off'}</button></div><label style={{display:'grid',gap:6,fontSize:12,color:T.text2,marginTop:16}}>Monthly price<input value={price} onChange={e=>setPrice(e.target.value)} style={{height:44,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 12px'}}/></label><PrimaryBtn label="Save plan" fullWidth onClick={()=>{}}/></Card></Screen> }
export function CreatorMessagesScreen({ goTo }: { goTo: GoTo }) { return <MessagesScreen goTo={goTo}/> }
export function CreatorConversationsScreen({ goTo }: { goTo: GoTo }) { return <ConversationScreen goTo={goTo}/> }
export function CreatorAnalyticsScreen({ goTo }: { goTo: GoTo }) { const {rooms,participants}=useHost(); const live=rooms.find(r=>r.status==='live'); return <Screen title="Analytics" goTo={goTo}><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><StatCard label="Listeners" value={live?live.audience.toLocaleString():'42.8K'} delta="+12%" icon={<Icon name="users"/>}/><StatCard label="Active speakers" value={String(participants.filter(p=>p.role!=='Listener'&&p.state!=='removed').length)} icon={<Icon name="mic"/>}/><StatCard label="Minutes" value="18.4K" delta="+8%" icon={<Icon name="chart"/>}/><StatCard label="Rooms" value={String(rooms.length)} icon={<Icon name="calendar"/>}/></div><SectionHeader title="Performance"/><Card style={{padding:18}}><div style={{fontWeight:800,marginBottom:14}}>Last 30 days</div><AudioWaveform bars={32} height={80}/></Card></Screen> }
export function CreatorWalletScreen({ goTo }: { goTo: GoTo }) { const {earnings}=useHost(); return <Screen title="Creator wallet" goTo={goTo}><WalletBalance amount={earnings.available}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:10}}><StatCard label="Pending" value={`$${earnings.pending.toLocaleString()}`} icon={<Icon name="wallet"/>}/><StatCard label="Lifetime" value={`$${earnings.total.toLocaleString()}`} icon={<Icon name="chart"/>}/></div><SectionHeader title="Wallet tools"/><SettingsRow icon={<Icon name="wallet"/>} label="Earnings" onClick={()=>goTo('creator-earnings')}/><SettingsRow icon={<Icon name="download"/>} label="Payouts" onClick={()=>goTo('creator-payouts')}/></Screen> }
export function CreatorEarningsScreen({ goTo }: { goTo: GoTo }) { const {earnings}=useHost(); return <Screen title="Earnings" goTo={goTo}><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><StatCard label="Available" value={`$${earnings.available.toLocaleString()}`} delta="+14%" icon={<Icon name="wallet"/>}/><StatCard label="Pending" value={`$${earnings.pending.toLocaleString()}`} icon={<Icon name="wallet"/>}/></div><SectionHeader title="Sources"/><SettingsRow icon={<Icon name="gift"/>} label="Gifts" right="$2,480"/><SettingsRow icon={<Icon name="users"/>} label="Subscriptions" right="$1,800"/><SettingsRow icon={<Icon name="chart"/>} label="Lifetime earnings" right={`$${earnings.total.toLocaleString()}`}/></Screen> }
export function CreatorGiftsScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Creator gifts" goTo={goTo}><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><GiftTile emoji="" name="Golden Mic" cost={120} onSend={()=>goTo('gifts')}/><GiftTile emoji="" name="Spotlight" cost={240} onSend={()=>goTo('gifts')}/><GiftTile emoji="" name="Stage Crown" cost={480} onSend={()=>goTo('gifts')}/><GiftTile emoji="" name="Creator Star" cost={960} onSend={()=>goTo('gifts')}/></div></Screen> }
export function CreatorPayoutsScreen({ goTo }: { goTo: GoTo }) { const {earnings,actions}=useHost(); const [amount,setAmount]=useState('100'); const value=Number(amount)||0; return <Screen title="Payouts" goTo={goTo} right={<IconBtn icon={<Icon name="plus"/>}/>}><Card style={{padding:16}}><div style={{fontWeight:800}}>Primary payout account</div><div style={{color:T.text2,fontSize:12,marginTop:4}}>Bank account · •••• 4821</div><label style={{display:'grid',gap:6,fontSize:12,color:T.text2,marginTop:14}}>Request amount<input value={amount} onChange={e=>setAmount(e.target.value)} style={{height:44,borderRadius:12,border:`1px solid ${T.border}`,background:T.surface,color:T.text,padding:'0 12px'}}/></label><PrimaryBtn label="Request payout" fullWidth disabled={value<=0||value>earnings.available} onClick={()=>actions.requestPayout(value)}/></Card><SectionHeader title="Recent payouts"/><SettingsRow icon={<Icon name="check"/>} label="Sep 12 · Completed" right="$2,400" onClick={()=>goTo('payout-details')}/></Screen> }
export function PayoutDetailsScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Payout details" goTo={goTo}><Card style={{padding:18}}><div style={{color:T.text2,fontSize:12}}>Amount</div><div style={{fontSize:32,fontWeight:800,margin:'4px 0 12px'}}>$2,400</div><SettingsRow icon={<Icon name="check"/>} label="Status" right="Completed"/><SettingsRow icon={<Icon name="calendar"/>} label="Date" right="Sep 12"/><SettingsRow icon={<Icon name="wallet"/>} label="Destination" right="•••• 4821"/></Card></Screen> }
export function CreatorNotificationsScreen({ goTo }: { goTo: GoTo }) { return <NotificationsScreen goTo={goTo}/> }
export function CreatorVerificationScreen({ goTo }: { goTo: GoTo }) { const {verificationStep,verified,actions}=useHost(); return <Screen title="Creator verification" goTo={goTo}><Card style={{padding:18}}><ProgressBar value={verificationStep} max={3}/><div style={{fontWeight:800,marginTop:14}}>{verified?'Verified creator':'Verification in progress'}</div><div style={{color:T.text2,marginTop:6}}>{verified?'Your creator account is verified.':'Complete host verification to unlock all creator capabilities.'}</div>{!verified&&<PrimaryBtn label="Continue verification" fullWidth onClick={()=>{actions.advanceVerification();goTo('host-verification')}}/>}</Card></Screen> }

export function RankingsScreen({ goTo }: { goTo: GoTo }) {
  return <Screen title="Rankings" goTo={goTo} subtitle="See how the community is progressing this week.">
    <SubTabs tabs={['Global', 'Creators', 'Friends']} active="Global" setActive={() => {}} />
    <Card style={{ padding: 18, marginTop: 12 }}>
      <div style={{ fontSize: 13, color: T.text3, marginBottom: 12 }}>This week</div>
      {[
        { rank: 1, name: 'Sarah Chen', score: '12,400 XP', photo: 'photo-1494790108377-be9c29b29330' },
        { rank: 2, name: 'Alex Carter', score: '10,200 XP', photo: 'photo-1507003211169-0a1dd7228f2d' },
        { rank: 3, name: 'James Park', score: '9,800 XP', photo: 'photo-1472099645785-5658abf4ff4e' },
        { rank: 4, name: 'Priya Sharma', score: '8,950 XP', photo: 'photo-1500648767791-00dcc994a43e' },
      ].map(r => <RankingRow key={r.rank} rank={r.rank} name={r.name} score={r.score} photo={`https://images.unsplash.com/${r.photo}?w=40&h=40&fit=crop`} />)}
    </Card>
  </Screen>
}

export function LiveConnectedScreen({ goTo }: { goTo: GoTo }) { return <StateScreen title="Connected" message="You're connected to the room." icon="mic" primary="Enter room" goTo={goTo} target="live-room"/> }
export function LiveMutedScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Live room" goTo={goTo}><Card style={{padding:18,textAlign:'center'}}><div style={{width:84,height:84,borderRadius:42,margin:'0 auto 12px',background:T.surface,display:'grid',placeItems:'center'}}><Icon name="mic" size={32}/></div><div style={{fontSize:20,fontWeight:800}}>You are muted</div><div style={{color:T.text2,margin:'6px 0 18px'}}>Unmute when you're ready to speak.</div><PrimaryBtn label="Unmute" fullWidth onClick={()=>goTo('live-room')}/></Card></Screen> }
export function LiveNotSpeakingScreen({ goTo }: { goTo: GoTo }) { return <Screen title="Live room" goTo={goTo}><Card style={{padding:18,textAlign:'center'}}><AudioWaveform bars={18} height={44} active={false}/><div style={{fontSize:20,fontWeight:800,marginTop:16}}>Not speaking</div><div style={{color:T.text2,margin:'6px 0 18px'}}>Your microphone is ready when you are.</div><SecondaryBtn label="Raise hand" fullWidth onClick={()=>goTo('speaker-request')}/></Card></Screen> }

function SettingsPage({ title, goTo, rows, toggles=false }: { title:string; goTo:GoTo; rows:string[]; toggles?:boolean }) {
  const targets: Record<string, string> = {
    'Creator profile': 'creator-profile',
    'Live preferences': 'voice-appearance',
    'Audience controls': 'creator-audience',
    'Verification': 'creator-verification',
    'Payout settings': 'creator-payouts',
    'Creator notifications': 'creator-notifications',
    'Room visibility': 'room-settings',
    'Who can speak': 'participant-management',
    'Recording and replay': 'replay-player',
    'Chat permissions': 'live-console',
    'Gift permissions': 'gifts',
    'Moderation rules': 'moderation-actions',
    'Profile': 'edit-profile',
    'Security': 'security',
    'Sessions': 'sessions',
  }
  return <Screen title={title} goTo={goTo}>{rows.map((r,i)=><SettingsRow key={r} icon={<Icon name={i%2?'shield':'gear'}/>} label={r} right={toggles ? <div style={{width:40,height:24,borderRadius:12,background:i<2?T.primary:T.surface2}}/> : undefined} onClick={() => targets[r] && goTo(targets[r])}/>)}</Screen>
}

