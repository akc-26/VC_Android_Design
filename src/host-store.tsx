import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type RoomStatus = 'draft' | 'scheduled' | 'live' | 'paused' | 'ended'
export type ParticipantRole = 'Host' | 'Co-host' | 'Speaker' | 'Listener'
export type ParticipantState = 'active' | 'muted' | 'restricted' | 'removed'

export type HostRoom = {
  id: string
  title: string
  topic: string
  description: string
  visibility: 'Public' | 'Followers' | 'Invite only'
  status: RoomStatus
  startAt: string
  audience: number
  recording: boolean
  replay: boolean
  chat: boolean
  gifts: boolean
  whoCanSpeak: 'Host only' | 'Approved speakers' | 'Anyone'
}

export type HostParticipant = {
  id: string
  name: string
  username: string
  role: ParticipantRole
  state: ParticipantState
  online: boolean
}

export type Poll = { id: string; question: string; options: string[]; published: boolean }
export type Quiz = { id: string; question: string; correct: string; options: string[]; published: boolean }

export type HostState = {
  rooms: HostRoom[]
  activeRoomId: string
  participants: HostParticipant[]
  polls: Poll[]
  quizzes: Quiz[]
  verificationStep: number
  verified: boolean
  hostProfile: { displayName: string; handle: string; bio: string; avatar: string }
  earnings: { available: number; pending: number; total: number }
  settings: { recording: boolean; replay: boolean; chat: boolean; gifts: boolean; notifications: boolean }
  actions: {
    createRoom: (room: Omit<HostRoom, 'id' | 'status' | 'audience'>) => string
    updateRoom: (id: string, patch: Partial<HostRoom>) => void
    startRoom: (id: string) => void
    pauseRoom: (id: string) => void
    endRoom: (id: string) => void
    setActiveRoom: (id: string) => void
    addParticipant: (participant: Omit<HostParticipant, 'id'>) => void
    setParticipant: (id: string, patch: Partial<HostParticipant>) => void
    publishPoll: (question: string, options: string[]) => void
    publishQuiz: (question: string, correct: string, options: string[]) => void
    advanceVerification: () => void
    updateHostProfile: (patch: Partial<HostState['hostProfile']>) => void
    updateSettings: (patch: Partial<HostState['settings']>) => void
    requestPayout: (amount: number) => void
  }
}

const seedRooms: HostRoom[] = [
  { id: 'room-1', title: 'Founder Stories: Building in Public', topic: 'Startups', description: 'A weekly founder conversation.', visibility: 'Public', status: 'scheduled', startAt: 'Today · 8:00 PM', audience: 1200, recording: true, replay: true, chat: true, gifts: true, whoCanSpeak: 'Approved speakers' },
  { id: 'room-2', title: 'Creator Clinic', topic: 'Creator growth', description: 'Practical creator Q&A.', visibility: 'Followers', status: 'scheduled', startAt: 'Fri · 7:30 PM', audience: 842, recording: true, replay: true, chat: true, gifts: true, whoCanSpeak: 'Approved speakers' },
]
const seedParticipants: HostParticipant[] = [
  { id: 'p1', name: 'Alex Carter', username: '@alex', role: 'Host', state: 'active', online: true },
  { id: 'p2', name: 'Maya Singh', username: '@maya', role: 'Speaker', state: 'active', online: true },
  { id: 'p3', name: 'Jordan Lee', username: '@jordan', role: 'Speaker', state: 'active', online: true },
  { id: 'p4', name: 'Sam Wilson', username: '@sam', role: 'Listener', state: 'active', online: true },
  { id: 'p5', name: 'Taylor Kim', username: '@taylor', role: 'Listener', state: 'active', online: false },
]

const HostContext = createContext<HostState | null>(null)

export function HostProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState(seedRooms)
  const [activeRoomId, setActiveRoomId] = useState('room-1')
  const [participants, setParticipants] = useState(seedParticipants)
  const [polls, setPolls] = useState<Poll[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [verificationStep, setVerificationStep] = useState(2)
  const [hostProfile, setHostProfile] = useState({ displayName: 'Alex Carter', handle: '@alex', bio: 'Building products, hosting conversations.', avatar: '' })
  const [earnings, setEarnings] = useState({ available: 8420, pending: 860, total: 42800 })
  const [settings, setSettings] = useState({ recording: true, replay: true, chat: true, gifts: true, notifications: true })

  const actions = useMemo<HostState['actions']>(() => ({
    createRoom: (room) => {
      const id = `room-${Date.now()}`
      setRooms(current => [...current, { ...room, id, status: room.startAt ? 'scheduled' : 'draft', audience: 0 }])
      setActiveRoomId(id)
      return id
    },
    updateRoom: (id, patch) => setRooms(current => current.map(room => room.id === id ? { ...room, ...patch } : room)),
    startRoom: (id) => setRooms(current => current.map(room => room.id === id ? { ...room, status: 'live', startAt: 'Live now' } : room)),
    pauseRoom: (id) => setRooms(current => current.map(room => room.id === id ? { ...room, status: 'paused' } : room)),
    endRoom: (id) => setRooms(current => current.map(room => room.id === id ? { ...room, status: 'ended' } : room)),
    setActiveRoom: setActiveRoomId,
    addParticipant: (participant) => setParticipants(current => [...current, { ...participant, id: `p-${Date.now()}` }]),
    setParticipant: (id, patch) => setParticipants(current => current.map(p => p.id === id ? { ...p, ...patch } : p)),
    publishPoll: (question, options) => setPolls(current => [...current, { id: `poll-${Date.now()}`, question, options, published: true }]),
    publishQuiz: (question, correct, options) => setQuizzes(current => [...current, { id: `quiz-${Date.now()}`, question, correct, options, published: true }]),
    advanceVerification: () => setVerificationStep(step => Math.min(3, step + 1)),
    updateHostProfile: (patch) => setHostProfile(current => ({ ...current, ...patch })),
    updateSettings: (patch) => setSettings(current => ({ ...current, ...patch })),
    requestPayout: (amount) => setEarnings(current => ({ ...current, available: Math.max(0, current.available - amount), pending: current.pending + amount })),
  }), [])

  const value = useMemo<HostState>(() => ({ rooms, activeRoomId, participants, polls, quizzes, verificationStep, verified: verificationStep >= 3, hostProfile, earnings, settings, actions }), [rooms, activeRoomId, participants, polls, quizzes, verificationStep, hostProfile, earnings, settings, actions])
  return <HostContext.Provider value={value}>{children}</HostContext.Provider>
}

export function useHost() {
  const value = useContext(HostContext)
  if (!value) throw new Error('useHost must be used inside HostProvider')
  return value
}
