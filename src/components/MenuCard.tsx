import { ArrowUpRight, Heart, Plus, Check } from 'lucide-react';
import type { MenuItem } from '../features/menu/types';
import { formatPrice, isActiveSpecial } from '../features/menu/menu';

export function MenuCard({ item, saved, added, onSave, onOpen, onAdd }: {
  item: MenuItem; saved: boolean; added: boolean; onSave(): void; onOpen(): void; onAdd(): void;
}) {
  return <article className={`food-card ${item.soldOut ? 'is-sold-out' : ''}`}>
    <div className="food-image-wrap">
      <button className="photo-button" onClick={onOpen} aria-label={`View ${item.name}`}>
        <img src={item.image.url} alt={item.image.alt} width="600" height="480" loading="lazy" />
      </button>
      <span className={`food-badge ${item.soldOut ? 'muted-badge' : ''}`}>{item.soldOut ? 'Sold out · sample status' : isActiveSpecial(item) ? 'Special' : item.category === 'cakes' ? 'Made for you' : item.featured ? 'Dooks favourite' : 'On the menu'}</span>
      <button className={`save-button ${saved ? 'is-saved' : ''}`} aria-label={`${saved ? 'Unsave' : 'Save'} ${item.name}`} aria-pressed={saved} onClick={onSave}><Heart size={19} fill={saved ? 'currentColor' : 'none'} /></button>
    </div>
    <div className="food-card-body">
      <button className="dish-title" onClick={onOpen}><h3>{item.name}</h3><ArrowUpRight size={19} /></button>
      <p>{item.description}</p>
      <div className="card-bottom"><div><small>{item.pricing.type === 'quote' ? 'Individually quoted' : 'Guide price'}</small><strong>{formatPrice(item.pricing)}</strong></div>
        <button className={`add-button ${added ? 'is-added' : ''}`} disabled={item.soldOut} onClick={onAdd} aria-label={`${added ? 'Add another' : 'Add'} ${item.name} to enquiry`}>{added ? <Check size={18} /> : <Plus size={20} />}</button>
      </div>
    </div>
  </article>;
}
