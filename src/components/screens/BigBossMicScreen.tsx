import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { AnnouncementType } from '../../types';
import { PixelAvatar } from '../pixel/PixelAvatar';
import {
  PixelMegaphone,
  PixelPlus
} from '../pixel/PixelIcons';

export const BigBossMicScreen: React.FC = () => {
  const { state, dispatch } = useGame();

  const [message, setMessage] = useState('');
  const [announcementType, setAnnouncementType] = useState<AnnouncementType>('Info');

  const presets = [
    { text: "Big Boss is watching you. Every git commit is tracked.", type: "Info" as const },
    { text: "DOUBLE POINTS for the next task! Speed and precision matter.", type: "Twist" as const },
    { text: "Nominations are officially OPEN! Report to the diary room.", type: "Warning" as const },
    { text: "HOUSE PENALTY: Someone pushed directly to main! -10 PTS house fine.", type: "Warning" as const },
    { text: "SURPRISE TWIST: The House Captain must choose one hacker to grant immunity.", type: "Twist" as const },
    { text: "EVICTION WARNING: Code review results will be published at midnight.", type: "Eviction Notice" as const }
  ];

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    dispatch({
      type: 'BROADCAST_ANNOUNCEMENT',
      message: message.trim(),
      announcementType
    });

    setMessage('');
  };

  const handleSelectPreset = (p: typeof presets[0]) => {
    setMessage(p.text);
    setAnnouncementType(p.type);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pixel-panel-magenta p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PixelMegaphone size={20} />
            <span className="font-arcade text-xs text-[#FFD51E]">HOUSE PA SYSTEM</span>
          </div>
          <h2 className="font-arcade text-xl sm:text-2xl text-[#FFF6E5]">
            BIG BOSS MIC (ANNOUNCEMENTS)
          </h2>
          <p className="font-pixel text-xl text-[#FFF6E5]/80">
            Transmit executive decrees to the house with RPG dialogue banners and synthetic audio.
          </p>
        </div>

        {/* TTS Toggle */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_TTS' })}
          className={`px-3 py-2 font-arcade text-xs border-2 border-[#14023A] shrink-0 ${
            state.ttsEnabled
              ? 'bg-[#FFD51E] text-[#14023A] font-bold'
              : 'bg-[#14023A] text-[#FFF6E5]'
          }`}
          title="Synthesizer Voice narration"
        >
          VOICE TTS: {state.ttsEnabled ? 'ENABLED' : 'MUTED'}
        </button>
      </div>

      {/* Composer Panel */}
      <div className="pixel-panel-yellow p-6 shadow-[6px_6px_0_#14023A]">
        <div className="flex items-center gap-3 mb-4 border-b-2 border-[#14023A] pb-3">
          <div className="p-1 bg-[#14023A] border-2 border-[#FFD51E]">
            <PixelAvatar seed={999} size={48} isBigBoss={true} isBobbing={true} />
          </div>
          <div>
            <h3 className="font-arcade text-sm text-[#FFD51E]">
              BIG BOSS CONSOLE TRANSMITTER
            </h3>
            <span className="font-pixel text-lg text-[#FFF6E5]">
              Type your reality message or click a reality drama preset below.
            </span>
          </div>
        </div>

        <form onSubmit={handleBroadcast} className="space-y-4">
          <div>
            <label className="font-arcade text-[10px] text-[#14023A] block mb-1 font-bold">
              TRANSMISSION TYPE:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Info', 'Warning', 'Twist', 'Eviction Notice'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAnnouncementType(type)}
                  className={`py-2 font-arcade text-[10px] border-2 transition-all ${
                    announcementType === type
                      ? 'bg-[#14023A] text-[#FFD51E] border-[#14023A] font-bold shadow-[2px_2px_0_#14023A]'
                      : 'bg-[#5003C0] text-[#FFF6E5] border-[#14023A] hover:bg-[#AB03A9]'
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-arcade text-[10px] text-[#14023A] block mb-1 font-bold">
              MESSAGE TEXT:
            </label>
            <textarea
              rows={3}
              required
              placeholder="e.g. Attention House: Today's captain immunity challenge begins now..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#14023A] p-3 font-pixel text-2xl focus:border-[#FFD51E]"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <span className="font-pixel text-lg text-[#14023A] font-bold">
              Auto-displays RPG dialogue box across the entire house.
            </span>

            <button
              type="submit"
              disabled={!message.trim()}
              className="pixel-btn-pink px-6 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <PixelMegaphone size={16} />
              <span>BROADCAST TO HOUSE ▶</span>
            </button>
          </div>
        </form>
      </div>

      {/* Quick Drama Presets */}
      <div className="pixel-panel p-5">
        <h3 className="font-arcade text-xs text-[#FFD51E] mb-3">
          REALITY DRAMA PRESETS:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(p)}
              className="text-left p-3 bg-[#14023A] border-2 border-[#AB03A9] hover:border-[#FFD51E] hover:bg-[#5003C0] transition-colors"
            >
              <span className="font-arcade text-[9px] text-[#FFD51E] block mb-1">
                [{p.type.toUpperCase()}]
              </span>
              <p className="font-pixel text-xl text-[#FFF6E5] leading-snug">
                "{p.text}"
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Broadcast History List */}
      <div className="pixel-panel p-5">
        <h3 className="font-arcade text-xs text-[#FFD51E] mb-3">
          TRANSMISSION ARCHIVE ({state.announcements.length}):
        </h3>

        {state.announcements.length === 0 ? (
          <p className="font-pixel text-xl text-[#FFF6E5]/70">No announcements in history.</p>
        ) : (
          <div className="space-y-3">
            {state.announcements.map(ann => (
              <div
                key={ann.id}
                className="p-3 bg-[#14023A] border-2 border-[#AB03A9]"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-arcade text-[9px] px-1.5 py-0.5 bg-[#5003C0] text-[#FFD51E] border border-[#AB03A9]">
                      {ann.type.toUpperCase()}
                    </span>
                    <span className="font-pixel text-lg text-[#FFF6E5]/60">
                      Day {ann.day} · {ann.timestamp}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      dispatch({
                        type: 'BROADCAST_ANNOUNCEMENT',
                        message: ann.message,
                        announcementType: ann.type
                      });
                    }}
                    className="font-arcade text-[9px] text-[#FFD51E] hover:underline"
                  >
                    RE-AIR ↺
                  </button>
                </div>
                <p className="font-pixel text-xl text-[#FFF6E5] leading-snug">
                  "{ann.message}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
