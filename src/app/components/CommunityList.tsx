const communities = [
  { icon: '🎮', name: 'r/DestinyTheGame', members: '3,341,931' },
  { icon: '🌸', name: 'r/anime', members: '13,894,374' },
  { icon: '⚡', name: 'r/destiny2', members: '915,724' },
  { icon: '🪐', name: 'r/FortNiteBR', members: '5,604,148' },
  { icon: '🐉', name: 'r/dndnext', members: '791,878' },
];

const CommunityList = () => (
  <aside className="community-list">
    <h2 style={{ fontSize: 10, fontWeight: 700, marginBottom: 16, color: '#888', letterSpacing: '-0.5px' }}>POPULAR COMMUNITIES</h2>
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {communities.map((c) => (
        <li key={c.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 14, marginRight: 12 }}>{c.icon}</span>
          <div>
            <div style={{ fontWeight: 400,color: '#888' }}>{c.name}</div>
            <div style={{ color: '#888', fontSize: 12 }}>{c.members} members</div>
          </div>
        </li>
      ))}
    </ul>
    <div style={{ color: '#0079d3', fontSize: 14, marginTop: 8, cursor: 'pointer' }}>See more</div>
  </aside>
);

export default CommunityList; 