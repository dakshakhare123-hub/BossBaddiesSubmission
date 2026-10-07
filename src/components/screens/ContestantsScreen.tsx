import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Contestant, TeamName, ContestantStatus } from '../../types';
import { ContestantCard } from '../contestants/ContestantCard';
import { PixelPlus, PixelSkull } from '../pixel/PixelIcons';

export const ContestantsScreen: React.FC = () => {
  const { activeContestants, dispatch } = useGame();

  const [search, setSearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<TeamName | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<ContestantStatus | 'All'>('All');

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContestantName, setNewContestantName] = useState('');
  const [newContestantTeam, setNewContestantTeam] = useState<TeamName>('Frontend Falcons');
  const [newContestantBio, setNewContestantBio] = useState('');

  const [customPointsTarget, setCustomPointsTarget] = useState<Contestant | null>(null);
  const [customPointsAmount, setCustomPointsAmount] = useState('20');
  const [customPointsReason, setCustomPointsReason] = useState('');
  const [customPointsIsGain, setCustomPointsIsGain] = useState(true);

  const [evictTarget, setEvictTarget] = useState<Contestant | null>(null);

  // Filter logic
  const filteredContestants = activeContestants.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.team.toLowerCase().includes(search.toLowerCase());
    const matchesTeam = selectedTeam === 'All' || c.team === selectedTeam;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesSearch && matchesTeam && matchesStatus;
  });

  const handleAddContestant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContestantName.trim()) return;

    dispatch({
      type: 'ADD_CONTESTANT',
      contestant: {
        name: newContestantName.trim(),
        team: newContestantTeam,
        bio: newContestantBio.trim() || undefined
      }
    });

    setNewContestantName('');
    setNewContestantBio('');
    setShowAddModal(false);
  };

  const handleApplyCustomPoints = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPointsTarget) return;

    const amt = parseInt(customPointsAmount, 10);
    if (isNaN(amt) || amt <= 0) return;

    const delta = customPointsIsGain ? amt : -amt;
    dispatch({
      type: 'UPDATE_POINTS',
      contestantId: customPointsTarget.id,
      delta,
      reason: customPointsReason.trim() || undefined
    });

    setCustomPointsTarget(null);
    setCustomPointsReason('');
  };

  const handleExecuteEvict = () => {
    if (!evictTarget) return;
    dispatch({ type: 'EVICT_CONTESTANT', contestantId: evictTarget.id });
    setEvictTarget(null);
  };

  const teams: (TeamName | 'All')[] = [
    'All',
    'Frontend Falcons',
    'Backend Bears',
    'DevOps Dragons',
    'AI Aliens'
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header & Add Button */}
      <div className="pixel-panel-magenta p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-arcade text-xs text-[#FFD51E]">CONTESTANT ROSTER</span>
            <span className="font-arcade text-[10px] px-2 py-0.5 bg-[#14023A] text-[#FFF6E5]">
              {activeContestants.length} ACTIVE IN HOUSE
            </span>
          </div>
          <h2 className="font-arcade text-xl sm:text-2xl text-[#FFF6E5]">
            TECH HOUSE CONTESTANTS
          </h2>
          <p className="font-pixel text-xl text-[#FFF6E5]/80">
            Control points, bestow captaincy, grant immunity, or put hackers on the eviction block. Points are clamped at 0.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="pixel-btn-yellow px-4 py-2.5 text-xs flex items-center justify-center gap-2 shrink-0"
        >
          <PixelPlus size={16} />
          <span>ADD CONTESTANT</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="pixel-panel p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="flex-1">
            <label className="font-arcade text-[10px] text-[#FFD51E] block mb-1">
              SEARCH HACKER:
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name (e.g. Debug Dave)..."
              className="w-full bg-[#14023A] text-[#FFF6E5] placeholder-[#FFF6E5]/40 border-2 border-[#AB03A9] px-3 py-2 font-pixel text-xl focus:border-[#FFD51E]"
            />
          </div>

          {/* Status filter */}
          <div className="w-full md:w-56">
            <label className="font-arcade text-[10px] text-[#FFD51E] block mb-1">
              FILTER STATUS:
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ContestantStatus | 'All')}
              className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#AB03A9] px-3 py-2 font-pixel text-xl focus:border-[#FFD51E]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Nominated">Nominated</option>
              <option value="Immune">Immune</option>
            </select>
          </div>
        </div>

        {/* Team Segmented Filter Tabs */}
        <div>
          <label className="font-arcade text-[10px] text-[#FFD51E] block mb-1.5">
            FILTER BY TEAM:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {teams.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTeam(t)}
                className={`font-arcade text-[10px] px-3 py-1.5 border-2 transition-all ${
                  selectedTeam === t
                    ? 'bg-[#FFD51E] text-[#14023A] border-[#14023A] font-bold shadow-[2px_2px_0_#14023A]'
                    : 'bg-[#14023A] text-[#FFF6E5] border-[#AB03A9] hover:bg-[#AB03A9]'
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contestants Grid (3 col desktop, 2 col tablet, 1 col mobile) */}
      {filteredContestants.length === 0 ? (
        <div className="pixel-panel p-12 text-center">
          <p className="font-pixel text-3xl text-[#FFF6E5] mb-2">No hackers found matching filters.</p>
          <button
            onClick={() => { setSearch(''); setSelectedTeam('All'); setSelectedStatus('All'); }}
            className="pixel-btn-yellow mt-2 px-4 py-2 text-xs"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContestants.map(c => (
            <ContestantCard
              key={c.id}
              contestant={c}
              onOpenCustomPoints={(target) => setCustomPointsTarget(target)}
              onConfirmEvict={(target) => setEvictTarget(target)}
            />
          ))}
        </div>
      )}

      {/* MODAL 1: Add Contestant */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#14023A]/80 flex items-center justify-center p-4">
          <div className="pixel-panel-yellow max-w-md w-full p-6 shadow-[8px_8px_0_#14023A]">
            <div className="flex items-center justify-between border-b-2 border-[#14023A] pb-2 mb-4">
              <h3 className="font-arcade text-sm text-[#FFD51E]">ADD CONTESTANT</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="font-arcade text-xs text-[#14023A] hover:bg-[#FF467A] px-2 py-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddContestant} className="space-y-4">
              <div>
                <label className="font-arcade text-[10px] text-[#14023A] block mb-1 font-bold">
                  CONTESTANT NAME:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Async Alex, Redux Rita..."
                  value={newContestantName}
                  onChange={(e) => setNewContestantName(e.target.value)}
                  className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#14023A] px-3 py-2 font-pixel text-xl"
                />
              </div>

              <div>
                <label className="font-arcade text-[10px] text-[#14023A] block mb-1 font-bold">
                  ASSIGN SQUAD / TEAM:
                </label>
                <select
                  value={newContestantTeam}
                  onChange={(e) => setNewContestantTeam(e.target.value as TeamName)}
                  className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#14023A] px-3 py-2 font-pixel text-xl"
                >
                  <option value="Frontend Falcons">Frontend Falcons</option>
                  <option value="Backend Bears">Backend Bears</option>
                  <option value="DevOps Dragons">DevOps Dragons</option>
                  <option value="AI Aliens">AI Aliens</option>
                </select>
              </div>

              <div>
                <label className="font-arcade text-[10px] text-[#14023A] block mb-1 font-bold">
                  TECH QUOTE / BIO:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Refuses to write CSS without SCSS."
                  value={newContestantBio}
                  onChange={(e) => setNewContestantBio(e.target.value)}
                  className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#14023A] px-3 py-2 font-pixel text-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="pixel-btn-violet px-4 py-2 text-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="pixel-btn-pink px-4 py-2 text-xs"
                >
                  SPAWN HACKER ▶
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Custom Points Amount & Reason */}
      {customPointsTarget && (
        <div className="fixed inset-0 z-50 bg-[#14023A]/80 flex items-center justify-center p-4">
          <div className="pixel-panel max-w-md w-full p-6 shadow-[8px_8px_0_#14023A]">
            <div className="flex items-center justify-between border-b-2 border-[#AB03A9] pb-2 mb-4">
              <h3 className="font-arcade text-xs sm:text-sm text-[#FFD51E]">
                ADJUST POINTS: {customPointsTarget.name.toUpperCase()}
              </h3>
              <button
                onClick={() => setCustomPointsTarget(null)}
                className="font-arcade text-xs text-[#FFF6E5] hover:text-[#FF467A]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplyCustomPoints} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCustomPointsIsGain(true)}
                  className={`flex-1 py-2 font-arcade text-xs border-2 ${
                    customPointsIsGain
                      ? 'bg-[#FFD51E] text-[#14023A] border-[#14023A] font-bold'
                      : 'bg-[#14023A] text-[#FFF6E5] border-[#AB03A9]'
                  }`}
                >
                  + AWARD (GAIN)
                </button>
                <button
                  type="button"
                  onClick={() => setCustomPointsIsGain(false)}
                  className={`flex-1 py-2 font-arcade text-xs border-2 ${
                    !customPointsIsGain
                      ? 'bg-[#FF467A] text-[#14023A] border-[#14023A] font-bold'
                      : 'bg-[#14023A] text-[#FFF6E5] border-[#AB03A9]'
                  }`}
                >
                  - PENALIZE (LOSS)
                </button>
              </div>

              <div>
                <label className="font-arcade text-[10px] text-[#FFD51E] block mb-1">
                  POINTS AMOUNT:
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  required
                  value={customPointsAmount}
                  onChange={(e) => setCustomPointsAmount(e.target.value)}
                  className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#AB03A9] px-3 py-2 font-pixel text-2xl"
                />
                <span className="font-pixel text-base text-[#FFF6E5]/70 block mt-1">
                  Note: Total points are clamped at minimum 0.
                </span>
              </div>

              <div>
                <label className="font-arcade text-[10px] text-[#FFD51E] block mb-1">
                  REASON / CITATION:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fixed zero-day bug, or dropped production DB..."
                  value={customPointsReason}
                  onChange={(e) => setCustomPointsReason(e.target.value)}
                  className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#AB03A9] px-3 py-2 font-pixel text-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCustomPointsTarget(null)}
                  className="pixel-btn-violet px-4 py-2 text-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className={customPointsIsGain ? 'pixel-btn-yellow px-4 py-2 text-xs' : 'pixel-btn-pink px-4 py-2 text-xs'}
                >
                  {customPointsIsGain ? 'APPLY GAIN ▶' : 'APPLY PENALTY ▶'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Confirm Eviction */}
      {evictTarget && (
        <div className="fixed inset-0 z-50 bg-[#14023A]/85 flex items-center justify-center p-4">
          <div className="pixel-panel-pink max-w-md w-full p-6 text-center shadow-[8px_8px_0_#14023A]">
            <div className="inline-flex items-center gap-2 mb-2">
              <PixelSkull size={24} />
              <h3 className="font-arcade text-base sm:text-lg text-[#FF467A]">
                CONFIRM EVICTION
              </h3>
              <PixelSkull size={24} />
            </div>

            <p className="font-pixel text-2xl text-[#FFF6E5] my-4 leading-normal">
              Are you sure Big Boss wants to evict <strong className="text-[#FFD51E]">{evictTarget.name}</strong> from the Tech House?
            </p>

            <p className="font-pixel text-lg text-[#FF467A] mb-6">
              Eviction will strip all flags, captaincy, and remove them from the active house into the Evicted Hall.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleExecuteEvict}
                className="pixel-btn-pink px-6 py-2.5 text-xs font-bold"
              >
                YES, EVICT HACKER!
              </button>
              <button
                onClick={() => setEvictTarget(null)}
                className="pixel-btn-violet px-4 py-2.5 text-xs"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
