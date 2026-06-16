import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { salons, areasList, categories } from '../data/salons';
import SalonCard from '../components/salon/SalonCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const BrowsePage: React.FC = () => {
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get('search') || '');
  const [areas, setAreas] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [price, setPrice] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [sort, setSort] = useState('top-rated');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = salons.filter(s => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.area.toLowerCase().includes(search.toLowerCase())) return false;
      if (areas.length && !areas.includes(s.area)) return false;
      if (cats.length && !s.services.some(sv => cats.includes(sv.category))) return false;
      if (price === 'under-500' && s.startingPrice >= 500) return false;
      if (price === '500-1000' && (s.startingPrice < 500 || s.startingPrice >= 1000)) return false;
      if (price === '1000+' && s.startingPrice < 1000) return false;
      if (rating && s.rating < rating) return false;
      return true;
    });
    if (sort === 'top-rated') result.sort((a, b) => b.rating - a.rating);
    else if (sort === 'lowest-price') result.sort((a, b) => a.startingPrice - b.startingPrice);
    return result;
  }, [search, areas, cats, price, rating, sort]);

  const FilterPanel = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Area</h4>
        <div className="space-y-1">
          {areasList.map(a => (
            <label key={a.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={areas.includes(a.id)} onChange={() => setAreas(p => p.includes(a.id) ? p.filter(x => x !== a.id) : [...p, a.id])} className="rounded" />
              {a.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Service</h4>
        <div className="space-y-1">
          {categories.map(c => (
            <label key={c.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={cats.includes(c.id)} onChange={() => setCats(p => p.includes(c.id) ? p.filter(x => x !== c.id) : [...p, c.id])} className="rounded" />
              {c.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Price</h4>
        {['under-500', '500-1000', '1000+'].map(p => (
          <label key={p} className="flex items-center gap-2 text-sm">
            <input type="radio" name="price" checked={price === p} onChange={() => setPrice(p === price ? null : p)} />
            {p.replace('-', ' - ').replace('+', '+').replace('under', 'Under ')}
          </label>
        ))}
      </div>
      <div>
        <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Rating</h4>
        {[4.5, 4, 3].map(r => (
          <label key={r} className="flex items-center gap-2 text-sm">
            <input type="radio" name="rating" checked={rating === r} onChange={() => setRating(r === rating ? null : r)} />
            {r}+ Stars
          </label>
        ))}
      </div>
      <Button variant="ghost" size="sm" onClick={() => { setAreas([]); setCats([]); setPrice(null); setRating(null); }}>Clear All</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white dark:bg-surface border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Browse Salons</h1>
          <p className="text-gray-500">Discover the best beauty salons in Jaipur</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card><h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white"><SlidersHorizontal className="w-4 h-4" /> Filters</h3><FilterPanel /></Card>
          </aside>
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search salons..." className="flex-1 px-4 py-2 rounded-xl border" />
              <select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-2 rounded-xl border">
                <option value="top-rated">Top Rated</option>
                <option value="lowest-price">Lowest Price</option>
              </select>
              <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border">
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">{filtered.length} salons found</p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{filtered.map(s => <SalonCard key={s.id} salon={s} />)}</div>
            ) : (
              <Card className="text-center py-12"><p className="text-gray-500">No salons found. Try different filters.</p></Card>
            )}
          </main>
        </div>
      </div>
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-surface p-6 overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
            </div>
            <FilterPanel />
            <Button fullWidth className="mt-4" onClick={() => setShowFilters(false)}>Apply</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
