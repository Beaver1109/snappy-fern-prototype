import { useState } from 'react';
import {
  DexBox,
  DexButton,
  DexIconButton,
  DexInline,
  DexStack,
  DexTag,
  DexTabs,
  DexTabsList,
  DexTabsTrigger,
  DexText,
  DexDropdownMenu,
  DexDropdownMenuItem,
  DexIcon,
} from '@thryvlabs/dex-react';

// ── Data ──────────────────────────────────────────────────────────────────────

interface Review {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  platform: 'google' | 'yelp';
  location: string;
  locationMeta: string;
  text: string;
  sentiment: 'positive' | 'negative';
  hasImage?: boolean;
}

const REVIEWS: Review[] = [
  { id: 1, name: 'Bella Jhonson', initials: 'BJ', avatarColor: '#E57373', rating: 2, date: 'Jan 10, 2025', platform: 'google', location: '628 Victoria St, Melbourne', locationMeta: 'Loc ID:12 · Main Store', text: 'Took 15 min to get a simple iced coffee. The staff seemed completely overwhelmed and disorganised.', sentiment: 'negative' },
  { id: 2, name: 'Virginia Moore', initials: 'VM', avatarColor: '#7E57C2', rating: 2, date: 'Jan 15, 2025', platform: 'google', location: '9 Blakeney St, Brisbane', locationMeta: 'Loc ID:34 · South Hub', text: 'The morning rush hour needs better management.', sentiment: 'negative', hasImage: true },
  { id: 3, name: 'Marcus Lee', initials: 'ML', avatarColor: '#26A69A', rating: 5, date: 'Jan 18, 2025', platform: 'google', location: '91 Sixth Ave, Sydney', locationMeta: 'Loc ID:22 · North Branch', text: 'Absolutely love this place! Staff is always friendly and the coffee is amazing.', sentiment: 'positive' },
  { id: 4, name: 'Sophie Turner', initials: 'ST', avatarColor: '#FF7043', rating: 4, date: 'Jan 20, 2025', platform: 'yelp', location: '198 Avenue de France, Paris', locationMeta: 'Loc ID:08 · EU Hub', text: 'Great experience overall. The new menu items are fantastic!', sentiment: 'positive' },
  { id: 5, name: 'Derek Cheng', initials: 'DC', avatarColor: '#42A5F5', rating: 1, date: 'Jan 22, 2025', platform: 'google', location: '6 Flinders Street, Melbourne', locationMeta: 'Loc ID:41 · CBD Store', text: 'Terrible service. Waited 30 minutes for my order and it was wrong.', sentiment: 'negative' },
  { id: 6, name: 'Amara Osei', initials: 'AO', avatarColor: '#66BB6A', rating: 5, date: 'Jan 24, 2025', platform: 'yelp', location: '3051 North Melbourne', locationMeta: 'Loc ID:15 · West End', text: 'Best coffee in the city! Never disappointed.', sentiment: 'positive' },
];

const MODAL_REVIEWS = [
  {
    id: 1,
    name: 'Johnny Howard',
    initials: 'JH',
    avatarColor: '#5C6BC0',
    rating: 2,
    date: 'Jun 28, 2021 4:47 PM',
    city: 'Williamsport, PA',
    platform: 'google',
    location: '2972 Westheimer Rd, Santa Ana, IL',
    locationMeta: 'Loc ID:97 · Main Store',
    text: "The code it's not working at all! I've tried more than 5 times",
    aiReply: "Hi Johnny, thank you for bringing the issue with the code to our attention! We truly appreciate your patience, and we're happy to inform you that the problem has been fixed. You should be able to use the code without any issues now. Thanks again!",
  },
  {
    id: 2,
    name: 'Laura Mendez',
    initials: 'LM',
    avatarColor: '#EF5350',
    rating: 1,
    date: 'Jul 15, 2023 2:30 PM',
    city: 'Riverdale, CA',
    platform: 'google',
    location: '1234 Maple Ave, Springfield, IL',
    locationMeta: 'Location ID:42 · Central Hub',
    text: "The promotional code you send by email it's not working! What's happening?",
    aiReply: "Hi Laura, we sincerely apologize for the inconvenience. We are aware of the issue with the promotional code and our team is actively working on a fix. Thank you for your patience!",
  },
  {
    id: 3,
    name: 'Derek Cheng',
    initials: 'DC',
    avatarColor: '#42A5F5',
    rating: 1,
    date: 'Jan 22, 2025 10:14 AM',
    city: 'Melbourne, AU',
    platform: 'google',
    location: '6 Flinders Street, Melbourne',
    locationMeta: 'Loc ID:41 · CBD Store',
    text: 'Terrible service. Waited 30 minutes for my order and it was wrong.',
    aiReply: "Hi Derek, we're truly sorry to hear about your experience. This is not the standard we hold ourselves to. We'd love the opportunity to make it right — please reach out to us directly so we can address this.",
  },
];

const AI_MESSAGES = [
  { id: 1, from: 'ai', text: 'Hi, I already <b>auto-responded to 8 negative reviews for your location</b>. You can check them in the <a href="#" style="color:var(--dex-color-brand-secondary)">Reviews page</a>.\n\nIn the reviews, your customers mention a <b>promotional code not working</b>. I responded with an apology while the issue is investigated. Once the issue is solved.\n\nDo you want to confirm or edit this response?' },
  { id: 2, from: 'user', text: 'I want to edit the responses saying the issue with the promotional code has already been resolved. Can you update the responses please?' },
  { id: 3, from: 'ai', text: "Of course, ✏️ I've edited the responses informing <b>the issue with the promotional code it's already solved</b>. You can review and publish them now." },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'flex', gap: 1 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < rating ? '#F59E0B' : '#E5E7EB'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

function Avatar({ initials, color, size = 36 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ color: '#fff', fontSize: size * 0.35, fontWeight: 700 }}>{initials}</span>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function YelpIcon() {
  return (
    <div style={{ width: 14, height: 14, borderRadius: 3, background: '#FF1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#fff', fontSize: 9, fontWeight: 700, lineHeight: 1 }}>y</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function ReputationPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'google' | 'yelp'>('all');
  const [sentiment, setSentiment] = useState<'all' | 'positive' | 'negative'>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState<number[]>([]);
  const [aiInput, setAiInput] = useState('');

  const filtered = REVIEWS.filter((r) => {
    if (activeTab !== 'all' && r.platform !== activeTab) return false;
    if (sentiment !== 'all' && r.sentiment !== sentiment) return false;
    return true;
  });

  const toggleSelect = (id: number) =>
    setSelectedReviews((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);


  const sentimentPillStyle = (active: boolean, color: string) => ({
    padding: '4px 12px',
    borderRadius: 20,
    border: `1px solid ${active ? color : 'var(--dex-borderColor-alpha-subtle)'}`,
    cursor: 'pointer',
    background: active ? `${color}18` : 'transparent',
    color: active ? color : 'var(--dex-fgColor-default)',
    fontSize: 13,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontWeight: active ? 600 : 400,
  });

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid var(--dex-borderColor-alpha-subtle)' }}>

        {/* Toolbar */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--dex-borderColor-alpha-subtle)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <DexDropdownMenu content={<DexDropdownMenuItem>All businesses</DexDropdownMenuItem>}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, border: '1px solid var(--dex-borderColor-alpha-subtle)', background: 'var(--dex-surface-flat-bgColor)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
              Business <DexIcon name="chevron-down" size="sm" />
            </button>
          </DexDropdownMenu>
          <div style={{ flex: 1, position: 'relative' }}>
            <DexIcon name="search" size="sm" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
            <input placeholder="Search by location" style={{ width: '100%', padding: '7px 12px 7px 32px', borderRadius: 8, border: '1px solid var(--dex-borderColor-alpha-subtle)', background: 'var(--dex-surface-flat-bgColor)', fontSize: 13, outline: 'none', boxSizing: 'border-box', color: 'inherit' }} />
          </div>
          <div style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid var(--dex-borderColor-alpha-subtle)', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>236 locations</div>
          <DexDropdownMenu content={<DexDropdownMenuItem>No filters</DexDropdownMenuItem>}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, border: '1px solid var(--dex-borderColor-alpha-subtle)', background: 'var(--dex-surface-flat-bgColor)', cursor: 'pointer', fontSize: 13 }}>
              My Filters <DexIcon name="chevron-down" size="sm" />
            </button>
          </DexDropdownMenu>
          <DexIconButton name="settings" label="Settings" size="dense" />
        </div>

        {/* Smart action banners */}
        <div style={{ padding: '10px 16px', display: 'flex', gap: 10, borderBottom: '1px solid var(--dex-borderColor-alpha-subtle)', flexShrink: 0, overflowX: 'auto' }}>
          <DexTag
            variant="outline"
            color="danger"
            leadingIcon="star"
            trailing={<span style={{ background: '#EF4444', color: '#fff', borderRadius: 10, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>8</span>}
            onClick={() => setShowModal(true)}
          >
            Reply to Negative Reviews
          </DexTag>
          <DexTag
            variant="outline"
            color="warning"
            leading={<span style={{ fontSize: 13 }}>⏰</span>}
            trailing={<span style={{ background: '#F59E0B', color: '#fff', borderRadius: 10, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>12</span>}
          >
            45+ Day Overdue
          </DexTag>
          <DexTag
            variant="outline"
            color="orange"
            leadingIcon="message-circle"
            trailing={<span style={{ background: '#FF5000', color: '#fff', borderRadius: 10, padding: '1px 7px', fontSize: 11, fontWeight: 700 }}>23</span>}
          >
            Unanswered
          </DexTag>
        </div>

        {/* Filter tabs + sentiment */}
        <div style={{ padding: '4px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--dex-borderColor-alpha-subtle)', flexShrink: 0 }}>
          <DexTabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'google' | 'yelp')}>
            <DexTabsList>
              <DexTabsTrigger value="all">All (95)</DexTabsTrigger>
              <DexTabsTrigger value="google" leading={<GoogleIcon />}>Google (50)</DexTabsTrigger>
              <DexTabsTrigger value="yelp" leading={<YelpIcon />}>Yelp (45)</DexTabsTrigger>
            </DexTabsList>
          </DexTabs>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setSentiment(sentiment === 'positive' ? 'all' : 'positive')} style={sentimentPillStyle(sentiment === 'positive', '#22C55E') as React.CSSProperties}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
              Positive (90)
            </button>
            <button onClick={() => setSentiment(sentiment === 'negative' ? 'all' : 'negative')} style={sentimentPillStyle(sentiment === 'negative', '#EF4444') as React.CSSProperties}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444', flexShrink: 0 }} />
              Negative (8)
            </button>
          </div>
        </div>

        {/* Bulk actions row */}
        {selectedReviews.length > 0 && (
          <div style={{ padding: '8px 16px', display: 'flex', gap: 12, alignItems: 'center', background: '#FFF3EE', borderBottom: '1px solid #FFD0BC', flexShrink: 0 }}>
            <DexText variant="caption" style={{ color: 'var(--dex-color-brand-secondary)' }}>{selectedReviews.length} selected</DexText>
            <button style={{ fontSize: 13, color: 'var(--dex-color-brand-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Resolve</button>
            <button style={{ fontSize: 13, color: 'var(--dex-color-brand-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Mark As Read</button>
          </div>
        )}

        {/* Review list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map((review) => (
            <div key={review.id} style={{ padding: '14px 16px', borderBottom: '1px solid var(--dex-borderColor-alpha-subtle)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                checked={selectedReviews.includes(review.id)}
                onChange={() => toggleSelect(review.id)}
                style={{ marginTop: 4, accentColor: 'var(--dex-color-brand-secondary)', flexShrink: 0 }}
              />
              <Avatar initials={review.initials} color={review.avatarColor} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <DexText variant="body-2" style={{ fontWeight: 600 }}>{review.name}</DexText>
                  {review.platform === 'google' ? <GoogleIcon /> : <YelpIcon />}
                  <Stars rating={review.rating} />
                  <DexText variant="caption" color="subtle">{review.date}</DexText>
                </div>
                <DexText variant="caption" color="subtle" style={{ marginBottom: 6, display: 'block' }}>{review.location} · {review.locationMeta}</DexText>
                <DexText variant="body-2" style={{ marginBottom: 8 }}>{review.text}</DexText>
                {review.hasImage && (
                  <div style={{ width: 80, height: 60, borderRadius: 8, background: '#8B6E5A', marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DexIcon name="photo" size="sm" style={{ color: '#fff', opacity: 0.7 }} />
                  </div>
                )}
                <button style={{ fontSize: 12, color: 'var(--dex-color-brand-secondary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}>
                  <DexIcon name="message-square" size="sm" /> Reply now
                </button>
              </div>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                <button style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--dex-borderColor-alpha-subtle)', background: 'none', cursor: 'pointer', color: 'var(--dex-fgColor-default)' }}>Resolve</button>
                <button style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--dex-borderColor-alpha-subtle)', background: 'none', cursor: 'pointer', color: 'var(--dex-fgColor-default)' }}>Mark As Read</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── UB-I AI Panel ── */}
      <div style={{ width: 320, display: 'flex', flexDirection: 'column', background: 'var(--dex-surface-flat-bgColor)', flexShrink: 0 }}>
        {/* Header */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--dex-borderColor-alpha-subtle)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#C04000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <DexText variant="body-2" style={{ fontWeight: 700, flex: 1 }}>Thryv</DexText>
          <DexIconButton name="more-vertical" label="More" size="dense" />
          <DexIconButton name="maximize" label="Expand" size="dense" />
          <DexIconButton name="x" label="Close" size="dense" />
        </div>

        {/* Back + context */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--dex-borderColor-alpha-subtle)', flexShrink: 0 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 10, color: 'var(--dex-fgColor-default)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <DexIcon name="arrow-left" size="sm" />
          </button>
          <div style={{ background: '#C04000', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E04500', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <DexIcon name="message-circle" size="sm" style={{ color: '#fff' }} />
            </div>
            <span style={{ color: '#fff', fontWeight: 500, fontSize: 14 }}>Reply to 8 negative reviews</span>
          </div>
        </div>

        {/* Chat messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {AI_MESSAGES.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '88%',
                padding: '10px 12px',
                borderRadius: msg.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: msg.from === 'user' ? 'var(--dex-color-brand-secondary)' : 'var(--dex-bgColor-neutral-subtle)',
                color: msg.from === 'user' ? '#fff' : 'var(--dex-fgColor-default)',
                fontSize: 13,
                lineHeight: 1.5,
              }} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid var(--dex-borderColor-alpha-subtle)', flexShrink: 0 }}>
          <DexText variant="caption" color="subtle" style={{ marginBottom: 8, display: 'block' }}>Ask Thryv anything...</DexText>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--dex-borderColor-alpha-subtle)', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <DexIcon name="plus" size="sm" />
            </button>
            <input
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1, padding: '7px 10px', borderRadius: 20, border: '1px solid var(--dex-borderColor-alpha-subtle)', background: 'var(--dex-bgColor-neutral-subtle)', fontSize: 13, outline: 'none', color: 'inherit' }}
            />
            <DexIconButton name="microphone" label="Voice" size="dense" />
            <button style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--dex-color-brand-secondary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <DexIcon name="arrow-up" size="sm" style={{ color: '#fff' }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Reply Modal ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ width: 720, maxHeight: '80vh', background: 'var(--dex-surface-flat-bgColor)', borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
            {/* Modal header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--dex-borderColor-alpha-subtle)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--dex-color-brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z"/></svg>
              </div>
              <DexText variant="headline-4" style={{ flex: 1 }}>Reply to 8 negative reviews</DexText>
              <DexIconButton name="x" label="Close" size="dense" onClick={() => setShowModal(false)} />
            </div>

            {/* Modal body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
              {MODAL_REVIEWS.map((review) => (
                <div key={review.id}>
                  {/* Reviewer */}
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <Avatar initials={review.initials} color={review.avatarColor} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <DexText variant="body-2" style={{ fontWeight: 600 }}>{review.name}</DexText>
                        <Stars rating={review.rating} />
                        <DexText variant="caption" color="subtle">{review.date}</DexText>
                        {review.city && <DexText variant="caption" color="subtle">· {review.city}</DexText>}
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          <DexText variant="caption" color="subtle">{review.location}</DexText>
                        </div>
                      </div>
                      <DexText variant="caption" color="subtle">{review.locationMeta}</DexText>
                      <DexText variant="body-2" style={{ marginTop: 6 }}>{review.text}</DexText>
                    </div>
                  </div>

                  {/* AI Reply */}
                  <div style={{ marginLeft: 48 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--dex-color-brand-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <DexText style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>CH</DexText>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <DexText variant="caption" style={{ fontWeight: 600 }}>Coffee House</DexText>
                          <DexText variant="caption" color="subtle">· No posted yet · Main Store</DexText>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 10, background: '#FFF3EE', fontSize: 11, fontWeight: 500, color: 'var(--dex-color-brand-secondary)' }}>
                            ✦ Auto-generated by AI
                          </span>
                        </div>
                      </div>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                        <DexIconButton name="edit" label="Edit" size="dense" />
                        <DexIconButton name="trash" label="Delete" size="dense" />
                      </div>
                    </div>
                    <div style={{ background: '#FFF3EE', borderRadius: 10, padding: '12px 14px', fontSize: 13, lineHeight: 1.6, color: 'var(--dex-fgColor-default)', border: '1px solid #FFD0BC' }}>
                      {review.aiReply}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal footer */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--dex-borderColor-alpha-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0 }}>
              <DexButton variant="outline" onClick={() => setShowModal(false)}>Cancel</DexButton>
              <DexButton variant="solid" onClick={() => setShowModal(false)}>Confirm &amp; Publish</DexButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
