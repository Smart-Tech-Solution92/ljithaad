import React, { useState, useEffect } from 'react';

const islamicSubreddits = [
  { icon: '🕌', name: 'islam' },
  { icon: '📖', name: 'Muslim' },
  { icon: '🌙', name: 'islamicmemes' },
  { icon: '🕋', name: 'quran' },
  { icon: '🤲', name: 'MuslimLounge' },
];

const CommunityList = () => {
  const [subsData, setSubsData] = useState<
    { icon: string; name: string; members?: number; error?: string }[]
  >(islamicSubreddits);

  useEffect(() => {
    async function fetchCounts() {
      const updatedData = await Promise.all(
        islamicSubreddits.map(async (sub) => {
          try {
            const res = await fetch(`https://www.reddit.com/r/${sub.name}/about.json`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            const members = json.data.subscribers;
            return { ...sub, members };
          } catch (e:any) {
            return { ...sub, error: e.message || 'Failed to fetch' };
          }
        })
      );
      setSubsData(updatedData);
    }

    fetchCounts();
  }, []);

  return (
    <aside className="community-list">
      <h2 style={{ fontSize: 10, fontWeight: 700, marginBottom: 16, color: '#888', letterSpacing: '-0.5px' }}>
        ISLAMIC COMMUNITIES
      </h2>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {subsData.map((c) => (
          <li key={c.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 14, marginRight: 12 }}>{c.icon}</span>
            <div>
              <div style={{ fontWeight: 400, color: '#888' }}>{`r/${c.name}`}</div>
              <div style={{ color: '#888', fontSize: 12 }}>
                {c.error
                  ? `Error: ${c.error}`
                  : c.members !== undefined
                  ? new Intl.NumberFormat().format(c.members) + ' members'
                  : 'Loading...'}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ color: '#0079d3', fontSize: 14, marginTop: 8, cursor: 'pointer' }}>See more</div>
    </aside>
  );
};

export default CommunityList;
