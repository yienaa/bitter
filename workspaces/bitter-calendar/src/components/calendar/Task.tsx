import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CalendarTask } from '../../types/task';
import { TaskContext } from '../../contexts/TaskContext';
import { EventMapData } from '../../hooks/useTask';
import { DayInfo } from '../../types/calendar';
import dayjs from 'dayjs';
import { HoverEventContext } from '../../contexts/HoverEventContext';
import { useModal } from '../modal/useModal';
import Modal from '../modal/Modal';

const TaskWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const TaskElement = styled.div<{ width: number; top: number; left: number }>`
  position: absolute;
  width: ${({ width }) => width}px;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.primary.light};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.main};
  }

  &.is-active {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

interface TaskPros {
  tasks: EventMapData;
  day: DayInfo;
}

export default function Task({ tasks, day }: TaskPros): React.ReactElement {
  const { eventEntities } = useContext(TaskContext);
  const { hoverTask, setHoverTask } = useContext(HoverEventContext);
  const ref = useRef<HTMLDivElement>(null);
  const [singleWidth, setSingleWidth] = useState(0);
  const [taskEntities, setTaskEntities] = useState<CalendarTask[]>([]);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const width = (ref.current?.parentElement as HTMLElement)?.offsetWidth;
        if (width) {
          setSingleWidth(width);
        }
      });
      resizeObserver.observe(ref.current?.parentElement as HTMLElement);
    }
  }, []);

  function onMouseOver(eventId: string) {
    setHoverTask(eventId);
  }

  function onMouseLeave(eventId: string) {
    setHoverTask(null);
  }

  function onTaskClick(eventId: string) {
    
  }

  const handleTaskClick = (taskId: string) => {
    openModal();
    onTaskClick(taskId);
  };

  const renderTask = () => {
    if (!tasks) return;
    let tempTopIndex = 0;
    return tasks.map((taskId, index) => {
      if (!taskId) {
        tempTopIndex++;
        return null;
      }
      const targetTask = eventEntities?.entities?.[taskId];
      if (!targetTask) return null;
      const diff = dayjs(targetTask.end).diff(dayjs(day.dateObject), 'days') + 1;
      const days = day.day === 0 ? (diff > 7 ? 7 : diff) : targetTask.days;
      const width = singleWidth * days;
      const top = index * (2 + 20);
      const left = 0;
      const active = false;
      if (!taskId) return null;
      tempTopIndex = 0;
      return (
        <TaskElement
          key={index}
          width={width}
          top={top}
          left={left}
          className={`${taskId === hoverTask ? 'is-active' : ''}`}
          draggable={true}
          onMouseOver={() => onMouseOver(taskId)}
          onMouseLeave={() => onMouseLeave(taskId)}
          onClick={() => handleTaskClick(taskId)}
        />
      );
    });
  };

  return (
    <>
      <TaskWrapper ref={ref}>{renderTask()}</TaskWrapper>
      <Modal 
        isOpen={isOpen}
        onClose={closeModal}
        header="일정 상세"
      >
        {/* 모달 내용 */}
      </Modal>
    </>
  );
}
