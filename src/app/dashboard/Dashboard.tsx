'use client';

import { useEffect, useState }        from 'react';
import { motion, AnimatePresence }    from 'framer-motion';
import {
  collection, onSnapshot, updateDoc,
  deleteDoc, doc, orderBy, query,
  addDoc, serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import { db }      from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type Message = {
  id:        string;
  name:      string;
  email:     string;
  message:   string;
  read:      boolean;
  createdAt: Timestamp;
};

type Project = {
  id:          string;
  title:       string;
  titleAr?:    string;
  slug:        string;
  role:        string;
  roleAr?:     string;  
  year:        string;
  type:        string;
  tags:        string | string[];
  desc:        string;
  descAr?:     string;   
  overview?:   string;
  overviewAr?: string;    
  color?:      string;
  accent?:     string;
  liveUrl?:    string;
  figmaUrl?:   string;
  visible:     boolean;
  comingSoon?: boolean;
  featured?:   boolean;
  order?:      number;
  createdAt:   Timestamp;
};

type Tab = 'messages' | 'projects';

function formatDate(ts: Timestamp | null): string {
  if (!ts) return '—';
  return ts.toDate().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

const inputStyle = {
  width:        '100%',
  background:   'var(--color-bg)',
  border:       '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  padding:      '10px 14px',
  fontFamily:   'var(--font-body)',
  fontSize:     'var(--text-sm)',
  color:        'var(--color-text)',
  outline:      'none',
  transition:   'border-color 250ms',
} as React.CSSProperties;

const labelStyle = {
  fontFamily:    'var(--font-mono)',
  fontSize:      'var(--text-xs)',
  color:         'var(--color-muted)',
  letterSpacing: '0.08em',
} as React.CSSProperties;

/* ─────────────────────────────────────────
   Main Dashboard
───────────────────────────────────────── */
export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tab, setTab]    = useState<Tab>('messages');

  const [messages,    setMessages]    = useState<Message[]>([]);
  const [projects,    setProjects]    = useState<Project[]>([]);
  const [msgsLoading, setMsgsLoading] = useState(true);
  const [projLoading, setProjLoading] = useState(true);

  const unreadCount = messages.filter(m => !m.read).length;

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() } as Message)));
      setMsgsLoading(false);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
      setProjLoading(false);
    });
  }, []);

  return (
<div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', paddingTop: 'var(--navbar-h)' }}>
      {/* ── Top Bar ── */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        'var(--space-4) var(--space-8)',
        borderBottom:   '1px solid var(--color-border)',
        background:     'var(--color-surface)',
       position: 'sticky',
top:      'var(--navbar-h)',
zIndex:   110,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <span style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'var(--text-lg)',
            fontWeight:    300,
            color:         'var(--color-text)',
            letterSpacing: '0.05em',
          }}>
            Fatimah<span style={{ color: 'var(--color-accent)' }}>.</span>
          </span>

          <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
            {(['messages', 'projects'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding:       '6px 14px',
                  border:        'none',
                  borderRadius:  'var(--radius-sm)',
                  background:    tab === t ? 'var(--color-border)' : 'transparent',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      'var(--text-xs)',
                  color:         tab === t ? 'var(--color-text)' : 'var(--color-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor:        'pointer',
                  transition:    'all 200ms',
                  display:       'flex',
                  alignItems:    'center',
                  gap:           'var(--space-2)',
                }}
              >
                {t === 'messages' ? '✉' : '◈'} {t}
                {t === 'messages' && unreadCount > 0 && (
                  <span style={{
                    background:   'var(--color-accent)',
                    color:        'var(--color-bg)',
                    fontSize:     '10px',
                    borderRadius: '100px',
                    padding:      '1px 6px',
                    fontWeight:   500,
                  }}>{unreadCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>{user?.email}</span>
          <button
            onClick={logout}
            style={{
              background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
              padding: '6px 14px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
              color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'color 200ms, border-color 200ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)'; }}
          >Sign Out</button>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        {tab === 'messages' ? (
          <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ flex: 1, display: 'flex', height: 'calc(100vh - 57px)' }}>
            <MessagesTab messages={messages} loading={msgsLoading} />
          </motion.div>
        ) : (
          <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ flex: 1, overflowY: 'auto' }}>
            <ProjectsTab projects={projects} loading={projLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 2px; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────
   Messages Tab
───────────────────────────────────────── */
function MessagesTab({ messages, loading }: { messages: Message[]; loading: boolean }) {
  const [selected, setSelected] = useState<Message | null>(null);
  const [filter,   setFilter]   = useState<'all' | 'unread' | 'read'>('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  const unreadCount = messages.filter(m => !m.read).length;
  const filtered    = messages.filter(m => {
    if (filter === 'unread') return !m.read;
    if (filter === 'read')   return  m.read;
    return true;
  });

  const markRead = async (msg: Message) => {
    if (!msg.read) await updateDoc(doc(db, 'messages', msg.id), { read: true });
    setSelected(msg);
  };

  const deleteMsg = async (id: string) => {
    setDeleting(id);
    await deleteDoc(doc(db, 'messages', id));
    if (selected?.id === id) setSelected(null);
    setDeleting(null);
  };

  return (
    <div style={{ display: 'flex', flex: 1, width: '100%' }}>

      {/* Sidebar */}
      <div style={{ width: '360px', flexShrink: 0, borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
        <div style={{ padding: 'var(--space-5) var(--space-6) var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-4)' }}>
            Messages ({filtered.length})
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
            {(['all', 'unread', 'read'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                flex: 1, padding: '6px', border: 'none', borderRadius: 'var(--radius-sm)',
                background: filter === f ? 'var(--color-border)' : 'transparent',
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
                color: filter === f ? 'var(--color-text)' : 'var(--color-muted)',
                letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 200ms',
              }}>
                {f === 'all' ? 'All' : f === 'unread' ? `Unread${unreadCount > 0 ? ` (${unreadCount})` : ''}` : 'Read'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
              <div style={{ width: '24px', height: '24px', border: '1px solid var(--color-border)', borderTop: '1px solid var(--color-accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 'var(--space-16)', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)', letterSpacing: '0.08em' }}>No messages yet.</p>
            </div>
          ) : filtered.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={() => markRead(msg)}
              style={{
                padding: 'var(--space-5) var(--space-6)', borderBottom: '1px solid var(--color-border)',
                cursor: 'pointer', position: 'relative', transition: 'background 200ms',
                background:   selected?.id === msg.id ? 'rgba(201,185,154,0.06)' : 'transparent',
                borderRight:  selected?.id === msg.id ? '2px solid var(--color-accent)' : '2px solid transparent',
              }}
            >
              {!msg.read && (
                <div style={{ position: 'absolute', top: 'var(--space-5)', right: 'var(--space-6)', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)', paddingRight: msg.read ? '0' : 'var(--space-6)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: msg.read ? 'var(--color-text-dim)' : 'var(--color-text)', fontWeight: msg.read ? 300 : 400 }}>{msg.name}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-muted)' }}>{formatDate(msg.createdAt)}</p>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)', marginBottom: 'var(--space-2)' }}>{msg.email}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-subtle)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{msg.message}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-8)' }}>
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: '680px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)', paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 300, color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-accent)', letterSpacing: '0.05em', textDecoration: 'none' }}>{selected.email}</a>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)', marginTop: 'var(--space-2)' }}>{formatDate(selected.createdAt)}</p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  
                    <a href={`mailto:${selected.email}?subject=Re: Your message&body=Hi ${selected.name},%0D%0A%0D%0A`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                      padding: '8px 16px', backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)',
                      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em',
                      textTransform: 'uppercase', borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    Reply ↗
                  </a>
                  <button
                    onClick={() => deleteMsg(selected.id)}
                    disabled={deleting === selected.id}
                    style={{
                      padding: '8px 16px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                      background: 'none', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
                      color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase',
                      cursor: 'pointer', transition: 'color 200ms, border-color 200ms',
                      opacity: deleting === selected.id ? 0.5 : 1,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#f87171'; e.currentTarget.style.color = '#f87171'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)'; }}
                  >
                    {deleting === selected.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-8)' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--color-text)', lineHeight: 1.8, fontWeight: 300, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)', color: 'var(--color-muted)', textAlign: 'center', minHeight: '60vh' }}
            >
              <div style={{ width: '48px', height: '48px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>✉</div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Select a message to read</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Projects Tab
───────────────────────────────────────── */
const emptyForm = {
  title:      '',
  titleAr:    '',
  slug:       '',
  role:       '',
  roleAr:     '',       // ← add
  year:       '',
  type:       'web',
  tags:       '',
  desc:       '',
  descAr:     '',       // ← add
  overview:   '',
  overviewAr: '',       // ← add
  color:      '#111111',
  accent:     '#c9b99a',
  liveUrl:    '',
  figmaUrl:   '',
  comingSoon: false,
  featured:   false,
  order:      0,
};

function ProjectsTab({ projects, loading }: { projects: Project[]; loading: boolean }) {
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState<typeof emptyForm>(emptyForm);
  const [saving,   setSaving]   = useState(false);
  const [editId,   setEditId]   = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleSave = async () => {
    if (!form.title || !form.role || !form.year || !form.desc || !form.slug) return;
    setSaving(true);
    try {
      const data = {
        title:      form.title,
        titleAr:    form.titleAr,
        slug:       form.slug,
        role:       form.role,
        year:       form.year,
        type:       form.type,
        tags:       form.tags.split(',').map(t => t.trim()).filter(Boolean),
        desc:       form.desc,
        overview:   form.overview,
        color:      form.color,
        accent:     form.accent,
        liveUrl:    form.liveUrl,
        figmaUrl:   form.figmaUrl,
        comingSoon: form.comingSoon,
        featured:   form.featured,
        order:      form.order,
        roleAr:     form.roleAr,
  descAr:     form.descAr,
  overviewAr: form.overviewAr,
      };

      if (editId) {
        await updateDoc(doc(db, 'projects', editId), data);
        setEditId(null);
      } else {
        await addDoc(collection(db, 'projects'), {
          ...data,
          visible:   true,
          sections:  [],
          images:    [],
          createdAt: serverTimestamp(),
        });
      }
      setForm(emptyForm);
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (p: Project) => {
    setForm({
      title:      p.title,
      titleAr:    p.titleAr    ?? '',
      slug:       p.slug       ?? '',
      role:       p.role,
      year:       p.year,
      type:       p.type       ?? 'web',
      tags:       Array.isArray(p.tags) ? p.tags.join(', ') : p.tags ?? '',
      desc:       p.desc,
      overview:   p.overview   ?? '',
      color:      p.color      ?? '#111111',
      accent:     p.accent     ?? '#c9b99a',
      liveUrl:    p.liveUrl    ?? '',
      figmaUrl:   p.figmaUrl   ?? '',
      comingSoon: p.comingSoon ?? false,
      featured:   p.featured   ?? false,
      order:      p.order      ?? 0,
      roleAr:     p.roleAr     ?? '',
  descAr:     p.descAr     ?? '',
  overviewAr: p.overviewAr ?? '',
    });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    await deleteDoc(doc(db, 'projects', id));
    setDeleting(null);
  };

  const toggleVisible = async (p: Project) => {
    await updateDoc(doc(db, 'projects', p.id), { visible: !p.visible });
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: '960px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>◈ Projects</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>{projects.length} project{projects.length !== 1 ? 's' : ''} in Firestore</p>
        </div>
        {!showForm && (
          <motion.button
            whileHover={{ opacity: 0.88 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
              padding: '10px 20px', backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)',
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em',
              textTransform: 'uppercase', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
            }}
          >
            + Add Project
          </motion.button>
        )}
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ padding: 'var(--space-8)', border: '1px solid var(--color-accent)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)', marginBottom: 'var(--space-8)' }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--space-6)' }}>
              {editId ? '✎ Edit Project' : '+ New Project'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>

              {/* Title + Arabic Title */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label style={labelStyle}>Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. Kutubly" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label style={labelStyle}>Arabic Title (optional)</label>
                  <input value={form.titleAr} onChange={e => setForm(f => ({ ...f, titleAr: e.target.value }))}
                    placeholder="e.g. كُتُبلي" style={{ ...inputStyle, direction: 'rtl' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>
              </div>

              {/* Slug + Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label style={labelStyle}>Slug * (used in URL: /work/slug)</label>
                  <input value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                    placeholder="e.g. kutubly" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label style={labelStyle}>Project Type *</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="web">Web App / Website</option>
                    <option value="mobile">Mobile App</option>
                    <option value="design">UI/UX Design</option>
                    <option value="development">Development</option>
                    <option value="both">Design + Development</option>
                  </select>
                </div>
              </div>

              {/* Role + Year + Order */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: 'var(--space-4)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
    <label style={labelStyle}>Role *</label>
    <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
      placeholder="e.g. UI/UX Designer" style={inputStyle}
      onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
      onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
    <label style={labelStyle}>Role — Arabic (اختياري)</label>
    <input value={form.roleAr} onChange={e => setForm(f => ({ ...f, roleAr: e.target.value }))}
      placeholder="e.g. مصممة UI/UX" style={{ ...inputStyle, direction: 'rtl' }}
      onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
      onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
  </div>
</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label style={labelStyle}>Year *</label>
                  <input value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                    placeholder="e.g. 2026" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label style={labelStyle}>Order</label>
                  <input type="number" value={form.order}
                    onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                    placeholder="0" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={labelStyle}>Tags (comma separated)</label>
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                  placeholder="e.g. Web App, React, UI/UX" style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                  onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
              </div>

              {/* Short Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={labelStyle}>Short Description * (shown on card)</label>
                <textarea value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                  placeholder="One or two sentences shown on the project card..." rows={2}
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                  onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
              </div>

              {/* Short Description Arabic */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
  <label style={labelStyle}>Short Description — Arabic (اختياري)</label>
  <textarea value={form.descAr} onChange={e => setForm(f => ({ ...f, descAr: e.target.value }))}
    placeholder="وصف قصير بالعربية..." rows={2}
    style={{ ...inputStyle, resize: 'none', lineHeight: 1.7, direction: 'rtl' }}
    onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
    onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
</div>

              {/* Overview */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label style={labelStyle}>Case Study Overview (shown on project page)</label>
                <textarea value={form.overview} onChange={e => setForm(f => ({ ...f, overview: e.target.value }))}
                  placeholder="Full overview paragraph for the case study page..." rows={4}
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.7 }}
                  onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                  onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
              </div>

              {/* Overview Arabic */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
  <label style={labelStyle}>Case Study Overview — Arabic (اختياري)</label>
  <textarea value={form.overviewAr} onChange={e => setForm(f => ({ ...f, overviewAr: e.target.value }))}
    placeholder="نظرة عامة على المشروع بالعربية..." rows={4}
    style={{ ...inputStyle, resize: 'none', lineHeight: 1.7, direction: 'rtl' }}
    onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
    onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
</div>


              {/* Colors */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label style={labelStyle}>Card Background Color</label>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                    <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                      style={{ width: '40px', height: '36px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'none', cursor: 'pointer', padding: '2px' }} />
                    <input value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                      placeholder="#111111" style={{ ...inputStyle, flex: 1 }}
                      onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                      onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label style={labelStyle}>Accent Color</label>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                    <input type="color" value={form.accent} onChange={e => setForm(f => ({ ...f, accent: e.target.value }))}
                      style={{ width: '40px', height: '36px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'none', cursor: 'pointer', padding: '2px' }} />
                    <input value={form.accent} onChange={e => setForm(f => ({ ...f, accent: e.target.value }))}
                      placeholder="#c9b99a" style={{ ...inputStyle, flex: 1 }}
                      onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                      onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
                  </div>
                </div>
              </div>

              {/* Links */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label style={labelStyle}>Live URL (optional)</label>
                  <input value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))}
                    placeholder="https://..." style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label style={labelStyle}>Figma URL (optional)</label>
                  <input value={form.figmaUrl} onChange={e => setForm(f => ({ ...f, figmaUrl: e.target.value }))}
                    placeholder="https://figma.com/..." style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--color-accent)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--color-border)')} />
                </div>
              </div>

              {/* Flags */}
              <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center', paddingTop: 'var(--space-2)' }}>
                {[
                  { key: 'comingSoon', label: 'Coming Soon (hides case study content)' },
                  { key: 'featured',   label: 'Featured Project' },
                ].map(flag => (
                  <label key={flag.key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form[flag.key as keyof typeof form] as boolean}
                      onChange={e => setForm(f => ({ ...f, [flag.key]: e.target.checked }))}
                      style={{ accentColor: 'var(--color-accent)', width: '14px', height: '14px' }}
                    />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)', letterSpacing: '0.06em' }}>{flag.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Form actions */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              <motion.button
                whileHover={{ opacity: 0.88 }} whileTap={{ scale: 0.97 }}
                onClick={handleSave} disabled={saving}
                style={{
                  padding: '10px 24px', backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)',
                  fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em',
                  textTransform: 'uppercase', border: 'none', borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer', opacity: saving ? 0.6 : 1,
                }}
              >
                {saving ? 'Saving...' : editId ? 'Save Changes' : 'Add Project'}
              </motion.button>
              <button onClick={handleCancel} style={{
                padding: '10px 24px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                background: 'none', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
                color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
              }}>
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects list */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-16)' }}>
          <div style={{ width: '24px', height: '24px', border: '1px solid var(--color-border)', borderTop: '1px solid var(--color-accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        </div>
      ) : projects.length === 0 ? (
        <div style={{ padding: 'var(--space-16)', textAlign: 'center', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)', letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>No projects added yet.</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)', opacity: 0.6 }}>Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-4)',
                alignItems: 'center', padding: 'var(--space-5) var(--space-6)',
                background: project.visible ? 'var(--color-surface)' : 'rgba(14,14,14,0.6)',
                transition: 'background 200ms',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-1)' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: project.visible ? 'var(--color-text)' : 'var(--color-muted)', fontWeight: 400, transition: 'color 200ms' }}>
                    {project.title}
                  </p>
                  {project.slug && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-muted)', opacity: 0.6 }}>/work/{project.slug}</span>
                  )}
                  {!project.visible && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-muted)', border: '1px solid var(--color-border)', borderRadius: '100px', padding: '1px 7px', letterSpacing: '0.06em' }}>hidden</span>
                  )}
                  {project.comingSoon && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-accent)', border: '1px solid var(--color-accent)40', borderRadius: '100px', padding: '1px 7px', letterSpacing: '0.06em' }}>coming soon</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>{project.role}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>{project.year}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted)' }}>{project.type}</p>
                  {project.tags && (
                    <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
                      {(Array.isArray(project.tags) ? project.tags : project.tags.split(',')).slice(0, 3).map(tag => (
                        <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-muted)', border: '1px solid var(--color-border)', borderRadius: '100px', padding: '1px 7px' }}>{typeof tag === 'string' ? tag.trim() : tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <button onClick={() => toggleVisible(project)} style={{
                  padding: '6px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                  background: 'none', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
                  color: project.visible ? 'var(--color-accent)' : 'var(--color-muted)',
                  cursor: 'pointer', transition: 'all 200ms', letterSpacing: '0.06em',
                }}>
                  {project.visible ? '● Visible' : '○ Hidden'}
                </button>
                <button onClick={() => handleEdit(project)} style={{
                  padding: '6px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                  background: 'none', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
                  color: 'var(--color-muted)', cursor: 'pointer', transition: 'all 200ms',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)'; }}
                >✎ Edit</button>
                <button onClick={() => handleDelete(project.id)} disabled={deleting === project.id} style={{
                  padding: '6px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                  background: 'none', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
                  color: 'var(--color-muted)', cursor: 'pointer', transition: 'all 200ms',
                  opacity: deleting === project.id ? 0.5 : 1,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#f87171'; e.currentTarget.style.color = '#f87171'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)'; }}
                >
                  {deleting === project.id ? '...' : '✕ Delete'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}