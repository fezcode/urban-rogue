import { world } from '../data/world';
import { items } from '../data/items';

const CITY_EMOJIS = {
  'New York': '🗽',
  'Istanbul': '🕌',
  'Ankara': '🏛️',
  'Tokyo': '⛩️',
  'Rome': '🏛️',
  'London': '🎡',
  'Paris': '🗼',
};

export default function Sidebar({ player, currentRoom, visitedCities }) {
  const room = world[currentRoom];
  const hpPercent = (player.hp / player.maxHp) * 100;
  const hpColor =
    hpPercent > 60 ? 'var(--success)' : hpPercent > 30 ? 'var(--accent)' : 'var(--danger)';

  const xpToNext = player.level * 50;
  const xpPercent = Math.min(100, (player.xp / xpToNext) * 100);

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Urban Rogue</div>
      <div className="sidebar-subtitle">Terminal Adventure</div>

      {/* Location */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Location</div>
        <div className="stat-row">
          <span className="stat-label">City</span>
          <span className="city-badge">
            {CITY_EMOJIS[room.city] || '🌍'} {room.city}
          </span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Area</span>
          <span className="stat-value" style={{ fontSize: '0.75rem' }}>{room.name}</span>
        </div>
      </div>

      <hr className="sidebar-divider" />

      {/* Vitals */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Vitals</div>

        {player.poisoned && (
          <div className="poison-indicator">☠️ Poisoned</div>
        )}

        <div className="stat-row">
          <span className="stat-label">HP</span>
          <span className={`stat-value ${hpPercent <= 30 ? 'danger' : 'hp'}`}>
            {player.hp}/{player.maxHp}
          </span>
        </div>
        <div className="hp-bar-container">
          <div
            className="hp-bar"
            style={{ width: `${hpPercent}%`, background: hpColor }}
          />
        </div>

        <div className="stat-row" style={{ marginTop: 8 }}>
          <span className="stat-label">Level</span>
          <span className="stat-value">{player.level}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">XP</span>
          <span className="stat-value">{player.xp} / {xpToNext}</span>
        </div>
        <div className="hp-bar-container">
          <div
            className="hp-bar"
            style={{ width: `${xpPercent}%`, background: 'var(--accent-blue)' }}
          />
        </div>

        <div className="stat-row" style={{ marginTop: 8 }}>
          <span className="stat-label">Currency</span>
          <span className="stat-value currency">${player.currency}</span>
        </div>
      </div>

      <hr className="sidebar-divider" />

      {/* Weapon */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Weapon</div>
        <div className="stat-row">
          <span className="stat-label">
            {player.equippedWeapon
              ? `${items[player.equippedWeapon]?.emoji} ${items[player.equippedWeapon]?.name}`
              : '👊 Fists'}
          </span>
          <span className="stat-value">
            {player.equippedWeapon
              ? `${items[player.equippedWeapon]?.damage} dmg`
              : '5 dmg'}
          </span>
        </div>
      </div>

      <hr className="sidebar-divider" />

      {/* Inventory */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          Inventory ({player.inventory.length})
        </div>
        {player.inventory.length === 0 ? (
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Empty</div>
        ) : (
          <ul className="inventory-list">
            {player.inventory.map((id, idx) => {
              const item = items[id];
              const isEquipped = player.equippedWeapon === id;
              return (
                <li key={`${id}-${idx}`} className="inventory-item">
                  <span className="item-emoji">{item?.emoji || '•'}</span>
                  <span className="item-name">{item?.name || id}</span>
                  {isEquipped && <span className="equipped-badge">EQ</span>}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <hr className="sidebar-divider" />

      {/* Visited Cities */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          Cities Visited ({visitedCities.size}/7)
        </div>
        <div className="visited-cities">
          {[...visitedCities].map((city) => (
            <span key={city} className="visited-city">
              {CITY_EMOJIS[city] || '🌍'} {city}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
