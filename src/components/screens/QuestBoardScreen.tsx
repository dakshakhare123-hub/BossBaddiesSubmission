import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Task, TaskStatus } from '../../types';
import {
  PixelSwords,
  PixelPlus,
  PixelCoin,
  PixelCheck
} from '../pixel/PixelIcons';

export const QuestBoardScreen: React.FC = () => {
  const { state, dispatch, activeContestants } = useGame();

  const [filter, setFilter] = useState<TaskStatus | 'All'>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskPoints, setTaskPoints] = useState('30');
  const [assignedTo, setAssignedTo] = useState('Whole House');

  const filteredTasks = state.tasks.filter(t => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const pts = parseInt(taskPoints, 10);
    dispatch({
      type: 'CREATE_TASK',
      task: {
        title: taskTitle.trim(),
        description: taskDesc.trim(),
        points: isNaN(pts) ? 25 : pts,
        assignedTo
      }
    });

    setTaskTitle('');
    setTaskDesc('');
    setTaskPoints('30');
    setAssignedTo('Whole House');
    setShowCreateModal(false);
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#FFD51E] text-[#14023A] border-[#14023A] font-bold';
      case 'In Progress':
        return 'bg-[#AB03A9] text-[#FFF6E5] border-[#FFD51E] animate-pulse';
      case 'Pending':
      default:
        return 'bg-[#14023A] text-[#FFF6E5] border-[#AB03A9]';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pixel-panel-magenta p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PixelSwords size={20} />
            <span className="font-arcade text-xs text-[#FFD51E]">HOUSE MISSIONS</span>
          </div>
          <h2 className="font-arcade text-xl sm:text-2xl text-[#FFF6E5]">
            QUEST BOARD: TASKS
          </h2>
          <p className="font-pixel text-xl text-[#FFF6E5]/80">
            Issue house challenges. Completing a quest automatically credits points to assignees.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="pixel-btn-yellow px-4 py-2.5 text-xs flex items-center justify-center gap-2 shrink-0"
        >
          <PixelPlus size={16} />
          <span>CREATE TASK</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="pixel-panel p-3 flex flex-wrap items-center gap-2">
        <span className="font-arcade text-[10px] text-[#FFD51E] mr-2">
          TASK STATUS:
        </span>
        {(['All', 'Pending', 'In Progress', 'Completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`font-arcade text-[10px] px-3 py-1.5 border-2 transition-all ${
              filter === tab
                ? 'bg-[#FFD51E] text-[#14023A] border-[#14023A] font-bold shadow-[2px_2px_0_#14023A]'
                : 'bg-[#14023A] text-[#FFF6E5] border-[#AB03A9] hover:bg-[#AB03A9]'
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="pixel-panel p-12 text-center">
            <p className="font-pixel text-2xl text-[#FFF6E5] mb-2">
              No quests found for this filter.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="pixel-btn-yellow mt-2 px-4 py-2 text-xs"
            >
              POST NEW TASK
            </button>
          </div>
        ) : (
          filteredTasks.map(task => {
            const isCompleted = task.status === 'Completed';
            const isInProgress = task.status === 'In Progress';

            return (
              <div
                key={task.id}
                className={`pixel-panel p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                  isCompleted ? 'opacity-85 border-4 border-[#FFD51E]' : isInProgress ? 'border-4 border-[#AB03A9]' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className={`font-arcade text-[9px] px-2 py-0.5 border ${getStatusBadge(task.status)}`}>
                      {task.status.toUpperCase()}
                    </span>
                    <span className="font-arcade text-[10px] text-[#FFD51E] bg-[#14023A] px-2 py-0.5 border border-[#14023A]">
                      ASSIGNED: {task.assignedTo.toUpperCase()}
                    </span>
                    <span className="font-pixel text-base text-[#FFF6E5]/60">
                      {task.createdAt}
                    </span>
                  </div>

                  <h3 className="font-arcade text-sm sm:text-base text-[#FFF6E5] mb-1 font-bold">
                    {task.title}
                  </h3>
                  <p className="font-pixel text-xl text-[#FFF6E5]/80 leading-snug">
                    {task.description}
                  </p>
                </div>

                {/* Right: Reward Points & Actions */}
                <div className="flex sm:flex-col items-center md:items-end justify-between w-full md:w-auto shrink-0 gap-3">
                  <div className="flex items-center gap-1 font-arcade text-sm text-[#FFD51E] bg-[#14023A] px-3 py-1 border border-[#AB03A9]">
                    <PixelCoin size={16} />
                    <span>+{task.points} PTS</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Start Task Button */}
                    {!isCompleted && !isInProgress && (
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_TASK_STATUS', taskId: task.id, status: 'In Progress' })}
                        className="pixel-btn-violet px-3 py-1.5 text-[10px]"
                      >
                        START TASK
                      </button>
                    )}

                    {/* Mark Complete Button */}
                    {!isCompleted && (
                      <button
                        onClick={() => dispatch({ type: 'COMPLETE_TASK', taskId: task.id })}
                        className="pixel-btn-yellow px-3 py-1.5 text-[10px] flex items-center gap-1 font-bold"
                      >
                        <PixelCheck size={14} />
                        <span>MARK COMPLETE</span>
                      </button>
                    )}

                    {isCompleted && (
                      <span className="font-arcade text-[10px] text-[#FFD51E] bg-[#14023A] px-2 py-1 border border-[#FFD51E]">
                        ✓ AWARDED
                      </span>
                    )}

                    {/* Delete Task */}
                    <button
                      onClick={() => dispatch({ type: 'DELETE_TASK', taskId: task.id })}
                      className="px-2 py-1 bg-[#14023A] text-[#FF467A] hover:bg-[#FF467A] hover:text-[#14023A] font-arcade text-[10px] border border-[#FF467A]"
                      title="Delete Task"
                    >
                      DEL
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CREATE TASK MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-[#14023A]/80 flex items-center justify-center p-4">
          <div className="pixel-panel-yellow max-w-lg w-full p-6 shadow-[8px_8px_0_#14023A]">
            <div className="flex items-center justify-between border-b-2 border-[#14023A] pb-2 mb-4">
              <h3 className="font-arcade text-sm text-[#FFD51E]">CREATE NEW QUEST (TASK)</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="font-arcade text-xs text-[#14023A] hover:bg-[#FF467A] px-2 py-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="font-arcade text-[10px] text-[#14023A] block mb-1 font-bold">
                  QUEST / TASK TITLE:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Refactor Legacy Monolith..."
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#14023A] px-3 py-2 font-pixel text-xl"
                />
              </div>

              <div>
                <label className="font-arcade text-[10px] text-[#14023A] block mb-1 font-bold">
                  DESCRIPTION:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Specify task requirements and success condition..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#14023A] px-3 py-2 font-pixel text-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-arcade text-[10px] text-[#14023A] block mb-1 font-bold">
                    REWARD POINTS:
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="200"
                    step="5"
                    required
                    value={taskPoints}
                    onChange={(e) => setTaskPoints(e.target.value)}
                    className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#14023A] px-3 py-2 font-pixel text-2xl"
                  />
                </div>

                <div>
                  <label className="font-arcade text-[10px] text-[#14023A] block mb-1 font-bold">
                    ASSIGN TO:
                  </label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full bg-[#14023A] text-[#FFF6E5] border-2 border-[#14023A] px-3 py-2 font-pixel text-xl"
                  >
                    <option value="Whole House">Whole House (All Active)</option>
                    {activeContestants.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.team})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="pixel-btn-violet px-4 py-2 text-xs"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="pixel-btn-pink px-4 py-2 text-xs"
                >
                  POST TASK ▶
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
