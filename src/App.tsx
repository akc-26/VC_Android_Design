import { useState } from 'react'
import { HostProvider } from './host-store'
import { T, StatusBar, BottomNav, type NavTab } from './ds'

// Screen imports — Main
import { SplashScreen, OnboardingScreen, HomeScreen, ExploreScreen, MessagesScreen, MyProfileScreen, EconomyScreen, CreatorScreen, SettingsScreen } from './screens-main'

// Screen imports — Phase A (Discovery)
import { RoomsScreen, PeopleScreen, CreatorsScreen, SearchScreen, CommunitySearchScreen, PublicProfileScreen, FollowersScreen } from './screens-discovery'

// Screen imports — Phase B (Social)
import { CommunitiesScreen, CommunityDetailScreen, CommunityCreateScreen, CommunityManageScreen, CommunityMembersScreen, EventsScreen, EventDetailScreen, ConversationScreen, NotificationsScreen } from './screens-social'

// Screen imports — Phase C (Live Audio)

import {
  SignInScreen, RegisterScreen, OtpScreen, ForgotPasswordScreen, ResetPasswordScreen, GuestUpgradeScreen, SessionExpiredScreen,
  HostStudioScreen, RoomCreateScreen, RoomManagementScreen, RoomSettingsScreen, LiveConsoleScreen, SchedulingScreen, ParticipantManagementScreen, ModerationActionsScreen, PollScreen, QuizScreen, HostVerificationScreen, ReportingScreen, ReportConfirmationScreen,
  VipScreen, StoreScreen, TasksScreen, CheckInScreen, ReferralsScreen, ScheduledTicketsScreen, EditProfileScreen, ReplayPlayerScreen, VisitorsScreen, BlockedUsersScreen,
  NotificationPreferencesScreen, PrivacyScreen, VoiceAppearanceScreen, SecurityScreen, SessionsScreen, LoginActivityScreen, SafetyCenterScreen, SupportScreen, CmsContentScreen,
  CreatorLiveStudioScreen, CreatorProfileScreen, CreatorSettingsScreen, CreatorHelpScreen, CreatorAudienceScreen, CreatorSubscribersScreen, CreatorPlansScreen, CreatorMessagesScreen, CreatorConversationsScreen, CreatorAnalyticsScreen, CreatorWalletScreen, CreatorEarningsScreen, CreatorGiftsScreen, CreatorPayoutsScreen, PayoutDetailsScreen, CreatorNotificationsScreen, CreatorVerificationScreen,
  LiveConnectedScreen, LiveMutedScreen, LiveNotSpeakingScreen, RankingsScreen, GiftsScreen,
} from './screens-gaps'

import {
  RoomPreviewScreen, LiveRoomScreen, SpeakerRequestScreen, SpeakerInvitationScreen,
  LivePreparingScreen, LiveConnectingScreen, LiveReconnectingScreen,
  LiveInterruptedScreen, LiveDisconnectedScreen, RoomPausedScreen, RoomEndedScreen,
} from './screens-live'

// ─── Screen Registry ──────────────────────────────────────────────────────────

type Screen =
  // Auth
  | 'splash' | 'onboarding'
  // Core
  | 'home' | 'explore' | 'messages' | 'my-profile' | 'economy' | 'creator' | 'settings'
  // Phase A
  | 'rooms' | 'people' | 'creators' | 'search' | 'community-search' | 'rankings'
  | 'public-profile' | 'followers' | 'following' | 'friends'
  // Phase B
  | 'communities' | 'community-detail' | 'community-create' | 'community-manage' | 'community-members'
  | 'community-events' | 'events' | 'event-detail' | 'conversation' | 'notifications'
  // Phase C
  | 'room-preview' | 'live-room' | 'speaker-request' | 'speaker-invitation'
  | 'live-preparing' | 'live-connecting' | 'live-reconnecting'
  | 'live-interrupted' | 'live-disconnected'
  | 'room-paused' | 'room-ended'
  | 'sign-in' | 'register' | 'otp' | 'forgot-password' | 'reset-password' | 'guest-upgrade' | 'session-expired'
  | 'host-studio' | 'room-create' | 'room-management' | 'room-settings' | 'live-console' | 'scheduling' | 'participant-management' | 'moderation-actions' | 'poll' | 'quiz' | 'host-verification' | 'reporting' | 'report-confirmation'
  | 'vip' | 'gifts' | 'store' | 'tasks' | 'check-in' | 'referrals' | 'scheduled-tickets' | 'edit-profile' | 'replay-player' | 'visitors' | 'blocked-users'
  | 'notification-preferences' | 'privacy' | 'voice-appearance' | 'security' | 'sessions' | 'login-activity' | 'safety-center' | 'support' | 'cms-help' | 'cms-about' | 'cms-legal'
  | 'creator-followers'
  | 'creator-live-studio' | 'creator-profile' | 'creator-settings' | 'creator-help' | 'creator-audience' | 'creator-subscribers' | 'creator-plans' | 'creator-messages' | 'creator-conversations' | 'creator-analytics' | 'creator-wallet' | 'creator-earnings' | 'creator-gifts' | 'creator-payouts' | 'payout-details' | 'creator-notifications' | 'creator-verification'
  | 'live-connected' | 'live-muted' | 'live-not-speaking'

const NO_NAV: Screen[] = [
  'splash', 'onboarding', 'room-preview', 'live-room', 'room-paused', 'room-ended',
  'live-preparing', 'live-connecting', 'live-reconnecting', 'live-interrupted', 'live-disconnected',
  'speaker-request', 'speaker-invitation', 'sign-in', 'register', 'otp', 'forgot-password', 'reset-password', 'guest-upgrade', 'session-expired', 'room-create', 'poll', 'quiz', 'reporting', 'report-confirmation', 'live-connected', 'live-muted', 'live-not-speaking',
]

const NAV_MAP: Partial<Record<NavTab, Screen>> = {
  home: 'home',
  discover: 'explore',
  live: 'room-preview',
  messages: 'messages',
  profile: 'my-profile',
}

// ─── Screen groups for the jump panel ─────────────────────────────────────────

const SCREEN_GROUPS: { label: string; screens: { id: Screen; label: string }[] }[] = [
  {
    label: 'Auth',
    screens: [
      { id: 'splash', label: 'Splash' },
      { id: 'onboarding', label: 'Onboarding' },
    ],
  },
  {
    label: 'Core',
    screens: [
      { id: 'home', label: 'Home' },
      { id: 'explore', label: 'Explore' },
      { id: 'messages', label: 'Messages' },
      { id: 'my-profile', label: 'My Profile' },
      { id: 'economy', label: 'Economy' },
      { id: 'creator', label: 'Creator' },
      { id: 'settings', label: 'Settings' },
    ],
  },
  {
    label: 'Phase A · Discovery',
    screens: [
      { id: 'rooms', label: 'Rooms' },
      { id: 'people', label: 'People' },
      { id: 'creators', label: 'Creators' },
      { id: 'search', label: 'Search' },
      { id: 'community-search', label: 'Comm. Search' }, { id: 'rankings', label: 'Rankings' },
      { id: 'public-profile', label: 'Public Profile' },
      { id: 'followers', label: 'Followers' },
    ],
  },
  {
    label: 'Phase B · Social',
    screens: [
      { id: 'communities', label: 'Communities' },
      { id: 'community-detail', label: 'Comm. Detail' },
      { id: 'community-create', label: 'Create Comm.' },
      { id: 'community-manage', label: 'Manage Comm.' },
      { id: 'community-members', label: 'Members' },
      { id: 'events', label: 'Events' },
      { id: 'event-detail', label: 'Event Detail' },
      { id: 'conversation', label: 'Conversation' },
      { id: 'notifications', label: 'Notifications' },
    ],
  },
  {
    label: 'Auth & Account',
    screens: [
      { id: 'sign-in', label: 'Sign In' }, { id: 'register', label: 'Register' }, { id: 'otp', label: 'OTP Verify' }, { id: 'forgot-password', label: 'Forgot Password' }, { id: 'reset-password', label: 'Reset Password' }, { id: 'guest-upgrade', label: 'Guest Upgrade' }, { id: 'session-expired', label: 'Session Expired' },
      { id: 'edit-profile', label: 'Edit Profile' }, { id: 'replay-player', label: 'Replay Player' }, { id: 'visitors', label: 'Visitors' }, { id: 'blocked-users', label: 'Blocked Users' },
    ],
  },
  {
    label: 'Hosting',
    screens: [
      { id: 'host-studio', label: 'Host Studio' }, { id: 'room-create', label: 'Room Create' }, { id: 'room-management', label: 'Room Management' }, { id: 'room-settings', label: 'Room Settings' }, { id: 'live-console', label: 'Live Console' }, { id: 'scheduling', label: 'Scheduling' }, { id: 'participant-management', label: 'Participants' }, { id: 'moderation-actions', label: 'Moderation' }, { id: 'poll', label: 'Poll' }, { id: 'quiz', label: 'Quiz' }, { id: 'host-verification', label: 'Host Verification' }, { id: 'reporting', label: 'Reporting' },
    ],
  },
  {
    label: 'Economy',
    screens: [
      { id: 'vip', label: 'VIP' }, { id: 'gifts', label: 'Gifts' }, { id: 'store', label: 'Store' }, { id: 'tasks', label: 'Tasks' }, { id: 'check-in', label: 'Check-in' }, { id: 'referrals', label: 'Referrals' }, { id: 'scheduled-tickets', label: 'Room Tickets' },
    ],
  },
  {
    label: 'Settings & Safety',
    screens: [
      { id: 'notification-preferences', label: 'Notifications' }, { id: 'privacy', label: 'Privacy' }, { id: 'voice-appearance', label: 'Voice & Appearance' }, { id: 'security', label: 'Security' }, { id: 'sessions', label: 'Sessions & Devices' }, { id: 'login-activity', label: 'Login Activity' }, { id: 'safety-center', label: 'Safety Center' }, { id: 'support', label: 'Support' }, { id: 'cms-help', label: 'Help' }, { id: 'cms-legal', label: 'Legal' }, { id: 'cms-about', label: 'About' },
    ],
  },
  {
    label: 'Creator',
    screens: [
      { id: 'creator-live-studio', label: 'Live Studio' }, { id: 'creator-profile', label: 'Creator Profile' }, { id: 'creator-settings', label: 'Creator Settings' }, { id: 'creator-help', label: 'Creator Help' }, { id: 'creator-audience', label: 'Audience' }, { id: 'creator-followers', label: 'Followers' }, { id: 'creator-subscribers', label: 'Subscribers' }, { id: 'creator-plans', label: 'Plans' }, { id: 'creator-messages', label: 'Creator Messages' }, { id: 'creator-conversations', label: 'Creator Conversations' }, { id: 'creator-analytics', label: 'Analytics' }, { id: 'creator-wallet', label: 'Wallet' }, { id: 'creator-earnings', label: 'Earnings' }, { id: 'creator-gifts', label: 'Gifts' }, { id: 'creator-payouts', label: 'Payouts' }, { id: 'payout-details', label: 'Payout Details' }, { id: 'creator-notifications', label: 'Notifications' }, { id: 'creator-verification', label: 'Verification' },
    ],
  },
  {
    label: 'Phase C · Live Audio',
    screens: [
      { id: 'room-preview', label: 'Room Preview' },
      { id: 'live-room', label: 'Live Room' },
      { id: 'speaker-request', label: 'Speaker Req.' },
      { id: 'speaker-invitation', label: 'Invitation' },
      { id: 'live-preparing', label: 'Preparing' },
      { id: 'live-connecting', label: 'Connecting' },
      { id: 'live-reconnecting', label: 'Reconnecting' },
      { id: 'live-interrupted', label: 'Interrupted' },
      { id: 'live-disconnected', label: 'Disconnected' },
      { id: 'room-paused', label: 'Room Paused' },
      { id: 'room-ended', label: 'Room Ended' },
    ],
  },
]

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [navTab, setNavTab] = useState<NavTab>('home')
  const [history, setHistory] = useState<Screen[]>([])

  const goTo = (s: string) => {
    const next = s as Screen
    setHistory(h => [...h, screen])
    setScreen(next)
    // sync bottom nav
    if (next === 'home') setNavTab('home')
    else if (next === 'explore') setNavTab('discover')
    else if (next === 'messages' || next === 'conversation') setNavTab('messages')
    else if (next === 'my-profile') setNavTab('profile')
  }

  const handleNavChange = (tab: NavTab) => {
    setNavTab(tab)
    const target = NAV_MAP[tab]
    if (target) goTo(target)
  }

  const showNav = !NO_NAV.includes(screen)

  const renderScreen = () => {
    const g = goTo
    switch (screen) {
      // ── Auth ──
      case 'splash':          return <SplashScreen onNext={() => goTo('onboarding')} />
      case 'onboarding':      return <OnboardingScreen onNext={() => goTo('sign-in')} />

      // ── Core ──
      case 'home':            return <HomeScreen goTo={g} />
      case 'explore':         return <ExploreScreen goTo={g} />
      case 'messages':        return <MessagesScreen goTo={g} />
      case 'my-profile':      return <MyProfileScreen goTo={g} />
      case 'economy':         return <EconomyScreen goTo={g} />
      case 'creator':         return <CreatorScreen goTo={g} />
      case 'settings':        return <SettingsScreen goTo={g} />

      // ── Phase A ──
      case 'rooms':           return <RoomsScreen goTo={g} />
      case 'people':          return <PeopleScreen goTo={g} />
      case 'creators':        return <CreatorsScreen goTo={g} />
      case 'search':          return <SearchScreen goTo={g} />
      case 'community-search':return <CommunitySearchScreen goTo={g} />
      case 'public-profile':  return <PublicProfileScreen goTo={g} />
      case 'followers':
      case 'following':
      case 'friends':         return <FollowersScreen goTo={g} />

      // ── Phase B ──
      case 'communities':     return <CommunitiesScreen goTo={g} />
      case 'community-detail':return <CommunityDetailScreen goTo={g} />
      case 'community-create':return <CommunityCreateScreen goTo={g} />
      case 'community-manage':return <CommunityManageScreen goTo={g} />
      case 'community-members':return <CommunityMembersScreen goTo={g} />
      case 'community-events':return <EventsScreen goTo={g} />
      case 'events':          return <EventsScreen goTo={g} />
      case 'event-detail':    return <EventDetailScreen goTo={g} />
      case 'conversation':    return <ConversationScreen goTo={g} />
      case 'notifications':   return <NotificationsScreen goTo={g} />

      // ── Phase C ──
      case 'room-preview':    return <RoomPreviewScreen goTo={g} />
      case 'live-room':       return <LiveRoomScreen goTo={g} />
      case 'speaker-request': return <SpeakerRequestScreen goTo={g} />
      case 'speaker-invitation': return <SpeakerInvitationScreen goTo={g} />
      case 'live-preparing':  return <LivePreparingScreen goTo={g} />
      case 'live-connecting': return <LiveConnectingScreen goTo={g} />
      case 'live-reconnecting': return <LiveReconnectingScreen goTo={g} />
      case 'live-interrupted':return <LiveInterruptedScreen goTo={g} />
      case 'live-disconnected': return <LiveDisconnectedScreen goTo={g} />
      case 'room-paused':     return <RoomPausedScreen goTo={g} />
      case 'room-ended':      return <RoomEndedScreen goTo={g} />

      // ── Auth & Account ──
      case 'sign-in':          return <SignInScreen goTo={g} />
      case 'register':         return <RegisterScreen goTo={g} />
      case 'otp':              return <OtpScreen goTo={g} />
      case 'forgot-password':  return <ForgotPasswordScreen goTo={g} />
      case 'reset-password':   return <ResetPasswordScreen goTo={g} />
      case 'guest-upgrade':    return <GuestUpgradeScreen goTo={g} />
      case 'session-expired':  return <SessionExpiredScreen goTo={g} />
      case 'edit-profile':     return <EditProfileScreen goTo={g} />
      case 'replay-player':    return <ReplayPlayerScreen goTo={g} />
      case 'visitors':         return <VisitorsScreen goTo={g} />
      case 'blocked-users':    return <BlockedUsersScreen goTo={g} />

      // ── Hosting ──
      case 'host-studio':      return <HostStudioScreen goTo={g} />
      case 'room-create':      return <RoomCreateScreen goTo={g} />
      case 'room-management':  return <RoomManagementScreen goTo={g} />
      case 'room-settings':    return <RoomSettingsScreen goTo={g} />
      case 'live-console':     return <LiveConsoleScreen goTo={g} />
      case 'scheduling':       return <SchedulingScreen goTo={g} />
      case 'participant-management': return <ParticipantManagementScreen goTo={g} />
      case 'moderation-actions': return <ModerationActionsScreen goTo={g} />
      case 'poll':             return <PollScreen goTo={g} />
      case 'quiz':             return <QuizScreen goTo={g} />
      case 'host-verification': return <HostVerificationScreen goTo={g} />
      case 'reporting':        return <ReportingScreen goTo={g} />
      case 'report-confirmation': return <ReportConfirmationScreen goTo={g} />

      // ── Economy ──
      case 'rankings':         return <RankingsScreen goTo={g} />
      case 'vip':              return <VipScreen goTo={g} />
      case 'gifts':            return <GiftsScreen goTo={g} />
      case 'store':            return <StoreScreen goTo={g} />
      case 'tasks':            return <TasksScreen goTo={g} />
      case 'check-in':        return <CheckInScreen goTo={g} />
      case 'referrals':        return <ReferralsScreen goTo={g} />
      case 'scheduled-tickets': return <ScheduledTicketsScreen goTo={g} />

      // ── Settings & Safety ──
      case 'notification-preferences': return <NotificationPreferencesScreen goTo={g} />
      case 'privacy':           return <PrivacyScreen goTo={g} />
      case 'voice-appearance':  return <VoiceAppearanceScreen goTo={g} />
      case 'security':          return <SecurityScreen goTo={g} />
      case 'sessions':          return <SessionsScreen goTo={g} />
      case 'login-activity':    return <LoginActivityScreen goTo={g} />
      case 'safety-center':     return <SafetyCenterScreen goTo={g} />
      case 'support':           return <SupportScreen goTo={g} />
      case 'cms-help':          return <CmsContentScreen goTo={g} kind="Help" />
      case 'cms-about':         return <CmsContentScreen goTo={g} kind="About VoiceCloud" />
      case 'cms-legal':         return <CmsContentScreen goTo={g} kind="Legal" />

      // ── Creator ──
      case 'creator-live-studio': return <CreatorLiveStudioScreen goTo={g} />
      case 'creator-profile':   return <CreatorProfileScreen goTo={g} />
      case 'creator-settings':  return <CreatorSettingsScreen goTo={g} />
      case 'creator-help':      return <CreatorHelpScreen goTo={g} />
      case 'creator-audience':  return <CreatorAudienceScreen goTo={g} />
      case 'creator-followers': return <FollowersScreen goTo={g} />
      case 'creator-subscribers': return <CreatorSubscribersScreen goTo={g} />
      case 'creator-plans':     return <CreatorPlansScreen goTo={g} />
      case 'creator-messages':  return <CreatorMessagesScreen goTo={g} />
      case 'creator-conversations': return <CreatorConversationsScreen goTo={g} />
      case 'creator-analytics': return <CreatorAnalyticsScreen goTo={g} />
      case 'creator-wallet':    return <CreatorWalletScreen goTo={g} />
      case 'creator-earnings':  return <CreatorEarningsScreen goTo={g} />
      case 'creator-gifts':     return <CreatorGiftsScreen goTo={g} />
      case 'creator-payouts':   return <CreatorPayoutsScreen goTo={g} />
      case 'payout-details':    return <PayoutDetailsScreen goTo={g} />
      case 'creator-notifications': return <CreatorNotificationsScreen goTo={g} />
      case 'creator-verification': return <CreatorVerificationScreen goTo={g} />

      // ── Live state variants ──
      case 'live-connected':    return <LiveConnectedScreen goTo={g} />
      case 'live-muted':        return <LiveMutedScreen goTo={g} />
      case 'live-not-speaking': return <LiveNotSpeakingScreen goTo={g} />

      default: return <HomeScreen goTo={g} />
    }
  }

  return (
    <HostProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#EEF1FA', padding: '20px 0 120px' }}>
      {/* Phone frame */}
      <div style={{
        width: 390, height: 844, borderRadius: 44, overflow: 'hidden', position: 'relative',
        background: T.bg, flexShrink: 0,
        boxShadow: '0 28px 80px rgba(55,65,100,0.18), 0 0 0 1px rgba(15,23,42,0.08)',
        border: '1px solid rgba(15,23,42,0.08)',
      }}>
        <StatusBar dark={['splash','onboarding','room-preview','live-room','speaker-request','speaker-invitation','live-preparing','live-connecting','live-reconnecting','live-interrupted','live-disconnected','room-paused','room-ended','live-connected','live-muted','live-not-speaking'].includes(screen)} />

        {/* Screen content */}
        <div style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}>
          {renderScreen()}
        </div>

        {/* Bottom Nav */}
        {showNav && (
          <BottomNav
            active={navTab}
            onChange={handleNavChange}
            unreadMessages={true}
          />
        )}
      </div>

      {/* Screen Navigator */}
      <div style={{ marginTop: 24, width: '100%', maxWidth: 820, padding: '0 16px' }}>
        {SCREEN_GROUPS.map(group => (
          <div key={group.label} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, fontFamily: 'Inter' }}>{group.label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {group.screens.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setHistory(h => [...h, screen]); setScreen(s.id) }}
                  style={{
                    padding: '5px 12px', borderRadius: 20,
                    background: screen === s.id ? T.primary : '#FFFFFF',
                    border: `1px solid ${screen === s.id ? T.primary : 'rgba(15,23,42,0.08)'}`,
                    color: screen === s.id ? '#fff' : '#64748B',
                    fontSize: 11, fontWeight: screen === s.id ? 600 : 400,
                    cursor: 'pointer', fontFamily: 'Inter',
                    boxShadow: screen === s.id ? `0 2px 12px ${T.primary}44` : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </HostProvider>
  )
}
